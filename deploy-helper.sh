#!/bin/bash

# Deployment Helper Script
# Run this after deploying to Render to update environment variables

echo "🚀 FG Premium - Render Deployment Helper"
echo "========================================"

# Get the Render app URL from user
read -p "Enter your Render app URL (e.g., https://your-app-name.onrender.com): " RENDER_URL

if [ -z "$RENDER_URL" ]; then
    echo "❌ Error: Render URL is required"
    exit 1
fi

# Remove trailing slash if present
RENDER_URL=${RENDER_URL%/}

echo "📝 Updating frontend environment variables..."

# Update .env.local in frontend
cd c:/lets_see/fc_fullstack/fc_frontend
sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=$RENDER_URL|" .env.local

echo "✅ Updated .env.local with: $RENDER_URL"

echo ""
echo "📋 Next steps:"
echo "1. Update your Netlify environment variables:"
echo "   - NEXT_PUBLIC_API_URL = $RENDER_URL"
echo ""
echo "2. Update backend CORS settings:"
echo "   - Add your actual frontend domain to CORS_ALLOWED_ORIGINS"
echo ""
echo "3. Redeploy frontend to Netlify"
echo ""
echo "🎉 Migration setup complete!"
