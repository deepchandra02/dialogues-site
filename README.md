# Dialogues — Software & Philosophy

A minimalist blog platform for presenting philosophical dialogues about software, inspired by [makingsoftware.com](http://makingsoftware.com).

## Features

- **Dialogue Format**: Conversations between two people presented in an elegant alternating layout
- **Inline Commentary**: Editorial notes that provide meta-analysis without disrupting the flow
- **Minimalist Design**: Sophisticated typography with generous whitespace for focused reading
- **Monospace Typography**: Departure Mono throughout for a distinctive editorial voice
- **Responsive Layout**: Centered single-column design with substantial margins

## Tech Stack

- **Vite.js** - Fast build tool and dev server
- **React** - Component-based UI
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Base component library
- **Departure Mono** - Primary typeface

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.jsx   # Main layout with navigation
│   └── Dialogue.jsx # Core dialogue display component
├── pages/           # Route pages
│   ├── Home.jsx     # Homepage with recent dialogues
│   ├── Archive.jsx  # Complete dialogue archive
│   ├── DialoguePage.jsx  # Individual dialogue view
│   └── About.jsx    # About page
├── data/            # Content data
│   └── dialogues.js # Dialogue content and metadata
├── lib/             # Utilities
│   └── utils.js     # Helper functions (cn for className merging)
└── index.css        # Global styles and Tailwind config
```

## Adding New Dialogues

To add a new dialogue, edit `src/data/dialogues.js` and add a new object to the `dialogues` array:

```javascript
{
  id: 'unique-slug',
  title: 'Dialogue Title',
  date: '2024-12-28',
  description: 'Brief description of the dialogue theme',
  participants: [
    { id: 'person1', name: 'Person One' },
    { id: 'person2', name: 'Person Two' }
  ],
  exchanges: [
    {
      speakerId: 'person1',
      content: 'The first person\'s statement...'
    },
    {
      speakerId: 'person2',
      content: 'The second person\'s response...',
      commentary: 'Optional editorial commentary on this exchange'
    }
  ]
}
```

## Design Philosophy

The site embodies a content-first philosophy:

- **Typography**: Departure Mono creates a distinctive, readable monospace experience
- **Color**: Warm off-white background (#F5F3EF) with dark charcoal text (#1A1A1A)
- **Accent**: Light blue (#A8C5E0) for links and highlights
- **Layout**: Generous whitespace and narrow reading column for focused attention
- **Simplicity**: No unnecessary features, analytics, or distractions

## License

MIT
