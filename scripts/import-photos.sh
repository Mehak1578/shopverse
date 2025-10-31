#!/usr/bin/env bash
set -euo pipefail

SRC_DIR=${1:-}
if [[ -z "${SRC_DIR}" ]]; then
  echo "Usage: $0 <source-folder-with-photos>"
  echo "Example: $0 ~/Downloads/shopverse-photos"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="${ROOT_DIR}/client/public/images/products"

mkdir -p "${DEST_DIR}"

# Expected product base names (add more here if you add products)
PRODUCTS=(
  denim-jacket leather-boots chinos sneakers
  headphones smartwatch earbuds fitness-band
  mixed-nuts sourdough almonds sandwich-bread
  dinner-set throw-pillow bowl-set cushion-covers
  js-book midnight-library clean-code design-patterns
  yoga-mat dumbbells foam-roller kettlebell
  face-serum clay-mask aloe-gel charcoal-mask
)

echo "Importing photos from: ${SRC_DIR} -> ${DEST_DIR}"
missing=()
for name in "${PRODUCTS[@]}"; do
  src_jpg="${SRC_DIR}/${name}.jpg"
  src_jpeg="${SRC_DIR}/${name}.jpeg"
  if [[ -f "${src_jpg}" ]]; then
    cp -f "${src_jpg}" "${DEST_DIR}/${name}.jpg"
    echo "✔ Copied ${name}.jpg"
  elif [[ -f "${src_jpeg}" ]]; then
    cp -f "${src_jpeg}" "${DEST_DIR}/${name}.jpg"
    echo "✔ Copied ${name}.jpeg -> ${name}.jpg"
  else
    echo "… Missing: ${name}.(jpg|jpeg) — keeping SVG fallback"
    missing+=("${name}")
  fi
done

echo "Done. ${#missing[@]} missing images."
if (( ${#missing[@]} > 0 )); then
  printf 'Missing list: %s\n' "${missing[@]}"
fi

echo "Open a couple to verify (or hard refresh the app Ctrl+Shift+R):"
echo "  http://localhost:5173/images/products/denim-jacket.jpg"
echo "  http://localhost:5173/images/products/earbuds.jpg"
