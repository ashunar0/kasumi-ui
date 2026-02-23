"use client";

import { useState } from "react";

/* ============================================================
   Tab system
   ============================================================ */
type Tab = "color" | "spacing";

/* ============================================================
   Gray system types & data
   ============================================================ */
type GrayColors = {
  pageBg: string;
  cardBg: string;
  border: string;
  secondaryBg: string;
  muted: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
};

type GraySystem = {
  name: string;
  description: string;
  light: GrayColors;
  dark: GrayColors;
};

const graySystems: GraySystem[] = [
  {
    name: "現状（ニュートラル）",
    description: "中間グレーが少なく、ボタンが浮きやすい",
    light: {
      pageBg: "#ffffff",
      cardBg: "#ffffff",
      border: "#e4e4e7",
      secondaryBg: "#f4f4f5",
      muted: "#71717a",
      foreground: "#0a0a0a",
      primary: "#18181b",
      primaryForeground: "#fafafa",
    },
    dark: {
      pageBg: "#09090b",
      cardBg: "#111113",
      border: "#27272a",
      secondaryBg: "#1c1c1f",
      muted: "#a1a1aa",
      foreground: "#fafafa",
      primary: "#fafafa",
      primaryForeground: "#18181b",
    },
  },
  {
    name: "ウォームグレー（めっちゃほんのり）",
    description: "言われないと気づかないレベルの暖かみ",
    light: {
      pageBg: "#fdfdfc",
      cardBg: "#ffffff",
      border: "#e6e4e1",
      secondaryBg: "#f3f2f0",
      muted: "#87847f",
      foreground: "#1c1917",
      primary: "#2c2926",
      primaryForeground: "#faf8f5",
    },
    dark: {
      pageBg: "#0f0e0d",
      cardBg: "#171615",
      border: "#2e2c2a",
      secondaryBg: "#1f1e1c",
      muted: "#a09c97",
      foreground: "#f5f3f0",
      primary: "#f5f3f0",
      primaryForeground: "#1c1917",
    },
  },
  {
    name: "ウォームグレー（ほんのり）",
    description: "ほぼ白だけど、ほんの少しだけ暖かい",
    light: {
      pageBg: "#faf9f7",
      cardBg: "#ffffff",
      border: "#e0ddd8",
      secondaryBg: "#f0eeeb",
      muted: "#868280",
      foreground: "#1c1917",
      primary: "#2c2926",
      primaryForeground: "#faf8f5",
    },
    dark: {
      pageBg: "#100f0e",
      cardBg: "#1a1918",
      border: "#322f2c",
      secondaryBg: "#221f1d",
      muted: "#9e9a95",
      foreground: "#f5f3f0",
      primary: "#f5f3f0",
      primaryForeground: "#1c1917",
    },
  },
  {
    name: "ウォームグレー（階調リッチ）",
    description: "背景にオフホワイト、ボーダーやボタンに暖かいグレー",
    light: {
      pageBg: "#f7f5f2",
      cardBg: "#ffffff",
      border: "#d6d2cd",
      secondaryBg: "#eae7e2",
      muted: "#8a8480",
      foreground: "#1c1917",
      primary: "#2c2926",
      primaryForeground: "#faf8f5",
    },
    dark: {
      pageBg: "#121110",
      cardBg: "#1d1c1a",
      border: "#37342f",
      secondaryBg: "#252320",
      muted: "#9c9790",
      foreground: "#f5f3f0",
      primary: "#f5f3f0",
      primaryForeground: "#1c1917",
    },
  },
];

/* ============================================================
   Spacing preset types & data
   ============================================================ */
type SpacingPreset = {
  name: string;
  description: string;
  sectionGap: number;
  innerGap: number;
  cardPaddingX: number;
  cardPaddingY: number;
  cardGap: number;
  buttonGap: number;
};

const spacingPresets: SpacingPreset[] = [
  {
    name: "Current",
    description: "今のmy-ui。space-y-12 / カード p-6 / gap-4",
    sectionGap: 48,
    innerGap: 16,
    cardPaddingX: 24,
    cardPaddingY: 24,
    cardGap: 16,
    buttonGap: 12,
  },
  {
    name: "Airy",
    description: "セクション間・カード内をゆったり広げる",
    sectionGap: 64,
    innerGap: 24,
    cardPaddingX: 32,
    cardPaddingY: 32,
    cardGap: 24,
    buttonGap: 16,
  },
  {
    name: "Extra Airy",
    description: "さらに広く。文字が小さい分、余白で呼吸",
    sectionGap: 80,
    innerGap: 32,
    cardPaddingX: 40,
    cardPaddingY: 36,
    cardGap: 32,
    buttonGap: 16,
  },
];

/* ============================================================
   Gray system sample component
   ============================================================ */
