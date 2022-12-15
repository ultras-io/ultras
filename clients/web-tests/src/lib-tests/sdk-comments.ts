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
