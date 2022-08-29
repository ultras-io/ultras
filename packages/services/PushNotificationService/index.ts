import * as fs from 'fs';
import * as firebaseAdmin from 'firebase-admin';
import {
  MessageType,
  SendByTopicType,
  SendByConditionType,
  SendByTokenType,
} from './types';

class PushNotificationService {
  private static staticInstance: null | PushNotificationService = null;
  private static singleton(): PushNotificationService {
    if (null == this.staticInstance) {
      throw new Error('Please initiate PushNotificationService before using.');
    }

    return this.staticInstance;
  }

  static initiate(
    projectId: string,
    clientEmail: string,
    privateKeyFile: string,
    privateKey: string
  ) {
    this.staticInstance = new PushNotificationService(
      projectId,
      clientEmail,
      privateKeyFile,
      privateKey
    );
  }

  constructor(
    private projectId: string,
    private clientEmail: string,
    private privateKeyFile: string,
    private privateKey: string
  ) {
    if (this.privateKeyFile && fs.existsSync(this.privateKeyFile)) {
      this.privateKey = fs.readFileSync(this.privateKeyFile, 'utf-8');
    }

    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: this.projectId,
        clientEmail: this.clientEmail,
        privateKey: this.privateKey,
      }),
    });
  }

  static async send(message: MessageType) {
    return this.singleton().send(message);
  }

  async send(message: MessageType) {
    const notification: any = {
      notification: {
        body: message.message,
        title: message.title,
        imageUrl: message.imageUrl,
      },
      apns: {
        payload: {
          aps: {
            mutableContent: true,
            sound: 'default',
            alert: {
              body: message.message,
              title: message.title,
            },
          },
        },
        fcmOptions: {
          imageUrl: message.imageUrl,
        },
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
        },
      },
    };

    let notificationList = [];
    if ((message as SendByTopicType).topic) {
      notification.topic = (message as SendByTopicType).topic;
      notificationList = [notification];
    }
    if ((message as SendByConditionType).condition) {
      notification.condition = (message as SendByConditionType).condition;
      notificationList = [notification];
    }
    if ((message as SendByTokenType).tokens) {
      notificationList = (message as SendByTokenType).tokens.map((token: string) => ({
        ...notification,
        token,
      }));
    }

    firebaseAdmin.messaging().sendAll(notificationList);
  }
}

export default PushNotificationService;
