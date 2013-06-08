define([], function () {

    var PolyJs1Prototype = Object.create(HTMLElement.prototype);

    PolyJs1Prototype.readyCallback = function() {
        this.textContent = "I'm poly-js1!";
    };

    return {
        prototype: PolyJs1Prototype
    };

});