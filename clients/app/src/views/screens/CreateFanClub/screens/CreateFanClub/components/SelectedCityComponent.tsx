import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import buildCitiesStore from 'stores/cities';
import { ISelectedCityProps } from '../types';
import { Loader } from 'views/components/base/ListComponents';
import KeyValue from 'views/components/base/KeyValue';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

const store = buildCitiesStore();

const SelectedCityComponent: React.FC<ISelectedCityProps> = ({ cityId }) => {
  const { pushTo } = useNavigationWithParams();
  const { single: storeSingle } = store.useSelector('single');

  React.useEffect(() => {
    if (cityId) {
      storeSingle.getSingle(cityId);
    }
  }, [cityId, storeSingle]);

  const rightComponent = React.useMemo(() => {
    if (!cityId) {
      return (
        <Text variant={'matchDate'} onPress={() => pushTo('SelectCity')}>
          {I18n.t('common-select')}
        </Text>
      );
    }

    if (storeSingle.status === 'loading') {
      return <Loader />;
    }

    return (
      <Text variant={'matchDate'} textAlign="right" onPress={() => pushTo('SelectCity')}>
        {storeSingle.data?.name}, {storeSingle.data?.country.name}
      </Text>
    );
  }, [
    cityId,
    storeSingle.status,
    storeSingle.data?.name,
    storeSingle.data?.country.name,
    pushTo,
  ]);

  return (
    <KeyValue
      name={I18n.t('fanClubs-add-details-city')}
      description={I18n.t('fanClubs-add-details-cityDescription')}
      value={rightComponent}
    />
  );
};

export default SelectedCityComponent;
