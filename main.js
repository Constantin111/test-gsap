const outerButton = document.querySelector(".myButton"),
      myElement = document.querySelector(".my-element");


TweenMax.fromTo(myElement, 5, {
    opacity: 1
},{
    width: 400
});
TweenMax.to(myElement, 5, {
    rotation: -45,
});



outerButton.addEventListener("click", function() {

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

var progressBar = new TimelineMax();

const navigationItem = document.querySelectorAll('.navigation-item');

TweenMax.staggerFrom(navigationItem, 2, {
    opacity: 0,
    delay: 1,
    repeat: -1,
    repeatDelay: 2,
    yoyo: true,
    ease: Power1.easeIn
}, 0.5);

/*   ///////////////////////////////////    */



