/**
 * @author Ruben Aprikyan
 */

'use strict';

const errorModifier = require('./errorModifier');
const responseModifier = require('./responseModifier');
const setResponse = require('./setResponse');

module.exports = {
  errorModifier,
  responseModifier,
  setResponse
};
