import {
  ApiResponseType,
  ListResponseMetaType,
  RoomsViewModel,
  RoomSDK,
} from '@ultras/core-api-sdk';

const sdk = new RoomSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    authorId: 1,
  };

  return sdk
    .getRooms(params)
    ?.then((events: ApiResponseType<RoomsViewModel, ListResponseMetaType>) => {
      console.log('RoomSDK.getRooms():', {
        params,
        result: events,
      });
    })
    ?.catch((err: any) => {
      console.error('RoomSDK.getRooms():', {
        params,
        error: err,
      });
    });
};
