import BaseService from './BaseService';

type MaybeUnknown<T> = T | 'UNKNOWN';

type BrowserType =
  | 'Opera'
  | 'Firefox'
  | 'Microsoft Edge'
  | 'Chrome'
  | 'Safari'
  | 'Internet Explorer';

type OperationSystemType =
  | 'Windows 10'
  | 'Windows 8.1'
  | 'Windows 8'
  | 'Windows 7'
  | 'Windows'
  | 'Android'
  | 'iOS'
  | 'macOS'
  | 'Linux';

type DeviceType = 'tablet' | 'mobile' | 'desktop';

class UserAgentService extends BaseService {
  static browser(userAgent: string): MaybeUnknown<BrowserType> {
    if (userAgent.indexOf('Opera') != -1 || userAgent.indexOf('OPR') != -1) {
      return 'Opera';
    }
    if (userAgent.indexOf('Firefox') != -1) {
      return 'Firefox';
    }
    if (userAgent.indexOf('Edge') != -1) {
      return 'Microsoft Edge';
    }
    if (userAgent.indexOf('Chrome') != -1) {
      return 'Chrome';
    }
    if (userAgent.indexOf('Safari') != -1) {
      return 'Safari';
    }
    if (userAgent.indexOf('MSIE') != -1) {
      return 'Internet Explorer';
    }

    return 'UNKNOWN';
  }

  static os(userAgent: string): MaybeUnknown<OperationSystemType> {
    if (userAgent.indexOf('Windows NT 10.0') != -1) {
      return 'Windows 10';
    }
    if (userAgent.indexOf('Windows NT 6.3') != -1) {
      return 'Windows 8.1';
    }
    if (userAgent.indexOf('Windows NT 6.2') != -1) {
      return 'Windows 8';
    }
    if (userAgent.indexOf('Windows NT 6.1') != -1) {
      return 'Windows 7';
    }
    if (userAgent.indexOf('Windows') != -1) {
      return 'Windows';
    }
    if (userAgent.indexOf('Android') != -1) {
      return 'Android';
    }
    if (/(iPhone|iPad|iPod)/.test(userAgent)) {
      return 'iOS';
    }
    if (userAgent.indexOf('Mac') != -1) {
      return 'macOS';
    }
    if (userAgent.indexOf('Linux') != -1 || userAgent.indexOf('X11') != -1) {
      return 'Linux';
    }

    return 'UNKNOWN';
  }

  static device(userAgent: string): DeviceType {
    const tabletPattern = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
    if (tabletPattern.test(userAgent)) {
      return 'tablet';
    }

    const mobilePattern =
      // eslint-disable-next-line max-len
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;

    if (mobilePattern.test(userAgent)) {
      return 'mobile';
    }

    return 'desktop';
  }
}

export default UserAgentService;
