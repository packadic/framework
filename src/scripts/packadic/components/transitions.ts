import * as _ from 'lodash';
import { App,Vue, Transition,ITransition } from './../app';

export abstract class BaseTransition implements ITransition {
    enterCancelled(el) {
        $(el).stop()
    }

    leaveCancelled(el) {
        $(el).stop()
    }
}

function _speed(el:HTMLElement, def:number = 500):number {
    return el.hasAttribute('transition-speed') ? parseInt(el.getAttribute('transition-speed')) : def;
}

@Transition('fade', false)
export class FadeTransition extends BaseTransition {
    enter(el:HTMLElement, done) {
        var speed:number = _speed(el);
        $(el)
            .css('opacity', 0)
            .animate({opacity: 1}, speed, done);
    }

    leave(el, done) {
        var speed:number = _speed(el);
        $(el).animate({opacity: 0}, speed, done)
    }
}
@Transition('fadein', false)
export class FadeInTransition extends BaseTransition {
    enter(el:HTMLElement, done) {
        var speed:number = _speed(el);
        $(el)
            .css('opacity', 0)
            .animate({opacity: 1}, speed, done);
    }
}
@Transition('fadeout', false)
export class FadeOutTransition extends BaseTransition {
    leave(el, done) {
        var speed:number = _speed(el);
        $(el).animate({opacity: 0}, speed, done)
    }
}


@Transition('view-fade', false)
export class ViewFadeTransition extends BaseTransition {
    enter(el:HTMLElement, done) {
        var speed:number = _speed(el);
        $(el)
            .css({'margin-left': 100, 'opacity': 0})
            .animate({'margin-left': 0, 'opacity': 1}, speed, done);
    }

    leave(el:HTMLElement, done) {
        var speed:number = _speed(el);
        $(el)
            .css({'margin-left': 0, 'opacity': 1})
            .animate({'margin-left': 100, 'opacity': 0}, speed, done);
    }
}

