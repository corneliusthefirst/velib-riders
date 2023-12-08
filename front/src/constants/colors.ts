const Fonts = {
  font16Medium: {
    fontSize: 16,
    fontFamily: 'Montserrat_Medium',
  },

  font16SemiBold: {
    fontSize: 16,
    fontFamily: 'Montserrat_SemiBold',
  },

  font16Bold: {
    fontSize: 16,
    fontFamily: 'Montserrat_Bold',
  },
};

const Colors = {
  primary: '#19A72A',
  white: 'white',
  black: 'black',
  blackOpacity: 'rgba(0,0,0,0.9)',
  readonly: '#000000',
  gray: '#cccccc',
  lightGray: '#f2f2f2',
  darkBlue: '#172023',
  darkGray: '#C4C4C4',
  blue: '#3b5998',
  errorColor: '#ff0900',
  textInputColor: '#000000',
  darkGreen: '#008000',
  linearGradientGreenBlack: {
    colors: ['rgba(0,0,0,0.9)', '#008000', '#000000'],
    start: [0.5, 0.7],
    end: [1, 0],
  },
  linearGradientBlack: {
    colors: ['rgba(0,0,0,0.9)', '#304030', '#000000'],
    start: [0.5, 0.7],
    end: [1, 0],
  },
  linearGradientButton: {
    colors: ['#008000', '#000000'],
    start: [0.5, 0.7],
    end: [1, 0],
  },
};

export {Colors, Fonts};
