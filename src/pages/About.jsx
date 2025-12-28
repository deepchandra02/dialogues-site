import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="space-y-12 max-w-2xl">
        <section className="space-y-6">
          <h1 className="text-4xl tracking-wide">About</h1>

          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            <p>
              This site presents conversations about software, philosophy, and
              the intersection of technical craft and human understanding.
            </p>

            <p>
              The dialogue format reflects a belief that ideas develop best
              through exchange—that truth emerges not from individual
              proclamation but from the collaborative work of questioning,
              refining, and building on each other's thoughts.
            </p>

            <p>
              Each conversation is presented with dialogues flowing on the left
              and rich editorial commentary anchored on the right. This layout
              allows readers to engage with the conversation while having
              immediate access to deeper analysis and connections.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl tracking-wide">On the Format</h2>

          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            <p>
              Software development is fundamentally conversational. We talk with
              our tools, with our collaborators, with the problem space itself.
              Code review is dialogue. Debugging is dialogue. Architecture
              discussions are dialogue.
            </p>

            <p>
              By presenting ideas in dialogue form, we make explicit what is
              often implicit: that understanding emerges through interaction,
              that good ideas are refined through pushback and questioning, that
              the exchange itself is often more valuable than any individual
              conclusion.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-border">
          <h2 className="text-2xl tracking-wide">Design Philosophy</h2>

          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            <p>
              Typography combines{" "}
              <a
                href="https://en.wikipedia.org/wiki/New_York_(2019_typeface)"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline italic"
              >
                New York
              </a>{" "}
              serif for content and{" "}
              <a
                href="https://departuremono.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono hover:underline text-[15px] italic"
              >
                Departure Mono
              </a>{" "}
              for interface elements, creating a balance between literary
              elegance and technical precision. The monospace aesthetic is
              inspired by{" "}
              <a
                href="https://www.makingsoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline text-foreground italic"
              >
                makingsoftware.com
              </a>
              , which demonstrates the power of restrained typography in
              editorial design.
            </p>

            <p>
              The warm off-white background reduces eye strain while maintaining
              clarity. Dark mode adapts the palette for low-light reading while
              preserving the typographic hierarchy and visual rhythm.
            </p>

            <p>
              The two-column layout on dialogue pages keeps commentary
              accessible without interrupting the conversational flow. Built
              with Vite and React, styled with Tailwind CSS. The site is
              intentionally simple: static generation, minimal JavaScript, no
              analytics or tracking, no comments or social features. Just the
              dialogues and the space to read them.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
