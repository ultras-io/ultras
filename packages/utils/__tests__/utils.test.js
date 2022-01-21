'use strict';

const assert = require('assert');

const { generateToken } = require('../build/helpers');

describe('utils', () => {
  describe('@ultras/utils/helpers/generateToken', () => {
    // numeric token
    it('should generate four digit token.', () => {
      const token = generateToken(4, {
        number: true,
      });

      assert.match(token, /^\d{4}$/, `Not valid token: ${token}`);
    });

    // lowercase token
    it('should generate seven lowercase only token.', () => {
      const token = generateToken(7, {
        lower: true,
      });

      assert.match(token, /^[a-z]{7}$/, `Not valid token: ${token}`);
    });

    // uppercase token
    it('should generate seven uppercase only token.', () => {
      const token = generateToken(7, {
        upper: true,
      });

      assert.match(token, /^[A-Z]{7}$/, `Not valid token: ${token}`);
    });

    // characters token
    it('should generate five characters token.', () => {
      const token = generateToken(7, {
        upper: true,
        lower: true,
      });

      assert.match(token, /^[A-Za-z]{7}$/, `Not valid token: ${token}`);
    });

    // full token
    it('should generate twelve full token.', () => {
      const token = generateToken(12, {
        upper: true,
        lower: true,
        number: true,
        symbol: true,
      });

      assert.match(token, /^[A-Za-z0-9\+\-\_]{12}$/, `Not valid token: ${token}`);
    });
  });
});
