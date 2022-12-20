import {
  ApiResponseType,
  ListResponseMetaType,
  EventsViewModel,
  EventSDK,
} from '@ultras/core-api-sdk';

const eventId = 1;
const sdk = new EventSDK('dev');

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
