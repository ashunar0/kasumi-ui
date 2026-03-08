# Dropdown Menu コンポーネント設計

## 概要

トリガークリックで表示されるアクションメニュー。Radix UI (`@radix-ui/react-dropdown-menu`) をラップ。

## API

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>操作</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>アクション</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>編集</DropdownMenuItem>
    <DropdownMenuItem>複製</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>削除</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## エクスポートするコンポーネント

| コンポーネント | 説明 |
|--------------|------|
| DropdownMenu | Root。Radix 透過 |
| DropdownMenuTrigger | トリガー。`asChild` 対応 |
| DropdownMenuContent | メニュー本体。Portal + アニメーション |
| DropdownMenuItem | メニュー項目。`destructive` prop で赤文字 |
| DropdownMenuLabel | グループ見出し |
| DropdownMenuSeparator | 区切り線 |
| DropdownMenuShortcut | 右寄せのキーボードショートカット表示（span） |

## スタイル

- Content: `bg-background border rounded-lg shadow-md p-1`、Select の Content と統一感
- Item: `rounded-md px-2 py-1.5 text-sm`、ホバー/フォーカスで `bg-accent`
- Item (destructive): `text-destructive` + ホバー時 `bg-destructive/10`
- Label: `px-2 py-1.5 text-xs font-semibold text-muted-foreground`
- Separator: `bg-border h-px mx-1 my-1`
- Shortcut: `ml-auto text-xs text-muted-foreground`
- アニメーション: fade-in/out + zoom

## スコープ外（YAGNI）

- CheckboxItem / RadioItem
- Sub（サブメニュー）
- Group
