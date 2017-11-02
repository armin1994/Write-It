'use strict';
/*
    This is where we implement the routing logic for the app
 */
import {
    StackNavigator
} from 'react-navigation';
import HomeScreen from './app/screens/Home';
import ResultScreen from './app/screens/Result'

//adding screen for each route
const App = StackNavigator({
        Home: {screen: HomeScreen},
        Result: {screen: ResultScreen},
    },
    {headerMode: 'screen'});

export default App