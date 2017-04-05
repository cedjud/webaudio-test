// GSAP Animation functions


const animations = {
  getRandomCoordinate: function(){
    var num = Math.floor(Math.random()* (125 - 50) + 75); // this will get a number between 1 and 99;
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    return num;
  },
  animateDotsIn: function(items){
    for (var i = 0; i < items.length; i++){
      var x = this.getRandomCoordinate();
      var y = this.getRandomCoordinate();
      TweenMax.set(items[i], {z:0.01});
      TweenMax.from(items[i], 6, {opacity: 0, delay: 2});
      TweenMax.from(items[i], 5, {x: x, y: y, ease: Quad.easeInOut});
    }
  },
  animateMiddleDots: function(dots){
    TweenMax.set(dots, {opacity: 0});
    TweenMax.to(dots, .2, {opacity: 1, delay: 10.2});
  },
  animateTextIn: function(){
    TweenMax.from('#title', 1, {opacity: 0, delay: 3});
    TweenMax.to('#title', .2, {opacity: 0, delay: 10});
  },
  animateButtonsIn: function(){
    TweenMax.from('.btn', 1, {opacity: 0, delay: 3});
  },
  animateTimedLoop: function(column){
    TweenMax.to(column, .1, {});
  }

};

export default animations;
