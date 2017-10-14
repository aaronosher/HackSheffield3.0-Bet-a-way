$(document).ready(function(){

    $("#maskmoney").maskMoney({"prefix":"£"});

    TweenMax.set("#button *", {drawSVG:0});;

    var tl = new TimelineLite();
    tl.from("#bg", 1.5, {scaleX:2, scaleY:2,opacity:0})
        .from(".border", .75, {opacity:0}, "-=.75")
        .to("g#box polyline", .3, {drawSVG:"102%",ease:Power3.easeOut})
        .to("g#slash line", .4, {drawSVG:"102%"}, "-=.05")
        .from(".button-text", .5, {opacity:0}, "-=.45")
        .to("footer .footer-content", .75, {width:"100%",ease:Power2.easeInOut}, "-=.5")
    ;

});
