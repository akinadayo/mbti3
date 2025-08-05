# GitHub Pages デプロイエラーの修正手順

## 🚨 発生していた問題
- 複数の "github-pages" アーティファクトが作成されていた
- pull_requestトリガーとpushトリガーが同時実行されていた

## ✅ 実施した修正

### 1. ワークフローの修正
- `pull_request` トリガーを削除（push のみに変更）
- `cancel-in-progress: true` で競合する実行をキャンセル
- ジョブ名を `build-and-deploy` に変更
- Setup Pages の順序を最適化

### 2. 競合状態の解決
- 1つのジョブでビルドとデプロイを統合
- アーティファクトの重複作成を防止

## 🛠️ 次の手順

### 1. 変更をプッシュ
```bash
git add .github/workflows/deploy.yml
git commit -m "Fix GitHub Pages deployment workflow"
git push origin main
```

### 2. GitHub Pagesの設定確認
1. リポジトリ → Settings → Pages
2. Source: "GitHub Actions" が選択されているか確認

### 3. ワークフロー実行の確認
1. リポジトリ → Actions
2. 新しいワークフロー実行を確認
3. "build-and-deploy" ジョブが成功するか確認

### 4. デプロイ確認
- `https://yourusername.github.io/repository-name/` にアクセス
- サイトが正常に表示されるか確認

## 🔍 ログの確認ポイント

### 成功時のログ
```
✅ API key successfully injected
✅ API key pattern found in file
✅ Upload successful
✅ Deploy successful
```

### 失敗時の対処
- "OPENROUTER_API_KEY secret not found" → GitHub Secretsを設定
- "Placeholder still exists" → sed コマンドの問題
- "Multiple artifacts" → 古いワークフローの影響（修正済み）

## 🎯 期待される結果
- 1回のプッシュで1回のデプロイ実行
- APIキーの自動注入
- 重複アーティファクトなし
- 正常なGitHub Pagesデプロイ