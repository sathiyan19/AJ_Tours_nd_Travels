let n = 0, prev = 0;
const reviews = document.querySelectorAll(".rating_layout");
const dots = document.querySelectorAll(".dot");
let myTimeout;
let pageIsVisible = true; // Keep track of page visibility

const touch_effect = (class_name, left_func, right_func) => {
    let startx1,
      starty1,
      starttime1,
      distx1,
      disty1,
      elapsedtime1,
      threshold1 = 2000;
  
    let isSwiping = false; 
  
    const element1 = document.querySelector(class_name);
  
    if (!element1) {
      console.error(`Element with class "${class_name}" not found.`);
      return;
    }
  
    element1.addEventListener("touchstart", (e1) => {
      var obj1 = e1.changedTouches[0];
      startx1 = obj1.pageX;
      starty1 = obj1.pageY;
      starttime1 = new Date().getTime();
    });
  
    element1.addEventListener("touchmove", (e1) => {
      if (!isSwiping) {
        isSwiping = true;
      }
    });
  
    element1.addEventListener("touchend", (e1) => {
      var obj2 = e1.changedTouches[0];
      distx1 = obj2.pageX - startx1;
      disty1 = obj2.pageY - starty1;
      elapsedtime1 = new Date().getTime() - starttime1;
      if (isSwiping && (elapsedtime1 < threshold1) && (Math.abs(disty1) < 50)) {
        if (distx1 < -70) {
          right_func();
        } else if (distx1 > 70) {
          left_func();
        }
      }
  
      isSwiping = false;
    });
  };
  
  touch_effect(".reviews",()=>{
    prev = n;
    n--;
    if(n==-1){
        n=reviews.length-1
    }
    slider(n, prev);
  },()=>{
    prev = n;
    n++;
    slider(n, prev);
  })

// Function to pause the timer when the page is not visible
function pauseTimer() {
  clearInterval(myTimeout);
}

// Function to resume the timer when the page is visible
function resumeTimer() {
  if (pageIsVisible) {
    myTimeout = setInterval(() => {
      prev = n;
      n++;
      slider(n, prev);
    }, 7000);
  }
}

// Listen for page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    pageIsVisible = true;
    resumeTimer();
  } else {
    pageIsVisible = false;
    pauseTimer();
  }
});

var slider = function (manual, previous) {
  if (myTimeout) {
    clearInterval(myTimeout);
  }
  manual = manual % reviews.length;
  prev = previous;
  // console.log("prev:", prev);
  // console.log("manual:", manual);
  reviews[prev].classList.remove("active");
  reviews[prev].classList.add("disappear");

  dots.forEach((dot) => {
    dot.classList.remove("activ");
  });

  reviews[prev].addEventListener("animationend", () => {
    reviews[prev].classList.remove("disappear");
    reviews[manual].classList.add("active");
  }, { once: true });

  dots[manual].classList.add("activ");

  resumeTimer(); // Resume the timer after the animation

  n = manual;
};

slider(1, 0);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slider(i, n);
  });
});
