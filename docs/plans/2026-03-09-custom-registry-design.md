# kasumi-ui カスタムレジストリ設計

## 概要

kasumi-ui のコンポーネントを shadcn CLI のカスタムレジストリとして公開する。
`npx shadcn@latest add @kasumi/button` のように、他のプロジェクトからコンポーネントを取り込めるようにする。

## 方式

shadcn v2 のカスタムレジストリ機能を利用。自前 CLI は不要。

1. `registry.json` にコンポーネントのメタデータを定義
2. `npx shadcn build` で `public/r/*.json` を自動生成
3. Vercel（既存デプロイ）で配信

## 使い方（利用者側）

```bash
# URL直接指定
npx shadcn@latest add https://kasumi-ui.vercel.app/r/button.json

# namespace登録後
# components.json に追加:
# { "registries": { "@kasumi": "https://kasumi-ui.vercel.app/r/{name}.json" } }
npx shadcn@latest add @kasumi/button
```

## ファイル構成

```
registry.json              # レジストリ定義（ルート）
src/
├── registry/              # レジストリ用ソースファイル
│   ├── ui/                # コンポーネント（components/ui/ からコピー）
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── field.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── tooltip.tsx
│   └── lib/
│       ├── utils.ts       # cn() ユーティリティ
│       └── use-mobile.ts  # useIsMobile フック
├── components/ui/         # 既存（カタログ/ドキュメント用、そのまま維持）
└── lib/                   # 既存（そのまま維持）
public/r/                  # shadcn build で自動生成（.gitignore に追加）
```

## コンポーネント一覧と依存関係

### 共通ユーティリティ

| 名前 | ファイル | npm依存 |
|------|----------|---------|
| utils | registry/lib/utils.ts | clsx, tailwind-merge |
| use-mobile | registry/lib/use-mobile.ts | （なし） |

### コンポーネント

| 名前 | npm依存 | registry依存 |
|------|---------|-------------|
| accordion | @radix-ui/react-accordion, lucide-react | utils |
| alert | lucide-react | utils |
| avatar | lucide-react | utils |
| badge | — | utils |
| breadcrumb | lucide-react | utils |
| button | — | utils |
| card | — | utils |
| checkbox | lucide-react | utils |
| dialog | @radix-ui/react-dialog, lucide-react | utils |
| dropdown-menu | @radix-ui/react-dropdown-menu | utils |
| field | — | utils, label |
| input | lucide-react | utils |
| label | — | utils |
| pagination | lucide-react | utils |
| popover | @radix-ui/react-popover | utils |
| progress | — | utils |
| radio | — | utils |
| select | @radix-ui/react-select, lucide-react | utils |
| separator | — | utils |
| sidebar | @radix-ui/react-slot, @radix-ui/react-collapsible, @radix-ui/react-dialog, lucide-react | utils, use-mobile, tooltip |
| skeleton | — | utils |
| switch | — | utils |
| table | — | utils |
| tabs | @radix-ui/react-tabs | utils |
| textarea | — | utils |
| toast | @radix-ui/react-toast, lucide-react | utils |
| tooltip | @radix-ui/react-tooltip | utils |

## ビルドフロー

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

`pnpm registry:build` → `public/r/` にJSON生成 → Next.js build時に静的配信

## .gitignore

`public/r/` を追加（自動生成物のため）。

## 注意点

- `registry/` のファイルは `components/ui/` のコピー。今後コンポーネントを更新したら `registry/` 側も更新する必要がある
- shadcn build がインポートパスを解決してくれるので、`@/lib/utils` のようなパスはそのまま使える
- react は peerDependency 扱いなので dependencies に含めない
