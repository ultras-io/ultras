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

  const [store, title] = React.useMemo(() => {
    switch (type) {
      case ProfileListTypeEnum.fanClubMembers:
        return [buildFanClubMembersStore(), I18n.t('fanClubs-fans')];
      case ProfileListTypeEnum.eventMembers:
        return [buildEventMembersStore(), I18n.t('common-going')];
      case ProfileListTypeEnum.eventCatches:
        return [buildEventCatchesStore(), I18n.t('catches-event')];
      case ProfileListTypeEnum.roomCatches:
        return [buildRoomCatchesStore(), I18n.t('catches-room')];
      case ProfileListTypeEnum.matchCatches:
        return [buildMatchCatchesStore(), I18n.t('catches-match')];
    }
  }, [type]);

  const { list: storeList } = store.useSelector('list');

  React.useEffect(() => {
    switch (type) {
      case ProfileListTypeEnum.fanClubMembers:
        storeList.updateFilter({ fanClubId: id, limit: limit });
        break;
      case ProfileListTypeEnum.eventMembers:
        storeList.updateFilter({ eventId: id, limit: limit });
        break;
      case ProfileListTypeEnum.eventCatches:
        storeList.updateFilter({ eventId: id, limit: limit });
        break;
      case ProfileListTypeEnum.roomCatches:
        storeList.updateFilter({ roomId: id, limit: limit });
        break;
      case ProfileListTypeEnum.matchCatches:
        storeList.updateFilter({ matchId: id, limit: limit });
        break;
    }

    storeList.getAll();
  }, [storeList, type, id, limit]);

  return (
    <Container withSuspense>
      <ProfileListContainer
        title={title}
        loading={storeList.status === 'loading'}
        data={storeList.data}
        onEndReached={storeList.status === 'loading' ? undefined : storeList.getAll}
      />
    </Container>
  );
};

export default ProfileList;
