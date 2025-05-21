(function (require$$0, require$$1) {
	'use strict';

	function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

	var require$$0__default = /*#__PURE__*/_interopDefault(require$$0);
	var require$$1__default = /*#__PURE__*/_interopDefault(require$$1);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var UploadImageInput$1 = {};

	/*! Axios v1.8.4 Copyright (c) 2025 Matt Zabriskie and contributors */
	function bind(fn, thisArg) {
	  return function wrap() {
	    return fn.apply(thisArg, arguments);
	  };
	}

	// utils is a library of generic helper functions non-specific to axios

	const {
	  toString
	} = Object.prototype;
	const {
	  getPrototypeOf
	} = Object;
	const kindOf = (cache => thing => {
	  const str = toString.call(thing);
	  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
	})(Object.create(null));
	const kindOfTest = type => {
	  type = type.toLowerCase();
	  return thing => kindOf(thing) === type;
	};
	const typeOfTest = type => thing => typeof thing === type;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 *
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	const {
	  isArray
	} = Array;

	/**
	 * Determine if a value is undefined
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	const isUndefined = typeOfTest('undefined');

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	const isArrayBuffer = kindOfTest('ArrayBuffer');

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  let result;
	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = val && val.buffer && isArrayBuffer(val.buffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	const isString = typeOfTest('string');

	/**
	 * Determine if a value is a Function
	 *
	 * @param {*} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	const isFunction = typeOfTest('function');

	/**
	 * Determine if a value is a Number
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	const isNumber = typeOfTest('number');

	/**
	 * Determine if a value is an Object
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	const isObject = thing => thing !== null && typeof thing === 'object';

	/**
	 * Determine if a value is a Boolean
	 *
	 * @param {*} thing The value to test
	 * @returns {boolean} True if value is a Boolean, otherwise false
	 */
	const isBoolean = thing => thing === true || thing === false;

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a plain Object, otherwise false
	 */
	const isPlainObject = val => {
	  if (kindOf(val) !== 'object') {
	    return false;
	  }
	  const prototype = getPrototypeOf(val);
	  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
	};

	/**
	 * Determine if a value is a Date
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	const isDate = kindOfTest('Date');

	/**
	 * Determine if a value is a File
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFile = kindOfTest('File');

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	const isBlob = kindOfTest('Blob');

	/**
	 * Determine if a value is a FileList
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFileList = kindOfTest('FileList');

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	const isStream = val => isObject(val) && isFunction(val.pipe);

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	const isFormData = thing => {
	  let kind;
	  return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
	  // detect form-data instance
	  kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
	};

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	const isURLSearchParams = kindOfTest('URLSearchParams');
	const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 *
	 * @returns {String} The String freed of excess whitespace
	 */
	const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 *
	 * @param {Boolean} [allOwnKeys = false]
	 * @returns {any}
	 */
	function forEach(obj, fn, {
	  allOwnKeys = false
	} = {}) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	  let i;
	  let l;

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
	    const len = keys.length;
	    let key;
	    for (i = 0; i < len; i++) {
	      key = keys[i];
	      fn.call(null, obj[key], key, obj);
	    }
	  }
	}
	function findKey(obj, key) {
	  key = key.toLowerCase();
	  const keys = Object.keys(obj);
	  let i = keys.length;
	  let _key;
	  while (i-- > 0) {
	    _key = keys[i];
	    if (key === _key.toLowerCase()) {
	      return _key;
	    }
	  }
	  return null;
	}
	const _global = (() => {
	  /*eslint no-undef:0*/
	  if (typeof globalThis !== "undefined") return globalThis;
	  return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : commonjsGlobal;
	})();
	const isContextDefined = context => !isUndefined(context) && context !== _global;

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 *
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */
	) {
	  const {
	    caseless
	  } = isContextDefined(this) && this || {};
	  const result = {};
	  const assignValue = (val, key) => {
	    const targetKey = caseless && findKey(result, key) || key;
	    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
	      result[targetKey] = merge(result[targetKey], val);
	    } else if (isPlainObject(val)) {
	      result[targetKey] = merge({}, val);
	    } else if (isArray(val)) {
	      result[targetKey] = val.slice();
	    } else {
	      result[targetKey] = val;
	    }
	  };
	  for (let i = 0, l = arguments.length; i < l; i++) {
	    arguments[i] && forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 *
	 * @param {Boolean} [allOwnKeys]
	 * @returns {Object} The resulting value of object a
	 */
	const extend = (a, b, thisArg, {
	  allOwnKeys
	} = {}) => {
	  forEach(b, (val, key) => {
	    if (thisArg && isFunction(val)) {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  }, {
	    allOwnKeys
	  });
	  return a;
	};

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 *
	 * @returns {string} content value without BOM
	 */
	const stripBOM = content => {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	};

	/**
	 * Inherit the prototype methods from one constructor into another
	 * @param {function} constructor
	 * @param {function} superConstructor
	 * @param {object} [props]
	 * @param {object} [descriptors]
	 *
	 * @returns {void}
	 */
	const inherits = (constructor, superConstructor, props, descriptors) => {
	  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	  constructor.prototype.constructor = constructor;
	  Object.defineProperty(constructor, 'super', {
	    value: superConstructor.prototype
	  });
	  props && Object.assign(constructor.prototype, props);
	};

	/**
	 * Resolve object with deep prototype chain to a flat object
	 * @param {Object} sourceObj source object
	 * @param {Object} [destObj]
	 * @param {Function|Boolean} [filter]
	 * @param {Function} [propFilter]
	 *
	 * @returns {Object}
	 */
	const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	  let props;
	  let i;
	  let prop;
	  const merged = {};
	  destObj = destObj || {};
	  // eslint-disable-next-line no-eq-null,eqeqeq
	  if (sourceObj == null) return destObj;
	  do {
	    props = Object.getOwnPropertyNames(sourceObj);
	    i = props.length;
	    while (i-- > 0) {
	      prop = props[i];
	      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
	        destObj[prop] = sourceObj[prop];
	        merged[prop] = true;
	      }
	    }
	    sourceObj = filter !== false && getPrototypeOf(sourceObj);
	  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
	  return destObj;
	};

	/**
	 * Determines whether a string ends with the characters of a specified string
	 *
	 * @param {String} str
	 * @param {String} searchString
	 * @param {Number} [position= 0]
	 *
	 * @returns {boolean}
	 */
	const endsWith = (str, searchString, position) => {
	  str = String(str);
	  if (position === undefined || position > str.length) {
	    position = str.length;
	  }
	  position -= searchString.length;
	  const lastIndex = str.indexOf(searchString, position);
	  return lastIndex !== -1 && lastIndex === position;
	};

	/**
	 * Returns new array from array like object or null if failed
	 *
	 * @param {*} [thing]
	 *
	 * @returns {?Array}
	 */
	const toArray = thing => {
	  if (!thing) return null;
	  if (isArray(thing)) return thing;
	  let i = thing.length;
	  if (!isNumber(i)) return null;
	  const arr = new Array(i);
	  while (i-- > 0) {
	    arr[i] = thing[i];
	  }
	  return arr;
	};

	/**
	 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
	 * thing passed in is an instance of Uint8Array
	 *
	 * @param {TypedArray}
	 *
	 * @returns {Array}
	 */
	// eslint-disable-next-line func-names
	const isTypedArray = (TypedArray => {
	  // eslint-disable-next-line func-names
	  return thing => {
	    return TypedArray && thing instanceof TypedArray;
	  };
	})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

	/**
	 * For each entry in the object, call the function with the key and value.
	 *
	 * @param {Object<any, any>} obj - The object to iterate over.
	 * @param {Function} fn - The function to call for each entry.
	 *
	 * @returns {void}
	 */
	const forEachEntry = (obj, fn) => {
	  const generator = obj && obj[Symbol.iterator];
	  const iterator = generator.call(obj);
	  let result;
	  while ((result = iterator.next()) && !result.done) {
	    const pair = result.value;
	    fn.call(obj, pair[0], pair[1]);
	  }
	};

	/**
	 * It takes a regular expression and a string, and returns an array of all the matches
	 *
	 * @param {string} regExp - The regular expression to match against.
	 * @param {string} str - The string to search.
	 *
	 * @returns {Array<boolean>}
	 */
	const matchAll = (regExp, str) => {
	  let matches;
	  const arr = [];
	  while ((matches = regExp.exec(str)) !== null) {
	    arr.push(matches);
	  }
	  return arr;
	};

	/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
	const isHTMLForm = kindOfTest('HTMLFormElement');
	const toCamelCase = str => {
	  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
	    return p1.toUpperCase() + p2;
	  });
	};

	/* Creating a function that will check if an object has a property. */
	const hasOwnProperty = (({
	  hasOwnProperty
	}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

	/**
	 * Determine if a value is a RegExp object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a RegExp object, otherwise false
	 */
	const isRegExp = kindOfTest('RegExp');
	const reduceDescriptors = (obj, reducer) => {
	  const descriptors = Object.getOwnPropertyDescriptors(obj);
	  const reducedDescriptors = {};
	  forEach(descriptors, (descriptor, name) => {
	    let ret;
	    if ((ret = reducer(descriptor, name, obj)) !== false) {
	      reducedDescriptors[name] = ret || descriptor;
	    }
	  });
	  Object.defineProperties(obj, reducedDescriptors);
	};

	/**
	 * Makes all methods read-only
	 * @param {Object} obj
	 */

	const freezeMethods = obj => {
	  reduceDescriptors(obj, (descriptor, name) => {
	    // skip restricted props in strict mode
	    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
	      return false;
	    }
	    const value = obj[name];
	    if (!isFunction(value)) return;
	    descriptor.enumerable = false;
	    if ('writable' in descriptor) {
	      descriptor.writable = false;
	      return;
	    }
	    if (!descriptor.set) {
	      descriptor.set = () => {
	        throw Error('Can not rewrite read-only method \'' + name + '\'');
	      };
	    }
	  });
	};
	const toObjectSet = (arrayOrString, delimiter) => {
	  const obj = {};
	  const define = arr => {
	    arr.forEach(value => {
	      obj[value] = true;
	    });
	  };
	  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
	  return obj;
	};
	const noop = () => {};
	const toFiniteNumber = (value, defaultValue) => {
	  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
	};

	/**
	 * If the thing is a FormData object, return true, otherwise return false.
	 *
	 * @param {unknown} thing - The thing to check.
	 *
	 * @returns {boolean}
	 */
	function isSpecCompliantForm(thing) {
	  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
	}
	const toJSONObject = obj => {
	  const stack = new Array(10);
	  const visit = (source, i) => {
	    if (isObject(source)) {
	      if (stack.indexOf(source) >= 0) {
	        return;
	      }
	      if (!('toJSON' in source)) {
	        stack[i] = source;
	        const target = isArray(source) ? [] : {};
	        forEach(source, (value, key) => {
	          const reducedValue = visit(value, i + 1);
	          !isUndefined(reducedValue) && (target[key] = reducedValue);
	        });
	        stack[i] = undefined;
	        return target;
	      }
	    }
	    return source;
	  };
	  return visit(obj, 0);
	};
	const isAsyncFn = kindOfTest('AsyncFunction');
	const isThenable = thing => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

	// original code
	// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

	const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	  if (setImmediateSupported) {
	    return setImmediate;
	  }
	  return postMessageSupported ? ((token, callbacks) => {
	    _global.addEventListener("message", ({
	      source,
	      data
	    }) => {
	      if (source === _global && data === token) {
	        callbacks.length && callbacks.shift()();
	      }
	    }, false);
	    return cb => {
	      callbacks.push(cb);
	      _global.postMessage(token, "*");
	    };
	  })(`axios@${Math.random()}`, []) : cb => setTimeout(cb);
	})(typeof setImmediate === 'function', isFunction(_global.postMessage));
	const asap = typeof queueMicrotask !== 'undefined' ? queueMicrotask.bind(_global) : typeof process !== 'undefined' && process.nextTick || _setImmediate;

	// *********************

	var utils$1 = {
	  isArray,
	  isArrayBuffer,
	  isBuffer,
	  isFormData,
	  isArrayBufferView,
	  isString,
	  isNumber,
	  isBoolean,
	  isObject,
	  isPlainObject,
	  isReadableStream,
	  isRequest,
	  isResponse,
	  isHeaders,
	  isUndefined,
	  isDate,
	  isFile,
	  isBlob,
	  isRegExp,
	  isFunction,
	  isStream,
	  isURLSearchParams,
	  isTypedArray,
	  isFileList,
	  forEach,
	  merge,
	  extend,
	  trim,
	  stripBOM,
	  inherits,
	  toFlatObject,
	  kindOf,
	  kindOfTest,
	  endsWith,
	  toArray,
	  forEachEntry,
	  matchAll,
	  isHTMLForm,
	  hasOwnProperty,
	  hasOwnProp: hasOwnProperty,
	  // an alias to avoid ESLint no-prototype-builtins detection
	  reduceDescriptors,
	  freezeMethods,
	  toObjectSet,
	  toCamelCase,
	  noop,
	  toFiniteNumber,
	  findKey,
	  global: _global,
	  isContextDefined,
	  isSpecCompliantForm,
	  toJSONObject,
	  isAsyncFn,
	  isThenable,
	  setImmediate: _setImmediate,
	  asap
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [config] The config.
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 *
	 * @returns {Error} The created error.
	 */
	function AxiosError(message, code, config, request, response) {
	  Error.call(this);
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    this.stack = new Error().stack;
	  }
	  this.message = message;
	  this.name = 'AxiosError';
	  code && (this.code = code);
	  config && (this.config = config);
	  request && (this.request = request);
	  if (response) {
	    this.response = response;
	    this.status = response.status ? response.status : null;
	  }
	}
	utils$1.inherits(AxiosError, Error, {
	  toJSON: function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: utils$1.toJSONObject(this.config),
	      code: this.code,
	      status: this.status
	    };
	  }
	});
	const prototype$1 = AxiosError.prototype;
	const descriptors = {};
	['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
	// eslint-disable-next-line func-names
	].forEach(code => {
	  descriptors[code] = {
	    value: code
	  };
	});
	Object.defineProperties(AxiosError, descriptors);
	Object.defineProperty(prototype$1, 'isAxiosError', {
	  value: true
	});

	// eslint-disable-next-line func-names
	AxiosError.from = (error, code, config, request, response, customProps) => {
	  const axiosError = Object.create(prototype$1);
	  utils$1.toFlatObject(error, axiosError, function filter(obj) {
	    return obj !== Error.prototype;
	  }, prop => {
	    return prop !== 'isAxiosError';
	  });
	  AxiosError.call(axiosError, error.message, code, config, request, response);
	  axiosError.cause = error;
	  axiosError.name = error.name;
	  customProps && Object.assign(axiosError, customProps);
	  return axiosError;
	};

	// eslint-disable-next-line strict
	var httpAdapter = null;

	/**
	 * Determines if the given thing is a array or js object.
	 *
	 * @param {string} thing - The object or array to be visited.
	 *
	 * @returns {boolean}
	 */
	function isVisitable(thing) {
	  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
	}

	/**
	 * It removes the brackets from the end of a string
	 *
	 * @param {string} key - The key of the parameter.
	 *
	 * @returns {string} the key without the brackets.
	 */
	function removeBrackets(key) {
	  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
	}

	/**
	 * It takes a path, a key, and a boolean, and returns a string
	 *
	 * @param {string} path - The path to the current key.
	 * @param {string} key - The key of the current object being iterated over.
	 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
	 *
	 * @returns {string} The path to the current key.
	 */
	function renderKey(path, key, dots) {
	  if (!path) return key;
	  return path.concat(key).map(function each(token, i) {
	    // eslint-disable-next-line no-param-reassign
	    token = removeBrackets(token);
	    return !dots && i ? '[' + token + ']' : token;
	  }).join(dots ? '.' : '');
	}

	/**
	 * If the array is an array and none of its elements are visitable, then it's a flat array.
	 *
	 * @param {Array<any>} arr - The array to check
	 *
	 * @returns {boolean}
	 */
	function isFlatArray(arr) {
	  return utils$1.isArray(arr) && !arr.some(isVisitable);
	}
	const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
	  return /^is[A-Z]/.test(prop);
	});

	/**
	 * Convert a data object to FormData
	 *
	 * @param {Object} obj
	 * @param {?Object} [formData]
	 * @param {?Object} [options]
	 * @param {Function} [options.visitor]
	 * @param {Boolean} [options.metaTokens = true]
	 * @param {Boolean} [options.dots = false]
	 * @param {?Boolean} [options.indexes = false]
	 *
	 * @returns {Object}
	 **/

	/**
	 * It converts an object into a FormData object
	 *
	 * @param {Object<any, any>} obj - The object to convert to form data.
	 * @param {string} formData - The FormData object to append to.
	 * @param {Object<string, any>} options
	 *
	 * @returns
	 */
	function toFormData(obj, formData, options) {
	  if (!utils$1.isObject(obj)) {
	    throw new TypeError('target must be an object');
	  }

	  // eslint-disable-next-line no-param-reassign
	  formData = formData || new FormData();

	  // eslint-disable-next-line no-param-reassign
	  options = utils$1.toFlatObject(options, {
	    metaTokens: true,
	    dots: false,
	    indexes: false
	  }, false, function defined(option, source) {
	    // eslint-disable-next-line no-eq-null,eqeqeq
	    return !utils$1.isUndefined(source[option]);
	  });
	  const metaTokens = options.metaTokens;
	  // eslint-disable-next-line no-use-before-define
	  const visitor = options.visitor || defaultVisitor;
	  const dots = options.dots;
	  const indexes = options.indexes;
	  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
	  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
	  if (!utils$1.isFunction(visitor)) {
	    throw new TypeError('visitor must be a function');
	  }
	  function convertValue(value) {
	    if (value === null) return '';
	    if (utils$1.isDate(value)) {
	      return value.toISOString();
	    }
	    if (!useBlob && utils$1.isBlob(value)) {
	      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
	    }
	    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
	      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
	    }
	    return value;
	  }

	  /**
	   * Default visitor.
	   *
	   * @param {*} value
	   * @param {String|Number} key
	   * @param {Array<String|Number>} path
	   * @this {FormData}
	   *
	   * @returns {boolean} return true to visit the each prop of the value recursively
	   */
	  function defaultVisitor(value, key, path) {
	    let arr = value;
	    if (value && !path && typeof value === 'object') {
	      if (utils$1.endsWith(key, '{}')) {
	        // eslint-disable-next-line no-param-reassign
	        key = metaTokens ? key : key.slice(0, -2);
	        // eslint-disable-next-line no-param-reassign
	        value = JSON.stringify(value);
	      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))) {
	        // eslint-disable-next-line no-param-reassign
	        key = removeBrackets(key);
	        arr.forEach(function each(el, index) {
	          !(utils$1.isUndefined(el) || el === null) && formData.append(
	          // eslint-disable-next-line no-nested-ternary
	          indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
	        });
	        return false;
	      }
	    }
	    if (isVisitable(value)) {
	      return true;
	    }
	    formData.append(renderKey(path, key, dots), convertValue(value));
	    return false;
	  }
	  const stack = [];
	  const exposedHelpers = Object.assign(predicates, {
	    defaultVisitor,
	    convertValue,
	    isVisitable
	  });
	  function build(value, path) {
	    if (utils$1.isUndefined(value)) return;
	    if (stack.indexOf(value) !== -1) {
	      throw Error('Circular reference detected in ' + path.join('.'));
	    }
	    stack.push(value);
	    utils$1.forEach(value, function each(el, key) {
	      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
	      if (result === true) {
	        build(el, path ? path.concat(key) : [key]);
	      }
	    });
	    stack.pop();
	  }
	  if (!utils$1.isObject(obj)) {
	    throw new TypeError('data must be an object');
	  }
	  build(obj);
	  return formData;
	}

	/**
	 * It encodes a string by replacing all characters that are not in the unreserved set with
	 * their percent-encoded equivalents
	 *
	 * @param {string} str - The string to encode.
	 *
	 * @returns {string} The encoded string.
	 */
	function encode$1(str) {
	  const charMap = {
	    '!': '%21',
	    "'": '%27',
	    '(': '%28',
	    ')': '%29',
	    '~': '%7E',
	    '%20': '+',
	    '%00': '\x00'
	  };
	  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
	    return charMap[match];
	  });
	}

	/**
	 * It takes a params object and converts it to a FormData object
	 *
	 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
	 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
	 *
	 * @returns {void}
	 */
	function AxiosURLSearchParams(params, options) {
	  this._pairs = [];
	  params && toFormData(params, this, options);
	}
	const prototype = AxiosURLSearchParams.prototype;
	prototype.append = function append(name, value) {
	  this._pairs.push([name, value]);
	};
	prototype.toString = function toString(encoder) {
	  const _encode = encoder ? function (value) {
	    return encoder.call(this, value, encode$1);
	  } : encode$1;
	  return this._pairs.map(function each(pair) {
	    return _encode(pair[0]) + '=' + _encode(pair[1]);
	  }, '').join('&');
	};

	/**
	 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
	 * URI encoded counterparts
	 *
	 * @param {string} val The value to be encoded.
	 *
	 * @returns {string} The encoded value.
	 */
	function encode(val) {
	  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @param {?(object|Function)} options
	 *
	 * @returns {string} The formatted url
	 */
	function buildURL(url, params, options) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	  const _encode = options && options.encode || encode;
	  if (utils$1.isFunction(options)) {
	    options = {
	      serialize: options
	    };
	  }
	  const serializeFn = options && options.serialize;
	  let serializedParams;
	  if (serializeFn) {
	    serializedParams = serializeFn(params, options);
	  } else {
	    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
	  }
	  if (serializedParams) {
	    const hashmarkIndex = url.indexOf("#");
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	  return url;
	}
	class InterceptorManager {
	  constructor() {
	    this.handlers = [];
	  }

	  /**
	   * Add a new interceptor to the stack
	   *
	   * @param {Function} fulfilled The function to handle `then` for a `Promise`
	   * @param {Function} rejected The function to handle `reject` for a `Promise`
	   *
	   * @return {Number} An ID used to remove interceptor later
	   */
	  use(fulfilled, rejected, options) {
	    this.handlers.push({
	      fulfilled,
	      rejected,
	      synchronous: options ? options.synchronous : false,
	      runWhen: options ? options.runWhen : null
	    });
	    return this.handlers.length - 1;
	  }

	  /**
	   * Remove an interceptor from the stack
	   *
	   * @param {Number} id The ID that was returned by `use`
	   *
	   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
	   */
	  eject(id) {
	    if (this.handlers[id]) {
	      this.handlers[id] = null;
	    }
	  }

	  /**
	   * Clear all interceptors from the stack
	   *
	   * @returns {void}
	   */
	  clear() {
	    if (this.handlers) {
	      this.handlers = [];
	    }
	  }

	  /**
	   * Iterate over all the registered interceptors
	   *
	   * This method is particularly useful for skipping over any
	   * interceptors that may have become `null` calling `eject`.
	   *
	   * @param {Function} fn The function to call for each interceptor
	   *
	   * @returns {void}
	   */
	  forEach(fn) {
	    utils$1.forEach(this.handlers, function forEachHandler(h) {
	      if (h !== null) {
	        fn(h);
	      }
	    });
	  }
	}
	var InterceptorManager$1 = InterceptorManager;
	var transitionalDefaults = {
	  silentJSONParsing: true,
	  forcedJSONParsing: true,
	  clarifyTimeoutError: false
	};
	var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;
	var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;
	var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;
	var platform$1 = {
	  isBrowser: true,
	  classes: {
	    URLSearchParams: URLSearchParams$1,
	    FormData: FormData$1,
	    Blob: Blob$1
	  },
	  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
	};
	const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';
	const _navigator = typeof navigator === 'object' && navigator || undefined;

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 *
	 * @returns {boolean}
	 */
	const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

	/**
	 * Determine if we're running in a standard browser webWorker environment
	 *
	 * Although the `isStandardBrowserEnv` method indicates that
	 * `allows axios to run in a web worker`, the WebWorker will still be
	 * filtered out due to its judgment standard
	 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
	 * This leads to a problem when axios post `FormData` in webWorker
	 */
	const hasStandardBrowserWebWorkerEnv = (() => {
	  return typeof WorkerGlobalScope !== 'undefined' &&
	  // eslint-disable-next-line no-undef
	  self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
	})();
	const origin = hasBrowserEnv && window.location.href || 'http://localhost';
	var utils = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  hasBrowserEnv: hasBrowserEnv,
	  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
	  hasStandardBrowserEnv: hasStandardBrowserEnv,
	  navigator: _navigator,
	  origin: origin
	});
	var platform = {
	  ...utils,
	  ...platform$1
	};
	function toURLEncodedForm(data, options) {
	  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
	    visitor: function (value, key, path, helpers) {
	      if (platform.isNode && utils$1.isBuffer(value)) {
	        this.append(key, value.toString('base64'));
	        return false;
	      }
	      return helpers.defaultVisitor.apply(this, arguments);
	    }
	  }, options));
	}

	/**
	 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
	 *
	 * @param {string} name - The name of the property to get.
	 *
	 * @returns An array of strings.
	 */
	function parsePropPath(name) {
	  // foo[x][y][z]
	  // foo.x.y.z
	  // foo-x-y-z
	  // foo x y z
	  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
	    return match[0] === '[]' ? '' : match[1] || match[0];
	  });
	}

	/**
	 * Convert an array to an object.
	 *
	 * @param {Array<any>} arr - The array to convert to an object.
	 *
	 * @returns An object with the same keys and values as the array.
	 */
	function arrayToObject(arr) {
	  const obj = {};
	  const keys = Object.keys(arr);
	  let i;
	  const len = keys.length;
	  let key;
	  for (i = 0; i < len; i++) {
	    key = keys[i];
	    obj[key] = arr[key];
	  }
	  return obj;
	}

	/**
	 * It takes a FormData object and returns a JavaScript object
	 *
	 * @param {string} formData The FormData object to convert to JSON.
	 *
	 * @returns {Object<string, any> | null} The converted object.
	 */
	function formDataToJSON(formData) {
	  function buildPath(path, value, target, index) {
	    let name = path[index++];
	    if (name === '__proto__') return true;
	    const isNumericKey = Number.isFinite(+name);
	    const isLast = index >= path.length;
	    name = !name && utils$1.isArray(target) ? target.length : name;
	    if (isLast) {
	      if (utils$1.hasOwnProp(target, name)) {
	        target[name] = [target[name], value];
	      } else {
	        target[name] = value;
	      }
	      return !isNumericKey;
	    }
	    if (!target[name] || !utils$1.isObject(target[name])) {
	      target[name] = [];
	    }
	    const result = buildPath(path, value, target[name], index);
	    if (result && utils$1.isArray(target[name])) {
	      target[name] = arrayToObject(target[name]);
	    }
	    return !isNumericKey;
	  }
	  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
	    const obj = {};
	    utils$1.forEachEntry(formData, (name, value) => {
	      buildPath(parsePropPath(name), value, obj, 0);
	    });
	    return obj;
	  }
	  return null;
	}

	/**
	 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
	 * of the input
	 *
	 * @param {any} rawValue - The value to be stringified.
	 * @param {Function} parser - A function that parses a string into a JavaScript object.
	 * @param {Function} encoder - A function that takes a value and returns a string.
	 *
	 * @returns {string} A stringified version of the rawValue.
	 */
	function stringifySafely(rawValue, parser, encoder) {
	  if (utils$1.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils$1.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }
	  return (encoder || JSON.stringify)(rawValue);
	}
	const defaults = {
	  transitional: transitionalDefaults,
	  adapter: ['xhr', 'http', 'fetch'],
	  transformRequest: [function transformRequest(data, headers) {
	    const contentType = headers.getContentType() || '';
	    const hasJSONContentType = contentType.indexOf('application/json') > -1;
	    const isObjectPayload = utils$1.isObject(data);
	    if (isObjectPayload && utils$1.isHTMLForm(data)) {
	      data = new FormData(data);
	    }
	    const isFormData = utils$1.isFormData(data);
	    if (isFormData) {
	      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
	    }
	    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
	      return data;
	    }
	    if (utils$1.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$1.isURLSearchParams(data)) {
	      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
	      return data.toString();
	    }
	    let isFileList;
	    if (isObjectPayload) {
	      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
	        return toURLEncodedForm(data, this.formSerializer).toString();
	      }
	      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
	        const _FormData = this.env && this.env.FormData;
	        return toFormData(isFileList ? {
	          'files[]': data
	        } : data, _FormData && new _FormData(), this.formSerializer);
	      }
	    }
	    if (isObjectPayload || hasJSONContentType) {
	      headers.setContentType('application/json', false);
	      return stringifySafely(data);
	    }
	    return data;
	  }],
	  transformResponse: [function transformResponse(data) {
	    const transitional = this.transitional || defaults.transitional;
	    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    const JSONRequested = this.responseType === 'json';
	    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
	      return data;
	    }
	    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
	      const silentJSONParsing = transitional && transitional.silentJSONParsing;
	      const strictJSONParsing = !silentJSONParsing && JSONRequested;
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
	          }
	          throw e;
	        }
	      }
	    }
	    return data;
	  }],
	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	  maxContentLength: -1,
	  maxBodyLength: -1,
	  env: {
	    FormData: platform.classes.FormData,
	    Blob: platform.classes.Blob
	  },
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  },
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*',
	      'Content-Type': undefined
	    }
	  }
	};
	utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], method => {
	  defaults.headers[method] = {};
	});
	var defaults$1 = defaults;

	// RawAxiosHeaders whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	const ignoreDuplicateOf = utils$1.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} rawHeaders Headers needing to be parsed
	 *
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = rawHeaders => {
	  const parsed = {};
	  let key;
	  let val;
	  let i;
	  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
	    i = line.indexOf(':');
	    key = line.substring(0, i).trim().toLowerCase();
	    val = line.substring(i + 1).trim();
	    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
	      return;
	    }
	    if (key === 'set-cookie') {
	      if (parsed[key]) {
	        parsed[key].push(val);
	      } else {
	        parsed[key] = [val];
	      }
	    } else {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	  return parsed;
	};
	const $internals = Symbol('internals');
	function normalizeHeader(header) {
	  return header && String(header).trim().toLowerCase();
	}
	function normalizeValue(value) {
	  if (value === false || value == null) {
	    return value;
	  }
	  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
	}
	function parseTokens(str) {
	  const tokens = Object.create(null);
	  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	  let match;
	  while (match = tokensRE.exec(str)) {
	    tokens[match[1]] = match[2];
	  }
	  return tokens;
	}
	const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
	function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	  if (utils$1.isFunction(filter)) {
	    return filter.call(this, value, header);
	  }
	  if (isHeaderNameFilter) {
	    value = header;
	  }
	  if (!utils$1.isString(value)) return;
	  if (utils$1.isString(filter)) {
	    return value.indexOf(filter) !== -1;
	  }
	  if (utils$1.isRegExp(filter)) {
	    return filter.test(value);
	  }
	}
	function formatHeader(header) {
	  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
	    return char.toUpperCase() + str;
	  });
	}
	function buildAccessors(obj, header) {
	  const accessorName = utils$1.toCamelCase(' ' + header);
	  ['get', 'set', 'has'].forEach(methodName => {
	    Object.defineProperty(obj, methodName + accessorName, {
	      value: function (arg1, arg2, arg3) {
	        return this[methodName].call(this, header, arg1, arg2, arg3);
	      },
	      configurable: true
	    });
	  });
	}
	class AxiosHeaders {
	  constructor(headers) {
	    headers && this.set(headers);
	  }
	  set(header, valueOrRewrite, rewrite) {
	    const self = this;
	    function setHeader(_value, _header, _rewrite) {
	      const lHeader = normalizeHeader(_header);
	      if (!lHeader) {
	        throw new Error('header name must be a non-empty string');
	      }
	      const key = utils$1.findKey(self, lHeader);
	      if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
	        self[key || _header] = normalizeValue(_value);
	      }
	    }
	    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
	    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
	      setHeaders(header, valueOrRewrite);
	    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
	      setHeaders(parseHeaders(header), valueOrRewrite);
	    } else if (utils$1.isHeaders(header)) {
	      for (const [key, value] of header.entries()) {
	        setHeader(value, key, rewrite);
	      }
	    } else {
	      header != null && setHeader(valueOrRewrite, header, rewrite);
	    }
	    return this;
	  }
	  get(header, parser) {
	    header = normalizeHeader(header);
	    if (header) {
	      const key = utils$1.findKey(this, header);
	      if (key) {
	        const value = this[key];
	        if (!parser) {
	          return value;
	        }
	        if (parser === true) {
	          return parseTokens(value);
	        }
	        if (utils$1.isFunction(parser)) {
	          return parser.call(this, value, key);
	        }
	        if (utils$1.isRegExp(parser)) {
	          return parser.exec(value);
	        }
	        throw new TypeError('parser must be boolean|regexp|function');
	      }
	    }
	  }
	  has(header, matcher) {
	    header = normalizeHeader(header);
	    if (header) {
	      const key = utils$1.findKey(this, header);
	      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
	    }
	    return false;
	  }
	  delete(header, matcher) {
	    const self = this;
	    let deleted = false;
	    function deleteHeader(_header) {
	      _header = normalizeHeader(_header);
	      if (_header) {
	        const key = utils$1.findKey(self, _header);
	        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
	          delete self[key];
	          deleted = true;
	        }
	      }
	    }
	    if (utils$1.isArray(header)) {
	      header.forEach(deleteHeader);
	    } else {
	      deleteHeader(header);
	    }
	    return deleted;
	  }
	  clear(matcher) {
	    const keys = Object.keys(this);
	    let i = keys.length;
	    let deleted = false;
	    while (i--) {
	      const key = keys[i];
	      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
	        delete this[key];
	        deleted = true;
	      }
	    }
	    return deleted;
	  }
	  normalize(format) {
	    const self = this;
	    const headers = {};
	    utils$1.forEach(this, (value, header) => {
	      const key = utils$1.findKey(headers, header);
	      if (key) {
	        self[key] = normalizeValue(value);
	        delete self[header];
	        return;
	      }
	      const normalized = format ? formatHeader(header) : String(header).trim();
	      if (normalized !== header) {
	        delete self[header];
	      }
	      self[normalized] = normalizeValue(value);
	      headers[normalized] = true;
	    });
	    return this;
	  }
	  concat(...targets) {
	    return this.constructor.concat(this, ...targets);
	  }
	  toJSON(asStrings) {
	    const obj = Object.create(null);
	    utils$1.forEach(this, (value, header) => {
	      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
	    });
	    return obj;
	  }
	  [Symbol.iterator]() {
	    return Object.entries(this.toJSON())[Symbol.iterator]();
	  }
	  toString() {
	    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
	  }
	  get [Symbol.toStringTag]() {
	    return 'AxiosHeaders';
	  }
	  static from(thing) {
	    return thing instanceof this ? thing : new this(thing);
	  }
	  static concat(first, ...targets) {
	    const computed = new this(first);
	    targets.forEach(target => computed.set(target));
	    return computed;
	  }
	  static accessor(header) {
	    const internals = this[$internals] = this[$internals] = {
	      accessors: {}
	    };
	    const accessors = internals.accessors;
	    const prototype = this.prototype;
	    function defineAccessor(_header) {
	      const lHeader = normalizeHeader(_header);
	      if (!accessors[lHeader]) {
	        buildAccessors(prototype, _header);
	        accessors[lHeader] = true;
	      }
	    }
	    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
	    return this;
	  }
	}
	AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

	// reserved names hotfix
	utils$1.reduceDescriptors(AxiosHeaders.prototype, ({
	  value
	}, key) => {
	  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
	  return {
	    get: () => value,
	    set(headerValue) {
	      this[mapped] = headerValue;
	    }
	  };
	});
	utils$1.freezeMethods(AxiosHeaders);
	var AxiosHeaders$1 = AxiosHeaders;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Array|Function} fns A single function or Array of functions
	 * @param {?Object} response The response object
	 *
	 * @returns {*} The resulting transformed data
	 */
	function transformData(fns, response) {
	  const config = this || defaults$1;
	  const context = response || config;
	  const headers = AxiosHeaders$1.from(context.headers);
	  let data = context.data;
	  utils$1.forEach(fns, function transform(fn) {
	    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
	  });
	  headers.normalize();
	  return data;
	}
	function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	}

	/**
	 * A `CanceledError` is an object that is thrown when an operation is canceled.
	 *
	 * @param {string=} message The message.
	 * @param {Object=} config The config.
	 * @param {Object=} request The request.
	 *
	 * @returns {CanceledError} The created error.
	 */
	function CanceledError(message, config, request) {
	  // eslint-disable-next-line no-eq-null,eqeqeq
	  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
	  this.name = 'CanceledError';
	}
	utils$1.inherits(CanceledError, AxiosError, {
	  __CANCEL__: true
	});

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 *
	 * @returns {object} The response.
	 */
	function settle(resolve, reject, response) {
	  const validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
	  }
	}
	function parseProtocol(url) {
	  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
	  return match && match[1] || '';
	}

	/**
	 * Calculate data maxRate
	 * @param {Number} [samplesCount= 10]
	 * @param {Number} [min= 1000]
	 * @returns {Function}
	 */
	function speedometer(samplesCount, min) {
	  samplesCount = samplesCount || 10;
	  const bytes = new Array(samplesCount);
	  const timestamps = new Array(samplesCount);
	  let head = 0;
	  let tail = 0;
	  let firstSampleTS;
	  min = min !== undefined ? min : 1000;
	  return function push(chunkLength) {
	    const now = Date.now();
	    const startedAt = timestamps[tail];
	    if (!firstSampleTS) {
	      firstSampleTS = now;
	    }
	    bytes[head] = chunkLength;
	    timestamps[head] = now;
	    let i = tail;
	    let bytesCount = 0;
	    while (i !== head) {
	      bytesCount += bytes[i++];
	      i = i % samplesCount;
	    }
	    head = (head + 1) % samplesCount;
	    if (head === tail) {
	      tail = (tail + 1) % samplesCount;
	    }
	    if (now - firstSampleTS < min) {
	      return;
	    }
	    const passed = startedAt && now - startedAt;
	    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
	  };
	}

	/**
	 * Throttle decorator
	 * @param {Function} fn
	 * @param {Number} freq
	 * @return {Function}
	 */
	function throttle(fn, freq) {
	  let timestamp = 0;
	  let threshold = 1000 / freq;
	  let lastArgs;
	  let timer;
	  const invoke = (args, now = Date.now()) => {
	    timestamp = now;
	    lastArgs = null;
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	    fn.apply(null, args);
	  };
	  const throttled = (...args) => {
	    const now = Date.now();
	    const passed = now - timestamp;
	    if (passed >= threshold) {
	      invoke(args, now);
	    } else {
	      lastArgs = args;
	      if (!timer) {
	        timer = setTimeout(() => {
	          timer = null;
	          invoke(lastArgs);
	        }, threshold - passed);
	      }
	    }
	  };
	  const flush = () => lastArgs && invoke(lastArgs);
	  return [throttled, flush];
	}
	const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	  let bytesNotified = 0;
	  const _speedometer = speedometer(50, 250);
	  return throttle(e => {
	    const loaded = e.loaded;
	    const total = e.lengthComputable ? e.total : undefined;
	    const progressBytes = loaded - bytesNotified;
	    const rate = _speedometer(progressBytes);
	    const inRange = loaded <= total;
	    bytesNotified = loaded;
	    const data = {
	      loaded,
	      total,
	      progress: total ? loaded / total : undefined,
	      bytes: progressBytes,
	      rate: rate ? rate : undefined,
	      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
	      event: e,
	      lengthComputable: total != null,
	      [isDownloadStream ? 'download' : 'upload']: true
	    };
	    listener(data);
	  }, freq);
	};
	const progressEventDecorator = (total, throttled) => {
	  const lengthComputable = total != null;
	  return [loaded => throttled[0]({
	    lengthComputable,
	    total,
	    loaded
	  }), throttled[1]];
	};
	const asyncDecorator = fn => (...args) => utils$1.asap(() => fn(...args));
	var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => url => {
	  url = new URL(url, platform.origin);
	  return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
	})(new URL(platform.origin), platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)) : () => true;
	var cookies = platform.hasStandardBrowserEnv ?
	// Standard browser envs support document.cookie
	{
	  write(name, value, expires, path, domain, secure) {
	    const cookie = [name + '=' + encodeURIComponent(value)];
	    utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
	    utils$1.isString(path) && cookie.push('path=' + path);
	    utils$1.isString(domain) && cookie.push('domain=' + domain);
	    secure === true && cookie.push('secure');
	    document.cookie = cookie.join('; ');
	  },
	  read(name) {
	    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return match ? decodeURIComponent(match[3]) : null;
	  },
	  remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	} :
	// Non-standard browser env (web workers, react-native) lack needed support.
	{
	  write() {},
	  read() {
	    return null;
	  },
	  remove() {}
	};

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 *
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
	}

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 *
	 * @returns {string} The combined URL
	 */
	function combineURLs(baseURL, relativeURL) {
	  return relativeURL ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
	}

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 *
	 * @returns {string} The combined full path
	 */
	function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
	  let isRelativeUrl = !isAbsoluteURL(requestedURL);
	  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	}
	const headersToObject = thing => thing instanceof AxiosHeaders$1 ? {
	  ...thing
	} : thing;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 *
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  const config = {};
	  function getMergedValue(target, source, prop, caseless) {
	    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
	      return utils$1.merge.call({
	        caseless
	      }, target, source);
	    } else if (utils$1.isPlainObject(source)) {
	      return utils$1.merge({}, source);
	    } else if (utils$1.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDeepProperties(a, b, prop, caseless) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(a, b, prop, caseless);
	    } else if (!utils$1.isUndefined(a)) {
	      return getMergedValue(undefined, a, prop, caseless);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function valueFromConfig2(a, b) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(undefined, b);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function defaultToConfig2(a, b) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(undefined, b);
	    } else if (!utils$1.isUndefined(a)) {
	      return getMergedValue(undefined, a);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDirectKeys(a, b, prop) {
	    if (prop in config2) {
	      return getMergedValue(a, b);
	    } else if (prop in config1) {
	      return getMergedValue(undefined, a);
	    }
	  }
	  const mergeMap = {
	    url: valueFromConfig2,
	    method: valueFromConfig2,
	    data: valueFromConfig2,
	    baseURL: defaultToConfig2,
	    transformRequest: defaultToConfig2,
	    transformResponse: defaultToConfig2,
	    paramsSerializer: defaultToConfig2,
	    timeout: defaultToConfig2,
	    timeoutMessage: defaultToConfig2,
	    withCredentials: defaultToConfig2,
	    withXSRFToken: defaultToConfig2,
	    adapter: defaultToConfig2,
	    responseType: defaultToConfig2,
	    xsrfCookieName: defaultToConfig2,
	    xsrfHeaderName: defaultToConfig2,
	    onUploadProgress: defaultToConfig2,
	    onDownloadProgress: defaultToConfig2,
	    decompress: defaultToConfig2,
	    maxContentLength: defaultToConfig2,
	    maxBodyLength: defaultToConfig2,
	    beforeRedirect: defaultToConfig2,
	    transport: defaultToConfig2,
	    httpAgent: defaultToConfig2,
	    httpsAgent: defaultToConfig2,
	    cancelToken: defaultToConfig2,
	    socketPath: defaultToConfig2,
	    responseEncoding: defaultToConfig2,
	    validateStatus: mergeDirectKeys,
	    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	  };
	  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
	    const merge = mergeMap[prop] || mergeDeepProperties;
	    const configValue = merge(config1[prop], config2[prop], prop);
	    utils$1.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	  });
	  return config;
	}
	var resolveConfig = config => {
	  const newConfig = mergeConfig({}, config);
	  let {
	    data,
	    withXSRFToken,
	    xsrfHeaderName,
	    xsrfCookieName,
	    headers,
	    auth
	  } = newConfig;
	  newConfig.headers = headers = AxiosHeaders$1.from(headers);
	  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

	  // HTTP basic authentication
	  if (auth) {
	    headers.set('Authorization', 'Basic ' + btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : '')));
	  }
	  let contentType;
	  if (utils$1.isFormData(data)) {
	    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
	      headers.setContentType(undefined); // Let the browser set it
	    } else if ((contentType = headers.getContentType()) !== false) {
	      // fix semicolon duplication issue for ReactNative FormData implementation
	      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
	      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
	    }
	  }

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.

	  if (platform.hasStandardBrowserEnv) {
	    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
	    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
	      // Add xsrf header
	      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
	      if (xsrfValue) {
	        headers.set(xsrfHeaderName, xsrfValue);
	      }
	    }
	  }
	  return newConfig;
	};
	const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
	var xhrAdapter = isXHRAdapterSupported && function (config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    const _config = resolveConfig(config);
	    let requestData = _config.data;
	    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
	    let {
	      responseType,
	      onUploadProgress,
	      onDownloadProgress
	    } = _config;
	    let onCanceled;
	    let uploadThrottled, downloadThrottled;
	    let flushUpload, flushDownload;
	    function done() {
	      flushUpload && flushUpload(); // flush events
	      flushDownload && flushDownload(); // flush events

	      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
	      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
	    }
	    let request = new XMLHttpRequest();
	    request.open(_config.method.toUpperCase(), _config.url, true);

	    // Set the request timeout in MS
	    request.timeout = _config.timeout;
	    function onloadend() {
	      if (!request) {
	        return;
	      }
	      // Prepare the response
	      const responseHeaders = AxiosHeaders$1.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
	      const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
	      const response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config,
	        request
	      };
	      settle(function _resolve(value) {
	        resolve(value);
	        done();
	      }, function _reject(err) {
	        reject(err);
	        done();
	      }, response);

	      // Clean up request
	      request = null;
	    }
	    if ('onloadend' in request) {
	      // Use onloadend if available
	      request.onloadend = onloadend;
	    } else {
	      // Listen for ready state to emulate onloadend
	      request.onreadystatechange = function handleLoad() {
	        if (!request || request.readyState !== 4) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        // With one exception: request that using file: protocol, most browsers
	        // will return status as 0 even though it's a successful request
	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	          return;
	        }
	        // readystate handler is calling before onerror or ontimeout handlers,
	        // so we should call onloadend on the next 'tick'
	        setTimeout(onloadend);
	      };
	    }

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }
	      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
	      const transitional = _config.transitional || transitionalDefaults;
	      if (_config.timeoutErrorMessage) {
	        timeoutErrorMessage = _config.timeoutErrorMessage;
	      }
	      reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));

	      // Clean up request
	      request = null;
	    };

	    // Remove Content-Type if data is undefined
	    requestData === undefined && requestHeaders.setContentType(null);

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
	        request.setRequestHeader(key, val);
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils$1.isUndefined(_config.withCredentials)) {
	      request.withCredentials = !!_config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (responseType && responseType !== 'json') {
	      request.responseType = _config.responseType;
	    }

	    // Handle progress if needed
	    if (onDownloadProgress) {
	      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
	      request.addEventListener('progress', downloadThrottled);
	    }

	    // Not all browsers support upload events
	    if (onUploadProgress && request.upload) {
	      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
	      request.upload.addEventListener('progress', uploadThrottled);
	      request.upload.addEventListener('loadend', flushUpload);
	    }
	    if (_config.cancelToken || _config.signal) {
	      // Handle cancellation
	      // eslint-disable-next-line func-names
	      onCanceled = cancel => {
	        if (!request) {
	          return;
	        }
	        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
	        request.abort();
	        request = null;
	      };
	      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
	      if (_config.signal) {
	        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
	      }
	    }
	    const protocol = parseProtocol(_config.url);
	    if (protocol && platform.protocols.indexOf(protocol) === -1) {
	      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
	      return;
	    }

	    // Send the request
	    request.send(requestData || null);
	  });
	};
	const composeSignals = (signals, timeout) => {
	  const {
	    length
	  } = signals = signals ? signals.filter(Boolean) : [];
	  if (timeout || length) {
	    let controller = new AbortController();
	    let aborted;
	    const onabort = function (reason) {
	      if (!aborted) {
	        aborted = true;
	        unsubscribe();
	        const err = reason instanceof Error ? reason : this.reason;
	        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
	      }
	    };
	    let timer = timeout && setTimeout(() => {
	      timer = null;
	      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
	    }, timeout);
	    const unsubscribe = () => {
	      if (signals) {
	        timer && clearTimeout(timer);
	        timer = null;
	        signals.forEach(signal => {
	          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
	        });
	        signals = null;
	      }
	    };
	    signals.forEach(signal => signal.addEventListener('abort', onabort));
	    const {
	      signal
	    } = controller;
	    signal.unsubscribe = () => utils$1.asap(unsubscribe);
	    return signal;
	  }
	};
	var composeSignals$1 = composeSignals;
	const streamChunk = function* (chunk, chunkSize) {
	  let len = chunk.byteLength;
	  if (len < chunkSize) {
	    yield chunk;
	    return;
	  }
	  let pos = 0;
	  let end;
	  while (pos < len) {
	    end = pos + chunkSize;
	    yield chunk.slice(pos, end);
	    pos = end;
	  }
	};
	const readBytes = async function* (iterable, chunkSize) {
	  for await (const chunk of readStream(iterable)) {
	    yield* streamChunk(chunk, chunkSize);
	  }
	};
	const readStream = async function* (stream) {
	  if (stream[Symbol.asyncIterator]) {
	    yield* stream;
	    return;
	  }
	  const reader = stream.getReader();
	  try {
	    for (;;) {
	      const {
	        done,
	        value
	      } = await reader.read();
	      if (done) {
	        break;
	      }
	      yield value;
	    }
	  } finally {
	    await reader.cancel();
	  }
	};
	const trackStream = (stream, chunkSize, onProgress, onFinish) => {
	  const iterator = readBytes(stream, chunkSize);
	  let bytes = 0;
	  let done;
	  let _onFinish = e => {
	    if (!done) {
	      done = true;
	      onFinish && onFinish(e);
	    }
	  };
	  return new ReadableStream({
	    async pull(controller) {
	      try {
	        const {
	          done,
	          value
	        } = await iterator.next();
	        if (done) {
	          _onFinish();
	          controller.close();
	          return;
	        }
	        let len = value.byteLength;
	        if (onProgress) {
	          let loadedBytes = bytes += len;
	          onProgress(loadedBytes);
	        }
	        controller.enqueue(new Uint8Array(value));
	      } catch (err) {
	        _onFinish(err);
	        throw err;
	      }
	    },
	    cancel(reason) {
	      _onFinish(reason);
	      return iterator.return();
	    }
	  }, {
	    highWaterMark: 2
	  });
	};
	const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
	const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

	// used only inside the fetch adapter
	const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? (encoder => str => encoder.encode(str))(new TextEncoder()) : async str => new Uint8Array(await new Response(str).arrayBuffer()));
	const test = (fn, ...args) => {
	  try {
	    return !!fn(...args);
	  } catch (e) {
	    return false;
	  }
	};
	const supportsRequestStream = isReadableStreamSupported && test(() => {
	  let duplexAccessed = false;
	  const hasContentType = new Request(platform.origin, {
	    body: new ReadableStream(),
	    method: 'POST',
	    get duplex() {
	      duplexAccessed = true;
	      return 'half';
	    }
	  }).headers.has('Content-Type');
	  return duplexAccessed && !hasContentType;
	});
	const DEFAULT_CHUNK_SIZE = 64 * 1024;
	const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response('').body));
	const resolvers = {
	  stream: supportsResponseStream && (res => res.body)
	};
	isFetchSupported && (res => {
	  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
	    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? res => res[type]() : (_, config) => {
	      throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
	    });
	  });
	})(new Response());
	const getBodyLength = async body => {
	  if (body == null) {
	    return 0;
	  }
	  if (utils$1.isBlob(body)) {
	    return body.size;
	  }
	  if (utils$1.isSpecCompliantForm(body)) {
	    const _request = new Request(platform.origin, {
	      method: 'POST',
	      body
	    });
	    return (await _request.arrayBuffer()).byteLength;
	  }
	  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
	    return body.byteLength;
	  }
	  if (utils$1.isURLSearchParams(body)) {
	    body = body + '';
	  }
	  if (utils$1.isString(body)) {
	    return (await encodeText(body)).byteLength;
	  }
	};
	const resolveBodyLength = async (headers, body) => {
	  const length = utils$1.toFiniteNumber(headers.getContentLength());
	  return length == null ? getBodyLength(body) : length;
	};
	var fetchAdapter = isFetchSupported && (async config => {
	  let {
	    url,
	    method,
	    data,
	    signal,
	    cancelToken,
	    timeout,
	    onDownloadProgress,
	    onUploadProgress,
	    responseType,
	    headers,
	    withCredentials = 'same-origin',
	    fetchOptions
	  } = resolveConfig(config);
	  responseType = responseType ? (responseType + '').toLowerCase() : 'text';
	  let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
	  let request;
	  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
	    composedSignal.unsubscribe();
	  });
	  let requestContentLength;
	  try {
	    if (onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
	      let _request = new Request(url, {
	        method: 'POST',
	        body: data,
	        duplex: "half"
	      });
	      let contentTypeHeader;
	      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
	        headers.setContentType(contentTypeHeader);
	      }
	      if (_request.body) {
	        const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
	        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
	      }
	    }
	    if (!utils$1.isString(withCredentials)) {
	      withCredentials = withCredentials ? 'include' : 'omit';
	    }

	    // Cloudflare Workers throws when credentials are defined
	    // see https://github.com/cloudflare/workerd/issues/902
	    const isCredentialsSupported = "credentials" in Request.prototype;
	    request = new Request(url, {
	      ...fetchOptions,
	      signal: composedSignal,
	      method: method.toUpperCase(),
	      headers: headers.normalize().toJSON(),
	      body: data,
	      duplex: "half",
	      credentials: isCredentialsSupported ? withCredentials : undefined
	    });
	    let response = await fetch(request);
	    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
	    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
	      const options = {};
	      ['status', 'statusText', 'headers'].forEach(prop => {
	        options[prop] = response[prop];
	      });
	      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));
	      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
	      response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
	        flush && flush();
	        unsubscribe && unsubscribe();
	      }), options);
	    }
	    responseType = responseType || 'text';
	    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);
	    !isStreamResponse && unsubscribe && unsubscribe();
	    return await new Promise((resolve, reject) => {
	      settle(resolve, reject, {
	        data: responseData,
	        headers: AxiosHeaders$1.from(response.headers),
	        status: response.status,
	        statusText: response.statusText,
	        config,
	        request
	      });
	    });
	  } catch (err) {
	    unsubscribe && unsubscribe();
	    if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
	      throw Object.assign(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request), {
	        cause: err.cause || err
	      });
	    }
	    throw AxiosError.from(err, err && err.code, config, request);
	  }
	});
	const knownAdapters = {
	  http: httpAdapter,
	  xhr: xhrAdapter,
	  fetch: fetchAdapter
	};
	utils$1.forEach(knownAdapters, (fn, value) => {
	  if (fn) {
	    try {
	      Object.defineProperty(fn, 'name', {
	        value
	      });
	    } catch (e) {
	      // eslint-disable-next-line no-empty
	    }
	    Object.defineProperty(fn, 'adapterName', {
	      value
	    });
	  }
	});
	const renderReason = reason => `- ${reason}`;
	const isResolvedHandle = adapter => utils$1.isFunction(adapter) || adapter === null || adapter === false;
	var adapters = {
	  getAdapter: adapters => {
	    adapters = utils$1.isArray(adapters) ? adapters : [adapters];
	    const {
	      length
	    } = adapters;
	    let nameOrAdapter;
	    let adapter;
	    const rejectedReasons = {};
	    for (let i = 0; i < length; i++) {
	      nameOrAdapter = adapters[i];
	      let id;
	      adapter = nameOrAdapter;
	      if (!isResolvedHandle(nameOrAdapter)) {
	        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
	        if (adapter === undefined) {
	          throw new AxiosError(`Unknown adapter '${id}'`);
	        }
	      }
	      if (adapter) {
	        break;
	      }
	      rejectedReasons[id || '#' + i] = adapter;
	    }
	    if (!adapter) {
	      const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
	      let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
	      throw new AxiosError(`There is no suitable adapter to dispatch the request ` + s, 'ERR_NOT_SUPPORT');
	    }
	    return adapter;
	  },
	  adapters: knownAdapters
	};

	/**
	 * Throws a `CanceledError` if cancellation has been requested.
	 *
	 * @param {Object} config The config that is to be used for the request
	 *
	 * @returns {void}
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	  if (config.signal && config.signal.aborted) {
	    throw new CanceledError(null, config);
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 *
	 * @returns {Promise} The Promise to be fulfilled
	 */
	function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	  config.headers = AxiosHeaders$1.from(config.headers);

	  // Transform request data
	  config.data = transformData.call(config, config.transformRequest);
	  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
	    config.headers.setContentType('application/x-www-form-urlencoded', false);
	  }
	  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(config, config.transformResponse, response);
	    response.headers = AxiosHeaders$1.from(response.headers);
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
	        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
	      }
	    }
	    return Promise.reject(reason);
	  });
	}
	const VERSION = "1.8.4";
	const validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});
	const deprecatedWarnings = {};

	/**
	 * Transitional option validator
	 *
	 * @param {function|boolean?} validator - set to false if the transitional option has been removed
	 * @param {string?} version - deprecated version / removed since version
	 * @param {string?} message - some message with additional info
	 *
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  function formatMessage(opt, desc) {
	    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return (value, opt, opts) => {
	    if (validator === false) {
	      throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
	    }
	    if (version && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
	    }
	    return validator ? validator(value, opt, opts) : true;
	  };
	};
	validators$1.spelling = function spelling(correctSpelling) {
	  return (value, opt) => {
	    // eslint-disable-next-line no-console
	    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
	    return true;
	  };
	};

	/**
	 * Assert object's properties type
	 *
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 *
	 * @returns {object}
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
	  }
	  const keys = Object.keys(options);
	  let i = keys.length;
	  while (i-- > 0) {
	    const opt = keys[i];
	    const validator = schema[opt];
	    if (validator) {
	      const value = options[opt];
	      const result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
	    }
	  }
	}
	var validator = {
	  assertOptions,
	  validators: validators$1
	};
	const validators = validator.validators;

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 *
	 * @return {Axios} A new instance of Axios
	 */
	class Axios {
	  constructor(instanceConfig) {
	    this.defaults = instanceConfig;
	    this.interceptors = {
	      request: new InterceptorManager$1(),
	      response: new InterceptorManager$1()
	    };
	  }

	  /**
	   * Dispatch a request
	   *
	   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	   * @param {?Object} config
	   *
	   * @returns {Promise} The Promise to be fulfilled
	   */
	  async request(configOrUrl, config) {
	    try {
	      return await this._request(configOrUrl, config);
	    } catch (err) {
	      if (err instanceof Error) {
	        let dummy = {};
	        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();

	        // slice off the Error: ... line
	        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
	        try {
	          if (!err.stack) {
	            err.stack = stack;
	            // match without the 2 top stack lines
	          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
	            err.stack += '\n' + stack;
	          }
	        } catch (e) {
	          // ignore the case where "stack" is an un-writable property
	        }
	      }
	      throw err;
	    }
	  }
	  _request(configOrUrl, config) {
	    /*eslint no-param-reassign:0*/
	    // Allow for axios('example/url'[, config]) a la fetch API
	    if (typeof configOrUrl === 'string') {
	      config = config || {};
	      config.url = configOrUrl;
	    } else {
	      config = configOrUrl || {};
	    }
	    config = mergeConfig(this.defaults, config);
	    const {
	      transitional,
	      paramsSerializer,
	      headers
	    } = config;
	    if (transitional !== undefined) {
	      validator.assertOptions(transitional, {
	        silentJSONParsing: validators.transitional(validators.boolean),
	        forcedJSONParsing: validators.transitional(validators.boolean),
	        clarifyTimeoutError: validators.transitional(validators.boolean)
	      }, false);
	    }
	    if (paramsSerializer != null) {
	      if (utils$1.isFunction(paramsSerializer)) {
	        config.paramsSerializer = {
	          serialize: paramsSerializer
	        };
	      } else {
	        validator.assertOptions(paramsSerializer, {
	          encode: validators.function,
	          serialize: validators.function
	        }, true);
	      }
	    }

	    // Set config.allowAbsoluteUrls
	    if (config.allowAbsoluteUrls !== undefined) ;else if (this.defaults.allowAbsoluteUrls !== undefined) {
	      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
	    } else {
	      config.allowAbsoluteUrls = true;
	    }
	    validator.assertOptions(config, {
	      baseUrl: validators.spelling('baseURL'),
	      withXsrfToken: validators.spelling('withXSRFToken')
	    }, true);

	    // Set config.method
	    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

	    // Flatten headers
	    let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
	    headers && utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
	      delete headers[method];
	    });
	    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

	    // filter out skipped interceptors
	    const requestInterceptorChain = [];
	    let synchronousRequestInterceptors = true;
	    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	        return;
	      }
	      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
	      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	    });
	    const responseInterceptorChain = [];
	    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	    });
	    let promise;
	    let i = 0;
	    let len;
	    if (!synchronousRequestInterceptors) {
	      const chain = [dispatchRequest.bind(this), undefined];
	      chain.unshift.apply(chain, requestInterceptorChain);
	      chain.push.apply(chain, responseInterceptorChain);
	      len = chain.length;
	      promise = Promise.resolve(config);
	      while (i < len) {
	        promise = promise.then(chain[i++], chain[i++]);
	      }
	      return promise;
	    }
	    len = requestInterceptorChain.length;
	    let newConfig = config;
	    i = 0;
	    while (i < len) {
	      const onFulfilled = requestInterceptorChain[i++];
	      const onRejected = requestInterceptorChain[i++];
	      try {
	        newConfig = onFulfilled(newConfig);
	      } catch (error) {
	        onRejected.call(this, error);
	        break;
	      }
	    }
	    try {
	      promise = dispatchRequest.call(this, newConfig);
	    } catch (error) {
	      return Promise.reject(error);
	    }
	    i = 0;
	    len = responseInterceptorChain.length;
	    while (i < len) {
	      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
	    }
	    return promise;
	  }
	  getUri(config) {
	    config = mergeConfig(this.defaults, config);
	    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
	    return buildURL(fullPath, config.params, config.paramsSerializer);
	  }
	}

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, config) {
	    return this.request(mergeConfig(config || {}, {
	      method,
	      url,
	      data: (config || {}).data
	    }));
	  };
	});
	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/

	  function generateHTTPMethod(isForm) {
	    return function httpMethod(url, data, config) {
	      return this.request(mergeConfig(config || {}, {
	        method,
	        headers: isForm ? {
	          'Content-Type': 'multipart/form-data'
	        } : {},
	        url,
	        data
	      }));
	    };
	  }
	  Axios.prototype[method] = generateHTTPMethod();
	  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
	});
	var Axios$1 = Axios;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @param {Function} executor The executor function.
	 *
	 * @returns {CancelToken}
	 */
	class CancelToken {
	  constructor(executor) {
	    if (typeof executor !== 'function') {
	      throw new TypeError('executor must be a function.');
	    }
	    let resolvePromise;
	    this.promise = new Promise(function promiseExecutor(resolve) {
	      resolvePromise = resolve;
	    });
	    const token = this;

	    // eslint-disable-next-line func-names
	    this.promise.then(cancel => {
	      if (!token._listeners) return;
	      let i = token._listeners.length;
	      while (i-- > 0) {
	        token._listeners[i](cancel);
	      }
	      token._listeners = null;
	    });

	    // eslint-disable-next-line func-names
	    this.promise.then = onfulfilled => {
	      let _resolve;
	      // eslint-disable-next-line func-names
	      const promise = new Promise(resolve => {
	        token.subscribe(resolve);
	        _resolve = resolve;
	      }).then(onfulfilled);
	      promise.cancel = function reject() {
	        token.unsubscribe(_resolve);
	      };
	      return promise;
	    };
	    executor(function cancel(message, config, request) {
	      if (token.reason) {
	        // Cancellation has already been requested
	        return;
	      }
	      token.reason = new CanceledError(message, config, request);
	      resolvePromise(token.reason);
	    });
	  }

	  /**
	   * Throws a `CanceledError` if cancellation has been requested.
	   */
	  throwIfRequested() {
	    if (this.reason) {
	      throw this.reason;
	    }
	  }

	  /**
	   * Subscribe to the cancel signal
	   */

	  subscribe(listener) {
	    if (this.reason) {
	      listener(this.reason);
	      return;
	    }
	    if (this._listeners) {
	      this._listeners.push(listener);
	    } else {
	      this._listeners = [listener];
	    }
	  }

	  /**
	   * Unsubscribe from the cancel signal
	   */

	  unsubscribe(listener) {
	    if (!this._listeners) {
	      return;
	    }
	    const index = this._listeners.indexOf(listener);
	    if (index !== -1) {
	      this._listeners.splice(index, 1);
	    }
	  }
	  toAbortSignal() {
	    const controller = new AbortController();
	    const abort = err => {
	      controller.abort(err);
	    };
	    this.subscribe(abort);
	    controller.signal.unsubscribe = () => this.unsubscribe(abort);
	    return controller.signal;
	  }

	  /**
	   * Returns an object that contains a new `CancelToken` and a function that, when called,
	   * cancels the `CancelToken`.
	   */
	  static source() {
	    let cancel;
	    const token = new CancelToken(function executor(c) {
	      cancel = c;
	    });
	    return {
	      token,
	      cancel
	    };
	  }
	}
	var CancelToken$1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 *
	 * @returns {Function}
	 */
	function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	}

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 *
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	function isAxiosError(payload) {
	  return utils$1.isObject(payload) && payload.isAxiosError === true;
	}
	const HttpStatusCode = {
	  Continue: 100,
	  SwitchingProtocols: 101,
	  Processing: 102,
	  EarlyHints: 103,
	  Ok: 200,
	  Created: 201,
	  Accepted: 202,
	  NonAuthoritativeInformation: 203,
	  NoContent: 204,
	  ResetContent: 205,
	  PartialContent: 206,
	  MultiStatus: 207,
	  AlreadyReported: 208,
	  ImUsed: 226,
	  MultipleChoices: 300,
	  MovedPermanently: 301,
	  Found: 302,
	  SeeOther: 303,
	  NotModified: 304,
	  UseProxy: 305,
	  Unused: 306,
	  TemporaryRedirect: 307,
	  PermanentRedirect: 308,
	  BadRequest: 400,
	  Unauthorized: 401,
	  PaymentRequired: 402,
	  Forbidden: 403,
	  NotFound: 404,
	  MethodNotAllowed: 405,
	  NotAcceptable: 406,
	  ProxyAuthenticationRequired: 407,
	  RequestTimeout: 408,
	  Conflict: 409,
	  Gone: 410,
	  LengthRequired: 411,
	  PreconditionFailed: 412,
	  PayloadTooLarge: 413,
	  UriTooLong: 414,
	  UnsupportedMediaType: 415,
	  RangeNotSatisfiable: 416,
	  ExpectationFailed: 417,
	  ImATeapot: 418,
	  MisdirectedRequest: 421,
	  UnprocessableEntity: 422,
	  Locked: 423,
	  FailedDependency: 424,
	  TooEarly: 425,
	  UpgradeRequired: 426,
	  PreconditionRequired: 428,
	  TooManyRequests: 429,
	  RequestHeaderFieldsTooLarge: 431,
	  UnavailableForLegalReasons: 451,
	  InternalServerError: 500,
	  NotImplemented: 501,
	  BadGateway: 502,
	  ServiceUnavailable: 503,
	  GatewayTimeout: 504,
	  HttpVersionNotSupported: 505,
	  VariantAlsoNegotiates: 506,
	  InsufficientStorage: 507,
	  LoopDetected: 508,
	  NotExtended: 510,
	  NetworkAuthenticationRequired: 511
	};
	Object.entries(HttpStatusCode).forEach(([key, value]) => {
	  HttpStatusCode[value] = key;
	});
	var HttpStatusCode$1 = HttpStatusCode;

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 *
	 * @returns {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  const context = new Axios$1(defaultConfig);
	  const instance = bind(Axios$1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils$1.extend(instance, Axios$1.prototype, context, {
	    allOwnKeys: true
	  });

	  // Copy context to instance
	  utils$1.extend(instance, context, null, {
	    allOwnKeys: true
	  });

	  // Factory for creating new instances
	  instance.create = function create(instanceConfig) {
	    return createInstance(mergeConfig(defaultConfig, instanceConfig));
	  };
	  return instance;
	}

	// Create the default instance to be exported
	const axios = createInstance(defaults$1);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios$1;

	// Expose Cancel & CancelToken
	axios.CanceledError = CanceledError;
	axios.CancelToken = CancelToken$1;
	axios.isCancel = isCancel;
	axios.VERSION = VERSION;
	axios.toFormData = toFormData;

	// Expose AxiosError class
	axios.AxiosError = AxiosError;

	// alias for CanceledError for backward compatibility
	axios.Cancel = axios.CanceledError;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = spread;

	// Expose isAxiosError
	axios.isAxiosError = isAxiosError;

	// Expose mergeConfig
	axios.mergeConfig = mergeConfig;
	axios.AxiosHeaders = AxiosHeaders$1;
	axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
	axios.getAdapter = adapters.getAdapter;
	axios.HttpStatusCode = HttpStatusCode$1;
	axios.default = axios;
	var axios_1 = axios;

	var jsxRuntime = {exports: {}};

	var reactJsxRuntime_development = {};

	/**
	 * @license React
	 * react-jsx-runtime.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  (function() {

	var React = require$$0__default.default;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum();

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}

	{
	  jsxRuntime.exports = reactJsxRuntime_development;
	}

	var jsxRuntimeExports = jsxRuntime.exports;

	Object.defineProperty(UploadImageInput$1, "__esModule", {
	  value: true
	});
	var default_1$2 = UploadImageInput$1.default = void 0;
	var _react$1 = _interopRequireWildcard$1(require$$0__default.default);
	var _designSystem$2 = require$$1__default.default;
	var _axios$1 = _interopRequireDefault$2(axios_1);
	var _jsxRuntime$2 = jsxRuntimeExports;
	function _interopRequireDefault$2(e) {
	  return e && e.__esModule ? e : {
	    default: e
	  };
	}
	function _getRequireWildcardCache$1(e) {
	  if ("function" != typeof WeakMap) return null;
	  var r = new WeakMap(),
	    t = new WeakMap();
	  return (_getRequireWildcardCache$1 = function (e) {
	    return e ? t : r;
	  })(e);
	}
	function _interopRequireWildcard$1(e, r) {
	  if (e && e.__esModule) return e;
	  if (null === e || "object" != typeof e && "function" != typeof e) return {
	    default: e
	  };
	  var t = _getRequireWildcardCache$1(r);
	  if (t && t.has(e)) return t.get(e);
	  var n = {
	      __proto__: null
	    },
	    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
	  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
	    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
	    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
	  }
	  return n.default = e, t && t.set(e, n), n;
	}
	const UploadImageInput = props => {
	  const {
	    property,
	    record,
	    onChange
	  } = props;
	  const currentImageUrl = record.params[property.path] || '';
	  const [imageUrl, setImageUrl] = (0, _react$1.useState)(currentImageUrl);
	  const [isUploading, setIsUploading] = (0, _react$1.useState)(false);
	  const [error, setError] = (0, _react$1.useState)(null);
	  const onUpload = async files => {
	    const file = files[0];
	    if (!file) return;
	    setIsUploading(true);
	    setError(null);
	    const formData = new FormData();
	    formData.append('file', file);
	    try {
	      const response = await _axios$1.default.post('/api/uploads', formData, {
	        headers: {
	          'Content-Type': 'multipart/form-data'
	        }
	      });
	      const newUrl = response.data.url;
	      setImageUrl(newUrl);
	      onChange(property.path, newUrl);
	    } catch (err) {
	      console.error("Upload failed:", err);
	      const message = err.response?.data?.message || err.message || 'Upload failed';
	      setError(message);
	    } finally {
	      setIsUploading(false);
	    }
	  };
	  const handleDelete = (0, _react$1.useCallback)(() => {
	    setImageUrl('');
	    onChange(property.path, null);
	  }, [onChange, property.path]);
	  return /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	    marginBottom: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Label, {
	      htmlFor: property.path,
	      children: property.label || property.path
	    }), /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Box, {
	      children: imageUrl ? /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	        display: "flex",
	        alignItems: "center",
	        children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)("img", {
	          src: imageUrl,
	          alt: property.label || 'Uploaded image',
	          style: {
	            maxHeight: '100px',
	            maxWidth: '200px',
	            marginRight: '10px'
	          }
	        }), /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Button, {
	          onClick: handleDelete,
	          variant: "danger",
	          size: "sm",
	          children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Icon, {
	            icon: "TrashCan"
	          }), " Remove"]
	        })]
	      }) : /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.DropZone, {
	        onChange: onUpload,
	        validate: {
	          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
	          maxSize: 5 * 1024 * 1024
	        },
	        uploading: isUploading,
	        multiple: false
	      })
	    }), error && /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Text, {
	      color: "danger",
	      children: error
	    })]
	  });
	};
	default_1$2 = UploadImageInput$1.default = UploadImageInput;

	var PasswordInput$1 = {};

	Object.defineProperty(PasswordInput$1, "__esModule", {
	  value: true
	});
	var default_1$1 = PasswordInput$1.default = void 0;
	_interopRequireDefault$1(require$$0__default.default);
	var _designSystem$1 = require$$1__default.default;
	var _jsxRuntime$1 = jsxRuntimeExports;
	function _interopRequireDefault$1(e) {
	  return e && e.__esModule ? e : {
	    default: e
	  };
	}
	const PasswordInput = props => {
	  const {
	    property,
	    record,
	    onChange
	  } = props;
	  const value = '';
	  const handleChange = event => {
	    onChange(property.name, event.target.value);
	  };
	  return /*#__PURE__*/(0, _jsxRuntime$1.jsxs)(_designSystem$1.FormGroup, {
	    children: [/*#__PURE__*/(0, _jsxRuntime$1.jsx)(_designSystem$1.Label, {
	      htmlFor: property.path,
	      children: property.label || property.path
	    }), /*#__PURE__*/(0, _jsxRuntime$1.jsx)(_designSystem$1.Input, {
	      type: "password",
	      id: property.path,
	      name: property.path,
	      value: value,
	      onChange: handleChange,
	      required: property.isRequired
	    })]
	  });
	};
	default_1$1 = PasswordInput$1.default = PasswordInput;

	var Dashboard$1 = {};

	Object.defineProperty(Dashboard$1, "__esModule", {
	  value: true
	});
	var default_1 = Dashboard$1.default = void 0;
	var _react = _interopRequireWildcard(require$$0__default.default);
	var _designSystem = require$$1__default.default;
	var _axios = _interopRequireDefault(axios_1);
	var _jsxRuntime = jsxRuntimeExports;
	function _interopRequireDefault(e) {
	  return e && e.__esModule ? e : {
	    default: e
	  };
	}
	function _getRequireWildcardCache(e) {
	  if ("function" != typeof WeakMap) return null;
	  var r = new WeakMap(),
	    t = new WeakMap();
	  return (_getRequireWildcardCache = function (e) {
	    return e ? t : r;
	  })(e);
	}
	function _interopRequireWildcard(e, r) {
	  if (e && e.__esModule) return e;
	  if (null === e || "object" != typeof e && "function" != typeof e) return {
	    default: e
	  };
	  var t = _getRequireWildcardCache(r);
	  if (t && t.has(e)) return t.get(e);
	  var n = {
	      __proto__: null
	    },
	    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
	  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
	    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
	    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
	  }
	  return n.default = e, t && t.set(e, n), n;
	}
	// src/adminComponents/Dashboard.jsx

	const ALL_POSSIBLE_STATUSES = ['Новый', 'Принят', 'Оплачен', 'В сборке', 'Передан в доставку', 'Готов к самовывозу', 'Завершен', 'Отменен', 'Возврат'];
	const DEFAULT_IN_PROGRESS_STATUSES = ['Принят', 'Оплачен', 'В сборке', 'Передан в доставку', 'Готов к самовывозу'];
	const NewOrdersWidget = ({
	  refreshInProgressOrdersTrigger
	}) => {
	  // Принимаем триггер обновления
	  const [newOrders, setNewOrders] = (0, _react.useState)([]);
	  const [loading, setLoading] = (0, _react.useState)(true);
	  const [error, setError] = (0, _react.useState)(null);
	  const fetchNewOrders = (0, _react.useCallback)(async () => {
	    try {
	      setLoading(true);
	      const response = await _axios.default.get('/api/orders/status/Новый?limit=5&sortBy=createdAt&sortDirection=DESC');
	      setNewOrders(response.data.orders || []);
	      setError(null);
	    } catch (err) {
	      console.error("Failed to fetch new orders:", err);
	      setError('Failed to load new orders.');
	      setNewOrders([]);
	    } finally {
	      setLoading(false);
	    }
	  }, []);
	  (0, _react.useEffect)(() => {
	    fetchNewOrders();
	  }, [fetchNewOrders]);
	  const handleChangeOrderStatus = async (orderId, newStatus, comment) => {
	    try {
	      await _axios.default.put(`/api/orders/${orderId}/status`, {
	        newStatus,
	        adminComment: comment
	      });
	      // alert(`Статус заказа #${orderId} обновлен на "${newStatus}"`);
	      fetchNewOrders();
	      if (refreshInProgressOrdersTrigger) {
	        // Вызываем триггер, если он есть
	        refreshInProgressOrdersTrigger();
	      }
	    } catch (err) {
	      console.error(`Failed to update status for order ${orderId} to ${newStatus}:`, err);
	      alert(`Ошибка обновления статуса для заказа #${orderId}.`);
	    }
	  };
	  if (loading) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	    children: "Loading new orders..."
	  });
	  if (error) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	    color: "danger",
	    children: error
	  });
	  if (newOrders.length === 0) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	    children: "No new orders found."
	  });
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    p: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	      mb: "md",
	      children: "\u041D\u043E\u0432\u044B\u0435 \u0417\u0430\u043A\u0430\u0437\u044B"
	    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Table, {
	      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableHead, {
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.TableRow, {
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "ID"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "\u0414\u0430\u0442\u0430"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "\u041A\u043B\u0438\u0435\u043D\u0442"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "\u0421\u0443\u043C\u043C\u0430"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "\u0422\u043E\u0432\u0430\u0440\u044B"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
	          })]
	        })
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableBody, {
	        children: newOrders.map(order => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.TableRow, {
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
	              href: `/admin/resources/orders/records/${order.id}/show`,
	              target: "_blank",
	              rel: "noopener noreferrer",
	              children: ["#", order.id]
	            })
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: new Date(order.createdAt).toLocaleString()
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: order.customerName
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.TableCell, {
	            children: [parseFloat(order.totalAmount).toFixed(2), " \u0420"]
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
	              style: {
	                listStyle: 'none',
	                padding: 0,
	                margin: 0
	              },
	              children: (order.items || []).map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
	                children: [item.productName, " x ", item.quantity]
	              }, item.id))
	            })
	          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	              display: "flex",
	              style: {
	                gap: '8px'
	              },
	              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Button, {
	                variant: "success",
	                size: "sm",
	                onClick: () => handleChangeOrderStatus(order.id, 'Принят', 'Order accepted from dashboard'),
	                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	                  icon: "Check"
	                }), " \u0412 \u0440\u0430\u0431\u043E\u0442\u0443"]
	              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Button, {
	                variant: "danger",
	                size: "sm",
	                onClick: () => {
	                  if (window.confirm(`Вы уверены, что хотите отменить заказ #${order.id}?`)) {
	                    handleChangeOrderStatus(order.id, 'Отменен', 'Order cancelled from dashboard');
	                  }
	                },
	                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	                  icon: "Close"
	                }), " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"]
	              })]
	            })
	          })]
	        }, order.id))
	      })]
	    })]
	  });
	};
	const InProgressOrdersWidget = ({
	  refreshTrigger,
	  onRefreshDone
	}) => {
	  const [inProgressOrders, setInProgressOrders] = (0, _react.useState)([]);
	  const [loading, setLoading] = (0, _react.useState)(true);
	  const [error, setError] = (0, _react.useState)(null);
	  const [selectedFilterStatuses, setSelectedFilterStatuses] = (0, _react.useState)(new Set(DEFAULT_IN_PROGRESS_STATUSES));
	  const [orderStatusesForEdit, setOrderStatusesForEdit] = (0, _react.useState)({});
	  const [showConfirmModal, setShowConfirmModal] = (0, _react.useState)(false);
	  const [confirmModalData, setConfirmModalData] = (0, _react.useState)({
	    orderId: null,
	    newStatus: null
	  });
	  const fetchInProgressOrders = (0, _react.useCallback)(async () => {
	    const statusesToFetch = Array.from(selectedFilterStatuses);
	    if (statusesToFetch.length === 0) {
	      setInProgressOrders([]);
	      setLoading(false);
	      setError(null);
	      return;
	    }
	    try {
	      setLoading(true);
	      const statusQuery = statusesToFetch.map(s => `status=${encodeURIComponent(s)}`).join('&');
	      const response = await _axios.default.get(`/api/orders/filter?${statusQuery}&limit=10&sortBy=updatedAt&sortDirection=ASC`);
	      const fetchedOrders = response.data.orders || [];
	      setInProgressOrders(fetchedOrders);
	      const initialStatusesForEdit = {};
	      fetchedOrders.forEach(order => {
	        initialStatusesForEdit[order.id] = order.status;
	      });
	      setOrderStatusesForEdit(initialStatusesForEdit);
	      setError(null);
	    } catch (err) {
	      console.error("Failed to fetch in-progress orders:", err);
	      setError('Failed to load in-progress orders.');
	      setInProgressOrders([]);
	    } finally {
	      setLoading(false);
	      if (onRefreshDone) onRefreshDone();
	    }
	  }, [selectedFilterStatuses, onRefreshDone]);
	  (0, _react.useEffect)(() => {
	    fetchInProgressOrders();
	  }, [fetchInProgressOrders, refreshTrigger]);
	  const handleStatusFilterChange = (statusValue, isChecked) => {
	    setSelectedFilterStatuses(prev => {
	      const newSet = new Set(prev);
	      if (isChecked) newSet.add(statusValue);else newSet.delete(statusValue);
	      return newSet;
	    });
	  };
	  const handleStatusEditChange = (orderId, newStatus) => {
	    setOrderStatusesForEdit(prev => ({
	      ...prev,
	      [orderId]: newStatus
	    }));
	  };
	  const prepareToSaveStatus = orderId => {
	    const newStatus = orderStatusesForEdit[orderId];
	    if (!newStatus) {
	      alert("Сначала выберите новый статус.");
	      return;
	    }
	    setConfirmModalData({
	      orderId,
	      newStatus
	    });
	    setShowConfirmModal(true);
	  };
	  const cancelStatusChange = () => {
	    setShowConfirmModal(false);
	    setConfirmModalData({
	      orderId: null,
	      newStatus: null
	    });
	  };
	  const confirmAndSaveStatus = async () => {
	    const {
	      orderId,
	      newStatus
	    } = confirmModalData;
	    if (!orderId || !newStatus) return;
	    setShowConfirmModal(false);
	    try {
	      await _axios.default.put(`/api/orders/${orderId}/status`, {
	        newStatus,
	        adminComment: 'Status updated from dashboard'
	      });
	      // alert(`Статус заказа #${orderId} обновлен на "${newStatus}"`);
	      fetchInProgressOrders();
	    } catch (err) {
	      console.error(`Failed to update status for order ${orderId}:`, err);
	      alert(`Ошибка обновления статуса для заказа #${orderId}.`);
	    } finally {
	      setConfirmModalData({
	        orderId: null,
	        newStatus: null
	      });
	    }
	  };
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	      variant: "white",
	      boxShadow: "card",
	      p: "lg",
	      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	        mb: "md",
	        children: "\u0417\u0430\u043A\u0430\u0437\u044B \u0432 \u0420\u0430\u0431\u043E\u0442\u0435"
	      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	        mb: "md",
	        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Label, {
	          children: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043C:"
	        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	          display: "flex",
	          flexWrap: "wrap",
	          style: {
	            gap: '10px',
	            marginTop: '8px'
	          },
	          children: DEFAULT_IN_PROGRESS_STATUSES.map(statusOption => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	            display: "flex",
	            alignItems: "center",
	            mr: "md",
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
	              type: "checkbox",
	              id: `filter-status-${statusOption.replace(/\s+/g, '-')}`,
	              checked: selectedFilterStatuses.has(statusOption),
	              onChange: e => handleStatusFilterChange(statusOption, e.target.checked),
	              style: {
	                marginRight: '5px'
	              }
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Label, {
	              htmlFor: `filter-status-${statusOption.replace(/\s+/g, '-')}`,
	              children: statusOption
	            })]
	          }, statusOption))
	        })]
	      }), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	        children: "Loading in-progress orders..."
	      }), !loading && error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	        color: "danger",
	        children: error
	      }), !loading && !error && selectedFilterStatuses.size === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	        children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435."
	      }), !loading && !error && selectedFilterStatuses.size > 0 && inProgressOrders.length === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	        children: "\u041F\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043C \u0437\u0430\u043A\u0430\u0437\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B."
	      }), !loading && !error && inProgressOrders.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Table, {
	        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableHead, {
	          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.TableRow, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: "ID"
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: "\u041A\u043B\u0438\u0435\u043D\u0442"
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: "\u0422\u043E\u0432\u0430\u0440\u044B"
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0421\u0442\u0430\u0442\u0443\u0441"
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"
	            })]
	          })
	        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableBody, {
	          children: inProgressOrders.map(order => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.TableRow, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
	                href: `/admin/resources/orders/records/${order.id}/show`,
	                target: "_blank",
	                rel: "noopener noreferrer",
	                children: ["#", order.id]
	              })
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: order.customerName
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
	                style: {
	                  listStyle: 'none',
	                  padding: 0,
	                  margin: 0
	                },
	                children: (order.items || []).map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
	                  children: [item.productName, " x ", item.quantity]
	                }, item.id))
	              })
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Select, {
	                value: {
	                  value: orderStatusesForEdit[order.id] || order.status,
	                  label: orderStatusesForEdit[order.id] || order.status
	                },
	                options: ALL_POSSIBLE_STATUSES.map(s => ({
	                  value: s,
	                  label: s
	                })),
	                onChange: selected => handleStatusEditChange(order.id, selected.value)
	              })
	            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.TableCell, {
	              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Button, {
	                variant: "primary",
	                size: "sm",
	                onClick: () => prepareToSaveStatus(order.id),
	                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	                  icon: "Save"
	                })
	              })
	            })]
	          }, order.id))
	        })]
	      })]
	    }), showConfirmModal && confirmModalData.orderId && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	      style: {
	        position: 'fixed',
	        top: '50%',
	        left: '50%',
	        transform: 'translate(-50%, -50%)',
	        zIndex: 1050,
	        padding: '20px',
	        background: 'white',
	        borderRadius: '8px',
	        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
	        textAlign: 'center'
	      },
	      width: ['90%', '400px'],
	      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	        mb: "lg",
	        children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	        mb: "xl",
	        children: `Изменить статус заказа #${confirmModalData.orderId} на "${confirmModalData.newStatus}"?`
	      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	        display: "flex",
	        justifyContent: "center",
	        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Button, {
	          variant: "primary",
	          onClick: confirmAndSaveStatus,
	          mr: "md",
	          children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C"
	        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Button, {
	          variant: "text",
	          onClick: cancelStatusChange,
	          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
	        })]
	      })]
	    }), showConfirmModal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	      style: {
	        position: 'fixed',
	        top: 0,
	        left: 0,
	        right: 0,
	        bottom: 0,
	        backgroundColor: 'rgba(0,0,0,0.5)',
	        zIndex: 1040
	      },
	      onClick: cancelStatusChange
	    })]
	  });
	};
	const AdminsWidget = () => {
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    p: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	      mb: "md",
	      children: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B"
	    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	      children: "Content for admins list... (To be implemented)"
	    })]
	  });
	};
	const PlaceholderWidget = () => {
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    p: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	      mb: "md",
	      children: "\u0414\u0440\u0443\u0433\u043E\u0439 \u0412\u0438\u0434\u0436\u0435\u0442"
	    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	      children: "Placeholder for another widget... (To be implemented)"
	    })]
	  });
	};
	const Dashboard = () => {
	  const [refreshInProgressKey, setRefreshInProgressKey] = (0, _react.useState)(0);
	  const triggerInProgressRefresh = () => {
	    setRefreshInProgressKey(prevKey => prevKey + 1);
	  };
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	      mb: "xl",
	      p: "lg",
	      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H2, {
	        children: "\u041F\u0430\u043D\u0435\u043B\u044C \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u043C"
	      })
	    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	      display: "grid",
	      gridTemplateColumns: {
	        _: "1fr"
	      },
	      gridGap: "lg",
	      p: "lg",
	      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(NewOrdersWidget, {
	        refreshInProgressOrdersTrigger: triggerInProgressRefresh
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(InProgressOrdersWidget, {
	        refreshTrigger: refreshInProgressKey,
	        onRefreshDone: () => {}
	      }, refreshInProgressKey), /*#__PURE__*/(0, _jsxRuntime.jsx)(AdminsWidget, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(PlaceholderWidget, {})]
	    })]
	  });
	};
	default_1 = Dashboard$1.default = Dashboard;

	AdminJS.UserComponents = {};
	AdminJS.UserComponents.UploadImageInput = default_1$2;
	AdminJS.UserComponents.PasswordInput = default_1$1;
	AdminJS.UserComponents.Dashboard = default_1;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIi4uL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUuanMiLCIuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9VcGxvYWRJbWFnZUlucHV0LmpzIiwiLi4vZGlzdC9hZG1pbkNvbXBvbmVudHMvUGFzc3dvcmRJbnB1dC5qcyIsIi4uL2Rpc3QvYWRtaW5Db21wb25lbnRzL0Rhc2hib2FyZC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBBeGlvcyB2MS44LjQgQ29weXJpZ2h0IChjKSAyMDI1IE1hdHQgWmFicmlza2llIGFuZCBjb250cmlidXRvcnMgKi9cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufTtcblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59O1xuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn07XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuLy8gb3JpZ2luYWwgY29kZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RpZ2l0YWxCcmFpbkpTL0F4aW9zUHJvbWlzZS9ibG9iLzE2ZGVhYjEzNzEwZWMwOTc3OTkyMjEzMWYzZmE1OTU0MzIwZjgzYWIvbGliL3V0aWxzLmpzI0wxMS1MMzRcblxuY29uc3QgX3NldEltbWVkaWF0ZSA9ICgoc2V0SW1tZWRpYXRlU3VwcG9ydGVkLCBwb3N0TWVzc2FnZVN1cHBvcnRlZCkgPT4ge1xuICBpZiAoc2V0SW1tZWRpYXRlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgfVxuXG4gIHJldHVybiBwb3N0TWVzc2FnZVN1cHBvcnRlZCA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgIF9nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKHtzb3VyY2UsIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYik7XG4gICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCBcIipcIik7XG4gICAgfVxuICB9KShgYXhpb3NAJHtNYXRoLnJhbmRvbSgpfWAsIFtdKSA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KShcbiAgdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyxcbiAgaXNGdW5jdGlvbihfZ2xvYmFsLnBvc3RNZXNzYWdlKVxuKTtcblxuY29uc3QgYXNhcCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCcgP1xuICBxdWV1ZU1pY3JvdGFzay5iaW5kKF9nbG9iYWwpIDogKCB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCBfc2V0SW1tZWRpYXRlKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbnZhciB1dGlscyQxID0ge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXBcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogbnVsbDtcbiAgfVxufVxuXG51dGlscyQxLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzJDEudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXNcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlJDEgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlJDEsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlJDEpO1xuXG4gIHV0aWxzJDEudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbnZhciBodHRwQWRhcHRlciA9IG51bGw7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMkMS5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscyQxLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMkMS5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzJDEudG9GbGF0T2JqZWN0KHV0aWxzJDEsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscyQxLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMkMS5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscyQxLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMkMS5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMkMS5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscyQxLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscyQxLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMkMS5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMkMS5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscyQxLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMkMS5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzJDEuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMkMS5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlJDEoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUkMSk7XG4gIH0gOiBlbmNvZGUkMTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5mdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBzZXJpYWxpemU6IG9wdGlvbnNcbiAgICB9O1xuICB9IFxuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIkMSA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0ge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zJDEgPSB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuXG52YXIgRm9ybURhdGEkMSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG5cbnZhciBCbG9iJDEgPSB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcblxudmFyIHBsYXRmb3JtJDEgPSB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zJDEsXG4gICAgRm9ybURhdGE6IEZvcm1EYXRhJDEsXG4gICAgQmxvYjogQmxvYiQxXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuXG5jb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuY29uc3QgX25hdmlnYXRvciA9IHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvciB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxudmFyIHV0aWxzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIGhhc0Jyb3dzZXJFbnY6IGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudjogaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnY6IGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgbmF2aWdhdG9yOiBfbmF2aWdhdG9yLFxuICBvcmlnaW46IG9yaWdpblxufSk7XG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtJDFcbn07XG5cbmZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscyQxLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMkMS5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMkMS5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscyQxLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscyQxLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzJDEudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMkMS5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMkMS5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscyQxLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCbG9iKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMkMS5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMkMS5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMkMS5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG52YXIgZGVmYXVsdHMkMSA9IGRlZmF1bHRzO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzJDEudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xudmFyIHBhcnNlSGVhZGVycyA9IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscyQxLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMkMS50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscyQxLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZih1dGlscyQxLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMkMS5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzJDEucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscyQxLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxudmFyIEF4aW9zSGVhZGVycyQxID0gQXhpb3NIZWFkZXJzO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzJDE7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzJDEuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscyQxLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgbGV0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgbGFzdEFyZ3M7XG4gIGxldCB0aW1lcjtcblxuICBjb25zdCBpbnZva2UgPSAoYXJncywgbm93ID0gRGF0ZS5ub3coKSkgPT4ge1xuICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICBsYXN0QXJncyA9IG51bGw7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgIH1cbiAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgfTtcblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZShlID0+IHtcbiAgICBjb25zdCBsb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQ7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcbiAgICBjb25zdCBpblJhbmdlID0gbG9hZGVkIDw9IHRvdGFsO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IChsb2FkZWQgLyB0b3RhbCkgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdG90YWwgIT0gbnVsbCxcbiAgICAgIFtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXTogdHJ1ZVxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5jb25zdCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yID0gKHRvdGFsLCB0aHJvdHRsZWQpID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG5cbiAgcmV0dXJuIFsobG9hZGVkKSA9PiB0aHJvdHRsZWRbMF0oe1xuICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgdG90YWwsXG4gICAgbG9hZGVkXG4gIH0pLCB0aHJvdHRsZWRbMV1dO1xufTtcblxuY29uc3QgYXN5bmNEZWNvcmF0b3IgPSAoZm4pID0+ICguLi5hcmdzKSA9PiB1dGlscyQxLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG5cbnZhciBjb29raWVzID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAge1xuICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgY29uc3QgY29va2llID0gW25hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXTtcblxuICAgICAgdXRpbHMkMS5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscyQxLmlzU3RyaW5nKGRvbWFpbikgJiYgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcblxuICAgICAgc2VjdXJlID09PSB0cnVlICYmIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcblxuICAgIHJlYWQobmFtZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9XG5cbiAgOlxuXG4gIC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAge1xuICAgIHdyaXRlKCkge30sXG4gICAgcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlKCkge31cbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5mdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMLCBhbGxvd0Fic29sdXRlVXJscykge1xuICBsZXQgaXNSZWxhdGl2ZVVybCA9ICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCk7XG4gIGlmIChiYXNlVVJMICYmIChpc1JlbGF0aXZlVXJsIHx8IGFsbG93QWJzb2x1dGVVcmxzID09IGZhbHNlKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMkMSA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCAsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYiAsIHByb3ApID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYikscHJvcCwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscyQxLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscyQxLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgcmVzb2x2ZUNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRUeXBlO1xuXG4gIGlmICh1dGlscyQxLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfSBlbHNlIGlmICgoY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkpICE9PSBmYWxzZSkge1xuICAgICAgLy8gZml4IHNlbWljb2xvbiBkdXBsaWNhdGlvbiBpc3N1ZSBmb3IgUmVhY3ROYXRpdmUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAgICAgIGNvbnN0IFt0eXBlLCAuLi50b2tlbnNdID0gY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpLm1hcCh0b2tlbiA9PiB0b2tlbi50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShbdHlwZSB8fCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsIC4uLnRva2Vuc10uam9pbignOyAnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICB3aXRoWFNSRlRva2VuICYmIHV0aWxzJDEuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgeGhyQWRhcHRlciA9IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMkMS5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAoW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAoW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcykpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscyQxLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufTtcblxudmFyIGNvbXBvc2VTaWduYWxzJDEgPSBjb21wb3NlU2lnbmFscztcblxuY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5jb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59O1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufTtcblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMkMS5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscyQxLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscyQxLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59O1xuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzJDEudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59O1xuXG52YXIgZmV0Y2hBZGFwdGVyID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyQxKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gIGxldCByZXF1ZXN0O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiYgKCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gIH0pO1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgIH1cblxuICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gXCJjcmVkZW50aWFsc1wiIGluIFJlcXVlc3QucHJvdG90eXBlO1xuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWRcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMkMS5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKHJlc3BvbnNlLCBjb25maWcpO1xuXG4gICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufTtcblxudXRpbHMkMS5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMkMS5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbnZhciBhZGFwdGVycyA9IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscyQxLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59O1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzJDEuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuOC40XCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzJDEuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG52YXIgdmFsaWRhdG9yID0ge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzJDFcbn07XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkgOyBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoY29uZmlnLCB7XG4gICAgICBiYXNlVXJsOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCdiYXNlVVJMJyksXG4gICAgICB3aXRoWHNyZlRva2VuOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCd3aXRoWFNSRlRva2VuJylcbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscyQxLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMkMS5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCwgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzJDEuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscyQxLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxudmFyIEF4aW9zJDEgPSBBeGlvcztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oY2FuY2VsID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0b0Fib3J0U2lnbmFsKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IChlcnIpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgY29udHJvbGxlci5zaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB0aGlzLnVuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMkMS5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuXG5jb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxudmFyIEh0dHBTdGF0dXNDb2RlJDEgPSBIdHRwU3RhdHVzQ29kZTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zJDEoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcyQxLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscyQxLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MkMS5wcm90b3R5cGUsIGNvbnRleHQsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMkMS5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlJDE7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLmNqcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgUmVhY3RcbiAqIHJlYWN0LWpzeC1ydW50aW1lLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLy8gQVRURU5USU9OXG4vLyBXaGVuIGFkZGluZyBuZXcgc3ltYm9scyB0byB0aGlzIGZpbGUsXG4vLyBQbGVhc2UgY29uc2lkZXIgYWxzbyBhZGRpbmcgdG8gJ3JlYWN0LWRldnRvb2xzLXNoYXJlZC9zcmMvYmFja2VuZC9SZWFjdFN5bWJvbHMnXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50Jyk7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKTtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKTtcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKTtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKTtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0Jyk7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJyk7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJyk7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKTtcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5Jyk7XG52YXIgUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5vZmZzY3JlZW4nKTtcbnZhciBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgPSBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbWF5YmVJdGVyYXRvciA9IE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF07XG5cbiAgaWYgKHR5cGVvZiBtYXliZUl0ZXJhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG1heWJlSXRlcmF0b3I7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIFJlYWN0U2hhcmVkSW50ZXJuYWxzID0gUmVhY3QuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ7XG5cbmZ1bmN0aW9uIGVycm9yKGZvcm1hdCkge1xuICB7XG4gICAge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nKCdlcnJvcicsIGZvcm1hdCwgYXJncyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByaW50V2FybmluZyhsZXZlbCwgZm9ybWF0LCBhcmdzKSB7XG4gIC8vIFdoZW4gY2hhbmdpbmcgdGhpcyBsb2dpYywgeW91IG1pZ2h0IHdhbnQgdG8gYWxzb1xuICAvLyB1cGRhdGUgY29uc29sZVdpdGhTdGFja0Rldi53d3cuanMgYXMgd2VsbC5cbiAge1xuICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcblxuICAgIGlmIChzdGFjayAhPT0gJycpIHtcbiAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtzdGFja10pO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG5cblxuICAgIHZhciBhcmdzV2l0aEZvcm1hdCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGl0ZW0pO1xuICAgIH0pOyAvLyBDYXJlZnVsOiBSTiBjdXJyZW50bHkgZGVwZW5kcyBvbiB0aGlzIHByZWZpeFxuXG4gICAgYXJnc1dpdGhGb3JtYXQudW5zaGlmdCgnV2FybmluZzogJyArIGZvcm1hdCk7IC8vIFdlIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIHNwcmVhZCAob3IgLmFwcGx5KSBkaXJlY3RseSBiZWNhdXNlIGl0XG4gICAgLy8gYnJlYWtzIElFOTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzYxMFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmdcblxuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGVbbGV2ZWxdLCBjb25zb2xlLCBhcmdzV2l0aEZvcm1hdCk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGVuYWJsZVNjb3BlQVBJID0gZmFsc2U7IC8vIEV4cGVyaW1lbnRhbCBDcmVhdGUgRXZlbnQgSGFuZGxlIEFQSS5cbnZhciBlbmFibGVDYWNoZUVsZW1lbnQgPSBmYWxzZTtcbnZhciBlbmFibGVUcmFuc2l0aW9uVHJhY2luZyA9IGZhbHNlOyAvLyBObyBrbm93biBidWdzLCBidXQgbmVlZHMgcGVyZm9ybWFuY2UgdGVzdGluZ1xuXG52YXIgZW5hYmxlTGVnYWN5SGlkZGVuID0gZmFsc2U7IC8vIEVuYWJsZXMgdW5zdGFibGVfYXZvaWRUaGlzRmFsbGJhY2sgZmVhdHVyZSBpbiBGaWJlclxuLy8gc3R1ZmYuIEludGVuZGVkIHRvIGVuYWJsZSBSZWFjdCBjb3JlIG1lbWJlcnMgdG8gbW9yZSBlYXNpbHkgZGVidWcgc2NoZWR1bGluZ1xuLy8gaXNzdWVzIGluIERFViBidWlsZHMuXG5cbnZhciBlbmFibGVEZWJ1Z1RyYWNpbmcgPSBmYWxzZTsgLy8gVHJhY2sgd2hpY2ggRmliZXIocykgc2NoZWR1bGUgcmVuZGVyIHdvcmsuXG5cbnZhciBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFO1xuXG57XG4gIFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgPSBTeW1ib2wuZm9yKCdyZWFjdC5tb2R1bGUucmVmZXJlbmNlJyk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBOb3RlOiB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyAoZS5nLiBpZiBpdCdzIGEgcG9seWZpbGwpLlxuXG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCBlbmFibGVEZWJ1Z1RyYWNpbmcgIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgZW5hYmxlTGVnYWN5SGlkZGVuICB8fCB0eXBlID09PSBSRUFDVF9PRkZTQ1JFRU5fVFlQRSB8fCBlbmFibGVTY29wZUFQSSAgfHwgZW5hYmxlQ2FjaGVFbGVtZW50ICB8fCBlbmFibGVUcmFuc2l0aW9uVHJhY2luZyApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gVGhpcyBuZWVkcyB0byBpbmNsdWRlIGFsbCBwb3NzaWJsZSBtb2R1bGUgcmVmZXJlbmNlIG9iamVjdFxuICAgIC8vIHR5cGVzIHN1cHBvcnRlZCBieSBhbnkgRmxpZ2h0IGNvbmZpZ3VyYXRpb24gYW55d2hlcmUgc2luY2VcbiAgICAvLyB3ZSBkb24ndCBrbm93IHdoaWNoIEZsaWdodCBidWlsZCB0aGlzIHdpbGwgZW5kIHVwIGJlaW5nIHVzZWRcbiAgICAvLyB3aXRoLlxuICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgfHwgdHlwZS5nZXRNb2R1bGVJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFdyYXBwZWROYW1lKG91dGVyVHlwZSwgaW5uZXJUeXBlLCB3cmFwcGVyTmFtZSkge1xuICB2YXIgZGlzcGxheU5hbWUgPSBvdXRlclR5cGUuZGlzcGxheU5hbWU7XG5cbiAgaWYgKGRpc3BsYXlOYW1lKSB7XG4gICAgcmV0dXJuIGRpc3BsYXlOYW1lO1xuICB9XG5cbiAgdmFyIGZ1bmN0aW9uTmFtZSA9IGlubmVyVHlwZS5kaXNwbGF5TmFtZSB8fCBpbm5lclR5cGUubmFtZSB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uTmFtZSAhPT0gJycgPyB3cmFwcGVyTmFtZSArIFwiKFwiICsgZnVuY3Rpb25OYW1lICsgXCIpXCIgOiB3cmFwcGVyTmFtZTtcbn0gLy8gS2VlcCBpbiBzeW5jIHdpdGggcmVhY3QtcmVjb25jaWxlci9nZXRDb21wb25lbnROYW1lRnJvbUZpYmVyXG5cblxuZnVuY3Rpb24gZ2V0Q29udGV4dE5hbWUodHlwZSkge1xuICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCAnQ29udGV4dCc7XG59IC8vIE5vdGUgdGhhdCB0aGUgcmVjb25jaWxlciBwYWNrYWdlIHNob3VsZCBnZW5lcmFsbHkgcHJlZmVyIHRvIHVzZSBnZXRDb21wb25lbnROYW1lRnJvbUZpYmVyKCkgaW5zdGVhZC5cblxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB7XG4gICAgaWYgKHR5cGVvZiB0eXBlLnRhZyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoKS4gJyArICdUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICByZXR1cm4gJ0ZyYWdtZW50JztcblxuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1BvcnRhbCc7XG5cbiAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICByZXR1cm4gJ1Byb2ZpbGVyJztcblxuICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnU3RyaWN0TW9kZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuXG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0eXBlO1xuICAgICAgICByZXR1cm4gZ2V0Q29udGV4dE5hbWUoY29udGV4dCkgKyAnLkNvbnN1bWVyJztcblxuICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICB2YXIgcHJvdmlkZXIgPSB0eXBlO1xuICAgICAgICByZXR1cm4gZ2V0Q29udGV4dE5hbWUocHJvdmlkZXIuX2NvbnRleHQpICsgJy5Qcm92aWRlcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldFdyYXBwZWROYW1lKHR5cGUsIHR5cGUucmVuZGVyLCAnRm9yd2FyZFJlZicpO1xuXG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgdmFyIG91dGVyTmFtZSA9IHR5cGUuZGlzcGxheU5hbWUgfHwgbnVsbDtcblxuICAgICAgICBpZiAob3V0ZXJOYW1lICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG91dGVyTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZS50eXBlKSB8fCAnTWVtbyc7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGxhenlDb21wb25lbnQgPSB0eXBlO1xuICAgICAgICAgIHZhciBwYXlsb2FkID0gbGF6eUNvbXBvbmVudC5fcGF5bG9hZDtcbiAgICAgICAgICB2YXIgaW5pdCA9IGxhenlDb21wb25lbnQuX2luaXQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShpbml0KHBheWxvYWQpKTtcbiAgICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWZhbGx0aHJvdWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBIZWxwZXJzIHRvIHBhdGNoIGNvbnNvbGUubG9ncyB0byBhdm9pZCBsb2dnaW5nIGR1cmluZyBzaWRlLWVmZmVjdCBmcmVlXG4vLyByZXBsYXlpbmcgb24gcmVuZGVyIGZ1bmN0aW9uLiBUaGlzIGN1cnJlbnRseSBvbmx5IHBhdGNoZXMgdGhlIG9iamVjdFxuLy8gbGF6aWx5IHdoaWNoIHdvbid0IGNvdmVyIGlmIHRoZSBsb2cgZnVuY3Rpb24gd2FzIGV4dHJhY3RlZCBlYWdlcmx5LlxuLy8gV2UgY291bGQgYWxzbyBlYWdlcmx5IHBhdGNoIHRoZSBtZXRob2QuXG52YXIgZGlzYWJsZWREZXB0aCA9IDA7XG52YXIgcHJldkxvZztcbnZhciBwcmV2SW5mbztcbnZhciBwcmV2V2FybjtcbnZhciBwcmV2RXJyb3I7XG52YXIgcHJldkdyb3VwO1xudmFyIHByZXZHcm91cENvbGxhcHNlZDtcbnZhciBwcmV2R3JvdXBFbmQ7XG5cbmZ1bmN0aW9uIGRpc2FibGVkTG9nKCkge31cblxuZGlzYWJsZWRMb2cuX19yZWFjdERpc2FibGVkTG9nID0gdHJ1ZTtcbmZ1bmN0aW9uIGRpc2FibGVMb2dzKCkge1xuICB7XG4gICAgaWYgKGRpc2FibGVkRGVwdGggPT09IDApIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgICAgcHJldkxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgcHJldkluZm8gPSBjb25zb2xlLmluZm87XG4gICAgICBwcmV2V2FybiA9IGNvbnNvbGUud2FybjtcbiAgICAgIHByZXZFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICBwcmV2R3JvdXAgPSBjb25zb2xlLmdyb3VwO1xuICAgICAgcHJldkdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZDtcbiAgICAgIHByZXZHcm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQ7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTkwOTlcblxuICAgICAgdmFyIHByb3BzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBkaXNhYmxlZExvZyxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWUgRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbnNvbGUsIHtcbiAgICAgICAgaW5mbzogcHJvcHMsXG4gICAgICAgIGxvZzogcHJvcHMsXG4gICAgICAgIHdhcm46IHByb3BzLFxuICAgICAgICBlcnJvcjogcHJvcHMsXG4gICAgICAgIGdyb3VwOiBwcm9wcyxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IHByb3BzLFxuICAgICAgICBncm91cEVuZDogcHJvcHNcbiAgICAgIH0pO1xuICAgICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICB9XG5cbiAgICBkaXNhYmxlZERlcHRoKys7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlZW5hYmxlTG9ncygpIHtcbiAge1xuICAgIGRpc2FibGVkRGVwdGgtLTtcblxuICAgIGlmIChkaXNhYmxlZERlcHRoID09PSAwKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfTsgLy8gJEZsb3dGaXhNZSBGbG93IHRoaW5rcyBjb25zb2xlIGlzIGltbXV0YWJsZS5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29uc29sZSwge1xuICAgICAgICBsb2c6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkxvZ1xuICAgICAgICB9KSxcbiAgICAgICAgaW5mbzogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2SW5mb1xuICAgICAgICB9KSxcbiAgICAgICAgd2FybjogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2V2FyblxuICAgICAgICB9KSxcbiAgICAgICAgZXJyb3I6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkVycm9yXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cENvbGxhcHNlZFxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXBFbmQ6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwRW5kXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgaWYgKGRpc2FibGVkRGVwdGggPCAwKSB7XG4gICAgICBlcnJvcignZGlzYWJsZWREZXB0aCBmZWxsIGJlbG93IHplcm8uICcgKyAnVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgfVxuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbnZhciBwcmVmaXg7XG5mdW5jdGlvbiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyRm4pIHtcbiAge1xuICAgIGlmIChwcmVmaXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gRXh0cmFjdCB0aGUgVk0gc3BlY2lmaWMgcHJlZml4IHVzZWQgYnkgZWFjaCBsaW5lLlxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgdmFyIG1hdGNoID0geC5zdGFjay50cmltKCkubWF0Y2goL1xcbiggKihhdCApPykvKTtcbiAgICAgICAgcHJlZml4ID0gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG4gICAgICB9XG4gICAgfSAvLyBXZSB1c2UgdGhlIHByZWZpeCB0byBlbnN1cmUgb3VyIHN0YWNrcyBsaW5lIHVwIHdpdGggbmF0aXZlIHN0YWNrIGZyYW1lcy5cblxuXG4gICAgcmV0dXJuICdcXG4nICsgcHJlZml4ICsgbmFtZTtcbiAgfVxufVxudmFyIHJlZW50cnkgPSBmYWxzZTtcbnZhciBjb21wb25lbnRGcmFtZUNhY2hlO1xuXG57XG4gIHZhciBQb3NzaWJseVdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyA/IFdlYWtNYXAgOiBNYXA7XG4gIGNvbXBvbmVudEZyYW1lQ2FjaGUgPSBuZXcgUG9zc2libHlXZWFrTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGNvbnN0cnVjdCkge1xuICAvLyBJZiBzb21ldGhpbmcgYXNrZWQgZm9yIGEgc3RhY2sgaW5zaWRlIGEgZmFrZSByZW5kZXIsIGl0IHNob3VsZCBnZXQgaWdub3JlZC5cbiAgaWYgKCAhZm4gfHwgcmVlbnRyeSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHtcbiAgICB2YXIgZnJhbWUgPSBjb21wb25lbnRGcmFtZUNhY2hlLmdldChmbik7XG5cbiAgICBpZiAoZnJhbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250cm9sO1xuICByZWVudHJ5ID0gdHJ1ZTtcbiAgdmFyIHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2UgPSBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZTsgLy8gJEZsb3dGaXhNZSBJdCBkb2VzIGFjY2VwdCB1bmRlZmluZWQuXG5cbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSB1bmRlZmluZWQ7XG4gIHZhciBwcmV2aW91c0Rpc3BhdGNoZXI7XG5cbiAge1xuICAgIHByZXZpb3VzRGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudDsgLy8gU2V0IHRoZSBkaXNwYXRjaGVyIGluIERFViBiZWNhdXNlIHRoaXMgbWlnaHQgYmUgY2FsbCBpbiB0aGUgcmVuZGVyIGZ1bmN0aW9uXG4gICAgLy8gZm9yIHdhcm5pbmdzLlxuXG4gICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50ID0gbnVsbDtcbiAgICBkaXNhYmxlTG9ncygpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHNob3VsZCB0aHJvdy5cbiAgICBpZiAoY29uc3RydWN0KSB7XG4gICAgICAvLyBTb21ldGhpbmcgc2hvdWxkIGJlIHNldHRpbmcgdGhlIHByb3BzIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgIHZhciBGYWtlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfTsgLy8gJEZsb3dGaXhNZVxuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGYWtlLnByb3RvdHlwZSwgJ3Byb3BzJywge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBXZSB1c2UgYSB0aHJvd2luZyBzZXR0ZXIgaW5zdGVhZCBvZiBmcm96ZW4gb3Igbm9uLXdyaXRhYmxlIHByb3BzXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGF0IHdvbid0IHRocm93IGluIGEgbm9uLXN0cmljdCBtb2RlIGZ1bmN0aW9uLlxuICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnICYmIFJlZmxlY3QuY29uc3RydWN0KSB7XG4gICAgICAgIC8vIFdlIGNvbnN0cnVjdCBhIGRpZmZlcmVudCBjb250cm9sIGZvciB0aGlzIGNhc2UgdG8gaW5jbHVkZSBhbnkgZXh0cmFcbiAgICAgICAgLy8gZnJhbWVzIGFkZGVkIGJ5IHRoZSBjb25zdHJ1Y3QgY2FsbC5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBSZWZsZWN0LmNvbnN0cnVjdChGYWtlLCBbXSk7XG4gICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgfVxuXG4gICAgICAgIFJlZmxlY3QuY29uc3RydWN0KGZuLCBbXSwgRmFrZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIEZha2UuY2FsbCgpO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgIH1cblxuICAgICAgICBmbi5jYWxsKEZha2UucHJvdG90eXBlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICB9XG5cbiAgICAgIGZuKCk7XG4gICAgfVxuICB9IGNhdGNoIChzYW1wbGUpIHtcbiAgICAvLyBUaGlzIGlzIGlubGluZWQgbWFudWFsbHkgYmVjYXVzZSBjbG9zdXJlIGRvZXNuJ3QgZG8gaXQgZm9yIHVzLlxuICAgIGlmIChzYW1wbGUgJiYgY29udHJvbCAmJiB0eXBlb2Ygc2FtcGxlLnN0YWNrID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gVGhpcyBleHRyYWN0cyB0aGUgZmlyc3QgZnJhbWUgZnJvbSB0aGUgc2FtcGxlIHRoYXQgaXNuJ3QgYWxzbyBpbiB0aGUgY29udHJvbC5cbiAgICAgIC8vIFNraXBwaW5nIG9uZSBmcmFtZSB0aGF0IHdlIGFzc3VtZSBpcyB0aGUgZnJhbWUgdGhhdCBjYWxscyB0aGUgdHdvLlxuICAgICAgdmFyIHNhbXBsZUxpbmVzID0gc2FtcGxlLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHZhciBjb250cm9sTGluZXMgPSBjb250cm9sLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHZhciBzID0gc2FtcGxlTGluZXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBjID0gY29udHJvbExpbmVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIHdoaWxlIChzID49IDEgJiYgYyA+PSAwICYmIHNhbXBsZUxpbmVzW3NdICE9PSBjb250cm9sTGluZXNbY10pIHtcbiAgICAgICAgLy8gV2UgZXhwZWN0IGF0IGxlYXN0IG9uZSBzdGFjayBmcmFtZSB0byBiZSBzaGFyZWQuXG4gICAgICAgIC8vIFR5cGljYWxseSB0aGlzIHdpbGwgYmUgdGhlIHJvb3QgbW9zdCBvbmUuIEhvd2V2ZXIsIHN0YWNrIGZyYW1lcyBtYXkgYmVcbiAgICAgICAgLy8gY3V0IG9mZiBkdWUgdG8gbWF4aW11bSBzdGFjayBsaW1pdHMuIEluIHRoaXMgY2FzZSwgb25lIG1heWJlIGN1dCBvZmZcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHRoZSBvdGhlci4gV2UgYXNzdW1lIHRoYXQgdGhlIHNhbXBsZSBpcyBsb25nZXIgb3IgdGhlIHNhbWVcbiAgICAgICAgLy8gYW5kIHRoZXJlIGZvciBjdXQgb2ZmIGVhcmxpZXIuIFNvIHdlIHNob3VsZCBmaW5kIHRoZSByb290IG1vc3QgZnJhbWUgaW5cbiAgICAgICAgLy8gdGhlIHNhbXBsZSBzb21ld2hlcmUgaW4gdGhlIGNvbnRyb2wuXG4gICAgICAgIGMtLTtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IHMgPj0gMSAmJiBjID49IDA7IHMtLSwgYy0tKSB7XG4gICAgICAgIC8vIE5leHQgd2UgZmluZCB0aGUgZmlyc3Qgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgd2hpY2ggc2hvdWxkIGJlIHRoZVxuICAgICAgICAvLyBmcmFtZSB0aGF0IGNhbGxlZCBvdXIgc2FtcGxlIGZ1bmN0aW9uIGFuZCB0aGUgY29udHJvbC5cbiAgICAgICAgaWYgKHNhbXBsZUxpbmVzW3NdICE9PSBjb250cm9sTGluZXNbY10pIHtcbiAgICAgICAgICAvLyBJbiBWOCwgdGhlIGZpcnN0IGxpbmUgaXMgZGVzY3JpYmluZyB0aGUgbWVzc2FnZSBidXQgb3RoZXIgVk1zIGRvbid0LlxuICAgICAgICAgIC8vIElmIHdlJ3JlIGFib3V0IHRvIHJldHVybiB0aGUgZmlyc3QgbGluZSwgYW5kIHRoZSBjb250cm9sIGlzIGFsc28gb24gdGhlIHNhbWVcbiAgICAgICAgICAvLyBsaW5lLCB0aGF0J3MgYSBwcmV0dHkgZ29vZCBpbmRpY2F0b3IgdGhhdCBvdXIgc2FtcGxlIHRocmV3IGF0IHNhbWUgbGluZSBhc1xuICAgICAgICAgIC8vIHRoZSBjb250cm9sLiBJLmUuIGJlZm9yZSB3ZSBlbnRlcmVkIHRoZSBzYW1wbGUgZnJhbWUuIFNvIHdlIGlnbm9yZSB0aGlzIHJlc3VsdC5cbiAgICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgeW91IHBhc3NlZCBhIGNsYXNzIHRvIGZ1bmN0aW9uIGNvbXBvbmVudCwgb3Igbm9uLWZ1bmN0aW9uLlxuICAgICAgICAgIGlmIChzICE9PSAxIHx8IGMgIT09IDEpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgcy0tO1xuICAgICAgICAgICAgICBjLS07IC8vIFdlIG1heSBzdGlsbCBoYXZlIHNpbWlsYXIgaW50ZXJtZWRpYXRlIGZyYW1lcyBmcm9tIHRoZSBjb25zdHJ1Y3QgY2FsbC5cbiAgICAgICAgICAgICAgLy8gVGhlIG5leHQgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgc2hvdWxkIGJlIG91ciBtYXRjaCB0aG91Z2guXG5cbiAgICAgICAgICAgICAgaWYgKGMgPCAwIHx8IHNhbXBsZUxpbmVzW3NdICE9PSBjb250cm9sTGluZXNbY10pIHtcbiAgICAgICAgICAgICAgICAvLyBWOCBhZGRzIGEgXCJuZXdcIiBwcmVmaXggZm9yIG5hdGl2ZSBjbGFzc2VzLiBMZXQncyByZW1vdmUgaXQgdG8gbWFrZSBpdCBwcmV0dGllci5cbiAgICAgICAgICAgICAgICB2YXIgX2ZyYW1lID0gJ1xcbicgKyBzYW1wbGVMaW5lc1tzXS5yZXBsYWNlKCcgYXQgbmV3ICcsICcgYXQgJyk7IC8vIElmIG91ciBjb21wb25lbnQgZnJhbWUgaXMgbGFiZWxlZCBcIjxhbm9ueW1vdXM+XCJcbiAgICAgICAgICAgICAgICAvLyBidXQgd2UgaGF2ZSBhIHVzZXItcHJvdmlkZWQgXCJkaXNwbGF5TmFtZVwiXG4gICAgICAgICAgICAgICAgLy8gc3BsaWNlIGl0IGluIHRvIG1ha2UgdGhlIHN0YWNrIG1vcmUgcmVhZGFibGUuXG5cblxuICAgICAgICAgICAgICAgIGlmIChmbi5kaXNwbGF5TmFtZSAmJiBfZnJhbWUuaW5jbHVkZXMoJzxhbm9ueW1vdXM+JykpIHtcbiAgICAgICAgICAgICAgICAgIF9mcmFtZSA9IF9mcmFtZS5yZXBsYWNlKCc8YW5vbnltb3VzPicsIGZuLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBfZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy8gUmV0dXJuIHRoZSBsaW5lIHdlIGZvdW5kLlxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZyYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChzID49IDEgJiYgYyA+PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICByZWVudHJ5ID0gZmFsc2U7XG5cbiAgICB7XG4gICAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBwcmV2aW91c0Rpc3BhdGNoZXI7XG4gICAgICByZWVuYWJsZUxvZ3MoKTtcbiAgICB9XG5cbiAgICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2U7XG4gIH0gLy8gRmFsbGJhY2sgdG8ganVzdCB1c2luZyB0aGUgbmFtZSBpZiB3ZSBjb3VsZG4ndCBtYWtlIGl0IHRocm93LlxuXG5cbiAgdmFyIG5hbWUgPSBmbiA/IGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUgOiAnJztcbiAgdmFyIHN5bnRoZXRpY0ZyYW1lID0gbmFtZSA/IGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKG5hbWUpIDogJyc7XG5cbiAge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBzeW50aGV0aWNGcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN5bnRoZXRpY0ZyYW1lO1xufVxuZnVuY3Rpb24gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKGZuLCBzb3VyY2UsIG93bmVyRm4pIHtcbiAge1xuICAgIHJldHVybiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKGZuLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkge1xuICB2YXIgcHJvdG90eXBlID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbiAgcmV0dXJuICEhKHByb3RvdHlwZSAmJiBwcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVih0eXBlLCBzb3VyY2UsIG93bmVyRm4pIHtcblxuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAge1xuICAgICAgcmV0dXJuIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUodHlwZSwgc2hvdWxkQ29uc3RydWN0KHR5cGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKHR5cGUpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKCdTdXNwZW5zZScpO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU6XG4gICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlTGlzdCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKHR5cGUucmVuZGVyKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIC8vIE1lbW8gbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgIHJldHVybiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZS50eXBlLCBzb3VyY2UsIG93bmVyRm4pO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIExhenkgbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGluaXQocGF5bG9hZCksIHNvdXJjZSwgb3duZXJGbik7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge31cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuXG5mdW5jdGlvbiBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KSB7XG4gIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICB2YXIgc3RhY2sgPSBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoZWxlbWVudC50eXBlLCBlbGVtZW50Ll9zb3VyY2UsIG93bmVyID8gb3duZXIudHlwZSA6IG51bGwpO1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5zZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLnNldEV4dHJhU3RhY2tGcmFtZShudWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBlbGVtZW50KSB7XG4gIHtcbiAgICAvLyAkRmxvd0ZpeE1lIFRoaXMgaXMgb2theSBidXQgRmxvdyBkb2Vzbid0IGtub3cgaXQuXG4gICAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChoYXNPd25Qcm9wZXJ0eSk7XG5cbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3IkMSA9IHZvaWQgMDsgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3Byb2QtZXJyb3ItY29kZXNcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcigoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgKyAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nICsgJ1RoaXMgb2Z0ZW4gaGFwcGVucyBiZWNhdXNlIG9mIHR5cG9zIHN1Y2ggYXMgYFByb3BUeXBlcy5mdW5jdGlvbmAgaW5zdGVhZCBvZiBgUHJvcFR5cGVzLmZ1bmNgLicpO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3IkMSA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJyk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IkMSA9IGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yJDEgJiYgIShlcnJvciQxIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBlcnJvcignJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcycgKyAnIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvciQxKTtcblxuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yJDEgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yJDEubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IkMS5tZXNzYWdlXSA9IHRydWU7XG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBlcnJvcignRmFpbGVkICVzIHR5cGU6ICVzJywgbG9jYXRpb24sIGVycm9yJDEubWVzc2FnZSk7XG5cbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgaXNBcnJheUltcGwgPSBBcnJheS5pc0FycmF5OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cbmZ1bmN0aW9uIGlzQXJyYXkoYSkge1xuICByZXR1cm4gaXNBcnJheUltcGwoYSk7XG59XG5cbi8qXG4gKiBUaGUgYCcnICsgdmFsdWVgIHBhdHRlcm4gKHVzZWQgaW4gaW4gcGVyZi1zZW5zaXRpdmUgY29kZSkgdGhyb3dzIGZvciBTeW1ib2xcbiAqIGFuZCBUZW1wb3JhbC4qIHR5cGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvMjIwNjQuXG4gKlxuICogVGhlIGZ1bmN0aW9ucyBpbiB0aGlzIG1vZHVsZSB3aWxsIHRocm93IGFuIGVhc2llci10by11bmRlcnN0YW5kLFxuICogZWFzaWVyLXRvLWRlYnVnIGV4Y2VwdGlvbiB3aXRoIGEgY2xlYXIgZXJyb3JzIG1lc3NhZ2UgbWVzc2FnZSBleHBsYWluaW5nIHRoZVxuICogcHJvYmxlbS4gKEluc3RlYWQgb2YgYSBjb25mdXNpbmcgZXhjZXB0aW9uIHRocm93biBpbnNpZGUgdGhlIGltcGxlbWVudGF0aW9uXG4gKiBvZiB0aGUgYHZhbHVlYCBvYmplY3QpLlxuICovXG4vLyAkRmxvd0ZpeE1lIG9ubHkgY2FsbGVkIGluIERFViwgc28gdm9pZCByZXR1cm4gaXMgbm90IHBvc3NpYmxlLlxuZnVuY3Rpb24gdHlwZU5hbWUodmFsdWUpIHtcbiAge1xuICAgIC8vIHRvU3RyaW5nVGFnIGlzIG5lZWRlZCBmb3IgbmFtZXNwYWNlZCB0eXBlcyBsaWtlIFRlbXBvcmFsLkluc3RhbnRcbiAgICB2YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC50b1N0cmluZ1RhZztcbiAgICB2YXIgdHlwZSA9IGhhc1RvU3RyaW5nVGFnICYmIHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10gfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fCAnT2JqZWN0JztcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufSAvLyAkRmxvd0ZpeE1lIG9ubHkgY2FsbGVkIGluIERFViwgc28gdm9pZCByZXR1cm4gaXMgbm90IHBvc3NpYmxlLlxuXG5cbmZ1bmN0aW9uIHdpbGxDb2VyY2lvblRocm93KHZhbHVlKSB7XG4gIHtcbiAgICB0cnkge1xuICAgICAgdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gIC8vIElmIHlvdSBlbmRlZCB1cCBoZXJlIGJ5IGZvbGxvd2luZyBhbiBleGNlcHRpb24gY2FsbCBzdGFjaywgaGVyZSdzIHdoYXQnc1xuICAvLyBoYXBwZW5lZDogeW91IHN1cHBsaWVkIGFuIG9iamVjdCBvciBzeW1ib2wgdmFsdWUgdG8gUmVhY3QgKGFzIGEgcHJvcCwga2V5LFxuICAvLyBET00gYXR0cmlidXRlLCBDU1MgcHJvcGVydHksIHN0cmluZyByZWYsIGV0Yy4pIGFuZCB3aGVuIFJlYWN0IHRyaWVkIHRvXG4gIC8vIGNvZXJjZSBpdCB0byBhIHN0cmluZyB1c2luZyBgJycgKyB2YWx1ZWAsIGFuIGV4Y2VwdGlvbiB3YXMgdGhyb3duLlxuICAvL1xuICAvLyBUaGUgbW9zdCBjb21tb24gdHlwZXMgdGhhdCB3aWxsIGNhdXNlIHRoaXMgZXhjZXB0aW9uIGFyZSBgU3ltYm9sYCBpbnN0YW5jZXNcbiAgLy8gYW5kIFRlbXBvcmFsIG9iamVjdHMgbGlrZSBgVGVtcG9yYWwuSW5zdGFudGAuIEJ1dCBhbnkgb2JqZWN0IHRoYXQgaGFzIGFcbiAgLy8gYHZhbHVlT2ZgIG9yIGBbU3ltYm9sLnRvUHJpbWl0aXZlXWAgbWV0aG9kIHRoYXQgdGhyb3dzIHdpbGwgYWxzbyBjYXVzZSB0aGlzXG4gIC8vIGV4Y2VwdGlvbi4gKExpYnJhcnkgYXV0aG9ycyBkbyB0aGlzIHRvIHByZXZlbnQgdXNlcnMgZnJvbSB1c2luZyBidWlsdC1pblxuICAvLyBudW1lcmljIG9wZXJhdG9ycyBsaWtlIGArYCBvciBjb21wYXJpc29uIG9wZXJhdG9ycyBsaWtlIGA+PWAgYmVjYXVzZSBjdXN0b21cbiAgLy8gbWV0aG9kcyBhcmUgbmVlZGVkIHRvIHBlcmZvcm0gYWNjdXJhdGUgYXJpdGhtZXRpYyBvciBjb21wYXJpc29uLilcbiAgLy9cbiAgLy8gVG8gZml4IHRoZSBwcm9ibGVtLCBjb2VyY2UgdGhpcyBvYmplY3Qgb3Igc3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nIGJlZm9yZVxuICAvLyBwYXNzaW5nIGl0IHRvIFJlYWN0LiBUaGUgbW9zdCByZWxpYWJsZSB3YXkgaXMgdXN1YWxseSBgU3RyaW5nKHZhbHVlKWAuXG4gIC8vXG4gIC8vIFRvIGZpbmQgd2hpY2ggdmFsdWUgaXMgdGhyb3dpbmcsIGNoZWNrIHRoZSBicm93c2VyIG9yIGRlYnVnZ2VyIGNvbnNvbGUuXG4gIC8vIEJlZm9yZSB0aGlzIGV4Y2VwdGlvbiB3YXMgdGhyb3duLCB0aGVyZSBzaG91bGQgYmUgYGNvbnNvbGUuZXJyb3JgIG91dHB1dFxuICAvLyB0aGF0IHNob3dzIHRoZSB0eXBlIChTeW1ib2wsIFRlbXBvcmFsLlBsYWluRGF0ZSwgZXRjLikgdGhhdCBjYXVzZWQgdGhlXG4gIC8vIHByb2JsZW0gYW5kIGhvdyB0aGF0IHR5cGUgd2FzIHVzZWQ6IGtleSwgYXRycmlidXRlLCBpbnB1dCB2YWx1ZSBwcm9wLCBldGMuXG4gIC8vIEluIG1vc3QgY2FzZXMsIHRoaXMgY29uc29sZSBvdXRwdXQgYWxzbyBzaG93cyB0aGUgY29tcG9uZW50IGFuZCBpdHNcbiAgLy8gYW5jZXN0b3IgY29tcG9uZW50cyB3aGVyZSB0aGUgZXhjZXB0aW9uIGhhcHBlbmVkLlxuICAvL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvc2FmZS1zdHJpbmctY29lcmNpb25cbiAgcmV0dXJuICcnICsgdmFsdWU7XG59XG5mdW5jdGlvbiBjaGVja0tleVN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gIHtcbiAgICBpZiAod2lsbENvZXJjaW9uVGhyb3codmFsdWUpKSB7XG4gICAgICBlcnJvcignVGhlIHByb3ZpZGVkIGtleSBpcyBhbiB1bnN1cHBvcnRlZCB0eXBlICVzLicgKyAnIFRoaXMgdmFsdWUgbXVzdCBiZSBjb2VyY2VkIHRvIGEgc3RyaW5nIGJlZm9yZSBiZWZvcmUgdXNpbmcgaXQgaGVyZS4nLCB0eXBlTmFtZSh2YWx1ZSkpO1xuXG4gICAgICByZXR1cm4gdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKTsgLy8gdGhyb3cgKHRvIGhlbHAgY2FsbGVycyBmaW5kIHRyb3VibGVzaG9vdGluZyBjb21tZW50cylcbiAgICB9XG4gIH1cbn1cblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50T3duZXI7XG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duO1xudmFyIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xudmFyIGRpZFdhcm5BYm91dFN0cmluZ1JlZnM7XG5cbntcbiAgZGlkV2FybkFib3V0U3RyaW5nUmVmcyA9IHt9O1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG5cbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG5cbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnLCBzZWxmKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5yZWYgPT09ICdzdHJpbmcnICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgc2VsZiAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnN0YXRlTm9kZSAhPT0gc2VsZikge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKCFkaWRXYXJuQWJvdXRTdHJpbmdSZWZzW2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgIGVycm9yKCdDb21wb25lbnQgXCIlc1wiIGNvbnRhaW5zIHRoZSBzdHJpbmcgcmVmIFwiJXNcIi4gJyArICdTdXBwb3J0IGZvciBzdHJpbmcgcmVmcyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gJyArICdUaGlzIGNhc2UgY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIHRvIGFuIGFycm93IGZ1bmN0aW9uLiAnICsgJ1dlIGFzayB5b3UgdG8gbWFudWFsbHkgZml4IHRoaXMgY2FzZSBieSB1c2luZyB1c2VSZWYoKSBvciBjcmVhdGVSZWYoKSBpbnN0ZWFkLiAnICsgJ0xlYXJuIG1vcmUgYWJvdXQgdXNpbmcgcmVmcyBzYWZlbHkgaGVyZTogJyArICdodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3RyaWN0LW1vZGUtc3RyaW5nLXJlZicsIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpLCBjb25maWcucmVmKTtcblxuICAgICAgICBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzW2NvbXBvbmVudE5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHtcbiAgICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3NwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHtcbiAgICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3NwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn1cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIG5vdCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBpbnRlcm5hbFxuICovXG5cblxudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3dzIHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9OyAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0pOyAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNlbGZcbiAgICB9KTsgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICB9KTtcblxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JmY3MvcHVsbC8xMDdcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKi9cblxuZnVuY3Rpb24ganN4REVWKHR5cGUsIGNvbmZpZywgbWF5YmVLZXksIHNvdXJjZSwgc2VsZikge1xuICB7XG4gICAgdmFyIHByb3BOYW1lOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cbiAgICB2YXIgcHJvcHMgPSB7fTtcbiAgICB2YXIga2V5ID0gbnVsbDtcbiAgICB2YXIgcmVmID0gbnVsbDsgLy8gQ3VycmVudGx5LCBrZXkgY2FuIGJlIHNwcmVhZCBpbiBhcyBhIHByb3AuIFRoaXMgY2F1c2VzIGEgcG90ZW50aWFsXG4gICAgLy8gaXNzdWUgaWYga2V5IGlzIGFsc28gZXhwbGljaXRseSBkZWNsYXJlZCAoaWUuIDxkaXYgey4uLnByb3BzfSBrZXk9XCJIaVwiIC8+XG4gICAgLy8gb3IgPGRpdiBrZXk9XCJIaVwiIHsuLi5wcm9wc30gLz4gKS4gV2Ugd2FudCB0byBkZXByZWNhdGUga2V5IHNwcmVhZCxcbiAgICAvLyBidXQgYXMgYW4gaW50ZXJtZWRpYXJ5IHN0ZXAsIHdlIHdpbGwgdXNlIGpzeERFViBmb3IgZXZlcnl0aGluZyBleGNlcHRcbiAgICAvLyA8ZGl2IHsuLi5wcm9wc30ga2V5PVwiSGlcIiAvPiwgYmVjYXVzZSB3ZSBhcmVuJ3QgY3VycmVudGx5IGFibGUgdG8gdGVsbCBpZlxuICAgIC8vIGtleSBpcyBleHBsaWNpdGx5IGRlY2xhcmVkIHRvIGJlIHVuZGVmaW5lZCBvciBub3QuXG5cbiAgICBpZiAobWF5YmVLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAge1xuICAgICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKG1heWJlS2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBtYXliZUtleTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAge1xuICAgICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKGNvbmZpZy5rZXkpO1xuICAgICAgfVxuXG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnLCBzZWxmKTtcbiAgICB9IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcblxuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9IC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuXG5cbiAgICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuXG4gICAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG4gIH1cbn1cblxudmFyIFJlYWN0Q3VycmVudE93bmVyJDEgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdEN1cnJlbnRPd25lcjtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuXG5mdW5jdGlvbiBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpIHtcbiAge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIHZhciBzdGFjayA9IGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihlbGVtZW50LnR5cGUsIGVsZW1lbnQuX3NvdXJjZSwgb3duZXIgPyBvd25lci50eXBlIDogbnVsbCk7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLnNldEV4dHJhU3RhY2tGcmFtZShudWxsKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duO1xuXG57XG4gIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gZmFsc2U7XG59XG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2lzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIEBmaW5hbFxuICovXG5cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAge1xuICAgIGlmIChSZWFjdEN1cnJlbnRPd25lciQxLmN1cnJlbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKFJlYWN0Q3VycmVudE93bmVyJDEuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShzb3VyY2UpIHtcbiAge1xuICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgIHZhciBsaW5lTnVtYmVyID0gc291cmNlLmxpbmVOdW1iZXI7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxufVxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cblxuXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB7XG4gICAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICAgIGlmICghaW5mbykge1xuICAgICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG5cbiAgICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICAgIGluZm8gPSBcIlxcblxcbkNoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPFwiICsgcGFyZW50TmFtZSArIFwiPi5cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5mbztcbiAgfVxufVxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICB7XG4gICAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuXG4gICAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7IC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gICAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAgIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cblxuICAgIHZhciBjaGlsZE93bmVyID0gJyc7XG5cbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIkMS5jdXJyZW50KSB7XG4gICAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICAgIGNoaWxkT3duZXIgPSBcIiBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSBcIiArIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShlbGVtZW50Ll9vd25lci50eXBlKSArIFwiLlwiO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZWxlbWVudCk7XG5cbiAgICBlcnJvcignRWFjaCBjaGlsZCBpbiBhIGxpc3Qgc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3dhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyKTtcblxuICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gIH1cbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICB7XG4gICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KG5vZGUpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcblxuICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBFbnRyeSBpdGVyYXRvcnMgdXNlZCB0byBwcm92aWRlIGltcGxpY2l0IGtleXMsXG4gICAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB7XG4gICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHByb3BUeXBlcztcblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gTm90ZTogTWVtbyBvbmx5IGNoZWNrcyBvdXRlciBwcm9wcyBoZXJlLlxuICAgIC8vIElubmVyIHByb3BzIGFyZSBjaGVja2VkIGluIHRoZSByZWNvbmNpbGVyLlxuICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkpIHtcbiAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHByb3BUeXBlcykge1xuICAgICAgLy8gSW50ZW50aW9uYWxseSBpbnNpZGUgdG8gYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGluaXRpYWxpemVyczpcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgY2hlY2tQcm9wVHlwZXMocHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZS5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTsgLy8gSW50ZW50aW9uYWxseSBpbnNpZGUgdG8gYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGluaXRpYWxpemVyczpcblxuICAgICAgdmFyIF9uYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuXG4gICAgICBlcnJvcignQ29tcG9uZW50ICVzIGRlY2xhcmVkIGBQcm9wVHlwZXNgIGluc3RlYWQgb2YgYHByb3BUeXBlc2AuIERpZCB5b3UgbWlzc3BlbGwgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQ/JywgX25hbWUgfHwgJ1Vua25vd24nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHR5cGUuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nICYmICF0eXBlLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCkge1xuICAgICAgZXJyb3IoJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKTtcbiAgICB9XG4gIH1cbn1cbi8qKlxuICogR2l2ZW4gYSBmcmFnbWVudCwgdmFsaWRhdGUgdGhhdCBpdCBjYW4gb25seSBiZSBwcm92aWRlZCB3aXRoIGZyYWdtZW50IHByb3BzXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZnJhZ21lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhmcmFnbWVudCkge1xuICB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcmFnbWVudC5wcm9wcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoa2V5ICE9PSAnY2hpbGRyZW4nICYmIGtleSAhPT0gJ2tleScpIHtcbiAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShmcmFnbWVudCk7XG5cbiAgICAgICAgZXJyb3IoJ0ludmFsaWQgcHJvcCBgJXNgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuICcgKyAnUmVhY3QuRnJhZ21lbnQgY2FuIG9ubHkgaGF2ZSBga2V5YCBhbmQgYGNoaWxkcmVuYCBwcm9wcy4nLCBrZXkpO1xuXG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmcmFnbWVudC5yZWYgIT09IG51bGwpIHtcbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZnJhZ21lbnQpO1xuXG4gICAgICBlcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4nKTtcblxuICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShudWxsKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRpZFdhcm5BYm91dEtleVNwcmVhZCA9IHt9O1xuZnVuY3Rpb24ganN4V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGtleSwgaXNTdGF0aWNDaGlsZHJlbiwgc291cmNlLCBzZWxmKSB7XG4gIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpOyAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAgIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgdmFyIGluZm8gPSAnJztcblxuICAgICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0eXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyBcIml0J3MgZGVmaW5lZCBpbiwgb3IgeW91IG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0cy5cIjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZUluZm8gPSBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShzb3VyY2UpO1xuXG4gICAgICBpZiAoc291cmNlSW5mbykge1xuICAgICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHlwZVN0cmluZztcblxuICAgICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9ICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh0eXBlKSkge1xuICAgICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICB0eXBlU3RyaW5nID0gXCI8XCIgKyAoZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ1Vua25vd24nKSArIFwiIC8+XCI7XG4gICAgICAgIGluZm8gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGluc3RlYWQgb2YgYSBjb21wb25lbnQ/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICAgIH1cblxuICAgICAgZXJyb3IoJ1JlYWN0LmpzeDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlU3RyaW5nLCBpbmZvKTtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGpzeERFVih0eXBlLCBwcm9wcywga2V5LCBzb3VyY2UsIHNlbGYpOyAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAgIC8vIFRPRE86IERyb3AgdGhpcyB3aGVuIHRoZXNlIGFyZSBubyBsb25nZXIgYWxsb3dlZCBhcyB0aGUgdHlwZSBhcmd1bWVudC5cblxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuXG5cbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcblxuICAgICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzU3RhdGljQ2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoY2hpbGRyZW5baV0sIHR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoJ1JlYWN0LmpzeDogU3RhdGljIGNoaWxkcmVuIHNob3VsZCBhbHdheXMgYmUgYW4gYXJyYXkuICcgKyAnWW91IGFyZSBsaWtlbHkgZXhwbGljaXRseSBjYWxsaW5nIFJlYWN0LmpzeHMgb3IgUmVhY3QuanN4REVWLiAnICsgJ1VzZSB0aGUgQmFiZWwgdHJhbnNmb3JtIGluc3RlYWQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGNoaWxkcmVuLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCAna2V5JykpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgICAgICAgIHJldHVybiBrICE9PSAna2V5JztcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBiZWZvcmVFeGFtcGxlID0ga2V5cy5sZW5ndGggPiAwID8gJ3trZXk6IHNvbWVLZXksICcgKyBrZXlzLmpvaW4oJzogLi4uLCAnKSArICc6IC4uLn0nIDogJ3trZXk6IHNvbWVLZXl9JztcblxuICAgICAgICBpZiAoIWRpZFdhcm5BYm91dEtleVNwcmVhZFtjb21wb25lbnROYW1lICsgYmVmb3JlRXhhbXBsZV0pIHtcbiAgICAgICAgICB2YXIgYWZ0ZXJFeGFtcGxlID0ga2V5cy5sZW5ndGggPiAwID8gJ3snICsga2V5cy5qb2luKCc6IC4uLiwgJykgKyAnOiAuLi59JyA6ICd7fSc7XG5cbiAgICAgICAgICBlcnJvcignQSBwcm9wcyBvYmplY3QgY29udGFpbmluZyBhIFwia2V5XCIgcHJvcCBpcyBiZWluZyBzcHJlYWQgaW50byBKU1g6XFxuJyArICcgIGxldCBwcm9wcyA9ICVzO1xcbicgKyAnICA8JXMgey4uLnByb3BzfSAvPlxcbicgKyAnUmVhY3Qga2V5cyBtdXN0IGJlIHBhc3NlZCBkaXJlY3RseSB0byBKU1ggd2l0aG91dCB1c2luZyBzcHJlYWQ6XFxuJyArICcgIGxldCBwcm9wcyA9ICVzO1xcbicgKyAnICA8JXMga2V5PXtzb21lS2V5fSB7Li4ucHJvcHN9IC8+JywgYmVmb3JlRXhhbXBsZSwgY29tcG9uZW50TmFtZSwgYWZ0ZXJFeGFtcGxlLCBjb21wb25lbnROYW1lKTtcblxuICAgICAgICAgIGRpZFdhcm5BYm91dEtleVNwcmVhZFtjb21wb25lbnROYW1lICsgYmVmb3JlRXhhbXBsZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICAgIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn0gLy8gVGhlc2UgdHdvIGZ1bmN0aW9ucyBleGlzdCB0byBzdGlsbCBnZXQgY2hpbGQgd2FybmluZ3MgaW4gZGV2XG4vLyBldmVuIHdpdGggdGhlIHByb2QgdHJhbnNmb3JtLiBUaGlzIG1lYW5zIHRoYXQganN4REVWIGlzIHB1cmVseVxuLy8gb3B0LWluIGJlaGF2aW9yIGZvciBiZXR0ZXIgbWVzc2FnZXMgYnV0IHRoYXQgd2Ugd29uJ3Qgc3RvcFxuLy8gZ2l2aW5nIHlvdSB3YXJuaW5ncyBpZiB5b3UgdXNlIHByb2R1Y3Rpb24gYXBpcy5cblxuZnVuY3Rpb24ganN4V2l0aFZhbGlkYXRpb25TdGF0aWModHlwZSwgcHJvcHMsIGtleSkge1xuICB7XG4gICAgcmV0dXJuIGpzeFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBrZXksIHRydWUpO1xuICB9XG59XG5mdW5jdGlvbiBqc3hXaXRoVmFsaWRhdGlvbkR5bmFtaWModHlwZSwgcHJvcHMsIGtleSkge1xuICB7XG4gICAgcmV0dXJuIGpzeFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBrZXksIGZhbHNlKTtcbiAgfVxufVxuXG52YXIganN4ID0gIGpzeFdpdGhWYWxpZGF0aW9uRHluYW1pYyA7IC8vIHdlIG1heSB3YW50IHRvIHNwZWNpYWwgY2FzZSBqc3hzIGludGVybmFsbHkgdG8gdGFrZSBhZHZhbnRhZ2Ugb2Ygc3RhdGljIGNoaWxkcmVuLlxuLy8gZm9yIG5vdyB3ZSBjYW4gc2hpcCBpZGVudGljYWwgcHJvZCBmdW5jdGlvbnNcblxudmFyIGpzeHMgPSAganN4V2l0aFZhbGlkYXRpb25TdGF0aWMgO1xuXG5leHBvcnRzLkZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbmV4cG9ydHMuanN4ID0ganN4O1xuZXhwb3J0cy5qc3hzID0ganN4cztcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1qc3gtcnVudGltZS5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfZGVzaWduU3lzdGVtID0gcmVxdWlyZShcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIik7XG52YXIgX2F4aW9zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXhpb3NcIikpO1xudmFyIF9qc3hSdW50aW1lID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKGUpIHsgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgV2Vha01hcCkgcmV0dXJuIG51bGw7IHZhciByID0gbmV3IFdlYWtNYXAoKSwgdCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgPyB0IDogcjsgfSkoZSk7IH1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKGUsIHIpIHsgaWYgKCFyICYmIGUgJiYgZS5fX2VzTW9kdWxlKSByZXR1cm4gZTsgaWYgKG51bGwgPT09IGUgfHwgXCJvYmplY3RcIiAhPSB0eXBlb2YgZSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUpIHJldHVybiB7IGRlZmF1bHQ6IGUgfTsgdmFyIHQgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUocik7IGlmICh0ICYmIHQuaGFzKGUpKSByZXR1cm4gdC5nZXQoZSk7IHZhciBuID0geyBfX3Byb3RvX186IG51bGwgfSwgYSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciB1IGluIGUpIGlmIChcImRlZmF1bHRcIiAhPT0gdSAmJiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsIHUpKSB7IHZhciBpID0gYSA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgdSkgOiBudWxsOyBpICYmIChpLmdldCB8fCBpLnNldCkgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkobiwgdSwgaSkgOiBuW3VdID0gZVt1XTsgfSByZXR1cm4gbi5kZWZhdWx0ID0gZSwgdCAmJiB0LnNldChlLCBuKSwgbjsgfVxuY29uc3QgVXBsb2FkSW1hZ2VJbnB1dCA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIHByb3BlcnR5LFxuICAgIHJlY29yZCxcbiAgICBvbkNoYW5nZVxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IGN1cnJlbnRJbWFnZVVybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkucGF0aF0gfHwgJyc7XG4gIGNvbnN0IFtpbWFnZVVybCwgc2V0SW1hZ2VVcmxdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoY3VycmVudEltYWdlVXJsKTtcbiAgY29uc3QgW2lzVXBsb2FkaW5nLCBzZXRJc1VwbG9hZGluZ10gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkobnVsbCk7XG4gIGNvbnN0IG9uVXBsb2FkID0gYXN5bmMgZmlsZXMgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICBzZXRJc1VwbG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9heGlvcy5kZWZhdWx0LnBvc3QoJy9hcGkvdXBsb2FkcycsIGZvcm1EYXRhLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV3VXJsID0gcmVzcG9uc2UuZGF0YS51cmw7XG4gICAgICBzZXRJbWFnZVVybChuZXdVcmwpO1xuICAgICAgb25DaGFuZ2UocHJvcGVydHkucGF0aCwgbmV3VXJsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVcGxvYWQgZmFpbGVkOlwiLCBlcnIpO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGVyci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCBlcnIubWVzc2FnZSB8fCAnVXBsb2FkIGZhaWxlZCc7XG4gICAgICBzZXRFcnJvcihtZXNzYWdlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNVcGxvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gKDAsIF9yZWFjdC51c2VDYWxsYmFjaykoKCkgPT4ge1xuICAgIHNldEltYWdlVXJsKCcnKTtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5wYXRoLCBudWxsKTtcbiAgfSwgW29uQ2hhbmdlLCBwcm9wZXJ0eS5wYXRoXSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgbWFyZ2luQm90dG9tOiBcImxnXCIsXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5MYWJlbCwge1xuICAgICAgaHRtbEZvcjogcHJvcGVydHkucGF0aCxcbiAgICAgIGNoaWxkcmVuOiBwcm9wZXJ0eS5sYWJlbCB8fCBwcm9wZXJ0eS5wYXRoXG4gICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgY2hpbGRyZW46IGltYWdlVXJsID8gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJpbWdcIiwge1xuICAgICAgICAgIHNyYzogaW1hZ2VVcmwsXG4gICAgICAgICAgYWx0OiBwcm9wZXJ0eS5sYWJlbCB8fCAnVXBsb2FkZWQgaW1hZ2UnLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBtYXhIZWlnaHQ6ICcxMDBweCcsXG4gICAgICAgICAgICBtYXhXaWR0aDogJzIwMHB4JyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgb25DbGljazogaGFuZGxlRGVsZXRlLFxuICAgICAgICAgIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgc2l6ZTogXCJzbVwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgaWNvbjogXCJUcmFzaENhblwiXG4gICAgICAgICAgfSksIFwiIFJlbW92ZVwiXVxuICAgICAgICB9KV1cbiAgICAgIH0pIDogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uRHJvcFpvbmUsIHtcbiAgICAgICAgb25DaGFuZ2U6IG9uVXBsb2FkLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIG1pbWVUeXBlczogWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS93ZWJwJywgJ2ltYWdlL2dpZiddLFxuICAgICAgICAgIG1heFNpemU6IDUgKiAxMDI0ICogMTAyNFxuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRpbmc6IGlzVXBsb2FkaW5nLFxuICAgICAgICBtdWx0aXBsZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSksIGVycm9yICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgIGNvbG9yOiBcImRhbmdlclwiLFxuICAgICAgY2hpbGRyZW46IGVycm9yXG4gICAgfSldXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IFVwbG9hZEltYWdlSW5wdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VcGxvYWRJbWFnZUlucHV0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfZGVzaWduU3lzdGVtID0gcmVxdWlyZShcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIik7XG52YXIgX2pzeFJ1bnRpbWUgPSByZXF1aXJlKFwicmVhY3QvanN4LXJ1bnRpbWVcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5jb25zdCBQYXNzd29yZElucHV0ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgcHJvcGVydHksXG4gICAgcmVjb3JkLFxuICAgIG9uQ2hhbmdlXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgdmFsdWUgPSAnJztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG4gIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uRm9ybUdyb3VwLCB7XG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5MYWJlbCwge1xuICAgICAgaHRtbEZvcjogcHJvcGVydHkucGF0aCxcbiAgICAgIGNoaWxkcmVuOiBwcm9wZXJ0eS5sYWJlbCB8fCBwcm9wZXJ0eS5wYXRoXG4gICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLklucHV0LCB7XG4gICAgICB0eXBlOiBcInBhc3N3b3JkXCIsXG4gICAgICBpZDogcHJvcGVydHkucGF0aCxcbiAgICAgIG5hbWU6IHByb3BlcnR5LnBhdGgsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLFxuICAgICAgcmVxdWlyZWQ6IHByb3BlcnR5LmlzUmVxdWlyZWRcbiAgICB9KV1cbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gUGFzc3dvcmRJbnB1dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBhc3N3b3JkSW5wdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfZGVzaWduU3lzdGVtID0gcmVxdWlyZShcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIik7XG52YXIgX2F4aW9zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXhpb3NcIikpO1xudmFyIF9qc3hSdW50aW1lID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKGUpIHsgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgV2Vha01hcCkgcmV0dXJuIG51bGw7IHZhciByID0gbmV3IFdlYWtNYXAoKSwgdCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgPyB0IDogcjsgfSkoZSk7IH1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKGUsIHIpIHsgaWYgKCFyICYmIGUgJiYgZS5fX2VzTW9kdWxlKSByZXR1cm4gZTsgaWYgKG51bGwgPT09IGUgfHwgXCJvYmplY3RcIiAhPSB0eXBlb2YgZSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUpIHJldHVybiB7IGRlZmF1bHQ6IGUgfTsgdmFyIHQgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUocik7IGlmICh0ICYmIHQuaGFzKGUpKSByZXR1cm4gdC5nZXQoZSk7IHZhciBuID0geyBfX3Byb3RvX186IG51bGwgfSwgYSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciB1IGluIGUpIGlmIChcImRlZmF1bHRcIiAhPT0gdSAmJiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsIHUpKSB7IHZhciBpID0gYSA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgdSkgOiBudWxsOyBpICYmIChpLmdldCB8fCBpLnNldCkgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkobiwgdSwgaSkgOiBuW3VdID0gZVt1XTsgfSByZXR1cm4gbi5kZWZhdWx0ID0gZSwgdCAmJiB0LnNldChlLCBuKSwgbjsgfVxuLy8gc3JjL2FkbWluQ29tcG9uZW50cy9EYXNoYm9hcmQuanN4XG5cbmNvbnN0IEFMTF9QT1NTSUJMRV9TVEFUVVNFUyA9IFsn0J3QvtCy0YvQuScsICfQn9GA0LjQvdGP0YInLCAn0J7Qv9C70LDRh9C10L0nLCAn0JIg0YHQsdC+0YDQutC1JywgJ9Cf0LXRgNC10LTQsNC9INCyINC00L7RgdGC0LDQstC60YMnLCAn0JPQvtGC0L7QsiDQuiDRgdCw0LzQvtCy0YvQstC+0LfRgycsICfQl9Cw0LLQtdGA0YjQtdC9JywgJ9Ce0YLQvNC10L3QtdC9JywgJ9CS0L7Qt9Cy0YDQsNGCJ107XG5jb25zdCBERUZBVUxUX0lOX1BST0dSRVNTX1NUQVRVU0VTID0gWyfQn9GA0LjQvdGP0YInLCAn0J7Qv9C70LDRh9C10L0nLCAn0JIg0YHQsdC+0YDQutC1JywgJ9Cf0LXRgNC10LTQsNC9INCyINC00L7RgdGC0LDQstC60YMnLCAn0JPQvtGC0L7QsiDQuiDRgdCw0LzQvtCy0YvQstC+0LfRgyddO1xuY29uc3QgTmV3T3JkZXJzV2lkZ2V0ID0gKHtcbiAgcmVmcmVzaEluUHJvZ3Jlc3NPcmRlcnNUcmlnZ2VyXG59KSA9PiB7XG4gIC8vINCf0YDQuNC90LjQvNCw0LXQvCDRgtGA0LjQs9Cz0LXRgCDQvtCx0L3QvtCy0LvQtdC90LjRj1xuICBjb25zdCBbbmV3T3JkZXJzLCBzZXROZXdPcmRlcnNdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShudWxsKTtcbiAgY29uc3QgZmV0Y2hOZXdPcmRlcnMgPSAoMCwgX3JlYWN0LnVzZUNhbGxiYWNrKShhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9heGlvcy5kZWZhdWx0LmdldCgnL2FwaS9vcmRlcnMvc3RhdHVzL9Cd0L7QstGL0Lk/bGltaXQ9NSZzb3J0Qnk9Y3JlYXRlZEF0JnNvcnREaXJlY3Rpb249REVTQycpO1xuICAgICAgc2V0TmV3T3JkZXJzKHJlc3BvbnNlLmRhdGEub3JkZXJzIHx8IFtdKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBuZXcgb3JkZXJzOlwiLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIG5ldyBvcmRlcnMuJyk7XG4gICAgICBzZXROZXdPcmRlcnMoW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtdKTtcbiAgKDAsIF9yZWFjdC51c2VFZmZlY3QpKCgpID0+IHtcbiAgICBmZXRjaE5ld09yZGVycygpO1xuICB9LCBbZmV0Y2hOZXdPcmRlcnNdKTtcbiAgY29uc3QgaGFuZGxlQ2hhbmdlT3JkZXJTdGF0dXMgPSBhc3luYyAob3JkZXJJZCwgbmV3U3RhdHVzLCBjb21tZW50KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IF9heGlvcy5kZWZhdWx0LnB1dChgL2FwaS9vcmRlcnMvJHtvcmRlcklkfS9zdGF0dXNgLCB7XG4gICAgICAgIG5ld1N0YXR1cyxcbiAgICAgICAgYWRtaW5Db21tZW50OiBjb21tZW50XG4gICAgICB9KTtcbiAgICAgIC8vIGFsZXJ0KGDQodGC0LDRgtGD0YEg0LfQsNC60LDQt9CwICMke29yZGVySWR9INC+0LHQvdC+0LLQu9C10L0g0L3QsCBcIiR7bmV3U3RhdHVzfVwiYCk7XG4gICAgICBmZXRjaE5ld09yZGVycygpO1xuICAgICAgaWYgKHJlZnJlc2hJblByb2dyZXNzT3JkZXJzVHJpZ2dlcikge1xuICAgICAgICAvLyDQktGL0LfRi9Cy0LDQtdC8INGC0YDQuNCz0LPQtdGALCDQtdGB0LvQuCDQvtC9INC10YHRgtGMXG4gICAgICAgIHJlZnJlc2hJblByb2dyZXNzT3JkZXJzVHJpZ2dlcigpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHVwZGF0ZSBzdGF0dXMgZm9yIG9yZGVyICR7b3JkZXJJZH0gdG8gJHtuZXdTdGF0dXN9OmAsIGVycik7XG4gICAgICBhbGVydChg0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINGB0YLQsNGC0YPRgdCwINC00LvRjyDQt9Cw0LrQsNC30LAgIyR7b3JkZXJJZH0uYCk7XG4gICAgfVxuICB9O1xuICBpZiAobG9hZGluZykgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICBjaGlsZHJlbjogXCJMb2FkaW5nIG5ldyBvcmRlcnMuLi5cIlxuICB9KTtcbiAgaWYgKGVycm9yKSByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgIGNvbG9yOiBcImRhbmdlclwiLFxuICAgIGNoaWxkcmVuOiBlcnJvclxuICB9KTtcbiAgaWYgKG5ld09yZGVycy5sZW5ndGggPT09IDApIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgY2hpbGRyZW46IFwiTm8gbmV3IG9yZGVycyBmb3VuZC5cIlxuICB9KTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICB2YXJpYW50OiBcIndoaXRlXCIsXG4gICAgYm94U2hhZG93OiBcImNhcmRcIixcbiAgICBwOiBcImxnXCIsXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5IMywge1xuICAgICAgbWI6IFwibWRcIixcbiAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MURcXHUwNDNFXFx1MDQzMlxcdTA0NEJcXHUwNDM1IFxcdTA0MTdcXHUwNDMwXFx1MDQzQVxcdTA0MzBcXHUwNDM3XFx1MDQ0QlwiXG4gICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZSwge1xuICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUhlYWQsIHtcbiAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZVJvdywge1xuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogXCJJRFwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxNFxcdTA0MzBcXHUwNDQyXFx1MDQzMFwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxQVxcdTA0M0JcXHUwNDM4XFx1MDQzNVxcdTA0M0RcXHUwNDQyXCJcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDIxXFx1MDQ0M1xcdTA0M0NcXHUwNDNDXFx1MDQzMFwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMlxcdTA0M0VcXHUwNDMyXFx1MDQzMFxcdTA0NDBcXHUwNDRCXCJcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDE0XFx1MDQzNVxcdTA0MzlcXHUwNDQxXFx1MDQ0MlxcdTA0MzJcXHUwNDM4XFx1MDQ0RlwiXG4gICAgICAgICAgfSldXG4gICAgICAgIH0pXG4gICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVCb2R5LCB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXdPcmRlcnMubWFwKG9yZGVyID0+IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZVJvdywge1xuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShcImFcIiwge1xuICAgICAgICAgICAgICBocmVmOiBgL2FkbWluL3Jlc291cmNlcy9vcmRlcnMvcmVjb3Jkcy8ke29yZGVyLmlkfS9zaG93YCxcbiAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiI1wiLCBvcmRlci5pZF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IG5ldyBEYXRlKG9yZGVyLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBvcmRlci5jdXN0b21lck5hbWVcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFtwYXJzZUZsb2F0KG9yZGVyLnRvdGFsQW1vdW50KS50b0ZpeGVkKDIpLCBcIiBcXHUwNDIwXCJdXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShcInVsXCIsIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjaGlsZHJlbjogKG9yZGVyLml0ZW1zIHx8IFtdKS5tYXAoaXRlbSA9PiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKFwibGlcIiwge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbaXRlbS5wcm9kdWN0TmFtZSwgXCIgeCBcIiwgaXRlbS5xdWFudGl0eV1cbiAgICAgICAgICAgICAgfSwgaXRlbS5pZCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGdhcDogJzhweCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgdmFyaWFudDogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgc2l6ZTogXCJzbVwiLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZU9yZGVyU3RhdHVzKG9yZGVyLmlkLCAn0J/RgNC40L3Rj9GCJywgJ09yZGVyIGFjY2VwdGVkIGZyb20gZGFzaGJvYXJkJyksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICAgICAgICBpY29uOiBcIkNoZWNrXCJcbiAgICAgICAgICAgICAgICB9KSwgXCIgXFx1MDQxMiBcXHUwNDQwXFx1MDQzMFxcdTA0MzFcXHUwNDNFXFx1MDQ0MlxcdTA0NDNcIl1cbiAgICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICB2YXJpYW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgIHNpemU6IFwic21cIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAod2luZG93LmNvbmZpcm0oYNCS0Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDQt9Cw0LrQsNC3ICMke29yZGVyLmlkfT9gKSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2VPcmRlclN0YXR1cyhvcmRlci5pZCwgJ9Ce0YLQvNC10L3QtdC9JywgJ09yZGVyIGNhbmNlbGxlZCBmcm9tIGRhc2hib2FyZCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICAgICAgICBpY29uOiBcIkNsb3NlXCJcbiAgICAgICAgICAgICAgICB9KSwgXCIgXFx1MDQxRVxcdTA0NDJcXHUwNDNDXFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0MlxcdTA0NENcIl1cbiAgICAgICAgICAgICAgfSldXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXVxuICAgICAgICB9LCBvcmRlci5pZCkpXG4gICAgICB9KV1cbiAgICB9KV1cbiAgfSk7XG59O1xuY29uc3QgSW5Qcm9ncmVzc09yZGVyc1dpZGdldCA9ICh7XG4gIHJlZnJlc2hUcmlnZ2VyLFxuICBvblJlZnJlc2hEb25lXG59KSA9PiB7XG4gIGNvbnN0IFtpblByb2dyZXNzT3JkZXJzLCBzZXRJblByb2dyZXNzT3JkZXJzXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKFtdKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkobnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZEZpbHRlclN0YXR1c2VzLCBzZXRTZWxlY3RlZEZpbHRlclN0YXR1c2VzXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKG5ldyBTZXQoREVGQVVMVF9JTl9QUk9HUkVTU19TVEFUVVNFUykpO1xuICBjb25zdCBbb3JkZXJTdGF0dXNlc0ZvckVkaXQsIHNldE9yZGVyU3RhdHVzZXNGb3JFZGl0XSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKHt9KTtcbiAgY29uc3QgW3Nob3dDb25maXJtTW9kYWwsIHNldFNob3dDb25maXJtTW9kYWxdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoZmFsc2UpO1xuICBjb25zdCBbY29uZmlybU1vZGFsRGF0YSwgc2V0Q29uZmlybU1vZGFsRGF0YV0gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKSh7XG4gICAgb3JkZXJJZDogbnVsbCxcbiAgICBuZXdTdGF0dXM6IG51bGxcbiAgfSk7XG4gIGNvbnN0IGZldGNoSW5Qcm9ncmVzc09yZGVycyA9ICgwLCBfcmVhY3QudXNlQ2FsbGJhY2spKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzdGF0dXNlc1RvRmV0Y2ggPSBBcnJheS5mcm9tKHNlbGVjdGVkRmlsdGVyU3RhdHVzZXMpO1xuICAgIGlmIChzdGF0dXNlc1RvRmV0Y2gubGVuZ3RoID09PSAwKSB7XG4gICAgICBzZXRJblByb2dyZXNzT3JkZXJzKFtdKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgY29uc3Qgc3RhdHVzUXVlcnkgPSBzdGF0dXNlc1RvRmV0Y2gubWFwKHMgPT4gYHN0YXR1cz0ke2VuY29kZVVSSUNvbXBvbmVudChzKX1gKS5qb2luKCcmJyk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9heGlvcy5kZWZhdWx0LmdldChgL2FwaS9vcmRlcnMvZmlsdGVyPyR7c3RhdHVzUXVlcnl9JmxpbWl0PTEwJnNvcnRCeT11cGRhdGVkQXQmc29ydERpcmVjdGlvbj1BU0NgKTtcbiAgICAgIGNvbnN0IGZldGNoZWRPcmRlcnMgPSByZXNwb25zZS5kYXRhLm9yZGVycyB8fCBbXTtcbiAgICAgIHNldEluUHJvZ3Jlc3NPcmRlcnMoZmV0Y2hlZE9yZGVycyk7XG4gICAgICBjb25zdCBpbml0aWFsU3RhdHVzZXNGb3JFZGl0ID0ge307XG4gICAgICBmZXRjaGVkT3JkZXJzLmZvckVhY2gob3JkZXIgPT4ge1xuICAgICAgICBpbml0aWFsU3RhdHVzZXNGb3JFZGl0W29yZGVyLmlkXSA9IG9yZGVyLnN0YXR1cztcbiAgICAgIH0pO1xuICAgICAgc2V0T3JkZXJTdGF0dXNlc0ZvckVkaXQoaW5pdGlhbFN0YXR1c2VzRm9yRWRpdCk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggaW4tcHJvZ3Jlc3Mgb3JkZXJzOlwiLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGluLXByb2dyZXNzIG9yZGVycy4nKTtcbiAgICAgIHNldEluUHJvZ3Jlc3NPcmRlcnMoW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIGlmIChvblJlZnJlc2hEb25lKSBvblJlZnJlc2hEb25lKCk7XG4gICAgfVxuICB9LCBbc2VsZWN0ZWRGaWx0ZXJTdGF0dXNlcywgb25SZWZyZXNoRG9uZV0pO1xuICAoMCwgX3JlYWN0LnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIGZldGNoSW5Qcm9ncmVzc09yZGVycygpO1xuICB9LCBbZmV0Y2hJblByb2dyZXNzT3JkZXJzLCByZWZyZXNoVHJpZ2dlcl0pO1xuICBjb25zdCBoYW5kbGVTdGF0dXNGaWx0ZXJDaGFuZ2UgPSAoc3RhdHVzVmFsdWUsIGlzQ2hlY2tlZCkgPT4ge1xuICAgIHNldFNlbGVjdGVkRmlsdGVyU3RhdHVzZXMocHJldiA9PiB7XG4gICAgICBjb25zdCBuZXdTZXQgPSBuZXcgU2V0KHByZXYpO1xuICAgICAgaWYgKGlzQ2hlY2tlZCkgbmV3U2V0LmFkZChzdGF0dXNWYWx1ZSk7ZWxzZSBuZXdTZXQuZGVsZXRlKHN0YXR1c1ZhbHVlKTtcbiAgICAgIHJldHVybiBuZXdTZXQ7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVN0YXR1c0VkaXRDaGFuZ2UgPSAob3JkZXJJZCwgbmV3U3RhdHVzKSA9PiB7XG4gICAgc2V0T3JkZXJTdGF0dXNlc0ZvckVkaXQocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFtvcmRlcklkXTogbmV3U3RhdHVzXG4gICAgfSkpO1xuICB9O1xuICBjb25zdCBwcmVwYXJlVG9TYXZlU3RhdHVzID0gb3JkZXJJZCA9PiB7XG4gICAgY29uc3QgbmV3U3RhdHVzID0gb3JkZXJTdGF0dXNlc0ZvckVkaXRbb3JkZXJJZF07XG4gICAgaWYgKCFuZXdTdGF0dXMpIHtcbiAgICAgIGFsZXJ0KFwi0KHQvdCw0YfQsNC70LAg0LLRi9Cx0LXRgNC40YLQtSDQvdC+0LLRi9C5INGB0YLQsNGC0YPRgS5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENvbmZpcm1Nb2RhbERhdGEoe1xuICAgICAgb3JkZXJJZCxcbiAgICAgIG5ld1N0YXR1c1xuICAgIH0pO1xuICAgIHNldFNob3dDb25maXJtTW9kYWwodHJ1ZSk7XG4gIH07XG4gIGNvbnN0IGNhbmNlbFN0YXR1c0NoYW5nZSA9ICgpID0+IHtcbiAgICBzZXRTaG93Q29uZmlybU1vZGFsKGZhbHNlKTtcbiAgICBzZXRDb25maXJtTW9kYWxEYXRhKHtcbiAgICAgIG9yZGVySWQ6IG51bGwsXG4gICAgICBuZXdTdGF0dXM6IG51bGxcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgY29uZmlybUFuZFNhdmVTdGF0dXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb3JkZXJJZCxcbiAgICAgIG5ld1N0YXR1c1xuICAgIH0gPSBjb25maXJtTW9kYWxEYXRhO1xuICAgIGlmICghb3JkZXJJZCB8fCAhbmV3U3RhdHVzKSByZXR1cm47XG4gICAgc2V0U2hvd0NvbmZpcm1Nb2RhbChmYWxzZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IF9heGlvcy5kZWZhdWx0LnB1dChgL2FwaS9vcmRlcnMvJHtvcmRlcklkfS9zdGF0dXNgLCB7XG4gICAgICAgIG5ld1N0YXR1cyxcbiAgICAgICAgYWRtaW5Db21tZW50OiAnU3RhdHVzIHVwZGF0ZWQgZnJvbSBkYXNoYm9hcmQnXG4gICAgICB9KTtcbiAgICAgIC8vIGFsZXJ0KGDQodGC0LDRgtGD0YEg0LfQsNC60LDQt9CwICMke29yZGVySWR9INC+0LHQvdC+0LLQu9C10L0g0L3QsCBcIiR7bmV3U3RhdHVzfVwiYCk7XG4gICAgICBmZXRjaEluUHJvZ3Jlc3NPcmRlcnMoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgc3RhdHVzIGZvciBvcmRlciAke29yZGVySWR9OmAsIGVycik7XG4gICAgICBhbGVydChg0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINGB0YLQsNGC0YPRgdCwINC00LvRjyDQt9Cw0LrQsNC30LAgIyR7b3JkZXJJZH0uYCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldENvbmZpcm1Nb2RhbERhdGEoe1xuICAgICAgICBvcmRlcklkOiBudWxsLFxuICAgICAgICBuZXdTdGF0dXM6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2pzeFJ1bnRpbWUuRnJhZ21lbnQsIHtcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgIHZhcmlhbnQ6IFwid2hpdGVcIixcbiAgICAgIGJveFNoYWRvdzogXCJjYXJkXCIsXG4gICAgICBwOiBcImxnXCIsXG4gICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgzLCB7XG4gICAgICAgIG1iOiBcIm1kXCIsXG4gICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MTdcXHUwNDMwXFx1MDQzQVxcdTA0MzBcXHUwNDM3XFx1MDQ0QiBcXHUwNDMyIFxcdTA0MjBcXHUwNDMwXFx1MDQzMVxcdTA0M0VcXHUwNDQyXFx1MDQzNVwiXG4gICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICBtYjogXCJtZFwiLFxuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkxhYmVsLCB7XG4gICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyNFxcdTA0MzhcXHUwNDNCXFx1MDQ0Q1xcdTA0NDJcXHUwNDQwIFxcdTA0M0ZcXHUwNDNFIFxcdTA0NDFcXHUwNDQyXFx1MDQzMFxcdTA0NDJcXHUwNDQzXFx1MDQ0MVxcdTA0MzBcXHUwNDNDOlwiXG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGdhcDogJzEwcHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnOHB4J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW46IERFRkFVTFRfSU5fUFJPR1JFU1NfU1RBVFVTRVMubWFwKHN0YXR1c09wdGlvbiA9PiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBtcjogXCJtZFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgaWQ6IGBmaWx0ZXItc3RhdHVzLSR7c3RhdHVzT3B0aW9uLnJlcGxhY2UoL1xccysvZywgJy0nKX1gLFxuICAgICAgICAgICAgICBjaGVja2VkOiBzZWxlY3RlZEZpbHRlclN0YXR1c2VzLmhhcyhzdGF0dXNPcHRpb24pLFxuICAgICAgICAgICAgICBvbkNoYW5nZTogZSA9PiBoYW5kbGVTdGF0dXNGaWx0ZXJDaGFuZ2Uoc3RhdHVzT3B0aW9uLCBlLnRhcmdldC5jaGVja2VkKSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzVweCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkxhYmVsLCB7XG4gICAgICAgICAgICAgIGh0bWxGb3I6IGBmaWx0ZXItc3RhdHVzLSR7c3RhdHVzT3B0aW9uLnJlcGxhY2UoL1xccysvZywgJy0nKX1gLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogc3RhdHVzT3B0aW9uXG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9LCBzdGF0dXNPcHRpb24pKVxuICAgICAgICB9KV1cbiAgICAgIH0pLCBsb2FkaW5nICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgY2hpbGRyZW46IFwiTG9hZGluZyBpbi1wcm9ncmVzcyBvcmRlcnMuLi5cIlxuICAgICAgfSksICFsb2FkaW5nICYmIGVycm9yICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgY29sb3I6IFwiZGFuZ2VyXCIsXG4gICAgICAgIGNoaWxkcmVuOiBlcnJvclxuICAgICAgfSksICFsb2FkaW5nICYmICFlcnJvciAmJiBzZWxlY3RlZEZpbHRlclN0YXR1c2VzLnNpemUgPT09IDAgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDEyXFx1MDQ0QlxcdTA0MzFcXHUwNDM1XFx1MDQ0MFxcdTA0MzhcXHUwNDQyXFx1MDQzNSBcXHUwNDQxXFx1MDQ0MlxcdTA0MzBcXHUwNDQyXFx1MDQ0M1xcdTA0NDFcXHUwNDRCIFxcdTA0MzRcXHUwNDNCXFx1MDQ0RiBcXHUwNDNFXFx1MDQ0MlxcdTA0M0VcXHUwNDMxXFx1MDQ0MFxcdTA0MzBcXHUwNDM2XFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0RiBcXHUwNDM3XFx1MDQzMFxcdTA0M0FcXHUwNDMwXFx1MDQzN1xcdTA0M0VcXHUwNDMyIFxcdTA0MzIgXFx1MDQ0MFxcdTA0MzBcXHUwNDMxXFx1MDQzRVxcdTA0NDJcXHUwNDM1LlwiXG4gICAgICB9KSwgIWxvYWRpbmcgJiYgIWVycm9yICYmIHNlbGVjdGVkRmlsdGVyU3RhdHVzZXMuc2l6ZSA+IDAgJiYgaW5Qcm9ncmVzc09yZGVycy5sZW5ndGggPT09IDAgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDFGXFx1MDQzRSBcXHUwNDMyXFx1MDQ0QlxcdTA0MzFcXHUwNDQwXFx1MDQzMFxcdTA0M0RcXHUwNDNEXFx1MDQ0QlxcdTA0M0MgXFx1MDQ0MVxcdTA0NDJcXHUwNDMwXFx1MDQ0MlxcdTA0NDNcXHUwNDQxXFx1MDQzMFxcdTA0M0MgXFx1MDQzN1xcdTA0MzBcXHUwNDNBXFx1MDQzMFxcdTA0MzdcXHUwNDRCIFxcdTA0M0RcXHUwNDM1IFxcdTA0M0RcXHUwNDMwXFx1MDQzOVxcdTA0MzRcXHUwNDM1XFx1MDQzRFxcdTA0NEIuXCJcbiAgICAgIH0pLCAhbG9hZGluZyAmJiAhZXJyb3IgJiYgaW5Qcm9ncmVzc09yZGVycy5sZW5ndGggPiAwICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZSwge1xuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlSGVhZCwge1xuICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGFibGVSb3csIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBcIklEXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxQVxcdTA0M0JcXHUwNDM4XFx1MDQzNVxcdTA0M0RcXHUwNDQyXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMlxcdTA0M0VcXHUwNDMyXFx1MDQzMFxcdTA0NDBcXHUwNDRCXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMlxcdTA0MzVcXHUwNDNBXFx1MDQ0M1xcdTA0NDlcXHUwNDM4XFx1MDQzOSBcXHUwNDIxXFx1MDQ0MlxcdTA0MzBcXHUwNDQyXFx1MDQ0M1xcdTA0NDFcIlxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDE0XFx1MDQzNVxcdTA0MzlcXHUwNDQxXFx1MDQ0MlxcdTA0MzJcXHUwNDM4XFx1MDQzNVwiXG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVCb2R5LCB7XG4gICAgICAgICAgY2hpbGRyZW46IGluUHJvZ3Jlc3NPcmRlcnMubWFwKG9yZGVyID0+IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZVJvdywge1xuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoXCJhXCIsIHtcbiAgICAgICAgICAgICAgICBocmVmOiBgL2FkbWluL3Jlc291cmNlcy9vcmRlcnMvcmVjb3Jkcy8ke29yZGVyLmlkfS9zaG93YCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgcmVsOiBcIm5vb3BlbmVyIG5vcmVmZXJyZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiI1wiLCBvcmRlci5pZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IG9yZGVyLmN1c3RvbWVyTmFtZVxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwidWxcIiwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAob3JkZXIuaXRlbXMgfHwgW10pLm1hcChpdGVtID0+IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoXCJsaVwiLCB7XG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2l0ZW0ucHJvZHVjdE5hbWUsIFwiIHggXCIsIGl0ZW0ucXVhbnRpdHldXG4gICAgICAgICAgICAgICAgfSwgaXRlbS5pZCkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5TZWxlY3QsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IG9yZGVyU3RhdHVzZXNGb3JFZGl0W29yZGVyLmlkXSB8fCBvcmRlci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogb3JkZXJTdGF0dXNlc0ZvckVkaXRbb3JkZXIuaWRdIHx8IG9yZGVyLnN0YXR1c1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogQUxMX1BPU1NJQkxFX1NUQVRVU0VTLm1hcChzID0+ICh7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogcyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzXG4gICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxlY3RlZCA9PiBoYW5kbGVTdGF0dXNFZGl0Q2hhbmdlKG9yZGVyLmlkLCBzZWxlY3RlZC52YWx1ZSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIHZhcmlhbnQ6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgIHNpemU6IFwic21cIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBwcmVwYXJlVG9TYXZlU3RhdHVzKG9yZGVyLmlkKSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgICAgICAgaWNvbjogXCJTYXZlXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSldXG4gICAgICAgICAgfSwgb3JkZXIuaWQpKVxuICAgICAgICB9KV1cbiAgICAgIH0pXVxuICAgIH0pLCBzaG93Q29uZmlybU1vZGFsICYmIGNvbmZpcm1Nb2RhbERhdGEub3JkZXJJZCAmJiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG4gICAgICAgIHpJbmRleDogMTA1MCxcbiAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknLFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICB9LFxuICAgICAgd2lkdGg6IFsnOTAlJywgJzQwMHB4J10sXG4gICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgzLCB7XG4gICAgICAgIG1iOiBcImxnXCIsXG4gICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUZcXHUwNDNFXFx1MDQzNFxcdTA0NDJcXHUwNDMyXFx1MDQzNVxcdTA0NDBcXHUwNDM0XFx1MDQzOFxcdTA0NDJcXHUwNDM1IFxcdTA0MzRcXHUwNDM1XFx1MDQzOVxcdTA0NDFcXHUwNDQyXFx1MDQzMlxcdTA0MzhcXHUwNDM1XCJcbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgICAgIG1iOiBcInhsXCIsXG4gICAgICAgIGNoaWxkcmVuOiBg0JjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNC60LDQt9CwICMke2NvbmZpcm1Nb2RhbERhdGEub3JkZXJJZH0g0L3QsCBcIiR7Y29uZmlybU1vZGFsRGF0YS5uZXdTdGF0dXN9XCI/YFxuICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgIHZhcmlhbnQ6IFwicHJpbWFyeVwiLFxuICAgICAgICAgIG9uQ2xpY2s6IGNvbmZpcm1BbmRTYXZlU3RhdHVzLFxuICAgICAgICAgIG1yOiBcIm1kXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxRlxcdTA0M0VcXHUwNDM0XFx1MDQ0MlxcdTA0MzJcXHUwNDM1XFx1MDQ0MFxcdTA0MzRcXHUwNDM4XFx1MDQ0MlxcdTA0NENcIlxuICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgdmFyaWFudDogXCJ0ZXh0XCIsXG4gICAgICAgICAgb25DbGljazogY2FuY2VsU3RhdHVzQ2hhbmdlLFxuICAgICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUVcXHUwNDQyXFx1MDQzQ1xcdTA0MzVcXHUwNDNEXFx1MDQzMFwiXG4gICAgICAgIH0pXVxuICAgICAgfSldXG4gICAgfSksIHNob3dDb25maXJtTW9kYWwgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuNSknLFxuICAgICAgICB6SW5kZXg6IDEwNDBcbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiBjYW5jZWxTdGF0dXNDaGFuZ2VcbiAgICB9KV1cbiAgfSk7XG59O1xuY29uc3QgQWRtaW5zV2lkZ2V0ID0gKCkgPT4ge1xuICByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgIHZhcmlhbnQ6IFwid2hpdGVcIixcbiAgICBib3hTaGFkb3c6IFwiY2FyZFwiLFxuICAgIHA6IFwibGdcIixcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgzLCB7XG4gICAgICBtYjogXCJtZFwiLFxuICAgICAgY2hpbGRyZW46IFwiXFx1MDQxMFxcdTA0MzRcXHUwNDNDXFx1MDQzOFxcdTA0M0RcXHUwNDM4XFx1MDQ0MVxcdTA0NDJcXHUwNDQwXFx1MDQzMFxcdTA0NDJcXHUwNDNFXFx1MDQ0MFxcdTA0NEJcIlxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgICBjaGlsZHJlbjogXCJDb250ZW50IGZvciBhZG1pbnMgbGlzdC4uLiAoVG8gYmUgaW1wbGVtZW50ZWQpXCJcbiAgICB9KV1cbiAgfSk7XG59O1xuY29uc3QgUGxhY2Vob2xkZXJXaWRnZXQgPSAoKSA9PiB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgdmFyaWFudDogXCJ3aGl0ZVwiLFxuICAgIGJveFNoYWRvdzogXCJjYXJkXCIsXG4gICAgcDogXCJsZ1wiLFxuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSDMsIHtcbiAgICAgIG1iOiBcIm1kXCIsXG4gICAgICBjaGlsZHJlbjogXCJcXHUwNDE0XFx1MDQ0MFxcdTA0NDNcXHUwNDMzXFx1MDQzRVxcdTA0MzkgXFx1MDQxMlxcdTA0MzhcXHUwNDM0XFx1MDQzNlxcdTA0MzVcXHUwNDQyXCJcbiAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgY2hpbGRyZW46IFwiUGxhY2Vob2xkZXIgZm9yIGFub3RoZXIgd2lkZ2V0Li4uIChUbyBiZSBpbXBsZW1lbnRlZClcIlxuICAgIH0pXVxuICB9KTtcbn07XG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtyZWZyZXNoSW5Qcm9ncmVzc0tleSwgc2V0UmVmcmVzaEluUHJvZ3Jlc3NLZXldID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoMCk7XG4gIGNvbnN0IHRyaWdnZXJJblByb2dyZXNzUmVmcmVzaCA9ICgpID0+IHtcbiAgICBzZXRSZWZyZXNoSW5Qcm9ncmVzc0tleShwcmV2S2V5ID0+IHByZXZLZXkgKyAxKTtcbiAgfTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgbWI6IFwieGxcIixcbiAgICAgIHA6IFwibGdcIixcbiAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5IMiwge1xuICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDFGXFx1MDQzMFxcdTA0M0RcXHUwNDM1XFx1MDQzQlxcdTA0NEMgXFx1MDQyM1xcdTA0M0ZcXHUwNDQwXFx1MDQzMFxcdTA0MzJcXHUwNDNCXFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0RiBcXHUwNDFDXFx1MDQzMFxcdTA0MzNcXHUwNDMwXFx1MDQzN1xcdTA0MzhcXHUwNDNEXFx1MDQzRVxcdTA0M0NcIlxuICAgICAgfSlcbiAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgZGlzcGxheTogXCJncmlkXCIsXG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiB7XG4gICAgICAgIF86IFwiMWZyXCJcbiAgICAgIH0sXG4gICAgICBncmlkR2FwOiBcImxnXCIsXG4gICAgICBwOiBcImxnXCIsXG4gICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShOZXdPcmRlcnNXaWRnZXQsIHtcbiAgICAgICAgcmVmcmVzaEluUHJvZ3Jlc3NPcmRlcnNUcmlnZ2VyOiB0cmlnZ2VySW5Qcm9ncmVzc1JlZnJlc2hcbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoSW5Qcm9ncmVzc09yZGVyc1dpZGdldCwge1xuICAgICAgICByZWZyZXNoVHJpZ2dlcjogcmVmcmVzaEluUHJvZ3Jlc3NLZXksXG4gICAgICAgIG9uUmVmcmVzaERvbmU6ICgpID0+IHt9XG4gICAgICB9LCByZWZyZXNoSW5Qcm9ncmVzc0tleSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShBZG1pbnNXaWRnZXQsIHt9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFBsYWNlaG9sZGVyV2lkZ2V0LCB7fSldXG4gICAgfSldXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IERhc2hib2FyZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURhc2hib2FyZC5qcy5tYXAiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBVcGxvYWRJbWFnZUlucHV0IGZyb20gJy4uL2Rpc3QvYWRtaW5Db21wb25lbnRzL1VwbG9hZEltYWdlSW5wdXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZEltYWdlSW5wdXQgPSBVcGxvYWRJbWFnZUlucHV0XG5pbXBvcnQgUGFzc3dvcmRJbnB1dCBmcm9tICcuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9QYXNzd29yZElucHV0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXNzd29yZElucHV0ID0gUGFzc3dvcmRJbnB1dFxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJ3cmFwIiwiZm4iLCJhcHBseSIsInRoaXNBcmciLCJhcmd1bWVudHMiLCJyZXF1aXJlJCQwIiwianN4UnVudGltZU1vZHVsZSIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwiY3VycmVudEltYWdlVXJsIiwiZSIsInIiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsInQiLCJfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUiLCJoYXMiLCJnZXQiLCJuIiwiX19wcm90b19fIiwiYSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImkiLCJzZXQiLCJyZWNvcmQiLCJvbkNoYW5nZSIsInByb3BzIiwicGFyYW1zIiwicHJvcGVydHkiLCJwYXRoIiwiaW1hZ2VVcmwiLCJpc1VwbG9hZGluZyIsInNldElzVXBsb2FkaW5nIiwiX3JlYWN0IiwidXNlU3RhdGUiLCJlcnJvciIsIm9uVXBsb2FkIiwiZmlsZXMiLCJmaWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlIiwiX2F4aW9zIiwicG9zdCIsImhlYWRlcnMiLCJuZXdVcmwiLCJkYXRhIiwidXJsIiwic2V0SW1hZ2VVcmwiLCJlcnIiLCJjb25zb2xlIiwibWVzc2FnZSIsInNldEVycm9yIiwiaGFuZGxlRGVsZXRlIiwidXNlQ2FsbGJhY2siLCJfanN4UnVudGltZSIsImpzeHMiLCJfZGVzaWduU3lzdGVtIiwiQm94IiwianN4IiwiTGFiZWwiLCJsYWJlbCIsInNyYyIsImFsdCIsInN0eWxlIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJtYXJnaW5SaWdodCIsIkJ1dHRvbiIsInZhcmlhbnQiLCJzaXplIiwiY2hpbGRyZW4iLCJJY29uIiwiaWNvbiIsIkRyb3Bab25lIiwidmFsaWRhdGUiLCJtYXhTaXplIiwidXBsb2FkaW5nIiwibXVsdGlwbGUiLCJoYW5kbGVDaGFuZ2UiLCJldmVudCIsIm5hbWUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkZvcm1Hcm91cCIsImh0bWxGb3IiLCJJbnB1dCIsInR5cGUiLCJpZCIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIk5ld09yZGVyc1dpZGdldCIsIldlYWtNYXAiLCJBTExfUE9TU0lCTEVfU1RBVFVTRVMiLCJERUZBVUxUX0lOX1BST0dSRVNTX1NUQVRVU0VTIiwibmV3T3JkZXJzIiwic2V0TmV3T3JkZXJzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaE5ld09yZGVycyIsIm9yZGVycyIsInVzZUVmZmVjdCIsImhhbmRsZUNoYW5nZU9yZGVyU3RhdHVzIiwib3JkZXJJZCIsIm5ld1N0YXR1cyIsImNvbW1lbnQiLCJwdXQiLCJyZWZyZXNoSW5Qcm9ncmVzc09yZGVyc1RyaWdnZXIiLCJhbGVydCIsIlRleHQiLCJsZW5ndGgiLCJIMyIsIlRhYmxlSGVhZCIsIlRhYmxlUm93IiwiVGFibGVDZWxsIiwiVGFibGVCb2R5IiwibWFwIiwib3JkZXIiLCJocmVmIiwicmVsIiwiRGF0ZSIsImNyZWF0ZWRBdCIsInRvTG9jYWxlU3RyaW5nIiwiY3VzdG9tZXJOYW1lIiwicGFyc2VGbG9hdCIsInRvdGFsQW1vdW50IiwidG9GaXhlZCIsImxpc3RTdHlsZSIsInBhZGRpbmciLCJtYXJnaW4iLCJpdGVtcyIsIml0ZW0iLCJwcm9kdWN0TmFtZSIsInF1YW50aXR5Iiwib25DbGljayIsIndpbmRvdyIsImNvbmZpcm0iLCJJblByb2dyZXNzT3JkZXJzV2lkZ2V0IiwicmVmcmVzaFRyaWdnZXIiLCJvblJlZnJlc2hEb25lIiwiaW5Qcm9ncmVzc09yZGVycyIsInNldEluUHJvZ3Jlc3NPcmRlcnMiLCJzZWxlY3RlZEZpbHRlclN0YXR1c2VzIiwic2V0U2VsZWN0ZWRGaWx0ZXJTdGF0dXNlcyIsIlNldCIsIm9yZGVyU3RhdHVzZXNGb3JFZGl0Iiwic2V0T3JkZXJTdGF0dXNlc0ZvckVkaXQiLCJzaG93Q29uZmlybU1vZGFsIiwic2V0U2hvd0NvbmZpcm1Nb2RhbCIsImNvbmZpcm1Nb2RhbERhdGEiLCJzZXRDb25maXJtTW9kYWxEYXRhIiwiZmV0Y2hJblByb2dyZXNzT3JkZXJzIiwic3RhdHVzZXNUb0ZldGNoIiwiQXJyYXkiLCJmcm9tIiwic3RhdHVzUXVlcnkiLCJzIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImZldGNoZWRPcmRlcnMiLCJpbml0aWFsU3RhdHVzZXNGb3JFZGl0IiwiZm9yRWFjaCIsInN0YXR1cyIsImhhbmRsZVN0YXR1c0ZpbHRlckNoYW5nZSIsInN0YXR1c1ZhbHVlIiwicHJldiIsIm5ld1NldCIsImlzQ2hlY2tlZCIsImFkZCIsImRlbGV0ZSIsImhhbmRsZVN0YXR1c0VkaXRDaGFuZ2UiLCJwcmVwYXJlVG9TYXZlU3RhdHVzIiwiY2FuY2VsU3RhdHVzQ2hhbmdlIiwiY29uZmlybUFuZFNhdmVTdGF0dXMiLCJhZG1pbkNvbW1lbnQiLCJGcmFnbWVudCIsImdhcCIsInN0YXR1c09wdGlvbiIsInJlcGxhY2UiLCJjaGVja2VkIiwiY29sb3IiLCJUYWJsZSIsIlNlbGVjdCIsIm9wdGlvbnMiLCJzZWxlY3RlZCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsInpJbmRleCIsImJhY2tncm91bmQiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJ0ZXh0QWxpZ24iLCJ3aWR0aCIsIm1iIiwiZGlzcGxheSIsIm1yIiwicmlnaHQiLCJib3R0b20iLCJiYWNrZ3JvdW5kQ29sb3IiLCJBZG1pbnNXaWRnZXQiLCJwIiwiUGxhY2Vob2xkZXJXaWRnZXQiLCJEYXNoYm9hcmQiLCJyZWZyZXNoSW5Qcm9ncmVzc0tleSIsInNldFJlZnJlc2hJblByb2dyZXNzS2V5IiwidHJpZ2dlckluUHJvZ3Jlc3NSZWZyZXNoIiwicHJldktleSIsIkgyIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsIl8iLCJncmlkR2FwIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiVXBsb2FkSW1hZ2VJbnB1dCIsIlBhc3N3b3JkSW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0NBR0EsRUFBQSxPQUFBLFNBQUFBLElBQUEsR0FBQTtDQUNBLElBQUEsT0FBQUMsRUFBQSxDQUFBQyxLQUFBLENBQUFDLE9BQUEsRUFBQUMsU0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
