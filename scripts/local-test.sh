#!/bin/bash

# Local Development Test Script
# This script helps test the API key injection locally

set -e

HTML_FILE="index.html"
TEST_API_KEY="sk-test-1234567890abcdef"
BACKUP_FILE="${HTML_FILE}.original"

echo "🧪 Starting local test of API key injection..."

# Create backup if it doesn't exist
if [ ! -f "$BACKUP_FILE" ]; then
    cp "$HTML_FILE" "$BACKUP_FILE"
    echo "📋 Created original backup: $BACKUP_FILE"
fi

# Test the injection script
echo "🔑 Testing API key injection with test key..."
./scripts/inject-api-key.sh "$TEST_API_KEY" "$HTML_FILE"

# Verify the test key was injected
if grep -q "$TEST_API_KEY" "$HTML_FILE"; then
    echo "✅ Test injection successful!"
else
    echo "❌ Test injection failed!"
    exit 1
fi

# Restore original file
echo "🔄 Restoring original file..."
cp "$BACKUP_FILE" "$HTML_FILE"

echo "✅ Local test completed successfully!"
echo "💡 The script is ready for GitHub Actions deployment"

# Show usage instructions
echo ""
echo "📋 Next steps:"
echo "1. Set up GitHub repository"
echo "2. Add OPENROUTER_API_KEY to repository secrets"
echo "3. Push to main branch to trigger deployment"
echo ""
echo "🔗 GitHub Secrets path:"
echo "Repository → Settings → Secrets and variables → Actions → New repository secret"