import PushNotificationService from '@ultras/services/PushNotificationService';
import { UserSession } from 'core/data/models/UserSession';
import db from 'core/data/models';

class NotificationService {
  /**
   * Subscribe user's all devices to provided topic.
   */
  static async subscribeUserToTopic(topic: string, userId: number) {
    const sessions = await db.UserSession.findAll({
      where: { userId },
      attributes: {
        include: ['userId', 'deviceToken'],
      },
    });

    if (sessions.length !== 0) {
      const tokens = sessions
        .map((session: UserSession) => session.getDataValue('deviceToken'))
        .filter((deviceToken: string | null) => !!deviceToken);

      if (tokens.length !== 0) {
        return PushNotificationService.subscribeToTopic(topic, tokens);
      }
    }
  }

  /**
   * Subscribe device to provided topic.
   */
  static async subscribeDeviceToTopic(topic: string, deviceToken: string) {
    return PushNotificationService.subscribeToTopic(topic, [deviceToken]);
  }

  /**
   * Unsubscribe user's all device to provided topic.
   */
  static async unsubscribeUserFromTopic(topic: string, userId: number) {
    const sessions = await db.UserSession.findAll({
      where: { userId },
      attributes: {
        include: ['deviceToken'],
      },
    });

    const tokens = sessions.map((session: UserSession) =>
      session.getDataValue('deviceToken')
    );

    if (tokens.length !== 0) {
      return PushNotificationService.unsubscribeFromTopic(topic, tokens);
    }
  }

  /**
   * Unsubscribe device from provided topic.
   */
  static async unsubscribeDeviceFromTopic(topic: string, deviceToken: string) {
    return PushNotificationService.unsubscribeFromTopic(topic, [deviceToken]);
  }
}

export default NotificationService;
