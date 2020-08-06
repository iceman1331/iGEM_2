// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}


function positionTheDot() {

  // What percentage down the page are we? 
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  // Get path length
  var path = document.getElementById("theMotionPath");
  var pathLen = path.getTotalLength();
  
  // Get the position of a point at <scrollPercentage> along the path.
  var pt = path.getPointAtLength(scrollPercentage * pathLen);
  
  // Position the red dot at this point
  var dot = document.getElementById("dot");
  dot.setAttribute("transform", "translate("+ pt.x + "," + pt.y + ")");
  
};

// Update dot position when we get a scroll event.
window.addEventListener("scroll", positionTheDot);

// Set the initial position of the dot.
positionTheDot();

