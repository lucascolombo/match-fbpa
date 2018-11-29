import { createStackNavigator } from 'react-navigation';
import LoginPage from './pages/LoginPage';
import Main from './pages/MainPage';
import MatchFormPage from './pages/MatchFormPage';
import MapSetLocationPage from './pages/MapSetLocationPage';
import MatchDetailPage from './pages/MatchDetailPage';
import LocationMapPage from './pages/LocationMapPage';

export default createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  'Main': {
    screen: Main,
  },
  'MatchDetail': {
    screen: MatchDetailPage,
    navigationOptions: {
      title: "Detalhes do Jogo",
    }
  },
  'LocationMap': {
    screen: LocationMapPage,
    navigationOptions: {
      title: "Local do Jogo",
    }
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
}, {
  navigationOptions: {
    title: "FUTPOA",
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#00796b'
    }
  }
});
