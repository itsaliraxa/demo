import { StyleSheet } from 'react-native'

/**
 * Update input styling based on status
 *
 * @param {Object} params
 * @param {Boolean} [params.error=false] - Input has error
 * @param {Boolean} [params.selected=false] - Input is selected
 * @param {Object} params.theme - Native base theme objects (from useTheme())
 *
 * @return {StyleSheet}
 */
export const getInputStyle = ({
  error = false,
  selected = false,
  theme
}) => {
  const { colors, space, radii } = theme
  const styles = StyleSheet.create({
    base: {
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderRadius: radii.md,
      borderWidth: 1,
      paddingHorizontal: space['4'],
      paddingVertical: space['2'],
      width: '100%'
    },
    error: {
      borderColor: colors.error['400']
    },
    selected: {
      backgroundColor: colors.secondary['400'],
      borderColor: colors.secondary['400']
    }
  })

  // has error
  if (error) {
    return StyleSheet.flatten([styles.base, styles.error])
  }

  // is selected
  if (selected) {
    return StyleSheet.flatten([styles.base, styles.selected])
  }

  // base styling
  return styles.base
}

/**
 * Input style properties
 *
 * @type {Object}
 */
export const styleProps = {
  _checked: {
    _text: {
      color: 'white',
      fontWeight: 'semibold',
      shadow: 1
    },
    bgColor: 'black:alpha.10',
    borderColor: 'transparent'
  },
  _icon: {
    color: 'white'
  },
  _text: {
    color: 'gray.600'
  },
  borderColor: 'gray.400',
  borderWidth: 1,
  colorScheme: 'secondary'
}
