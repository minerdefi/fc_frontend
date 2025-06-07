#!/bin/bash

# Batch script to update all remaining hardcoded API URLs
# This will be used to update multiple files at once

echo "Updating hardcoded API URLs to use environment variables..."

# Files to update with their hardcoded URLs
declare -A files_to_update=(
    ["src/app/reset-password/page.tsx"]="/auth/reset-password/"
    ["src/app/forgot-password/page.tsx"]="/auth/forgot-password/"
    ["src/app/dashboard/transactions/page.tsx"]="/auth/transactions/"
    ["src/app/dashboard/settings/change-password/page.tsx"]="/auth/change-password/"
    ["src/app/dashboard/settings/transaction-pin/page.tsx"]="/auth/transaction-pin/"
    ["src/app/dashboard/settings/page.tsx"]="/auth/profile/update/"
    ["src/app/dashboard/page.tsx"]="/auth/earnings-history/ and /auth/recent-activity/"
    ["src/app/dashboard/deposit/page.tsx"]="/auth/wallets/"
    ["src/app/contact/components/ContactForm.tsx"]="/api/contact/submit/"
    ["src/app/api/auth/[...nextauth]/route.ts"]="/auth/login/"
    ["src/app/api/auth/auth.config.ts"]="/api/auth/login"
)

echo "Files identified for update:"
for file in "${!files_to_update[@]}"; do
    echo "  - $file: ${files_to_update[$file]}"
done

echo "Manual update required for each file..."
