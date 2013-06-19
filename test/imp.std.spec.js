define([
    'chai'
], function (
    chai
) {
    "use strict";

    var expect = chai.expect,
        divImp = document.createElement('div'),
        divDec = document.createElement('div');

    describe("Load declarative standard web components", function () {

        afterEach(function () {
            divImp.innerHTML = '';
            divDec.innerHTML = '';
            document.body.style.opacity = 1;
        });

        it("Load std-js1!imp", function (done) {
            var tagName = 'std-js1',
                tagInnerHtml = 'I\'m ' + tagName + '!';

            require(['wc!test/tags/' + tagName + '!imp',], function (Tag) {

                expect(!!Tag).to.be.true;

                var tagImp = document.createElement(tagName);
                divImp.appendChild(tagImp);
                document.body.appendChild(divImp);
                expect(tagImp.innerHTML).to.equal(tagInnerHtml);

                done();
            });
        });

    });


});
