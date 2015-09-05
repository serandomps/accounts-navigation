var serand = require('serand');
var navigation = require('navigation');

var links = {
    home: {
        url: '/',
        title: 'accounts'
    },
    menu: [{
        url: 'https://autos.serandives.com',
        title: 'Autos'
    }, {
        url: 'https://hotels.serandives.com',
        title: 'Hotels'
    }, {
        url: 'https://jobs.serandives.com',
        title: 'Jobs'
    }, {
        url: 'https://states.serandives.com',
        title: 'Real States'
    }]
};

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
    navigation(sandbox, fn, links);
};

serand.on('user', 'logged in', function (usr) {
    render();
});

serand.on('user', 'logged out', function (usr) {
    render();
});
