import * as _ from 'lodash';
import {
    App,Vue,app,
    Transition,ITransition
} from './../packadic/index';


/* */
//      page-loader
/* */
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
