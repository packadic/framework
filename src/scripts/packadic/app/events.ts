module packadic {
    /**
     *
     * @type {EventEmitter2}
     */

    //var ee2 = require('eventemitter2');

    export var defaultConfig:EventEmitter2Configuration = <EventEmitter2Configuration> {
        wildcard    : true,
        delimiter   : ':',
        newListener : true,
        maxListeners: 50
    };

    export abstract class EventEmitter extends EventEmitter2 {
        constructor(eventOptions = {}) {
            super(_.merge(defaultConfig, eventOptions));
        }
    }
}