function GraySample({ colors, label }: { colors: GrayColors; label?: string }) {
  return (
    <div
      className="rounded-2xl p-6 space-y-6"
      style={{ backgroundColor: colors.pageBg }}
    >
      {/* Mode label */}
      {label && (
        <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: colors.muted }}>
          {label}
        </p>
      )}

      {/* Color swatches */}
      <div className="flex gap-2">
        {[
          { color: colors.pageBg, label: "背景" },
          { color: colors.cardBg, label: "カード" },
          { color: colors.secondaryBg, label: "セカンダリ" },
          { color: colors.border, label: "ボーダー" },
          { color: colors.muted, label: "muted" },
          { color: colors.foreground, label: "本文" },
          { color: colors.primary, label: "ボタン" },
        ].map((s) => (
          <div key={s.label} className="space-y-1 flex-1">
            <div
              className="h-8 rounded"
              style={{
                backgroundColor: s.color,
                border: s.color === colors.pageBg || s.color === colors.cardBg
                  ? `1px solid ${colors.border}`
                  : undefined,
              }}
            />
            <p className="text-[10px] text-center" style={{ color: colors.muted }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium"
          style={{
            backgroundColor: colors.primary,
            color: colors.primaryForeground,
          }}
        >
          保存する
        </button>
        <button
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium"
          style={{
            backgroundColor: colors.secondaryBg,
            color: colors.foreground,
            border: `1px solid ${colors.border}`,
          }}
        >
          キャンセル
        </button>
        <button
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium"
          style={{
            backgroundColor: "transparent",
            color: colors.muted,
          }}
        >
          もっと見る
        </button>
      </div>

      {/* Card */}
      <div
        className="rounded-xl"
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 1px 3px ${colors.border}40`,
        }}
      >
        <div className="flex flex-col gap-1.5 p-6">
          <h3
            className="text-base font-semibold leading-none tracking-tight"
            style={{ color: colors.foreground }}
          >
            日程を調整する
          </h3>
        </div>
        <div className="px-6 pb-4">
          <p
            className="text-sm"
            style={{ color: colors.muted, lineHeight: 1.8 }}
          >
            参加者3人の空き時間から候補を選びましょう。
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium"
            style={{
              backgroundColor: colors.primary,
              color: colors.primaryForeground,
            }}
          >
            候補を見る
          </button>
          <span
            className="text-sm font-medium"
            style={{ color: colors.foreground }}
          >
            3件の候補
          </span>
        </div>
      </div>

      {/* Inline text */}
      <p className="text-sm" style={{ color: colors.foreground, lineHeight: 1.8 }}>
        次のミーティングは
        <span className="font-semibold">来週の月曜日 10:00</span>
        からです。参加者は
        <span className="font-semibold">3名</span>
        です。
      </p>

      {/* Secondary card */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: colors.secondaryBg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <p className="text-xs font-medium" style={{ color: colors.foreground }}>
          お知らせ
        </p>
        <p className="text-xs mt-1" style={{ color: colors.muted, lineHeight: 1.6 }}>
          メンテナンスのため、明日 2:00〜4:00 の間サービスを停止します。
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Spacing sample component
   ============================================================ */
function SpacingSample({ preset }: { preset: SpacingPreset }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: preset.sectionGap }}>
      {/* Typography section */}
      <section>
        <h2
          className="font-semibold tracking-tight border-b border-border"
          style={{ fontSize: 20, paddingBottom: preset.innerGap / 2, marginBottom: preset.innerGap }}
        >
          タイポグラフィ
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: preset.innerGap }}>
          <h1 className="font-bold tracking-tight" style={{ fontSize: 29 }}>
            日程調整アプリ
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8 }}>
            日程調整アプリは、参加者全員の空き時間を自動で照合し、最適な候補日を提案します。複数のカレンダーと連携できるため、手動で調整する手間がなくなります。
          </p>
          <p className="text-muted-foreground" style={{ fontSize: 12, lineHeight: 1.6 }}>
            予定が3件あります。タップして詳細を確認してください。
          </p>
        </div>
      </section>

      {/* Buttons section */}
      <section>
        <h2
          className="font-semibold tracking-tight border-b border-border"
          style={{ fontSize: 20, paddingBottom: preset.innerGap / 2, marginBottom: preset.innerGap }}
        >
          ボタン
        </h2>
        <div className="flex flex-wrap items-center" style={{ gap: preset.buttonGap }}>
          <button className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-foreground text-background px-4 text-sm font-medium">
            保存する
          </button>
          <button className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border px-4 text-sm font-medium">
            キャンセル
          </button>
          <button className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium hover:bg-accent">
            もっと見る
          </button>
        </div>
      </section>

      {/* Cards section */}
      <section>
        <h2
          className="font-semibold tracking-tight border-b border-border"
          style={{ fontSize: 20, paddingBottom: preset.innerGap / 2, marginBottom: preset.innerGap }}
        >
          カード
        </h2>
        <div className="grid sm:grid-cols-2" style={{ gap: preset.cardGap }}>
          <div className="rounded-xl border border-border bg-background shadow-sm">
            <div
              style={{
                padding: `${preset.cardPaddingY}px ${preset.cardPaddingX}px`,
                paddingBottom: preset.cardPaddingY / 2,
              }}
            >
              <h3 className="font-semibold leading-none tracking-tight" style={{ fontSize: 16 }}>
                予定の確認
              </h3>
            </div>
            <div
              style={{
                padding: `0 ${preset.cardPaddingX}px ${preset.cardPaddingY}px`,
              }}
            >
              <p className="text-muted-foreground" style={{ fontSize: 12, lineHeight: 1.6 }}>
                来週の月曜日、10:00〜11:00にミーティングがあります。議題は第3四半期の予算について。
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background shadow-sm">
            <div
              style={{
                padding: `${preset.cardPaddingY}px ${preset.cardPaddingX}px`,
                paddingBottom: preset.cardPaddingY / 2,
              }}
            >
              <h3 className="font-semibold leading-none tracking-tight" style={{ fontSize: 16 }}>
                日程を調整する
              </h3>
            </div>
            <div
              style={{
                padding: `0 ${preset.cardPaddingX}px`,
                paddingBottom: preset.cardPaddingY / 2,
              }}
            >
              <p className="text-muted-foreground" style={{ fontSize: 12, lineHeight: 1.6 }}>
                参加者3人の空き時間から候補を選びましょう。
              </p>
            </div>
            <div
              className="flex items-center"
              style={{
                padding: `0 ${preset.cardPaddingX}px ${preset.cardPaddingY}px`,
              }}
            >
              <button className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md bg-foreground text-background px-3 text-sm font-medium">
                候補を見る
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing guide */}
      <section className="border border-dashed border-border rounded-lg p-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">スペーシング値</h3>
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div>セクション間: <span className="font-mono text-foreground">{preset.sectionGap}px</span></div>
          <div>内部gap: <span className="font-mono text-foreground">{preset.innerGap}px</span></div>
          <div>カードpadding: <span className="font-mono text-foreground">{preset.cardPaddingX}×{preset.cardPaddingY}px</span></div>
          <div>カード間: <span className="font-mono text-foreground">{preset.cardGap}px</span></div>
          <div>ボタン間: <span className="font-mono text-foreground">{preset.buttonGap}px</span></div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function ComparePage() {
  const [tab, setTab] = useState<Tab>("color");
  const [colorSelected, setColorSelected] = useState<number[]>([0, 1]);
  const [spacingSelected, setSpacingSelected] = useState<number[]>([0, 1, 2]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-8">
        <h1 className="text-h2 font-bold tracking-tight">デザイン比較</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          ウォームグレー階調の比較
        </p>
      </header>

      {/* Tab switcher */}
      <div className="mb-10 flex gap-1 border-b border-border">
        {(["color", "spacing"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors -mb-px ${
              tab === t
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "color" ? "グレー階調" : "スペーシング"}
          </button>
        ))}
      </div>

      {/* Color tab */}
      {tab === "color" && (
        <>
          <div className="mb-12 flex flex-wrap gap-2">
            {graySystems.map((system, i) => (
              <button
                key={system.name}
                onClick={() => {
                  setColorSelected((prev) =>
                    prev.includes(i)
                      ? prev.filter((x) => x !== i)
                      : prev.length < 3
                        ? [...prev, i]
                        : prev
                  );
                }}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  colorSelected.includes(i)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: system.primary,
                    border: `1px solid ${system.border}`,
                  }}
                />
                {system.name}
              </button>
            ))}
          </div>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${colorSelected.length}, 1fr)`,
            }}
          >
            {colorSelected.map((i) => (
              <div key={graySystems[i].name} className="space-y-4">
                <div className="pb-3">
                  <h2 className="text-base font-semibold">
                    {graySystems[i].name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {graySystems[i].description}
                  </p>
                </div>
                <GraySample colors={graySystems[i].light} label="Light" />
                <GraySample colors={graySystems[i].dark} label="Dark" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Spacing tab */}
      {tab === "spacing" && (
        <>
          <div className="mb-12 flex flex-wrap gap-2">
            {spacingPresets.map((preset, i) => (
              <button
                key={preset.name}
                onClick={() => {
                  setSpacingSelected((prev) =>
                    prev.includes(i)
                      ? prev.filter((x) => x !== i)
                      : prev.length < 3
                        ? [...prev, i]
                        : prev
                  );
                }}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors ${
                  spacingSelected.includes(i)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-accent"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <div
            className="grid gap-12"
            style={{
              gridTemplateColumns: `repeat(${spacingSelected.length}, 1fr)`,
            }}
          >
            {spacingSelected.map((i) => (
              <div key={spacingPresets[i].name}>
                <div className="border-b border-border pb-4 mb-8">
                  <h2 className="text-lg font-semibold">
                    {spacingPresets[i].name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {spacingPresets[i].description}
                  </p>
                </div>
                <SpacingSample preset={spacingPresets[i]} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
