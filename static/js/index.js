
var Wrap=document.querySelector('#wrap');
var y=-60;
var x=45;

Wrap.onmousedown=function(ev)
{
    var oEvent=ev||event;
    var disX=oEvent.clientX-y;
    var disY=oEvent.clientY-x;

    document.onmousemove=function(ev){
        var oEvent=ev||event;
        x=oEvent.clientY-disY;
        y=oEvent.clientX-disX;

        Wrap.style.transform='perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
    };
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    };
    return false; 
};
