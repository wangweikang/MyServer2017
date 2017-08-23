function isEmpty(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

var shake = function (element, time) {
    element.classList.add('shake-horizontal')
    element.classList.add('shake-constant')
    setTimeout(function () {
        element.classList.remove('shake-horizontal')
        element.classList.remove('shake-constant')
    }, time)
}
