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
    .getCatch(eventId)
    ?.then((events: ApiResponseType<EventsViewModel, ListResponseMetaType>) => {
      console.log('EventSDK.getCatch():', {
        eventId,
        result: events,
      });
    })
    ?.catch((err: any) => {
      console.error('EventSDK.getCatch():', {
        eventId,
        error: err,
      });
    });
};
