requirejs-plugin-wc
===================

Web components loading support for requirejs

## Specifications

### Story: the plugin should be able to make available web components based on a imperative way.

#### Scenario: load a web component using the standard API (document.register).
```
Given a configuration based on requirejs
And a configured polymer module
And a configured xtag module
And a polyfill platform module
And no default mode configured
And no default platform configured
And the existing javascript file: tags/std-js1.js
When the module tags/std-js1 is required
And the option mode is imp
And the option platform is empty
Then the web component definition should be available
And a web component instance should be created via javascript (via the returned javascript object instance)
And a web component instance should be created via HTML (via HTML tag std-js1)
```

#### Scenario: load a web component using the x-tag API (xtag.register).
```
Given a configuration based on requirejs
And a configured polymer module
And a configured xtag module
And a polyfill platform module
And no default mode configured
And no default platform configured
And the existing javascript file: tags/xtag-js1.js
When the module tags/xtag-js1 is required
And the option mode is imp
And the option platform is xtag
Then the web component definition should be available
And a web component instance should be created via javascript (via the returned javascript object instance)
And a web component instance should be created via HTML (via HTML tag xtag-js1)
```

#### Scenario: load a web component using the polymer API (Polymer.register).
```
Given a configuration based on requirejs
And a configured polymer module
And a configured xtag module
And a polyfill platform module
And no default mode configured
And no default platform configured
And the existing javascript file: tags/poly-js1.js
When the module tags/poly-js1 is required
And the option mode is imp
And the option platform is polymer
Then the web component definition should be available
And a web component instance should be created via javascript (via the returned javascript object instance)
And a web component instance should be created via HTML (via HTML tag poly-js1)
```


### Story: the plugin should be able to make available web components based on a delcarative way.




### Story: the plugin should be able to make available linked web components based on a delcarative way.
