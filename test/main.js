
requirejs.config({
    paths: {
        text: '../components/requirejs-text/text',
        wc: '../wc',
        polymer: '../components/polymer/polymer.min',
        xtag: '../components/x-tag-core/src/core',
        wcp: '../components/x-tag-core/lib/web-components-polyfill',
        mocha: '../components/mocha/mocha',
        chai: '../components/chai/chai'
    },
    shim: {
        polymer: { exports: 'Polymer' },
        xtag: { exports: 'xtag' },
        mocha: { exports: 'mocha' },
        chai: { exports: 'chai' }
    },
    config: {
        ws: {
            standardModule: 'wcp',
            xTagModule: 'xtag',
            polymerModule: 'polymer',
            debug: true
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

    mocha.setup('bdd');

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
        './imp.std.test'
    ], function () {

        describe("a test group", function () {
            it("something should that", function () {
                var somthing = "that";
                chai.assert.equal(somthing, 'that');
            });
        });

        mocha.checkLeaks();
        //mocha.bail(false);
        mocha.run();
    });
});
