import { describe, test, expect } from 'vitest';
import { add } from './engine';

describe('basic test setup', () => {
    test('addition still works', () => {
        expect(add(1, 2)).to.equal(3);
    });
});
