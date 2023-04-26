# 1.0 Beast Code Vue Custom Element
This project provides support for vue-based web component from a vue file and retain the styling from all subcomponents.

## 1.1 `defineCERoot`
Vue provides defineCustomElement to take a vue component and produce a web component. When a custom element is created it is placed in a shadow root which will be the root from the perspective of any code running in the custom element. Vue also provides the ability to compile vue components in `custom element mode` where the components style tags are inlined as strings of CSS and exposes them under the component's styles option. The support for vue custom neglects to provide the style for subcomponents in the shadow root.

defineCERoot is a function to wrap all your `custom element mode` compiled components into a handy web component with all the subordinant style included. This works with scoped and non-scoped style.

Simply use it like you would `defineCustomElement`, except that it includes the styling for all nested `custom element mode` compiled components as well as the root custom element.

# 2.0 Consumption

- {- Note: The Components must be compiled in -} `custom element mode` {- or the style won't be captured. -}

This package has a peer dependency on Vue 3.2.x.

Vite/Rollup has a problem where it will try to resolve `import 'vue'` through this `node_modules` even though it is only a peer dependency, causing it to fail.

The solution is to use `@rollup/plugin-node-resolve` in the vite/rollup configuration, and `dedupe: ['vue']` as described [here](https://www.npmjs.com/package/@rollup/plugin-node-resolve#dedupe)

# 3.0 Use with NPM Registry
Projects using this repository should define `@bc-standards:registry` to `https://gitlab.phactory.beast-code.com/api/v4/packages/npm`.

Any users of those projects will need to [create an auth token](https://gitlab.phactory.beast-code.com/-/profile/personal_access_tokens) with the `api` permission. They will also need to register this token to `//gitlab.phactory.beast-code.com/api/v4/packages/npm:_authToken`.

# 4.0 Updates
When releases are made set 'publish' to true and gitlab ci will publish the package to the registry.
