define([
    'chai'
], function (
    chai
) {
    "use strict";

    var expect = chai.expect,
        divImp = document.createElement('div'),
        divDec = document.createElement('div');

    describe("Load declarative Polymer's web components", function () {

        afterEach(function () {
            divImp.innerHTML = '';
            divDec.innerHTML = '';
            document.body.style.opacity = 1;
        });

        it("Load poly-hml1.html!dec!polymer", function (done) {
            var tagName = 'poly-html1';

            require(['wc!test/tags/' + tagName + '.html!dec!polymer',], function (Tag) {

                var tagInnerHtml = 'I\'m ' + tagName + '!';

                expect(Tag).to.be.not.null;

                var tagImp = new Tag();
                divImp.appendChild(tagImp);
                document.body.appendChild(divImp);
                console.log(tagImp);
                expect(tagImp.att1).to.equal('value1');

                var tagDec = document.createElement(tagName);
                divDec.appendChild(tagDec);
                document.body.appendChild(divDec);
                expect(tagDec.att1).to.equal('value1');

                done();
            });
        });

    });


});
