export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} kasumi/ui
        </p>
      </div>
    </footer>
  );
}
