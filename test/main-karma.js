var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    baseUrl: '/base',
    paths: {
        text: 'components/requirejs-text/text',
        wc: 'wc',
        polymer: 'components/polymer/polymer.min',
        xtag: 'components/x-tag-core/src/core',
        chai: 'node_modules/chai/chai'
    },
    shim: {
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag' },
        chai: { exports: 'chai' }
    },
    config: {
        ws: {
            standardModule: 'polymer',
            xTagModule: 'xtag',
            polymerModule: 'polymer',
            debug: true
        }
    },
    deps: tests,
    callback: window.__karma__.start,
    //urlArgs: "v="+(new Date()).getTime()
});
