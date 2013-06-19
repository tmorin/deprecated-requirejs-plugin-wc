requirejs.config({
    baseUrl: '../',
    paths: {
        text: 'components/requirejs-text/text',
        wc: 'wc',
        polymer: 'components/polymer/polymer.min',
        xtag: 'components/x-tag-core/src/core',
        mocha: 'node_modules/mocha/mocha',
        chai: 'node_modules/chai/chai'
    },
    shim: {
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag' },
        chai: { exports: 'chai' },
        mocha: { exports: 'mocha' }
    },
    config: {
        ws: {
            standardModule: 'polymer',
            xTagModule: 'xtag',
            polymerModule: 'polymer',
            debug: false
        }
    },
    urlArgs: "v="+(new Date()).getTime()
});

require([
    'mocha',
    'chai'
], function (
    mocha,
    chai
) {
    "use strict";

    mocha.setup({
        ui: 'bdd',
        slow: 1000,
        timeout: 30000
    });

    // mocha css
    var mochaCss = document.createElement('link');
    mochaCss.rel = 'stylesheet';
    mochaCss.href = '../components/mocha/mocha.css';
    document.head.appendChild(mochaCss);

    // mocha div
    var mochaDiv = document.createElement('div');
    mochaDiv.id = 'mocha';
    document.body.appendChild(mochaDiv);

    require([
        'test/dec.poly.spec',
        'test/dec.std.spec',
        'test/imp.std.spec',
        'test/imp.xtag.spec'
    ], function () {

        //mocha.checkLeaks();
        //mocha.bail(false);
        mocha.run();
    });
});
