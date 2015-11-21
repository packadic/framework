import * as _ from 'lodash';
import {defined,getViewPort} from './../../lib';
import {
    App,
    Component, LifecycleHook, BaseComponent, Prop, EventHook,
    Directive,ParamWatcher,BaseDirective,
    Transition,ITransition,BaseJqueryTransition, log,
} from './../../app';
import {BaseJqueryTransition} from "../../app/addons/transition";
import {ILink,LinkComponent} from './routing';
import pagination from 'pagination';
import gridTemplate from './../../views/grid.html!text'
import paginationTemplate from './../../views/pagination.html!text'



class SharedGridData {
    protected _paginator:NpmPagination;
    public get paginator():NpmPagination {return this._paginator};

    protected _grid:GridComponent;
    public get grid():GridComponent {return this._grid };

    rows:any[];
    columns:any[];


    constructor(grid:GridComponent){
        this._grid = grid;
        this._paginator = pagination.create('search', {prelink: '/', current: 1, rowsPerPage: 10, totalResult: 0});
    }
}
//App.share('grid-data', (grid:GridComponent) => new SharedGridData(grid));

App.share('paginator', () => pagination.create('search', {prelink: '/', current: 1, rowsPerPage: 10, totalResult: 0}));


@Component('grid')
export class GridComponent extends BaseComponent {
    static template = gridTemplate;

    @Prop({type: Array}) rows:any[];
    @Prop({type: Array}) columns:any[];
    @Prop({type: String}) filterKey:string;
    @Prop({type: Number, 'default': 10}) perPage:number;
    @Prop({type: String}) shareId:string;

    sortColumn:string       = '';
    reversed:any            = {};
    paginator:NpmPagination = Object.create({});


    get pager():NpmPaginationData {
        return this.$data.paginator.getPaginationData();
    }

    get filteredRows() {
        return this.$options.filters.filterBy(this.rows, this.filterKey);
    }

    get currentPage() {
        if (this.paginator) {
            return this.filteredRows.slice(this.pager.fromResult, this.pager.toResult);
        }
        return [];
    }

    sortBy(column) {
        this.$set('sortColumn', column);
        this.$data.reversed[column] = !this.$data.reversed[column];
    }

    @LifecycleHook('created') beforeCompile() {
        this.$data.paginator = App.shared(this.shareId, 'paginator');
        //this.$data.shared = App.shared(this.shareId, 'grid-data', this);
    }

    @LifecycleHook('compiled') compiled() {
        this.$watch('rows + perPage', ()=> {
            this.paginator.set('rowsPerPage', this.perPage);
            this.paginator.set('totalResult', this.filteredRows.length);
        });
        this.$watch('sortColumn + reversed', () => this.columns.forEach((column) => this.$set('reversed.' + column, false)));

    }
}

@Component('pagination')
export class PaginationComponent extends BaseComponent {
    static template = paginationTemplate;

    @Prop({type: String}) shareId:string;
    @Prop({type: Number, default: 5}) maxLinks:number;

    paginator:NpmPagination = Object.create({});

    @LifecycleHook('beforeCompile') beforeCompile() {
        this.$data.paginator = App.shared(this.shareId, 'paginator');
        this.$data.paginator.set('pageLinks', this.maxLinks);

    }

    get pager():NpmPaginationData {
        return this.paginator.getPaginationData();
    }

    isCurrent(index) {
        return this.paginator.getPaginationData().current === index;
    }

    goto(index:number, event:MouseEvent) {
        event.preventDefault();
        this.paginator.set('current', index);
    }

    next(event:MouseEvent) {
        event.preventDefault();
        if (!this.pager.next) return;
        this.paginator.set('current', this.pager.next);
    }

    prev(event:MouseEvent) {
        event.preventDefault();
        if (!this.pager.previous) return;
        this.paginator.set('current', this.pager.previous);
    }

}

@Directive('grid')
export class GridDirective extends BaseDirective {
    static params:any[] = ['share-id'];
    get paginator():NpmPagination {
        return App.shared(this.params.shareId, 'paginator');
    }

    get pager():NpmPaginationData {
        return this.paginator.getPaginationData();
    }


    bind(){

    }

    update(value:any){}
}
