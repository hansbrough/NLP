module.exports = {
  csslint: {
    lax: {
      options: {
        'important': true,
        'adjoining-classes': false,
        'known-properties': 2,
        'box-sizing': false,
        'box-model': false,
        'overqualified-elements': 2,
        'display-property-grouping': false,
        'bulletproof-font-face': false,
        'compatible-vendor-prefixes': true,
        'regex-selectors': true,
        'errors': 2,
        'duplicate-background-images': 2,
        'duplicate-properties': 2,
        'empty-rules': 2,
        'selector-max-approaching': false,
        'gradients': true,
        'fallback-colors': false,
        'font-sizes': true,
        'font-faces': false,
        'floats': false,
        'star-property-hack': false,
        'outline-none': false,
        'import': 2,
        'ids': false,
        'underscore-property-hack': false,
        'rules-count': false,
        'qualified-headings': false,
        'selector-max': false,
        'shorthand': 2,
        'text-indent': false,
        'unique-headings': false,
        'universal-selector': 2,
        'unqualified-attributes': 2,
        'vendor-prefix': 2,
        'zero-units': 2
      },
      src: [
        'public/css/apps/base-style.css',
        'public/css/apps/static/**/*.css',
        'public/css/apps/beta/**/*.css'
      ]
    }
  }
};
