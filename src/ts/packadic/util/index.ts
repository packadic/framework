
module packadic.util {

    export var str:UnderscoreStringStatic = s;
    export var arr:_.LoDashStatic = _;

    export module num {
        /**
         * Round a value to a precision
         * @param value
         * @param places
         * @returns {number}
         */
        export function round(value, places) {
            var multiplier = Math.pow(10, places);
            return (Math.round(value * multiplier) / multiplier);
        }

    }

    /**
     * Create a string from an object
     *
     * @param object
     * @returns {any}
     */
    export function makeString(object) {
        if (object == null) return '';
        return '' + object;
    }


    export function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + str.escapeRegExp(characters) + ']';
    }

}
