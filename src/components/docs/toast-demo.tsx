"use client";

import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

function ToastDemoButton({
  variant,
  label,
}: {
  variant?: "default" | "success" | "info" | "warning" | "error";
  label: string;
}) {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: label,
          description: "これはトーストの説明文です。",
          variant,
        })
      }
    >
      {label}
    </Button>
  );
}

export function ToastBasicDemo() {
  return (
    <ToastProvider>
      <ToastDemoButton label="トーストを表示" />
    </ToastProvider>
  );
}

export function ToastVariantsDemo() {
  return (
    <ToastProvider>
      <div className="flex flex-wrap gap-3">
        <ToastDemoButton variant="default" label="Default" />
        <ToastDemoButton variant="success" label="Success" />
        <ToastDemoButton variant="info" label="Info" />
        <ToastDemoButton variant="warning" label="Warning" />
        <ToastDemoButton variant="error" label="Error" />
      </div>
    </ToastProvider>
  );
}

export function ToastPositionDemo({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <ToastProvider position="bottom-center">
      <ToastDemoButton label="下中央に表示" />
    </ToastProvider>
  );
}
