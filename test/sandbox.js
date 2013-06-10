// xtag polymer
var polyLib = 'polymer';

requirejs.config({
    paths: {
        text: '../components/requirejs-text/text',
        wc: '../wc',
        polymer: '../components/polymer/polymer.min',
        xtag: '../components/x-tag-core/src/core',
        wcp: '../components/x-tag-core/lib/web-components-polyfill'
    },
    shim: {
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag' }
    },
    config: {
        ws: {
            standardModule: 'wcp',
            xTagModule: 'xtag',
            polymerModule: 'polymer',
            debug: true
        }
    }
});

var deps = [polyLib];

if (polyLib === 'xtag') {
    deps.push('wcp');
} else {
    document.body.style.opacity = 1;
}

require([
    // imperative way
    'wc!tags/std-js1!imp',
    'wc!tags/poly-js1!imp!polymer',
    'wc!tags/xtag-js1!imp!xtag',

    // declarative way
    'wc!tags/poly-html1.html!dec!polymer',
    'wc!tags/std-html1.html!dec',
    'wc!tags/std-html2.html!dec'
], function () {
    Array.prototype.forEach.call(arguments, function (Component) {
        if (Component) {
            var div = document.createElement('div');
            var cp = new Component();
            div.appendChild(cp);
            document.body.appendChild(div);
        }
    });

    var div1 = document.createElement('div');
    var cp1 = document.createElement('std-html1');
    div1.appendChild(cp1);
    document.body.appendChild(div1);

    var div2 = document.createElement('div');
    var cp2 = document.createElement('std-html2');
    div2.appendChild(cp2);
    document.body.appendChild(div2);

});
