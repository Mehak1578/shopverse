#!/usr/bin/env bash
set -euo pipefail

# Download royalty-free stock images for all products into public/images/products
# Uses Unsplash Source (https://source.unsplash.com) which serves images under the Unsplash License.
# No API key required. Images are random per query; re-run to refresh.

SIZE=${1:-800x800}
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="${ROOT_DIR}/client/public/images/products"
mkdir -p "${DEST_DIR}"

# name | query
MAP=$(cat <<'EOF'
denim-jacket|denim,jacket
leather-boots|leather,boots
chinos|chinos,pants
sneakers|sneakers,shoes
headphones|headphones
smartwatch|smartwatch,watch
earbuds|earbuds
fitness-band|fitness,band,tracker
mixed-nuts|mixed,nuts
sourdough|sourdough,bread
almonds|almonds,nuts
sandwich-bread|sandwich,bread,loaf
dinner-set|dinnerware,plates
throw-pillow|throw,pillow,cushion
bowl-set|bowls,ceramic
cushion-covers|cushion,covers,home
js-book|javascript,book,code
midnight-library|novel,books,library
clean-code|programming,book
design-patterns|design,patterns,book
yoga-mat|yoga,mat
dumbbells|dumbbells,weights,gym
foam-roller|foam,roller,fitness
kettlebell|kettlebell,gym
face-serum|face,serum,skincare,bottle
clay-mask|clay,mask,skincare,jar
aloe-gel|aloe,gel,skincare
charcoal-mask|charcoal,mask,skincare
EOF
)

count=0
while IFS='|' read -r name query; do
  [[ -z "$name" ]] && continue
  outfile="${DEST_DIR}/${name}.jpg"
  url="https://source.unsplash.com/${SIZE}/?${query}"
  echo "→ Downloading ${name}.jpg from ${url}"
  # -L follow redirects; --fail to error on HTTP >=400; -sS quiet but show errors
  if ! curl -L --fail -sS -o "$outfile" "$url"; then
    echo "  … Unsplash failed, falling back to Picsum"
    picsum_url="https://picsum.photos/seed/${name}/${SIZE%x*}/${SIZE#*x}"
    if ! curl -L --fail -sS -o "$outfile" "$picsum_url"; then
      echo "  ⚠️  Failed to download ${name} — keeping existing image if any" >&2
      continue
    fi
  fi
  count=$((count+1))
  echo "  ✔ Saved ${outfile}"
done <<< "$MAP"

echo "Done. Downloaded $count images into ${DEST_DIR}."
echo "Hard refresh the app (Ctrl+Shift+R) to see changes."
