import React from 'react';
import buildFanClubMembersStore from 'stores/fanClubMembers';
import I18n from 'i18n/i18n';
import Container from 'views/components/base/Container';
import { ProfileListTypeEnum } from './';
import { IProfileListProps } from './types';
import buildEventMembersStore from 'stores/eventMembers';
import buildEventCatchesStore from 'stores/eventCatches';
import buildRoomCatchesStore from 'stores/roomCatches';
import buildMatchCatchesStore from 'stores/matchCatches';

const ProfileListContainer = React.lazy(
  () => import('./containers/ProfileListContainer')
);

const defaultLimitation = 10;

const ProfileList: React.FC<IProfileListProps> = ({ route }) => {
  const { id, type, limit = defaultLimitation } = route.params;

  const [store, title, initialFilter] = React.useMemo(() => {
    switch (type) {
      case ProfileListTypeEnum.fanClubMembers:
        return [buildFanClubMembersStore(), I18n.t('fanClubs-fans'), { fanClubId: id }];
      case ProfileListTypeEnum.eventMembers:
        return [buildEventMembersStore(), I18n.t('common-going'), { eventId: id }];
      case ProfileListTypeEnum.eventCatches:
        return [buildEventCatchesStore(), I18n.t('catches-event'), { eventId: id }];
      case ProfileListTypeEnum.roomCatches:
        return [buildRoomCatchesStore(), I18n.t('catches-room'), { roomId: id }];
      case ProfileListTypeEnum.matchCatches:
        return [buildMatchCatchesStore(), I18n.t('catches-match'), { matchId: id }];
    }
  }, [type, id]);

  const { list: storeList } = store.useSelector('list');

  React.useEffect(() => {
    storeList.updateFilter({ ...initialFilter, limit: limit });
    storeList.getAll();
  }, [storeList, limit, initialFilter]);

  return (
    <Container withSuspense>
      <ProfileListContainer
        title={title}
        loading={storeList.status === 'loading'}
        data={storeList.data}
        onEndReached={storeList.getAll}
      />
    </Container>
  );
};

export default ProfileList;
