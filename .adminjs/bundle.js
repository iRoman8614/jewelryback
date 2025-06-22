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

	var reactCropper_umd = {};

	var cropper = {exports: {}};

	/*!
	 * Cropper.js v1.6.2
	 * https://fengyuanchen.github.io/cropperjs
	 *
	 * Copyright 2015-present Chen Fengyuan
	 * Released under the MIT license
	 *
	 * Date: 2024-04-21T07:43:05.335Z
	 */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(commonjsGlobal, (function () {
		  function ownKeys(e, r) {
		    var t = Object.keys(e);
		    if (Object.getOwnPropertySymbols) {
		      var o = Object.getOwnPropertySymbols(e);
		      r && (o = o.filter(function (r) {
		        return Object.getOwnPropertyDescriptor(e, r).enumerable;
		      })), t.push.apply(t, o);
		    }
		    return t;
		  }
		  function _objectSpread2(e) {
		    for (var r = 1; r < arguments.length; r++) {
		      var t = null != arguments[r] ? arguments[r] : {};
		      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
		        _defineProperty(e, r, t[r]);
		      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
		        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		      });
		    }
		    return e;
		  }
		  function _toPrimitive(t, r) {
		    if ("object" != typeof t || !t) return t;
		    var e = t[Symbol.toPrimitive];
		    if (void 0 !== e) {
		      var i = e.call(t, r);
		      if ("object" != typeof i) return i;
		      throw new TypeError("@@toPrimitive must return a primitive value.");
		    }
		    return ("string" === r ? String : Number)(t);
		  }
		  function _toPropertyKey(t) {
		    var i = _toPrimitive(t, "string");
		    return "symbol" == typeof i ? i : i + "";
		  }
		  function _typeof(o) {
		    "@babel/helpers - typeof";

		    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
		      return typeof o;
		    } : function (o) {
		      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		    }, _typeof(o);
		  }
		  function _classCallCheck(instance, Constructor) {
		    if (!(instance instanceof Constructor)) {
		      throw new TypeError("Cannot call a class as a function");
		    }
		  }
		  function _defineProperties(target, props) {
		    for (var i = 0; i < props.length; i++) {
		      var descriptor = props[i];
		      descriptor.enumerable = descriptor.enumerable || false;
		      descriptor.configurable = true;
		      if ("value" in descriptor) descriptor.writable = true;
		      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
		    }
		  }
		  function _createClass(Constructor, protoProps, staticProps) {
		    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		    if (staticProps) _defineProperties(Constructor, staticProps);
		    Object.defineProperty(Constructor, "prototype", {
		      writable: false
		    });
		    return Constructor;
		  }
		  function _defineProperty(obj, key, value) {
		    key = _toPropertyKey(key);
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
		  function _toConsumableArray(arr) {
		    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
		  }
		  function _arrayWithoutHoles(arr) {
		    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
		  }
		  function _iterableToArray(iter) {
		    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
		  }
		  function _unsupportedIterableToArray(o, minLen) {
		    if (!o) return;
		    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
		    var n = Object.prototype.toString.call(o).slice(8, -1);
		    if (n === "Object" && o.constructor) n = o.constructor.name;
		    if (n === "Map" || n === "Set") return Array.from(o);
		    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
		  }
		  function _arrayLikeToArray(arr, len) {
		    if (len == null || len > arr.length) len = arr.length;
		    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
		    return arr2;
		  }
		  function _nonIterableSpread() {
		    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		  }

		  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
		  var WINDOW = IS_BROWSER ? window : {};
		  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
		  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
		  var NAMESPACE = 'cropper';

		  // Actions
		  var ACTION_ALL = 'all';
		  var ACTION_CROP = 'crop';
		  var ACTION_MOVE = 'move';
		  var ACTION_ZOOM = 'zoom';
		  var ACTION_EAST = 'e';
		  var ACTION_WEST = 'w';
		  var ACTION_SOUTH = 's';
		  var ACTION_NORTH = 'n';
		  var ACTION_NORTH_EAST = 'ne';
		  var ACTION_NORTH_WEST = 'nw';
		  var ACTION_SOUTH_EAST = 'se';
		  var ACTION_SOUTH_WEST = 'sw';

		  // Classes
		  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
		  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
		  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
		  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
		  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
		  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
		  var CLASS_MOVE = "".concat(NAMESPACE, "-move");

		  // Data keys
		  var DATA_ACTION = "".concat(NAMESPACE, "Action");
		  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");

		  // Drag modes
		  var DRAG_MODE_CROP = 'crop';
		  var DRAG_MODE_MOVE = 'move';
		  var DRAG_MODE_NONE = 'none';

		  // Events
		  var EVENT_CROP = 'crop';
		  var EVENT_CROP_END = 'cropend';
		  var EVENT_CROP_MOVE = 'cropmove';
		  var EVENT_CROP_START = 'cropstart';
		  var EVENT_DBLCLICK = 'dblclick';
		  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
		  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
		  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
		  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
		  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
		  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
		  var EVENT_READY = 'ready';
		  var EVENT_RESIZE = 'resize';
		  var EVENT_WHEEL = 'wheel';
		  var EVENT_ZOOM = 'zoom';

		  // Mime types
		  var MIME_TYPE_JPEG = 'image/jpeg';

		  // RegExps
		  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
		  var REGEXP_DATA_URL = /^data:/;
		  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
		  var REGEXP_TAG_NAME = /^img|canvas$/i;

		  // Misc
		  // Inspired by the default width and height of a canvas element.
		  var MIN_CONTAINER_WIDTH = 200;
		  var MIN_CONTAINER_HEIGHT = 100;

		  var DEFAULTS = {
		    // Define the view mode of the cropper
		    viewMode: 0,
		    // 0, 1, 2, 3

		    // Define the dragging mode of the cropper
		    dragMode: DRAG_MODE_CROP,
		    // 'crop', 'move' or 'none'

		    // Define the initial aspect ratio of the crop box
		    initialAspectRatio: NaN,
		    // Define the aspect ratio of the crop box
		    aspectRatio: NaN,
		    // An object with the previous cropping result data
		    data: null,
		    // A selector for adding extra containers to preview
		    preview: '',
		    // Re-render the cropper when resize the window
		    responsive: true,
		    // Restore the cropped area after resize the window
		    restore: true,
		    // Check if the current image is a cross-origin image
		    checkCrossOrigin: true,
		    // Check the current image's Exif Orientation information
		    checkOrientation: true,
		    // Show the black modal
		    modal: true,
		    // Show the dashed lines for guiding
		    guides: true,
		    // Show the center indicator for guiding
		    center: true,
		    // Show the white modal to highlight the crop box
		    highlight: true,
		    // Show the grid background
		    background: true,
		    // Enable to crop the image automatically when initialize
		    autoCrop: true,
		    // Define the percentage of automatic cropping area when initializes
		    autoCropArea: 0.8,
		    // Enable to move the image
		    movable: true,
		    // Enable to rotate the image
		    rotatable: true,
		    // Enable to scale the image
		    scalable: true,
		    // Enable to zoom the image
		    zoomable: true,
		    // Enable to zoom the image by dragging touch
		    zoomOnTouch: true,
		    // Enable to zoom the image by wheeling mouse
		    zoomOnWheel: true,
		    // Define zoom ratio when zoom the image by wheeling mouse
		    wheelZoomRatio: 0.1,
		    // Enable to move the crop box
		    cropBoxMovable: true,
		    // Enable to resize the crop box
		    cropBoxResizable: true,
		    // Toggle drag mode between "crop" and "move" when click twice on the cropper
		    toggleDragModeOnDblclick: true,
		    // Size limitation
		    minCanvasWidth: 0,
		    minCanvasHeight: 0,
		    minCropBoxWidth: 0,
		    minCropBoxHeight: 0,
		    minContainerWidth: MIN_CONTAINER_WIDTH,
		    minContainerHeight: MIN_CONTAINER_HEIGHT,
		    // Shortcuts of events
		    ready: null,
		    cropstart: null,
		    cropmove: null,
		    cropend: null,
		    crop: null,
		    zoom: null
		  };

		  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

		  /**
		   * Check if the given value is not a number.
		   */
		  var isNaN = Number.isNaN || WINDOW.isNaN;

		  /**
		   * Check if the given value is a number.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
		   */
		  function isNumber(value) {
		    return typeof value === 'number' && !isNaN(value);
		  }

		  /**
		   * Check if the given value is a positive number.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
		   */
		  var isPositiveNumber = function isPositiveNumber(value) {
		    return value > 0 && value < Infinity;
		  };

		  /**
		   * Check if the given value is undefined.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
		   */
		  function isUndefined(value) {
		    return typeof value === 'undefined';
		  }

		  /**
		   * Check if the given value is an object.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
		   */
		  function isObject(value) {
		    return _typeof(value) === 'object' && value !== null;
		  }
		  var hasOwnProperty = Object.prototype.hasOwnProperty;

		  /**
		   * Check if the given value is a plain object.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
		   */
		  function isPlainObject(value) {
		    if (!isObject(value)) {
		      return false;
		    }
		    try {
		      var _constructor = value.constructor;
		      var prototype = _constructor.prototype;
		      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
		    } catch (error) {
		      return false;
		    }
		  }

		  /**
		   * Check if the given value is a function.
		   * @param {*} value - The value to check.
		   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
		   */
		  function isFunction(value) {
		    return typeof value === 'function';
		  }
		  var slice = Array.prototype.slice;

		  /**
		   * Convert array-like or iterable object to an array.
		   * @param {*} value - The value to convert.
		   * @returns {Array} Returns a new array.
		   */
		  function toArray(value) {
		    return Array.from ? Array.from(value) : slice.call(value);
		  }

		  /**
		   * Iterate the given data.
		   * @param {*} data - The data to iterate.
		   * @param {Function} callback - The process function for each element.
		   * @returns {*} The original data.
		   */
		  function forEach(data, callback) {
		    if (data && isFunction(callback)) {
		      if (Array.isArray(data) || isNumber(data.length) /* array-like */) {
		        toArray(data).forEach(function (value, key) {
		          callback.call(data, value, key, data);
		        });
		      } else if (isObject(data)) {
		        Object.keys(data).forEach(function (key) {
		          callback.call(data, data[key], key, data);
		        });
		      }
		    }
		    return data;
		  }

		  /**
		   * Extend the given object.
		   * @param {*} target - The target object to extend.
		   * @param {*} args - The rest objects for merging to the target object.
		   * @returns {Object} The extended object.
		   */
		  var assign = Object.assign || function assign(target) {
		    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }
		    if (isObject(target) && args.length > 0) {
		      args.forEach(function (arg) {
		        if (isObject(arg)) {
		          Object.keys(arg).forEach(function (key) {
		            target[key] = arg[key];
		          });
		        }
		      });
		    }
		    return target;
		  };
		  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

		  /**
		   * Normalize decimal number.
		   * Check out {@link https://0.30000000000000004.com/}
		   * @param {number} value - The value to normalize.
		   * @param {number} [times=100000000000] - The times for normalizing.
		   * @returns {number} Returns the normalized number.
		   */
		  function normalizeDecimalNumber(value) {
		    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
		    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
		  }
		  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;

		  /**
		   * Apply styles to the given element.
		   * @param {Element} element - The target element.
		   * @param {Object} styles - The styles for applying.
		   */
		  function setStyle(element, styles) {
		    var style = element.style;
		    forEach(styles, function (value, property) {
		      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
		        value = "".concat(value, "px");
		      }
		      style[property] = value;
		    });
		  }

		  /**
		   * Check if the given element has a special class.
		   * @param {Element} element - The element to check.
		   * @param {string} value - The class to search.
		   * @returns {boolean} Returns `true` if the special class was found.
		   */
		  function hasClass(element, value) {
		    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
		  }

		  /**
		   * Add classes to the given element.
		   * @param {Element} element - The target element.
		   * @param {string} value - The classes to be added.
		   */
		  function addClass(element, value) {
		    if (!value) {
		      return;
		    }
		    if (isNumber(element.length)) {
		      forEach(element, function (elem) {
		        addClass(elem, value);
		      });
		      return;
		    }
		    if (element.classList) {
		      element.classList.add(value);
		      return;
		    }
		    var className = element.className.trim();
		    if (!className) {
		      element.className = value;
		    } else if (className.indexOf(value) < 0) {
		      element.className = "".concat(className, " ").concat(value);
		    }
		  }

		  /**
		   * Remove classes from the given element.
		   * @param {Element} element - The target element.
		   * @param {string} value - The classes to be removed.
		   */
		  function removeClass(element, value) {
		    if (!value) {
		      return;
		    }
		    if (isNumber(element.length)) {
		      forEach(element, function (elem) {
		        removeClass(elem, value);
		      });
		      return;
		    }
		    if (element.classList) {
		      element.classList.remove(value);
		      return;
		    }
		    if (element.className.indexOf(value) >= 0) {
		      element.className = element.className.replace(value, '');
		    }
		  }

		  /**
		   * Add or remove classes from the given element.
		   * @param {Element} element - The target element.
		   * @param {string} value - The classes to be toggled.
		   * @param {boolean} added - Add only.
		   */
		  function toggleClass(element, value, added) {
		    if (!value) {
		      return;
		    }
		    if (isNumber(element.length)) {
		      forEach(element, function (elem) {
		        toggleClass(elem, value, added);
		      });
		      return;
		    }

		    // IE10-11 doesn't support the second parameter of `classList.toggle`
		    if (added) {
		      addClass(element, value);
		    } else {
		      removeClass(element, value);
		    }
		  }
		  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

		  /**
		   * Transform the given string from camelCase to kebab-case
		   * @param {string} value - The value to transform.
		   * @returns {string} The transformed value.
		   */
		  function toParamCase(value) {
		    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
		  }

		  /**
		   * Get data from the given element.
		   * @param {Element} element - The target element.
		   * @param {string} name - The data key to get.
		   * @returns {string} The data value.
		   */
		  function getData(element, name) {
		    if (isObject(element[name])) {
		      return element[name];
		    }
		    if (element.dataset) {
		      return element.dataset[name];
		    }
		    return element.getAttribute("data-".concat(toParamCase(name)));
		  }

		  /**
		   * Set data to the given element.
		   * @param {Element} element - The target element.
		   * @param {string} name - The data key to set.
		   * @param {string} data - The data value.
		   */
		  function setData(element, name, data) {
		    if (isObject(data)) {
		      element[name] = data;
		    } else if (element.dataset) {
		      element.dataset[name] = data;
		    } else {
		      element.setAttribute("data-".concat(toParamCase(name)), data);
		    }
		  }

		  /**
		   * Remove data from the given element.
		   * @param {Element} element - The target element.
		   * @param {string} name - The data key to remove.
		   */
		  function removeData(element, name) {
		    if (isObject(element[name])) {
		      try {
		        delete element[name];
		      } catch (error) {
		        element[name] = undefined;
		      }
		    } else if (element.dataset) {
		      // #128 Safari not allows to delete dataset property
		      try {
		        delete element.dataset[name];
		      } catch (error) {
		        element.dataset[name] = undefined;
		      }
		    } else {
		      element.removeAttribute("data-".concat(toParamCase(name)));
		    }
		  }
		  var REGEXP_SPACES = /\s\s*/;
		  var onceSupported = function () {
		    var supported = false;
		    if (IS_BROWSER) {
		      var once = false;
		      var listener = function listener() {};
		      var options = Object.defineProperty({}, 'once', {
		        get: function get() {
		          supported = true;
		          return once;
		        },
		        /**
		         * This setter can fix a `TypeError` in strict mode
		         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
		         * @param {boolean} value - The value to set
		         */
		        set: function set(value) {
		          once = value;
		        }
		      });
		      WINDOW.addEventListener('test', listener, options);
		      WINDOW.removeEventListener('test', listener, options);
		    }
		    return supported;
		  }();

		  /**
		   * Remove event listener from the target element.
		   * @param {Element} element - The event target.
		   * @param {string} type - The event type(s).
		   * @param {Function} listener - The event listener.
		   * @param {Object} options - The event options.
		   */
		  function removeListener(element, type, listener) {
		    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		    var handler = listener;
		    type.trim().split(REGEXP_SPACES).forEach(function (event) {
		      if (!onceSupported) {
		        var listeners = element.listeners;
		        if (listeners && listeners[event] && listeners[event][listener]) {
		          handler = listeners[event][listener];
		          delete listeners[event][listener];
		          if (Object.keys(listeners[event]).length === 0) {
		            delete listeners[event];
		          }
		          if (Object.keys(listeners).length === 0) {
		            delete element.listeners;
		          }
		        }
		      }
		      element.removeEventListener(event, handler, options);
		    });
		  }

		  /**
		   * Add event listener to the target element.
		   * @param {Element} element - The event target.
		   * @param {string} type - The event type(s).
		   * @param {Function} listener - The event listener.
		   * @param {Object} options - The event options.
		   */
		  function addListener(element, type, listener) {
		    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		    var _handler = listener;
		    type.trim().split(REGEXP_SPACES).forEach(function (event) {
		      if (options.once && !onceSupported) {
		        var _element$listeners = element.listeners,
		          listeners = _element$listeners === void 0 ? {} : _element$listeners;
		        _handler = function handler() {
		          delete listeners[event][listener];
		          element.removeEventListener(event, _handler, options);
		          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		            args[_key2] = arguments[_key2];
		          }
		          listener.apply(element, args);
		        };
		        if (!listeners[event]) {
		          listeners[event] = {};
		        }
		        if (listeners[event][listener]) {
		          element.removeEventListener(event, listeners[event][listener], options);
		        }
		        listeners[event][listener] = _handler;
		        element.listeners = listeners;
		      }
		      element.addEventListener(event, _handler, options);
		    });
		  }

		  /**
		   * Dispatch event on the target element.
		   * @param {Element} element - The event target.
		   * @param {string} type - The event type(s).
		   * @param {Object} data - The additional event data.
		   * @returns {boolean} Indicate if the event is default prevented or not.
		   */
		  function dispatchEvent(element, type, data) {
		    var event;

		    // Event and CustomEvent on IE9-11 are global objects, not constructors
		    if (isFunction(Event) && isFunction(CustomEvent)) {
		      event = new CustomEvent(type, {
		        detail: data,
		        bubbles: true,
		        cancelable: true
		      });
		    } else {
		      event = document.createEvent('CustomEvent');
		      event.initCustomEvent(type, true, true, data);
		    }
		    return element.dispatchEvent(event);
		  }

		  /**
		   * Get the offset base on the document.
		   * @param {Element} element - The target element.
		   * @returns {Object} The offset data.
		   */
		  function getOffset(element) {
		    var box = element.getBoundingClientRect();
		    return {
		      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
		      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
		    };
		  }
		  var location = WINDOW.location;
		  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

		  /**
		   * Check if the given URL is a cross origin URL.
		   * @param {string} url - The target URL.
		   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
		   */
		  function isCrossOriginURL(url) {
		    var parts = url.match(REGEXP_ORIGINS);
		    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
		  }

		  /**
		   * Add timestamp to the given URL.
		   * @param {string} url - The target URL.
		   * @returns {string} The result URL.
		   */
		  function addTimestamp(url) {
		    var timestamp = "timestamp=".concat(new Date().getTime());
		    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
		  }

		  /**
		   * Get transforms base on the given object.
		   * @param {Object} obj - The target object.
		   * @returns {string} A string contains transform values.
		   */
		  function getTransforms(_ref) {
		    var rotate = _ref.rotate,
		      scaleX = _ref.scaleX,
		      scaleY = _ref.scaleY,
		      translateX = _ref.translateX,
		      translateY = _ref.translateY;
		    var values = [];
		    if (isNumber(translateX) && translateX !== 0) {
		      values.push("translateX(".concat(translateX, "px)"));
		    }
		    if (isNumber(translateY) && translateY !== 0) {
		      values.push("translateY(".concat(translateY, "px)"));
		    }

		    // Rotate should come first before scale to match orientation transform
		    if (isNumber(rotate) && rotate !== 0) {
		      values.push("rotate(".concat(rotate, "deg)"));
		    }
		    if (isNumber(scaleX) && scaleX !== 1) {
		      values.push("scaleX(".concat(scaleX, ")"));
		    }
		    if (isNumber(scaleY) && scaleY !== 1) {
		      values.push("scaleY(".concat(scaleY, ")"));
		    }
		    var transform = values.length ? values.join(' ') : 'none';
		    return {
		      WebkitTransform: transform,
		      msTransform: transform,
		      transform: transform
		    };
		  }

		  /**
		   * Get the max ratio of a group of pointers.
		   * @param {string} pointers - The target pointers.
		   * @returns {number} The result ratio.
		   */
		  function getMaxZoomRatio(pointers) {
		    var pointers2 = _objectSpread2({}, pointers);
		    var maxRatio = 0;
		    forEach(pointers, function (pointer, pointerId) {
		      delete pointers2[pointerId];
		      forEach(pointers2, function (pointer2) {
		        var x1 = Math.abs(pointer.startX - pointer2.startX);
		        var y1 = Math.abs(pointer.startY - pointer2.startY);
		        var x2 = Math.abs(pointer.endX - pointer2.endX);
		        var y2 = Math.abs(pointer.endY - pointer2.endY);
		        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
		        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
		        var ratio = (z2 - z1) / z1;
		        if (Math.abs(ratio) > Math.abs(maxRatio)) {
		          maxRatio = ratio;
		        }
		      });
		    });
		    return maxRatio;
		  }

		  /**
		   * Get a pointer from an event object.
		   * @param {Object} event - The target event object.
		   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
		   * @returns {Object} The result pointer contains start and/or end point coordinates.
		   */
		  function getPointer(_ref2, endOnly) {
		    var pageX = _ref2.pageX,
		      pageY = _ref2.pageY;
		    var end = {
		      endX: pageX,
		      endY: pageY
		    };
		    return endOnly ? end : _objectSpread2({
		      startX: pageX,
		      startY: pageY
		    }, end);
		  }

		  /**
		   * Get the center point coordinate of a group of pointers.
		   * @param {Object} pointers - The target pointers.
		   * @returns {Object} The center point coordinate.
		   */
		  function getPointersCenter(pointers) {
		    var pageX = 0;
		    var pageY = 0;
		    var count = 0;
		    forEach(pointers, function (_ref3) {
		      var startX = _ref3.startX,
		        startY = _ref3.startY;
		      pageX += startX;
		      pageY += startY;
		      count += 1;
		    });
		    pageX /= count;
		    pageY /= count;
		    return {
		      pageX: pageX,
		      pageY: pageY
		    };
		  }

		  /**
		   * Get the max sizes in a rectangle under the given aspect ratio.
		   * @param {Object} data - The original sizes.
		   * @param {string} [type='contain'] - The adjust type.
		   * @returns {Object} The result sizes.
		   */
		  function getAdjustedSizes(_ref4) {
		    var aspectRatio = _ref4.aspectRatio,
		      height = _ref4.height,
		      width = _ref4.width;
		    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
		    var isValidWidth = isPositiveNumber(width);
		    var isValidHeight = isPositiveNumber(height);
		    if (isValidWidth && isValidHeight) {
		      var adjustedWidth = height * aspectRatio;
		      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
		        height = width / aspectRatio;
		      } else {
		        width = height * aspectRatio;
		      }
		    } else if (isValidWidth) {
		      height = width / aspectRatio;
		    } else if (isValidHeight) {
		      width = height * aspectRatio;
		    }
		    return {
		      width: width,
		      height: height
		    };
		  }

		  /**
		   * Get the new sizes of a rectangle after rotated.
		   * @param {Object} data - The original sizes.
		   * @returns {Object} The result sizes.
		   */
		  function getRotatedSizes(_ref5) {
		    var width = _ref5.width,
		      height = _ref5.height,
		      degree = _ref5.degree;
		    degree = Math.abs(degree) % 180;
		    if (degree === 90) {
		      return {
		        width: height,
		        height: width
		      };
		    }
		    var arc = degree % 90 * Math.PI / 180;
		    var sinArc = Math.sin(arc);
		    var cosArc = Math.cos(arc);
		    var newWidth = width * cosArc + height * sinArc;
		    var newHeight = width * sinArc + height * cosArc;
		    return degree > 90 ? {
		      width: newHeight,
		      height: newWidth
		    } : {
		      width: newWidth,
		      height: newHeight
		    };
		  }

		  /**
		   * Get a canvas which drew the given image.
		   * @param {HTMLImageElement} image - The image for drawing.
		   * @param {Object} imageData - The image data.
		   * @param {Object} canvasData - The canvas data.
		   * @param {Object} options - The options.
		   * @returns {HTMLCanvasElement} The result canvas.
		   */
		  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
		    var imageAspectRatio = _ref6.aspectRatio,
		      imageNaturalWidth = _ref6.naturalWidth,
		      imageNaturalHeight = _ref6.naturalHeight,
		      _ref6$rotate = _ref6.rotate,
		      rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
		      _ref6$scaleX = _ref6.scaleX,
		      scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
		      _ref6$scaleY = _ref6.scaleY,
		      scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
		    var aspectRatio = _ref7.aspectRatio,
		      naturalWidth = _ref7.naturalWidth,
		      naturalHeight = _ref7.naturalHeight;
		    var _ref8$fillColor = _ref8.fillColor,
		      fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
		      _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
		      imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
		      _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
		      imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
		      _ref8$maxWidth = _ref8.maxWidth,
		      maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
		      _ref8$maxHeight = _ref8.maxHeight,
		      maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
		      _ref8$minWidth = _ref8.minWidth,
		      minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
		      _ref8$minHeight = _ref8.minHeight,
		      minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
		    var canvas = document.createElement('canvas');
		    var context = canvas.getContext('2d');
		    var maxSizes = getAdjustedSizes({
		      aspectRatio: aspectRatio,
		      width: maxWidth,
		      height: maxHeight
		    });
		    var minSizes = getAdjustedSizes({
		      aspectRatio: aspectRatio,
		      width: minWidth,
		      height: minHeight
		    }, 'cover');
		    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
		    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));

		    // Note: should always use image's natural sizes for drawing as
		    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90
		    var destMaxSizes = getAdjustedSizes({
		      aspectRatio: imageAspectRatio,
		      width: maxWidth,
		      height: maxHeight
		    });
		    var destMinSizes = getAdjustedSizes({
		      aspectRatio: imageAspectRatio,
		      width: minWidth,
		      height: minHeight
		    }, 'cover');
		    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
		    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
		    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
		    canvas.width = normalizeDecimalNumber(width);
		    canvas.height = normalizeDecimalNumber(height);
		    context.fillStyle = fillColor;
		    context.fillRect(0, 0, width, height);
		    context.save();
		    context.translate(width / 2, height / 2);
		    context.rotate(rotate * Math.PI / 180);
		    context.scale(scaleX, scaleY);
		    context.imageSmoothingEnabled = imageSmoothingEnabled;
		    context.imageSmoothingQuality = imageSmoothingQuality;
		    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
		      return Math.floor(normalizeDecimalNumber(param));
		    }))));
		    context.restore();
		    return canvas;
		  }
		  var fromCharCode = String.fromCharCode;

		  /**
		   * Get string from char code in data view.
		   * @param {DataView} dataView - The data view for read.
		   * @param {number} start - The start index.
		   * @param {number} length - The read length.
		   * @returns {string} The read result.
		   */
		  function getStringFromCharCode(dataView, start, length) {
		    var str = '';
		    length += start;
		    for (var i = start; i < length; i += 1) {
		      str += fromCharCode(dataView.getUint8(i));
		    }
		    return str;
		  }
		  var REGEXP_DATA_URL_HEAD = /^data:.*,/;

		  /**
		   * Transform Data URL to array buffer.
		   * @param {string} dataURL - The Data URL to transform.
		   * @returns {ArrayBuffer} The result array buffer.
		   */
		  function dataURLToArrayBuffer(dataURL) {
		    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
		    var binary = atob(base64);
		    var arrayBuffer = new ArrayBuffer(binary.length);
		    var uint8 = new Uint8Array(arrayBuffer);
		    forEach(uint8, function (value, i) {
		      uint8[i] = binary.charCodeAt(i);
		    });
		    return arrayBuffer;
		  }

		  /**
		   * Transform array buffer to Data URL.
		   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
		   * @param {string} mimeType - The mime type of the Data URL.
		   * @returns {string} The result Data URL.
		   */
		  function arrayBufferToDataURL(arrayBuffer, mimeType) {
		    var chunks = [];

		    // Chunk Typed Array for better performance (#435)
		    var chunkSize = 8192;
		    var uint8 = new Uint8Array(arrayBuffer);
		    while (uint8.length > 0) {
		      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
		      // eslint-disable-next-line prefer-spread
		      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
		      uint8 = uint8.subarray(chunkSize);
		    }
		    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
		  }

		  /**
		   * Get orientation value from given array buffer.
		   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
		   * @returns {number} The read orientation value.
		   */
		  function resetAndGetOrientation(arrayBuffer) {
		    var dataView = new DataView(arrayBuffer);
		    var orientation;

		    // Ignores range error when the image does not have correct Exif information
		    try {
		      var littleEndian;
		      var app1Start;
		      var ifdStart;

		      // Only handle JPEG image (start by 0xFFD8)
		      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
		        var length = dataView.byteLength;
		        var offset = 2;
		        while (offset + 1 < length) {
		          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
		            app1Start = offset;
		            break;
		          }
		          offset += 1;
		        }
		      }
		      if (app1Start) {
		        var exifIDCode = app1Start + 4;
		        var tiffOffset = app1Start + 10;
		        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
		          var endianness = dataView.getUint16(tiffOffset);
		          littleEndian = endianness === 0x4949;
		          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
		            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
		              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
		              if (firstIFDOffset >= 0x00000008) {
		                ifdStart = tiffOffset + firstIFDOffset;
		              }
		            }
		          }
		        }
		      }
		      if (ifdStart) {
		        var _length = dataView.getUint16(ifdStart, littleEndian);
		        var _offset;
		        var i;
		        for (i = 0; i < _length; i += 1) {
		          _offset = ifdStart + i * 12 + 2;
		          if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
		            // 8 is the offset of the current tag's value
		            _offset += 8;

		            // Get the original orientation value
		            orientation = dataView.getUint16(_offset, littleEndian);

		            // Override the orientation with its default value
		            dataView.setUint16(_offset, 1, littleEndian);
		            break;
		          }
		        }
		      }
		    } catch (error) {
		      orientation = 1;
		    }
		    return orientation;
		  }

		  /**
		   * Parse Exif Orientation value.
		   * @param {number} orientation - The orientation to parse.
		   * @returns {Object} The parsed result.
		   */
		  function parseOrientation(orientation) {
		    var rotate = 0;
		    var scaleX = 1;
		    var scaleY = 1;
		    switch (orientation) {
		      // Flip horizontal
		      case 2:
		        scaleX = -1;
		        break;

		      // Rotate left 180°
		      case 3:
		        rotate = -180;
		        break;

		      // Flip vertical
		      case 4:
		        scaleY = -1;
		        break;

		      // Flip vertical and rotate right 90°
		      case 5:
		        rotate = 90;
		        scaleY = -1;
		        break;

		      // Rotate right 90°
		      case 6:
		        rotate = 90;
		        break;

		      // Flip horizontal and rotate right 90°
		      case 7:
		        rotate = 90;
		        scaleX = -1;
		        break;

		      // Rotate left 90°
		      case 8:
		        rotate = -90;
		        break;
		    }
		    return {
		      rotate: rotate,
		      scaleX: scaleX,
		      scaleY: scaleY
		    };
		  }

		  var render = {
		    render: function render() {
		      this.initContainer();
		      this.initCanvas();
		      this.initCropBox();
		      this.renderCanvas();
		      if (this.cropped) {
		        this.renderCropBox();
		      }
		    },
		    initContainer: function initContainer() {
		      var element = this.element,
		        options = this.options,
		        container = this.container,
		        cropper = this.cropper;
		      var minWidth = Number(options.minContainerWidth);
		      var minHeight = Number(options.minContainerHeight);
		      addClass(cropper, CLASS_HIDDEN);
		      removeClass(element, CLASS_HIDDEN);
		      var containerData = {
		        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
		        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
		      };
		      this.containerData = containerData;
		      setStyle(cropper, {
		        width: containerData.width,
		        height: containerData.height
		      });
		      addClass(element, CLASS_HIDDEN);
		      removeClass(cropper, CLASS_HIDDEN);
		    },
		    // Canvas (image wrapper)
		    initCanvas: function initCanvas() {
		      var containerData = this.containerData,
		        imageData = this.imageData;
		      var viewMode = this.options.viewMode;
		      var rotated = Math.abs(imageData.rotate) % 180 === 90;
		      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
		      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
		      var aspectRatio = naturalWidth / naturalHeight;
		      var canvasWidth = containerData.width;
		      var canvasHeight = containerData.height;
		      if (containerData.height * aspectRatio > containerData.width) {
		        if (viewMode === 3) {
		          canvasWidth = containerData.height * aspectRatio;
		        } else {
		          canvasHeight = containerData.width / aspectRatio;
		        }
		      } else if (viewMode === 3) {
		        canvasHeight = containerData.width / aspectRatio;
		      } else {
		        canvasWidth = containerData.height * aspectRatio;
		      }
		      var canvasData = {
		        aspectRatio: aspectRatio,
		        naturalWidth: naturalWidth,
		        naturalHeight: naturalHeight,
		        width: canvasWidth,
		        height: canvasHeight
		      };
		      this.canvasData = canvasData;
		      this.limited = viewMode === 1 || viewMode === 2;
		      this.limitCanvas(true, true);
		      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
		      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
		      canvasData.left = (containerData.width - canvasData.width) / 2;
		      canvasData.top = (containerData.height - canvasData.height) / 2;
		      canvasData.oldLeft = canvasData.left;
		      canvasData.oldTop = canvasData.top;
		      this.initialCanvasData = assign({}, canvasData);
		    },
		    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
		      var options = this.options,
		        containerData = this.containerData,
		        canvasData = this.canvasData,
		        cropBoxData = this.cropBoxData;
		      var viewMode = options.viewMode;
		      var aspectRatio = canvasData.aspectRatio;
		      var cropped = this.cropped && cropBoxData;
		      if (sizeLimited) {
		        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
		        var minCanvasHeight = Number(options.minCanvasHeight) || 0;
		        if (viewMode > 1) {
		          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
		          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
		          if (viewMode === 3) {
		            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
		              minCanvasWidth = minCanvasHeight * aspectRatio;
		            } else {
		              minCanvasHeight = minCanvasWidth / aspectRatio;
		            }
		          }
		        } else if (viewMode > 0) {
		          if (minCanvasWidth) {
		            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
		          } else if (minCanvasHeight) {
		            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
		          } else if (cropped) {
		            minCanvasWidth = cropBoxData.width;
		            minCanvasHeight = cropBoxData.height;
		            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
		              minCanvasWidth = minCanvasHeight * aspectRatio;
		            } else {
		              minCanvasHeight = minCanvasWidth / aspectRatio;
		            }
		          }
		        }
		        var _getAdjustedSizes = getAdjustedSizes({
		          aspectRatio: aspectRatio,
		          width: minCanvasWidth,
		          height: minCanvasHeight
		        });
		        minCanvasWidth = _getAdjustedSizes.width;
		        minCanvasHeight = _getAdjustedSizes.height;
		        canvasData.minWidth = minCanvasWidth;
		        canvasData.minHeight = minCanvasHeight;
		        canvasData.maxWidth = Infinity;
		        canvasData.maxHeight = Infinity;
		      }
		      if (positionLimited) {
		        if (viewMode > (cropped ? 0 : 1)) {
		          var newCanvasLeft = containerData.width - canvasData.width;
		          var newCanvasTop = containerData.height - canvasData.height;
		          canvasData.minLeft = Math.min(0, newCanvasLeft);
		          canvasData.minTop = Math.min(0, newCanvasTop);
		          canvasData.maxLeft = Math.max(0, newCanvasLeft);
		          canvasData.maxTop = Math.max(0, newCanvasTop);
		          if (cropped && this.limited) {
		            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
		            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
		            canvasData.maxLeft = cropBoxData.left;
		            canvasData.maxTop = cropBoxData.top;
		            if (viewMode === 2) {
		              if (canvasData.width >= containerData.width) {
		                canvasData.minLeft = Math.min(0, newCanvasLeft);
		                canvasData.maxLeft = Math.max(0, newCanvasLeft);
		              }
		              if (canvasData.height >= containerData.height) {
		                canvasData.minTop = Math.min(0, newCanvasTop);
		                canvasData.maxTop = Math.max(0, newCanvasTop);
		              }
		            }
		          }
		        } else {
		          canvasData.minLeft = -canvasData.width;
		          canvasData.minTop = -canvasData.height;
		          canvasData.maxLeft = containerData.width;
		          canvasData.maxTop = containerData.height;
		        }
		      }
		    },
		    renderCanvas: function renderCanvas(changed, transformed) {
		      var canvasData = this.canvasData,
		        imageData = this.imageData;
		      if (transformed) {
		        var _getRotatedSizes = getRotatedSizes({
		            width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
		            height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
		            degree: imageData.rotate || 0
		          }),
		          naturalWidth = _getRotatedSizes.width,
		          naturalHeight = _getRotatedSizes.height;
		        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
		        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
		        canvasData.left -= (width - canvasData.width) / 2;
		        canvasData.top -= (height - canvasData.height) / 2;
		        canvasData.width = width;
		        canvasData.height = height;
		        canvasData.aspectRatio = naturalWidth / naturalHeight;
		        canvasData.naturalWidth = naturalWidth;
		        canvasData.naturalHeight = naturalHeight;
		        this.limitCanvas(true, false);
		      }
		      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
		        canvasData.left = canvasData.oldLeft;
		      }
		      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
		        canvasData.top = canvasData.oldTop;
		      }
		      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
		      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
		      this.limitCanvas(false, true);
		      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
		      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
		      canvasData.oldLeft = canvasData.left;
		      canvasData.oldTop = canvasData.top;
		      setStyle(this.canvas, assign({
		        width: canvasData.width,
		        height: canvasData.height
		      }, getTransforms({
		        translateX: canvasData.left,
		        translateY: canvasData.top
		      })));
		      this.renderImage(changed);
		      if (this.cropped && this.limited) {
		        this.limitCropBox(true, true);
		      }
		    },
		    renderImage: function renderImage(changed) {
		      var canvasData = this.canvasData,
		        imageData = this.imageData;
		      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
		      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
		      assign(imageData, {
		        width: width,
		        height: height,
		        left: (canvasData.width - width) / 2,
		        top: (canvasData.height - height) / 2
		      });
		      setStyle(this.image, assign({
		        width: imageData.width,
		        height: imageData.height
		      }, getTransforms(assign({
		        translateX: imageData.left,
		        translateY: imageData.top
		      }, imageData))));
		      if (changed) {
		        this.output();
		      }
		    },
		    initCropBox: function initCropBox() {
		      var options = this.options,
		        canvasData = this.canvasData;
		      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
		      var autoCropArea = Number(options.autoCropArea) || 0.8;
		      var cropBoxData = {
		        width: canvasData.width,
		        height: canvasData.height
		      };
		      if (aspectRatio) {
		        if (canvasData.height * aspectRatio > canvasData.width) {
		          cropBoxData.height = cropBoxData.width / aspectRatio;
		        } else {
		          cropBoxData.width = cropBoxData.height * aspectRatio;
		        }
		      }
		      this.cropBoxData = cropBoxData;
		      this.limitCropBox(true, true);

		      // Initialize auto crop area
		      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
		      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

		      // The width/height of auto crop area must large than "minWidth/Height"
		      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
		      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
		      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
		      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
		      cropBoxData.oldLeft = cropBoxData.left;
		      cropBoxData.oldTop = cropBoxData.top;
		      this.initialCropBoxData = assign({}, cropBoxData);
		    },
		    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
		      var options = this.options,
		        containerData = this.containerData,
		        canvasData = this.canvasData,
		        cropBoxData = this.cropBoxData,
		        limited = this.limited;
		      var aspectRatio = options.aspectRatio;
		      if (sizeLimited) {
		        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
		        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
		        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
		        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;

		        // The min/maxCropBoxWidth/Height must be less than container's width/height
		        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
		        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
		        if (aspectRatio) {
		          if (minCropBoxWidth && minCropBoxHeight) {
		            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
		              minCropBoxHeight = minCropBoxWidth / aspectRatio;
		            } else {
		              minCropBoxWidth = minCropBoxHeight * aspectRatio;
		            }
		          } else if (minCropBoxWidth) {
		            minCropBoxHeight = minCropBoxWidth / aspectRatio;
		          } else if (minCropBoxHeight) {
		            minCropBoxWidth = minCropBoxHeight * aspectRatio;
		          }
		          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
		            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
		          } else {
		            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
		          }
		        }

		        // The minWidth/Height must be less than maxWidth/Height
		        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
		        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
		        cropBoxData.maxWidth = maxCropBoxWidth;
		        cropBoxData.maxHeight = maxCropBoxHeight;
		      }
		      if (positionLimited) {
		        if (limited) {
		          cropBoxData.minLeft = Math.max(0, canvasData.left);
		          cropBoxData.minTop = Math.max(0, canvasData.top);
		          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
		          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
		        } else {
		          cropBoxData.minLeft = 0;
		          cropBoxData.minTop = 0;
		          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
		          cropBoxData.maxTop = containerData.height - cropBoxData.height;
		        }
		      }
		    },
		    renderCropBox: function renderCropBox() {
		      var options = this.options,
		        containerData = this.containerData,
		        cropBoxData = this.cropBoxData;
		      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
		        cropBoxData.left = cropBoxData.oldLeft;
		      }
		      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
		        cropBoxData.top = cropBoxData.oldTop;
		      }
		      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
		      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
		      this.limitCropBox(false, true);
		      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
		      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
		      cropBoxData.oldLeft = cropBoxData.left;
		      cropBoxData.oldTop = cropBoxData.top;
		      if (options.movable && options.cropBoxMovable) {
		        // Turn to move the canvas when the crop box is equal to the container
		        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
		      }
		      setStyle(this.cropBox, assign({
		        width: cropBoxData.width,
		        height: cropBoxData.height
		      }, getTransforms({
		        translateX: cropBoxData.left,
		        translateY: cropBoxData.top
		      })));
		      if (this.cropped && this.limited) {
		        this.limitCanvas(true, true);
		      }
		      if (!this.disabled) {
		        this.output();
		      }
		    },
		    output: function output() {
		      this.preview();
		      dispatchEvent(this.element, EVENT_CROP, this.getData());
		    }
		  };

		  var preview = {
		    initPreview: function initPreview() {
		      var element = this.element,
		        crossOrigin = this.crossOrigin;
		      var preview = this.options.preview;
		      var url = crossOrigin ? this.crossOriginUrl : this.url;
		      var alt = element.alt || 'The image to preview';
		      var image = document.createElement('img');
		      if (crossOrigin) {
		        image.crossOrigin = crossOrigin;
		      }
		      image.src = url;
		      image.alt = alt;
		      this.viewBox.appendChild(image);
		      this.viewBoxImage = image;
		      if (!preview) {
		        return;
		      }
		      var previews = preview;
		      if (typeof preview === 'string') {
		        previews = element.ownerDocument.querySelectorAll(preview);
		      } else if (preview.querySelector) {
		        previews = [preview];
		      }
		      this.previews = previews;
		      forEach(previews, function (el) {
		        var img = document.createElement('img');

		        // Save the original size for recover
		        setData(el, DATA_PREVIEW, {
		          width: el.offsetWidth,
		          height: el.offsetHeight,
		          html: el.innerHTML
		        });
		        if (crossOrigin) {
		          img.crossOrigin = crossOrigin;
		        }
		        img.src = url;
		        img.alt = alt;

		        /**
		         * Override img element styles
		         * Add `display:block` to avoid margin top issue
		         * Add `height:auto` to override `height` attribute on IE8
		         * (Occur only when margin-top <= -height)
		         */
		        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
		        el.innerHTML = '';
		        el.appendChild(img);
		      });
		    },
		    resetPreview: function resetPreview() {
		      forEach(this.previews, function (element) {
		        var data = getData(element, DATA_PREVIEW);
		        setStyle(element, {
		          width: data.width,
		          height: data.height
		        });
		        element.innerHTML = data.html;
		        removeData(element, DATA_PREVIEW);
		      });
		    },
		    preview: function preview() {
		      var imageData = this.imageData,
		        canvasData = this.canvasData,
		        cropBoxData = this.cropBoxData;
		      var cropBoxWidth = cropBoxData.width,
		        cropBoxHeight = cropBoxData.height;
		      var width = imageData.width,
		        height = imageData.height;
		      var left = cropBoxData.left - canvasData.left - imageData.left;
		      var top = cropBoxData.top - canvasData.top - imageData.top;
		      if (!this.cropped || this.disabled) {
		        return;
		      }
		      setStyle(this.viewBoxImage, assign({
		        width: width,
		        height: height
		      }, getTransforms(assign({
		        translateX: -left,
		        translateY: -top
		      }, imageData))));
		      forEach(this.previews, function (element) {
		        var data = getData(element, DATA_PREVIEW);
		        var originalWidth = data.width;
		        var originalHeight = data.height;
		        var newWidth = originalWidth;
		        var newHeight = originalHeight;
		        var ratio = 1;
		        if (cropBoxWidth) {
		          ratio = originalWidth / cropBoxWidth;
		          newHeight = cropBoxHeight * ratio;
		        }
		        if (cropBoxHeight && newHeight > originalHeight) {
		          ratio = originalHeight / cropBoxHeight;
		          newWidth = cropBoxWidth * ratio;
		          newHeight = originalHeight;
		        }
		        setStyle(element, {
		          width: newWidth,
		          height: newHeight
		        });
		        setStyle(element.getElementsByTagName('img')[0], assign({
		          width: width * ratio,
		          height: height * ratio
		        }, getTransforms(assign({
		          translateX: -left * ratio,
		          translateY: -top * ratio
		        }, imageData))));
		      });
		    }
		  };

		  var events = {
		    bind: function bind() {
		      var element = this.element,
		        options = this.options,
		        cropper = this.cropper;
		      if (isFunction(options.cropstart)) {
		        addListener(element, EVENT_CROP_START, options.cropstart);
		      }
		      if (isFunction(options.cropmove)) {
		        addListener(element, EVENT_CROP_MOVE, options.cropmove);
		      }
		      if (isFunction(options.cropend)) {
		        addListener(element, EVENT_CROP_END, options.cropend);
		      }
		      if (isFunction(options.crop)) {
		        addListener(element, EVENT_CROP, options.crop);
		      }
		      if (isFunction(options.zoom)) {
		        addListener(element, EVENT_ZOOM, options.zoom);
		      }
		      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
		      if (options.zoomable && options.zoomOnWheel) {
		        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
		          passive: false,
		          capture: true
		        });
		      }
		      if (options.toggleDragModeOnDblclick) {
		        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
		      }
		      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
		      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
		      if (options.responsive) {
		        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
		      }
		    },
		    unbind: function unbind() {
		      var element = this.element,
		        options = this.options,
		        cropper = this.cropper;
		      if (isFunction(options.cropstart)) {
		        removeListener(element, EVENT_CROP_START, options.cropstart);
		      }
		      if (isFunction(options.cropmove)) {
		        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
		      }
		      if (isFunction(options.cropend)) {
		        removeListener(element, EVENT_CROP_END, options.cropend);
		      }
		      if (isFunction(options.crop)) {
		        removeListener(element, EVENT_CROP, options.crop);
		      }
		      if (isFunction(options.zoom)) {
		        removeListener(element, EVENT_ZOOM, options.zoom);
		      }
		      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
		      if (options.zoomable && options.zoomOnWheel) {
		        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
		          passive: false,
		          capture: true
		        });
		      }
		      if (options.toggleDragModeOnDblclick) {
		        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
		      }
		      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
		      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
		      if (options.responsive) {
		        removeListener(window, EVENT_RESIZE, this.onResize);
		      }
		    }
		  };

		  var handlers = {
		    resize: function resize() {
		      if (this.disabled) {
		        return;
		      }
		      var options = this.options,
		        container = this.container,
		        containerData = this.containerData;
		      var ratioX = container.offsetWidth / containerData.width;
		      var ratioY = container.offsetHeight / containerData.height;
		      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;

		      // Resize when width changed or height changed
		      if (ratio !== 1) {
		        var canvasData;
		        var cropBoxData;
		        if (options.restore) {
		          canvasData = this.getCanvasData();
		          cropBoxData = this.getCropBoxData();
		        }
		        this.render();
		        if (options.restore) {
		          this.setCanvasData(forEach(canvasData, function (n, i) {
		            canvasData[i] = n * ratio;
		          }));
		          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
		            cropBoxData[i] = n * ratio;
		          }));
		        }
		      }
		    },
		    dblclick: function dblclick() {
		      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
		        return;
		      }
		      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
		    },
		    wheel: function wheel(event) {
		      var _this = this;
		      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
		      var delta = 1;
		      if (this.disabled) {
		        return;
		      }
		      event.preventDefault();

		      // Limit wheel speed to prevent zoom too fast (#21)
		      if (this.wheeling) {
		        return;
		      }
		      this.wheeling = true;
		      setTimeout(function () {
		        _this.wheeling = false;
		      }, 50);
		      if (event.deltaY) {
		        delta = event.deltaY > 0 ? 1 : -1;
		      } else if (event.wheelDelta) {
		        delta = -event.wheelDelta / 120;
		      } else if (event.detail) {
		        delta = event.detail > 0 ? 1 : -1;
		      }
		      this.zoom(-delta * ratio, event);
		    },
		    cropStart: function cropStart(event) {
		      var buttons = event.buttons,
		        button = event.button;
		      if (this.disabled

		      // Handle mouse event and pointer event and ignore touch event
		      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && (
		      // No primary button (Usually the left button)
		      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0

		      // Open context menu
		      || event.ctrlKey)) {
		        return;
		      }
		      var options = this.options,
		        pointers = this.pointers;
		      var action;
		      if (event.changedTouches) {
		        // Handle touch event
		        forEach(event.changedTouches, function (touch) {
		          pointers[touch.identifier] = getPointer(touch);
		        });
		      } else {
		        // Handle mouse event and pointer event
		        pointers[event.pointerId || 0] = getPointer(event);
		      }
		      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
		        action = ACTION_ZOOM;
		      } else {
		        action = getData(event.target, DATA_ACTION);
		      }
		      if (!REGEXP_ACTIONS.test(action)) {
		        return;
		      }
		      if (dispatchEvent(this.element, EVENT_CROP_START, {
		        originalEvent: event,
		        action: action
		      }) === false) {
		        return;
		      }

		      // This line is required for preventing page zooming in iOS browsers
		      event.preventDefault();
		      this.action = action;
		      this.cropping = false;
		      if (action === ACTION_CROP) {
		        this.cropping = true;
		        addClass(this.dragBox, CLASS_MODAL);
		      }
		    },
		    cropMove: function cropMove(event) {
		      var action = this.action;
		      if (this.disabled || !action) {
		        return;
		      }
		      var pointers = this.pointers;
		      event.preventDefault();
		      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
		        originalEvent: event,
		        action: action
		      }) === false) {
		        return;
		      }
		      if (event.changedTouches) {
		        forEach(event.changedTouches, function (touch) {
		          // The first parameter should not be undefined (#432)
		          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
		        });
		      } else {
		        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
		      }
		      this.change(event);
		    },
		    cropEnd: function cropEnd(event) {
		      if (this.disabled) {
		        return;
		      }
		      var action = this.action,
		        pointers = this.pointers;
		      if (event.changedTouches) {
		        forEach(event.changedTouches, function (touch) {
		          delete pointers[touch.identifier];
		        });
		      } else {
		        delete pointers[event.pointerId || 0];
		      }
		      if (!action) {
		        return;
		      }
		      event.preventDefault();
		      if (!Object.keys(pointers).length) {
		        this.action = '';
		      }
		      if (this.cropping) {
		        this.cropping = false;
		        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
		      }
		      dispatchEvent(this.element, EVENT_CROP_END, {
		        originalEvent: event,
		        action: action
		      });
		    }
		  };

		  var change = {
		    change: function change(event) {
		      var options = this.options,
		        canvasData = this.canvasData,
		        containerData = this.containerData,
		        cropBoxData = this.cropBoxData,
		        pointers = this.pointers;
		      var action = this.action;
		      var aspectRatio = options.aspectRatio;
		      var left = cropBoxData.left,
		        top = cropBoxData.top,
		        width = cropBoxData.width,
		        height = cropBoxData.height;
		      var right = left + width;
		      var bottom = top + height;
		      var minLeft = 0;
		      var minTop = 0;
		      var maxWidth = containerData.width;
		      var maxHeight = containerData.height;
		      var renderable = true;
		      var offset;

		      // Locking aspect ratio in "free mode" by holding shift key
		      if (!aspectRatio && event.shiftKey) {
		        aspectRatio = width && height ? width / height : 1;
		      }
		      if (this.limited) {
		        minLeft = cropBoxData.minLeft;
		        minTop = cropBoxData.minTop;
		        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
		        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
		      }
		      var pointer = pointers[Object.keys(pointers)[0]];
		      var range = {
		        x: pointer.endX - pointer.startX,
		        y: pointer.endY - pointer.startY
		      };
		      var check = function check(side) {
		        switch (side) {
		          case ACTION_EAST:
		            if (right + range.x > maxWidth) {
		              range.x = maxWidth - right;
		            }
		            break;
		          case ACTION_WEST:
		            if (left + range.x < minLeft) {
		              range.x = minLeft - left;
		            }
		            break;
		          case ACTION_NORTH:
		            if (top + range.y < minTop) {
		              range.y = minTop - top;
		            }
		            break;
		          case ACTION_SOUTH:
		            if (bottom + range.y > maxHeight) {
		              range.y = maxHeight - bottom;
		            }
		            break;
		        }
		      };
		      switch (action) {
		        // Move crop box
		        case ACTION_ALL:
		          left += range.x;
		          top += range.y;
		          break;

		        // Resize crop box
		        case ACTION_EAST:
		          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
		            renderable = false;
		            break;
		          }
		          check(ACTION_EAST);
		          width += range.x;
		          if (width < 0) {
		            action = ACTION_WEST;
		            width = -width;
		            left -= width;
		          }
		          if (aspectRatio) {
		            height = width / aspectRatio;
		            top += (cropBoxData.height - height) / 2;
		          }
		          break;
		        case ACTION_NORTH:
		          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
		            renderable = false;
		            break;
		          }
		          check(ACTION_NORTH);
		          height -= range.y;
		          top += range.y;
		          if (height < 0) {
		            action = ACTION_SOUTH;
		            height = -height;
		            top -= height;
		          }
		          if (aspectRatio) {
		            width = height * aspectRatio;
		            left += (cropBoxData.width - width) / 2;
		          }
		          break;
		        case ACTION_WEST:
		          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
		            renderable = false;
		            break;
		          }
		          check(ACTION_WEST);
		          width -= range.x;
		          left += range.x;
		          if (width < 0) {
		            action = ACTION_EAST;
		            width = -width;
		            left -= width;
		          }
		          if (aspectRatio) {
		            height = width / aspectRatio;
		            top += (cropBoxData.height - height) / 2;
		          }
		          break;
		        case ACTION_SOUTH:
		          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
		            renderable = false;
		            break;
		          }
		          check(ACTION_SOUTH);
		          height += range.y;
		          if (height < 0) {
		            action = ACTION_NORTH;
		            height = -height;
		            top -= height;
		          }
		          if (aspectRatio) {
		            width = height * aspectRatio;
		            left += (cropBoxData.width - width) / 2;
		          }
		          break;
		        case ACTION_NORTH_EAST:
		          if (aspectRatio) {
		            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
		              renderable = false;
		              break;
		            }
		            check(ACTION_NORTH);
		            height -= range.y;
		            top += range.y;
		            width = height * aspectRatio;
		          } else {
		            check(ACTION_NORTH);
		            check(ACTION_EAST);
		            if (range.x >= 0) {
		              if (right < maxWidth) {
		                width += range.x;
		              } else if (range.y <= 0 && top <= minTop) {
		                renderable = false;
		              }
		            } else {
		              width += range.x;
		            }
		            if (range.y <= 0) {
		              if (top > minTop) {
		                height -= range.y;
		                top += range.y;
		              }
		            } else {
		              height -= range.y;
		              top += range.y;
		            }
		          }
		          if (width < 0 && height < 0) {
		            action = ACTION_SOUTH_WEST;
		            height = -height;
		            width = -width;
		            top -= height;
		            left -= width;
		          } else if (width < 0) {
		            action = ACTION_NORTH_WEST;
		            width = -width;
		            left -= width;
		          } else if (height < 0) {
		            action = ACTION_SOUTH_EAST;
		            height = -height;
		            top -= height;
		          }
		          break;
		        case ACTION_NORTH_WEST:
		          if (aspectRatio) {
		            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
		              renderable = false;
		              break;
		            }
		            check(ACTION_NORTH);
		            height -= range.y;
		            top += range.y;
		            width = height * aspectRatio;
		            left += cropBoxData.width - width;
		          } else {
		            check(ACTION_NORTH);
		            check(ACTION_WEST);
		            if (range.x <= 0) {
		              if (left > minLeft) {
		                width -= range.x;
		                left += range.x;
		              } else if (range.y <= 0 && top <= minTop) {
		                renderable = false;
		              }
		            } else {
		              width -= range.x;
		              left += range.x;
		            }
		            if (range.y <= 0) {
		              if (top > minTop) {
		                height -= range.y;
		                top += range.y;
		              }
		            } else {
		              height -= range.y;
		              top += range.y;
		            }
		          }
		          if (width < 0 && height < 0) {
		            action = ACTION_SOUTH_EAST;
		            height = -height;
		            width = -width;
		            top -= height;
		            left -= width;
		          } else if (width < 0) {
		            action = ACTION_NORTH_EAST;
		            width = -width;
		            left -= width;
		          } else if (height < 0) {
		            action = ACTION_SOUTH_WEST;
		            height = -height;
		            top -= height;
		          }
		          break;
		        case ACTION_SOUTH_WEST:
		          if (aspectRatio) {
		            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
		              renderable = false;
		              break;
		            }
		            check(ACTION_WEST);
		            width -= range.x;
		            left += range.x;
		            height = width / aspectRatio;
		          } else {
		            check(ACTION_SOUTH);
		            check(ACTION_WEST);
		            if (range.x <= 0) {
		              if (left > minLeft) {
		                width -= range.x;
		                left += range.x;
		              } else if (range.y >= 0 && bottom >= maxHeight) {
		                renderable = false;
		              }
		            } else {
		              width -= range.x;
		              left += range.x;
		            }
		            if (range.y >= 0) {
		              if (bottom < maxHeight) {
		                height += range.y;
		              }
		            } else {
		              height += range.y;
		            }
		          }
		          if (width < 0 && height < 0) {
		            action = ACTION_NORTH_EAST;
		            height = -height;
		            width = -width;
		            top -= height;
		            left -= width;
		          } else if (width < 0) {
		            action = ACTION_SOUTH_EAST;
		            width = -width;
		            left -= width;
		          } else if (height < 0) {
		            action = ACTION_NORTH_WEST;
		            height = -height;
		            top -= height;
		          }
		          break;
		        case ACTION_SOUTH_EAST:
		          if (aspectRatio) {
		            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
		              renderable = false;
		              break;
		            }
		            check(ACTION_EAST);
		            width += range.x;
		            height = width / aspectRatio;
		          } else {
		            check(ACTION_SOUTH);
		            check(ACTION_EAST);
		            if (range.x >= 0) {
		              if (right < maxWidth) {
		                width += range.x;
		              } else if (range.y >= 0 && bottom >= maxHeight) {
		                renderable = false;
		              }
		            } else {
		              width += range.x;
		            }
		            if (range.y >= 0) {
		              if (bottom < maxHeight) {
		                height += range.y;
		              }
		            } else {
		              height += range.y;
		            }
		          }
		          if (width < 0 && height < 0) {
		            action = ACTION_NORTH_WEST;
		            height = -height;
		            width = -width;
		            top -= height;
		            left -= width;
		          } else if (width < 0) {
		            action = ACTION_SOUTH_WEST;
		            width = -width;
		            left -= width;
		          } else if (height < 0) {
		            action = ACTION_NORTH_EAST;
		            height = -height;
		            top -= height;
		          }
		          break;

		        // Move canvas
		        case ACTION_MOVE:
		          this.move(range.x, range.y);
		          renderable = false;
		          break;

		        // Zoom canvas
		        case ACTION_ZOOM:
		          this.zoom(getMaxZoomRatio(pointers), event);
		          renderable = false;
		          break;

		        // Create crop box
		        case ACTION_CROP:
		          if (!range.x || !range.y) {
		            renderable = false;
		            break;
		          }
		          offset = getOffset(this.cropper);
		          left = pointer.startX - offset.left;
		          top = pointer.startY - offset.top;
		          width = cropBoxData.minWidth;
		          height = cropBoxData.minHeight;
		          if (range.x > 0) {
		            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
		          } else if (range.x < 0) {
		            left -= width;
		            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
		          }
		          if (range.y < 0) {
		            top -= height;
		          }

		          // Show the crop box if is hidden
		          if (!this.cropped) {
		            removeClass(this.cropBox, CLASS_HIDDEN);
		            this.cropped = true;
		            if (this.limited) {
		              this.limitCropBox(true, true);
		            }
		          }
		          break;
		      }
		      if (renderable) {
		        cropBoxData.width = width;
		        cropBoxData.height = height;
		        cropBoxData.left = left;
		        cropBoxData.top = top;
		        this.action = action;
		        this.renderCropBox();
		      }

		      // Override
		      forEach(pointers, function (p) {
		        p.startX = p.endX;
		        p.startY = p.endY;
		      });
		    }
		  };

		  var methods = {
		    // Show the crop box manually
		    crop: function crop() {
		      if (this.ready && !this.cropped && !this.disabled) {
		        this.cropped = true;
		        this.limitCropBox(true, true);
		        if (this.options.modal) {
		          addClass(this.dragBox, CLASS_MODAL);
		        }
		        removeClass(this.cropBox, CLASS_HIDDEN);
		        this.setCropBoxData(this.initialCropBoxData);
		      }
		      return this;
		    },
		    // Reset the image and crop box to their initial states
		    reset: function reset() {
		      if (this.ready && !this.disabled) {
		        this.imageData = assign({}, this.initialImageData);
		        this.canvasData = assign({}, this.initialCanvasData);
		        this.cropBoxData = assign({}, this.initialCropBoxData);
		        this.renderCanvas();
		        if (this.cropped) {
		          this.renderCropBox();
		        }
		      }
		      return this;
		    },
		    // Clear the crop box
		    clear: function clear() {
		      if (this.cropped && !this.disabled) {
		        assign(this.cropBoxData, {
		          left: 0,
		          top: 0,
		          width: 0,
		          height: 0
		        });
		        this.cropped = false;
		        this.renderCropBox();
		        this.limitCanvas(true, true);

		        // Render canvas after crop box rendered
		        this.renderCanvas();
		        removeClass(this.dragBox, CLASS_MODAL);
		        addClass(this.cropBox, CLASS_HIDDEN);
		      }
		      return this;
		    },
		    /**
		     * Replace the image's src and rebuild the cropper
		     * @param {string} url - The new URL.
		     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
		     * @returns {Cropper} this
		     */
		    replace: function replace(url) {
		      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		      if (!this.disabled && url) {
		        if (this.isImg) {
		          this.element.src = url;
		        }
		        if (hasSameSize) {
		          this.url = url;
		          this.image.src = url;
		          if (this.ready) {
		            this.viewBoxImage.src = url;
		            forEach(this.previews, function (element) {
		              element.getElementsByTagName('img')[0].src = url;
		            });
		          }
		        } else {
		          if (this.isImg) {
		            this.replaced = true;
		          }
		          this.options.data = null;
		          this.uncreate();
		          this.load(url);
		        }
		      }
		      return this;
		    },
		    // Enable (unfreeze) the cropper
		    enable: function enable() {
		      if (this.ready && this.disabled) {
		        this.disabled = false;
		        removeClass(this.cropper, CLASS_DISABLED);
		      }
		      return this;
		    },
		    // Disable (freeze) the cropper
		    disable: function disable() {
		      if (this.ready && !this.disabled) {
		        this.disabled = true;
		        addClass(this.cropper, CLASS_DISABLED);
		      }
		      return this;
		    },
		    /**
		     * Destroy the cropper and remove the instance from the image
		     * @returns {Cropper} this
		     */
		    destroy: function destroy() {
		      var element = this.element;
		      if (!element[NAMESPACE]) {
		        return this;
		      }
		      element[NAMESPACE] = undefined;
		      if (this.isImg && this.replaced) {
		        element.src = this.originalUrl;
		      }
		      this.uncreate();
		      return this;
		    },
		    /**
		     * Move the canvas with relative offsets
		     * @param {number} offsetX - The relative offset distance on the x-axis.
		     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
		     * @returns {Cropper} this
		     */
		    move: function move(offsetX) {
		      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
		      var _this$canvasData = this.canvasData,
		        left = _this$canvasData.left,
		        top = _this$canvasData.top;
		      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
		    },
		    /**
		     * Move the canvas to an absolute point
		     * @param {number} x - The x-axis coordinate.
		     * @param {number} [y=x] - The y-axis coordinate.
		     * @returns {Cropper} this
		     */
		    moveTo: function moveTo(x) {
		      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
		      var canvasData = this.canvasData;
		      var changed = false;
		      x = Number(x);
		      y = Number(y);
		      if (this.ready && !this.disabled && this.options.movable) {
		        if (isNumber(x)) {
		          canvasData.left = x;
		          changed = true;
		        }
		        if (isNumber(y)) {
		          canvasData.top = y;
		          changed = true;
		        }
		        if (changed) {
		          this.renderCanvas(true);
		        }
		      }
		      return this;
		    },
		    /**
		     * Zoom the canvas with a relative ratio
		     * @param {number} ratio - The target ratio.
		     * @param {Event} _originalEvent - The original event if any.
		     * @returns {Cropper} this
		     */
		    zoom: function zoom(ratio, _originalEvent) {
		      var canvasData = this.canvasData;
		      ratio = Number(ratio);
		      if (ratio < 0) {
		        ratio = 1 / (1 - ratio);
		      } else {
		        ratio = 1 + ratio;
		      }
		      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
		    },
		    /**
		     * Zoom the canvas to an absolute ratio
		     * @param {number} ratio - The target ratio.
		     * @param {Object} pivot - The zoom pivot point coordinate.
		     * @param {Event} _originalEvent - The original event if any.
		     * @returns {Cropper} this
		     */
		    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
		      var options = this.options,
		        canvasData = this.canvasData;
		      var width = canvasData.width,
		        height = canvasData.height,
		        naturalWidth = canvasData.naturalWidth,
		        naturalHeight = canvasData.naturalHeight;
		      ratio = Number(ratio);
		      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
		        var newWidth = naturalWidth * ratio;
		        var newHeight = naturalHeight * ratio;
		        if (dispatchEvent(this.element, EVENT_ZOOM, {
		          ratio: ratio,
		          oldRatio: width / naturalWidth,
		          originalEvent: _originalEvent
		        }) === false) {
		          return this;
		        }
		        if (_originalEvent) {
		          var pointers = this.pointers;
		          var offset = getOffset(this.cropper);
		          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
		            pageX: _originalEvent.pageX,
		            pageY: _originalEvent.pageY
		          };

		          // Zoom from the triggering point of the event
		          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
		          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
		        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
		          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
		          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
		        } else {
		          // Zoom from the center of the canvas
		          canvasData.left -= (newWidth - width) / 2;
		          canvasData.top -= (newHeight - height) / 2;
		        }
		        canvasData.width = newWidth;
		        canvasData.height = newHeight;
		        this.renderCanvas(true);
		      }
		      return this;
		    },
		    /**
		     * Rotate the canvas with a relative degree
		     * @param {number} degree - The rotate degree.
		     * @returns {Cropper} this
		     */
		    rotate: function rotate(degree) {
		      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
		    },
		    /**
		     * Rotate the canvas to an absolute degree
		     * @param {number} degree - The rotate degree.
		     * @returns {Cropper} this
		     */
		    rotateTo: function rotateTo(degree) {
		      degree = Number(degree);
		      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
		        this.imageData.rotate = degree % 360;
		        this.renderCanvas(true, true);
		      }
		      return this;
		    },
		    /**
		     * Scale the image on the x-axis.
		     * @param {number} scaleX - The scale ratio on the x-axis.
		     * @returns {Cropper} this
		     */
		    scaleX: function scaleX(_scaleX) {
		      var scaleY = this.imageData.scaleY;
		      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
		    },
		    /**
		     * Scale the image on the y-axis.
		     * @param {number} scaleY - The scale ratio on the y-axis.
		     * @returns {Cropper} this
		     */
		    scaleY: function scaleY(_scaleY) {
		      var scaleX = this.imageData.scaleX;
		      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
		    },
		    /**
		     * Scale the image
		     * @param {number} scaleX - The scale ratio on the x-axis.
		     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
		     * @returns {Cropper} this
		     */
		    scale: function scale(scaleX) {
		      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
		      var imageData = this.imageData;
		      var transformed = false;
		      scaleX = Number(scaleX);
		      scaleY = Number(scaleY);
		      if (this.ready && !this.disabled && this.options.scalable) {
		        if (isNumber(scaleX)) {
		          imageData.scaleX = scaleX;
		          transformed = true;
		        }
		        if (isNumber(scaleY)) {
		          imageData.scaleY = scaleY;
		          transformed = true;
		        }
		        if (transformed) {
		          this.renderCanvas(true, true);
		        }
		      }
		      return this;
		    },
		    /**
		     * Get the cropped area position and size data (base on the original image)
		     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
		     * @returns {Object} The result cropped data.
		     */
		    getData: function getData() {
		      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
		      var options = this.options,
		        imageData = this.imageData,
		        canvasData = this.canvasData,
		        cropBoxData = this.cropBoxData;
		      var data;
		      if (this.ready && this.cropped) {
		        data = {
		          x: cropBoxData.left - canvasData.left,
		          y: cropBoxData.top - canvasData.top,
		          width: cropBoxData.width,
		          height: cropBoxData.height
		        };
		        var ratio = imageData.width / imageData.naturalWidth;
		        forEach(data, function (n, i) {
		          data[i] = n / ratio;
		        });
		        if (rounded) {
		          // In case rounding off leads to extra 1px in right or bottom border
		          // we should round the top-left corner and the dimension (#343).
		          var bottom = Math.round(data.y + data.height);
		          var right = Math.round(data.x + data.width);
		          data.x = Math.round(data.x);
		          data.y = Math.round(data.y);
		          data.width = right - data.x;
		          data.height = bottom - data.y;
		        }
		      } else {
		        data = {
		          x: 0,
		          y: 0,
		          width: 0,
		          height: 0
		        };
		      }
		      if (options.rotatable) {
		        data.rotate = imageData.rotate || 0;
		      }
		      if (options.scalable) {
		        data.scaleX = imageData.scaleX || 1;
		        data.scaleY = imageData.scaleY || 1;
		      }
		      return data;
		    },
		    /**
		     * Set the cropped area position and size with new data
		     * @param {Object} data - The new data.
		     * @returns {Cropper} this
		     */
		    setData: function setData(data) {
		      var options = this.options,
		        imageData = this.imageData,
		        canvasData = this.canvasData;
		      var cropBoxData = {};
		      if (this.ready && !this.disabled && isPlainObject(data)) {
		        var transformed = false;
		        if (options.rotatable) {
		          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
		            imageData.rotate = data.rotate;
		            transformed = true;
		          }
		        }
		        if (options.scalable) {
		          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
		            imageData.scaleX = data.scaleX;
		            transformed = true;
		          }
		          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
		            imageData.scaleY = data.scaleY;
		            transformed = true;
		          }
		        }
		        if (transformed) {
		          this.renderCanvas(true, true);
		        }
		        var ratio = imageData.width / imageData.naturalWidth;
		        if (isNumber(data.x)) {
		          cropBoxData.left = data.x * ratio + canvasData.left;
		        }
		        if (isNumber(data.y)) {
		          cropBoxData.top = data.y * ratio + canvasData.top;
		        }
		        if (isNumber(data.width)) {
		          cropBoxData.width = data.width * ratio;
		        }
		        if (isNumber(data.height)) {
		          cropBoxData.height = data.height * ratio;
		        }
		        this.setCropBoxData(cropBoxData);
		      }
		      return this;
		    },
		    /**
		     * Get the container size data.
		     * @returns {Object} The result container data.
		     */
		    getContainerData: function getContainerData() {
		      return this.ready ? assign({}, this.containerData) : {};
		    },
		    /**
		     * Get the image position and size data.
		     * @returns {Object} The result image data.
		     */
		    getImageData: function getImageData() {
		      return this.sized ? assign({}, this.imageData) : {};
		    },
		    /**
		     * Get the canvas position and size data.
		     * @returns {Object} The result canvas data.
		     */
		    getCanvasData: function getCanvasData() {
		      var canvasData = this.canvasData;
		      var data = {};
		      if (this.ready) {
		        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
		          data[n] = canvasData[n];
		        });
		      }
		      return data;
		    },
		    /**
		     * Set the canvas position and size with new data.
		     * @param {Object} data - The new canvas data.
		     * @returns {Cropper} this
		     */
		    setCanvasData: function setCanvasData(data) {
		      var canvasData = this.canvasData;
		      var aspectRatio = canvasData.aspectRatio;
		      if (this.ready && !this.disabled && isPlainObject(data)) {
		        if (isNumber(data.left)) {
		          canvasData.left = data.left;
		        }
		        if (isNumber(data.top)) {
		          canvasData.top = data.top;
		        }
		        if (isNumber(data.width)) {
		          canvasData.width = data.width;
		          canvasData.height = data.width / aspectRatio;
		        } else if (isNumber(data.height)) {
		          canvasData.height = data.height;
		          canvasData.width = data.height * aspectRatio;
		        }
		        this.renderCanvas(true);
		      }
		      return this;
		    },
		    /**
		     * Get the crop box position and size data.
		     * @returns {Object} The result crop box data.
		     */
		    getCropBoxData: function getCropBoxData() {
		      var cropBoxData = this.cropBoxData;
		      var data;
		      if (this.ready && this.cropped) {
		        data = {
		          left: cropBoxData.left,
		          top: cropBoxData.top,
		          width: cropBoxData.width,
		          height: cropBoxData.height
		        };
		      }
		      return data || {};
		    },
		    /**
		     * Set the crop box position and size with new data.
		     * @param {Object} data - The new crop box data.
		     * @returns {Cropper} this
		     */
		    setCropBoxData: function setCropBoxData(data) {
		      var cropBoxData = this.cropBoxData;
		      var aspectRatio = this.options.aspectRatio;
		      var widthChanged;
		      var heightChanged;
		      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
		        if (isNumber(data.left)) {
		          cropBoxData.left = data.left;
		        }
		        if (isNumber(data.top)) {
		          cropBoxData.top = data.top;
		        }
		        if (isNumber(data.width) && data.width !== cropBoxData.width) {
		          widthChanged = true;
		          cropBoxData.width = data.width;
		        }
		        if (isNumber(data.height) && data.height !== cropBoxData.height) {
		          heightChanged = true;
		          cropBoxData.height = data.height;
		        }
		        if (aspectRatio) {
		          if (widthChanged) {
		            cropBoxData.height = cropBoxData.width / aspectRatio;
		          } else if (heightChanged) {
		            cropBoxData.width = cropBoxData.height * aspectRatio;
		          }
		        }
		        this.renderCropBox();
		      }
		      return this;
		    },
		    /**
		     * Get a canvas drawn the cropped image.
		     * @param {Object} [options={}] - The config options.
		     * @returns {HTMLCanvasElement} - The result canvas.
		     */
		    getCroppedCanvas: function getCroppedCanvas() {
		      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		      if (!this.ready || !window.HTMLCanvasElement) {
		        return null;
		      }
		      var canvasData = this.canvasData;
		      var source = getSourceCanvas(this.image, this.imageData, canvasData, options);

		      // Returns the source canvas if it is not cropped.
		      if (!this.cropped) {
		        return source;
		      }
		      var _this$getData = this.getData(options.rounded),
		        initialX = _this$getData.x,
		        initialY = _this$getData.y,
		        initialWidth = _this$getData.width,
		        initialHeight = _this$getData.height;
		      var ratio = source.width / Math.floor(canvasData.naturalWidth);
		      if (ratio !== 1) {
		        initialX *= ratio;
		        initialY *= ratio;
		        initialWidth *= ratio;
		        initialHeight *= ratio;
		      }
		      var aspectRatio = initialWidth / initialHeight;
		      var maxSizes = getAdjustedSizes({
		        aspectRatio: aspectRatio,
		        width: options.maxWidth || Infinity,
		        height: options.maxHeight || Infinity
		      });
		      var minSizes = getAdjustedSizes({
		        aspectRatio: aspectRatio,
		        width: options.minWidth || 0,
		        height: options.minHeight || 0
		      }, 'cover');
		      var _getAdjustedSizes = getAdjustedSizes({
		          aspectRatio: aspectRatio,
		          width: options.width || (ratio !== 1 ? source.width : initialWidth),
		          height: options.height || (ratio !== 1 ? source.height : initialHeight)
		        }),
		        width = _getAdjustedSizes.width,
		        height = _getAdjustedSizes.height;
		      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
		      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
		      var canvas = document.createElement('canvas');
		      var context = canvas.getContext('2d');
		      canvas.width = normalizeDecimalNumber(width);
		      canvas.height = normalizeDecimalNumber(height);
		      context.fillStyle = options.fillColor || 'transparent';
		      context.fillRect(0, 0, width, height);
		      var _options$imageSmoothi = options.imageSmoothingEnabled,
		        imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
		        imageSmoothingQuality = options.imageSmoothingQuality;
		      context.imageSmoothingEnabled = imageSmoothingEnabled;
		      if (imageSmoothingQuality) {
		        context.imageSmoothingQuality = imageSmoothingQuality;
		      }

		      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
		      var sourceWidth = source.width;
		      var sourceHeight = source.height;

		      // Source canvas parameters
		      var srcX = initialX;
		      var srcY = initialY;
		      var srcWidth;
		      var srcHeight;

		      // Destination canvas parameters
		      var dstX;
		      var dstY;
		      var dstWidth;
		      var dstHeight;
		      if (srcX <= -initialWidth || srcX > sourceWidth) {
		        srcX = 0;
		        srcWidth = 0;
		        dstX = 0;
		        dstWidth = 0;
		      } else if (srcX <= 0) {
		        dstX = -srcX;
		        srcX = 0;
		        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
		        dstWidth = srcWidth;
		      } else if (srcX <= sourceWidth) {
		        dstX = 0;
		        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
		        dstWidth = srcWidth;
		      }
		      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
		        srcY = 0;
		        srcHeight = 0;
		        dstY = 0;
		        dstHeight = 0;
		      } else if (srcY <= 0) {
		        dstY = -srcY;
		        srcY = 0;
		        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
		        dstHeight = srcHeight;
		      } else if (srcY <= sourceHeight) {
		        dstY = 0;
		        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
		        dstHeight = srcHeight;
		      }
		      var params = [srcX, srcY, srcWidth, srcHeight];

		      // Avoid "IndexSizeError"
		      if (dstWidth > 0 && dstHeight > 0) {
		        var scale = width / initialWidth;
		        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
		      }

		      // All the numerical parameters should be integer for `drawImage`
		      // https://github.com/fengyuanchen/cropper/issues/476
		      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
		        return Math.floor(normalizeDecimalNumber(param));
		      }))));
		      return canvas;
		    },
		    /**
		     * Change the aspect ratio of the crop box.
		     * @param {number} aspectRatio - The new aspect ratio.
		     * @returns {Cropper} this
		     */
		    setAspectRatio: function setAspectRatio(aspectRatio) {
		      var options = this.options;
		      if (!this.disabled && !isUndefined(aspectRatio)) {
		        // 0 -> NaN
		        options.aspectRatio = Math.max(0, aspectRatio) || NaN;
		        if (this.ready) {
		          this.initCropBox();
		          if (this.cropped) {
		            this.renderCropBox();
		          }
		        }
		      }
		      return this;
		    },
		    /**
		     * Change the drag mode.
		     * @param {string} mode - The new drag mode.
		     * @returns {Cropper} this
		     */
		    setDragMode: function setDragMode(mode) {
		      var options = this.options,
		        dragBox = this.dragBox,
		        face = this.face;
		      if (this.ready && !this.disabled) {
		        var croppable = mode === DRAG_MODE_CROP;
		        var movable = options.movable && mode === DRAG_MODE_MOVE;
		        mode = croppable || movable ? mode : DRAG_MODE_NONE;
		        options.dragMode = mode;
		        setData(dragBox, DATA_ACTION, mode);
		        toggleClass(dragBox, CLASS_CROP, croppable);
		        toggleClass(dragBox, CLASS_MOVE, movable);
		        if (!options.cropBoxMovable) {
		          // Sync drag mode to crop box when it is not movable
		          setData(face, DATA_ACTION, mode);
		          toggleClass(face, CLASS_CROP, croppable);
		          toggleClass(face, CLASS_MOVE, movable);
		        }
		      }
		      return this;
		    }
		  };

		  var AnotherCropper = WINDOW.Cropper;
		  var Cropper = /*#__PURE__*/function () {
		    /**
		     * Create a new Cropper.
		     * @param {Element} element - The target element for cropping.
		     * @param {Object} [options={}] - The configuration options.
		     */
		    function Cropper(element) {
		      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		      _classCallCheck(this, Cropper);
		      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
		        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
		      }
		      this.element = element;
		      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
		      this.cropped = false;
		      this.disabled = false;
		      this.pointers = {};
		      this.ready = false;
		      this.reloading = false;
		      this.replaced = false;
		      this.sized = false;
		      this.sizing = false;
		      this.init();
		    }
		    return _createClass(Cropper, [{
		      key: "init",
		      value: function init() {
		        var element = this.element;
		        var tagName = element.tagName.toLowerCase();
		        var url;
		        if (element[NAMESPACE]) {
		          return;
		        }
		        element[NAMESPACE] = this;
		        if (tagName === 'img') {
		          this.isImg = true;

		          // e.g.: "img/picture.jpg"
		          url = element.getAttribute('src') || '';
		          this.originalUrl = url;

		          // Stop when it's a blank image
		          if (!url) {
		            return;
		          }

		          // e.g.: "https://example.com/img/picture.jpg"
		          url = element.src;
		        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
		          url = element.toDataURL();
		        }
		        this.load(url);
		      }
		    }, {
		      key: "load",
		      value: function load(url) {
		        var _this = this;
		        if (!url) {
		          return;
		        }
		        this.url = url;
		        this.imageData = {};
		        var element = this.element,
		          options = this.options;
		        if (!options.rotatable && !options.scalable) {
		          options.checkOrientation = false;
		        }

		        // Only IE10+ supports Typed Arrays
		        if (!options.checkOrientation || !window.ArrayBuffer) {
		          this.clone();
		          return;
		        }

		        // Detect the mime type of the image directly if it is a Data URL
		        if (REGEXP_DATA_URL.test(url)) {
		          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
		          if (REGEXP_DATA_URL_JPEG.test(url)) {
		            this.read(dataURLToArrayBuffer(url));
		          } else {
		            // Only a JPEG image may contains Exif Orientation information,
		            // the rest types of Data URLs are not necessary to check orientation at all.
		            this.clone();
		          }
		          return;
		        }

		        // 1. Detect the mime type of the image by a XMLHttpRequest.
		        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.
		        var xhr = new XMLHttpRequest();
		        var clone = this.clone.bind(this);
		        this.reloading = true;
		        this.xhr = xhr;

		        // 1. Cross origin requests are only supported for protocol schemes:
		        // http, https, data, chrome, chrome-extension.
		        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
		        // in some browsers as IE11 and Safari.
		        xhr.onabort = clone;
		        xhr.onerror = clone;
		        xhr.ontimeout = clone;
		        xhr.onprogress = function () {
		          // Abort the request directly if it not a JPEG image for better performance
		          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
		            xhr.abort();
		          }
		        };
		        xhr.onload = function () {
		          _this.read(xhr.response);
		        };
		        xhr.onloadend = function () {
		          _this.reloading = false;
		          _this.xhr = null;
		        };

		        // Bust cache when there is a "crossOrigin" property to avoid browser cache error
		        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
		          url = addTimestamp(url);
		        }

		        // The third parameter is required for avoiding side-effect (#682)
		        xhr.open('GET', url, true);
		        xhr.responseType = 'arraybuffer';
		        xhr.withCredentials = element.crossOrigin === 'use-credentials';
		        xhr.send();
		      }
		    }, {
		      key: "read",
		      value: function read(arrayBuffer) {
		        var options = this.options,
		          imageData = this.imageData;

		        // Reset the orientation value to its default value 1
		        // as some iOS browsers will render image with its orientation
		        var orientation = resetAndGetOrientation(arrayBuffer);
		        var rotate = 0;
		        var scaleX = 1;
		        var scaleY = 1;
		        if (orientation > 1) {
		          // Generate a new URL which has the default orientation value
		          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
		          var _parseOrientation = parseOrientation(orientation);
		          rotate = _parseOrientation.rotate;
		          scaleX = _parseOrientation.scaleX;
		          scaleY = _parseOrientation.scaleY;
		        }
		        if (options.rotatable) {
		          imageData.rotate = rotate;
		        }
		        if (options.scalable) {
		          imageData.scaleX = scaleX;
		          imageData.scaleY = scaleY;
		        }
		        this.clone();
		      }
		    }, {
		      key: "clone",
		      value: function clone() {
		        var element = this.element,
		          url = this.url;
		        var crossOrigin = element.crossOrigin;
		        var crossOriginUrl = url;
		        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
		          if (!crossOrigin) {
		            crossOrigin = 'anonymous';
		          }

		          // Bust cache when there is not a "crossOrigin" property (#519)
		          crossOriginUrl = addTimestamp(url);
		        }
		        this.crossOrigin = crossOrigin;
		        this.crossOriginUrl = crossOriginUrl;
		        var image = document.createElement('img');
		        if (crossOrigin) {
		          image.crossOrigin = crossOrigin;
		        }
		        image.src = crossOriginUrl || url;
		        image.alt = element.alt || 'The image to crop';
		        this.image = image;
		        image.onload = this.start.bind(this);
		        image.onerror = this.stop.bind(this);
		        addClass(image, CLASS_HIDE);
		        element.parentNode.insertBefore(image, element.nextSibling);
		      }
		    }, {
		      key: "start",
		      value: function start() {
		        var _this2 = this;
		        var image = this.image;
		        image.onload = null;
		        image.onerror = null;
		        this.sizing = true;

		        // Match all browsers that use WebKit as the layout engine in iOS devices,
		        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
		        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
		        var done = function done(naturalWidth, naturalHeight) {
		          assign(_this2.imageData, {
		            naturalWidth: naturalWidth,
		            naturalHeight: naturalHeight,
		            aspectRatio: naturalWidth / naturalHeight
		          });
		          _this2.initialImageData = assign({}, _this2.imageData);
		          _this2.sizing = false;
		          _this2.sized = true;
		          _this2.build();
		        };

		        // Most modern browsers (excepts iOS WebKit)
		        if (image.naturalWidth && !isIOSWebKit) {
		          done(image.naturalWidth, image.naturalHeight);
		          return;
		        }
		        var sizingImage = document.createElement('img');
		        var body = document.body || document.documentElement;
		        this.sizingImage = sizingImage;
		        sizingImage.onload = function () {
		          done(sizingImage.width, sizingImage.height);
		          if (!isIOSWebKit) {
		            body.removeChild(sizingImage);
		          }
		        };
		        sizingImage.src = image.src;

		        // iOS WebKit will convert the image automatically
		        // with its orientation once append it into DOM (#279)
		        if (!isIOSWebKit) {
		          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
		          body.appendChild(sizingImage);
		        }
		      }
		    }, {
		      key: "stop",
		      value: function stop() {
		        var image = this.image;
		        image.onload = null;
		        image.onerror = null;
		        image.parentNode.removeChild(image);
		        this.image = null;
		      }
		    }, {
		      key: "build",
		      value: function build() {
		        if (!this.sized || this.ready) {
		          return;
		        }
		        var element = this.element,
		          options = this.options,
		          image = this.image;

		        // Create cropper elements
		        var container = element.parentNode;
		        var template = document.createElement('div');
		        template.innerHTML = TEMPLATE;
		        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
		        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
		        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
		        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
		        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
		        this.container = container;
		        this.cropper = cropper;
		        this.canvas = canvas;
		        this.dragBox = dragBox;
		        this.cropBox = cropBox;
		        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
		        this.face = face;
		        canvas.appendChild(image);

		        // Hide the original image
		        addClass(element, CLASS_HIDDEN);

		        // Inserts the cropper after to the current image
		        container.insertBefore(cropper, element.nextSibling);

		        // Show the hidden image
		        removeClass(image, CLASS_HIDE);
		        this.initPreview();
		        this.bind();
		        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
		        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
		        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
		        addClass(cropBox, CLASS_HIDDEN);
		        if (!options.guides) {
		          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
		        }
		        if (!options.center) {
		          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
		        }
		        if (options.background) {
		          addClass(cropper, "".concat(NAMESPACE, "-bg"));
		        }
		        if (!options.highlight) {
		          addClass(face, CLASS_INVISIBLE);
		        }
		        if (options.cropBoxMovable) {
		          addClass(face, CLASS_MOVE);
		          setData(face, DATA_ACTION, ACTION_ALL);
		        }
		        if (!options.cropBoxResizable) {
		          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
		          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
		        }
		        this.render();
		        this.ready = true;
		        this.setDragMode(options.dragMode);
		        if (options.autoCrop) {
		          this.crop();
		        }
		        this.setData(options.data);
		        if (isFunction(options.ready)) {
		          addListener(element, EVENT_READY, options.ready, {
		            once: true
		          });
		        }
		        dispatchEvent(element, EVENT_READY);
		      }
		    }, {
		      key: "unbuild",
		      value: function unbuild() {
		        if (!this.ready) {
		          return;
		        }
		        this.ready = false;
		        this.unbind();
		        this.resetPreview();
		        var parentNode = this.cropper.parentNode;
		        if (parentNode) {
		          parentNode.removeChild(this.cropper);
		        }
		        removeClass(this.element, CLASS_HIDDEN);
		      }
		    }, {
		      key: "uncreate",
		      value: function uncreate() {
		        if (this.ready) {
		          this.unbuild();
		          this.ready = false;
		          this.cropped = false;
		        } else if (this.sizing) {
		          this.sizingImage.onload = null;
		          this.sizing = false;
		          this.sized = false;
		        } else if (this.reloading) {
		          this.xhr.onabort = null;
		          this.xhr.abort();
		        } else if (this.image) {
		          this.stop();
		        }
		      }

		      /**
		       * Get the no conflict cropper class.
		       * @returns {Cropper} The cropper class.
		       */
		    }], [{
		      key: "noConflict",
		      value: function noConflict() {
		        window.Cropper = AnotherCropper;
		        return Cropper;
		      }

		      /**
		       * Change the default options.
		       * @param {Object} options - The new default options.
		       */
		    }, {
		      key: "setDefaults",
		      value: function setDefaults(options) {
		        assign(DEFAULTS, isPlainObject(options) && options);
		      }
		    }]);
		  }();
		  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

		  return Cropper;

		})); 
	} (cropper));

	var cropperExports = cropper.exports;

	Object.defineProperty(reactCropper_umd,"__esModule",{value:true});var e=require$$0__default.default,r=cropperExports,o=function(){return o=Object.assign||function(e){for(var r,o=1,t=arguments.length;o<t;o++)for(var n in r=arguments[o])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e},o.apply(this,arguments)};function t(e,r){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(o[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);}return o}var n=["aspectRatio","autoCrop","autoCropArea","background","center","checkCrossOrigin","checkOrientation","cropBoxMovable","cropBoxResizable","data","dragMode","guides","highlight","initialAspectRatio","minCanvasHeight","minCanvasWidth","minContainerHeight","minContainerWidth","minCropBoxHeight","minCropBoxWidth","modal","movable","preview","responsive","restore","rotatable","scalable","toggleDragModeOnDblclick","viewMode","wheelZoomRatio","zoomOnTouch","zoomOnWheel","zoomable","cropstart","cropmove","cropend","crop","zoom","ready"],a={opacity:0,maxWidth:"100%"},c=e.forwardRef((function(c,i){var l=t(c,[]),s=l.dragMode,u=void 0===s?"crop":s,p=l.src,d=l.style,f=l.className,v=l.crossOrigin,m=l.scaleX,g=l.scaleY,y=l.enable,b=l.zoomTo,h=l.rotateTo,O=l.alt,T=void 0===O?"picture":O,z=l.ready,x=l.onInitialized,C=t(l,["dragMode","src","style","className","crossOrigin","scaleX","scaleY","enable","zoomTo","rotateTo","alt","ready","onInitialized"]),w={scaleY:g,scaleX:m,enable:y,zoomTo:b,rotateTo:h},j=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var t=e.useRef(null);return e.useEffect((function(){r.forEach((function(e){e&&("function"==typeof e?e(t.current):e.current=t.current);}));}),[r]),t}(i,e.useRef(null));e.useEffect((function(){var e;(null===(e=j.current)||void 0===e?void 0:e.cropper)&&"number"==typeof b&&j.current.cropper.zoomTo(b);}),[l.zoomTo]),e.useEffect((function(){var e;(null===(e=j.current)||void 0===e?void 0:e.cropper)&&void 0!==p&&j.current.cropper.reset().clear().replace(p);}),[p]),e.useEffect((function(){if(null!==j.current){var e=new r(j.current,o(o({dragMode:u},C),{ready:function(e){null!==e.currentTarget&&function(e,r){ void 0===r&&(r={});var o=r.enable,t=void 0===o||o,n=r.scaleX,a=void 0===n?1:n,c=r.scaleY,i=void 0===c?1:c,l=r.zoomTo,s=void 0===l?0:l,u=r.rotateTo;t?e.enable():e.disable(),e.scaleX(a),e.scaleY(i),void 0!==u&&e.rotateTo(u),s>0&&e.zoomTo(s);}(e.currentTarget.cropper,w),z&&z(e);}}));x&&x(e);}return function(){var e,r;null===(r=null===(e=j.current)||void 0===e?void 0:e.cropper)||void 0===r||r.destroy();}}),[j]);var E=function(e){return n.reduce((function(e,r){var o=e,n=r;return o[n],t(o,["symbol"==typeof n?n:n+""])}),e)}(o(o({},C),{crossOrigin:v,src:p,alt:T}));return e.createElement("div",{style:d,className:f},e.createElement("img",o({},E,{style:a,ref:j})))}));reactCropper_umd.Cropper=c,reactCropper_umd.default=c;

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
	var _reactCropper = _interopRequireDefault$2(reactCropper_umd);
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
	// Не импортируем CSS здесь

	// --- Копируем содержимое файла cropper.min.css сюда, в виде строки ---
	const CROPPER_CSS = `
.cropper-container{font-size:0;line-height:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr;touch-action:none}.cropper-container img{display:block;width:100%;min-width:0!important;height:100%;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{position:absolute;top:0;right:0;bottom:0;left:0}.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;width:100%;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden}.cropper-dashed{position:absolute;display:block;border:0 dashed #eee;opacity:.5}.cropper-dashed.dashed-h{top:33.33333%;left:0;width:100%;height:33.33333%;border-top-width:1px;border-bottom-width:1px}.cropper-dashed.dashed-v{top:0;left:33.33333%;width:33.33333%;height:100%;border-right-width:1px;border-left-width:1px}.cropper-center{position:absolute;top:50%;left:50%;display:block;width:0;height:0;opacity:.75}.cropper-center:before,.cropper-center:after{position:absolute;display:block;background-color:#eee;content:' '}.cropper-center:before{top:0;left:-3px;width:7px;height:1px}.cropper-center:after{top:-3px;left:0;width:1px;height:7px}.cropper-face,.cropper-line,.cropper-point{position:absolute;display:block;width:100%;height:100%;opacity:.1}.cropper-face{top:0;left:0;background-color:#fff;cursor:move}.cropper-line{background-color:#39f}.cropper-line.line-e{top:0;right:-3px;width:5px;cursor:e-resize}.cropper-line.line-n{top:-3px;left:0;height:5px;cursor:n-resize}.cropper-line.line-w{top:0;left:-3px;width:5px;cursor:w-resize}.cropper-line.line-s{bottom:-3px;left:0;height:5px;cursor:s-resize}.cropper-point{width:5px;height:5px;background-color:#39f;opacity:.75}.cropper-point.point-e{top:50%;right:-3px;margin-top:-3px;cursor:e-resize}.cropper-point.point-n{top:-3px;left:50%;margin-left:-3px;cursor:n-resize}.cropper-point.point-w{top:50%;left:-3px;margin-top:-3px;cursor:w-resize}.cropper-point.point-s{bottom:-3px;left:50%;margin-left:-3px;cursor:s-resize}.cropper-point.point-ne{top:-3px;right:-3px;cursor:ne-resize}.cropper-point.point-nw{top:-3px;left:-3px;cursor:nw-resize}.cropper-point.point-sw{bottom:-3px;left:-3px;cursor:sw-resize}.cropper-point.point-se{bottom:-3px;right:-3px;cursor:se-resize}@media (min-width:768px){.cropper-point.point-e,.cropper-point.point-w{margin-top:-4px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-4px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:7px;height:7px}.cropper-point.point-se{bottom:-4px;right:-4px}}@media (min-width:992px){.cropper-point.point-se{bottom:-5px;right:-5px}.cropper-point.point-e,.cropper-point.point-w{margin-top:-5px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-5px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:9px;height:9px}}@media (min-width:1200px){.cropper-point.point-se{bottom:-6px;right:-6px}.cropper-point.point-e,.cropper-point.point-w{margin-top:-6px}.cropper-point.point-n,.cropper-point.point-s{margin-left:-6px}.cropper-point.point-ne,.cropper-point.point-nw,.cropper-point.point-se,.cropper-point.point-sw{width:11px;height:11px}}.cropper-crop-box{cursor:move}.cropper-crop-box.cropper-modal{opacity:.5}.cropper-hidden{display:none!important}.cropper-hide{position:absolute;display:block;width:0;height:0}.cropper-invisible{opacity:0}.cropper-bg{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1pAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}
`;
	const UploadImageInput = props => {
	  const {
	    property,
	    record,
	    onChange
	  } = props;

	  // --- Логика внедрения CSS ---
	  (0, _react$1.useEffect)(() => {
	    const styleId = 'cropper-styles';
	    // Проверяем, не были ли стили уже добавлены
	    if (!document.getElementById(styleId)) {
	      const style = document.createElement('style');
	      style.id = styleId;
	      style.innerHTML = CROPPER_CSS;
	      document.head.appendChild(style);
	    }
	  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании компонента

	  const currentImageUrl = record.params[property.path] || '';
	  const [imageUrl, setImageUrl] = (0, _react$1.useState)(currentImageUrl);
	  const [imageToCrop, setImageToCrop] = (0, _react$1.useState)(null);
	  const [isUploading, setIsUploading] = (0, _react$1.useState)(false);
	  const [error, setError] = (0, _react$1.useState)(null);
	  const cropperRef = (0, _react$1.useRef)(null);
	  const fileInputRef = (0, _react$1.useRef)(null);
	  const handleSelectImageClick = () => {
	    if (fileInputRef.current) {
	      fileInputRef.current.click();
	    }
	  };
	  const onFileSelected = event => {
	    event.preventDefault();
	    const files = event.target.files;
	    if (files && files.length > 0) {
	      const file = files[0];
	      const reader = new FileReader();
	      reader.onload = () => {
	        setImageToCrop(reader.result);
	      };
	      reader.readAsDataURL(file);
	    }
	    event.target.value = null;
	  };
	  const onCropAndUpload = () => {
	    if (!cropperRef.current?.cropper) return;
	    setIsUploading(true);
	    setError(null);
	    cropperRef.current.cropper.getCroppedCanvas().toBlob(async blob => {
	      if (!blob) {
	        setError('Could not process image.');
	        setIsUploading(false);
	        return;
	      }
	      const formData = new FormData();
	      formData.append('file', blob, `cropped-${Date.now()}.png`);
	      try {
	        const response = await _axios$1.default.post('/api/uploads', formData, {
	          headers: {
	            'Content-Type': 'multipart/form-data'
	          }
	        });
	        const newUrl = response.data.url;
	        setImageUrl(newUrl);
	        setImageToCrop(null);
	        onChange(property.path, newUrl);
	      } catch (err) {
	        const message = err.response?.data?.message || 'Upload failed';
	        setError(message);
	      } finally {
	        setIsUploading(false);
	      }
	    }, 'image/png');
	  };
	  const handleCancelCrop = () => {
	    setImageToCrop(null);
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
	    }), /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	      children: [imageUrl && /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	        display: "flex",
	        alignItems: "center",
	        children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)("img", {
	          src: imageUrl,
	          alt: "Uploaded",
	          style: {
	            maxHeight: '100px',
	            maxWidth: '200px',
	            marginRight: '10px'
	          }
	        }), /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Button, {
	          onClick: handleDelete,
	          variant: "danger",
	          size: "sm",
	          type: "button",
	          children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Icon, {
	            icon: "TrashCan"
	          }), " Remove"]
	        })]
	      }), !imageUrl && imageToCrop && /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	        children: [/*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	          display: "flex",
	          flexDirection: ['column', 'row'],
	          mx: -2,
	          style: {
	            maxWidth: '800px'
	          },
	          children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Box, {
	            flex: 1,
	            px: 2,
	            children: /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_reactCropper.default, {
	              ref: cropperRef,
	              src: imageToCrop,
	              style: {
	                height: 400,
	                width: '100%'
	              }
	              // aspectRatio={1 / 1}
	              ,

	              preview: ".img-preview",
	              guides: true,
	              viewMode: 1,
	              responsive: true,
	              checkOrientation: false
	            })
	          }), /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	            flex: 1,
	            px: 2,
	            mt: [3, 0],
	            children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Label, {
	              children: "Preview"
	            }), /*#__PURE__*/(0, _jsxRuntime$2.jsx)("div", {
	              className: "img-preview",
	              style: {
	                width: '100%',
	                height: '200px',
	                overflow: 'hidden',
	                border: '1px solid #ddd'
	              }
	            })]
	          })]
	        }), /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	          mt: "lg",
	          display: "flex",
	          children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Button, {
	            onClick: onCropAndUpload,
	            variant: "primary",
	            disabled: isUploading,
	            type: "button",
	            children: isUploading ? /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Icon, {
	              icon: "Loader",
	              spin: true
	            }) : 'Crop & Upload'
	          }), /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Button, {
	            onClick: handleCancelCrop,
	            variant: "secondary",
	            ml: "md",
	            type: "button",
	            children: "Cancel"
	          })]
	        })]
	      }), !imageUrl && !imageToCrop && /*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Box, {
	        children: [/*#__PURE__*/(0, _jsxRuntime$2.jsxs)(_designSystem$2.Button, {
	          onClick: handleSelectImageClick,
	          type: "button",
	          children: [/*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Icon, {
	            icon: "Image"
	          }), " Select Image"]
	        }), /*#__PURE__*/(0, _jsxRuntime$2.jsx)("input", {
	          type: "file",
	          ref: fileInputRef,
	          style: {
	            display: 'none'
	          },
	          onChange: onFileSelected,
	          accept: "image/png, image/jpeg, image/webp, image/gif"
	        })]
	      })]
	    }), error && /*#__PURE__*/(0, _jsxRuntime$2.jsx)(_designSystem$2.Text, {
	      color: "danger",
	      mt: "md",
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

	// --- 1. НОВЫЙ ВИДЖЕТ-ИНСТРУКЦИЯ ---
	const GuideWidget = () => {
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    p: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	      mb: "md",
	      children: "\u0413\u0438\u0434 \u043F\u043E \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u043C"
	    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	      as: "ul",
	      style: {
	        listStyle: 'none',
	        padding: 0
	      },
	      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	        as: "li",
	        mb: "md",
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	          display: "flex",
	          alignItems: "center",
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	            icon: "Archive",
	            mr: "md"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
	              children: "Catalog:"
	            }), " \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C\u0438, \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F\u043C\u0438 \u0438 \u0442\u043E\u0432\u0430\u0440\u0430\u043C\u0438."]
	          })]
	        })
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	        as: "li",
	        mb: "md",
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	          display: "flex",
	          alignItems: "center",
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	            icon: "Settings",
	            mr: "md"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
	              children: "Shop Settings:"
	            }), " \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0438 \u043E\u043F\u043B\u0430\u0442\u044B."]
	          })]
	        })
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	        as: "li",
	        mb: "md",
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	          display: "flex",
	          alignItems: "center",
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	            icon: "Layout",
	            mr: "md"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
	              children: "Content:"
	            }), " \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0445 \u0441\u0430\u0439\u0442\u0430 (\u0433\u043B\u0430\u0432\u043D\u0430\u044F, \u0433\u0430\u043B\u0435\u0440\u0435\u0438 \u0438 \u0442.\u0434.)."]
	          })]
	        })
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	        as: "li",
	        mb: "md",
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	          display: "flex",
	          alignItems: "center",
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	            icon: "User",
	            mr: "md"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
	              children: "Admin Users:"
	            }), " \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0435\u0442\u043D\u044B\u043C\u0438 \u0437\u0430\u043F\u0438\u0441\u044F\u043C\u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u0432."]
	          })]
	        })
	      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Box, {
	        as: "li",
	        mb: "md",
	        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	          display: "flex",
	          alignItems: "center",
	          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	            icon: "ShoppingCart",
	            mr: "md"
	          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Text, {
	            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
	              children: "Orders:"
	            }), " \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0432\u0441\u0435\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0438 \u0438\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439."]
	          })]
	        })
	      })]
	    })]
	  });
	};

	// --- 2. НОВЫЙ ВИДЖЕТ ДЛЯ ОЧИСТКИ ---
	const CleanupWidget = () => {
	  const [isLoading, setIsLoading] = (0, _react.useState)(false);
	  const [message, setMessage] = (0, _react.useState)(null);
	  const handleCleanupClick = () => {
	    if (!window.confirm('Вы уверены, что хотите удалить все неиспользуемые изображения? Это действие необратимо.')) {
	      return;
	    }
	    setIsLoading(true);
	    setMessage(null);
	    _axios.default.post('/api/cleanup/unused-images-test').then(response => {
	      setMessage({
	        type: 'success',
	        text: response.data.message
	      });
	    }).catch(error => {
	      setMessage({
	        type: 'error',
	        text: error.response?.data?.message || 'An error occurred during cleanup.'
	      });
	    }).finally(() => {
	      setIsLoading(false);
	    });
	  };
	  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_designSystem.Box, {
	    variant: "white",
	    boxShadow: "card",
	    p: "lg",
	    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.H3, {
	      children: "\u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435"
	    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	      mt: "md",
	      color: "grey60",
	      children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443 \"uploads\" \u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u043D\u0438 \u043A \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445."
	    }), message && /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Text, {
	      mt: "lg",
	      p: "md",
	      border: "1px solid"
	      // В зависимости от типа сообщения меняем цвет рамки и текста
	      ,

	      borderColor: message.type === 'success' ? 'success' : 'danger',
	      color: message.type === 'success' ? 'success' : 'danger',
	      borderRadius: "default",
	      bg: message.type === 'success' ? 'lightSuccess' : 'lightDanger',
	      children: message.text
	    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Button, {
	      onClick: handleCleanupClick,
	      disabled: isLoading,
	      variant: "danger",
	      mt: "md",
	      children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
	        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	          icon: "Loader",
	          spin: true
	        }), " \u041E\u0447\u0438\u0441\u0442\u043A\u0430..."]
	      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
	        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_designSystem.Icon, {
	          icon: "Trash"
	        }), " \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043D\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"]
	      })
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
	      }, refreshInProgressKey), /*#__PURE__*/(0, _jsxRuntime.jsx)(GuideWidget, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(CleanupWidget, {})]
	    })]
	  });
	};
	default_1 = Dashboard$1.default = Dashboard;

	AdminJS.UserComponents = {};
	AdminJS.UserComponents.UploadImageInput = default_1$2;
	AdminJS.UserComponents.PasswordInput = default_1$1;
	AdminJS.UserComponents.Dashboard = default_1;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIi4uL25vZGVfbW9kdWxlcy9yZWFjdC1jcm9wcGVyL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvZGlzdC9jcm9wcGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWNyb3BwZXIvZGlzdC9yZWFjdC1jcm9wcGVyLnVtZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUuanMiLCIuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9VcGxvYWRJbWFnZUlucHV0LmpzIiwiLi4vZGlzdC9hZG1pbkNvbXBvbmVudHMvUGFzc3dvcmRJbnB1dC5qcyIsIi4uL2Rpc3QvYWRtaW5Db21wb25lbnRzL0Rhc2hib2FyZC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBBeGlvcyB2MS44LjQgQ29weXJpZ2h0IChjKSAyMDI1IE1hdHQgWmFicmlza2llIGFuZCBjb250cmlidXRvcnMgKi9cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufTtcblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59O1xuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn07XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuLy8gb3JpZ2luYWwgY29kZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RpZ2l0YWxCcmFpbkpTL0F4aW9zUHJvbWlzZS9ibG9iLzE2ZGVhYjEzNzEwZWMwOTc3OTkyMjEzMWYzZmE1OTU0MzIwZjgzYWIvbGliL3V0aWxzLmpzI0wxMS1MMzRcblxuY29uc3QgX3NldEltbWVkaWF0ZSA9ICgoc2V0SW1tZWRpYXRlU3VwcG9ydGVkLCBwb3N0TWVzc2FnZVN1cHBvcnRlZCkgPT4ge1xuICBpZiAoc2V0SW1tZWRpYXRlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgfVxuXG4gIHJldHVybiBwb3N0TWVzc2FnZVN1cHBvcnRlZCA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgIF9nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKHtzb3VyY2UsIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYik7XG4gICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCBcIipcIik7XG4gICAgfVxuICB9KShgYXhpb3NAJHtNYXRoLnJhbmRvbSgpfWAsIFtdKSA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KShcbiAgdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyxcbiAgaXNGdW5jdGlvbihfZ2xvYmFsLnBvc3RNZXNzYWdlKVxuKTtcblxuY29uc3QgYXNhcCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCcgP1xuICBxdWV1ZU1pY3JvdGFzay5iaW5kKF9nbG9iYWwpIDogKCB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCBfc2V0SW1tZWRpYXRlKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbnZhciB1dGlscyQxID0ge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXBcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogbnVsbDtcbiAgfVxufVxuXG51dGlscyQxLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzJDEudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXNcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlJDEgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlJDEsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlJDEpO1xuXG4gIHV0aWxzJDEudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbnZhciBodHRwQWRhcHRlciA9IG51bGw7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMkMS5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscyQxLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMkMS5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzJDEudG9GbGF0T2JqZWN0KHV0aWxzJDEsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscyQxLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMkMS5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscyQxLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMkMS5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMkMS5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscyQxLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscyQxLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMkMS5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMkMS5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscyQxLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMkMS5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzJDEuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMkMS5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlJDEoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUkMSk7XG4gIH0gOiBlbmNvZGUkMTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5mdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBzZXJpYWxpemU6IG9wdGlvbnNcbiAgICB9O1xuICB9IFxuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIkMSA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0ge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zJDEgPSB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuXG52YXIgRm9ybURhdGEkMSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG5cbnZhciBCbG9iJDEgPSB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcblxudmFyIHBsYXRmb3JtJDEgPSB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zJDEsXG4gICAgRm9ybURhdGE6IEZvcm1EYXRhJDEsXG4gICAgQmxvYjogQmxvYiQxXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuXG5jb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuY29uc3QgX25hdmlnYXRvciA9IHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvciB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxudmFyIHV0aWxzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIGhhc0Jyb3dzZXJFbnY6IGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudjogaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnY6IGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgbmF2aWdhdG9yOiBfbmF2aWdhdG9yLFxuICBvcmlnaW46IG9yaWdpblxufSk7XG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtJDFcbn07XG5cbmZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscyQxLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMkMS5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMkMS5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscyQxLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscyQxLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzJDEudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMkMS5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMkMS5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscyQxLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCbG9iKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMkMS5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMkMS5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMkMS5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG52YXIgZGVmYXVsdHMkMSA9IGRlZmF1bHRzO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzJDEudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xudmFyIHBhcnNlSGVhZGVycyA9IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscyQxLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMkMS50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscyQxLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZih1dGlscyQxLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMkMS5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzJDEucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscyQxLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxudmFyIEF4aW9zSGVhZGVycyQxID0gQXhpb3NIZWFkZXJzO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzJDE7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzJDEuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscyQxLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgbGV0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgbGFzdEFyZ3M7XG4gIGxldCB0aW1lcjtcblxuICBjb25zdCBpbnZva2UgPSAoYXJncywgbm93ID0gRGF0ZS5ub3coKSkgPT4ge1xuICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICBsYXN0QXJncyA9IG51bGw7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgIH1cbiAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgfTtcblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZShlID0+IHtcbiAgICBjb25zdCBsb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQ7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcbiAgICBjb25zdCBpblJhbmdlID0gbG9hZGVkIDw9IHRvdGFsO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IChsb2FkZWQgLyB0b3RhbCkgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdG90YWwgIT0gbnVsbCxcbiAgICAgIFtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXTogdHJ1ZVxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5jb25zdCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yID0gKHRvdGFsLCB0aHJvdHRsZWQpID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG5cbiAgcmV0dXJuIFsobG9hZGVkKSA9PiB0aHJvdHRsZWRbMF0oe1xuICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgdG90YWwsXG4gICAgbG9hZGVkXG4gIH0pLCB0aHJvdHRsZWRbMV1dO1xufTtcblxuY29uc3QgYXN5bmNEZWNvcmF0b3IgPSAoZm4pID0+ICguLi5hcmdzKSA9PiB1dGlscyQxLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG5cbnZhciBjb29raWVzID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAge1xuICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgY29uc3QgY29va2llID0gW25hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXTtcblxuICAgICAgdXRpbHMkMS5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscyQxLmlzU3RyaW5nKGRvbWFpbikgJiYgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcblxuICAgICAgc2VjdXJlID09PSB0cnVlICYmIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcblxuICAgIHJlYWQobmFtZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9XG5cbiAgOlxuXG4gIC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAge1xuICAgIHdyaXRlKCkge30sXG4gICAgcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlKCkge31cbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5mdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMLCBhbGxvd0Fic29sdXRlVXJscykge1xuICBsZXQgaXNSZWxhdGl2ZVVybCA9ICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCk7XG4gIGlmIChiYXNlVVJMICYmIChpc1JlbGF0aXZlVXJsIHx8IGFsbG93QWJzb2x1dGVVcmxzID09IGZhbHNlKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMkMSA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCAsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYiAsIHByb3ApID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYikscHJvcCwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscyQxLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscyQxLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgcmVzb2x2ZUNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRUeXBlO1xuXG4gIGlmICh1dGlscyQxLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfSBlbHNlIGlmICgoY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkpICE9PSBmYWxzZSkge1xuICAgICAgLy8gZml4IHNlbWljb2xvbiBkdXBsaWNhdGlvbiBpc3N1ZSBmb3IgUmVhY3ROYXRpdmUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAgICAgIGNvbnN0IFt0eXBlLCAuLi50b2tlbnNdID0gY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpLm1hcCh0b2tlbiA9PiB0b2tlbi50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShbdHlwZSB8fCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsIC4uLnRva2Vuc10uam9pbignOyAnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICB3aXRoWFNSRlRva2VuICYmIHV0aWxzJDEuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgeGhyQWRhcHRlciA9IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMkMS5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAoW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAoW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcykpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscyQxLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufTtcblxudmFyIGNvbXBvc2VTaWduYWxzJDEgPSBjb21wb3NlU2lnbmFscztcblxuY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5jb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59O1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufTtcblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMkMS5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscyQxLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscyQxLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59O1xuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzJDEudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59O1xuXG52YXIgZmV0Y2hBZGFwdGVyID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyQxKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gIGxldCByZXF1ZXN0O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiYgKCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gIH0pO1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgIH1cblxuICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gXCJjcmVkZW50aWFsc1wiIGluIFJlcXVlc3QucHJvdG90eXBlO1xuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWRcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMkMS5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKHJlc3BvbnNlLCBjb25maWcpO1xuXG4gICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufTtcblxudXRpbHMkMS5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMkMS5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbnZhciBhZGFwdGVycyA9IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscyQxLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59O1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzJDEuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuOC40XCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzJDEuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG52YXIgdmFsaWRhdG9yID0ge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzJDFcbn07XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkgOyBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoY29uZmlnLCB7XG4gICAgICBiYXNlVXJsOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCdiYXNlVVJMJyksXG4gICAgICB3aXRoWHNyZlRva2VuOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCd3aXRoWFNSRlRva2VuJylcbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscyQxLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMkMS5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCwgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzJDEuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscyQxLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxudmFyIEF4aW9zJDEgPSBBeGlvcztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oY2FuY2VsID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0b0Fib3J0U2lnbmFsKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IChlcnIpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgY29udHJvbGxlci5zaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB0aGlzLnVuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMkMS5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuXG5jb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxudmFyIEh0dHBTdGF0dXNDb2RlJDEgPSBIdHRwU3RhdHVzQ29kZTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zJDEoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcyQxLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscyQxLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MkMS5wcm90b3R5cGUsIGNvbnRleHQsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMkMS5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlJDE7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLmNqcy5tYXBcbiIsIi8qIVxuICogQ3JvcHBlci5qcyB2MS42LjJcbiAqIGh0dHBzOi8vZmVuZ3l1YW5jaGVuLmdpdGh1Yi5pby9jcm9wcGVyanNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50IENoZW4gRmVuZ3l1YW5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMjQtMDQtMjFUMDc6NDM6MDUuMzM1WlxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkNyb3BwZXIgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIG93bktleXMoZSwgcikge1xuICAgIHZhciB0ID0gT2JqZWN0LmtleXMoZSk7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTtcbiAgICAgIHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7XG4gICAgfVxuICAgIHJldHVybiB0O1xuICB9XG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKGUpIHtcbiAgICBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykge1xuICAgICAgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9O1xuICAgICAgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pO1xuICAgICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikge1xuICAgIGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDtcbiAgICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgICB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTtcbiAgICAgIGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTtcbiAgfVxuICBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7XG4gICAgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7XG4gICAgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7XG4gIH1cbiAgZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gICAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvO1xuICAgIH0gOiBmdW5jdGlvbiAobykge1xuICAgICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gICAgfSwgX3R5cGVvZihvKTtcbiAgfVxuICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIF90b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgICB3cml0YWJsZTogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH1cbiAgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xuICB9XG4gIGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbiAgfVxuICBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbiAgfVxuICBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gICAgaWYgKCFvKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gICAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIH1cbiAgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbiAgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xuICB9XG5cbiAgdmFyIElTX0JST1dTRVIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIFdJTkRPVyA9IElTX0JST1dTRVIgPyB3aW5kb3cgOiB7fTtcbiAgdmFyIElTX1RPVUNIX0RFVklDRSA9IElTX0JST1dTRVIgJiYgV0lORE9XLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/ICdvbnRvdWNoc3RhcnQnIGluIFdJTkRPVy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBmYWxzZTtcbiAgdmFyIEhBU19QT0lOVEVSX0VWRU5UID0gSVNfQlJPV1NFUiA/ICdQb2ludGVyRXZlbnQnIGluIFdJTkRPVyA6IGZhbHNlO1xuICB2YXIgTkFNRVNQQUNFID0gJ2Nyb3BwZXInO1xuXG4gIC8vIEFjdGlvbnNcbiAgdmFyIEFDVElPTl9BTEwgPSAnYWxsJztcbiAgdmFyIEFDVElPTl9DUk9QID0gJ2Nyb3AnO1xuICB2YXIgQUNUSU9OX01PVkUgPSAnbW92ZSc7XG4gIHZhciBBQ1RJT05fWk9PTSA9ICd6b29tJztcbiAgdmFyIEFDVElPTl9FQVNUID0gJ2UnO1xuICB2YXIgQUNUSU9OX1dFU1QgPSAndyc7XG4gIHZhciBBQ1RJT05fU09VVEggPSAncyc7XG4gIHZhciBBQ1RJT05fTk9SVEggPSAnbic7XG4gIHZhciBBQ1RJT05fTk9SVEhfRUFTVCA9ICduZSc7XG4gIHZhciBBQ1RJT05fTk9SVEhfV0VTVCA9ICdudyc7XG4gIHZhciBBQ1RJT05fU09VVEhfRUFTVCA9ICdzZSc7XG4gIHZhciBBQ1RJT05fU09VVEhfV0VTVCA9ICdzdyc7XG5cbiAgLy8gQ2xhc3Nlc1xuICB2YXIgQ0xBU1NfQ1JPUCA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItY3JvcFwiKTtcbiAgdmFyIENMQVNTX0RJU0FCTEVEID0gXCJcIi5jb25jYXQoTkFNRVNQQUNFLCBcIi1kaXNhYmxlZFwiKTtcbiAgdmFyIENMQVNTX0hJRERFTiA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItaGlkZGVuXCIpO1xuICB2YXIgQ0xBU1NfSElERSA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItaGlkZVwiKTtcbiAgdmFyIENMQVNTX0lOVklTSUJMRSA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItaW52aXNpYmxlXCIpO1xuICB2YXIgQ0xBU1NfTU9EQUwgPSBcIlwiLmNvbmNhdChOQU1FU1BBQ0UsIFwiLW1vZGFsXCIpO1xuICB2YXIgQ0xBU1NfTU9WRSA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItbW92ZVwiKTtcblxuICAvLyBEYXRhIGtleXNcbiAgdmFyIERBVEFfQUNUSU9OID0gXCJcIi5jb25jYXQoTkFNRVNQQUNFLCBcIkFjdGlvblwiKTtcbiAgdmFyIERBVEFfUFJFVklFVyA9IFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCJQcmV2aWV3XCIpO1xuXG4gIC8vIERyYWcgbW9kZXNcbiAgdmFyIERSQUdfTU9ERV9DUk9QID0gJ2Nyb3AnO1xuICB2YXIgRFJBR19NT0RFX01PVkUgPSAnbW92ZSc7XG4gIHZhciBEUkFHX01PREVfTk9ORSA9ICdub25lJztcblxuICAvLyBFdmVudHNcbiAgdmFyIEVWRU5UX0NST1AgPSAnY3JvcCc7XG4gIHZhciBFVkVOVF9DUk9QX0VORCA9ICdjcm9wZW5kJztcbiAgdmFyIEVWRU5UX0NST1BfTU9WRSA9ICdjcm9wbW92ZSc7XG4gIHZhciBFVkVOVF9DUk9QX1NUQVJUID0gJ2Nyb3BzdGFydCc7XG4gIHZhciBFVkVOVF9EQkxDTElDSyA9ICdkYmxjbGljayc7XG4gIHZhciBFVkVOVF9UT1VDSF9TVEFSVCA9IElTX1RPVUNIX0RFVklDRSA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nO1xuICB2YXIgRVZFTlRfVE9VQ0hfTU9WRSA9IElTX1RPVUNIX0RFVklDRSA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZSc7XG4gIHZhciBFVkVOVF9UT1VDSF9FTkQgPSBJU19UT1VDSF9ERVZJQ0UgPyAndG91Y2hlbmQgdG91Y2hjYW5jZWwnIDogJ21vdXNldXAnO1xuICB2YXIgRVZFTlRfUE9JTlRFUl9ET1dOID0gSEFTX1BPSU5URVJfRVZFTlQgPyAncG9pbnRlcmRvd24nIDogRVZFTlRfVE9VQ0hfU1RBUlQ7XG4gIHZhciBFVkVOVF9QT0lOVEVSX01PVkUgPSBIQVNfUE9JTlRFUl9FVkVOVCA/ICdwb2ludGVybW92ZScgOiBFVkVOVF9UT1VDSF9NT1ZFO1xuICB2YXIgRVZFTlRfUE9JTlRFUl9VUCA9IEhBU19QT0lOVEVSX0VWRU5UID8gJ3BvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJyA6IEVWRU5UX1RPVUNIX0VORDtcbiAgdmFyIEVWRU5UX1JFQURZID0gJ3JlYWR5JztcbiAgdmFyIEVWRU5UX1JFU0laRSA9ICdyZXNpemUnO1xuICB2YXIgRVZFTlRfV0hFRUwgPSAnd2hlZWwnO1xuICB2YXIgRVZFTlRfWk9PTSA9ICd6b29tJztcblxuICAvLyBNaW1lIHR5cGVzXG4gIHZhciBNSU1FX1RZUEVfSlBFRyA9ICdpbWFnZS9qcGVnJztcblxuICAvLyBSZWdFeHBzXG4gIHZhciBSRUdFWFBfQUNUSU9OUyA9IC9eZXx3fHN8bnxzZXxzd3xuZXxud3xhbGx8Y3JvcHxtb3ZlfHpvb20kLztcbiAgdmFyIFJFR0VYUF9EQVRBX1VSTCA9IC9eZGF0YTovO1xuICB2YXIgUkVHRVhQX0RBVEFfVVJMX0pQRUcgPSAvXmRhdGE6aW1hZ2VcXC9qcGVnO2Jhc2U2NCwvO1xuICB2YXIgUkVHRVhQX1RBR19OQU1FID0gL15pbWd8Y2FudmFzJC9pO1xuXG4gIC8vIE1pc2NcbiAgLy8gSW5zcGlyZWQgYnkgdGhlIGRlZmF1bHQgd2lkdGggYW5kIGhlaWdodCBvZiBhIGNhbnZhcyBlbGVtZW50LlxuICB2YXIgTUlOX0NPTlRBSU5FUl9XSURUSCA9IDIwMDtcbiAgdmFyIE1JTl9DT05UQUlORVJfSEVJR0hUID0gMTAwO1xuXG4gIHZhciBERUZBVUxUUyA9IHtcbiAgICAvLyBEZWZpbmUgdGhlIHZpZXcgbW9kZSBvZiB0aGUgY3JvcHBlclxuICAgIHZpZXdNb2RlOiAwLFxuICAgIC8vIDAsIDEsIDIsIDNcblxuICAgIC8vIERlZmluZSB0aGUgZHJhZ2dpbmcgbW9kZSBvZiB0aGUgY3JvcHBlclxuICAgIGRyYWdNb2RlOiBEUkFHX01PREVfQ1JPUCxcbiAgICAvLyAnY3JvcCcsICdtb3ZlJyBvciAnbm9uZSdcblxuICAgIC8vIERlZmluZSB0aGUgaW5pdGlhbCBhc3BlY3QgcmF0aW8gb2YgdGhlIGNyb3AgYm94XG4gICAgaW5pdGlhbEFzcGVjdFJhdGlvOiBOYU4sXG4gICAgLy8gRGVmaW5lIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGNyb3AgYm94XG4gICAgYXNwZWN0UmF0aW86IE5hTixcbiAgICAvLyBBbiBvYmplY3Qgd2l0aCB0aGUgcHJldmlvdXMgY3JvcHBpbmcgcmVzdWx0IGRhdGFcbiAgICBkYXRhOiBudWxsLFxuICAgIC8vIEEgc2VsZWN0b3IgZm9yIGFkZGluZyBleHRyYSBjb250YWluZXJzIHRvIHByZXZpZXdcbiAgICBwcmV2aWV3OiAnJyxcbiAgICAvLyBSZS1yZW5kZXIgdGhlIGNyb3BwZXIgd2hlbiByZXNpemUgdGhlIHdpbmRvd1xuICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgLy8gUmVzdG9yZSB0aGUgY3JvcHBlZCBhcmVhIGFmdGVyIHJlc2l6ZSB0aGUgd2luZG93XG4gICAgcmVzdG9yZTogdHJ1ZSxcbiAgICAvLyBDaGVjayBpZiB0aGUgY3VycmVudCBpbWFnZSBpcyBhIGNyb3NzLW9yaWdpbiBpbWFnZVxuICAgIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWUsXG4gICAgLy8gQ2hlY2sgdGhlIGN1cnJlbnQgaW1hZ2UncyBFeGlmIE9yaWVudGF0aW9uIGluZm9ybWF0aW9uXG4gICAgY2hlY2tPcmllbnRhdGlvbjogdHJ1ZSxcbiAgICAvLyBTaG93IHRoZSBibGFjayBtb2RhbFxuICAgIG1vZGFsOiB0cnVlLFxuICAgIC8vIFNob3cgdGhlIGRhc2hlZCBsaW5lcyBmb3IgZ3VpZGluZ1xuICAgIGd1aWRlczogdHJ1ZSxcbiAgICAvLyBTaG93IHRoZSBjZW50ZXIgaW5kaWNhdG9yIGZvciBndWlkaW5nXG4gICAgY2VudGVyOiB0cnVlLFxuICAgIC8vIFNob3cgdGhlIHdoaXRlIG1vZGFsIHRvIGhpZ2hsaWdodCB0aGUgY3JvcCBib3hcbiAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgLy8gU2hvdyB0aGUgZ3JpZCBiYWNrZ3JvdW5kXG4gICAgYmFja2dyb3VuZDogdHJ1ZSxcbiAgICAvLyBFbmFibGUgdG8gY3JvcCB0aGUgaW1hZ2UgYXV0b21hdGljYWxseSB3aGVuIGluaXRpYWxpemVcbiAgICBhdXRvQ3JvcDogdHJ1ZSxcbiAgICAvLyBEZWZpbmUgdGhlIHBlcmNlbnRhZ2Ugb2YgYXV0b21hdGljIGNyb3BwaW5nIGFyZWEgd2hlbiBpbml0aWFsaXplc1xuICAgIGF1dG9Dcm9wQXJlYTogMC44LFxuICAgIC8vIEVuYWJsZSB0byBtb3ZlIHRoZSBpbWFnZVxuICAgIG1vdmFibGU6IHRydWUsXG4gICAgLy8gRW5hYmxlIHRvIHJvdGF0ZSB0aGUgaW1hZ2VcbiAgICByb3RhdGFibGU6IHRydWUsXG4gICAgLy8gRW5hYmxlIHRvIHNjYWxlIHRoZSBpbWFnZVxuICAgIHNjYWxhYmxlOiB0cnVlLFxuICAgIC8vIEVuYWJsZSB0byB6b29tIHRoZSBpbWFnZVxuICAgIHpvb21hYmxlOiB0cnVlLFxuICAgIC8vIEVuYWJsZSB0byB6b29tIHRoZSBpbWFnZSBieSBkcmFnZ2luZyB0b3VjaFxuICAgIHpvb21PblRvdWNoOiB0cnVlLFxuICAgIC8vIEVuYWJsZSB0byB6b29tIHRoZSBpbWFnZSBieSB3aGVlbGluZyBtb3VzZVxuICAgIHpvb21PbldoZWVsOiB0cnVlLFxuICAgIC8vIERlZmluZSB6b29tIHJhdGlvIHdoZW4gem9vbSB0aGUgaW1hZ2UgYnkgd2hlZWxpbmcgbW91c2VcbiAgICB3aGVlbFpvb21SYXRpbzogMC4xLFxuICAgIC8vIEVuYWJsZSB0byBtb3ZlIHRoZSBjcm9wIGJveFxuICAgIGNyb3BCb3hNb3ZhYmxlOiB0cnVlLFxuICAgIC8vIEVuYWJsZSB0byByZXNpemUgdGhlIGNyb3AgYm94XG4gICAgY3JvcEJveFJlc2l6YWJsZTogdHJ1ZSxcbiAgICAvLyBUb2dnbGUgZHJhZyBtb2RlIGJldHdlZW4gXCJjcm9wXCIgYW5kIFwibW92ZVwiIHdoZW4gY2xpY2sgdHdpY2Ugb24gdGhlIGNyb3BwZXJcbiAgICB0b2dnbGVEcmFnTW9kZU9uRGJsY2xpY2s6IHRydWUsXG4gICAgLy8gU2l6ZSBsaW1pdGF0aW9uXG4gICAgbWluQ2FudmFzV2lkdGg6IDAsXG4gICAgbWluQ2FudmFzSGVpZ2h0OiAwLFxuICAgIG1pbkNyb3BCb3hXaWR0aDogMCxcbiAgICBtaW5Dcm9wQm94SGVpZ2h0OiAwLFxuICAgIG1pbkNvbnRhaW5lcldpZHRoOiBNSU5fQ09OVEFJTkVSX1dJRFRILFxuICAgIG1pbkNvbnRhaW5lckhlaWdodDogTUlOX0NPTlRBSU5FUl9IRUlHSFQsXG4gICAgLy8gU2hvcnRjdXRzIG9mIGV2ZW50c1xuICAgIHJlYWR5OiBudWxsLFxuICAgIGNyb3BzdGFydDogbnVsbCxcbiAgICBjcm9wbW92ZTogbnVsbCxcbiAgICBjcm9wZW5kOiBudWxsLFxuICAgIGNyb3A6IG51bGwsXG4gICAgem9vbTogbnVsbFxuICB9O1xuXG4gIHZhciBURU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwiY3JvcHBlci1jb250YWluZXJcIiB0b3VjaC1hY3Rpb249XCJub25lXCI+JyArICc8ZGl2IGNsYXNzPVwiY3JvcHBlci13cmFwLWJveFwiPicgKyAnPGRpdiBjbGFzcz1cImNyb3BwZXItY2FudmFzXCI+PC9kaXY+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJjcm9wcGVyLWRyYWctYm94XCI+PC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiY3JvcHBlci1jcm9wLWJveFwiPicgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXZpZXctYm94XCI+PC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWRhc2hlZCBkYXNoZWQtaFwiPjwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1kYXNoZWQgZGFzaGVkLXZcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItY2VudGVyXCI+PC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWZhY2VcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLWVcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwiZVwiPjwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1saW5lIGxpbmUtblwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJuXCI+PC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWxpbmUgbGluZS13XCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIndcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLXNcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic1wiPjwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1lXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cImVcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtblwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJuXCI+PC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LXdcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwid1wiPjwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1zXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cInNcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtbmVcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwibmVcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtbndcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwibndcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtc3dcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic3dcIj48L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtc2VcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic2VcIj48L3NwYW4+JyArICc8L2Rpdj4nICsgJzwvZGl2Pic7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIuXG4gICAqL1xuICB2YXIgaXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgV0lORE9XLmlzTmFOO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwb3NpdGl2ZSBudW1iZXIuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwb3NpdGl2ZSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIHZhciBpc1Bvc2l0aXZlTnVtYmVyID0gZnVuY3Rpb24gaXNQb3NpdGl2ZU51bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCBJbmZpbml0eTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyB1bmRlZmluZWQsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIF90eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgfVxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdmFyIF9jb25zdHJ1Y3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yO1xuICAgICAgdmFyIHByb3RvdHlwZSA9IF9jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICByZXR1cm4gX2NvbnN0cnVjdG9yICYmIHByb3RvdHlwZSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QgdG8gYW4gYXJyYXkuXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiBzbGljZS5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0geyp9IGRhdGEgLSBUaGUgZGF0YSB0byBpdGVyYXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBwcm9jZXNzIGZ1bmN0aW9uIGZvciBlYWNoIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHsqfSBUaGUgb3JpZ2luYWwgZGF0YS5cbiAgICovXG4gIGZ1bmN0aW9uIGZvckVhY2goZGF0YSwgY2FsbGJhY2spIHtcbiAgICBpZiAoZGF0YSAmJiBpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgfHwgaXNOdW1iZXIoZGF0YS5sZW5ndGgpIC8qIGFycmF5LWxpa2UgKi8pIHtcbiAgICAgICAgdG9BcnJheShkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChkYXRhLCB2YWx1ZSwga2V5LCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZGF0YSwgZGF0YVtrZXldLCBrZXksIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBnaXZlbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Kn0gdGFyZ2V0IC0gVGhlIHRhcmdldCBvYmplY3QgdG8gZXh0ZW5kLlxuICAgKiBAcGFyYW0geyp9IGFyZ3MgLSBUaGUgcmVzdCBvYmplY3RzIGZvciBtZXJnaW5nIHRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZXh0ZW5kZWQgb2JqZWN0LlxuICAgKi9cbiAgdmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIGlmIChpc09iamVjdChhcmcpKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoYXJnKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnW2tleV07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICB2YXIgUkVHRVhQX0RFQ0lNQUxTID0gL1xcLlxcZCooPzowfDkpezEyfVxcZCokLztcblxuICAvKipcbiAgICogTm9ybWFsaXplIGRlY2ltYWwgbnVtYmVyLlxuICAgKiBDaGVjayBvdXQge0BsaW5rIGh0dHBzOi8vMC4zMDAwMDAwMDAwMDAwMDAwNC5jb20vfVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gbm9ybWFsaXplLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzPTEwMDAwMDAwMDAwMF0gLSBUaGUgdGltZXMgZm9yIG5vcm1hbGl6aW5nLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBub3JtYWxpemVkIG51bWJlci5cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIodmFsdWUpIHtcbiAgICB2YXIgdGltZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDEwMDAwMDAwMDAwMDtcbiAgICByZXR1cm4gUkVHRVhQX0RFQ0lNQUxTLnRlc3QodmFsdWUpID8gTWF0aC5yb3VuZCh2YWx1ZSAqIHRpbWVzKSAvIHRpbWVzIDogdmFsdWU7XG4gIH1cbiAgdmFyIFJFR0VYUF9TVUZGSVggPSAvXndpZHRofGhlaWdodHxsZWZ0fHRvcHxtYXJnaW5MZWZ0fG1hcmdpblRvcCQvO1xuXG4gIC8qKlxuICAgKiBBcHBseSBzdHlsZXMgdG8gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFRoZSBzdHlsZXMgZm9yIGFwcGx5aW5nLlxuICAgKi9cbiAgZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKSB7XG4gICAgdmFyIHN0eWxlID0gZWxlbWVudC5zdHlsZTtcbiAgICBmb3JFYWNoKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgICAgaWYgKFJFR0VYUF9TVUZGSVgudGVzdChwcm9wZXJ0eSkgJiYgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gXCJcIi5jb25jYXQodmFsdWUsIFwicHhcIik7XG4gICAgICB9XG4gICAgICBzdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZWxlbWVudCBoYXMgYSBzcGVjaWFsIGNsYXNzLlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBjaGVjay5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzIHRvIHNlYXJjaC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWFsIGNsYXNzIHdhcyBmb3VuZC5cbiAgICovXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0ID8gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModmFsdWUpIDogZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY2xhc3NlcyB0byB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgY2xhc3NlcyB0byBiZSBhZGRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoZWxlbWVudC5sZW5ndGgpKSB7XG4gICAgICBmb3JFYWNoKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIGFkZENsYXNzKGVsZW0sIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh2YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS50cmltKCk7XG4gICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChjbGFzc05hbWUuaW5kZXhPZih2YWx1ZSkgPCAwKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCIgXCIpLmNvbmNhdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbGFzc2VzIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzZXMgdG8gYmUgcmVtb3ZlZC5cbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoZWxlbWVudC5sZW5ndGgpKSB7XG4gICAgICBmb3JFYWNoKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsZW0sIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh2YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKHZhbHVlKSA+PSAwKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UodmFsdWUsICcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIG9yIHJlbW92ZSBjbGFzc2VzIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzZXMgdG8gYmUgdG9nZ2xlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBhZGRlZCAtIEFkZCBvbmx5LlxuICAgKi9cbiAgZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgdmFsdWUsIGFkZGVkKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoZWxlbWVudC5sZW5ndGgpKSB7XG4gICAgICBmb3JFYWNoKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHRvZ2dsZUNsYXNzKGVsZW0sIHZhbHVlLCBhZGRlZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJRTEwLTExIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgc2Vjb25kIHBhcmFtZXRlciBvZiBgY2xhc3NMaXN0LnRvZ2dsZWBcbiAgICBpZiAoYWRkZWQpIHtcbiAgICAgIGFkZENsYXNzKGVsZW1lbnQsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICB2YXIgUkVHRVhQX0NBTUVMX0NBU0UgPSAvKFthLXpcXGRdKShbQS1aXSkvZztcblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBjYW1lbENhc2UgdG8ga2ViYWItY2FzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgdG8gdHJhbnNmb3JtLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdHJhbnNmb3JtZWQgdmFsdWUuXG4gICAqL1xuICBmdW5jdGlvbiB0b1BhcmFtQ2FzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKFJFR0VYUF9DQU1FTF9DQVNFLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgZGF0YSBrZXkgdG8gZ2V0LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZGF0YSB2YWx1ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldERhdGEoZWxlbWVudCwgbmFtZSkge1xuICAgIGlmIChpc09iamVjdChlbGVtZW50W25hbWVdKSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnRbbmFtZV07XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXRbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIuY29uY2F0KHRvUGFyYW1DYXNlKG5hbWUpKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRhdGEgdG8gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgZGF0YSBrZXkgdG8gc2V0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSAtIFRoZSBkYXRhIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gc2V0RGF0YShlbGVtZW50LCBuYW1lLCBkYXRhKSB7XG4gICAgaWYgKGlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBlbGVtZW50W25hbWVdID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgZWxlbWVudC5kYXRhc2V0W25hbWVdID0gZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLVwiLmNvbmNhdCh0b1BhcmFtQ2FzZShuYW1lKSksIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZGF0YSBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIGRhdGEga2V5IHRvIHJlbW92ZS5cbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZURhdGEoZWxlbWVudCwgbmFtZSkge1xuICAgIGlmIChpc09iamVjdChlbGVtZW50W25hbWVdKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVsZXRlIGVsZW1lbnRbbmFtZV07XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBlbGVtZW50W25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAvLyAjMTI4IFNhZmFyaSBub3QgYWxsb3dzIHRvIGRlbGV0ZSBkYXRhc2V0IHByb3BlcnR5XG4gICAgICB0cnkge1xuICAgICAgICBkZWxldGUgZWxlbWVudC5kYXRhc2V0W25hbWVdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZWxlbWVudC5kYXRhc2V0W25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtXCIuY29uY2F0KHRvUGFyYW1DYXNlKG5hbWUpKSk7XG4gICAgfVxuICB9XG4gIHZhciBSRUdFWFBfU1BBQ0VTID0gL1xcc1xccyovO1xuICB2YXIgb25jZVN1cHBvcnRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgaWYgKElTX0JST1dTRVIpIHtcbiAgICAgIHZhciBvbmNlID0gZmFsc2U7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiBsaXN0ZW5lcigpIHt9O1xuICAgICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdvbmNlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBvbmNlO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBzZXR0ZXIgY2FuIGZpeCBhIGBUeXBlRXJyb3JgIGluIHN0cmljdCBtb2RlXG4gICAgICAgICAqIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9FcnJvcnMvR2V0dGVyX29ubHl9XG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0XG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIG9uY2UgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBXSU5ET1cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgIFdJTkRPVy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0JywgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gc3VwcG9ydGVkO1xuICB9KCk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGV2ZW50IHRhcmdldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgZXZlbnQgbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIGV2ZW50IG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihlbGVtZW50LCB0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcbiAgICB2YXIgaGFuZGxlciA9IGxpc3RlbmVyO1xuICAgIHR5cGUudHJpbSgpLnNwbGl0KFJFR0VYUF9TUEFDRVMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoIW9uY2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IGVsZW1lbnQubGlzdGVuZXJzO1xuICAgICAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVyc1tldmVudF0gJiYgbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl0pIHtcbiAgICAgICAgICBoYW5kbGVyID0gbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl07XG4gICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdO1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0ZW5lcnNbZXZlbnRdKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdGVuZXJzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50Lmxpc3RlbmVycztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGV2ZW50IHRhcmdldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgZXZlbnQgbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIGV2ZW50IG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcihlbGVtZW50LCB0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcbiAgICB2YXIgX2hhbmRsZXIgPSBsaXN0ZW5lcjtcbiAgICB0eXBlLnRyaW0oKS5zcGxpdChSRUdFWFBfU1BBQ0VTKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKG9wdGlvbnMub25jZSAmJiAhb25jZVN1cHBvcnRlZCkge1xuICAgICAgICB2YXIgX2VsZW1lbnQkbGlzdGVuZXJzID0gZWxlbWVudC5saXN0ZW5lcnMsXG4gICAgICAgICAgbGlzdGVuZXJzID0gX2VsZW1lbnQkbGlzdGVuZXJzID09PSB2b2lkIDAgPyB7fSA6IF9lbGVtZW50JGxpc3RlbmVycztcbiAgICAgICAgX2hhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIF9oYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdGVuZXIuYXBwbHkoZWxlbWVudCwgYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghbGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICAgIGxpc3RlbmVyc1tldmVudF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl0pIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXSA9IF9oYW5kbGVyO1xuICAgICAgICBlbGVtZW50Lmxpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgX2hhbmRsZXIsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGV2ZW50IG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGV2ZW50IHRhcmdldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgYWRkaXRpb25hbCBldmVudCBkYXRhLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gSW5kaWNhdGUgaWYgdGhlIGV2ZW50IGlzIGRlZmF1bHQgcHJldmVudGVkIG9yIG5vdC5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudCwgdHlwZSwgZGF0YSkge1xuICAgIHZhciBldmVudDtcblxuICAgIC8vIEV2ZW50IGFuZCBDdXN0b21FdmVudCBvbiBJRTktMTEgYXJlIGdsb2JhbCBvYmplY3RzLCBub3QgY29uc3RydWN0b3JzXG4gICAgaWYgKGlzRnVuY3Rpb24oRXZlbnQpICYmIGlzRnVuY3Rpb24oQ3VzdG9tRXZlbnQpKSB7XG4gICAgICBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgIGRldGFpbDogZGF0YSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb2Zmc2V0IGJhc2Ugb24gdGhlIGRvY3VtZW50LlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBvZmZzZXQgZGF0YS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldE9mZnNldChlbGVtZW50KSB7XG4gICAgdmFyIGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0KSxcbiAgICAgIHRvcDogYm94LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wKVxuICAgIH07XG4gIH1cbiAgdmFyIGxvY2F0aW9uID0gV0lORE9XLmxvY2F0aW9uO1xuICB2YXIgUkVHRVhQX09SSUdJTlMgPSAvXihcXHcrOilcXC9cXC8oW146Lz8jXSopOj8oXFxkKikvaTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBpcyBhIGNyb3NzIG9yaWdpbiBVUkwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdGFyZ2V0IFVSTC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiBVUkwgaXMgYSBjcm9zcyBvcmlnaW4gVVJMLCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBpc0Nyb3NzT3JpZ2luVVJMKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHVybC5tYXRjaChSRUdFWFBfT1JJR0lOUyk7XG4gICAgcmV0dXJuIHBhcnRzICE9PSBudWxsICYmIChwYXJ0c1sxXSAhPT0gbG9jYXRpb24ucHJvdG9jb2wgfHwgcGFydHNbMl0gIT09IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBhcnRzWzNdICE9PSBsb2NhdGlvbi5wb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGltZXN0YW1wIHRvIHRoZSBnaXZlbiBVUkwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdGFyZ2V0IFVSTC5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBVUkwuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUaW1lc3RhbXAodXJsKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IFwidGltZXN0YW1wPVwiLmNvbmNhdChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgcmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyB0aW1lc3RhbXA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRyYW5zZm9ybXMgYmFzZSBvbiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIHRhcmdldCBvYmplY3QuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5zIHRyYW5zZm9ybSB2YWx1ZXMuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKF9yZWYpIHtcbiAgICB2YXIgcm90YXRlID0gX3JlZi5yb3RhdGUsXG4gICAgICBzY2FsZVggPSBfcmVmLnNjYWxlWCxcbiAgICAgIHNjYWxlWSA9IF9yZWYuc2NhbGVZLFxuICAgICAgdHJhbnNsYXRlWCA9IF9yZWYudHJhbnNsYXRlWCxcbiAgICAgIHRyYW5zbGF0ZVkgPSBfcmVmLnRyYW5zbGF0ZVk7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGlmIChpc051bWJlcih0cmFuc2xhdGVYKSAmJiB0cmFuc2xhdGVYICE9PSAwKSB7XG4gICAgICB2YWx1ZXMucHVzaChcInRyYW5zbGF0ZVgoXCIuY29uY2F0KHRyYW5zbGF0ZVgsIFwicHgpXCIpKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKHRyYW5zbGF0ZVkpICYmIHRyYW5zbGF0ZVkgIT09IDApIHtcbiAgICAgIHZhbHVlcy5wdXNoKFwidHJhbnNsYXRlWShcIi5jb25jYXQodHJhbnNsYXRlWSwgXCJweClcIikpO1xuICAgIH1cblxuICAgIC8vIFJvdGF0ZSBzaG91bGQgY29tZSBmaXJzdCBiZWZvcmUgc2NhbGUgdG8gbWF0Y2ggb3JpZW50YXRpb24gdHJhbnNmb3JtXG4gICAgaWYgKGlzTnVtYmVyKHJvdGF0ZSkgJiYgcm90YXRlICE9PSAwKSB7XG4gICAgICB2YWx1ZXMucHVzaChcInJvdGF0ZShcIi5jb25jYXQocm90YXRlLCBcImRlZylcIikpO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoc2NhbGVYKSAmJiBzY2FsZVggIT09IDEpIHtcbiAgICAgIHZhbHVlcy5wdXNoKFwic2NhbGVYKFwiLmNvbmNhdChzY2FsZVgsIFwiKVwiKSk7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihzY2FsZVkpICYmIHNjYWxlWSAhPT0gMSkge1xuICAgICAgdmFsdWVzLnB1c2goXCJzY2FsZVkoXCIuY29uY2F0KHNjYWxlWSwgXCIpXCIpKTtcbiAgICB9XG4gICAgdmFyIHRyYW5zZm9ybSA9IHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMuam9pbignICcpIDogJ25vbmUnO1xuICAgIHJldHVybiB7XG4gICAgICBXZWJraXRUcmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgIG1zVHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXggcmF0aW8gb2YgYSBncm91cCBvZiBwb2ludGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBvaW50ZXJzIC0gVGhlIHRhcmdldCBwb2ludGVycy5cbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHJlc3VsdCByYXRpby5cbiAgICovXG4gIGZ1bmN0aW9uIGdldE1heFpvb21SYXRpbyhwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyczIgPSBfb2JqZWN0U3ByZWFkMih7fSwgcG9pbnRlcnMpO1xuICAgIHZhciBtYXhSYXRpbyA9IDA7XG4gICAgZm9yRWFjaChwb2ludGVycywgZnVuY3Rpb24gKHBvaW50ZXIsIHBvaW50ZXJJZCkge1xuICAgICAgZGVsZXRlIHBvaW50ZXJzMltwb2ludGVySWRdO1xuICAgICAgZm9yRWFjaChwb2ludGVyczIsIGZ1bmN0aW9uIChwb2ludGVyMikge1xuICAgICAgICB2YXIgeDEgPSBNYXRoLmFicyhwb2ludGVyLnN0YXJ0WCAtIHBvaW50ZXIyLnN0YXJ0WCk7XG4gICAgICAgIHZhciB5MSA9IE1hdGguYWJzKHBvaW50ZXIuc3RhcnRZIC0gcG9pbnRlcjIuc3RhcnRZKTtcbiAgICAgICAgdmFyIHgyID0gTWF0aC5hYnMocG9pbnRlci5lbmRYIC0gcG9pbnRlcjIuZW5kWCk7XG4gICAgICAgIHZhciB5MiA9IE1hdGguYWJzKHBvaW50ZXIuZW5kWSAtIHBvaW50ZXIyLmVuZFkpO1xuICAgICAgICB2YXIgejEgPSBNYXRoLnNxcnQoeDEgKiB4MSArIHkxICogeTEpO1xuICAgICAgICB2YXIgejIgPSBNYXRoLnNxcnQoeDIgKiB4MiArIHkyICogeTIpO1xuICAgICAgICB2YXIgcmF0aW8gPSAoejIgLSB6MSkgLyB6MTtcbiAgICAgICAgaWYgKE1hdGguYWJzKHJhdGlvKSA+IE1hdGguYWJzKG1heFJhdGlvKSkge1xuICAgICAgICAgIG1heFJhdGlvID0gcmF0aW87XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBtYXhSYXRpbztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBwb2ludGVyIGZyb20gYW4gZXZlbnQgb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgdGFyZ2V0IGV2ZW50IG9iamVjdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBlbmRPbmx5IC0gSW5kaWNhdGVzIGlmIG9ubHkgcmV0dXJucyB0aGUgZW5kIHBvaW50IGNvb3JkaW5hdGUgb3Igbm90LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IHBvaW50ZXIgY29udGFpbnMgc3RhcnQgYW5kL29yIGVuZCBwb2ludCBjb29yZGluYXRlcy5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFBvaW50ZXIoX3JlZjIsIGVuZE9ubHkpIHtcbiAgICB2YXIgcGFnZVggPSBfcmVmMi5wYWdlWCxcbiAgICAgIHBhZ2VZID0gX3JlZjIucGFnZVk7XG4gICAgdmFyIGVuZCA9IHtcbiAgICAgIGVuZFg6IHBhZ2VYLFxuICAgICAgZW5kWTogcGFnZVlcbiAgICB9O1xuICAgIHJldHVybiBlbmRPbmx5ID8gZW5kIDogX29iamVjdFNwcmVhZDIoe1xuICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgIHN0YXJ0WTogcGFnZVlcbiAgICB9LCBlbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2VudGVyIHBvaW50IGNvb3JkaW5hdGUgb2YgYSBncm91cCBvZiBwb2ludGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBvaW50ZXJzIC0gVGhlIHRhcmdldCBwb2ludGVycy5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIGNlbnRlciBwb2ludCBjb29yZGluYXRlLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0UG9pbnRlcnNDZW50ZXIocG9pbnRlcnMpIHtcbiAgICB2YXIgcGFnZVggPSAwO1xuICAgIHZhciBwYWdlWSA9IDA7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICBmb3JFYWNoKHBvaW50ZXJzLCBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciBzdGFydFggPSBfcmVmMy5zdGFydFgsXG4gICAgICAgIHN0YXJ0WSA9IF9yZWYzLnN0YXJ0WTtcbiAgICAgIHBhZ2VYICs9IHN0YXJ0WDtcbiAgICAgIHBhZ2VZICs9IHN0YXJ0WTtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfSk7XG4gICAgcGFnZVggLz0gY291bnQ7XG4gICAgcGFnZVkgLz0gY291bnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2VYOiBwYWdlWCxcbiAgICAgIHBhZ2VZOiBwYWdlWVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXggc2l6ZXMgaW4gYSByZWN0YW5nbGUgdW5kZXIgdGhlIGdpdmVuIGFzcGVjdCByYXRpby5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgb3JpZ2luYWwgc2l6ZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0nY29udGFpbiddIC0gVGhlIGFkanVzdCB0eXBlLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IHNpemVzLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0QWRqdXN0ZWRTaXplcyhfcmVmNCkge1xuICAgIHZhciBhc3BlY3RSYXRpbyA9IF9yZWY0LmFzcGVjdFJhdGlvLFxuICAgICAgaGVpZ2h0ID0gX3JlZjQuaGVpZ2h0LFxuICAgICAgd2lkdGggPSBfcmVmNC53aWR0aDtcbiAgICB2YXIgdHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2NvbnRhaW4nO1xuICAgIHZhciBpc1ZhbGlkV2lkdGggPSBpc1Bvc2l0aXZlTnVtYmVyKHdpZHRoKTtcbiAgICB2YXIgaXNWYWxpZEhlaWdodCA9IGlzUG9zaXRpdmVOdW1iZXIoaGVpZ2h0KTtcbiAgICBpZiAoaXNWYWxpZFdpZHRoICYmIGlzVmFsaWRIZWlnaHQpIHtcbiAgICAgIHZhciBhZGp1c3RlZFdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICBpZiAodHlwZSA9PT0gJ2NvbnRhaW4nICYmIGFkanVzdGVkV2lkdGggPiB3aWR0aCB8fCB0eXBlID09PSAnY292ZXInICYmIGFkanVzdGVkV2lkdGggPCB3aWR0aCkge1xuICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRXaWR0aCkge1xuICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRIZWlnaHQpIHtcbiAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuZXcgc2l6ZXMgb2YgYSByZWN0YW5nbGUgYWZ0ZXIgcm90YXRlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgb3JpZ2luYWwgc2l6ZXMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgc2l6ZXMuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRSb3RhdGVkU2l6ZXMoX3JlZjUpIHtcbiAgICB2YXIgd2lkdGggPSBfcmVmNS53aWR0aCxcbiAgICAgIGhlaWdodCA9IF9yZWY1LmhlaWdodCxcbiAgICAgIGRlZ3JlZSA9IF9yZWY1LmRlZ3JlZTtcbiAgICBkZWdyZWUgPSBNYXRoLmFicyhkZWdyZWUpICUgMTgwO1xuICAgIGlmIChkZWdyZWUgPT09IDkwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogaGVpZ2h0LFxuICAgICAgICBoZWlnaHQ6IHdpZHRoXG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgYXJjID0gZGVncmVlICUgOTAgKiBNYXRoLlBJIC8gMTgwO1xuICAgIHZhciBzaW5BcmMgPSBNYXRoLnNpbihhcmMpO1xuICAgIHZhciBjb3NBcmMgPSBNYXRoLmNvcyhhcmMpO1xuICAgIHZhciBuZXdXaWR0aCA9IHdpZHRoICogY29zQXJjICsgaGVpZ2h0ICogc2luQXJjO1xuICAgIHZhciBuZXdIZWlnaHQgPSB3aWR0aCAqIHNpbkFyYyArIGhlaWdodCAqIGNvc0FyYztcbiAgICByZXR1cm4gZGVncmVlID4gOTAgPyB7XG4gICAgICB3aWR0aDogbmV3SGVpZ2h0LFxuICAgICAgaGVpZ2h0OiBuZXdXaWR0aFxuICAgIH0gOiB7XG4gICAgICB3aWR0aDogbmV3V2lkdGgsXG4gICAgICBoZWlnaHQ6IG5ld0hlaWdodFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY2FudmFzIHdoaWNoIGRyZXcgdGhlIGdpdmVuIGltYWdlLlxuICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltYWdlIC0gVGhlIGltYWdlIGZvciBkcmF3aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VEYXRhIC0gVGhlIGltYWdlIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjYW52YXNEYXRhIC0gVGhlIGNhbnZhcyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR9IFRoZSByZXN1bHQgY2FudmFzLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U291cmNlQ2FudmFzKGltYWdlLCBfcmVmNiwgX3JlZjcsIF9yZWY4KSB7XG4gICAgdmFyIGltYWdlQXNwZWN0UmF0aW8gPSBfcmVmNi5hc3BlY3RSYXRpbyxcbiAgICAgIGltYWdlTmF0dXJhbFdpZHRoID0gX3JlZjYubmF0dXJhbFdpZHRoLFxuICAgICAgaW1hZ2VOYXR1cmFsSGVpZ2h0ID0gX3JlZjYubmF0dXJhbEhlaWdodCxcbiAgICAgIF9yZWY2JHJvdGF0ZSA9IF9yZWY2LnJvdGF0ZSxcbiAgICAgIHJvdGF0ZSA9IF9yZWY2JHJvdGF0ZSA9PT0gdm9pZCAwID8gMCA6IF9yZWY2JHJvdGF0ZSxcbiAgICAgIF9yZWY2JHNjYWxlWCA9IF9yZWY2LnNjYWxlWCxcbiAgICAgIHNjYWxlWCA9IF9yZWY2JHNjYWxlWCA9PT0gdm9pZCAwID8gMSA6IF9yZWY2JHNjYWxlWCxcbiAgICAgIF9yZWY2JHNjYWxlWSA9IF9yZWY2LnNjYWxlWSxcbiAgICAgIHNjYWxlWSA9IF9yZWY2JHNjYWxlWSA9PT0gdm9pZCAwID8gMSA6IF9yZWY2JHNjYWxlWTtcbiAgICB2YXIgYXNwZWN0UmF0aW8gPSBfcmVmNy5hc3BlY3RSYXRpbyxcbiAgICAgIG5hdHVyYWxXaWR0aCA9IF9yZWY3Lm5hdHVyYWxXaWR0aCxcbiAgICAgIG5hdHVyYWxIZWlnaHQgPSBfcmVmNy5uYXR1cmFsSGVpZ2h0O1xuICAgIHZhciBfcmVmOCRmaWxsQ29sb3IgPSBfcmVmOC5maWxsQ29sb3IsXG4gICAgICBmaWxsQ29sb3IgPSBfcmVmOCRmaWxsQ29sb3IgPT09IHZvaWQgMCA/ICd0cmFuc3BhcmVudCcgOiBfcmVmOCRmaWxsQ29sb3IsXG4gICAgICBfcmVmOCRpbWFnZVNtb290aGluZ0UgPSBfcmVmOC5pbWFnZVNtb290aGluZ0VuYWJsZWQsXG4gICAgICBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSBfcmVmOCRpbWFnZVNtb290aGluZ0UgPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmOCRpbWFnZVNtb290aGluZ0UsXG4gICAgICBfcmVmOCRpbWFnZVNtb290aGluZ1EgPSBfcmVmOC5pbWFnZVNtb290aGluZ1F1YWxpdHksXG4gICAgICBpbWFnZVNtb290aGluZ1F1YWxpdHkgPSBfcmVmOCRpbWFnZVNtb290aGluZ1EgPT09IHZvaWQgMCA/ICdsb3cnIDogX3JlZjgkaW1hZ2VTbW9vdGhpbmdRLFxuICAgICAgX3JlZjgkbWF4V2lkdGggPSBfcmVmOC5tYXhXaWR0aCxcbiAgICAgIG1heFdpZHRoID0gX3JlZjgkbWF4V2lkdGggPT09IHZvaWQgMCA/IEluZmluaXR5IDogX3JlZjgkbWF4V2lkdGgsXG4gICAgICBfcmVmOCRtYXhIZWlnaHQgPSBfcmVmOC5tYXhIZWlnaHQsXG4gICAgICBtYXhIZWlnaHQgPSBfcmVmOCRtYXhIZWlnaHQgPT09IHZvaWQgMCA/IEluZmluaXR5IDogX3JlZjgkbWF4SGVpZ2h0LFxuICAgICAgX3JlZjgkbWluV2lkdGggPSBfcmVmOC5taW5XaWR0aCxcbiAgICAgIG1pbldpZHRoID0gX3JlZjgkbWluV2lkdGggPT09IHZvaWQgMCA/IDAgOiBfcmVmOCRtaW5XaWR0aCxcbiAgICAgIF9yZWY4JG1pbkhlaWdodCA9IF9yZWY4Lm1pbkhlaWdodCxcbiAgICAgIG1pbkhlaWdodCA9IF9yZWY4JG1pbkhlaWdodCA9PT0gdm9pZCAwID8gMCA6IF9yZWY4JG1pbkhlaWdodDtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB2YXIgbWF4U2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgIGFzcGVjdFJhdGlvOiBhc3BlY3RSYXRpbyxcbiAgICAgIHdpZHRoOiBtYXhXaWR0aCxcbiAgICAgIGhlaWdodDogbWF4SGVpZ2h0XG4gICAgfSk7XG4gICAgdmFyIG1pblNpemVzID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgICBhc3BlY3RSYXRpbzogYXNwZWN0UmF0aW8sXG4gICAgICB3aWR0aDogbWluV2lkdGgsXG4gICAgICBoZWlnaHQ6IG1pbkhlaWdodFxuICAgIH0sICdjb3ZlcicpO1xuICAgIHZhciB3aWR0aCA9IE1hdGgubWluKG1heFNpemVzLndpZHRoLCBNYXRoLm1heChtaW5TaXplcy53aWR0aCwgbmF0dXJhbFdpZHRoKSk7XG4gICAgdmFyIGhlaWdodCA9IE1hdGgubWluKG1heFNpemVzLmhlaWdodCwgTWF0aC5tYXgobWluU2l6ZXMuaGVpZ2h0LCBuYXR1cmFsSGVpZ2h0KSk7XG5cbiAgICAvLyBOb3RlOiBzaG91bGQgYWx3YXlzIHVzZSBpbWFnZSdzIG5hdHVyYWwgc2l6ZXMgZm9yIGRyYXdpbmcgYXNcbiAgICAvLyBpbWFnZURhdGEubmF0dXJhbFdpZHRoID09PSBjYW52YXNEYXRhLm5hdHVyYWxIZWlnaHQgd2hlbiByb3RhdGUgJSAxODAgPT09IDkwXG4gICAgdmFyIGRlc3RNYXhTaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgICAgYXNwZWN0UmF0aW86IGltYWdlQXNwZWN0UmF0aW8sXG4gICAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgICBoZWlnaHQ6IG1heEhlaWdodFxuICAgIH0pO1xuICAgIHZhciBkZXN0TWluU2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgIGFzcGVjdFJhdGlvOiBpbWFnZUFzcGVjdFJhdGlvLFxuICAgICAgd2lkdGg6IG1pbldpZHRoLFxuICAgICAgaGVpZ2h0OiBtaW5IZWlnaHRcbiAgICB9LCAnY292ZXInKTtcbiAgICB2YXIgZGVzdFdpZHRoID0gTWF0aC5taW4oZGVzdE1heFNpemVzLndpZHRoLCBNYXRoLm1heChkZXN0TWluU2l6ZXMud2lkdGgsIGltYWdlTmF0dXJhbFdpZHRoKSk7XG4gICAgdmFyIGRlc3RIZWlnaHQgPSBNYXRoLm1pbihkZXN0TWF4U2l6ZXMuaGVpZ2h0LCBNYXRoLm1heChkZXN0TWluU2l6ZXMuaGVpZ2h0LCBpbWFnZU5hdHVyYWxIZWlnaHQpKTtcbiAgICB2YXIgcGFyYW1zID0gWy1kZXN0V2lkdGggLyAyLCAtZGVzdEhlaWdodCAvIDIsIGRlc3RXaWR0aCwgZGVzdEhlaWdodF07XG4gICAgY2FudmFzLndpZHRoID0gbm9ybWFsaXplRGVjaW1hbE51bWJlcih3aWR0aCk7XG4gICAgY2FudmFzLmhlaWdodCA9IG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIoaGVpZ2h0KTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGNvbnRleHQudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgY29udGV4dC5yb3RhdGUocm90YXRlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgY29udGV4dC5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBpbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBpbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UuYXBwbHkoY29udGV4dCwgW2ltYWdlXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHBhcmFtcy5tYXAoZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihub3JtYWxpemVEZWNpbWFsTnVtYmVyKHBhcmFtKSk7XG4gICAgfSkpKSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuICB2YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuICAvKipcbiAgICogR2V0IHN0cmluZyBmcm9tIGNoYXIgY29kZSBpbiBkYXRhIHZpZXcuXG4gICAqIEBwYXJhbSB7RGF0YVZpZXd9IGRhdGFWaWV3IC0gVGhlIGRhdGEgdmlldyBmb3IgcmVhZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gVGhlIHN0YXJ0IGluZGV4LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHJlYWQgbGVuZ3RoLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVhZCByZXN1bHQuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdHJpbmdGcm9tQ2hhckNvZGUoZGF0YVZpZXcsIHN0YXJ0LCBsZW5ndGgpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgbGVuZ3RoICs9IHN0YXJ0O1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBzdHIgKz0gZnJvbUNoYXJDb2RlKGRhdGFWaWV3LmdldFVpbnQ4KGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuICB2YXIgUkVHRVhQX0RBVEFfVVJMX0hFQUQgPSAvXmRhdGE6LiosLztcblxuICAvKipcbiAgICogVHJhbnNmb3JtIERhdGEgVVJMIHRvIGFycmF5IGJ1ZmZlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFVUkwgLSBUaGUgRGF0YSBVUkwgdG8gdHJhbnNmb3JtLlxuICAgKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFRoZSByZXN1bHQgYXJyYXkgYnVmZmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gZGF0YVVSTFRvQXJyYXlCdWZmZXIoZGF0YVVSTCkge1xuICAgIHZhciBiYXNlNjQgPSBkYXRhVVJMLnJlcGxhY2UoUkVHRVhQX0RBVEFfVVJMX0hFQUQsICcnKTtcbiAgICB2YXIgYmluYXJ5ID0gYXRvYihiYXNlNjQpO1xuICAgIHZhciBhcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihiaW5hcnkubGVuZ3RoKTtcbiAgICB2YXIgdWludDggPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgZm9yRWFjaCh1aW50OCwgZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgICB1aW50OFtpXSA9IGJpbmFyeS5jaGFyQ29kZUF0KGkpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnJheUJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gYXJyYXkgYnVmZmVyIHRvIERhdGEgVVJMLlxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciAtIFRoZSBhcnJheSBidWZmZXIgdG8gdHJhbnNmb3JtLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWltZVR5cGUgLSBUaGUgbWltZSB0eXBlIG9mIHRoZSBEYXRhIFVSTC5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBEYXRhIFVSTC5cbiAgICovXG4gIGZ1bmN0aW9uIGFycmF5QnVmZmVyVG9EYXRhVVJMKGFycmF5QnVmZmVyLCBtaW1lVHlwZSkge1xuICAgIHZhciBjaHVua3MgPSBbXTtcblxuICAgIC8vIENodW5rIFR5cGVkIEFycmF5IGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UgKCM0MzUpXG4gICAgdmFyIGNodW5rU2l6ZSA9IDgxOTI7XG4gICAgdmFyIHVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICAgIHdoaWxlICh1aW50OC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBYWFg6IEJhYmVsJ3MgYHRvQ29uc3VtYWJsZUFycmF5YCBoZWxwZXIgd2lsbCB0aHJvdyBlcnJvciBpbiBJRSBvciBTYWZhcmkgOVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1zcHJlYWRcbiAgICAgIGNodW5rcy5wdXNoKGZyb21DaGFyQ29kZS5hcHBseShudWxsLCB0b0FycmF5KHVpbnQ4LnN1YmFycmF5KDAsIGNodW5rU2l6ZSkpKSk7XG4gICAgICB1aW50OCA9IHVpbnQ4LnN1YmFycmF5KGNodW5rU2l6ZSk7XG4gICAgfVxuICAgIHJldHVybiBcImRhdGE6XCIuY29uY2F0KG1pbWVUeXBlLCBcIjtiYXNlNjQsXCIpLmNvbmNhdChidG9hKGNodW5rcy5qb2luKCcnKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvcmllbnRhdGlvbiB2YWx1ZSBmcm9tIGdpdmVuIGFycmF5IGJ1ZmZlci5cbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHJlYWQuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZWFkIG9yaWVudGF0aW9uIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gcmVzZXRBbmRHZXRPcmllbnRhdGlvbihhcnJheUJ1ZmZlcikge1xuICAgIHZhciBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhhcnJheUJ1ZmZlcik7XG4gICAgdmFyIG9yaWVudGF0aW9uO1xuXG4gICAgLy8gSWdub3JlcyByYW5nZSBlcnJvciB3aGVuIHRoZSBpbWFnZSBkb2VzIG5vdCBoYXZlIGNvcnJlY3QgRXhpZiBpbmZvcm1hdGlvblxuICAgIHRyeSB7XG4gICAgICB2YXIgbGl0dGxlRW5kaWFuO1xuICAgICAgdmFyIGFwcDFTdGFydDtcbiAgICAgIHZhciBpZmRTdGFydDtcblxuICAgICAgLy8gT25seSBoYW5kbGUgSlBFRyBpbWFnZSAoc3RhcnQgYnkgMHhGRkQ4KVxuICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQ4KDApID09PSAweEZGICYmIGRhdGFWaWV3LmdldFVpbnQ4KDEpID09PSAweEQ4KSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhVmlldy5ieXRlTGVuZ3RoO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gMjtcbiAgICAgICAgd2hpbGUgKG9mZnNldCArIDEgPCBsZW5ndGgpIHtcbiAgICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDgob2Zmc2V0KSA9PT0gMHhGRiAmJiBkYXRhVmlldy5nZXRVaW50OChvZmZzZXQgKyAxKSA9PT0gMHhFMSkge1xuICAgICAgICAgICAgYXBwMVN0YXJ0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYXBwMVN0YXJ0KSB7XG4gICAgICAgIHZhciBleGlmSURDb2RlID0gYXBwMVN0YXJ0ICsgNDtcbiAgICAgICAgdmFyIHRpZmZPZmZzZXQgPSBhcHAxU3RhcnQgKyAxMDtcbiAgICAgICAgaWYgKGdldFN0cmluZ0Zyb21DaGFyQ29kZShkYXRhVmlldywgZXhpZklEQ29kZSwgNCkgPT09ICdFeGlmJykge1xuICAgICAgICAgIHZhciBlbmRpYW5uZXNzID0gZGF0YVZpZXcuZ2V0VWludDE2KHRpZmZPZmZzZXQpO1xuICAgICAgICAgIGxpdHRsZUVuZGlhbiA9IGVuZGlhbm5lc3MgPT09IDB4NDk0OTtcbiAgICAgICAgICBpZiAobGl0dGxlRW5kaWFuIHx8IGVuZGlhbm5lc3MgPT09IDB4NEQ0RCAvKiBiaWdFbmRpYW4gKi8pIHtcbiAgICAgICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCArIDIsIGxpdHRsZUVuZGlhbikgPT09IDB4MDAyQSkge1xuICAgICAgICAgICAgICB2YXIgZmlyc3RJRkRPZmZzZXQgPSBkYXRhVmlldy5nZXRVaW50MzIodGlmZk9mZnNldCArIDQsIGxpdHRsZUVuZGlhbik7XG4gICAgICAgICAgICAgIGlmIChmaXJzdElGRE9mZnNldCA+PSAweDAwMDAwMDA4KSB7XG4gICAgICAgICAgICAgICAgaWZkU3RhcnQgPSB0aWZmT2Zmc2V0ICsgZmlyc3RJRkRPZmZzZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZmRTdGFydCkge1xuICAgICAgICB2YXIgX2xlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQxNihpZmRTdGFydCwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgdmFyIF9vZmZzZXQ7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgX2xlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgX29mZnNldCA9IGlmZFN0YXJ0ICsgaSAqIDEyICsgMjtcbiAgICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDE2KF9vZmZzZXQsIGxpdHRsZUVuZGlhbikgPT09IDB4MDExMiAvKiBPcmllbnRhdGlvbiAqLykge1xuICAgICAgICAgICAgLy8gOCBpcyB0aGUgb2Zmc2V0IG9mIHRoZSBjdXJyZW50IHRhZydzIHZhbHVlXG4gICAgICAgICAgICBfb2Zmc2V0ICs9IDg7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgb3JpZ2luYWwgb3JpZW50YXRpb24gdmFsdWVcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gZGF0YVZpZXcuZ2V0VWludDE2KF9vZmZzZXQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgICAgIC8vIE92ZXJyaWRlIHRoZSBvcmllbnRhdGlvbiB3aXRoIGl0cyBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICBkYXRhVmlldy5zZXRVaW50MTYoX29mZnNldCwgMSwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvcmllbnRhdGlvbiA9IDE7XG4gICAgfVxuICAgIHJldHVybiBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBFeGlmIE9yaWVudGF0aW9uIHZhbHVlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSBUaGUgb3JpZW50YXRpb24gdG8gcGFyc2UuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBwYXJzZWQgcmVzdWx0LlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICAgIHZhciByb3RhdGUgPSAwO1xuICAgIHZhciBzY2FsZVggPSAxO1xuICAgIHZhciBzY2FsZVkgPSAxO1xuICAgIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAgIC8vIEZsaXAgaG9yaXpvbnRhbFxuICAgICAgY2FzZSAyOlxuICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIFJvdGF0ZSBsZWZ0IDE4MMKwXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJvdGF0ZSA9IC0xODA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBGbGlwIHZlcnRpY2FsXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHNjYWxlWSA9IC0xO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gRmxpcCB2ZXJ0aWNhbCBhbmQgcm90YXRlIHJpZ2h0IDkwwrBcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcm90YXRlID0gOTA7XG4gICAgICAgIHNjYWxlWSA9IC0xO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gUm90YXRlIHJpZ2h0IDkwwrBcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcm90YXRlID0gOTA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBGbGlwIGhvcml6b250YWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIFJvdGF0ZSBsZWZ0IDkwwrBcbiAgICAgIGNhc2UgODpcbiAgICAgICAgcm90YXRlID0gLTkwO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdGF0ZTogcm90YXRlLFxuICAgICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgICBzY2FsZVk6IHNjYWxlWVxuICAgIH07XG4gIH1cblxuICB2YXIgcmVuZGVyID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdGhpcy5pbml0Q29udGFpbmVyKCk7XG4gICAgICB0aGlzLmluaXRDYW52YXMoKTtcbiAgICAgIHRoaXMuaW5pdENyb3BCb3goKTtcbiAgICAgIHRoaXMucmVuZGVyQ2FudmFzKCk7XG4gICAgICBpZiAodGhpcy5jcm9wcGVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQ3JvcEJveCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaW5pdENvbnRhaW5lcjogZnVuY3Rpb24gaW5pdENvbnRhaW5lcigpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50LFxuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgY3JvcHBlciA9IHRoaXMuY3JvcHBlcjtcbiAgICAgIHZhciBtaW5XaWR0aCA9IE51bWJlcihvcHRpb25zLm1pbkNvbnRhaW5lcldpZHRoKTtcbiAgICAgIHZhciBtaW5IZWlnaHQgPSBOdW1iZXIob3B0aW9ucy5taW5Db250YWluZXJIZWlnaHQpO1xuICAgICAgYWRkQ2xhc3MoY3JvcHBlciwgQ0xBU1NfSElEREVOKTtcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIENMQVNTX0hJRERFTik7XG4gICAgICB2YXIgY29udGFpbmVyRGF0YSA9IHtcbiAgICAgICAgd2lkdGg6IE1hdGgubWF4KGNvbnRhaW5lci5vZmZzZXRXaWR0aCwgbWluV2lkdGggPj0gMCA/IG1pbldpZHRoIDogTUlOX0NPTlRBSU5FUl9XSURUSCksXG4gICAgICAgIGhlaWdodDogTWF0aC5tYXgoY29udGFpbmVyLm9mZnNldEhlaWdodCwgbWluSGVpZ2h0ID49IDAgPyBtaW5IZWlnaHQgOiBNSU5fQ09OVEFJTkVSX0hFSUdIVClcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbnRhaW5lckRhdGEgPSBjb250YWluZXJEYXRhO1xuICAgICAgc2V0U3R5bGUoY3JvcHBlciwge1xuICAgICAgICB3aWR0aDogY29udGFpbmVyRGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb250YWluZXJEYXRhLmhlaWdodFxuICAgICAgfSk7XG4gICAgICBhZGRDbGFzcyhlbGVtZW50LCBDTEFTU19ISURERU4pO1xuICAgICAgcmVtb3ZlQ2xhc3MoY3JvcHBlciwgQ0xBU1NfSElEREVOKTtcbiAgICB9LFxuICAgIC8vIENhbnZhcyAoaW1hZ2Ugd3JhcHBlcilcbiAgICBpbml0Q2FudmFzOiBmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICAgICAgdmFyIGNvbnRhaW5lckRhdGEgPSB0aGlzLmNvbnRhaW5lckRhdGEsXG4gICAgICAgIGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhO1xuICAgICAgdmFyIHZpZXdNb2RlID0gdGhpcy5vcHRpb25zLnZpZXdNb2RlO1xuICAgICAgdmFyIHJvdGF0ZWQgPSBNYXRoLmFicyhpbWFnZURhdGEucm90YXRlKSAlIDE4MCA9PT0gOTA7XG4gICAgICB2YXIgbmF0dXJhbFdpZHRoID0gcm90YXRlZCA/IGltYWdlRGF0YS5uYXR1cmFsSGVpZ2h0IDogaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aDtcbiAgICAgIHZhciBuYXR1cmFsSGVpZ2h0ID0gcm90YXRlZCA/IGltYWdlRGF0YS5uYXR1cmFsV2lkdGggOiBpbWFnZURhdGEubmF0dXJhbEhlaWdodDtcbiAgICAgIHZhciBhc3BlY3RSYXRpbyA9IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHQ7XG4gICAgICB2YXIgY2FudmFzV2lkdGggPSBjb250YWluZXJEYXRhLndpZHRoO1xuICAgICAgdmFyIGNhbnZhc0hlaWdodCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuICAgICAgaWYgKGNvbnRhaW5lckRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBjb250YWluZXJEYXRhLndpZHRoKSB7XG4gICAgICAgIGlmICh2aWV3TW9kZSA9PT0gMykge1xuICAgICAgICAgIGNhbnZhc1dpZHRoID0gY29udGFpbmVyRGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYW52YXNIZWlnaHQgPSBjb250YWluZXJEYXRhLndpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT09IDMpIHtcbiAgICAgICAgY2FudmFzSGVpZ2h0ID0gY29udGFpbmVyRGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzV2lkdGggPSBjb250YWluZXJEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgfVxuICAgICAgdmFyIGNhbnZhc0RhdGEgPSB7XG4gICAgICAgIGFzcGVjdFJhdGlvOiBhc3BlY3RSYXRpbyxcbiAgICAgICAgbmF0dXJhbFdpZHRoOiBuYXR1cmFsV2lkdGgsXG4gICAgICAgIG5hdHVyYWxIZWlnaHQ6IG5hdHVyYWxIZWlnaHQsXG4gICAgICAgIHdpZHRoOiBjYW52YXNXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYW52YXNIZWlnaHRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhbnZhc0RhdGEgPSBjYW52YXNEYXRhO1xuICAgICAgdGhpcy5saW1pdGVkID0gdmlld01vZGUgPT09IDEgfHwgdmlld01vZGUgPT09IDI7XG4gICAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIHRydWUpO1xuICAgICAgY2FudmFzRGF0YS53aWR0aCA9IE1hdGgubWluKE1hdGgubWF4KGNhbnZhc0RhdGEud2lkdGgsIGNhbnZhc0RhdGEubWluV2lkdGgpLCBjYW52YXNEYXRhLm1heFdpZHRoKTtcbiAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5tYXgoY2FudmFzRGF0YS5oZWlnaHQsIGNhbnZhc0RhdGEubWluSGVpZ2h0KSwgY2FudmFzRGF0YS5tYXhIZWlnaHQpO1xuICAgICAgY2FudmFzRGF0YS5sZWZ0ID0gKGNvbnRhaW5lckRhdGEud2lkdGggLSBjYW52YXNEYXRhLndpZHRoKSAvIDI7XG4gICAgICBjYW52YXNEYXRhLnRvcCA9IChjb250YWluZXJEYXRhLmhlaWdodCAtIGNhbnZhc0RhdGEuaGVpZ2h0KSAvIDI7XG4gICAgICBjYW52YXNEYXRhLm9sZExlZnQgPSBjYW52YXNEYXRhLmxlZnQ7XG4gICAgICBjYW52YXNEYXRhLm9sZFRvcCA9IGNhbnZhc0RhdGEudG9wO1xuICAgICAgdGhpcy5pbml0aWFsQ2FudmFzRGF0YSA9IGFzc2lnbih7fSwgY2FudmFzRGF0YSk7XG4gICAgfSxcbiAgICBsaW1pdENhbnZhczogZnVuY3Rpb24gbGltaXRDYW52YXMoc2l6ZUxpbWl0ZWQsIHBvc2l0aW9uTGltaXRlZCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNvbnRhaW5lckRhdGEgPSB0aGlzLmNvbnRhaW5lckRhdGEsXG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGEsXG4gICAgICAgIGNyb3BCb3hEYXRhID0gdGhpcy5jcm9wQm94RGF0YTtcbiAgICAgIHZhciB2aWV3TW9kZSA9IG9wdGlvbnMudmlld01vZGU7XG4gICAgICB2YXIgYXNwZWN0UmF0aW8gPSBjYW52YXNEYXRhLmFzcGVjdFJhdGlvO1xuICAgICAgdmFyIGNyb3BwZWQgPSB0aGlzLmNyb3BwZWQgJiYgY3JvcEJveERhdGE7XG4gICAgICBpZiAoc2l6ZUxpbWl0ZWQpIHtcbiAgICAgICAgdmFyIG1pbkNhbnZhc1dpZHRoID0gTnVtYmVyKG9wdGlvbnMubWluQ2FudmFzV2lkdGgpIHx8IDA7XG4gICAgICAgIHZhciBtaW5DYW52YXNIZWlnaHQgPSBOdW1iZXIob3B0aW9ucy5taW5DYW52YXNIZWlnaHQpIHx8IDA7XG4gICAgICAgIGlmICh2aWV3TW9kZSA+IDEpIHtcbiAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IE1hdGgubWF4KG1pbkNhbnZhc1dpZHRoLCBjb250YWluZXJEYXRhLndpZHRoKTtcbiAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBNYXRoLm1heChtaW5DYW52YXNIZWlnaHQsIGNvbnRhaW5lckRhdGEuaGVpZ2h0KTtcbiAgICAgICAgICBpZiAodmlld01vZGUgPT09IDMpIHtcbiAgICAgICAgICAgIGlmIChtaW5DYW52YXNIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbkNhbnZhc1dpZHRoKSB7XG4gICAgICAgICAgICAgIG1pbkNhbnZhc1dpZHRoID0gbWluQ2FudmFzSGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBtaW5DYW52YXNXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2aWV3TW9kZSA+IDApIHtcbiAgICAgICAgICBpZiAobWluQ2FudmFzV2lkdGgpIHtcbiAgICAgICAgICAgIG1pbkNhbnZhc1dpZHRoID0gTWF0aC5tYXgobWluQ2FudmFzV2lkdGgsIGNyb3BwZWQgPyBjcm9wQm94RGF0YS53aWR0aCA6IDApO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWluQ2FudmFzSGVpZ2h0KSB7XG4gICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBNYXRoLm1heChtaW5DYW52YXNIZWlnaHQsIGNyb3BwZWQgPyBjcm9wQm94RGF0YS5oZWlnaHQgOiAwKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNyb3BwZWQpIHtcbiAgICAgICAgICAgIG1pbkNhbnZhc1dpZHRoID0gY3JvcEJveERhdGEud2lkdGg7XG4gICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBjcm9wQm94RGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICBpZiAobWluQ2FudmFzSGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtaW5DYW52YXNXaWR0aCkge1xuICAgICAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IG1pbkNhbnZhc0hlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWluQ2FudmFzSGVpZ2h0ID0gbWluQ2FudmFzV2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9nZXRBZGp1c3RlZFNpemVzID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgICAgICAgYXNwZWN0UmF0aW86IGFzcGVjdFJhdGlvLFxuICAgICAgICAgIHdpZHRoOiBtaW5DYW52YXNXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IG1pbkNhbnZhc0hlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgbWluQ2FudmFzV2lkdGggPSBfZ2V0QWRqdXN0ZWRTaXplcy53aWR0aDtcbiAgICAgICAgbWluQ2FudmFzSGVpZ2h0ID0gX2dldEFkanVzdGVkU2l6ZXMuaGVpZ2h0O1xuICAgICAgICBjYW52YXNEYXRhLm1pbldpZHRoID0gbWluQ2FudmFzV2lkdGg7XG4gICAgICAgIGNhbnZhc0RhdGEubWluSGVpZ2h0ID0gbWluQ2FudmFzSGVpZ2h0O1xuICAgICAgICBjYW52YXNEYXRhLm1heFdpZHRoID0gSW5maW5pdHk7XG4gICAgICAgIGNhbnZhc0RhdGEubWF4SGVpZ2h0ID0gSW5maW5pdHk7XG4gICAgICB9XG4gICAgICBpZiAocG9zaXRpb25MaW1pdGVkKSB7XG4gICAgICAgIGlmICh2aWV3TW9kZSA+IChjcm9wcGVkID8gMCA6IDEpKSB7XG4gICAgICAgICAgdmFyIG5ld0NhbnZhc0xlZnQgPSBjb250YWluZXJEYXRhLndpZHRoIC0gY2FudmFzRGF0YS53aWR0aDtcbiAgICAgICAgICB2YXIgbmV3Q2FudmFzVG9wID0gY29udGFpbmVyRGF0YS5oZWlnaHQgLSBjYW52YXNEYXRhLmhlaWdodDtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pbkxlZnQgPSBNYXRoLm1pbigwLCBuZXdDYW52YXNMZWZ0KTtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pblRvcCA9IE1hdGgubWluKDAsIG5ld0NhbnZhc1RvcCk7XG4gICAgICAgICAgY2FudmFzRGF0YS5tYXhMZWZ0ID0gTWF0aC5tYXgoMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgICAgY2FudmFzRGF0YS5tYXhUb3AgPSBNYXRoLm1heCgwLCBuZXdDYW52YXNUb3ApO1xuICAgICAgICAgIGlmIChjcm9wcGVkICYmIHRoaXMubGltaXRlZCkge1xuICAgICAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gTWF0aC5taW4oY3JvcEJveERhdGEubGVmdCwgY3JvcEJveERhdGEubGVmdCArIChjcm9wQm94RGF0YS53aWR0aCAtIGNhbnZhc0RhdGEud2lkdGgpKTtcbiAgICAgICAgICAgIGNhbnZhc0RhdGEubWluVG9wID0gTWF0aC5taW4oY3JvcEJveERhdGEudG9wLCBjcm9wQm94RGF0YS50b3AgKyAoY3JvcEJveERhdGEuaGVpZ2h0IC0gY2FudmFzRGF0YS5oZWlnaHQpKTtcbiAgICAgICAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQ7XG4gICAgICAgICAgICBjYW52YXNEYXRhLm1heFRvcCA9IGNyb3BCb3hEYXRhLnRvcDtcbiAgICAgICAgICAgIGlmICh2aWV3TW9kZSA9PT0gMikge1xuICAgICAgICAgICAgICBpZiAoY2FudmFzRGF0YS53aWR0aCA+PSBjb250YWluZXJEYXRhLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gTWF0aC5taW4oMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgICAgICAgICAgY2FudmFzRGF0YS5tYXhMZWZ0ID0gTWF0aC5tYXgoMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGNhbnZhc0RhdGEuaGVpZ2h0ID49IGNvbnRhaW5lckRhdGEuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY2FudmFzRGF0YS5taW5Ub3AgPSBNYXRoLm1pbigwLCBuZXdDYW52YXNUb3ApO1xuICAgICAgICAgICAgICAgIGNhbnZhc0RhdGEubWF4VG9wID0gTWF0aC5tYXgoMCwgbmV3Q2FudmFzVG9wKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pbkxlZnQgPSAtY2FudmFzRGF0YS53aWR0aDtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pblRvcCA9IC1jYW52YXNEYXRhLmhlaWdodDtcbiAgICAgICAgICBjYW52YXNEYXRhLm1heExlZnQgPSBjb250YWluZXJEYXRhLndpZHRoO1xuICAgICAgICAgIGNhbnZhc0RhdGEubWF4VG9wID0gY29udGFpbmVyRGF0YS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlckNhbnZhczogZnVuY3Rpb24gcmVuZGVyQ2FudmFzKGNoYW5nZWQsIHRyYW5zZm9ybWVkKSB7XG4gICAgICB2YXIgY2FudmFzRGF0YSA9IHRoaXMuY2FudmFzRGF0YSxcbiAgICAgICAgaW1hZ2VEYXRhID0gdGhpcy5pbWFnZURhdGE7XG4gICAgICBpZiAodHJhbnNmb3JtZWQpIHtcbiAgICAgICAgdmFyIF9nZXRSb3RhdGVkU2l6ZXMgPSBnZXRSb3RhdGVkU2l6ZXMoe1xuICAgICAgICAgICAgd2lkdGg6IGltYWdlRGF0YS5uYXR1cmFsV2lkdGggKiBNYXRoLmFicyhpbWFnZURhdGEuc2NhbGVYIHx8IDEpLFxuICAgICAgICAgICAgaGVpZ2h0OiBpbWFnZURhdGEubmF0dXJhbEhlaWdodCAqIE1hdGguYWJzKGltYWdlRGF0YS5zY2FsZVkgfHwgMSksXG4gICAgICAgICAgICBkZWdyZWU6IGltYWdlRGF0YS5yb3RhdGUgfHwgMFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG5hdHVyYWxXaWR0aCA9IF9nZXRSb3RhdGVkU2l6ZXMud2lkdGgsXG4gICAgICAgICAgbmF0dXJhbEhlaWdodCA9IF9nZXRSb3RhdGVkU2l6ZXMuaGVpZ2h0O1xuICAgICAgICB2YXIgd2lkdGggPSBjYW52YXNEYXRhLndpZHRoICogKG5hdHVyYWxXaWR0aCAvIGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhc0RhdGEuaGVpZ2h0ICogKG5hdHVyYWxIZWlnaHQgLyBjYW52YXNEYXRhLm5hdHVyYWxIZWlnaHQpO1xuICAgICAgICBjYW52YXNEYXRhLmxlZnQgLT0gKHdpZHRoIC0gY2FudmFzRGF0YS53aWR0aCkgLyAyO1xuICAgICAgICBjYW52YXNEYXRhLnRvcCAtPSAoaGVpZ2h0IC0gY2FudmFzRGF0YS5oZWlnaHQpIC8gMjtcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXNEYXRhLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY2FudmFzRGF0YS5hc3BlY3RSYXRpbyA9IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHQ7XG4gICAgICAgIGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoID0gbmF0dXJhbFdpZHRoO1xuICAgICAgICBjYW52YXNEYXRhLm5hdHVyYWxIZWlnaHQgPSBuYXR1cmFsSGVpZ2h0O1xuICAgICAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYW52YXNEYXRhLndpZHRoID4gY2FudmFzRGF0YS5tYXhXaWR0aCB8fCBjYW52YXNEYXRhLndpZHRoIDwgY2FudmFzRGF0YS5taW5XaWR0aCkge1xuICAgICAgICBjYW52YXNEYXRhLmxlZnQgPSBjYW52YXNEYXRhLm9sZExlZnQ7XG4gICAgICB9XG4gICAgICBpZiAoY2FudmFzRGF0YS5oZWlnaHQgPiBjYW52YXNEYXRhLm1heEhlaWdodCB8fCBjYW52YXNEYXRhLmhlaWdodCA8IGNhbnZhc0RhdGEubWluSGVpZ2h0KSB7XG4gICAgICAgIGNhbnZhc0RhdGEudG9wID0gY2FudmFzRGF0YS5vbGRUb3A7XG4gICAgICB9XG4gICAgICBjYW52YXNEYXRhLndpZHRoID0gTWF0aC5taW4oTWF0aC5tYXgoY2FudmFzRGF0YS53aWR0aCwgY2FudmFzRGF0YS5taW5XaWR0aCksIGNhbnZhc0RhdGEubWF4V2lkdGgpO1xuICAgICAgY2FudmFzRGF0YS5oZWlnaHQgPSBNYXRoLm1pbihNYXRoLm1heChjYW52YXNEYXRhLmhlaWdodCwgY2FudmFzRGF0YS5taW5IZWlnaHQpLCBjYW52YXNEYXRhLm1heEhlaWdodCk7XG4gICAgICB0aGlzLmxpbWl0Q2FudmFzKGZhbHNlLCB0cnVlKTtcbiAgICAgIGNhbnZhc0RhdGEubGVmdCA9IE1hdGgubWluKE1hdGgubWF4KGNhbnZhc0RhdGEubGVmdCwgY2FudmFzRGF0YS5taW5MZWZ0KSwgY2FudmFzRGF0YS5tYXhMZWZ0KTtcbiAgICAgIGNhbnZhc0RhdGEudG9wID0gTWF0aC5taW4oTWF0aC5tYXgoY2FudmFzRGF0YS50b3AsIGNhbnZhc0RhdGEubWluVG9wKSwgY2FudmFzRGF0YS5tYXhUb3ApO1xuICAgICAgY2FudmFzRGF0YS5vbGRMZWZ0ID0gY2FudmFzRGF0YS5sZWZ0O1xuICAgICAgY2FudmFzRGF0YS5vbGRUb3AgPSBjYW52YXNEYXRhLnRvcDtcbiAgICAgIHNldFN0eWxlKHRoaXMuY2FudmFzLCBhc3NpZ24oe1xuICAgICAgICB3aWR0aDogY2FudmFzRGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYW52YXNEYXRhLmhlaWdodFxuICAgICAgfSwgZ2V0VHJhbnNmb3Jtcyh7XG4gICAgICAgIHRyYW5zbGF0ZVg6IGNhbnZhc0RhdGEubGVmdCxcbiAgICAgICAgdHJhbnNsYXRlWTogY2FudmFzRGF0YS50b3BcbiAgICAgIH0pKSk7XG4gICAgICB0aGlzLnJlbmRlckltYWdlKGNoYW5nZWQpO1xuICAgICAgaWYgKHRoaXMuY3JvcHBlZCAmJiB0aGlzLmxpbWl0ZWQpIHtcbiAgICAgICAgdGhpcy5saW1pdENyb3BCb3godHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW5kZXJJbWFnZTogZnVuY3Rpb24gcmVuZGVySW1hZ2UoY2hhbmdlZCkge1xuICAgICAgdmFyIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGEsXG4gICAgICAgIGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhO1xuICAgICAgdmFyIHdpZHRoID0gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aCAqIChjYW52YXNEYXRhLndpZHRoIC8gY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgpO1xuICAgICAgdmFyIGhlaWdodCA9IGltYWdlRGF0YS5uYXR1cmFsSGVpZ2h0ICogKGNhbnZhc0RhdGEuaGVpZ2h0IC8gY2FudmFzRGF0YS5uYXR1cmFsSGVpZ2h0KTtcbiAgICAgIGFzc2lnbihpbWFnZURhdGEsIHtcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgbGVmdDogKGNhbnZhc0RhdGEud2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICB0b3A6IChjYW52YXNEYXRhLmhlaWdodCAtIGhlaWdodCkgLyAyXG4gICAgICB9KTtcbiAgICAgIHNldFN0eWxlKHRoaXMuaW1hZ2UsIGFzc2lnbih7XG4gICAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodFxuICAgICAgfSwgZ2V0VHJhbnNmb3Jtcyhhc3NpZ24oe1xuICAgICAgICB0cmFuc2xhdGVYOiBpbWFnZURhdGEubGVmdCxcbiAgICAgICAgdHJhbnNsYXRlWTogaW1hZ2VEYXRhLnRvcFxuICAgICAgfSwgaW1hZ2VEYXRhKSkpKTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMub3V0cHV0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0Q3JvcEJveDogZnVuY3Rpb24gaW5pdENyb3BCb3goKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgY2FudmFzRGF0YSA9IHRoaXMuY2FudmFzRGF0YTtcbiAgICAgIHZhciBhc3BlY3RSYXRpbyA9IG9wdGlvbnMuYXNwZWN0UmF0aW8gfHwgb3B0aW9ucy5pbml0aWFsQXNwZWN0UmF0aW87XG4gICAgICB2YXIgYXV0b0Nyb3BBcmVhID0gTnVtYmVyKG9wdGlvbnMuYXV0b0Nyb3BBcmVhKSB8fCAwLjg7XG4gICAgICB2YXIgY3JvcEJveERhdGEgPSB7XG4gICAgICAgIHdpZHRoOiBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNhbnZhc0RhdGEuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgIGlmIChjYW52YXNEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvID4gY2FudmFzRGF0YS53aWR0aCkge1xuICAgICAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IGNyb3BCb3hEYXRhLndpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3JvcEJveERhdGEud2lkdGggPSBjcm9wQm94RGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jcm9wQm94RGF0YSA9IGNyb3BCb3hEYXRhO1xuICAgICAgdGhpcy5saW1pdENyb3BCb3godHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgYXV0byBjcm9wIGFyZWFcbiAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gTWF0aC5taW4oTWF0aC5tYXgoY3JvcEJveERhdGEud2lkdGgsIGNyb3BCb3hEYXRhLm1pbldpZHRoKSwgY3JvcEJveERhdGEubWF4V2lkdGgpO1xuICAgICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5tYXgoY3JvcEJveERhdGEuaGVpZ2h0LCBjcm9wQm94RGF0YS5taW5IZWlnaHQpLCBjcm9wQm94RGF0YS5tYXhIZWlnaHQpO1xuXG4gICAgICAvLyBUaGUgd2lkdGgvaGVpZ2h0IG9mIGF1dG8gY3JvcCBhcmVhIG11c3QgbGFyZ2UgdGhhbiBcIm1pbldpZHRoL0hlaWdodFwiXG4gICAgICBjcm9wQm94RGF0YS53aWR0aCA9IE1hdGgubWF4KGNyb3BCb3hEYXRhLm1pbldpZHRoLCBjcm9wQm94RGF0YS53aWR0aCAqIGF1dG9Dcm9wQXJlYSk7XG4gICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBNYXRoLm1heChjcm9wQm94RGF0YS5taW5IZWlnaHQsIGNyb3BCb3hEYXRhLmhlaWdodCAqIGF1dG9Dcm9wQXJlYSk7XG4gICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gY2FudmFzRGF0YS5sZWZ0ICsgKGNhbnZhc0RhdGEud2lkdGggLSBjcm9wQm94RGF0YS53aWR0aCkgLyAyO1xuICAgICAgY3JvcEJveERhdGEudG9wID0gY2FudmFzRGF0YS50b3AgKyAoY2FudmFzRGF0YS5oZWlnaHQgLSBjcm9wQm94RGF0YS5oZWlnaHQpIC8gMjtcbiAgICAgIGNyb3BCb3hEYXRhLm9sZExlZnQgPSBjcm9wQm94RGF0YS5sZWZ0O1xuICAgICAgY3JvcEJveERhdGEub2xkVG9wID0gY3JvcEJveERhdGEudG9wO1xuICAgICAgdGhpcy5pbml0aWFsQ3JvcEJveERhdGEgPSBhc3NpZ24oe30sIGNyb3BCb3hEYXRhKTtcbiAgICB9LFxuICAgIGxpbWl0Q3JvcEJveDogZnVuY3Rpb24gbGltaXRDcm9wQm94KHNpemVMaW1pdGVkLCBwb3NpdGlvbkxpbWl0ZWQpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBjb250YWluZXJEYXRhID0gdGhpcy5jb250YWluZXJEYXRhLFxuICAgICAgICBjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhLFxuICAgICAgICBjcm9wQm94RGF0YSA9IHRoaXMuY3JvcEJveERhdGEsXG4gICAgICAgIGxpbWl0ZWQgPSB0aGlzLmxpbWl0ZWQ7XG4gICAgICB2YXIgYXNwZWN0UmF0aW8gPSBvcHRpb25zLmFzcGVjdFJhdGlvO1xuICAgICAgaWYgKHNpemVMaW1pdGVkKSB7XG4gICAgICAgIHZhciBtaW5Dcm9wQm94V2lkdGggPSBOdW1iZXIob3B0aW9ucy5taW5Dcm9wQm94V2lkdGgpIHx8IDA7XG4gICAgICAgIHZhciBtaW5Dcm9wQm94SGVpZ2h0ID0gTnVtYmVyKG9wdGlvbnMubWluQ3JvcEJveEhlaWdodCkgfHwgMDtcbiAgICAgICAgdmFyIG1heENyb3BCb3hXaWR0aCA9IGxpbWl0ZWQgPyBNYXRoLm1pbihjb250YWluZXJEYXRhLndpZHRoLCBjYW52YXNEYXRhLndpZHRoLCBjYW52YXNEYXRhLndpZHRoICsgY2FudmFzRGF0YS5sZWZ0LCBjb250YWluZXJEYXRhLndpZHRoIC0gY2FudmFzRGF0YS5sZWZ0KSA6IGNvbnRhaW5lckRhdGEud2lkdGg7XG4gICAgICAgIHZhciBtYXhDcm9wQm94SGVpZ2h0ID0gbGltaXRlZCA/IE1hdGgubWluKGNvbnRhaW5lckRhdGEuaGVpZ2h0LCBjYW52YXNEYXRhLmhlaWdodCwgY2FudmFzRGF0YS5oZWlnaHQgKyBjYW52YXNEYXRhLnRvcCwgY29udGFpbmVyRGF0YS5oZWlnaHQgLSBjYW52YXNEYXRhLnRvcCkgOiBjb250YWluZXJEYXRhLmhlaWdodDtcblxuICAgICAgICAvLyBUaGUgbWluL21heENyb3BCb3hXaWR0aC9IZWlnaHQgbXVzdCBiZSBsZXNzIHRoYW4gY29udGFpbmVyJ3Mgd2lkdGgvaGVpZ2h0XG4gICAgICAgIG1pbkNyb3BCb3hXaWR0aCA9IE1hdGgubWluKG1pbkNyb3BCb3hXaWR0aCwgY29udGFpbmVyRGF0YS53aWR0aCk7XG4gICAgICAgIG1pbkNyb3BCb3hIZWlnaHQgPSBNYXRoLm1pbihtaW5Dcm9wQm94SGVpZ2h0LCBjb250YWluZXJEYXRhLmhlaWdodCk7XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmIChtaW5Dcm9wQm94V2lkdGggJiYgbWluQ3JvcEJveEhlaWdodCkge1xuICAgICAgICAgICAgaWYgKG1pbkNyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbkNyb3BCb3hXaWR0aCkge1xuICAgICAgICAgICAgICBtaW5Dcm9wQm94SGVpZ2h0ID0gbWluQ3JvcEJveFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtaW5Dcm9wQm94V2lkdGggPSBtaW5Dcm9wQm94SGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5Dcm9wQm94V2lkdGgpIHtcbiAgICAgICAgICAgIG1pbkNyb3BCb3hIZWlnaHQgPSBtaW5Dcm9wQm94V2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9IGVsc2UgaWYgKG1pbkNyb3BCb3hIZWlnaHQpIHtcbiAgICAgICAgICAgIG1pbkNyb3BCb3hXaWR0aCA9IG1pbkNyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1heENyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1heENyb3BCb3hXaWR0aCkge1xuICAgICAgICAgICAgbWF4Q3JvcEJveEhlaWdodCA9IG1heENyb3BCb3hXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXhDcm9wQm94V2lkdGggPSBtYXhDcm9wQm94SGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG1pbldpZHRoL0hlaWdodCBtdXN0IGJlIGxlc3MgdGhhbiBtYXhXaWR0aC9IZWlnaHRcbiAgICAgICAgY3JvcEJveERhdGEubWluV2lkdGggPSBNYXRoLm1pbihtaW5Dcm9wQm94V2lkdGgsIG1heENyb3BCb3hXaWR0aCk7XG4gICAgICAgIGNyb3BCb3hEYXRhLm1pbkhlaWdodCA9IE1hdGgubWluKG1pbkNyb3BCb3hIZWlnaHQsIG1heENyb3BCb3hIZWlnaHQpO1xuICAgICAgICBjcm9wQm94RGF0YS5tYXhXaWR0aCA9IG1heENyb3BCb3hXaWR0aDtcbiAgICAgICAgY3JvcEJveERhdGEubWF4SGVpZ2h0ID0gbWF4Q3JvcEJveEhlaWdodDtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvbkxpbWl0ZWQpIHtcbiAgICAgICAgaWYgKGxpbWl0ZWQpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS5taW5MZWZ0ID0gTWF0aC5tYXgoMCwgY2FudmFzRGF0YS5sZWZ0KTtcbiAgICAgICAgICBjcm9wQm94RGF0YS5taW5Ub3AgPSBNYXRoLm1heCgwLCBjYW52YXNEYXRhLnRvcCk7XG4gICAgICAgICAgY3JvcEJveERhdGEubWF4TGVmdCA9IE1hdGgubWluKGNvbnRhaW5lckRhdGEud2lkdGgsIGNhbnZhc0RhdGEubGVmdCArIGNhbnZhc0RhdGEud2lkdGgpIC0gY3JvcEJveERhdGEud2lkdGg7XG4gICAgICAgICAgY3JvcEJveERhdGEubWF4VG9wID0gTWF0aC5taW4oY29udGFpbmVyRGF0YS5oZWlnaHQsIGNhbnZhc0RhdGEudG9wICsgY2FudmFzRGF0YS5oZWlnaHQpIC0gY3JvcEJveERhdGEuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNyb3BCb3hEYXRhLm1pbkxlZnQgPSAwO1xuICAgICAgICAgIGNyb3BCb3hEYXRhLm1pblRvcCA9IDA7XG4gICAgICAgICAgY3JvcEJveERhdGEubWF4TGVmdCA9IGNvbnRhaW5lckRhdGEud2lkdGggLSBjcm9wQm94RGF0YS53aWR0aDtcbiAgICAgICAgICBjcm9wQm94RGF0YS5tYXhUb3AgPSBjb250YWluZXJEYXRhLmhlaWdodCAtIGNyb3BCb3hEYXRhLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyQ3JvcEJveDogZnVuY3Rpb24gcmVuZGVyQ3JvcEJveCgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBjb250YWluZXJEYXRhID0gdGhpcy5jb250YWluZXJEYXRhLFxuICAgICAgICBjcm9wQm94RGF0YSA9IHRoaXMuY3JvcEJveERhdGE7XG4gICAgICBpZiAoY3JvcEJveERhdGEud2lkdGggPiBjcm9wQm94RGF0YS5tYXhXaWR0aCB8fCBjcm9wQm94RGF0YS53aWR0aCA8IGNyb3BCb3hEYXRhLm1pbldpZHRoKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBjcm9wQm94RGF0YS5vbGRMZWZ0O1xuICAgICAgfVxuICAgICAgaWYgKGNyb3BCb3hEYXRhLmhlaWdodCA+IGNyb3BCb3hEYXRhLm1heEhlaWdodCB8fCBjcm9wQm94RGF0YS5oZWlnaHQgPCBjcm9wQm94RGF0YS5taW5IZWlnaHQpIHtcbiAgICAgICAgY3JvcEJveERhdGEudG9wID0gY3JvcEJveERhdGEub2xkVG9wO1xuICAgICAgfVxuICAgICAgY3JvcEJveERhdGEud2lkdGggPSBNYXRoLm1pbihNYXRoLm1heChjcm9wQm94RGF0YS53aWR0aCwgY3JvcEJveERhdGEubWluV2lkdGgpLCBjcm9wQm94RGF0YS5tYXhXaWR0aCk7XG4gICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBNYXRoLm1pbihNYXRoLm1heChjcm9wQm94RGF0YS5oZWlnaHQsIGNyb3BCb3hEYXRhLm1pbkhlaWdodCksIGNyb3BCb3hEYXRhLm1heEhlaWdodCk7XG4gICAgICB0aGlzLmxpbWl0Q3JvcEJveChmYWxzZSwgdHJ1ZSk7XG4gICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gTWF0aC5taW4oTWF0aC5tYXgoY3JvcEJveERhdGEubGVmdCwgY3JvcEJveERhdGEubWluTGVmdCksIGNyb3BCb3hEYXRhLm1heExlZnQpO1xuICAgICAgY3JvcEJveERhdGEudG9wID0gTWF0aC5taW4oTWF0aC5tYXgoY3JvcEJveERhdGEudG9wLCBjcm9wQm94RGF0YS5taW5Ub3ApLCBjcm9wQm94RGF0YS5tYXhUb3ApO1xuICAgICAgY3JvcEJveERhdGEub2xkTGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQ7XG4gICAgICBjcm9wQm94RGF0YS5vbGRUb3AgPSBjcm9wQm94RGF0YS50b3A7XG4gICAgICBpZiAob3B0aW9ucy5tb3ZhYmxlICYmIG9wdGlvbnMuY3JvcEJveE1vdmFibGUpIHtcbiAgICAgICAgLy8gVHVybiB0byBtb3ZlIHRoZSBjYW52YXMgd2hlbiB0aGUgY3JvcCBib3ggaXMgZXF1YWwgdG8gdGhlIGNvbnRhaW5lclxuICAgICAgICBzZXREYXRhKHRoaXMuZmFjZSwgREFUQV9BQ1RJT04sIGNyb3BCb3hEYXRhLndpZHRoID49IGNvbnRhaW5lckRhdGEud2lkdGggJiYgY3JvcEJveERhdGEuaGVpZ2h0ID49IGNvbnRhaW5lckRhdGEuaGVpZ2h0ID8gQUNUSU9OX01PVkUgOiBBQ1RJT05fQUxMKTtcbiAgICAgIH1cbiAgICAgIHNldFN0eWxlKHRoaXMuY3JvcEJveCwgYXNzaWduKHtcbiAgICAgICAgd2lkdGg6IGNyb3BCb3hEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNyb3BCb3hEYXRhLmhlaWdodFxuICAgICAgfSwgZ2V0VHJhbnNmb3Jtcyh7XG4gICAgICAgIHRyYW5zbGF0ZVg6IGNyb3BCb3hEYXRhLmxlZnQsXG4gICAgICAgIHRyYW5zbGF0ZVk6IGNyb3BCb3hEYXRhLnRvcFxuICAgICAgfSkpKTtcbiAgICAgIGlmICh0aGlzLmNyb3BwZWQgJiYgdGhpcy5saW1pdGVkKSB7XG4gICAgICAgIHRoaXMubGltaXRDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5vdXRwdXQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gb3V0cHV0KCkge1xuICAgICAgdGhpcy5wcmV2aWV3KCk7XG4gICAgICBkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfQ1JPUCwgdGhpcy5nZXREYXRhKCkpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgcHJldmlldyA9IHtcbiAgICBpbml0UHJldmlldzogZnVuY3Rpb24gaW5pdFByZXZpZXcoKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCxcbiAgICAgICAgY3Jvc3NPcmlnaW4gPSB0aGlzLmNyb3NzT3JpZ2luO1xuICAgICAgdmFyIHByZXZpZXcgPSB0aGlzLm9wdGlvbnMucHJldmlldztcbiAgICAgIHZhciB1cmwgPSBjcm9zc09yaWdpbiA/IHRoaXMuY3Jvc3NPcmlnaW5VcmwgOiB0aGlzLnVybDtcbiAgICAgIHZhciBhbHQgPSBlbGVtZW50LmFsdCB8fCAnVGhlIGltYWdlIHRvIHByZXZpZXcnO1xuICAgICAgdmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgIH1cbiAgICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICAgIGltYWdlLmFsdCA9IGFsdDtcbiAgICAgIHRoaXMudmlld0JveC5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICB0aGlzLnZpZXdCb3hJbWFnZSA9IGltYWdlO1xuICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2aWV3cyA9IHByZXZpZXc7XG4gICAgICBpZiAodHlwZW9mIHByZXZpZXcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHByZXZpZXdzID0gZWxlbWVudC5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocHJldmlldyk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZpZXcucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICBwcmV2aWV3cyA9IFtwcmV2aWV3XTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlld3MgPSBwcmV2aWV3cztcbiAgICAgIGZvckVhY2gocHJldmlld3MsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgb3JpZ2luYWwgc2l6ZSBmb3IgcmVjb3ZlclxuICAgICAgICBzZXREYXRhKGVsLCBEQVRBX1BSRVZJRVcsIHtcbiAgICAgICAgICB3aWR0aDogZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBlbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgaHRtbDogZWwuaW5uZXJIVE1MXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgICAgfVxuICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgICAgICBpbWcuYWx0ID0gYWx0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZSBpbWcgZWxlbWVudCBzdHlsZXNcbiAgICAgICAgICogQWRkIGBkaXNwbGF5OmJsb2NrYCB0byBhdm9pZCBtYXJnaW4gdG9wIGlzc3VlXG4gICAgICAgICAqIEFkZCBgaGVpZ2h0OmF1dG9gIHRvIG92ZXJyaWRlIGBoZWlnaHRgIGF0dHJpYnV0ZSBvbiBJRThcbiAgICAgICAgICogKE9jY3VyIG9ubHkgd2hlbiBtYXJnaW4tdG9wIDw9IC1oZWlnaHQpXG4gICAgICAgICAqL1xuICAgICAgICBpbWcuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OmJsb2NrOycgKyAnd2lkdGg6MTAwJTsnICsgJ2hlaWdodDphdXRvOycgKyAnbWluLXdpZHRoOjAhaW1wb3J0YW50OycgKyAnbWluLWhlaWdodDowIWltcG9ydGFudDsnICsgJ21heC13aWR0aDpub25lIWltcG9ydGFudDsnICsgJ21heC1oZWlnaHQ6bm9uZSFpbXBvcnRhbnQ7JyArICdpbWFnZS1vcmllbnRhdGlvbjowZGVnIWltcG9ydGFudDtcIic7XG4gICAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFByZXZpZXc6IGZ1bmN0aW9uIHJlc2V0UHJldmlldygpIHtcbiAgICAgIGZvckVhY2godGhpcy5wcmV2aWV3cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGVsZW1lbnQsIERBVEFfUFJFVklFVyk7XG4gICAgICAgIHNldFN0eWxlKGVsZW1lbnQsIHtcbiAgICAgICAgICB3aWR0aDogZGF0YS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRhdGEuaGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGRhdGEuaHRtbDtcbiAgICAgICAgcmVtb3ZlRGF0YShlbGVtZW50LCBEQVRBX1BSRVZJRVcpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBwcmV2aWV3OiBmdW5jdGlvbiBwcmV2aWV3KCkge1xuICAgICAgdmFyIGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhLFxuICAgICAgICBjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhLFxuICAgICAgICBjcm9wQm94RGF0YSA9IHRoaXMuY3JvcEJveERhdGE7XG4gICAgICB2YXIgY3JvcEJveFdpZHRoID0gY3JvcEJveERhdGEud2lkdGgsXG4gICAgICAgIGNyb3BCb3hIZWlnaHQgPSBjcm9wQm94RGF0YS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IGltYWdlRGF0YS5oZWlnaHQ7XG4gICAgICB2YXIgbGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQgLSBjYW52YXNEYXRhLmxlZnQgLSBpbWFnZURhdGEubGVmdDtcbiAgICAgIHZhciB0b3AgPSBjcm9wQm94RGF0YS50b3AgLSBjYW52YXNEYXRhLnRvcCAtIGltYWdlRGF0YS50b3A7XG4gICAgICBpZiAoIXRoaXMuY3JvcHBlZCB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFN0eWxlKHRoaXMudmlld0JveEltYWdlLCBhc3NpZ24oe1xuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICB9LCBnZXRUcmFuc2Zvcm1zKGFzc2lnbih7XG4gICAgICAgIHRyYW5zbGF0ZVg6IC1sZWZ0LFxuICAgICAgICB0cmFuc2xhdGVZOiAtdG9wXG4gICAgICB9LCBpbWFnZURhdGEpKSkpO1xuICAgICAgZm9yRWFjaCh0aGlzLnByZXZpZXdzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgZGF0YSA9IGdldERhdGEoZWxlbWVudCwgREFUQV9QUkVWSUVXKTtcbiAgICAgICAgdmFyIG9yaWdpbmFsV2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICB2YXIgb3JpZ2luYWxIZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gb3JpZ2luYWxXaWR0aDtcbiAgICAgICAgdmFyIG5ld0hlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuICAgICAgICB2YXIgcmF0aW8gPSAxO1xuICAgICAgICBpZiAoY3JvcEJveFdpZHRoKSB7XG4gICAgICAgICAgcmF0aW8gPSBvcmlnaW5hbFdpZHRoIC8gY3JvcEJveFdpZHRoO1xuICAgICAgICAgIG5ld0hlaWdodCA9IGNyb3BCb3hIZWlnaHQgKiByYXRpbztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3JvcEJveEhlaWdodCAmJiBuZXdIZWlnaHQgPiBvcmlnaW5hbEhlaWdodCkge1xuICAgICAgICAgIHJhdGlvID0gb3JpZ2luYWxIZWlnaHQgLyBjcm9wQm94SGVpZ2h0O1xuICAgICAgICAgIG5ld1dpZHRoID0gY3JvcEJveFdpZHRoICogcmF0aW87XG4gICAgICAgICAgbmV3SGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudCwge1xuICAgICAgICAgIHdpZHRoOiBuZXdXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3R5bGUoZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0sIGFzc2lnbih7XG4gICAgICAgICAgd2lkdGg6IHdpZHRoICogcmF0aW8sXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiByYXRpb1xuICAgICAgICB9LCBnZXRUcmFuc2Zvcm1zKGFzc2lnbih7XG4gICAgICAgICAgdHJhbnNsYXRlWDogLWxlZnQgKiByYXRpbyxcbiAgICAgICAgICB0cmFuc2xhdGVZOiAtdG9wICogcmF0aW9cbiAgICAgICAgfSwgaW1hZ2VEYXRhKSkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZXZlbnRzID0ge1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCxcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgY3JvcHBlciA9IHRoaXMuY3JvcHBlcjtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY3JvcHN0YXJ0KSkge1xuICAgICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX1NUQVJULCBvcHRpb25zLmNyb3BzdGFydCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3Btb3ZlKSkge1xuICAgICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX01PVkUsIG9wdGlvbnMuY3JvcG1vdmUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wZW5kKSkge1xuICAgICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX0VORCwgb3B0aW9ucy5jcm9wZW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY3JvcCkpIHtcbiAgICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUCwgb3B0aW9ucy5jcm9wKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuem9vbSkpIHtcbiAgICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfWk9PTSwgb3B0aW9ucy56b29tKTtcbiAgICAgIH1cbiAgICAgIGFkZExpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX1BPSU5URVJfRE9XTiwgdGhpcy5vbkNyb3BTdGFydCA9IHRoaXMuY3JvcFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgaWYgKG9wdGlvbnMuem9vbWFibGUgJiYgb3B0aW9ucy56b29tT25XaGVlbCkge1xuICAgICAgICBhZGRMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9XSEVFTCwgdGhpcy5vbldoZWVsID0gdGhpcy53aGVlbC5iaW5kKHRoaXMpLCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRvZ2dsZURyYWdNb2RlT25EYmxjbGljaykge1xuICAgICAgICBhZGRMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9EQkxDTElDSywgdGhpcy5vbkRibGNsaWNrID0gdGhpcy5kYmxjbGljay5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQub3duZXJEb2N1bWVudCwgRVZFTlRfUE9JTlRFUl9NT1ZFLCB0aGlzLm9uQ3JvcE1vdmUgPSB0aGlzLmNyb3BNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudC5vd25lckRvY3VtZW50LCBFVkVOVF9QT0lOVEVSX1VQLCB0aGlzLm9uQ3JvcEVuZCA9IHRoaXMuY3JvcEVuZC5iaW5kKHRoaXMpKTtcbiAgICAgIGlmIChvcHRpb25zLnJlc3BvbnNpdmUpIHtcbiAgICAgICAgYWRkTGlzdGVuZXIod2luZG93LCBFVkVOVF9SRVNJWkUsIHRoaXMub25SZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNyb3BwZXIgPSB0aGlzLmNyb3BwZXI7XG4gICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3BzdGFydCkpIHtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9TVEFSVCwgb3B0aW9ucy5jcm9wc3RhcnQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wbW92ZSkpIHtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9NT1ZFLCBvcHRpb25zLmNyb3Btb3ZlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY3JvcGVuZCkpIHtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9FTkQsIG9wdGlvbnMuY3JvcGVuZCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3ApKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX0NST1AsIG9wdGlvbnMuY3JvcCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLnpvb20pKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX1pPT00sIG9wdGlvbnMuem9vbSk7XG4gICAgICB9XG4gICAgICByZW1vdmVMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9QT0lOVEVSX0RPV04sIHRoaXMub25Dcm9wU3RhcnQpO1xuICAgICAgaWYgKG9wdGlvbnMuem9vbWFibGUgJiYgb3B0aW9ucy56b29tT25XaGVlbCkge1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9XSEVFTCwgdGhpcy5vbldoZWVsLCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRvZ2dsZURyYWdNb2RlT25EYmxjbGljaykge1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9EQkxDTElDSywgdGhpcy5vbkRibGNsaWNrKTtcbiAgICAgIH1cbiAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQub3duZXJEb2N1bWVudCwgRVZFTlRfUE9JTlRFUl9NT1ZFLCB0aGlzLm9uQ3JvcE1vdmUpO1xuICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudC5vd25lckRvY3VtZW50LCBFVkVOVF9QT0lOVEVSX1VQLCB0aGlzLm9uQ3JvcEVuZCk7XG4gICAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKHdpbmRvdywgRVZFTlRfUkVTSVpFLCB0aGlzLm9uUmVzaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGhhbmRsZXJzID0ge1xuICAgIHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLFxuICAgICAgICBjb250YWluZXJEYXRhID0gdGhpcy5jb250YWluZXJEYXRhO1xuICAgICAgdmFyIHJhdGlvWCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aCAvIGNvbnRhaW5lckRhdGEud2lkdGg7XG4gICAgICB2YXIgcmF0aW9ZID0gY29udGFpbmVyLm9mZnNldEhlaWdodCAvIGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuICAgICAgdmFyIHJhdGlvID0gTWF0aC5hYnMocmF0aW9YIC0gMSkgPiBNYXRoLmFicyhyYXRpb1kgLSAxKSA/IHJhdGlvWCA6IHJhdGlvWTtcblxuICAgICAgLy8gUmVzaXplIHdoZW4gd2lkdGggY2hhbmdlZCBvciBoZWlnaHQgY2hhbmdlZFxuICAgICAgaWYgKHJhdGlvICE9PSAxKSB7XG4gICAgICAgIHZhciBjYW52YXNEYXRhO1xuICAgICAgICB2YXIgY3JvcEJveERhdGE7XG4gICAgICAgIGlmIChvcHRpb25zLnJlc3RvcmUpIHtcbiAgICAgICAgICBjYW52YXNEYXRhID0gdGhpcy5nZXRDYW52YXNEYXRhKCk7XG4gICAgICAgICAgY3JvcEJveERhdGEgPSB0aGlzLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVzdG9yZSkge1xuICAgICAgICAgIHRoaXMuc2V0Q2FudmFzRGF0YShmb3JFYWNoKGNhbnZhc0RhdGEsIGZ1bmN0aW9uIChuLCBpKSB7XG4gICAgICAgICAgICBjYW52YXNEYXRhW2ldID0gbiAqIHJhdGlvO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgICB0aGlzLnNldENyb3BCb3hEYXRhKGZvckVhY2goY3JvcEJveERhdGEsIGZ1bmN0aW9uIChuLCBpKSB7XG4gICAgICAgICAgICBjcm9wQm94RGF0YVtpXSA9IG4gKiByYXRpbztcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRibGNsaWNrOiBmdW5jdGlvbiBkYmxjbGljaygpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMub3B0aW9ucy5kcmFnTW9kZSA9PT0gRFJBR19NT0RFX05PTkUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXREcmFnTW9kZShoYXNDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX0NST1ApID8gRFJBR19NT0RFX01PVkUgOiBEUkFHX01PREVfQ1JPUCk7XG4gICAgfSxcbiAgICB3aGVlbDogZnVuY3Rpb24gd2hlZWwoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB2YXIgcmF0aW8gPSBOdW1iZXIodGhpcy5vcHRpb25zLndoZWVsWm9vbVJhdGlvKSB8fCAwLjE7XG4gICAgICB2YXIgZGVsdGEgPSAxO1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gTGltaXQgd2hlZWwgc3BlZWQgdG8gcHJldmVudCB6b29tIHRvbyBmYXN0ICgjMjEpXG4gICAgICBpZiAodGhpcy53aGVlbGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLndoZWVsaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy53aGVlbGluZyA9IGZhbHNlO1xuICAgICAgfSwgNTApO1xuICAgICAgaWYgKGV2ZW50LmRlbHRhWSkge1xuICAgICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWSA+IDAgPyAxIDogLTE7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LndoZWVsRGVsdGEpIHtcbiAgICAgICAgZGVsdGEgPSAtZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7XG4gICAgICAgIGRlbHRhID0gZXZlbnQuZGV0YWlsID4gMCA/IDEgOiAtMTtcbiAgICAgIH1cbiAgICAgIHRoaXMuem9vbSgtZGVsdGEgKiByYXRpbywgZXZlbnQpO1xuICAgIH0sXG4gICAgY3JvcFN0YXJ0OiBmdW5jdGlvbiBjcm9wU3RhcnQoZXZlbnQpIHtcbiAgICAgIHZhciBidXR0b25zID0gZXZlbnQuYnV0dG9ucyxcbiAgICAgICAgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWRcblxuICAgICAgLy8gSGFuZGxlIG1vdXNlIGV2ZW50IGFuZCBwb2ludGVyIGV2ZW50IGFuZCBpZ25vcmUgdG91Y2ggZXZlbnRcbiAgICAgIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyB8fCBldmVudC50eXBlID09PSAncG9pbnRlcmRvd24nICYmIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSAmJiAoXG4gICAgICAvLyBObyBwcmltYXJ5IGJ1dHRvbiAoVXN1YWxseSB0aGUgbGVmdCBidXR0b24pXG4gICAgICBpc051bWJlcihidXR0b25zKSAmJiBidXR0b25zICE9PSAxIHx8IGlzTnVtYmVyKGJ1dHRvbikgJiYgYnV0dG9uICE9PSAwXG5cbiAgICAgIC8vIE9wZW4gY29udGV4dCBtZW51XG4gICAgICB8fCBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgcG9pbnRlcnMgPSB0aGlzLnBvaW50ZXJzO1xuICAgICAgdmFyIGFjdGlvbjtcbiAgICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgICAvLyBIYW5kbGUgdG91Y2ggZXZlbnRcbiAgICAgICAgZm9yRWFjaChldmVudC5jaGFuZ2VkVG91Y2hlcywgZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICAgICAgcG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl0gPSBnZXRQb2ludGVyKHRvdWNoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgbW91c2UgZXZlbnQgYW5kIHBvaW50ZXIgZXZlbnRcbiAgICAgICAgcG9pbnRlcnNbZXZlbnQucG9pbnRlcklkIHx8IDBdID0gZ2V0UG9pbnRlcihldmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoT2JqZWN0LmtleXMocG9pbnRlcnMpLmxlbmd0aCA+IDEgJiYgb3B0aW9ucy56b29tYWJsZSAmJiBvcHRpb25zLnpvb21PblRvdWNoKSB7XG4gICAgICAgIGFjdGlvbiA9IEFDVElPTl9aT09NO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uID0gZ2V0RGF0YShldmVudC50YXJnZXQsIERBVEFfQUNUSU9OKTtcbiAgICAgIH1cbiAgICAgIGlmICghUkVHRVhQX0FDVElPTlMudGVzdChhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfQ1JPUF9TVEFSVCwge1xuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICAgIH0pID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoaXMgbGluZSBpcyByZXF1aXJlZCBmb3IgcHJldmVudGluZyBwYWdlIHpvb21pbmcgaW4gaU9TIGJyb3dzZXJzXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICB0aGlzLmNyb3BwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoYWN0aW9uID09PSBBQ1RJT05fQ1JPUCkge1xuICAgICAgICB0aGlzLmNyb3BwaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjcm9wTW92ZTogZnVuY3Rpb24gY3JvcE1vdmUoZXZlbnQpIHtcbiAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvbjtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICFhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHBvaW50ZXJzID0gdGhpcy5wb2ludGVycztcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsIEVWRU5UX0NST1BfTU9WRSwge1xuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICAgIH0pID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgICAgZm9yRWFjaChldmVudC5jaGFuZ2VkVG91Y2hlcywgZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICAgICAgLy8gVGhlIGZpcnN0IHBhcmFtZXRlciBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCAoIzQzMilcbiAgICAgICAgICBhc3NpZ24ocG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl0gfHwge30sIGdldFBvaW50ZXIodG91Y2gsIHRydWUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc3NpZ24ocG9pbnRlcnNbZXZlbnQucG9pbnRlcklkIHx8IDBdIHx8IHt9LCBnZXRQb2ludGVyKGV2ZW50LCB0cnVlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZShldmVudCk7XG4gICAgfSxcbiAgICBjcm9wRW5kOiBmdW5jdGlvbiBjcm9wRW5kKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb24sXG4gICAgICAgIHBvaW50ZXJzID0gdGhpcy5wb2ludGVycztcbiAgICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgICBmb3JFYWNoKGV2ZW50LmNoYW5nZWRUb3VjaGVzLCBmdW5jdGlvbiAodG91Y2gpIHtcbiAgICAgICAgICBkZWxldGUgcG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHBvaW50ZXJzW2V2ZW50LnBvaW50ZXJJZCB8fCAwXTtcbiAgICAgIH1cbiAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoIU9iamVjdC5rZXlzKHBvaW50ZXJzKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSAnJztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNyb3BwaW5nKSB7XG4gICAgICAgIHRoaXMuY3JvcHBpbmcgPSBmYWxzZTtcbiAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCwgdGhpcy5jcm9wcGVkICYmIHRoaXMub3B0aW9ucy5tb2RhbCk7XG4gICAgICB9XG4gICAgICBkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfQ1JPUF9FTkQsIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoYW5nZSA9IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uIGNoYW5nZShldmVudCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGEsXG4gICAgICAgIGNvbnRhaW5lckRhdGEgPSB0aGlzLmNvbnRhaW5lckRhdGEsXG4gICAgICAgIGNyb3BCb3hEYXRhID0gdGhpcy5jcm9wQm94RGF0YSxcbiAgICAgICAgcG9pbnRlcnMgPSB0aGlzLnBvaW50ZXJzO1xuICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uO1xuICAgICAgdmFyIGFzcGVjdFJhdGlvID0gb3B0aW9ucy5hc3BlY3RSYXRpbztcbiAgICAgIHZhciBsZWZ0ID0gY3JvcEJveERhdGEubGVmdCxcbiAgICAgICAgdG9wID0gY3JvcEJveERhdGEudG9wLFxuICAgICAgICB3aWR0aCA9IGNyb3BCb3hEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBjcm9wQm94RGF0YS5oZWlnaHQ7XG4gICAgICB2YXIgcmlnaHQgPSBsZWZ0ICsgd2lkdGg7XG4gICAgICB2YXIgYm90dG9tID0gdG9wICsgaGVpZ2h0O1xuICAgICAgdmFyIG1pbkxlZnQgPSAwO1xuICAgICAgdmFyIG1pblRvcCA9IDA7XG4gICAgICB2YXIgbWF4V2lkdGggPSBjb250YWluZXJEYXRhLndpZHRoO1xuICAgICAgdmFyIG1heEhlaWdodCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuICAgICAgdmFyIHJlbmRlcmFibGUgPSB0cnVlO1xuICAgICAgdmFyIG9mZnNldDtcblxuICAgICAgLy8gTG9ja2luZyBhc3BlY3QgcmF0aW8gaW4gXCJmcmVlIG1vZGVcIiBieSBob2xkaW5nIHNoaWZ0IGtleVxuICAgICAgaWYgKCFhc3BlY3RSYXRpbyAmJiBldmVudC5zaGlmdEtleSkge1xuICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoICYmIGhlaWdodCA/IHdpZHRoIC8gaGVpZ2h0IDogMTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmxpbWl0ZWQpIHtcbiAgICAgICAgbWluTGVmdCA9IGNyb3BCb3hEYXRhLm1pbkxlZnQ7XG4gICAgICAgIG1pblRvcCA9IGNyb3BCb3hEYXRhLm1pblRvcDtcbiAgICAgICAgbWF4V2lkdGggPSBtaW5MZWZ0ICsgTWF0aC5taW4oY29udGFpbmVyRGF0YS53aWR0aCwgY2FudmFzRGF0YS53aWR0aCwgY2FudmFzRGF0YS5sZWZ0ICsgY2FudmFzRGF0YS53aWR0aCk7XG4gICAgICAgIG1heEhlaWdodCA9IG1pblRvcCArIE1hdGgubWluKGNvbnRhaW5lckRhdGEuaGVpZ2h0LCBjYW52YXNEYXRhLmhlaWdodCwgY2FudmFzRGF0YS50b3AgKyBjYW52YXNEYXRhLmhlaWdodCk7XG4gICAgICB9XG4gICAgICB2YXIgcG9pbnRlciA9IHBvaW50ZXJzW09iamVjdC5rZXlzKHBvaW50ZXJzKVswXV07XG4gICAgICB2YXIgcmFuZ2UgPSB7XG4gICAgICAgIHg6IHBvaW50ZXIuZW5kWCAtIHBvaW50ZXIuc3RhcnRYLFxuICAgICAgICB5OiBwb2ludGVyLmVuZFkgLSBwb2ludGVyLnN0YXJ0WVxuICAgICAgfTtcbiAgICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHNpZGUpIHtcbiAgICAgICAgc3dpdGNoIChzaWRlKSB7XG4gICAgICAgICAgY2FzZSBBQ1RJT05fRUFTVDpcbiAgICAgICAgICAgIGlmIChyaWdodCArIHJhbmdlLnggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICByYW5nZS54ID0gbWF4V2lkdGggLSByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQUNUSU9OX1dFU1Q6XG4gICAgICAgICAgICBpZiAobGVmdCArIHJhbmdlLnggPCBtaW5MZWZ0KSB7XG4gICAgICAgICAgICAgIHJhbmdlLnggPSBtaW5MZWZ0IC0gbGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQUNUSU9OX05PUlRIOlxuICAgICAgICAgICAgaWYgKHRvcCArIHJhbmdlLnkgPCBtaW5Ub3ApIHtcbiAgICAgICAgICAgICAgcmFuZ2UueSA9IG1pblRvcCAtIHRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQUNUSU9OX1NPVVRIOlxuICAgICAgICAgICAgaWYgKGJvdHRvbSArIHJhbmdlLnkgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgcmFuZ2UueSA9IG1heEhlaWdodCAtIGJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgLy8gTW92ZSBjcm9wIGJveFxuICAgICAgICBjYXNlIEFDVElPTl9BTEw6XG4gICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIFJlc2l6ZSBjcm9wIGJveFxuICAgICAgICBjYXNlIEFDVElPTl9FQVNUOlxuICAgICAgICAgIGlmIChyYW5nZS54ID49IDAgJiYgKHJpZ2h0ID49IG1heFdpZHRoIHx8IGFzcGVjdFJhdGlvICYmICh0b3AgPD0gbWluVG9wIHx8IGJvdHRvbSA+PSBtYXhIZWlnaHQpKSkge1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoZWNrKEFDVElPTl9FQVNUKTtcbiAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9XRVNUO1xuICAgICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB0b3AgKz0gKGNyb3BCb3hEYXRhLmhlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBQ1RJT05fTk9SVEg6XG4gICAgICAgICAgaWYgKHJhbmdlLnkgPD0gMCAmJiAodG9wIDw9IG1pblRvcCB8fCBhc3BlY3RSYXRpbyAmJiAobGVmdCA8PSBtaW5MZWZ0IHx8IHJpZ2h0ID49IG1heFdpZHRoKSkpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGVjayhBQ1RJT05fTk9SVEgpO1xuICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEg7XG4gICAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgbGVmdCArPSAoY3JvcEJveERhdGEud2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBQ1RJT05fV0VTVDpcbiAgICAgICAgICBpZiAocmFuZ2UueCA8PSAwICYmIChsZWZ0IDw9IG1pbkxlZnQgfHwgYXNwZWN0UmF0aW8gJiYgKHRvcCA8PSBtaW5Ub3AgfHwgYm90dG9tID49IG1heEhlaWdodCkpKSB7XG4gICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hlY2soQUNUSU9OX1dFU1QpO1xuICAgICAgICAgIHdpZHRoIC09IHJhbmdlLng7XG4gICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9FQVNUO1xuICAgICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB0b3AgKz0gKGNyb3BCb3hEYXRhLmhlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBQ1RJT05fU09VVEg6XG4gICAgICAgICAgaWYgKHJhbmdlLnkgPj0gMCAmJiAoYm90dG9tID49IG1heEhlaWdodCB8fCBhc3BlY3RSYXRpbyAmJiAobGVmdCA8PSBtaW5MZWZ0IHx8IHJpZ2h0ID49IG1heFdpZHRoKSkpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGVjayhBQ1RJT05fU09VVEgpO1xuICAgICAgICAgIGhlaWdodCArPSByYW5nZS55O1xuICAgICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEg7XG4gICAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgbGVmdCArPSAoY3JvcEJveERhdGEud2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBQ1RJT05fTk9SVEhfRUFTVDpcbiAgICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIGlmIChyYW5nZS55IDw9IDAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgcmlnaHQgPj0gbWF4V2lkdGgpKSB7XG4gICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVjayhBQ1RJT05fTk9SVEgpO1xuICAgICAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrKEFDVElPTl9OT1JUSCk7XG4gICAgICAgICAgICBjaGVjayhBQ1RJT05fRUFTVCk7XG4gICAgICAgICAgICBpZiAocmFuZ2UueCA+PSAwKSB7XG4gICAgICAgICAgICAgIGlmIChyaWdodCA8IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55IDw9IDAgJiYgdG9wIDw9IG1pblRvcCkge1xuICAgICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZS55IDw9IDApIHtcbiAgICAgICAgICAgICAgaWYgKHRvcCA+IG1pblRvcCkge1xuICAgICAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWR0aCA8IDAgJiYgaGVpZ2h0IDwgMCkge1xuICAgICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX1dFU1Q7XG4gICAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfRUFTVDtcbiAgICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBQ1RJT05fTk9SVEhfV0VTVDpcbiAgICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIGlmIChyYW5nZS55IDw9IDAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgbGVmdCA8PSBtaW5MZWZ0KSkge1xuICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgbGVmdCArPSBjcm9wQm94RGF0YS53aWR0aCAtIHdpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVjayhBQ1RJT05fTk9SVEgpO1xuICAgICAgICAgICAgY2hlY2soQUNUSU9OX1dFU1QpO1xuICAgICAgICAgICAgaWYgKHJhbmdlLnggPD0gMCkge1xuICAgICAgICAgICAgICBpZiAobGVmdCA+IG1pbkxlZnQpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCAtPSByYW5nZS54O1xuICAgICAgICAgICAgICAgIGxlZnQgKz0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55IDw9IDAgJiYgdG9wIDw9IG1pblRvcCkge1xuICAgICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhbmdlLnkgPD0gMCkge1xuICAgICAgICAgICAgICBpZiAodG9wID4gbWluVG9wKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfRUFTVDtcbiAgICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9TT1VUSF9XRVNUO1xuICAgICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFDVElPTl9TT1VUSF9XRVNUOlxuICAgICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgaWYgKHJhbmdlLnggPD0gMCAmJiAobGVmdCA8PSBtaW5MZWZ0IHx8IGJvdHRvbSA+PSBtYXhIZWlnaHQpKSB7XG4gICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVjayhBQ1RJT05fV0VTVCk7XG4gICAgICAgICAgICB3aWR0aCAtPSByYW5nZS54O1xuICAgICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2soQUNUSU9OX1NPVVRIKTtcbiAgICAgICAgICAgIGNoZWNrKEFDVElPTl9XRVNUKTtcbiAgICAgICAgICAgIGlmIChyYW5nZS54IDw9IDApIHtcbiAgICAgICAgICAgICAgaWYgKGxlZnQgPiBtaW5MZWZ0KSB7XG4gICAgICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2UueSA+PSAwICYmIGJvdHRvbSA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdpZHRoIC09IHJhbmdlLng7XG4gICAgICAgICAgICAgIGxlZnQgKz0gcmFuZ2UueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZS55ID49IDApIHtcbiAgICAgICAgICAgICAgaWYgKGJvdHRvbSA8IG1heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGhlaWdodCArPSByYW5nZS55O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfRUFTVDtcbiAgICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9OT1JUSF9XRVNUO1xuICAgICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFDVElPTl9TT1VUSF9FQVNUOlxuICAgICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgaWYgKHJhbmdlLnggPj0gMCAmJiAocmlnaHQgPj0gbWF4V2lkdGggfHwgYm90dG9tID49IG1heEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrKEFDVElPTl9FQVNUKTtcbiAgICAgICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG4gICAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVjayhBQ1RJT05fU09VVEgpO1xuICAgICAgICAgICAgY2hlY2soQUNUSU9OX0VBU1QpO1xuICAgICAgICAgICAgaWYgKHJhbmdlLnggPj0gMCkge1xuICAgICAgICAgICAgICBpZiAocmlnaHQgPCBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2UueSA+PSAwICYmIGJvdHRvbSA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFuZ2UueSA+PSAwKSB7XG4gICAgICAgICAgICAgIGlmIChib3R0b20gPCBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaGVpZ2h0ICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWR0aCA8IDAgJiYgaGVpZ2h0IDwgMCkge1xuICAgICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX1dFU1Q7XG4gICAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBNb3ZlIGNhbnZhc1xuICAgICAgICBjYXNlIEFDVElPTl9NT1ZFOlxuICAgICAgICAgIHRoaXMubW92ZShyYW5nZS54LCByYW5nZS55KTtcbiAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLy8gWm9vbSBjYW52YXNcbiAgICAgICAgY2FzZSBBQ1RJT05fWk9PTTpcbiAgICAgICAgICB0aGlzLnpvb20oZ2V0TWF4Wm9vbVJhdGlvKHBvaW50ZXJzKSwgZXZlbnQpO1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBDcmVhdGUgY3JvcCBib3hcbiAgICAgICAgY2FzZSBBQ1RJT05fQ1JPUDpcbiAgICAgICAgICBpZiAoIXJhbmdlLnggfHwgIXJhbmdlLnkpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvZmZzZXQgPSBnZXRPZmZzZXQodGhpcy5jcm9wcGVyKTtcbiAgICAgICAgICBsZWZ0ID0gcG9pbnRlci5zdGFydFggLSBvZmZzZXQubGVmdDtcbiAgICAgICAgICB0b3AgPSBwb2ludGVyLnN0YXJ0WSAtIG9mZnNldC50b3A7XG4gICAgICAgICAgd2lkdGggPSBjcm9wQm94RGF0YS5taW5XaWR0aDtcbiAgICAgICAgICBoZWlnaHQgPSBjcm9wQm94RGF0YS5taW5IZWlnaHQ7XG4gICAgICAgICAgaWYgKHJhbmdlLnggPiAwKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSByYW5nZS55ID4gMCA/IEFDVElPTl9TT1VUSF9FQVNUIDogQUNUSU9OX05PUlRIX0VBU1Q7XG4gICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS54IDwgMCkge1xuICAgICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICAgIGFjdGlvbiA9IHJhbmdlLnkgPiAwID8gQUNUSU9OX1NPVVRIX1dFU1QgOiBBQ1RJT05fTk9SVEhfV0VTVDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJhbmdlLnkgPCAwKSB7XG4gICAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFNob3cgdGhlIGNyb3AgYm94IGlmIGlzIGhpZGRlblxuICAgICAgICAgIGlmICghdGhpcy5jcm9wcGVkKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmNyb3BCb3gsIENMQVNTX0hJRERFTik7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMubGltaXRlZCkge1xuICAgICAgICAgICAgICB0aGlzLmxpbWl0Q3JvcEJveCh0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAocmVuZGVyYWJsZSkge1xuICAgICAgICBjcm9wQm94RGF0YS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBsZWZ0O1xuICAgICAgICBjcm9wQm94RGF0YS50b3AgPSB0b3A7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcnJpZGVcbiAgICAgIGZvckVhY2gocG9pbnRlcnMsIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHAuc3RhcnRYID0gcC5lbmRYO1xuICAgICAgICBwLnN0YXJ0WSA9IHAuZW5kWTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbWV0aG9kcyA9IHtcbiAgICAvLyBTaG93IHRoZSBjcm9wIGJveCBtYW51YWxseVxuICAgIGNyb3A6IGZ1bmN0aW9uIGNyb3AoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5jcm9wcGVkICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGltaXRDcm9wQm94KHRydWUsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsKSB7XG4gICAgICAgICAgYWRkQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jcm9wQm94LCBDTEFTU19ISURERU4pO1xuICAgICAgICB0aGlzLnNldENyb3BCb3hEYXRhKHRoaXMuaW5pdGlhbENyb3BCb3hEYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLy8gUmVzZXQgdGhlIGltYWdlIGFuZCBjcm9wIGJveCB0byB0aGVpciBpbml0aWFsIHN0YXRlc1xuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gYXNzaWduKHt9LCB0aGlzLmluaXRpYWxJbWFnZURhdGEpO1xuICAgICAgICB0aGlzLmNhbnZhc0RhdGEgPSBhc3NpZ24oe30sIHRoaXMuaW5pdGlhbENhbnZhc0RhdGEpO1xuICAgICAgICB0aGlzLmNyb3BCb3hEYXRhID0gYXNzaWduKHt9LCB0aGlzLmluaXRpYWxDcm9wQm94RGF0YSk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FudmFzKCk7XG4gICAgICAgIGlmICh0aGlzLmNyb3BwZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvLyBDbGVhciB0aGUgY3JvcCBib3hcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBpZiAodGhpcy5jcm9wcGVkICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLmNyb3BCb3hEYXRhLCB7XG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNyb3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJDcm9wQm94KCk7XG4gICAgICAgIHRoaXMubGltaXRDYW52YXModHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gUmVuZGVyIGNhbnZhcyBhZnRlciBjcm9wIGJveCByZW5kZXJlZFxuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcygpO1xuICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX01PREFMKTtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5jcm9wQm94LCBDTEFTU19ISURERU4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIHRoZSBpbWFnZSdzIHNyYyBhbmQgcmVidWlsZCB0aGUgY3JvcHBlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgbmV3IFVSTC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtoYXNTYW1lU2l6ZV0gLSBJbmRpY2F0ZSBpZiB0aGUgbmV3IGltYWdlIGhhcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBvbGQgb25lLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZSh1cmwpIHtcbiAgICAgIHZhciBoYXNTYW1lU2l6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG4gICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSW1nKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnNyYyA9IHVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzU2FtZVNpemUpIHtcbiAgICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Qm94SW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICAgICAgZm9yRWFjaCh0aGlzLnByZXZpZXdzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS5zcmMgPSB1cmw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNJbWcpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IG51bGw7XG4gICAgICAgICAgdGhpcy51bmNyZWF0ZSgpO1xuICAgICAgICAgIHRoaXMubG9hZCh1cmwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8vIEVuYWJsZSAodW5mcmVlemUpIHRoZSBjcm9wcGVyXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jcm9wcGVyLCBDTEFTU19ESVNBQkxFRCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8vIERpc2FibGUgKGZyZWV6ZSkgdGhlIGNyb3BwZXJcbiAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuY3JvcHBlciwgQ0xBU1NfRElTQUJMRUQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBjcm9wcGVyIGFuZCByZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGltYWdlXG4gICAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICBpZiAoIWVsZW1lbnRbTkFNRVNQQUNFXSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRbTkFNRVNQQUNFXSA9IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmlzSW1nICYmIHRoaXMucmVwbGFjZWQpIHtcbiAgICAgICAgZWxlbWVudC5zcmMgPSB0aGlzLm9yaWdpbmFsVXJsO1xuICAgICAgfVxuICAgICAgdGhpcy51bmNyZWF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBjYW52YXMgd2l0aCByZWxhdGl2ZSBvZmZzZXRzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFggLSBUaGUgcmVsYXRpdmUgb2Zmc2V0IGRpc3RhbmNlIG9uIHRoZSB4LWF4aXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvZmZzZXRZPW9mZnNldFhdIC0gVGhlIHJlbGF0aXZlIG9mZnNldCBkaXN0YW5jZSBvbiB0aGUgeS1heGlzLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgbW92ZTogZnVuY3Rpb24gbW92ZShvZmZzZXRYKSB7XG4gICAgICB2YXIgb2Zmc2V0WSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogb2Zmc2V0WDtcbiAgICAgIHZhciBfdGhpcyRjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhLFxuICAgICAgICBsZWZ0ID0gX3RoaXMkY2FudmFzRGF0YS5sZWZ0LFxuICAgICAgICB0b3AgPSBfdGhpcyRjYW52YXNEYXRhLnRvcDtcbiAgICAgIHJldHVybiB0aGlzLm1vdmVUbyhpc1VuZGVmaW5lZChvZmZzZXRYKSA/IG9mZnNldFggOiBsZWZ0ICsgTnVtYmVyKG9mZnNldFgpLCBpc1VuZGVmaW5lZChvZmZzZXRZKSA/IG9mZnNldFkgOiB0b3AgKyBOdW1iZXIob2Zmc2V0WSkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogTW92ZSB0aGUgY2FudmFzIHRvIGFuIGFic29sdXRlIHBvaW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeC1heGlzIGNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt5PXhdIC0gVGhlIHktYXhpcyBjb29yZGluYXRlLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgbW92ZVRvOiBmdW5jdGlvbiBtb3ZlVG8oeCkge1xuICAgICAgdmFyIHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHg7XG4gICAgICB2YXIgY2FudmFzRGF0YSA9IHRoaXMuY2FudmFzRGF0YTtcbiAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICB4ID0gTnVtYmVyKHgpO1xuICAgICAgeSA9IE51bWJlcih5KTtcbiAgICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMub3B0aW9ucy5tb3ZhYmxlKSB7XG4gICAgICAgIGlmIChpc051bWJlcih4KSkge1xuICAgICAgICAgIGNhbnZhc0RhdGEubGVmdCA9IHg7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTnVtYmVyKHkpKSB7XG4gICAgICAgICAgY2FudmFzRGF0YS50b3AgPSB5O1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogWm9vbSB0aGUgY2FudmFzIHdpdGggYSByZWxhdGl2ZSByYXRpb1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIFRoZSB0YXJnZXQgcmF0aW8uXG4gICAgICogQHBhcmFtIHtFdmVudH0gX29yaWdpbmFsRXZlbnQgLSBUaGUgb3JpZ2luYWwgZXZlbnQgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgem9vbTogZnVuY3Rpb24gem9vbShyYXRpbywgX29yaWdpbmFsRXZlbnQpIHtcbiAgICAgIHZhciBjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhO1xuICAgICAgcmF0aW8gPSBOdW1iZXIocmF0aW8pO1xuICAgICAgaWYgKHJhdGlvIDwgMCkge1xuICAgICAgICByYXRpbyA9IDEgLyAoMSAtIHJhdGlvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGlvID0gMSArIHJhdGlvO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuem9vbVRvKGNhbnZhc0RhdGEud2lkdGggKiByYXRpbyAvIGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoLCBudWxsLCBfb3JpZ2luYWxFdmVudCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBab29tIHRoZSBjYW52YXMgdG8gYW4gYWJzb2x1dGUgcmF0aW9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSBUaGUgdGFyZ2V0IHJhdGlvLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwaXZvdCAtIFRoZSB6b29tIHBpdm90IHBvaW50IGNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIHtFdmVudH0gX29yaWdpbmFsRXZlbnQgLSBUaGUgb3JpZ2luYWwgZXZlbnQgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgem9vbVRvOiBmdW5jdGlvbiB6b29tVG8ocmF0aW8sIHBpdm90LCBfb3JpZ2luYWxFdmVudCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGE7XG4gICAgICB2YXIgd2lkdGggPSBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBjYW52YXNEYXRhLmhlaWdodCxcbiAgICAgICAgbmF0dXJhbFdpZHRoID0gY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgsXG4gICAgICAgIG5hdHVyYWxIZWlnaHQgPSBjYW52YXNEYXRhLm5hdHVyYWxIZWlnaHQ7XG4gICAgICByYXRpbyA9IE51bWJlcihyYXRpbyk7XG4gICAgICBpZiAocmF0aW8gPj0gMCAmJiB0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIG9wdGlvbnMuem9vbWFibGUpIHtcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gbmF0dXJhbFdpZHRoICogcmF0aW87XG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSBuYXR1cmFsSGVpZ2h0ICogcmF0aW87XG4gICAgICAgIGlmIChkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfWk9PTSwge1xuICAgICAgICAgIHJhdGlvOiByYXRpbyxcbiAgICAgICAgICBvbGRSYXRpbzogd2lkdGggLyBuYXR1cmFsV2lkdGgsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogX29yaWdpbmFsRXZlbnRcbiAgICAgICAgfSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9vcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgICAgdmFyIHBvaW50ZXJzID0gdGhpcy5wb2ludGVycztcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gZ2V0T2Zmc2V0KHRoaXMuY3JvcHBlcik7XG4gICAgICAgICAgdmFyIGNlbnRlciA9IHBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHBvaW50ZXJzKS5sZW5ndGggPyBnZXRQb2ludGVyc0NlbnRlcihwb2ludGVycykgOiB7XG4gICAgICAgICAgICBwYWdlWDogX29yaWdpbmFsRXZlbnQucGFnZVgsXG4gICAgICAgICAgICBwYWdlWTogX29yaWdpbmFsRXZlbnQucGFnZVlcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gWm9vbSBmcm9tIHRoZSB0cmlnZ2VyaW5nIHBvaW50IG9mIHRoZSBldmVudFxuICAgICAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAobmV3V2lkdGggLSB3aWR0aCkgKiAoKGNlbnRlci5wYWdlWCAtIG9mZnNldC5sZWZ0IC0gY2FudmFzRGF0YS5sZWZ0KSAvIHdpZHRoKTtcbiAgICAgICAgICBjYW52YXNEYXRhLnRvcCAtPSAobmV3SGVpZ2h0IC0gaGVpZ2h0KSAqICgoY2VudGVyLnBhZ2VZIC0gb2Zmc2V0LnRvcCAtIGNhbnZhc0RhdGEudG9wKSAvIGhlaWdodCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwaXZvdCkgJiYgaXNOdW1iZXIocGl2b3QueCkgJiYgaXNOdW1iZXIocGl2b3QueSkpIHtcbiAgICAgICAgICBjYW52YXNEYXRhLmxlZnQgLT0gKG5ld1dpZHRoIC0gd2lkdGgpICogKChwaXZvdC54IC0gY2FudmFzRGF0YS5sZWZ0KSAvIHdpZHRoKTtcbiAgICAgICAgICBjYW52YXNEYXRhLnRvcCAtPSAobmV3SGVpZ2h0IC0gaGVpZ2h0KSAqICgocGl2b3QueSAtIGNhbnZhc0RhdGEudG9wKSAvIGhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gWm9vbSBmcm9tIHRoZSBjZW50ZXIgb2YgdGhlIGNhbnZhc1xuICAgICAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAobmV3V2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICAgIGNhbnZhc0RhdGEudG9wIC09IChuZXdIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjYW52YXNEYXRhLndpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBjYW52YXMgd2l0aCBhIHJlbGF0aXZlIGRlZ3JlZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWUgLSBUaGUgcm90YXRlIGRlZ3JlZS5cbiAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgICAqL1xuICAgIHJvdGF0ZTogZnVuY3Rpb24gcm90YXRlKGRlZ3JlZSkge1xuICAgICAgcmV0dXJuIHRoaXMucm90YXRlVG8oKHRoaXMuaW1hZ2VEYXRhLnJvdGF0ZSB8fCAwKSArIE51bWJlcihkZWdyZWUpKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJvdGF0ZSB0aGUgY2FudmFzIHRvIGFuIGFic29sdXRlIGRlZ3JlZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWUgLSBUaGUgcm90YXRlIGRlZ3JlZS5cbiAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgICAqL1xuICAgIHJvdGF0ZVRvOiBmdW5jdGlvbiByb3RhdGVUbyhkZWdyZWUpIHtcbiAgICAgIGRlZ3JlZSA9IE51bWJlcihkZWdyZWUpO1xuICAgICAgaWYgKGlzTnVtYmVyKGRlZ3JlZSkgJiYgdGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLm9wdGlvbnMucm90YXRhYmxlKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhLnJvdGF0ZSA9IGRlZ3JlZSAlIDM2MDtcbiAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFNjYWxlIHRoZSBpbWFnZSBvbiB0aGUgeC1heGlzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVggLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHgtYXhpcy5cbiAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgICAqL1xuICAgIHNjYWxlWDogZnVuY3Rpb24gc2NhbGVYKF9zY2FsZVgpIHtcbiAgICAgIHZhciBzY2FsZVkgPSB0aGlzLmltYWdlRGF0YS5zY2FsZVk7XG4gICAgICByZXR1cm4gdGhpcy5zY2FsZShfc2NhbGVYLCBpc051bWJlcihzY2FsZVkpID8gc2NhbGVZIDogMSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBTY2FsZSB0aGUgaW1hZ2Ugb24gdGhlIHktYXhpcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVZIC0gVGhlIHNjYWxlIHJhdGlvIG9uIHRoZSB5LWF4aXMuXG4gICAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBzY2FsZVk6IGZ1bmN0aW9uIHNjYWxlWShfc2NhbGVZKSB7XG4gICAgICB2YXIgc2NhbGVYID0gdGhpcy5pbWFnZURhdGEuc2NhbGVYO1xuICAgICAgcmV0dXJuIHRoaXMuc2NhbGUoaXNOdW1iZXIoc2NhbGVYKSA/IHNjYWxlWCA6IDEsIF9zY2FsZVkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU2NhbGUgdGhlIGltYWdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlWCAtIFRoZSBzY2FsZSByYXRpbyBvbiB0aGUgeC1heGlzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc2NhbGVZPXNjYWxlWF0gLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHktYXhpcy5cbiAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgICAqL1xuICAgIHNjYWxlOiBmdW5jdGlvbiBzY2FsZShzY2FsZVgpIHtcbiAgICAgIHZhciBzY2FsZVkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHNjYWxlWDtcbiAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmltYWdlRGF0YTtcbiAgICAgIHZhciB0cmFuc2Zvcm1lZCA9IGZhbHNlO1xuICAgICAgc2NhbGVYID0gTnVtYmVyKHNjYWxlWCk7XG4gICAgICBzY2FsZVkgPSBOdW1iZXIoc2NhbGVZKTtcbiAgICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMub3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgICBpZiAoaXNOdW1iZXIoc2NhbGVYKSkge1xuICAgICAgICAgIGltYWdlRGF0YS5zY2FsZVggPSBzY2FsZVg7XG4gICAgICAgICAgdHJhbnNmb3JtZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihzY2FsZVkpKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLnNjYWxlWSA9IHNjYWxlWTtcbiAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjcm9wcGVkIGFyZWEgcG9zaXRpb24gYW5kIHNpemUgZGF0YSAoYmFzZSBvbiB0aGUgb3JpZ2luYWwgaW1hZ2UpXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcm91bmRlZD1mYWxzZV0gLSBJbmRpY2F0ZSBpZiByb3VuZCB0aGUgZGF0YSB2YWx1ZXMgb3Igbm90LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgY3JvcHBlZCBkYXRhLlxuICAgICAqL1xuICAgIGdldERhdGE6IGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICB2YXIgcm91bmRlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgaW1hZ2VEYXRhID0gdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGEsXG4gICAgICAgIGNyb3BCb3hEYXRhID0gdGhpcy5jcm9wQm94RGF0YTtcbiAgICAgIHZhciBkYXRhO1xuICAgICAgaWYgKHRoaXMucmVhZHkgJiYgdGhpcy5jcm9wcGVkKSB7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgeDogY3JvcEJveERhdGEubGVmdCAtIGNhbnZhc0RhdGEubGVmdCxcbiAgICAgICAgICB5OiBjcm9wQm94RGF0YS50b3AgLSBjYW52YXNEYXRhLnRvcCxcbiAgICAgICAgICB3aWR0aDogY3JvcEJveERhdGEud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBjcm9wQm94RGF0YS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJhdGlvID0gaW1hZ2VEYXRhLndpZHRoIC8gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aDtcbiAgICAgICAgZm9yRWFjaChkYXRhLCBmdW5jdGlvbiAobiwgaSkge1xuICAgICAgICAgIGRhdGFbaV0gPSBuIC8gcmF0aW87XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocm91bmRlZCkge1xuICAgICAgICAgIC8vIEluIGNhc2Ugcm91bmRpbmcgb2ZmIGxlYWRzIHRvIGV4dHJhIDFweCBpbiByaWdodCBvciBib3R0b20gYm9yZGVyXG4gICAgICAgICAgLy8gd2Ugc2hvdWxkIHJvdW5kIHRoZSB0b3AtbGVmdCBjb3JuZXIgYW5kIHRoZSBkaW1lbnNpb24gKCMzNDMpLlxuICAgICAgICAgIHZhciBib3R0b20gPSBNYXRoLnJvdW5kKGRhdGEueSArIGRhdGEuaGVpZ2h0KTtcbiAgICAgICAgICB2YXIgcmlnaHQgPSBNYXRoLnJvdW5kKGRhdGEueCArIGRhdGEud2lkdGgpO1xuICAgICAgICAgIGRhdGEueCA9IE1hdGgucm91bmQoZGF0YS54KTtcbiAgICAgICAgICBkYXRhLnkgPSBNYXRoLnJvdW5kKGRhdGEueSk7XG4gICAgICAgICAgZGF0YS53aWR0aCA9IHJpZ2h0IC0gZGF0YS54O1xuICAgICAgICAgIGRhdGEuaGVpZ2h0ID0gYm90dG9tIC0gZGF0YS55O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgICBkYXRhLnJvdGF0ZSA9IGltYWdlRGF0YS5yb3RhdGUgfHwgMDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnNjYWxhYmxlKSB7XG4gICAgICAgIGRhdGEuc2NhbGVYID0gaW1hZ2VEYXRhLnNjYWxlWCB8fCAxO1xuICAgICAgICBkYXRhLnNjYWxlWSA9IGltYWdlRGF0YS5zY2FsZVkgfHwgMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjcm9wcGVkIGFyZWEgcG9zaXRpb24gYW5kIHNpemUgd2l0aCBuZXcgZGF0YVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG5ldyBkYXRhLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgc2V0RGF0YTogZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgaW1hZ2VEYXRhID0gdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmNhbnZhc0RhdGE7XG4gICAgICB2YXIgY3JvcEJveERhdGEgPSB7fTtcbiAgICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIGlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gZmFsc2U7XG4gICAgICAgIGlmIChvcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgICAgIGlmIChpc051bWJlcihkYXRhLnJvdGF0ZSkgJiYgZGF0YS5yb3RhdGUgIT09IGltYWdlRGF0YS5yb3RhdGUpIHtcbiAgICAgICAgICAgIGltYWdlRGF0YS5yb3RhdGUgPSBkYXRhLnJvdGF0ZTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGFibGUpIHtcbiAgICAgICAgICBpZiAoaXNOdW1iZXIoZGF0YS5zY2FsZVgpICYmIGRhdGEuc2NhbGVYICE9PSBpbWFnZURhdGEuc2NhbGVYKSB7XG4gICAgICAgICAgICBpbWFnZURhdGEuc2NhbGVYID0gZGF0YS5zY2FsZVg7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc051bWJlcihkYXRhLnNjYWxlWSkgJiYgZGF0YS5zY2FsZVkgIT09IGltYWdlRGF0YS5zY2FsZVkpIHtcbiAgICAgICAgICAgIGltYWdlRGF0YS5zY2FsZVkgPSBkYXRhLnNjYWxlWTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJhdGlvID0gaW1hZ2VEYXRhLndpZHRoIC8gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aDtcbiAgICAgICAgaWYgKGlzTnVtYmVyKGRhdGEueCkpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gZGF0YS54ICogcmF0aW8gKyBjYW52YXNEYXRhLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTnVtYmVyKGRhdGEueSkpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS50b3AgPSBkYXRhLnkgKiByYXRpbyArIGNhbnZhc0RhdGEudG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLndpZHRoKSkge1xuICAgICAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gZGF0YS53aWR0aCAqIHJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLmhlaWdodCkpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBkYXRhLmhlaWdodCAqIHJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0Q3JvcEJveERhdGEoY3JvcEJveERhdGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnRhaW5lciBzaXplIGRhdGEuXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBjb250YWluZXIgZGF0YS5cbiAgICAgKi9cbiAgICBnZXRDb250YWluZXJEYXRhOiBmdW5jdGlvbiBnZXRDb250YWluZXJEYXRhKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVhZHkgPyBhc3NpZ24oe30sIHRoaXMuY29udGFpbmVyRGF0YSkgOiB7fTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW1hZ2UgcG9zaXRpb24gYW5kIHNpemUgZGF0YS5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IGltYWdlIGRhdGEuXG4gICAgICovXG4gICAgZ2V0SW1hZ2VEYXRhOiBmdW5jdGlvbiBnZXRJbWFnZURhdGEoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplZCA/IGFzc2lnbih7fSwgdGhpcy5pbWFnZURhdGEpIDoge307XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNhbnZhcyBwb3NpdGlvbiBhbmQgc2l6ZSBkYXRhLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgY2FudmFzIGRhdGEuXG4gICAgICovXG4gICAgZ2V0Q2FudmFzRGF0YTogZnVuY3Rpb24gZ2V0Q2FudmFzRGF0YSgpIHtcbiAgICAgIHZhciBjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhO1xuICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICAgIGZvckVhY2goWydsZWZ0JywgJ3RvcCcsICd3aWR0aCcsICdoZWlnaHQnLCAnbmF0dXJhbFdpZHRoJywgJ25hdHVyYWxIZWlnaHQnXSwgZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICBkYXRhW25dID0gY2FudmFzRGF0YVtuXTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY2FudmFzIHBvc2l0aW9uIGFuZCBzaXplIHdpdGggbmV3IGRhdGEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgbmV3IGNhbnZhcyBkYXRhLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgc2V0Q2FudmFzRGF0YTogZnVuY3Rpb24gc2V0Q2FudmFzRGF0YShkYXRhKSB7XG4gICAgICB2YXIgY2FudmFzRGF0YSA9IHRoaXMuY2FudmFzRGF0YTtcbiAgICAgIHZhciBhc3BlY3RSYXRpbyA9IGNhbnZhc0RhdGEuYXNwZWN0UmF0aW87XG4gICAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCAmJiBpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLmxlZnQpKSB7XG4gICAgICAgICAgY2FudmFzRGF0YS5sZWZ0ID0gZGF0YS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLnRvcCkpIHtcbiAgICAgICAgICBjYW52YXNEYXRhLnRvcCA9IGRhdGEudG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLndpZHRoKSkge1xuICAgICAgICAgIGNhbnZhc0RhdGEud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gZGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGEuaGVpZ2h0KSkge1xuICAgICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICAgICAgY2FudmFzRGF0YS53aWR0aCA9IGRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3JvcCBib3ggcG9zaXRpb24gYW5kIHNpemUgZGF0YS5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IGNyb3AgYm94IGRhdGEuXG4gICAgICovXG4gICAgZ2V0Q3JvcEJveERhdGE6IGZ1bmN0aW9uIGdldENyb3BCb3hEYXRhKCkge1xuICAgICAgdmFyIGNyb3BCb3hEYXRhID0gdGhpcy5jcm9wQm94RGF0YTtcbiAgICAgIHZhciBkYXRhO1xuICAgICAgaWYgKHRoaXMucmVhZHkgJiYgdGhpcy5jcm9wcGVkKSB7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgbGVmdDogY3JvcEJveERhdGEubGVmdCxcbiAgICAgICAgICB0b3A6IGNyb3BCb3hEYXRhLnRvcCxcbiAgICAgICAgICB3aWR0aDogY3JvcEJveERhdGEud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBjcm9wQm94RGF0YS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhIHx8IHt9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjcm9wIGJveCBwb3NpdGlvbiBhbmQgc2l6ZSB3aXRoIG5ldyBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG5ldyBjcm9wIGJveCBkYXRhLlxuICAgICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAgICovXG4gICAgc2V0Q3JvcEJveERhdGE6IGZ1bmN0aW9uIHNldENyb3BCb3hEYXRhKGRhdGEpIHtcbiAgICAgIHZhciBjcm9wQm94RGF0YSA9IHRoaXMuY3JvcEJveERhdGE7XG4gICAgICB2YXIgYXNwZWN0UmF0aW8gPSB0aGlzLm9wdGlvbnMuYXNwZWN0UmF0aW87XG4gICAgICB2YXIgd2lkdGhDaGFuZ2VkO1xuICAgICAgdmFyIGhlaWdodENoYW5nZWQ7XG4gICAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmNyb3BwZWQgJiYgIXRoaXMuZGlzYWJsZWQgJiYgaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICBpZiAoaXNOdW1iZXIoZGF0YS5sZWZ0KSkge1xuICAgICAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBkYXRhLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTnVtYmVyKGRhdGEudG9wKSkge1xuICAgICAgICAgIGNyb3BCb3hEYXRhLnRvcCA9IGRhdGEudG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLndpZHRoKSAmJiBkYXRhLndpZHRoICE9PSBjcm9wQm94RGF0YS53aWR0aCkge1xuICAgICAgICAgIHdpZHRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgY3JvcEJveERhdGEud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLmhlaWdodCkgJiYgZGF0YS5oZWlnaHQgIT09IGNyb3BCb3hEYXRhLmhlaWdodCkge1xuICAgICAgICAgIGhlaWdodENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmICh3aWR0aENoYW5nZWQpIHtcbiAgICAgICAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IGNyb3BCb3hEYXRhLndpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIGlmIChoZWlnaHRDaGFuZ2VkKSB7XG4gICAgICAgICAgICBjcm9wQm94RGF0YS53aWR0aCA9IGNyb3BCb3hEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IGEgY2FudmFzIGRyYXduIHRoZSBjcm9wcGVkIGltYWdlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBUaGUgY29uZmlnIG9wdGlvbnMuXG4gICAgICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fSAtIFRoZSByZXN1bHQgY2FudmFzLlxuICAgICAqL1xuICAgIGdldENyb3BwZWRDYW52YXM6IGZ1bmN0aW9uIGdldENyb3BwZWRDYW52YXMoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBpZiAoIXRoaXMucmVhZHkgfHwgIXdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBjYW52YXNEYXRhID0gdGhpcy5jYW52YXNEYXRhO1xuICAgICAgdmFyIHNvdXJjZSA9IGdldFNvdXJjZUNhbnZhcyh0aGlzLmltYWdlLCB0aGlzLmltYWdlRGF0YSwgY2FudmFzRGF0YSwgb3B0aW9ucyk7XG5cbiAgICAgIC8vIFJldHVybnMgdGhlIHNvdXJjZSBjYW52YXMgaWYgaXQgaXMgbm90IGNyb3BwZWQuXG4gICAgICBpZiAoIXRoaXMuY3JvcHBlZCkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuICAgICAgdmFyIF90aGlzJGdldERhdGEgPSB0aGlzLmdldERhdGEob3B0aW9ucy5yb3VuZGVkKSxcbiAgICAgICAgaW5pdGlhbFggPSBfdGhpcyRnZXREYXRhLngsXG4gICAgICAgIGluaXRpYWxZID0gX3RoaXMkZ2V0RGF0YS55LFxuICAgICAgICBpbml0aWFsV2lkdGggPSBfdGhpcyRnZXREYXRhLndpZHRoLFxuICAgICAgICBpbml0aWFsSGVpZ2h0ID0gX3RoaXMkZ2V0RGF0YS5oZWlnaHQ7XG4gICAgICB2YXIgcmF0aW8gPSBzb3VyY2Uud2lkdGggLyBNYXRoLmZsb29yKGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoKTtcbiAgICAgIGlmIChyYXRpbyAhPT0gMSkge1xuICAgICAgICBpbml0aWFsWCAqPSByYXRpbztcbiAgICAgICAgaW5pdGlhbFkgKj0gcmF0aW87XG4gICAgICAgIGluaXRpYWxXaWR0aCAqPSByYXRpbztcbiAgICAgICAgaW5pdGlhbEhlaWdodCAqPSByYXRpbztcbiAgICAgIH1cbiAgICAgIHZhciBhc3BlY3RSYXRpbyA9IGluaXRpYWxXaWR0aCAvIGluaXRpYWxIZWlnaHQ7XG4gICAgICB2YXIgbWF4U2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgICAgYXNwZWN0UmF0aW86IGFzcGVjdFJhdGlvLFxuICAgICAgICB3aWR0aDogb3B0aW9ucy5tYXhXaWR0aCB8fCBJbmZpbml0eSxcbiAgICAgICAgaGVpZ2h0OiBvcHRpb25zLm1heEhlaWdodCB8fCBJbmZpbml0eVxuICAgICAgfSk7XG4gICAgICB2YXIgbWluU2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgICAgYXNwZWN0UmF0aW86IGFzcGVjdFJhdGlvLFxuICAgICAgICB3aWR0aDogb3B0aW9ucy5taW5XaWR0aCB8fCAwLFxuICAgICAgICBoZWlnaHQ6IG9wdGlvbnMubWluSGVpZ2h0IHx8IDBcbiAgICAgIH0sICdjb3ZlcicpO1xuICAgICAgdmFyIF9nZXRBZGp1c3RlZFNpemVzID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgICAgICAgYXNwZWN0UmF0aW86IGFzcGVjdFJhdGlvLFxuICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoIHx8IChyYXRpbyAhPT0gMSA/IHNvdXJjZS53aWR0aCA6IGluaXRpYWxXaWR0aCksXG4gICAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCB8fCAocmF0aW8gIT09IDEgPyBzb3VyY2UuaGVpZ2h0IDogaW5pdGlhbEhlaWdodClcbiAgICAgICAgfSksXG4gICAgICAgIHdpZHRoID0gX2dldEFkanVzdGVkU2l6ZXMud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IF9nZXRBZGp1c3RlZFNpemVzLmhlaWdodDtcbiAgICAgIHdpZHRoID0gTWF0aC5taW4obWF4U2l6ZXMud2lkdGgsIE1hdGgubWF4KG1pblNpemVzLndpZHRoLCB3aWR0aCkpO1xuICAgICAgaGVpZ2h0ID0gTWF0aC5taW4obWF4U2l6ZXMuaGVpZ2h0LCBNYXRoLm1heChtaW5TaXplcy5oZWlnaHQsIGhlaWdodCkpO1xuICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNhbnZhcy53aWR0aCA9IG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIod2lkdGgpO1xuICAgICAgY2FudmFzLmhlaWdodCA9IG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIoaGVpZ2h0KTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3IgfHwgJ3RyYW5zcGFyZW50JztcbiAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB2YXIgX29wdGlvbnMkaW1hZ2VTbW9vdGhpID0gb3B0aW9ucy5pbWFnZVNtb290aGluZ0VuYWJsZWQsXG4gICAgICAgIGltYWdlU21vb3RoaW5nRW5hYmxlZCA9IF9vcHRpb25zJGltYWdlU21vb3RoaSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGltYWdlU21vb3RoaSxcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gb3B0aW9ucy5pbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgIGlmIChpbWFnZVNtb290aGluZ1F1YWxpdHkpIHtcbiAgICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBpbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQuZHJhd0ltYWdlXG4gICAgICB2YXIgc291cmNlV2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgICB2YXIgc291cmNlSGVpZ2h0ID0gc291cmNlLmhlaWdodDtcblxuICAgICAgLy8gU291cmNlIGNhbnZhcyBwYXJhbWV0ZXJzXG4gICAgICB2YXIgc3JjWCA9IGluaXRpYWxYO1xuICAgICAgdmFyIHNyY1kgPSBpbml0aWFsWTtcbiAgICAgIHZhciBzcmNXaWR0aDtcbiAgICAgIHZhciBzcmNIZWlnaHQ7XG5cbiAgICAgIC8vIERlc3RpbmF0aW9uIGNhbnZhcyBwYXJhbWV0ZXJzXG4gICAgICB2YXIgZHN0WDtcbiAgICAgIHZhciBkc3RZO1xuICAgICAgdmFyIGRzdFdpZHRoO1xuICAgICAgdmFyIGRzdEhlaWdodDtcbiAgICAgIGlmIChzcmNYIDw9IC1pbml0aWFsV2lkdGggfHwgc3JjWCA+IHNvdXJjZVdpZHRoKSB7XG4gICAgICAgIHNyY1ggPSAwO1xuICAgICAgICBzcmNXaWR0aCA9IDA7XG4gICAgICAgIGRzdFggPSAwO1xuICAgICAgICBkc3RXaWR0aCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHNyY1ggPD0gMCkge1xuICAgICAgICBkc3RYID0gLXNyY1g7XG4gICAgICAgIHNyY1ggPSAwO1xuICAgICAgICBzcmNXaWR0aCA9IE1hdGgubWluKHNvdXJjZVdpZHRoLCBpbml0aWFsV2lkdGggKyBzcmNYKTtcbiAgICAgICAgZHN0V2lkdGggPSBzcmNXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAoc3JjWCA8PSBzb3VyY2VXaWR0aCkge1xuICAgICAgICBkc3RYID0gMDtcbiAgICAgICAgc3JjV2lkdGggPSBNYXRoLm1pbihpbml0aWFsV2lkdGgsIHNvdXJjZVdpZHRoIC0gc3JjWCk7XG4gICAgICAgIGRzdFdpZHRoID0gc3JjV2lkdGg7XG4gICAgICB9XG4gICAgICBpZiAoc3JjV2lkdGggPD0gMCB8fCBzcmNZIDw9IC1pbml0aWFsSGVpZ2h0IHx8IHNyY1kgPiBzb3VyY2VIZWlnaHQpIHtcbiAgICAgICAgc3JjWSA9IDA7XG4gICAgICAgIHNyY0hlaWdodCA9IDA7XG4gICAgICAgIGRzdFkgPSAwO1xuICAgICAgICBkc3RIZWlnaHQgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzcmNZIDw9IDApIHtcbiAgICAgICAgZHN0WSA9IC1zcmNZO1xuICAgICAgICBzcmNZID0gMDtcbiAgICAgICAgc3JjSGVpZ2h0ID0gTWF0aC5taW4oc291cmNlSGVpZ2h0LCBpbml0aWFsSGVpZ2h0ICsgc3JjWSk7XG4gICAgICAgIGRzdEhlaWdodCA9IHNyY0hlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAoc3JjWSA8PSBzb3VyY2VIZWlnaHQpIHtcbiAgICAgICAgZHN0WSA9IDA7XG4gICAgICAgIHNyY0hlaWdodCA9IE1hdGgubWluKGluaXRpYWxIZWlnaHQsIHNvdXJjZUhlaWdodCAtIHNyY1kpO1xuICAgICAgICBkc3RIZWlnaHQgPSBzcmNIZWlnaHQ7XG4gICAgICB9XG4gICAgICB2YXIgcGFyYW1zID0gW3NyY1gsIHNyY1ksIHNyY1dpZHRoLCBzcmNIZWlnaHRdO1xuXG4gICAgICAvLyBBdm9pZCBcIkluZGV4U2l6ZUVycm9yXCJcbiAgICAgIGlmIChkc3RXaWR0aCA+IDAgJiYgZHN0SGVpZ2h0ID4gMCkge1xuICAgICAgICB2YXIgc2NhbGUgPSB3aWR0aCAvIGluaXRpYWxXaWR0aDtcbiAgICAgICAgcGFyYW1zLnB1c2goZHN0WCAqIHNjYWxlLCBkc3RZICogc2NhbGUsIGRzdFdpZHRoICogc2NhbGUsIGRzdEhlaWdodCAqIHNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWxsIHRoZSBudW1lcmljYWwgcGFyYW1ldGVycyBzaG91bGQgYmUgaW50ZWdlciBmb3IgYGRyYXdJbWFnZWBcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZW5neXVhbmNoZW4vY3JvcHBlci9pc3N1ZXMvNDc2XG4gICAgICBjb250ZXh0LmRyYXdJbWFnZS5hcHBseShjb250ZXh0LCBbc291cmNlXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHBhcmFtcy5tYXAoZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIocGFyYW0pKTtcbiAgICAgIH0pKSkpO1xuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgYXNwZWN0IHJhdGlvIG9mIHRoZSBjcm9wIGJveC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0UmF0aW8gLSBUaGUgbmV3IGFzcGVjdCByYXRpby5cbiAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgICAqL1xuICAgIHNldEFzcGVjdFJhdGlvOiBmdW5jdGlvbiBzZXRBc3BlY3RSYXRpbyhhc3BlY3RSYXRpbykge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIWlzVW5kZWZpbmVkKGFzcGVjdFJhdGlvKSkge1xuICAgICAgICAvLyAwIC0+IE5hTlxuICAgICAgICBvcHRpb25zLmFzcGVjdFJhdGlvID0gTWF0aC5tYXgoMCwgYXNwZWN0UmF0aW8pIHx8IE5hTjtcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICAgICAgICB0aGlzLmluaXRDcm9wQm94KCk7XG4gICAgICAgICAgaWYgKHRoaXMuY3JvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJDcm9wQm94KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgZHJhZyBtb2RlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlIC0gVGhlIG5ldyBkcmFnIG1vZGUuXG4gICAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBzZXREcmFnTW9kZTogZnVuY3Rpb24gc2V0RHJhZ01vZGUobW9kZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGRyYWdCb3ggPSB0aGlzLmRyYWdCb3gsXG4gICAgICAgIGZhY2UgPSB0aGlzLmZhY2U7XG4gICAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICB2YXIgY3JvcHBhYmxlID0gbW9kZSA9PT0gRFJBR19NT0RFX0NST1A7XG4gICAgICAgIHZhciBtb3ZhYmxlID0gb3B0aW9ucy5tb3ZhYmxlICYmIG1vZGUgPT09IERSQUdfTU9ERV9NT1ZFO1xuICAgICAgICBtb2RlID0gY3JvcHBhYmxlIHx8IG1vdmFibGUgPyBtb2RlIDogRFJBR19NT0RFX05PTkU7XG4gICAgICAgIG9wdGlvbnMuZHJhZ01vZGUgPSBtb2RlO1xuICAgICAgICBzZXREYXRhKGRyYWdCb3gsIERBVEFfQUNUSU9OLCBtb2RlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0JveCwgQ0xBU1NfQ1JPUCwgY3JvcHBhYmxlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0JveCwgQ0xBU1NfTU9WRSwgbW92YWJsZSk7XG4gICAgICAgIGlmICghb3B0aW9ucy5jcm9wQm94TW92YWJsZSkge1xuICAgICAgICAgIC8vIFN5bmMgZHJhZyBtb2RlIHRvIGNyb3AgYm94IHdoZW4gaXQgaXMgbm90IG1vdmFibGVcbiAgICAgICAgICBzZXREYXRhKGZhY2UsIERBVEFfQUNUSU9OLCBtb2RlKTtcbiAgICAgICAgICB0b2dnbGVDbGFzcyhmYWNlLCBDTEFTU19DUk9QLCBjcm9wcGFibGUpO1xuICAgICAgICAgIHRvZ2dsZUNsYXNzKGZhY2UsIENMQVNTX01PVkUsIG1vdmFibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgdmFyIEFub3RoZXJDcm9wcGVyID0gV0lORE9XLkNyb3BwZXI7XG4gIHZhciBDcm9wcGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgQ3JvcHBlci5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQgZm9yIGNyb3BwaW5nLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENyb3BwZXIoZWxlbWVudCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENyb3BwZXIpO1xuICAgICAgaWYgKCFlbGVtZW50IHx8ICFSRUdFWFBfVEFHX05BTUUudGVzdChlbGVtZW50LnRhZ05hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZpcnN0IGFyZ3VtZW50IGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGFuIDxpbWc+IG9yIDxjYW52YXM+IGVsZW1lbnQuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBERUZBVUxUUywgaXNQbGFpbk9iamVjdChvcHRpb25zKSAmJiBvcHRpb25zKTtcbiAgICAgIHRoaXMuY3JvcHBlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wb2ludGVycyA9IHt9O1xuICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgdGhpcy5yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVwbGFjZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2l6ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2l6aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGVDbGFzcyhDcm9wcGVyLCBbe1xuICAgICAga2V5OiBcImluaXRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHVybDtcbiAgICAgICAgaWYgKGVsZW1lbnRbTkFNRVNQQUNFXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50W05BTUVTUEFDRV0gPSB0aGlzO1xuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ2ltZycpIHtcbiAgICAgICAgICB0aGlzLmlzSW1nID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIGUuZy46IFwiaW1nL3BpY3R1cmUuanBnXCJcbiAgICAgICAgICB1cmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJyc7XG4gICAgICAgICAgdGhpcy5vcmlnaW5hbFVybCA9IHVybDtcblxuICAgICAgICAgIC8vIFN0b3Agd2hlbiBpdCdzIGEgYmxhbmsgaW1hZ2VcbiAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGUuZy46IFwiaHR0cHM6Ly9leGFtcGxlLmNvbS9pbWcvcGljdHVyZS5qcGdcIlxuICAgICAgICAgIHVybCA9IGVsZW1lbnQuc3JjO1xuICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdjYW52YXMnICYmIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICAgIHVybCA9IGVsZW1lbnQudG9EYXRhVVJMKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkKHVybCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImxvYWRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkKHVybCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5pbWFnZURhdGEgPSB7fTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKCFvcHRpb25zLnJvdGF0YWJsZSAmJiAhb3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgICAgIG9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBJRTEwKyBzdXBwb3J0cyBUeXBlZCBBcnJheXNcbiAgICAgICAgaWYgKCFvcHRpb25zLmNoZWNrT3JpZW50YXRpb24gfHwgIXdpbmRvdy5BcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHRoaXMuY2xvbmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlY3QgdGhlIG1pbWUgdHlwZSBvZiB0aGUgaW1hZ2UgZGlyZWN0bHkgaWYgaXQgaXMgYSBEYXRhIFVSTFxuICAgICAgICBpZiAoUkVHRVhQX0RBVEFfVVJMLnRlc3QodXJsKSkge1xuICAgICAgICAgIC8vIFJlYWQgQXJyYXlCdWZmZXIgZnJvbSBEYXRhIFVSTCBvZiBKUEVHIGltYWdlcyBkaXJlY3RseSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgICAgaWYgKFJFR0VYUF9EQVRBX1VSTF9KUEVHLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkKGRhdGFVUkxUb0FycmF5QnVmZmVyKHVybCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPbmx5IGEgSlBFRyBpbWFnZSBtYXkgY29udGFpbnMgRXhpZiBPcmllbnRhdGlvbiBpbmZvcm1hdGlvbixcbiAgICAgICAgICAgIC8vIHRoZSByZXN0IHR5cGVzIG9mIERhdGEgVVJMcyBhcmUgbm90IG5lY2Vzc2FyeSB0byBjaGVjayBvcmllbnRhdGlvbiBhdCBhbGwuXG4gICAgICAgICAgICB0aGlzLmNsb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDEuIERldGVjdCB0aGUgbWltZSB0eXBlIG9mIHRoZSBpbWFnZSBieSBhIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAgICAvLyAyLiBMb2FkIHRoZSBpbWFnZSBhcyBBcnJheUJ1ZmZlciBmb3IgcmVhZGluZyBvcmllbnRhdGlvbiBpZiBpdHMgYSBKUEVHIGltYWdlLlxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuY2xvbmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnhociA9IHhocjtcblxuICAgICAgICAvLyAxLiBDcm9zcyBvcmlnaW4gcmVxdWVzdHMgYXJlIG9ubHkgc3VwcG9ydGVkIGZvciBwcm90b2NvbCBzY2hlbWVzOlxuICAgICAgICAvLyBodHRwLCBodHRwcywgZGF0YSwgY2hyb21lLCBjaHJvbWUtZXh0ZW5zaW9uLlxuICAgICAgICAvLyAyLiBBY2Nlc3MgdG8gWE1MSHR0cFJlcXVlc3QgZnJvbSBhIERhdGEgVVJMIHdpbGwgYmUgYmxvY2tlZCBieSBDT1JTIHBvbGljeVxuICAgICAgICAvLyBpbiBzb21lIGJyb3dzZXJzIGFzIElFMTEgYW5kIFNhZmFyaS5cbiAgICAgICAgeGhyLm9uYWJvcnQgPSBjbG9uZTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBjbG9uZTtcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGNsb25lO1xuICAgICAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBkaXJlY3RseSBpZiBpdCBub3QgYSBKUEVHIGltYWdlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgICBpZiAoeGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKSAhPT0gTUlNRV9UWVBFX0pQRUcpIHtcbiAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy5yZWFkKHhoci5yZXNwb25zZSk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMucmVsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgX3RoaXMueGhyID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBCdXN0IGNhY2hlIHdoZW4gdGhlcmUgaXMgYSBcImNyb3NzT3JpZ2luXCIgcHJvcGVydHkgdG8gYXZvaWQgYnJvd3NlciBjYWNoZSBlcnJvclxuICAgICAgICBpZiAob3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luICYmIGlzQ3Jvc3NPcmlnaW5VUkwodXJsKSAmJiBlbGVtZW50LmNyb3NzT3JpZ2luKSB7XG4gICAgICAgICAgdXJsID0gYWRkVGltZXN0YW1wKHVybCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgdGhpcmQgcGFyYW1ldGVyIGlzIHJlcXVpcmVkIGZvciBhdm9pZGluZyBzaWRlLWVmZmVjdCAoIzY4MilcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZWxlbWVudC5jcm9zc09yaWdpbiA9PT0gJ3VzZS1jcmVkZW50aWFscyc7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcInJlYWRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWFkKGFycmF5QnVmZmVyKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGltYWdlRGF0YSA9IHRoaXMuaW1hZ2VEYXRhO1xuXG4gICAgICAgIC8vIFJlc2V0IHRoZSBvcmllbnRhdGlvbiB2YWx1ZSB0byBpdHMgZGVmYXVsdCB2YWx1ZSAxXG4gICAgICAgIC8vIGFzIHNvbWUgaU9TIGJyb3dzZXJzIHdpbGwgcmVuZGVyIGltYWdlIHdpdGggaXRzIG9yaWVudGF0aW9uXG4gICAgICAgIHZhciBvcmllbnRhdGlvbiA9IHJlc2V0QW5kR2V0T3JpZW50YXRpb24oYXJyYXlCdWZmZXIpO1xuICAgICAgICB2YXIgcm90YXRlID0gMDtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciBzY2FsZVkgPSAxO1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPiAxKSB7XG4gICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgVVJMIHdoaWNoIGhhcyB0aGUgZGVmYXVsdCBvcmllbnRhdGlvbiB2YWx1ZVxuICAgICAgICAgIHRoaXMudXJsID0gYXJyYXlCdWZmZXJUb0RhdGFVUkwoYXJyYXlCdWZmZXIsIE1JTUVfVFlQRV9KUEVHKTtcbiAgICAgICAgICB2YXIgX3BhcnNlT3JpZW50YXRpb24gPSBwYXJzZU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcbiAgICAgICAgICByb3RhdGUgPSBfcGFyc2VPcmllbnRhdGlvbi5yb3RhdGU7XG4gICAgICAgICAgc2NhbGVYID0gX3BhcnNlT3JpZW50YXRpb24uc2NhbGVYO1xuICAgICAgICAgIHNjYWxlWSA9IF9wYXJzZU9yaWVudGF0aW9uLnNjYWxlWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5yb3RhdGFibGUpIHtcbiAgICAgICAgICBpbWFnZURhdGEucm90YXRlID0gcm90YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnNjYWxhYmxlKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgICBpbWFnZURhdGEuc2NhbGVZID0gc2NhbGVZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvbmUoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiY2xvbmVcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgdXJsID0gdGhpcy51cmw7XG4gICAgICAgIHZhciBjcm9zc09yaWdpbiA9IGVsZW1lbnQuY3Jvc3NPcmlnaW47XG4gICAgICAgIHZhciBjcm9zc09yaWdpblVybCA9IHVybDtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luICYmIGlzQ3Jvc3NPcmlnaW5VUkwodXJsKSkge1xuICAgICAgICAgIGlmICghY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQnVzdCBjYWNoZSB3aGVuIHRoZXJlIGlzIG5vdCBhIFwiY3Jvc3NPcmlnaW5cIiBwcm9wZXJ0eSAoIzUxOSlcbiAgICAgICAgICBjcm9zc09yaWdpblVybCA9IGFkZFRpbWVzdGFtcCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgICAgdGhpcy5jcm9zc09yaWdpblVybCA9IGNyb3NzT3JpZ2luVXJsO1xuICAgICAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaWYgKGNyb3NzT3JpZ2luKSB7XG4gICAgICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZS5zcmMgPSBjcm9zc09yaWdpblVybCB8fCB1cmw7XG4gICAgICAgIGltYWdlLmFsdCA9IGVsZW1lbnQuYWx0IHx8ICdUaGUgaW1hZ2UgdG8gY3JvcCc7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gdGhpcy5zdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gICAgICAgIGFkZENsYXNzKGltYWdlLCBDTEFTU19ISURFKTtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbWFnZSwgZWxlbWVudC5uZXh0U2libGluZyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcInN0YXJ0XCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgICB2YXIgaW1hZ2UgPSB0aGlzLmltYWdlO1xuICAgICAgICBpbWFnZS5vbmxvYWQgPSBudWxsO1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaXppbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1hdGNoIGFsbCBicm93c2VycyB0aGF0IHVzZSBXZWJLaXQgYXMgdGhlIGxheW91dCBlbmdpbmUgaW4gaU9TIGRldmljZXMsXG4gICAgICAgIC8vIHN1Y2ggYXMgU2FmYXJpIGZvciBpT1MsIENocm9tZSBmb3IgaU9TLCBhbmQgaW4tYXBwIGJyb3dzZXJzLlxuICAgICAgICB2YXIgaXNJT1NXZWJLaXQgPSBXSU5ET1cubmF2aWdhdG9yICYmIC8oPzppUGFkfGlQaG9uZXxpUG9kKS4qP0FwcGxlV2ViS2l0L2kudGVzdChXSU5ET1cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gZG9uZShuYXR1cmFsV2lkdGgsIG5hdHVyYWxIZWlnaHQpIHtcbiAgICAgICAgICBhc3NpZ24oX3RoaXMyLmltYWdlRGF0YSwge1xuICAgICAgICAgICAgbmF0dXJhbFdpZHRoOiBuYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiBuYXR1cmFsSGVpZ2h0LFxuICAgICAgICAgICAgYXNwZWN0UmF0aW86IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBfdGhpczIuaW5pdGlhbEltYWdlRGF0YSA9IGFzc2lnbih7fSwgX3RoaXMyLmltYWdlRGF0YSk7XG4gICAgICAgICAgX3RoaXMyLnNpemluZyA9IGZhbHNlO1xuICAgICAgICAgIF90aGlzMi5zaXplZCA9IHRydWU7XG4gICAgICAgICAgX3RoaXMyLmJ1aWxkKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gTW9zdCBtb2Rlcm4gYnJvd3NlcnMgKGV4Y2VwdHMgaU9TIFdlYktpdClcbiAgICAgICAgaWYgKGltYWdlLm5hdHVyYWxXaWR0aCAmJiAhaXNJT1NXZWJLaXQpIHtcbiAgICAgICAgICBkb25lKGltYWdlLm5hdHVyYWxXaWR0aCwgaW1hZ2UubmF0dXJhbEhlaWdodCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaXppbmdJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB0aGlzLnNpemluZ0ltYWdlID0gc2l6aW5nSW1hZ2U7XG4gICAgICAgIHNpemluZ0ltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkb25lKHNpemluZ0ltYWdlLndpZHRoLCBzaXppbmdJbWFnZS5oZWlnaHQpO1xuICAgICAgICAgIGlmICghaXNJT1NXZWJLaXQpIHtcbiAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoc2l6aW5nSW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2l6aW5nSW1hZ2Uuc3JjID0gaW1hZ2Uuc3JjO1xuXG4gICAgICAgIC8vIGlPUyBXZWJLaXQgd2lsbCBjb252ZXJ0IHRoZSBpbWFnZSBhdXRvbWF0aWNhbGx5XG4gICAgICAgIC8vIHdpdGggaXRzIG9yaWVudGF0aW9uIG9uY2UgYXBwZW5kIGl0IGludG8gRE9NICgjMjc5KVxuICAgICAgICBpZiAoIWlzSU9TV2ViS2l0KSB7XG4gICAgICAgICAgc2l6aW5nSW1hZ2Uuc3R5bGUuY3NzVGV4dCA9ICdsZWZ0OjA7JyArICdtYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50OycgKyAnbWF4LXdpZHRoOm5vbmUhaW1wb3J0YW50OycgKyAnbWluLWhlaWdodDowIWltcG9ydGFudDsnICsgJ21pbi13aWR0aDowIWltcG9ydGFudDsnICsgJ29wYWNpdHk6MDsnICsgJ3Bvc2l0aW9uOmFic29sdXRlOycgKyAndG9wOjA7JyArICd6LWluZGV4Oi0xOyc7XG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChzaXppbmdJbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwic3RvcFwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIHZhciBpbWFnZSA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIGltYWdlLm9ubG9hZCA9IG51bGw7XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICBpbWFnZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltYWdlKTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImJ1aWxkXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaXplZCB8fCB0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50LFxuICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgaW1hZ2UgPSB0aGlzLmltYWdlO1xuXG4gICAgICAgIC8vIENyZWF0ZSBjcm9wcGVyIGVsZW1lbnRzXG4gICAgICAgIHZhciBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBURU1QTEFURTtcbiAgICAgICAgdmFyIGNyb3BwZXIgPSB0ZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChOQU1FU1BBQ0UsIFwiLWNvbnRhaW5lclwiKSk7XG4gICAgICAgIHZhciBjYW52YXMgPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItY2FudmFzXCIpKTtcbiAgICAgICAgdmFyIGRyYWdCb3ggPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItZHJhZy1ib3hcIikpO1xuICAgICAgICB2YXIgY3JvcEJveCA9IGNyb3BwZXIucXVlcnlTZWxlY3RvcihcIi5cIi5jb25jYXQoTkFNRVNQQUNFLCBcIi1jcm9wLWJveFwiKSk7XG4gICAgICAgIHZhciBmYWNlID0gY3JvcEJveC5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChOQU1FU1BBQ0UsIFwiLWZhY2VcIikpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5jcm9wcGVyID0gY3JvcHBlcjtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuZHJhZ0JveCA9IGRyYWdCb3g7XG4gICAgICAgIHRoaXMuY3JvcEJveCA9IGNyb3BCb3g7XG4gICAgICAgIHRoaXMudmlld0JveCA9IGNyb3BwZXIucXVlcnlTZWxlY3RvcihcIi5cIi5jb25jYXQoTkFNRVNQQUNFLCBcIi12aWV3LWJveFwiKSk7XG4gICAgICAgIHRoaXMuZmFjZSA9IGZhY2U7XG4gICAgICAgIGNhbnZhcy5hcHBlbmRDaGlsZChpbWFnZSk7XG5cbiAgICAgICAgLy8gSGlkZSB0aGUgb3JpZ2luYWwgaW1hZ2VcbiAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgQ0xBU1NfSElEREVOKTtcblxuICAgICAgICAvLyBJbnNlcnRzIHRoZSBjcm9wcGVyIGFmdGVyIHRvIHRoZSBjdXJyZW50IGltYWdlXG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoY3JvcHBlciwgZWxlbWVudC5uZXh0U2libGluZyk7XG5cbiAgICAgICAgLy8gU2hvdyB0aGUgaGlkZGVuIGltYWdlXG4gICAgICAgIHJlbW92ZUNsYXNzKGltYWdlLCBDTEFTU19ISURFKTtcbiAgICAgICAgdGhpcy5pbml0UHJldmlldygpO1xuICAgICAgICB0aGlzLmJpbmQoKTtcbiAgICAgICAgb3B0aW9ucy5pbml0aWFsQXNwZWN0UmF0aW8gPSBNYXRoLm1heCgwLCBvcHRpb25zLmluaXRpYWxBc3BlY3RSYXRpbykgfHwgTmFOO1xuICAgICAgICBvcHRpb25zLmFzcGVjdFJhdGlvID0gTWF0aC5tYXgoMCwgb3B0aW9ucy5hc3BlY3RSYXRpbykgfHwgTmFOO1xuICAgICAgICBvcHRpb25zLnZpZXdNb2RlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMywgTWF0aC5yb3VuZChvcHRpb25zLnZpZXdNb2RlKSkpIHx8IDA7XG4gICAgICAgIGFkZENsYXNzKGNyb3BCb3gsIENMQVNTX0hJRERFTik7XG4gICAgICAgIGlmICghb3B0aW9ucy5ndWlkZXMpIHtcbiAgICAgICAgICBhZGRDbGFzcyhjcm9wQm94LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJcIi5jb25jYXQoTkFNRVNQQUNFLCBcIi1kYXNoZWRcIikpLCBDTEFTU19ISURERU4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9ucy5jZW50ZXIpIHtcbiAgICAgICAgICBhZGRDbGFzcyhjcm9wQm94LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJcIi5jb25jYXQoTkFNRVNQQUNFLCBcIi1jZW50ZXJcIikpLCBDTEFTU19ISURERU4pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBhZGRDbGFzcyhjcm9wcGVyLCBcIlwiLmNvbmNhdChOQU1FU1BBQ0UsIFwiLWJnXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgYWRkQ2xhc3MoZmFjZSwgQ0xBU1NfSU5WSVNJQkxFKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5jcm9wQm94TW92YWJsZSkge1xuICAgICAgICAgIGFkZENsYXNzKGZhY2UsIENMQVNTX01PVkUpO1xuICAgICAgICAgIHNldERhdGEoZmFjZSwgREFUQV9BQ1RJT04sIEFDVElPTl9BTEwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9ucy5jcm9wQm94UmVzaXphYmxlKSB7XG4gICAgICAgICAgYWRkQ2xhc3MoY3JvcEJveC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItbGluZVwiKSksIENMQVNTX0hJRERFTik7XG4gICAgICAgICAgYWRkQ2xhc3MoY3JvcEJveC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiXCIuY29uY2F0KE5BTUVTUEFDRSwgXCItcG9pbnRcIikpLCBDTEFTU19ISURERU4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldERyYWdNb2RlKG9wdGlvbnMuZHJhZ01vZGUpO1xuICAgICAgICBpZiAob3B0aW9ucy5hdXRvQ3JvcCkge1xuICAgICAgICAgIHRoaXMuY3JvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YShvcHRpb25zLmRhdGEpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLnJlYWR5KSkge1xuICAgICAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX1JFQURZLCBvcHRpb25zLnJlYWR5LCB7XG4gICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2hFdmVudChlbGVtZW50LCBFVkVOVF9SRUFEWSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcInVuYnVpbGRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJ1aWxkKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVhZHkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuYmluZCgpO1xuICAgICAgICB0aGlzLnJlc2V0UHJldmlldygpO1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHRoaXMuY3JvcHBlci5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jcm9wcGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX0hJRERFTik7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcInVuY3JlYXRlXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdW5jcmVhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgdGhpcy51bmJ1aWxkKCk7XG4gICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY3JvcHBlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2l6aW5nKSB7XG4gICAgICAgICAgdGhpcy5zaXppbmdJbWFnZS5vbmxvYWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuc2l6aW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaXplZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVsb2FkaW5nKSB7XG4gICAgICAgICAgdGhpcy54aHIub25hYm9ydCA9IG51bGw7XG4gICAgICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgdGhlIG5vIGNvbmZsaWN0IGNyb3BwZXIgY2xhc3MuXG4gICAgICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gVGhlIGNyb3BwZXIgY2xhc3MuXG4gICAgICAgKi9cbiAgICB9XSwgW3tcbiAgICAgIGtleTogXCJub0NvbmZsaWN0XCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgd2luZG93LkNyb3BwZXIgPSBBbm90aGVyQ3JvcHBlcjtcbiAgICAgICAgcmV0dXJuIENyb3BwZXI7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hhbmdlIHRoZSBkZWZhdWx0IG9wdGlvbnMuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBuZXcgZGVmYXVsdCBvcHRpb25zLlxuICAgICAgICovXG4gICAgfSwge1xuICAgICAga2V5OiBcInNldERlZmF1bHRzXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0RGVmYXVsdHMob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24oREVGQVVMVFMsIGlzUGxhaW5PYmplY3Qob3B0aW9ucykgJiYgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfV0pO1xuICB9KCk7XG4gIGFzc2lnbihDcm9wcGVyLnByb3RvdHlwZSwgcmVuZGVyLCBwcmV2aWV3LCBldmVudHMsIGhhbmRsZXJzLCBjaGFuZ2UsIG1ldGhvZHMpO1xuXG4gIHJldHVybiBDcm9wcGVyO1xuXG59KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgZT1yZXF1aXJlKFwicmVhY3RcIikscj1yZXF1aXJlKFwiY3JvcHBlcmpzXCIpLG89ZnVuY3Rpb24oKXtyZXR1cm4gbz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihlKXtmb3IodmFyIHIsbz0xLHQ9YXJndW1lbnRzLmxlbmd0aDtvPHQ7bysrKWZvcih2YXIgbiBpbiByPWFyZ3VtZW50c1tvXSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocixuKSYmKGVbbl09cltuXSk7cmV0dXJuIGV9LG8uYXBwbHkodGhpcyxhcmd1bWVudHMpfTtmdW5jdGlvbiB0KGUscil7dmFyIG89e307Zm9yKHZhciB0IGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCkmJnIuaW5kZXhPZih0KTwwJiYob1t0XT1lW3RdKTtpZihudWxsIT1lJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKXt2YXIgbj0wO2Zvcih0PU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7bjx0Lmxlbmd0aDtuKyspci5pbmRleE9mKHRbbl0pPDAmJk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLHRbbl0pJiYob1t0W25dXT1lW3Rbbl1dKX1yZXR1cm4gb312YXIgbj1bXCJhc3BlY3RSYXRpb1wiLFwiYXV0b0Nyb3BcIixcImF1dG9Dcm9wQXJlYVwiLFwiYmFja2dyb3VuZFwiLFwiY2VudGVyXCIsXCJjaGVja0Nyb3NzT3JpZ2luXCIsXCJjaGVja09yaWVudGF0aW9uXCIsXCJjcm9wQm94TW92YWJsZVwiLFwiY3JvcEJveFJlc2l6YWJsZVwiLFwiZGF0YVwiLFwiZHJhZ01vZGVcIixcImd1aWRlc1wiLFwiaGlnaGxpZ2h0XCIsXCJpbml0aWFsQXNwZWN0UmF0aW9cIixcIm1pbkNhbnZhc0hlaWdodFwiLFwibWluQ2FudmFzV2lkdGhcIixcIm1pbkNvbnRhaW5lckhlaWdodFwiLFwibWluQ29udGFpbmVyV2lkdGhcIixcIm1pbkNyb3BCb3hIZWlnaHRcIixcIm1pbkNyb3BCb3hXaWR0aFwiLFwibW9kYWxcIixcIm1vdmFibGVcIixcInByZXZpZXdcIixcInJlc3BvbnNpdmVcIixcInJlc3RvcmVcIixcInJvdGF0YWJsZVwiLFwic2NhbGFibGVcIixcInRvZ2dsZURyYWdNb2RlT25EYmxjbGlja1wiLFwidmlld01vZGVcIixcIndoZWVsWm9vbVJhdGlvXCIsXCJ6b29tT25Ub3VjaFwiLFwiem9vbU9uV2hlZWxcIixcInpvb21hYmxlXCIsXCJjcm9wc3RhcnRcIixcImNyb3Btb3ZlXCIsXCJjcm9wZW5kXCIsXCJjcm9wXCIsXCJ6b29tXCIsXCJyZWFkeVwiXSxhPXtvcGFjaXR5OjAsbWF4V2lkdGg6XCIxMDAlXCJ9LGM9ZS5mb3J3YXJkUmVmKChmdW5jdGlvbihjLGkpe3ZhciBsPXQoYyxbXSkscz1sLmRyYWdNb2RlLHU9dm9pZCAwPT09cz9cImNyb3BcIjpzLHA9bC5zcmMsZD1sLnN0eWxlLGY9bC5jbGFzc05hbWUsdj1sLmNyb3NzT3JpZ2luLG09bC5zY2FsZVgsZz1sLnNjYWxlWSx5PWwuZW5hYmxlLGI9bC56b29tVG8saD1sLnJvdGF0ZVRvLE89bC5hbHQsVD12b2lkIDA9PT1PP1wicGljdHVyZVwiOk8sej1sLnJlYWR5LHg9bC5vbkluaXRpYWxpemVkLEM9dChsLFtcImRyYWdNb2RlXCIsXCJzcmNcIixcInN0eWxlXCIsXCJjbGFzc05hbWVcIixcImNyb3NzT3JpZ2luXCIsXCJzY2FsZVhcIixcInNjYWxlWVwiLFwiZW5hYmxlXCIsXCJ6b29tVG9cIixcInJvdGF0ZVRvXCIsXCJhbHRcIixcInJlYWR5XCIsXCJvbkluaXRpYWxpemVkXCJdKSx3PXtzY2FsZVk6ZyxzY2FsZVg6bSxlbmFibGU6eSx6b29tVG86Yixyb3RhdGVUbzpofSxqPWZ1bmN0aW9uKCl7Zm9yKHZhciByPVtdLG89MDtvPGFyZ3VtZW50cy5sZW5ndGg7bysrKXJbb109YXJndW1lbnRzW29dO3ZhciB0PWUudXNlUmVmKG51bGwpO3JldHVybiBlLnVzZUVmZmVjdCgoZnVuY3Rpb24oKXtyLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UmJihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2UodC5jdXJyZW50KTplLmN1cnJlbnQ9dC5jdXJyZW50KX0pKX0pLFtyXSksdH0oaSxlLnVzZVJlZihudWxsKSk7ZS51c2VFZmZlY3QoKGZ1bmN0aW9uKCl7dmFyIGU7KG51bGw9PT0oZT1qLmN1cnJlbnQpfHx2b2lkIDA9PT1lP3ZvaWQgMDplLmNyb3BwZXIpJiZcIm51bWJlclwiPT10eXBlb2YgYiYmai5jdXJyZW50LmNyb3BwZXIuem9vbVRvKGIpfSksW2wuem9vbVRvXSksZS51c2VFZmZlY3QoKGZ1bmN0aW9uKCl7dmFyIGU7KG51bGw9PT0oZT1qLmN1cnJlbnQpfHx2b2lkIDA9PT1lP3ZvaWQgMDplLmNyb3BwZXIpJiZ2b2lkIDAhPT1wJiZqLmN1cnJlbnQuY3JvcHBlci5yZXNldCgpLmNsZWFyKCkucmVwbGFjZShwKX0pLFtwXSksZS51c2VFZmZlY3QoKGZ1bmN0aW9uKCl7aWYobnVsbCE9PWouY3VycmVudCl7dmFyIGU9bmV3IHIoai5jdXJyZW50LG8obyh7ZHJhZ01vZGU6dX0sQykse3JlYWR5OmZ1bmN0aW9uKGUpe251bGwhPT1lLmN1cnJlbnRUYXJnZXQmJmZ1bmN0aW9uKGUscil7dm9pZCAwPT09ciYmKHI9e30pO3ZhciBvPXIuZW5hYmxlLHQ9dm9pZCAwPT09b3x8byxuPXIuc2NhbGVYLGE9dm9pZCAwPT09bj8xOm4sYz1yLnNjYWxlWSxpPXZvaWQgMD09PWM/MTpjLGw9ci56b29tVG8scz12b2lkIDA9PT1sPzA6bCx1PXIucm90YXRlVG87dD9lLmVuYWJsZSgpOmUuZGlzYWJsZSgpLGUuc2NhbGVYKGEpLGUuc2NhbGVZKGkpLHZvaWQgMCE9PXUmJmUucm90YXRlVG8odSkscz4wJiZlLnpvb21UbyhzKX0oZS5jdXJyZW50VGFyZ2V0LmNyb3BwZXIsdykseiYmeihlKX19KSk7eCYmeChlKX1yZXR1cm4gZnVuY3Rpb24oKXt2YXIgZSxyO251bGw9PT0ocj1udWxsPT09KGU9ai5jdXJyZW50KXx8dm9pZCAwPT09ZT92b2lkIDA6ZS5jcm9wcGVyKXx8dm9pZCAwPT09cnx8ci5kZXN0cm95KCl9fSksW2pdKTt2YXIgRT1mdW5jdGlvbihlKXtyZXR1cm4gbi5yZWR1Y2UoKGZ1bmN0aW9uKGUscil7dmFyIG89ZSxuPXI7cmV0dXJuIG9bbl0sdChvLFtcInN5bWJvbFwiPT10eXBlb2Ygbj9uOm4rXCJcIl0pfSksZSl9KG8obyh7fSxDKSx7Y3Jvc3NPcmlnaW46dixzcmM6cCxhbHQ6VH0pKTtyZXR1cm4gZS5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3N0eWxlOmQsY2xhc3NOYW1lOmZ9LGUuY3JlYXRlRWxlbWVudChcImltZ1wiLG8oe30sRSx7c3R5bGU6YSxyZWY6an0pKSl9KSk7ZXhwb3J0cy5Dcm9wcGVyPWMsZXhwb3J0cy5kZWZhdWx0PWM7XG4iLCIvKipcbiAqIEBsaWNlbnNlIFJlYWN0XG4gKiByZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIEFUVEVOVElPTlxuLy8gV2hlbiBhZGRpbmcgbmV3IHN5bWJvbHMgdG8gdGhpcyBmaWxlLFxuLy8gUGxlYXNlIGNvbnNpZGVyIGFsc28gYWRkaW5nIHRvICdyZWFjdC1kZXZ0b29scy1zaGFyZWQvc3JjL2JhY2tlbmQvUmVhY3RTeW1ib2xzJ1xuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpO1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJyk7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50Jyk7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJyk7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJyk7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJyk7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJyk7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubGF6eScpO1xudmFyIFJFQUNUX09GRlNDUkVFTl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Qub2Zmc2NyZWVuJyk7XG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIGlmIChtYXliZUl0ZXJhYmxlID09PSBudWxsIHx8IHR5cGVvZiBtYXliZUl0ZXJhYmxlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuXG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuXG5mdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAge1xuICAgIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZygnZXJyb3InLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICBmb3JtYXQgKz0gJyVzJztcbiAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuXG5cbiAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpdGVtKTtcbiAgICB9KTsgLy8gQ2FyZWZ1bDogUk4gY3VycmVudGx5IGRlcGVuZHMgb24gdGhpcyBwcmVmaXhcblxuICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpOyAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nXG5cbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlW2xldmVsXSwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBlbmFibGVTY29wZUFQSSA9IGZhbHNlOyAvLyBFeHBlcmltZW50YWwgQ3JlYXRlIEV2ZW50IEhhbmRsZSBBUEkuXG52YXIgZW5hYmxlQ2FjaGVFbGVtZW50ID0gZmFsc2U7XG52YXIgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgPSBmYWxzZTsgLy8gTm8ga25vd24gYnVncywgYnV0IG5lZWRzIHBlcmZvcm1hbmNlIHRlc3RpbmdcblxudmFyIGVuYWJsZUxlZ2FjeUhpZGRlbiA9IGZhbHNlOyAvLyBFbmFibGVzIHVuc3RhYmxlX2F2b2lkVGhpc0ZhbGxiYWNrIGZlYXR1cmUgaW4gRmliZXJcbi8vIHN0dWZmLiBJbnRlbmRlZCB0byBlbmFibGUgUmVhY3QgY29yZSBtZW1iZXJzIHRvIG1vcmUgZWFzaWx5IGRlYnVnIHNjaGVkdWxpbmdcbi8vIGlzc3VlcyBpbiBERVYgYnVpbGRzLlxuXG52YXIgZW5hYmxlRGVidWdUcmFjaW5nID0gZmFsc2U7IC8vIFRyYWNrIHdoaWNoIEZpYmVyKHMpIHNjaGVkdWxlIHJlbmRlciB3b3JrLlxuXG52YXIgUkVBQ1RfTU9EVUxFX1JFRkVSRU5DRTtcblxue1xuICBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFID0gU3ltYm9sLmZvcigncmVhY3QubW9kdWxlLnJlZmVyZW5jZScpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gTm90ZTogdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgKGUuZy4gaWYgaXQncyBhIHBvbHlmaWxsKS5cblxuXG4gIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgZW5hYmxlRGVidWdUcmFjaW5nICB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IGVuYWJsZUxlZ2FjeUhpZGRlbiAgfHwgdHlwZSA9PT0gUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgfHwgZW5hYmxlU2NvcGVBUEkgIHx8IGVuYWJsZUNhY2hlRWxlbWVudCAgfHwgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IC8vIFRoaXMgbmVlZHMgdG8gaW5jbHVkZSBhbGwgcG9zc2libGUgbW9kdWxlIHJlZmVyZW5jZSBvYmplY3RcbiAgICAvLyB0eXBlcyBzdXBwb3J0ZWQgYnkgYW55IEZsaWdodCBjb25maWd1cmF0aW9uIGFueXdoZXJlIHNpbmNlXG4gICAgLy8gd2UgZG9uJ3Qga25vdyB3aGljaCBGbGlnaHQgYnVpbGQgdGhpcyB3aWxsIGVuZCB1cCBiZWluZyB1c2VkXG4gICAgLy8gd2l0aC5cbiAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFIHx8IHR5cGUuZ2V0TW9kdWxlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRXcmFwcGVkTmFtZShvdXRlclR5cGUsIGlubmVyVHlwZSwgd3JhcHBlck5hbWUpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lO1xuXG4gIGlmIChkaXNwbGF5TmFtZSkge1xuICAgIHJldHVybiBkaXNwbGF5TmFtZTtcbiAgfVxuXG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyBcIihcIiArIGZ1bmN0aW9uTmFtZSArIFwiKVwiIDogd3JhcHBlck5hbWU7XG59IC8vIEtlZXAgaW4gc3luYyB3aXRoIHJlYWN0LXJlY29uY2lsZXIvZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlclxuXG5cbmZ1bmN0aW9uIGdldENvbnRleHROYW1lKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgJ0NvbnRleHQnO1xufSAvLyBOb3RlIHRoYXQgdGhlIHJlY29uY2lsZXIgcGFja2FnZSBzaG91bGQgZ2VuZXJhbGx5IHByZWZlciB0byB1c2UgZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlcigpIGluc3RlYWQuXG5cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIC8vIEhvc3Qgcm9vdCwgdGV4dCBub2RlIG9yIGp1c3QgaW52YWxpZCB0eXBlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBvYmplY3QgaW4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG5cbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcic7XG5cbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2VMaXN0JztcblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKGNvbnRleHQpICsgJy5Db25zdW1lcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgdmFyIHByb3ZpZGVyID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKHByb3ZpZGVyLl9jb250ZXh0KSArICcuUHJvdmlkZXInO1xuXG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHZhciBvdXRlck5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKG91dGVyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvdXRlck5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ01lbW8nO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoaW5pdChwYXlsb2FkKSk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1mYWxsdGhyb3VnaFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gSGVscGVycyB0byBwYXRjaCBjb25zb2xlLmxvZ3MgdG8gYXZvaWQgbG9nZ2luZyBkdXJpbmcgc2lkZS1lZmZlY3QgZnJlZVxuLy8gcmVwbGF5aW5nIG9uIHJlbmRlciBmdW5jdGlvbi4gVGhpcyBjdXJyZW50bHkgb25seSBwYXRjaGVzIHRoZSBvYmplY3Rcbi8vIGxhemlseSB3aGljaCB3b24ndCBjb3ZlciBpZiB0aGUgbG9nIGZ1bmN0aW9uIHdhcyBleHRyYWN0ZWQgZWFnZXJseS5cbi8vIFdlIGNvdWxkIGFsc28gZWFnZXJseSBwYXRjaCB0aGUgbWV0aG9kLlxudmFyIGRpc2FibGVkRGVwdGggPSAwO1xudmFyIHByZXZMb2c7XG52YXIgcHJldkluZm87XG52YXIgcHJldldhcm47XG52YXIgcHJldkVycm9yO1xudmFyIHByZXZHcm91cDtcbnZhciBwcmV2R3JvdXBDb2xsYXBzZWQ7XG52YXIgcHJldkdyb3VwRW5kO1xuXG5mdW5jdGlvbiBkaXNhYmxlZExvZygpIHt9XG5cbmRpc2FibGVkTG9nLl9fcmVhY3REaXNhYmxlZExvZyA9IHRydWU7XG5mdW5jdGlvbiBkaXNhYmxlTG9ncygpIHtcbiAge1xuICAgIGlmIChkaXNhYmxlZERlcHRoID09PSAwKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICAgIHByZXZMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgIHByZXZJbmZvID0gY29uc29sZS5pbmZvO1xuICAgICAgcHJldldhcm4gPSBjb25zb2xlLndhcm47XG4gICAgICBwcmV2RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuICAgICAgcHJldkdyb3VwID0gY29uc29sZS5ncm91cDtcbiAgICAgIHByZXZHcm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQ7XG4gICAgICBwcmV2R3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kOyAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzE5MDk5XG5cbiAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZGlzYWJsZWRMb2csXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgIGluZm86IHByb3BzLFxuICAgICAgICBsb2c6IHByb3BzLFxuICAgICAgICB3YXJuOiBwcm9wcyxcbiAgICAgICAgZXJyb3I6IHByb3BzLFxuICAgICAgICBncm91cDogcHJvcHMsXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBwcm9wcyxcbiAgICAgICAgZ3JvdXBFbmQ6IHByb3BzXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgZGlzYWJsZWREZXB0aCsrO1xuICB9XG59XG5mdW5jdGlvbiByZWVuYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBkaXNhYmxlZERlcHRoLS07XG5cbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWUgRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbnNvbGUsIHtcbiAgICAgICAgbG9nOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZMb2dcbiAgICAgICAgfSksXG4gICAgICAgIGluZm86IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkluZm9cbiAgICAgICAgfSksXG4gICAgICAgIHdhcm46IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldldhcm5cbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZFcnJvclxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXA6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cENvbGxhcHNlZDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBDb2xsYXBzZWRcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwRW5kOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cEVuZFxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZERlcHRoIDwgMCkge1xuICAgICAgZXJyb3IoJ2Rpc2FibGVkRGVwdGggZmVsbCBiZWxvdyB6ZXJvLiAnICsgJ1RoaXMgaXMgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudERpc3BhdGNoZXI7XG52YXIgcHJlZml4O1xuZnVuY3Rpb24gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lckZuKSB7XG4gIHtcbiAgICBpZiAocHJlZml4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEV4dHJhY3QgdGhlIFZNIHNwZWNpZmljIHByZWZpeCB1c2VkIGJ5IGVhY2ggbGluZS5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHguc3RhY2sudHJpbSgpLm1hdGNoKC9cXG4oICooYXQgKT8pLyk7XG4gICAgICAgIHByZWZpeCA9IG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xuICAgICAgfVxuICAgIH0gLy8gV2UgdXNlIHRoZSBwcmVmaXggdG8gZW5zdXJlIG91ciBzdGFja3MgbGluZSB1cCB3aXRoIG5hdGl2ZSBzdGFjayBmcmFtZXMuXG5cblxuICAgIHJldHVybiAnXFxuJyArIHByZWZpeCArIG5hbWU7XG4gIH1cbn1cbnZhciByZWVudHJ5ID0gZmFsc2U7XG52YXIgY29tcG9uZW50RnJhbWVDYWNoZTtcblxue1xuICB2YXIgUG9zc2libHlXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgPyBXZWFrTWFwIDogTWFwO1xuICBjb21wb25lbnRGcmFtZUNhY2hlID0gbmV3IFBvc3NpYmx5V2Vha01hcCgpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKGZuLCBjb25zdHJ1Y3QpIHtcbiAgLy8gSWYgc29tZXRoaW5nIGFza2VkIGZvciBhIHN0YWNrIGluc2lkZSBhIGZha2UgcmVuZGVyLCBpdCBzaG91bGQgZ2V0IGlnbm9yZWQuXG4gIGlmICggIWZuIHx8IHJlZW50cnkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB7XG4gICAgdmFyIGZyYW1lID0gY29tcG9uZW50RnJhbWVDYWNoZS5nZXQoZm4pO1xuXG4gICAgaWYgKGZyYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29udHJvbDtcbiAgcmVlbnRyeSA9IHRydWU7XG4gIHZhciBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7IC8vICRGbG93Rml4TWUgSXQgZG9lcyBhY2NlcHQgdW5kZWZpbmVkLlxuXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gdW5kZWZpbmVkO1xuICB2YXIgcHJldmlvdXNEaXNwYXRjaGVyO1xuXG4gIHtcbiAgICBwcmV2aW91c0Rpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQ7IC8vIFNldCB0aGUgZGlzcGF0Y2hlciBpbiBERVYgYmVjYXVzZSB0aGlzIG1pZ2h0IGJlIGNhbGwgaW4gdGhlIHJlbmRlciBmdW5jdGlvblxuICAgIC8vIGZvciB3YXJuaW5ncy5cblxuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IG51bGw7XG4gICAgZGlzYWJsZUxvZ3MoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBzaG91bGQgdGhyb3cuXG4gICAgaWYgKGNvbnN0cnVjdCkge1xuICAgICAgLy8gU29tZXRoaW5nIHNob3VsZCBiZSBzZXR0aW5nIHRoZSBwcm9wcyBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICB2YXIgRmFrZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH07IC8vICRGbG93Rml4TWVcblxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmFrZS5wcm90b3R5cGUsICdwcm9wcycsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gV2UgdXNlIGEgdGhyb3dpbmcgc2V0dGVyIGluc3RlYWQgb2YgZnJvemVuIG9yIG5vbi13cml0YWJsZSBwcm9wc1xuICAgICAgICAgIC8vIGJlY2F1c2UgdGhhdCB3b24ndCB0aHJvdyBpbiBhIG5vbi1zdHJpY3QgbW9kZSBmdW5jdGlvbi5cbiAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmNvbnN0cnVjdCkge1xuICAgICAgICAvLyBXZSBjb25zdHJ1Y3QgYSBkaWZmZXJlbnQgY29udHJvbCBmb3IgdGhpcyBjYXNlIHRvIGluY2x1ZGUgYW55IGV4dHJhXG4gICAgICAgIC8vIGZyYW1lcyBhZGRlZCBieSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoRmFrZSwgW10pO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgIH1cblxuICAgICAgICBSZWZsZWN0LmNvbnN0cnVjdChmbiwgW10sIEZha2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBGYWtlLmNhbGwoKTtcbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm4uY2FsbChGYWtlLnByb3RvdHlwZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgfVxuXG4gICAgICBmbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoc2FtcGxlKSB7XG4gICAgLy8gVGhpcyBpcyBpbmxpbmVkIG1hbnVhbGx5IGJlY2F1c2UgY2xvc3VyZSBkb2Vzbid0IGRvIGl0IGZvciB1cy5cbiAgICBpZiAoc2FtcGxlICYmIGNvbnRyb2wgJiYgdHlwZW9mIHNhbXBsZS5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgZXh0cmFjdHMgdGhlIGZpcnN0IGZyYW1lIGZyb20gdGhlIHNhbXBsZSB0aGF0IGlzbid0IGFsc28gaW4gdGhlIGNvbnRyb2wuXG4gICAgICAvLyBTa2lwcGluZyBvbmUgZnJhbWUgdGhhdCB3ZSBhc3N1bWUgaXMgdGhlIGZyYW1lIHRoYXQgY2FsbHMgdGhlIHR3by5cbiAgICAgIHZhciBzYW1wbGVMaW5lcyA9IHNhbXBsZS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgY29udHJvbExpbmVzID0gY29udHJvbC5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgcyA9IHNhbXBsZUxpbmVzLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgYyA9IGNvbnRyb2xMaW5lcy5sZW5ndGggLSAxO1xuXG4gICAgICB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCAmJiBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgIC8vIFdlIGV4cGVjdCBhdCBsZWFzdCBvbmUgc3RhY2sgZnJhbWUgdG8gYmUgc2hhcmVkLlxuICAgICAgICAvLyBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIHRoZSByb290IG1vc3Qgb25lLiBIb3dldmVyLCBzdGFjayBmcmFtZXMgbWF5IGJlXG4gICAgICAgIC8vIGN1dCBvZmYgZHVlIHRvIG1heGltdW0gc3RhY2sgbGltaXRzLiBJbiB0aGlzIGNhc2UsIG9uZSBtYXliZSBjdXQgb2ZmXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB0aGUgb3RoZXIuIFdlIGFzc3VtZSB0aGF0IHRoZSBzYW1wbGUgaXMgbG9uZ2VyIG9yIHRoZSBzYW1lXG4gICAgICAgIC8vIGFuZCB0aGVyZSBmb3IgY3V0IG9mZiBlYXJsaWVyLiBTbyB3ZSBzaG91bGQgZmluZCB0aGUgcm9vdCBtb3N0IGZyYW1lIGluXG4gICAgICAgIC8vIHRoZSBzYW1wbGUgc29tZXdoZXJlIGluIHRoZSBjb250cm9sLlxuICAgICAgICBjLS07XG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBzID49IDEgJiYgYyA+PSAwOyBzLS0sIGMtLSkge1xuICAgICAgICAvLyBOZXh0IHdlIGZpbmQgdGhlIGZpcnN0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHdoaWNoIHNob3VsZCBiZSB0aGVcbiAgICAgICAgLy8gZnJhbWUgdGhhdCBjYWxsZWQgb3VyIHNhbXBsZSBmdW5jdGlvbiBhbmQgdGhlIGNvbnRyb2wuXG4gICAgICAgIGlmIChzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgLy8gSW4gVjgsIHRoZSBmaXJzdCBsaW5lIGlzIGRlc2NyaWJpbmcgdGhlIG1lc3NhZ2UgYnV0IG90aGVyIFZNcyBkb24ndC5cbiAgICAgICAgICAvLyBJZiB3ZSdyZSBhYm91dCB0byByZXR1cm4gdGhlIGZpcnN0IGxpbmUsIGFuZCB0aGUgY29udHJvbCBpcyBhbHNvIG9uIHRoZSBzYW1lXG4gICAgICAgICAgLy8gbGluZSwgdGhhdCdzIGEgcHJldHR5IGdvb2QgaW5kaWNhdG9yIHRoYXQgb3VyIHNhbXBsZSB0aHJldyBhdCBzYW1lIGxpbmUgYXNcbiAgICAgICAgICAvLyB0aGUgY29udHJvbC4gSS5lLiBiZWZvcmUgd2UgZW50ZXJlZCB0aGUgc2FtcGxlIGZyYW1lLiBTbyB3ZSBpZ25vcmUgdGhpcyByZXN1bHQuXG4gICAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSBwYXNzZWQgYSBjbGFzcyB0byBmdW5jdGlvbiBjb21wb25lbnQsIG9yIG5vbi1mdW5jdGlvbi5cbiAgICAgICAgICBpZiAocyAhPT0gMSB8fCBjICE9PSAxKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHMtLTtcbiAgICAgICAgICAgICAgYy0tOyAvLyBXZSBtYXkgc3RpbGwgaGF2ZSBzaW1pbGFyIGludGVybWVkaWF0ZSBmcmFtZXMgZnJvbSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgICAgICAgIC8vIFRoZSBuZXh0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHNob3VsZCBiZSBvdXIgbWF0Y2ggdGhvdWdoLlxuXG4gICAgICAgICAgICAgIGlmIChjIDwgMCB8fCBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgICAgICAgLy8gVjggYWRkcyBhIFwibmV3XCIgcHJlZml4IGZvciBuYXRpdmUgY2xhc3Nlcy4gTGV0J3MgcmVtb3ZlIGl0IHRvIG1ha2UgaXQgcHJldHRpZXIuXG4gICAgICAgICAgICAgICAgdmFyIF9mcmFtZSA9ICdcXG4nICsgc2FtcGxlTGluZXNbc10ucmVwbGFjZSgnIGF0IG5ldyAnLCAnIGF0ICcpOyAvLyBJZiBvdXIgY29tcG9uZW50IGZyYW1lIGlzIGxhYmVsZWQgXCI8YW5vbnltb3VzPlwiXG4gICAgICAgICAgICAgICAgLy8gYnV0IHdlIGhhdmUgYSB1c2VyLXByb3ZpZGVkIFwiZGlzcGxheU5hbWVcIlxuICAgICAgICAgICAgICAgIC8vIHNwbGljZSBpdCBpbiB0byBtYWtlIHRoZSBzdGFjayBtb3JlIHJlYWRhYmxlLlxuXG5cbiAgICAgICAgICAgICAgICBpZiAoZm4uZGlzcGxheU5hbWUgJiYgX2ZyYW1lLmluY2x1ZGVzKCc8YW5vbnltb3VzPicpKSB7XG4gICAgICAgICAgICAgICAgICBfZnJhbWUgPSBfZnJhbWUucmVwbGFjZSgnPGFub255bW91cz4nLCBmbi5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgX2ZyYW1lKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIFJldHVybiB0aGUgbGluZSB3ZSBmb3VuZC5cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mcmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgcmVlbnRyeSA9IGZhbHNlO1xuXG4gICAge1xuICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50ID0gcHJldmlvdXNEaXNwYXRjaGVyO1xuICAgICAgcmVlbmFibGVMb2dzKCk7XG4gICAgfVxuXG4gICAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlO1xuICB9IC8vIEZhbGxiYWNrIHRvIGp1c3QgdXNpbmcgdGhlIG5hbWUgaWYgd2UgY291bGRuJ3QgbWFrZSBpdCB0aHJvdy5cblxuXG4gIHZhciBuYW1lID0gZm4gPyBmbi5kaXNwbGF5TmFtZSB8fCBmbi5uYW1lIDogJyc7XG4gIHZhciBzeW50aGV0aWNGcmFtZSA9IG5hbWUgPyBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lKSA6ICcnO1xuXG4gIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgc3ludGhldGljRnJhbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzeW50aGV0aWNGcmFtZTtcbn1cbmZ1bmN0aW9uIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZShmbiwgc291cmNlLCBvd25lckZuKSB7XG4gIHtcbiAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZShmbiwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpIHtcbiAgdmFyIHByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gIHJldHVybiAhIShwcm90b3R5cGUgJiYgcHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZSwgc291cmNlLCBvd25lckZuKSB7XG5cbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHtcbiAgICAgIHJldHVybiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKHR5cGUsIHNob3VsZENvbnN0cnVjdCh0eXBlKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSh0eXBlKTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSgnU3VzcGVuc2UnKTtcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKCdTdXNwZW5zZUxpc3QnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZSh0eXBlLnJlbmRlcik7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAvLyBNZW1vIG1heSBjb250YWluIGFueSBjb21wb25lbnQgdHlwZSBzbyB3ZSByZWN1cnNpdmVseSByZXNvbHZlIGl0LlxuICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKHR5cGUudHlwZSwgc291cmNlLCBvd25lckZuKTtcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IHR5cGU7XG4gICAgICAgICAgdmFyIHBheWxvYWQgPSBsYXp5Q29tcG9uZW50Ll9wYXlsb2FkO1xuICAgICAgICAgIHZhciBpbml0ID0gbGF6eUNvbXBvbmVudC5faW5pdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBMYXp5IG1heSBjb250YWluIGFueSBjb21wb25lbnQgdHlwZSBzbyB3ZSByZWN1cnNpdmVseSByZXNvbHZlIGl0LlxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihpbml0KHBheWxvYWQpLCBzb3VyY2UsIG93bmVyRm4pO1xuICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCkge1xuICB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuICAgICAgdmFyIHN0YWNrID0gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGVsZW1lbnQudHlwZSwgZWxlbWVudC5fc291cmNlLCBvd25lciA/IG93bmVyLnR5cGUgOiBudWxsKTtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCkge1xuICB7XG4gICAgLy8gJEZsb3dGaXhNZSBUaGlzIGlzIG9rYXkgYnV0IEZsb3cgZG9lc24ndCBrbm93IGl0LlxuICAgIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yJDEgPSB2b2lkIDA7IC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9wcm9kLWVycm9yLWNvZGVzXG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICsgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJyArICdUaGlzIG9mdGVuIGhhcHBlbnMgYmVjYXVzZSBvZiB0eXBvcyBzdWNoIGFzIGBQcm9wVHlwZXMuZnVuY3Rpb25gIGluc3RlYWQgb2YgYFByb3BUeXBlcy5mdW5jYC4nKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVycm9yJDEgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCcpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yJDEgPSBleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvciQxICYmICEoZXJyb3IkMSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgZXJyb3IoJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMnICsgJyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IkMSk7XG5cbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvciQxIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvciQxLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yJDEubWVzc2FnZV0gPSB0cnVlO1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgZXJyb3IoJ0ZhaWxlZCAlcyB0eXBlOiAlcycsIGxvY2F0aW9uLCBlcnJvciQxLm1lc3NhZ2UpO1xuXG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGlzQXJyYXlJbXBsID0gQXJyYXkuaXNBcnJheTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxuXG5mdW5jdGlvbiBpc0FycmF5KGEpIHtcbiAgcmV0dXJuIGlzQXJyYXlJbXBsKGEpO1xufVxuXG4vKlxuICogVGhlIGAnJyArIHZhbHVlYCBwYXR0ZXJuICh1c2VkIGluIGluIHBlcmYtc2Vuc2l0aXZlIGNvZGUpIHRocm93cyBmb3IgU3ltYm9sXG4gKiBhbmQgVGVtcG9yYWwuKiB0eXBlcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzIyMDY0LlxuICpcbiAqIFRoZSBmdW5jdGlvbnMgaW4gdGhpcyBtb2R1bGUgd2lsbCB0aHJvdyBhbiBlYXNpZXItdG8tdW5kZXJzdGFuZCxcbiAqIGVhc2llci10by1kZWJ1ZyBleGNlcHRpb24gd2l0aCBhIGNsZWFyIGVycm9ycyBtZXNzYWdlIG1lc3NhZ2UgZXhwbGFpbmluZyB0aGVcbiAqIHByb2JsZW0uIChJbnN0ZWFkIG9mIGEgY29uZnVzaW5nIGV4Y2VwdGlvbiB0aHJvd24gaW5zaWRlIHRoZSBpbXBsZW1lbnRhdGlvblxuICogb2YgdGhlIGB2YWx1ZWAgb2JqZWN0KS5cbiAqL1xuLy8gJEZsb3dGaXhNZSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cbmZ1bmN0aW9uIHR5cGVOYW1lKHZhbHVlKSB7XG4gIHtcbiAgICAvLyB0b1N0cmluZ1RhZyBpcyBuZWVkZWQgZm9yIG5hbWVzcGFjZWQgdHlwZXMgbGlrZSBUZW1wb3JhbC5JbnN0YW50XG4gICAgdmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wudG9TdHJpbmdUYWc7XG4gICAgdmFyIHR5cGUgPSBoYXNUb1N0cmluZ1RhZyAmJiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ09iamVjdCc7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbn0gLy8gJEZsb3dGaXhNZSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cblxuXG5mdW5jdGlvbiB3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkge1xuICB7XG4gICAgdHJ5IHtcbiAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICAvLyBJZiB5b3UgZW5kZWQgdXAgaGVyZSBieSBmb2xsb3dpbmcgYW4gZXhjZXB0aW9uIGNhbGwgc3RhY2ssIGhlcmUncyB3aGF0J3NcbiAgLy8gaGFwcGVuZWQ6IHlvdSBzdXBwbGllZCBhbiBvYmplY3Qgb3Igc3ltYm9sIHZhbHVlIHRvIFJlYWN0IChhcyBhIHByb3AsIGtleSxcbiAgLy8gRE9NIGF0dHJpYnV0ZSwgQ1NTIHByb3BlcnR5LCBzdHJpbmcgcmVmLCBldGMuKSBhbmQgd2hlbiBSZWFjdCB0cmllZCB0b1xuICAvLyBjb2VyY2UgaXQgdG8gYSBzdHJpbmcgdXNpbmcgYCcnICsgdmFsdWVgLCBhbiBleGNlcHRpb24gd2FzIHRocm93bi5cbiAgLy9cbiAgLy8gVGhlIG1vc3QgY29tbW9uIHR5cGVzIHRoYXQgd2lsbCBjYXVzZSB0aGlzIGV4Y2VwdGlvbiBhcmUgYFN5bWJvbGAgaW5zdGFuY2VzXG4gIC8vIGFuZCBUZW1wb3JhbCBvYmplY3RzIGxpa2UgYFRlbXBvcmFsLkluc3RhbnRgLiBCdXQgYW55IG9iamVjdCB0aGF0IGhhcyBhXG4gIC8vIGB2YWx1ZU9mYCBvciBgW1N5bWJvbC50b1ByaW1pdGl2ZV1gIG1ldGhvZCB0aGF0IHRocm93cyB3aWxsIGFsc28gY2F1c2UgdGhpc1xuICAvLyBleGNlcHRpb24uIChMaWJyYXJ5IGF1dGhvcnMgZG8gdGhpcyB0byBwcmV2ZW50IHVzZXJzIGZyb20gdXNpbmcgYnVpbHQtaW5cbiAgLy8gbnVtZXJpYyBvcGVyYXRvcnMgbGlrZSBgK2Agb3IgY29tcGFyaXNvbiBvcGVyYXRvcnMgbGlrZSBgPj1gIGJlY2F1c2UgY3VzdG9tXG4gIC8vIG1ldGhvZHMgYXJlIG5lZWRlZCB0byBwZXJmb3JtIGFjY3VyYXRlIGFyaXRobWV0aWMgb3IgY29tcGFyaXNvbi4pXG4gIC8vXG4gIC8vIFRvIGZpeCB0aGUgcHJvYmxlbSwgY29lcmNlIHRoaXMgb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZyBiZWZvcmVcbiAgLy8gcGFzc2luZyBpdCB0byBSZWFjdC4gVGhlIG1vc3QgcmVsaWFibGUgd2F5IGlzIHVzdWFsbHkgYFN0cmluZyh2YWx1ZSlgLlxuICAvL1xuICAvLyBUbyBmaW5kIHdoaWNoIHZhbHVlIGlzIHRocm93aW5nLCBjaGVjayB0aGUgYnJvd3NlciBvciBkZWJ1Z2dlciBjb25zb2xlLlxuICAvLyBCZWZvcmUgdGhpcyBleGNlcHRpb24gd2FzIHRocm93biwgdGhlcmUgc2hvdWxkIGJlIGBjb25zb2xlLmVycm9yYCBvdXRwdXRcbiAgLy8gdGhhdCBzaG93cyB0aGUgdHlwZSAoU3ltYm9sLCBUZW1wb3JhbC5QbGFpbkRhdGUsIGV0Yy4pIHRoYXQgY2F1c2VkIHRoZVxuICAvLyBwcm9ibGVtIGFuZCBob3cgdGhhdCB0eXBlIHdhcyB1c2VkOiBrZXksIGF0cnJpYnV0ZSwgaW5wdXQgdmFsdWUgcHJvcCwgZXRjLlxuICAvLyBJbiBtb3N0IGNhc2VzLCB0aGlzIGNvbnNvbGUgb3V0cHV0IGFsc28gc2hvd3MgdGhlIGNvbXBvbmVudCBhbmQgaXRzXG4gIC8vIGFuY2VzdG9yIGNvbXBvbmVudHMgd2hlcmUgdGhlIGV4Y2VwdGlvbiBoYXBwZW5lZC5cbiAgLy9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG4gIHJldHVybiAnJyArIHZhbHVlO1xufVxuZnVuY3Rpb24gY2hlY2tLZXlTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICB7XG4gICAgaWYgKHdpbGxDb2VyY2lvblRocm93KHZhbHVlKSkge1xuICAgICAgZXJyb3IoJ1RoZSBwcm92aWRlZCBrZXkgaXMgYW4gdW5zdXBwb3J0ZWQgdHlwZSAlcy4nICsgJyBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgYmVmb3JlIHVzaW5nIGl0IGhlcmUuJywgdHlwZU5hbWUodmFsdWUpKTtcblxuICAgICAgcmV0dXJuIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7IC8vIHRocm93ICh0byBoZWxwIGNhbGxlcnMgZmluZCB0cm91Ymxlc2hvb3RpbmcgY29tbWVudHMpXG4gICAgfVxuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudE93bmVyO1xudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bjtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcbnZhciBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzO1xuXG57XG4gIGRpZFdhcm5BYm91dFN0cmluZ1JlZnMgPSB7fTtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgc2VsZikge1xuICB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcucmVmID09PSAnc3RyaW5nJyAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIHNlbGYgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5zdGF0ZU5vZGUgIT09IHNlbGYpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgIGlmICghZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSkge1xuICAgICAgICBlcnJvcignQ29tcG9uZW50IFwiJXNcIiBjb250YWlucyB0aGUgc3RyaW5nIHJlZiBcIiVzXCIuICcgKyAnU3VwcG9ydCBmb3Igc3RyaW5nIHJlZnMgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIG1ham9yIHJlbGVhc2UuICcgKyAnVGhpcyBjYXNlIGNhbm5vdCBiZSBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCB0byBhbiBhcnJvdyBmdW5jdGlvbi4gJyArICdXZSBhc2sgeW91IHRvIG1hbnVhbGx5IGZpeCB0aGlzIGNhc2UgYnkgdXNpbmcgdXNlUmVmKCkgb3IgY3JlYXRlUmVmKCkgaW5zdGVhZC4gJyArICdMZWFybiBtb3JlIGFib3V0IHVzaW5nIHJlZnMgc2FmZWx5IGhlcmU6ICcgKyAnaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3N0cmljdC1tb2RlLXN0cmluZy1yZWYnLCBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKSwgY29uZmlnLnJlZik7XG5cbiAgICAgICAgZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCBub3Qgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG5cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTsgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTsgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzZWxmXG4gICAgfSk7IC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc291cmNlXG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZmNzL3B1bGwvMTA3XG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5cbmZ1bmN0aW9uIGpzeERFVih0eXBlLCBjb25maWcsIG1heWJlS2V5LCBzb3VyY2UsIHNlbGYpIHtcbiAge1xuICAgIHZhciBwcm9wTmFtZTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG4gICAgdmFyIHByb3BzID0ge307XG4gICAgdmFyIGtleSA9IG51bGw7XG4gICAgdmFyIHJlZiA9IG51bGw7IC8vIEN1cnJlbnRseSwga2V5IGNhbiBiZSBzcHJlYWQgaW4gYXMgYSBwcm9wLiBUaGlzIGNhdXNlcyBhIHBvdGVudGlhbFxuICAgIC8vIGlzc3VlIGlmIGtleSBpcyBhbHNvIGV4cGxpY2l0bHkgZGVjbGFyZWQgKGllLiA8ZGl2IHsuLi5wcm9wc30ga2V5PVwiSGlcIiAvPlxuICAgIC8vIG9yIDxkaXYga2V5PVwiSGlcIiB7Li4ucHJvcHN9IC8+ICkuIFdlIHdhbnQgdG8gZGVwcmVjYXRlIGtleSBzcHJlYWQsXG4gICAgLy8gYnV0IGFzIGFuIGludGVybWVkaWFyeSBzdGVwLCB3ZSB3aWxsIHVzZSBqc3hERVYgZm9yIGV2ZXJ5dGhpbmcgZXhjZXB0XG4gICAgLy8gPGRpdiB7Li4ucHJvcHN9IGtleT1cIkhpXCIgLz4sIGJlY2F1c2Ugd2UgYXJlbid0IGN1cnJlbnRseSBhYmxlIHRvIHRlbGwgaWZcbiAgICAvLyBrZXkgaXMgZXhwbGljaXRseSBkZWNsYXJlZCB0byBiZSB1bmRlZmluZWQgb3Igbm90LlxuXG4gICAgaWYgKG1heWJlS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihtYXliZUtleSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9ICcnICsgbWF5YmVLZXk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjb25maWcua2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgc2VsZik7XG4gICAgfSAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG5cblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcblxuICAgICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZikge1xuICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50T3duZXI7XG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShlbGVtZW50KSB7XG4gIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICB2YXIgc3RhY2sgPSBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoZWxlbWVudC50eXBlLCBlbGVtZW50Ll9zb3VyY2UsIG93bmVyID8gb3duZXIudHlwZSA6IG51bGwpO1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLnNldEV4dHJhU3RhY2tGcmFtZShzdGFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bjtcblxue1xuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xufVxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBAZmluYWxcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIHtcbiAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIkMS5jdXJyZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lciQxLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oc291cmNlKSB7XG4gIHtcbiAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB5b3VyIGNvZGUgYXQgJyArIGZpbGVOYW1lICsgJzonICsgbGluZU51bWJlciArICcuJztcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG5cblxudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAge1xuICAgIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuXG4gICAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgICBpbmZvID0gXCJcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDxcIiArIHBhcmVudE5hbWUgKyBcIj4uXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZm87XG4gIH1cbn1cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAge1xuICAgIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcblxuICAgIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlOyAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAgIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG5cbiAgICB2YXIgY2hpbGRPd25lciA9ICcnO1xuXG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyJDEuY3VycmVudCkge1xuICAgICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgICBjaGlsZE93bmVyID0gXCIgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gXCIgKyBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoZWxlbWVudC5fb3duZXIudHlwZSkgKyBcIi5cIjtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpO1xuXG4gICAgZXJyb3IoJ0VhY2ggY2hpbGQgaW4gYSBsaXN0IHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay93YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICB9XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAge1xuICAgIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShub2RlKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG5cbiAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgICAvLyBidXQgbm93IHdlIHByaW50IGEgc2VwYXJhdGUgd2FybmluZyBmb3IgdGhlbSBsYXRlci5cbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcblxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAge1xuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwcm9wVHlwZXM7XG5cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IC8vIE5vdGU6IE1lbW8gb25seSBjaGVja3Mgb3V0ZXIgcHJvcHMgaGVyZS5cbiAgICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUpKSB7XG4gICAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wVHlwZXMpIHtcbiAgICAgIC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcbiAgICAgIGNoZWNrUHJvcFR5cGVzKHByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUuUHJvcFR5cGVzICE9PSB1bmRlZmluZWQgJiYgIXByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duKSB7XG4gICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7IC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG5cbiAgICAgIHZhciBfbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcblxuICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIF9uYW1lIHx8ICdVbmtub3duJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJyAmJiAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQpIHtcbiAgICAgIGVycm9yKCdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJyk7XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZnJhZ21lbnQpO1xuXG4gICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGZyYWdtZW50KTtcblxuICAgICAgZXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJyk7XG5cbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBkaWRXYXJuQWJvdXRLZXlTcHJlYWQgPSB7fTtcbmZ1bmN0aW9uIGpzeFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBrZXksIGlzU3RhdGljQ2hpbGRyZW4sIHNvdXJjZSwgc2VsZikge1xuICB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKTsgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIHZhciBpbmZvID0gJyc7XG5cbiAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oc291cmNlKTtcblxuICAgICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGVTdHJpbmc7XG5cbiAgICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9ICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9IFwiPFwiICsgKGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlLnR5cGUpIHx8ICdVbmtub3duJykgKyBcIiAvPlwiO1xuICAgICAgICBpbmZvID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBpbnN0ZWFkIG9mIGEgY29tcG9uZW50Pyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlU3RyaW5nID0gdHlwZW9mIHR5cGU7XG4gICAgICB9XG5cbiAgICAgIGVycm9yKCdSZWFjdC5qc3g6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZVN0cmluZywgaW5mbyk7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBqc3hERVYodHlwZSwgcHJvcHMsIGtleSwgc291cmNlLCBzZWxmKTsgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcblxuXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG5cbiAgICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpc1N0YXRpY0NoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGNoaWxkcmVuW2ldLCB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdSZWFjdC5qc3g6IFN0YXRpYyBjaGlsZHJlbiBzaG91bGQgYWx3YXlzIGJlIGFuIGFycmF5LiAnICsgJ1lvdSBhcmUgbGlrZWx5IGV4cGxpY2l0bHkgY2FsbGluZyBSZWFjdC5qc3hzIG9yIFJlYWN0LmpzeERFVi4gJyArICdVc2UgdGhlIEJhYmVsIHRyYW5zZm9ybSBpbnN0ZWFkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhjaGlsZHJlbiwgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywgJ2tleScpKSB7XG4gICAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICByZXR1cm4gayAhPT0gJ2tleSc7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgYmVmb3JlRXhhbXBsZSA9IGtleXMubGVuZ3RoID4gMCA/ICd7a2V5OiBzb21lS2V5LCAnICsga2V5cy5qb2luKCc6IC4uLiwgJykgKyAnOiAuLi59JyA6ICd7a2V5OiBzb21lS2V5fSc7XG5cbiAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY29tcG9uZW50TmFtZSArIGJlZm9yZUV4YW1wbGVdKSB7XG4gICAgICAgICAgdmFyIGFmdGVyRXhhbXBsZSA9IGtleXMubGVuZ3RoID4gMCA/ICd7JyArIGtleXMuam9pbignOiAuLi4sICcpICsgJzogLi4ufScgOiAne30nO1xuXG4gICAgICAgICAgZXJyb3IoJ0EgcHJvcHMgb2JqZWN0IGNvbnRhaW5pbmcgYSBcImtleVwiIHByb3AgaXMgYmVpbmcgc3ByZWFkIGludG8gSlNYOlxcbicgKyAnICBsZXQgcHJvcHMgPSAlcztcXG4nICsgJyAgPCVzIHsuLi5wcm9wc30gLz5cXG4nICsgJ1JlYWN0IGtleXMgbXVzdCBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gSlNYIHdpdGhvdXQgdXNpbmcgc3ByZWFkOlxcbicgKyAnICBsZXQgcHJvcHMgPSAlcztcXG4nICsgJyAgPCVzIGtleT17c29tZUtleX0gey4uLnByb3BzfSAvPicsIGJlZm9yZUV4YW1wbGUsIGNvbXBvbmVudE5hbWUsIGFmdGVyRXhhbXBsZSwgY29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgICBkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY29tcG9uZW50TmFtZSArIGJlZm9yZUV4YW1wbGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59IC8vIFRoZXNlIHR3byBmdW5jdGlvbnMgZXhpc3QgdG8gc3RpbGwgZ2V0IGNoaWxkIHdhcm5pbmdzIGluIGRldlxuLy8gZXZlbiB3aXRoIHRoZSBwcm9kIHRyYW5zZm9ybS4gVGhpcyBtZWFucyB0aGF0IGpzeERFViBpcyBwdXJlbHlcbi8vIG9wdC1pbiBiZWhhdmlvciBmb3IgYmV0dGVyIG1lc3NhZ2VzIGJ1dCB0aGF0IHdlIHdvbid0IHN0b3Bcbi8vIGdpdmluZyB5b3Ugd2FybmluZ3MgaWYgeW91IHVzZSBwcm9kdWN0aW9uIGFwaXMuXG5cbmZ1bmN0aW9uIGpzeFdpdGhWYWxpZGF0aW9uU3RhdGljKHR5cGUsIHByb3BzLCBrZXkpIHtcbiAge1xuICAgIHJldHVybiBqc3hXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywga2V5LCB0cnVlKTtcbiAgfVxufVxuZnVuY3Rpb24ganN4V2l0aFZhbGlkYXRpb25EeW5hbWljKHR5cGUsIHByb3BzLCBrZXkpIHtcbiAge1xuICAgIHJldHVybiBqc3hXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywga2V5LCBmYWxzZSk7XG4gIH1cbn1cblxudmFyIGpzeCA9ICBqc3hXaXRoVmFsaWRhdGlvbkR5bmFtaWMgOyAvLyB3ZSBtYXkgd2FudCB0byBzcGVjaWFsIGNhc2UganN4cyBpbnRlcm5hbGx5IHRvIHRha2UgYWR2YW50YWdlIG9mIHN0YXRpYyBjaGlsZHJlbi5cbi8vIGZvciBub3cgd2UgY2FuIHNoaXAgaWRlbnRpY2FsIHByb2QgZnVuY3Rpb25zXG5cbnZhciBqc3hzID0gIGpzeFdpdGhWYWxpZGF0aW9uU3RhdGljIDtcblxuZXhwb3J0cy5GcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG5leHBvcnRzLmpzeCA9IGpzeDtcbmV4cG9ydHMuanN4cyA9IGpzeHM7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX2Rlc2lnblN5c3RlbSA9IHJlcXVpcmUoXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCIpO1xudmFyIF9heGlvcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImF4aW9zXCIpKTtcbnZhciBfcmVhY3RDcm9wcGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3QtY3JvcHBlclwiKSk7XG52YXIgX2pzeFJ1bnRpbWUgPSByZXF1aXJlKFwicmVhY3QvanN4LXJ1bnRpbWVcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoZSkgeyBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiBXZWFrTWFwKSByZXR1cm4gbnVsbDsgdmFyIHIgPSBuZXcgV2Vha01hcCgpLCB0ID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSA/IHQgOiByOyB9KShlKTsgfVxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoZSwgcikgeyBpZiAoIXIgJiYgZSAmJiBlLl9fZXNNb2R1bGUpIHJldHVybiBlOyBpZiAobnVsbCA9PT0gZSB8fCBcIm9iamVjdFwiICE9IHR5cGVvZiBlICYmIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgZSkgcmV0dXJuIHsgZGVmYXVsdDogZSB9OyB2YXIgdCA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShyKTsgaWYgKHQgJiYgdC5oYXMoZSkpIHJldHVybiB0LmdldChlKTsgdmFyIG4gPSB7IF9fcHJvdG9fXzogbnVsbCB9LCBhID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIHUgaW4gZSkgaWYgKFwiZGVmYXVsdFwiICE9PSB1ICYmIHt9Lmhhc093blByb3BlcnR5LmNhbGwoZSwgdSkpIHsgdmFyIGkgPSBhID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCB1KSA6IG51bGw7IGkgJiYgKGkuZ2V0IHx8IGkuc2V0KSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLCB1LCBpKSA6IG5bdV0gPSBlW3VdOyB9IHJldHVybiBuLmRlZmF1bHQgPSBlLCB0ICYmIHQuc2V0KGUsIG4pLCBuOyB9XG4vLyDQndC1INC40LzQv9C+0YDRgtC40YDRg9C10LwgQ1NTINC30LTQtdGB0YxcblxuLy8gLS0tINCa0L7Qv9C40YDRg9C10Lwg0YHQvtC00LXRgNC20LjQvNC+0LUg0YTQsNC50LvQsCBjcm9wcGVyLm1pbi5jc3Mg0YHRjtC00LAsINCyINCy0LjQtNC1INGB0YLRgNC+0LrQuCAtLS1cbmNvbnN0IENST1BQRVJfQ1NTID0gYFxuLmNyb3BwZXItY29udGFpbmVye2ZvbnQtc2l6ZTowO2xpbmUtaGVpZ2h0OjA7cG9zaXRpb246cmVsYXRpdmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2RpcmVjdGlvbjpsdHI7dG91Y2gtYWN0aW9uOm5vbmV9LmNyb3BwZXItY29udGFpbmVyIGltZ3tkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7bWluLXdpZHRoOjAhaW1wb3J0YW50O2hlaWdodDoxMDAlO21pbi1oZWlnaHQ6MCFpbXBvcnRhbnQ7bWF4LXdpZHRoOm5vbmUhaW1wb3J0YW50O21heC1oZWlnaHQ6bm9uZSFpbXBvcnRhbnQ7aW1hZ2Utb3JpZW50YXRpb246MGRlZ30uY3JvcHBlci13cmFwLWJveCwuY3JvcHBlci1jYW52YXMsLmNyb3BwZXItZHJhZy1ib3gsLmNyb3BwZXItY3JvcC1ib3gsLmNyb3BwZXItbW9kYWx7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjB9LmNyb3BwZXItd3JhcC1ib3h7b3ZlcmZsb3c6aGlkZGVufS5jcm9wcGVyLWRyYWctYm94e2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5OjB9LmNyb3BwZXItbW9kYWx7YmFja2dyb3VuZC1jb2xvcjojMDAwO29wYWNpdHk6LjV9LmNyb3BwZXItdmlldy1ib3h7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO291dGxpbmU6MXB4IHNvbGlkICMzOWY7b3V0bGluZS1jb2xvcjpyZ2JhKDUxLDE1MywyNTUsLjc1KTtvdmVyZmxvdzpoaWRkZW59LmNyb3BwZXItZGFzaGVke3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjAgZGFzaGVkICNlZWU7b3BhY2l0eTouNX0uY3JvcHBlci1kYXNoZWQuZGFzaGVkLWh7dG9wOjMzLjMzMzMzJTtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MzMuMzMzMzMlO2JvcmRlci10b3Atd2lkdGg6MXB4O2JvcmRlci1ib3R0b20td2lkdGg6MXB4fS5jcm9wcGVyLWRhc2hlZC5kYXNoZWQtdnt0b3A6MDtsZWZ0OjMzLjMzMzMzJTt3aWR0aDozMy4zMzMzMyU7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweDtib3JkZXItbGVmdC13aWR0aDoxcHh9LmNyb3BwZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7ZGlzcGxheTpibG9jazt3aWR0aDowO2hlaWdodDowO29wYWNpdHk6Ljc1fS5jcm9wcGVyLWNlbnRlcjpiZWZvcmUsLmNyb3BwZXItY2VudGVyOmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojZWVlO2NvbnRlbnQ6JyAnfS5jcm9wcGVyLWNlbnRlcjpiZWZvcmV7dG9wOjA7bGVmdDotM3B4O3dpZHRoOjdweDtoZWlnaHQ6MXB4fS5jcm9wcGVyLWNlbnRlcjphZnRlcnt0b3A6LTNweDtsZWZ0OjA7d2lkdGg6MXB4O2hlaWdodDo3cHh9LmNyb3BwZXItZmFjZSwuY3JvcHBlci1saW5lLC5jcm9wcGVyLXBvaW50e3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvcGFjaXR5Oi4xfS5jcm9wcGVyLWZhY2V7dG9wOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjdXJzb3I6bW92ZX0uY3JvcHBlci1saW5le2JhY2tncm91bmQtY29sb3I6IzM5Zn0uY3JvcHBlci1saW5lLmxpbmUtZXt0b3A6MDtyaWdodDotM3B4O3dpZHRoOjVweDtjdXJzb3I6ZS1yZXNpemV9LmNyb3BwZXItbGluZS5saW5lLW57dG9wOi0zcHg7bGVmdDowO2hlaWdodDo1cHg7Y3Vyc29yOm4tcmVzaXplfS5jcm9wcGVyLWxpbmUubGluZS13e3RvcDowO2xlZnQ6LTNweDt3aWR0aDo1cHg7Y3Vyc29yOnctcmVzaXplfS5jcm9wcGVyLWxpbmUubGluZS1ze2JvdHRvbTotM3B4O2xlZnQ6MDtoZWlnaHQ6NXB4O2N1cnNvcjpzLXJlc2l6ZX0uY3JvcHBlci1wb2ludHt3aWR0aDo1cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOiMzOWY7b3BhY2l0eTouNzV9LmNyb3BwZXItcG9pbnQucG9pbnQtZXt0b3A6NTAlO3JpZ2h0Oi0zcHg7bWFyZ2luLXRvcDotM3B4O2N1cnNvcjplLXJlc2l6ZX0uY3JvcHBlci1wb2ludC5wb2ludC1ue3RvcDotM3B4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zcHg7Y3Vyc29yOm4tcmVzaXplfS5jcm9wcGVyLXBvaW50LnBvaW50LXd7dG9wOjUwJTtsZWZ0Oi0zcHg7bWFyZ2luLXRvcDotM3B4O2N1cnNvcjp3LXJlc2l6ZX0uY3JvcHBlci1wb2ludC5wb2ludC1ze2JvdHRvbTotM3B4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zcHg7Y3Vyc29yOnMtcmVzaXplfS5jcm9wcGVyLXBvaW50LnBvaW50LW5le3RvcDotM3B4O3JpZ2h0Oi0zcHg7Y3Vyc29yOm5lLXJlc2l6ZX0uY3JvcHBlci1wb2ludC5wb2ludC1ud3t0b3A6LTNweDtsZWZ0Oi0zcHg7Y3Vyc29yOm53LXJlc2l6ZX0uY3JvcHBlci1wb2ludC5wb2ludC1zd3tib3R0b206LTNweDtsZWZ0Oi0zcHg7Y3Vyc29yOnN3LXJlc2l6ZX0uY3JvcHBlci1wb2ludC5wb2ludC1zZXtib3R0b206LTNweDtyaWdodDotM3B4O2N1cnNvcjpzZS1yZXNpemV9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5jcm9wcGVyLXBvaW50LnBvaW50LWUsLmNyb3BwZXItcG9pbnQucG9pbnQtd3ttYXJnaW4tdG9wOi00cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbiwuY3JvcHBlci1wb2ludC5wb2ludC1ze21hcmdpbi1sZWZ0Oi00cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbmUsLmNyb3BwZXItcG9pbnQucG9pbnQtbncsLmNyb3BwZXItcG9pbnQucG9pbnQtc2UsLmNyb3BwZXItcG9pbnQucG9pbnQtc3d7d2lkdGg6N3B4O2hlaWdodDo3cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtc2V7Ym90dG9tOi00cHg7cmlnaHQ6LTRweH19QG1lZGlhIChtaW4td2lkdGg6OTkycHgpey5jcm9wcGVyLXBvaW50LnBvaW50LXNle2JvdHRvbTotNXB4O3JpZ2h0Oi01cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtZSwuY3JvcHBlci1wb2ludC5wb2ludC13e21hcmdpbi10b3A6LTVweH0uY3JvcHBlci1wb2ludC5wb2ludC1uLC5jcm9wcGVyLXBvaW50LnBvaW50LXN7bWFyZ2luLWxlZnQ6LTVweH0uY3JvcHBlci1wb2ludC5wb2ludC1uZSwuY3JvcHBlci1wb2ludC5wb2ludC1udywuY3JvcHBlci1wb2ludC5wb2ludC1zZSwuY3JvcHBlci1wb2ludC5wb2ludC1zd3t3aWR0aDo5cHg7aGVpZ2h0OjlweH19QG1lZGlhIChtaW4td2lkdGg6MTIwMHB4KXsuY3JvcHBlci1wb2ludC5wb2ludC1zZXtib3R0b206LTZweDtyaWdodDotNnB4fS5jcm9wcGVyLXBvaW50LnBvaW50LWUsLmNyb3BwZXItcG9pbnQucG9pbnQtd3ttYXJnaW4tdG9wOi02cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbiwuY3JvcHBlci1wb2ludC5wb2ludC1ze21hcmdpbi1sZWZ0Oi02cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbmUsLmNyb3BwZXItcG9pbnQucG9pbnQtbncsLmNyb3BwZXItcG9pbnQucG9pbnQtc2UsLmNyb3BwZXItcG9pbnQucG9pbnQtc3d7d2lkdGg6MTFweDtoZWlnaHQ6MTFweH19LmNyb3BwZXItY3JvcC1ib3h7Y3Vyc29yOm1vdmV9LmNyb3BwZXItY3JvcC1ib3guY3JvcHBlci1tb2RhbHtvcGFjaXR5Oi41fS5jcm9wcGVyLWhpZGRlbntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5jcm9wcGVyLWhpZGV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jazt3aWR0aDowO2hlaWdodDowfS5jcm9wcGVyLWludmlzaWJsZXtvcGFjaXR5OjB9LmNyb3BwZXItYmd7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUFRTUFBQUFsUFcwaUFBQUFBM05DU1ZRSUNBamI0VS9nQUFBQUJsQk1WRVhNek16Ly8vL1RqUlYyQUFBQUNYQklXWE1BQUFyckFBQUs2d0dDaXcxcEFBQUFISFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JHYVhKbGQyOXlhM01nUTFNMjZMeXlqQUFBQUJGSlJFRlVDSmxqK00vQWdCVmhGLzBQQUg2L0QvSGtEeE9HQUFBQUFFbEZUa1N1UW1DQycpfS5jcm9wcGVyLW1vdmV7Y3Vyc29yOm1vdmV9LmNyb3BwZXItY3JvcHtjdXJzb3I6Y3Jvc3NoYWlyfS5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLWRyYWctYm94LC5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLWZhY2UsLmNyb3BwZXItZGlzYWJsZWQgLmNyb3BwZXItbGluZSwuY3JvcHBlci1kaXNhYmxlZCAuY3JvcHBlci1wb2ludHtjdXJzb3I6bm90LWFsbG93ZWR9XG5gO1xuY29uc3QgVXBsb2FkSW1hZ2VJbnB1dCA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIHByb3BlcnR5LFxuICAgIHJlY29yZCxcbiAgICBvbkNoYW5nZVxuICB9ID0gcHJvcHM7XG5cbiAgLy8gLS0tINCb0L7Qs9C40LrQsCDQstC90LXQtNGA0LXQvdC40Y8gQ1NTIC0tLVxuICAoMCwgX3JlYWN0LnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlSWQgPSAnY3JvcHBlci1zdHlsZXMnO1xuICAgIC8vINCf0YDQvtCy0LXRgNGP0LXQvCwg0L3QtSDQsdGL0LvQuCDQu9C4INGB0YLQuNC70Lgg0YPQttC1INC00L7QsdCw0LLQu9C10L3Ri1xuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGVJZCkpIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlLmlkID0gc3R5bGVJZDtcbiAgICAgIHN0eWxlLmlubmVySFRNTCA9IENST1BQRVJfQ1NTO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9LCBbXSk7IC8vINCf0YPRgdGC0L7QuSDQvNCw0YHRgdC40LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQtdC5INC+0LfQvdCw0YfQsNC10YIsINGH0YLQviDRjdGE0YTQtdC60YIg0LLRi9C/0L7Qu9C90LjRgtGB0Y8g0L7QtNC40L0g0YDQsNC3INC/0YDQuCDQvNC+0L3RgtC40YDQvtCy0LDQvdC40Lgg0LrQvtC80L/QvtC90LXQvdGC0LBcblxuICBjb25zdCBjdXJyZW50SW1hZ2VVcmwgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5LnBhdGhdIHx8ICcnO1xuICBjb25zdCBbaW1hZ2VVcmwsIHNldEltYWdlVXJsXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKGN1cnJlbnRJbWFnZVVybCk7XG4gIGNvbnN0IFtpbWFnZVRvQ3JvcCwgc2V0SW1hZ2VUb0Nyb3BdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkobnVsbCk7XG4gIGNvbnN0IFtpc1VwbG9hZGluZywgc2V0SXNVcGxvYWRpbmddID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKG51bGwpO1xuICBjb25zdCBjcm9wcGVyUmVmID0gKDAsIF9yZWFjdC51c2VSZWYpKG51bGwpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSAoMCwgX3JlYWN0LnVzZVJlZikobnVsbCk7XG4gIGNvbnN0IGhhbmRsZVNlbGVjdEltYWdlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBmaWxlSW5wdXRSZWYuY3VycmVudC5jbGljaygpO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgb25GaWxlU2VsZWN0ZWQgPSBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHNldEltYWdlVG9Dcm9wKHJlYWRlci5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBudWxsO1xuICB9O1xuICBjb25zdCBvbkNyb3BBbmRVcGxvYWQgPSAoKSA9PiB7XG4gICAgaWYgKCFjcm9wcGVyUmVmLmN1cnJlbnQ/LmNyb3BwZXIpIHJldHVybjtcbiAgICBzZXRJc1VwbG9hZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBjcm9wcGVyUmVmLmN1cnJlbnQuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCkudG9CbG9iKGFzeW5jIGJsb2IgPT4ge1xuICAgICAgaWYgKCFibG9iKSB7XG4gICAgICAgIHNldEVycm9yKCdDb3VsZCBub3QgcHJvY2VzcyBpbWFnZS4nKTtcbiAgICAgICAgc2V0SXNVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgYmxvYiwgYGNyb3BwZWQtJHtEYXRlLm5vdygpfS5wbmdgKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgX2F4aW9zLmRlZmF1bHQucG9zdCgnL2FwaS91cGxvYWRzJywgZm9ybURhdGEsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3VXJsID0gcmVzcG9uc2UuZGF0YS51cmw7XG4gICAgICAgIHNldEltYWdlVXJsKG5ld1VybCk7XG4gICAgICAgIHNldEltYWdlVG9Dcm9wKG51bGwpO1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5wYXRoLCBuZXdVcmwpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ1VwbG9hZCBmYWlsZWQnO1xuICAgICAgICBzZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzVXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LCAnaW1hZ2UvcG5nJyk7XG4gIH07XG4gIGNvbnN0IGhhbmRsZUNhbmNlbENyb3AgPSAoKSA9PiB7XG4gICAgc2V0SW1hZ2VUb0Nyb3AobnVsbCk7XG4gIH07XG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9ICgwLCBfcmVhY3QudXNlQ2FsbGJhY2spKCgpID0+IHtcbiAgICBzZXRJbWFnZVVybCgnJyk7XG4gICAgb25DaGFuZ2UocHJvcGVydHkucGF0aCwgbnVsbCk7XG4gIH0sIFtvbkNoYW5nZSwgcHJvcGVydHkucGF0aF0pO1xuICByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgIG1hcmdpbkJvdHRvbTogXCJsZ1wiLFxuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uTGFiZWwsIHtcbiAgICAgIGh0bWxGb3I6IHByb3BlcnR5LnBhdGgsXG4gICAgICBjaGlsZHJlbjogcHJvcGVydHkubGFiZWwgfHwgcHJvcGVydHkucGF0aFxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBjaGlsZHJlbjogW2ltYWdlVXJsICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwiaW1nXCIsIHtcbiAgICAgICAgICBzcmM6IGltYWdlVXJsLFxuICAgICAgICAgIGFsdDogXCJVcGxvYWRlZFwiLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBtYXhIZWlnaHQ6ICcxMDBweCcsXG4gICAgICAgICAgICBtYXhXaWR0aDogJzIwMHB4JyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgb25DbGljazogaGFuZGxlRGVsZXRlLFxuICAgICAgICAgIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgc2l6ZTogXCJzbVwiLFxuICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICBpY29uOiBcIlRyYXNoQ2FuXCJcbiAgICAgICAgICB9KSwgXCIgUmVtb3ZlXCJdXG4gICAgICAgIH0pXVxuICAgICAgfSksICFpbWFnZVVybCAmJiBpbWFnZVRvQ3JvcCAmJiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFsnY29sdW1uJywgJ3JvdyddLFxuICAgICAgICAgIG14OiAtMixcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbWF4V2lkdGg6ICc4MDBweCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgcHg6IDIsXG4gICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9yZWFjdENyb3BwZXIuZGVmYXVsdCwge1xuICAgICAgICAgICAgICByZWY6IGNyb3BwZXJSZWYsXG4gICAgICAgICAgICAgIHNyYzogaW1hZ2VUb0Nyb3AsXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGFzcGVjdFJhdGlvPXsxIC8gMX1cbiAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICBwcmV2aWV3OiBcIi5pbWctcHJldmlld1wiLFxuICAgICAgICAgICAgICBndWlkZXM6IHRydWUsXG4gICAgICAgICAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgICBjaGVja09yaWVudGF0aW9uOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgIHB4OiAyLFxuICAgICAgICAgICAgbXQ6IFszLCAwXSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uTGFiZWwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiUHJldmlld1wiXG4gICAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImltZy1wcmV2aWV3XCIsXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyMDBweCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgICBtdDogXCJsZ1wiLFxuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgICBvbkNsaWNrOiBvbkNyb3BBbmRVcGxvYWQsXG4gICAgICAgICAgICB2YXJpYW50OiBcInByaW1hcnlcIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBpc1VwbG9hZGluZyxcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogaXNVcGxvYWRpbmcgPyAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICAgIGljb246IFwiTG9hZGVyXCIsXG4gICAgICAgICAgICAgIHNwaW46IHRydWVcbiAgICAgICAgICAgIH0pIDogJ0Nyb3AgJiBVcGxvYWQnXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgICAgb25DbGljazogaGFuZGxlQ2FuY2VsQ3JvcCxcbiAgICAgICAgICAgIHZhcmlhbnQ6IFwic2Vjb25kYXJ5XCIsXG4gICAgICAgICAgICBtbDogXCJtZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBcIkNhbmNlbFwiXG4gICAgICAgICAgfSldXG4gICAgICAgIH0pXVxuICAgICAgfSksICFpbWFnZVVybCAmJiAhaW1hZ2VUb0Nyb3AgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5CdXR0b24sIHtcbiAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVTZWxlY3RJbWFnZUNsaWNrLFxuICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICBpY29uOiBcIkltYWdlXCJcbiAgICAgICAgICB9KSwgXCIgU2VsZWN0IEltYWdlXCJdXG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJmaWxlXCIsXG4gICAgICAgICAgcmVmOiBmaWxlSW5wdXRSZWYsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DaGFuZ2U6IG9uRmlsZVNlbGVjdGVkLFxuICAgICAgICAgIGFjY2VwdDogXCJpbWFnZS9wbmcsIGltYWdlL2pwZWcsIGltYWdlL3dlYnAsIGltYWdlL2dpZlwiXG4gICAgICAgIH0pXVxuICAgICAgfSldXG4gICAgfSksIGVycm9yICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgIGNvbG9yOiBcImRhbmdlclwiLFxuICAgICAgbXQ6IFwibWRcIixcbiAgICAgIGNoaWxkcmVuOiBlcnJvclxuICAgIH0pXVxuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSBVcGxvYWRJbWFnZUlucHV0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXBsb2FkSW1hZ2VJbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX2Rlc2lnblN5c3RlbSA9IHJlcXVpcmUoXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCIpO1xudmFyIF9qc3hSdW50aW1lID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuY29uc3QgUGFzc3dvcmRJbnB1dCA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIHByb3BlcnR5LFxuICAgIHJlY29yZCxcbiAgICBvbkNoYW5nZVxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHZhbHVlID0gJyc7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBldmVudC50YXJnZXQudmFsdWUpO1xuICB9O1xuICByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkZvcm1Hcm91cCwge1xuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uTGFiZWwsIHtcbiAgICAgIGh0bWxGb3I6IHByb3BlcnR5LnBhdGgsXG4gICAgICBjaGlsZHJlbjogcHJvcGVydHkubGFiZWwgfHwgcHJvcGVydHkucGF0aFxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JbnB1dCwge1xuICAgICAgdHlwZTogXCJwYXNzd29yZFwiLFxuICAgICAgaWQ6IHByb3BlcnR5LnBhdGgsXG4gICAgICBuYW1lOiBwcm9wZXJ0eS5wYXRoLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSxcbiAgICAgIHJlcXVpcmVkOiBwcm9wZXJ0eS5pc1JlcXVpcmVkXG4gICAgfSldXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IFBhc3N3b3JkSW5wdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYXNzd29yZElucHV0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX2Rlc2lnblN5c3RlbSA9IHJlcXVpcmUoXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCIpO1xudmFyIF9heGlvcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImF4aW9zXCIpKTtcbnZhciBfanN4UnVudGltZSA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtcnVudGltZVwiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShlKSB7IGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIFdlYWtNYXApIHJldHVybiBudWxsOyB2YXIgciA9IG5ldyBXZWFrTWFwKCksIHQgPSBuZXcgV2Vha01hcCgpOyByZXR1cm4gKF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlID8gdCA6IHI7IH0pKGUpOyB9XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChlLCByKSB7IGlmICghciAmJiBlICYmIGUuX19lc01vZHVsZSkgcmV0dXJuIGU7IGlmIChudWxsID09PSBlIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIGUgJiYgXCJmdW5jdGlvblwiICE9IHR5cGVvZiBlKSByZXR1cm4geyBkZWZhdWx0OiBlIH07IHZhciB0ID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKHIpOyBpZiAodCAmJiB0LmhhcyhlKSkgcmV0dXJuIHQuZ2V0KGUpOyB2YXIgbiA9IHsgX19wcm90b19fOiBudWxsIH0sIGEgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIgdSBpbiBlKSBpZiAoXCJkZWZhdWx0XCIgIT09IHUgJiYge30uaGFzT3duUHJvcGVydHkuY2FsbChlLCB1KSkgeyB2YXIgaSA9IGEgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHUpIDogbnVsbDsgaSAmJiAoaS5nZXQgfHwgaS5zZXQpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIHUsIGkpIDogblt1XSA9IGVbdV07IH0gcmV0dXJuIG4uZGVmYXVsdCA9IGUsIHQgJiYgdC5zZXQoZSwgbiksIG47IH1cbi8vIHNyYy9hZG1pbkNvbXBvbmVudHMvRGFzaGJvYXJkLmpzeFxuXG5jb25zdCBBTExfUE9TU0lCTEVfU1RBVFVTRVMgPSBbJ9Cd0L7QstGL0LknLCAn0J/RgNC40L3Rj9GCJywgJ9Ce0L/Qu9Cw0YfQtdC9JywgJ9CSINGB0LHQvtGA0LrQtScsICfQn9C10YDQtdC00LDQvSDQsiDQtNC+0YHRgtCw0LLQutGDJywgJ9CT0L7RgtC+0LIg0Log0YHQsNC80L7QstGL0LLQvtC30YMnLCAn0JfQsNCy0LXRgNGI0LXQvScsICfQntGC0LzQtdC90LXQvScsICfQktC+0LfQstGA0LDRgiddO1xuY29uc3QgREVGQVVMVF9JTl9QUk9HUkVTU19TVEFUVVNFUyA9IFsn0J/RgNC40L3Rj9GCJywgJ9Ce0L/Qu9Cw0YfQtdC9JywgJ9CSINGB0LHQvtGA0LrQtScsICfQn9C10YDQtdC00LDQvSDQsiDQtNC+0YHRgtCw0LLQutGDJywgJ9CT0L7RgtC+0LIg0Log0YHQsNC80L7QstGL0LLQvtC30YMnXTtcbmNvbnN0IE5ld09yZGVyc1dpZGdldCA9ICh7XG4gIHJlZnJlc2hJblByb2dyZXNzT3JkZXJzVHJpZ2dlclxufSkgPT4ge1xuICAvLyDQn9GA0LjQvdC40LzQsNC10Lwg0YLRgNC40LPQs9C10YAg0L7QsdC90L7QstC70LXQvdC40Y9cbiAgY29uc3QgW25ld09yZGVycywgc2V0TmV3T3JkZXJzXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKFtdKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkobnVsbCk7XG4gIGNvbnN0IGZldGNoTmV3T3JkZXJzID0gKDAsIF9yZWFjdC51c2VDYWxsYmFjaykoYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfYXhpb3MuZGVmYXVsdC5nZXQoJy9hcGkvb3JkZXJzL3N0YXR1cy/QndC+0LLRi9C5P2xpbWl0PTUmc29ydEJ5PWNyZWF0ZWRBdCZzb3J0RGlyZWN0aW9uPURFU0MnKTtcbiAgICAgIHNldE5ld09yZGVycyhyZXNwb25zZS5kYXRhLm9yZGVycyB8fCBbXSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbmV3IG9yZGVyczpcIiwgZXJyKTtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBuZXcgb3JkZXJzLicpO1xuICAgICAgc2V0TmV3T3JkZXJzKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG4gICgwLCBfcmVhY3QudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgZmV0Y2hOZXdPcmRlcnMoKTtcbiAgfSwgW2ZldGNoTmV3T3JkZXJzXSk7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZU9yZGVyU3RhdHVzID0gYXN5bmMgKG9yZGVySWQsIG5ld1N0YXR1cywgY29tbWVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBfYXhpb3MuZGVmYXVsdC5wdXQoYC9hcGkvb3JkZXJzLyR7b3JkZXJJZH0vc3RhdHVzYCwge1xuICAgICAgICBuZXdTdGF0dXMsXG4gICAgICAgIGFkbWluQ29tbWVudDogY29tbWVudFxuICAgICAgfSk7XG4gICAgICAvLyBhbGVydChg0KHRgtCw0YLRg9GBINC30LDQutCw0LfQsCAjJHtvcmRlcklkfSDQvtCx0L3QvtCy0LvQtdC9INC90LAgXCIke25ld1N0YXR1c31cImApO1xuICAgICAgZmV0Y2hOZXdPcmRlcnMoKTtcbiAgICAgIGlmIChyZWZyZXNoSW5Qcm9ncmVzc09yZGVyc1RyaWdnZXIpIHtcbiAgICAgICAgLy8g0JLRi9C30YvQstCw0LXQvCDRgtGA0LjQs9Cz0LXRgCwg0LXRgdC70Lgg0L7QvSDQtdGB0YLRjFxuICAgICAgICByZWZyZXNoSW5Qcm9ncmVzc09yZGVyc1RyaWdnZXIoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgc3RhdHVzIGZvciBvcmRlciAke29yZGVySWR9IHRvICR7bmV3U3RhdHVzfTpgLCBlcnIpO1xuICAgICAgYWxlcnQoYNCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDRgdGC0LDRgtGD0YHQsCDQtNC70Y8g0LfQsNC60LDQt9CwICMke29yZGVySWR9LmApO1xuICAgIH1cbiAgfTtcbiAgaWYgKGxvYWRpbmcpIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgY2hpbGRyZW46IFwiTG9hZGluZyBuZXcgb3JkZXJzLi4uXCJcbiAgfSk7XG4gIGlmIChlcnJvcikgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICBjb2xvcjogXCJkYW5nZXJcIixcbiAgICBjaGlsZHJlbjogZXJyb3JcbiAgfSk7XG4gIGlmIChuZXdPcmRlcnMubGVuZ3RoID09PSAwKSByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgIGNoaWxkcmVuOiBcIk5vIG5ldyBvcmRlcnMgZm91bmQuXCJcbiAgfSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgdmFyaWFudDogXCJ3aGl0ZVwiLFxuICAgIGJveFNoYWRvdzogXCJjYXJkXCIsXG4gICAgcDogXCJsZ1wiLFxuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSDMsIHtcbiAgICAgIG1iOiBcIm1kXCIsXG4gICAgICBjaGlsZHJlbjogXCJcXHUwNDFEXFx1MDQzRVxcdTA0MzJcXHUwNDRCXFx1MDQzNSBcXHUwNDE3XFx1MDQzMFxcdTA0M0FcXHUwNDMwXFx1MDQzN1xcdTA0NEJcIlxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGFibGUsIHtcbiAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVIZWFkLCB7XG4gICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGFibGVSb3csIHtcbiAgICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiSURcIlxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MTRcXHUwNDMwXFx1MDQ0MlxcdTA0MzBcIlxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUFcXHUwNDNCXFx1MDQzOFxcdTA0MzVcXHUwNDNEXFx1MDQ0MlwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMVxcdTA0NDNcXHUwNDNDXFx1MDQzQ1xcdTA0MzBcIlxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MjJcXHUwNDNFXFx1MDQzMlxcdTA0MzBcXHUwNDQwXFx1MDQ0QlwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxNFxcdTA0MzVcXHUwNDM5XFx1MDQ0MVxcdTA0NDJcXHUwNDMyXFx1MDQzOFxcdTA0NEZcIlxuICAgICAgICAgIH0pXVxuICAgICAgICB9KVxuICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQm9keSwge1xuICAgICAgICBjaGlsZHJlbjogbmV3T3JkZXJzLm1hcChvcmRlciA9PiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGFibGVSb3csIHtcbiAgICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoXCJhXCIsIHtcbiAgICAgICAgICAgICAgaHJlZjogYC9hZG1pbi9yZXNvdXJjZXMvb3JkZXJzL3JlY29yZHMvJHtvcmRlci5pZH0vc2hvd2AsXG4gICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgcmVsOiBcIm5vb3BlbmVyIG5vcmVmZXJyZXJcIixcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiNcIiwgb3JkZXIuaWRdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogb3JkZXIuY3VzdG9tZXJOYW1lXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbcGFyc2VGbG9hdChvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSwgXCIgXFx1MDQyMFwiXVxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJ1bFwiLCB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGlzdFN0eWxlOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2hpbGRyZW46IChvcmRlci5pdGVtcyB8fCBbXSkubWFwKGl0ZW0gPT4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShcImxpXCIsIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2l0ZW0ucHJvZHVjdE5hbWUsIFwiIHggXCIsIGl0ZW0ucXVhbnRpdHldXG4gICAgICAgICAgICAgIH0sIGl0ZW0uaWQpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBnYXA6ICc4cHgnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIHNpemU6IFwic21cIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2VPcmRlclN0YXR1cyhvcmRlci5pZCwgJ9Cf0YDQuNC90Y/RgicsICdPcmRlciBhY2NlcHRlZCBmcm9tIGRhc2hib2FyZCcpLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgICAgICAgaWNvbjogXCJDaGVja1wiXG4gICAgICAgICAgICAgICAgfSksIFwiIFxcdTA0MTIgXFx1MDQ0MFxcdTA0MzBcXHUwNDMxXFx1MDQzRVxcdTA0NDJcXHUwNDQzXCJdXG4gICAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgdmFyaWFudDogXCJkYW5nZXJcIixcbiAgICAgICAgICAgICAgICBzaXplOiBcInNtXCIsXG4gICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKGDQktGLINGD0LLQtdGA0LXQvdGLLCDRh9GC0L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0LfQsNC60LDQtyAjJHtvcmRlci5pZH0/YCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlT3JkZXJTdGF0dXMob3JkZXIuaWQsICfQntGC0LzQtdC90LXQvScsICdPcmRlciBjYW5jZWxsZWQgZnJvbSBkYXNoYm9hcmQnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgICAgICAgaWNvbjogXCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgfSksIFwiIFxcdTA0MUVcXHUwNDQyXFx1MDQzQ1xcdTA0MzVcXHUwNDNEXFx1MDQzOFxcdTA0NDJcXHUwNDRDXCJdXG4gICAgICAgICAgICAgIH0pXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KV1cbiAgICAgICAgfSwgb3JkZXIuaWQpKVxuICAgICAgfSldXG4gICAgfSldXG4gIH0pO1xufTtcbmNvbnN0IEluUHJvZ3Jlc3NPcmRlcnNXaWRnZXQgPSAoe1xuICByZWZyZXNoVHJpZ2dlcixcbiAgb25SZWZyZXNoRG9uZVxufSkgPT4ge1xuICBjb25zdCBbaW5Qcm9ncmVzc09yZGVycywgc2V0SW5Qcm9ncmVzc09yZGVyc10gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRGaWx0ZXJTdGF0dXNlcywgc2V0U2VsZWN0ZWRGaWx0ZXJTdGF0dXNlc10gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShuZXcgU2V0KERFRkFVTFRfSU5fUFJPR1JFU1NfU1RBVFVTRVMpKTtcbiAgY29uc3QgW29yZGVyU3RhdHVzZXNGb3JFZGl0LCBzZXRPcmRlclN0YXR1c2VzRm9yRWRpdF0gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKSh7fSk7XG4gIGNvbnN0IFtzaG93Q29uZmlybU1vZGFsLCBzZXRTaG93Q29uZmlybU1vZGFsXSA9ICgwLCBfcmVhY3QudXNlU3RhdGUpKGZhbHNlKTtcbiAgY29uc3QgW2NvbmZpcm1Nb2RhbERhdGEsIHNldENvbmZpcm1Nb2RhbERhdGFdID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoe1xuICAgIG9yZGVySWQ6IG51bGwsXG4gICAgbmV3U3RhdHVzOiBudWxsXG4gIH0pO1xuICBjb25zdCBmZXRjaEluUHJvZ3Jlc3NPcmRlcnMgPSAoMCwgX3JlYWN0LnVzZUNhbGxiYWNrKShhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzZXNUb0ZldGNoID0gQXJyYXkuZnJvbShzZWxlY3RlZEZpbHRlclN0YXR1c2VzKTtcbiAgICBpZiAoc3RhdHVzZXNUb0ZldGNoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2V0SW5Qcm9ncmVzc09yZGVycyhbXSk7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIGNvbnN0IHN0YXR1c1F1ZXJ5ID0gc3RhdHVzZXNUb0ZldGNoLm1hcChzID0+IGBzdGF0dXM9JHtlbmNvZGVVUklDb21wb25lbnQocyl9YCkuam9pbignJicpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfYXhpb3MuZGVmYXVsdC5nZXQoYC9hcGkvb3JkZXJzL2ZpbHRlcj8ke3N0YXR1c1F1ZXJ5fSZsaW1pdD0xMCZzb3J0Qnk9dXBkYXRlZEF0JnNvcnREaXJlY3Rpb249QVNDYCk7XG4gICAgICBjb25zdCBmZXRjaGVkT3JkZXJzID0gcmVzcG9uc2UuZGF0YS5vcmRlcnMgfHwgW107XG4gICAgICBzZXRJblByb2dyZXNzT3JkZXJzKGZldGNoZWRPcmRlcnMpO1xuICAgICAgY29uc3QgaW5pdGlhbFN0YXR1c2VzRm9yRWRpdCA9IHt9O1xuICAgICAgZmV0Y2hlZE9yZGVycy5mb3JFYWNoKG9yZGVyID0+IHtcbiAgICAgICAgaW5pdGlhbFN0YXR1c2VzRm9yRWRpdFtvcmRlci5pZF0gPSBvcmRlci5zdGF0dXM7XG4gICAgICB9KTtcbiAgICAgIHNldE9yZGVyU3RhdHVzZXNGb3JFZGl0KGluaXRpYWxTdGF0dXNlc0ZvckVkaXQpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGluLXByb2dyZXNzIG9yZGVyczpcIiwgZXJyKTtcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBpbi1wcm9ncmVzcyBvcmRlcnMuJyk7XG4gICAgICBzZXRJblByb2dyZXNzT3JkZXJzKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICBpZiAob25SZWZyZXNoRG9uZSkgb25SZWZyZXNoRG9uZSgpO1xuICAgIH1cbiAgfSwgW3NlbGVjdGVkRmlsdGVyU3RhdHVzZXMsIG9uUmVmcmVzaERvbmVdKTtcbiAgKDAsIF9yZWFjdC51c2VFZmZlY3QpKCgpID0+IHtcbiAgICBmZXRjaEluUHJvZ3Jlc3NPcmRlcnMoKTtcbiAgfSwgW2ZldGNoSW5Qcm9ncmVzc09yZGVycywgcmVmcmVzaFRyaWdnZXJdKTtcbiAgY29uc3QgaGFuZGxlU3RhdHVzRmlsdGVyQ2hhbmdlID0gKHN0YXR1c1ZhbHVlLCBpc0NoZWNrZWQpID0+IHtcbiAgICBzZXRTZWxlY3RlZEZpbHRlclN0YXR1c2VzKHByZXYgPT4ge1xuICAgICAgY29uc3QgbmV3U2V0ID0gbmV3IFNldChwcmV2KTtcbiAgICAgIGlmIChpc0NoZWNrZWQpIG5ld1NldC5hZGQoc3RhdHVzVmFsdWUpO2Vsc2UgbmV3U2V0LmRlbGV0ZShzdGF0dXNWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3U2V0O1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBoYW5kbGVTdGF0dXNFZGl0Q2hhbmdlID0gKG9yZGVySWQsIG5ld1N0YXR1cykgPT4ge1xuICAgIHNldE9yZGVyU3RhdHVzZXNGb3JFZGl0KHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbb3JkZXJJZF06IG5ld1N0YXR1c1xuICAgIH0pKTtcbiAgfTtcbiAgY29uc3QgcHJlcGFyZVRvU2F2ZVN0YXR1cyA9IG9yZGVySWQgPT4ge1xuICAgIGNvbnN0IG5ld1N0YXR1cyA9IG9yZGVyU3RhdHVzZXNGb3JFZGl0W29yZGVySWRdO1xuICAgIGlmICghbmV3U3RhdHVzKSB7XG4gICAgICBhbGVydChcItCh0L3QsNGH0LDQu9CwINCy0YvQsdC10YDQuNGC0LUg0L3QvtCy0YvQuSDRgdGC0LDRgtGD0YEuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDb25maXJtTW9kYWxEYXRhKHtcbiAgICAgIG9yZGVySWQsXG4gICAgICBuZXdTdGF0dXNcbiAgICB9KTtcbiAgICBzZXRTaG93Q29uZmlybU1vZGFsKHRydWUpO1xuICB9O1xuICBjb25zdCBjYW5jZWxTdGF0dXNDaGFuZ2UgPSAoKSA9PiB7XG4gICAgc2V0U2hvd0NvbmZpcm1Nb2RhbChmYWxzZSk7XG4gICAgc2V0Q29uZmlybU1vZGFsRGF0YSh7XG4gICAgICBvcmRlcklkOiBudWxsLFxuICAgICAgbmV3U3RhdHVzOiBudWxsXG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGNvbmZpcm1BbmRTYXZlU3RhdHVzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9yZGVySWQsXG4gICAgICBuZXdTdGF0dXNcbiAgICB9ID0gY29uZmlybU1vZGFsRGF0YTtcbiAgICBpZiAoIW9yZGVySWQgfHwgIW5ld1N0YXR1cykgcmV0dXJuO1xuICAgIHNldFNob3dDb25maXJtTW9kYWwoZmFsc2UpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBfYXhpb3MuZGVmYXVsdC5wdXQoYC9hcGkvb3JkZXJzLyR7b3JkZXJJZH0vc3RhdHVzYCwge1xuICAgICAgICBuZXdTdGF0dXMsXG4gICAgICAgIGFkbWluQ29tbWVudDogJ1N0YXR1cyB1cGRhdGVkIGZyb20gZGFzaGJvYXJkJ1xuICAgICAgfSk7XG4gICAgICBmZXRjaEluUHJvZ3Jlc3NPcmRlcnMoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgc3RhdHVzIGZvciBvcmRlciAke29yZGVySWR9OmAsIGVycik7XG4gICAgICBhbGVydChg0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINGB0YLQsNGC0YPRgdCwINC00LvRjyDQt9Cw0LrQsNC30LAgIyR7b3JkZXJJZH0uYCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldENvbmZpcm1Nb2RhbERhdGEoe1xuICAgICAgICBvcmRlcklkOiBudWxsLFxuICAgICAgICBuZXdTdGF0dXM6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2pzeFJ1bnRpbWUuRnJhZ21lbnQsIHtcbiAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgIHZhcmlhbnQ6IFwid2hpdGVcIixcbiAgICAgIGJveFNoYWRvdzogXCJjYXJkXCIsXG4gICAgICBwOiBcImxnXCIsXG4gICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgzLCB7XG4gICAgICAgIG1iOiBcIm1kXCIsXG4gICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MTdcXHUwNDMwXFx1MDQzQVxcdTA0MzBcXHUwNDM3XFx1MDQ0QiBcXHUwNDMyIFxcdTA0MjBcXHUwNDMwXFx1MDQzMVxcdTA0M0VcXHUwNDQyXFx1MDQzNVwiXG4gICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICBtYjogXCJtZFwiLFxuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkxhYmVsLCB7XG4gICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyNFxcdTA0MzhcXHUwNDNCXFx1MDQ0Q1xcdTA0NDJcXHUwNDQwIFxcdTA0M0ZcXHUwNDNFIFxcdTA0NDFcXHUwNDQyXFx1MDQzMFxcdTA0NDJcXHUwNDQzXFx1MDQ0MVxcdTA0MzBcXHUwNDNDOlwiXG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGdhcDogJzEwcHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnOHB4J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW46IERFRkFVTFRfSU5fUFJPR1JFU1NfU1RBVFVTRVMubWFwKHN0YXR1c09wdGlvbiA9PiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBtcjogXCJtZFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgaWQ6IGBmaWx0ZXItc3RhdHVzLSR7c3RhdHVzT3B0aW9uLnJlcGxhY2UoL1xccysvZywgJy0nKX1gLFxuICAgICAgICAgICAgICBjaGVja2VkOiBzZWxlY3RlZEZpbHRlclN0YXR1c2VzLmhhcyhzdGF0dXNPcHRpb24pLFxuICAgICAgICAgICAgICBvbkNoYW5nZTogZSA9PiBoYW5kbGVTdGF0dXNGaWx0ZXJDaGFuZ2Uoc3RhdHVzT3B0aW9uLCBlLnRhcmdldC5jaGVja2VkKSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzVweCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkxhYmVsLCB7XG4gICAgICAgICAgICAgIGh0bWxGb3I6IGBmaWx0ZXItc3RhdHVzLSR7c3RhdHVzT3B0aW9uLnJlcGxhY2UoL1xccysvZywgJy0nKX1gLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogc3RhdHVzT3B0aW9uXG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9LCBzdGF0dXNPcHRpb24pKVxuICAgICAgICB9KV1cbiAgICAgIH0pLCBsb2FkaW5nICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgY2hpbGRyZW46IFwiTG9hZGluZyBpbi1wcm9ncmVzcyBvcmRlcnMuLi5cIlxuICAgICAgfSksICFsb2FkaW5nICYmIGVycm9yICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgY29sb3I6IFwiZGFuZ2VyXCIsXG4gICAgICAgIGNoaWxkcmVuOiBlcnJvclxuICAgICAgfSksICFsb2FkaW5nICYmICFlcnJvciAmJiBzZWxlY3RlZEZpbHRlclN0YXR1c2VzLnNpemUgPT09IDAgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDEyXFx1MDQ0QlxcdTA0MzFcXHUwNDM1XFx1MDQ0MFxcdTA0MzhcXHUwNDQyXFx1MDQzNSBcXHUwNDQxXFx1MDQ0MlxcdTA0MzBcXHUwNDQyXFx1MDQ0M1xcdTA0NDFcXHUwNDRCIFxcdTA0MzRcXHUwNDNCXFx1MDQ0RiBcXHUwNDNFXFx1MDQ0MlxcdTA0M0VcXHUwNDMxXFx1MDQ0MFxcdTA0MzBcXHUwNDM2XFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQ0RiBcXHUwNDM3XFx1MDQzMFxcdTA0M0FcXHUwNDMwXFx1MDQzN1xcdTA0M0VcXHUwNDMyIFxcdTA0MzIgXFx1MDQ0MFxcdTA0MzBcXHUwNDMxXFx1MDQzRVxcdTA0NDJcXHUwNDM1LlwiXG4gICAgICB9KSwgIWxvYWRpbmcgJiYgIWVycm9yICYmIHNlbGVjdGVkRmlsdGVyU3RhdHVzZXMuc2l6ZSA+IDAgJiYgaW5Qcm9ncmVzc09yZGVycy5sZW5ndGggPT09IDAgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDFGXFx1MDQzRSBcXHUwNDMyXFx1MDQ0QlxcdTA0MzFcXHUwNDQwXFx1MDQzMFxcdTA0M0RcXHUwNDNEXFx1MDQ0QlxcdTA0M0MgXFx1MDQ0MVxcdTA0NDJcXHUwNDMwXFx1MDQ0MlxcdTA0NDNcXHUwNDQxXFx1MDQzMFxcdTA0M0MgXFx1MDQzN1xcdTA0MzBcXHUwNDNBXFx1MDQzMFxcdTA0MzdcXHUwNDRCIFxcdTA0M0RcXHUwNDM1IFxcdTA0M0RcXHUwNDMwXFx1MDQzOVxcdTA0MzRcXHUwNDM1XFx1MDQzRFxcdTA0NEIuXCJcbiAgICAgIH0pLCAhbG9hZGluZyAmJiAhZXJyb3IgJiYgaW5Qcm9ncmVzc09yZGVycy5sZW5ndGggPiAwICYmIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZSwge1xuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlSGVhZCwge1xuICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGFibGVSb3csIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBcIklEXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxQVxcdTA0M0JcXHUwNDM4XFx1MDQzNVxcdTA0M0RcXHUwNDQyXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMlxcdTA0M0VcXHUwNDMyXFx1MDQzMFxcdTA0NDBcXHUwNDRCXCJcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQyMlxcdTA0MzVcXHUwNDNBXFx1MDQ0M1xcdTA0NDlcXHUwNDM4XFx1MDQzOSBcXHUwNDIxXFx1MDQ0MlxcdTA0MzBcXHUwNDQyXFx1MDQ0M1xcdTA0NDFcIlxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgICBjaGlsZHJlbjogXCJcXHUwNDE0XFx1MDQzNVxcdTA0MzlcXHUwNDQxXFx1MDQ0MlxcdTA0MzJcXHUwNDM4XFx1MDQzNVwiXG4gICAgICAgICAgICB9KV1cbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVCb2R5LCB7XG4gICAgICAgICAgY2hpbGRyZW46IGluUHJvZ3Jlc3NPcmRlcnMubWFwKG9yZGVyID0+IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UYWJsZVJvdywge1xuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoXCJhXCIsIHtcbiAgICAgICAgICAgICAgICBocmVmOiBgL2FkbWluL3Jlc291cmNlcy9vcmRlcnMvcmVjb3Jkcy8ke29yZGVyLmlkfS9zaG93YCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgcmVsOiBcIm5vb3BlbmVyIG5vcmVmZXJyZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiI1wiLCBvcmRlci5pZF1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IG9yZGVyLmN1c3RvbWVyTmFtZVxuICAgICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLlRhYmxlQ2VsbCwge1xuICAgICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwidWxcIiwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAob3JkZXIuaXRlbXMgfHwgW10pLm1hcChpdGVtID0+IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoXCJsaVwiLCB7XG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2l0ZW0ucHJvZHVjdE5hbWUsIFwiIHggXCIsIGl0ZW0ucXVhbnRpdHldXG4gICAgICAgICAgICAgICAgfSwgaXRlbS5pZCkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGFibGVDZWxsLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5TZWxlY3QsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IG9yZGVyU3RhdHVzZXNGb3JFZGl0W29yZGVyLmlkXSB8fCBvcmRlci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogb3JkZXJTdGF0dXNlc0ZvckVkaXRbb3JkZXIuaWRdIHx8IG9yZGVyLnN0YXR1c1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczogQUxMX1BPU1NJQkxFX1NUQVRVU0VTLm1hcChzID0+ICh7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogcyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzXG4gICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBzZWxlY3RlZCA9PiBoYW5kbGVTdGF0dXNFZGl0Q2hhbmdlKG9yZGVyLmlkLCBzZWxlY3RlZC52YWx1ZSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UYWJsZUNlbGwsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIHZhcmlhbnQ6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgIHNpemU6IFwic21cIixcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBwcmVwYXJlVG9TYXZlU3RhdHVzKG9yZGVyLmlkKSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgICAgICAgaWNvbjogXCJTYXZlXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSldXG4gICAgICAgICAgfSwgb3JkZXIuaWQpKVxuICAgICAgICB9KV1cbiAgICAgIH0pXVxuICAgIH0pLCBzaG93Q29uZmlybU1vZGFsICYmIGNvbmZpcm1Nb2RhbERhdGEub3JkZXJJZCAmJiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG4gICAgICAgIHpJbmRleDogMTA1MCxcbiAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknLFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICB9LFxuICAgICAgd2lkdGg6IFsnOTAlJywgJzQwMHB4J10sXG4gICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgzLCB7XG4gICAgICAgIG1iOiBcImxnXCIsXG4gICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUZcXHUwNDNFXFx1MDQzNFxcdTA0NDJcXHUwNDMyXFx1MDQzNVxcdTA0NDBcXHUwNDM0XFx1MDQzOFxcdTA0NDJcXHUwNDM1IFxcdTA0MzRcXHUwNDM1XFx1MDQzOVxcdTA0NDFcXHUwNDQyXFx1MDQzMlxcdTA0MzhcXHUwNDM1XCJcbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgICAgIG1iOiBcInhsXCIsXG4gICAgICAgIGNoaWxkcmVuOiBg0JjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNC60LDQt9CwICMke2NvbmZpcm1Nb2RhbERhdGEub3JkZXJJZH0g0L3QsCBcIiR7Y29uZmlybU1vZGFsRGF0YS5uZXdTdGF0dXN9XCI/YFxuICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJ1dHRvbiwge1xuICAgICAgICAgIHZhcmlhbnQ6IFwicHJpbWFyeVwiLFxuICAgICAgICAgIG9uQ2xpY2s6IGNvbmZpcm1BbmRTYXZlU3RhdHVzLFxuICAgICAgICAgIG1yOiBcIm1kXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFwiXFx1MDQxRlxcdTA0M0VcXHUwNDM0XFx1MDQ0MlxcdTA0MzJcXHUwNDM1XFx1MDQ0MFxcdTA0MzRcXHUwNDM4XFx1MDQ0MlxcdTA0NENcIlxuICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQnV0dG9uLCB7XG4gICAgICAgICAgdmFyaWFudDogXCJ0ZXh0XCIsXG4gICAgICAgICAgb25DbGljazogY2FuY2VsU3RhdHVzQ2hhbmdlLFxuICAgICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUVcXHUwNDQyXFx1MDQzQ1xcdTA0MzVcXHUwNDNEXFx1MDQzMFwiXG4gICAgICAgIH0pXVxuICAgICAgfSldXG4gICAgfSksIHNob3dDb25maXJtTW9kYWwgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuNSknLFxuICAgICAgICB6SW5kZXg6IDEwNDBcbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiBjYW5jZWxTdGF0dXNDaGFuZ2VcbiAgICB9KV1cbiAgfSk7XG59O1xuXG4vLyAtLS0gMS4g0J3QntCS0KvQmSDQktCY0JTQltCV0KIt0JjQndCh0KLQoNCj0JrQptCY0K8gLS0tXG5jb25zdCBHdWlkZVdpZGdldCA9ICgpID0+IHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICB2YXJpYW50OiBcIndoaXRlXCIsXG4gICAgYm94U2hhZG93OiBcImNhcmRcIixcbiAgICBwOiBcImxnXCIsXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5IMywge1xuICAgICAgbWI6IFwibWRcIixcbiAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MTNcXHUwNDM4XFx1MDQzNCBcXHUwNDNGXFx1MDQzRSBcXHUwNDQwXFx1MDQzMFxcdTA0MzdcXHUwNDM0XFx1MDQzNVxcdTA0M0JcXHUwNDMwXFx1MDQzQ1wiXG4gICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgIGFzOiBcInVsXCIsXG4gICAgICBzdHlsZToge1xuICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgcGFkZGluZzogMFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgIGFzOiBcImxpXCIsXG4gICAgICAgIG1iOiBcIm1kXCIsXG4gICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICBpY29uOiBcIkFyY2hpdmVcIixcbiAgICAgICAgICAgIG1yOiBcIm1kXCJcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwiYlwiLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBcIkNhdGFsb2c6XCJcbiAgICAgICAgICAgIH0pLCBcIiBcXHUwNDIzXFx1MDQzRlxcdTA0NDBcXHUwNDMwXFx1MDQzMlxcdTA0M0JcXHUwNDM1XFx1MDQzRFxcdTA0MzhcXHUwNDM1IFxcdTA0M0FcXHUwNDMwXFx1MDQ0MlxcdTA0MzVcXHUwNDMzXFx1MDQzRVxcdTA0NDBcXHUwNDM4XFx1MDQ0RlxcdTA0M0NcXHUwNDM4LCBcXHUwNDNBXFx1MDQzRVxcdTA0M0JcXHUwNDNCXFx1MDQzNVxcdTA0M0FcXHUwNDQ2XFx1MDQzOFxcdTA0NEZcXHUwNDNDXFx1MDQzOCBcXHUwNDM4IFxcdTA0NDJcXHUwNDNFXFx1MDQzMlxcdTA0MzBcXHUwNDQwXFx1MDQzMFxcdTA0M0NcXHUwNDM4LlwiXVxuICAgICAgICAgIH0pXVxuICAgICAgICB9KVxuICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgICAgICBhczogXCJsaVwiLFxuICAgICAgICBtYjogXCJtZFwiLFxuICAgICAgICBjaGlsZHJlbjogLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgICAgaWNvbjogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgbXI6IFwibWRcIlxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJiXCIsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiU2hvcCBTZXR0aW5nczpcIlxuICAgICAgICAgICAgfSksIFwiIFxcdTA0MURcXHUwNDMwXFx1MDQ0MVxcdTA0NDJcXHUwNDQwXFx1MDQzRVxcdTA0MzlcXHUwNDNBXFx1MDQzMCBcXHUwNDQxXFx1MDQzRlxcdTA0M0VcXHUwNDQxXFx1MDQzRVxcdTA0MzFcXHUwNDNFXFx1MDQzMiBcXHUwNDM0XFx1MDQzRVxcdTA0NDFcXHUwNDQyXFx1MDQzMFxcdTA0MzJcXHUwNDNBXFx1MDQzOCBcXHUwNDM4IFxcdTA0M0VcXHUwNDNGXFx1MDQzQlxcdTA0MzBcXHUwNDQyXFx1MDQ0Qi5cIl1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfSlcbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICAgICAgYXM6IFwibGlcIixcbiAgICAgICAgbWI6IFwibWRcIixcbiAgICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkljb24sIHtcbiAgICAgICAgICAgIGljb246IFwiTGF5b3V0XCIsXG4gICAgICAgICAgICBtcjogXCJtZFwiXG4gICAgICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5UZXh0LCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogWy8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShcImJcIiwge1xuICAgICAgICAgICAgICBjaGlsZHJlbjogXCJDb250ZW50OlwiXG4gICAgICAgICAgICB9KSwgXCIgXFx1MDQyMFxcdTA0MzVcXHUwNDM0XFx1MDQzMFxcdTA0M0FcXHUwNDQyXFx1MDQzOFxcdTA0NDBcXHUwNDNFXFx1MDQzMlxcdTA0MzBcXHUwNDNEXFx1MDQzOFxcdTA0MzUgXFx1MDQzQVxcdTA0M0VcXHUwNDNEXFx1MDQ0MlxcdTA0MzVcXHUwNDNEXFx1MDQ0MlxcdTA0MzAgXFx1MDQzRFxcdTA0MzAgXFx1MDQ0MVxcdTA0NDJcXHUwNDQwXFx1MDQzMFxcdTA0M0RcXHUwNDM4XFx1MDQ0NlxcdTA0MzBcXHUwNDQ1IFxcdTA0NDFcXHUwNDMwXFx1MDQzOVxcdTA0NDJcXHUwNDMwIChcXHUwNDMzXFx1MDQzQlxcdTA0MzBcXHUwNDMyXFx1MDQzRFxcdTA0MzBcXHUwNDRGLCBcXHUwNDMzXFx1MDQzMFxcdTA0M0JcXHUwNDM1XFx1MDQ0MFxcdTA0MzVcXHUwNDM4IFxcdTA0MzggXFx1MDQ0Mi5cXHUwNDM0LikuXCJdXG4gICAgICAgICAgfSldXG4gICAgICAgIH0pXG4gICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgIGFzOiBcImxpXCIsXG4gICAgICAgIG1iOiBcIm1kXCIsXG4gICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICBpY29uOiBcIlVzZXJcIixcbiAgICAgICAgICAgIG1yOiBcIm1kXCJcbiAgICAgICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLlRleHQsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKFwiYlwiLCB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBcIkFkbWluIFVzZXJzOlwiXG4gICAgICAgICAgICB9KSwgXCIgXFx1MDQyM1xcdTA0M0ZcXHUwNDQwXFx1MDQzMFxcdTA0MzJcXHUwNDNCXFx1MDQzNVxcdTA0M0RcXHUwNDM4XFx1MDQzNSBcXHUwNDQzXFx1MDQ0N1xcdTA0MzVcXHUwNDQyXFx1MDQzRFxcdTA0NEJcXHUwNDNDXFx1MDQzOCBcXHUwNDM3XFx1MDQzMFxcdTA0M0ZcXHUwNDM4XFx1MDQ0MVxcdTA0NEZcXHUwNDNDXFx1MDQzOCBcXHUwNDMwXFx1MDQzNFxcdTA0M0NcXHUwNDM4XFx1MDQzRFxcdTA0MzhcXHUwNDQxXFx1MDQ0MlxcdTA0NDBcXHUwNDMwXFx1MDQ0MlxcdTA0M0VcXHUwNDQwXFx1MDQzRVxcdTA0MzIuXCJdXG4gICAgICAgICAgfSldXG4gICAgICAgIH0pXG4gICAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICAgIGFzOiBcImxpXCIsXG4gICAgICAgIG1iOiBcIm1kXCIsXG4gICAgICAgIGNoaWxkcmVuOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5JY29uLCB7XG4gICAgICAgICAgICBpY29uOiBcIlNob3BwaW5nQ2FydFwiLFxuICAgICAgICAgICAgbXI6IFwibWRcIlxuICAgICAgICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgICAgICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoXCJiXCIsIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFwiT3JkZXJzOlwiXG4gICAgICAgICAgICB9KSwgXCIgXFx1MDQxRlxcdTA0NDBcXHUwNDNFXFx1MDQ0MVxcdTA0M0NcXHUwNDNFXFx1MDQ0MlxcdTA0NDAgXFx1MDQzMlxcdTA0NDFcXHUwNDM1XFx1MDQ0NSBcXHUwNDM3XFx1MDQzMFxcdTA0M0FcXHUwNDMwXFx1MDQzN1xcdTA0M0VcXHUwNDMyIFxcdTA0MzggXFx1MDQzOFxcdTA0NDUgXFx1MDQzNFxcdTA0MzVcXHUwNDQyXFx1MDQzMFxcdTA0M0JcXHUwNDM1XFx1MDQzOS5cIl1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfSlcbiAgICAgIH0pXVxuICAgIH0pXVxuICB9KTtcbn07XG5cbi8vIC0tLSAyLiDQndCe0JLQq9CZINCS0JjQlNCW0JXQoiDQlNCb0K8g0J7Qp9CY0KHQotCa0JggLS0tXG5jb25zdCBDbGVhbnVwV2lkZ2V0ID0gKCkgPT4ge1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gKDAsIF9yZWFjdC51c2VTdGF0ZSkoZmFsc2UpO1xuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKShudWxsKTtcbiAgY29uc3QgaGFuZGxlQ2xlYW51cENsaWNrID0gKCkgPT4ge1xuICAgIGlmICghd2luZG93LmNvbmZpcm0oJ9CS0Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0LLRgdC1INC90LXQuNGB0L/QvtC70YzQt9GD0LXQvNGL0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjz8g0K3RgtC+INC00LXQudGB0YLQstC40LUg0L3QtdC+0LHRgNCw0YLQuNC80L4uJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldE1lc3NhZ2UobnVsbCk7XG4gICAgX2F4aW9zLmRlZmF1bHQucG9zdCgnL2FwaS9jbGVhbnVwL3VudXNlZC1pbWFnZXMtdGVzdCcpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgc2V0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5tZXNzYWdlXG4gICAgICB9KTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBzZXRNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgdGV4dDogZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VycmVkIGR1cmluZyBjbGVhbnVwLidcbiAgICAgIH0pO1xuICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4cykoX2Rlc2lnblN5c3RlbS5Cb3gsIHtcbiAgICB2YXJpYW50OiBcIndoaXRlXCIsXG4gICAgYm94U2hhZG93OiBcImNhcmRcIixcbiAgICBwOiBcImxnXCIsXG4gICAgY2hpbGRyZW46IFsvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5IMywge1xuICAgICAgY2hpbGRyZW46IFwiXFx1MDQxRVxcdTA0MzFcXHUwNDQxXFx1MDQzQlxcdTA0NDNcXHUwNDM2XFx1MDQzOFxcdTA0MzJcXHUwNDMwXFx1MDQzRFxcdTA0MzhcXHUwNDM1XCJcbiAgICB9KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgbXQ6IFwibWRcIixcbiAgICAgIGNvbG9yOiBcImdyZXk2MFwiLFxuICAgICAgY2hpbGRyZW46IFwiXFx1MDQxRFxcdTA0MzBcXHUwNDM2XFx1MDQzQ1xcdTA0MzhcXHUwNDQyXFx1MDQzNSBcXHUwNDNBXFx1MDQzRFxcdTA0M0VcXHUwNDNGXFx1MDQzQVxcdTA0NDMgXFx1MDQzRFxcdTA0MzhcXHUwNDM2XFx1MDQzNSwgXFx1MDQ0N1xcdTA0NDJcXHUwNDNFXFx1MDQzMVxcdTA0NEIgXFx1MDQzRlxcdTA0NDBcXHUwNDNFXFx1MDQ0MVxcdTA0M0FcXHUwNDMwXFx1MDQzRFxcdTA0MzhcXHUwNDQwXFx1MDQzRVxcdTA0MzJcXHUwNDMwXFx1MDQ0MlxcdTA0NEMgXFx1MDQzRlxcdTA0MzBcXHUwNDNGXFx1MDQzQVxcdTA0NDMgXFxcInVwbG9hZHNcXFwiIFxcdTA0MzggXFx1MDQ0M1xcdTA0MzRcXHUwNDMwXFx1MDQzQlxcdTA0MzhcXHUwNDQyXFx1MDQ0QyBcXHUwNDMyXFx1MDQ0MVxcdTA0MzUgXFx1MDQzOFxcdTA0MzdcXHUwNDNFXFx1MDQzMVxcdTA0NDBcXHUwNDMwXFx1MDQzNlxcdTA0MzVcXHUwNDNEXFx1MDQzOFxcdTA0NEYsIFxcdTA0M0FcXHUwNDNFXFx1MDQ0MlxcdTA0M0VcXHUwNDQwXFx1MDQ0QlxcdTA0MzUgXFx1MDQzMVxcdTA0M0VcXHUwNDNCXFx1MDQ0Q1xcdTA0NDhcXHUwNDM1IFxcdTA0M0RcXHUwNDM1IFxcdTA0M0ZcXHUwNDQwXFx1MDQzOFxcdTA0MzJcXHUwNDRGXFx1MDQzN1xcdTA0MzBcXHUwNDNEXFx1MDQ0QiBcXHUwNDNEXFx1MDQzOCBcXHUwNDNBIFxcdTA0M0VcXHUwNDM0XFx1MDQzRFxcdTA0M0VcXHUwNDM5IFxcdTA0MzdcXHUwNDMwXFx1MDQzRlxcdTA0MzhcXHUwNDQxXFx1MDQzOCBcXHUwNDMyIFxcdTA0MzFcXHUwNDMwXFx1MDQzN1xcdTA0MzUgXFx1MDQzNFxcdTA0MzBcXHUwNDNEXFx1MDQzRFxcdTA0NEJcXHUwNDQ1LlwiXG4gICAgfSksIG1lc3NhZ2UgJiYgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uVGV4dCwge1xuICAgICAgbXQ6IFwibGdcIixcbiAgICAgIHA6IFwibWRcIixcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIlxuICAgICAgLy8g0JIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINGC0LjQv9CwINGB0L7QvtCx0YnQtdC90LjRjyDQvNC10L3Rj9C10Lwg0YbQstC10YIg0YDQsNC80LrQuCDQuCDRgtC10LrRgdGC0LBcbiAgICAgICxcbiAgICAgIGJvcmRlckNvbG9yOiBtZXNzYWdlLnR5cGUgPT09ICdzdWNjZXNzJyA/ICdzdWNjZXNzJyA6ICdkYW5nZXInLFxuICAgICAgY29sb3I6IG1lc3NhZ2UudHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ3N1Y2Nlc3MnIDogJ2RhbmdlcicsXG4gICAgICBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLFxuICAgICAgYmc6IG1lc3NhZ2UudHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ2xpZ2h0U3VjY2VzcycgOiAnbGlnaHREYW5nZXInLFxuICAgICAgY2hpbGRyZW46IG1lc3NhZ2UudGV4dFxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeCkoX2Rlc2lnblN5c3RlbS5CdXR0b24sIHtcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsZWFudXBDbGljayxcbiAgICAgIGRpc2FibGVkOiBpc0xvYWRpbmcsXG4gICAgICB2YXJpYW50OiBcImRhbmdlclwiLFxuICAgICAgbXQ6IFwibWRcIixcbiAgICAgIGNoaWxkcmVuOiBpc0xvYWRpbmcgPyAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9qc3hSdW50aW1lLkZyYWdtZW50LCB7XG4gICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgIGljb246IFwiTG9hZGVyXCIsXG4gICAgICAgICAgc3BpbjogdHJ1ZVxuICAgICAgICB9KSwgXCIgXFx1MDQxRVxcdTA0NDdcXHUwNDM4XFx1MDQ0MVxcdTA0NDJcXHUwNDNBXFx1MDQzMC4uLlwiXVxuICAgICAgfSkgOiAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9qc3hSdW50aW1lLkZyYWdtZW50LCB7XG4gICAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uSWNvbiwge1xuICAgICAgICAgIGljb246IFwiVHJhc2hcIlxuICAgICAgICB9KSwgXCIgXFx1MDQxRVxcdTA0NDdcXHUwNDM4XFx1MDQ0MVxcdTA0NDJcXHUwNDM4XFx1MDQ0MlxcdTA0NEMgXFx1MDQzRFxcdTA0MzVcXHUwNDM4XFx1MDQ0MVxcdTA0M0ZcXHUwNDNFXFx1MDQzQlxcdTA0NENcXHUwNDM3XFx1MDQ0M1xcdTA0MzVcXHUwNDNDXFx1MDQ0QlxcdTA0MzUgXFx1MDQzOFxcdTA0MzdcXHUwNDNFXFx1MDQzMVxcdTA0NDBcXHUwNDMwXFx1MDQzNlxcdTA0MzVcXHUwNDNEXFx1MDQzOFxcdTA0NEZcIl1cbiAgICAgIH0pXG4gICAgfSldXG4gIH0pO1xufTtcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgW3JlZnJlc2hJblByb2dyZXNzS2V5LCBzZXRSZWZyZXNoSW5Qcm9ncmVzc0tleV0gPSAoMCwgX3JlYWN0LnVzZVN0YXRlKSgwKTtcbiAgY29uc3QgdHJpZ2dlckluUHJvZ3Jlc3NSZWZyZXNoID0gKCkgPT4ge1xuICAgIHNldFJlZnJlc2hJblByb2dyZXNzS2V5KHByZXZLZXkgPT4gcHJldktleSArIDEpO1xuICB9O1xuICByZXR1cm4gLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3hzKShfZGVzaWduU3lzdGVtLkJveCwge1xuICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBtYjogXCJ4bFwiLFxuICAgICAgcDogXCJsZ1wiLFxuICAgICAgY2hpbGRyZW46IC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShfZGVzaWduU3lzdGVtLkgyLCB7XG4gICAgICAgIGNoaWxkcmVuOiBcIlxcdTA0MUZcXHUwNDMwXFx1MDQzRFxcdTA0MzVcXHUwNDNCXFx1MDQ0QyBcXHUwNDIzXFx1MDQzRlxcdTA0NDBcXHUwNDMwXFx1MDQzMlxcdTA0M0JcXHUwNDM1XFx1MDQzRFxcdTA0MzhcXHUwNDRGIFxcdTA0MUNcXHUwNDMwXFx1MDQzM1xcdTA0MzBcXHUwNDM3XFx1MDQzOFxcdTA0M0RcXHUwNDNFXFx1MDQzQ1wiXG4gICAgICB9KVxuICAgIH0pLCAvKiNfX1BVUkVfXyovKDAsIF9qc3hSdW50aW1lLmpzeHMpKF9kZXNpZ25TeXN0ZW0uQm94LCB7XG4gICAgICBkaXNwbGF5OiBcImdyaWRcIixcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IHtcbiAgICAgICAgXzogXCIxZnJcIlxuICAgICAgfSxcbiAgICAgIGdyaWRHYXA6IFwibGdcIixcbiAgICAgIHA6IFwibGdcIixcbiAgICAgIGNoaWxkcmVuOiBbLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKE5ld09yZGVyc1dpZGdldCwge1xuICAgICAgICByZWZyZXNoSW5Qcm9ncmVzc09yZGVyc1RyaWdnZXI6IHRyaWdnZXJJblByb2dyZXNzUmVmcmVzaFxuICAgICAgfSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShJblByb2dyZXNzT3JkZXJzV2lkZ2V0LCB7XG4gICAgICAgIHJlZnJlc2hUcmlnZ2VyOiByZWZyZXNoSW5Qcm9ncmVzc0tleSxcbiAgICAgICAgb25SZWZyZXNoRG9uZTogKCkgPT4ge31cbiAgICAgIH0sIHJlZnJlc2hJblByb2dyZXNzS2V5KSwgLyojX19QVVJFX18qLygwLCBfanN4UnVudGltZS5qc3gpKEd1aWRlV2lkZ2V0LCB7fSksIC8qI19fUFVSRV9fKi8oMCwgX2pzeFJ1bnRpbWUuanN4KShDbGVhbnVwV2lkZ2V0LCB7fSldXG4gICAgfSldXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IERhc2hib2FyZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURhc2hib2FyZC5qcy5tYXAiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBVcGxvYWRJbWFnZUlucHV0IGZyb20gJy4uL2Rpc3QvYWRtaW5Db21wb25lbnRzL1VwbG9hZEltYWdlSW5wdXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZEltYWdlSW5wdXQgPSBVcGxvYWRJbWFnZUlucHV0XG5pbXBvcnQgUGFzc3dvcmRJbnB1dCBmcm9tICcuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9QYXNzd29yZElucHV0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5QYXNzd29yZElucHV0ID0gUGFzc3dvcmRJbnB1dFxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluQ29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZCJdLCJuYW1lcyI6WyJ3cmFwIiwiZm4iLCJhcHBseSIsInRoaXNBcmciLCJhcmd1bWVudHMiLCJ0aGlzIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJqc3hSdW50aW1lTW9kdWxlIiwiX3JlYWN0Q3JvcHBlciIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlJCQzIiwiZSIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlIiwiVXBsb2FkSW1hZ2VJbnB1dCIsIldlYWtNYXAiLCJyIiwidCIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwiaGFzIiwiZ2V0IiwibiIsIl9fcHJvdG9fXyIsImEiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpIiwic2V0IiwiQ1JPUFBFUl9DU1MiLCJwcm9wcyIsInByb3BlcnR5IiwicmVjb3JkIiwiX3JlYWN0IiwidXNlRWZmZWN0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlSWQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRJbWFnZVVybCIsInBhcmFtcyIsInBhdGgiLCJpbWFnZVVybCIsInNldEltYWdlVXJsIiwidXNlU3RhdGUiLCJpbWFnZVRvQ3JvcCIsInNldEltYWdlVG9Dcm9wIiwiaXNVcGxvYWRpbmciLCJzZXRJc1VwbG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VSZWYiLCJmaWxlSW5wdXRSZWYiLCJoYW5kbGVTZWxlY3RJbWFnZUNsaWNrIiwiZmlsZXMiLCJjdXJyZW50IiwiY2xpY2siLCJvbkZpbGVTZWxlY3RlZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJsZW5ndGgiLCJmaWxlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJ2YWx1ZSIsIm9uQ3JvcEFuZFVwbG9hZCIsImNyb3BwZXJSZWYiLCJjcm9wcGVyIiwiZ2V0Q3JvcHBlZENhbnZhcyIsInRvQmxvYiIsImJsb2IiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVzcG9uc2UiLCJfYXhpb3MiLCJwb3N0IiwiaGVhZGVycyIsIm5ld1VybCIsImRhdGEiLCJ1cmwiLCJvbkNoYW5nZSIsImVyciIsIm1lc3NhZ2UiLCJoYW5kbGVDYW5jZWxDcm9wIiwibWFyZ2luQm90dG9tIiwiaGFuZGxlRGVsZXRlIiwidXNlQ2FsbGJhY2siLCJfanN4UnVudGltZSIsImpzeHMiLCJfZGVzaWduU3lzdGVtIiwiQm94IiwianN4IiwiTGFiZWwiLCJsYWJlbCIsImNoaWxkcmVuIiwic3JjIiwiYWx0IiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJtYXJnaW5SaWdodCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJ2YXJpYW50Iiwic2l6ZSIsInR5cGUiLCJJY29uIiwiaWNvbiIsImhlaWdodCIsIndpZHRoIiwicHJldmlldyIsImd1aWRlcyIsInZpZXdNb2RlIiwicmVzcG9uc2l2ZSIsImNoZWNrT3JpZW50YXRpb24iLCJjbGFzc05hbWUiLCJvdmVyZmxvdyIsImJvcmRlciIsImRpc2FibGVkIiwic3BpbiIsIm1sIiwicmVmIiwiZGlzcGxheSIsImFjY2VwdCIsImhhbmRsZUNoYW5nZSIsIm5hbWUiLCJGb3JtR3JvdXAiLCJodG1sRm9yIiwiSW5wdXQiLCJyZXF1aXJlJCQyIiwiTmV3T3JkZXJzV2lkZ2V0IiwiQUxMX1BPU1NJQkxFX1NUQVRVU0VTIiwiREVGQVVMVF9JTl9QUk9HUkVTU19TVEFUVVNFUyIsIm5ld09yZGVycyIsInNldE5ld09yZGVycyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZmV0Y2hOZXdPcmRlcnMiLCJvcmRlcnMiLCJjb25zb2xlIiwiaGFuZGxlQ2hhbmdlT3JkZXJTdGF0dXMiLCJvcmRlcklkIiwibmV3U3RhdHVzIiwiY29tbWVudCIsInB1dCIsInJlZnJlc2hJblByb2dyZXNzT3JkZXJzVHJpZ2dlciIsImFsZXJ0IiwiVGV4dCIsIkgzIiwiVGFibGVIZWFkIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJUYWJsZUJvZHkiLCJtYXAiLCJvcmRlciIsImhyZWYiLCJyZWwiLCJEYXRlIiwiY3JlYXRlZEF0IiwidG9Mb2NhbGVTdHJpbmciLCJjdXN0b21lck5hbWUiLCJwYXJzZUZsb2F0IiwidG90YWxBbW91bnQiLCJ0b0ZpeGVkIiwibGlzdFN0eWxlIiwicGFkZGluZyIsIm1hcmdpbiIsIml0ZW1zIiwiaXRlbSIsInByb2R1Y3ROYW1lIiwicXVhbnRpdHkiLCJ3aW5kb3ciLCJjb25maXJtIiwiSW5Qcm9ncmVzc09yZGVyc1dpZGdldCIsInJlZnJlc2hUcmlnZ2VyIiwib25SZWZyZXNoRG9uZSIsImluUHJvZ3Jlc3NPcmRlcnMiLCJzZXRJblByb2dyZXNzT3JkZXJzIiwic2VsZWN0ZWRGaWx0ZXJTdGF0dXNlcyIsInNldFNlbGVjdGVkRmlsdGVyU3RhdHVzZXMiLCJTZXQiLCJvcmRlclN0YXR1c2VzRm9yRWRpdCIsInNldE9yZGVyU3RhdHVzZXNGb3JFZGl0Iiwic2hvd0NvbmZpcm1Nb2RhbCIsInNldFNob3dDb25maXJtTW9kYWwiLCJjb25maXJtTW9kYWxEYXRhIiwic2V0Q29uZmlybU1vZGFsRGF0YSIsImZldGNoSW5Qcm9ncmVzc09yZGVycyIsInN0YXR1c2VzVG9GZXRjaCIsIkFycmF5IiwiZnJvbSIsInN0YXR1c1F1ZXJ5IiwicyIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJmZXRjaGVkT3JkZXJzIiwiaW5pdGlhbFN0YXR1c2VzRm9yRWRpdCIsImZvckVhY2giLCJzdGF0dXMiLCJoYW5kbGVTdGF0dXNGaWx0ZXJDaGFuZ2UiLCJzdGF0dXNWYWx1ZSIsInByZXYiLCJuZXdTZXQiLCJpc0NoZWNrZWQiLCJhZGQiLCJkZWxldGUiLCJoYW5kbGVTdGF0dXNFZGl0Q2hhbmdlIiwicHJlcGFyZVRvU2F2ZVN0YXR1cyIsImNhbmNlbFN0YXR1c0NoYW5nZSIsImNvbmZpcm1BbmRTYXZlU3RhdHVzIiwiYWRtaW5Db21tZW50IiwiRnJhZ21lbnQiLCJnYXAiLCJzdGF0dXNPcHRpb24iLCJyZXBsYWNlIiwiY2hlY2tlZCIsImNvbG9yIiwiVGFibGUiLCJTZWxlY3QiLCJvcHRpb25zIiwic2VsZWN0ZWQiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwidGV4dEFsaWduIiwibWIiLCJtciIsInJpZ2h0IiwiYm90dG9tIiwiR3VpZGVXaWRnZXQiLCJDbGVhbnVwV2lkZ2V0Iiwic2V0SXNMb2FkaW5nIiwiaXNMb2FkaW5nIiwic2V0TWVzc2FnZSIsImhhbmRsZUNsZWFudXBDbGljayIsInRoZW4iLCJ0ZXh0IiwiY2F0Y2giLCJmaW5hbGx5IiwicCIsIm10IiwiYm9yZGVyQ29sb3IiLCJiZyIsIkRhc2hib2FyZCIsInJlZnJlc2hJblByb2dyZXNzS2V5Iiwic2V0UmVmcmVzaEluUHJvZ3Jlc3NLZXkiLCJ0cmlnZ2VySW5Qcm9ncmVzc1JlZnJlc2giLCJwcmV2S2V5IiwiSDIiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiXyIsImdyaWRHYXAiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJQYXNzd29yZElucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztDQUdBLEVBQUEsT0FBQSxTQUFBQSxJQUFBLEdBQUE7Q0FDQSxJQUFBLE9BQUFDLEVBQUEsQ0FBQUMsS0FBQSxDQUFBQyxPQUFBLEVBQUFDLFNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUM7Q0FDcEQ7Q0FDQSxTQUFRLFVBQVUsQ0FBQyxLQUFLLEdBQUcsUUFBUTtDQUNuQyxTQUFRLFVBQVUsQ0FBQyxNQUFNLEdBQUcsU0FBUztDQUNyQyxTQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0NBQy9CO0NBQ0EsT0FBTSxPQUFPLElBQUk7T0FDWjtDQUNMO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxLQUFJLE1BQU0sRUFBRSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Q0FDcEMsT0FBTSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ3BFO0NBQ0w7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEtBQUksUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRTtDQUN4QyxPQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1VBQzlFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHO0NBQzVDLFNBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQ3JDO0NBQ0EsT0FBTSxPQUFPLElBQUk7T0FDWjtDQUNMO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxLQUFJLE1BQU0sRUFBRSxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Q0FDckMsT0FBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Q0FDeEMsT0FBTSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFN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QUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMs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RUFBQSxRQUFBO1dBQ2pCWSxJQUFBLEVBQUE7Q0FDVyxTQUFBLENBQUEsRUFBQSxnREFBQTtDQUVoQixPQUFBLENBQUEsZ0JBQUEsSUFBQS9CLFdBQUEsQ0FBQUMsSUFBQSxFQUFBRCxXQUFBLENBQUEySCxRQUFBLEVBQUE7U0FFRXBILFFBQVEsRUFBQSxjQUFBLElBQUFQLFdBQUEsQ0FBQUksR0FBQSxFQUFBRixhQUFBLENBQUFnQixJQUFBLEVBQUE7O1VBR0EsQ0FBQSxFQUFBLDJNQUFBOztDQUVOLEtBQUEsQ0FBQTtDQUVELEdBQUEsQ0FBQTs7Q0FFUzZJLE1BQUFBLFNBQUEsR0FBQWxCLE1BQUE7Q0FBQSxFQUFBLE1BQUEsQ0FBQW1CLG9CQUFBLEVBQUFDLHVCQUFBLENBQUFqTyxHQUFBQSxJQUFBQSxNQUFBLENBQUFnQixRQUFBLEVBQUEsQ0FBQSxDQUFBO0NBQUFrTixFQUFBQSxNQUFBQSx3QkFDQSxHQUFBQSxNQUFBOzRCQUFBLENBQUFDLE9BQUEsSUFBQUEsT0FBQSxHQUFBLENBQUEsQ0FBQTs7Q0FDRSxFQUFBLG9CQUNSLElBQUFuSyxXQUFBLENBQUFDLElBQUEsRUFBQUMsYUFBQSxDQUFBQyxHQUFBLEVBQUE7YUFBTyxFQUFRLGNBQUEsSUFBQUgsV0FBQSxDQUFBSSxHQUFBLEVBQUFGLGFBQUEsQ0FBQUMsR0FBQSxFQUFBO09BQUEwSSxFQUFBLEVBQUEsSUFBQTtVQUFBLElBQUE7Q0FBQXRJLE1BQUFBLFFBQUEsbUJBQUFQLFdBQUEsQ0FBQUksR0FBQSxFQUFBRixhQUFBLENBQUFrSyxFQUFBLEVBQUE7U0FBQTdKLFFBQUEsRUFBQTtRQUFBO0NBQUEsS0FBQSxDQUFBLGVBQUEsSUFBQVAsV0FDZixDQUFBQyxJQUFBLEVBQUFDLGFBQUEsQ0FBQUMsR0FBQSxFQUFBO0NBQW9CLE1BQUEsT0FBQSxFQUFBLE1BQUE7T0FBQWtLLG1CQUNaLEVBQUE7U0FBa0RDLENBQUEsRUFBQTs7T0FBT0MsT0FBMUIsRUFBQSxJQUFBO09BR3RCWixDQUFBLEVBQUEsSUFBQTtDQUNQcEosTUFBQUEsUUFBQSxFQUFBUCxjQUFBQSxJQUFBQSxXQUFBLENBQUFJLEdBQUEsRUFBQXNDLGVBQUEsRUFBQTtDQUVQZSxRQUFBQSw4QkFBQSxFQUFBeUc7Q0FBQSxPQUFBLENBQUEsZUFBQSxJQUFBbEssV0FFSixDQUFBSSxHQUFBLEVBQUFpRixzQkFBQSxFQUFBOzs7Ozs7Ozs7Q0NyYlRtRixPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFO0NBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQy9QLGdCQUFnQixHQUFHQSxXQUFnQjtDQUUxRDhQLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxhQUFhLEdBQUdBLFdBQWE7Q0FFcERGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVixTQUFTLEdBQUdBLFNBQVM7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0XX0=
