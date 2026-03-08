# Tooltip コンポーネント設計

## 概要

ホバー/フォーカスで補足テキストを表示するツールチップ。Radix UI (`@radix-ui/react-tooltip`) をラップ。shadcn/ui と同じ複合コンポーネントパターン。

## API

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>ホバー</Button>
    </TooltipTrigger>
    <TooltipContent>補足テキスト</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Props

| コンポーネント | Props | 説明 |
|--------------|-------|------|
| TooltipProvider | Radix Provider 透過 | `delayDuration` 等。アプリ全体で1回ラップ |
| Tooltip | Radix Root 透過 | `open`, `onOpenChange` |
| TooltipTrigger | Radix Trigger 透過 | `asChild` 対応 |
| TooltipContent | `side`, `sideOffset`, `className` | デフォルト `side="top"`, `sideOffset=4` |

## スタイル（TooltipContent）

- 背景: `bg-foreground text-background`（ダークモード自動対応）
- テキスト: `text-xs`
- 角丸: `rounded-md`
- パディング: `px-3 py-1.5`
- アニメーション: fade in/out + 微小スライド
- サイズ: 1サイズのみ

## 判断

- Radix UI 採用: ホバー遅延、タッチデバイス、画面端の自動位置調整、Portal、フォーカス表示
- shadcn/ui と同じ複合コンポーネント API: 一貫性重視
- サイズ展開なし: Tooltip のサイズを変える需要は低い
