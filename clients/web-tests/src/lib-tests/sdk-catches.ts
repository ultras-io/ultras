import {
  ApiResponseType,
  ListResponseMetaType,
  EventsViewModel,
  EventSDK,
} from '@ultras/core-api-sdk';

const eventId = 1;
const sdk = new EventSDK(process.env.REACT_APP_NODE_ENV as Mode);

export const runTest = () => {
  return sdk
    .getCatches(eventId)
    ?.then((events: ApiResponseType<EventsViewModel, ListResponseMetaType>) => {
      console.log('EventSDK.getCatches():', {
        eventId,
        result: events,
      });
    })
    ?.catch((err: any) => {
      console.error('EventSDK.getCatches():', {
        eventId,
        error: err,
      });
    });
};
