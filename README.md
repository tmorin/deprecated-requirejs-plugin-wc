requirejs-plugin-wc
===================

This plugin provides loading support about [Web Components](http://www.w3.org/standards/techs/components#w3c_all).

Presently [Custom elements](http://www.w3.org/TR/2013/WD-custom-elements-20130514/) and
[HTML Imports](http://www.w3.org/TR/2013/WD-html-imports-20130514/) are supported.

## Requirements

The [Web Components](http://www.w3.org/standards/techs/components#w3c_all) standards are new and yet in draft.

To be used, the browsers have to be polyfied. The sub project platform of [Polymer.og](http://www.polymer-project.org/)
is there to do it. The [Polymer.og](http://www.polymer-project.org/) project provides additionnals features
to make easiest the development of Web Components.

In an other hand, the project [x-tags.org](http://www.x-tags.org/), use the platform project provided by
[Polymer.og](http://www.polymer-project.org/) to provide additionnals features too.

[Polymer element](http://www.polymer-project.org/polymer.html) enhance the declarative way (i.e. HTML),
where as [x-tags](http://www.x-tags.org/docs) (which used the Ploymer platform) is focused on the imperative way (i.e. js).

According to the capabitlites of the libraries presented above, this plugins is able to load:
*   standard custom elements defined using the imperative way (require the Polymer platform only)
*   standard custom elements defined using the declarative way (require the Polymer platform only)
*   Polymer elements defined using the declarative way (require Polymer)
*   x-tags elements defined using the imperative way (require x-tags)

To specify the way to load, theris some options to append to the module URL:
*   !dec: the custom elements is described using a declarative way
*   !imp: the custom elements is described using an imperative way
*   !polymer: the Polymer's features will be used
*   !xtag: the xtags' features will be used

Where:
*   !dec and !imp are exclusive
*   !polymer and !xtag are exclusive
*   !polymer and !xtag are optional
*   if !polymer and !xtag are missing, consider its standard

When the declarative way is used, the module can contain "import" elements. The plugin will load theses

## Setup

```
// requirejs config
requirejs.config({
    paths: {
        text: '...', // path to the text requirejs' plugins
        wc: '...', // path to the wc requirejs' plugins
        polymer: '...', // path to the polymer library
        xtag: '...' // path to the xtag library
    },
    shim: { // shim support for polymer and xtag
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag' }
    },
    config: {
        ws: { // wc's config zone
            standardModule: 'polymer', // must be declated path
            xTagModule: 'xtag', // must be declated path
            polymerModule: 'polymer', // must be declated path
            debug: true // active or not debug information
        }
    }
});
```

## Usage (basic)

## standard and declarative way

```
<!-- std-html1.html -->
<element name="std-html1">
    <section>I'm std-html1!</section>
    <footer>nothing to see here</footer>
    <script>
        if (this !== window) {
            var section = this.querySelector('section');
            this.register({
                prototype: {
                    readyCallback: function () {
                        this.innerHTML = section.innerHTML;
                    }
                }
            });
        }
    </script>
</element>
```

```
// load the std-html1 custom element based the standard features
// !dec: because the custom element is described using a declarative way
require(['wc!std-html1.html!dec',], function (Tag) {
    // Tag is null (unless if the constructor attribute is not set)
});
```

## polymer and declarative way

```
<!-- poly-html1.html -->
<element name="poly-html1" constructor="PolyHtml1">
    <template>Im poly-html1!</template>
    <script>
        Polymer.register(this, {
            att1: 'value1'
        });
    </script>
</element>
```

```
// load the a_path/a_file.html custom element based the Polymer features
// !dec: because the custom element is described using a declarative way
// !polymer: because the custom element is described using the exclusive Polymer features
require(['wc!a_path/a_file.html!dec!polymer',], function (Tag) {
    // Tag is null (unless if the constructor attribute is not set)
});
```

## standard and imperative way

```
<!-- std-js1.js -->
define([], function () {
    var StdJs1Prototype = Object.create(HTMLElement.prototype);
    StdJs1Prototype.readyCallback = function() {
        this.textContent = "I'm std-js1!";
    };
    return {
        prototype: StdJs1Prototype
    };

});
```

```
// load the std-js1 custom element based on the standard
// !dec: because the custom element is described using an imperative way
require(['wc!std-js1!imp',], function (Tag) {
    // the custom element class
});
```

## xtag and imperative way

```
<!-- xtag-js1.js -->
define([], function () {
    return {
        lifecycle: {
            created: function () {
                this.innerHTML = 'I\'m xtag-js1!';
            },
            inserted: function () {
                console.log('xtag-js1', 'inserted');
            }
        }
    };
});
```

```
// load the xtag-js1 custom element based on the standard
// !dec: because the custom element is described using an imperative way
require(['wc!xtag-js1!imp!xtag',], function (Tag) {
    // the custom element class
});
```

## Usage (with import)

Using the declarative way, the plugin is able to detect "import" elements.
By this way the imported custome elements will be load before.
This functionality works only with the declarative way.

```
<!-- std-html3.html -->
<element name="std-html3">
    <section>I'm std-html3!</section>
    <footer>nothing to see here</footer>
    <script>
            console.log('outside', this);
        // When <element> is in document, might run in wrong context.
        // Only do work when this == <element>.
        if (this !== window) {
            console.log('inside', this);
            var section = this.querySelector('section');
            this.register({
                prototype: {
                    readyCallback: function () {
                        this.innerHTML = section.innerHTML;
                    }
                }
            });
        }
    </script>
</element>
```
```
<!-- std-html2.html -->
<link rel="import" href="std-html3.html">
<element name="std-html2">
    <section>
        I'm std-html2!
        <std-html3></std-html3>
    </section>
    <footer>nothing to see here</footer>
    <script>
        // When <element> is in document, might run in wrong context.
        // Only do work when this == <element>.
        if (this !== window) {
            console.log('inside', this);
            var section = this.querySelector('section');
            this.register({
                prototype: {
                    readyCallback: function () {
                        this.innerHTML = section.innerHTML;
                    }
                }
            });
        }
    </script>
</element>
```

```
// load the std-html2 custom element based the standard features
// !dec: because the custom element is described using a declarative way
require(['wc!std-html2.html!dec',], function (Tag) {
    // Tag is null (unless if the constructor attribute is not set)
    // however the custom elements std-html3 has been loaded too
});
```