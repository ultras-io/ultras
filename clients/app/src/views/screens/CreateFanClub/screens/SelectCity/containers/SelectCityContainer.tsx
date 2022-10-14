import React from 'react';
import buildCitiesStore from 'stores/cities';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SearchCityComponent from '../components/SearchCityComponent';
import SelectCityComponent from '../components/SelectCityComponent';
import { fanClubsStore } from '../../../store';
import { ISelectCityContainerProps } from '../types';

const SelectCityContainer: React.FC<ISelectCityContainerProps> = ({ cityId }) => {
  const { goBack } = useNavigationWithParams();
  const citiesStore = React.useMemo(() => buildCitiesStore(), []);

  const [searchText, setSearchText] = React.useState<string>('');
  const { list: storeList } = citiesStore.useSelector('list');

  React.useLayoutEffect(() => {
    storeList.updateFilter({ name: searchText });
    storeList.getAll();
  }, [citiesStore, searchText, storeList]);

  const onSelect = React.useCallback(
    (selectedCityId: ResourceIdentifier) => {
      fanClubsStore.add.setFieldValue('cityId', selectedCityId);
      goBack();
    },
    [goBack]
  );

  return (
    <>
      <SearchCityComponent onChange={setSearchText} />

      <SelectCityComponent
        data={storeList.data || []}
        loading={storeList.status === 'loading'}
        cityId={cityId}
        onSelect={onSelect}
        onEndReached={storeList.status === 'loading' ? undefined : storeList.getAll}
      />
    </>
  );
};

export default SelectCityContainer;
