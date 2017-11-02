'use strict';
/*
    This is the home screen where we choose size,style and color and then we call the handwriting api to retrieve the image
    save  it locally.
 */
import React, {Component} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Image,
    View,
    Button,
    Text,
    TextInput,
    ScrollView,
    AsyncStorage
} from 'react-native';
/*
    Importing Material design styles
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MKColor, getTheme} from 'react-native-material-kit';
import {SinglePickerMaterialDialog, MaterialDialog} from 'react-native-material-dialog';

import {TriangleColorPicker, fromHsv} from 'react-native-color-picker'; //Color picker package
import RNFetchBlob from 'react-native-fetch-blob'; //http fetch package
import styles from '../style/styles'; //My custom style
import {lorem, initialData, styleList, sizeList} from '../data/staticData' //static data going to be used for initialising components
import Spinner from 'react-native-spinkit'; //custom loading spinner


const theme = getTheme();
const fs = RNFetchBlob.fs;


export default class HomeScreen extends Component<{}> {
    constructor(props) {
        super(props);
    }

    /*
        This function is called when screen width or height change like when phone rotated.
        This function is used to implement responsive logic to the app in case of phone rotation.
     */
    _onLayout = (event) => {
        this.setState({currentHeight: Dimensions.get('window').height, currentWidth: Dimensions.get('window').width})
    }

    /*
        Initialising static data or retrieve last stored data
     */
    async componentWillMount() {
        try {
            this.setState(initialData)
            const data = await AsyncStorage.getItem('data')
            if (data) {
                this.setState(JSON.parse(data))
            }
            else
                this.setState(initialData)
            this.setState({loading: false})
        } catch (e) {
            return null
        }
    }

    /*
        Storing data to save style,size and color in case user wants goes back to home screen
     */
    async saveData() {
        try {
            this.setState({loading: false})
            return await AsyncStorage.setItem('data', JSON.stringify(this.state))
        } catch (e) {
            return null
        }
    }

    /*
        calling te handwriting api to retrieve image with given properties(size,style,color)
        and storing image retrieved locally
     */
    loadImage = (navigate) => {
        this.setState({loading: true})
        let imagePath = ''
        let url = "https://ZXJBZKBPC1MPNKRC:Y2K113M9SYN18JTM@api.handwriting.io/render/png?handwriting_id=" + this.state.styleSelected.value + "&text=" + this.state.text + "&handwriting_size=" + this.state.sizeSelected.value + "px&handwriting_color=%23" + this.state.colorSelected.substr(1) + "&width=480px&height=auto&line_spacing=1.5&line_spacing_variance=0.0&word_spacing_variance=0.0&random_seed=-1"
        const Authorization = 'Basic WlhKQlpLQlBDMU1QTktSQzpZMksxMTNNOVNZTjE4SlRN'
        RNFetchBlob
            .config({
                fileCache: true,
            })
            .fetch('GET', url, {
                Authorization: Authorization,
                // more headers  ..
            })
            // the image is now dowloaded to device's storage
            .then((resp) => {
                // the image path you can use it directly with Image component
                imagePath = resp.path()
                return resp.readFile('base64')

            })
            .then((base64Data) => {
                // here's base64 encoded image
                //fs.writeFile(imagePath, base64Data, 'base64')
                fs.writeFile(fs.dirs.DownloadDir + '/handwriting.png', base64Data, 'base64')
                this.saveData()
                navigate('Result', {
                    image: 'data:image/png;base64,' + base64Data,
                    path: fs.dirs.DownloadDir + '/handwriting.png'
                })
                // remove the file from storage
                return fs.unlink(imagePath)
            }).catch((error) => {
            this.setState({warningVisible: true, loading: false})
        })

    }
    static navigationOptions = {
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View onLayout={this._onLayout}>
                <Spinner
                    style={{
                        position: 'absolute',
                        top: (this.state.currentHeight / 2) - 100,
                        left: (this.state.currentWidth / 2) - 50,
                        zIndex: 99
                    }}
                    isVisible={this.state.loading}
                    type='Circle'
                    color={MKColor.Cyan}
                    size={100}
                />
                <View>
                    <Icon.ToolbarAndroid
                        style={styles.toolbar}
                        titleColor="white"
                        title="WRITE IT"
                        actions={[
                            {title: 'Size', iconName: 'text-fields', show: 'always'},
                            {title: 'Style', iconName: 'text-format', show: 'always'},
                            {title: 'Color', iconName: 'brush', iconColor: this.state.colorSelected, show: 'always'},
                            {title: 'Reset', iconName: 'cached', show: 'always'},
                            {title: 'Result', iconName: 'done', show: 'always'}
                        ]}
                        onActionSelected={(position) => {
                            if (position === 0) {
                                this.setState({sizePickerVisible: true})
                            }
                            if (position === 1) {
                                this.setState({stylePickerVisible: true})
                            }
                            if (position === 2) {
                                this.setState({colorPickerVisible: true})
                            }
                            if (position === 3) {
                                this.setState(initialData)
                                this.setState({loading: false})
                            }
                            if (position === 4) {
                                this.loadImage(navigate)
                            }
                        }}
                    />
                </View>
                <View>
                    <View style={[theme.cardStyle, {height: this.state.currentHeight - 100}]}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Icon.Button name="add" backgroundColor={MKColor.Green} onPress={() => {
                                    this.setState({text: lorem})
                                }}>
                                    <Text style={styles.generateButton}>Generate
                                        text </Text>
                                </Icon.Button>
                                <Text style={styles.textTitle}> or </Text>
                                <Icon.Button name="delete" backgroundColor={MKColor.Red} onPress={() => {
                                    this.setState({text: ''})
                                }}>
                                    <Text style={styles.freshButton}>Start fresh </Text>
                                </Icon.Button>
                            </View>
                            <TextInput
                                style={{
                                    textAlignVertical: 'top',
                                    paddingTop: 25,
                                    color: this.state.colorSelected,
                                    fontSize: 25,
                                    fontFamily: this.state.styleSelected.value
                                }}
                                selectionColor={MKColor.Cyan}
                                multiline={true}
                                numberOfLines={8}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                        </View>
                        <View style={[theme.cardActionStyle, styles.footerHome]}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.mediumTitle}>Size: </Text>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: this.state.colorSelected
                                }}>{this.state.sizeSelected.label}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.mediumTitle}>Style: </Text>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: this.state.colorSelected
                                }}>{this.state.styleSelected.label}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <SinglePickerMaterialDialog
                    currentHeight={this.state.currentHeight}
                    title={'Choose Size !'}
                    titleColor={MKColor.Cyan}
                    colorAccent={MKColor.Cyan}
                    items={sizeList}
                    visible={this.state.sizePickerVisible}
                    selectedItem={this.state.sizeSelected}
                    onCancel={() => this.setState({sizePickerVisible: false})}
                    onOk={(result) => {
                        this.setState({sizePickerVisible: false});
                        this.setState({sizeSelected: result.selectedItem});
                    }}/>
                <SinglePickerMaterialDialog
                    title={'Choose Style !'}
                    titleColor={MKColor.Cyan}
                    colorAccent={MKColor.Cyan}
                    items={styleList}
                    visible={this.state.stylePickerVisible}
                    selectedItem={this.state.styleSelected}
                    onCancel={() => this.setState({stylePickerVisible: false})}
                    onOk={(result) => {
                        this.setState({stylePickerVisible: false});
                        this.setState({styleSelected: result.selectedItem});
                    }}/>
                <MaterialDialog
                    title="Choose color !"
                    visible={this.state.colorPickerVisible}
                    titleColor={MKColor.Cyan}
                    colorAccent={MKColor.Cyan}
                    onOk={() => {
                        this.setState({colorSelected: this.state.localColorSelected})
                        this.setState({colorPickerVisible: false})
                    }}
                    onCancel={() => this.setState({colorPickerVisible: false})}>
                    <View>
                        <TriangleColorPicker
                            color={this.state.localColorSelected}
                            onColorChange={color => this.setState({localColorSelected: fromHsv(color)})}
                            style={{height: 200}}
                            hideSliders={true}
                        />
                    </View>
                </MaterialDialog>
                <MaterialDialog
                    title="Check your internet connection !"
                    visible={this.state.warningVisible}
                    titleColor={MKColor.Cyan}
                    colorAccent={MKColor.Cyan}
                    onOk={() => {
                        this.setState({warningVisible: false})
                    }}
                    onCancel={() => this.setState({warningVisible: false})}>
                    <View></View>
                </MaterialDialog>
            </View>
        );
    }
}



