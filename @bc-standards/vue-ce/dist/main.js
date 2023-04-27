import { createApp, getCurrentInstance, defineCustomElement } from 'vue';

const styleNodeSym = Symbol('style node');
function createStyleBlock(styles, target) {
    while (![Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(target.nodeType)) {
        if (target.parentNode === null)
            throw 'Could not inject styling!';
        target = target.parentNode;
    }
    const el = target;
    const styleBlock = document.createElement('style');
    styleBlock.innerText = styles.join().replace(/[\r\n]+/g, '');
    el.prepend(styleBlock);
    return styleBlock;
}
function defineCERoot(component) {
    const setup = component.setup;
    component.setup = function (...args) {
        const app = createApp({});
        app.mixin({
            //any component that we create needs to copy their style to the shadow root(mounted)
            mounted() {
                if (this.$options.styles) {
                    this[styleNodeSym] = createStyleBlock(this.$options.styles, this.$el);
                }
            },
            unmounted() {
                //any component that we created needs to remove their style from the shadow root(unmounted)
                const styleBlock = this[styleNodeSym];
                if (styleBlock !== undefined) {
                    styleBlock.remove();
                    this[styleNodeSym] = undefined;
                }
            }
        });
        const inst = getCurrentInstance();
        if (inst)
            inst.appContext = app._context;
        return setup(...args);
    };
    /**
     * JWargo was able to review the vue source and determine
     * they use the number of arguments to setup to determine
     * if they can skip some of the work to setup a component.
     * So in order for vue component construction to know
     * what peices of setup are in play, we have to carry
     * forward the original length.
     */
    Object.defineProperty(component.setup, 'length', {
        get: () => setup.length,
        set: () => undefined,
    });
    return defineCustomElement(component);
}

export { defineCERoot };
