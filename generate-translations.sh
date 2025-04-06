#!/bin/bash

# List of language codes
languages=(
  "bn"  # Bengali
  "te"  # Telugu
  "mr"  # Marathi
  "ta"  # Tamil
  "gu"  # Gujarati
  "kn"  # Kannada
  "ml"  # Malayalam
  "pa"  # Punjabi
  "or"  # Odia
  "as"  # Assamese
  "ur"  # Urdu
  "sa"  # Sanskrit
  "ks"  # Kashmiri
  "sd"  # Sindhi
  "ne"  # Nepali
  "si"  # Sinhala
  "ko"  # Konkani
  "doi" # Dogri
  "mni" # Manipuri
  "sat" # Santali
  "bho" # Bhojpuri
  "mag" # Magahi
  "mai" # Maithili
)

# Create directories and copy English translation file as a template
for lang in "${languages[@]}"; do
  echo "Creating translation for $lang"
  mkdir -p "public/locales/$lang"
  cp "public/locales/en/translation.json" "public/locales/$lang/translation.json"
done

echo "Directories and template files created successfully!"
echo "Please translate the files in public/locales/<lang>/translation.json for each language." 