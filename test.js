/**
 * @author Steven Jimenez <steven@stevethedev.com>
 */
'use strict';

const assert = require('assert');
let indent = 0;

describe('protected scope', () => {
    it('should create a $protected function', () => {
        const { $protected } = require('.').create();
        assert.equal(typeof $protected, 'function');
    });
    it('should share variables up the prototype chain', () => {
        const { $protected } = require('.').create();
        class Parent {
            constructor() {
                $protected(this, { self: Parent });
            }
            
            getSelf() {
                return $protected(this).self;
            }
        }
        class Child extends Parent {
            constructor() {
                super();
                $protected(this, { self: Child });
            }
        }

        const parent = new Parent();
        const child  = new Child();

        assert.equal(parent.getSelf(), Parent);
        assert.equal(child.getSelf(), Child);
    });
    it('should share variables down the prototype chain', () => {
        const { $protected } = require('.').create();

        class Parent {
            constructor() {
                $protected(this, { self: Parent });
            }
            getSelf() {
                return $protected(this).self;
            }
        }

        class Child extends Parent {
        }

        const parent = new Parent();
        const child  = new Child();

        assert.equal(parent.getSelf(), Parent);
        assert.equal(child.getSelf(), Parent);
    });
});
describe('private scope', () => {
    it('should create a $private function', () => {
        const { $private } = require('.').create();
        assert.equal(typeof $private, 'function');
    });
    it('should not share variables up the prototype chain', () => {
        const Parent = (function() {
            const { $private } = require('.').create();
            return class Parent {
                constructor() {
                    $private(this, { self: Parent });
                }
                
                getSelf() {
                    return $private(this).self;
                }
            }
        })();
        const Child = (function() {
            const { $private } = require('.').create();
            return class Child extends Parent {
                constructor() {
                    super();
                    $private(this, { self: Child });
                }
            };
        })();

        const parent = new Parent();
        const child  = new Child();

        assert.equal(parent.getSelf(), Parent);
        assert.equal(child.getSelf(), Parent);
    });
    it('should not share variables down the prototype chain', () => {
        const Parent = (function() {
            const { $private } = require('.').create();
            return class Parent {
                constructor() {
                    $private(this, { self: Parent });
                }
                getSelf() {
                    return $private(this).self;
                }
            };
        })();

        const Child = (function() {
            const { $private } = require('.').create();
            return class Child extends Parent {
                constructor() {
                    super();
                    $private(this, { self: Child });
                }
                getSelf() {
                    return $private(this).self;
                }
            };
        })();

        const parent = new Parent();
        const child  = new Child();

        assert.equal(parent.getSelf(), Parent);
        assert.equal(child.getSelf(), Child);
    });
});
