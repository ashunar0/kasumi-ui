# Tabs コンポーネント設計

## 概要

タブ切り替えUI。Radix UI (`@radix-ui/react-tabs`) をラップして実装。

## API

複合コンポーネント構成:

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="underline">
    <TabsTrigger value="tab1">タブ1</TabsTrigger>
    <TabsTrigger value="tab2">タブ2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">内容1</TabsContent>
  <TabsContent value="tab2">内容2</TabsContent>
</Tabs>
```

## Props

| コンポーネント | Props | 説明 |
|--------------|-------|------|
| Tabs | Radix Root 透過 | `defaultValue`, `value`, `onValueChange` |
| TabsList | `variant: "underline" \| "pill"` | デフォルト: `underline` |
| TabsTrigger | `value`, `disabled` | `className` 上書き可 |
| TabsContent | `value` | `className` 上書き可 |

## スタイル

### Underline variant

- リスト: 下ボーダー付き
- 非選択: `muted-foreground` テキスト
- 選択中: `foreground` テキスト + `primary` 色の下線
- ホバー: `foreground` テキスト

### Pill variant

- リスト: `muted` 背景の丸角コンテナ
- 非選択: `muted-foreground` テキスト
- 選択中: `background` 背景 + シャドウ
- ホバー: 軽い背景変化

### 共通

- disabled: `opacity-50`, `cursor-not-allowed`
- サイズ: 1サイズのみ（YAGNI）

## キーボード操作

Radix UI が自動で処理:
- 左右矢印キーでタブ切り替え
- Home/End で先頭/末尾へ
- ARIA 属性（`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`）

## 判断

- Radix UI 採用: キーボードナビゲーション・ARIA の正確な実装をライブラリに任せる
- サイズ展開なし: Tabs はページ内固定ナビゲーション用途が多く、サイズ変更の需要が低い
- variant は 2 種: underline と pill の両方を初期実装（どちらも頻出パターン）
