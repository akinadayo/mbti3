# GitHub Secrets デバッグガイド

## 🔍 設定確認チェックリスト

### 1. GitHub Secretsの確認

1. あなたのリポジトリ → **Settings**
2. 左サイドバー → **Secrets and variables** → **Actions**
3. Repository secrets の一覧で `OPENROUTER_API_KEY` が存在するか確認

### 2. Secret の名前確認

- ❌ 間違い: `OPENROUTER_APIKEY`, `OpenRouter_API_KEY`, `openrouter_api_key`
- ✅ 正しい: `OPENROUTER_API_KEY` （正確にこの通り）

### 3. APIキーの形式確認

- ✅ 正しい形式: `sk-or-v1-` で始まる長い文字列
- ❌ 間違い: ユーザー名、パスワード、アカウントID

### 4. GitHub Actions ログの確認

1. リポジトリ → **Actions** タブ
2. 最新のワークフロー実行をクリック
3. **Inject API key into HTML** ジョブをクリック
4. ログを確認:

```
🔍 Before injection:
✅ After injection:
✅ API key successfully injected
✅ API key pattern found in file
```

## 🛠️ トラブルシューティング

### エラー1: "OPENROUTER_API_KEY secret not found!"
→ GitHub Secretsが設定されていません

### エラー2: "Placeholder still exists!"
→ APIキーの置換に失敗しています

### エラー3: "Expected API key pattern not found"
→ APIキーの形式が正しくない可能性があります

## 🔧 手動確認方法

```bash
# ローカルでテスト（デバッグ用）
echo "テスト用APIキー: sk-test-1234567890"
sed 's/{{OPENROUTER_API_KEY}}/sk-test-1234567890/g' index.html > test.html
grep -n "sk-test-" test.html
```

## 📞 サポート情報

1. **OpenRouter APIキー取得**: https://openrouter.ai/
2. **GitHub Secrets ドキュメント**: https://docs.github.com/en/actions/security-guides/encrypted-secrets
3. **GitHub Actions ログ**: リポジトリ → Actions タブ