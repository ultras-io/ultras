import { Message } from '../types';

const messages: Message[][] = [
  [
    {
      text: 'Flow 1',
      textProps: {
        fontWeight: 700,
      },
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      text: '\nLet’s begin',
      textProps: {
        fontWeight: 700,
      },
    },
  ],
  [
    {
      text: 'For becoming Ultras user, we need to verify you. Just enter your phone number, verify it by entering confirmation code and you are welcome to the family.',
    },
  ],
  [
    {
      text: 'Please enter 4-digit code sent to',
    },
    {
      text: (phoneNumber: string) => phoneNumber,
      textProps: {
        fontWeight: 700,
        fontSize: '6xl',
      },
    },
    {
      jumpToStep: 2,
      text: 'Change Number',
      textProps: {
        variant: 'link',
      },
    },
  ],
  [
    {
      text: 'Almost done',
    },
  ],
  [
    {
      text: 'What’s your full name?',
    },
  ],
];

export default messages;
