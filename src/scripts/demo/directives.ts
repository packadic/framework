
import * as _ from 'lodash';
import {
    App,Vue,app,
    Directive,ParamWatcher,BaseDirective
} from './../packadic/index';



@Directive('page-loader')
export class PageLoaderDirective extends BaseDirective {
    static params:any[] = ['loader'];

    @ParamWatcher('show')
    watchShow(val:any, oldVal:any) {
        console.log('watch show');
    }

    update(showLoader:any,odlval:any){          // console.log('page-laode update', showLoader);
        var hasClass:boolean = this.el.classList.contains('page-loading');
        showLoader === true && hasClass === false && this.el.classList.add('page-loading');
        showLoader === false && hasClass === true && this.el.classList.remove('page-loading');
    }
}


@Directive('test-directive')
export class TestDirective extends BaseDirective {
    static params:any[] = ['a'];

    @ParamWatcher('a')
    watchA(val:any, oldVal:any) {
        console.log('watch a')
    }
}
