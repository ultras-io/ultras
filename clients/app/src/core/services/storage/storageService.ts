// import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage = {
  setItem: (key, value) => {},
  getItem: key => {},
  removeItem: key => {},
  clear: () => {},
};

class StorageService {
  static setItem = async (key: string, value: string) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      // handle error;
    }
  };

  static getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      // handle error;
      return '';
    }
  };

  static setObject = async (key: string, value: Object | Array<any>) => {
    return StorageService.setItem(key, JSON.stringify(value));
  };

  static getObject = async (key: string) => {
    const json = StorageService.getItem(key);
    return JSON.parse(json);
  };

  static removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // handle error;
    }
  };

  static clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // handle error;
    }
  };

  static setAuthToken(token: string) {
    return StorageService.setItem('auth_token', token);
  }

  static getAuthToken() {
    return StorageService.getItem('auth_token');
  }
}

export default StorageService;
