import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import DarkModeToggle from './DarkModeToggle';

export default function Layout({ children, className, maxWidth = "max-w-3xl" }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="w-full border-b border-border font-mono">
        <div className={cn(maxWidth, "mx-auto px-8 py-6")}>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-wide"
            >
              DIALOGUES
            </Link>
            <div className="flex gap-8 items-center text-sm">
              <Link
                to="/archive"
                className="text-foreground hover:text-accent transition-colors"
              >
                Archive
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={cn(maxWidth, "mx-auto px-8 py-16", className)}>
        {children}
      </main>
    </div>
  );
}
