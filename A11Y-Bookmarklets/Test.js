const allElements = document.querySelectorAll('*');

const clickedElements = Array.from(allElements).filter(function(element) {
  const listeners = getEventListeners(element);
  return listeners && listeners.click && listeners.click.length > 0;
});

//console.log('Elements with a click event attached:', clickedElements);
document.querySelector("body").innerText += 'Elements with a click event attached:' + clickedElements;