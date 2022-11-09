function respond(statusCode: number, data: any): ILambdaResponse {
  return {
    statusCode: statusCode,
    body: JSON.stringify(data),
  };
}

export default respond;
