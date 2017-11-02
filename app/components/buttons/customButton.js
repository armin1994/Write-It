'use strict'
import {MKButton, MKColor} from 'react-native-material-kit';

// Custom material design button
const CustomButton = new MKButton.Builder()
    .withBackgroundColor(MKColor.Cyan)
    .withTextStyle({
        color: 'white',
        fontWeight: 'bold',
        height: 25
    })
    .withStyle({
        borderRadius: 2,
        elevation: 25
    })
    .withText('View PNG')
    .build()

export default CustomButton