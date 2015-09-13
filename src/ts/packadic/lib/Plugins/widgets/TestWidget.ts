module packadic.plugins {
    export class TestWidget extends Widget {
        _create():any {
            console.log('TestWidget create');
        }

    }

    Widget.register('testWidget', new TestWidget);
}
