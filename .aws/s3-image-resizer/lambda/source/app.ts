import handleImages from './lib/handle';
import respond from './lib/respond';

export async function handler(event: IEvent, context: IContext) {
  try {
    await handleImages(event, context);

    return respond(200, {
      success: true,
    });
  } catch (err) {
    console.error(err);

    return respond(500, {
      success: false,
      message: 'Something Went Wrong!',
    });
  }
}
