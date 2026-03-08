import Link from "next/link";
import { Command } from "lucide-react";

export default function Auth2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background p-6 md:p-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-lg">
            <Command className="size-8" />
          </div>
          <span className="sr-only">My App</span>
        </Link>
      </div>

      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
