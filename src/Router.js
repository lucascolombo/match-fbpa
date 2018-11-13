import { createStackNavigator } from 'react-navigation';
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import MatchFormPage from './pages/MatchFormPage';
import MapSetLocationPage from './pages/MapSetLocationPage';

export default createStackNavigator({
  'Main': {
    screen: Main,
  },
  'MatchForm': {
    screen: MatchFormPage,
    navigationOptions: {
      title: "Novo Jogo",
    }
  },
  'MapSetLocation': {
    screen: MapSetLocationPage,
    navigationOptions: {
      title: "Novo Jogo",
    }
  },
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
}, {
  navigationOptions: {
    title: "FUTPOA",
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#00796b'
    }
  }
});
