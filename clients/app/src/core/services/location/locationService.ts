import Geolocation from 'react-native-geolocation-service';

class LocationService {
  static requestLocation = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    }
    return false;
  };

  static openSettings = async () => {};
  // static hasIOSPermissions = async () => {};
  static hasPermissions = async () => {};
  static getLocation = async () => {};
}

export default LocationService;
