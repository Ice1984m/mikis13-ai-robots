import test from 'node:test';
import assert from 'node:assert/strict';
import { getConfig } from '../config.mjs';
import { tokenMatches } from '../security.mjs';

test('config supplies safe local defaults', () => {
  const config = getConfig({});
  assert.equal(config.dashboardPort, 4700);
  assert.equal(config.localAiUrl, 'http://127.0.0.1:8080');
  assert.equal(config.token, '');
});

test('config trims trailing slashes from local AI URL', () => {
  assert.equal(getConfig({ LOCAL_AI_URL: 'http://127.0.0.1:11434///' }).localAiUrl, 'http://127.0.0.1:11434');
});

test('token comparison accepts only exact non-empty tokens', () => {
  assert.equal(tokenMatches('secret-value', 'secret-value'), true);
  assert.equal(tokenMatches('wrong-value', 'secret-value'), false);
  assert.equal(tokenMatches('', 'secret-value'), false);
  assert.equal(tokenMatches(undefined, 'secret-value'), false);
  assert.equal(tokenMatches('secret-value', ''), false);
});
