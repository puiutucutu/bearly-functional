'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var util = _interopDefault(require('util'));
var os = require('os');

var empty = function empty(x) {
  return !!x;
}; // a -> Boolean

var identity = function identity(x) {
  return x;
}; // a -> a



var index = /*#__PURE__*/Object.freeze({
	empty: empty,
	identity: identity
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof commonjsGlobal == O && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var hide = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    hide(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var isPure = false;

var shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var functionToString = shared('native-function-to-string', Function.toString);

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store = new WeakMap$1();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(functionToString).split('toString');

shared('inspectSource', function (it) {
  return functionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var Symbol$1 = global_1.Symbol;
var store$1 = shared('wks');

var wellKnownSymbol = function (name) {
  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var sanctuaryShow = createCommonjsModule(function (module) {
//. # sanctuary-show
//.
//. Haskell has a `show` function which can be applied to a compatible value to
//. produce a descriptive string representation of that value. The idea is that
//. the string representation should, if possible, be an expression which would
//. produce the original value if evaluated.
//.
//. This library provides a similar [`show`](#show) function.
//.
//. In general, this property should hold: `eval (show (x)) = x`. In some cases
//. parens are necessary to ensure correct interpretation (`{}`, for example,
//. is an empty block rather than an empty object in some contexts). Thus the
//. property is more accurately stated `eval ('(' + show (x) + ')') = x`.
//.
//. One can make values of a custom type compatible with [`show`](#show) by
//. defining a `@@show` method. For example:
//.
//. ```javascript
//. //# Maybe#@@show :: Maybe a ~> () -> String
//. //.
//. //. ```javascript
//. //. > show (Nothing)
//. //. 'Nothing'
//. //.
//. //. > show (Just (['foo', 'bar', 'baz']))
//. //. 'Just (["foo", "bar", "baz"])'
//. //. ```
//. Maybe.prototype['@@show'] = function() {
//.   return this.isNothing ? 'Nothing' : 'Just (' + show (this.value) + ')';
//. };
//. ```

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f();
  }

}(function() {

  //  $$show :: String
  var $$show = '@@show';

  //  seen :: Array Any
  var seen = [];

  //  entry :: Object -> String -> String
  function entry(o) {
    return function(k) {
      return show(k) + ': ' + show(o[k]);
    };
  }

  //# show :: Showable a => a -> String
  //.
  //. Returns a useful string representation of the given value.
  //.
  //. Dispatches to the value's `@@show` method if present.
  //.
  //. Where practical, `show (eval ('(' + show (x) + ')')) = show (x)`.
  //.
  //. ```javascript
  //. > show (null)
  //. 'null'
  //.
  //. > show (undefined)
  //. 'undefined'
  //.
  //. > show (true)
  //. 'true'
  //.
  //. > show (new Boolean (false))
  //. 'new Boolean (false)'
  //.
  //. > show (-0)
  //. '-0'
  //.
  //. > show (NaN)
  //. 'NaN'
  //.
  //. > show (new Number (Infinity))
  //. 'new Number (Infinity)'
  //.
  //. > show ('foo\n"bar"\nbaz\n')
  //. '"foo\\n\\"bar\\"\\nbaz\\n"'
  //.
  //. > show (new String (''))
  //. 'new String ("")'
  //.
  //. > show (['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > show ([[[[[0]]]]])
  //. '[[[[[0]]]]]'
  //.
  //. > show ({x: [1, 2], y: [3, 4], z: [5, 6]})
  //. '{"x": [1, 2], "y": [3, 4], "z": [5, 6]}'
  //. ```
  function show(x) {
    if (seen.indexOf(x) >= 0) return '<Circular>';

    switch (Object.prototype.toString.call(x)) {

      case '[object Boolean]':
        return typeof x === 'object' ?
          'new Boolean (' + show(x.valueOf()) + ')' :
          x.toString();

      case '[object Number]':
        return typeof x === 'object' ?
          'new Number (' + show(x.valueOf()) + ')' :
          1 / x === -Infinity ? '-0' : x.toString(10);

      case '[object String]':
        return typeof x === 'object' ?
          'new String (' + show(x.valueOf()) + ')' :
          JSON.stringify(x);

      case '[object Date]':
        return 'new Date (' +
               show(isNaN(x.valueOf()) ? NaN : x.toISOString()) +
               ')';

      case '[object Error]':
        return 'new ' + x.name + ' (' + show(x.message) + ')';

      case '[object Arguments]':
        return 'function () { return arguments; } (' +
               Array.prototype.map.call(x, show).join(', ') +
               ')';

      case '[object Array]':
        seen.push(x);
        try {
          return '[' + x.map(show).concat(
            Object.keys(x)
            .sort()
            .filter(function(k) { return !/^\d+$/.test(k); })
            .map(entry(x))
          ).join(', ') + ']';
        } finally {
          seen.pop();
        }

      case '[object Object]':
        seen.push(x);
        try {
          return (
            $$show in x &&
            (x.constructor == null || x.constructor.prototype !== x) ?
              x[$$show]() :
              '{' + Object.keys(x).sort().map(entry(x)).join(', ') + '}'
          );
        } finally {
          seen.pop();
        }

      default:
        return String(x);

    }
  }

  return show;

}));
});

var sanctuaryTypeIdentifiers = createCommonjsModule(function (module) {
/*
        @@@@@@@            @@@@@@@         @@
      @@       @@        @@       @@      @@@
    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
      @@                 @@                           @@  @@
        @@@@@@@            @@@@@@@               @@@@@    @@
                                                          */
//. # sanctuary-type-identifiers
//.
//. A type is a set of values. Boolean, for example, is the type comprising
//. `true` and `false`. A value may be a member of multiple types (`42` is a
//. member of Number, PositiveNumber, Integer, and many other types).
//.
//. In certain situations it is useful to divide JavaScript values into
//. non-overlapping types. The language provides two constructs for this
//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
//. Each has pros and cons, but neither supports user-defined types.
//.
//. sanctuary-type-identifiers comprises:
//.
//.   - an npm and browser -compatible package for deriving the
//.     _type identifier_ of a JavaScript value; and
//.   - a specification which authors may follow to specify type
//.     identifiers for their types.
//.
//. ### Specification
//.
//. For a type to be compatible with the algorithm:
//.
//.   - every member of the type MUST have a `constructor` property
//.     pointing to an object known as the _type representative_;
//.
//.   - the type representative MUST have a `@@type` property
//.     (the _type identifier_); and
//.
//.   - the type identifier MUST be a string primitive and SHOULD have
//.     format `'<namespace>/<name>[@<version>]'`, where:
//.
//.       - `<namespace>` MUST consist of one or more characters, and
//.         SHOULD equal the name of the npm package which defines the
//.         type (including [scope][3] where appropriate);
//.
//.       - `<name>` MUST consist of one or more characters, and SHOULD
//.         be the unique name of the type; and
//.
//.       - `<version>` MUST consist of one or more digits, and SHOULD
//.         represent the version of the type.
//.
//. If the type identifier does not conform to the format specified above,
//. it is assumed that the entire string represents the _name_ of the type;
//. _namespace_ will be `null` and _version_ will be `0`.
//.
//. If the _version_ is not given, it is assumed to be `0`.
//.
//. For example:
//.
//. ```javascript
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   if (!(this instanceof Identity)) return new Identity(x);
//.   this.value = x;
//. }
//.
//. Identity['@@type'] = 'my-package/Identity';
//. ```
//.
//. Note that by using a constructor function the `constructor` property is set
//. implicitly for each value created. Constructor functions are convenient for
//. this reason, but are not required. This definition is also valid:
//.
//. ```javascript
//. //  IdentityTypeRep :: TypeRep Identity
//. var IdentityTypeRep = {
//.   '@@type': 'my-package/Identity'
//. };
//.
//. //  Identity :: a -> Identity a
//. function Identity(x) {
//.   return {constructor: IdentityTypeRep, value: x};
//. }
//. ```

(function(f) {

  {
    module.exports = f();
  }

}(function() {

  //  $$type :: String
  var $$type = '@@type';

  //  pattern :: RegExp
  var pattern = new RegExp(
    '^'
  + '([\\s\\S]+)'   //  <namespace>
  + '/'             //  SOLIDUS (U+002F)
  + '([\\s\\S]+?)'  //  <name>
  + '(?:'           //  optional non-capturing group {
  +   '@'           //    COMMERCIAL AT (U+0040)
  +   '([0-9]+)'    //    <version>
  + ')?'            //  }
  + '$'
  );

  //. ### Usage
  //.
  //. ```javascript
  //. const type = require('sanctuary-type-identifiers');
  //. ```
  //.
  //. ```javascript
  //. > function Identity(x) {
  //. .   if (!(this instanceof Identity)) return new Identity(x);
  //. .   this.value = x;
  //. . }
  //. . Identity['@@type'] = 'my-package/Identity@1';
  //.
  //. > type.parse(type(Identity(0)))
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  //.
  //. ### API
  //.
  //# type :: Any -> String
  //.
  //. Takes any value and returns a string which identifies its type. If the
  //. value conforms to the [specification][4], the custom type identifier is
  //. returned.
  //.
  //. ```javascript
  //. > type(null)
  //. 'Null'
  //.
  //. > type(true)
  //. 'Boolean'
  //.
  //. > type(Identity(0))
  //. 'my-package/Identity@1'
  //. ```
  function type(x) {
    return x != null &&
           x.constructor != null &&
           x.constructor.prototype !== x &&
           typeof x.constructor[$$type] === 'string' ?
      x.constructor[$$type] :
      Object.prototype.toString.call(x).slice('[object '.length, -']'.length);
  }

  //# type.parse :: String -> { namespace :: Nullable String, name :: String, version :: Number }
  //.
  //. Takes any string and parses it according to the [specification][4],
  //. returning an object with `namespace`, `name`, and `version` fields.
  //.
  //. ```javascript
  //. > type.parse('my-package/List@2')
  //. {namespace: 'my-package', name: 'List', version: 2}
  //.
  //. > type.parse('nonsense!')
  //. {namespace: null, name: 'nonsense!', version: 0}
  //.
  //. > type.parse(Identity['@@type'])
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  type.parse = function parse(s) {
    var groups = pattern.exec(s);
    return {
      namespace: groups == null || groups[1] == null ? null : groups[1],
      name:      groups == null                      ? s    : groups[2],
      version:   groups == null || groups[3] == null ? 0    : Number(groups[3])
    };
  };

  return type;

}));

//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//. [3]: https://docs.npmjs.com/misc/scope
//. [4]: #specification
});

var sanctuaryTypeClasses = createCommonjsModule(function (module) {
/*
             ############                  #
            ############                  ###
                  #####                  #####
                #####      ####################
              #####       ######################
            #####                     ###########
          #####         ######################
        #####          ####################
      #####                        #####
     ############                 ###
    ############                 */

//. # sanctuary-type-classes
//.
//. The [Fantasy Land Specification][FL] "specifies interoperability of common
//. algebraic structures" by defining a number of type classes. For each type
//. class, it states laws which every member of a type must obey in order for
//. the type to be a member of the type class. In order for the Maybe type to
//. be considered a [Functor][], for example, every `Maybe a` value must have
//. a `fantasy-land/map` method which obeys the identity and composition laws.
//.
//. This project provides:
//.
//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
//.   - one `TypeClass` value for each Fantasy Land type class;
//.   - lawful Fantasy Land methods for JavaScript's built-in types;
//.   - one function for each Fantasy Land method; and
//.   - several functions derived from these functions.
//.
//. ## Type-class hierarchy
//.
/* eslint-disable max-len */
//. <pre>
//.  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
//. (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
//.     |           |           |           \         / | | | | \
//.     |           |           |            \       /  | | | |  \
//.     |           |           |             \     /   | | | |   \
//.     |           |           |              \   /    | | | |    \
//.     |           |           |               \ /     | | | |     \
//.    Ord      Category     Monoid         Traversable | | | |      \
//.   (lte)       (id)       (empty)        (traverse)  / | | \       \
//.                             |                      /  | |  \       \
//.                             |                     /   / \   \       \
//.                             |             Profunctor /   \ Bifunctor \
//.                             |              (promap) /     \ (bimap)   \
//.                             |                      /       \           \
//.                           Group                   /         \           \
//.                          (invert)               Alt        Apply      Extend
//.                                                (alt)        (ap)     (extend)
//.                                                 /           / \           \
//.                                                /           /   \           \
//.                                               /           /     \           \
//.                                              /           /       \           \
//.                                             /           /         \           \
//.                                           Plus    Applicative    Chain      Comonad
//.                                          (zero)       (of)      (chain)    (extract)
//.                                             \         / \         / \
//.                                              \       /   \       /   \
//.                                               \     /     \     /     \
//.                                                \   /       \   /       \
//.                                                 \ /         \ /         \
//.                                             Alternative    Monad     ChainRec
//.                                                                     (chainRec)
//. </pre>
/* eslint-enable max-len */
//.
//. ## API

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (sanctuaryTypeIdentifiers);
  }

} (function(type) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    /* eslint-disable no-unused-vars */
    var Identity = __doctest.require ('sanctuary-identity');
    var List = __doctest.require ('./test/List');
    var Maybe = __doctest.require ('sanctuary-maybe');
    var Pair = __doctest.require ('sanctuary-pair');
    var Sum = __doctest.require ('./test/Sum');

    var Nil = List.Nil, Cons = List.Cons;
    var Nothing = Maybe.Nothing, Just = Maybe.Just;
    /* eslint-enable no-unused-vars */
  }

  //  concat_ :: Array a -> Array a -> Array a
  function concat_(xs) {
    return function(ys) {
      return xs.concat (ys);
    };
  }

  //  constant :: a -> b -> a
  function constant(x) {
    return function(y) {
      return x;
    };
  }

  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
  function forEachKey(strMap, f) {
    (Object.keys (strMap)).forEach (f, strMap);
  }

  //  has :: (String, Object) -> Boolean
  function has(k, o) {
    return Object.prototype.hasOwnProperty.call (o, k);
  }

  //  identity :: a -> a
  function identity(x) { return x; }

  //  pair :: a -> b -> Array2 a b
  function pair(x) {
    return function(y) {
      return [x, y];
    };
  }

  //  sameType :: (a, b) -> Boolean
  function sameType(x, y) {
    return typeof x === typeof y && type (x) === type (y);
  }

  //  sortedKeys :: Object -> Array String
  function sortedKeys(o) {
    return (Object.keys (o)).sort ();
  }

  //  thrush :: a -> (a -> b) -> b
  function thrush(x) {
    return function(f) {
      return f (x);
    };
  }

  //  unary :: (a -> b) -> (a, Any...) -> b
  function unary(f) {
    return function(x) {
      return f (x);
    };
  }

  //  type Iteration a = { value :: a, done :: Boolean }

  //  iterationNext :: a -> Iteration a
  function iterationNext(x) { return {value: x, done: false}; }

  //  iterationDone :: a -> Iteration a
  function iterationDone(x) { return {value: x, done: true}; }

  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
  //.
  //. The arguments are:
  //.
  //.   - the name of the type class, prefixed by its npm package name;
  //.   - the documentation URL of the type class;
  //.   - an array of dependencies; and
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if the value satisfies the requirements of the type class; `false`
  //.     otherwise.
  //.
  //. Example:
  //.
  //. ```javascript
  //. //    hasMethod :: String -> a -> Boolean
  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
  //.
  //. //    Foo :: TypeClass
  //. const Foo = Z.TypeClass (
  //.   'my-package/Foo',
  //.   'http://example.com/my-package#Foo',
  //.   [],
  //.   hasMethod ('foo')
  //. );
  //.
  //. //    Bar :: TypeClass
  //. const Bar = Z.TypeClass (
  //.   'my-package/Bar',
  //.   'http://example.com/my-package#Bar',
  //.   [Foo],
  //.   hasMethod ('bar')
  //. );
  //. ```
  //.
  //. Types whose values have a `foo` method are members of the Foo type class.
  //. Members of the Foo type class whose values have a `bar` method are also
  //. members of the Bar type class.
  //.
  //. Each `TypeClass` value has a `test` field: a function which accepts
  //. any JavaScript value and returns `true` if the value satisfies the
  //. type class's predicate and the predicates of all the type class's
  //. dependencies; `false` otherwise.
  //.
  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
  //. to define parametrically polymorphic functions which verify their
  //. type-class constraints at run time.
  function TypeClass(name, url, dependencies, test) {
    if (!(this instanceof TypeClass)) {
      return new TypeClass (name, url, dependencies, test);
    }
    this.name = name;
    this.url = url;
    this.test = function(x) {
      return dependencies.every (function(d) { return d.test (x); }) &&
             test (x);
    };
  }

  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass@1';

  //  data Location = Constructor | Value

  //  Constructor :: Location
  var Constructor = 'Constructor';

  //  Value :: Location
  var Value = 'Value';

  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
  function _funcPath(allowInheritedProps, path, _x) {
    var x = _x;
    for (var idx = 0; idx < path.length; idx += 1) {
      var k = path[idx];
      if (x == null || !(allowInheritedProps || has (k, x))) return null;
      x = x[k];
    }
    return typeof x === 'function' ? x : null;
  }

  //  funcPath :: (Array String, a) -> Nullable Function
  function funcPath(path, x) {
    return _funcPath (true, path, x);
  }

  //  implPath :: Array String -> Nullable Function
  function implPath(path) {
    return _funcPath (false, path, implementations);
  }

  //  functionName :: Function -> String
  var functionName = has ('name', function f() {}) ?
    function functionName(f) { return f.name; } :
    /* istanbul ignore next */
    function functionName(f) {
      var match = /function (\w*)/.exec (f);
      return match == null ? '' : match[1];
    };

  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
  function $(_name, dependencies, requirements) {
    function getBoundMethod(_name) {
      var name = 'fantasy-land/' + _name;
      return requirements[_name] === Constructor ?
        function(typeRep) {
          var f = funcPath ([name], typeRep);
          return f == null && typeof typeRep === 'function' ?
            implPath ([functionName (typeRep), name]) :
            f;
        } :
        function(x) {
          var isPrototype = x != null &&
                            x.constructor != null &&
                            x.constructor.prototype === x;
          var m = null;
          if (!isPrototype) m = funcPath ([name], x);
          if (m == null)    m = implPath ([type (x), 'prototype', name]);
          return m && m.bind (x);
        };
    }

    var version = '10.0.0';  // updated programmatically
    var keys = Object.keys (requirements);

    var typeClass = TypeClass (
      'sanctuary-type-classes/' + _name,
      'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version
        + '#' + _name,
      dependencies,
      function(x) {
        return keys.every (function(_name) {
          var arg = requirements[_name] === Constructor ? x.constructor : x;
          return getBoundMethod (_name) (arg) != null;
        });
      }
    );

    typeClass.methods = keys.reduce (function(methods, _name) {
      methods[_name] = getBoundMethod (_name);
      return methods;
    }, {});

    return typeClass;
  }

  //# Setoid :: TypeClass
  //.
  //. `TypeClass` value for [Setoid][].
  //.
  //. ```javascript
  //. > Setoid.test (null)
  //. true
  //. ```
  var Setoid = $ ('Setoid', [], {equals: Value});

  //# Ord :: TypeClass
  //.
  //. `TypeClass` value for [Ord][].
  //.
  //. ```javascript
  //. > Ord.test (0)
  //. true
  //.
  //. > Ord.test (Math.sqrt)
  //. false
  //. ```
  var Ord = $ ('Ord', [Setoid], {lte: Value});

  //# Semigroupoid :: TypeClass
  //.
  //. `TypeClass` value for [Semigroupoid][].
  //.
  //. ```javascript
  //. > Semigroupoid.test (Math.sqrt)
  //. true
  //.
  //. > Semigroupoid.test (0)
  //. false
  //. ```
  var Semigroupoid = $ ('Semigroupoid', [], {compose: Value});

  //# Category :: TypeClass
  //.
  //. `TypeClass` value for [Category][].
  //.
  //. ```javascript
  //. > Category.test (Math.sqrt)
  //. true
  //.
  //. > Category.test (0)
  //. false
  //. ```
  var Category = $ ('Category', [Semigroupoid], {id: Constructor});

  //# Semigroup :: TypeClass
  //.
  //. `TypeClass` value for [Semigroup][].
  //.
  //. ```javascript
  //. > Semigroup.test ('')
  //. true
  //.
  //. > Semigroup.test (0)
  //. false
  //. ```
  var Semigroup = $ ('Semigroup', [], {concat: Value});

  //# Monoid :: TypeClass
  //.
  //. `TypeClass` value for [Monoid][].
  //.
  //. ```javascript
  //. > Monoid.test ('')
  //. true
  //.
  //. > Monoid.test (0)
  //. false
  //. ```
  var Monoid = $ ('Monoid', [Semigroup], {empty: Constructor});

  //# Group :: TypeClass
  //.
  //. `TypeClass` value for [Group][].
  //.
  //. ```javascript
  //. > Group.test (Sum (0))
  //. true
  //.
  //. > Group.test ('')
  //. false
  //. ```
  var Group = $ ('Group', [Monoid], {invert: Value});

  //# Filterable :: TypeClass
  //.
  //. `TypeClass` value for [Filterable][].
  //.
  //. ```javascript
  //. > Filterable.test ({})
  //. true
  //.
  //. > Filterable.test ('')
  //. false
  //. ```
  var Filterable = $ ('Filterable', [], {filter: Value});

  //# Functor :: TypeClass
  //.
  //. `TypeClass` value for [Functor][].
  //.
  //. ```javascript
  //. > Functor.test ([])
  //. true
  //.
  //. > Functor.test ('')
  //. false
  //. ```
  var Functor = $ ('Functor', [], {map: Value});

  //# Bifunctor :: TypeClass
  //.
  //. `TypeClass` value for [Bifunctor][].
  //.
  //. ```javascript
  //. > Bifunctor.test (Pair ('foo') (64))
  //. true
  //.
  //. > Bifunctor.test ([])
  //. false
  //. ```
  var Bifunctor = $ ('Bifunctor', [Functor], {bimap: Value});

  //# Profunctor :: TypeClass
  //.
  //. `TypeClass` value for [Profunctor][].
  //.
  //. ```javascript
  //. > Profunctor.test (Math.sqrt)
  //. true
  //.
  //. > Profunctor.test ([])
  //. false
  //. ```
  var Profunctor = $ ('Profunctor', [Functor], {promap: Value});

  //# Apply :: TypeClass
  //.
  //. `TypeClass` value for [Apply][].
  //.
  //. ```javascript
  //. > Apply.test ([])
  //. true
  //.
  //. > Apply.test ('')
  //. false
  //. ```
  var Apply = $ ('Apply', [Functor], {ap: Value});

  //# Applicative :: TypeClass
  //.
  //. `TypeClass` value for [Applicative][].
  //.
  //. ```javascript
  //. > Applicative.test ([])
  //. true
  //.
  //. > Applicative.test ({})
  //. false
  //. ```
  var Applicative = $ ('Applicative', [Apply], {of: Constructor});

  //# Chain :: TypeClass
  //.
  //. `TypeClass` value for [Chain][].
  //.
  //. ```javascript
  //. > Chain.test ([])
  //. true
  //.
  //. > Chain.test ({})
  //. false
  //. ```
  var Chain = $ ('Chain', [Apply], {chain: Value});

  //# ChainRec :: TypeClass
  //.
  //. `TypeClass` value for [ChainRec][].
  //.
  //. ```javascript
  //. > ChainRec.test ([])
  //. true
  //.
  //. > ChainRec.test ({})
  //. false
  //. ```
  var ChainRec = $ ('ChainRec', [Chain], {chainRec: Constructor});

  //# Monad :: TypeClass
  //.
  //. `TypeClass` value for [Monad][].
  //.
  //. ```javascript
  //. > Monad.test ([])
  //. true
  //.
  //. > Monad.test ({})
  //. false
  //. ```
  var Monad = $ ('Monad', [Applicative, Chain], {});

  //# Alt :: TypeClass
  //.
  //. `TypeClass` value for [Alt][].
  //.
  //. ```javascript
  //. > Alt.test ({})
  //. true
  //.
  //. > Alt.test ('')
  //. false
  //. ```
  var Alt = $ ('Alt', [Functor], {alt: Value});

  //# Plus :: TypeClass
  //.
  //. `TypeClass` value for [Plus][].
  //.
  //. ```javascript
  //. > Plus.test ({})
  //. true
  //.
  //. > Plus.test ('')
  //. false
  //. ```
  var Plus = $ ('Plus', [Alt], {zero: Constructor});

  //# Alternative :: TypeClass
  //.
  //. `TypeClass` value for [Alternative][].
  //.
  //. ```javascript
  //. > Alternative.test ([])
  //. true
  //.
  //. > Alternative.test ({})
  //. false
  //. ```
  var Alternative = $ ('Alternative', [Applicative, Plus], {});

  //# Foldable :: TypeClass
  //.
  //. `TypeClass` value for [Foldable][].
  //.
  //. ```javascript
  //. > Foldable.test ({})
  //. true
  //.
  //. > Foldable.test ('')
  //. false
  //. ```
  var Foldable = $ ('Foldable', [], {reduce: Value});

  //# Traversable :: TypeClass
  //.
  //. `TypeClass` value for [Traversable][].
  //.
  //. ```javascript
  //. > Traversable.test ([])
  //. true
  //.
  //. > Traversable.test ('')
  //. false
  //. ```
  var Traversable = $ ('Traversable', [Functor, Foldable], {traverse: Value});

  //# Extend :: TypeClass
  //.
  //. `TypeClass` value for [Extend][].
  //.
  //. ```javascript
  //. > Extend.test ([])
  //. true
  //.
  //. > Extend.test ({})
  //. false
  //. ```
  var Extend = $ ('Extend', [Functor], {extend: Value});

  //# Comonad :: TypeClass
  //.
  //. `TypeClass` value for [Comonad][].
  //.
  //. ```javascript
  //. > Comonad.test (Identity (0))
  //. true
  //.
  //. > Comonad.test ([])
  //. false
  //. ```
  var Comonad = $ ('Comonad', [Extend], {extract: Value});

  //# Contravariant :: TypeClass
  //.
  //. `TypeClass` value for [Contravariant][].
  //.
  //. ```javascript
  //. > Contravariant.test (Math.sqrt)
  //. true
  //.
  //. > Contravariant.test ([])
  //. false
  //. ```
  var Contravariant = $ ('Contravariant', [], {contramap: Value});

  //  Null$prototype$equals :: Null ~> Null -> Boolean
  function Null$prototype$equals(other) {
    return true;
  }

  //  Null$prototype$lte :: Null ~> Null -> Boolean
  function Null$prototype$lte(other) {
    return true;
  }

  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$equals(other) {
    return true;
  }

  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$lte(other) {
    return true;
  }

  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      this === other;
  }

  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      this === false || other === true;
  }

  //  Number$prototype$equals :: Number ~> Number -> Boolean
  function Number$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      isNaN (this) && isNaN (other) || this === other;
  }

  //  Number$prototype$lte :: Number ~> Number -> Boolean
  function Number$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      isNaN (this) || this <= other;
  }

  //  Date$prototype$equals :: Date ~> Date -> Boolean
  function Date$prototype$equals(other) {
    return equals (this.valueOf (), other.valueOf ());
  }

  //  Date$prototype$lte :: Date ~> Date -> Boolean
  function Date$prototype$lte(other) {
    return lte (this.valueOf (), other.valueOf ());
  }

  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
  function RegExp$prototype$equals(other) {
    return other.source === this.source &&
           other.global === this.global &&
           other.ignoreCase === this.ignoreCase &&
           other.multiline === this.multiline &&
           other.sticky === this.sticky &&
           other.unicode === this.unicode;
  }

  //  String$empty :: () -> String
  function String$empty() {
    return '';
  }

  //  String$prototype$equals :: String ~> String -> Boolean
  function String$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      this === other;
  }

  //  String$prototype$lte :: String ~> String -> Boolean
  function String$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      this <= other;
  }

  //  String$prototype$concat :: String ~> String -> String
  function String$prototype$concat(other) {
    return this + other;
  }

  //  Array$empty :: () -> Array a
  function Array$empty() {
    return [];
  }

  //  Array$of :: a -> Array a
  function Array$of(x) {
    return [x];
  }

  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
  function Array$chainRec(f, x) {
    var result = [];
    var nil = {};
    var todo = {head: x, tail: nil};
    while (todo !== nil) {
      var more = nil;
      var steps = f (iterationNext, iterationDone, todo.head);
      for (var idx = 0; idx < steps.length; idx += 1) {
        var step = steps[idx];
        if (step.done) {
          result.push (step.value);
        } else {
          more = {head: step.value, tail: more};
        }
      }
      todo = todo.tail;
      while (more !== nil) {
        todo = {head: more.head, tail: todo};
        more = more.tail;
      }
    }
    return result;
  }

  //  Array$zero :: () -> Array a
  function Array$zero() {
    return [];
  }

  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
  function Array$prototype$equals(other) {
    if (other.length !== this.length) return false;
    for (var idx = 0; idx < this.length; idx += 1) {
      if (!(equals (this[idx], other[idx]))) return false;
    }
    return true;
  }

  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
  function Array$prototype$lte(other) {
    for (var idx = 0; true; idx += 1) {
      if (idx === this.length) return true;
      if (idx === other.length) return false;
      if (!(equals (this[idx], other[idx]))) {
        return lte (this[idx], other[idx]);
      }
    }
  }

  //  Array$prototype$concat :: Array a ~> Array a -> Array a
  function Array$prototype$concat(other) {
    return this.concat (other);
  }

  //  Array$prototype$filter :: Array a ~> (a -> Boolean) -> Array a
  function Array$prototype$filter(pred) {
    return this.filter (function(x) { return pred (x); });
  }

  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
  function Array$prototype$map(f) {
    return this.map (function(x) { return f (x); });
  }

  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
  function Array$prototype$ap(fs) {
    var result = [];
    for (var idx = 0; idx < fs.length; idx += 1) {
      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
        result.push (fs[idx] (this[idx2]));
      }
    }
    return result;
  }

  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
  function Array$prototype$chain(f) {
    var result = [];
    for (var idx = 0; idx < this.length; idx += 1) {
      for (var idx2 = 0, xs = f (this[idx]); idx2 < xs.length; idx2 += 1) {
        result.push (xs[idx2]);
      }
    }
    return result;
  }

  //  Array$prototype$alt :: Array a ~> Array a -> Array a
  var Array$prototype$alt = Array$prototype$concat;

  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
  function Array$prototype$reduce(f, initial) {
    var acc = initial;
    for (var idx = 0; idx < this.length; idx += 1) acc = f (acc, this[idx]);
    return acc;
  }

  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
  function Array$prototype$traverse(typeRep, f) {
    var xs = this;
    function go(idx, n) {
      switch (n) {
        case 0: return of (typeRep, []);
        case 2: return lift2 (pair, f (xs[idx]), f (xs[idx + 1]));
        default:
          var m = Math.floor (n / 4) * 2;
          return lift2 (concat_, go (idx, m), go (idx + m, n - m));
      }
    }
    return this.length % 2 === 1 ?
      lift2 (concat_, map (Array$of, f (this[0])), go (1, this.length - 1)) :
      go (0, this.length);
  }

  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
  function Array$prototype$extend(f) {
    return this.map (function(_, idx, xs) { return f (xs.slice (idx)); });
  }

  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$equals(other) {
    return Array$prototype$equals.call (this, other);
  }

  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$lte(other) {
    return Array$prototype$lte.call (this, other);
  }

  //  Error$prototype$equals :: Error ~> Error -> Boolean
  function Error$prototype$equals(other) {
    return equals (this.name, other.name) &&
           equals (this.message, other.message);
  }

  //  Object$empty :: () -> StrMap a
  function Object$empty() {
    return {};
  }

  //  Object$zero :: () -> StrMap a
  function Object$zero() {
    return {};
  }

  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$equals(other) {
    var self = this;
    var keys = sortedKeys (this);
    return equals (keys, sortedKeys (other)) &&
           keys.every (function(k) { return equals (self[k], other[k]); });
  }

  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$lte(other) {
    var theseKeys = sortedKeys (this);
    var otherKeys = sortedKeys (other);
    while (true) {
      if (theseKeys.length === 0) return true;
      if (otherKeys.length === 0) return false;
      var k = theseKeys.shift ();
      var z = otherKeys.shift ();
      if (k < z) return true;
      if (k > z) return false;
      if (!(equals (this[k], other[k]))) return lte (this[k], other[k]);
    }
  }

  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
  function Object$prototype$concat(other) {
    var result = {};
    function assign(k) { result[k] = this[k]; }
    forEachKey (this, assign);
    forEachKey (other, assign);
    return result;
  }

  //  Object$prototype$filter :: StrMap a ~> (a -> Boolean) -> StrMap a
  function Object$prototype$filter(pred) {
    var result = {};
    forEachKey (this, function(k) {
      if (pred (this[k])) result[k] = this[k];
    });
    return result;
  }

  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
  function Object$prototype$map(f) {
    var result = {};
    forEachKey (this, function(k) { result[k] = f (this[k]); });
    return result;
  }

  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
  function Object$prototype$ap(other) {
    var result = {};
    forEachKey (this, function(k) {
      if (has (k, other)) result[k] = other[k] (this[k]);
    });
    return result;
  }

  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
  var Object$prototype$alt = Object$prototype$concat;

  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
  function Object$prototype$reduce(f, initial) {
    var self = this;
    function reducer(acc, k) { return f (acc, self[k]); }
    return (sortedKeys (this)).reduce (reducer, initial);
  }

  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
  function Object$prototype$traverse(typeRep, f) {
    var self = this;
    return (Object.keys (this)).reduce (function(applicative, k) {
      function set(o) {
        return function(v) {
          var singleton = {}; singleton[k] = v;
          return Object$prototype$concat.call (o, singleton);
        };
      }
      return lift2 (set, applicative, f (self[k]));
    }, of (typeRep, {}));
  }

  //  Function$id :: () -> a -> a
  function Function$id() {
    return identity;
  }

  //  Function$of :: b -> (a -> b)
  function Function$of(x) {
    return function(_) { return x; };
  }

  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
  function Function$chainRec(f, x) {
    return function(a) {
      var step = iterationNext (x);
      while (!step.done) {
        step = f (iterationNext, iterationDone, step.value) (a);
      }
      return step.value;
    };
  }

  //  Function$prototype$equals :: Function ~> Function -> Boolean
  function Function$prototype$equals(other) {
    return other === this;
  }

  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$compose(other) {
    var semigroupoid = this;
    return function(x) { return other (semigroupoid (x)); };
  }

  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$map(f) {
    var functor = this;
    return function(x) { return f (functor (x)); };
  }

  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
  function Function$prototype$promap(f, g) {
    var profunctor = this;
    return function(x) { return g (profunctor (f (x))); };
  }

  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
  function Function$prototype$ap(f) {
    var apply = this;
    return function(x) { return f (x) (apply (x)); };
  }

  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
  function Function$prototype$chain(f) {
    var chain = this;
    return function(x) { return f (chain (x)) (x); };
  }

  //  Function$prototype$extend :: Semigroup a => (a -> b) ~> ((a -> b) -> c) -> (a -> c)
  function Function$prototype$extend(f) {
    var extend = this;
    return function(x) {
      return f (function(y) { return extend (concat (x, y)); });
    };
  }

  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
  function Function$prototype$contramap(f) {
    var contravariant = this;
    return function(x) { return contravariant (f (x)); };
  }

  /* eslint-disable key-spacing */
  var implementations = {
    Null: {
      'prototype': {
        'fantasy-land/equals':      Null$prototype$equals,
        'fantasy-land/lte':         Null$prototype$lte
      }
    },
    Undefined: {
      'prototype': {
        'fantasy-land/equals':      Undefined$prototype$equals,
        'fantasy-land/lte':         Undefined$prototype$lte
      }
    },
    Boolean: {
      'prototype': {
        'fantasy-land/equals':      Boolean$prototype$equals,
        'fantasy-land/lte':         Boolean$prototype$lte
      }
    },
    Number: {
      'prototype': {
        'fantasy-land/equals':      Number$prototype$equals,
        'fantasy-land/lte':         Number$prototype$lte
      }
    },
    Date: {
      'prototype': {
        'fantasy-land/equals':      Date$prototype$equals,
        'fantasy-land/lte':         Date$prototype$lte
      }
    },
    RegExp: {
      'prototype': {
        'fantasy-land/equals':      RegExp$prototype$equals
      }
    },
    String: {
      'fantasy-land/empty':         String$empty,
      'prototype': {
        'fantasy-land/equals':      String$prototype$equals,
        'fantasy-land/lte':         String$prototype$lte,
        'fantasy-land/concat':      String$prototype$concat
      }
    },
    Array: {
      'fantasy-land/empty':         Array$empty,
      'fantasy-land/of':            Array$of,
      'fantasy-land/chainRec':      Array$chainRec,
      'fantasy-land/zero':          Array$zero,
      'prototype': {
        'fantasy-land/equals':      Array$prototype$equals,
        'fantasy-land/lte':         Array$prototype$lte,
        'fantasy-land/concat':      Array$prototype$concat,
        'fantasy-land/filter':      Array$prototype$filter,
        'fantasy-land/map':         Array$prototype$map,
        'fantasy-land/ap':          Array$prototype$ap,
        'fantasy-land/chain':       Array$prototype$chain,
        'fantasy-land/alt':         Array$prototype$alt,
        'fantasy-land/reduce':      Array$prototype$reduce,
        'fantasy-land/traverse':    Array$prototype$traverse,
        'fantasy-land/extend':      Array$prototype$extend
      }
    },
    Arguments: {
      'prototype': {
        'fantasy-land/equals':      Arguments$prototype$equals,
        'fantasy-land/lte':         Arguments$prototype$lte
      }
    },
    Error: {
      'prototype': {
        'fantasy-land/equals':      Error$prototype$equals
      }
    },
    Object: {
      'fantasy-land/empty':         Object$empty,
      'fantasy-land/zero':          Object$zero,
      'prototype': {
        'fantasy-land/equals':      Object$prototype$equals,
        'fantasy-land/lte':         Object$prototype$lte,
        'fantasy-land/concat':      Object$prototype$concat,
        'fantasy-land/filter':      Object$prototype$filter,
        'fantasy-land/map':         Object$prototype$map,
        'fantasy-land/ap':          Object$prototype$ap,
        'fantasy-land/alt':         Object$prototype$alt,
        'fantasy-land/reduce':      Object$prototype$reduce,
        'fantasy-land/traverse':    Object$prototype$traverse
      }
    },
    Function: {
      'fantasy-land/id':            Function$id,
      'fantasy-land/of':            Function$of,
      'fantasy-land/chainRec':      Function$chainRec,
      'prototype': {
        'fantasy-land/equals':      Function$prototype$equals,
        'fantasy-land/compose':     Function$prototype$compose,
        'fantasy-land/map':         Function$prototype$map,
        'fantasy-land/promap':      Function$prototype$promap,
        'fantasy-land/ap':          Function$prototype$ap,
        'fantasy-land/chain':       Function$prototype$chain,
        'fantasy-land/extend':      Function$prototype$extend,
        'fantasy-land/contramap':   Function$prototype$contramap
      }
    }
  };
  /* eslint-enable key-spacing */

  //# equals :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and equal according
  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
  //.
  //. `fantasy-land/equals` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
  //. Array, Arguments, Error, Object, and Function.
  //.
  //. The algorithm supports circular data structures. Two arrays are equal
  //. if they have the same index paths and for each path have equal values.
  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
  //. are equal even if their internal structures differ. Two objects are equal
  //. if they have the same property paths and for each path have equal values.
  //.
  //. ```javascript
  //. > equals (0, -0)
  //. true
  //.
  //. > equals (NaN, NaN)
  //. true
  //.
  //. > equals (Cons (1, Cons (2, Nil)), Cons (1, Cons (2, Nil)))
  //. true
  //.
  //. > equals (Cons (1, Cons (2, Nil)), Cons (2, Cons (1, Nil)))
  //. false
  //. ```
  var equals = (function() {
    //  $pairs :: Array (Array2 Any Any)
    var $pairs = [];

    return function equals(x, y) {
      if (!(sameType (x, y))) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some (function(p) { return p[0] === x && p[1] === y; })) {
        return true;
      }

      $pairs.push ([x, y]);
      try {
        return Setoid.test (x) &&
               Setoid.test (y) &&
               Setoid.methods.equals (x) (y);
      } finally {
        $pairs.pop ();
      }
    };
  } ());

  //# lt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. less than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`gt`](#gt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lt (0, 0)
  //. false
  //.
  //. > lt (0, 1)
  //. true
  //.
  //. > lt (1, 0)
  //. false
  //. ```
  function lt(x, y) {
    return sameType (x, y) && !(lte (y, x));
  }

  //# lte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is less than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. `fantasy-land/lte` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
  //. Arguments, and Object.
  //.
  //. The algorithm supports circular data structures in the same manner as
  //. [`equals`](#equals).
  //.
  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lte (0, 0)
  //. true
  //.
  //. > lte (0, 1)
  //. true
  //.
  //. > lte (1, 0)
  //. false
  //. ```
  var lte = (function() {
    //  $pairs :: Array (Array2 Any Any)
    var $pairs = [];

    return function lte(x, y) {
      if (!(sameType (x, y))) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some (function(p) { return p[0] === x && p[1] === y; })) {
        return equals (x, y);
      }

      $pairs.push ([x, y]);
      try {
        return Ord.test (x) && Ord.test (y) && Ord.methods.lte (x) (y);
      } finally {
        $pairs.pop ();
      }
    };
  } ());

  //# gt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. greater than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > gt (0, 0)
  //. false
  //.
  //. > gt (0, 1)
  //. false
  //.
  //. > gt (1, 0)
  //. true
  //. ```
  function gt(x, y) {
    return lt (y, x);
  }

  //# gte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is greater than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gt`](#gt).
  //.
  //. ```javascript
  //. > gte (0, 0)
  //. true
  //.
  //. > gte (0, 1)
  //. false
  //.
  //. > gte (1, 0)
  //. true
  //. ```
  function gte(x, y) {
    return lte (y, x);
  }

  //# min :: Ord a => (a, a) -> a
  //.
  //. Returns the smaller of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > min (10, 2)
  //. 2
  //.
  //. > min (new Date ('1999-12-31'), new Date ('2000-01-01'))
  //. new Date ('1999-12-31')
  //.
  //. > min ('10', '2')
  //. '10'
  //. ```
  function min(x, y) {
    return lte (x, y) ? x : y;
  }

  //# max :: Ord a => (a, a) -> a
  //.
  //. Returns the larger of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > max (10, 2)
  //. 10
  //.
  //. > max (new Date ('1999-12-31'), new Date ('2000-01-01'))
  //. new Date ('2000-01-01')
  //.
  //. > max ('10', '2')
  //. '2'
  //. ```
  function max(x, y) {
    return lte (x, y) ? y : x;
  }

  //# clamp :: Ord a => (a, a, a) -> a
  //.
  //. Takes a lower bound, an upper bound, and a value of the same type.
  //. Returns the value if it is within the bounds; the nearer bound otherwise.
  //.
  //. This function is derived from [`min`](#min) and [`max`](#max).
  //.
  //. ```javascript
  //. > clamp (0, 100, 42)
  //. 42
  //.
  //. > clamp (0, 100, -1)
  //. 0
  //.
  //. > clamp ('A', 'Z', '~')
  //. 'Z'
  //. ```
  function clamp(lower, upper, x) {
    return max (lower, min (upper, x));
  }

  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
  //.
  //. Function wrapper for [`fantasy-land/compose`][].
  //.
  //. `fantasy-land/compose` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > compose (Math.sqrt, x => x + 1) (99)
  //. 10
  //. ```
  function compose(x, y) {
    return Semigroupoid.methods.compose (y) (x);
  }

  //# id :: Category c => TypeRep c -> c
  //.
  //. Function wrapper for [`fantasy-land/id`][].
  //.
  //. `fantasy-land/id` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > id (Function) ('foo')
  //. 'foo'
  //. ```
  function id(typeRep) {
    return Category.methods.id (typeRep) ();
  }

  //# concat :: Semigroup a => (a, a) -> a
  //.
  //. Function wrapper for [`fantasy-land/concat`][].
  //.
  //. `fantasy-land/concat` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > concat ('abc', 'def')
  //. 'abcdef'
  //.
  //. > concat ([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > concat ({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > concat (Cons ('foo', Cons ('bar', Cons ('baz', Nil))), Cons ('quux', Nil))
  //. Cons ('foo', Cons ('bar', Cons ('baz', Cons ('quux', Nil))))
  //. ```
  function concat(x, y) {
    return Semigroup.methods.concat (x) (y);
  }

  //# empty :: Monoid m => TypeRep m -> m
  //.
  //. Function wrapper for [`fantasy-land/empty`][].
  //.
  //. `fantasy-land/empty` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > empty (String)
  //. ''
  //.
  //. > empty (Array)
  //. []
  //.
  //. > empty (Object)
  //. {}
  //.
  //. > empty (List)
  //. Nil
  //. ```
  function empty(typeRep) {
    return Monoid.methods.empty (typeRep) ();
  }

  //# invert :: Group g => g -> g
  //.
  //. Function wrapper for [`fantasy-land/invert`][].
  //.
  //. ```javascript
  //. > invert (Sum (5))
  //. Sum (-5)
  //. ```
  function invert(group) {
    return Group.methods.invert (group) ();
  }

  //# filter :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/filter`][]. Discards every element
  //. which does not satisfy the predicate.
  //.
  //. `fantasy-land/filter` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`reject`](#reject).
  //.
  //. ```javascript
  //. > filter (x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filter (x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {x: 1, z: 3}
  //.
  //. > filter (x => x % 2 == 1, Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (1, Cons (3, Nil))
  //.
  //. > filter (x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > filter (x => x % 2 == 1, Just (0))
  //. Nothing
  //.
  //. > filter (x => x % 2 == 1, Just (1))
  //. Just (1)
  //. ```
  function filter(pred, filterable) {
    return Filterable.methods.filter (filterable) (pred);
  }

  //# reject :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Discards every element which satisfies the predicate.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. ```javascript
  //. > reject (x => x % 2 == 1, [1, 2, 3])
  //. [2]
  //.
  //. > reject (x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {y: 2}
  //.
  //. > reject (x => x % 2 == 1, Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (2, Nil)
  //.
  //. > reject (x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > reject (x => x % 2 == 1, Just (0))
  //. Just (0)
  //.
  //. > reject (x => x % 2 == 1, Just (1))
  //. Nothing
  //. ```
  function reject(pred, filterable) {
    return filter (function(x) { return !(pred (x)); }, filterable);
  }

  //# takeWhile :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Discards the first element which does not satisfy the predicate, and all
  //. subsequent elements.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > takeWhile (s => /x/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx']
  //.
  //. > takeWhile (s => /y/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy']
  //.
  //. > takeWhile (s => /z/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. []
  //. ```
  function takeWhile(pred, filterable) {
    var take = true;
    return filter (function(x) { return take = take && pred (x); },
                   filterable);
  }

  //# dropWhile :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Retains the first element which does not satisfy the predicate, and all
  //. subsequent elements.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > dropWhile (s => /x/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['yz', 'zx', 'zy']
  //.
  //. > dropWhile (s => /y/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xz', 'yx', 'yz', 'zx', 'zy']
  //.
  //. > dropWhile (s => /z/.test (s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx', 'yz', 'zx', 'zy']
  //. ```
  function dropWhile(pred, filterable) {
    var take = false;
    return filter (function(x) { return take = take || !(pred (x)); },
                   filterable);
  }

  //# map :: Functor f => (a -> b, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/map`][].
  //.
  //. `fantasy-land/map` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > map (Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > map (Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > map (Math.sqrt, s => s.length) ('Sanctuary')
  //. 3
  //.
  //. > map (Math.sqrt, Pair ('foo') (64))
  //. Pair ('foo') (8)
  //.
  //. > map (Math.sqrt, Nil)
  //. Nil
  //.
  //. > map (Math.sqrt, Cons (1, Cons (4, Cons (9, Nil))))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function map(f, functor) {
    return Functor.methods.map (functor) (f);
  }

  //# flip :: Functor f => (f (a -> b), a) -> f b
  //.
  //. Maps over the given functions, applying each to the given value.
  //.
  //. This function is derived from [`map`](#map).
  //.
  //. ```javascript
  //. > flip (x => y => x + y, '!') ('foo')
  //. 'foo!'
  //.
  //. > flip ([Math.floor, Math.ceil], 1.5)
  //. [1, 2]
  //.
  //. > flip ({floor: Math.floor, ceil: Math.ceil}, 1.5)
  //. {floor: 1, ceil: 2}
  //.
  //. > flip (Cons (Math.floor, Cons (Math.ceil, Nil)), 1.5)
  //. Cons (1, Cons (2, Nil))
  //. ```
  function flip(functor, x) {
    return Functor.methods.map (functor) (thrush (x));
  }

  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
  //.
  //. Function wrapper for [`fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > bimap (s => s.toUpperCase (), Math.sqrt, Pair ('foo') (64))
  //. Pair ('FOO') (8)
  //. ```
  function bimap(f, g, bifunctor) {
    return Bifunctor.methods.bimap (bifunctor) (f, g);
  }

  //# mapLeft :: Bifunctor f => (a -> b, f a c) -> f b c
  //.
  //. Maps the given function over the left side of a Bifunctor.
  //.
  //. ```javascript
  //. > mapLeft (Math.sqrt, Pair (64) (9))
  //. Pair (8) (9)
  //. ```
  function mapLeft(f, bifunctor) {
    return bimap (f, identity, bifunctor);
  }

  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
  //.
  //. Function wrapper for [`fantasy-land/promap`][].
  //.
  //. `fantasy-land/promap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > promap (Math.abs, x => x + 1, Math.sqrt) (-100)
  //. 11
  //. ```
  function promap(f, g, profunctor) {
    return Profunctor.methods.promap (profunctor) (f, g);
  }

  //# ap :: Apply f => (f (a -> b), f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/ap`][].
  //.
  //. `fantasy-land/ap` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > ap ([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > ap ({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
  //. {a: 4, b: 100}
  //.
  //. > ap (s => n => s.slice (0, n), s => Math.ceil (s.length / 2)) ('Haskell')
  //. 'Hask'
  //.
  //. > ap (Identity (Math.sqrt), Identity (64))
  //. Identity (8)
  //.
  //. > ap (Cons (Math.sqrt, Cons (x => x * x, Nil)), Cons (16, Cons (100, Nil)))
  //. Cons (4, Cons (10, Cons (256, Cons (10000, Nil))))
  //. ```
  function ap(applyF, applyX) {
    return Apply.methods.ap (applyX) (applyF);
  }

  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
  //.
  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
  //. result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift3`](#lift3).
  //.
  //. ```javascript
  //. > lift2 (x => y => Math.pow (x, y), [10], [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > lift2 (x => y => Math.pow (x, y), Identity (10), Identity (3))
  //. Identity (1000)
  //. ```
  function lift2(f, x, y) {
    return ap (map (f, x), y);
  }

  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
  //.
  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
  //. returns the result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift2`](#lift2).
  //.
  //. ```javascript
  //. > lift3 (x => y => z => x + z + y,
  //. .        ['<', '['],
  //. .        ['>', ']'],
  //. .        ['foo', 'bar', 'baz'])
  //. [ '<foo>', '<bar>', '<baz>',
  //. . '<foo]', '<bar]', '<baz]',
  //. . '[foo>', '[bar>', '[baz>',
  //. . '[foo]', '[bar]', '[baz]' ]
  //.
  //. > lift3 (x => y => z => x + z + y,
  //. .        Identity ('<'),
  //. .        Identity ('>'),
  //. .        Identity ('baz'))
  //. Identity ('<baz>')
  //. ```
  function lift3(f, x, y, z) {
    return ap (ap (map (f, x), y), z);
  }

  //# apFirst :: Apply f => (f a, f b) -> f a
  //.
  //. Combines two effectful actions, keeping only the result of the first.
  //. Equivalent to Haskell's `(<*)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > apFirst ([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > apFirst (Identity (1), Identity (2))
  //. Identity (1)
  //. ```
  function apFirst(x, y) {
    return lift2 (constant, x, y);
  }

  //# apSecond :: Apply f => (f a, f b) -> f b
  //.
  //. Combines two effectful actions, keeping only the result of the second.
  //. Equivalent to Haskell's `(*>)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > apSecond ([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > apSecond (Identity (1), Identity (2))
  //. Identity (2)
  //. ```
  function apSecond(x, y) {
    return lift2 (constant (identity), x, y);
  }

  //# of :: Applicative f => (TypeRep f, a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/of`][].
  //.
  //. `fantasy-land/of` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > of (Array, 42)
  //. [42]
  //.
  //. > of (Function, 42) (null)
  //. 42
  //.
  //. > of (List, 42)
  //. Cons (42, Nil)
  //. ```
  function of(typeRep, x) {
    return Applicative.methods.of (typeRep) (x);
  }

  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > append (3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > append (3, Cons (1, Cons (2, Nil)))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function append(x, xs) {
    return concat (xs, of (xs.constructor, x));
  }

  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > prepend (1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > prepend (1, Cons (2, Cons (3, Nil)))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function prepend(x, xs) {
    return concat (of (xs.constructor, x), xs);
  }

  //# chain :: Chain m => (a -> m b, m a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chain`][].
  //.
  //. `fantasy-land/chain` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > chain (x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > chain (x => x % 2 == 1 ? of (List, x) : Nil,
  //. .        Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (1, Cons (3, Nil))
  //.
  //. > chain (n => s => s.slice (0, n),
  //. .        s => Math.ceil (s.length / 2))
  //. .       ('Haskell')
  //. 'Hask'
  //. ```
  function chain(f, chain_) {
    return Chain.methods.chain (chain_) (f);
  }

  //# join :: Chain m => m (m a) -> m a
  //.
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. This function is derived from [`chain`](#chain).
  //.
  //. ```javascript
  //. > join ([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > join ([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > join (Identity (Identity (1)))
  //. Identity (1)
  //. ```
  function join(chain_) {
    return chain (identity, chain_);
  }

  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chainRec`][].
  //.
  //. `fantasy-land/chainRec` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > chainRec (
  //. .   Array,
  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map (done)
  //. .                                    : [s + 'o', s + 'n'].map (next),
  //. .   ''
  //. . )
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    return ChainRec.methods.chainRec (typeRep) (f, x);
  }

  //# alt :: Alt f => (f a, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/alt`][].
  //.
  //. `fantasy-land/alt` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > alt ([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > alt (Nothing, Nothing)
  //. Nothing
  //.
  //. > alt (Nothing, Just (1))
  //. Just (1)
  //.
  //. > alt (Just (2), Just (3))
  //. Just (2)
  //. ```
  function alt(x, y) {
    return Alt.methods.alt (x) (y);
  }

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. Function wrapper for [`fantasy-land/zero`][].
  //.
  //. `fantasy-land/zero` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > zero (Array)
  //. []
  //.
  //. > zero (Object)
  //. {}
  //.
  //. > zero (Maybe)
  //. Nothing
  //. ```
  function zero(typeRep) {
    return Plus.methods.zero (typeRep) ();
  }

  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
  //.
  //. Function wrapper for [`fantasy-land/reduce`][].
  //.
  //. `fantasy-land/reduce` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > reduce ((xs, x) => [x].concat (xs), [], [1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reduce (concat, '', Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. 'foobarbaz'
  //. ```
  function reduce(f, x, foldable) {
    return Foldable.methods.reduce (foldable) (f, x);
  }

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > size ([])
  //. 0
  //.
  //. > size (['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > size (Nil)
  //. 0
  //.
  //. > size (Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. 3
  //. ```
  function size(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.length;
    return reduce (function(n, _) { return n + 1; }, 0, foldable);
  }

  //# all :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if all the elements of the structure satisfy the
  //. predicate; `false` otherwise.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. See also [`any`](#any) and [`none`](#none).
  //.
  //. ```javascript
  //. > all (Number.isInteger, [])
  //. true
  //.
  //. > all (Number.isInteger, [1, 2, 3])
  //. true
  //.
  //. > all (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. false
  //. ```
  function all(pred, foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.every (unary (pred));
    return reduce (function(b, x) { return b && pred (x); }, true, foldable);
  }

  //# any :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if any element of the structure satisfies the predicate;
  //. `false` otherwise.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. See also [`all`](#all) and [`none`](#none).
  //.
  //. ```javascript
  //. > any (Number.isInteger, [])
  //. false
  //.
  //. > any (Number.isInteger, [1, 2, 3])
  //. true
  //.
  //. > any (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. true
  //. ```
  function any(pred, foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.some (unary (pred));
    return reduce (function(b, x) { return b || pred (x); }, false, foldable);
  }

  //# none :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if none of the elements of the structure satisfies the
  //. predicate; `false` otherwise.
  //.
  //. This function is derived from [`any`](#any). `none (pred, foldable)` is
  //. equivalent to `!(any (pred, foldable))`.
  //.
  //. See also [`all`](#all).
  //.
  //. ```javascript
  //. > none (Number.isInteger, [])
  //. true
  //.
  //. > none (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. false
  //. ```
  function none(pred, foldable) {
    return !(any (pred, foldable));
  }

  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
  //.
  //. Takes a value and a structure and returns `true` if the
  //. value is an element of the structure; `false` otherwise.
  //.
  //. This function is derived from [`equals`](#equals) and
  //. [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > elem ('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > elem ('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > elem (3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > elem (8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > elem (0, Just (0))
  //. true
  //.
  //. > elem (0, Just (1))
  //. false
  //.
  //. > elem (0, Nothing)
  //. false
  //. ```
  function elem(x, foldable) {
    return any (function(y) { return equals (x, y); }, foldable);
  }

  //# foldMap :: (Monoid m, Foldable f) => (TypeRep m, a -> m, f a) -> m
  //.
  //. Deconstructs a foldable by mapping every element to a monoid and
  //. concatenating the results.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > foldMap (String, f => f.name, [Math.sin, Math.cos, Math.tan])
  //. 'sincostan'
  //. ```
  function foldMap(typeRep, f, foldable) {
    return reduce (function(monoid, x) { return concat (monoid, f (x)); },
                   empty (typeRep),
                   foldable);
  }

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > reverse ([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reverse (Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (3, Cons (2, Cons (1, Nil)))
  //. ```
  function reverse(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return (foldable.slice ()).reverse ();
    var F = foldable.constructor;
    return reduce (function(xs, x) { return concat (of (F, x), xs); },
                   empty (F),
                   foldable);
  }

  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) for comparisons.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > sort (['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > sort ([Just (2), Nothing, Just (1)])
  //. [Nothing, Just (1), Just (2)]
  //.
  //. > sort (Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. Cons ('bar', Cons ('baz', Cons ('foo', Nil)))
  //. ```
  function sort(foldable) {
    return sortBy (identity, foldable);
  }

  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) to compare the values produced by applying the
  //. given function to each element of the structure.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > sortBy (s => s.length, ['red', 'green', 'blue'])
  //. ['red', 'blue', 'green']
  //.
  //. > sortBy (s => s.length, ['black', 'white'])
  //. ['black', 'white']
  //.
  //. > sortBy (s => s.length, ['white', 'black'])
  //. ['white', 'black']
  //.
  //. > sortBy (s => s.length, Cons ('red', Cons ('green', Cons ('blue', Nil))))
  //. Cons ('red', Cons ('blue', Cons ('green', Nil)))
  //. ```
  function sortBy(f, foldable) {
    var rs = reduce (function(rs, x) {
      rs.push ({idx: rs.length, x: x, fx: f (x)});
      return rs;
    }, [], foldable);

    var lte_ = (function(r) {
      switch (typeof (r && r.fx)) {
        case 'number':  return function(x, y) { return x <= y || x !== x; };
        case 'string':  return function(x, y) { return x <= y; };
        default:        return lte;
      }
    } (rs[0]));

    rs.sort (function(a, b) {
      return lte_ (a.fx, b.fx) ? lte_ (b.fx, a.fx) ? a.idx - b.idx : -1 : 1;
    });

    if (Array.isArray (foldable)) {
      for (var idx = 0; idx < rs.length; idx += 1) rs[idx] = rs[idx].x;
      return rs;
    }

    var F = foldable.constructor;
    var result = empty (F);
    for (idx = 0; idx < rs.length; idx += 1) {
      result = concat (result, of (F, rs[idx].x));
    }
    return result;
  }

  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
  //.
  //. Function wrapper for [`fantasy-land/traverse`][].
  //.
  //. `fantasy-land/traverse` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`sequence`](#sequence).
  //.
  //. ```javascript
  //. > traverse (Array, x => x, [[1, 2, 3], [4, 5]])
  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  //.
  //. > traverse (Identity, x => Identity (x + 1), [1, 2, 3])
  //. Identity ([2, 3, 4])
  //. ```
  function traverse(typeRep, f, traversable) {
    return Traversable.methods.traverse (traversable) (typeRep, f);
  }

  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
  //.
  //. Inverts the given `t (f a)` to produce an `f (t a)`.
  //.
  //. This function is derived from [`traverse`](#traverse).
  //.
  //. ```javascript
  //. > sequence (Array, Identity ([1, 2, 3]))
  //. [Identity (1), Identity (2), Identity (3)]
  //.
  //. > sequence (Identity, [Identity (1), Identity (2), Identity (3)])
  //. Identity ([1, 2, 3])
  //. ```
  function sequence(typeRep, traversable) {
    return traverse (typeRep, identity, traversable);
  }

  //# extend :: Extend w => (w a -> b, w a) -> w b
  //.
  //. Function wrapper for [`fantasy-land/extend`][].
  //.
  //. `fantasy-land/extend` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > extend (ss => ss.join (''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //.
  //. > extend (f => f ([3, 4]), reverse) ([1, 2])
  //. [4, 3, 2, 1]
  //. ```
  function extend(f, extend_) {
    return Extend.methods.extend (extend_) (f);
  }

  //# duplicate :: Extend w => w a -> w (w a)
  //.
  //. Adds one level of nesting to a comonadic structure.
  //.
  //. This function is derived from [`extend`](#extend).
  //.
  //. ```javascript
  //. > duplicate (Identity (1))
  //. Identity (Identity (1))
  //.
  //. > duplicate ([1])
  //. [[1]]
  //.
  //. > duplicate ([1, 2, 3])
  //. [[1, 2, 3], [2, 3], [3]]
  //.
  //. > duplicate (reverse) ([1, 2]) ([3, 4])
  //. [4, 3, 2, 1]
  //. ```
  function duplicate(extend_) {
    return extend (identity, extend_);
  }

  //# extract :: Comonad w => w a -> a
  //.
  //. Function wrapper for [`fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > extract (Identity (42))
  //. 42
  //. ```
  function extract(comonad) {
    return Comonad.methods.extract (comonad) ();
  }

  //# contramap :: Contravariant f => (b -> a, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/contramap`][].
  //.
  //. `fantasy-land/contramap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > contramap (s => s.length, Math.sqrt) ('Sanctuary')
  //. 3
  //. ```
  function contramap(f, contravariant) {
    return Contravariant.methods.contramap (contravariant) (f);
  }

  return {
    TypeClass: TypeClass,
    Setoid: Setoid,
    Ord: Ord,
    Semigroupoid: Semigroupoid,
    Category: Category,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Group: Group,
    Filterable: Filterable,
    Functor: Functor,
    Bifunctor: Bifunctor,
    Profunctor: Profunctor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    ChainRec: ChainRec,
    Monad: Monad,
    Alt: Alt,
    Plus: Plus,
    Alternative: Alternative,
    Foldable: Foldable,
    Traversable: Traversable,
    Extend: Extend,
    Comonad: Comonad,
    Contravariant: Contravariant,
    equals: equals,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    min: min,
    max: max,
    clamp: clamp,
    compose: compose,
    id: id,
    concat: concat,
    empty: empty,
    invert: invert,
    filter: filter,
    reject: reject,
    map: map,
    flip: flip,
    bimap: bimap,
    mapLeft: mapLeft,
    promap: promap,
    ap: ap,
    lift2: lift2,
    lift3: lift3,
    apFirst: apFirst,
    apSecond: apSecond,
    of: of,
    append: append,
    prepend: prepend,
    chain: chain,
    join: join,
    chainRec: chainRec,
    alt: alt,
    zero: zero,
    reduce: reduce,
    size: size,
    all: all,
    any: any,
    none: none,
    elem: elem,
    foldMap: foldMap,
    reverse: reverse,
    sort: sort,
    sortBy: sortBy,
    takeWhile: takeWhile,
    dropWhile: dropWhile,
    traverse: traverse,
    sequence: sequence,
    extend: extend,
    duplicate: duplicate,
    extract: extract,
    contramap: contramap
  };

}));

//. [Alt]:                      v:fantasyland/fantasy-land#alt
//. [Alternative]:              v:fantasyland/fantasy-land#alternative
//. [Applicative]:              v:fantasyland/fantasy-land#applicative
//. [Apply]:                    v:fantasyland/fantasy-land#apply
//. [Bifunctor]:                v:fantasyland/fantasy-land#bifunctor
//. [Category]:                 v:fantasyland/fantasy-land#category
//. [Chain]:                    v:fantasyland/fantasy-land#chain
//. [ChainRec]:                 v:fantasyland/fantasy-land#chainrec
//. [Comonad]:                  v:fantasyland/fantasy-land#comonad
//. [Contravariant]:            v:fantasyland/fantasy-land#contravariant
//. [Extend]:                   v:fantasyland/fantasy-land#extend
//. [FL]:                       v:fantasyland/fantasy-land
//. [Filterable]:               v:fantasyland/fantasy-land#filterable
//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
//. [Functor]:                  v:fantasyland/fantasy-land#functor
//. [Group]:                    v:fantasyland/fantasy-land#group
//. [Monad]:                    v:fantasyland/fantasy-land#monad
//. [Monoid]:                   v:fantasyland/fantasy-land#monoid
//. [Ord]:                      v:fantasyland/fantasy-land#ord
//. [Plus]:                     v:fantasyland/fantasy-land#plus
//. [Profunctor]:               v:fantasyland/fantasy-land#profunctor
//. [Semigroup]:                v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:                   v:fantasyland/fantasy-land#setoid
//. [Traversable]:              v:fantasyland/fantasy-land#traversable
//. [`fantasy-land/alt`]:       v:fantasyland/fantasy-land#alt-method
//. [`fantasy-land/ap`]:        v:fantasyland/fantasy-land#ap-method
//. [`fantasy-land/bimap`]:     v:fantasyland/fantasy-land#bimap-method
//. [`fantasy-land/chain`]:     v:fantasyland/fantasy-land#chain-method
//. [`fantasy-land/chainRec`]:  v:fantasyland/fantasy-land#chainrec-method
//. [`fantasy-land/compose`]:   v:fantasyland/fantasy-land#compose-method
//. [`fantasy-land/concat`]:    v:fantasyland/fantasy-land#concat-method
//. [`fantasy-land/contramap`]: v:fantasyland/fantasy-land#contramap-method
//. [`fantasy-land/empty`]:     v:fantasyland/fantasy-land#empty-method
//. [`fantasy-land/equals`]:    v:fantasyland/fantasy-land#equals-method
//. [`fantasy-land/extend`]:    v:fantasyland/fantasy-land#extend-method
//. [`fantasy-land/extract`]:   v:fantasyland/fantasy-land#extract-method
//. [`fantasy-land/filter`]:    v:fantasyland/fantasy-land#filter-method
//. [`fantasy-land/id`]:        v:fantasyland/fantasy-land#id-method
//. [`fantasy-land/invert`]:    v:fantasyland/fantasy-land#invert-method
//. [`fantasy-land/lte`]:       v:fantasyland/fantasy-land#lte-method
//. [`fantasy-land/map`]:       v:fantasyland/fantasy-land#map-method
//. [`fantasy-land/of`]:        v:fantasyland/fantasy-land#of-method
//. [`fantasy-land/promap`]:    v:fantasyland/fantasy-land#promap-method
//. [`fantasy-land/reduce`]:    v:fantasyland/fantasy-land#reduce-method
//. [`fantasy-land/traverse`]:  v:fantasyland/fantasy-land#traverse-method
//. [`fantasy-land/zero`]:      v:fantasyland/fantasy-land#zero-method
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes
});

var sanctuaryEither = createCommonjsModule(function (module) {
/*
         _______    ___    _________    ___   ___    _______    ______
        /  ____/\  /  /\  /__   ___/\  /  /\ /  /\  /  ____/\  /  __  \
       /  /\___\/ /  / /  \_/  /\__\/ /  /_//  / / /  /\___\/ /  /\/  /\
      /  ____/\  /  / /    /  / /    /  ___   / / /  ____/\  /      _/ /
     /  /\___\/ /  / /    /  / /    /  /\_/  / / /  /\___\/ /  /|  |\\/
    /______/\  /__/ /    /__/ /    /__/ //__/ / /______/\  /__/ |__| |
    \______\/  \__\/     \__\/     \__\/ \__\/  \______\/  \__\/ \__\|
                                                                            */

//. <a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>
//.
//. # sanctuary-either
//.
//. The Either type represents values with two possibilities: a value of type
//. `Either a b` is either a Left whose value is of type `a` or a Right whose
//. value is of type `b`.

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (sanctuaryShow,
                        sanctuaryTypeClasses);
  }

} (function(show, Z) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    var $ = __doctest.require ('sanctuary-def');
    var type = __doctest.require ('sanctuary-type-identifiers');
    var S = (function() {
      var S = __doctest.require ('sanctuary');
      var EitherType = $.BinaryType
        ('sanctuary-either/Either')
        ('')
        (function(x) { return type (x) === Either['@@type']; })
        (function(e) { return e.isLeft ? [e.value] : []; })
        (function(e) { return e.isLeft ? [] : [e.value]; });
      var env = Z.concat (S.env,
                          [$.TypeClass, EitherType ($.Unknown) ($.Unknown)]);
      return S.create ({checkTypes: true, env: env});
    } ());
  }

  var Either = {};

  var Left$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Either,
    'isLeft':                 true,
    'isRight':                false,
    '@@show':                 Left$prototype$show,
    'fantasy-land/map':       Left$prototype$map,
    'fantasy-land/bimap':     Left$prototype$bimap,
    'fantasy-land/ap':        Left$prototype$ap,
    'fantasy-land/chain':     Left$prototype$chain,
    'fantasy-land/alt':       Left$prototype$alt,
    'fantasy-land/reduce':    Left$prototype$reduce,
    'fantasy-land/traverse':  Left$prototype$traverse,
    'fantasy-land/extend':    Left$prototype$extend
    /* eslint-enable key-spacing */
  };

  var Right$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Either,
    'isLeft':                 false,
    'isRight':                true,
    '@@show':                 Right$prototype$show,
    'fantasy-land/map':       Right$prototype$map,
    'fantasy-land/bimap':     Right$prototype$bimap,
    'fantasy-land/ap':        Right$prototype$ap,
    'fantasy-land/chain':     Right$prototype$chain,
    'fantasy-land/alt':       Right$prototype$alt,
    'fantasy-land/reduce':    Right$prototype$reduce,
    'fantasy-land/traverse':  Right$prototype$traverse,
    'fantasy-land/extend':    Right$prototype$extend
    /* eslint-enable key-spacing */
  };

  var util$1 =
    
    util ;
  var inspect =
    util$1.inspect != null && typeof util$1.inspect.custom === 'symbol' ?
    /* istanbul ignore next */ util$1.inspect.custom :
    /* istanbul ignore next */ 'inspect';
  Left$prototype[inspect] = Left$prototype$show;
  Right$prototype[inspect] = Right$prototype$show;

  //. `Either a b` satisfies the following [Fantasy Land][] specifications:
  //.
  //. ```javascript
  //. > const Useless = require ('sanctuary-useless')
  //.
  //. > S.map (k => k + ' '.repeat (16 - k.length) +
  //. .             (Z[k].test (Right (Useless)) ? '\u2705   ' :
  //. .              Z[k].test (Right (['foo'])) ? '\u2705 * ' :
  //. .              /* otherwise */               '\u274C   '))
  //. .       (S.keys (Z.filter ($.test ([]) ($.TypeClass), Z)))
  //. [ 'Setoid          ✅ * ',  // if ‘a’ and ‘b’ satisfy Setoid
  //. . 'Ord             ✅ * ',  // if ‘a’ and ‘b’ satisfy Ord
  //. . 'Semigroupoid    ❌   ',
  //. . 'Category        ❌   ',
  //. . 'Semigroup       ✅ * ',  // if ‘a’ and ‘b’ satisfy Semigroup
  //. . 'Monoid          ❌   ',
  //. . 'Group           ❌   ',
  //. . 'Filterable      ❌   ',
  //. . 'Functor         ✅   ',
  //. . 'Bifunctor       ✅   ',
  //. . 'Profunctor      ❌   ',
  //. . 'Apply           ✅   ',
  //. . 'Applicative     ✅   ',
  //. . 'Chain           ✅   ',
  //. . 'ChainRec        ✅   ',
  //. . 'Monad           ✅   ',
  //. . 'Alt             ✅   ',
  //. . 'Plus            ❌   ',
  //. . 'Alternative     ❌   ',
  //. . 'Foldable        ✅   ',
  //. . 'Traversable     ✅   ',
  //. . 'Extend          ✅   ',
  //. . 'Comonad         ❌   ',
  //. . 'Contravariant   ❌   ' ]
  //. ```

  //# Either :: TypeRep Either
  //.
  //. Either [type representative][].

  //# Either.Left :: a -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `a`.
  //.
  //. ```javascript
  //. > Left ('sqrt undefined for -1')
  //. Left ('sqrt undefined for -1')
  //. ```
  var Left = Either.Left = function(value) {
    var left = Object.create (Left$prototype);
    if (Z.Setoid.test (value)) {
      left['fantasy-land/equals'] = Left$prototype$equals;
      if (Z.Ord.test (value)) {
        left['fantasy-land/lte'] = Left$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      left['fantasy-land/concat'] = Left$prototype$concat;
    }
    left.value = value;
    return left;
  };

  //# Either.Right :: b -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `b`.
  //.
  //. ```javascript
  //. > Right (42)
  //. Right (42)
  //. ```
  var Right = Either.Right = function Right(value) {
    var right = Object.create (Right$prototype);
    if (Z.Setoid.test (value)) {
      right['fantasy-land/equals'] = Right$prototype$equals;
      if (Z.Ord.test (value)) {
        right['fantasy-land/lte'] = Right$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      right['fantasy-land/concat'] = Right$prototype$concat;
    }
    right.value = value;
    return right;
  };

  //# Either.@@type :: String
  //.
  //. Either [type identifier][].
  //.
  //. ```javascript
  //. > type (Right (42))
  //. 'sanctuary-either/Either@1'
  //.
  //. > type.parse (type (Right (42)))
  //. {namespace: 'sanctuary-either', name: 'Either', version: 1}
  //. ```
  Either['@@type'] = 'sanctuary-either/Either@1';

  //# Either.fantasy-land/of :: b -> Either a b
  //.
  //.   - `of (Either) (x)` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.of (Either) (42)
  //. Right (42)
  //. ```
  Either['fantasy-land/of'] = Right;

  function next(x) { return {tag: next, value: x}; }
  function done(x) { return {tag: done, value: x}; }

  //# Either.fantasy-land/chainRec :: ((a -> c, b -> c, a) -> Either d c, a) -> Either d b
  //.
  //. ```javascript
  //. > Z.chainRec (
  //. .   Either,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Left ('!!') : Right (x >= 1000 ? done (x) : next (x * x)),
  //. .   1
  //. . )
  //. Left ('!!')
  //.
  //. > Z.chainRec (
  //. .   Either,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Left ('!!') : Right (x >= 1000 ? done (x) : next (x * x)),
  //. .   2
  //. . )
  //. Right (65536)
  //. ```
  Either['fantasy-land/chainRec'] = function(f, x) {
    var r = next (x);
    while (r.tag === next) {
      var either = f (next, done, r.value);
      if (either.isLeft) return either;
      r = either.value;
    }
    return Right (r.value);
  };

  //# Either#@@show :: (Showable a, Showable b) => Either a b ~> () -> String
  //.
  //.   - `show (Left (x))` is equivalent to `'Left (' + show (x) + ')'`
  //.   - `show (Right (x))` is equivalent to `'Right (' + show (x) + ')'`
  //.
  //. ```javascript
  //. > show (Left ('sqrt undefined for -1'))
  //. 'Left ("sqrt undefined for -1")'
  //.
  //. > show (Right ([1, 2, 3]))
  //. 'Right ([1, 2, 3])'
  //. ```
  function Left$prototype$show() {
    return 'Left (' + show (this.value) + ')';
  }
  function Right$prototype$show() {
    return 'Right (' + show (this.value) + ')';
  }

  //# Either#fantasy-land/equals :: (Setoid a, Setoid b) => Either a b ~> Either a b -> Boolean
  //.
  //.   - `Left (x)` is equal to `Left (y)` [iff][] `x` is equal to `y`
  //.     according to [`Z.equals`][]
  //.   - `Right (x)` is equal to `Right (y)` [iff][] `x` is equal to `y`
  //.     according to [`Z.equals`][]
  //.   - `Left (x)` is never equal to `Right (y)`
  //.
  //. ```javascript
  //. > S.equals (Left ([1, 2, 3])) (Left ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Right ([1, 2, 3])) (Right ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Left ([1, 2, 3])) (Right ([1, 2, 3]))
  //. false
  //. ```
  function Left$prototype$equals(other) {
    return other.isLeft && Z.equals (this.value, other.value);
  }
  function Right$prototype$equals(other) {
    return other.isRight && Z.equals (this.value, other.value);
  }

  //# Either#fantasy-land/lte :: (Ord a, Ord b) => Either a b ~> Either a b -> Boolean
  //.
  //.   - `Left (x)` is less than or equal to `Left (y)` [iff][] `x` is less
  //.     than or equal to `y` according to [`Z.lte`][]
  //.   - `Right (x)` is less than or equal to `Right (y)` [iff][] `x` is less
  //.     than or equal to `y` according to [`Z.lte`][]
  //.   - `Left (x)` is always less than `Right (y)`
  //.
  //. ```javascript
  //. > S.filter (S.lte (Left (1))) ([Left (0), Left (1), Left (2)])
  //. [Left (0), Left (1)]
  //.
  //. > S.filter (S.lte (Right (1))) ([Right (0), Right (1), Right (2)])
  //. [Right (0), Right (1)]
  //.
  //. > S.filter (S.lte (Left (1))) ([Right (0), Right (1), Right (2)])
  //. []
  //.
  //. > S.filter (S.lte (Right (1))) ([Left (0), Left (1), Left (2)])
  //. [Left (0), Left (1), Left (2)]
  //. ```
  function Left$prototype$lte(other) {
    return other.isRight || Z.lte (this.value, other.value);
  }
  function Right$prototype$lte(other) {
    return other.isRight && Z.lte (this.value, other.value);
  }

  //# Either#fantasy-land/concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
  //.
  //.   - `concat (Left (x)) (Left (y))` is equivalent to
  //.     `Left (concat (x) (y))`
  //.   - `concat (Right (x)) (Right (y))` is equivalent to
  //.     `Right (concat (x) (y))`
  //.   - `concat (Left (x)) (Right (y))` is equivalent to `Right (y)`
  //.   - `concat (Right (x)) (Left (y))` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.concat (Left ('abc')) (Left ('def'))
  //. Left ('abcdef')
  //.
  //. > S.concat (Right ([1, 2, 3])) (Right ([4, 5, 6]))
  //. Right ([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat (Left ('abc')) (Right ([1, 2, 3]))
  //. Right ([1, 2, 3])
  //.
  //. > S.concat (Right ([1, 2, 3])) (Left ('abc'))
  //. Right ([1, 2, 3])
  //. ```
  function Left$prototype$concat(other) {
    return other.isLeft ? Left (Z.concat (this.value, other.value)) : other;
  }
  function Right$prototype$concat(other) {
    return other.isRight ? Right (Z.concat (this.value, other.value)) : this;
  }

  //# Either#fantasy-land/map :: Either a b ~> (b -> c) -> Either a c
  //.
  //.   - `map (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `map (f) (Right (x))` is equivalent to `Right (f (x))`
  //.
  //. ```javascript
  //. > S.map (S.add (1)) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.map (S.add (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$map(f) {
    return this;
  }
  function Right$prototype$map(f) {
    return Right (f (this.value));
  }

  //# Either#fantasy-land/bimap :: Either a c ~> (a -> b, c -> d) -> Either b d
  //.
  //.   - `bimap (f) (g) (Left (x))` is equivalent to `Left (f (x))`
  //.   - `bimap (f) (g) (Right (x))` is equivalent to `Right (g (x))`
  //.
  //. ```javascript
  //. > S.bimap (S.toUpper) (S.add (1)) (Left ('abc'))
  //. Left ('ABC')
  //.
  //. > S.bimap (S.toUpper) (S.add (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$bimap(f, g) {
    return Left (f (this.value));
  }
  function Right$prototype$bimap(f, g) {
    return Right (g (this.value));
  }

  //# Either#fantasy-land/ap :: Either a b ~> Either a (b -> c) -> Either a c
  //.
  //.   - `ap (Left (x)) (Left (y))` is equivalent to `Left (x)`
  //.   - `ap (Left (x)) (Right (y))` is equivalent to `Left (x)`
  //.   - `ap (Right (f)) (Left (x))` is equivalent to `Left (x)`
  //.   - `ap (Right (f)) (Right (x))` is equivalent to `Right (f (x))`
  //.
  //. ```javascript
  //. > S.ap (Left ('div undefined for 0')) (Left ('sqrt undefined for -1'))
  //. Left ('div undefined for 0')
  //.
  //. > S.ap (Left ('div undefined for 0')) (Right (99))
  //. Left ('div undefined for 0')
  //.
  //. > S.ap (Right (S.add (1))) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.ap (Right (S.add (1))) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$ap(other) {
    return other.isLeft ? other : this;
  }
  function Right$prototype$ap(other) {
    return other.isLeft ? other : Right (other.value (this.value));
  }

  //# Either#fantasy-land/chain :: Either a b ~> (b -> Either a c) -> Either a c
  //.
  //.   - `chain (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `chain (f) (Right (x))` is equivalent to `f (x)`
  //.
  //. ```javascript
  //. > const sqrt = n => n < 0 ? Left ('sqrt undefined for ' + show (n))
  //. .                         : Right (Math.sqrt (n))
  //.
  //. > S.chain (sqrt) (Left ('div undefined for 0'))
  //. Left ('div undefined for 0')
  //.
  //. > S.chain (sqrt) (Right (-1))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.chain (sqrt) (Right (25))
  //. Right (5)
  //. ```
  function Left$prototype$chain(f) {
    return this;
  }
  function Right$prototype$chain(f) {
    return f (this.value);
  }

  //# Either#fantasy-land/alt :: Either a b ~> Either a b -> Either a b
  //.
  //.   - `alt (Left (x)) (Left (y))` is equivalent to `Left (y)`
  //.   - `alt (Left (x)) (Right (y))` is equivalent to `Right (y)`
  //.   - `alt (Right (x)) (Left (y))` is equivalent to `Right (x)`
  //.   - `alt (Right (x)) (Right (y))` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.alt (Left ('A')) (Left ('B'))
  //. Left ('B')
  //.
  //. > S.alt (Left ('C')) (Right (1))
  //. Right (1)
  //.
  //. > S.alt (Right (2)) (Left ('D'))
  //. Right (2)
  //.
  //. > S.alt (Right (3)) (Right (4))
  //. Right (3)
  //. ```
  function Left$prototype$alt(other) {
    return other;
  }
  function Right$prototype$alt(other) {
    return this;
  }

  //# Either#fantasy-land/reduce :: Either a b ~> ((c, b) -> c, c) -> c
  //.
  //.   - `reduce (f) (x) (Left (y))` is equivalent to `x`
  //.   - `reduce (f) (x) (Right (y))` is equivalent to `f (x) (y)`
  //.
  //. ```javascript
  //. > S.reduce (S.concat) ([1]) (Left ('sqrt undefined for -1'))
  //. [1]
  //.
  //. > S.reduce (S.concat) ([1]) (Right ([2]))
  //. [1, 2]
  //. ```
  function Left$prototype$reduce(f, x) {
    return x;
  }
  function Right$prototype$reduce(f, x) {
    return f (x, this.value);
  }

  //# Either#fantasy-land/traverse :: Applicative f => Either a b ~> (TypeRep f, b -> f c) -> f (Either a c)
  //.
  //.   - `traverse (A) (f) (Left (x))` is equivalent to `of (A) (Left (x))`
  //.   - `traverse (A) (f) (Right (x))` is equivalent to `map (Right) (f (x))`
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (Left ('sqrt undefined for -1'))
  //. [Left ('sqrt undefined for -1')]
  //.
  //. > S.traverse (Array) (S.words) (Right ('foo bar baz'))
  //. [Right ('foo'), Right ('bar'), Right ('baz')]
  //. ```
  function Left$prototype$traverse(typeRep, f) {
    return Z.of (typeRep, this);
  }
  function Right$prototype$traverse(typeRep, f) {
    return Z.map (Right, f (this.value));
  }

  //# Either#fantasy-land/extend :: Either a b ~> (Either a b -> c) -> Either a c
  //.
  //.   - `extend (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `extend (f) (Right (x))` is equivalent to `Right (f (Right (x)))`
  //.
  //. ```javascript
  //. > S.extend (S.reduce (S.add) (1)) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.extend (S.reduce (S.add) (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$extend(f) {
    return this;
  }
  function Right$prototype$extend(f) {
    return Right (f (this));
  }

  return Either;

}));

//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
});

var sanctuaryTypeClasses$1 = createCommonjsModule(function (module) {
/*
             ############                  #
            ############                  ###
                  #####                  #####
                #####      ####################
              #####       ######################
            #####                     ###########
          #####         ######################
        #####          ####################
      #####                        #####
     ############                 ###
    ############                 */

//. # sanctuary-type-classes
//.
//. The [Fantasy Land Specification][FL] "specifies interoperability of common
//. algebraic structures" by defining a number of type classes. For each type
//. class, it states laws which every member of a type must obey in order for
//. the type to be a member of the type class. In order for the Maybe type to
//. be considered a [Functor][], for example, every `Maybe a` value must have
//. a `fantasy-land/map` method which obeys the identity and composition laws.
//.
//. This project provides:
//.
//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
//.   - one `TypeClass` value for each Fantasy Land type class;
//.   - lawful Fantasy Land methods for JavaScript's built-in types;
//.   - one function for each Fantasy Land method; and
//.   - several functions derived from these functions.
//.
//. ## Type-class hierarchy
//.
/* eslint-disable max-len */
//. <pre>
//.  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
//. (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
//.     |           |           |           \         / | | | | \
//.     |           |           |            \       /  | | | |  \
//.     |           |           |             \     /   | | | |   \
//.     |           |           |              \   /    | | | |    \
//.     |           |           |               \ /     | | | |     \
//.    Ord      Category     Monoid         Traversable | | | |      \
//.   (lte)       (id)       (empty)        (traverse)  / | | \       \
//.                             |                      /  | |  \       \
//.                             |                     /   / \   \       \
//.                             |             Profunctor /   \ Bifunctor \
//.                             |              (promap) /     \ (bimap)   \
//.                             |                      /       \           \
//.                           Group                   /         \           \
//.                          (invert)               Alt        Apply      Extend
//.                                                (alt)        (ap)     (extend)
//.                                                 /           / \           \
//.                                                /           /   \           \
//.                                               /           /     \           \
//.                                              /           /       \           \
//.                                             /           /         \           \
//.                                           Plus    Applicative    Chain      Comonad
//.                                          (zero)       (of)      (chain)    (extract)
//.                                             \         / \         / \
//.                                              \       /   \       /   \
//.                                               \     /     \     /     \
//.                                                \   /       \   /       \
//.                                                 \ /         \ /         \
//.                                             Alternative    Monad     ChainRec
//.                                                                     (chainRec)
//. </pre>
/* eslint-enable max-len */
//.
//. ## API

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (sanctuaryTypeIdentifiers);
  }

} (function(type) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    /* eslint-disable no-unused-vars */
    var Identity = __doctest.require ('sanctuary-identity');
    var List = __doctest.require ('./test/List');
    var Maybe = __doctest.require ('sanctuary-maybe');
    var Pair = __doctest.require ('sanctuary-pair');
    var Sum = __doctest.require ('./test/Sum');

    var Nil = List.Nil, Cons = List.Cons;
    var Nothing = Maybe.Nothing, Just = Maybe.Just;
    /* eslint-enable no-unused-vars */
  }

  //  concat_ :: Array a -> Array a -> Array a
  function concat_(xs) {
    return function(ys) {
      return xs.concat (ys);
    };
  }

  //  constant :: a -> b -> a
  function constant(x) {
    return function(y) {
      return x;
    };
  }

  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
  function forEachKey(strMap, f) {
    (Object.keys (strMap)).forEach (f, strMap);
  }

  //  has :: (String, Object) -> Boolean
  function has(k, o) {
    return Object.prototype.hasOwnProperty.call (o, k);
  }

  //  identity :: a -> a
  function identity(x) { return x; }

  //  pair :: a -> b -> Array2 a b
  function pair(x) {
    return function(y) {
      return [x, y];
    };
  }

  //  sameType :: (a, b) -> Boolean
  function sameType(x, y) {
    return typeof x === typeof y && type (x) === type (y);
  }

  //  sortedKeys :: Object -> Array String
  function sortedKeys(o) {
    return (Object.keys (o)).sort ();
  }

  //  thrush :: a -> (a -> b) -> b
  function thrush(x) {
    return function(f) {
      return f (x);
    };
  }

  //  unary :: (a -> b) -> (a, Any...) -> b
  function unary(f) {
    return function(x) {
      return f (x);
    };
  }

  //  type Iteration a = { value :: a, done :: Boolean }

  //  iterationNext :: a -> Iteration a
  function iterationNext(x) { return {value: x, done: false}; }

  //  iterationDone :: a -> Iteration a
  function iterationDone(x) { return {value: x, done: true}; }

  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
  //.
  //. The arguments are:
  //.
  //.   - the name of the type class, prefixed by its npm package name;
  //.   - the documentation URL of the type class;
  //.   - an array of dependencies; and
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if the value satisfies the requirements of the type class; `false`
  //.     otherwise.
  //.
  //. Example:
  //.
  //. ```javascript
  //. //    hasMethod :: String -> a -> Boolean
  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
  //.
  //. //    Foo :: TypeClass
  //. const Foo = Z.TypeClass (
  //.   'my-package/Foo',
  //.   'http://example.com/my-package#Foo',
  //.   [],
  //.   hasMethod ('foo')
  //. );
  //.
  //. //    Bar :: TypeClass
  //. const Bar = Z.TypeClass (
  //.   'my-package/Bar',
  //.   'http://example.com/my-package#Bar',
  //.   [Foo],
  //.   hasMethod ('bar')
  //. );
  //. ```
  //.
  //. Types whose values have a `foo` method are members of the Foo type class.
  //. Members of the Foo type class whose values have a `bar` method are also
  //. members of the Bar type class.
  //.
  //. Each `TypeClass` value has a `test` field: a function which accepts
  //. any JavaScript value and returns `true` if the value satisfies the
  //. type class's predicate and the predicates of all the type class's
  //. dependencies; `false` otherwise.
  //.
  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
  //. to define parametrically polymorphic functions which verify their
  //. type-class constraints at run time.
  function TypeClass(name, url, dependencies, test) {
    if (!(this instanceof TypeClass)) {
      return new TypeClass (name, url, dependencies, test);
    }
    this.name = name;
    this.url = url;
    this.test = function(x) {
      return dependencies.every (function(d) { return d.test (x); }) &&
             test (x);
    };
  }

  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass@1';

  //  data Location = Constructor | Value

  //  Constructor :: Location
  var Constructor = 'Constructor';

  //  Value :: Location
  var Value = 'Value';

  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
  function _funcPath(allowInheritedProps, path, _x) {
    var x = _x;
    for (var idx = 0; idx < path.length; idx += 1) {
      var k = path[idx];
      if (x == null || !(allowInheritedProps || has (k, x))) return null;
      x = x[k];
    }
    return typeof x === 'function' ? x : null;
  }

  //  funcPath :: (Array String, a) -> Nullable Function
  function funcPath(path, x) {
    return _funcPath (true, path, x);
  }

  //  implPath :: Array String -> Nullable Function
  function implPath(path) {
    return _funcPath (false, path, implementations);
  }

  //  functionName :: Function -> String
  var functionName = has ('name', function f() {}) ?
    function functionName(f) { return f.name; } :
    /* istanbul ignore next */
    function functionName(f) {
      var match = /function (\w*)/.exec (f);
      return match == null ? '' : match[1];
    };

  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
  function $(_name, dependencies, requirements) {
    function getBoundMethod(_name) {
      var name = 'fantasy-land/' + _name;
      return requirements[_name] === Constructor ?
        function(typeRep) {
          var f = funcPath ([name], typeRep);
          return f == null && typeof typeRep === 'function' ?
            implPath ([functionName (typeRep), name]) :
            f;
        } :
        function(x) {
          var isPrototype = x != null &&
                            x.constructor != null &&
                            x.constructor.prototype === x;
          var m = null;
          if (!isPrototype) m = funcPath ([name], x);
          if (m == null)    m = implPath ([type (x), 'prototype', name]);
          return m && m.bind (x);
        };
    }

    var version = '11.0.0';  // updated programmatically
    var keys = Object.keys (requirements);

    var typeClass = TypeClass (
      'sanctuary-type-classes/' + _name,
      'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version
        + '#' + _name,
      dependencies,
      function(x) {
        return keys.every (function(_name) {
          var arg = requirements[_name] === Constructor ? x.constructor : x;
          return getBoundMethod (_name) (arg) != null;
        });
      }
    );

    typeClass.methods = keys.reduce (function(methods, _name) {
      methods[_name] = getBoundMethod (_name);
      return methods;
    }, {});

    return typeClass;
  }

  //# Setoid :: TypeClass
  //.
  //. `TypeClass` value for [Setoid][].
  //.
  //. ```javascript
  //. > Setoid.test (null)
  //. true
  //. ```
  var Setoid = $ ('Setoid', [], {equals: Value});

  //# Ord :: TypeClass
  //.
  //. `TypeClass` value for [Ord][].
  //.
  //. ```javascript
  //. > Ord.test (0)
  //. true
  //.
  //. > Ord.test (Math.sqrt)
  //. false
  //. ```
  var Ord = $ ('Ord', [Setoid], {lte: Value});

  //# Semigroupoid :: TypeClass
  //.
  //. `TypeClass` value for [Semigroupoid][].
  //.
  //. ```javascript
  //. > Semigroupoid.test (Math.sqrt)
  //. true
  //.
  //. > Semigroupoid.test (0)
  //. false
  //. ```
  var Semigroupoid = $ ('Semigroupoid', [], {compose: Value});

  //# Category :: TypeClass
  //.
  //. `TypeClass` value for [Category][].
  //.
  //. ```javascript
  //. > Category.test (Math.sqrt)
  //. true
  //.
  //. > Category.test (0)
  //. false
  //. ```
  var Category = $ ('Category', [Semigroupoid], {id: Constructor});

  //# Semigroup :: TypeClass
  //.
  //. `TypeClass` value for [Semigroup][].
  //.
  //. ```javascript
  //. > Semigroup.test ('')
  //. true
  //.
  //. > Semigroup.test (0)
  //. false
  //. ```
  var Semigroup = $ ('Semigroup', [], {concat: Value});

  //# Monoid :: TypeClass
  //.
  //. `TypeClass` value for [Monoid][].
  //.
  //. ```javascript
  //. > Monoid.test ('')
  //. true
  //.
  //. > Monoid.test (0)
  //. false
  //. ```
  var Monoid = $ ('Monoid', [Semigroup], {empty: Constructor});

  //# Group :: TypeClass
  //.
  //. `TypeClass` value for [Group][].
  //.
  //. ```javascript
  //. > Group.test (Sum (0))
  //. true
  //.
  //. > Group.test ('')
  //. false
  //. ```
  var Group = $ ('Group', [Monoid], {invert: Value});

  //# Filterable :: TypeClass
  //.
  //. `TypeClass` value for [Filterable][].
  //.
  //. ```javascript
  //. > Filterable.test ({})
  //. true
  //.
  //. > Filterable.test ('')
  //. false
  //. ```
  var Filterable = $ ('Filterable', [], {filter: Value});

  //# Functor :: TypeClass
  //.
  //. `TypeClass` value for [Functor][].
  //.
  //. ```javascript
  //. > Functor.test ([])
  //. true
  //.
  //. > Functor.test ('')
  //. false
  //. ```
  var Functor = $ ('Functor', [], {map: Value});

  //# Bifunctor :: TypeClass
  //.
  //. `TypeClass` value for [Bifunctor][].
  //.
  //. ```javascript
  //. > Bifunctor.test (Pair ('foo') (64))
  //. true
  //.
  //. > Bifunctor.test ([])
  //. false
  //. ```
  var Bifunctor = $ ('Bifunctor', [Functor], {bimap: Value});

  //# Profunctor :: TypeClass
  //.
  //. `TypeClass` value for [Profunctor][].
  //.
  //. ```javascript
  //. > Profunctor.test (Math.sqrt)
  //. true
  //.
  //. > Profunctor.test ([])
  //. false
  //. ```
  var Profunctor = $ ('Profunctor', [Functor], {promap: Value});

  //# Apply :: TypeClass
  //.
  //. `TypeClass` value for [Apply][].
  //.
  //. ```javascript
  //. > Apply.test ([])
  //. true
  //.
  //. > Apply.test ('')
  //. false
  //. ```
  var Apply = $ ('Apply', [Functor], {ap: Value});

  //# Applicative :: TypeClass
  //.
  //. `TypeClass` value for [Applicative][].
  //.
  //. ```javascript
  //. > Applicative.test ([])
  //. true
  //.
  //. > Applicative.test ({})
  //. false
  //. ```
  var Applicative = $ ('Applicative', [Apply], {of: Constructor});

  //# Chain :: TypeClass
  //.
  //. `TypeClass` value for [Chain][].
  //.
  //. ```javascript
  //. > Chain.test ([])
  //. true
  //.
  //. > Chain.test ({})
  //. false
  //. ```
  var Chain = $ ('Chain', [Apply], {chain: Value});

  //# ChainRec :: TypeClass
  //.
  //. `TypeClass` value for [ChainRec][].
  //.
  //. ```javascript
  //. > ChainRec.test ([])
  //. true
  //.
  //. > ChainRec.test ({})
  //. false
  //. ```
  var ChainRec = $ ('ChainRec', [Chain], {chainRec: Constructor});

  //# Monad :: TypeClass
  //.
  //. `TypeClass` value for [Monad][].
  //.
  //. ```javascript
  //. > Monad.test ([])
  //. true
  //.
  //. > Monad.test ({})
  //. false
  //. ```
  var Monad = $ ('Monad', [Applicative, Chain], {});

  //# Alt :: TypeClass
  //.
  //. `TypeClass` value for [Alt][].
  //.
  //. ```javascript
  //. > Alt.test ({})
  //. true
  //.
  //. > Alt.test ('')
  //. false
  //. ```
  var Alt = $ ('Alt', [Functor], {alt: Value});

  //# Plus :: TypeClass
  //.
  //. `TypeClass` value for [Plus][].
  //.
  //. ```javascript
  //. > Plus.test ({})
  //. true
  //.
  //. > Plus.test ('')
  //. false
  //. ```
  var Plus = $ ('Plus', [Alt], {zero: Constructor});

  //# Alternative :: TypeClass
  //.
  //. `TypeClass` value for [Alternative][].
  //.
  //. ```javascript
  //. > Alternative.test ([])
  //. true
  //.
  //. > Alternative.test ({})
  //. false
  //. ```
  var Alternative = $ ('Alternative', [Applicative, Plus], {});

  //# Foldable :: TypeClass
  //.
  //. `TypeClass` value for [Foldable][].
  //.
  //. ```javascript
  //. > Foldable.test ({})
  //. true
  //.
  //. > Foldable.test ('')
  //. false
  //. ```
  var Foldable = $ ('Foldable', [], {reduce: Value});

  //# Traversable :: TypeClass
  //.
  //. `TypeClass` value for [Traversable][].
  //.
  //. ```javascript
  //. > Traversable.test ([])
  //. true
  //.
  //. > Traversable.test ('')
  //. false
  //. ```
  var Traversable = $ ('Traversable', [Functor, Foldable], {traverse: Value});

  //# Extend :: TypeClass
  //.
  //. `TypeClass` value for [Extend][].
  //.
  //. ```javascript
  //. > Extend.test ([])
  //. true
  //.
  //. > Extend.test ({})
  //. false
  //. ```
  var Extend = $ ('Extend', [Functor], {extend: Value});

  //# Comonad :: TypeClass
  //.
  //. `TypeClass` value for [Comonad][].
  //.
  //. ```javascript
  //. > Comonad.test (Identity (0))
  //. true
  //.
  //. > Comonad.test ([])
  //. false
  //. ```
  var Comonad = $ ('Comonad', [Extend], {extract: Value});

  //# Contravariant :: TypeClass
  //.
  //. `TypeClass` value for [Contravariant][].
  //.
  //. ```javascript
  //. > Contravariant.test (Math.sqrt)
  //. true
  //.
  //. > Contravariant.test ([])
  //. false
  //. ```
  var Contravariant = $ ('Contravariant', [], {contramap: Value});

  //  Null$prototype$equals :: Null ~> Null -> Boolean
  function Null$prototype$equals(other) {
    return true;
  }

  //  Null$prototype$lte :: Null ~> Null -> Boolean
  function Null$prototype$lte(other) {
    return true;
  }

  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$equals(other) {
    return true;
  }

  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$lte(other) {
    return true;
  }

  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      this === other;
  }

  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      this === false || other === true;
  }

  //  Number$prototype$equals :: Number ~> Number -> Boolean
  function Number$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      isNaN (this) && isNaN (other) || this === other;
  }

  //  Number$prototype$lte :: Number ~> Number -> Boolean
  function Number$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      isNaN (this) || this <= other;
  }

  //  Date$prototype$equals :: Date ~> Date -> Boolean
  function Date$prototype$equals(other) {
    return equals (this.valueOf (), other.valueOf ());
  }

  //  Date$prototype$lte :: Date ~> Date -> Boolean
  function Date$prototype$lte(other) {
    return lte (this.valueOf (), other.valueOf ());
  }

  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
  function RegExp$prototype$equals(other) {
    return other.source === this.source &&
           other.global === this.global &&
           other.ignoreCase === this.ignoreCase &&
           other.multiline === this.multiline &&
           other.sticky === this.sticky &&
           other.unicode === this.unicode;
  }

  //  String$empty :: () -> String
  function String$empty() {
    return '';
  }

  //  String$prototype$equals :: String ~> String -> Boolean
  function String$prototype$equals(other) {
    return typeof this === 'object' ?
      equals (this.valueOf (), other.valueOf ()) :
      this === other;
  }

  //  String$prototype$lte :: String ~> String -> Boolean
  function String$prototype$lte(other) {
    return typeof this === 'object' ?
      lte (this.valueOf (), other.valueOf ()) :
      this <= other;
  }

  //  String$prototype$concat :: String ~> String -> String
  function String$prototype$concat(other) {
    return this + other;
  }

  //  Array$empty :: () -> Array a
  function Array$empty() {
    return [];
  }

  //  Array$of :: a -> Array a
  function Array$of(x) {
    return [x];
  }

  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
  function Array$chainRec(f, x) {
    var result = [];
    var nil = {};
    var todo = {head: x, tail: nil};
    while (todo !== nil) {
      var more = nil;
      var steps = f (iterationNext, iterationDone, todo.head);
      for (var idx = 0; idx < steps.length; idx += 1) {
        var step = steps[idx];
        if (step.done) {
          result.push (step.value);
        } else {
          more = {head: step.value, tail: more};
        }
      }
      todo = todo.tail;
      while (more !== nil) {
        todo = {head: more.head, tail: todo};
        more = more.tail;
      }
    }
    return result;
  }

  //  Array$zero :: () -> Array a
  function Array$zero() {
    return [];
  }

  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
  function Array$prototype$equals(other) {
    if (other.length !== this.length) return false;
    for (var idx = 0; idx < this.length; idx += 1) {
      if (!(equals (this[idx], other[idx]))) return false;
    }
    return true;
  }

  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
  function Array$prototype$lte(other) {
    for (var idx = 0; true; idx += 1) {
      if (idx === this.length) return true;
      if (idx === other.length) return false;
      if (!(equals (this[idx], other[idx]))) {
        return lte (this[idx], other[idx]);
      }
    }
  }

  //  Array$prototype$concat :: Array a ~> Array a -> Array a
  function Array$prototype$concat(other) {
    return this.concat (other);
  }

  //  Array$prototype$filter :: Array a ~> (a -> Boolean) -> Array a
  function Array$prototype$filter(pred) {
    return this.filter (function(x) { return pred (x); });
  }

  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
  function Array$prototype$map(f) {
    return this.map (function(x) { return f (x); });
  }

  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
  function Array$prototype$ap(fs) {
    var result = [];
    for (var idx = 0; idx < fs.length; idx += 1) {
      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
        result.push (fs[idx] (this[idx2]));
      }
    }
    return result;
  }

  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
  function Array$prototype$chain(f) {
    var result = [];
    for (var idx = 0; idx < this.length; idx += 1) {
      for (var idx2 = 0, xs = f (this[idx]); idx2 < xs.length; idx2 += 1) {
        result.push (xs[idx2]);
      }
    }
    return result;
  }

  //  Array$prototype$alt :: Array a ~> Array a -> Array a
  var Array$prototype$alt = Array$prototype$concat;

  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
  function Array$prototype$reduce(f, initial) {
    var acc = initial;
    for (var idx = 0; idx < this.length; idx += 1) acc = f (acc, this[idx]);
    return acc;
  }

  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
  function Array$prototype$traverse(typeRep, f) {
    var xs = this;
    function go(idx, n) {
      switch (n) {
        case 0: return of (typeRep, []);
        case 2: return lift2 (pair, f (xs[idx]), f (xs[idx + 1]));
        default:
          var m = Math.floor (n / 4) * 2;
          return lift2 (concat_, go (idx, m), go (idx + m, n - m));
      }
    }
    return this.length % 2 === 1 ?
      lift2 (concat_, map (Array$of, f (this[0])), go (1, this.length - 1)) :
      go (0, this.length);
  }

  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
  function Array$prototype$extend(f) {
    return this.map (function(_, idx, xs) { return f (xs.slice (idx)); });
  }

  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$equals(other) {
    return Array$prototype$equals.call (this, other);
  }

  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$lte(other) {
    return Array$prototype$lte.call (this, other);
  }

  //  Error$prototype$equals :: Error ~> Error -> Boolean
  function Error$prototype$equals(other) {
    return equals (this.name, other.name) &&
           equals (this.message, other.message);
  }

  //  Object$empty :: () -> StrMap a
  function Object$empty() {
    return {};
  }

  //  Object$zero :: () -> StrMap a
  function Object$zero() {
    return {};
  }

  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$equals(other) {
    var self = this;
    var keys = sortedKeys (this);
    return equals (keys, sortedKeys (other)) &&
           keys.every (function(k) { return equals (self[k], other[k]); });
  }

  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$lte(other) {
    var theseKeys = sortedKeys (this);
    var otherKeys = sortedKeys (other);
    while (true) {
      if (theseKeys.length === 0) return true;
      if (otherKeys.length === 0) return false;
      var k = theseKeys.shift ();
      var z = otherKeys.shift ();
      if (k < z) return true;
      if (k > z) return false;
      if (!(equals (this[k], other[k]))) return lte (this[k], other[k]);
    }
  }

  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
  function Object$prototype$concat(other) {
    var result = {};
    function assign(k) { result[k] = this[k]; }
    forEachKey (this, assign);
    forEachKey (other, assign);
    return result;
  }

  //  Object$prototype$filter :: StrMap a ~> (a -> Boolean) -> StrMap a
  function Object$prototype$filter(pred) {
    var result = {};
    forEachKey (this, function(k) {
      if (pred (this[k])) result[k] = this[k];
    });
    return result;
  }

  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
  function Object$prototype$map(f) {
    var result = {};
    forEachKey (this, function(k) { result[k] = f (this[k]); });
    return result;
  }

  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
  function Object$prototype$ap(other) {
    var result = {};
    forEachKey (this, function(k) {
      if (has (k, other)) result[k] = other[k] (this[k]);
    });
    return result;
  }

  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
  var Object$prototype$alt = Object$prototype$concat;

  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
  function Object$prototype$reduce(f, initial) {
    var self = this;
    function reducer(acc, k) { return f (acc, self[k]); }
    return (sortedKeys (this)).reduce (reducer, initial);
  }

  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
  function Object$prototype$traverse(typeRep, f) {
    var self = this;
    return (Object.keys (this)).reduce (function(applicative, k) {
      function set(o) {
        return function(v) {
          var singleton = {}; singleton[k] = v;
          return Object$prototype$concat.call (o, singleton);
        };
      }
      return lift2 (set, applicative, f (self[k]));
    }, of (typeRep, {}));
  }

  //  Function$id :: () -> a -> a
  function Function$id() {
    return identity;
  }

  //  Function$of :: b -> (a -> b)
  function Function$of(x) {
    return function(_) { return x; };
  }

  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
  function Function$chainRec(f, x) {
    return function(a) {
      var step = iterationNext (x);
      while (!step.done) {
        step = f (iterationNext, iterationDone, step.value) (a);
      }
      return step.value;
    };
  }

  //  Function$prototype$equals :: Function ~> Function -> Boolean
  function Function$prototype$equals(other) {
    return other === this;
  }

  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$compose(other) {
    var semigroupoid = this;
    return function(x) { return other (semigroupoid (x)); };
  }

  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$map(f) {
    var functor = this;
    return function(x) { return f (functor (x)); };
  }

  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
  function Function$prototype$promap(f, g) {
    var profunctor = this;
    return function(x) { return g (profunctor (f (x))); };
  }

  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
  function Function$prototype$ap(f) {
    var apply = this;
    return function(x) { return f (x) (apply (x)); };
  }

  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
  function Function$prototype$chain(f) {
    var chain = this;
    return function(x) { return f (chain (x)) (x); };
  }

  //  Function$prototype$extend :: Semigroup a => (a -> b) ~> ((a -> b) -> c) -> (a -> c)
  function Function$prototype$extend(f) {
    var extend = this;
    return function(x) {
      return f (function(y) { return extend (concat (x, y)); });
    };
  }

  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
  function Function$prototype$contramap(f) {
    var contravariant = this;
    return function(x) { return contravariant (f (x)); };
  }

  /* eslint-disable key-spacing */
  var implementations = {
    Null: {
      'prototype': {
        'fantasy-land/equals':      Null$prototype$equals,
        'fantasy-land/lte':         Null$prototype$lte
      }
    },
    Undefined: {
      'prototype': {
        'fantasy-land/equals':      Undefined$prototype$equals,
        'fantasy-land/lte':         Undefined$prototype$lte
      }
    },
    Boolean: {
      'prototype': {
        'fantasy-land/equals':      Boolean$prototype$equals,
        'fantasy-land/lte':         Boolean$prototype$lte
      }
    },
    Number: {
      'prototype': {
        'fantasy-land/equals':      Number$prototype$equals,
        'fantasy-land/lte':         Number$prototype$lte
      }
    },
    Date: {
      'prototype': {
        'fantasy-land/equals':      Date$prototype$equals,
        'fantasy-land/lte':         Date$prototype$lte
      }
    },
    RegExp: {
      'prototype': {
        'fantasy-land/equals':      RegExp$prototype$equals
      }
    },
    String: {
      'fantasy-land/empty':         String$empty,
      'prototype': {
        'fantasy-land/equals':      String$prototype$equals,
        'fantasy-land/lte':         String$prototype$lte,
        'fantasy-land/concat':      String$prototype$concat
      }
    },
    Array: {
      'fantasy-land/empty':         Array$empty,
      'fantasy-land/of':            Array$of,
      'fantasy-land/chainRec':      Array$chainRec,
      'fantasy-land/zero':          Array$zero,
      'prototype': {
        'fantasy-land/equals':      Array$prototype$equals,
        'fantasy-land/lte':         Array$prototype$lte,
        'fantasy-land/concat':      Array$prototype$concat,
        'fantasy-land/filter':      Array$prototype$filter,
        'fantasy-land/map':         Array$prototype$map,
        'fantasy-land/ap':          Array$prototype$ap,
        'fantasy-land/chain':       Array$prototype$chain,
        'fantasy-land/alt':         Array$prototype$alt,
        'fantasy-land/reduce':      Array$prototype$reduce,
        'fantasy-land/traverse':    Array$prototype$traverse,
        'fantasy-land/extend':      Array$prototype$extend
      }
    },
    Arguments: {
      'prototype': {
        'fantasy-land/equals':      Arguments$prototype$equals,
        'fantasy-land/lte':         Arguments$prototype$lte
      }
    },
    Error: {
      'prototype': {
        'fantasy-land/equals':      Error$prototype$equals
      }
    },
    Object: {
      'fantasy-land/empty':         Object$empty,
      'fantasy-land/zero':          Object$zero,
      'prototype': {
        'fantasy-land/equals':      Object$prototype$equals,
        'fantasy-land/lte':         Object$prototype$lte,
        'fantasy-land/concat':      Object$prototype$concat,
        'fantasy-land/filter':      Object$prototype$filter,
        'fantasy-land/map':         Object$prototype$map,
        'fantasy-land/ap':          Object$prototype$ap,
        'fantasy-land/alt':         Object$prototype$alt,
        'fantasy-land/reduce':      Object$prototype$reduce,
        'fantasy-land/traverse':    Object$prototype$traverse
      }
    },
    Function: {
      'fantasy-land/id':            Function$id,
      'fantasy-land/of':            Function$of,
      'fantasy-land/chainRec':      Function$chainRec,
      'prototype': {
        'fantasy-land/equals':      Function$prototype$equals,
        'fantasy-land/compose':     Function$prototype$compose,
        'fantasy-land/map':         Function$prototype$map,
        'fantasy-land/promap':      Function$prototype$promap,
        'fantasy-land/ap':          Function$prototype$ap,
        'fantasy-land/chain':       Function$prototype$chain,
        'fantasy-land/extend':      Function$prototype$extend,
        'fantasy-land/contramap':   Function$prototype$contramap
      }
    }
  };
  /* eslint-enable key-spacing */

  //# equals :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and equal according
  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
  //.
  //. `fantasy-land/equals` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
  //. Array, Arguments, Error, Object, and Function.
  //.
  //. The algorithm supports circular data structures. Two arrays are equal
  //. if they have the same index paths and for each path have equal values.
  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
  //. are equal even if their internal structures differ. Two objects are equal
  //. if they have the same property paths and for each path have equal values.
  //.
  //. ```javascript
  //. > equals (0, -0)
  //. true
  //.
  //. > equals (NaN, NaN)
  //. true
  //.
  //. > equals (Cons (1, Cons (2, Nil)), Cons (1, Cons (2, Nil)))
  //. true
  //.
  //. > equals (Cons (1, Cons (2, Nil)), Cons (2, Cons (1, Nil)))
  //. false
  //. ```
  var equals = (function() {
    //  $pairs :: Array (Array2 Any Any)
    var $pairs = [];

    return function equals(x, y) {
      if (!(sameType (x, y))) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some (function(p) { return p[0] === x && p[1] === y; })) {
        return true;
      }

      $pairs.push ([x, y]);
      try {
        return Setoid.test (x) &&
               Setoid.test (y) &&
               Setoid.methods.equals (x) (y);
      } finally {
        $pairs.pop ();
      }
    };
  } ());

  //# lt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. less than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`gt`](#gt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lt (0, 0)
  //. false
  //.
  //. > lt (0, 1)
  //. true
  //.
  //. > lt (1, 0)
  //. false
  //. ```
  function lt(x, y) {
    return sameType (x, y) && !(lte (y, x));
  }

  //# lte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is less than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. `fantasy-land/lte` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
  //. Arguments, and Object.
  //.
  //. The algorithm supports circular data structures in the same manner as
  //. [`equals`](#equals).
  //.
  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lte (0, 0)
  //. true
  //.
  //. > lte (0, 1)
  //. true
  //.
  //. > lte (1, 0)
  //. false
  //. ```
  var lte = (function() {
    //  $pairs :: Array (Array2 Any Any)
    var $pairs = [];

    return function lte(x, y) {
      if (!(sameType (x, y))) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some (function(p) { return p[0] === x && p[1] === y; })) {
        return equals (x, y);
      }

      $pairs.push ([x, y]);
      try {
        return Ord.test (x) && Ord.test (y) && Ord.methods.lte (x) (y);
      } finally {
        $pairs.pop ();
      }
    };
  } ());

  //# gt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. greater than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > gt (0, 0)
  //. false
  //.
  //. > gt (0, 1)
  //. false
  //.
  //. > gt (1, 0)
  //. true
  //. ```
  function gt(x, y) {
    return lt (y, x);
  }

  //# gte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is greater than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gt`](#gt).
  //.
  //. ```javascript
  //. > gte (0, 0)
  //. true
  //.
  //. > gte (0, 1)
  //. false
  //.
  //. > gte (1, 0)
  //. true
  //. ```
  function gte(x, y) {
    return lte (y, x);
  }

  //# min :: Ord a => (a, a) -> a
  //.
  //. Returns the smaller of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > min (10, 2)
  //. 2
  //.
  //. > min (new Date ('1999-12-31'), new Date ('2000-01-01'))
  //. new Date ('1999-12-31')
  //.
  //. > min ('10', '2')
  //. '10'
  //. ```
  function min(x, y) {
    return lte (x, y) ? x : y;
  }

  //# max :: Ord a => (a, a) -> a
  //.
  //. Returns the larger of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > max (10, 2)
  //. 10
  //.
  //. > max (new Date ('1999-12-31'), new Date ('2000-01-01'))
  //. new Date ('2000-01-01')
  //.
  //. > max ('10', '2')
  //. '2'
  //. ```
  function max(x, y) {
    return lte (x, y) ? y : x;
  }

  //# clamp :: Ord a => (a, a, a) -> a
  //.
  //. Takes a lower bound, an upper bound, and a value of the same type.
  //. Returns the value if it is within the bounds; the nearer bound otherwise.
  //.
  //. This function is derived from [`min`](#min) and [`max`](#max).
  //.
  //. ```javascript
  //. > clamp (0, 100, 42)
  //. 42
  //.
  //. > clamp (0, 100, -1)
  //. 0
  //.
  //. > clamp ('A', 'Z', '~')
  //. 'Z'
  //. ```
  function clamp(lower, upper, x) {
    return max (lower, min (upper, x));
  }

  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
  //.
  //. Function wrapper for [`fantasy-land/compose`][].
  //.
  //. `fantasy-land/compose` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > compose (Math.sqrt, x => x + 1) (99)
  //. 10
  //. ```
  function compose(x, y) {
    return Semigroupoid.methods.compose (y) (x);
  }

  //# id :: Category c => TypeRep c -> c
  //.
  //. Function wrapper for [`fantasy-land/id`][].
  //.
  //. `fantasy-land/id` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > id (Function) ('foo')
  //. 'foo'
  //. ```
  function id(typeRep) {
    return Category.methods.id (typeRep) ();
  }

  //# concat :: Semigroup a => (a, a) -> a
  //.
  //. Function wrapper for [`fantasy-land/concat`][].
  //.
  //. `fantasy-land/concat` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > concat ('abc', 'def')
  //. 'abcdef'
  //.
  //. > concat ([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > concat ({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > concat (Cons ('foo', Cons ('bar', Cons ('baz', Nil))), Cons ('quux', Nil))
  //. Cons ('foo', Cons ('bar', Cons ('baz', Cons ('quux', Nil))))
  //. ```
  function concat(x, y) {
    return Semigroup.methods.concat (x) (y);
  }

  //# empty :: Monoid m => TypeRep m -> m
  //.
  //. Function wrapper for [`fantasy-land/empty`][].
  //.
  //. `fantasy-land/empty` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > empty (String)
  //. ''
  //.
  //. > empty (Array)
  //. []
  //.
  //. > empty (Object)
  //. {}
  //.
  //. > empty (List)
  //. Nil
  //. ```
  function empty(typeRep) {
    return Monoid.methods.empty (typeRep) ();
  }

  //# invert :: Group g => g -> g
  //.
  //. Function wrapper for [`fantasy-land/invert`][].
  //.
  //. ```javascript
  //. > invert (Sum (5))
  //. Sum (-5)
  //. ```
  function invert(group) {
    return Group.methods.invert (group) ();
  }

  //# filter :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/filter`][]. Discards every element
  //. which does not satisfy the predicate.
  //.
  //. `fantasy-land/filter` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`reject`](#reject).
  //.
  //. ```javascript
  //. > filter (x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filter (x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {x: 1, z: 3}
  //.
  //. > filter (x => x % 2 == 1, Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (1, Cons (3, Nil))
  //.
  //. > filter (x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > filter (x => x % 2 == 1, Just (0))
  //. Nothing
  //.
  //. > filter (x => x % 2 == 1, Just (1))
  //. Just (1)
  //. ```
  function filter(pred, filterable) {
    return Filterable.methods.filter (filterable) (pred);
  }

  //# reject :: Filterable f => (a -> Boolean, f a) -> f a
  //.
  //. Discards every element which satisfies the predicate.
  //.
  //. This function is derived from [`filter`](#filter).
  //.
  //. ```javascript
  //. > reject (x => x % 2 == 1, [1, 2, 3])
  //. [2]
  //.
  //. > reject (x => x % 2 == 1, {x: 1, y: 2, z: 3})
  //. {y: 2}
  //.
  //. > reject (x => x % 2 == 1, Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (2, Nil)
  //.
  //. > reject (x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > reject (x => x % 2 == 1, Just (0))
  //. Just (0)
  //.
  //. > reject (x => x % 2 == 1, Just (1))
  //. Nothing
  //. ```
  function reject(pred, filterable) {
    return filter (function(x) { return !(pred (x)); }, filterable);
  }

  //# map :: Functor f => (a -> b, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/map`][].
  //.
  //. `fantasy-land/map` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > map (Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > map (Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > map (Math.sqrt, s => s.length) ('Sanctuary')
  //. 3
  //.
  //. > map (Math.sqrt, Pair ('foo') (64))
  //. Pair ('foo') (8)
  //.
  //. > map (Math.sqrt, Nil)
  //. Nil
  //.
  //. > map (Math.sqrt, Cons (1, Cons (4, Cons (9, Nil))))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function map(f, functor) {
    return Functor.methods.map (functor) (f);
  }

  //# flip :: Functor f => (f (a -> b), a) -> f b
  //.
  //. Maps over the given functions, applying each to the given value.
  //.
  //. This function is derived from [`map`](#map).
  //.
  //. ```javascript
  //. > flip (x => y => x + y, '!') ('foo')
  //. 'foo!'
  //.
  //. > flip ([Math.floor, Math.ceil], 1.5)
  //. [1, 2]
  //.
  //. > flip ({floor: Math.floor, ceil: Math.ceil}, 1.5)
  //. {floor: 1, ceil: 2}
  //.
  //. > flip (Cons (Math.floor, Cons (Math.ceil, Nil)), 1.5)
  //. Cons (1, Cons (2, Nil))
  //. ```
  function flip(functor, x) {
    return Functor.methods.map (functor) (thrush (x));
  }

  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
  //.
  //. Function wrapper for [`fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > bimap (s => s.toUpperCase (), Math.sqrt, Pair ('foo') (64))
  //. Pair ('FOO') (8)
  //. ```
  function bimap(f, g, bifunctor) {
    return Bifunctor.methods.bimap (bifunctor) (f, g);
  }

  //# mapLeft :: Bifunctor f => (a -> b, f a c) -> f b c
  //.
  //. Maps the given function over the left side of a Bifunctor.
  //.
  //. ```javascript
  //. > mapLeft (Math.sqrt, Pair (64) (9))
  //. Pair (8) (9)
  //. ```
  function mapLeft(f, bifunctor) {
    return bimap (f, identity, bifunctor);
  }

  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
  //.
  //. Function wrapper for [`fantasy-land/promap`][].
  //.
  //. `fantasy-land/promap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > promap (Math.abs, x => x + 1, Math.sqrt) (-100)
  //. 11
  //. ```
  function promap(f, g, profunctor) {
    return Profunctor.methods.promap (profunctor) (f, g);
  }

  //# ap :: Apply f => (f (a -> b), f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/ap`][].
  //.
  //. `fantasy-land/ap` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > ap ([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > ap ({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
  //. {a: 4, b: 100}
  //.
  //. > ap (s => n => s.slice (0, n), s => Math.ceil (s.length / 2)) ('Haskell')
  //. 'Hask'
  //.
  //. > ap (Identity (Math.sqrt), Identity (64))
  //. Identity (8)
  //.
  //. > ap (Cons (Math.sqrt, Cons (x => x * x, Nil)), Cons (16, Cons (100, Nil)))
  //. Cons (4, Cons (10, Cons (256, Cons (10000, Nil))))
  //. ```
  function ap(applyF, applyX) {
    return Apply.methods.ap (applyX) (applyF);
  }

  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
  //.
  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
  //. result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift3`](#lift3).
  //.
  //. ```javascript
  //. > lift2 (x => y => Math.pow (x, y), [10], [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > lift2 (x => y => Math.pow (x, y), Identity (10), Identity (3))
  //. Identity (1000)
  //. ```
  function lift2(f, x, y) {
    return ap (map (f, x), y);
  }

  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
  //.
  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
  //. returns the result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift2`](#lift2).
  //.
  //. ```javascript
  //. > lift3 (x => y => z => x + z + y,
  //. .        ['<', '['],
  //. .        ['>', ']'],
  //. .        ['foo', 'bar', 'baz'])
  //. [ '<foo>', '<bar>', '<baz>',
  //. . '<foo]', '<bar]', '<baz]',
  //. . '[foo>', '[bar>', '[baz>',
  //. . '[foo]', '[bar]', '[baz]' ]
  //.
  //. > lift3 (x => y => z => x + z + y,
  //. .        Identity ('<'),
  //. .        Identity ('>'),
  //. .        Identity ('baz'))
  //. Identity ('<baz>')
  //. ```
  function lift3(f, x, y, z) {
    return ap (ap (map (f, x), y), z);
  }

  //# apFirst :: Apply f => (f a, f b) -> f a
  //.
  //. Combines two effectful actions, keeping only the result of the first.
  //. Equivalent to Haskell's `(<*)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > apFirst ([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > apFirst (Identity (1), Identity (2))
  //. Identity (1)
  //. ```
  function apFirst(x, y) {
    return lift2 (constant, x, y);
  }

  //# apSecond :: Apply f => (f a, f b) -> f b
  //.
  //. Combines two effectful actions, keeping only the result of the second.
  //. Equivalent to Haskell's `(*>)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > apSecond ([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > apSecond (Identity (1), Identity (2))
  //. Identity (2)
  //. ```
  function apSecond(x, y) {
    return lift2 (constant (identity), x, y);
  }

  //# of :: Applicative f => (TypeRep f, a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/of`][].
  //.
  //. `fantasy-land/of` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > of (Array, 42)
  //. [42]
  //.
  //. > of (Function, 42) (null)
  //. 42
  //.
  //. > of (List, 42)
  //. Cons (42, Nil)
  //. ```
  function of(typeRep, x) {
    return Applicative.methods.of (typeRep) (x);
  }

  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > append (3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > append (3, Cons (1, Cons (2, Nil)))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function append(x, xs) {
    return concat (xs, of (xs.constructor, x));
  }

  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > prepend (1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > prepend (1, Cons (2, Cons (3, Nil)))
  //. Cons (1, Cons (2, Cons (3, Nil)))
  //. ```
  function prepend(x, xs) {
    return concat (of (xs.constructor, x), xs);
  }

  //# chain :: Chain m => (a -> m b, m a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chain`][].
  //.
  //. `fantasy-land/chain` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > chain (x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > chain (x => x % 2 == 1 ? of (List, x) : Nil,
  //. .        Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (1, Cons (3, Nil))
  //.
  //. > chain (n => s => s.slice (0, n),
  //. .        s => Math.ceil (s.length / 2))
  //. .       ('Haskell')
  //. 'Hask'
  //. ```
  function chain(f, chain_) {
    return Chain.methods.chain (chain_) (f);
  }

  //# join :: Chain m => m (m a) -> m a
  //.
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. This function is derived from [`chain`](#chain).
  //.
  //. ```javascript
  //. > join ([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > join ([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > join (Identity (Identity (1)))
  //. Identity (1)
  //. ```
  function join(chain_) {
    return chain (identity, chain_);
  }

  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chainRec`][].
  //.
  //. `fantasy-land/chainRec` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > chainRec (
  //. .   Array,
  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map (done)
  //. .                                    : [s + 'o', s + 'n'].map (next),
  //. .   ''
  //. . )
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    return ChainRec.methods.chainRec (typeRep) (f, x);
  }

  //# alt :: Alt f => (f a, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/alt`][].
  //.
  //. `fantasy-land/alt` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > alt ([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > alt (Nothing, Nothing)
  //. Nothing
  //.
  //. > alt (Nothing, Just (1))
  //. Just (1)
  //.
  //. > alt (Just (2), Just (3))
  //. Just (2)
  //. ```
  function alt(x, y) {
    return Alt.methods.alt (x) (y);
  }

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. Function wrapper for [`fantasy-land/zero`][].
  //.
  //. `fantasy-land/zero` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > zero (Array)
  //. []
  //.
  //. > zero (Object)
  //. {}
  //.
  //. > zero (Maybe)
  //. Nothing
  //. ```
  function zero(typeRep) {
    return Plus.methods.zero (typeRep) ();
  }

  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
  //.
  //. Function wrapper for [`fantasy-land/reduce`][].
  //.
  //. `fantasy-land/reduce` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > reduce ((xs, x) => [x].concat (xs), [], [1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reduce (concat, '', Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. 'foobarbaz'
  //. ```
  function reduce(f, x, foldable) {
    return Foldable.methods.reduce (foldable) (f, x);
  }

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > size ([])
  //. 0
  //.
  //. > size (['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > size (Nil)
  //. 0
  //.
  //. > size (Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. 3
  //. ```
  function size(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.length;
    return reduce (function(n, _) { return n + 1; }, 0, foldable);
  }

  //# all :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if all the elements of the structure satisfy the
  //. predicate; `false` otherwise.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. See also [`any`](#any) and [`none`](#none).
  //.
  //. ```javascript
  //. > all (Number.isInteger, [])
  //. true
  //.
  //. > all (Number.isInteger, [1, 2, 3])
  //. true
  //.
  //. > all (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. false
  //. ```
  function all(pred, foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.every (unary (pred));
    return reduce (function(b, x) { return b && pred (x); }, true, foldable);
  }

  //# any :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if any element of the structure satisfies the predicate;
  //. `false` otherwise.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. See also [`all`](#all) and [`none`](#none).
  //.
  //. ```javascript
  //. > any (Number.isInteger, [])
  //. false
  //.
  //. > any (Number.isInteger, [1, 2, 3])
  //. true
  //.
  //. > any (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. true
  //. ```
  function any(pred, foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return foldable.some (unary (pred));
    return reduce (function(b, x) { return b || pred (x); }, false, foldable);
  }

  //# none :: Foldable f => (a -> Boolean, f a) -> Boolean
  //.
  //. Returns `true` if none of the elements of the structure satisfies the
  //. predicate; `false` otherwise.
  //.
  //. This function is derived from [`any`](#any). `none (pred, foldable)` is
  //. equivalent to `!(any (pred, foldable))`.
  //.
  //. See also [`all`](#all).
  //.
  //. ```javascript
  //. > none (Number.isInteger, [])
  //. true
  //.
  //. > none (Number.isInteger, [0, 0.25, 0.5, 0.75, 1])
  //. false
  //. ```
  function none(pred, foldable) {
    return !(any (pred, foldable));
  }

  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
  //.
  //. Takes a value and a structure and returns `true` if the
  //. value is an element of the structure; `false` otherwise.
  //.
  //. This function is derived from [`equals`](#equals) and
  //. [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > elem ('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > elem ('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > elem (3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > elem (8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > elem (0, Just (0))
  //. true
  //.
  //. > elem (0, Just (1))
  //. false
  //.
  //. > elem (0, Nothing)
  //. false
  //. ```
  function elem(x, foldable) {
    return any (function(y) { return equals (x, y); }, foldable);
  }

  //# foldMap :: (Monoid m, Foldable f) => (TypeRep m, a -> m, f a) -> m
  //.
  //. Deconstructs a foldable by mapping every element to a monoid and
  //. concatenating the results.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > foldMap (String, f => f.name, [Math.sin, Math.cos, Math.tan])
  //. 'sincostan'
  //. ```
  function foldMap(typeRep, f, foldable) {
    return reduce (function(monoid, x) { return concat (monoid, f (x)); },
                   empty (typeRep),
                   foldable);
  }

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > reverse ([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reverse (Cons (1, Cons (2, Cons (3, Nil))))
  //. Cons (3, Cons (2, Cons (1, Nil)))
  //. ```
  function reverse(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) return (foldable.slice ()).reverse ();
    var F = foldable.constructor;
    return reduce (function(xs, x) { return concat (of (F, x), xs); },
                   empty (F),
                   foldable);
  }

  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) for comparisons.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > sort (['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > sort ([Just (2), Nothing, Just (1)])
  //. [Nothing, Just (1), Just (2)]
  //.
  //. > sort (Cons ('foo', Cons ('bar', Cons ('baz', Nil))))
  //. Cons ('bar', Cons ('baz', Cons ('foo', Nil)))
  //. ```
  function sort(foldable) {
    return sortBy (identity, foldable);
  }

  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) to compare the values produced by applying the
  //. given function to each element of the structure.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > sortBy (s => s.length, ['red', 'green', 'blue'])
  //. ['red', 'blue', 'green']
  //.
  //. > sortBy (s => s.length, ['black', 'white'])
  //. ['black', 'white']
  //.
  //. > sortBy (s => s.length, ['white', 'black'])
  //. ['white', 'black']
  //.
  //. > sortBy (s => s.length, Cons ('red', Cons ('green', Cons ('blue', Nil))))
  //. Cons ('red', Cons ('blue', Cons ('green', Nil)))
  //. ```
  function sortBy(f, foldable) {
    var rs = reduce (function(rs, x) {
      rs.push ({idx: rs.length, x: x, fx: f (x)});
      return rs;
    }, [], foldable);

    var lte_ = (function(r) {
      switch (typeof (r && r.fx)) {
        case 'number':  return function(x, y) { return x <= y || x !== x; };
        case 'string':  return function(x, y) { return x <= y; };
        default:        return lte;
      }
    } (rs[0]));

    rs.sort (function(a, b) {
      return lte_ (a.fx, b.fx) ? lte_ (b.fx, a.fx) ? a.idx - b.idx : -1 : 1;
    });

    if (Array.isArray (foldable)) {
      for (var idx = 0; idx < rs.length; idx += 1) rs[idx] = rs[idx].x;
      return rs;
    }

    var F = foldable.constructor;
    var result = empty (F);
    for (idx = 0; idx < rs.length; idx += 1) {
      result = concat (result, of (F, rs[idx].x));
    }
    return result;
  }

  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
  //.
  //. Function wrapper for [`fantasy-land/traverse`][].
  //.
  //. `fantasy-land/traverse` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`sequence`](#sequence).
  //.
  //. ```javascript
  //. > traverse (Array, x => x, [[1, 2, 3], [4, 5]])
  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  //.
  //. > traverse (Identity, x => Identity (x + 1), [1, 2, 3])
  //. Identity ([2, 3, 4])
  //. ```
  function traverse(typeRep, f, traversable) {
    return Traversable.methods.traverse (traversable) (typeRep, f);
  }

  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
  //.
  //. Inverts the given `t (f a)` to produce an `f (t a)`.
  //.
  //. This function is derived from [`traverse`](#traverse).
  //.
  //. ```javascript
  //. > sequence (Array, Identity ([1, 2, 3]))
  //. [Identity (1), Identity (2), Identity (3)]
  //.
  //. > sequence (Identity, [Identity (1), Identity (2), Identity (3)])
  //. Identity ([1, 2, 3])
  //. ```
  function sequence(typeRep, traversable) {
    return traverse (typeRep, identity, traversable);
  }

  //# extend :: Extend w => (w a -> b, w a) -> w b
  //.
  //. Function wrapper for [`fantasy-land/extend`][].
  //.
  //. `fantasy-land/extend` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > extend (ss => ss.join (''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //.
  //. > extend (f => f ([3, 4]), reverse) ([1, 2])
  //. [4, 3, 2, 1]
  //. ```
  function extend(f, extend_) {
    return Extend.methods.extend (extend_) (f);
  }

  //# duplicate :: Extend w => w a -> w (w a)
  //.
  //. Adds one level of nesting to a comonadic structure.
  //.
  //. This function is derived from [`extend`](#extend).
  //.
  //. ```javascript
  //. > duplicate (Identity (1))
  //. Identity (Identity (1))
  //.
  //. > duplicate ([1])
  //. [[1]]
  //.
  //. > duplicate ([1, 2, 3])
  //. [[1, 2, 3], [2, 3], [3]]
  //.
  //. > duplicate (reverse) ([1, 2]) ([3, 4])
  //. [4, 3, 2, 1]
  //. ```
  function duplicate(extend_) {
    return extend (identity, extend_);
  }

  //# extract :: Comonad w => w a -> a
  //.
  //. Function wrapper for [`fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > extract (Identity (42))
  //. 42
  //. ```
  function extract(comonad) {
    return Comonad.methods.extract (comonad) ();
  }

  //# contramap :: Contravariant f => (b -> a, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/contramap`][].
  //.
  //. `fantasy-land/contramap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > contramap (s => s.length, Math.sqrt) ('Sanctuary')
  //. 3
  //. ```
  function contramap(f, contravariant) {
    return Contravariant.methods.contramap (contravariant) (f);
  }

  return {
    TypeClass: TypeClass,
    Setoid: Setoid,
    Ord: Ord,
    Semigroupoid: Semigroupoid,
    Category: Category,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Group: Group,
    Filterable: Filterable,
    Functor: Functor,
    Bifunctor: Bifunctor,
    Profunctor: Profunctor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    ChainRec: ChainRec,
    Monad: Monad,
    Alt: Alt,
    Plus: Plus,
    Alternative: Alternative,
    Foldable: Foldable,
    Traversable: Traversable,
    Extend: Extend,
    Comonad: Comonad,
    Contravariant: Contravariant,
    equals: equals,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    min: min,
    max: max,
    clamp: clamp,
    compose: compose,
    id: id,
    concat: concat,
    empty: empty,
    invert: invert,
    filter: filter,
    reject: reject,
    map: map,
    flip: flip,
    bimap: bimap,
    mapLeft: mapLeft,
    promap: promap,
    ap: ap,
    lift2: lift2,
    lift3: lift3,
    apFirst: apFirst,
    apSecond: apSecond,
    of: of,
    append: append,
    prepend: prepend,
    chain: chain,
    join: join,
    chainRec: chainRec,
    alt: alt,
    zero: zero,
    reduce: reduce,
    size: size,
    all: all,
    any: any,
    none: none,
    elem: elem,
    foldMap: foldMap,
    reverse: reverse,
    sort: sort,
    sortBy: sortBy,
    traverse: traverse,
    sequence: sequence,
    extend: extend,
    duplicate: duplicate,
    extract: extract,
    contramap: contramap
  };

}));

//. [Alt]:                      v:fantasyland/fantasy-land#alt
//. [Alternative]:              v:fantasyland/fantasy-land#alternative
//. [Applicative]:              v:fantasyland/fantasy-land#applicative
//. [Apply]:                    v:fantasyland/fantasy-land#apply
//. [Bifunctor]:                v:fantasyland/fantasy-land#bifunctor
//. [Category]:                 v:fantasyland/fantasy-land#category
//. [Chain]:                    v:fantasyland/fantasy-land#chain
//. [ChainRec]:                 v:fantasyland/fantasy-land#chainrec
//. [Comonad]:                  v:fantasyland/fantasy-land#comonad
//. [Contravariant]:            v:fantasyland/fantasy-land#contravariant
//. [Extend]:                   v:fantasyland/fantasy-land#extend
//. [FL]:                       v:fantasyland/fantasy-land
//. [Filterable]:               v:fantasyland/fantasy-land#filterable
//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
//. [Functor]:                  v:fantasyland/fantasy-land#functor
//. [Group]:                    v:fantasyland/fantasy-land#group
//. [Monad]:                    v:fantasyland/fantasy-land#monad
//. [Monoid]:                   v:fantasyland/fantasy-land#monoid
//. [Ord]:                      v:fantasyland/fantasy-land#ord
//. [Plus]:                     v:fantasyland/fantasy-land#plus
//. [Profunctor]:               v:fantasyland/fantasy-land#profunctor
//. [Semigroup]:                v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:                   v:fantasyland/fantasy-land#setoid
//. [Traversable]:              v:fantasyland/fantasy-land#traversable
//. [`fantasy-land/alt`]:       v:fantasyland/fantasy-land#alt-method
//. [`fantasy-land/ap`]:        v:fantasyland/fantasy-land#ap-method
//. [`fantasy-land/bimap`]:     v:fantasyland/fantasy-land#bimap-method
//. [`fantasy-land/chain`]:     v:fantasyland/fantasy-land#chain-method
//. [`fantasy-land/chainRec`]:  v:fantasyland/fantasy-land#chainrec-method
//. [`fantasy-land/compose`]:   v:fantasyland/fantasy-land#compose-method
//. [`fantasy-land/concat`]:    v:fantasyland/fantasy-land#concat-method
//. [`fantasy-land/contramap`]: v:fantasyland/fantasy-land#contramap-method
//. [`fantasy-land/empty`]:     v:fantasyland/fantasy-land#empty-method
//. [`fantasy-land/equals`]:    v:fantasyland/fantasy-land#equals-method
//. [`fantasy-land/extend`]:    v:fantasyland/fantasy-land#extend-method
//. [`fantasy-land/extract`]:   v:fantasyland/fantasy-land#extract-method
//. [`fantasy-land/filter`]:    v:fantasyland/fantasy-land#filter-method
//. [`fantasy-land/id`]:        v:fantasyland/fantasy-land#id-method
//. [`fantasy-land/invert`]:    v:fantasyland/fantasy-land#invert-method
//. [`fantasy-land/lte`]:       v:fantasyland/fantasy-land#lte-method
//. [`fantasy-land/map`]:       v:fantasyland/fantasy-land#map-method
//. [`fantasy-land/of`]:        v:fantasyland/fantasy-land#of-method
//. [`fantasy-land/promap`]:    v:fantasyland/fantasy-land#promap-method
//. [`fantasy-land/reduce`]:    v:fantasyland/fantasy-land#reduce-method
//. [`fantasy-land/traverse`]:  v:fantasyland/fantasy-land#traverse-method
//. [`fantasy-land/zero`]:      v:fantasyland/fantasy-land#zero-method
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes
});

var sanctuaryDef = createCommonjsModule(function (module) {
/*              ___                 ______
               /  /\               /  ___/\
        ______/  / / _______    __/  /___\/
       /  ___   / / /  ___  \  /_   __/\
      /  /\_/  / / /  /__/  /\ \/  /\_\/
     /  / //  / / /  ______/ / /  / /
    /  /_//  / / /  /______\/ /  / /
    \_______/ /  \_______/\  /__/ /
     \______\/    \______\/  \__*/

//. # sanctuary-def
//.
//. sanctuary-def is a run-time type system for JavaScript. It facilitates
//. the definition of curried JavaScript functions that are explicit about
//. the number of arguments to which they may be applied and the types of
//. those arguments.
//.
//. It is conventional to import the package as `$`:
//.
//. ```javascript
//. const $ = require ('sanctuary-def');
//. ```
//.
//. The next step is to define an environment. An environment is an array
//. of [types][]. [`env`][] is an environment containing all the built-in
//. JavaScript types. It may be used as the basis for environments that
//. include custom types in addition to the built-in types:
//.
//. ```javascript
//. //    Integer :: Type
//. const Integer = '...';
//.
//. //    NonZeroInteger :: Type
//. const NonZeroInteger = '...';
//.
//. //    env :: Array Type
//. const env = $.env.concat ([Integer, NonZeroInteger]);
//. ```
//.
//. Type constructors such as `List :: Type -> Type` cannot be included in
//. an environment as they're not of the correct type. One could, though,
//. use a type constructor to define a fixed number of concrete types:
//.
//. ```javascript
//. //    env :: Array Type
//. const env = $.env.concat ([
//.   List ($.Number),                // :: Type
//.   List ($.String),                // :: Type
//.   List (List ($.Number)),         // :: Type
//.   List (List ($.String)),         // :: Type
//.   List (List (List ($.Number))),  // :: Type
//.   List (List (List ($.String))),  // :: Type
//. ]);
//. ```
//.
//. Not only would this be tedious, but one could never enumerate all possible
//. types as there are infinitely many. Instead, one should use [`Unknown`][]:
//.
//. ```javascript
//. //    env :: Array Type
//. const env = $.env.concat ([List ($.Unknown)]);
//. ```
//.
//. The next step is to define a `def` function for the environment:
//.
//. ```javascript
//. const def = $.create ({checkTypes: true, env});
//. ```
//.
//. The `checkTypes` option determines whether type checking is enabled.
//. This allows one to only pay the performance cost of run-time type checking
//. during development. For example:
//.
//. ```javascript
//. const def = $.create ({
//.   checkTypes: process.env.NODE_ENV === 'development',
//.   env,
//. });
//. ```
//.
//. `def` is a function for defining functions. For example:
//.
//. ```javascript
//. //    add :: Number -> Number -> Number
//. const add =
//. def ('add')
//.     ({})
//.     ([$.Number, $.Number, $.Number])
//.     (x => y => x + y);
//. ```
//.
//. `[$.Number, $.Number, $.Number]` specifies that `add` takes two arguments
//. of type `Number`, one at a time, and returns a value of type `Number`.
//.
//. Applying `add` to two arguments, one at a time, gives the expected result:
//.
//. ```javascript
//. add (2) (2);
//. // => 4
//. ```
//.
//. Applying `add` to multiple arguments at once results in an exception being
//. thrown:
//.
//. ```javascript
//. add (2, 2, 2);
//. // ! TypeError: ‘add’ applied to the wrong number of arguments
//. //
//. //   add :: Number -> Number -> Number
//. //          ^^^^^^
//. //            1
//. //
//. //   Expected one argument but received three arguments:
//. //
//. //     - 2
//. //     - 2
//. //     - 2
//. ```
//.
//. Applying `add` to one argument produces a function awaiting the remaining
//. argument. This is known as partial application. Partial application allows
//. more specific functions to be defined in terms of more general ones:
//.
//. ```javascript
//. //    inc :: Number -> Number
//. const inc = add (1);
//.
//. inc (7);
//. // => 8
//. ```
//.
//. JavaScript's implicit type coercion often obfuscates the source of type
//. errors. Consider the following function:
//.
//. ```javascript
//. //    _add :: Number -> Number -> Number
//. const _add = x => y => x + y;
//. ```
//.
//. The type signature indicates that `_add` takes arguments of type `Number`,
//. but this is not enforced. This allows type errors to be silently ignored:
//.
//. ```javascript
//. _add ('2') ('2');
//. // => '22'
//. ```
//.
//. `add`, on the other hand, throws if applied to arguments of the wrong
//. types:
//.
//. ```javascript
//. add ('2') ('2');
//. // ! TypeError: Invalid value
//. //
//. //   add :: Number -> Number -> Number
//. //          ^^^^^^
//. //            1
//. //
//. //   1)  "2" :: String
//. //
//. //   The value at position 1 is not a member of ‘Number’.
//. ```
//.
//. Type checking is performed as arguments are provided (rather than once all
//. arguments have been provided), so type errors are reported early:
//.
//. ```javascript
//. add ('X');
//. // ! TypeError: Invalid value
//. //
//. //   add :: Number -> Number -> Number
//. //          ^^^^^^
//. //            1
//. //
//. //   1)  "X" :: String
//. //
//. //   The value at position 1 is not a member of ‘Number’.
//. ```

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (util,
                        sanctuaryEither,
                        sanctuaryShow,
                        sanctuaryTypeClasses$1,
                        sanctuaryTypeIdentifiers);
  }

} (function(util, Either, show, Z, type) {

  var MAX_SAFE_INTEGER = Math.pow (2, 53) - 1;
  var MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;

  var slice             = Array.prototype.slice;
  var hasOwnProperty    = Object.prototype.hasOwnProperty;
  var toString          = Object.prototype.toString;

  var inspect = typeof util.inspect.custom === 'symbol' ?
                util.inspect.custom :
                /* istanbul ignore next */ 'inspect';

  //  Left :: a -> Either a b
  var Left = Either.Left;

  //  Right :: b -> Either a b
  var Right = Either.Right;

  //  B :: (b -> c) -> (a -> b) -> a -> c
  function B(f) {
    return function(g) {
      return function(x) {
        return f (g (x));
      };
    };
  }

  //  I :: a -> a
  function I(x) { return x; }

  //  K :: a -> b -> a
  function K(x) { return function(y) { return x; }; }

  //  W :: (a -> a -> b) -> a -> b
  function W(f) { return function(x) { return f (x) (x); }; }

  //  always0 :: a -> () -> a
  function always0(x) { return function() { return x; }; }

  //  always2 :: a -> (b, c) -> a
  function always2(x) { return function(y, z) { return x; }; }

  //  complement :: (a -> Boolean) -> a -> Boolean
  function complement(pred) { return function(x) { return !(pred (x)); }; }

  //  filter :: Filterable f => (a -> Boolean) -> f a -> f a
  function filter(pred) {
    return function(xs) {
      return Z.filter (pred, xs);
    };
  }

  //  init :: Array a -> Array a
  function init(xs) { return xs.slice (0, -1); }

  //  isEmpty :: Foldable f => f a -> Boolean
  function isEmpty(xs) { return Z.size (xs) === 0; }

  //  isPrefix :: Array a -> Array a -> Boolean
  function isPrefix(candidate) {
    return function(xs) {
      if (candidate.length > xs.length) return false;
      for (var idx = 0; idx < candidate.length; idx += 1) {
        if (candidate[idx] !== xs[idx]) return false;
      }
      return true;
    };
  }

  //  joinWith :: (String, Array String) -> String
  function joinWith(separator, ss) {
    return ss.join (separator);
  }

  //  last :: Array a -> a
  function last(xs) { return xs[xs.length - 1]; }

  //  memberOf :: Array a -> a -> Boolean
  function memberOf(xs) {
    return function(y) {
      return xs.some (function(x) { return Z.equals (x, y); });
    };
  }

  //  or :: (Array a, Array a) -> Array a
  function or(xs, ys) { return isEmpty (xs) ? ys : xs; }

  //  prop :: String -> {} -> a
  function prop(field) { return function(record) { return record[field]; }; }

  //  sizeEq :: Foldable f => Integer -> f a -> Boolean
  function sizeEq(n) { return function(xs) { return Z.size (xs) === n; }; }

  //  strRepeat :: (String, Integer) -> String
  function strRepeat(s, times) {
    return joinWith (s, Array (times + 1));
  }

  //  r :: Char -> String -> String
  function r(c) {
    return function(s) {
      return strRepeat (c, s.length);
    };
  }

  //  _ :: String -> String
  var _ = r (' ');

  //  sortedKeys :: Object -> Array String
  function sortedKeys(o) {
    return (Object.keys (o)).sort ();
  }

  //  toArray :: Foldable f => f a -> Array a
  function toArray(foldable) {
    return Array.isArray (foldable) ?
           foldable :
           Z.reduce (function(xs, x) { xs.push (x); return xs; },
                     [],
                     foldable);
  }

  //  toMarkdownList :: (String, String, a -> String, Array a) -> String
  function toMarkdownList(empty, s, f, xs) {
    return isEmpty (xs) ?
      empty :
      Z.reduce (function(s, x) { return s + '  - ' + f (x) + '\n'; }, s, xs);
  }

  //  trimTrailingSpaces :: String -> String
  function trimTrailingSpaces(s) {
    return s.replace (/[ ]+$/gm, '');
  }

  //  when :: Boolean -> (a -> a) -> a -> a
  function when(bool) {
    return function(f) {
      return function(x) {
        return bool ? f (x) : x;
      };
    };
  }

  //  wrap :: String -> String -> String -> String
  function wrap(prefix) {
    return function(suffix) {
      return function(s) {
        return prefix + s + suffix;
      };
    };
  }

  //  parenthesize :: (String -> String) -> String -> String
  function parenthesize(f) { return wrap (f ('(')) (f (')')); }

  //  q :: String -> String
  var q = wrap ('\u2018') ('\u2019');

  //  stripNamespace :: TypeClass -> String
  function stripNamespace(typeClass) {
    return typeClass.name.slice (typeClass.name.indexOf ('/') + 1);
  }

  function _test(env) {
    return function(x) {
      return function recur(t) {
        return t.supertypes.every (recur) && t._test (env) (x);
      };
    };
  }

  var Type$prototype = {
    'constructor': {'@@type': 'sanctuary-def/Type@1'},
    'validate': function(env) {
      var test2 = _test (env);
      var type = this;
      return function(x) {
        if (!(test2 (x) (type))) return Left ({value: x, propPath: []});
        for (var idx = 0; idx < type.keys.length; idx += 1) {
          var k = type.keys[idx];
          var t = type.types[k];
          var ys = type.extractors[k] (x);
          for (var idx2 = 0; idx2 < ys.length; idx2 += 1) {
            var result = t.validate (env) (ys[idx2]);
            if (result.isLeft) {
              return Left ({value: result.value.value,
                            propPath: Z.concat ([k], result.value.propPath)});
            }
          }
        }
        return Right (x);
      };
    },
    'fantasy-land/equals': function(other) {
      return (
        Z.equals (this.type, other.type) &&
        Z.equals (this.name, other.name) &&
        Z.equals (this.url, other.url) &&
        Z.equals (this.supertypes, other.supertypes) &&
        Z.equals (this.keys, other.keys) &&
        Z.equals (this.types, other.types)
      );
    },
    '@@show': function() {
      return this.format (I, K (I));
    }
  };

  //  _Type :: ... -> Type
  function _Type(
    type,       // :: String
    name,       // :: String
    url,        // :: String
    arity,      // :: NonNegativeInteger
    format,
    // :: Nullable ((String -> String, String -> String -> String) -> String)
    supertypes, // :: Array Type
    test,       // :: Any -> Boolean
    tuples      // :: Array (Array3 String (a -> Array b) Type)
  ) {
    var t = Object.create (Type$prototype);
    t._test = test;
    t._extractors = tuples.reduce (function(_extractors, tuple) {
      _extractors[tuple[0]] = tuple[1];
      return _extractors;
    }, {});
    t.arity = arity;  // number of type parameters
    t.extractors = Z.map (B (toArray), t._extractors);
    t.format = format || function(outer, inner) {
      return Z.reduce (function(s, tuple) {
        return s +
               outer (' ') +
               when (tuple[2].arity > 0)
                    (parenthesize (outer))
                    (inner (tuple[0]) (show (tuple[2])));
      }, outer (name), tuples);
    };
    t.keys = tuples.map (function(tuple) { return tuple[0]; });
    t.name = name;
    t.supertypes = supertypes;
    t.type = type;
    t.types = tuples.reduce (function(types, tuple) {
      types[tuple[0]] = tuple[2];
      return types;
    }, {});
    t.url = url;
    return t;
  }

  var BINARY        = 'BINARY';
  var FUNCTION      = 'FUNCTION';
  var INCONSISTENT  = 'INCONSISTENT';
  var NO_ARGUMENTS  = 'NO_ARGUMENTS';
  var NULLARY       = 'NULLARY';
  var RECORD        = 'RECORD';
  var UNARY         = 'UNARY';
  var UNKNOWN       = 'UNKNOWN';
  var VARIABLE      = 'VARIABLE';

  //  Inconsistent :: Type
  var Inconsistent =
  _Type (INCONSISTENT, '', '', 0, always2 ('???'), [], K (K (false)), []);

  //  NoArguments :: Type
  var NoArguments =
  _Type (NO_ARGUMENTS, '', '', 0, always2 ('()'), [], K (K (true)), []);

  //  arityGte :: NonNegativeInteger -> Type -> Boolean
  function arityGte(n) {
    return function(t) {
      return t.arity >= n;
    };
  }

  //  typeEq :: String -> a -> Boolean
  function typeEq(name) {
    return function(x) {
      return type (x) === name;
    };
  }

  //  typeofEq :: String -> a -> Boolean
  function typeofEq(typeof_) {
    return function(x) {
      // eslint-disable-next-line valid-typeof
      return typeof x === typeof_;
    };
  }

  //  functionUrl :: String -> String
  function functionUrl(name) {
    var version = '0.20.0';  // updated programmatically
    return 'https://github.com/sanctuary-js/sanctuary-def/tree/v' + version +
           '#' + name;
  }

  var NullaryTypeWithUrl = Z.ap (NullaryType, functionUrl);
  var UnaryTypeWithUrl = Z.ap (UnaryType, functionUrl);
  var BinaryTypeWithUrl = Z.ap (BinaryType, functionUrl);

  //. ### Types
  //.
  //. Conceptually, a type is a set of values. One can think of a value of
  //. type `Type` as a function of type `Any -> Boolean` that tests values
  //. for membership in the set (though this is an oversimplification).

  //# Unknown :: Type
  //.
  //. Type used to represent missing type information. The type of `[]`,
  //. for example, is `Array ???`.
  //.
  //. May be used with type constructors when defining environments. Given a
  //. type constructor `List :: Type -> Type`, one could use `List ($.Unknown)`
  //. to include an infinite number of types in an environment:
  //.
  //.   - `List Number`
  //.   - `List String`
  //.   - `List (List Number)`
  //.   - `List (List String)`
  //.   - `List (List (List Number))`
  //.   - `List (List (List String))`
  //.   - `...`
  var Unknown =
  _Type (UNKNOWN, '', '', 0, always2 ('Unknown'), [], K (K (true)), []);

  //# Any :: Type
  //.
  //. Type comprising every JavaScript value.
  var Any = NullaryTypeWithUrl
    ('Any')
    ([])
    (K (true));

  //# AnyFunction :: Type
  //.
  //. Type comprising every Function value.
  var AnyFunction = NullaryTypeWithUrl
    ('Function')
    ([])
    (typeofEq ('function'));

  //# Arguments :: Type
  //.
  //. Type comprising every [`arguments`][arguments] object.
  var Arguments = NullaryTypeWithUrl
    ('Arguments')
    ([])
    (typeEq ('Arguments'));

  //# Array :: Type -> Type
  //.
  //. Constructor for homogeneous Array types.
  var Array_ = UnaryTypeWithUrl
    ('Array')
    ([])
    (typeEq ('Array'))
    (I);

  //# Array0 :: Type
  //.
  //. Type whose sole member is `[]`.
  var Array0 = NullaryTypeWithUrl
    ('Array0')
    ([Array_ (Unknown)])
    (sizeEq (0));

  //# Array1 :: Type -> Type
  //.
  //. Constructor for singleton Array types.
  var Array1 = UnaryTypeWithUrl
    ('Array1')
    ([Array_ (Unknown)])
    (sizeEq (1))
    (I);

  //# Array2 :: Type -> Type -> Type
  //.
  //. Constructor for heterogeneous Array types of length 2. `['foo', true]` is
  //. a member of `Array2 String Boolean`.
  var Array2 = BinaryTypeWithUrl
    ('Array2')
    ([Array_ (Unknown)])
    (sizeEq (2))
    (function(array2) { return [array2[0]]; })
    (function(array2) { return [array2[1]]; });

  //# Boolean :: Type
  //.
  //. Type comprising `true` and `false`.
  var Boolean_ = NullaryTypeWithUrl
    ('Boolean')
    ([])
    (typeofEq ('boolean'));

  //# Date :: Type
  //.
  //. Type comprising every Date value.
  var Date_ = NullaryTypeWithUrl
    ('Date')
    ([])
    (typeEq ('Date'));

  //# ValidDate :: Type
  //.
  //. Type comprising every [`Date`][] value except `new Date (NaN)`.
  var ValidDate = NullaryTypeWithUrl
    ('ValidDate')
    ([Date_])
    (B (complement (isNaN)) (Number));

  //# Descending :: Type -> Type
  //.
  //. [Descending][] type constructor.
  var Descending = UnaryTypeWithUrl
    ('Descending')
    ([])
    (typeEq ('sanctuary-descending/Descending@1'))
    (I);

  //# Either :: Type -> Type -> Type
  //.
  //. [Either][] type constructor.
  var Either_ = BinaryTypeWithUrl
    ('Either')
    ([])
    (typeEq ('sanctuary-either/Either@1'))
    (function(either) { return either.isLeft ? [either.value] : []; })
    (function(either) { return either.isLeft ? [] : [either.value]; });

  //# Error :: Type
  //.
  //. Type comprising every Error value, including values of more specific
  //. constructors such as [`SyntaxError`][] and [`TypeError`][].
  var Error_ = NullaryTypeWithUrl
    ('Error')
    ([])
    (typeEq ('Error'));

  //# Fn :: Type -> Type -> Type
  //.
  //. Binary type constructor for unary function types. `$.Fn (I) (O)`
  //. represents `I -> O`, the type of functions that take a value of
  //. type `I` and return a value of type `O`.
  function Fn($1) { return function($2) { return Function_ ([$1, $2]); }; }

  //# Function :: NonEmpty (Array Type) -> Type
  //.
  //. Constructor for Function types.
  //.
  //. Examples:
  //.
  //.   - `$.Function ([$.Date, $.String])` represents the `Date -> String`
  //.     type; and
  //.   - `$.Function ([a, b, a])` represents the `(a, b) -> a` type.
  function Function_(types) {
    var tuples = Z.reduce (function(tuples, t) {
      tuples.push (['$' + show (tuples.length + 1), K ([]), t]);
      return tuples;
    }, [], types);

    function format(outer, inner) {
      return when (tuples.length !== 2)
                  (parenthesize (outer))
                  (joinWith (outer (', '),
                             Z.map (function(tuple) {
                               return when (tuple[2].type === FUNCTION)
                                           (parenthesize (outer))
                                           (inner (tuple[0])
                                                  (show (tuple[2])));
                             }, init (tuples)))) +
             outer (' -> ') +
             inner ((last (tuples))[0])
                   (show ((last (tuples))[2]));
    }

    return _Type (FUNCTION,
                  '',
                  '',
                  types.length,
                  format,
                  [AnyFunction],
                  K (K (true)),
                  tuples);
  }

  //# HtmlElement :: Type
  //.
  //. Type comprising every [HTML element][].
  var HtmlElement = NullaryTypeWithUrl
    ('HtmlElement')
    ([])
    (function(x) {
       return /^\[object HTML.+Element\]$/.test (toString.call (x));
     });

  //# Identity :: Type -> Type
  //.
  //. [Identity][] type constructor.
  var Identity = UnaryTypeWithUrl
    ('Identity')
    ([])
    (typeEq ('sanctuary-identity/Identity@1'))
    (I);

  //# Maybe :: Type -> Type
  //.
  //. [Maybe][] type constructor.
  var Maybe = UnaryTypeWithUrl
    ('Maybe')
    ([])
    (typeEq ('sanctuary-maybe/Maybe@1'))
    (I);

  //# NonEmpty :: Type -> Type
  //.
  //. Constructor for non-empty types. `$.NonEmpty ($.String)`, for example, is
  //. the type comprising every [`String`][] value except `''`.
  //.
  //. The given type must satisfy the [Monoid][] and [Setoid][] specifications.
  var NonEmpty = UnaryTypeWithUrl
    ('NonEmpty')
    ([])
    (function(x) {
       return Z.Monoid.test (x) &&
              Z.Setoid.test (x) &&
              !(Z.equals (x, Z.empty (x.constructor)));
     })
    (function(monoid) { return [monoid]; });

  //# Null :: Type
  //.
  //. Type whose sole member is `null`.
  var Null = NullaryTypeWithUrl
    ('Null')
    ([])
    (typeEq ('Null'));

  //# Nullable :: Type -> Type
  //.
  //. Constructor for types that include `null` as a member.
  var Nullable = UnaryTypeWithUrl
    ('Nullable')
    ([])
    (K (true))
    (function(nullable) {
       // eslint-disable-next-line eqeqeq
       return nullable === null ? [] : [nullable];
     });

  //# Number :: Type
  //.
  //. Type comprising every primitive Number value (including `NaN`).
  var Number_ = NullaryTypeWithUrl
    ('Number')
    ([])
    (typeofEq ('number'));

  function nonZero(x) { return x !== 0; }
  function nonNegative(x) { return x >= 0; }
  function positive(x) { return x > 0; }
  function negative(x) { return x < 0; }

  //# PositiveNumber :: Type
  //.
  //. Type comprising every [`Number`][] value greater than zero.
  var PositiveNumber = NullaryTypeWithUrl
    ('PositiveNumber')
    ([Number_])
    (positive);

  //# NegativeNumber :: Type
  //.
  //. Type comprising every [`Number`][] value less than zero.
  var NegativeNumber = NullaryTypeWithUrl
    ('NegativeNumber')
    ([Number_])
    (negative);

  //# ValidNumber :: Type
  //.
  //. Type comprising every [`Number`][] value except `NaN`.
  var ValidNumber = NullaryTypeWithUrl
    ('ValidNumber')
    ([Number_])
    (complement (isNaN));

  //# NonZeroValidNumber :: Type
  //.
  //. Type comprising every [`ValidNumber`][] value except `0` and `-0`.
  var NonZeroValidNumber = NullaryTypeWithUrl
    ('NonZeroValidNumber')
    ([ValidNumber])
    (nonZero);

  //# FiniteNumber :: Type
  //.
  //. Type comprising every [`ValidNumber`][] value except `Infinity` and
  //. `-Infinity`.
  var FiniteNumber = NullaryTypeWithUrl
    ('FiniteNumber')
    ([ValidNumber])
    (isFinite);

  //# NonZeroFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value except `0` and `-0`.
  var NonZeroFiniteNumber = NullaryTypeWithUrl
    ('NonZeroFiniteNumber')
    ([FiniteNumber])
    (nonZero);

  //# PositiveFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value greater than zero.
  var PositiveFiniteNumber = NullaryTypeWithUrl
    ('PositiveFiniteNumber')
    ([FiniteNumber])
    (positive);

  //# NegativeFiniteNumber :: Type
  //.
  //. Type comprising every [`FiniteNumber`][] value less than zero.
  var NegativeFiniteNumber = NullaryTypeWithUrl
    ('NegativeFiniteNumber')
    ([FiniteNumber])
    (negative);

  //# Integer :: Type
  //.
  //. Type comprising every integer in the range
  //. [[`Number.MIN_SAFE_INTEGER`][min] .. [`Number.MAX_SAFE_INTEGER`][max]].
  var Integer = NullaryTypeWithUrl
    ('Integer')
    ([ValidNumber])
    (function(x) {
       return Math.floor (x) === x &&
              x >= MIN_SAFE_INTEGER &&
              x <= MAX_SAFE_INTEGER;
     });

  //# NonZeroInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value except `0` and `-0`.
  var NonZeroInteger = NullaryTypeWithUrl
    ('NonZeroInteger')
    ([Integer])
    (nonZero);

  //# NonNegativeInteger :: Type
  //.
  //. Type comprising every non-negative [`Integer`][] value (including `-0`).
  //. Also known as the set of natural numbers under ISO 80000-2:2009.
  var NonNegativeInteger = NullaryTypeWithUrl
    ('NonNegativeInteger')
    ([Integer])
    (nonNegative);

  //# PositiveInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value greater than zero.
  var PositiveInteger = NullaryTypeWithUrl
    ('PositiveInteger')
    ([Integer])
    (positive);

  //# NegativeInteger :: Type
  //.
  //. Type comprising every [`Integer`][] value less than zero.
  var NegativeInteger = NullaryTypeWithUrl
    ('NegativeInteger')
    ([Integer])
    (negative);

  //# Object :: Type
  //.
  //. Type comprising every "plain" Object value. Specifically, values
  //. created via:
  //.
  //.   - object literal syntax;
  //.   - [`Object.create`][]; or
  //.   - the `new` operator in conjunction with `Object` or a custom
  //.     constructor function.
  var Object_ = NullaryTypeWithUrl
    ('Object')
    ([])
    (typeEq ('Object'));

  //# Pair :: Type -> Type -> Type
  //.
  //. [Pair][] type constructor.
  var Pair = BinaryTypeWithUrl
    ('Pair')
    ([])
    (typeEq ('sanctuary-pair/Pair@1'))
    (function(pair) { return [pair.fst]; })
    (function(pair) { return [pair.snd]; });

  //# RegExp :: Type
  //.
  //. Type comprising every RegExp value.
  var RegExp_ = NullaryTypeWithUrl
    ('RegExp')
    ([])
    (typeEq ('RegExp'));

  //# GlobalRegExp :: Type
  //.
  //. Type comprising every [`RegExp`][] value whose `global` flag is `true`.
  //.
  //. See also [`NonGlobalRegExp`][].
  var GlobalRegExp = NullaryTypeWithUrl
    ('GlobalRegExp')
    ([RegExp_])
    (prop ('global'));

  //# NonGlobalRegExp :: Type
  //.
  //. Type comprising every [`RegExp`][] value whose `global` flag is `false`.
  //.
  //. See also [`GlobalRegExp`][].
  var NonGlobalRegExp = NullaryTypeWithUrl
    ('NonGlobalRegExp')
    ([RegExp_])
    (complement (prop ('global')));

  //# StrMap :: Type -> Type
  //.
  //. Constructor for homogeneous Object types.
  //.
  //. `{foo: 1, bar: 2, baz: 3}`, for example, is a member of `StrMap Number`;
  //. `{foo: 1, bar: 2, baz: 'XXX'}` is not.
  var StrMap = UnaryTypeWithUrl
    ('StrMap')
    ([Object_])
    (K (true))
    (I);

  //# String :: Type
  //.
  //. Type comprising every primitive String value.
  var String_ = NullaryTypeWithUrl
    ('String')
    ([])
    (typeofEq ('string'));

  //# RegexFlags :: Type
  //.
  //. Type comprising the canonical RegExp flags:
  //.
  //.   - `''`
  //.   - `'g'`
  //.   - `'i'`
  //.   - `'m'`
  //.   - `'gi'`
  //.   - `'gm'`
  //.   - `'im'`
  //.   - `'gim'`
  var RegexFlags = NullaryTypeWithUrl
    ('RegexFlags')
    ([String_])
    (function(s) { return /^g?i?m?$/.test (s); });

  //# Symbol :: Type
  //.
  //. Type comprising every Symbol value.
  var Symbol_ = NullaryTypeWithUrl
    ('Symbol')
    ([])
    (typeofEq ('symbol'));

  //# Type :: Type
  //.
  //. Type comprising every `Type` value.
  var Type = NullaryTypeWithUrl
    ('Type')
    ([])
    (typeEq ('sanctuary-def/Type@1'));

  //# TypeClass :: Type
  //.
  //. Type comprising every [`TypeClass`][] value.
  var TypeClass = NullaryTypeWithUrl
    ('TypeClass')
    ([])
    (typeEq ('sanctuary-type-classes/TypeClass@1'));

  //# Undefined :: Type
  //.
  //. Type whose sole member is `undefined`.
  var Undefined = NullaryTypeWithUrl
    ('Undefined')
    ([])
    (typeEq ('Undefined'));

  //# env :: Array Type
  //.
  //. An array of [types][]:
  //.
  //.   - <code>[AnyFunction](#AnyFunction)</code>
  //.   - <code>[Arguments](#Arguments)</code>
  //.   - <code>[Array](#Array) ([Unknown][])</code>
  //.   - <code>[Array2](#Array2) ([Unknown][]) ([Unknown][])</code>
  //.   - <code>[Boolean](#Boolean)</code>
  //.   - <code>[Date](#Date)</code>
  //.   - <code>[Descending](#Descending) ([Unknown][])</code>
  //.   - <code>[Either](#Either) ([Unknown][]) ([Unknown][])</code>
  //.   - <code>[Error](#Error)</code>
  //.   - <code>[Fn](#Fn) ([Unknown][]) ([Unknown][])</code>
  //.   - <code>[HtmlElement](#HtmlElement)</code>
  //.   - <code>[Identity](#Identity) ([Unknown][])</code>
  //.   - <code>[Maybe](#Maybe) ([Unknown][])</code>
  //.   - <code>[Null](#Null)</code>
  //.   - <code>[Number](#Number)</code>
  //.   - <code>[Object](#Object)</code>
  //.   - <code>[Pair](#Pair) ([Unknown][]) ([Unknown][])</code>
  //.   - <code>[RegExp](#RegExp)</code>
  //.   - <code>[StrMap](#StrMap) ([Unknown][])</code>
  //.   - <code>[String](#String)</code>
  //.   - <code>[Symbol](#Symbol)</code>
  //.   - <code>[Type](#Type)</code>
  //.   - <code>[TypeClass](#TypeClass)</code>
  //.   - <code>[Undefined](#Undefined)</code>
  var env = [
    AnyFunction,
    Arguments,
    Array_ (Unknown),
    Array2 (Unknown) (Unknown),
    Boolean_,
    Date_,
    Descending (Unknown),
    Either_ (Unknown) (Unknown),
    Error_,
    Fn (Unknown) (Unknown),
    HtmlElement,
    Identity (Unknown),
    Maybe (Unknown),
    Null,
    Number_,
    Object_,
    Pair (Unknown) (Unknown),
    RegExp_,
    StrMap (Unknown),
    String_,
    Symbol_,
    Type,
    TypeClass,
    Undefined
  ];

  //  Unchecked :: String -> Type
  function Unchecked(s) { return NullaryType (s) ('') ([]) (K (true)); }

  //  production :: Boolean
  var production =
    typeof process !== 'undefined' &&
    /* global process:false */
    process != null &&
    process.env != null &&
    process.env.NODE_ENV === 'production';

  //  numbers :: Array String
  var numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ];

  //  numArgs :: Integer -> String
  function numArgs(n) {
    return (n < numbers.length ? numbers[n] : show (n)) + ' ' +
           (n === 1 ? 'argument' : 'arguments');
  }

  //  expandUnknown
  //  :: Array Type
  //  -> Array Object
  //  -> Any
  //  -> (a -> Array b)
  //  -> Type
  //  -> Array Type
  function expandUnknown(env) {
    return function(seen) {
      return function(value) {
        return function(extractor) {
          return function(type) {
            return type.type === UNKNOWN ?
                   _determineActualTypes (env, seen, extractor (value)) :
                   [type];
          };
        };
      };
    };
  }

  //  _determineActualTypes :: ... -> Array Type
  function _determineActualTypes(
    env,            // :: Array Type
    seen,           // :: Array Object
    values          // :: Array Any
  ) {
    var expandUnknown4 = expandUnknown (env);

    function refine(types, value) {
      var seen$;
      if (typeof value === 'object' && value != null ||
          typeof value === 'function') {
        //  Abort if a circular reference is encountered; add the current
        //  object to the array of seen objects otherwise.
        if (seen.indexOf (value) >= 0) return [];
        seen$ = Z.concat (seen, [value]);
      } else {
        seen$ = seen;
      }
      var expandUnknown2 = expandUnknown4 (seen$) (value);
      return Z.chain (function(t) {
        return (
          (t.validate (env) (value)).isLeft ?
            [] :
          t.type === UNARY ?
            Z.map (fromUnaryType (t),
                   expandUnknown2 (t.extractors.$1) (t.types.$1)) :
          t.type === BINARY ?
            Z.lift2 (fromBinaryType (t),
                     expandUnknown2 (t.extractors.$1) (t.types.$1),
                     expandUnknown2 (t.extractors.$2) (t.types.$2)) :
          // else
            [t]
        );
      }, types);
    }

    return isEmpty (values) ?
      [Unknown] :
      or (Z.reduce (refine, env, values), [Inconsistent]);
  }

  //  isConsistent :: Type -> Boolean
  function isConsistent(t) {
    return t.type === UNARY   ? isConsistent (t.types.$1) :
           t.type === BINARY  ? isConsistent (t.types.$1) &&
                                isConsistent (t.types.$2) :
           /* else */           t.type !== INCONSISTENT;
  }

  //  determineActualTypesStrict :: (Array Type, Array Any) -> Array Type
  function determineActualTypesStrict(env, values) {
    return Z.filter (isConsistent,
                     _determineActualTypes (env, [], values));
  }

  //  determineActualTypesLoose :: (Array Type, Array Any) -> Array Type
  function determineActualTypesLoose(env, values) {
    return Z.reject (function(t) { return t.type === INCONSISTENT; },
                     _determineActualTypes (env, [], values));
  }

  //  TypeInfo = { name :: String
  //             , constraints :: StrMap (Array TypeClass)
  //             , types :: NonEmpty (Array Type) }
  //
  //  TypeVarMap = StrMap { types :: Array Type
  //                      , valuesByPath :: StrMap (Array Any) }
  //
  //  PropPath = Array (Number | String)

  //  updateTypeVarMap :: ... -> TypeVarMap
  function updateTypeVarMap(
    env,            // :: Array Type
    typeVarMap,     // :: TypeVarMap
    typeVar,        // :: Type
    index,          // :: Integer
    propPath,       // :: PropPath
    values          // :: Array Any
  ) {
    var $typeVarMap = {};
    for (var typeVarName in typeVarMap) {
      var entry = typeVarMap[typeVarName];
      var $entry = {types: entry.types.slice (), valuesByPath: {}};
      for (var k in entry.valuesByPath) {
        $entry.valuesByPath[k] = entry.valuesByPath[k].slice ();
      }
      $typeVarMap[typeVarName] = $entry;
    }
    if (!(hasOwnProperty.call ($typeVarMap, typeVar.name))) {
      $typeVarMap[typeVar.name] = {
        types: Z.filter (arityGte (typeVar.arity), env),
        valuesByPath: {}
      };
    }

    var key = JSON.stringify (Z.concat ([index], propPath));
    if (!(hasOwnProperty.call ($typeVarMap[typeVar.name].valuesByPath, key))) {
      $typeVarMap[typeVar.name].valuesByPath[key] = [];
    }

    var isValid = test (env);

    var expandUnknownStrict = B (B (B (filter (isConsistent))))
                                (expandUnknown (env) ([]));

    values.forEach (function(value) {
      var expandUnknownStrict2 = expandUnknownStrict (value);
      $typeVarMap[typeVar.name].valuesByPath[key].push (value);
      $typeVarMap[typeVar.name].types = Z.chain (function(t) {
        return (
          !(isValid (t) (value)) ?
            [] :
          typeVar.arity === 0 && t.type === UNARY ?
            Z.map (fromUnaryType (t),
                   expandUnknownStrict2 (t.extractors.$1) (t.types.$1)) :
          typeVar.arity === 0 && t.type === BINARY ?
            Z.lift2 (fromBinaryType (t),
                     expandUnknownStrict2 (t.extractors.$1) (t.types.$1),
                     expandUnknownStrict2 (t.extractors.$2) (t.types.$2)) :
          // else
            [t]
        );
      }, $typeVarMap[typeVar.name].types);
    });

    return $typeVarMap;
  }

  //  underlineTypeVars :: (TypeInfo, StrMap (Array Any)) -> String
  function underlineTypeVars(typeInfo, valuesByPath) {
    //  Note: Sorting these keys lexicographically is not "correct", but it
    //  does the right thing for indexes less than 10.
    var paths = Z.map (JSON.parse, sortedKeys (valuesByPath));
    return underline (
      typeInfo,
      K (K (_)),
      function(index) {
        return function(f) {
          return function(t) {
            return function(propPath) {
              var indexedPropPath = Z.concat ([index], propPath);
              return function(s) {
                if (paths.some (isPrefix (indexedPropPath))) {
                  var key = JSON.stringify (indexedPropPath);
                  if (!(hasOwnProperty.call (valuesByPath, key))) return s;
                  if (!(isEmpty (valuesByPath[key]))) return f (s);
                }
                return _ (s);
              };
            };
          };
        };
      }
    );
  }

  //  satisfactoryTypes :: ... -> Either (() -> Error)
  //                                     { typeVarMap :: TypeVarMap
  //                                     , types :: Array Type }
  function satisfactoryTypes(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    typeVarMap,     // :: TypeVarMap
    expType,        // :: Type
    index,          // :: Integer
    propPath,       // :: PropPath
    values          // :: Array Any
  ) {
    var recur = satisfactoryTypes;

    for (var idx = 0; idx < values.length; idx += 1) {
      var result = expType.validate (env) (values[idx]);
      if (result.isLeft) {
        return Left (function() {
          return invalidValue (env,
                               typeInfo,
                               index,
                               Z.concat (propPath, result.value.propPath),
                               result.value.value);
        });
      }
    }

    switch (expType.type) {

      case VARIABLE:
        var typeVarName = expType.name;
        var constraints = typeInfo.constraints;
        if (hasOwnProperty.call (constraints, typeVarName)) {
          var typeClasses = constraints[typeVarName];
          for (idx = 0; idx < values.length; idx += 1) {
            for (var idx2 = 0; idx2 < typeClasses.length; idx2 += 1) {
              if (!(typeClasses[idx2].test (values[idx]))) {
                return Left (function() {
                  return typeClassConstraintViolation (
                    env,
                    typeInfo,
                    typeClasses[idx2],
                    index,
                    propPath,
                    values[idx]);
                });
              }
            }
          }
        }

        var typeVarMap$ = updateTypeVarMap (env,
                                            typeVarMap,
                                            expType,
                                            index,
                                            propPath,
                                            values);

        var okTypes = typeVarMap$[typeVarName].types;
        return isEmpty (okTypes) ?
          Left (function() {
            return typeVarConstraintViolation (
              env,
              typeInfo,
              index,
              propPath,
              typeVarMap$[typeVarName].valuesByPath
            );
          }) :
          Z.reduce (function(e, t) {
            return Z.chain (function(r) {
              //  The `a` in `Functor f => f a` corresponds to the `a`
              //  in `Maybe a` but to the `b` in `Either a b`. A type
              //  variable's $1 will correspond to either $1 or $2 of
              //  the actual type depending on the actual type's arity.
              var offset = t.arity - expType.arity;
              return expType.keys.reduce (function(e, k, idx) {
                var extractor = t.extractors[t.keys[offset + idx]];
                return Z.reduce (function(e, x) {
                  return Z.chain (function(r) {
                    return recur (env,
                                  typeInfo,
                                  r.typeVarMap,
                                  expType.types[k],
                                  index,
                                  Z.concat (propPath, [k]),
                                  [x]);
                  }, e);
                }, e, Z.chain (extractor, values));
              }, Right (r));
            }, e);
          }, Right ({typeVarMap: typeVarMap$, types: okTypes}), okTypes);

      case UNARY:
        return Z.map (
          function(result) {
            return {
              typeVarMap: result.typeVarMap,
              types: Z.map (fromUnaryType (expType),
                            or (result.types, [expType.types.$1]))
            };
          },
          recur (env,
                 typeInfo,
                 typeVarMap,
                 expType.types.$1,
                 index,
                 Z.concat (propPath, ['$1']),
                 Z.chain (expType.extractors.$1, values))
        );

      case BINARY:
        return Z.chain (
          function(result) {
            var $1s = result.types;
            return Z.map (
              function(result) {
                var $2s = result.types;
                return {
                  typeVarMap: result.typeVarMap,
                  types: Z.lift2 (fromBinaryType (expType),
                                  or ($1s, [expType.types.$1]),
                                  or ($2s, [expType.types.$2]))
                };
              },
              recur (env,
                     typeInfo,
                     result.typeVarMap,
                     expType.types.$2,
                     index,
                     Z.concat (propPath, ['$2']),
                     Z.chain (expType.extractors.$2, values))
            );
          },
          recur (env,
                 typeInfo,
                 typeVarMap,
                 expType.types.$1,
                 index,
                 Z.concat (propPath, ['$1']),
                 Z.chain (expType.extractors.$1, values))
        );

      case RECORD:
        return Z.reduce (function(e, k) {
          return Z.chain (function(r) {
            return recur (env,
                          typeInfo,
                          r.typeVarMap,
                          expType.types[k],
                          index,
                          Z.concat (propPath, [k]),
                          Z.chain (expType.extractors[k], values));
          }, e);
        }, Right ({typeVarMap: typeVarMap, types: [expType]}), expType.keys);

      default:
        return Right ({typeVarMap: typeVarMap, types: [expType]});
    }
  }

  //# test :: Array Type -> Type -> a -> Boolean
  //.
  //. Takes an environment, a type, and any value. Returns `true` if the value
  //. is a member of the type; `false` otherwise.
  //.
  //. The environment is only significant if the type contains
  //. [type variables][].
  function test(env) {
    return function(t) {
      return function(x) {
        var typeInfo = {name: 'name', constraints: {}, types: [t]};
        return (satisfactoryTypes (env, typeInfo, {}, t, 0, [], [x])).isRight;
      };
    };
  }

  //. ### Type constructors
  //.
  //. sanctuary-def provides several functions for defining types.

  //# NullaryType :: String -> String -> Array Type -> (Any -> Boolean) -> Type
  //.
  //. Type constructor for types with no type variables (such as [`Number`][]).
  //.
  //. To define a nullary type `t` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - an array of supertypes (exposed as `t.supertypes`); and
  //.
  //.   - a predicate that accepts any value that is a member of every one of
  //.     the given supertypes, and returns `true` if (and only if) the value
  //.     is a member of `t`.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Integer :: Type
  //. const Integer = $.NullaryType
  //.   ('Integer')
  //.   ('http://example.com/my-package#Integer')
  //.   ([])
  //.   (x => typeof x === 'number' &&
  //.         Math.floor (x) === x &&
  //.         x >= Number.MIN_SAFE_INTEGER &&
  //.         x <= Number.MAX_SAFE_INTEGER);
  //.
  //. //    NonZeroInteger :: Type
  //. const NonZeroInteger = $.NullaryType
  //.   ('NonZeroInteger')
  //.   ('http://example.com/my-package#NonZeroInteger')
  //.   ([Integer])
  //.   (x => x !== 0);
  //.
  //. //    rem :: Integer -> NonZeroInteger -> Integer
  //. const rem =
  //. def ('rem')
  //.     ({})
  //.     ([Integer, NonZeroInteger, Integer])
  //.     (x => y => x % y);
  //.
  //. rem (42) (5);
  //. // => 2
  //.
  //. rem (0.5);
  //. // ! TypeError: Invalid value
  //. //
  //. //   rem :: Integer -> NonZeroInteger -> Integer
  //. //          ^^^^^^^
  //. //             1
  //. //
  //. //   1)  0.5 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘Integer’.
  //. //
  //. //   See http://example.com/my-package#Integer for information about the Integer type.
  //.
  //. rem (42) (0);
  //. // ! TypeError: Invalid value
  //. //
  //. //   rem :: Integer -> NonZeroInteger -> Integer
  //. //                     ^^^^^^^^^^^^^^
  //. //                           1
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘NonZeroInteger’.
  //. //
  //. //   See http://example.com/my-package#NonZeroInteger for information about the NonZeroInteger type.
  //. ```
  function NullaryType(name) {
    return function(url) {
      return function(supertypes) {
        return function(test) {
          return _Type (NULLARY, name, url, 0, null, supertypes, K (test), []);
        };
      };
    };
  }

  //# UnaryType :: Foldable f => String -> String -> Array Type -> (Any -> Boolean) -> (t a -> f a) -> Type -> Type
  //.
  //. Type constructor for types with one type variable (such as [`Array`][]).
  //.
  //. To define a unary type `t a` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - an array of supertypes (exposed as `t.supertypes`);
  //.
  //.   - a predicate that accepts any value that is a member of every one of
  //.     the given supertypes, and returns `true` if (and only if) the value
  //.     is a member of `t x` for some type `x`;
  //.
  //.   - a function that takes any value of type `t a` and returns the values
  //.     of type `a` contained in the `t`; and
  //.
  //.   - the type of `a`.
  //.
  //. For example:
  //.
  //. ```javascript
  //. const show = require ('sanctuary-show');
  //. const type = require ('sanctuary-type-identifiers');
  //.
  //. //    MaybeTypeRep :: TypeRep Maybe
  //. const MaybeTypeRep = {'@@type': 'my-package/Maybe'};
  //.
  //. //    Maybe :: Type -> Type
  //. const Maybe = $.UnaryType
  //.   ('Maybe')
  //.   ('http://example.com/my-package#Maybe')
  //.   ([])
  //.   (x => type (x) === MaybeTypeRep['@@type'])
  //.   (maybe => maybe.isJust ? [maybe.value] : []);
  //.
  //. //    Nothing :: Maybe a
  //. const Nothing = {
  //.   'constructor': MaybeTypeRep,
  //.   'isJust': false,
  //.   'isNothing': true,
  //.   '@@show': () => 'Nothing',
  //. };
  //.
  //. //    Just :: a -> Maybe a
  //. const Just = x => ({
  //.   'constructor': MaybeTypeRep,
  //.   'isJust': true,
  //.   'isNothing': false,
  //.   '@@show': () => `Just (${show (x)})`,
  //.   'value': x,
  //. });
  //.
  //. //    fromMaybe :: a -> Maybe a -> a
  //. const fromMaybe =
  //. def ('fromMaybe')
  //.     ({})
  //.     ([a, Maybe (a), a])
  //.     (x => m => m.isJust ? m.value : x);
  //.
  //. fromMaybe (0) (Just (42));
  //. // => 42
  //.
  //. fromMaybe (0) (Nothing);
  //. // => 0
  //.
  //. fromMaybe (0) (Just ('XXX'));
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   fromMaybe :: a -> Maybe a -> a
  //. //                ^          ^
  //. //                1          2
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   2)  "XXX" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  function UnaryType(name) {
    return function(url) {
      return function(supertypes) {
        return function(test) {
          return function(_1) {
            return function($1) {
              return _Type (UNARY,
                            name,
                            url,
                            1,
                            null,
                            supertypes,
                            K (test),
                            [['$1', _1, $1]]);
            };
          };
        };
      };
    };
  }

  //  fromUnaryType :: Type -> Type -> Type
  function fromUnaryType(t) {
    return UnaryType (t.name)
                     (t.url)
                     (t.supertypes)
                     (t._test ([]))
                     (t._extractors.$1);
  }

  //# BinaryType :: Foldable f => String -> String -> Array Type -> (Any -> Boolean) -> (t a b -> f a) -> (t a b -> f b) -> Type -> Type -> Type
  //.
  //. Type constructor for types with two type variables (such as
  //. [`Array2`][]).
  //.
  //. To define a binary type `t a b` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - an array of supertypes (exposed as `t.supertypes`);
  //.
  //.   - a predicate that accepts any value that is a member of every one of
  //.     the given supertypes, and returns `true` if (and only if) the value
  //.     is a member of `t x y` for some types `x` and `y`;
  //.
  //.   - a function that takes any value of type `t a b` and returns the
  //.     values of type `a` contained in the `t`;
  //.
  //.   - a function that takes any value of type `t a b` and returns the
  //.     values of type `b` contained in the `t`;
  //.
  //.   - the type of `a`; and
  //.
  //.   - the type of `b`.
  //.
  //. For example:
  //.
  //. ```javascript
  //. const type = require ('sanctuary-type-identifiers');
  //.
  //. //    PairTypeRep :: TypeRep Pair
  //. const PairTypeRep = {'@@type': 'my-package/Pair'};
  //.
  //. //    $Pair :: Type -> Type -> Type
  //. const $Pair = $.BinaryType
  //.   ('Pair')
  //.   ('http://example.com/my-package#Pair')
  //.   ([])
  //.   (x => type (x) === PairTypeRep['@@type'])
  //.   (({fst}) => [fst])
  //.   (({snd}) => [snd]);
  //.
  //. //    Pair :: a -> b -> Pair a b
  //. const Pair =
  //. def ('Pair')
  //.     ({})
  //.     ([a, b, $Pair (a) (b)])
  //.     (fst => snd => ({
  //.        'constructor': PairTypeRep,
  //.        'fst': fst,
  //.        'snd': snd,
  //.        '@@show': () => `Pair (${show (fst)}) (${show (snd)})`,
  //.      }));
  //.
  //. //    Rank :: Type
  //. const Rank = $.NullaryType
  //.   ('Rank')
  //.   ('http://example.com/my-package#Rank')
  //.   ([$.String])
  //.   (x => /^(A|2|3|4|5|6|7|8|9|10|J|Q|K)$/.test (x));
  //.
  //. //    Suit :: Type
  //. const Suit = $.NullaryType
  //.   ('Suit')
  //.   ('http://example.com/my-package#Suit')
  //.   ([$.String])
  //.   (x => /^[\u2660\u2663\u2665\u2666]$/.test (x));
  //.
  //. //    Card :: Type
  //. const Card = $Pair (Rank) (Suit);
  //.
  //. //    showCard :: Card -> String
  //. const showCard =
  //. def ('showCard')
  //.     ({})
  //.     ([Card, $.String])
  //.     (card => card.fst + card.snd);
  //.
  //. showCard (Pair ('A') ('♠'));
  //. // => 'A♠'
  //.
  //. showCard (Pair ('X') ('♠'));
  //. // ! TypeError: Invalid value
  //. //
  //. //   showCard :: Pair Rank Suit -> String
  //. //                    ^^^^
  //. //                     1
  //. //
  //. //   1)  "X" :: String
  //. //
  //. //   The value at position 1 is not a member of ‘Rank’.
  //. //
  //. //   See http://example.com/my-package#Rank for information about the Rank type.
  //. ```
  function BinaryType(name) {
    return function(url) {
      return function(supertypes) {
        return function(test) {
          return function(_1) {
            return function(_2) {
              return function($1) {
                return function($2) {
                  return _Type (BINARY,
                                name,
                                url,
                                2,
                                null,
                                supertypes,
                                K (test),
                                [['$1', _1, $1],
                                 ['$2', _2, $2]]);
                };
              };
            };
          };
        };
      };
    };
  }

  //  fromBinaryType :: (Type -> Type -> Type) -> Type -> Type -> Type
  function fromBinaryType(t) {
    return BinaryType (t.name)
                      (t.url)
                      (t.supertypes)
                      (t._test ([]))
                      (t._extractors.$1)
                      (t._extractors.$2);
  }

  //# EnumType :: String -> String -> Array Any -> Type
  //.
  //. Type constructor for [enumerated types][] (such as [`RegexFlags`][]).
  //.
  //. To define an enumerated type `t` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`); and
  //.
  //.   - an array of distinct values.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Denomination :: Type
  //. const Denomination = $.EnumType
  //.   ('Denomination')
  //.   ('http://example.com/my-package#Denomination')
  //.   ([10, 20, 50, 100, 200]);
  //. ```
  function EnumType(name) {
    return function(url) {
      return B (NullaryType (name) (url) ([])) (memberOf);
    };
  }

  //# RecordType :: StrMap Type -> Type
  //.
  //. `RecordType` is used to construct anonymous record types. The type
  //. definition specifies the name and type of each required field. A field is
  //. an enumerable property (either an own property or an inherited property).
  //.
  //. To define an anonymous record type one must provide:
  //.
  //.   - an object mapping field name to type.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Point :: Type
  //. const Point = $.RecordType ({x: $.FiniteNumber, y: $.FiniteNumber});
  //.
  //. //    dist :: Point -> Point -> FiniteNumber
  //. const dist =
  //. def ('dist')
  //.     ({})
  //.     ([Point, Point, $.FiniteNumber])
  //.     (p => q => Math.sqrt (Math.pow (p.x - q.x, 2) +
  //.                           Math.pow (p.y - q.y, 2)));
  //.
  //. dist ({x: 0, y: 0}) ({x: 3, y: 4});
  //. // => 5
  //.
  //. dist ({x: 0, y: 0}) ({x: 3, y: 4, color: 'red'});
  //. // => 5
  //.
  //. dist ({x: 0, y: 0}) ({x: NaN, y: NaN});
  //. // ! TypeError: Invalid value
  //. //
  //. //   dist :: { x :: FiniteNumber, y :: FiniteNumber } -> { x :: FiniteNumber, y :: FiniteNumber } -> FiniteNumber
  //. //                                                              ^^^^^^^^^^^^
  //. //                                                                   1
  //. //
  //. //   1)  NaN :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘FiniteNumber’.
  //.
  //. dist (0);
  //. // ! TypeError: Invalid value
  //. //
  //. //   dist :: { x :: FiniteNumber, y :: FiniteNumber } -> { x :: FiniteNumber, y :: FiniteNumber } -> FiniteNumber
  //. //           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //. //                              1
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   The value at position 1 is not a member of ‘{ x :: FiniteNumber, y :: FiniteNumber }’.
  //. ```
  function RecordType(fields) {
    var keys = sortedKeys (fields);

    function format(outer, inner) {
      if (isEmpty (keys)) return outer ('{}');
      var reprs = Z.map (function(k) {
        var t = fields[k];
        return outer (' ') +
               outer (/^(?!\d)[$\w]+$/.test (k) ? k : show (k)) +
               outer (' :: ') +
               inner (k) (show (t));
      }, keys);
      return wrap (outer ('{')) (outer (' }')) (joinWith (outer (','), reprs));
    }

    function test(env) {
      return function(x) {
        if (x == null) return false;
        var missing = {};
        keys.forEach (function(k) { missing[k] = k; });
        for (var k in x) delete missing[k];
        return isEmpty (missing);
      };
    }

    var tuples = keys.map (function(k) {
      return [k, function(x) { return [x[k]]; }, fields[k]];
    });

    return _Type (RECORD, '', '', 0, format, [], test, tuples);
  }

  //# NamedRecordType :: NonEmpty String -> String -> Array Type -> StrMap Type -> Type
  //.
  //. `NamedRecordType` is used to construct named record types. The type
  //. definition specifies the name and type of each required field. A field is
  //. an enumerable property (either an own property or an inherited property).
  //.
  //. To define a named record type `t` one must provide:
  //.
  //.   - the name of `t` (exposed as `t.name`);
  //.
  //.   - the documentation URL of `t` (exposed as `t.url`);
  //.
  //.   - an array of supertypes (exposed as `t.supertypes`); and
  //.
  //.   - an object mapping field name to type.
  //.
  //. For example:
  //.
  //. ```javascript
  //. //    Circle :: Type
  //. const Circle = $.NamedRecordType
  //.   ('my-package/Circle')
  //.   ('http://example.com/my-package#Circle')
  //.   ([])
  //.   ({radius: $.PositiveFiniteNumber});
  //.
  //. //    Cylinder :: Type
  //. const Cylinder = $.NamedRecordType
  //.   ('Cylinder')
  //.   ('http://example.com/my-package#Cylinder')
  //.   ([Circle])
  //.   ({height: $.PositiveFiniteNumber});
  //.
  //. //    volume :: Cylinder -> PositiveFiniteNumber
  //. const volume =
  //. def ('volume')
  //.     ({})
  //.     ([Cylinder, $.FiniteNumber])
  //.     (cyl => Math.PI * cyl.radius * cyl.radius * cyl.height);
  //.
  //. volume ({radius: 2, height: 10});
  //. // => 125.66370614359172
  //.
  //. volume ({radius: 2});
  //. // ! TypeError: Invalid value
  //. //
  //. //   volume :: Cylinder -> FiniteNumber
  //. //             ^^^^^^^^
  //. //                1
  //. //
  //. //   1)  {"radius": 2} :: Object, StrMap Number
  //. //
  //. //   The value at position 1 is not a member of ‘Cylinder’.
  //. //
  //. //   See http://example.com/my-package#Cylinder for information about the Cylinder type.
  //. ```
  function NamedRecordType(name) {
    return function(url) {
      return function(supertypes) {
        return function(fields) {
          var keys = sortedKeys (fields);

          function format(outer, inner) {
            return outer (name);
          }

          function test(env) {
            var test2 = _test (env);
            return function(x) {
              if (x == null) return false;
              var missing = {};
              keys.forEach (function(k) { missing[k] = k; });
              for (var k in x) delete missing[k];
              return isEmpty (missing) &&
                     keys.every (function(k) {
                       return test2 (x[k]) (fields[k]);
                     });
            };
          }

          var tuples = keys.map (function(k) {
            return [k, function(x) { return [x[k]]; }, fields[k]];
          });

          return _Type (RECORD,
                        name,
                        url,
                        0,
                        format,
                        supertypes,
                        test,
                        tuples);
        };
      };
    };
  }

  //  typeVarPred :: NonNegativeInteger -> Array Type -> Any -> Boolean
  function typeVarPred(arity) {
    var filter = arityGte (arity);
    return function(env) {
      var test2 = _test (env);
      return function(x) {
        var test1 = test2 (x);
        return env.some (function(t) { return filter (t) && test1 (t); });
      };
    };
  }

  //# TypeVariable :: String -> Type
  //.
  //. Polymorphism is powerful. Not being able to define a function for
  //. all types would be very limiting indeed: one couldn't even define the
  //. identity function!
  //.
  //. Before defining a polymorphic function one must define one or more type
  //. variables:
  //.
  //. ```javascript
  //. const a = $.TypeVariable ('a');
  //. const b = $.TypeVariable ('b');
  //.
  //. //    id :: a -> a
  //. const id = def ('id') ({}) ([a, a]) (x => x);
  //.
  //. id (42);
  //. // => 42
  //.
  //. id (null);
  //. // => null
  //. ```
  //.
  //. The same type variable may be used in multiple positions, creating a
  //. constraint:
  //.
  //. ```javascript
  //. //    cmp :: a -> a -> Number
  //. const cmp =
  //. def ('cmp')
  //.     ({})
  //.     ([a, a, $.Number])
  //.     (x => y => x < y ? -1 : x > y ? 1 : 0);
  //.
  //. cmp (42) (42);
  //. // => 0
  //.
  //. cmp ('a') ('z');
  //. // => -1
  //.
  //. cmp ('z') ('a');
  //. // => 1
  //.
  //. cmp (0) ('1');
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   cmp :: a -> a -> Number
  //. //          ^    ^
  //. //          1    2
  //. //
  //. //   1)  0 :: Number
  //. //
  //. //   2)  "1" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  function TypeVariable(name) {
    var tuples = [];
    var test = typeVarPred (tuples.length);
    return _Type (VARIABLE, name, '', 0, always2 (name), [], test, tuples);
  }

  //# UnaryTypeVariable :: String -> Type -> Type
  //.
  //. Combines [`UnaryType`][] and [`TypeVariable`][].
  //.
  //. To define a unary type variable `t a` one must provide:
  //.
  //.   - a name (conventionally matching `^[a-z]$`); and
  //.
  //.   - the type of `a`.
  //.
  //. Consider the type of a generalized `map`:
  //.
  //. ```haskell
  //. map :: Functor f => (a -> b) -> f a -> f b
  //. ```
  //.
  //. `f` is a unary type variable. With two (nullary) type variables, one
  //. unary type variable, and one [type class][] it's possible to define a
  //. fully polymorphic `map` function:
  //.
  //. ```javascript
  //. const $ = require ('sanctuary-def');
  //. const Z = require ('sanctuary-type-classes');
  //.
  //. const a = $.TypeVariable ('a');
  //. const b = $.TypeVariable ('b');
  //. const f = $.UnaryTypeVariable ('f');
  //.
  //. //    map :: Functor f => (a -> b) -> f a -> f b
  //. const map =
  //. def ('map')
  //.     ({f: [Z.Functor]})
  //.     ([$.Function ([a, b]), f (a), f (b)])
  //.     (f => functor => Z.map (f, functor));
  //. ```
  //.
  //. Whereas a regular type variable is fully resolved (`a` might become
  //. `Array (Array String)`, for example), a unary type variable defers to
  //. its type argument, which may itself be a type variable. The type argument
  //. corresponds to the type argument of a unary type or the *second* type
  //. argument of a binary type. The second type argument of `Map k v`, for
  //. example, is `v`. One could replace `Functor => f` with `Map k` or with
  //. `Map Integer`, but not with `Map`.
  //.
  //. This shallow inspection makes it possible to constrain a value's "outer"
  //. and "inner" types independently.
  function UnaryTypeVariable(name) {
    return function($1) {
      var tuples = [['$1', K ([]), $1]];
      var test = typeVarPred (tuples.length);
      return _Type (VARIABLE, name, '', 1, null, [], test, tuples);
    };
  }

  //# BinaryTypeVariable :: String -> Type -> Type -> Type
  //.
  //. Combines [`BinaryType`][] and [`TypeVariable`][].
  //.
  //. To define a binary type variable `t a b` one must provide:
  //.
  //.   - a name (conventionally matching `^[a-z]$`);
  //.
  //.   - the type of `a`; and
  //.
  //.   - the type of `b`.
  //.
  //. The more detailed explanation of [`UnaryTypeVariable`][] also applies to
  //. `BinaryTypeVariable`.
  function BinaryTypeVariable(name) {
    return function($1) {
      return function($2) {
        var tuples = [['$1', K ([]), $1],
                      ['$2', K ([]), $2]];
        var test = typeVarPred (tuples.length);
        return _Type (VARIABLE, name, '', 2, null, [], test, tuples);
      };
    };
  }

  //# Thunk :: Type -> Type
  //.
  //. `$.Thunk (T)` is shorthand for `$.Function ([T])`, the type comprising
  //. every nullary function (thunk) that returns a value of type `T`.
  function Thunk(t) { return Function_ ([t]); }

  //# Predicate :: Type -> Type
  //.
  //. `$.Predicate (T)` is shorthand for `$.Fn (T) ($.Boolean)`, the type
  //. comprising every predicate function that takes a value of type `T`.
  function Predicate(t) { return Fn (t) (Boolean_); }

  //. ### Type classes
  //.
  //. One can trivially define a function of type `String -> String -> String`
  //. that concatenates two strings. This is overly restrictive, though, since
  //. other types support concatenation (`Array a`, for example).
  //.
  //. One could use a type variable to define a polymorphic "concat" function:
  //.
  //. ```javascript
  //. //    _concat :: a -> a -> a
  //. const _concat =
  //. def ('_concat')
  //.     ({})
  //.     ([a, a, a])
  //.     (x => y => x.concat (y));
  //.
  //. _concat ('fizz') ('buzz');
  //. // => 'fizzbuzz'
  //.
  //. _concat ([1, 2]) ([3, 4]);
  //. // => [1, 2, 3, 4]
  //.
  //. _concat ([1, 2]) ('buzz');
  //. // ! TypeError: Type-variable constraint violation
  //. //
  //. //   _concat :: a -> a -> a
  //. //              ^    ^
  //. //              1    2
  //. //
  //. //   1)  [1, 2] :: Array Number
  //. //
  //. //   2)  "buzz" :: String
  //. //
  //. //   Since there is no type of which all the above values are members, the type-variable constraint has been violated.
  //. ```
  //.
  //. The type of `_concat` is misleading: it suggests that it can operate on
  //. any two values of *any* one type. In fact there's an implicit constraint,
  //. since the type must support concatenation (in [mathematical][semigroup]
  //. terms, the type must have a [semigroup][FL:Semigroup]). Violating this
  //. implicit constraint results in a run-time error in the implementation:
  //.
  //. ```javascript
  //. _concat (null) (null);
  //. // ! TypeError: Cannot read property 'concat' of null
  //. ```
  //.
  //. The solution is to constrain `a` by first defining a [`TypeClass`][]
  //. value, then specifying the constraint in the definition of the "concat"
  //. function:
  //.
  //. ```javascript
  //. const Z = require ('sanctuary-type-classes');
  //.
  //. //    Semigroup :: TypeClass
  //. const Semigroup = Z.TypeClass (
  //.   'my-package/Semigroup',
  //.   'http://example.com/my-package#Semigroup',
  //.   [],
  //.   x => x != null && typeof x.concat === 'function'
  //. );
  //.
  //. //    concat :: Semigroup a => a -> a -> a
  //. const concat =
  //. def ('concat')
  //.     ({a: [Semigroup]})
  //.     ([a, a, a])
  //.     (x => y => x.concat (y));
  //.
  //. concat ([1, 2]) ([3, 4]);
  //. // => [1, 2, 3, 4]
  //.
  //. concat (null) (null);
  //. // ! TypeError: Type-class constraint violation
  //. //
  //. //   concat :: Semigroup a => a -> a -> a
  //. //             ^^^^^^^^^^^    ^
  //. //                            1
  //. //
  //. //   1)  null :: Null
  //. //
  //. //   ‘concat’ requires ‘a’ to satisfy the Semigroup type-class constraint; the value at position 1 does not.
  //. //
  //. //   See http://example.com/my-package#Semigroup for information about the my-package/Semigroup type class.
  //. ```
  //.
  //. Multiple constraints may be placed on a type variable by including
  //. multiple `TypeClass` values in the array (e.g. `{a: [Foo, Bar, Baz]}`).

  //  invalidArgumentsCount :: (TypeInfo, Integer, Integer, Array Any) -> Error
  //
  //  This function is used in `curry` when a function defined via `def`
  //  is applied to too many arguments.
  function invalidArgumentsCount(typeInfo, index, numArgsExpected, args) {
    return new TypeError (trimTrailingSpaces (
      q (typeInfo.name) + ' applied to the wrong number of arguments\n\n' +
      underline (
        typeInfo,
        K (K (_)),
        function(index_) {
          return function(f) {
            return K (K (index_ === index ? f : _));
          };
        }
      ) + '\n' +
      'Expected ' + numArgs (numArgsExpected) +
      ' but received ' + numArgs (args.length) +
      toMarkdownList ('.\n', ':\n\n', show, args)
    ));
  }

  //  constraintsRepr :: ... -> String
  function constraintsRepr(
    constraints,    // :: StrMap (Array TypeClass)
    outer,          // :: String -> String
    inner           // :: String -> TypeClass -> String -> String
  ) {
    var $reprs = [];
    (sortedKeys (constraints)).forEach (function(k) {
      var f = inner (k);
      constraints[k].forEach (function(typeClass) {
        $reprs.push (f (typeClass) (stripNamespace (typeClass) + ' ' + k));
      });
    });
    return when ($reprs.length > 0)
                (wrap ('') (outer (' => ')))
                (when ($reprs.length > 1)
                      (parenthesize (outer))
                      (joinWith (outer (', '), $reprs)));
  }

  //  label :: String -> String -> String
  function label(label) {
    return function(s) {
      var delta = s.length - label.length;
      return strRepeat (' ', Math.floor (delta / 2)) + label +
             strRepeat (' ', Math.ceil (delta / 2));
    };
  }

  //  typeVarNames :: Type -> Array String
  function typeVarNames(t) {
    return Z.concat (
      t.type === VARIABLE ? [t.name] : [],
      Z.chain (function(k) { return typeVarNames (t.types[k]); }, t.keys)
    );
  }

  //  showTypeWith :: Array Type -> Type -> String
  function showTypeWith(types) {
    var names = Z.chain (typeVarNames, types);
    return function(t) {
      var code = 'a'.charCodeAt (0);
      return when (t.type === FUNCTION)
                  (parenthesize (I))
                  ((show (t)).replace (/\bUnknown\b/g, function() {
                     // eslint-disable-next-line no-plusplus
                     do var name = String.fromCharCode (code++);
                     while (names.indexOf (name) >= 0);
                     return name;
                   }));
    };
  }

  //  showValuesAndTypes :: ... -> String
  function showValuesAndTypes(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    values,         // :: Array Any
    pos             // :: Integer
  ) {
    var showType = showTypeWith (typeInfo.types);
    return show (pos) + ')  ' + joinWith ('\n    ', Z.map (function(x) {
      return show (x) +
             ' :: ' +
             joinWith (', ',
                       or (Z.map (showType,
                                  determineActualTypesLoose (env, [x])),
                           ['(no types)']));
    }, values));
  }

  //  typeSignature :: TypeInfo -> String
  function typeSignature(typeInfo) {
    return typeInfo.name + ' :: ' +
           constraintsRepr (typeInfo.constraints, I, K (K (I))) +
           joinWith (' -> ',
                     Z.map (showTypeWith (typeInfo.types), typeInfo.types));
  }

  //  _underline :: ... -> String
  function _underline(
    t,              // :: Type
    propPath,       // :: PropPath
    formatType3     // :: Type -> Array String -> String -> String
  ) {
    return formatType3 (t) (propPath) (t.format (_, function(k) {
      return K (_underline (t.types[k],
                            Z.concat (propPath, [k]),
                            formatType3));
    }));
  }

  //  underline :: ... -> String
  function underline(
    typeInfo,               // :: TypeInfo
    underlineConstraint,    // :: String -> TypeClass -> String -> String
    formatType5
    // :: Integer -> (String -> String) -> Type -> PropPath -> String -> String
  ) {
    var st = typeInfo.types.reduce (function(st, t, index) {
      var formatType4 = formatType5 (index);
      function f(g) {
        return function(type) {
          return B (B (B (when (type.type === FUNCTION)
                               (parenthesize (_)))))
                   (formatType4 (g));
        };
      }
      st.carets.push (_underline (t, [], W (f (r ('^')))));
      st.numbers.push (_underline (t, [], W (f (function(s) {
        return label (show (st.counter += 1)) (s);
      }))));
      return st;
    }, {carets: [], numbers: [], counter: 0});

    return typeSignature (typeInfo) + '\n' +
           _ (typeInfo.name + ' :: ') +
              constraintsRepr (typeInfo.constraints, _, underlineConstraint) +
              joinWith (_ (' -> '), st.carets) + '\n' +
           _ (typeInfo.name + ' :: ') +
              constraintsRepr (typeInfo.constraints, _, K (K (_))) +
              joinWith (_ (' -> '), st.numbers) + '\n';
  }

  //  resolvePropPath :: (Type, Array String) -> Type
  function resolvePropPath(t, propPath) {
    return Z.reduce (function(t, prop) { return t.types[prop]; },
                     t,
                     propPath);
  }

  //  formatType6 ::
  //    PropPath -> Integer -> (String -> String) ->
  //      Type -> PropPath -> String -> String
  function formatType6(indexedPropPath) {
    return function(index_) {
      return function(f) {
        return function(t) {
          return function(propPath_) {
            var indexedPropPath_ = Z.concat ([index_], propPath_);
            var p = isPrefix (indexedPropPath_) (indexedPropPath);
            var q = isPrefix (indexedPropPath) (indexedPropPath_);
            return p && q ? f : p ? I : _;
          };
        };
      };
    };
  }

  //  see :: (String, { name :: String, url :: String? }) -> String
  function see(label, record) {
    return record.url == null || record.url === '' ?
           '' :
           '\nSee ' + record.url +
           ' for information about the ' + record.name + ' ' + label + '.\n';
  }

  //  typeClassConstraintViolation :: ... -> Error
  function typeClassConstraintViolation(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    typeClass,      // :: TypeClass
    index,          // :: Integer
    propPath,       // :: PropPath
    value,          // :: Any
    typeVarMap      // :: TypeVarMap
  ) {
    var expType = resolvePropPath (typeInfo.types[index], propPath);
    return new TypeError (trimTrailingSpaces (
      'Type-class constraint violation\n\n' +
      underline (typeInfo,
                 function(tvn) {
                   return function(tc) {
                     return (
                       tvn === expType.name && tc.name === typeClass.name ?
                         r ('^') :
                         _
                     );
                   };
                 },
                 formatType6 (Z.concat ([index], propPath))) +
      '\n' +
      showValuesAndTypes (env, typeInfo, [value], 1) + '\n\n' +
      q (typeInfo.name) + ' requires ' +
      q (expType.name) + ' to satisfy the ' +
      stripNamespace (typeClass) + ' type-class constraint; ' +
      'the value at position 1 does not.\n' +
      see ('type class', typeClass)
    ));
  }

  //  typeVarConstraintViolation :: ... -> Error
  function typeVarConstraintViolation(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    index,          // :: Integer
    propPath,       // :: PropPath
    valuesByPath    // :: StrMap (Array Any)
  ) {
    //  If we apply an ‘a -> a -> a -> a’ function to Left ('x'), Right (1),
    //  and Right (null) we'd like to avoid underlining the first argument
    //  position, since Left ('x') is compatible with the other ‘a’ values.
    var key = JSON.stringify (Z.concat ([index], propPath));
    var values = valuesByPath[key];

    //  Note: Sorting these keys lexicographically is not "correct", but it
    //  does the right thing for indexes less than 10.
    var keys = Z.filter (function(k) {
      var values_ = valuesByPath[k];
      return (
        //  Keep X, the position at which the violation was observed.
        k === key ||
        //  Keep positions whose values are incompatible with the values at X.
        isEmpty (determineActualTypesStrict (env, Z.concat (values, values_)))
      );
    }, sortedKeys (valuesByPath));

    var underlinedTypeVars =
    underlineTypeVars (typeInfo,
                       Z.reduce (function($valuesByPath, k) {
                         $valuesByPath[k] = valuesByPath[k];
                         return $valuesByPath;
                       }, {}, keys));

    return new TypeError (trimTrailingSpaces (
      'Type-variable constraint violation\n\n' +
      underlinedTypeVars + '\n' +
      (Z.reduce (function(st, k) {
        var values = valuesByPath[k];
        return isEmpty (values) ? st : {
          idx: st.idx + 1,
          s: st.s +
             showValuesAndTypes (env, typeInfo, values, st.idx + 1) +
             '\n\n'
        };
      }, {idx: 0, s: ''}, keys)).s +
      'Since there is no type of which all the above values are ' +
      'members, the type-variable constraint has been violated.\n'
    ));
  }

  //  invalidValue :: ... -> Error
  function invalidValue(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    index,          // :: Integer
    propPath,       // :: PropPath
    value           // :: Any
  ) {
    var t = resolvePropPath (typeInfo.types[index], propPath);

    var underlinedTypeVars =
    underline (typeInfo,
               K (K (_)),
               formatType6 (Z.concat ([index], propPath)));

    return new TypeError (trimTrailingSpaces (
      t.type === VARIABLE &&
      isEmpty (determineActualTypesLoose (env, [value])) ?
        'Unrecognized value\n\n' +
        underlinedTypeVars + '\n' +
        showValuesAndTypes (env, typeInfo, [value], 1) + '\n\n' +
        toMarkdownList (
          'The environment is empty! ' +
          'Polymorphic functions require a non-empty environment.\n',
          'The value at position 1 is not a member of any type in ' +
          'the environment.\n\n' +
          'The environment contains the following types:\n\n',
          showTypeWith (typeInfo.types),
          env
        ) :
      // else
        'Invalid value\n\n' +
        underlinedTypeVars + '\n' +
        showValuesAndTypes (env, typeInfo, [value], 1) + '\n\n' +
        'The value at position 1 is not a member of ' +
        q (show (t)) + '.\n' +
        see (arityGte (1) (t) ? 'type constructor' : 'type', t)
    ));
  }

  //  invalidArgumentsLength :: ... -> Error
  //
  //  This function is used in `wrapFunctionCond` to ensure that higher-order
  //  functions defined via `def` only ever apply a function argument to the
  //  correct number of arguments.
  function invalidArgumentsLength(
    typeInfo,           // :: TypeInfo
    index,              // :: Integer
    numArgsExpected,    // :: Integer
    args                // :: Array Any
  ) {
    return new TypeError (trimTrailingSpaces (
      q (typeInfo.name) +
      ' applied ' + q (show (typeInfo.types[index])) +
      ' to the wrong number of arguments\n\n' +
      underline (
        typeInfo,
        K (K (_)),
        function(index_) {
          return function(f) {
            return function(t) {
              return function(propPath) {
                return function(s) {
                  return index_ === index ?
                    t.format (_, function(k) { return k === '$1' ? f : _; }) :
                    _ (s);
                };
              };
            };
          };
        }
      ) + '\n' +
      'Expected ' + numArgs (numArgsExpected) +
      ' but received ' + numArgs (args.length) +
      toMarkdownList ('.\n', ':\n\n', show, args)
    ));
  }

  //  assertRight :: Either (() -> Error) a -> a !
  function assertRight(either) {
    if (either.isLeft) throw either.value ();
    return either.value;
  }

  //  withTypeChecking :: ... -> Function
  function withTypeChecking(
    env,            // :: Array Type
    typeInfo,       // :: TypeInfo
    impl            // :: Function
  ) {
    var n = typeInfo.types.length - 1;

    //  wrapFunctionCond :: (TypeVarMap, Integer, a) -> a
    function wrapFunctionCond(_typeVarMap, index, value) {
      var expType = typeInfo.types[index];
      if (expType.type !== FUNCTION) return value;

      //  checkValue :: (TypeVarMap, Integer, String, a) -> Either (() -> Error) TypeVarMap
      function checkValue(typeVarMap, index, k, x) {
        var propPath = [k];
        var t = expType.types[k];
        return (
          t.type === VARIABLE ?
            Z.chain (
              function(typeVarMap) {
                return isEmpty (typeVarMap[t.name].types) ?
                  Left (function() {
                    return typeVarConstraintViolation (
                      env,
                      typeInfo,
                      index,
                      propPath,
                      typeVarMap[t.name].valuesByPath
                    );
                  }) :
                  Right (typeVarMap);
              },
              Right (updateTypeVarMap (env,
                                       typeVarMap,
                                       t,
                                       index,
                                       propPath,
                                       [x]))
            ) :
          // else
            Z.map (
              function(r) { return r.typeVarMap; },
              satisfactoryTypes (env,
                                 typeInfo,
                                 typeVarMap,
                                 t,
                                 index,
                                 propPath,
                                 [x])
            )
        );
      }

      var typeVarMap = _typeVarMap;
      return function(x) {
        if (arguments.length !== expType.arity - 1) {
          throw invalidArgumentsLength (typeInfo,
                                        index,
                                        expType.arity - 1,
                                        slice.call (arguments));
        }

        var args = arguments;
        typeVarMap = assertRight (
          (init (expType.keys)).reduce (function(either, k, idx) {
            var arg = args[idx];
            return Z.chain (function(typeVarMap) {
              return checkValue (typeVarMap, index, k, arg);
            }, either);
          }, Right (typeVarMap))
        );

        var output = value.apply (this, arguments);
        var k = last (expType.keys);
        typeVarMap = assertRight (checkValue (typeVarMap, index, k, output));
        return output;
      };
    }

    //  wrapNext :: (TypeVarMap, Array Any, Integer) -> (a -> b)
    function wrapNext(_typeVarMap, _values, index) {
      return function(x) {
        var args = slice.call (arguments);
        if (args.length !== 1) {
          throw invalidArgumentsCount (typeInfo, index, 1, args);
        }
        var typeVarMap = (assertRight (
          satisfactoryTypes (env,
                             typeInfo,
                             _typeVarMap,
                             typeInfo.types[index],
                             index,
                             [],
                             args)
        )).typeVarMap;

        var values = Z.concat (_values, args);
        if (index + 1 === n) {
          var value = values.reduce (function(f, x, idx) {
            return f (wrapFunctionCond (typeVarMap, idx, x));
          }, impl);
          typeVarMap = (assertRight (
            satisfactoryTypes (env,
                               typeInfo,
                               typeVarMap,
                               typeInfo.types[n],
                               n,
                               [],
                               [value])
          )).typeVarMap;
          return wrapFunctionCond (typeVarMap, n, value);
        } else {
          return wrapNext (typeVarMap, values, index + 1);
        }
      };
    }

    var wrapped = typeInfo.types[0].type === NO_ARGUMENTS ?
      function() {
        if (arguments.length !== 0) {
          throw invalidArgumentsCount (typeInfo, 0, 0, slice.call (arguments));
        }
        var value = impl ();
        var typeVarMap = (assertRight (
          satisfactoryTypes (env,
                             typeInfo,
                             {},
                             typeInfo.types[n],
                             n,
                             [],
                             [value])
        )).typeVarMap;
        return wrapFunctionCond (typeVarMap, n, value);
      } :
      wrapNext ({}, [], 0);

    wrapped[inspect] = wrapped.toString = always0 (typeSignature (typeInfo));

    return wrapped;
  }

  //  defTypes :: NonEmpty (Array Type)
  var defTypes = [
    String_,
    StrMap (Array_ (TypeClass)),
    NonEmpty (Array_ (Type)),
    AnyFunction,
    AnyFunction
  ];

  function create(opts) {
    function def(name) {
      return function(constraints) {
        return function(expTypes) {
          return function(impl) {
            return opts.checkTypes ?
              withTypeChecking (opts.env,
                                {name: name,
                                 constraints: constraints,
                                 types: expTypes.length === 1 ?
                                        Z.concat ([NoArguments], expTypes) :
                                        expTypes},
                                impl) :
              impl;
          };
        };
      };
    }
    return def (def.name) ({}) (defTypes) (def);
  }

  var def = create ({checkTypes: !production, env: env});

  //  fromUncheckedUnaryType :: (Type -> Type) -> Type -> Type
  function fromUncheckedUnaryType(typeConstructor) {
    var t = typeConstructor (Unknown);
    return def (t.name) ({}) ([Type, Type]) (fromUnaryType (t));
  }

  //  fromUncheckedBinaryType :: (Type -> Type -> Type) -> Type -> Type -> Type
  function fromUncheckedBinaryType(typeConstructor) {
    var t = typeConstructor (Unknown) (Unknown);
    return def (t.name) ({}) ([Type, Type, Type]) (fromBinaryType (t));
  }

  return {
    Any: Any,
    AnyFunction: AnyFunction,
    Arguments: Arguments,
    Array: fromUncheckedUnaryType (Array_),
    Array0: Array0,
    Array1: fromUncheckedUnaryType (Array1),
    Array2: fromUncheckedBinaryType (Array2),
    Boolean: Boolean_,
    Date: Date_,
    ValidDate: ValidDate,
    Descending: fromUncheckedUnaryType (Descending),
    Either: fromUncheckedBinaryType (Either_),
    Error: Error_,
    Fn:
      def ('Fn')
          ({})
          ([Type, Type, Type])
          (Fn),
    Function:
      def ('Function')
          ({})
          ([NonEmpty (Array_ (Type)), Type])
          (Function_),
    HtmlElement: HtmlElement,
    Identity: fromUncheckedUnaryType (Identity),
    Maybe: fromUncheckedUnaryType (Maybe),
    NonEmpty: NonEmpty,
    Null: Null,
    Nullable: fromUncheckedUnaryType (Nullable),
    Number: Number_,
    PositiveNumber: PositiveNumber,
    NegativeNumber: NegativeNumber,
    ValidNumber: ValidNumber,
    NonZeroValidNumber: NonZeroValidNumber,
    FiniteNumber: FiniteNumber,
    NonZeroFiniteNumber: NonZeroFiniteNumber,
    PositiveFiniteNumber: PositiveFiniteNumber,
    NegativeFiniteNumber: NegativeFiniteNumber,
    Integer: Integer,
    NonZeroInteger: NonZeroInteger,
    NonNegativeInteger: NonNegativeInteger,
    PositiveInteger: PositiveInteger,
    NegativeInteger: NegativeInteger,
    Object: Object_,
    Pair: fromUncheckedBinaryType (Pair),
    RegExp: RegExp_,
    GlobalRegExp: GlobalRegExp,
    NonGlobalRegExp: NonGlobalRegExp,
    RegexFlags: RegexFlags,
    StrMap: fromUncheckedUnaryType (StrMap),
    String: String_,
    Symbol: Symbol_,
    Type: Type,
    TypeClass: TypeClass,
    Undefined: Undefined,
    Unknown: Unknown,
    env: env,
    create:
      def ('create')
          ({})
          ([RecordType ({checkTypes: Boolean_, env: Array_ (Type)}),
            Unchecked (joinWith (' -> ', Z.map (show, defTypes)))])
          (create),
    test:
      def ('test')
          ({})
          ([Array_ (Type), Type, Any, Boolean_])
          (test),
    NullaryType:
      def ('NullaryType')
          ({})
          ([String_,
            String_,
            Array_ (Type),
            Unchecked ('(Any -> Boolean)'),
            Type])
          (NullaryType),
    UnaryType:
      def ('UnaryType')
          ({f: [Z.Foldable]})
          ([String_,
            String_,
            Array_ (Type),
            Unchecked ('(Any -> Boolean)'),
            Unchecked ('(t a -> f a)'),
            Unchecked ('Type -> Type')])
          (function(name) {
             return B (B (B (B (def (name) ({}) ([Type, Type])))))
                      (UnaryType (name));
           }),
    BinaryType:
      def ('BinaryType')
          ({f: [Z.Foldable]})
          ([String_,
            String_,
            Array_ (Type),
            Unchecked ('(Any -> Boolean)'),
            Unchecked ('(t a b -> f a)'),
            Unchecked ('(t a b -> f b)'),
            Unchecked ('Type -> Type -> Type')])
          (function(name) {
             return B (B (B (B (B (def (name) ({}) ([Type, Type, Type]))))))
                      (BinaryType (name));
           }),
    EnumType:
      def ('EnumType')
          ({})
          ([String_, String_, Array_ (Any), Type])
          (EnumType),
    RecordType:
      def ('RecordType')
          ({})
          ([StrMap (Type), Type])
          (RecordType),
    NamedRecordType:
      def ('NamedRecordType')
          ({})
          ([NonEmpty (String_), String_, Array_ (Type), StrMap (Type), Type])
          (NamedRecordType),
    TypeVariable:
      def ('TypeVariable')
          ({})
          ([String_, Type])
          (TypeVariable),
    UnaryTypeVariable:
      def ('UnaryTypeVariable')
          ({})
          ([String_, Unchecked ('Type -> Type')])
          (function(name) {
             return def (name) ({}) ([Type, Type]) (UnaryTypeVariable (name));
           }),
    BinaryTypeVariable:
      def ('BinaryTypeVariable')
          ({})
          ([String_, Unchecked ('Type -> Type -> Type')])
          (function(name) {
             return def (name)
                        ({})
                        ([Type, Type, Type])
                        (BinaryTypeVariable (name));
           }),
    Thunk:
      def ('Thunk')
          ({})
          ([Type, Type])
          (Thunk),
    Predicate:
      def ('Predicate')
          ({})
          ([Type, Type])
          (Predicate)
  };

}));

//. [Descending]:           v:sanctuary-js/sanctuary-descending
//. [Either]:               v:sanctuary-js/sanctuary-either
//. [FL:Semigroup]:         https://github.com/fantasyland/fantasy-land#semigroup
//. [HTML element]:         https://developer.mozilla.org/en-US/docs/Web/HTML/Element
//. [Identity]:             v:sanctuary-js/sanctuary-identity
//. [Maybe]:                v:sanctuary-js/sanctuary-maybe
//. [Monoid]:               https://github.com/fantasyland/fantasy-land#monoid
//. [Pair]:                 v:sanctuary-js/sanctuary-pair
//. [Setoid]:               https://github.com/fantasyland/fantasy-land#setoid
//. [Unknown]:              #Unknown
//. [`Array`]:              #Array
//. [`Array2`]:             #Array2
//. [`BinaryType`]:         #BinaryType
//. [`Date`]:               #Date
//. [`FiniteNumber`]:       #FiniteNumber
//. [`GlobalRegExp`]:       #GlobalRegExp
//. [`Integer`]:            #Integer
//. [`NonGlobalRegExp`]:    #NonGlobalRegExp
//. [`Number`]:             #Number
//. [`Object.create`]:      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
//. [`RegExp`]:             #RegExp
//. [`RegexFlags`]:         #RegexFlags
//. [`String`]:             #String
//. [`SyntaxError`]:        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
//. [`TypeClass`]:          https://github.com/sanctuary-js/sanctuary-type-classes#TypeClass
//. [`TypeError`]:          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
//. [`TypeVariable`]:       #TypeVariable
//. [`UnaryType`]:          #UnaryType
//. [`UnaryTypeVariable`]:  #UnaryTypeVariable
//. [`Unknown`]:            #Unknown
//. [`ValidNumber`]:        #ValidNumber
//. [`env`]:                #env
//. [arguments]:            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
//. [enumerated types]:     https://en.wikipedia.org/wiki/Enumerated_type
//. [max]:                  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
//. [min]:                  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
//. [semigroup]:            https://en.wikipedia.org/wiki/Semigroup
//. [type class]:           #type-classes
//. [type variables]:       #TypeVariable
//. [types]:                #types
});

var sanctuaryEither$1 = createCommonjsModule(function (module) {
/*
         _______    ___    _________    ___   ___    _______    ______
        /  ____/\  /  /\  /__   ___/\  /  /\ /  /\  /  ____/\  /  __  \
       /  /\___\/ /  / /  \_/  /\__\/ /  /_//  / / /  /\___\/ /  /\/  /\
      /  ____/\  /  / /    /  / /    /  ___   / / /  ____/\  /      _/ /
     /  /\___\/ /  / /    /  / /    /  /\_/  / / /  /\___\/ /  /|  |\\/
    /______/\  /__/ /    /__/ /    /__/ //__/ / /______/\  /__/ |__| |
    \______\/  \__\/     \__\/     \__\/ \__\/  \______\/  \__\/ \__\|
                                                                            */

//. <a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>
//.
//. # sanctuary-either
//.
//. The Either type represents values with two possibilities: a value of type
//. `Either a b` is either a Left whose value is of type `a` or a Right whose
//. value is of type `b`.

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (util,
                        sanctuaryShow,
                        sanctuaryTypeClasses$1);
  }

} (function(util, show, Z) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    var $ = __doctest.require ('sanctuary-def');
    var type = __doctest.require ('sanctuary-type-identifiers');
    var S = (function() {
      var S = __doctest.require ('sanctuary');
      var EitherType = $.BinaryType
        ('sanctuary-either/Either')
        ('')
        (function(x) { return type (x) === Either['@@type']; })
        (function(e) { return e.isLeft ? [e.value] : []; })
        (function(e) { return e.isLeft ? [] : [e.value]; });
      var env = Z.concat (S.env,
                          [$.TypeClass, EitherType ($.Unknown) ($.Unknown)]);
      return S.create ({checkTypes: true, env: env});
    } ());
  }

  var Either = {};

  var Left$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Either,
    'isLeft':                 true,
    'isRight':                false,
    '@@show':                 Left$prototype$show,
    'fantasy-land/map':       Left$prototype$map,
    'fantasy-land/bimap':     Left$prototype$bimap,
    'fantasy-land/ap':        Left$prototype$ap,
    'fantasy-land/chain':     Left$prototype$chain,
    'fantasy-land/alt':       Left$prototype$alt,
    'fantasy-land/reduce':    Left$prototype$reduce,
    'fantasy-land/traverse':  Left$prototype$traverse,
    'fantasy-land/extend':    Left$prototype$extend
    /* eslint-enable key-spacing */
  };

  var Right$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Either,
    'isLeft':                 false,
    'isRight':                true,
    '@@show':                 Right$prototype$show,
    'fantasy-land/map':       Right$prototype$map,
    'fantasy-land/bimap':     Right$prototype$bimap,
    'fantasy-land/ap':        Right$prototype$ap,
    'fantasy-land/chain':     Right$prototype$chain,
    'fantasy-land/alt':       Right$prototype$alt,
    'fantasy-land/reduce':    Right$prototype$reduce,
    'fantasy-land/traverse':  Right$prototype$traverse,
    'fantasy-land/extend':    Right$prototype$extend
    /* eslint-enable key-spacing */
  };

  var custom = util.inspect.custom;
  /* istanbul ignore else */
  if (typeof custom === 'symbol') {
    Left$prototype[custom] = Left$prototype$show;
    Right$prototype[custom] = Right$prototype$show;
  } else {
    Left$prototype.inspect = Left$prototype$show;
    Right$prototype.inspect = Right$prototype$show;
  }

  //. `Either a b` satisfies the following [Fantasy Land][] specifications:
  //.
  //. ```javascript
  //. > const Useless = require ('sanctuary-useless')
  //.
  //. > S.map (k => k + ' '.repeat (16 - k.length) +
  //. .             (Z[k].test (Right (Useless)) ? '\u2705   ' :
  //. .              Z[k].test (Right (['foo'])) ? '\u2705 * ' :
  //. .              /* otherwise */               '\u274C   '))
  //. .       (S.keys (S.unchecked.filter (S.is ($.TypeClass)) (Z)))
  //. [ 'Setoid          ✅ * ',  // if ‘a’ and ‘b’ satisfy Setoid
  //. . 'Ord             ✅ * ',  // if ‘a’ and ‘b’ satisfy Ord
  //. . 'Semigroupoid    ❌   ',
  //. . 'Category        ❌   ',
  //. . 'Semigroup       ✅ * ',  // if ‘a’ and ‘b’ satisfy Semigroup
  //. . 'Monoid          ❌   ',
  //. . 'Group           ❌   ',
  //. . 'Filterable      ❌   ',
  //. . 'Functor         ✅   ',
  //. . 'Bifunctor       ✅   ',
  //. . 'Profunctor      ❌   ',
  //. . 'Apply           ✅   ',
  //. . 'Applicative     ✅   ',
  //. . 'Chain           ✅   ',
  //. . 'ChainRec        ✅   ',
  //. . 'Monad           ✅   ',
  //. . 'Alt             ✅   ',
  //. . 'Plus            ❌   ',
  //. . 'Alternative     ❌   ',
  //. . 'Foldable        ✅   ',
  //. . 'Traversable     ✅   ',
  //. . 'Extend          ✅   ',
  //. . 'Comonad         ❌   ',
  //. . 'Contravariant   ❌   ' ]
  //. ```

  //# Either :: TypeRep Either
  //.
  //. Either [type representative][].

  //# Either.Left :: a -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `a`.
  //.
  //. ```javascript
  //. > Left ('sqrt undefined for -1')
  //. Left ('sqrt undefined for -1')
  //. ```
  var Left = Either.Left = function(value) {
    var left = Object.create (Left$prototype);
    if (Z.Setoid.test (value)) {
      left['fantasy-land/equals'] = Left$prototype$equals;
      if (Z.Ord.test (value)) {
        left['fantasy-land/lte'] = Left$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      left['fantasy-land/concat'] = Left$prototype$concat;
    }
    left.value = value;
    return left;
  };

  //# Either.Right :: b -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `b`.
  //.
  //. ```javascript
  //. > Right (42)
  //. Right (42)
  //. ```
  var Right = Either.Right = function Right(value) {
    var right = Object.create (Right$prototype);
    if (Z.Setoid.test (value)) {
      right['fantasy-land/equals'] = Right$prototype$equals;
      if (Z.Ord.test (value)) {
        right['fantasy-land/lte'] = Right$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      right['fantasy-land/concat'] = Right$prototype$concat;
    }
    right.value = value;
    return right;
  };

  //# Either.@@type :: String
  //.
  //. Either [type identifier][].
  //.
  //. ```javascript
  //. > type (Right (42))
  //. 'sanctuary-either/Either@1'
  //.
  //. > type.parse (type (Right (42)))
  //. {namespace: 'sanctuary-either', name: 'Either', version: 1}
  //. ```
  Either['@@type'] = 'sanctuary-either/Either@1';

  //# Either.fantasy-land/of :: b -> Either a b
  //.
  //.   - `of (Either) (x)` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.of (Either) (42)
  //. Right (42)
  //. ```
  Either['fantasy-land/of'] = Right;

  function next(x) { return {tag: next, value: x}; }
  function done(x) { return {tag: done, value: x}; }

  //# Either.fantasy-land/chainRec :: ((a -> c, b -> c, a) -> Either d c, a) -> Either d b
  //.
  //. ```javascript
  //. > Z.chainRec (
  //. .   Either,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Left ('!!') : Right (x >= 1000 ? done (x) : next (x * x)),
  //. .   1
  //. . )
  //. Left ('!!')
  //.
  //. > Z.chainRec (
  //. .   Either,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Left ('!!') : Right (x >= 1000 ? done (x) : next (x * x)),
  //. .   2
  //. . )
  //. Right (65536)
  //. ```
  Either['fantasy-land/chainRec'] = function(f, x) {
    var r = next (x);
    while (r.tag === next) {
      var either = f (next, done, r.value);
      if (either.isLeft) return either;
      r = either.value;
    }
    return Right (r.value);
  };

  //# Either#@@show :: (Showable a, Showable b) => Either a b ~> () -> String
  //.
  //.   - `show (Left (x))` is equivalent to `'Left (' + show (x) + ')'`
  //.   - `show (Right (x))` is equivalent to `'Right (' + show (x) + ')'`
  //.
  //. ```javascript
  //. > show (Left ('sqrt undefined for -1'))
  //. 'Left ("sqrt undefined for -1")'
  //.
  //. > show (Right ([1, 2, 3]))
  //. 'Right ([1, 2, 3])'
  //. ```
  function Left$prototype$show() {
    return 'Left (' + show (this.value) + ')';
  }
  function Right$prototype$show() {
    return 'Right (' + show (this.value) + ')';
  }

  //# Either#fantasy-land/equals :: (Setoid a, Setoid b) => Either a b ~> Either a b -> Boolean
  //.
  //.   - `Left (x)` is equal to `Left (y)` [iff][] `x` is equal to `y`
  //.     according to [`Z.equals`][]
  //.   - `Right (x)` is equal to `Right (y)` [iff][] `x` is equal to `y`
  //.     according to [`Z.equals`][]
  //.   - `Left (x)` is never equal to `Right (y)`
  //.
  //. ```javascript
  //. > S.equals (Left ([1, 2, 3])) (Left ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Right ([1, 2, 3])) (Right ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Left ([1, 2, 3])) (Right ([1, 2, 3]))
  //. false
  //. ```
  function Left$prototype$equals(other) {
    return other.isLeft && Z.equals (this.value, other.value);
  }
  function Right$prototype$equals(other) {
    return other.isRight && Z.equals (this.value, other.value);
  }

  //# Either#fantasy-land/lte :: (Ord a, Ord b) => Either a b ~> Either a b -> Boolean
  //.
  //.   - `Left (x)` is less than or equal to `Left (y)` [iff][] `x` is less
  //.     than or equal to `y` according to [`Z.lte`][]
  //.   - `Right (x)` is less than or equal to `Right (y)` [iff][] `x` is less
  //.     than or equal to `y` according to [`Z.lte`][]
  //.   - `Left (x)` is always less than `Right (y)`
  //.
  //. ```javascript
  //. > S.filter (S.lte (Left (1))) ([Left (0), Left (1), Left (2)])
  //. [Left (0), Left (1)]
  //.
  //. > S.filter (S.lte (Right (1))) ([Right (0), Right (1), Right (2)])
  //. [Right (0), Right (1)]
  //.
  //. > S.filter (S.lte (Left (1))) ([Right (0), Right (1), Right (2)])
  //. []
  //.
  //. > S.filter (S.lte (Right (1))) ([Left (0), Left (1), Left (2)])
  //. [Left (0), Left (1), Left (2)]
  //. ```
  function Left$prototype$lte(other) {
    return other.isRight || Z.lte (this.value, other.value);
  }
  function Right$prototype$lte(other) {
    return other.isRight && Z.lte (this.value, other.value);
  }

  //# Either#fantasy-land/concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
  //.
  //.   - `concat (Left (x)) (Left (y))` is equivalent to
  //.     `Left (concat (x) (y))`
  //.   - `concat (Right (x)) (Right (y))` is equivalent to
  //.     `Right (concat (x) (y))`
  //.   - `concat (Left (x)) (Right (y))` is equivalent to `Right (y)`
  //.   - `concat (Right (x)) (Left (y))` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.concat (Left ('abc')) (Left ('def'))
  //. Left ('abcdef')
  //.
  //. > S.concat (Right ([1, 2, 3])) (Right ([4, 5, 6]))
  //. Right ([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat (Left ('abc')) (Right ([1, 2, 3]))
  //. Right ([1, 2, 3])
  //.
  //. > S.concat (Right ([1, 2, 3])) (Left ('abc'))
  //. Right ([1, 2, 3])
  //. ```
  function Left$prototype$concat(other) {
    return other.isLeft ? Left (Z.concat (this.value, other.value)) : other;
  }
  function Right$prototype$concat(other) {
    return other.isRight ? Right (Z.concat (this.value, other.value)) : this;
  }

  //# Either#fantasy-land/map :: Either a b ~> (b -> c) -> Either a c
  //.
  //.   - `map (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `map (f) (Right (x))` is equivalent to `Right (f (x))`
  //.
  //. ```javascript
  //. > S.map (S.add (1)) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.map (S.add (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$map(f) {
    return this;
  }
  function Right$prototype$map(f) {
    return Right (f (this.value));
  }

  //# Either#fantasy-land/bimap :: Either a c ~> (a -> b, c -> d) -> Either b d
  //.
  //.   - `bimap (f) (g) (Left (x))` is equivalent to `Left (f (x))`
  //.   - `bimap (f) (g) (Right (x))` is equivalent to `Right (g (x))`
  //.
  //. ```javascript
  //. > S.bimap (S.toUpper) (S.add (1)) (Left ('abc'))
  //. Left ('ABC')
  //.
  //. > S.bimap (S.toUpper) (S.add (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$bimap(f, g) {
    return Left (f (this.value));
  }
  function Right$prototype$bimap(f, g) {
    return Right (g (this.value));
  }

  //# Either#fantasy-land/ap :: Either a b ~> Either a (b -> c) -> Either a c
  //.
  //.   - `ap (Left (x)) (Left (y))` is equivalent to `Left (x)`
  //.   - `ap (Left (x)) (Right (y))` is equivalent to `Left (x)`
  //.   - `ap (Right (f)) (Left (x))` is equivalent to `Left (x)`
  //.   - `ap (Right (f)) (Right (x))` is equivalent to `Right (f (x))`
  //.
  //. ```javascript
  //. > S.ap (Left ('div undefined for 0')) (Left ('sqrt undefined for -1'))
  //. Left ('div undefined for 0')
  //.
  //. > S.ap (Left ('div undefined for 0')) (Right (99))
  //. Left ('div undefined for 0')
  //.
  //. > S.ap (Right (S.add (1))) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.ap (Right (S.add (1))) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$ap(other) {
    return other.isLeft ? other : this;
  }
  function Right$prototype$ap(other) {
    return other.isLeft ? other : Right (other.value (this.value));
  }

  //# Either#fantasy-land/chain :: Either a b ~> (b -> Either a c) -> Either a c
  //.
  //.   - `chain (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `chain (f) (Right (x))` is equivalent to `f (x)`
  //.
  //. ```javascript
  //. > const sqrt = n => n < 0 ? Left ('sqrt undefined for ' + show (n))
  //. .                         : Right (Math.sqrt (n))
  //.
  //. > S.chain (sqrt) (Left ('div undefined for 0'))
  //. Left ('div undefined for 0')
  //.
  //. > S.chain (sqrt) (Right (-1))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.chain (sqrt) (Right (25))
  //. Right (5)
  //. ```
  function Left$prototype$chain(f) {
    return this;
  }
  function Right$prototype$chain(f) {
    return f (this.value);
  }

  //# Either#fantasy-land/alt :: Either a b ~> Either a b -> Either a b
  //.
  //.   - `alt (Left (x)) (Left (y))` is equivalent to `Left (y)`
  //.   - `alt (Left (x)) (Right (y))` is equivalent to `Right (y)`
  //.   - `alt (Right (x)) (Left (y))` is equivalent to `Right (x)`
  //.   - `alt (Right (x)) (Right (y))` is equivalent to `Right (x)`
  //.
  //. ```javascript
  //. > S.alt (Left ('A')) (Left ('B'))
  //. Left ('B')
  //.
  //. > S.alt (Left ('C')) (Right (1))
  //. Right (1)
  //.
  //. > S.alt (Right (2)) (Left ('D'))
  //. Right (2)
  //.
  //. > S.alt (Right (3)) (Right (4))
  //. Right (3)
  //. ```
  function Left$prototype$alt(other) {
    return other;
  }
  function Right$prototype$alt(other) {
    return this;
  }

  //# Either#fantasy-land/reduce :: Either a b ~> ((c, b) -> c, c) -> c
  //.
  //.   - `reduce (f) (x) (Left (y))` is equivalent to `x`
  //.   - `reduce (f) (x) (Right (y))` is equivalent to `f (x) (y)`
  //.
  //. ```javascript
  //. > S.reduce (S.concat) ([1]) (Left ('sqrt undefined for -1'))
  //. [1]
  //.
  //. > S.reduce (S.concat) ([1]) (Right ([2]))
  //. [1, 2]
  //. ```
  function Left$prototype$reduce(f, x) {
    return x;
  }
  function Right$prototype$reduce(f, x) {
    return f (x, this.value);
  }

  //# Either#fantasy-land/traverse :: Applicative f => Either a b ~> (TypeRep f, b -> f c) -> f (Either a c)
  //.
  //.   - `traverse (A) (f) (Left (x))` is equivalent to `of (A) (Left (x))`
  //.   - `traverse (A) (f) (Right (x))` is equivalent to `map (Right) (f (x))`
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (Left ('sqrt undefined for -1'))
  //. [Left ('sqrt undefined for -1')]
  //.
  //. > S.traverse (Array) (S.words) (Right ('foo bar baz'))
  //. [Right ('foo'), Right ('bar'), Right ('baz')]
  //. ```
  function Left$prototype$traverse(typeRep, f) {
    return Z.of (typeRep, this);
  }
  function Right$prototype$traverse(typeRep, f) {
    return Z.map (Right, f (this.value));
  }

  //# Either#fantasy-land/extend :: Either a b ~> (Either a b -> c) -> Either a c
  //.
  //.   - `extend (f) (Left (x))` is equivalent to `Left (x)`
  //.   - `extend (f) (Right (x))` is equivalent to `Right (f (Right (x)))`
  //.
  //. ```javascript
  //. > S.extend (S.reduce (S.add) (1)) (Left ('sqrt undefined for -1'))
  //. Left ('sqrt undefined for -1')
  //.
  //. > S.extend (S.reduce (S.add) (1)) (Right (99))
  //. Right (100)
  //. ```
  function Left$prototype$extend(f) {
    return this;
  }
  function Right$prototype$extend(f) {
    return Right (f (this));
  }

  return Either;

}));

//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
});

var sanctuaryMaybe = createCommonjsModule(function (module) {
/*
    ,______  ______,  ,________,,_____,,_____,,__________  ,__________,
    |      \/      |  |        ||     ||     ||          \ |          |
    |_,          ,_|  |_      _||_    ||    _||_,   __    ||_,   _____|
      |   \  /   |     /      \   \   \/   /    |        /   |      |
    ,_|    ||    |_,,_/   /\   \_, \      /   ,_|   __   \ ,_|   ___|_,
    |      ||      ||     ||     |  |    |    |           ||          |
    |______||______||_____||_____|  |____|    |__________/ |__________|
                                                                         */

//. <a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>
//.
//. # sanctuary-maybe
//.
//. The Maybe type represents optional values: a value of type `Maybe a` is
//. either Nothing (the empty value) or a Just whose value is of type `a`.

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (util,
                        sanctuaryShow,
                        sanctuaryTypeClasses$1);
  }

} (function(util, show, Z) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    var $ = __doctest.require ('sanctuary-def');
    var type = __doctest.require ('sanctuary-type-identifiers');
    var S = (function() {
      var S = __doctest.require ('sanctuary');
      var MaybeType = $.UnaryType
        ('sanctuary-maybe/Maybe')
        ('')
        (function(x) { return type (x) === Maybe['@@type']; })
        (function(m) { return m.isJust ? [m.value] : []; });
      var env = Z.concat (S.env, [$.TypeClass, MaybeType ($.Unknown)]);
      return S.create ({checkTypes: true, env: env});
    } ());
  }

  var Maybe = {};

  var Nothing$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Maybe,
    'isNothing':              true,
    'isJust':                 false,
    '@@show':                 Nothing$prototype$show,
    'fantasy-land/equals':    Nothing$prototype$equals,
    'fantasy-land/lte':       Nothing$prototype$lte,
    'fantasy-land/concat':    Nothing$prototype$concat,
    'fantasy-land/filter':    Nothing$prototype$filter,
    'fantasy-land/map':       Nothing$prototype$map,
    'fantasy-land/ap':        Nothing$prototype$ap,
    'fantasy-land/chain':     Nothing$prototype$chain,
    'fantasy-land/alt':       Nothing$prototype$alt,
    'fantasy-land/reduce':    Nothing$prototype$reduce,
    'fantasy-land/traverse':  Nothing$prototype$traverse,
    'fantasy-land/extend':    Nothing$prototype$extend
    /* eslint-enable key-spacing */
  };

  var Just$prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Maybe,
    'isNothing':              false,
    'isJust':                 true,
    '@@show':                 Just$prototype$show,
    'fantasy-land/filter':    Just$prototype$filter,
    'fantasy-land/map':       Just$prototype$map,
    'fantasy-land/ap':        Just$prototype$ap,
    'fantasy-land/chain':     Just$prototype$chain,
    'fantasy-land/alt':       Just$prototype$alt,
    'fantasy-land/reduce':    Just$prototype$reduce,
    'fantasy-land/traverse':  Just$prototype$traverse,
    'fantasy-land/extend':    Just$prototype$extend
    /* eslint-enable key-spacing */
  };

  var custom = util.inspect.custom;
  /* istanbul ignore else */
  if (typeof custom === 'symbol') {
    Nothing$prototype[custom] = Nothing$prototype$show;
    Just$prototype[custom] = Just$prototype$show;
  } else {
    Nothing$prototype.inspect = Nothing$prototype$show;
    Just$prototype.inspect = Just$prototype$show;
  }

  //. `Maybe a` satisfies the following [Fantasy Land][] specifications:
  //.
  //. ```javascript
  //. > const Useless = require ('sanctuary-useless')
  //.
  //. > S.map (k => k + ' '.repeat (16 - k.length) +
  //. .             (Z[k].test (Just (Useless)) ? '\u2705   ' :
  //. .              Z[k].test (Nothing)        ? '\u2705 * ' :
  //. .              /* otherwise */              '\u274C   '))
  //. .       (S.keys (S.unchecked.filter (S.is ($.TypeClass)) (Z)))
  //. [ 'Setoid          ✅ * ',  // if ‘a’ satisfies Setoid
  //. . 'Ord             ✅ * ',  // if ‘a’ satisfies Ord
  //. . 'Semigroupoid    ❌   ',
  //. . 'Category        ❌   ',
  //. . 'Semigroup       ✅ * ',  // if ‘a’ satisfies Semigroup
  //. . 'Monoid          ✅ * ',  // if ‘a’ satisfies Semigroup
  //. . 'Group           ❌   ',
  //. . 'Filterable      ✅   ',
  //. . 'Functor         ✅   ',
  //. . 'Bifunctor       ❌   ',
  //. . 'Profunctor      ❌   ',
  //. . 'Apply           ✅   ',
  //. . 'Applicative     ✅   ',
  //. . 'Chain           ✅   ',
  //. . 'ChainRec        ✅   ',
  //. . 'Monad           ✅   ',
  //. . 'Alt             ✅   ',
  //. . 'Plus            ✅   ',
  //. . 'Alternative     ✅   ',
  //. . 'Foldable        ✅   ',
  //. . 'Traversable     ✅   ',
  //. . 'Extend          ✅   ',
  //. . 'Comonad         ❌   ',
  //. . 'Contravariant   ❌   ' ]
  //. ```

  //# Maybe :: TypeRep Maybe
  //.
  //. Maybe [type representative][].

  //# Maybe.Nothing :: Maybe a
  //.
  //. The empty value of type `Maybe a`.
  //.
  //. ```javascript
  //. > Nothing
  //. Nothing
  //. ```
  var Nothing = Maybe.Nothing = Object.create (Nothing$prototype);

  //# Maybe.Just :: a -> Maybe a
  //.
  //. Constructs a value of type `Maybe a` from a value of type `a`.
  //.
  //. ```javascript
  //. > Just (42)
  //. Just (42)
  //. ```
  var Just = Maybe.Just = function(value) {
    var just = Object.create (Just$prototype);
    if (Z.Setoid.test (value)) {
      just['fantasy-land/equals'] = Just$prototype$equals;
      if (Z.Ord.test (value)) {
        just['fantasy-land/lte'] = Just$prototype$lte;
      }
    }
    if (Z.Semigroup.test (value)) {
      just['fantasy-land/concat'] = Just$prototype$concat;
    }
    just.value = value;
    return just;
  };

  //# Maybe.@@type :: String
  //.
  //. Maybe [type identifier][].
  //.
  //. ```javascript
  //. > type (Just (42))
  //. 'sanctuary-maybe/Maybe@1'
  //.
  //. > type.parse (type (Just (42)))
  //. {namespace: 'sanctuary-maybe', name: 'Maybe', version: 1}
  //. ```
  Maybe['@@type'] = 'sanctuary-maybe/Maybe@1';

  //# Maybe.fantasy-land/empty :: () -> Maybe a
  //.
  //.   - `empty (Maybe)` is equivalent to `Nothing`
  //.
  //. ```javascript
  //. > S.empty (Maybe)
  //. Nothing
  //. ```
  Maybe['fantasy-land/empty'] = function() { return Nothing; };

  //# Maybe.fantasy-land/of :: a -> Maybe a
  //.
  //.   - `of (Maybe) (x)` is equivalent to `Just (x)`
  //.
  //. ```javascript
  //. > S.of (Maybe) (42)
  //. Just (42)
  //. ```
  Maybe['fantasy-land/of'] = Just;

  function next(x) { return {tag: next, value: x}; }
  function done(x) { return {tag: done, value: x}; }

  //# Maybe.fantasy-land/chainRec :: ((a -> c, b -> c, a) -> Maybe c, a) -> Maybe b
  //.
  //. ```javascript
  //. > Z.chainRec (
  //. .   Maybe,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Nothing : Just (x >= 1000 ? done (x) : next (x * x)),
  //. .   1
  //. . )
  //. Nothing
  //.
  //. > Z.chainRec (
  //. .   Maybe,
  //. .   (next, done, x) =>
  //. .     x <= 1 ? Nothing : Just (x >= 1000 ? done (x) : next (x * x)),
  //. .   2
  //. . )
  //. Just (65536)
  //. ```
  Maybe['fantasy-land/chainRec'] = function(f, x) {
    var r = next (x);
    while (r.tag === next) {
      var maybe = f (next, done, r.value);
      if (maybe.isNothing) return maybe;
      r = maybe.value;
    }
    return Just (r.value);
  };

  //# Maybe.fantasy-land/zero :: () -> Maybe a
  //.
  //.   - `zero (Maybe)` is equivalent to `Nothing`
  //.
  //. ```javascript
  //. > S.zero (Maybe)
  //. Nothing
  //. ```
  Maybe['fantasy-land/zero'] = function() { return Nothing; };

  //# Maybe#@@show :: Showable a => Maybe a ~> () -> String
  //.
  //.   - `show (Nothing)` is equivalent to `'Nothing'`
  //.   - `show (Just (x))` is equivalent to `'Just (' + show (x) + ')'`
  //.
  //. ```javascript
  //. > show (Nothing)
  //. 'Nothing'
  //.
  //. > show (Just (['foo', 'bar', 'baz']))
  //. 'Just (["foo", "bar", "baz"])'
  //. ```
  function Nothing$prototype$show() {
    return 'Nothing';
  }
  function Just$prototype$show() {
    return 'Just (' + show (this.value) + ')';
  }

  //# Maybe#fantasy-land/equals :: Setoid a => Maybe a ~> Maybe a -> Boolean
  //.
  //.   - `Nothing` is equal to `Nothing`
  //.   - `Just (x)` is equal to `Just (y)` [iff][] `x` is equal to `y`
  //.     according to [`Z.equals`][]
  //.   - `Nothing` is never equal to `Just (x)`
  //.
  //. ```javascript
  //. > S.equals (Nothing) (Nothing)
  //. true
  //.
  //. > S.equals (Just ([1, 2, 3])) (Just ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Just ([1, 2, 3])) (Just ([3, 2, 1]))
  //. false
  //.
  //. > S.equals (Just ([1, 2, 3])) (Nothing)
  //. false
  //. ```
  function Nothing$prototype$equals(other) {
    return other.isNothing;
  }
  function Just$prototype$equals(other) {
    return other.isJust && Z.equals (this.value, other.value);
  }

  //# Maybe#fantasy-land/lte :: Ord a => Maybe a ~> Maybe a -> Boolean
  //.
  //.   - `Nothing` is (less than or) equal to `Nothing`
  //.   - `Just (x)` is less than or equal to `Just (y)` [iff][] `x` is less
  //.     than or equal to `y` according to [`Z.lte`][]
  //.   - `Nothing` is always less than `Just (x)`
  //.
  //. ```javascript
  //. > S.filter (S.lte (Nothing)) ([Nothing, Just (0), Just (1), Just (2)])
  //. [Nothing]
  //.
  //. > S.filter (S.lte (Just (1))) ([Nothing, Just (0), Just (1), Just (2)])
  //. [Nothing, Just (0), Just (1)]
  //. ```
  function Nothing$prototype$lte(other) {
    return true;
  }
  function Just$prototype$lte(other) {
    return other.isJust && Z.lte (this.value, other.value);
  }

  //# Maybe#fantasy-land/concat :: Semigroup a => Maybe a ~> Maybe a -> Maybe a
  //.
  //.   - `concat (Nothing) (Nothing)` is equivalent to `Nothing`
  //.   - `concat (Just (x)) (Just (y))` is equivalent to
  //.     `Just (concat (x) (y))`
  //.   - `concat (Nothing) (Just (x))` is equivalent to `Just (x)`
  //.   - `concat (Just (x)) (Nothing)` is equivalent to `Just (x)`
  //.
  //. ```javascript
  //. > S.concat (Nothing) (Nothing)
  //. Nothing
  //.
  //. > S.concat (Just ([1, 2, 3])) (Just ([4, 5, 6]))
  //. Just ([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat (Nothing) (Just ([1, 2, 3]))
  //. Just ([1, 2, 3])
  //.
  //. > S.concat (Just ([1, 2, 3])) (Nothing)
  //. Just ([1, 2, 3])
  //. ```
  function Nothing$prototype$concat(other) {
    return other;
  }
  function Just$prototype$concat(other) {
    return other.isJust ? Just (Z.concat (this.value, other.value)) : this;
  }

  //# Maybe#fantasy-land/filter :: Maybe a ~> (a -> Boolean) -> Maybe a
  //.
  //.   - `filter (p) (Nothing)` is equivalent to `Nothing`
  //.   - `filter (p) (Just (x))` is equivalent to `p (x) ? Just (x) : Nothing`
  //.
  //. ```javascript
  //. > S.filter (isFinite) (Nothing)
  //. Nothing
  //.
  //. > S.filter (isFinite) (Just (Infinity))
  //. Nothing
  //.
  //. > S.filter (isFinite) (Just (Number.MAX_SAFE_INTEGER))
  //. Just (9007199254740991)
  //. ```
  function Nothing$prototype$filter(pred) {
    return this;
  }
  function Just$prototype$filter(pred) {
    return pred (this.value) ? this : Nothing;
  }

  //# Maybe#fantasy-land/map :: Maybe a ~> (a -> b) -> Maybe b
  //.
  //.   - `map (f) (Nothing)` is equivalent to `Nothing`
  //.   - `map (f) (Just (x))` is equivalent to `Just (f (x))`
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) (Nothing)
  //. Nothing
  //.
  //. > S.map (Math.sqrt) (Just (9))
  //. Just (3)
  //. ```
  function Nothing$prototype$map(f) {
    return this;
  }
  function Just$prototype$map(f) {
    return Just (f (this.value));
  }

  //# Maybe#fantasy-land/ap :: Maybe a ~> Maybe (a -> b) -> Maybe b
  //.
  //.   - `ap (Nothing) (Nothing)` is equivalent to `Nothing`
  //.   - `ap (Nothing) (Just (x))` is equivalent to `Nothing`
  //.   - `ap (Just (f)) (Nothing)` is equivalent to `Nothing`
  //.   - `ap (Just (f)) (Just (x))` is equivalent to `Just (f (x))`
  //.
  //. ```javascript
  //. > S.ap (Nothing) (Nothing)
  //. Nothing
  //.
  //. > S.ap (Nothing) (Just (9))
  //. Nothing
  //.
  //. > S.ap (Just (Math.sqrt)) (Nothing)
  //. Nothing
  //.
  //. > S.ap (Just (Math.sqrt)) (Just (9))
  //. Just (3)
  //. ```
  function Nothing$prototype$ap(other) {
    return this;
  }
  function Just$prototype$ap(other) {
    return other.isJust ? Just (other.value (this.value)) : other;
  }

  //# Maybe#fantasy-land/chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  //.
  //.   - `chain (f) (Nothing)` is equivalent to `Nothing`
  //.   - `chain (f) (Just (x))` is equivalent to `f (x)`
  //.
  //. ```javascript
  //. > const head = xs => xs.length === 0 ? Nothing : Just (xs[0])
  //.
  //. > S.chain (head) (Nothing)
  //. Nothing
  //.
  //. > S.chain (head) (Just ([]))
  //. Nothing
  //.
  //. > S.chain (head) (Just (['foo', 'bar', 'baz']))
  //. Just ('foo')
  //. ```
  function Nothing$prototype$chain(f) {
    return this;
  }
  function Just$prototype$chain(f) {
    return f (this.value);
  }

  //# Maybe#fantasy-land/alt :: Maybe a ~> Maybe a -> Maybe a
  //.
  //.   - `alt (Nothing) (Nothing)` is equivalent to `Nothing`
  //.   - `alt (Nothing) (Just (x))` is equivalent to `Just (x)`
  //.   - `alt (Just (x)) (Nothing)` is equivalent to `Just (x)`
  //.   - `alt (Just (x)) (Just (y))` is equivalent to `Just (x)`
  //.
  //. ```javascript
  //. > S.alt (Nothing) (Nothing)
  //. Nothing
  //.
  //. > S.alt (Nothing) (Just (1))
  //. Just (1)
  //.
  //. > S.alt (Just (2)) (Nothing)
  //. Just (2)
  //.
  //. > S.alt (Just (3)) (Just (4))
  //. Just (3)
  //. ```
  function Nothing$prototype$alt(other) {
    return other;
  }
  function Just$prototype$alt(other) {
    return this;
  }

  //# Maybe#fantasy-land/reduce :: Maybe a ~> ((b, a) -> b, b) -> b
  //.
  //.   - `reduce (f) (x) (Nothing)` is equivalent to `x`
  //.   - `reduce (f) (x) (Just (y))` is equivalent to `f (x) (y)`
  //.
  //. ```javascript
  //. > S.reduce (S.concat) ('abc') (Nothing)
  //. 'abc'
  //.
  //. > S.reduce (S.concat) ('abc') (Just ('xyz'))
  //. 'abcxyz'
  //. ```
  function Nothing$prototype$reduce(f, x) {
    return x;
  }
  function Just$prototype$reduce(f, x) {
    return f (x, this.value);
  }

  //# Maybe#fantasy-land/traverse :: Applicative f => Maybe a ~> (TypeRep f, a -> f b) -> f (Maybe b)
  //.
  //.   - `traverse (A) (f) (Nothing)` is equivalent to `of (A) (Nothing)`
  //.   - `traverse (A) (f) (Just (x))` is equivalent to `map (Just) (f (x))`
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (Nothing)
  //. [Nothing]
  //.
  //. > S.traverse (Array) (S.words) (Just ('foo bar baz'))
  //. [Just ('foo'), Just ('bar'), Just ('baz')]
  //. ```
  function Nothing$prototype$traverse(typeRep, f) {
    return Z.of (typeRep, this);
  }
  function Just$prototype$traverse(typeRep, f) {
    return Z.map (Just, f (this.value));
  }

  //# Maybe#fantasy-land/extend :: Maybe a ~> (Maybe a -> b) -> Maybe b
  //.
  //.   - `extend (f) (Nothing)` is equivalent to `Nothing`
  //.   - `extend (f) (Just (x))` is equivalent to `Just (f (Just (x)))`
  //.
  //. ```javascript
  //. > S.extend (S.reduce (S.add) (1)) (Nothing)
  //. Nothing
  //.
  //. > S.extend (S.reduce (S.add) (1)) (Just (99))
  //. Just (100)
  //. ```
  function Nothing$prototype$extend(f) {
    return this;
  }
  function Just$prototype$extend(f) {
    return Just (f (this));
  }

  return Maybe;

}));

//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
});

var sanctuaryPair = createCommonjsModule(function (module) {
/*                   *\
      //                     \\
     //   @@  @@     @@  @@   \\
    //      @@       @@  @@    \\
    \\      @@       @@  @@    //
     \\   @@  @@  @    @@ @   //
      \\          /       @  //
       \*             @@@@  */

//. <a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>
//.
//. # sanctuary-pair
//.
//. Pair is the canonical product type: a value of type `Pair a b` always
//. contains exactly two values: one of type `a`; one of type `b`.

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (util,
                        sanctuaryShow,
                        sanctuaryTypeClasses$1);
  }

} (function(util, show, Z) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    var $ = __doctest.require ('sanctuary-def');
    var type = __doctest.require ('sanctuary-type-identifiers');
    var S = (function() {
      var S = __doctest.require ('sanctuary');
      var PairType = $.BinaryType
        ('sanctuary-pair/Pair')
        ('')
        (function(x) { return type (x) === Pair['@@type']; })
        (function(p) { return [p.fst]; })
        (function(p) { return [p.snd]; });
      var env = Z.concat (S.env,
                          [$.TypeClass, PairType ($.Unknown) ($.Unknown)]);
      return S.create ({checkTypes: true, env: env});
    } ());
  }

  var prototype = {
    /* eslint-disable key-spacing */
    'constructor':            Pair,
    '@@show':                 Pair$prototype$show,
    'fantasy-land/compose':   Pair$prototype$compose,
    'fantasy-land/map':       Pair$prototype$map,
    'fantasy-land/bimap':     Pair$prototype$bimap,
    'fantasy-land/reduce':    Pair$prototype$reduce,
    'fantasy-land/traverse':  Pair$prototype$traverse,
    'fantasy-land/extend':    Pair$prototype$extend,
    'fantasy-land/extract':   Pair$prototype$extract
    /* eslint-enable key-spacing */
  };

  var custom = util.inspect.custom;
  /* istanbul ignore else */
  if (typeof custom === 'symbol') {
    prototype[custom] = Pair$prototype$show;
  } else {
    prototype.inspect = Pair$prototype$show;
  }

  /* istanbul ignore else */
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    prototype[Symbol.iterator] = function() {
      return [this.fst, this.snd][Symbol.iterator] ();
    };
  }

  //. `Pair a b` satisfies the following [Fantasy Land][] specifications:
  //.
  //. ```javascript
  //. > const Useless = require ('sanctuary-useless')
  //.
  //. > S.map (k => k + ' '.repeat (16 - k.length) +
  //. .             (Z[k].test (Pair (Useless) (Useless)) ? '\u2705   ' :
  //. .              Z[k].test (Pair (['foo']) (['bar'])) ? '\u2705 * ' :
  //. .              /* otherwise */                        '\u274C   '))
  //. .       (S.keys (S.unchecked.filter (S.is ($.TypeClass)) (Z)))
  //. [ 'Setoid          ✅ * ',  // if ‘a’ and ‘b’ satisfy Setoid
  //. . 'Ord             ✅ * ',  // if ‘a’ and ‘b’ satisfy Ord
  //. . 'Semigroupoid    ✅   ',
  //. . 'Category        ❌   ',
  //. . 'Semigroup       ✅ * ',  // if ‘a’ and ‘b’ satisfy Semigroup
  //. . 'Monoid          ❌   ',
  //. . 'Group           ❌   ',
  //. . 'Filterable      ❌   ',
  //. . 'Functor         ✅   ',
  //. . 'Bifunctor       ✅   ',
  //. . 'Profunctor      ❌   ',
  //. . 'Apply           ✅ * ',  // if ‘a’ satisfies Semigroup
  //. . 'Applicative     ❌   ',
  //. . 'Chain           ✅ * ',  // if ‘a’ satisfies Semigroup
  //. . 'ChainRec        ❌   ',
  //. . 'Monad           ❌   ',
  //. . 'Alt             ❌   ',
  //. . 'Plus            ❌   ',
  //. . 'Alternative     ❌   ',
  //. . 'Foldable        ✅   ',
  //. . 'Traversable     ✅   ',
  //. . 'Extend          ✅   ',
  //. . 'Comonad         ✅   ',
  //. . 'Contravariant   ❌   ' ]
  //. ```

  //# Pair :: a -> b -> Pair a b
  //.
  //. Pair's sole data constructor. Additionally, it serves as the
  //. Pair [type representative][].
  //.
  //. ```javascript
  //. > Pair (1) (2)
  //. Pair (1) (2)
  //. ```
  function Pair(fst) {
    return function(snd) {
      var pair = Object.create (prototype);
      if (Z.Setoid.test (fst) && Z.Setoid.test (snd)) {
        pair['fantasy-land/equals'] = Pair$prototype$equals;
        if (Z.Ord.test (fst) && Z.Ord.test (snd)) {
          pair['fantasy-land/lte'] = Pair$prototype$lte;
        }
      }
      if (Z.Semigroup.test (fst)) {
        if (Z.Semigroup.test (snd)) {
          pair['fantasy-land/concat'] = Pair$prototype$concat;
        }
        pair['fantasy-land/ap'] = Pair$prototype$ap;
        pair['fantasy-land/chain'] = Pair$prototype$chain;
      }
      pair.fst = fst;
      pair.snd = snd;
      return pair;
    };
  }

  //# Pair.fst :: Pair a b -> a
  //.
  //. `fst (Pair (x) (y))` is equivalent to `x`.
  //.
  //. ```javascript
  //. > Pair.fst (Pair ('abc') ([1, 2, 3]))
  //. 'abc'
  //. ```
  Pair.fst = function(p) { return p.fst; };

  //# Pair.snd :: Pair a b -> b
  //.
  //. `snd (Pair (x) (y))` is equivalent to `y`.
  //.
  //. ```javascript
  //. > Pair.snd (Pair ('abc') ([1, 2, 3]))
  //. [1, 2, 3]
  //. ```
  Pair.snd = function(p) { return p.snd; };

  //# Pair.swap :: Pair a b -> Pair b a
  //.
  //. `swap (Pair (x) (y))` is equivalent to `Pair (y) (x)`.
  //.
  //. ```javascript
  //. > Pair.swap (Pair ('abc') ([1, 2, 3]))
  //. Pair ([1, 2, 3]) ('abc')
  //. ```
  Pair.swap = function(p) { return Pair (p.snd) (p.fst); };

  //# Pair.@@type :: String
  //.
  //. Pair [type identifier][].
  //.
  //. ```javascript
  //. > type (Pair ('abc') ([1, 2, 3]))
  //. 'sanctuary-pair/Pair@1'
  //.
  //. > type.parse (type (Pair ('abc') ([1, 2, 3])))
  //. {namespace: 'sanctuary-pair', name: 'Pair', version: 1}
  //. ```
  Pair['@@type'] = 'sanctuary-pair/Pair@1';

  //# Pair#@@show :: (Showable a, Showable b) => Pair a b ~> () -> String
  //.
  //. `show (Pair (x) (y))` is equivalent to
  //. `'Pair (' + show (x) + ') (' + show (y) + ')'`.
  //.
  //. ```javascript
  //. > show (Pair ('abc') ([1, 2, 3]))
  //. 'Pair ("abc") ([1, 2, 3])'
  //. ```
  function Pair$prototype$show() {
    return 'Pair (' + show (this.fst) + ') (' + show (this.snd) + ')';
  }

  //# Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. `Pair (x) (y)` is equal to `Pair (v) (w)` [iff][] `x` is equal to `v`
  //. and `y` is equal to `w` according to [`Z.equals`][].
  //.
  //. ```javascript
  //. > S.equals (Pair ('abc') ([1, 2, 3])) (Pair ('abc') ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (Pair ('abc') ([1, 2, 3])) (Pair ('abc') ([3, 2, 1]))
  //. false
  //. ```
  function Pair$prototype$equals(other) {
    return Z.equals (this.fst, other.fst) && Z.equals (this.snd, other.snd);
  }

  //# Pair#fantasy-land/lte :: (Ord a, Ord b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. `Pair (x) (y)` is less than or equal to `Pair (v) (w)` [iff][] `x` is
  //. less than `v` or `x` is equal to `v` and `y` is less than or equal to
  //. `w` according to [`Z.lte`][].
  //.
  //. ```javascript
  //. > S.filter (S.lte (Pair ('b') (2)))
  //. .          ([Pair ('a') (1), Pair ('a') (2), Pair ('a') (3),
  //. .            Pair ('b') (1), Pair ('b') (2), Pair ('b') (3),
  //. .            Pair ('c') (1), Pair ('c') (2), Pair ('c') (3)])
  //. [ Pair ('a') (1),
  //. . Pair ('a') (2),
  //. . Pair ('a') (3),
  //. . Pair ('b') (1),
  //. . Pair ('b') (2) ]
  //. ```
  function Pair$prototype$lte(other) {
    return Z.equals (this.fst, other.fst) ? Z.lte (this.snd, other.snd)
                                          : Z.lte (this.fst, other.fst);
  }

  //# Pair#fantasy-land/compose :: Pair a b ~> Pair b c -> Pair a c
  //.
  //. `compose (Pair (x) (y)) (Pair (v) (w))` is equivalent to `Pair (v) (y)`.
  //.
  //. ```javascript
  //. > S.compose (Pair ('a') (0)) (Pair ([1, 2, 3]) ('b'))
  //. Pair ([1, 2, 3]) (0)
  //. ```
  function Pair$prototype$compose(other) {
    return Pair (this.fst) (other.snd);
  }

  //# Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -> Pair a b
  //.
  //. `concat (Pair (x) (y)) (Pair (v) (w))` is equivalent to
  //. `Pair (concat (x) (v)) (concat (y) (w))`.
  //.
  //. ```javascript
  //. > S.concat (Pair ('abc') ([1, 2, 3])) (Pair ('xyz') ([4, 5, 6]))
  //. Pair ('abcxyz') ([1, 2, 3, 4, 5, 6])
  //. ```
  function Pair$prototype$concat(other) {
    return Pair (Z.concat (this.fst, other.fst))
                (Z.concat (this.snd, other.snd));
  }

  //# Pair#fantasy-land/map :: Pair a b ~> (b -> c) -> Pair a c
  //.
  //. `map (f) (Pair (x) (y))` is equivalent to `Pair (x) (f (y))`.
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) (Pair ('abc') (256))
  //. Pair ('abc') (16)
  //. ```
  function Pair$prototype$map(f) {
    return Pair (this.fst) (f (this.snd));
  }

  //# Pair#fantasy-land/bimap :: Pair a c ~> (a -> b, c -> d) -> Pair b d
  //.
  //. `bimap (f) (g) (Pair (x) (y))` is equivalent to `Pair (f (x)) (g (y))`.
  //.
  //. ```javascript
  //. > S.bimap (S.toUpper) (Math.sqrt) (Pair ('abc') (256))
  //. Pair ('ABC') (16)
  //. ```
  function Pair$prototype$bimap(f, g) {
    return Pair (f (this.fst)) (g (this.snd));
  }

  //# Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -> c) -> Pair a c
  //.
  //. `ap (Pair (v) (f)) (Pair (x) (y))` is equivalent to
  //. `Pair (concat (v) (x)) (f (y))`.
  //.
  //. ```javascript
  //. > S.ap (Pair ('abc') (Math.sqrt)) (Pair ('xyz') (256))
  //. Pair ('abcxyz') (16)
  //. ```
  function Pair$prototype$ap(other) {
    return Pair (Z.concat (other.fst, this.fst)) (other.snd (this.snd));
  }

  //# Pair#fantasy-land/chain :: Semigroup a => Pair a b ~> (b -> Pair a c) -> Pair a c
  //.
  //. `chain (f) (Pair (x) (y))` is equivalent to
  //. `Pair (concat (x) (fst (f (y)))) (snd (f (y)))`.
  //.
  //. ```javascript
  //. > S.chain (n => Pair (show (n)) (Math.sqrt (n))) (Pair ('abc') (256))
  //. Pair ('abc256') (16)
  //. ```
  function Pair$prototype$chain(f) {
    var other = f (this.snd);
    return Pair (Z.concat (this.fst, other.fst)) (other.snd);
  }

  //# Pair#fantasy-land/reduce :: Pair a b ~> ((c, b) -> c, c) -> c
  //.
  //. `reduce (f) (x) (Pair (v) (w))` is equivalent to `f (x) (w)`.
  //.
  //. ```javascript
  //. > S.reduce (S.concat) ([1, 2, 3]) (Pair ('abc') ([4, 5, 6]))
  //. [1, 2, 3, 4, 5, 6]
  //. ```
  function Pair$prototype$reduce(f, x) {
    return f (x, this.snd);
  }

  //# Pair#fantasy-land/traverse :: Applicative f => Pair a b ~> (TypeRep f, b -> f c) -> f (Pair a c)
  //.
  //. `traverse (_) (f) (Pair (x) (y))` is equivalent to
  //. `map (Pair (x)) (f (y))`.
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (Pair (123) ('foo bar baz'))
  //. [Pair (123) ('foo'), Pair (123) ('bar'), Pair (123) ('baz')]
  //. ```
  function Pair$prototype$traverse(typeRep, f) {
    return Z.map (Pair (this.fst), f (this.snd));
  }

  //# Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -> c) -> Pair a c
  //.
  //. `extend (f) (Pair (x) (y))` is equivalent to
  //. `Pair (x) (f (Pair (x) (y)))`.
  //.
  //. ```javascript
  //. > S.extend (S.reduce (S.add) (1)) (Pair ('abc') (99))
  //. Pair ('abc') (100)
  //. ```
  function Pair$prototype$extend(f) {
    return Pair (this.fst) (f (this));
  }

  //# Pair#fantasy-land/extract :: Pair a b ~> () -> b
  //.
  //. `extract (Pair (x) (y))` is equivalent to `y`.
  //.
  //. ```javascript
  //. > S.extract (Pair ('abc') ([1, 2, 3]))
  //. [1, 2, 3]
  //. ```
  function Pair$prototype$extract() {
    return this.snd;
  }

  return Pair;

}));

//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
});

var sanctuary = createCommonjsModule(function (module) {
/*    #######
   ####     ####
 ####   ###   ####
#####   ###########   sanctuary
########   ########   noun
###########   #####   1 [ mass noun ] refuge from unsafe JavaScript
 ####   ###   ####
   ####     ####
      #######    */

//. # Sanctuary
//.
//. [![npm](https://img.shields.io/npm/v/sanctuary.svg)](https://www.npmjs.com/package/sanctuary)
//. [![CircleCI](https://img.shields.io/circleci/project/github/sanctuary-js/sanctuary/master.svg)](https://circleci.com/gh/sanctuary-js/sanctuary/tree/master)
//. [![Gitter](https://img.shields.io/gitter/room/badges/shields.svg)](https://gitter.im/sanctuary-js/sanctuary)
//.
//. Sanctuary is a JavaScript functional programming library inspired by
//. [Haskell][] and [PureScript][]. It's stricter than [Ramda][], and
//. provides a similar suite of functions.
//.
//. Sanctuary promotes programs composed of simple, pure functions. Such
//. programs are easier to comprehend, test, and maintain &ndash; they are
//. also a pleasure to write.
//.
//. Sanctuary provides two data types, [Maybe][] and [Either][], both of
//. which are compatible with [Fantasy Land][]. Thanks to these data types
//. even Sanctuary functions that may fail, such as [`head`](#head), are
//. composable.
//.
//. Sanctuary makes it possible to write safe code without null checks.
//. In JavaScript it's trivial to introduce a possible run-time type error:
//.
//.     words[0].toUpperCase()
//.
//. If `words` is `[]` we'll get a familiar error at run-time:
//.
//.     TypeError: Cannot read property 'toUpperCase' of undefined
//.
//. Sanctuary gives us a fighting chance of avoiding such errors. We might
//. write:
//.
//.     S.map (S.toUpper) (S.head (words))
//.
//. Sanctuary is designed to work in Node.js and in ES5-compatible browsers.
//.
//. ## Folktale
//.
//. [Folktale][], like Sanctuary, is a standard library for functional
//. programming in JavaScript. It is well designed and well documented.
//. Whereas Sanctuary treats JavaScript as a member of the ML language
//. family, Folktale embraces JavaScript's object-oriented programming
//. model. Programming with Folktale resembles programming with Scala.
//.
//. ## Ramda
//.
//. [Ramda][] provides several functions that return problematic values
//. such as `undefined`, `Infinity`, or `NaN` when applied to unsuitable
//. inputs. These are known as [partial functions][]. Partial functions
//. necessitate the use of guards or null checks. In order to safely use
//. `R.head`, for example, one must ensure that the array is non-empty:
//.
//.     if (R.isEmpty (xs)) {
//.       // ...
//.     } else {
//.       return f (R.head (xs));
//.     }
//.
//. Using the Maybe type renders such guards (and null checks) unnecessary.
//. Changing functions such as `R.head` to return Maybe values was proposed
//. in [ramda/ramda#683][], but was considered too much of a stretch for
//. JavaScript programmers. Sanctuary was released the following month,
//. in January 2015, as a companion library to Ramda.
//.
//. In addition to broadening in scope in the years since its release,
//. Sanctuary's philosophy has diverged from Ramda's in several respects.
//.
//. ### Totality
//.
//. Every Sanctuary function is defined for every value that is a member of
//. the function's input type. Such functions are known as [total functions][].
//. Ramda, on the other hand, contains a number of [partial functions][].
//.
//. ### Information preservation
//.
//. Certain Sanctuary functions preserve more information than their Ramda
//. counterparts. Examples:
//.
//.     |> R.tail ([])                      |> S.tail ([])
//.     []                                  Nothing
//.
//.     |> R.tail (['foo'])                 |> S.tail (['foo'])
//.     []                                  Just ([])
//.
//.     |> R.replace (/^x/) ('') ('abc')    |> S.stripPrefix ('x') ('abc')
//.     'abc'                               Nothing
//.
//.     |> R.replace (/^x/) ('') ('xabc')   |> S.stripPrefix ('x') ('xabc')
//.     'abc'                               Just ('abc')
//.
//. ### Invariants
//.
//. Sanctuary performs rigorous [type checking][] of inputs and outputs, and
//. throws a descriptive error if a type error is encountered. This allows bugs
//. to be caught and fixed early in the development cycle.
//.
//. Ramda operates on the [garbage in, garbage out][GIGO] principle. Functions
//. are documented to take arguments of particular types, but these invariants
//. are not enforced. The problem with this approach in a language as
//. permissive as JavaScript is that there's no guarantee that garbage input
//. will produce garbage output ([ramda/ramda#1413][]). Ramda performs ad hoc
//. type checking in some such cases ([ramda/ramda#1419][]).
//.
//. Sanctuary can be configured to operate in garbage in, garbage out mode.
//. Ramda cannot be configured to enforce its invariants.
//.
//. ### Currying
//.
//. Sanctuary functions are curried. There is, for example, exactly one way to
//. apply `S.reduce` to `S.add`, `0`, and `xs`:
//.
//.   - `S.reduce (S.add) (0) (xs)`
//.
//. Ramda functions are also curried, but in a complex manner. There are four
//. ways to apply `R.reduce` to `R.add`, `0`, and `xs`:
//.
//.   - `R.reduce (R.add) (0) (xs)`
//.   - `R.reduce (R.add) (0, xs)`
//.   - `R.reduce (R.add, 0) (xs)`
//.   - `R.reduce (R.add, 0, xs)`
//.
//. Ramda supports all these forms because curried functions enable partial
//. application, one of the library's tenets, but `f(x)(y)(z)` is considered
//. too unfamiliar and too unattractive to appeal to JavaScript programmers.
//.
//. Sanctuary's developers prefer a simple, unfamiliar construct to a complex,
//. familiar one. Familiarity can be acquired; complexity is intrinsic.
//.
//. The lack of breathing room in `f(x)(y)(z)` impairs readability. The simple
//. solution to this problem, proposed in [#438][], is to include a space when
//. applying a function: `f (x) (y) (z)`.
//.
//. Ramda also provides a special placeholder value, [`R.__`][], that removes
//. the restriction that a function must be applied to its arguments in order.
//. The following expressions are equivalent:
//.
//.   - `R.reduce (R.__, 0, xs) (R.add)`
//.   - `R.reduce (R.add, R.__, xs) (0)`
//.   - `R.reduce (R.__, 0) (R.add) (xs)`
//.   - `R.reduce (R.__, 0) (R.add, xs)`
//.   - `R.reduce (R.__, R.__, xs) (R.add) (0)`
//.   - `R.reduce (R.__, R.__, xs) (R.add, 0)`
//.
//. ### Variadic functions
//.
//. Ramda provides several functions that take any number of arguments. These
//. are known as [variadic functions][]. Additionally, Ramda provides several
//. functions that take variadic functions as arguments. Although natural in
//. a dynamically typed language, variadic functions are at odds with the type
//. notation Ramda and Sanctuary both use, leading to some indecipherable type
//. signatures such as this one:
//.
//.     R.lift :: (*... -> *...) -> ([*]... -> [*])
//.
//. Sanctuary has no variadic functions, nor any functions that take variadic
//. functions as arguments. Sanctuary provides two "lift" functions, each with
//. a helpful type signature:
//.
//.     S.lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
//.     S.lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
//.
//. ### Implicit context
//.
//. Ramda provides [`R.bind`][] and [`R.invoker`][] for working with methods.
//. Additionally, many Ramda functions use `Function#call` or `Function#apply`
//. to preserve context. Sanctuary makes no allowances for `this`.
//.
//. ### Transducers
//.
//. Several Ramda functions act as transducers. Sanctuary provides no support
//. for transducers.
//.
//. ### Modularity
//.
//. Whereas Ramda has no dependencies, Sanctuary has a modular design:
//. [sanctuary-def][] provides type checking, [sanctuary-type-classes][]
//. provides Fantasy Land functions and type classes, [sanctuary-show][]
//. provides string representations, and algebraic data types are provided
//. by [sanctuary-either][], [sanctuary-maybe][], and [sanctuary-pair][].
//. Not only does this approach reduce the complexity of Sanctuary itself,
//. but it allows these components to be reused in other contexts.
//.
//. ## Types
//.
//. Sanctuary uses Haskell-like type signatures to describe the types of
//. values, including functions. `'foo'`, for example, is a member of `String`;
//. `[1, 2, 3]` is a member of `Array Number`. The double colon (`::`) is used
//. to mean "is a member of", so one could write:
//.
//.     'foo' :: String
//.     [1, 2, 3] :: Array Number
//.
//. An identifier may appear to the left of the double colon:
//.
//.     Math.PI :: Number
//.
//. The arrow (`->`) is used to express a function's type:
//.
//.     Math.abs :: Number -> Number
//.
//. That states that `Math.abs` is a unary function that takes an argument
//. of type `Number` and returns a value of type `Number`.
//.
//. Some functions are parametrically polymorphic: their types are not fixed.
//. Type variables are used in the representations of such functions:
//.
//.     S.I :: a -> a
//.
//. `a` is a type variable. Type variables are not capitalized, so they
//. are differentiable from type identifiers (which are always capitalized).
//. By convention type variables have single-character names. The signature
//. above states that `S.I` takes a value of any type and returns a value of
//. the same type. Some signatures feature multiple type variables:
//.
//.     S.K :: a -> b -> a
//.
//. It must be possible to replace all occurrences of `a` with a concrete type.
//. The same applies for each other type variable. For the function above, the
//. types with which `a` and `b` are replaced may be different, but needn't be.
//.
//. Since all Sanctuary functions are curried (they accept their arguments
//. one at a time), a binary function is represented as a unary function that
//. returns a unary function: `* -> * -> *`. This aligns neatly with Haskell,
//. which uses curried functions exclusively. In JavaScript, though, we may
//. wish to represent the types of functions with arities less than or greater
//. than one. The general form is `(<input-types>) -> <output-type>`, where
//. `<input-types>` comprises zero or more comma–space (<code>, </code>)
//. -separated type representations:
//.
//.   - `() -> String`
//.   - `(a, b) -> a`
//.   - `(a, b, c) -> d`
//.
//. `Number -> Number` can thus be seen as shorthand for `(Number) -> Number`.
//.
//. Sanctuary embraces types. JavaScript doesn't support algebraic data types,
//. but these can be simulated by providing a group of data constructors that
//. return values with the same set of methods. A value of the Either type, for
//. example, is created via the Left constructor or the Right constructor.
//.
//. It's necessary to extend Haskell's notation to describe implicit arguments
//. to the *methods* provided by Sanctuary's types. In `x.map(y)`, for example,
//. the `map` method takes an implicit argument `x` in addition to the explicit
//. argument `y`. The type of the value upon which a method is invoked appears
//. at the beginning of the signature, separated from the arguments and return
//. value by a squiggly arrow (`~>`). The type of the `fantasy-land/map` method
//. of the Maybe type is written `Maybe a ~> (a -> b) -> Maybe b`. One could
//. read this as:
//.
//. _When the `fantasy-land/map` method is invoked on a value of type `Maybe a`
//. (for any type `a`) with an argument of type `a -> b` (for any type `b`),
//. it returns a value of type `Maybe b`._
//.
//. The squiggly arrow is also used when representing non-function properties.
//. `Maybe a ~> Boolean`, for example, represents a Boolean property of a value
//. of type `Maybe a`.
//.
//. Sanctuary supports type classes: constraints on type variables. Whereas
//. `a -> a` implicitly supports every type, `Functor f => (a -> b) -> f a ->
//. f b` requires that `f` be a type that satisfies the requirements of the
//. Functor type class. Type-class constraints appear at the beginning of a
//. type signature, separated from the rest of the signature by a fat arrow
//. (`=>`).
//.
//. ## Type checking
//.
//. Sanctuary functions are defined via [sanctuary-def][] to provide run-time
//. type checking. This is tremendously useful during development: type errors
//. are reported immediately, avoiding circuitous stack traces (at best) and
//. silent failures due to type coercion (at worst). For example:
//.
//. ```javascript
//. S.add (2) (true);
//. // ! TypeError: Invalid value
//. //
//. //   add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//. //                          ^^^^^^^^^^^^
//. //                               1
//. //
//. //   1)  true :: Boolean
//. //
//. //   The value at position 1 is not a member of ‘FiniteNumber’.
//. //
//. //   See v:sanctuary-js/sanctuary-def#FiniteNumber for information about the FiniteNumber type.
//. ```
//.
//. Compare this to the behaviour of Ramda's unchecked equivalent:
//.
//. ```javascript
//. R.add (2) (true);
//. // => 3
//. ```
//.
//. There is a performance cost to run-time type checking. Type checking is
//. disabled by default if `process.env.NODE_ENV` is `'production'`. If this
//. rule is unsuitable for a given program, one may use [`create`](#create)
//. to create a Sanctuary module based on a different rule. For example:
//.
//. ```javascript
//. const S = sanctuary.create ({
//.   checkTypes: localStorage.getItem ('SANCTUARY_CHECK_TYPES') === 'true',
//.   env: sanctuary.env,
//. });
//. ```
//.
//. Occasionally one may wish to perform an operation that is not type safe,
//. such as mapping over an object with heterogeneous values. This is possible
//. via selective use of [`unchecked`](#unchecked) functions.
//.
//. ## Installation
//.
//. `npm install sanctuary` will install Sanctuary for use in Node.js.
//.
//. Running Sanctuary in the browser is more involved. One must include a
//. `<script>` for each dependency in addition to one for Sanctuary itself:
//.
//. ```html
//. <script src="vendor/sanctuary-show.js"></script>
//. <script src="vendor/sanctuary-type-identifiers.js"></script>
//. <script src="vendor/sanctuary-type-classes.js"></script>
//. <script src="vendor/sanctuary-either.js"></script>
//. <script src="vendor/sanctuary-maybe.js"></script>
//. <script src="vendor/sanctuary-pair.js"></script>
//. <script src="vendor/sanctuary-def.js"></script>
//. <script src="vendor/sanctuary.js"></script>
//. ```
//.
//. To ensure compatibility one should use the dependency versions specified
//. in __package.json__.
//.
//. For convenience one could define aliases for various modules:
//.
//. ```javascript
//. const S = window.sanctuary;
//. const $ = window.sanctuaryDef;
//. // ...
//. ```
//.
//. ## API

(function(f) {

  /* istanbul ignore else */
  {
    module.exports = f (sanctuaryDef,
                        sanctuaryEither$1,
                        sanctuaryMaybe,
                        sanctuaryPair,
                        sanctuaryShow,
                        sanctuaryTypeClasses$1,
                        sanctuaryTypeIdentifiers);
  }

} (function($, Either, Maybe, Pair, show, Z, type) {

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    /* eslint-disable no-unused-vars */
    var Descending = __doctest.require ('sanctuary-descending');
    var Nil = (__doctest.require ('./test/internal/List')).Nil;
    var Cons = (__doctest.require ('./test/internal/List')).Cons;
    var Sum = __doctest.require ('./test/internal/Sum');
    var S = (function(S) {
      var S_ = S.create ({
        checkTypes: true,
        env: S.env.concat ([
          (__doctest.require ('./test/internal/List')).Type ($.Unknown),
          Sum.Type
        ])
      });
      S_.env = S.env;  // see S.env doctest
      return S_;
    } (sanctuary));
    /* eslint-enable no-unused-vars */
  }

  //  Left :: a -> Either a b
  var Left = Either.Left;

  //  Right :: b -> Either a b
  var Right = Either.Right;

  //  Nothing :: Maybe a
  var Nothing = Maybe.Nothing;

  //  Just :: a -> Maybe a
  var Just = Maybe.Just;

  //  B :: (b -> c) -> (a -> b) -> a -> c
  function B(f) {
    return function(g) {
      return function(x) {
        return f (g (x));
      };
    };
  }

  //  C :: (a -> b -> c) -> b -> a -> c
  function C(f) {
    return function(y) {
      return function(x) {
        return f (x) (y);
      };
    };
  }

  //  get_ :: String -> a -> Maybe b
  function get_(key) {
    return B (function(obj) { return key in obj ? Just (obj[key]) : Nothing; })
             (toObject);
  }

  //  invoke0 :: String -> a -> b
  function invoke0(name) {
    return function(target) {
      return target[name] ();
    };
  }

  //  invoke1 :: String -> a -> b -> c
  function invoke1(name) {
    return function(x) {
      return function(target) {
        return target[name] (x);
      };
    };
  }

  //  toObject :: a -> Object
  function toObject(x) {
    return x == null ? Object.create (null) : Object (x);
  }

  //  :: Type
  var a = $.TypeVariable ('a');
  var b = $.TypeVariable ('b');
  var c = $.TypeVariable ('c');
  var d = $.TypeVariable ('d');
  var e = $.TypeVariable ('e');
  var g = $.TypeVariable ('g');
  var r = $.TypeVariable ('r');

  //  :: Type -> Type
  var f = $.UnaryTypeVariable ('f');
  var m = $.UnaryTypeVariable ('m');
  var t = $.UnaryTypeVariable ('t');
  var w = $.UnaryTypeVariable ('w');

  //  :: Type -> Type -> Type
  var p = $.BinaryTypeVariable ('p');
  var s = $.BinaryTypeVariable ('s');

  //  TypeRep :: Type -> Type
  var TypeRep = $.UnaryType
    ('TypeRep')
    ('https://github.com/fantasyland/fantasy-land#type-representatives')
    ([])
    (function(x) {
       return $.test ([]) ($.AnyFunction) (x) ||
              x != null && $.test ([]) ($.String) (x['@@type']);
     })
    (K ([]));

  //  Options :: Type
  var Options = $.RecordType ({checkTypes: $.Boolean, env: $.Array ($.Any)});

  var _ = {};

  //. ### Configure

  //# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
  //.
  //. Takes an options record and returns a Sanctuary module. `checkTypes`
  //. specifies whether to enable type checking. The module's polymorphic
  //. functions (such as [`I`](#I)) require each value associated with a
  //. type variable to be a member of at least one type in the environment.
  //.
  //. A well-typed application of a Sanctuary function will produce the same
  //. result regardless of whether type checking is enabled. If type checking
  //. is enabled, a badly typed application will produce an exception with a
  //. descriptive error message.
  //.
  //. The following snippet demonstrates defining a custom type and using
  //. `create` to produce a Sanctuary module that is aware of that type:
  //.
  //. ```javascript
  //. const {create, env} = require ('sanctuary');
  //. const $ = require ('sanctuary-def');
  //. const type = require ('sanctuary-type-identifiers');
  //.
  //. //    Identity :: a -> Identity a
  //. const Identity = x => {
  //.   const identity = Object.create (Identity$prototype);
  //.   identity.value = x;
  //.   return identity;
  //. };
  //.
  //. Identity['@@type'] = 'my-package/Identity@1';
  //.
  //. const Identity$prototype = {
  //.   'constructor': Identity,
  //.   '@@show': function() { return `Identity (${S.show (this.value)})`; },
  //.   'fantasy-land/map': function(f) { return Identity (f (this.value)); },
  //. };
  //.
  //. //    IdentityType :: Type -> Type
  //. const IdentityType = $.UnaryType
  //.   ('Identity')
  //.   ('http://example.com/my-package#Identity')
  //.   ([])
  //.   (x => type (x) === Identity['@@type'])
  //.   (identity => [identity.value]);
  //.
  //. const S = create ({
  //.   checkTypes: process.env.NODE_ENV !== 'production',
  //.   env: env.concat ([IdentityType ($.Unknown)]),
  //. });
  //.
  //. S.map (S.sub (1)) (Identity (43));
  //. // => Identity (42)
  //. ```
  //.
  //. See also [`env`](#env).
  function create(opts) {
    var def = $.create (opts);
    var S = {
      env: opts.env,
      is: def ('is') ({}) ([$.Type, $.Any, $.Boolean]) ($.test (opts.env)),
      Maybe: Maybe,
      Nothing: Nothing,
      Either: Either
    };
    (Object.keys (_)).forEach (function(name) {
      S[name] = def (name) (_[name].consts) (_[name].types) (_[name].impl);
    });
    S.unchecked = opts.checkTypes ? create ({checkTypes: false, env: opts.env})
                                  : S;
    return S;
  }
  _.create = {
    consts: {},
    types: [Options, $.Object],
    impl: create
  };

  //# env :: Array Type
  //.
  //. The Sanctuary module's environment (`(S.create ({checkTypes, env})).env`
  //. is a reference to `env`). Useful in conjunction with [`create`](#create).
  //.
  //. ```javascript
  //. > S.env
  //. [ $.AnyFunction,
  //. . $.Arguments,
  //. . $.Array ($.Unknown),
  //. . $.Array2 ($.Unknown) ($.Unknown),
  //. . $.Boolean,
  //. . $.Date,
  //. . $.Descending ($.Unknown),
  //. . $.Either ($.Unknown) ($.Unknown),
  //. . $.Error,
  //. . $.Fn ($.Unknown) ($.Unknown),
  //. . $.HtmlElement,
  //. . $.Identity ($.Unknown),
  //. . $.Maybe ($.Unknown),
  //. . $.Null,
  //. . $.Number,
  //. . $.Object,
  //. . $.Pair ($.Unknown) ($.Unknown),
  //. . $.RegExp,
  //. . $.StrMap ($.Unknown),
  //. . $.String,
  //. . $.Symbol,
  //. . $.Type,
  //. . $.TypeClass,
  //. . $.Undefined ]
  //. ```

  //# unchecked :: Module
  //.
  //. A complete Sanctuary module that performs no type checking. This is
  //. useful as it permits operations that Sanctuary's type checking would
  //. disallow, such as mapping over an object with heterogeneous values.
  //.
  //. See also [`create`](#create).
  //.
  //. ```javascript
  //. > S.unchecked.map (S.show) ({x: 'foo', y: true, z: 42})
  //. {x: '"foo"', y: 'true', z: '42'}
  //. ```
  //.
  //. Opting out of type checking may cause type errors to go unnoticed.
  //.
  //. ```javascript
  //. > S.unchecked.add (2) ('2')
  //. '22'
  //. ```

  //. ### Classify

  //# type :: Any -> { namespace :: Maybe String, name :: String, version :: NonNegativeInteger }
  //.
  //. Returns the result of parsing the [type identifier][] of the given value.
  //.
  //. ```javascript
  //. > S.type (S.Just (42))
  //. {namespace: Just ('sanctuary-maybe'), name: 'Maybe', version: 1}
  //.
  //. > S.type ([1, 2, 3])
  //. {namespace: Nothing, name: 'Array', version: 0}
  //. ```
  function type_(x) {
    var r = type.parse (type (x));
    r.namespace = Z.reject (equals (null), Just (r.namespace));
    return r;
  }
  _.type = {
    consts: {},
    types: [$.Any,
            $.RecordType ({namespace: $.Maybe ($.String),
                           name: $.String,
                           version: $.NonNegativeInteger})],
    impl: type_
  };

  //# is :: Type -> Any -> Boolean
  //.
  //. Returns `true` [iff][] the given value is a member of the specified type.
  //. See [`$.test`][] for details.
  //.
  //. ```javascript
  //. > S.is ($.Array ($.Integer)) ([1, 2, 3])
  //. true
  //.
  //. > S.is ($.Array ($.Integer)) ([1, 2, 3.14])
  //. false
  //. ```

  //. ### Showable

  //# show :: Any -> String
  //.
  //. Alias of [`show`][].
  //.
  //. ```javascript
  //. > S.show (-0)
  //. '-0'
  //.
  //. > S.show (['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > S.show ({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > S.show (S.Left (S.Right (S.Just (S.Nothing))))
  //. 'Left (Right (Just (Nothing)))'
  //. ```
  _.show = {
    consts: {},
    types: [$.Any, $.String],
    impl: show
  };

  //. ### Fantasy Land
  //.
  //. Sanctuary is compatible with the [Fantasy Land][] specification.

  //# equals :: Setoid a => a -> a -> Boolean
  //.
  //. Curried version of [`Z.equals`][] that requires two arguments of the
  //. same type.
  //.
  //. To compare values of different types first use [`create`](#create) to
  //. create a Sanctuary module with type checking disabled, then use that
  //. module's `equals` function.
  //.
  //. ```javascript
  //. > S.equals (0) (-0)
  //. true
  //.
  //. > S.equals (NaN) (NaN)
  //. true
  //.
  //. > S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 4]))
  //. false
  //. ```
  function equals(x) {
    return function(y) {
      return Z.equals (x, y);
    };
  }
  _.equals = {
    consts: {a: [Z.Setoid]},
    types: [a, a, $.Boolean],
    impl: equals
  };

  //# lt :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is less than the first
  //. according to [`Z.lt`][].
  //.
  //. ```javascript
  //. > S.filter (S.lt (3)) ([1, 2, 3, 4, 5])
  //. [1, 2]
  //. ```
  function lt(y) {
    return function(x) {
      return Z.lt (x, y);
    };
  }
  _.lt = {
    consts: {a: [Z.Ord]},
    types: [a, a, $.Boolean],
    impl: lt
  };

  //# lte :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is less than or equal to
  //. the first according to [`Z.lte`][].
  //.
  //. ```javascript
  //. > S.filter (S.lte (3)) ([1, 2, 3, 4, 5])
  //. [1, 2, 3]
  //. ```
  function lte(y) {
    return function(x) {
      return Z.lte (x, y);
    };
  }
  _.lte = {
    consts: {a: [Z.Ord]},
    types: [a, a, $.Boolean],
    impl: lte
  };

  //# gt :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is greater than the first
  //. according to [`Z.gt`][].
  //.
  //. ```javascript
  //. > S.filter (S.gt (3)) ([1, 2, 3, 4, 5])
  //. [4, 5]
  //. ```
  function gt(y) {
    return function(x) {
      return Z.gt (x, y);
    };
  }
  _.gt = {
    consts: {a: [Z.Ord]},
    types: [a, a, $.Boolean],
    impl: gt
  };

  //# gte :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is greater than or equal
  //. to the first according to [`Z.gte`][].
  //.
  //. ```javascript
  //. > S.filter (S.gte (3)) ([1, 2, 3, 4, 5])
  //. [3, 4, 5]
  //. ```
  function gte(y) {
    return function(x) {
      return Z.gte (x, y);
    };
  }
  _.gte = {
    consts: {a: [Z.Ord]},
    types: [a, a, $.Boolean],
    impl: gte
  };

  //# min :: Ord a => a -> a -> a
  //.
  //. Returns the smaller of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > S.min (10) (2)
  //. 2
  //.
  //. > S.min (new Date ('1999-12-31')) (new Date ('2000-01-01'))
  //. new Date ('1999-12-31')
  //.
  //. > S.min ('10') ('2')
  //. '10'
  //. ```
  _.min = {
    consts: {a: [Z.Ord]},
    types: [a, a, a],
    impl: curry2 (Z.min)
  };

  //# max :: Ord a => a -> a -> a
  //.
  //. Returns the larger of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > S.max (10) (2)
  //. 10
  //.
  //. > S.max (new Date ('1999-12-31')) (new Date ('2000-01-01'))
  //. new Date ('2000-01-01')
  //.
  //. > S.max ('10') ('2')
  //. '2'
  //. ```
  _.max = {
    consts: {a: [Z.Ord]},
    types: [a, a, a],
    impl: curry2 (Z.max)
  };

  //# clamp :: Ord a => a -> a -> a -> a
  //.
  //. Takes a lower bound, an upper bound, and a value of the same type.
  //. Returns the value if it is within the bounds; the nearer bound otherwise.
  //.
  //. See also [`min`](#min) and [`max`](#max).
  //.
  //. ```javascript
  //. > S.clamp (0) (100) (42)
  //. 42
  //.
  //. > S.clamp (0) (100) (-1)
  //. 0
  //.
  //. > S.clamp ('A') ('Z') ('~')
  //. 'Z'
  //. ```
  _.clamp = {
    consts: {a: [Z.Ord]},
    types: [a, a, a, a],
    impl: curry3 (Z.clamp)
  };

  //# id :: Category c => TypeRep c -> c
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.id`][].
  //.
  //. ```javascript
  //. > S.id (Function) (42)
  //. 42
  //. ```
  _.id = {
    consts: {c: [Z.Category]},
    types: [TypeRep (c), c],
    impl: Z.id
  };

  //# concat :: Semigroup a => a -> a -> a
  //.
  //. Curried version of [`Z.concat`][].
  //.
  //. ```javascript
  //. > S.concat ('abc') ('def')
  //. 'abcdef'
  //.
  //. > S.concat ([1, 2, 3]) ([4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > S.concat ({x: 1, y: 2}) ({y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > S.concat (S.Just ([1, 2, 3])) (S.Just ([4, 5, 6]))
  //. Just ([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat (Sum (18)) (Sum (24))
  //. Sum (42)
  //. ```
  _.concat = {
    consts: {a: [Z.Semigroup]},
    types: [a, a, a],
    impl: curry2 (Z.concat)
  };

  //# empty :: Monoid a => TypeRep a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.empty`][].
  //.
  //. ```javascript
  //. > S.empty (String)
  //. ''
  //.
  //. > S.empty (Array)
  //. []
  //.
  //. > S.empty (Object)
  //. {}
  //.
  //. > S.empty (Sum)
  //. Sum (0)
  //. ```
  _.empty = {
    consts: {a: [Z.Monoid]},
    types: [TypeRep (a), a],
    impl: Z.empty
  };

  //# invert :: Group g => g -> g
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.invert`][].
  //.
  //. ```javascript
  //. > S.invert (Sum (5))
  //. Sum (-5)
  //. ```
  _.invert = {
    consts: {g: [Z.Group]},
    types: [g, g],
    impl: Z.invert
  };

  //# filter :: Filterable f => (a -> Boolean) -> f a -> f a
  //.
  //. Curried version of [`Z.filter`][]. Discards every element that does not
  //. satisfy the predicate.
  //.
  //. See also [`reject`](#reject).
  //.
  //. ```javascript
  //. > S.filter (S.odd) ([1, 2, 3])
  //. [1, 3]
  //.
  //. > S.filter (S.odd) ({x: 1, y: 2, z: 3})
  //. {x: 1, z: 3}
  //.
  //. > S.filter (S.odd) (S.Nothing)
  //. Nothing
  //.
  //. > S.filter (S.odd) (S.Just (0))
  //. Nothing
  //.
  //. > S.filter (S.odd) (S.Just (1))
  //. Just (1)
  //. ```
  function filter(pred) {
    return function(filterable) {
      return Z.filter (pred, filterable);
    };
  }
  _.filter = {
    consts: {f: [Z.Filterable]},
    types: [$.Predicate (a), f (a), f (a)],
    impl: filter
  };

  //# reject :: Filterable f => (a -> Boolean) -> f a -> f a
  //.
  //. Curried version of [`Z.reject`][]. Discards every element that satisfies
  //. the predicate.
  //.
  //. See also [`filter`](#filter).
  //.
  //. ```javascript
  //. > S.reject (S.odd) ([1, 2, 3])
  //. [2]
  //.
  //. > S.reject (S.odd) ({x: 1, y: 2, z: 3})
  //. {y: 2}
  //.
  //. > S.reject (S.odd) (S.Nothing)
  //. Nothing
  //.
  //. > S.reject (S.odd) (S.Just (0))
  //. Just (0)
  //.
  //. > S.reject (S.odd) (S.Just (1))
  //. Nothing
  //. ```
  function reject(pred) {
    return function(filterable) {
      return Z.reject (pred, filterable);
    };
  }
  _.reject = {
    consts: {f: [Z.Filterable]},
    types: [$.Predicate (a), f (a), f (a)],
    impl: reject
  };

  //# map :: Functor f => (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.map`][].
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) ([1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > S.map (Math.sqrt) ({x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > S.map (Math.sqrt) (S.Just (9))
  //. Just (3)
  //.
  //. > S.map (Math.sqrt) (S.Right (9))
  //. Right (3)
  //.
  //. > S.map (Math.sqrt) (S.Pair (99980001) (99980001))
  //. Pair (99980001) (9999)
  //. ```
  //.
  //. Replacing `Functor f => f` with `Function x` produces the B combinator
  //. from combinatory logic (i.e. [`compose`](#compose)):
  //.
  //.     Functor f => (a -> b) -> f a -> f b
  //.     (a -> b) -> Function x a -> Function x b
  //.     (a -> c) -> Function x a -> Function x c
  //.     (b -> c) -> Function x b -> Function x c
  //.     (b -> c) -> Function a b -> Function a c
  //.     (b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) (S.add (1)) (99)
  //. 10
  //. ```
  function map(f) {
    return function(functor) {
      return Z.map (f, functor);
    };
  }
  _.map = {
    consts: {f: [Z.Functor]},
    types: [$.Fn (a) (b), f (a), f (b)],
    impl: map
  };

  //# flip :: Functor f => f (a -> b) -> a -> f b
  //.
  //. Curried version of [`Z.flip`][]. Maps over the given functions, applying
  //. each to the given value.
  //.
  //. Replacing `Functor f => f` with `Function x` produces the C combinator
  //. from combinatory logic:
  //.
  //.     Functor f => f (a -> b) -> a -> f b
  //.     Function x (a -> b) -> a -> Function x b
  //.     Function x (a -> c) -> a -> Function x c
  //.     Function x (b -> c) -> b -> Function x c
  //.     Function a (b -> c) -> b -> Function a c
  //.     (a -> b -> c) -> b -> a -> c
  //.
  //. ```javascript
  //. > S.flip (S.concat) ('!') ('foo')
  //. 'foo!'
  //.
  //. > S.flip ([Math.floor, Math.ceil]) (1.5)
  //. [1, 2]
  //.
  //. > S.flip ({floor: Math.floor, ceil: Math.ceil}) (1.5)
  //. {floor: 1, ceil: 2}
  //.
  //. > S.flip (Cons (Math.floor) (Cons (Math.ceil) (Nil))) (1.5)
  //. Cons (1) (Cons (2) (Nil))
  //. ```
  _.flip = {
    consts: {f: [Z.Functor]},
    types: [f ($.Fn (a) (b)), a, f (b)],
    impl: curry2 (Z.flip)
  };

  //# bimap :: Bifunctor f => (a -> b) -> (c -> d) -> f a c -> f b d
  //.
  //. Curried version of [`Z.bimap`][].
  //.
  //. ```javascript
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Pair ('foo') (64))
  //. Pair ('FOO') (8)
  //.
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Left ('foo'))
  //. Left ('FOO')
  //.
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Right (64))
  //. Right (8)
  //. ```
  _.bimap = {
    consts: {p: [Z.Bifunctor]},
    types: [$.Fn (a) (b), $.Fn (c) (d), p (a) (c), p (b) (d)],
    impl: curry3 (Z.bimap)
  };

  //# mapLeft :: Bifunctor f => (a -> b) -> f a c -> f b c
  //.
  //. Curried version of [`Z.mapLeft`][]. Maps the given function over the left
  //. side of a Bifunctor.
  //.
  //. ```javascript
  //. > S.mapLeft (S.toUpper) (S.Pair ('foo') (64))
  //. Pair ('FOO') (64)
  //.
  //. > S.mapLeft (S.toUpper) (S.Left ('foo'))
  //. Left ('FOO')
  //.
  //. > S.mapLeft (S.toUpper) (S.Right (64))
  //. Right (64)
  //. ```
  _.mapLeft = {
    consts: {p: [Z.Bifunctor]},
    types: [$.Fn (a) (b), p (a) (c), p (b) (c)],
    impl: curry2 (Z.mapLeft)
  };

  //# promap :: Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a d
  //.
  //. Curried version of [`Z.promap`][].
  //.
  //. ```javascript
  //. > S.promap (Math.abs) (S.add (1)) (Math.sqrt) (-100)
  //. 11
  //. ```
  _.promap = {
    consts: {p: [Z.Profunctor]},
    types: [$.Fn (a) (b), $.Fn (c) (d), p (b) (c), p (a) (d)],
    impl: curry3 (Z.promap)
  };

  //# alt :: Alt f => f a -> f a -> f a
  //.
  //. Curried version of [`Z.alt`][] with arguments flipped to facilitate
  //. partial application.
  //.
  //. ```javascript
  //. > S.alt (S.Just ('default')) (S.Nothing)
  //. Just ('default')
  //.
  //. > S.alt (S.Just ('default')) (S.Just ('hello'))
  //. Just ('hello')
  //.
  //. > S.alt (S.Right (0)) (S.Left ('X'))
  //. Right (0)
  //.
  //. > S.alt (S.Right (0)) (S.Right (1))
  //. Right (1)
  //. ```
  function alt(y) {
    return function(x) {
      return Z.alt (x, y);
    };
  }
  _.alt = {
    consts: {f: [Z.Alt]},
    types: [f (a), f (a), f (a)],
    impl: alt
  };

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.zero`][].
  //.
  //. ```javascript
  //. > S.zero (Array)
  //. []
  //.
  //. > S.zero (Object)
  //. {}
  //.
  //. > S.zero (S.Maybe)
  //. Nothing
  //. ```
  _.zero = {
    consts: {f: [Z.Plus]},
    types: [TypeRep (f (a)), f (a)],
    impl: Z.zero
  };

  //# reduce :: Foldable f => (b -> a -> b) -> b -> f a -> b
  //.
  //. Takes a curried binary function, an initial value, and a [Foldable][],
  //. and applies the function to the initial value and the Foldable's first
  //. value, then applies the function to the result of the previous
  //. application and the Foldable's second value. Repeats this process
  //. until each of the Foldable's values has been used. Returns the initial
  //. value if the Foldable is empty; the result of the final application
  //. otherwise.
  //.
  //. ```javascript
  //. > S.reduce (S.add) (0) ([1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.reduce (xs => x => S.prepend (x) (xs)) ([]) ([1, 2, 3, 4, 5])
  //. [5, 4, 3, 2, 1]
  //. ```
  function reduce(f) {
    return function(initial) {
      return function(foldable) {
        return Z.reduce (function(y, x) { return f (y) (x); },
                         initial,
                         foldable);
      };
    };
  }
  _.reduce = {
    consts: {f: [Z.Foldable]},
    types: [$.Fn (a) ($.Fn (b) (a)), a, f (b), a],
    impl: reduce
  };

  //# traverse :: (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
  //.
  //. Curried version of [`Z.traverse`][].
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (S.Just ('foo bar baz'))
  //. [Just ('foo'), Just ('bar'), Just ('baz')]
  //.
  //. > S.traverse (Array) (S.words) (S.Nothing)
  //. [Nothing]
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C'])
  //. Just ([10, 11, 12])
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C', 'X'])
  //. Nothing
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C'})
  //. Just ({a: 10, b: 11, c: 12})
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C', x: 'X'})
  //. Nothing
  //. ```
  _.traverse = {
    consts: {f: [Z.Applicative], t: [Z.Traversable]},
    types: [TypeRep (f (b)), $.Fn (a) (f (b)), t (a), f (t (b))],
    impl: curry3 (Z.traverse)
  };

  //# sequence :: (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
  //.
  //. Curried version of [`Z.sequence`][]. Inverts the given `t (f a)`
  //. to produce an `f (t a)`.
  //.
  //. ```javascript
  //. > S.sequence (Array) (S.Just ([1, 2, 3]))
  //. [Just (1), Just (2), Just (3)]
  //.
  //. > S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Just (3)])
  //. Just ([1, 2, 3])
  //.
  //. > S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Nothing])
  //. Nothing
  //.
  //. > S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Just (3)})
  //. Just ({a: 1, b: 2, c: 3})
  //.
  //. > S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Nothing})
  //. Nothing
  //. ```
  _.sequence = {
    consts: {f: [Z.Applicative], t: [Z.Traversable]},
    types: [TypeRep (f (a)), t (f (a)), f (t (a))],
    impl: curry2 (Z.sequence)
  };

  //# ap :: Apply f => f (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.ap`][].
  //.
  //. ```javascript
  //. > S.ap ([Math.sqrt, x => x * x]) ([1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > S.ap ({x: Math.sqrt, y: S.add (1), z: S.sub (1)}) ({w: 4, x: 4, y: 4})
  //. {x: 2, y: 5}
  //.
  //. > S.ap (S.Just (Math.sqrt)) (S.Just (64))
  //. Just (8)
  //. ```
  //.
  //. Replacing `Apply f => f` with `Function x` produces the S combinator
  //. from combinatory logic:
  //.
  //.     Apply f => f (a -> b) -> f a -> f b
  //.     Function x (a -> b) -> Function x a -> Function x b
  //.     Function x (a -> c) -> Function x a -> Function x c
  //.     Function x (b -> c) -> Function x b -> Function x c
  //.     Function a (b -> c) -> Function a b -> Function a c
  //.     (a -> b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.ap (s => n => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('Haskell')
  //. 'Hask'
  //. ```
  _.ap = {
    consts: {f: [Z.Apply]},
    types: [f ($.Fn (a) (b)), f (a), f (b)],
    impl: curry2 (Z.ap)
  };

  //# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
  //.
  //. Promotes a curried binary function to a function that operates on two
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift2 (S.add) (S.Just (2)) (S.Just (3))
  //. Just (5)
  //.
  //. > S.lift2 (S.add) (S.Just (2)) (S.Nothing)
  //. Nothing
  //.
  //. > S.lift2 (S.and) (S.Just (true)) (S.Just (true))
  //. Just (true)
  //.
  //. > S.lift2 (S.and) (S.Just (true)) (S.Just (false))
  //. Just (false)
  //. ```
  _.lift2 = {
    consts: {f: [Z.Apply]},
    types: [$.Fn (a) ($.Fn (b) (c)), f (a), f (b), f (c)],
    impl: curry3 (Z.lift2)
  };

  //# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
  //.
  //. Promotes a curried ternary function to a function that operates on three
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Just ([1, 2, 3]))
  //. Just (6)
  //.
  //. > S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Nothing)
  //. Nothing
  //. ```
  _.lift3 = {
    consts: {f: [Z.Apply]},
    types: [$.Fn (a) ($.Fn (b) ($.Fn (c) (d))), f (a), f (b), f (c), f (d)],
    impl: curry4 (Z.lift3)
  };

  //# apFirst :: Apply f => f a -> f b -> f a
  //.
  //. Curried version of [`Z.apFirst`][]. Combines two effectful actions,
  //. keeping only the result of the first. Equivalent to Haskell's `(<*)`
  //. function.
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > S.apFirst ([1, 2]) ([3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > S.apFirst (S.Just (1)) (S.Just (2))
  //. Just (1)
  //. ```
  _.apFirst = {
    consts: {f: [Z.Apply]},
    types: [f (a), f (b), f (a)],
    impl: curry2 (Z.apFirst)
  };

  //# apSecond :: Apply f => f a -> f b -> f b
  //.
  //. Curried version of [`Z.apSecond`][]. Combines two effectful actions,
  //. keeping only the result of the second. Equivalent to Haskell's `(*>)`
  //. function.
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > S.apSecond ([1, 2]) ([3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > S.apSecond (S.Just (1)) (S.Just (2))
  //. Just (2)
  //. ```
  _.apSecond = {
    consts: {f: [Z.Apply]},
    types: [f (a), f (b), f (b)],
    impl: curry2 (Z.apSecond)
  };

  //# of :: Applicative f => TypeRep f -> a -> f a
  //.
  //. Curried version of [`Z.of`][].
  //.
  //. ```javascript
  //. > S.of (Array) (42)
  //. [42]
  //.
  //. > S.of (Function) (42) (null)
  //. 42
  //.
  //. > S.of (S.Maybe) (42)
  //. Just (42)
  //.
  //. > S.of (S.Either) (42)
  //. Right (42)
  //. ```
  function of(typeRep) {
    return function(x) {
      return Z.of (typeRep, x);
    };
  }
  _.of = {
    consts: {f: [Z.Applicative]},
    types: [TypeRep (f (a)), a, f (a)],
    impl: of
  };

  //# chain :: Chain m => (a -> m b) -> m a -> m b
  //.
  //. Curried version of [`Z.chain`][].
  //.
  //. ```javascript
  //. > S.chain (x => [x, x]) ([1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > S.chain (n => s => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('slice')
  //. 'sli'
  //.
  //. > S.chain (S.parseInt (10)) (S.Just ('123'))
  //. Just (123)
  //.
  //. > S.chain (S.parseInt (10)) (S.Just ('XXX'))
  //. Nothing
  //. ```
  _.chain = {
    consts: {m: [Z.Chain]},
    types: [$.Fn (a) (m (b)), m (a), m (b)],
    impl: curry2 (Z.chain)
  };

  //# join :: Chain m => m (m a) -> m a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.join`][].
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. ```javascript
  //. > S.join ([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > S.join ([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > S.join (S.Just (S.Just (1)))
  //. Just (1)
  //.
  //. > S.join (S.Pair ('foo') (S.Pair ('bar') ('baz')))
  //. Pair ('foobar') ('baz')
  //. ```
  //.
  //. Replacing `Chain m => m` with `Function x` produces the W combinator
  //. from combinatory logic:
  //.
  //.     Chain m => m (m a) -> m a
  //.     Function x (Function x a) -> Function x a
  //.     (x -> x -> a) -> (x -> a)
  //.
  //. ```javascript
  //. > S.join (S.concat) ('abc')
  //. 'abcabc'
  //. ```
  _.join = {
    consts: {m: [Z.Chain]},
    types: [m (m (a)), m (a)],
    impl: Z.join
  };

  //# chainRec :: ChainRec m => TypeRep m -> (a -> m (Either a b)) -> a -> m b
  //.
  //. Performs a [`chain`](#chain)-like computation with constant stack usage.
  //. Similar to [`Z.chainRec`][], but curried and more convenient due to the
  //. use of the Either type to indicate completion (via a Right).
  //.
  //. ```javascript
  //. > S.chainRec (Array)
  //. .            (s => s.length === 2 ? S.map (S.Right) ([s + '!', s + '?'])
  //. .                                 : S.map (S.Left) ([s + 'o', s + 'n']))
  //. .            ('')
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep) {
    return function(f) {
      return function(x) {
        return Z.chainRec (typeRep, step, x);
      };
      function step(next, done, x) {
        return Z.map (either (next) (done), f (x));
      }
    };
  }
  _.chainRec = {
    consts: {m: [Z.ChainRec]},
    types: [TypeRep (m (b)), $.Fn (a) (m ($.Either (a) (b))), a, m (b)],
    impl: chainRec
  };

  //# extend :: Extend w => (w a -> b) -> w a -> w b
  //.
  //. Curried version of [`Z.extend`][].
  //.
  //. ```javascript
  //. > S.extend (S.joinWith ('')) (['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //.
  //. > S.extend (f => f ([3, 4])) (S.reverse) ([1, 2])
  //. [4, 3, 2, 1]
  //. ```
  _.extend = {
    consts: {w: [Z.Extend]},
    types: [$.Fn (w (a)) (b), w (a), w (b)],
    impl: curry2 (Z.extend)
  };

  //# duplicate :: Extend w => w a -> w (w a)
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.duplicate`][].
  //. Adds one level of nesting to a comonadic structure.
  //.
  //. ```javascript
  //. > S.duplicate (S.Just (1))
  //. Just (Just (1))
  //.
  //. > S.duplicate ([1])
  //. [[1]]
  //.
  //. > S.duplicate ([1, 2, 3])
  //. [[1, 2, 3], [2, 3], [3]]
  //.
  //. > S.duplicate (S.reverse) ([1, 2]) ([3, 4])
  //. [4, 3, 2, 1]
  //. ```
  _.duplicate = {
    consts: {w: [Z.Extend]},
    types: [w (a), w (w (a))],
    impl: Z.duplicate
  };

  //# extract :: Comonad w => w a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.extract`][].
  //.
  //. ```javascript
  //. > S.extract (S.Pair ('foo') ('bar'))
  //. 'bar'
  //. ```
  _.extract = {
    consts: {w: [Z.Comonad]},
    types: [w (a), a],
    impl: Z.extract
  };

  //# contramap :: Contravariant f => (b -> a) -> f a -> f b
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.contramap`][].
  //.
  //. ```javascript
  //. > S.contramap (s => s.length) (Math.sqrt) ('Sanctuary')
  //. 3
  //. ```
  _.contramap = {
    consts: {f: [Z.Contravariant]},
    types: [$.Fn (b) (a), f (a), f (b)],
    impl: curry2 (Z.contramap)
  };

  //. ### Combinator

  //# I :: a -> a
  //.
  //. The I combinator. Returns its argument. Equivalent to Haskell's `id`
  //. function.
  //.
  //. ```javascript
  //. > S.I ('foo')
  //. 'foo'
  //. ```
  function I(x) {
    return x;
  }
  _.I = {
    consts: {},
    types: [a, a],
    impl: I
  };

  //# K :: a -> b -> a
  //.
  //. The K combinator. Takes two values and returns the first. Equivalent to
  //. Haskell's `const` function.
  //.
  //. ```javascript
  //. > S.K ('foo') ('bar')
  //. 'foo'
  //.
  //. > S.map (S.K (42)) (S.range (0) (5))
  //. [42, 42, 42, 42, 42]
  //. ```
  function K(x) {
    return function(y) {
      return x;
    };
  }
  _.K = {
    consts: {},
    types: [a, b, a],
    impl: K
  };

  //# T :: a -> (a -> b) -> b
  //.
  //. The T ([thrush][]) combinator. Takes a value and a function, and returns
  //. the result of applying the function to the value. Equivalent to Haskell's
  //. `(&)` function.
  //.
  //. ```javascript
  //. > S.T (42) (S.add (1))
  //. 43
  //.
  //. > S.map (S.T (100)) ([S.add (1), Math.sqrt])
  //. [101, 10]
  //. ```
  function T(x) {
    return function(f) {
      return f (x);
    };
  }
  _.T = {
    consts: {},
    types: [a, $.Fn (a) (b), b],
    impl: T
  };

  //. ### Function

  //# curry2 :: ((a, b) -> c) -> a -> b -> c
  //.
  //. Curries the given binary function.
  //.
  //. ```javascript
  //. > S.map (S.curry2 (Math.pow) (10)) ([1, 2, 3])
  //. [10, 100, 1000]
  //. ```
  function curry2(f) {
    return function(x) {
      return function(y) {
        return f (x, y);
      };
    };
  }
  _.curry2 = {
    consts: {},
    types: [$.Function ([a, b, c]), a, b, c],
    impl: curry2
  };

  //# curry3 :: ((a, b, c) -> d) -> a -> b -> c -> d
  //.
  //. Curries the given ternary function.
  //.
  //. ```javascript
  //. > const replaceString = S.curry3 ((what, replacement, string) =>
  //. .   string.replace (what, replacement)
  //. . )
  //.
  //. > replaceString ('banana') ('orange') ('banana icecream')
  //. 'orange icecream'
  //. ```
  function curry3(f) {
    return function(x) {
      return function(y) {
        return function(z) {
          return f (x, y, z);
        };
      };
    };
  }
  _.curry3 = {
    consts: {},
    types: [$.Function ([a, b, c, d]), a, b, c, d],
    impl: curry3
  };

  //# curry4 :: ((a, b, c, d) -> e) -> a -> b -> c -> d -> e
  //.
  //. Curries the given quaternary function.
  //.
  //. ```javascript
  //. > const createRect = S.curry4 ((x, y, width, height) =>
  //. .   ({x, y, width, height})
  //. . )
  //.
  //. > createRect (0) (0) (10) (10)
  //. {x: 0, y: 0, width: 10, height: 10}
  //. ```
  function curry4(f) {
    return function(w) {
      return function(x) {
        return function(y) {
          return function(z) {
            return f (w, x, y, z);
          };
        };
      };
    };
  }
  _.curry4 = {
    consts: {},
    types: [$.Function ([a, b, c, d, e]), a, b, c, d, e],
    impl: curry4
  };

  //# curry5 :: ((a, b, c, d, e) -> f) -> a -> b -> c -> d -> e -> f
  //.
  //. Curries the given quinary function.
  //.
  //. ```javascript
  //. > const toUrl = S.curry5 ((protocol, creds, hostname, port, pathname) =>
  //. .   protocol + '//' +
  //. .   S.maybe ('') (S.flip (S.concat) ('@')) (creds) +
  //. .   hostname +
  //. .   S.maybe ('') (S.concat (':')) (port) +
  //. .   pathname
  //. . )
  //.
  //. > toUrl ('https:') (S.Nothing) ('example.com') (S.Just ('443')) ('/foo/bar')
  //. 'https://example.com:443/foo/bar'
  //. ```
  function curry5(f) {
    return function(v) {
      return function(w) {
        return function(x) {
          return function(y) {
            return function(z) {
              return f (v, w, x, y, z);
            };
          };
        };
      };
    };
  }
  _.curry5 = {
    consts: {},
    types: [$.Function ([a, b, c, d, e, r]), a, b, c, d, e, r],
    impl: curry5
  };

  //. ### Composition

  //# compose :: Semigroupoid s => s b c -> s a b -> s a c
  //.
  //. Curried version of [`Z.compose`][].
  //.
  //. When specialized to Function, `compose` composes two unary functions,
  //. from right to left (this is the B combinator from combinatory logic).
  //.
  //. The generalized type signature indicates that `compose` is compatible
  //. with any [Semigroupoid][].
  //.
  //. See also [`pipe`](#pipe).
  //.
  //. ```javascript
  //. > S.compose (Math.sqrt) (S.add (1)) (99)
  //. 10
  //. ```
  _.compose = {
    consts: {s: [Z.Semigroupoid]},
    types: [s (b) (c), s (a) (b), s (a) (c)],
    impl: curry2 (Z.compose)
  };

  //# pipe :: Foldable f => f (Any -> Any) -> a -> b
  //.
  //. Takes a sequence of functions assumed to be unary and a value of any
  //. type, and returns the result of applying the sequence of transformations
  //. to the initial value.
  //.
  //. In general terms, `pipe` performs left-to-right composition of a sequence
  //. of functions. `pipe ([f, g, h]) (x)` is equivalent to `h (g (f (x)))`.
  //.
  //. ```javascript
  //. > S.pipe ([S.add (1), Math.sqrt, S.sub (1)]) (99)
  //. 9
  //. ```
  function pipe(fs) {
    return function(x) {
      return reduce (T) (x) (fs);
    };
  }
  _.pipe = {
    consts: {f: [Z.Foldable]},
    types: [f ($.Fn ($.Any) ($.Any)), a, b],
    impl: pipe
  };

  //# pipeK :: (Foldable f, Chain m) => f (Any -> m Any) -> m a -> m b
  //.
  //. Takes a sequence of functions assumed to be unary that return values
  //. with a [Chain][], and a value of that Chain, and returns the result
  //. of applying the sequence of transformations to the initial value.
  //.
  //. In general terms, `pipeK` performs left-to-right [Kleisli][] composition
  //. of an sequence of functions. `pipeK ([f, g, h]) (x)` is equivalent to
  //. `chain (h) (chain (g) (chain (f) (x)))`.
  //.
  //. ```javascript
  //. > S.pipeK ([S.tail, S.tail, S.head]) (S.Just ([1, 2, 3, 4]))
  //. Just (3)
  //. ```
  function pipeK(fs) {
    return function(x) {
      return Z.reduce (function(x, f) { return Z.chain (f, x); }, x, fs);
    };
  }
  _.pipeK = {
    consts: {f: [Z.Foldable], m: [Z.Chain]},
    types: [f ($.Fn ($.Any) (m ($.Any))), m (a), m (b)],
    impl: pipeK
  };

  //# on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
  //.
  //. Takes a binary function `f`, a unary function `g`, and two
  //. values `x` and `y`. Returns `f (g (x)) (g (y))`.
  //.
  //. This is the P combinator from combinatory logic.
  //.
  //. ```javascript
  //. > S.on (S.concat) (S.reverse) ([1, 2, 3]) ([4, 5, 6])
  //. [3, 2, 1, 6, 5, 4]
  //. ```
  function on(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f (g (x)) (g (y));
        };
      };
    };
  }
  _.on = {
    consts: {},
    types: [$.Fn (b) ($.Fn (b) (c)), $.Fn (a) (b), a, a, c],
    impl: on
  };

  //. ### Pair type
  //.
  //. Pair is the canonical product type: a value of type `Pair a b` always
  //. contains exactly two values: one of type `a`; one of type `b`.
  //.
  //. The implementation is provided by [sanctuary-pair][].

  //# Pair :: a -> b -> Pair a b
  //.
  //. Pair's sole data constructor. Additionally, it serves as the
  //. Pair [type representative][].
  //.
  //. ```javascript
  //. > S.Pair ('foo') (42)
  //. Pair ('foo') (42)
  //. ```
  _.Pair = {
    consts: {},
    types: [a, b, $.Pair (a) (b)],
    impl: Pair
  };

  //# pair :: (a -> b -> c) -> Pair a b -> c
  //.
  //. Case analysis for the `Pair a b` type.
  //.
  //. ```javascript
  //. > S.pair (S.concat) (S.Pair ('foo') ('bar'))
  //. 'foobar'
  //. ```
  function pair(f) {
    return function(pair) {
      return f (pair.fst) (pair.snd);
    };
  }
  _.pair = {
    consts: {},
    types: [$.Fn (a) ($.Fn (b) (c)), $.Pair (a) (b), c],
    impl: pair
  };

  //# fst :: Pair a b -> a
  //.
  //. `fst (Pair (x) (y))` is equivalent to `x`.
  //.
  //. ```javascript
  //. > S.fst (S.Pair ('foo') (42))
  //. 'foo'
  //. ```
  _.fst = {
    consts: {},
    types: [$.Pair (a) (b), a],
    impl: pair (K)
  };

  //# snd :: Pair a b -> b
  //.
  //. `snd (Pair (x) (y))` is equivalent to `y`.
  //.
  //. ```javascript
  //. > S.snd (S.Pair ('foo') (42))
  //. 42
  //. ```
  _.snd = {
    consts: {},
    types: [$.Pair (a) (b), b],
    impl: pair (C (K))
  };

  //# swap :: Pair a b -> Pair b a
  //.
  //. `swap (Pair (x) (y))` is equivalent to `Pair (y) (x)`.
  //.
  //. ```javascript
  //. > S.swap (S.Pair ('foo') (42))
  //. Pair (42) ('foo')
  //. ```
  _.swap = {
    consts: {},
    types: [$.Pair (a) (b), $.Pair (b) (a)],
    impl: pair (C (Pair))
  };

  //. ### Maybe type
  //.
  //. The Maybe type represents optional values: a value of type `Maybe a` is
  //. either Nothing (the empty value) or a Just whose value is of type `a`.
  //.
  //. The implementation is provided by [sanctuary-maybe][].

  //# Maybe :: TypeRep Maybe
  //.
  //. Maybe [type representative][].

  //# Nothing :: Maybe a
  //.
  //. The empty value of type `Maybe a`.
  //.
  //. ```javascript
  //. > S.Nothing
  //. Nothing
  //. ```

  //# Just :: a -> Maybe a
  //.
  //. Constructs a value of type `Maybe a` from a value of type `a`.
  //.
  //. ```javascript
  //. > S.Just (42)
  //. Just (42)
  //. ```
  _.Just = {
    consts: {},
    types: [a, $.Maybe (a)],
    impl: Just
  };

  //# isNothing :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is Nothing; `false` if it is a Just.
  //.
  //. ```javascript
  //. > S.isNothing (S.Nothing)
  //. true
  //.
  //. > S.isNothing (S.Just (42))
  //. false
  //. ```
  function isNothing(maybe) {
    return maybe.isNothing;
  }
  _.isNothing = {
    consts: {},
    types: [$.Maybe (a), $.Boolean],
    impl: isNothing
  };

  //# isJust :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is a Just; `false` if it is Nothing.
  //.
  //. ```javascript
  //. > S.isJust (S.Just (42))
  //. true
  //.
  //. > S.isJust (S.Nothing)
  //. false
  //. ```
  function isJust(maybe) {
    return maybe.isJust;
  }
  _.isJust = {
    consts: {},
    types: [$.Maybe (a), $.Boolean],
    impl: isJust
  };

  //# fromMaybe :: a -> Maybe a -> a
  //.
  //. Takes a default value and a Maybe, and returns the Maybe's value
  //. if the Maybe is a Just; the default value otherwise.
  //.
  //. See also [`fromMaybe_`](#fromMaybe_) and
  //. [`maybeToNullable`](#maybeToNullable).
  //.
  //. ```javascript
  //. > S.fromMaybe (0) (S.Just (42))
  //. 42
  //.
  //. > S.fromMaybe (0) (S.Nothing)
  //. 0
  //. ```
  _.fromMaybe = {
    consts: {},
    types: [a, $.Maybe (a), a],
    impl: C (maybe) (I)
  };

  //# fromMaybe_ :: (() -> a) -> Maybe a -> a
  //.
  //. Variant of [`fromMaybe`](#fromMaybe) that takes a thunk so the default
  //. value is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
  //.
  //. > S.fromMaybe_ (() => fib (30)) (S.Just (1000000))
  //. 1000000
  //.
  //. > S.fromMaybe_ (() => fib (30)) (S.Nothing)
  //. 832040
  //. ```
  _.fromMaybe_ = {
    consts: {},
    types: [$.Thunk (a), $.Maybe (a), a],
    impl: C (maybe_) (I)
  };

  //# maybeToNullable :: Maybe a -> Nullable a
  //.
  //. Returns the given Maybe's value if the Maybe is a Just; `null` otherwise.
  //. [Nullable][] is defined in [sanctuary-def][].
  //.
  //. See also [`fromMaybe`](#fromMaybe).
  //.
  //. ```javascript
  //. > S.maybeToNullable (S.Just (42))
  //. 42
  //.
  //. > S.maybeToNullable (S.Nothing)
  //. null
  //. ```
  function maybeToNullable(maybe) {
    return maybe.isJust ? maybe.value : null;
  }
  _.maybeToNullable = {
    consts: {},
    types: [$.Maybe (a), $.Nullable (a)],
    impl: maybeToNullable
  };

  //# maybe :: b -> (a -> b) -> Maybe a -> b
  //.
  //. Takes a value of any type, a function, and a Maybe. If the Maybe is
  //. a Just, the return value is the result of applying the function to
  //. the Just's value. Otherwise, the first argument is returned.
  //.
  //. See also [`maybe_`](#maybe_).
  //.
  //. ```javascript
  //. > S.maybe (0) (S.prop ('length')) (S.Just ('refuge'))
  //. 6
  //.
  //. > S.maybe (0) (S.prop ('length')) (S.Nothing)
  //. 0
  //. ```
  function maybe(x) {
    return function(f) {
      return function(maybe) {
        return maybe.isJust ? f (maybe.value) : x;
      };
    };
  }
  _.maybe = {
    consts: {},
    types: [b, $.Fn (a) (b), $.Maybe (a), b],
    impl: maybe
  };

  //# maybe_ :: (() -> b) -> (a -> b) -> Maybe a -> b
  //.
  //. Variant of [`maybe`](#maybe) that takes a thunk so the default value
  //. is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
  //.
  //. > S.maybe_ (() => fib (30)) (Math.sqrt) (S.Just (1000000))
  //. 1000
  //.
  //. > S.maybe_ (() => fib (30)) (Math.sqrt) (S.Nothing)
  //. 832040
  //. ```
  function maybe_(thunk) {
    return function(f) {
      return function(maybe) {
        return maybe.isJust ? f (maybe.value) : thunk ();
      };
    };
  }
  _.maybe_ = {
    consts: {},
    types: [$.Thunk (b), $.Fn (a) (b), $.Maybe (a), b],
    impl: maybe_
  };

  //# justs :: (Filterable f, Functor f) => f (Maybe a) -> f a
  //.
  //. Discards each element that is Nothing, and unwraps each element that is
  //. a Just. Related to Haskell's `catMaybes` function.
  //.
  //. See also [`lefts`](#lefts) and [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.justs ([S.Just ('foo'), S.Nothing, S.Just ('baz')])
  //. ['foo', 'baz']
  //. ```
  function justs(maybes) {
    return map (prop ('value')) (filter (isJust) (maybes));
  }
  _.justs = {
    consts: {f: [Z.Filterable, Z.Functor]},
    types: [f ($.Maybe (a)), f (a)],
    impl: justs
  };

  //# mapMaybe :: (Filterable f, Functor f) => (a -> Maybe b) -> f a -> f b
  //.
  //. Takes a function and a structure, applies the function to each element
  //. of the structure, and returns the "successful" results. If the result of
  //. applying the function to an element is Nothing, the result is discarded;
  //. if the result is a Just, the Just's value is included.
  //.
  //. ```javascript
  //. > S.mapMaybe (S.head) ([[], [1, 2, 3], [], [4, 5, 6], []])
  //. [1, 4]
  //.
  //. > S.mapMaybe (S.head) ({x: [1, 2, 3], y: [], z: [4, 5, 6]})
  //. {x: 1, z: 4}
  //. ```
  _.mapMaybe = {
    consts: {f: [Z.Filterable, Z.Functor]},
    types: [$.Fn (a) ($.Maybe (b)), f (a), f (b)],
    impl: B (B (justs)) (map)
  };

  //# maybeToEither :: a -> Maybe b -> Either a b
  //.
  //. Converts a Maybe to an Either. Nothing becomes a Left (containing the
  //. first argument); a Just becomes a Right.
  //.
  //. See also [`eitherToMaybe`](#eitherToMaybe).
  //.
  //. ```javascript
  //. > S.maybeToEither ('Expecting an integer') (S.parseInt (10) ('xyz'))
  //. Left ('Expecting an integer')
  //.
  //. > S.maybeToEither ('Expecting an integer') (S.parseInt (10) ('42'))
  //. Right (42)
  //. ```
  function maybeToEither(x) {
    return maybe (Left (x)) (Right);
  }
  _.maybeToEither = {
    consts: {},
    types: [a, $.Maybe (b), $.Either (a) (b)],
    impl: maybeToEither
  };

  //. ### Either type
  //.
  //. The Either type represents values with two possibilities: a value of type
  //. `Either a b` is either a Left whose value is of type `a` or a Right whose
  //. value is of type `b`.
  //.
  //. The implementation is provided by [sanctuary-either][].

  //# Either :: TypeRep Either
  //.
  //. Either [type representative][].

  //# Left :: a -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `a`.
  //.
  //. ```javascript
  //. > S.Left ('Cannot divide by zero')
  //. Left ('Cannot divide by zero')
  //. ```
  _.Left = {
    consts: {},
    types: [a, $.Either (a) (b)],
    impl: Left
  };

  //# Right :: b -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `b`.
  //.
  //. ```javascript
  //. > S.Right (42)
  //. Right (42)
  //. ```
  _.Right = {
    consts: {},
    types: [b, $.Either (a) (b)],
    impl: Right
  };

  //# isLeft :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Left; `false` if it is a Right.
  //.
  //. ```javascript
  //. > S.isLeft (S.Left ('Cannot divide by zero'))
  //. true
  //.
  //. > S.isLeft (S.Right (42))
  //. false
  //. ```
  function isLeft(either) {
    return either.isLeft;
  }
  _.isLeft = {
    consts: {},
    types: [$.Either (a) (b), $.Boolean],
    impl: isLeft
  };

  //# isRight :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Right; `false` if it is a Left.
  //.
  //. ```javascript
  //. > S.isRight (S.Right (42))
  //. true
  //.
  //. > S.isRight (S.Left ('Cannot divide by zero'))
  //. false
  //. ```
  function isRight(either) {
    return either.isRight;
  }
  _.isRight = {
    consts: {},
    types: [$.Either (a) (b), $.Boolean],
    impl: isRight
  };

  //# fromEither :: b -> Either a b -> b
  //.
  //. Takes a default value and an Either, and returns the Right value
  //. if the Either is a Right; the default value otherwise.
  //.
  //. ```javascript
  //. > S.fromEither (0) (S.Right (42))
  //. 42
  //.
  //. > S.fromEither (0) (S.Left (42))
  //. 0
  //. ```
  function fromEither(x) {
    return either (K (x)) (I);
  }
  _.fromEither = {
    consts: {},
    types: [b, $.Either (a) (b), b],
    impl: fromEither
  };

  //# either :: (a -> c) -> (b -> c) -> Either a b -> c
  //.
  //. Takes two functions and an Either, and returns the result of
  //. applying the first function to the Left's value, if the Either
  //. is a Left, or the result of applying the second function to the
  //. Right's value, if the Either is a Right.
  //.
  //. ```javascript
  //. > S.either (S.toUpper) (S.show) (S.Left ('Cannot divide by zero'))
  //. 'CANNOT DIVIDE BY ZERO'
  //.
  //. > S.either (S.toUpper) (S.show) (S.Right (42))
  //. '42'
  //. ```
  function either(l) {
    return function(r) {
      return function(either) {
        return (either.isLeft ? l : r) (either.value);
      };
    };
  }
  _.either = {
    consts: {},
    types: [$.Fn (a) (c), $.Fn (b) (c), $.Either (a) (b), c],
    impl: either
  };

  //# lefts :: (Filterable f, Functor f) => f (Either a b) -> f a
  //.
  //. Discards each element that is a Right, and unwraps each element that is
  //. a Left.
  //.
  //. See also [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.lefts ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
  //. ['foo', 'bar']
  //. ```
  _.lefts = {
    consts: {f: [Z.Filterable, Z.Functor]},
    types: [f ($.Either (a) (b)), f (a)],
    impl: B (map (prop ('value'))) (filter (isLeft))
  };

  //# rights :: (Filterable f, Functor f) => f (Either a b) -> f b
  //.
  //. Discards each element that is a Left, and unwraps each element that is
  //. a Right.
  //.
  //. See also [`lefts`](#lefts).
  //.
  //. ```javascript
  //. > S.rights ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
  //. [20, 10]
  //. ```
  _.rights = {
    consts: {f: [Z.Filterable, Z.Functor]},
    types: [f ($.Either (a) (b)), f (b)],
    impl: B (map (prop ('value'))) (filter (isRight))
  };

  //# tagBy :: (a -> Boolean) -> a -> Either a a
  //.
  //. Takes a predicate and a value, and returns a Right of the value if it
  //. satisfies the predicate; a Left of the value otherwise.
  //.
  //. ```javascript
  //. > S.tagBy (S.odd) (0)
  //. Left (0)
  //
  //. > S.tagBy (S.odd) (1)
  //. Right (1)
  //. ```
  function tagBy(pred) {
    return ifElse (pred) (Right) (Left);
  }
  _.tagBy = {
    consts: {},
    types: [$.Predicate (a), a, $.Either (a) (a)],
    impl: tagBy
  };

  //# encase :: (a -> b) -> a -> Either Error b
  //.
  //. Takes a function that may throw and returns a pure function.
  //.
  //. ```javascript
  //. > S.encase (JSON.parse) ('["foo","bar","baz"]')
  //. Right (['foo', 'bar', 'baz'])
  //.
  //. > S.encase (JSON.parse) ('[')
  //. Left (new SyntaxError ('Unexpected end of JSON input'))
  //. ```
  function encase(f) {
    return function(x) {
      try {
        return Right (f (x));
      } catch (err) {
        return Left (err);
      }
    };
  }
  _.encase = {
    consts: {},
    types: [$.Fn (a) (b), a, $.Either ($.Error) (b)],
    impl: encase
  };

  //# eitherToMaybe :: Either a b -> Maybe b
  //.
  //. Converts an Either to a Maybe. A Left becomes Nothing; a Right becomes
  //. a Just.
  //.
  //. See also [`maybeToEither`](#maybeToEither).
  //.
  //. ```javascript
  //. > S.eitherToMaybe (S.Left ('Cannot divide by zero'))
  //. Nothing
  //.
  //. > S.eitherToMaybe (S.Right (42))
  //. Just (42)
  //. ```
  function eitherToMaybe(either) {
    return either.isLeft ? Nothing : Just (either.value);
  }
  _.eitherToMaybe = {
    consts: {},
    types: [$.Either (a) (b), $.Maybe (b)],
    impl: eitherToMaybe
  };

  //. ### Logic

  //# and :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "and".
  //.
  //. ```javascript
  //. > S.and (false) (false)
  //. false
  //.
  //. > S.and (false) (true)
  //. false
  //.
  //. > S.and (true) (false)
  //. false
  //.
  //. > S.and (true) (true)
  //. true
  //. ```
  function and(x) {
    return function(y) {
      return x && y;
    };
  }
  _.and = {
    consts: {},
    types: [$.Boolean, $.Boolean, $.Boolean],
    impl: and
  };

  //# or :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "or".
  //.
  //. ```javascript
  //. > S.or (false) (false)
  //. false
  //.
  //. > S.or (false) (true)
  //. true
  //.
  //. > S.or (true) (false)
  //. true
  //.
  //. > S.or (true) (true)
  //. true
  //. ```
  function or(x) {
    return function(y) {
      return x || y;
    };
  }
  _.or = {
    consts: {},
    types: [$.Boolean, $.Boolean, $.Boolean],
    impl: or
  };

  //# not :: Boolean -> Boolean
  //.
  //. Boolean "not".
  //.
  //. See also [`complement`](#complement).
  //.
  //. ```javascript
  //. > S.not (false)
  //. true
  //.
  //. > S.not (true)
  //. false
  //. ```
  function not(x) {
    return !x;
  }
  _.not = {
    consts: {},
    types: [$.Boolean, $.Boolean],
    impl: not
  };

  //# complement :: (a -> Boolean) -> a -> Boolean
  //.
  //. Takes a unary predicate and a value of any type, and returns the logical
  //. negation of applying the predicate to the value.
  //.
  //. See also [`not`](#not).
  //.
  //. ```javascript
  //. > Number.isInteger (42)
  //. true
  //.
  //. > S.complement (Number.isInteger) (42)
  //. false
  //. ```
  _.complement = {
    consts: {},
    types: [$.Predicate (a), a, $.Boolean],
    impl: B (not)
  };

  //# boolean :: a -> a -> Boolean -> a
  //.
  //. Case analysis for the `Boolean` type. `boolean (x) (y) (b)` evaluates
  //. to `x` if `b` is `false`; to `y` if `b` is `true`.
  //.
  //. ```javascript
  //. > S.boolean ('no') ('yes') (false)
  //. 'no'
  //.
  //. > S.boolean ('no') ('yes') (true)
  //. 'yes'
  //. ```
  function boolean(x) {
    return function(y) {
      return function(b) {
        return b ? y : x;
      };
    };
  }
  _.boolean = {
    consts: {},
    types: [a, a, $.Boolean, a],
    impl: boolean
  };

  //# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
  //.
  //. Takes a unary predicate, a unary "if" function, a unary "else"
  //. function, and a value of any type, and returns the result of
  //. applying the "if" function to the value if the value satisfies
  //. the predicate; the result of applying the "else" function to the
  //. value otherwise.
  //.
  //. See also [`when`](#when) and [`unless`](#unless).
  //.
  //. ```javascript
  //. > S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (-1)
  //. 1
  //.
  //. > S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (16)
  //. 4
  //. ```
  function ifElse(pred) {
    return function(f) {
      return function(g) {
        return function(x) {
          return (pred (x) ? f : g) (x);
        };
      };
    };
  }
  _.ifElse = {
    consts: {},
    types: [$.Predicate (a), $.Fn (a) (b), $.Fn (a) (b), a, b],
    impl: ifElse
  };

  //# when :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. satisfies the predicate; the value otherwise.
  //.
  //. See also [`unless`](#unless) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.when (x => x >= 0) (Math.sqrt) (16)
  //. 4
  //.
  //. > S.when (x => x >= 0) (Math.sqrt) (-1)
  //. -1
  //. ```
  function when(pred) {
    return C (ifElse (pred)) (I);
  }
  _.when = {
    consts: {},
    types: [$.Predicate (a), $.Fn (a) (a), a, a],
    impl: when
  };

  //# unless :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. does not satisfy the predicate; the value otherwise.
  //.
  //. See also [`when`](#when) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.unless (x => x < 0) (Math.sqrt) (16)
  //. 4
  //.
  //. > S.unless (x => x < 0) (Math.sqrt) (-1)
  //. -1
  //. ```
  function unless(pred) {
    return ifElse (pred) (I);
  }
  _.unless = {
    consts: {},
    types: [$.Predicate (a), $.Fn (a) (a), a, a],
    impl: unless
  };

  //. ### Array

  //# array :: b -> (a -> Array a -> b) -> Array a -> b
  //.
  //. Case analysis for the `Array a` type.
  //.
  //. ```javascript
  //. > S.array (S.Nothing) (head => tail => S.Just (head)) ([])
  //. Nothing
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (head)) ([1, 2, 3])
  //. Just (1)
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (tail)) ([])
  //. Nothing
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (tail)) ([1, 2, 3])
  //. Just ([2, 3])
  //. ```
  function array(y) {
    return function(f) {
      return function(xs) {
        return xs.length === 0 ? y : f (xs[0]) (xs.slice (1));
      };
    };
  }
  _.array = {
    consts: {},
    types: [b, $.Fn (a) ($.Fn ($.Array (a)) (b)), $.Array (a), b],
    impl: array
  };

  //# head :: Foldable f => f a -> Maybe a
  //.
  //. Returns Just the first element of the given structure if the structure
  //. contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.head ([1, 2, 3])
  //. Just (1)
  //.
  //. > S.head ([])
  //. Nothing
  //.
  //. > S.head (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (1)
  //.
  //. > S.head (Nil)
  //. Nothing
  //. ```
  function head(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable[0]) : Nothing;
    }
    return Z.reduce (function(m, x) { return m.isJust ? m : Just (x); },
                     Nothing,
                     foldable);
  }
  _.head = {
    consts: {f: [Z.Foldable]},
    types: [f (a), $.Maybe (a)],
    impl: head
  };

  //# last :: Foldable f => f a -> Maybe a
  //.
  //. Returns Just the last element of the given structure if the structure
  //. contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.last ([1, 2, 3])
  //. Just (3)
  //.
  //. > S.last ([])
  //. Nothing
  //.
  //. > S.last (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (3)
  //.
  //. > S.last (Nil)
  //. Nothing
  //. ```
  function last(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable[foldable.length - 1])
                                 : Nothing;
    }
    return Z.reduce (function(_, x) { return Just (x); }, Nothing, foldable);
  }
  _.last = {
    consts: {f: [Z.Foldable]},
    types: [f (a), $.Maybe (a)],
    impl: last
  };

  //# tail :: (Applicative f, Foldable f, Monoid (f a)) => f a -> Maybe (f a)
  //.
  //. Returns Just all but the first of the given structure's elements if the
  //. structure contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.tail ([1, 2, 3])
  //. Just ([2, 3])
  //.
  //. > S.tail ([])
  //. Nothing
  //.
  //. > S.tail (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (Cons (2) (Cons (3) (Nil)))
  //
  //. > S.tail (Nil)
  //. Nothing
  //. ```
  function tail(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable.slice (1)) : Nothing;
    }
    var empty = Z.empty (foldable.constructor);
    return Z.reduce (function(m, x) {
      return Just (maybe (empty) (append (x)) (m));
    }, Nothing, foldable);
  }
  _.tail = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [f (a), $.Maybe (f (a))],
    impl: tail
  };

  //# init :: (Applicative f, Foldable f, Monoid (f a)) => f a -> Maybe (f a)
  //.
  //. Returns Just all but the last of the given structure's elements if the
  //. structure contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.init ([1, 2, 3])
  //. Just ([1, 2])
  //.
  //. > S.init ([])
  //. Nothing
  //.
  //. > S.init (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (Cons (1) (Cons (2) (Nil)))
  //.
  //. > S.init (Nil)
  //. Nothing
  //. ```
  function init(foldable) {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable.slice (0, -1)) : Nothing;
    }
    var empty = Z.empty (foldable.constructor);
    return Z.map (Pair.snd, Z.reduce (function(m, x) {
      return Just (Pair (x) (maybe (empty) (pair (append)) (m)));
    }, Nothing, foldable));
  }
  _.init = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [f (a), $.Maybe (f (a))],
    impl: init
  };

  //# take :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just the first N elements of the given structure if N is
  //. non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.take (0) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.take (1) (['foo', 'bar'])
  //. Just (['foo'])
  //.
  //. > S.take (2) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.take (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.take (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
  //. Just (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. ```
  function _takeDrop(arrayCase, generalCase) {
    return function(n) {
      return function(xs) {
        if (n < 0) return Nothing;

        //  Fast path for arrays.
        if (Array.isArray (xs)) {
          return n <= xs.length ? Just (arrayCase (n, xs)) : Nothing;
        }

        //  m :: Maybe (Pair Integer (f a))
        var m = Z.reduce (function(m, x) {
          return Z.map (function(pair) {
            var n = pair.fst;
            var xs = pair.snd;
            return Pair (n - 1) (generalCase (n, xs, x));
          }, m);
        }, Just (Pair (n) (Z.empty (xs.constructor))), xs);

        return Z.map (Pair.snd, Z.reject (B (gt (0)) (Pair.fst), m));
      };
    };
  }
  var take = _takeDrop (
    function(n, xs) { return xs.slice (0, n); },
    function(n, xs, x) { return n > 0 ? Z.append (x, xs) : xs; }
  );
  _.take = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [$.Integer, f (a), $.Maybe (f (a))],
    impl: take
  };

  //# drop :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just all but the first N elements of the given structure if
  //. N is non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.drop (0) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.drop (1) (['foo', 'bar'])
  //. Just (['bar'])
  //.
  //. > S.drop (2) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.drop (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.drop (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
  //. Just (Cons (4) (Cons (5) (Nil)))
  //. ```
  var drop = _takeDrop (
    function(n, xs) { return xs.slice (n); },
    function(n, xs, x) { return n > 0 ? xs : Z.append (x, xs); }
  );
  _.drop = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [$.Integer, f (a), $.Maybe (f (a))],
    impl: drop
  };

  //# takeLast :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just the last N elements of the given structure if N is
  //. non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.takeLast (0) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.takeLast (1) (['foo', 'bar'])
  //. Just (['bar'])
  //.
  //. > S.takeLast (2) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.takeLast (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.takeLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
  //. Just (Cons (2) (Cons (3) (Cons (4) (Nil))))
  //. ```
  function takeLast(n) {
    return function(xs) {
      return Z.map (Z.reverse, take (n) (Z.reverse (xs)));
    };
  }
  _.takeLast = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [$.Integer, f (a), $.Maybe (f (a))],
    impl: takeLast
  };

  //# dropLast :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just all but the last N elements of the given structure if
  //. N is non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.dropLast (0) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.dropLast (1) (['foo', 'bar'])
  //. Just (['foo'])
  //.
  //. > S.dropLast (2) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.dropLast (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.dropLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
  //. Just (Cons (1) (Nil))
  //. ```
  function dropLast(n) {
    return function(xs) {
      return Z.map (Z.reverse, drop (n) (Z.reverse (xs)));
    };
  }
  _.dropLast = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [$.Integer, f (a), $.Maybe (f (a))],
    impl: dropLast
  };

  //# takeWhile :: (a -> Boolean) -> Array a -> Array a
  //.
  //. Discards the first element that does not satisfy the predicate,
  //. and all subsequent elements.
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > S.takeWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7]
  //.
  //. > S.takeWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. []
  //. ```
  function takeWhile(pred) {
    return function(xs) {
      var idx = 0;
      while (idx < xs.length && pred (xs[idx])) idx += 1;
      return xs.slice (0, idx);
    };
  }
  _.takeWhile = {
    consts: {},
    types: [$.Predicate (a), $.Array (a), $.Array (a)],
    impl: takeWhile
  };

  //# dropWhile :: (a -> Boolean) -> Array a -> Array a
  //.
  //. Retains the first element that does not satisfy the predicate,
  //. and all subsequent elements.
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > S.dropWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [6, 3, 5, 4]
  //.
  //. > S.dropWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7, 6, 3, 5, 4]
  //. ```
  function dropWhile(pred) {
    return function(xs) {
      var idx = 0;
      while (idx < xs.length && pred (xs[idx])) idx += 1;
      return xs.slice (idx);
    };
  }
  _.dropWhile = {
    consts: {},
    types: [$.Predicate (a), $.Array (a), $.Array (a)],
    impl: dropWhile
  };

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. ```javascript
  //. > S.size ([])
  //. 0
  //.
  //. > S.size (['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > S.size (Nil)
  //. 0
  //.
  //. > S.size (Cons ('foo') (Cons ('bar') (Cons ('baz') (Nil))))
  //. 3
  //.
  //. > S.size (S.Nothing)
  //. 0
  //.
  //. > S.size (S.Just ('quux'))
  //. 1
  //.
  //. > S.size (S.Pair ('ignored!') ('counted!'))
  //. 1
  //. ```
  _.size = {
    consts: {f: [Z.Foldable]},
    types: [f (a), $.Integer],
    impl: Z.size
  };

  //# all :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] all the elements of the structure satisfy the
  //. predicate.
  //.
  //. See also [`any`](#any) and [`none`](#none).
  //.
  //. ```javascript
  //. > S.all (S.odd) ([])
  //. true
  //.
  //. > S.all (S.odd) ([1, 3, 5])
  //. true
  //.
  //. > S.all (S.odd) ([1, 2, 3])
  //. false
  //. ```
  _.all = {
    consts: {f: [Z.Foldable]},
    types: [$.Predicate (a), f (a), $.Boolean],
    impl: curry2 (Z.all)
  };

  //# any :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] any element of the structure satisfies the
  //. predicate.
  //.
  //. See also [`all`](#all) and [`none`](#none).
  //.
  //. ```javascript
  //. > S.any (S.odd) ([])
  //. false
  //.
  //. > S.any (S.odd) ([2, 4, 6])
  //. false
  //.
  //. > S.any (S.odd) ([1, 2, 3])
  //. true
  //. ```
  _.any = {
    consts: {f: [Z.Foldable]},
    types: [$.Predicate (a), f (a), $.Boolean],
    impl: curry2 (Z.any)
  };

  //# none :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] none of the elements of the structure satisfies
  //. the predicate.
  //.
  //. Properties:
  //.
  //.   - `forall p :: a -> Boolean, xs :: Foldable f => f a.
  //.      S.none (p) (xs) = S.not (S.any (p) (xs))`
  //.
  //.   - `forall p :: a -> Boolean, xs :: Foldable f => f a.
  //.      S.none (p) (xs) = S.all (S.complement (p)) (xs)`
  //.
  //. See also [`all`](#all) and [`any`](#any).
  //.
  //. ```javascript
  //. > S.none (S.odd) ([])
  //. true
  //.
  //. > S.none (S.odd) ([2, 4, 6])
  //. true
  //.
  //. > S.none (S.odd) ([1, 2, 3])
  //. false
  //. ```
  _.none = {
    consts: {f: [Z.Foldable]},
    types: [$.Predicate (a), f (a), $.Boolean],
    impl: curry2 (Z.none)
  };

  //# append :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > S.append (3) ([1, 2])
  //. [1, 2, 3]
  //.
  //. > S.append (3) (Cons (1) (Cons (2) (Nil)))
  //. Cons (1) (Cons (2) (Cons (3) (Nil)))
  //.
  //. > S.append ([1]) (S.Nothing)
  //. Just ([1])
  //.
  //. > S.append ([3]) (S.Just ([1, 2]))
  //. Just ([1, 2, 3])
  //. ```
  function append(x) {
    return function(xs) {
      return Z.append (x, xs);
    };
  }
  _.append = {
    consts: {f: [Z.Applicative, Z.Semigroup]},
    types: [a, f (a), f (a)],
    impl: append
  };

  //# prepend :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > S.prepend (1) ([2, 3])
  //. [1, 2, 3]
  //.
  //. > S.prepend (1) (Cons (2) (Cons (3) (Nil)))
  //. Cons (1) (Cons (2) (Cons (3) (Nil)))
  //.
  //. > S.prepend ([1]) (S.Nothing)
  //. Just ([1])
  //.
  //. > S.prepend ([1]) (S.Just ([2, 3]))
  //. Just ([1, 2, 3])
  //. ```
  _.prepend = {
    consts: {f: [Z.Applicative, Z.Semigroup]},
    types: [a, f (a), f (a)],
    impl: curry2 (Z.prepend)
  };

  //# joinWith :: String -> Array String -> String
  //.
  //. Joins the strings of the second argument separated by the first argument.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String.
  //.      S.joinWith (s) (S.splitOn (s) (t)) = t`
  //.
  //. See also [`splitOn`](#splitOn).
  //.
  //. ```javascript
  //. > S.joinWith (':') (['foo', 'bar', 'baz'])
  //. 'foo:bar:baz'
  //. ```
  _.joinWith = {
    consts: {},
    types: [$.String, $.Array ($.String), $.String],
    impl: invoke1 ('join')
  };

  //# elem :: (Setoid a, Foldable f) => a -> f a -> Boolean
  //.
  //. Takes a value and a structure and returns `true` [iff][] the value is an
  //. element of the structure.
  //.
  //. See also [`find`](#find).
  //.
  //. ```javascript
  //. > S.elem ('c') (['a', 'b', 'c'])
  //. true
  //.
  //. > S.elem ('x') (['a', 'b', 'c'])
  //. false
  //.
  //. > S.elem (3) ({x: 1, y: 2, z: 3})
  //. true
  //.
  //. > S.elem (8) ({x: 1, y: 2, z: 3})
  //. false
  //.
  //. > S.elem (0) (S.Just (0))
  //. true
  //.
  //. > S.elem (0) (S.Just (1))
  //. false
  //.
  //. > S.elem (0) (S.Nothing)
  //. false
  //. ```
  _.elem = {
    consts: {a: [Z.Setoid], f: [Z.Foldable]},
    types: [a, f (a), $.Boolean],
    impl: curry2 (Z.elem)
  };

  //# find :: Foldable f => (a -> Boolean) -> f a -> Maybe a
  //.
  //. Takes a predicate and a structure and returns Just the leftmost element
  //. of the structure that satisfies the predicate; Nothing if there is no
  //. such element.
  //.
  //. See also [`elem`](#elem).
  //.
  //. ```javascript
  //. > S.find (S.lt (0)) ([1, -2, 3, -4, 5])
  //. Just (-2)
  //.
  //. > S.find (S.lt (0)) ([1, 2, 3, 4, 5])
  //. Nothing
  //. ```
  function find(pred) {
    return function(xs) {
      return Z.reduce (
        function(m, x) {
          return m.isJust ? m : pred (x) ? Just (x) : Nothing;
        },
        Nothing,
        xs
      );
    };
  }
  _.find = {
    consts: {f: [Z.Foldable]},
    types: [$.Predicate (a), f (a), $.Maybe (a)],
    impl: find
  };

  //# foldMap :: (Monoid m, Foldable f) => TypeRep m -> (a -> m) -> f a -> m
  //.
  //. Curried version of [`Z.foldMap`][]. Deconstructs a foldable by mapping
  //. every element to a monoid and concatenating the results.
  //.
  //. ```javascript
  //. > S.foldMap (String) (f => f.name) ([Math.sin, Math.cos, Math.tan])
  //. 'sincostan'
  //.
  //. > S.foldMap (Array) (x => [x + 1, x + 2]) ([10, 20, 30])
  //. [11, 12, 21, 22, 31, 32]
  //. ```
  _.foldMap = {
    consts: {b: [Z.Monoid], f: [Z.Foldable]},
    types: [TypeRep (b), $.Fn (a) (b), f (a), b],
    impl: curry3 (Z.foldMap)
  };

  //# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
  //.
  //. Takes a function and a seed value, and returns an array generated by
  //. applying the function repeatedly. The array is initially empty. The
  //. function is initially applied to the seed value. Each application
  //. of the function should result in either:
  //.
  //.   - Nothing, in which case the array is returned; or
  //.
  //.   - Just a pair, in which case the first element is appended to
  //.     the array and the function is applied to the second element.
  //.
  //. ```javascript
  //. > S.unfoldr (n => n < 1000 ? S.Just (S.Pair (n) (2 * n)) : S.Nothing) (1)
  //. [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
  //. ```
  function unfoldr(f) {
    return function(x) {
      var result = [];
      for (var m = f (x); m.isJust; m = f (m.value.snd)) {
        result.push (m.value.fst);
      }
      return result;
    };
  }
  _.unfoldr = {
    consts: {},
    types: [$.Fn (b) ($.Maybe ($.Pair (a) (b))), b, $.Array (a)],
    impl: unfoldr
  };

  //# range :: Integer -> Integer -> Array Integer
  //.
  //. Returns an array of consecutive integers starting with the first argument
  //. and ending with the second argument minus one. Returns `[]` if the second
  //. argument is less than or equal to the first argument.
  //.
  //. ```javascript
  //. > S.range (0) (10)
  //. [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  //.
  //. > S.range (-5) (0)
  //. [-5, -4, -3, -2, -1]
  //.
  //. > S.range (0) (-5)
  //. []
  //. ```
  function range(from) {
    return function(to) {
      var result = [];
      for (var n = from; n < to; n += 1) result.push (n);
      return result;
    };
  }
  _.range = {
    consts: {},
    types: [$.Integer, $.Integer, $.Array ($.Integer)],
    impl: range
  };

  //# groupBy :: (a -> a -> Boolean) -> Array a -> Array (Array a)
  //.
  //. Splits its array argument into an array of arrays of equal,
  //. adjacent elements. Equality is determined by the function
  //. provided as the first argument. Its behaviour can be surprising
  //. for functions that aren't reflexive, transitive, and symmetric
  //. (see [equivalence][] relation).
  //.
  //. Properties:
  //.
  //.   - `forall f :: a -> a -> Boolean, xs :: Array a.
  //.      S.join (S.groupBy (f) (xs)) = xs`
  //.
  //. ```javascript
  //. > S.groupBy (S.equals) ([1, 1, 2, 1, 1])
  //. [[1, 1], [2], [1, 1]]
  //.
  //. > S.groupBy (x => y => x + y === 0) ([2, -3, 3, 3, 3, 4, -4, 4])
  //. [[2], [-3, 3, 3, 3], [4, -4], [4]]
  //. ```
  function groupBy(f) {
    return function(xs) {
      if (xs.length === 0) return [];
      var x0 = xs[0];         // :: a
      var active = [x0];      // :: Array a
      var result = [active];  // :: Array (Array a)
      for (var idx = 1; idx < xs.length; idx += 1) {
        var x = xs[idx];
        if (f (x0) (x)) active.push (x); else result.push (active = [x0 = x]);
      }
      return result;
    };
  }
  _.groupBy = {
    consts: {},
    types: [$.Fn (a) ($.Predicate (a)), $.Array (a), $.Array ($.Array (a))],
    impl: groupBy
  };

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. ```javascript
  //. > S.reverse ([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > S.reverse (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Cons (3) (Cons (2) (Cons (1) (Nil)))
  //.
  //. > S.pipe ([S.splitOn (''), S.reverse, S.joinWith ('')]) ('abc')
  //. 'cba'
  //. ```
  _.reverse = {
    consts: {f: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [f (a), f (a)],
    impl: Z.reverse
  };

  //# sort :: (Ord a, Applicative m, Foldable m, Monoid (m a)) => m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] for comparisons.
  //.
  //. Properties:
  //.
  //.   - `S.sort (S.sort (m)) = S.sort (m)` (idempotence)
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > S.sort (['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > S.sort ([S.Left (4), S.Right (3), S.Left (2), S.Right (1)])
  //. [Left (2), Left (4), Right (1), Right (3)]
  //. ```
  _.sort = {
    consts: {a: [Z.Ord], m: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [m (a), m (a)],
    impl: Z.sort
  };

  //# sortBy :: (Ord b, Applicative m, Foldable m, Monoid (m a)) => (a -> b) -> m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] to compare the values produced by applying the given function
  //. to each element of the structure.
  //.
  //. Properties:
  //.
  //.   - `S.sortBy (f) (S.sortBy (f) (m)) = S.sortBy (f) (m)` (idempotence)
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > S.sortBy (S.prop ('rank')) ([
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 2, suit: 'hearts'},
  //. . {rank: 5, suit: 'hearts'},
  //. . {rank: 5, suit: 'spades'},
  //. . {rank: 7, suit: 'spades'} ]
  //.
  //. > S.sortBy (S.prop ('suit')) ([
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 5, suit: 'hearts'},
  //. . {rank: 2, suit: 'hearts'},
  //. . {rank: 7, suit: 'spades'},
  //. . {rank: 5, suit: 'spades'} ]
  //. ```
  //.
  //. If descending order is desired, one may use [`Descending`][]:
  //.
  //. ```javascript
  //. > S.sortBy (Descending) ([83, 97, 110, 99, 116, 117, 97, 114, 121])
  //. [121, 117, 116, 114, 110, 99, 97, 97, 83]
  //. ```
  _.sortBy = {
    consts: {b: [Z.Ord], m: [Z.Applicative, Z.Foldable, Z.Monoid]},
    types: [$.Fn (a) (b), m (a), m (a)],
    impl: curry2 (Z.sortBy)
  };

  //# zip :: Array a -> Array b -> Array (Pair a b)
  //.
  //. Returns an array of pairs of corresponding elements from the given
  //. arrays. The length of the resulting array is equal to the length of
  //. the shorter input array.
  //.
  //. See also [`zipWith`](#zipWith).
  //.
  //. ```javascript
  //. > S.zip (['a', 'b']) (['x', 'y', 'z'])
  //. [Pair ('a') ('x'), Pair ('b') ('y')]
  //.
  //. > S.zip ([1, 3, 5]) ([2, 4])
  //. [Pair (1) (2), Pair (3) (4)]
  //. ```
  _.zip = {
    consts: {},
    types: [$.Array (a), $.Array (b), $.Array ($.Pair (a) (b))],
    impl: zipWith (Pair)
  };

  //# zipWith :: (a -> b -> c) -> Array a -> Array b -> Array c
  //.
  //. Returns the result of combining, pairwise, the given arrays using the
  //. given binary function. The length of the resulting array is equal to the
  //. length of the shorter input array.
  //.
  //. See also [`zip`](#zip).
  //.
  //. ```javascript
  //. > S.zipWith (a => b => a + b) (['a', 'b']) (['x', 'y', 'z'])
  //. ['ax', 'by']
  //.
  //. > S.zipWith (a => b => [a, b]) ([1, 3, 5]) ([2, 4])
  //. [[1, 2], [3, 4]]
  //. ```
  function zipWith(f) {
    return function(xs) {
      return function(ys) {
        var result = [];
        var len = Math.min (xs.length, ys.length);
        for (var idx = 0; idx < len; idx += 1) {
          result.push (f (xs[idx]) (ys[idx]));
        }
        return result;
      };
    };
  }
  _.zipWith = {
    consts: {},
    types: [$.Fn (a) ($.Fn (b) (c)), $.Array (a), $.Array (b), $.Array (c)],
    impl: zipWith
  };

  //. ### Object

  //# prop :: String -> a -> b
  //.
  //. Takes a property name and an object with known properties and returns
  //. the value of the specified property. If for some reason the object
  //. lacks the specified property, a type error is thrown.
  //.
  //. For accessing properties of uncertain objects, use [`get`](#get) instead.
  //. For accessing string map values by key, use [`value`](#value) instead.
  //.
  //. ```javascript
  //. > S.prop ('a') ({a: 1, b: 2})
  //. 1
  //. ```
  function prop(key) {
    return function(x) {
      var obj = toObject (x);
      if (key in obj) return obj[key];
      throw new TypeError ('‘prop’ expected object to have a property named ' +
                           '‘' + key + '’; ' + show (x) + ' does not');
    };
  }
  _.prop = {
    consts: {},
    types: [$.String, a, b],
    impl: prop
  };

  //# props :: Array String -> a -> b
  //.
  //. Takes a property path (an array of property names) and an object with
  //. known structure and returns the value at the given path. If for some
  //. reason the path does not exist, a type error is thrown.
  //.
  //. For accessing property paths of uncertain objects, use [`gets`](#gets)
  //. instead.
  //.
  //. ```javascript
  //. > S.props (['a', 'b', 'c']) ({a: {b: {c: 1}}})
  //. 1
  //. ```
  function props(path) {
    return function(x) {
      return path.reduce (function(x, key) {
        var obj = toObject (x);
        if (key in obj) return obj[key];
        throw new TypeError ('‘props’ expected object to have a property at ' +
                             show (path) + '; ' + show (x) + ' does not');
      }, x);
    };
  }
  _.props = {
    consts: {},
    types: [$.Array ($.String), a, b],
    impl: props
  };

  //# get :: (Any -> Boolean) -> String -> a -> Maybe b
  //.
  //. Takes a predicate, a property name, and an object and returns Just the
  //. value of the specified object property if it exists and the value
  //. satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`gets`](#gets), [`prop`](#prop), and [`value`](#value).
  //.
  //. ```javascript
  //. > S.get (S.is ($.Number)) ('x') ({x: 1, y: 2})
  //. Just (1)
  //.
  //. > S.get (S.is ($.Number)) ('x') ({x: '1', y: '2'})
  //. Nothing
  //.
  //. > S.get (S.is ($.Number)) ('x') ({})
  //. Nothing
  //.
  //. > S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3]})
  //. Just ([1, 2, 3])
  //.
  //. > S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3, null]})
  //. Nothing
  //. ```
  function get(pred) {
    return B (B (filter (pred))) (get_);
  }
  _.get = {
    consts: {},
    types: [$.Predicate ($.Any), $.String, a, $.Maybe (b)],
    impl: get
  };

  //# gets :: (Any -> Boolean) -> Array String -> a -> Maybe b
  //.
  //. Takes a predicate, a property path (an array of property names), and
  //. an object and returns Just the value at the given path if such a path
  //. exists and the value satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`get`](#get).
  //.
  //. ```javascript
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: 42}}})
  //. Just (42)
  //.
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: '42'}}})
  //. Nothing
  //.
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({})
  //. Nothing
  //. ```
  function gets(pred) {
    return function(keys) {
      return function(x) {
        return Z.filter (pred, keys.reduce (function(maybe, key) {
          return Z.chain (get_ (key), maybe);
        }, Just (x)));
      };
    };
  }
  _.gets = {
    consts: {},
    types: [$.Predicate ($.Any), $.Array ($.String), a, $.Maybe (b)],
    impl: gets
  };

  //. ### StrMap
  //.
  //. StrMap is an abbreviation of _string map_. A string map is an object,
  //. such as `{foo: 1, bar: 2, baz: 3}`, whose values are all members of
  //. the same type. Formally, a value is a member of type `StrMap a` if its
  //. [type identifier][] is `'Object'` and the values of its enumerable own
  //. properties are all members of type `a`.

  //# value :: String -> StrMap a -> Maybe a
  //.
  //. Retrieve the value associated with the given key in the given string map.
  //.
  //. Formally, `value (k) (m)` evaluates to `Just (m[k])` if `k` is an
  //. enumerable own property of `m`; `Nothing` otherwise.
  //.
  //. See also [`prop`](#prop) and [`get`](#get).
  //.
  //. ```javascript
  //. > S.value ('foo') ({foo: 1, bar: 2})
  //. Just (1)
  //.
  //. > S.value ('bar') ({foo: 1, bar: 2})
  //. Just (2)
  //.
  //. > S.value ('baz') ({foo: 1, bar: 2})
  //. Nothing
  //. ```
  function value(key) {
    return function(strMap) {
      return Object.prototype.propertyIsEnumerable.call (strMap, key) ?
             Just (strMap[key]) :
             Nothing;
    };
  }
  _.value = {
    consts: {},
    types: [$.String, $.StrMap (a), $.Maybe (a)],
    impl: value
  };

  //# singleton :: String -> a -> StrMap a
  //.
  //. Takes a string and a value of any type, and returns a string map with
  //. a single entry (mapping the key to the value).
  //.
  //. ```javascript
  //. > S.singleton ('foo') (42)
  //. {foo: 42}
  //. ```
  function singleton(key) {
    return function(val) {
      var strMap = {};
      strMap[key] = val;
      return strMap;
    };
  }
  _.singleton = {
    consts: {},
    types: [$.String, a, $.StrMap (a)],
    impl: singleton
  };

  //# insert :: String -> a -> StrMap a -> StrMap a
  //.
  //. Takes a string, a value of any type, and a string map, and returns a
  //. string map comprising all the entries of the given string map plus the
  //. entry specified by the first two arguments (which takes precedence).
  //.
  //. Equivalent to Haskell's `insert` function. Similar to Clojure's `assoc`
  //. function.
  //.
  //. ```javascript
  //. > S.insert ('c') (3) ({a: 1, b: 2})
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.insert ('a') (4) ({a: 1, b: 2})
  //. {a: 4, b: 2}
  //. ```
  function insert(key) {
    return function(val) {
      return function(strMap) {
        return Z.concat (strMap, singleton (key) (val));
      };
    };
  }
  _.insert = {
    consts: {},
    types: [$.String, a, $.StrMap (a), $.StrMap (a)],
    impl: insert
  };

  //# remove :: String -> StrMap a -> StrMap a
  //.
  //. Takes a string and a string map, and returns a string map comprising all
  //. the entries of the given string map except the one whose key matches the
  //. given string (if such a key exists).
  //.
  //. Equivalent to Haskell's `delete` function. Similar to Clojure's `dissoc`
  //. function.
  //.
  //. ```javascript
  //. > S.remove ('c') ({a: 1, b: 2, c: 3})
  //. {a: 1, b: 2}
  //.
  //. > S.remove ('c') ({})
  //. {}
  //. ```
  function remove(key) {
    return function(strMap) {
      var result = Z.concat (strMap, {});
      delete result[key];
      return result;
    };
  }
  _.remove = {
    consts: {},
    types: [$.String, $.StrMap (a), $.StrMap (a)],
    impl: remove
  };

  //# keys :: StrMap a -> Array String
  //.
  //. Returns the keys of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.keys ({b: 2, c: 3, a: 1}))
  //. ['a', 'b', 'c']
  //. ```
  _.keys = {
    consts: {},
    types: [$.StrMap (a), $.Array ($.String)],
    impl: Object.keys
  };

  //# values :: StrMap a -> Array a
  //.
  //. Returns the values of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.values ({a: 1, c: 3, b: 2}))
  //. [1, 2, 3]
  //. ```
  function values(strMap) {
    return Z.map (function(k) { return strMap[k]; }, Object.keys (strMap));
  }
  _.values = {
    consts: {},
    types: [$.StrMap (a), $.Array (a)],
    impl: values
  };

  //# pairs :: StrMap a -> Array (Pair String a)
  //.
  //. Returns the key–value pairs of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.pairs ({b: 2, a: 1, c: 3}))
  //. [Pair ('a') (1), Pair ('b') (2), Pair ('c') (3)]
  //. ```
  function pairs(strMap) {
    return Z.map (function(k) { return Pair (k) (strMap[k]); },
                  Object.keys (strMap));
  }
  _.pairs = {
    consts: {},
    types: [$.StrMap (a), $.Array ($.Pair ($.String) (a))],
    impl: pairs
  };

  //# fromPairs :: Foldable f => f (Pair String a) -> StrMap a
  //.
  //. Returns a string map containing the key–value pairs specified by the
  //. given [Foldable][]. If a key appears in multiple pairs, the rightmost
  //. pair takes precedence.
  //.
  //. ```javascript
  //. > S.fromPairs ([S.Pair ('a') (1), S.Pair ('b') (2), S.Pair ('c') (3)])
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.fromPairs ([S.Pair ('x') (1), S.Pair ('x') (2)])
  //. {x: 2}
  //. ```
  function fromPairs(pairs) {
    return Z.reduce (function(strMap, pair) {
      strMap[pair.fst] = pair.snd;
      return strMap;
    }, {}, pairs);
  }
  _.fromPairs = {
    consts: {f: [Z.Foldable]},
    types: [f ($.Pair ($.String) (a)), $.StrMap (a)],
    impl: fromPairs
  };

  //. ### Number

  //# negate :: ValidNumber -> ValidNumber
  //.
  //. Negates its argument.
  //.
  //. ```javascript
  //. > S.negate (12.5)
  //. -12.5
  //.
  //. > S.negate (-42)
  //. 42
  //. ```
  function negate(n) {
    return -n;
  }
  _.negate = {
    consts: {},
    types: [$.ValidNumber, $.ValidNumber],
    impl: negate
  };

  //# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.add (1) (1)
  //. 2
  //. ```
  function add(x) {
    return function(y) {
      return x + y;
    };
  }
  _.add = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: add
  };

  //# sum :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.sum ([1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.sum ([])
  //. 0
  //.
  //. > S.sum (S.Just (42))
  //. 42
  //.
  //. > S.sum (S.Nothing)
  //. 0
  //. ```
  _.sum = {
    consts: {f: [Z.Foldable]},
    types: [f ($.FiniteNumber), $.FiniteNumber],
    impl: reduce (add) (0)
  };

  //# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a finite number `n` and returns the _subtract `n`_ function.
  //.
  //. ```javascript
  //. > S.map (S.sub (1)) ([1, 2, 3])
  //. [0, 1, 2]
  //. ```
  function sub(y) {
    return function(x) {
      return x - y;
    };
  }
  _.sub = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: sub
  };

  //# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.mult (4) (2)
  //. 8
  //. ```
  function mult(x) {
    return function(y) {
      return x * y;
    };
  }
  _.mult = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: mult
  };

  //# product :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.product ([1, 2, 3, 4, 5])
  //. 120
  //.
  //. > S.product ([])
  //. 1
  //.
  //. > S.product (S.Just (42))
  //. 42
  //.
  //. > S.product (S.Nothing)
  //. 1
  //. ```
  _.product = {
    consts: {f: [Z.Foldable]},
    types: [f ($.FiniteNumber), $.FiniteNumber],
    impl: reduce (mult) (1)
  };

  //# div :: NonZeroFiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a non-zero finite number `n` and returns the _divide by `n`_
  //. function.
  //.
  //. ```javascript
  //. > S.map (S.div (2)) ([0, 1, 2, 3])
  //. [0, 0.5, 1, 1.5]
  //. ```
  function div(y) {
    return function(x) {
      return x / y;
    };
  }
  _.div = {
    consts: {},
    types: [$.NonZeroFiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: div
  };

  //# pow :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a finite number `n` and returns the _power of `n`_ function.
  //.
  //. ```javascript
  //. > S.map (S.pow (2)) ([-3, -2, -1, 0, 1, 2, 3])
  //. [9, 4, 1, 0, 1, 4, 9]
  //.
  //. > S.map (S.pow (0.5)) ([1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5]
  //. ```
  function pow(exp) {
    return function(base) {
      return Math.pow (base, exp);
    };
  }
  _.pow = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: pow
  };

  //# mean :: Foldable f => f FiniteNumber -> Maybe FiniteNumber
  //.
  //. Returns the mean of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.mean ([1, 2, 3, 4, 5])
  //. Just (3)
  //.
  //. > S.mean ([])
  //. Nothing
  //.
  //. > S.mean (S.Just (42))
  //. Just (42)
  //.
  //. > S.mean (S.Nothing)
  //. Nothing
  //. ```
  function mean(foldable) {
    var result = Z.reduce (
      function(acc, n) {
        acc.total += n;
        acc.count += 1;
        return acc;
      },
      {total: 0, count: 0},
      foldable
    );
    return result.count > 0 ? Just (result.total / result.count) : Nothing;
  }
  _.mean = {
    consts: {f: [Z.Foldable]},
    types: [f ($.FiniteNumber), $.Maybe ($.FiniteNumber)],
    impl: mean
  };

  //. ### Integer

  //# even :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > S.even (42)
  //. true
  //.
  //. > S.even (99)
  //. false
  //. ```
  function even(n) {
    return n % 2 === 0;
  }
  _.even = {
    consts: {},
    types: [$.Integer, $.Boolean],
    impl: even
  };

  //# odd :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > S.odd (99)
  //. true
  //.
  //. > S.odd (42)
  //. false
  //. ```
  function odd(n) {
    return n % 2 !== 0;
  }
  _.odd = {
    consts: {},
    types: [$.Integer, $.Boolean],
    impl: odd
  };

  //. ### Parse

  //# parseDate :: String -> Maybe ValidDate
  //.
  //. Takes a string `s` and returns `Just (new Date (s))` if `new Date (s)`
  //. evaluates to a [`ValidDate`][ValidDate] value; Nothing otherwise.
  //.
  //. As noted in [#488][], this function's behaviour is unspecified for some
  //. inputs! [MDN][date parsing] warns against using the `Date` constructor
  //. to parse date strings:
  //.
  //. > __Note:__ parsing of date strings with the `Date` constructor […] is
  //. > strongly discouraged due to browser differences and inconsistencies.
  //. > Support for RFC 2822 format strings is by convention only. Support for
  //. > ISO 8601 formats differs in that date-only strings (e.g. "1970-01-01")
  //. > are treated as UTC, not local.
  //.
  //. ```javascript
  //. > S.parseDate ('2011-01-19T17:40:00Z')
  //. Just (new Date ('2011-01-19T17:40:00.000Z'))
  //.
  //. > S.parseDate ('today')
  //. Nothing
  //. ```
  function parseDate(s) {
    var date = new Date (s);
    return isNaN (date.valueOf ()) ? Nothing : Just (date);
  }
  _.parseDate = {
    consts: {},
    types: [$.String, $.Maybe ($.ValidDate)],
    impl: parseDate
  };

  //  requiredNonCapturingGroup :: Array String -> String
  function requiredNonCapturingGroup(xs) {
    return '(?:' + xs.join ('|') + ')';
  }

  //  optionalNonCapturingGroup :: Array String -> String
  function optionalNonCapturingGroup(xs) {
    return requiredNonCapturingGroup (xs) + '?';
  }

  //  validFloatRepr :: RegExp
  var validFloatRepr = new RegExp (
    '^' +                     // start-of-string anchor
    '\\s*' +                  // any number of leading whitespace characters
    '[+-]?' +                 // optional sign
    requiredNonCapturingGroup ([
      'Infinity',             // "Infinity"
      'NaN',                  // "NaN"
      requiredNonCapturingGroup ([
        '[0-9]+',             // number
        '[0-9]+[.][0-9]+',    // number with interior decimal point
        '[0-9]+[.]',          // number with trailing decimal point
        '[.][0-9]+'           // number with leading decimal point
      ]) +
      optionalNonCapturingGroup ([
        '[Ee]' +              // "E" or "e"
        '[+-]?' +             // optional sign
        '[0-9]+'              // exponent
      ])
    ]) +
    '\\s*' +                  // any number of trailing whitespace characters
    '$'                       // end-of-string anchor
  );

  //# parseFloat :: String -> Maybe Number
  //.
  //. Takes a string and returns Just the number represented by the string
  //. if it does in fact represent a number; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseFloat ('-123.45')
  //. Just (-123.45)
  //.
  //. > S.parseFloat ('foo.bar')
  //. Nothing
  //. ```
  function parseFloat_(s) {
    return validFloatRepr.test (s) ? Just (parseFloat (s)) : Nothing;
  }
  _.parseFloat = {
    consts: {},
    types: [$.String, $.Maybe ($.Number)],
    impl: parseFloat_
  };

  //  Radix :: Type
  var Radix = $.NullaryType
    ('Radix')
    ('')
    ([$.Integer])
    (function(x) { return x >= 2 && x <= 36; });

  //# parseInt :: Radix -> String -> Maybe Integer
  //.
  //. Takes a radix (an integer between 2 and 36 inclusive) and a string,
  //. and returns Just the number represented by the string if it does in
  //. fact represent a number in the base specified by the radix; Nothing
  //. otherwise.
  //.
  //. This function is stricter than [`parseInt`][parseInt]: a string
  //. is considered to represent an integer only if all its non-prefix
  //. characters are members of the character set specified by the radix.
  //.
  //. ```javascript
  //. > S.parseInt (10) ('-42')
  //. Just (-42)
  //.
  //. > S.parseInt (16) ('0xFF')
  //. Just (255)
  //.
  //. > S.parseInt (16) ('0xGG')
  //. Nothing
  //. ```
  function parseInt_(radix) {
    return function(s) {
      var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice (0, radix);
      var pattern = new RegExp ('^[' + charset + ']+$', 'i');

      var t = s.replace (/^[+-]/, '');
      if (pattern.test (radix === 16 ? t.replace (/^0x/i, '') : t)) {
        var n = parseInt (s, radix);
        if ($.test ([]) ($.Integer) (n)) return Just (n);
      }
      return Nothing;
    };
  }
  _.parseInt = {
    consts: {},
    types: [Radix, $.String, $.Maybe ($.Integer)],
    impl: parseInt_
  };

  //# parseJson :: (Any -> Boolean) -> String -> Maybe a
  //.
  //. Takes a predicate and a string that may or may not be valid JSON, and
  //. returns Just the result of applying `JSON.parse` to the string *if* the
  //. result satisfies the predicate; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('["1","2","3"]')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[0,1.5,3,4.5]')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[1,2,3]')
  //. Just ([1, 2, 3])
  //. ```
  function parseJson(pred) {
    return B (filter (pred)) (B (eitherToMaybe) (encase (JSON.parse)));
  }
  _.parseJson = {
    consts: {},
    types: [$.Predicate ($.Any), $.String, $.Maybe (a)],
    impl: parseJson
  };

  //. ### RegExp

  //  Match :: Type
  var Match = $.RecordType ({
    match: $.String,
    groups: $.Array ($.Maybe ($.String))
  });

  //  toMatch :: Array String? -> Match
  function toMatch(ss) {
    return {
      match: ss[0],
      groups: Z.map (B (reject (equals (undefined))) (Just), ss.slice (1))
    };
  }

  //  withRegex :: (RegExp, () -> a) -> a
  function withRegex(pattern, thunk) {
    var lastIndex = pattern.lastIndex;
    var result = thunk ();
    pattern.lastIndex = lastIndex;
    return result;
  }

  //# regex :: RegexFlags -> String -> RegExp
  //.
  //. Takes a [RegexFlags][] and a pattern, and returns a RegExp.
  //.
  //. ```javascript
  //. > S.regex ('g') (':\\d+:')
  //. /:\d+:/g
  //. ```
  function regex(flags) {
    return function(source) {
      return new RegExp (source, flags);
    };
  }
  _.regex = {
    consts: {},
    types: [$.RegexFlags, $.String, $.RegExp],
    impl: regex
  };

  //# regexEscape :: String -> String
  //.
  //. Takes a string that may contain regular expression metacharacters,
  //. and returns a string with those metacharacters escaped.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String.
  //.      S.test (S.regex ('') (S.regexEscape (s))) (s) = true`
  //.
  //. ```javascript
  //. > S.regexEscape ('-=*{XYZ}*=-')
  //. '\\-=\\*\\{XYZ\\}\\*=\\-'
  //. ```
  function regexEscape(s) {
    return s.replace (/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  _.regexEscape = {
    consts: {},
    types: [$.String, $.String],
    impl: regexEscape
  };

  //# test :: RegExp -> String -> Boolean
  //.
  //. Takes a pattern and a string, and returns `true` [iff][] the pattern
  //. matches the string.
  //.
  //. ```javascript
  //. > S.test (/^a/) ('abacus')
  //. true
  //.
  //. > S.test (/^a/) ('banana')
  //. false
  //. ```
  function test(pattern) {
    return function(s) {
      return withRegex (pattern, function() { return pattern.test (s); });
    };
  }
  _.test = {
    consts: {},
    types: [$.RegExp, $.String, $.Boolean],
    impl: test
  };

  //# match :: NonGlobalRegExp -> String -> Maybe { match :: String, groups :: Array (Maybe String) }
  //.
  //. Takes a pattern and a string, and returns Just a match record if the
  //. pattern matches the string; Nothing otherwise.
  //.
  //. `groups :: Array (Maybe String)` acknowledges the existence of optional
  //. capturing groups.
  //.
  //. Properties:
  //.
  //.   - `forall p :: Pattern, s :: String.
  //.      S.head (S.matchAll (S.regex ('g') (p)) (s))
  //.      = S.match (S.regex ('') (p)) (s)`
  //.
  //. See also [`matchAll`](#matchAll).
  //.
  //. ```javascript
  //. > S.match (/(good)?bye/) ('goodbye')
  //. Just ({match: 'goodbye', groups: [Just ('good')]})
  //.
  //. > S.match (/(good)?bye/) ('bye')
  //. Just ({match: 'bye', groups: [Nothing]})
  //. ```
  function match(pattern) {
    return function(s) {
      return Z.map (toMatch,
                    Z.reject (equals (null), Just (s.match (pattern))));
    };
  }
  _.match = {
    consts: {},
    types: [$.NonGlobalRegExp, $.String, $.Maybe (Match)],
    impl: match
  };

  //# matchAll :: GlobalRegExp -> String -> Array { match :: String, groups :: Array (Maybe String) }
  //.
  //. Takes a pattern and a string, and returns an array of match records.
  //.
  //. `groups :: Array (Maybe String)` acknowledges the existence of optional
  //. capturing groups.
  //.
  //. See also [`match`](#match).
  //.
  //. ```javascript
  //. > S.matchAll (/@([a-z]+)/g) ('Hello, world!')
  //. []
  //.
  //. > S.matchAll (/@([a-z]+)/g) ('Hello, @foo! Hello, @bar! Hello, @baz!')
  //. [ {match: '@foo', groups: [Just ('foo')]},
  //. . {match: '@bar', groups: [Just ('bar')]},
  //. . {match: '@baz', groups: [Just ('baz')]} ]
  //. ```
  function matchAll(pattern) {
    return function(s) {
      return withRegex (pattern, function() {
        return unfoldr (function(_) {
          return Z.map (function(ss) {
            return Pair (toMatch (ss)) (null);
          }, Z.reject (equals (null), Just (pattern.exec (s))));
        }) ([]);
      });
    };
  }
  _.matchAll = {
    consts: {},
    types: [$.GlobalRegExp, $.String, $.Array (Match)],
    impl: matchAll
  };

  //. ### String

  //# toUpper :: String -> String
  //.
  //. Returns the upper-case equivalent of its argument.
  //.
  //. See also [`toLower`](#toLower).
  //.
  //. ```javascript
  //. > S.toUpper ('ABC def 123')
  //. 'ABC DEF 123'
  //. ```
  _.toUpper = {
    consts: {},
    types: [$.String, $.String],
    impl: invoke0 ('toUpperCase')
  };

  //# toLower :: String -> String
  //.
  //. Returns the lower-case equivalent of its argument.
  //.
  //. See also [`toUpper`](#toUpper).
  //.
  //. ```javascript
  //. > S.toLower ('ABC def 123')
  //. 'abc def 123'
  //. ```
  _.toLower = {
    consts: {},
    types: [$.String, $.String],
    impl: invoke0 ('toLowerCase')
  };

  //# trim :: String -> String
  //.
  //. Strips leading and trailing whitespace characters.
  //.
  //. ```javascript
  //. > S.trim ('\t\t foo bar \n')
  //. 'foo bar'
  //. ```
  _.trim = {
    consts: {},
    types: [$.String, $.String],
    impl: invoke0 ('trim')
  };

  //# stripPrefix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given prefix (the first argument) if the string starts
  //. with the prefix; Nothing otherwise.
  //.
  //. See also [`stripSuffix`](#stripSuffix).
  //.
  //. ```javascript
  //. > S.stripPrefix ('https://') ('https://sanctuary.js.org')
  //. Just ('sanctuary.js.org')
  //.
  //. > S.stripPrefix ('https://') ('http://sanctuary.js.org')
  //. Nothing
  //. ```
  function stripPrefix(prefix) {
    return function(s) {
      var idx = prefix.length;
      return s.slice (0, idx) === prefix ? Just (s.slice (idx)) : Nothing;
    };
  }
  _.stripPrefix = {
    consts: {},
    types: [$.String, $.String, $.Maybe ($.String)],
    impl: stripPrefix
  };

  //# stripSuffix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given suffix (the first argument) if the string ends
  //. with the suffix; Nothing otherwise.
  //.
  //. See also [`stripPrefix`](#stripPrefix).
  //.
  //. ```javascript
  //. > S.stripSuffix ('.md') ('README.md')
  //. Just ('README')
  //.
  //. > S.stripSuffix ('.md') ('README')
  //. Nothing
  //. ```
  function stripSuffix(suffix) {
    return function(s) {
      var idx = s.length - suffix.length;  // value may be negative
      return s.slice (idx) === suffix ? Just (s.slice (0, idx)) : Nothing;
    };
  }
  _.stripSuffix = {
    consts: {},
    types: [$.String, $.String, $.Maybe ($.String)],
    impl: stripSuffix
  };

  //# words :: String -> Array String
  //.
  //. Takes a string and returns the array of words the string contains
  //. (words are delimited by whitespace characters).
  //.
  //. See also [`unwords`](#unwords).
  //.
  //. ```javascript
  //. > S.words (' foo bar baz ')
  //. ['foo', 'bar', 'baz']
  //. ```
  function words(s) {
    var words = s.split (/\s+/);
    var len = words.length;
    return words.slice (words[0] === '' ? 1 : 0,
                        words[len - 1] === '' ? len - 1 : len);
  }
  _.words = {
    consts: {},
    types: [$.String, $.Array ($.String)],
    impl: words
  };

  //# unwords :: Array String -> String
  //.
  //. Takes an array of words and returns the result of joining the words
  //. with separating spaces.
  //.
  //. See also [`words`](#words).
  //.
  //. ```javascript
  //. > S.unwords (['foo', 'bar', 'baz'])
  //. 'foo bar baz'
  //. ```
  _.unwords = {
    consts: {},
    types: [$.Array ($.String), $.String],
    impl: invoke1 ('join') (' ')
  };

  //# lines :: String -> Array String
  //.
  //. Takes a string and returns the array of lines the string contains
  //. (lines are delimited by newlines: `'\n'` or `'\r\n'` or `'\r'`).
  //. The resulting strings do not contain newlines.
  //.
  //. See also [`unlines`](#unlines).
  //.
  //. ```javascript
  //. > S.lines ('foo\nbar\nbaz\n')
  //. ['foo', 'bar', 'baz']
  //. ```
  function lines(s) {
    return s === '' ? []
                    : (s.replace (/\r\n?/g, '\n')).match (/^(?=[\s\S]).*/gm);
  }
  _.lines = {
    consts: {},
    types: [$.String, $.Array ($.String)],
    impl: lines
  };

  //# unlines :: Array String -> String
  //.
  //. Takes an array of lines and returns the result of joining the lines
  //. after appending a terminating line feed (`'\n'`) to each.
  //.
  //. See also [`lines`](#lines).
  //.
  //. ```javascript
  //. > S.unlines (['foo', 'bar', 'baz'])
  //. 'foo\nbar\nbaz\n'
  //. ```
  function unlines(xs) {
    return xs.reduce (function(s, x) { return s + x + '\n'; }, '');
  }
  _.unlines = {
    consts: {},
    types: [$.Array ($.String), $.String],
    impl: unlines
  };

  //# splitOn :: String -> String -> Array String
  //.
  //. Returns the substrings of its second argument separated by occurrences
  //. of its first argument.
  //.
  //. See also [`joinWith`](#joinWith) and [`splitOnRegex`](#splitOnRegex).
  //.
  //. ```javascript
  //. > S.splitOn ('::') ('foo::bar::baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  _.splitOn = {
    consts: {},
    types: [$.String, $.String, $.Array ($.String)],
    impl: invoke1 ('split')
  };

  //# splitOnRegex :: GlobalRegExp -> String -> Array String
  //.
  //. Takes a pattern and a string, and returns the result of splitting the
  //. string at every non-overlapping occurrence of the pattern.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String.
  //.      S.joinWith (s)
  //.                 (S.splitOnRegex (S.regex ('g') (S.regexEscape (s))) (t))
  //.      = t`
  //.
  //. See also [`splitOn`](#splitOn).
  //.
  //. ```javascript
  //. > S.splitOnRegex (/[,;][ ]*/g) ('foo, bar, baz')
  //. ['foo', 'bar', 'baz']
  //.
  //. > S.splitOnRegex (/[,;][ ]*/g) ('foo;bar;baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  function splitOnRegex(pattern) {
    return function(s) {
      return withRegex (pattern, function() {
        var result = [];
        var lastIndex = 0;
        var match;
        while ((match = pattern.exec (s)) != null) {
          if (pattern.lastIndex === lastIndex && match[0] === '') {
            if (pattern.lastIndex === s.length) return result;
            pattern.lastIndex += 1;
          } else {
            result.push (s.slice (lastIndex, match.index));
            lastIndex = match.index + match[0].length;
          }
        }
        result.push (s.slice (lastIndex));
        return result;
      });
    };
  }
  _.splitOnRegex = {
    consts: {},
    types: [$.GlobalRegExp, $.String, $.Array ($.String)],
    impl: splitOnRegex
  };

  return create ({
    checkTypes: typeof process === 'undefined'
                || process == null
                || process.env == null
                || process.env.NODE_ENV !== 'production',
    env: $.env
  });

}));

//. [#438]:                     https://github.com/sanctuary-js/sanctuary/issues/438
//. [#488]:                     https://github.com/sanctuary-js/sanctuary/issues/488
//. [Apply]:                    v:fantasyland/fantasy-land#apply
//. [Chain]:                    v:fantasyland/fantasy-land#chain
//. [Either]:                   #either-type
//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
//. [Folktale]:                 https://folktale.origamitower.com/
//. [GIGO]:                     https://en.wikipedia.org/wiki/Garbage_in,_garbage_out
//. [Haskell]:                  https://www.haskell.org/
//. [Kleisli]:                  https://en.wikipedia.org/wiki/Kleisli_category
//. [Maybe]:                    #maybe-type
//. [Nullable]:                 v:sanctuary-js/sanctuary-def#Nullable
//. [PureScript]:               http://www.purescript.org/
//. [Ramda]:                    http://ramdajs.com/
//. [RegexFlags]:               v:sanctuary-js/sanctuary-def#RegexFlags
//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
//. [ValidDate]:                v:sanctuary-js/sanctuary-def#ValidDate
//. [`$.test`]:                 v:sanctuary-js/sanctuary-def#test
//. [`Descending`]:             v:sanctuary-js/sanctuary-descending#Descending
//. [`R.__`]:                   http://ramdajs.com/docs/#__
//. [`R.bind`]:                 http://ramdajs.com/docs/#bind
//. [`R.invoker`]:              http://ramdajs.com/docs/#invoker
//. [`Z.alt`]:                  v:sanctuary-js/sanctuary-type-classes#alt
//. [`Z.ap`]:                   v:sanctuary-js/sanctuary-type-classes#ap
//. [`Z.apFirst`]:              v:sanctuary-js/sanctuary-type-classes#apFirst
//. [`Z.apSecond`]:             v:sanctuary-js/sanctuary-type-classes#apSecond
//. [`Z.bimap`]:                v:sanctuary-js/sanctuary-type-classes#bimap
//. [`Z.chain`]:                v:sanctuary-js/sanctuary-type-classes#chain
//. [`Z.chainRec`]:             v:sanctuary-js/sanctuary-type-classes#chainRec
//. [`Z.compose`]:              v:sanctuary-js/sanctuary-type-classes#compose
//. [`Z.concat`]:               v:sanctuary-js/sanctuary-type-classes#concat
//. [`Z.contramap`]:            v:sanctuary-js/sanctuary-type-classes#contramap
//. [`Z.duplicate`]:            v:sanctuary-js/sanctuary-type-classes#duplicate
//. [`Z.empty`]:                v:sanctuary-js/sanctuary-type-classes#empty
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.extend`]:               v:sanctuary-js/sanctuary-type-classes#extend
//. [`Z.extract`]:              v:sanctuary-js/sanctuary-type-classes#extract
//. [`Z.filter`]:               v:sanctuary-js/sanctuary-type-classes#filter
//. [`Z.flip`]:                 v:sanctuary-js/sanctuary-type-classes#flip
//. [`Z.foldMap`]:              v:sanctuary-js/sanctuary-type-classes#foldMap
//. [`Z.gt`]:                   v:sanctuary-js/sanctuary-type-classes#gt
//. [`Z.gte`]:                  v:sanctuary-js/sanctuary-type-classes#gte
//. [`Z.id`]:                   v:sanctuary-js/sanctuary-type-classes#id
//. [`Z.invert`]:               v:sanctuary-js/sanctuary-type-classes#invert
//. [`Z.join`]:                 v:sanctuary-js/sanctuary-type-classes#join
//. [`Z.lt`]:                   v:sanctuary-js/sanctuary-type-classes#lt
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [`Z.map`]:                  v:sanctuary-js/sanctuary-type-classes#map
//. [`Z.mapLeft`]:              v:sanctuary-js/sanctuary-type-classes#mapLeft
//. [`Z.of`]:                   v:sanctuary-js/sanctuary-type-classes#of
//. [`Z.promap`]:               v:sanctuary-js/sanctuary-type-classes#promap
//. [`Z.reject`]:               v:sanctuary-js/sanctuary-type-classes#reject
//. [`Z.sequence`]:             v:sanctuary-js/sanctuary-type-classes#sequence
//. [`Z.traverse`]:             v:sanctuary-js/sanctuary-type-classes#traverse
//. [`Z.zero`]:                 v:sanctuary-js/sanctuary-type-classes#zero
//. [`show`]:                   v:sanctuary-js/sanctuary-show#show
//. [date parsing]:             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//. [equivalence]:              https://en.wikipedia.org/wiki/Equivalence_relation
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [parseInt]:                 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
//. [partial functions]:        https://en.wikipedia.org/wiki/Partial_function
//. [ramda/ramda#683]:          https://github.com/ramda/ramda/issues/683
//. [ramda/ramda#1413]:         https://github.com/ramda/ramda/issues/1413
//. [ramda/ramda#1419]:         https://github.com/ramda/ramda/pull/1419
//. [sanctuary-def]:            v:sanctuary-js/sanctuary-def
//. [sanctuary-either]:         v:sanctuary-js/sanctuary-either
//. [sanctuary-maybe]:          v:sanctuary-js/sanctuary-maybe
//. [sanctuary-pair]:           v:sanctuary-js/sanctuary-pair
//. [sanctuary-show]:           v:sanctuary-js/sanctuary-show
//. [sanctuary-type-classes]:   v:sanctuary-js/sanctuary-type-classes
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [thrush]:                   https://github.com/raganwald-deprecated/homoiconic/blob/master/2008-10-30/thrush.markdown
//. [total functions]:          https://en.wikipedia.org/wiki/Partial_function#Total_function
//. [type checking]:            #type-checking
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
//. [variadic functions]:       https://en.wikipedia.org/wiki/Variadic_function
});

/**
 * Takes a `key` and returns a function that expects an array of objects
 * (containing a property equal to `key`) that finally returns an Object<K,V>
 * where `K` is the key name used to group all elements of `xs` and `V` is an
 * array of elements from `xs` matching the `key` value.
 *
 * @param {String} key
 * @return {function(xs: T[]): Object<K,V>}
 *
 *   Where `K` is the key name used to group all the elements of `xs`.
 *
 * @example
 *
 * const persons = [
 *   { id: 1, name: "John" },
 *   { id: 2, name: "James" },
 *   { id: 3, name: "Jack" },
 *   { id: 4, name: "James" },
 *   { id: 5, name: "Jack" },
 *   { id: 6, name: "James" },
 * ];
 *
 * dictGroupByKey ("name") (persons); //=> {John: Array[1], James: Array[3], Jack: Array[2]}
 *
 * //
 * // {
 * //   "John": [
 * //     { "id": 1, "name": "John" }
 * //   ],
 * //   "James": [
 * //     { "id": 2, "name": "James" },
 * //     { "id": 4, "name": "James" },
 * //     { "id": 6, "name": "James" }
 * //   ],
 * //   "Jack": [
 * //     { "id": 3, "name": "Jack" },
 * //     { "id": 5, "name": "Jack" }
 * //   ]
 * // }
 * //
 *
 */

var dictGroupByKey = function dictGroupByKey(key) {
  return sanctuary.reduce(function (acc) {
    return function (x) {
      return _objectSpread2({}, acc, _defineProperty({}, x[key], acc[x[key]] ? [].concat(_toConsumableArray(acc[x[key]]), [x]) : [x]));
    };
  })({});
};

/**
 * Takes a `key`, returns a function that expects an array of objects, finally
 * returns an object of unique keys.
 *
 * @param {String} key
 * @return {function(xs: T[]): Object<T<K>, Boolean<True>>}
 *
 *   Where `K` is the key value on some T and `Boolean<True>` is placeholder.
 *
 * @example
 *
 * const persons = [
 *   { id: 1, name: "John" },
 *   { id: 2, name: "James" },
 *   { id: 3, name: "Jack" },
 *   { id: 4, name: "James" },
 *   { id: 5, name: "Jack" },
 *   { id: 6, name: "James" },
 * ];
 *
 * dictByKey ("name") (persons); //=> { John: true, James: true, Jack: true }
 *
 */

var dictByKey = function dictByKey(key) {
  return sanctuary.reduce(function (acc) {
    return function (x) {
      return _objectSpread2({}, acc, _defineProperty({}, x[key], true));
    };
  })({});
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var bindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = bindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var $filter = arrayIteration.filter;


// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/**
 * isFalse :: a -> Boolean
 *
 * @param {*} a
 * @return {Boolean}
 */
var isFalse = function isFalse(a) {
  return !!a;
};

/**
 * Removes elements of the array that evaluate to false.
 *
 * filterFalse :: [*] -> [*]
 *
 * @return {Array}
 */

var filterFalse = function filterFalse(xs) {
  return Array.prototype.filter.call(xs, isFalse);
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$1 = Object.keys;
/**
 * @param {String} key
 * @return {function(xs: T[]): String[]}
 * @example
 *
 * const persons = [
 *   { id: 1, name: "John" },
 *   { id: 2, name: "James" },
 *   { id: 3, name: "Jack" },
 *   { id: 4, name: "James" },
 *   { id: 5, name: "Jack" },
 *   { id: 6, name: "James" },
 * ];
 *
 * uniqValuesByKey ("name") (persons); //=> ["John", "James", "Jack"]
 *
 */

var uniqValuesByKey = function uniqValuesByKey(key) {
  return sanctuary.pipe([dictByKey(key), keys$1]);
};



var index$1 = /*#__PURE__*/Object.freeze({
	dictGroupByKey: dictGroupByKey,
	dictByKey: dictByKey,
	filterFalse: filterFalse,
	uniqValuesByKey: uniqValuesByKey
});

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var defineProperty = objectDefineProperty.f;



var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR$1, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;
});
var internalMetadata_1 = internalMetadata.REQUIRED;
var internalMetadata_2 = internalMetadata.fastKey;
var internalMetadata_3 = internalMetadata.getWeakData;
var internalMetadata_4 = internalMetadata.onFreeze;

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$1 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
};

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var SPECIES$2 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
    defineProperty(Constructor, SPECIES$2, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var defineProperty$1 = objectDefineProperty.f;








var fastKey = internalMetadata.fastKey;


var setInternalState$1 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (descriptors) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$1(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$1(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
var es_map = collection('Map', function (get) {
  return function Map() { return get(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong, true);

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;

var ObjectPrototype$1 = Object.prototype;

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (objectToString !== ObjectPrototype$1.toString) {
  redefine(ObjectPrototype$1, 'toString', objectToString, { unsafe: true });
}

var nativePromiseConstructor = global_1.Promise;

var SPECIES$3 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
};

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process$1 = global_1.process;
var MessageChannel = global_1.MessageChannel;
var Dispatch = global_1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global_1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classofRaw(process$1) == 'process') {
    defer = function (id) {
      process$1.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
    defer = post;
    global_1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set$1,
  clear: clear
};

var userAgent = getBuiltIn('navigator', 'userAgent') || '';

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

var macrotask = task.set;


var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
var process$2 = global_1.process;
var Promise$1 = global_1.Promise;
var IS_NODE = classofRaw(process$2) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global_1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$5 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$5
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global_1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var task$1 = task.set;










var SPECIES$4 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState$1 = internalState.get;
var setInternalState$2 = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global_1.TypeError;
var document$2 = global_1.document;
var process$3 = global_1.process;
var $fetch = global_1.fetch;
var versions = process$3 && process$3.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = classofRaw(process$3) == 'process';
var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED$1 = isForced_1(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var empty = function () { /* empty */ };
  var FakePromise = (promise.constructor = {})[SPECIES$4] = function (exec) {
    exec(empty, empty);
  };
  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !((IS_NODE$1 || typeof PromiseRejectionEvent == 'function')
    && (!isPure || promise['finally'])
    && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0
    && userAgent.indexOf('Chrome/66') === -1);
});

var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$2.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global_1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global_1['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    if (IS_NODE$1) {
      process$3.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$1) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState$1(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState$2(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$1(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if ( typeof nativePromiseConstructor == 'function') {
    nativeThen = nativePromiseConstructor.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    });

    // wrap fetch result
    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
      }
    });
  }
}

_export({ global: true, wrap: true, forced: FORCED$1 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

PromiseWrapper = path[PROMISE];

// statics
_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate_1(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
var es_set = collection('Set', function (get) {
  return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$3(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
      hide(CollectionPrototype, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$5] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$3]) hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        hide(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

/**
 * Adds two numbers together.
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Number} The sum of adding two numbers.
 */
function add(x, y) {
  if (Object.prototype.toString.call(x) !== "[object Number]" || Object.prototype.toString.call(y) !== "[object Number]") {
    throw new TypeError("Supplied arg `x` or `y` is not a valid number");
  } // try out ES6 features to see transpiled output


  var a = new Promise(function (resolve, reject) {
    return resolve();
  });
  var values = new Set([x, y]);
  return _toConsumableArray(values).reduce(function (acc, value) {
    return acc + value;
  }, 0);
}



var index$2 = /*#__PURE__*/Object.freeze({
	add: add
});

/**
 * @param {String[]} xs
 * @return {String}
 */

var joinWithComma = function joinWithComma(xs) {
  return sanctuary.joinWith(",")(xs);
};

/**
 * @param {String[]} xs
 * @return {String}
 */

var joinWithNewLine = function joinWithNewLine(xs) {
  return sanctuary.joinWith(os.EOL)(xs);
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

var SPECIES$5 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$5] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$1(min$2(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

/**
 * A curried wrapper around the native `string.replace` function. Function is
 * extracted from the sanctuary.js docs.
 *
 * Does not truncate whitespace.
 *
 * replaceString :: (String -> (String -> String)) -> String
 *
 * @see {https://sanctuary.js.org/#curry3}
 * @see {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
 * @example
 *
 * replaceString ("bar") ("") ("foo bar baz"); //=> "foo  bar" (note the double space)
 * replaceString (/a/gi) ("") ("foo bar baz"); //=> "foo br bz"
 *
 */

var replaceString = sanctuary.curry3(function (replace, replacer, replacee) {
  return String.prototype.replace.call(replacee, replace, replacer);
});

/**
 * @param {String} x
 * @return {String}
 * @example
 *
 * removeCommas("hello,world"); //=> "helloworld"
 * removeCommas("hello, world"); //=> "hello world"
 * removeCommas("a,b,c"); //=> abc
 *
 */

var removeCommas = function removeCommas(x) {
  return replaceString(/,/g)("")(x);
};

/**
 * Truncates contiguous ASCII 32 `SPACE` chars into one.
 *
 * truncateSpace :: String -> String
 *
 * @return {String}
 * @see {@link https://stackoverflow.com/a/7151225/1727232}
 * @see {@link https://stackoverflow.com/a/1279878/1727232}
 * @example truncateSpace ("hello   world"); //=> "hello world"
 */

var truncateSpace = replaceString(/ {2,}/g)(" ");

/**
 * Replaces all occurrences of commas with a single space ensuring to truncate
 * two or more resulting adjacent spaces to a single space.
 *
 * In practice, this means that a comma at the beginning or the end of a
 * string will be replaced with a whitespace but will not be trimmed.
 *
 * replaceCommaWithWhitespace :: String -> String
 *
 * @type {*|*[]}
 * @example
 *
 * replaceCommaWithWhitespace("hello,,, world"); //=> "hello world"
 * replaceCommaWithWhitespace(",hello, world"); //=> " hello world"
 * replaceCommaWithWhitespace("hello, world,"); //=> "hello world "
 * replaceCommaWithWhitespace(",hello,world,"); //=> " hello world "
 *
 */

var replaceCommaWithWhitespace = sanctuary.pipe([replaceString(/,/g)(" "), truncateSpace]);

/**
 * Returns array of substrings resulting from splitting the original string
 * wherever a comma was found.
 *
 * splitComma :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitComma ("foo,bar,baz"); //=> ["foo", "bar", "baz"]
 * splitComma ("foo, bar, baz"); //=> ["foo", " bar", " baz"]
 * splitComma (""); //=> [""]
 *
 */

var splitComma = sanctuary.splitOn(","); // String -> [String]

/**
 * Returns array of substrings resulting from splitting the original string
 * wherever a comma was found.
 *
 * splitComma :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitCommaRegex ("foo,bar,baz"); //=> ["foo", "bar", "baz"]
 * splitCommaRegex ("foo, bar, baz"); //=> ["foo", " bar", " baz"]
 * splitCommaRegex (""); //=> [""]
 *
 */

var splitCommaRegex = sanctuary.splitOnRegex(/,/g);

/**
 * Breaks apart a string into an array of substrings wherever newline
 * chars are found - these are `\r\n` and `\n`.
 *
 * splitComma :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitNewLines ("hello \n world"); //=> ["hello ", " world"]
 * splitNewLines ("hello \r\n world"); //=> ["hello ", " world"]
 * splitNewLines ("hello \n \n \n world"); //=> ["hello ", " ", " ", " world"]
 * splitNewLines (""); //=> [""]
 *
 */

var splitNewLines = sanctuary.splitOnRegex(/\r\n|\n/g);

/**
 * Breaks apart a string into its array of substrings wherever the ASCII 32
 * `SPACE` character is found.
 *
 * splitSpace :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitSpace ("foo bar baz"); //=> ["foo", "bar", "baz"]
 * splitSpace ("hello   world"); //=> ["hello", "", "", "world"]
 * splitSpace (""); //=> [""]
 *
 */

var splitSpace = sanctuary.splitOn(" ");

/**
 * Breaks apart a string into its array of substrings wherever the ASCII 32
 * `SPACE` character is found.
 *
 * splitSpaceRegex :: String -> [String]
 *
 * @return {String}
 * @example
 *
 * splitSpaceRegex ("foo bar baz"); //=> ["foo", "bar", "baz"]
 * splitSpaceRegex ("hello   world"); //=> ["hello", "", "", "world"]
 * splitSpaceRegex (""); //=> [""]
 *
 */

var splitSpaceRegex = sanctuary.splitOnRegex(/ /g);

/**
 * Breaks apart a string into its array of substrings wherever whitespace
 * characters are found.
 *
 * This corresponds to all whitespace characters represented by the `\s`
 * metacharacter in regex.
 * - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 *
 * splitWhitespace :: String -> [String]
 *
 * @return {String}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 * @see All examples from @{splitSpace} and @{splitSpaceRegex} work in
 *   addition to all the remaining forms of whitespace characters.
 *
 * @example
 *
 * splitWhitespace ("hello \t world"); //=> "hello", "", "", "world"
 *
 */

var splitWhitespace = sanctuary.splitOnRegex(/\s/g);

/**
 * Truncates all whitespace chars to a single space char.
 *
 * truncateWhitespace :: String -> String
 *
 * @return {String}
 * @see {@link https://stackoverflow.com/a/1279874/1727232}
 * @example
 *
 * truncateWhitespace ("hello   world"); //=> "hello world"
 * truncateWhitespace ("foo \t \v bar"); //=> "foo bar"
 */

var truncateWhitespace = replaceString(/\s+/g)(" ");



var index$3 = /*#__PURE__*/Object.freeze({
	joinWithComma: joinWithComma,
	joinWithNewLine: joinWithNewLine,
	removeCommas: removeCommas,
	replaceCommaWithWhitespace: replaceCommaWithWhitespace,
	replaceString: replaceString,
	splitComma: splitComma,
	splitCommaRegex: splitCommaRegex,
	splitNewLines: splitNewLines,
	splitSpace: splitSpace,
	splitSpaceRegex: splitSpaceRegex,
	splitWhitespace: splitWhitespace,
	truncateSpace: truncateSpace,
	truncateWhitespace: truncateWhitespace
});

/**
 * @param {*} x
 * @return {String}
 * @example
 *
 * getPrototype({});        //=> "[object Object]"
 * getPrototype([]);        //=> "[object Array]"
 * getPrototype(7);         //=> "[object Number]"
 * getPrototype("");        //=> "[object String]"
 * getPrototype(true);      //=> "[object Boolean]"
 * getPrototype(false);     //=> "[object Boolean]"
 * getPrototype(null);      //=> "[object Null]"
 * getPrototype(undefined); //=> "[object Undefined]"
 * getPrototype(void 0);    //=> "[object Undefined]"
 * getPrototype();          //=> "[object Undefined]"
 *
 */
var getPrototype = function getPrototype(x) {
  return Object.prototype.toString.call(x);
};



var index$4 = /*#__PURE__*/Object.freeze({
	getPrototype: getPrototype
});

exports.add = add;
exports.conditions = index;
exports.data = index$1;
exports.dictByKey = dictByKey;
exports.dictGroupByKey = dictGroupByKey;
exports.empty = empty;
exports.filterFalse = filterFalse;
exports.getPrototype = getPrototype;
exports.identity = identity;
exports.joinWithComma = joinWithComma;
exports.joinWithNewLine = joinWithNewLine;
exports.math = index$2;
exports.removeCommas = removeCommas;
exports.replaceCommaWithWhitespace = replaceCommaWithWhitespace;
exports.replaceString = replaceString;
exports.splitComma = splitComma;
exports.splitCommaRegex = splitCommaRegex;
exports.splitNewLines = splitNewLines;
exports.splitSpace = splitSpace;
exports.splitSpaceRegex = splitSpaceRegex;
exports.splitWhitespace = splitWhitespace;
exports.strings = index$3;
exports.truncateSpace = truncateSpace;
exports.truncateWhitespace = truncateWhitespace;
exports.uniqValuesByKey = uniqValuesByKey;
exports.utils = index$4;
//# sourceMappingURL=bearly-functional.cjs.js.map
