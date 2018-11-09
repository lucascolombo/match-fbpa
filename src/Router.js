import { createStackNavigator } from 'react-navigation';
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';

export default createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: "",
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: null
      }
    }
  },
  'Main': {
    screen: Main,
  }
}, {
  navigationOptions: {
    title: "FUTPOA",
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#00796b'
    }
  }
});
