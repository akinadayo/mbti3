# MBTI Team Dynamics Visualizer

チームのMBTI構成を分析し、視覚的に表示するWebアプリケーションです。

## セットアップ

### ローカル開発環境

#### 1. APIキーの設定

1. `config.example.js` を `config.js` にコピーします：
   ```bash
   cp config.example.js config.js
   ```

2. `config.js` を開いて、OpenRouter APIキーを設定します：
   ```javascript
   const API_CONFIG = {
       OPENROUTER_API_KEY: "your-actual-api-key-here"
   };
   ```

### 2. OpenRouter APIキーの取得

1. [OpenRouter](https://openrouter.ai/) にアクセス
2. アカウントを作成/ログイン
3. APIキーを生成
4. 上記の手順で `config.js` に設定

### 3. 使用方法

1. `index.html` をブラウザで開く
2. チームメンバーの情報を入力：
   - 名前
   - MBTIタイプ
   - 役職/偉さ（1-5）
   - 写真URL（オプション）
3. 「🚀 チームを分析」ボタンをクリック
4. 結果を確認：
   - チームダイナミクスグラフ
   - レーダーチャート
   - 詳細分析

## 機能

- **インタラクティブなチームグラフ**: メンバー間の関係性を視覚化
- **レーダーチャート**: チーム能力を5つの軸で評価
- **AI分析**: 具体的なメンバー名を使った詳細分析
- **レスポンシブデザイン**: デスクトップ・タブレット・スマホ対応

### GitHub Pages デプロイ（推奨）

#### 🚀 自動デプロイ手順

1. **OpenRouter APIキーを取得**
   - [OpenRouter](https://openrouter.ai/) でアカウント作成
   - APIキーを生成

2. **GitHubリポジトリを作成・プッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mbti-team-analyzer.git
   git push -u origin main
   ```

3. **GitHub Secrets を設定**
   - リポジトリ → Settings → Secrets and variables → Actions
   - New repository secret をクリック
   - Name: `OPENROUTER_API_KEY`
   - Secret: 取得したAPIキーを貼り付け
   - Add secret をクリック

4. **GitHub Pages を有効化**
   - Settings → Pages → Source: "GitHub Actions"

5. **自動デプロイ完了**
   - GitHub ActionsがAPIキーを自動注入してデプロイ
   - `https://yourusername.github.io/mbti-team-analyzer/` でアクセス可能

## セキュリティ

- `config.js` は `.gitignore` に含まれており、Gitリポジトリにコミットされません
- APIキーは設定ファイルまたはlocalStorageから分離管理
- GitHub Pages使用時はlocalStorageでAPIキーを管理
- 本番環境では適切な環境変数管理を推奨します

## 注意事項

- このアプリはクライアントサイドで動作するため、APIキーがブラウザで見える可能性があります
- 本格的な運用では、サーバーサイドでAPIキーを管理することを推奨します
- AIによる分析結果は参考程度にご利用ください