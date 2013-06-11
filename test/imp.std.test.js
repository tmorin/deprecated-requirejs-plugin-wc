require([
    'mocha',
    'chai'
], function (
    mocha,
    chai
) {
    "use strict";

    var assert = chai.assert,
        expect = chai.expect,
        should = chai.should();

    describe("dummy test case", function () {
        describe("dummy test sub-case", function () {
            it("blaah should be blaah", function () {
                var toto = "blaah";
                assert.equal(toto, 'blaah');
            });
            it("tqtq should be tata", function (done) {
                var toto = "tata";
                assert.equal(toto, 'tata');
                done();
            });
        });
    });


});
