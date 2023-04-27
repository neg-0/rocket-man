/**
 * Web Components in Vue 3 have one MAJOR flaw --
 * CSS from nested components doesn't get applied ever.
 *
 * To resolve this issue we will need to compile all the
 * components, nested and root, in web component mode.
 * This will inline the style tags as strings of CSS and
 * exposes them under the component's styles option.
 *
 * However, the styles are still not placed on the
 * shadow root that the web component uses, so we will
 * create a mixin so that when mounted/unmounted
 * we can grab the options style string and add it to
 * most-parent which will be the shadow root as a
 * style tag.
 **/
import type { defineComponent } from 'vue';
import { defineCustomElement } from 'vue';
export declare function defineCERoot(component: ReturnType<typeof defineComponent>): ReturnType<typeof defineCustomElement>;
