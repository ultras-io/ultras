/* eslint-disable no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const storageKey = 'FIREBASE_CLOUD_MESSAGING_TOKEN';

const requestAndStoreFcmToken = async () => {
  const token = await messaging().getToken();
  console.log({ token });
  if (token) {
    await AsyncStorage.setItem(storageKey, token);
  }

  return token;
};

/**
 * Get and/or request notification permission.
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status:', authStatus);

  if (
    authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
    authStatus !== messaging.AuthorizationStatus.PROVISIONAL
  ) {
    const currentToken = await getFcmToken();
    return console.log('FirebaseCloudMessaging token exists:', currentToken);
  }

  requestAndStoreFcmToken();
};

/**
 * Get firebase cloud messaging token from storage or generate new one
 * and put in storage.
 */
export const getFcmToken = async () => {
  try {
    let token = await AsyncStorage.getItem(storageKey);
    if (!token) {
      token = await requestAndStoreFcmToken();
    }

    console.log('FirebaseCloudMessaging token is:', token);
    return token;
  } catch (e) {
    console.error('Failed to get FirebaseCloudMessaging Token:', e);
    return null;
  }
};

export const configureBackgroundMode = () => {
  // register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

export const configureInAppMode = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived:', remoteMessage);
  });
};

export { messaging };
