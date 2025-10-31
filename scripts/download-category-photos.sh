#!/usr/bin/env bash
set -euo pipefail

# Download royalty-free stock images for categories into public/images/categories
# Prefers Unsplash Source with graceful fallback to Picsum
SIZE=${1:-600x600}
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="${ROOT_DIR}/client/public/images/categories"
mkdir -p "${DEST_DIR}"

# key | query (keys must match Home.jsx categories keys)
MAP=$(cat <<'EOF'
beauty|beauty,skincare,cosmetics
books|books,library
electronics|electronics,gadgets
fashion|fashion,clothes
groceries|groceries,food,market
home|home,interior
sports|sports,fitness
EOF
)

count=0
while IFS='|' read -r key query; do
  [[ -z "$key" ]] && continue
  file="${DEST_DIR}/${key}.jpg"
  url="https://source.unsplash.com/${SIZE}/?${query}"
  echo "→ Category ${key}.jpg from ${url}"
  if ! curl -L --fail -sS -o "$file" "$url"; then
    echo "  … Unsplash failed, falling back to Picsum"
    picsum_url="https://picsum.photos/seed/${key}/${SIZE%x*}/${SIZE#*x}"
    if ! curl -L --fail -sS -o "$file" "$picsum_url"; then
      echo "  ⚠️  Failed to download ${key} — keeping existing icon if any" >&2
      continue
    fi
  fi
  echo "  ✔ Saved ${file}"
  count=$((count+1))
done <<< "$MAP"

echo "Done. Downloaded $count category images into ${DEST_DIR}."
