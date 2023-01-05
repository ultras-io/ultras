import {
  ApiResponseType,
  ListResponseMetaType,
  EventsViewModel,
  EventSDK,
} from '@ultras/core-api-sdk';

const sdk = new EventSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  const params = {
    authorId: 1,
  };

  return sdk
    .getEvents(params)
    ?.then((events: ApiResponseType<EventsViewModel, ListResponseMetaType>) => {
      console.log('EventSDK.getEvents():', {
        params,
        result: events,
      });
    })
    ?.catch((err: any) => {
      console.error('EventSDK.getEvents():', {
        params,
        error: err,
      });
    });
};
