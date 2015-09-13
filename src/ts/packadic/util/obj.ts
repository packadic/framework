
module packadic.util.obj {

    export function getParts(str):any {
        return str.replace(/\\\./g, '\uffff').split('.').map(function (s) {
            return s.replace(/\uffff/g, '.');
        });
    }

    /**
     * Get a child of the object using dot notation
     * @param obj
     * @param parts
     * @param create
     * @returns {any}
     */
    export function objectGet(obj?:any, parts?:any, create?:any):any {
        if (typeof parts === 'string') {
            parts = getParts(parts);
        }

        var part;
        while (typeof obj === 'object' && obj && parts.length) {
            part = parts.shift();
            if (!(part in obj) && create) {
                obj[part] = {};
            }
            obj = obj[part];
        }

        return obj;
    }

    /**
     * Set a value of a child of the object using dot notation
     * @param obj
     * @param parts
     * @param value
     * @returns {any}
     */
    export function objectSet(obj, parts, value) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj = objectGet(obj, parts, true);
        if (obj && typeof obj === 'object') {
            return (obj[prop] = value);
        }
    }

    /**
     * Check if a child of the object exists using dot notation
     * @param obj
     * @param parts
     * @returns {boolean|any}
     */
    export function objectExists(obj, parts) {
        parts = getParts(parts);

        var prop = parts.pop();
        obj = objectGet(obj, parts);

        return typeof obj === 'object' && obj && prop in obj;
    }

    export function recurse(value:Object, fn:Function, fnContinue?:Function):any {
        function recurse(value, fn, fnContinue, state) {
            var error;
            if (state.objs.indexOf(value) !== -1) {
                error = new Error('Circular reference detected (' + state.path + ')');
                error.path = state.path;
                throw error;
            }

            var obj, key;
            if (fnContinue && fnContinue(value) === false) {
                // Skip value if necessary.
                return value;
            } else if (kindOf(value) === 'array') {
                // If value is an array, recurse.
                return value.map(function (item, index) {
                    return recurse(item, fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + '[' + index + ']',
                    });
                });
            } else if (kindOf(value) === 'object') {
                // If value is an object, recurse.
                obj = {};
                for (key in value) {
                    obj[key] = recurse(value[key], fn, fnContinue, {
                        objs: state.objs.concat([value]),
                        path: state.path + (/\W/.test(key) ? '["' + key + '"]' : '.' + key),
                    });
                }
                return obj;
            } else {
                // Otherwise pass value into fn and return.
                return fn(value);
            }
        }

        return recurse(value, fn, fnContinue, {objs: [], path: ''});
    }

    /**
     * Copy an object, creating a new object and leaving the old intact
     * @param object
     * @returns {T}
     */
    export function copyObject<T> (object:T):T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }

    /**
     * Flatten an object to a dot notated associative array
     * @param obj
     * @param prefix
     * @returns {any}
     */
    export function dotize(obj:any, prefix?:any) {
        if (!obj || typeof obj != "object") {
            if (prefix) {
                var newObj = {};
                newObj[prefix] = obj;
                return newObj;
            }
            else
                return obj;
        }

        var newObj = {};

        function recurse(o:any, p:any, isArrayItem?:any) {
            for (var f in o) {
                if (o[f] && typeof o[f] === "object") {
                    if (Array.isArray(o[f]))
                        newObj = recurse(o[f], (p ? p : "") + (isNumber(f) ? "[" + f + "]" : "." + f), true); // array
                    else {
                        if (isArrayItem)
                            newObj = recurse(o[f], (p ? p : "") + "[" + f + "]"); // array item object
                        else
                            newObj = recurse(o[f], (p ? p + "." : "") + f); // object
                    }
                } else {
                    if (isArrayItem || isNumber(f))
                        newObj[p + "[" + f + "]"] = o[f]; // array item primitive
                    else
                        newObj[(p ? p + "." : "") + f] = o[f]; // primitive
                }
            }

            if (isEmptyObj(newObj))
                return obj;

            return newObj;
        }

        function isNumber(f) {
            return !isNaN(parseInt(f));
        }

        function isEmptyObj(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }

        return recurse(obj, prefix);
    }

    export function applyMixins(derivedCtor:any, baseCtors:any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }

}
