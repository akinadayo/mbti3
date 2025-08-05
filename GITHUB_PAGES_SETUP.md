# GitHub Pages デプロイ手順

## 方法1: 個人利用（推奨）

### セットアップ手順

1. **GitHubリポジトリを作成**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mbti-team-analyzer.git
   git push -u origin main
   ```

2. **GitHub Pages を有効化**
   - GitHubリポジトリページで Settings → Pages
   - Source を "Deploy from a branch" に設定
   - Branch を "main" に設定
   - Save をクリック

3. **APIキーの設定**
   - デプロイ後、`https://yourusername.github.io/mbti-team-analyzer/` にアクセス
   - ブラウザの開発者ツールでコンソールを開く
   - 以下のコードを実行してAPIキーを設定：
   ```javascript
   localStorage.setItem('OPENROUTER_API_KEY', 'your-actual-api-key-here');
   ```

## 方法2: セキュアな環境変数使用（上級者向け）

### GitHub Actions を使用した自動デプロイ

1. **Secrets の設定**
   - リポジトリ Settings → Secrets and variables → Actions
   - New repository secret をクリック
   - Name: `OPENROUTER_API_KEY`
   - Secret: 実際のAPIキー

2. **GitHub Actions ワークフロー作成**
   `.github/workflows/deploy.yml` を作成

3. **ビルドプロセスでAPIキー注入**
   - 環境変数からAPIキーを読み取り
   - HTMLファイルに動的に注入

## 方法3: 外部サービス連携

### Netlify Functions または Vercel API Routes を使用
- サーバーサイドでAPIキーを管理
- フロントエンドからプロキシ経由でアクセス

## セキュリティ上の注意

⚠️ **重要**: GitHub Pagesは静的サイトホスティングのため、APIキーがブラウザで見える可能性があります。

- 個人使用に留める
- APIキーに適切な制限を設ける
- 本格運用時はサーバーサイド実装を検討

## トラブルシューティング

### APIキーエラーが出る場合
1. ブラウザのコンソールでエラーを確認
2. localStorage にAPIキーが設定されているか確認：
   ```javascript
   console.log(localStorage.getItem('OPENROUTER_API_KEY'));
   ```
3. APIキーが正しいか OpenRouter で確認