var tests = Object.keys(window.__karma__.files).filter(function (file) {
      return /Spec\.js$/.test(file);
});

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
