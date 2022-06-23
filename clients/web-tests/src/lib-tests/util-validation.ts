import { validateEmail, validateUsername } from '@ultras/utils';

export const runTest = () => {
  const emails = [
    'gmail@.com',
    'test@gmail.com',
    'user#gmail.com',
    'test12333@mail',
    'invalid.email[at]domain[dot]com',
  ];

  const usernames = [
    'real_madrid_bigfan.77o7',
    '.the.arsenal.bro.',
    'didier.drogba.4ever',
    'collider.1',
    'ultras.user@gmail.com',
  ];

  const results: any = {
    emails: {},
    usernames: {},
  };

  emails.forEach((email: string) => {
    results.emails[email] = validateEmail(email);
  });
  usernames.forEach((username: string) => {
    results.usernames[username] = validateUsername(username);
  });

  console.log('validation result:', results);
};
