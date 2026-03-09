# ランディングページ v2 設計

## 概要

kasumi/ui のランディングページを shadcn/ui クローン型のミニマルデザインにフルリニューアルする。

## ターゲット

他の開発者にも見せるデザインシステムのショーケース。

## 核となるメッセージ

shadcn/ui のミニマムな美しさを、日本語でも崩さない。同じ Radix + Tailwind だから AI にも使わせやすい。

## デザインスタイル

Minimalism。余白とタイポグラフィで語る。Notion/shadcn/ui を参考。

## 構成（3セクション）

### セクション1: ヒーロー
- `kasumi/ui` タイトル（text-h1）
- キャッチコピー：日本語最適化を端的に伝える一文
- サブテキスト：Radix UI + Tailwind CSS. Open source.
- CTA: Get Started / Components
- viewport の大部分を占める、中央配置

### セクション2: Component Showcase
- Card の中にフォーム系ミニUIを組む（日程調整テーマ）
- 使用コンポーネント: Card, Label, Input, Select, Button, Separator
- 日本語テキストで埋めて行間・文字サイズの美しさを伝える
- 中央配置、max-w で幅制限
- ライト/ダークモード両対応

### セクション3: Footer
- 既存の SiteFooter をそのまま使用

## 方針
- LP専用コンポーネントは作らない
- アニメーションなし
- 既存のデザイントークン・コンポーネントのみ使用
- AI slop にならないデザイン
