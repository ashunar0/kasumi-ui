# Dialog コンポーネント設計

## 概要

Radix UI (`@radix-ui/react-dialog`) をヘッドレスプリミティブとして使用し、見た目は自前のデザイントークンで制御する Dialog コンポーネント。Select と同じラッパーパターンに従う。

## パーツ構成（8パーツ）

| パーツ | Radix ラップ元 | 役割 |
|--------|---------------|------|
| `Dialog` | `Dialog.Root` | 開閉状態管理 |
| `DialogTrigger` | `Dialog.Trigger` | 開くトリガー |
| `DialogContent` | `Dialog.Portal` + `Dialog.Overlay` + `Dialog.Content` | オーバーレイ + コンテンツ本体 + × ボタン |
| `DialogHeader` | なし（`<div>`） | タイトル・説明のレイアウト |
| `DialogTitle` | `Dialog.Title` | ダイアログタイトル（a11y 必須） |
| `DialogDescription` | `Dialog.Description` | 補足説明テキスト |
| `DialogFooter` | なし（`<div>`） | アクションボタン群のレイアウト |
| `DialogClose` | `Dialog.Close` | 閉じるアクション |

## ビジュアル

- **オーバーレイ**: `bg-black/50` + `backdrop-blur-sm`
- **コンテンツ**: `bg-background` + `border` + `shadow-lg` + `rounded-xl`、`max-w-lg`、画面中央配置
- **× ボタン**: 右上に lucide-react `X` アイコン、`text-muted-foreground` → hover で `text-foreground`
- **Header**: `flex flex-col gap-1.5`、左寄せ
- **Title**: `text-lg font-semibold`
- **Description**: `text-sm text-muted-foreground`
- **Footer**: `flex justify-end gap-2`、右寄せ

## アニメーション

Select と同じ `animate-in` / `animate-out` パターン（Tailwind CSS）:

- **オーバーレイ**: `fade-in-0` / `fade-out-0`
- **コンテンツ**: `fade-in-0 zoom-in-95` / `fade-out-0 zoom-out-95`
- Radix の `data-[state=open]` / `data-[state=closed]` で制御

## 使用例

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>予定を削除</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>本当に削除しますか？</DialogTitle>
      <DialogDescription>
        この操作は取り消せません。予定に関するデータはすべて削除されます。
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">キャンセル</Button>
      </DialogClose>
      <Button variant="destructive">削除する</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 設計判断

- **× ボタンは自動表示** — DialogContent に常に含める。パスワードトグルと同じ「便利なデフォルト」パターン
- **DialogHeader / DialogFooter はレイアウト用 div** — Radix にない純粋なレイアウトコンポーネント。className で上書き可能
- **backdrop-blur-sm** — 背景をぼかして奥行きを出す。パフォーマンスに問題があれば削除
