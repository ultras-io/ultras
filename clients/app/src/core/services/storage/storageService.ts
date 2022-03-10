// import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setItem: (key: string, value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItem: (key: string): string => {
    return '';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: (key: string) => {},
  clear: () => {},
};

class StorageService {
  static setItem = async (key: string, value: any) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      // handle error;
    }
  };

  static getItem = async (key: string): Promise<string> => {
    try {
      return AsyncStorage.getItem(key);
    } catch (e) {
      // handle error;
      return '';
    }
  };

  static setObject = async (key: string, value: Object | Array<any>) => {
    return StorageService.setItem(key, JSON.stringify(value));
  };

  static getObject = async (key: string) => {
    const json = await StorageService.getItem(key);
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
