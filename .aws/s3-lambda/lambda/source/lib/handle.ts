/* eslint-disable no-console */

import * as configs from '../configs';
import processItem from './process';

export default async function (event: EventInterface, context: ContextInterface) {
  for (const record of event.Records) {
    try {
      const bucketName = record.s3.bucket.name;
      const objectKey = record.s3.object.key;

      // skip thumbnail and original folder files
      if (configs.isSkippable(objectKey)) {
        continue;
      }

      await processItem(bucketName, objectKey);
    } catch (e) {
      console.log('--->>> ERROR: ', e);
    }
  }
}
