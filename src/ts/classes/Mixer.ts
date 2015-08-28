/// <reference path="../types.d.ts" />
import {applyMixin} from '../modules/utilities';
import $ = require('jquery');

class Mixer {
    public static mix(Other){
        applyMixin(Mixer, Other);
    }
}
export = Mixer;
