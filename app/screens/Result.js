'use strict';
import React, {Component} from 'react';
import {StyleSheet, Dimensions, Image, View, Button, Text, TextInput, ScrollView, AsyncStorage} from 'react-native';
import {MKButton, MKColor, getTheme} from 'react-native-material-kit'; // Material design style
import FitImage from 'react-native-fit-image'; // Image fitter that resize image to fit its container
import RNFetchBlob from 'react-native-fetch-blob';
/*
    Custom components
 */
import CustomButton from '../components/buttons/customButton';
import Header from '../components/headers/resultHeader'


const theme = getTheme();
const fs = RNFetchBlob.fs;
const android = RNFetchBlob.android;


export default class ResultScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {currentHeight: Dimensions.get('window').height}
    }
    /*
        responsive logic
     */
    _onLayout = (event) => {
        this.setState({currentHeight: Dimensions.get('window').height})
    }
    static navigationOptions = {
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <View style={{flexDirection: 'column'}} onLayout={this._onLayout}>
                <View>
                    <Header onIconClicked={() => navigate('Home')}/>
                </View>
                <View style={{height: this.state.currentHeight - 120 }}>
                    <ScrollView style={[theme.cardStyle, {maxHeight: this.state.currentHeight - 120, elevation: 25}]}>
                        <FitImage
                            source={{uri: params.image}}
                            style={{borderRadius: 20}}
                        />
                    </ScrollView>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <CustomButton onPress={() => {
                        android.actionViewIntent(params.path, 'image/png')
                    }}/>
                </View>
            </View>
        );
    }
}

