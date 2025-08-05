#!/bin/bash

# API Key Injection Script for GitHub Actions
# This script replaces the placeholder in HTML with the actual API key

set -e  # Exit on any error

API_KEY="$1"
HTML_FILE="${2:-index.html}"  # デフォルトはindex.html
PLACEHOLDER="{{OPENROUTER_API_KEY}}"

echo "🔑 Starting API key injection process..."

# Validate input
if [ -z "$API_KEY" ]; then
    echo "❌ Error: API key not provided as argument"
    echo "Usage: $0 <api-key> [html-file]"
    echo "Default HTML file: index.html"
    exit 1
fi

if [ ! -f "$HTML_FILE" ]; then
    echo "❌ Error: $HTML_FILE not found in current directory"
    exit 1
fi

# Check if placeholder exists
if ! grep -q "$PLACEHOLDER" "$HTML_FILE"; then
    echo "⚠️  Warning: Placeholder '$PLACEHOLDER' not found in $HTML_FILE"
    echo "This might indicate the file was already processed or the placeholder is missing"
    exit 1
fi

# Create backup
cp "$HTML_FILE" "${HTML_FILE}.backup"
echo "📋 Created backup: ${HTML_FILE}.backup"

# Escape special characters in API key for sed
ESCAPED_API_KEY=$(echo "$API_KEY" | sed 's/[[\.*^$()+?{|]/\\&/g')

# Replace placeholder with API key
sed -i.tmp "s/$PLACEHOLDER/$ESCAPED_API_KEY/g" "$HTML_FILE"
rm "${HTML_FILE}.tmp" 2>/dev/null || true

# Verify replacement was successful
if grep -q "$PLACEHOLDER" "$HTML_FILE"; then
    echo "❌ Error: Placeholder still exists after replacement!"
    echo "Restoring backup..."
    mv "${HTML_FILE}.backup" "$HTML_FILE"
    exit 1
fi

# Verify API key was inserted correctly
if ! grep -q "$API_KEY" "$HTML_FILE"; then
    echo "❌ Error: API key not found in processed file!"
    echo "Restoring backup..."
    mv "${HTML_FILE}.backup" "$HTML_FILE"
    exit 1
fi

# Clean up backup
rm "${HTML_FILE}.backup"

echo "✅ API key successfully injected into $HTML_FILE"
echo "📊 File size: $(wc -c < "$HTML_FILE") bytes"
echo "🔍 API key location verified in HTML file"
echo "🚀 Ready for deployment!"