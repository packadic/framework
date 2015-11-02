
import {
    makeDecorator,
    makeParamDecorator,
    makePropDecorator,
    TypeDecorator,
    Class,
    CONST
} from './decorators';

export interface ModuleDecorator extends TypeDecorator {}
export interface ModuleFactory {
    (obj:{
        name?:string,
        configFns?:string[]
    }): ModuleDecorator;
    new (obj: {
        name?:string,
        configFns?:string[]
    }): ModuleMetadata;
}

@CONST()
export class ModuleMetadata  {
    name:string;
    configFns:string[];

    constructor({name}:{name?:string}={}){
        this.name = name;

        var meta:any = {
            annoInstance: Reflect.getOwnMetadata('annotations', this),
            annoConstructor: Reflect.getOwnMetadata('annotations', this.constructor),
            propInstance: Reflect.getOwnMetadata('propMetadata', this),
            propConstructor: Reflect.getOwnMetadata('propMetadata', this.constructor)
        };

        console.log('ModuleMetadata', this, 'meta', meta);
    }
}
export var Module: ModuleFactory = <ModuleFactory>makeDecorator(ModuleMetadata, function(fn: any) {
    console.log('me', 'fn', fn, 'this', this);
    fn.me = {'fn': fn};
});


export interface ModuleConfigFactory {
    $inject?:string[];
    ($inject?: string[]): any;
    new ($inject?: string[]): any;

}

@CONST()
export class ModuleConfigMetadata {
    constructor(
        public $inject?:string[]
    ){
        console.log('ModuleConfigMetadata', this);
    }
}
export var ModuleConfig: ModuleConfigFactory = makePropDecorator(ModuleConfigMetadata);
