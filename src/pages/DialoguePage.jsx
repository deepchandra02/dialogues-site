import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dialogue from "../components/Dialogue";
import { getDialogueById, getAllDialoguesMeta } from "../lib/dialogueLoader";

export default function DialoguePage() {
  const { id } = useParams();
  const [dialogue, setDialogue] = useState(null);
  const [allMeta, setAllMeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadDialogue() {
      setLoading(true);
      const [dialogueData, metaData] = await Promise.all([
        getDialogueById(id),
        getAllDialoguesMeta(),
      ]);

      if (!dialogueData) {
        setNotFound(true);
      } else {
        setDialogue(dialogueData);
        setAllMeta(metaData);
      }
      setLoading(false);
    }

    loadDialogue();
  }, [id]);

  if (loading) {
    return (
      <Layout maxWidth="max-w-5xl">
        <div className="text-center py-16 text-muted-foreground font-mono">
          Loading...
        </div>
      </Layout>
    );
  }

  if (notFound || !dialogue) {
    return <Navigate to="/" replace />;
  }

  const formattedDate = new Date(dialogue.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get previous and next dialogues
  const currentIndex = allMeta.findIndex((d) => d.id === id);
  const prevDialogue = currentIndex > 0 ? allMeta[currentIndex - 1] : null;
  const nextDialogue =
    currentIndex < allMeta.length - 1 ? allMeta[currentIndex + 1] : null;

  return (
    <Layout maxWidth="max-w-5xl">
      <article className="space-y-12">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-border">
          <div className="flex items-baseline gap-4 text-xs tracking-wider text-muted-foreground font-mono">
            <time dateTime={dialogue.date}>{formattedDate}</time>
            <span>•</span>
            <span>{dialogue.participants.map((p) => p.name).join(" & ")}</span>
          </div>
          <h1 className="text-4xl tracking-wide leading-tight">
            {dialogue.title}
          </h1>
          {dialogue.description && (
            <p className="text-base leading-relaxed text-muted-foreground">
              {dialogue.description}
            </p>
          )}
        </header>

        {/* Dialogue Content */}
        <Dialogue
          exchanges={dialogue.exchanges}
          participants={dialogue.participants}
        />

        {/* Navigation */}
        <nav className="pt-12 border-t border-border font-mono">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center text-sm">
            <div className="flex-1 min-w-0">
              {prevDialogue ? (
                <Link
                  to={`/dialogue/${prevDialogue.id}`}
                  className="text-foreground hover:text-accent transition-colors block"
                >
                  <span className="block text-xs text-muted-foreground mb-1">
                    ← Previous
                  </span>
                  <span className="block truncate">{prevDialogue.title}</span>
                </Link>
              ) : (
                <span className="text-muted-foreground">← Previous</span>
              )}
            </div>
            <Link
              to="/archive"
              className="text-foreground hover:text-accent transition-colors text-center md:mx-8 py-2 md:py-0"
            >
              Archive
            </Link>
            <div className="flex-1 min-w-0 text-right">
              {nextDialogue ? (
                <Link
                  to={`/dialogue/${nextDialogue.id}`}
                  className="text-foreground hover:text-accent transition-colors block"
                >
                  <span className="block text-xs text-muted-foreground mb-1">
                    Next →
                  </span>
                  <span className="block truncate">{nextDialogue.title}</span>
                </Link>
              ) : (
                <span className="text-muted-foreground block">Next →</span>
              )}
            </div>
          </div>
        </nav>
      </article>
    </Layout>
  );
}
