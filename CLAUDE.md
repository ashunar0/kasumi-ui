# my-ui

あさひの自分専用デザインシステム＆UIコンポーネントライブラリ。
コンポーネントを一通り揃えて、デザインシステムとして完成させることが目標。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4（CSS変数ベースのデザイントークン）
- TypeScript strict
- pnpm
- Radix UI（振る舞いが複雑なコンポーネントのみ。個別パッケージで導入）
- lucide-react（アイコン）

## ファイル構成

```
src/
├── lib/
│   └── utils.ts          # cn() ユーティリティ（clsx + tailwind-merge）
├── app/
│   ├── page.tsx          # UIカタログページ（1ページに全コンポーネント表示）
│   ├── layout.tsx        # ルートレイアウト（lang="ja"）
│   └── globals.css       # デザイントークン（CSS変数）
└── components/
    ├── theme-toggle.tsx   # ライト/ダークモード切り替えボタン
    └── ui/               # UIコンポーネント置き場
        ├── accordion.tsx
        ├── badge.tsx
        ├── button.tsx
        ├── checkbox.tsx
        ├── input.tsx
        ├── label.tsx
        ├── card.tsx
        ├── radio.tsx
        ├── dialog.tsx
        ├── dropdown-menu.tsx
        ├── select.tsx
        ├── switch.tsx
        ├── tabs.tsx
        ├── textarea.tsx
        ├── toast.tsx
        └── tooltip.tsx
```

## デザイン方針

- shadcn/uiのシンプルさをベースに、日本語に最適化する
- 独自の個性・ユーモアを入れる余地を持つ
- Catnoseさんのような「シンプル・機能的・ユーモア」を目指す
- YAGNI: Typographyコンポーネント等は必要になるまで入れない

## フォント

- 英語: Inter（`next/font/google`、`inter.className` で body に適用）
- コード: Geist Mono（CSS変数 `--font-geist-mono` で登録）
- 日本語: システムフォントにフォールバック（Hiragino Sans 等）

## タイポグラフィ

Minor Third (×1.2) の Modular Scale を採用。詳細は [`docs/design-decisions/typography.md`](docs/design-decisions/typography.md) を参照。

| 用途 | クラス | サイズ | line-height | 根拠 |
|------|--------|--------|-------------|------|
| H1 | `text-h1 font-bold tracking-tight` | 33px | デフォルト | base × 1.2⁴ |
| H2 | `text-h2 font-semibold tracking-tight` | 28px | デフォルト | base × 1.2³ |
| H3 | `text-h3 font-semibold tracking-tight` | 23px | デフォルト | base × 1.2² |
| H4 | `text-h4 font-semibold tracking-tight` | 19px | デフォルト | base × 1.2¹ |
| 本文（記事・説明文） | `text-body` | 16px | ×1.8 | base, JLREQ + 実測 |
| UI文（アプリ内テキスト） | `text-ui` | 14px | ×1.6 | コンパクトUI用 |

日本語はデフォルトの行間だと窮屈なため、本文・UI文にはカスタムトークンで行間を組み込み済み。
見出しやボタンの行間はデフォルトのまま。

## コンポーネント設計ルール

- `src/components/ui/` に1コンポーネント1ファイルで配置
- propsは `ComponentProps<"要素名">` を拡張する形で定義
- Tailwind CSS のユーティリティクラスで直接スタイリング
- `className` を受け取って外部からスタイル上書き可能にする
- デザイントークンは `globals.css` のCSS変数を参照（`bg-primary` 等）
- ピル型ボタン等は `className="rounded-full"` で外から対応（専用propは不要）
- アイコンは `lucide-react` を使用（生 SVG は使わない）
- 振る舞いが複雑なコンポーネントは Radix UI のプリミティブをラップして使用

## デザイントークン

`globals.css` でCSS変数として定義し、`@theme inline` でTailwindに登録:
- 色: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- 角丸: radius (sm/md/lg/xl)
- フォント: sans (Inter), mono (Geist Mono)
- タイポグラフィ: text-ui, text-body, text-h4, text-h3, text-h2, text-h1（Minor Third スケール）
- ライト/ダークモード両対応

## ダークモード

3つのモードを切り替え可能:
- **System** — OS設定に従う（`prefers-color-scheme`、デフォルト）
- **Light** — `<html>` に `.light` クラスを付与（メディアクエリを `:root:not(.light)` で無効化）
- **Dark** — `<html>` に `.dark` クラスを付与

カタログページのヘッダー右上にトグルボタン（`ThemeToggle`）あり。

## カタログページ

