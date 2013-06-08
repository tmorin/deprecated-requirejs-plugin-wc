define([], function () {

    return {
        lifecycle: {
            created: function () {
                this.innerHTML = 'I\'m xtag-js1!';
            },
            inserted: function () {
                console.log('xtag-js1', 'inserted');
            }
        }
    };

});