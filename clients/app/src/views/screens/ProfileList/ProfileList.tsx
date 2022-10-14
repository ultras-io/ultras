import React from 'react';
import buildFanClubMembersStore from 'stores/fanClubMembers';
import I18n from 'i18n/i18n';
import Container from 'views/components/base/Container';
import { ProfileListTypeEnum } from './';
import { IProfileListProps } from './types';

const ProfileListContainer = React.lazy(
  () => import('./containers/ProfileListContainer')
);

const ProfileList: React.FC<IProfileListProps> = ({ route }) => {
  const { id, type } = route.params;

  const [store, title] = React.useMemo(() => {
    switch (type) {
      case ProfileListTypeEnum.fanClubMembers:
        return [buildFanClubMembersStore(), I18n.t('fanClubs-fans')];
      case ProfileListTypeEnum.eventMembers:
        return [buildFanClubMembersStore(), I18n.t('common-going')];
      case ProfileListTypeEnum.eventLikes:
        return [buildFanClubMembersStore(), I18n.t('common-likes')];
    }
  }, [type]);

  const { list: storeList } = store.useSelector('list');

  React.useEffect(() => {
    // storeList.getAll({ fanClubId: id });
    storeList.getAll();
  }, [storeList, id]);

  return (
    <Container withSuspense>
      <ProfileListContainer title={title} />
    </Container>
  );
};

export default ProfileList;
