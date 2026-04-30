export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hussain Rangwala. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.behance.net/hussainrangwala3" className="text-sm text-muted-foreground hover:text-primary transition-colors">Behance</a>
          <a href="https://github.com/hussain291105" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/hussain-rangwala-157117249/" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
