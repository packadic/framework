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

App.share('paginator', () => pagination.create('search', {prelink: '/', current: 1, rowsPerPage: 10, totalResult: 0}));


@Component('grid')
export class GridComponent extends BaseComponent {
    static template = `
    <table class="table">
        <thead>
            <tr>
                <th v-for="column in columns" v-on:click="sortBy(column)" v-bind:class="{ 'dropup': reversed[column] }">
                    {{column | capitalize}}
                    <span v-bind:class="{ 'caret': sortColumn == column }"></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in currentPage | orderBy sortColumn reversed[sortColumn]">
                <td v-for="column in columns">
                {{row[column]}}
                </td>
            </tr>
        </tbody>
    </table>
    `;

    @Prop({type: Array}) rows:any[];
    @Prop({type: Array}) columns:any[];
    @Prop({type: String}) filterKey:string;
    @Prop({type: Number, 'default': 10}) perPage:number;
    @Prop({type: String}) shareId:string;

    sortColumn:string;
    reversed:any            = {};
    paginator:NpmPagination = Object.create({});

    get pager():NpmPaginationData {
        return this.paginator.getPaginationData();
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
        this.sortColumn       = column;
        this.reversed[column] = !this.reversed[column];
    }

    @LifecycleHook('beforeCompile') beforeCompile() {
        this.$data.paginator = App.shared(this.shareId, 'paginator');
    }

    @LifecycleHook('compiled') compiled() {
        this.$watch('rows', ()=> {
            this.paginator.set('rowsPerPage', this.perPage);
            this.paginator.set('totalResult', this.filteredRows.length);
        });
        this.columns.forEach((column) => this.$set('reversed.' + column, false))
    }
}

@Component('pagination')
export class PaginationComponent extends BaseComponent {
    static template = `
    <ul class="pagination">
        <li>
            <a href="#" aria-label="Previous" v-on:click="prev($event)">
                <slot name="previous"><span aria-hidden="true">&laquo;</span></slot>
            </a>
        </li>
        <li v-for="c in pager.range" v-bind:class="{ 'active': isCurrent(c) }">
            <a href="#" v-on:click="goto(c,$event)">{{c}}</a>
        </li>
        <li>
            <a href="#" aria-label="Next" v-on:click="next($event)">
                <slot name="next"><span aria-hidden="true">&raquo;</span></slot>
            </a>
        </li>
    </ul>
    `;

    @Prop({type: String}) shareId:string;
    @Prop({type: Number, default: 10}) maxLinks:number;

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

    goto(index:number,event:MouseEvent){
        event.preventDefault();
        this.paginator.set('current', index);
    }

    next(event:MouseEvent) {
        event.preventDefault();
        if(!this.pager.next) return;
        this.paginator.set('current', this.pager.next);
    }

    prev(event:MouseEvent) {
        event.preventDefault();
        if(!this.pager.previous) return;
        this.paginator.set('current', this.pager.previous);
    }

}

