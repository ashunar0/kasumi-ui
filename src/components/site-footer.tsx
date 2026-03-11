export function SiteFooter() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} kasumi/ui
        </p>
      </div>
    </footer>
  );
}
