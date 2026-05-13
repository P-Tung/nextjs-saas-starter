#!/bin/bash

# Configuration
TEMPLATE_REPO="https://github.com/P-Tung/nextjs-saas-starter.git"
REMOTE_NAME="template"

echo "🚀 Starting template update..."

# Check if the remote already exists
if ! git remote | grep -q "$REMOTE_NAME"; then
    echo "📦 Adding template remote: $TEMPLATE_REPO"
    git remote add $REMOTE_NAME $TEMPLATE_REPO
fi

# Fetch updates
echo "📡 Fetching updates from template..."
git fetch $REMOTE_NAME

# Merge changes
echo "🔄 Merging updates into main..."
echo "⚠️  Note: You may need to resolve merge conflicts."
git merge $REMOTE_NAME/main --allow-unrelated-histories

echo "✅ Update process complete!"
echo "Please review any conflicts and run 'pnpm install' to update dependencies."
