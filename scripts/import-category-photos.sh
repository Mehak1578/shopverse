#!/usr/bin/env bash
set -euo pipefail

SRC_DIR=${1:-}
if [[ -z "${SRC_DIR}" ]]; then
  echo "Usage: $0 <source-folder-with-photos>"
  echo "Example: $0 ~/Downloads"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="${ROOT_DIR}/client/public/images/categories"
mkdir -p "${DEST_DIR}"

CATEGORIES=(beauty books electronics fashion groceries home sports)

echo "Importing category photos from: ${SRC_DIR} -> ${DEST_DIR}"
missing=()
for key in "${CATEGORIES[@]}"; do
  src_jpg="${SRC_DIR}/${key}.jpg"
  src_jpeg="${SRC_DIR}/${key}.jpeg"
  if [[ -f "${src_jpg}" ]]; then
    cp -f "${src_jpg}" "${DEST_DIR}/${key}.jpg"
    echo "✔ Copied ${key}.jpg"
  elif [[ -f "${src_jpeg}" ]]; then
    cp -f "${src_jpeg}" "${DEST_DIR}/${key}.jpg"
    echo "✔ Copied ${key}.jpeg -> ${key}.jpg"
  else
    echo "… Missing: ${key}.(jpg|jpeg) — keeping SVG fallback"
    missing+=("${key}")
  fi

done

echo "Done. ${#missing[@]} missing categories."
if (( ${#missing[@]} > 0 )); then
  printf 'Missing list: %s\n' "${missing[@]}"
fi
