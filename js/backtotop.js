
const backtotop=document.getElementById("backtotop");

backtotop.addEventListener("click",gototop);

function scrollfunc() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    backtotop.classList.add("button_active");
  } else {
    backtotop.classList.remove("button_active");
  }
}

// Add a scroll event listener to call the scrollfunc function
window.addEventListener('scroll', scrollfunc);

function gototop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
