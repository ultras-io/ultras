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
    .getComments(eventId)
    ?.then((events: ApiResponseType<EventsViewModel, ListResponseMetaType>) => {
      console.log('EventSDK.getComments():', {
        eventId,
        result: events,
      });
    })
    ?.catch((err: any) => {
      console.error('EventSDK.getComments():', {
        eventId,
        error: err,
      });
    });
};
