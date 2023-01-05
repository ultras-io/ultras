import { UltrasS3SDK } from '@ultras/core-api-sdk';

const sdk = new UltrasS3SDK(process.env.REACT_APP_NODE_ENV as Mode);

const buildImageFile = (): File => {
  const b64Data =
    'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  const byteCharacters = atob(b64Data);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: 'image/png',
  });

  return new File([blob], 'avatar.png');
};

export const runTest = () => {
  const fileToUpload: File = buildImageFile();

  const params = {
    folder: 'fanClubAvatar',
    file: fileToUpload,
  };

  return sdk
    .upload(params)
    ?.then((result: any) => {
      console.log('UltrasS3SDK.upload():', {
        params,
        result: result,
      });
    })
    ?.catch((err: any) => {
      console.error('UltrasS3SDK.upload():', {
        params,
        error: err,
      });
    });
};
