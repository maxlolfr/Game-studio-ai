import test from 'node:test';
import assert from 'node:assert/strict';
import { authorized } from '../auth.js';
test('Basic authentication accepts correct credentials',()=>{
 const header='Basic '+Buffer.from('owner:correct-horse-battery').toString('base64');
 assert.equal(authorized(header,'owner','correct-horse-battery'),true);
 assert.equal(authorized(header,'owner','wrong'),false);
 assert.equal(authorized('Bearer xyz','owner','correct-horse-battery'),false);
 assert.equal(authorized(undefined,'owner','correct-horse-battery'),false);
});
