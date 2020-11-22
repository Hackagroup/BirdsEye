# NodeJS-codestyle

> Code style for Node.js project

## Table Of Content

* [Naming Conventions](#naming-conventions)
* [Requires](#requires)
* [Strict](#strict)

## Requires

Organize your node requires in the following order:

1. core modules
2. npm modules
3. project modules
4. variable definitions etc

```js
// bad
var Car = require('./models/Car')
var async = require('async')
var http = require('http')

// good
var http = require('http')
var fs = require('fs')

var async = require('async')
var mongoose = require('mongoose')

var Car = require('./models/Car')
```

## Exports

Put module exports right after requires,

```
var http = require('http')

module.exports = SampleHTTPServer

function SampleHTTPServer() {

}
```

## Naming Conventions

Use a leading underscore `_` when naming private properties.

```js
// bad
this.__firstName__ = 'Panda'
this.firstName_ = 'Panda'

// good
this._firstName = 'Panda'
```

Use a postfix `Async` when naming function return promise (or async functions).

```
function readFileAsync(...) {
    return new Promise((resolve, reject) => {
        fs.readFile(..., (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}

async function anotherReadFileAsync(...) {
    await readFileAsync(...)
}
```

Use alternative names for native module function to avoid conflicts

```js
// bad
var path = require('path')
path.join('a', 'b')
// we can't use the common path variable anymore

// good
var joinPath = require('path').join
joinPath('a', 'b')
var path = req.path

```

## Strict

Use `'use strict'` in every Node.js module to support keyword like `let` and [avoid certain mistakes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode#Changes_in_strict_mode).