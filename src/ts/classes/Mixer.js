/// <reference path="../types.d.ts" />
var utilities_1 = require('../modules/utilities');
var Mixer = (function () {
    function Mixer() {
    }
    Mixer.mix = function (Other) {
        utilities_1.applyMixin(Mixer, Other);
    };
    return Mixer;
})();
module.exports = Mixer;
//# sourceMappingURL=Mixer.js.map