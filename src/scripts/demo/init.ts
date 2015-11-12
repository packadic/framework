import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';

import * as _ from 'lodash';
import {app} from './../packadic/index';

app
    .init({
        debug: true
    })
    .start()
    ;

