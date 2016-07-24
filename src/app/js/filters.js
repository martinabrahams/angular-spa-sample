mainApp.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '-');
    };
});

mainApp.filter('safeUrl', function() {
    return function (value) {
        var stringReplaced = (!value) ? '' : value.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        return stringReplaced;
    }
})


mainApp.filter('cleanId', function() {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '-').replace("?", '');
    }
})

mainApp.filter('encodeUrl', function() {
    return function (value) {
        return (!value) ? '' : encodeURI(value);
    }
})