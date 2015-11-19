import * as _ from 'lodash';
import { App,Vue, Transition,ITransition } from './../app';

export abstract class BaseTransition implements ITransition {
    abstract enter(el:HTMLElement, done);

    enterCancelled(el) {
        $(el).stop()
    }

    leaveCancelled(el) {
        $(el).stop()
    }
}

@Transition('fade', false)
export class PageLoaderTransition implements ITransition {
    enter(el:HTMLElement, done) {
        $(el)
            .css('opacity', 0)
            .animate({opacity: 1}, 1000, done);
    }

    enterCancelled(el) {
        $(el).stop()
    }

    leave(el, done) {
        // same as enter
        $(el).animate({opacity: 0}, 1000, done)
    }

    leaveCancelled(el) {
        $(el).stop()
    }
}


