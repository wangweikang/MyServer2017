var Wrap = document.querySelector('#wrap');
var y = -60;
var x = 45;

Wrap.onmousedown = function (ev) {
    var oEvent = ev || event;
    var disX = oEvent.clientX - y;
    var disY = oEvent.clientY - x;

    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        x = oEvent.clientY - disY;
        y = oEvent.clientX - disX;

        Wrap.style.transform = 'perspective(800px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
    };
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };
    return false;
};

Wrap.ontouchstart = function (ev) {
    var oEvent = ev || event;
    var disX = oEvent.changedTouches[0].clientX - y;
    var disY = oEvent.changedTouches[0].clientY - x;
    console.log(oEvent.changedTouches[0]);
    document.ontouchmove = function (ev) {
        var oEvent = ev || event;
        // console.log(oEvent);
        x = oEvent.changedTouches[0].clientY - disY;
        y = oEvent.changedTouches[0].clientX - disX;

        Wrap.style.transform = 'perspective(800px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
    };
    document.ontouchend = function () {
        document.ontouchmove = null;
        document.ontouchend = null;
    };
    return false;
};