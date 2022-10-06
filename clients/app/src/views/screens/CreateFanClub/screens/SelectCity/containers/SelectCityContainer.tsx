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
  const { list } = citiesStore.useSelector('list');

  React.useLayoutEffect(() => {
    citiesStore.updateFilter({ name: searchText });
    citiesStore.getAll();
  }, [citiesStore, searchText]);

  const onSelect = React.useCallback(
    (selectedCityId: ResourceIdentifier) => {
      fanClubsStore.setAddFieldValue('cityId', selectedCityId);
      goBack();
    },
    [goBack]
  );

  return (
    <>
      <SearchCityComponent onChange={setSearchText} />

      <SelectCityComponent
        data={list.data || []}
        loading={list.status === 'loading'}
        cityId={cityId}
        onSelect={onSelect}
        onEndReached={list.status === 'loading' ? undefined : citiesStore.getAll}
      />
    </>
  );
};

export default SelectCityContainer;
