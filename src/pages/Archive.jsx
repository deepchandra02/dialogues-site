import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getAllDialoguesMeta } from '../lib/dialogueLoader';

export default function Archive() {
  const [dialogues, setDialogues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDialogues() {
      const meta = await getAllDialoguesMeta();
      const sorted = [...meta].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDialogues(sorted);
      setLoading(false);
    }
    loadDialogues();
  }, []);

  return (
    <Layout>
      <div className="space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-4xl tracking-wide">Archive</h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            All dialogues, chronologically ordered.
          </p>
        </section>

        {/* Dialogue List */}
        <section className="space-y-12">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground font-mono">
              Loading...
            </div>
          ) : (
            dialogues.map((dialogue) => (
              <ArchiveEntry key={dialogue.id} dialogue={dialogue} />
            ))
          )}
        </section>
      </div>
    </Layout>
  );
}

function ArchiveEntry({ dialogue }) {
  const formattedDate = new Date(dialogue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="space-y-3 group pb-8 border-b border-border last:border-b-0">
      <div className="flex items-baseline gap-4 text-xs tracking-wider text-muted-foreground font-mono">
        <time dateTime={dialogue.date} className="min-w-[140px]">
          {formattedDate}
        </time>
        <span>•</span>
        <span>{dialogue.participants.map(p => p.name).join(' & ')}</span>
      </div>
      <h2 className="text-xl tracking-wide">
        <Link
          to={`/dialogue/${dialogue.id}`}
          className="text-foreground group-hover:text-accent transition-colors"
        >
          {dialogue.title}
        </Link>
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {dialogue.description}
      </p>
    </article>
  );
}
