# Sidebar コンポーネント設計

## 概要

サイドバー＋メインコンテンツの汎用レイアウトパターン。特定のアプリに依存しない再利用可能なコンポーネント。

## 要件

- ロゴ＋ナビリンク＋セクション分け＋折りたたみ＋ネストメニュー＋ユーザーアバター＋フッター領域
- 折りたたみ → アイコンだけのミニサイドバー（デスクトップ）
- モバイル → Radix Dialog によるオーバーレイドロワー
- Radix UI: Collapsible（ネスト展開）＋ Dialog（モバイルドロワー）

## コンポーネント構成（13個）

ファイル: `src/components/ui/sidebar.tsx`

### 状態管理

- `SidebarProvider` — Context で開閉状態を管理。`defaultOpen` prop
- `useSidebar()` — 開閉状態と `toggle()` を取得するフック

### レイアウト枠

- `Sidebar` — サイドバー本体。デスクトップ: 固定幅（展開 16rem / 折りたたみ 3rem）、モバイル: Radix Dialog
- `SidebarHeader` — ロゴ・ブランド領域
- `SidebarContent` — スクロール可能なメイン領域
- `SidebarFooter` — ユーザーアバター等の固定フッター

### ナビゲーション

- `SidebarGroup` — セクション分けのグルーピング
- `SidebarGroupLabel` — グループのラベル（折りたたみ時は非表示）
- `SidebarMenu` — `<ul>` ナビメニューリスト
- `SidebarMenuItem` — `<li>` ナビメニューアイテム
- `SidebarMenuButton` — クリック可能なボタン/リンク。`icon`・`isActive`・`asChild` props
- `SidebarMenuSub` — ネストメニュー（Radix Collapsible でアコーディオン展開）
- `SidebarTrigger` — 開閉トグルボタン（どこにでも配置可能）

## 状態管理とレスポンシブ

### 状態

| 状態 | 型 | 説明 |
|------|----|------|
| `open` | `boolean` | サイドバーが展開されているか |
| `isMobile` | `boolean` | ビューポート幅 768px 未満か |

- `defaultOpen` でデフォルト値を設定（デフォルト `true`）
- `onOpenChange` コールバックで外部制御可能

### モバイル判定

カスタムフック `useIsMobile()` を `src/lib/use-mobile.ts` に配置。`window.matchMedia` + `change` イベントリスナーで 768px を監視。

### デスクトップ

- 展開時: 幅 `16rem`（256px）、アイコン＋テキスト表示
- 折りたたみ時: 幅 `3rem`（48px）、アイコンのみ。テキストは `overflow-hidden` + `opacity-0`
- `transition-[width]` でアニメーション
- メインコンテンツは `margin-left` で追従

### モバイル

- Radix Dialog によるオーバーレイドロワー
- 左からスライドイン（`translate-x`）
- 背景に半透明オーバーレイ（`bg-black/60`）
- Escape キー / オーバーレイクリックで閉じる

## API 設計

### SidebarMenuButton props

| prop | 型 | 説明 |
|------|----|------|
| `icon` | `LucideIcon` | 左アイコン |
| `isActive` | `boolean` | アクティブ状態 |
| `asChild` | `boolean` | 子要素をそのままレンダリング（Link 等） |

### 使用例

```tsx
<SidebarProvider defaultOpen={true}>
  <Sidebar>
    <SidebarHeader>
      <span className="text-h4 font-bold">MyApp</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>メニュー</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton icon={Home} isActive asChild>
              <Link href="/">ダッシュボード</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <Avatar size="sm" />
      <span>あさひ</span>
    </SidebarFooter>
  </Sidebar>
  <main>
    <SidebarTrigger />
    {children}
  </main>
</SidebarProvider>
```

## スタイリング

既存デザイントークンのみ使用。新しい CSS 変数は追加しない。

| 要素 | スタイル |
|------|---------|
| サイドバー背景 | `bg-secondary` |
| テキスト | `text-foreground` |
| グループラベル | `text-muted-foreground text-ui` |
| MenuButton 通常 | `hover:bg-accent` |
| MenuButton active | `bg-accent font-medium` |
| サブメニュー | 左に `border-l border-border` のインデント線 |
| フッター | `border-t border-border` で上部区切り線 |
| モバイルオーバーレイ | `bg-black/60` |

### アニメーション

- サイドバー幅: `transition-[width] duration-200 ease-in-out`
- テキスト非表示: `opacity-0` + `overflow-hidden`
- メインコンテンツの `margin-left` も同じ duration で追従

### 折りたたみ時の Tooltip

既存の `Tooltip` コンポーネントでメニュー名を表示。

## 技術選択

- Radix Collapsible: ネストメニューの展開/折りたたみ
- Radix Dialog: モバイルドロワー（フォーカストラップ・Escape キー対応）
- Slot（`asChild`）: `@radix-ui/react-slot` で実装
