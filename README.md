# Gappy Studio — Landing Page

Inbound Luxury, Amplified. — Japan to Global.

ラグジュアリーブランド向け・インバウンドSNSマーケティングエージェンシー「Gappy Studio」の公式ランディングページ。**Vanilla HTML / CSS / JavaScript** のみで実装した、フレームワーク不要の高品質静的サイトです。

---

## 🚀 起動方法

### 最小構成（Python が入っていれば）

```bash
# プロジェクトルートで
python3 -m http.server 8080
```

ブラウザで <http://localhost:8080> を開きます。

### Node.js を使う場合

```bash
npx serve .
# または
npx http-server . -p 8080
```

### VS Code を使う場合

Live Server 拡張機能で `index.html` を Go Live するだけで動作します。

> **注意**: `file://` で直接開いても表示はされますが、一部ブラウザでフォントの CORS や `backdrop-filter` が制限される場合があるため、必ずローカルサーバ経由で確認してください。

---

## 🖼 画像の差し込み手順

`Gappy_Studio.zip` には 7 枚の参考画像が同梱されています。以下のように `assets/images/` に配置してください（リポジトリには既に配置済み）。

| 元ファイル | リネーム後 | 用途 |
| --- | --- | --- |
| `1.png` | `hero.png` | Section 1 / Hero |
| `2.png` | `global-reach.png` | Section 4 / Global Reach |
| `3.png` | `community.png` | Section 5 / Community |
| `4.png` | `team.png` | Section 8 / Team |
| `5.png` | `impact.png` | Section 2 / Numbers |
| `6.png` | `services.png` | Section 3 / Services（参考のみ） |
| `7.png` | `footer.png` | Section 11 / Footer |

差し替えるときは同名で上書きするだけで反映されます。**画像が無くてもレイアウトは破綻しません** — `img-frame` に黒のプレースホルダー背景を当てています。

---

## 📁 ファイル構成

```
gappy-studio-lp/
├── index.html
├── styles/
│   ├── main.css            # @import 統合エントリ
│   ├── tokens.css          # CSS 変数（デザイントークン）
│   ├── reset.css           # モダンリセット
│   ├── typography.css      # フォント・タイポ階層
│   ├── components.css      # 再利用コンポーネント
│   └── sections.css        # 各セクション固有
├── scripts/
│   ├── main.js             # ヘッダー / モバイルメニュー / 言語切替
│   ├── scroll-animation.js # IntersectionObserver による reveal
│   ├── smooth-scroll.js    # アンカーリンクの滑らかスクロール
│   └── count-up.js         # 数字のカウントアップ
├── assets/
│   └── images/
│       ├── hero.png
│       ├── impact.png
│       ├── services.png
│       ├── global-reach.png
│       ├── community.png
│       ├── team.png
│       └── footer.png
└── README.md
```

---

## 🎨 カスタマイズポイント

すべての色・スペーシング・タイポはデザイントークン化されています。`styles/tokens.css` の CSS 変数を書き換えるだけでブランドルックを変更できます。

### 色

```css
:root {
  --color-bg-primary: #0A0A0A;
  --color-accent-gold: #C9A84C;        /* メイン金色 */
  --color-accent-gold-bright: #D4B560; /* 明るい強調色 */
  --color-text-primary: #F5F0E8;       /* メインテキスト */
}
```

### フォント

```css
:root {
  --font-mincho: "Noto Serif JP", ...;
  --font-cormorant: "Cormorant Garamond", ...;
  --font-gothic: "Noto Sans JP", ...;
  --font-inter: "Inter", ...;
}
```

### スペーシング

8 の倍数ベース（`--space-1` = 8px から `--space-10` = 200px）。`--section-padding-y` は `clamp()` で自動的にレスポンシブ。

---

## 🧩 セクション構成（全 11 セクション）

| # | ID | 内容 |
| --- | --- | --- |
| 0 | `site-header` | 固定ナビゲーション（スクロール検知でグラスモーフィズム化） |
| 1 | `hero` | ヒーロー（プリズム光跡・スクロールヒント） |
| 2 | `impact` | 4 つの実績数字（カウントアップ） |
| 3 | `services` | 4 つのサービスカラム |
| 4 | `global` | 世界地図ノード（パルスアニメ） |
| 5 | `community` | 和空間 + チャット UI モック |
| 6 | `cases` | 3 つの導入事例カード（手作業風 tilt） |
| 7 | `why` | 6 セル kumiko 格子レイアウト |
| 8 | `team` | チームビジュアル + 統計カード |
| 9 | `pricing` | 3 プラン（中央 PRESTIGE が常時 pulse） |
| 10 | `cta-final` | 最終 CTA グラスパネル |
| 11 | `site-footer` | ナビ + ソーシャル + 法務・言語 |

---

## ✨ 主なインタラクション

- **スクロール reveal**: `IntersectionObserver` で fade-up（`ease-out-expo`、1100ms）
- **カウントアップ**: 数字が 0 から目標値まで `ease-out-expo` で加速
- **ヘッダー変化**: 100px 超えで `backdrop-filter: blur(20px)` 適用
- **パララックス**: Team 画像が縦方向に微小移動
- **アンビエントアニメ**: Hero グロー回転、Pricing 中央カードの pulse、Global node の pulse
- **チャットバブル順次出現**: 200ms / 500ms / 800ms ディレイ
- **ホバー**: カードリフト + ゴールドボーダー強化、ナビアンダーライン
- **`prefers-reduced-motion`**: 全アニメーションを無効化

---

## 🌐 ブラウザサポート

- Chrome / Edge: 最新 2 バージョン
- Safari: 最新 2 バージョン（`backdrop-filter` 必須）
- Firefox: 最新 2 バージョン
- Mobile Safari (iOS 15+) / Chrome Android: フルサポート

IE11 はサポート対象外（`backdrop-filter`, `aspect-ratio`, `clamp()`, CSS Custom Properties 等を多用）。

---

## ♿ アクセシビリティ

- カラーコントラスト: WCAG AA 準拠
- セマンティック HTML5（`<header>` / `<main>` / `<section>` / `<article>` / `<footer>`）
- 適切な見出し階層
- フォーカス可視化（ゴールドアウトライン、`outline-offset: 4px`）
- `aria-label` / `aria-pressed` / `aria-expanded` / `aria-hidden` を要所で使用
- スキップリンク（`.sr-only` でアクセス時のみ表示）
- `prefers-reduced-motion` 尊重

---

## 📐 デザイン哲学

> 「Aman Resorts × Linear × Hermès」

- **マットな金箔感**（メタリック・テカテカは禁止）
- **明朝体の余白**で品格を出す
- **8 の倍数グリッド**で全要素を整列
- **角丸は最小限**（最大 16px、多くは 4-8px）
- **ジェネリック SaaS テンプレ感は徹底排除**

---

© 2025 Gappy Studio Inc.