- `page.tsx` にセクション区切り型で全コンポーネントを縦並び表示
- セクション: タイポグラフィ → ボタン → バッジ → タブ → アコーディオン → ツールチップ → ドロップダウンメニュー → テキスト入力 → ラベル → カード → ダイアログ → トースト
- テキストは日本語で記述（日程調整アプリを想定した実用的な内容）
- コードスニペットやProps一覧は不要（シンプルに保つ）

## 実装済みコンポーネント

- **Accordion** — Radix UI ベース、複合コンポーネント（Accordion/AccordionItem/AccordionTrigger/AccordionContent）、type: single/multiple、開閉アニメーション付き、ChevronDown アイコン回転
- **Badge** — variant: default/outline、size: sm/md（デフォルト md）、色変更は className で外から指定
- **Button** — variant: primary/secondary/ghost/outline/destructive、size: sm/md/lg
- **Input** — variant: outline/underline、size: sm/md/lg、error prop でエラー状態切り替え、`type="password"` でパスワード表示トグル自動表示
- **Label** — peer-disabled 連動
- **Card** — Card / CardHeader / CardTitle / CardContent / CardFooter の5パーツ構成
- **Select** — Radix UI ベース、複合コンポーネント（Select/SelectTrigger/SelectValue/SelectContent/SelectItem）、error/disabled 対応、Portal・自動位置調整・typeahead 対応
- **Checkbox** — size: sm/md/lg、error prop でエラー状態切り替え
- **Radio** — size: sm/md/lg、error prop でエラー状態切り替え、name 属性でグルーピング
- **Switch** — size: sm/md/lg、error prop でエラー状態切り替え、role="switch" 付与
- **Tabs** — Radix UI ベース、複合コンポーネント（Tabs/TabsList/TabsTrigger/TabsContent）、variant: underline/pill（デフォルト underline）、キーボードナビゲーション対応
- **Textarea** — error prop でエラー状態切り替え、resize-y でリサイズ可能
- **DropdownMenu** — Radix UI ベース、複合コンポーネント（DropdownMenu/DropdownMenuTrigger/DropdownMenuContent/DropdownMenuItem/DropdownMenuLabel/DropdownMenuSeparator/DropdownMenuShortcut）、destructive 項目対応、Portal・キーボードナビゲーション対応
- **Dialog** — Radix UI ベース、複合コンポーネント（Dialog/DialogTrigger/DialogContent/DialogHeader/DialogTitle/DialogDescription/DialogFooter/DialogClose）、Portal・フォーカストラップ・Escape キー対応
- **Tooltip** — Radix UI ベース、複合コンポーネント（TooltipProvider/Tooltip/TooltipTrigger/TooltipContent）、side 指定可能（デフォルト top）、Portal・自動位置調整対応
- **Toast** — Radix UI ベース、命令型 API（useToast フック）、variant: default/success/info/warning/error（Alert Callout 風の色味+アイコン）、位置設定可能（ToastProvider の position prop、デフォルト右上）、スワイプで閉じる、複数スタック対応

## 設計判断メモ

- **cn関数を導入済み** — `src/lib/utils.ts` に `clsx` + `tailwind-merge` ベースの `cn()` を定義。全 UI コンポーネントで使用。className の外部上書き時にクラス衝突を防ぐ
- **Typographyコンポーネントは作らない** — Tailwindクラスがそのままスタイルの説明になるため抽象化不要
- **ピル型は className で対応** — `rounded-full` を外から渡す。多用するようになったらpropに昇格
- **next/font は `className` で適用** — `variable` はCSS変数を定義するだけでフォントは適用されない
- **自作 vs ライブラリの使い分け** — CSS + HTML で完結するもの（Button, Input, Checkbox 等）は自作。フォーカストラップ・Portal・スクロールロック等の複雑な振る舞いが必要なもの（Select, Dialog, Toast 等）は Radix UI を使う。見た目は全て自前のデザイントークンで制御し、Radix はヘッドレスとして振る舞いだけ担当
- **アイコンは lucide-react** — 生 SVG がコンポーネント間で重複し始めたため導入。tree-shaking 対応で使った分だけバンドルされる。shadcn/ui と同じエコシステムで参考資料が豊富
- **パスワードトグルは自動表示** — `type="password"` を渡すだけで Eye/EyeOff トグルが自動的に出る。パスワード以外で目アイコンが必要な場面はないため、prop によるオプトインは不要
- **クリアボタン（×）は今は入れない** — 実プロダクトで具体的に必要になってから追加する。API 設計（clearable prop、onClear コールバック等）が推測になるため YAGNI
