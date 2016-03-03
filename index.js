var serand = require('serand');
var navigation = require('navigation');

var context;

var ready = false;

var render = function (done) {
    $.ajax({
        url: '/apis/v/menus/0',
        headers: {
            'X-Host': 'accounts.serandives.com'
        },
        dataType: 'json',
        success: function (links) {
            done(false, links);
        },
        error: function () {
            done(true, {});
        }
    });
};

module.exports = function (sandbox, fn, options) {
    context = {
        sandbox: sandbox,
        fn: fn
    };
    if (!ready) {
        return;
    }
    render(function(err, links) {
        navigation(sandbox, fn, links);
    });
};

serand.on('user', 'ready', function (user) {
    ready = true;
    if (!context) {
        return;
    }
    render(function(err, links) {
        navigation(context.sandbox, context.fn, links);
    });
});

/*serand.on('user', 'logged in', function () {
    console.log('----------------------------2');
    render(function(err, links) {
        serand.emit('navigation', 'render', links);
    });
});

serand.on('user', 'logged out', function () {
    console.log('----------------------------3');
    render(function(err, links) {
        serand.emit('navigation', 'render', links);
    });
});*/
