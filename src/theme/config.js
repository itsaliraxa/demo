import { extendTheme } from 'native-base'

export default extendTheme({
  colors: {
    primary: {
      50: '#ddf4ff',
      100: '#aeddff',
      200: '#7ec4ff',
      300: '#4dadfd',
      400: '#1e95fb',
      500: '#047ce1',
      600: '#0060b0',
      700: '#00457f',
      800: '#00294f',
      900: '#000f20'
    }
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          fontWeight: 500
        }
      },
      sizes: {
        md: {
          _text: {
            fontSize: 'md'
          }
        },
        lg: {
          px: '6',
          py: '3',
          _text: {
            fontSize: 'lg'
          }
        }
      },
      variants: {
        link: {
          _text: {
            fontWeight: 'light'
          }
        }
      }
    },
    Text:{
      defaultProps: {
        fontSize: 'md',
      },
    },
    Input: {
      baseStyle: {
        px: 6,
        py: 4
      },
      defaultProps: {
        size: 'md',
        variant: 'filled'
      },
      variants: {
        filled: {
          _light: {
            bg: 'white',
            placeholderTextColor: 'gray.500'
          }
        }
      }
    },
    ModalBody: {
      baseStyle: {
        p: 6,
        pt: 2
      }
    },
    ModalContent: {
      baseStyle: {
        rounded: '2xl',
        shadow: 'none'
      }
    },
    ModalHeader: {
      baseStyle: {
        _text: {
          fontWeight: 'normal',
          fontSize: 'xl'
        },
        borderBottomWidth: 0,
        p: 6,
        pb: 2
      }
    },
    Radio: {
      baseStyle: {
        _text: {
          color: 'gray.600'
        }
      }
    },
    TextArea: {
      baseStyle: {
        h: 40
      },
      defaultProps: {
        size: 'md',
        variant: 'filled'
      }
    }
  },
  fontConfig: {
    Montserrat: {
      100: {
        normal: 'Montserrat_300Light',
        italic: 'Montserrat_300Light_Italic'
      },
      200: {
        normal: 'Montserrat_300Light',
        italic: 'Montserrat_300Light_Italic'
      },
      300: {
        normal: 'Montserrat_300Light',
        italic: 'Montserrat_300Light_Italic'
      },
      400: {
        normal: 'Montserrat_400Regular',
        italic: 'Montserrat_400Regular_Italic'
      },
      500: {
        normal: 'Montserrat_400Regular',
        italic: 'Montserrat_400Regular_Italic'
      },
      600: {
        normal: 'Montserrat_600SemiBold'
      },
      700: {
        normal: 'Montserrat_700Bold',
        italic: 'Montserrat_700Bold_Italic'
      },
      800: {
        normal: 'Montserrat_800ExtraBold'
      },
      900: {
        normal: 'Montserrat_900Black'
      }
    },
    OpenSans: {
      100: {
        normal: 'OpenSans_400Regular',
        italic: 'OpenSans_400Regular_Italic'
      },
      200: {
        normal: 'OpenSans_400Regular',
        italic: 'OpenSans_400Regular_Italic'
      },
      300: {
        normal: 'OpenSans_400Regular',
        italic: 'OpenSans_400Regular_Italic'
      },
      400: {
        normal: 'OpenSans_400Regular',
        italic: 'OpenSans_400Regular_Italic'
      },
      500: {
        normal: 'OpenSans_500Medium',
        italic: 'OpenSans_500Medium_Italic'
      },
      600: {
        normal: 'OpenSans_700Bold',
        italic: 'OpenSans_700Bold_Italic'
      },
      700: {
        normal: 'OpenSans_700Bold',
        italic: 'OpenSans_700Bold_Italic'
      },
      800: {
        normal: 'OpenSans_700Bold',
        italic: 'OpenSans_700Bold_Italic'
      },
      900: {
        normal: 'OpenSans_700Bold',
        italic: 'OpenSans_700Bold_Italic'
      }
    }
  },
  fonts: {
    body: 'OpenSans',
    heading: 'Montserrat'
  }
})
