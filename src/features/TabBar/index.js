import React from 'react'
import PropTypes from 'prop-types'
import {
  Circle,
  Icon,
  PresenceTransition,
  Pressable,
  Stack,
  Text
} from 'native-base'
import { Animated, Easing } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { THEME } from 'constants/index'

/**
 * Navigation tab bar
 *
 * @param {BottomTabBarProps} props
 * @return {JSX.Element}
 * @constructor
 */
const TabBar = ({
  descriptors,
  insets,
  navigation,
  state
}) => {
  const OPTIONS = {
    bgColor: 'white',
    color: 'black',
    iconAnimationOffset: -THEME.spacing.lg,
    indicatorColor: 'secondary.50'
  }

  /**
   * Slide up animation
   *
   * @param {Animated.Value} val
   */
  const slideUp = (val) => Animated.timing(val, {
    duration: 250,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    toValue: OPTIONS.iconAnimationOffset,
    useNativeDriver: false
  }).start()

  const scaleHorizontal = (val) => Animated.timing(val, {
    duration: 250,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    toValue: 1,
    useNativeDriver: false
  }).start()

  const tabBarItems = state.routes.map(({
    key,
    name
  }, index) => {
    const {
      options: {
        tabBarLabel,
        title
      }
    } = descriptors[key]
    const item = { ...descriptors[key].options }

    item.isFocused = state.index === index
    item.key = key
    item.label = tabBarLabel || title || name
    item.name = name

    return item
  })

  /**
   * Switch tabs on button press
   *
   * @param {Boolean} isFocused
   * @param {string} key
   * @param {string} name
   */
  const onPress = (isFocused, key, name) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({ name, merge: true })
    }
  }

  /**
   * Emit event on button long press
   *
   * @param {string} key
   */
  const onLongPress = (key) => {
    navigation.emit({
      type: 'tabLongPress',
      target: key
    })
  }

  return (
    <Stack
      bgColor={ OPTIONS.bgColor }
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      pb={ insets.bottom }
      px={ THEME.screen.px }
    >
      { tabBarItems.map(item => {
        const {
          isFocused,
          key,
          label,
          name,
          tabBarBadge,
          tabBarIcon
        } = item
        const tabBarIconArr = tabBarIcon && tabBarIcon()
        const transYPos = new Animated.Value(0)
        const indicatorAnim = new Animated.Value(0)

        if (isFocused) {
          slideUp(transYPos)
          scaleHorizontal(indicatorAnim)
        } else {
          transYPos.resetAnimation()
          indicatorAnim.resetAnimation()
        }

        return (
          <Pressable
            alignItems="center"
            accessibilityLabel={ item?.tabBarAccessibilityLabel }
            accessibilityRole="button"
            accessibilityState={ isFocused ? { selected: true } : {} }
            flex={1}
            key={ `nav-tab-item-${key}` }
            onLongPress={ () => onLongPress(key) }
            onPress={ () => onPress(isFocused, key, name) }
            testID={ item?.tabBarTestID }
            mt={ THEME.spacing.lg }
            px={ THEME.spacing.md }
          >
            { (tabBarIconArr && Object.keys(tabBarIconArr).length > 0) &&
              <Animated.View
                style={{
                  alignItems: 'center',
                  position: 'relative',
                  transform: [{
                    translateY: transYPos
                  }],
                  width: '100%'
                }}
              >
                {/* Badge */}
                { tabBarBadge &&
                  <Circle
                    _text={{
                      color: isFocused ? OPTIONS.indicatorColor : OPTIONS.bgColor,
                      fontSize: '2xs',
                      fontWeight: 'bold'
                    }}
                    bgColor="danger.500"
                    borderColor={ isFocused ? OPTIONS.indicatorColor : OPTIONS.bgColor }
                    borderWidth={2}
                    position="absolute"
                    size="20px"
                    style={{
                      transform: [{ translateX: 12 }, { translateY: -4 }]
                    }}
                    zIndex={1}
                  >
                    { tabBarBadge }
                  </Circle>
                }
                {/* Indicator */}
                <Animated.View
                  style={{
                    height: '100%',
                    opacity: indicatorAnim,
                    position: 'absolute',
                    transform: [
                      { scaleY: 1.3 },
                      { scaleX: indicatorAnim }
                    ],
                    width: '100%',
                    zIndex: -1
                  }}
                >
                  <Circle
                    bgColor={isFocused ? OPTIONS.indicatorColor : OPTIONS.bgColor}
                    h="100%"
                    w="100%"
                  />
                </Animated.View>
                {/* Icon */}
                <Icon
                  as={ MaterialCommunityIcons }
                  color={ OPTIONS.color }
                  name={ isFocused ? tabBarIconArr?.focused : tabBarIconArr?.base }
                  size={6}
                />
              </Animated.View>
            }
            {/* Label */}
            <PresenceTransition
              animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
              }}
              initial={{
                opacity: tabBarIconArr ? 0 : 1
              }}
              visible={ isFocused }
            >
              <Text
                color={ OPTIONS.color }
                fontSize="xs"
              >
                { label }
              </Text>
            </PresenceTransition>
          </Pressable>
        )
      }) }
    </Stack>
  )
}

TabBar.propTypes = {
  descriptors: PropTypes.object.isRequired,
  insets: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
}

export default React.memo(TabBar)
