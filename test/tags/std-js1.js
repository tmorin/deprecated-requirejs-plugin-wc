define([], function () {

    var StdJs1Prototype = Object.create(HTMLElement.prototype);

    StdJs1Prototype.readyCallback = function() {
        this.textContent = "I'm std-js1!";
    };

    return {
        prototype: StdJs1Prototype
    };

});