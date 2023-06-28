overlappingElementCount = 0;
function isOverlapping(element1, element2) {
  // Get the client rectangles representing the text layout of the first element
  const rect1s = element1.getClientRects();

  // Get the client rectangles representing the text layout of the second element
  const rect2s = element2.getClientRects();

  // Check if any of the client rectangles of the two elements overlap
  for (let i = 0; i < rect1s.length; i++) {
    for (let j = 1; j < rect2s.length; j++) {
      if (!(rect1s[i].right < rect2s[j].left ||
            rect1s[i].left > rect2s[j].right ||
            rect1s[i].bottom < rect2s[j].top ||
            rect1s[i].top > rect2s[j].bottom)) {
        return true;
      }
    }
  }

  return false;
}

function checkOverlap(textElements) {
  for (let i = 0; i < textElements.length; i++) {
    for (let j = i + 1; j < textElements.length; j++) {
      if (isOverlapping(textElements[i], textElements[j])) {
        console.log('"' + textElements[i].innerText + '" and "' + textElements[j].innerText + '" are overlapping');
        overlappingElementCount++;
      }
    }
  }
}

const  elements = document.querySelectorAll("p, span, a, h1, h2, h3, h4, h5, h6, li");
checkOverlap(elements);
console.log(overlappingElementCount);