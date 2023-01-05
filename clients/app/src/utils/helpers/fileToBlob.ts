/**
 * @NOTICE: this function not working on iOS simulator.
 */
export async function fileToBlob(fileUri: string) {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();

  return imageBody;
}
