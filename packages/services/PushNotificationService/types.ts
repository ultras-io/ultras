export type MessageInstanceType = {
  title: string;
  message: string;
  data?: Record<string, string | number | boolean>;
  imageUrl?: string;
};

export type SendByTopicType = MessageInstanceType & {
  topic: string;
};

export type SendByConditionType = MessageInstanceType & {
  condition: string;
};

export type SendByTokenType = MessageInstanceType & {
  tokens: Array<string>;
};

export type MessageType = SendByTopicType | SendByConditionType | SendByTokenType;
