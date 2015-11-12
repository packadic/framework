import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import * as packadic from 'packadic';

export var app:packadic.App = packadic.App.instance;
app.init({}).start();

