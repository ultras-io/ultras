/* eslint-disable no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { UserSDK } from '@ultras/core-api-sdk';

enum SentStatus {
  NO = 'no',
  YES = 'yes',
}

const storageKeyPrefix = 'FirebaseCloudMessaging';
const storageKeyToken = `${storageKeyPrefix}_Token`;
const storageKeySent = `${storageKeyPrefix}_Sent`;

const requestAndStoreFcmToken = async () => {
  const existingToken = await AsyncStorage.getItem(storageKeyToken);
  if (existingToken) {
    return existingToken;
  }

  const token = await messaging().getToken();
  if (token) {
    await AsyncStorage.setItem(storageKeyToken, token);
    await AsyncStorage.setItem(storageKeySent, SentStatus.NO);
  }

  return token;
};

/**
 * Send device registered token to server.
 */
export const sendTokenToServer = async () => {
  const token = await AsyncStorage.getItem(storageKeyToken);
  if (!token) {
    return;
  }

  const sentStatus = await AsyncStorage.getItem(storageKeySent);
  if (sentStatus === SentStatus.YES) {
    return;
  }

  const userSdk = new UserSDK('dev');
  await userSdk.registerDeviceToken(token);

  await AsyncStorage.getItem(storageKeySent);
};

/**
 * Get and/or request notification permission.
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  if (
    authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
    authStatus !== messaging.AuthorizationStatus.PROVISIONAL
  ) {
    return getFcmToken();
  }

  return requestAndStoreFcmToken();
};

/**
 * Get firebase cloud messaging token from storage or generate new one
 * and put in storage.
 */
export const getFcmToken = async () => {
  try {
    let token = await AsyncStorage.getItem(storageKeyToken);
    if (!token) {
      token = await requestAndStoreFcmToken();
    }

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
