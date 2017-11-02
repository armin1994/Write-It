'use strict';
/*
    This is the global stylesheet for the app
 */
import {StyleSheet} from 'react-native'
import {MKColor} from 'react-native-material-kit';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbar: {
        height: 56,
        backgroundColor: MKColor.Cyan,
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5
    },
    cardContent: {
        flex: 3,
        marginTop: 20
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    generateButton: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: 'white'
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    freshButton: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: 'white'
    },
    footerHome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    mediumTitle: {
        fontSize: 20
    }
});

export default styles