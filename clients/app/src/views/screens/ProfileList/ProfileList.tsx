import React from 'react';
import WithSafeArea from 'views/components/base/WithSafeArea';
import ProfileListContainer from './containers/ProfileListContainer';
import buildFanClubMembersStore from 'stores/fanClubMembers';
import I18n from 'i18n/i18n';
import { ProfileListTypeEnum } from './';
import { IProfileListProps } from './types';

const ProfileList: React.FC<IProfileListProps> = ({ route }) => {
  const { id, type } = route.params;

  const [store, title] = React.useMemo(() => {
    switch (type) {
      case ProfileListTypeEnum.fanClubMembers:
        return [buildFanClubMembersStore(), I18n.t('fans')];
      case ProfileListTypeEnum.eventMemebers:
        return [buildFanClubMembersStore(), I18n.t('going')];
      case ProfileListTypeEnum.eventLikes:
        return [buildFanClubMembersStore(), I18n.t('likes')];
    }
  }, [type]);

  React.useEffect(() => {
    // store.getAll({ fanClubId: id });
    store.getAll();
  }, [store, id]);

  // const result = store.useSelector('list');
  // console.log(result);

  return (
    <WithSafeArea>
      <ProfileListContainer title={title} />
    </WithSafeArea>
  );
};

export default ProfileList;
