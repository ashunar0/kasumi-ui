# Toast カラー設計 v2

## 背景

初期実装では hex 直指定（`#ECFBF6` 等）で色を定義していたが、以下の問題があった：

- 色味が気持ちよくない（デザインシステム全体の warm tone と不調和）
- おしゃれに見えない（薄すぎるティントで存在感が弱い）
- ダークモード非対応（hex 固定値のため）
- 試行錯誤の痕跡が残り、一貫性がない

## 方針

- **カラフルだけど品がある**（Notion/Stripe 的）
- **背景しっかり色付き** + **同系色の濃いテキスト**
- **ダークモードはライトの対称反転**
- **Tailwind スケール直接使用**（hex 管理不要、スケールが調和を保証）

## カラーテーブル

### Light Mode

| Variant | Background | Text | Border | Icon |
|---------|-----------|------|--------|------|
| default | `bg-background` | `text-foreground` | `border-border` | — |
| success | `bg-emerald-100` | `text-emerald-800` | `border-emerald-300` | `text-emerald-600` |
| info | `bg-blue-100` | `text-blue-800` | `border-blue-300` | `text-blue-600` |
| warning | `bg-amber-100` | `text-amber-800` | `border-amber-300` | `text-amber-600` |
| error | `bg-red-100` | `text-red-800` | `border-red-300` | `text-red-600` |

### Dark Mode（`dark:` prefix）

| Variant | Background | Text | Border | Icon |
|---------|-----------|------|--------|------|
| default | (トークン連動) | (トークン連動) | (トークン連動) | — |
| success | `bg-emerald-900` | `text-emerald-100` | `border-emerald-700` | `text-emerald-100` |
| info | `bg-blue-900` | `text-blue-100` | `border-blue-700` | `text-blue-100` |
| warning | `bg-amber-900` | `text-amber-100` | `border-amber-700` | `text-amber-100` |
| error | `bg-red-900` | `text-red-100` | `border-red-700` | `text-red-100` |

### Description テキスト

title と同じ色に `opacity-80` で差をつける。

## dark: prefix の設定

Tailwind CSS 4 はデフォルトで `dark:` を `prefers-color-scheme` メディアクエリで処理する。
このプロジェクトは `.dark` / `.light` クラスベースで切り替えるため、以下を `globals.css` に追加：

```css
@custom-variant dark (&:where(.dark, .dark *));
```

また ThemeProvider を修正し、System モード時に OS の設定を検知して `.dark` クラスを付与するようにした。
これにより `dark:` prefix がプロジェクト全体で正しく動作する。

## UX 判断

- **×ボタンを追加** — スワイプで閉じるのはモバイルネイティブの発想でデスクトップでは発見しにくい。×ボタンで「自分で消せる」コントロール感を提供。普段は `opacity-50` で控えめ、ホバーで `opacity-100`
- **閉じアニメーション** — 即削除ではなく 200ms のフェードアウトを待ってから DOM から削除。dialog と同じ感覚
- **自動消去時間は 4 秒** — 3秒だと短すぎ、5秒だと間延びする。個別に `duration` で上書き可能

## 実装方針

- `variantClasses` を Tailwind スケール + `dark:` prefix に書き換え
- `variantIcons` のアイコン色も `dark:` 対応（テキスト色と統一）
- hex 直指定を全廃止
- CSS 変数は増やさない（YAGNI）

## 却下した案

- **CSS 変数トークン化**: 12 変数増加は現規模で過剰
- **透明度ベース**: 前回試して色味が安定しなかった
- **hex 直指定の微調整**: 根本解決にならない
- **ダーク text/icon に 200〜400 レベル**: 視認性が低く、100 に統一した
- **バリアントごとの自動消去時間**: YAGNI。必要になったら duration prop で個別対応
