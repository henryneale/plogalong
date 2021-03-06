import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import $S from '../styles';
import Colors from '../constants/Colors';

/** @typedef {React.ComponentProps<typeof TextInput>} TextInputProps */
/** @typedef {React.ComponentProps<typeof TouchableOpacity>} TouchableOpacityProps */

/**
 * @typedef {TextInputProps & Pick<TouchableOpacityProps, 'onPressIn' | 'onPress'> & { icon?: React.ReactElement, iconName?: string }} TextInputWithIconProps
 */

/** @type {React.FunctionComponent<TextInputWithIconProps>} */
const TextInputWithIcon = ({onPressIn, onPress, icon, iconName, style, ...props}) => {
  const [isPressed, setPressed] = React.useState(false);

  const sharedIconStyles = [styles.sharedIconStyle, ];
  return (
    <View>
      <TouchableOpacity 
        onPressIn={() => {
          setPressed(true);
          onPressIn && onPressIn();
        }} 
        onPress={onPress}
        onPressOut={() => {
          setPressed(false);
        }}
        style={styles.touchableStyle}>
        {icon ?
          React.cloneElement(icon, { style: [sharedIconStyles, icon.props.style] }) :
          iconName ?
            <Ionicons size={30} style={[styles.iconStyle, sharedIconStyles]}
              name={iconName} /> :
            null}
      </TouchableOpacity>
      <TextInput style={[$S.textInput, styles.inputStyle, isPressed ? styles.purpleOutline : styles.greenOutline]} {...props} />
    </View>
  )
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  inputStyle: {
    flexGrow: 1,
  },
  sharedIconStyle: {
    paddingRight: 5,
    paddingTop: 2,
  },
  touchableStyle: {
    position: 'absolute',
    right: 0,
    height: '100%',
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#666666'
  },
  purpleOutline: {
    borderColor: Colors.selectionColor,
    borderWidth: 2,
    fontSize: 18,
    padding: 10,
  },
  greenOutline: {
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    fontSize: 18,
    padding: 10,
  },
});
