import {Dimensions} from 'react-native';


export const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consectetur leo, ac auctor est. Etiam et ligula at velit lobortis posuere. Aenean sapien nulla, placerat non nibh at, ultrices condimentum nunc. Duis condimentum egestas ex, sed auctor tellus semper vitae. Curabitur ultrices felis urna, volutpat ultrices magna interdum ac. In lobortis est sit amet dui mattis, tempus suscipit urna rutrum. Suspendisse eu felis iaculis, efficitur risus eu, commodo diam. Nulla bibendum felis eu accumsan congue. Vivamus blandit laoreet commodo. Proin pharetra auctor vehicula. Mauris tempus sit amet lacus ut congue. Praesent dapibus lacinia scelerisque."

export const sizeList = [
    {value: 12, label: 'Small'},
    {value: 20, label: 'Medium'},
    {value: 32, label: 'Large'},
    {value: 40, label: 'XL'}
];
export const styleList = [
    {value: '2D5QW0F80001', label: 'Molly'},
    {value: '2D5S18M00002', label: 'Winters'},
    {value: '2D5S46A80003', label: 'Perry'},
    {value: '2D5S46JG0004', label: 'Squire'},
    {value: '2D5S4BJR0005', label: 'Clara'},
    {value: '2ZK3SNCR0057', label: 'Goldie'},
    {value: '2ZK3ZD280058', label: 'Eastwood'},
    {value: '31SAZEF000DX', label: 'Trinity'},
    {value: '31SB149000DY', label: 'Claremont'}
];


export const initialData = {
    colorPickerVisible: false,
    sizePickerVisible: false,
    stylePickerVisible: false,
    sizeSelected: sizeList[0],
    styleSelected: styleList[0],
    colorSelected: '#000000',
    text: lorem,
    currentHeight: Dimensions.get('window').height,
    currentWidth: Dimensions.get('window').width,
    loading: true,
    warningVisible: false
};