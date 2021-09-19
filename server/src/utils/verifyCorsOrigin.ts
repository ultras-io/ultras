import { Context } from 'koa';
import { whiteList } from '../config';

/**
 * The function helps to accept requests from only from whitelisted origins
 * @see <koa-cors> documentation
 * @param {String} origin - requester origin
 * @returns {string} - the requester origin or false if it is not allowed
 */
const verifier = ({ headers: { origin = '' } }: Context): string => {
  const white = whiteList ? whiteList.split(',') : null;
  return white && white.includes(origin) ? origin : '*';
};

export default verifier;
