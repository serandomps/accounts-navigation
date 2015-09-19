var serand = require('serand');
var navigation = require('navigation');

var render = function (done) {
    $.ajax({
        url: '/apis/v/menus/0',
        headers: {
            'x-host': 'accounts.serandives.com'
        },
        dataType: 'json',
        success: function (data) {
            done(false, data);
        },
        error: function () {
            done(true);
        }
    });
};

module.exports = function (sandbox, fn, options) {
    render(function (err, links) {
        navigation(sandbox, fn, links);
    });
};

serand.on('user', 'logged in', function () {
    render(function (err, links) {
        serand.emit('navigation', 'render', links);
    });
});

serand.on('user', 'logged out', function () {
    render(function (err, links) {
        serand.emit('navigation', 'render', links);
    });
});
