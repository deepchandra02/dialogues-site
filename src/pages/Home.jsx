import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getRecentDialogues } from '../lib/dialogueLoader';

export default function Home() {
  const [recentDialogues, setRecentDialogues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDialogues() {
      const dialogues = await getRecentDialogues(3);
      setRecentDialogues(dialogues);
      setLoading(false);
    }
    loadDialogues();
  }, []);

  return (
    <Layout>
      <div className="space-y-16">
        {/* Intro */}
        <section className="space-y-6">
          <h1 className="text-4xl tracking-wide">Recent Dialogues</h1>
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            Conversations about software, philosophy, and the intersection of
            technical craft and human understanding.
          </p>
        </section>

        {/* Recent Dialogues */}
        <section className="space-y-12">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground font-mono">
              Loading...
            </div>
          ) : (
            recentDialogues.map((dialogue) => (
              <DialoguePreview key={dialogue.id} dialogue={dialogue} />
            ))
          )}
        </section>

        {/* View All Link */}
        <div className="pt-8 border-t border-border">
          <Link
            to="/archive"
            className="text-sm text-foreground hover:text-accent transition-colors tracking-wide font-mono"
          >
            VIEW ALL DIALOGUES →
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function DialoguePreview({ dialogue }) {
  const formattedDate = new Date(dialogue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="space-y-4 group">
      <div className="space-y-2">
        <div className="flex items-baseline gap-4 text-xs tracking-wider text-muted-foreground font-mono">
          <time dateTime={dialogue.date}>{formattedDate}</time>
          <span>•</span>
          <span>{dialogue.participants.map(p => p.name).join(' & ')}</span>
        </div>
        <h2 className="text-2xl tracking-wide">
          <Link
            to={`/dialogue/${dialogue.id}`}
            className="text-foreground group-hover:text-accent transition-colors"
          >
            {dialogue.title}
          </Link>
        </h2>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">
        {dialogue.description}
      </p>
      <Link
        to={`/dialogue/${dialogue.id}`}
        className="inline-block text-sm text-foreground hover:text-accent transition-colors tracking-wide font-mono"
      >
        READ DIALOGUE →
      </Link>
    </article>
  );
}
