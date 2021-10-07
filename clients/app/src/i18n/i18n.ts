import I18n from 'react-native-i18n';

import en from './locales/en';
import am from './locales/am';

I18n.fallbacks = true;

I18n.translations = {
  en,
  am,
};

export default I18n;
