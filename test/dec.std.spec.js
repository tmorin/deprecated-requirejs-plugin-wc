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

        it("Load std-html1.html!dec", function (done) {
            var tagName = 'std-html1',
                tagInnerHtml = 'I\'m ' + tagName + '!';

            require(['wc!test/tags/' + tagName + '.html!dec',], function (Tag) {

                expect(!!Tag).to.be.false;

                var tagDec = document.createElement(tagName);
                divImp.appendChild(tagDec);
                document.body.appendChild(divImp);
                expect(tagDec.innerHTML).to.equal(tagInnerHtml);

                done();
            });
        });

    });


});
