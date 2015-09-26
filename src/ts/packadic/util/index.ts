module packadic.util {

    export var str:UnderscoreStringStatic = s;
    export var arr:_.LoDashStatic = _;

    export function codeIndentFix(str:string) {
        var fix = (code:string, leading:boolean = true) => {
            var txt = code;
            if (leading) {
                txt = txt.replace(/^[\r\n]+/, "").replace(/\s+$/g, "")	// strip leading newline
            }


            if (/^\S/gm.test(txt)) {
                return code;
            }

            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

            while (mat = re.exec(txt)) {
                len = mat[0].length;

                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }


            if (min == 1e3)
                return code;

            console.log(str);
            return txt.replace(new RegExp("^" + str, 'gm'), "");
        };
        return fix(str);
    }

    export function preCodeIndentFix(el:HTMLElement) {
        return codeIndentFix(el.textContent);
    }

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
