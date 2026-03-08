export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <p className="text-body text-muted-foreground">
        サイドバーのデモページです。左のメニューを操作してみてください。
      </p>
      <p className="text-body text-muted-foreground">
        トグルボタンでサイドバーを折りたたむと、アイコンのみのミニサイドバーに変わります。
      </p>
      <p className="text-body text-muted-foreground">
        ブラウザの幅を768px未満にすると、モバイル用のドロワーモードに切り替わります。
      </p>
    </div>
  )
}
