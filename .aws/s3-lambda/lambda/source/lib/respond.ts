function respond(statusCode: number, data: any): LambdaResponseInterface {
  return {
    statusCode: statusCode,
    body: JSON.stringify(data),
  };
}

export default respond;
