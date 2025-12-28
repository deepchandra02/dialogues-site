import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

export default function Dialogue({ exchanges, participants }) {
  // Collect all commentaries with their indices and assign numbers
  const commentaries = exchanges
    .map((exchange, index) => ({ ...exchange, exchangeIndex: index }))
    .filter(e => e.commentary);

  // Map exchange index to commentary number
  const commentaryNumbers = {};
  commentaries.forEach((item, idx) => {
    commentaryNumbers[item.exchangeIndex] = idx + 1;
  });

  const [activeCommentaries, setActiveCommentaries] = useState(new Set());

  useEffect(() => {
    const visibilityMap = new Map();

    // Create intersection observer for each exchange with commentary
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.id.replace('exchange-', ''));

          if (entry.isIntersecting) {
            visibilityMap.set(index, entry.intersectionRatio);
          } else {
            visibilityMap.delete(index);
          }
        });

        // Update active commentaries based on what's visible
        setActiveCommentaries(new Set(visibilityMap.keys()));
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all exchanges with commentary
    commentaries.forEach((item) => {
      const element = document.getElementById(`exchange-${item.exchangeIndex}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [commentaries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 relative">
      {/* Left column - Dialogue exchanges */}
      <div className="space-y-8">
        {exchanges.map((exchange, index) => {
          const speaker = participants.find(p => p.id === exchange.speakerId);
          const commentaryNum = commentaryNumbers[index];

          return (
            <div
              key={index}
              id={`exchange-${index}`}
              className="dialogue-exchange scroll-mt-24"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs tracking-wider text-muted-foreground uppercase font-mono">
                  {speaker.name}
                  {exchange.commentary && (
                    <a
                      href={`#commentary-${index}`}
                      className="ml-3 text-accent hover:underline align-super text-[10px]"
                      aria-label={`Jump to commentary ${commentaryNum}`}
                    >
                      [{commentaryNum}]
                    </a>
                  )}
                </div>
                <div className="space-y-4">
                  {exchange.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right column - Commentaries */}
      {commentaries.length > 0 && (
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="text-xs tracking-wider text-muted-foreground uppercase border-b border-border pb-2 font-mono">
            Commentary
          </div>
          {commentaries.map((item, idx) => {
            const speaker = participants.find(p => p.id === item.speakerId);
            const isActive = activeCommentaries.has(item.exchangeIndex);

            return (
              <CommentaryBlock
                key={item.exchangeIndex}
                content={item.commentary}
                exchangeIndex={item.exchangeIndex}
                speakerName={speaker.name}
                number={idx + 1}
                isActive={isActive}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function CommentaryBlock({ content, exchangeIndex, speakerName, number, isActive }) {
  return (
    <div
      id={`commentary-${exchangeIndex}`}
      className={cn(
        "px-4 py-3 border-l-2 scroll-mt-24 transition-all duration-300",
        isActive
          ? "bg-accent/20 border-accent shadow-sm"
          : "bg-accent/10 border-accent/50 opacity-70"
      )}
    >
      <div className="flex items-baseline justify-between mb-2">
        <a
          href={`#exchange-${exchangeIndex}`}
          className="text-xs tracking-wider text-accent hover:underline font-mono"
        >
          ↑ {speakerName}
        </a>
        <span className="text-[10px] font-mono text-muted-foreground">
          [{number}]
        </span>
      </div>
      <div className="text-sm leading-relaxed text-foreground/90 font-serif">
        {content}
      </div>
    </div>
  );
}
