/// <reference path="../types.d.ts" />
import Packadic = require('./../Packadic');
import $ = require('jquery');
import util  = require('./../modules/utilities');
import {IConfigProperty} from './../modules/configuration';

class BaseApp {
    protected p:Packadic;

    constructor(p:Packadic) {
        this.p = p;
        p.on('init', this._init.bind(this));
        p.on('boot', this._boot.bind(this));
        p.on('booted', this._booted.bind(this));
    }

    protected get config():IConfigProperty {
        return this.p.config;
    }

    private _boot() {
        this.boot();
    }

    private _init() {
        this.init();
    }

    private _booted() {
        this.booted();
    }

    public boot() {

    }

    public init() {

    }

    public booted() {

    }
}
export = BaseApp;
