import React from 'react';
import { IMatchCatchComponentProps } from '../types';
import Catch, { CatchTypeEnum } from 'views/components/base/Catch';
import buildMatchCatchesStore from 'stores/matchCatches';

const MatchCatchComponent: React.FC<IMatchCatchComponentProps> = ({ data }) => {
  const matchCatchesStore = React.useMemo(() => buildMatchCatchesStore(), []);

  const { add: storeCatchesAdd, delete: storeCatchesDelete } =
    matchCatchesStore.useSelector('add', 'delete');

  const [isCaught, setIsCaught] = React.useState(data.caught || false);

  const onCatchPress = React.useCallback(() => {
    setIsCaught(!isCaught);

    if (isCaught) {
      storeCatchesDelete.remove({ matchId: data.id });
    } else {
      storeCatchesAdd.setFieldValue('matchId', data.id);
      storeCatchesAdd.create();
    }
  }, [isCaught, data.id, storeCatchesAdd, storeCatchesDelete]);

  React.useEffect(() => {
    setIsCaught(data.caught || false);
  }, [data.caught]);

  React.useEffect(() => {
    if (storeCatchesAdd.status === 'error') {
      setIsCaught(false);
    }
    if (storeCatchesDelete.status === 'error') {
      setIsCaught(true);
    }
  }, [isCaught, storeCatchesAdd.status, storeCatchesDelete.status]);

  return (
    <Catch
      catchType={CatchTypeEnum.match}
      catchResourceId={data.id}
      // count={data.catchesCount}
      isCaught={isCaught}
      onPress={onCatchPress}
    />
  );
};

export default MatchCatchComponent;
