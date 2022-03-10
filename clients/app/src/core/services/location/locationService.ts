import Geolocation from 'react-native-geolocation-service';
import { Platform, Linking, Alert, PermissionsAndroid } from 'react-native';
import appConfig from '../../../app.json';

//TODO locale texts

class LocationService {
  static hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      // Location permission denied'
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ]
      );
    }

    return false;
  };

  static hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await LocationService.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      // Location permission denied by user.
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      // Location permission revoked by user.
    }

    return false;
  };

  static getLocation = async () => {
    const hasPermission = await LocationService.hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        // setLocation(position);
        console.log(position);
      },
      error => {
        // setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      }
    );
  };
}

export default LocationService;
