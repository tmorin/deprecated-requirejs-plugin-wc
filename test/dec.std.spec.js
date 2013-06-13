define([
    'chai'
], function (
    chai
) {
    "use strict";

    var expect = chai.expect,
        divImp = document.createElement('div'),
        divDec = document.createElement('div');

    divImp.hidden = true;
    divDec.hidden = true;

    describe("Load declarative standard web components", function () {

        beforeEach(function () {
            divImp.innerHTML = '';
            divDec.innerHTML = '';
        });

        it("Load std-hml1.html!dec", function (done) {
            var tagName = 'std-html1',
                tagInnerHtml = 'I\'m ' + tagName + '!';

            require(['wc!test/tags/' + tagName + '.html!dec',], function (Tag) {

                expect(!!Tag).to.be.false;

                var tagDev = document.createElement(tagName);
                divImp.appendChild(tagDev);
                document.body.appendChild(divImp);
                expect(tagDev.innerHTML).to.equal(tagInnerHtml);

                done();
            });
        });

    });


});
