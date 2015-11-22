namespace packadic {

    export interface ISidebarItem {
        title?: string;
        icon?: string;
        children?: ISidebarItem[];
        href?:string;
        route?:string;
        path?:string;
        active?:boolean;
        type?: string; // path | route | href | folder | heading
    }

    export class SidebarItemComponent extends BaseComponent {
        static template:string = templates['sidebar-item'];


        @Prop({type: Object, required: false}) item:ISidebarItem;
        @Prop({type: String, required: false, 'default': ()=>''}) title:string;
        @Prop({type: String, required: false}) icon:string;
        @Prop({type: String, required: false, 'default': ()=>'javascript:;'}) href:string;
        @Prop({type: String, required: false, 'default': ()=>'href'}) type:string;
        @Prop({type: Boolean, required: false, 'default': ()=>false}) isActive:boolean;
        @Prop({type: Boolean, required: false, 'default': ()=>false}) hasChildren:boolean;
        @Prop({type: String, required: false, 'default': ()=>''}) route:string;
        @Prop({type: String, required: false, 'default': ()=>''}) path:string;

        children:any[] = [];
        isOpen:boolean = false;

        get hasSubmenu() {
            return (this.hasChildren === true || this.children.length > 0) && this.type === 'folder';
        }


        get link() {
            var link:any    = {
                type: this.type
            };
            link[this.type] = this[this.type];
            return link;
        }

        toggle() {
            this.isOpen ? this.close() : this.open(true);
        }

        isType(...args:string[]) {
            return args.indexOf(this.type) !== -1;
        }

        close() {
            this.isOpen = false;
        }

        open(closeOthers:boolean = false) {
            if (!this.hasSubmenu) return;
            if (closeOthers) this.$parent.$eval('closeSubmenus()');
            this.isOpen = true;
        }

        /**
         * the event propagation will follow many different “paths”. The propagation for each path will stop when a listener callback is fired along that path, unless the callback returns true.
         * http://vuejs.org/api/#vm-broadcast
         * @returns {boolean}
         */
        @EventHook('closeSubmenus') closeSubmenus():boolean {
            this.close();
            return true;
        }

        @LifecycleHook('beforeCompile') beforeCompile():void {
            if (defined(this.item))
                Object.keys(this.item).forEach((key:string) => {
                    this[key] = this.item[key];
                });
        }
    }

    /* */
// C    sidebar
    /* */
    @Component('sidebar', {'item': SidebarItemComponent})
    export class SidebarComponent extends BaseComponent {


        @Prop({type: Array, required: false}) items:ISidebarItem[];

        get bodyClass():DOMTokenList {
            return document.body.classList;
        }

        ensureBodyClass(name:string, shouldExist:boolean = true):SidebarComponent {
            if (shouldExist && !this.bodyClass.contains(name)) {
                this.bodyClass.add(name);
            } else if (!shouldExist && this.bodyClass.contains(name)) {
                this.bodyClass.remove(name);
            }
            this._digest();
            return this;
        }

        get closed():boolean {
            return this.bodyClass.contains('page-sidebar-closed');
        };

        set closed(value:boolean) {
            this.closeSubmenus();
            this.ensureBodyClass('page-sidebar-closed', value);
        };

        get hidden():boolean {
            return this.bodyClass.contains('page-sidebar-hide');
        };

        set hidden(value:boolean) {
            this.ensureBodyClass('page-sidebar-closed', value)
                .ensureBodyClass('page-sidebar-hide', value);
        };

        get condensed():boolean {
            return this.bodyClass.contains('page-sidebar-condensed');
        };

        set condensed(value:boolean) {
            this.ensureBodyClass('page-sidebar-condensed', value);
        };

        toggle() {
            if (this.closed) {
                this.closed = false;
            } else {
                this.closed = true;
            }
        }

        closeSubmenus() {
            this.$broadcast('closeSubmenus');
        }
    }

    @Transition('sidebar-submenu', false)
    export class SlideToggleTransition extends BaseJqueryTransition {
        enter(el:HTMLElement, done) {
            $(el).slideDown(400, 'linear', done);
        }

        leave(el:HTMLElement, done) {
            $(el).slideUp(250, 'linear', done);
        }
    }


    /* */
// D    sidebar
    /* */
    @Directive('sidebar')
    export class SidebarDirective extends BaseDirective {
        static params:any[] = ['s-action', 's-on'];

        update(oldVal:any, newVal:any) {
            this.el['on' + this.params['sOn']] = () => {
                var action:any               = this.params['sAction'];
                var sidebar:SidebarComponent = this.vm.$root.$refs['sidebar'];
                if (typeof sidebar[action] === 'undefined') {
                    log.warn('SidebarActionDirective could not do action ' + action);
                    return;
                }
                sidebar[action].call();
                //sidebar.hide();
                //action = sidebar[action];
                // action(this);
            }
        }
    }
}
