import BaseService from './BaseService';

type MaybeUnknown<T> = T | 'UNKNOWN';

export type BrowserType = MaybeUnknown<
  'Opera' | 'Firefox' | 'Microsoft Edge' | 'Chrome' | 'Safari' | 'Internet Explorer'
>;

export type OperationSystemType = {
  name: MaybeUnknown<'Windows' | 'Android' | 'iOS' | 'macOS' | 'Linux'>;
  version: MaybeUnknown<string>;
};

export type DeviceType = 'tablet' | 'mobile' | 'desktop';

class UserAgentService extends BaseService {
  private static getByPattern(userAgent: string, pattern: RegExp): MaybeUnknown<string> {
    const matches = userAgent.match(pattern);
    return null != matches ? matches[1] : 'UNKNOWN';
  }

  /**
   * Detect browser name by user agent.
   */
  static browser(userAgent: string): BrowserType {
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

  /**
   * Detect operation system name by user agent.
   */
  static os(userAgent: string): OperationSystemType {
    const info: OperationSystemType = {
      name: 'UNKNOWN',
      version: 'UNKNOWN',
    };

    if (userAgent.indexOf('Android') != -1) {
      info.name = 'Android';
      info.version = this.getByPattern(userAgent, /android (\d+(\.\d+)?)/i);
    }

    if (/(iPhone|iPad|iPod|iOS)/.test(userAgent)) {
      info.name = 'iOS';
      info.version = this.getByPattern(userAgent, /ios (\d+)/i);
    }

    if (userAgent.indexOf('Windows') != -1) {
      // TODO: Windows 11 does not send a version info in user-agent
      //       Can't handle it for now
      if (userAgent.indexOf('Windows NT 10.0') != -1) {
        info.version = '10';
      } else if (userAgent.indexOf('Windows NT 6.3') != -1) {
        info.version = '8.1';
      } else if (userAgent.indexOf('Windows NT 6.2') != -1) {
        info.version = '8';
      } else if (userAgent.indexOf('Windows NT 6.1') != -1) {
        info.version = '7';
      }
    }

    if (userAgent.indexOf('Mac') != -1) {
      info.name = 'macOS';
      // TODO: detect macOS version
    }

    if (userAgent.indexOf('Linux') != -1 || userAgent.indexOf('X11') != -1) {
      info.name = 'Linux';
      // TODO: detect linux header version
    }

    return info;
  }

  /**
   * Detect user device type by user agent.
   * Possible types: "tablet", "desktop" and "mobile"
   */
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
