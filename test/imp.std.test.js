define([
    'mocha',
    'chai'
], function (
    mocha,
    chai
) {
    "use strict";

    var expect = chai.expect,
        divImp = document.createElement('div'),
        divDec = document.createElement('div');

    divImp.hidden = true;
    divDec.hidden = true;

    /*
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
        And a web component instance should be created via javascript
        And a web component instance should be created via HTML
    */
    describe("Given a configuration based on requirejs", function () {

        beforeEach(function () {
            divImp.innerHTML = '';
            divDec.innerHTML = '';
        });

        describe("Load using the imperative way", function () {

            it("Load std-js1.js", function (done) {
                require(['wc!tags/std-js1!imp',], function (Tag) {
                    var tagInnerHtml = 'I\'m std-js1!',
                        tagName = 'std-js1';

                    expect(Tag).to.be.not.null;

                    var tagImp = new Tag();
                    divImp.appendChild(tagImp);
                    document.body.appendChild(divImp);
                    expect(tagImp.innerHTML).to.equal(tagInnerHtml);

                    var tagDev = document.createElement(tagName);
                    divImp.appendChild(tagDev);
                    document.body.appendChild(divImp);
                    expect(tagDev.innerHTML).to.equal(tagInnerHtml);

                    done();
                });
            });

            it("Load poly-js1.js", function (done) {
                require(['wc!tags/poly-js1!imp!polymer',], function (Tag) {
                    var tagInnerHtml = 'I\'m poly-js1!',
                        tagName = 'poly-js1';

                    expect(Tag).to.be.not.null;

                    var tagImp = new Tag();
                    divImp.appendChild(tagImp);
                    document.body.appendChild(divImp);
                    expect(tagImp.innerHTML).to.equal(tagInnerHtml);

                    var tagDev = document.createElement(tagName);
                    divImp.appendChild(tagDev);
                    document.body.appendChild(divImp);
                    expect(tagDev.innerHTML).to.equal(tagInnerHtml);

                    done();
                });
            });

            it("Load xtag-js1.js", function (done) {
                require(['wc!tags/xtag-js1!imp!xtag',], function (Tag) {
                    var tagInnerHtml = 'I\'m xtag-js1!',
                        tagName = 'xtag-js1';

                    expect(Tag).to.be.not.null;

                    var tagImp = new Tag();
                    divImp.appendChild(tagImp);
                    document.body.appendChild(divImp);
                    expect(tagImp.innerHTML).to.equal(tagInnerHtml);

                    var tagDev = document.createElement(tagName);
                    divImp.appendChild(tagDev);
                    document.body.appendChild(divImp);
                    expect(tagDev.innerHTML).to.equal(tagInnerHtml);

                    done();
                });
            });

        });

        describe("Load using the declarative way", function () {

            it("Load std-hml1.html", function (done) {
                require(['wc!tags/std-html1.html!dec',], function (Tag) {
                    var tagInnerHtml = 'I\'m std-js1!',
                        tagName = 'std-js1';

                    expect(Tag).to.be.not.null;

                    var tagImp = new Tag();
                    divImp.appendChild(tagImp);
                    document.body.appendChild(divImp);
                    expect(tagImp.innerHTML).to.equal(tagInnerHtml);

                    var tagDev = document.createElement(tagName);
                    divImp.appendChild(tagDev);
                    document.body.appendChild(divImp);
                    expect(tagDev.innerHTML).to.equal(tagInnerHtml);

                    done();
                });
            });

        });
    });


});
