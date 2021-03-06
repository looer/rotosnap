module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'sans': 'Epilogue'
    },
    extend: {
      backgroundImage: {
        'black-fade': 'linear-gradient(0deg, rgba(0,0,0,0.26514355742296913) 0%, rgba(0,0,0,0.20351890756302526) 19%, rgba(0,0,0,0.19511554621848737) 100%)'
      },
      maxWidth: {
        '8xl': '1920px'
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accents-0': 'var(--primary)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        'accents-4': 'var(--accents-4)',
        'accents-5': 'var(--accents-5)',
        'accents-6': 'var(--accents-6)',
        'accents-7': 'var(--accents-7)',
        'accents-8': 'var(--accents-8)',
        'accents-9': 'var(--accents-9)',
        violet: 'var(--violet)',
        'violet-light': 'var(--violet-light)',
        pink: 'var(--pink)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)'
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        links: 'var(--text-links)',
      },
      boxShadow: {
        'outline-2': '0 0 0 2px var(--accents-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px'
      },
      dropShadow: {
        'h-1': '0px 2px 1px rgba(0, 0, 0, 0.16)',
        'h-2': '0px 4px 4px rgba(0, 0, 0, 0.16)',
        'h-3': '0px 0px 16px rgba(0, 0, 0, 0.08)',
      },
      lineHeight: {
        'extra-loose': '2.2'
      },
      letterSpacing: {
        widest: '0.3em'
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '1/3': '33.3%',
        '1/5': '20%',
        'full': '100%',
      }
    }
  }
};
