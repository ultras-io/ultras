// import 'module-alias/register';
import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './src/app.json';
import App from './src/App';

// LogBox.ignoreAllLogs();
LogBox.ignoreLogs([/Require cycle/]);

AppRegistry.registerComponent(appName, () => App);
