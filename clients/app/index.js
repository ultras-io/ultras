// import 'module-alias/register';
import { AppRegistry } from 'react-native';
import { name as appName } from './src/app.json';
import App from './src/App';
import './src/notifications/register';

AppRegistry.registerComponent(appName, () => App);
