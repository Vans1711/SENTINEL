# Multi-Language Support in Sentinel: Deshbhakt Seva

The Sentinel platform provides comprehensive support for multiple Indian languages to ensure accessibility for martyr families across all regions of India.

## Supported Languages

The platform currently supports the following languages:

| Language | Code | Status |
|----------|------|--------|
| English | en | Complete |
| Hindi (हिन्दी) | hi | Complete |
| Bengali (বাংলা) | bn | Template Ready |
| Telugu (తెలుగు) | te | Template Ready |
| Marathi (मराठी) | mr | Template Ready |
| Tamil (தமிழ்) | ta | Template Ready |
| Gujarati (ગુજરાતી) | gu | Template Ready |
| Kannada (ಕನ್ನಡ) | kn | Template Ready |
| Malayalam (മലയാളം) | ml | Template Ready |
| Punjabi (ਪੰਜਾਬੀ) | pa | Template Ready |
| Odia (ଓଡ଼ିଆ) | or | Template Ready |
| Assamese (অসমীয়া) | as | Template Ready |
| Urdu (اردو) | ur | Template Ready |
| Sanskrit (संस्कृतम्) | sa | Template Ready |
| Kashmiri (कॉशुर) | ks | Template Ready |
| Sindhi (سنڌي) | sd | Template Ready |
| Nepali (नेपाली) | ne | Template Ready |
| Sinhala (සිංහල) | si | Template Ready |
| Konkani (कोंकणी) | ko | Template Ready |
| Dogri (डोगरी) | doi | Template Ready |
| Manipuri (মণিপুরী) | mni | Template Ready |
| Santali (ᱥᱟᱱᱛᱟᱞᱤ) | sat | Template Ready |
| Bhojpuri (भोजपुरी) | bho | Template Ready |
| Magahi (मगही) | mag | Template Ready |
| Maithili (मैथिली) | mai | Template Ready |

## Implementation Details

The language system in Sentinel: Deshbhakt Seva is implemented using:

- **react-i18next**: Core internationalization framework for React applications
- **i18next**: The base i18n framework
- **i18next-browser-languagedetector**: Automatically detects user language preferences
- **i18next-http-backend**: Loads translations from the server

## How to Switch Languages

Users can switch between languages using the Language Selector component found in the navigation bar:

1. On desktop, the language selector appears in the top-right corner of the navigation bar
2. On mobile, the language selector is available in the mobile menu

## Supporting Right-to-Left (RTL) Languages

For languages that are read right-to-left (like Urdu and Sindhi), the application automatically applies the appropriate directional settings to ensure proper text display.

## Adding New Translations

To add or modify translations for any language:

1. Navigate to the translation file at `public/locales/<language-code>/translation.json`
2. Edit the JSON file, translating each string to the target language
3. Save the file
4. The changes will be automatically loaded when the language is selected

## Translation Guidelines

When translating content:

1. Maintain the same JSON structure and keys as the English version
2. Ensure translations are culturally appropriate and contextually accurate
3. Pay special attention to military and administrative terminology
4. Consider local dialects and regional variations
5. Test the translations in the application to ensure proper display

## Language Detection

The application attempts to automatically detect the user's preferred language based on:

1. URL query parameters
2. Browser cookies
3. localStorage settings
4. Browser language settings
5. HTML language attribute

If a detected language is not supported, the application defaults to English.

## Technical Implementation

The language system is implemented through:

- `src/lib/i18n.ts`: Configuration for i18next
- `src/contexts/LanguageContext.tsx`: React context for managing language throughout the application
- `src/components/LanguageSelector.tsx`: UI component for switching languages

## Feedback and Contributions

We welcome feedback on our translations and contributions to improve language support. If you notice any translation issues or have suggestions for improvements, please report them through the platform's feedback mechanism. 