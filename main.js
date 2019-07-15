

const outerButton = $(".myButton"),
      myElement = document.querySelector(".my-element");

const navigationItem = document.querySelectorAll('.navigation-item');

TweenMax.staggerFrom(navigationItem, 1, {
    opacity: 0,
    delay: 1,
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
    ease: Power1.easeIn
}, 0.5);

$(document).ready(function () {
    TweenMax.fromTo(myElement, 5, {
        opacity: 1
    },{
        width: 400
    });
    TweenMax.to(myElement, 5, {
        rotation: -45,
    });
})





outerButton.on("click", function() {

    this.innerText = 'Сделал';
    TweenMax.to(this, 2, {
        rotation: 360,
        scale: 1.2,
        backgroundColor: "red",
        color: "#fff"
    }, 0.5);
    TweenMax.to(myElement, 0.5, {
        rotation: 0,
        //borderRadius: "25px"
        /*autoAlpha: 1,
        scale: 1*/
    }, 0.5);
    TweenMax.staggerTo(myElement, 2, {
        borderRadius: "25px"
    }, 0.5);
});

console.log('34214321341234');

/*   ///////////////////////////////////    */

/*external js
https://code.jquery.com/jquery-latest.js
https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js
*/

$(window).ready(function() {
    var skew = $("#skew"),
        logos = $(".logo"),
        dotContainer = $("#dotContainer"),
        skewBtn = $("#skewBtn"),
        staggerBtn = $("#staggerBtn"),
        particlesBtn = $("#particlesBtn"),
        tl = new TimelineLite();

    // functions for building nested timelines

    function getSkewAnimation() {
        var skewTimeline = new TimelineLite();
        skewTimeline.from(skew, 0.3, {alpha:0})
            .to(skew, 0.5, {skewX:45})
            .to(skew, 0.8, {skewX:-45})
            .to(skew, 0.5, {skewX:5, skewY:-10})
            .to(skew, 0.5, {skewX:20, skewY:5})
            .to(skew, 0.5, {alpha:0});
        return skewTimeline;
    }

    function getStaggerAnimation() {
        var staggerTimeline = new TimelineLite();
        staggerTimeline.from(logos, 0.2, {opacity:0})
            .staggerFrom(logos, 0.6, {top:-60, left:"-=50px", rotation:"-90deg", ease:Back.easeOut}, 0.1)
            .to(logos, 1, {opacity:0});
        return staggerTimeline;
    }

    function getParticlesAnimation() {
        var particlesTimeline = new TimelineLite(),
            i = 300,
            radius = 450,
            centerX= 360,
            centerY = 30,
            dots = [],
            rawDots = [];

        while (--i > -1) {
            dot = document.createElement("img");
            dot.src = "https://s.cdpn.io/16327/dot.png";
            dot.id = "dot" + i;
            dotContainer.append(dot);
            dot.style.cssText = "position:absolute; left:" + centerX + "px; top:" + centerY + "px; width:1px; height:1px;"
            var angle = Math.random() * Math.PI * 2,
                insertionTime = i * 0.015;

            particlesTimeline.from(dot, 0.05, {opacity:0, immediateRender:true}, insertionTime);
            particlesTimeline.to(dot, .7, {left:Math.cos(angle) * radius + centerX,
                top:Math.sin(angle) * radius + centerY,
                width:32,
                height:32,
                ease:Cubic.easeIn
            }, insertionTime);

        }
        return particlesTimeline;
    }

// build timeline

    tl.add("skew") // adds a new label
        .add( getSkewAnimation() ) // method returns a TimelineLite instance that gets nested at the end
        .add( getStaggerAnimation(), "stagger") //creates new label and adds animation there
        .add( getParticlesAnimation(), "particles")

//controls

    skewBtn.click(function() {
        tl.play('skew');
    });

    staggerBtn.click(function() {
        tl.play('stagger');
    });

    particlesBtn.click(function() {
        tl.play('particles');
    });

//show the demoBackground div after DOM is ready
    TweenLite.set($("#demoBackground"), {visibility:"visible"});
});


/*external js
https://code.jquery.com/jquery-latest.js
https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js
*/

$(window).ready(function() {
    var logo = $("#logo"),
        progressValue = $("#progressValue"),
        totalProgressValue = $("#totalProgressValue"),
        timeValue = $("#timeValue"),
        totalTimeValue = $("#totalTimeValue"),
        restartBtn = $("#restartBtn"),
        txtContainer = $("#txtContainer"),
        tl,
        progressSlider,
        totalProgressSlider,
        txt;

    /* config sliders */

    progressSlider = $("#progressSlider").slider({
        range: false,
        min: 0,
        max: 100,
        step:.1,
        slide: function ( event, ui ) {
            tl.pause();
            tl.progress( ui.value/100 );
        }
    });

    totalProgressSlider = $("#totalProgressSlider").slider({
        range: false,
        min: 0,
        max: 100,
        step:.1,
        slide: function ( event, ui ) {
            tl.pause();
            tl.totalProgress( ui.value/100 );
        }
    });

    /* build DOM elements - this example was done before GreenSock's SplitText tool was created, so it uses a more primitave way of splitting the text string apart into <div> elements, but since we don't need any bells or whistles like absolute positioning or words/lines wrapping, etc., this technique is fine*/

    function splitText(phrase) {
        var prevLetter, sentence,
            sentence = phrase.split("");
        $.each(sentence, function(index, val) {
            if(val === " "){
                val = "&nbsp;";
            }
            var letter = $("<div/>", {
                id : "txt" + index
            }).addClass('txt').html(val).appendTo(txtContainer);

            if(prevLetter) {
                $(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
            };
            prevLetter = letter;
        });
        txt = $(".txt");
    }

    function buildTimeline() {

        //note this timeline uses 3D transforms which will only work in recent versions of Safari, Chrome, and FireFox. IE10 will support 3D transforms as well. All other browsers simply will not show those properties being tweened.

        TweenLite.set(txtContainer, {css:{perspective:500}});

        tl = new TimelineMax({onUpdate:updateUI, repeat:2, repeatDelay:1, yoyo:true});
        tl.from(logo, 0.5, {left:'-=60px', ease:Back.easeOut});
        tl.staggerFrom(txt, 0.4, {alpha:0}, 0.06, "textEffect");
        tl.staggerFrom(txt, 0.8, {rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80", ease:Back.easeOut}, 0.06, "textEffect");
        tl.staggerTo(txt, 0.6, {rotationX:"360deg", color:"#90e500", transformOrigin:"50% 50% 10"}, 0.02);
    }

    /* callbacks */

    function updateUI() {
        //change slider value
        progressSlider.slider("value", tl.progress() *100);
        totalProgressSlider.slider("value", tl.totalProgress() *100);

        //update display of values
        progressValue.html(tl.progress().toFixed(2));
        totalProgressValue.html(tl.totalProgress().toFixed(2));
        timeValue.html(tl.time().toFixed(2));
        totalTimeValue.html(tl.totalTime().toFixed(2));
    }

    restartBtn.click(function() {
        //Start playing from a progress of 0.
        tl.restart();
    });

    function init() {
        splitText("We Hope You Enjoyed the Tour");
        buildTimeline();
        //show the demoBackground div after DOM is ready and all images loaded
        TweenLite.set($("#demoBackground"), {visibility:"visible"});
    }
    init();
});

/* Используем jQuery */
(function($) {

    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

    // Создаем сцену
    $("section").each(function() {

        new ScrollMagic.Scene({
            triggerElement: this
        })
            .setPin(this)
            .addTo(ctrl);

    });

})(jQuery);


