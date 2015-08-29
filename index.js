var serand = require('serand');
var navigation = require('navigation');

var render = function () {
    $.ajax({
        url: '/apis/v/menus/0',
        headers: {
            'x-host': 'accounts.serandives.com'
        },
        dataType: 'json',
        success: function (data) {
            serand.emit('navigation', 'render', data);
        },
        error: function () {

        }
    });
};

module.exports = function (sandbox, fn, options) {
    navigation(sandbox, fn, options);
    render();
};


serand.on('user', 'logged in', function (usr) {
    render();
});


serand.on('user', 'logged out', function (usr) {
    render();
});
