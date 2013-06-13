define([
    'chai'
], function (
    chai
) {
    "use strict";

    var expect = chai.expect,
        divImp = document.createElement('div'),
        divDec = document.createElement('div');

    //divImp.hidden = true;
    //divDec.hidden = true;

    describe("Load declarative Polymer's web components", function () {

        beforeEach(function () {
            divImp.innerHTML = '';
            divDec.innerHTML = '';
        });

        it("Load poly-hml1.html!dec!poly", function (done) {
            var tagName = 'poly-html1';

            require(['wc!test/tags/' + tagName + '.html!dec!poly',], function (Tag) {
                var tagInnerHtml = 'I\'m ' + tagName + '!';

                expect(Tag).to.be.not.null;

                var tagImp = new Tag();
                divImp.appendChild(tagImp);
                document.body.appendChild(divImp);
                console.log(tagImp);
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
