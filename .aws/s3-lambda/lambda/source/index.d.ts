declare interface IRecord {
  eventVersion: string;
  eventSource: string;
  awsRegion: string;
  eventTime: string;
  eventName: string;
  userIdentity: {
    principalId: string;
  };
  requestParameters: {
    sourceIPAddress: string;
  };
  responseElements: Record<string, any>;
  s3: {
    s3SchemaVersion: string;
    configurationId: string;
    bucket: {
      name: string;
      ownerIdentity: {
        principalId: string;
      };
      arn: string;
    };
    object: {
      key: string;
      size: number;
      eTag: string;
      sequencer: string;
    };
  };
}

declare interface IEvent {
  Records: Array<IRecord>;
}

declare interface IContext {
  // ...
}

declare interface ILambdaResponse {
  isBase64Encoded?: boolean;
  statusCode: number;
  headers?: Record<string, any>;
  multiValueHeaders?: Record<string, any>;
  body: string;
}
