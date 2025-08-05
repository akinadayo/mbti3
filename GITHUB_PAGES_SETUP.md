# GitHub Pages デプロイ手順（HTMLファイル直接注入方式）

## 🚀 自動デプロイ方式（推奨）

### 概要
GitHub ActionsがHTMLファイルに直接APIキーを注入してデプロイします。ユーザーは何も設定する必要がありません。

### セットアップ手順

1. **OpenRouter APIキーを取得**
   - [OpenRouter](https://openrouter.ai/) でアカウント作成
   - APIキーを生成（例: `sk-or-v1-...`）

2. **GitHubリポジトリを作成**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
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
   - Settings → Pages
   - Source: "GitHub Actions" を選択

5. **自動デプロイ**
   - mainブランチにプッシュすると自動デプロイ開始
   - GitHub ActionsがAPIキーをHTMLに注入
   - 完了後、サイトが利用可能

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

## 🔧 技術詳細

### APIキー注入の仕組み
1. **プレースホルダー方式**: HTMLファイルに `{{OPENROUTER_API_KEY}}` プレースホルダーを配置
2. **GitHub Actions処理**: デプロイ時にプレースホルダーを実際のAPIキーに置換
3. **自動検証**: 置換が正しく行われたかを自動チェック
4. **セキュアな処理**: APIキーは一時的にメモリ上でのみ使用

### ファイル構成
```
.github/workflows/deploy.yml    # GitHub Actionsワークフロー
scripts/inject-api-key.sh      # APIキー注入スクリプト
scripts/local-test.sh          # ローカルテスト用スクリプト
mbti3.html                     # メインアプリケーション（プレースホルダー付き）
```

### ローカルテスト
```bash
# APIキー注入のテスト
./scripts/local-test.sh
```

## セキュリティ上の注意

⚠️ **重要**: 
- デプロイされたHTMLファイルにはAPIキーが含まれます
- 個人利用または信頼できるユーザーのみでの使用を推奨
- 本格的な商用利用では、サーバーサイドAPIの実装を検討してください
- OpenRouterでAPIキーの使用制限を設定することを推奨

## トラブルシューティング

### APIキーエラーが出る場合
1. ブラウザのコンソールでエラーを確認
2. localStorage にAPIキーが設定されているか確認：
   ```javascript
   console.log(localStorage.getItem('OPENROUTER_API_KEY'));
   ```
3. APIキーが正しいか OpenRouter で確認