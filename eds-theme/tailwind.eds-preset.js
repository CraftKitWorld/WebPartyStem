/* Tailwind preset: every colour, font, radius and size points at the theme
   variables, so Tailwind classes and EDS components share one source of truth.
   Use:  module.exports = { presets: [require('./tailwind.eds-preset.js')], content: [...] }
   Remember: EDS components keep their styles inside shadow DOM. Tailwind only
   styles the custom parts of the page (header, hero, cards, forms, footer). */
module.exports = {
  theme: {
    extend: {
      colors: {
        gray:   { 400: 'var(--en-theme-text-placeholder)' },   /* Tailwind's reset reads this for placeholders */
        white:  'rgb(var(--en-palette-white-rgb) / <alpha-value>)',
        black:  'rgb(var(--en-palette-black-rgb) / <alpha-value>)',
        ink:    'var(--en-theme-text-primary)',
        coral:  'var(--en-theme-action-primary-bg)',
        tint:   'var(--en-theme-surface-tint)',
        rule:   'var(--en-theme-border-accent)',
        muted:  'var(--en-theme-text-secondary)',
        paper:  'var(--en-theme-surface-subtle)',
        success:'var(--en-theme-text-success)',
        danger: 'var(--en-theme-text-danger)',
        hero:   'var(--en-theme-surface-hero)',
        overlay:'var(--en-theme-overlay-hero)',
        'ink-hover':   'var(--en-theme-action-inverse-hover)',
        charcoal:      'var(--en-theme-hover-on-inverse)',
        'inverse-muted':'var(--en-theme-text-inverse-muted)',
        placeholder:   'var(--en-theme-text-placeholder)'
      },
      fontFamily: {
        display: ['var(--en-theme-font-display)'],
        body:    ['var(--en-theme-font-body)']
      },
      letterSpacing: { display: 'var(--en-theme-display-tracking)' },
      maxWidth: { wrap: 'var(--en-theme-container-max)' },
      ringColor: { DEFAULT: 'var(--en-theme-focus-ring)' },
      ringOffsetColor: { DEFAULT: 'var(--en-palette-white)' },
      borderColor: { DEFAULT: 'var(--en-theme-border-default)' },
      borderRadius: { DEFAULT: 'var(--en-theme-radius-control)', pill: 'var(--en-theme-radius-pill)' }
    }
  }
};
