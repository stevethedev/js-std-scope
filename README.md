# Private and Protected Scope for JavaScript

One of the features that have always been painfully missing from JavaScript, in my opinion, is its conspicuous inability to use `public`, `private`, and `protected` to explicitly define the scope of class members. I would imagine that this particular quirk owes its origins to the same decisions that led to JavaScript not having a class keyword until ECMAScript 6 came about. Regardless of its origins, however, it's a feature whose absence I've always lamented — and a feature which many other developers have sought to emulate.


# What do I mean when I say *public*, *private*, and *protected* scope?

If you've been programming for a while, then chances are pretty good that you've been exposed to these concepts before. The ability to define context-based access-controls on a class member is a pretty standard feature of Object-Oriented Programming languages. A typical implementation of these keywords would follow a fairly simple set of rules:

* A class member that has been declared `public` is available to everything that is able to access an instance of the class.
* A class member that has been declared `private` is only accessible within the class that instantiated the object.
* A class member that has been declared `protected` is only accessible within the object that owns the values.


# Installation

Easy if you're using NPM:

```
npm install std-scope
```

# Usage

Create the scope by running the `create()` command from within your module:

```javascript
const { $protected, $private } = require('std-scope').create();
```

## Accessing Variables

Protected and private variables can be accessed by passing the context into the `$protected` and `$private` functions, respectively:

```javascript
$protected(this).value = 'test';
console.log($protected(this).value); // Prints "test"
```

You can also insert multiple values into the scope with one function call, by passing a dictionary of the new values as the second parameter of the function:

```javascript
$private(this, { fname: 'Steven', lname: 'The Dev' });
console.log($private(this).fname); // 'Steven'
console.log($private(this).lname); // 'The Dev'
```

# Disclaimer

There are two minor drawbacks to using this method:

1. A WeakMap is slower than attaching values directly to an object. In my testing, I've found that the performance hit allows around 1-million accesses per second.
2. The `protected` accessor can be used anywhere, so it's mostly *security by obscurity*.
