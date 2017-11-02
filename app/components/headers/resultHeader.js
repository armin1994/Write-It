'use strict';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../style/styles';

// Custom Toolbar
const Header = (props) => <Icon.ToolbarAndroid
    style={styles.toolbar}
    titleColor="white"
    title="Result"
    navIconName="keyboard-backspace"
    onIconClicked={props.onIconClicked}
/>

export default Header