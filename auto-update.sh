#!/bin/bash

# Auto Update Script for Queen Smiley MD

echo "🔄 Queen Smiley MD - Auto Updater"
echo "================================"
echo ""

# Check for updates
echo "📡 Checking for updates from GitHub..."
git fetch origin

# Get current and remote hashes
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✅ Bot is up to date!"
    echo "Local: ${LOCAL:0:7}"
else
    echo "🔄 Updates available!"
    echo "Local:  ${LOCAL:0:7}"
    echo "Remote: ${REMOTE:0:7}"
    echo ""
    
    # Pull changes
    echo "📥 Pulling updates..."
    git pull origin main
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install
    
    echo "✅ Update complete!"
    echo "🔄 Restart bot to apply changes"
fi
