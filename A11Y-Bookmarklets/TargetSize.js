// Self-invoking function to prevent polluting the global namespace
(function () {
  // Function to get the center of an element
  function getCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.left + window.scrollX + rect.width / 2
    };
  }

  // Function to check if an element or its ancestors are hidden
  function isVisible(el) {
    let current = el;
    while (current) {
      const style = getComputedStyle(current);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }
      current = current.parentElement;
    }
    return true;
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';

  // Get all interactive elements that are visible
  const elements = [...document.querySelectorAll('a, label, button, input:not([type=hidden]), select, textarea, [tabindex], [role=button], [role=checkbox], [role=link], [role=menuitem], [role=option], [role=radio], [role=switch], [role=tab]')].filter(isVisible);

  const centers = [];
  let smallerSizeCount = 0; // Initialize a counter for elements with smaller size
  const overlappedElements = []; // Store overlapped elements
  const smallerSizeElements = []; // Store elements with smaller size

  // Iterate through all interactive elements to find their centers and create SVG circles around them
  elements.forEach(el => {
    // Check if the element's size is implemented by the user agent (browser) defaults
    const isUserAgentSize = el.style.width === '' && el.style.height === '' && el.getAttribute('width') === null && el.getAttribute('height') === null;

    // If it's not implemented by the user agent, proceed with checking size
    if (!isUserAgentSize) {
      // Get the center of the element
      const center = getCenter(el);
      centers.push({ element: el, center: center });

      // Check if the element's width or height is less than 24 CSS pixels
      if (el.getBoundingClientRect().width < 24 || el.getBoundingClientRect().height < 24) {
        smallerSizeCount++; // Increment the counter
        smallerSizeElements.push(el); // Store elements with smaller size
        // Create an SVG circle and highlight in blue for smaller elements
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.style.position = 'absolute';
        svg.style.top = `${center.top - 12}px`;
        svg.style.left = `${center.left - 12}px`;
        svg.style.width = '24px';
        svg.style.height = '24px';
        svg.style.zIndex = '9999';
        svg.style.margin = '0';
        svg.style.pointerEvents = 'none';
        svg.setAttribute('aria-hidden', 'true');

        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '12');
        circle.setAttribute('fill', 'rgba(0, 0, 255, 0.3)'); // Highlight in blue for smaller elements

        svg.appendChild(circle);
        document.body.appendChild(svg);
      }
    }
  });

  const overlaps = [];

  // Check for overlapping elements
  centers.forEach((item1, index) => {
    centers.slice(index + 1).forEach(item2 => {
      if (Math.sqrt(Math.pow(item2.center.left - item1.center.left, 2) + Math.pow(item2.center.top - item1.center.top, 2)) < 24) {
        overlaps.push(item1.element);
        overlaps.push(item2.element);
      }
    });
  });

  // Remove duplicates and set aria-description to 'overlap'
  const uniqueOverlaps = [...new Set(overlaps)];
  uniqueOverlaps.forEach(el => el.setAttribute('aria-description', 'overlap'));

  // Alert the user about the number of overlapping elements and the count of elements with smaller size
  alert(`There are ${uniqueOverlaps.length} overlapping controls, and ${smallerSizeCount} controls with a size smaller than 24 by 24 pixels.`);

  // Append a list of overlapped elements and elements with smaller size at the bottom of the document
  const resultDiv = document.createElement('div');
  resultDiv.style.borderTop = '2px solid #000';
  resultDiv.style.paddingTop = '10px';

  if (overlaps.length > 0) {
    const overlapList = document.createElement('ul');
    overlapList.innerHTML = '<strong>Overlapped Elements:</strong>';
    uniqueOverlaps.forEach(el => {
      const listItem = document.createElement('li');
      listItem.textContent = el.innerText || 'No Inner Text || ' + el.outerHTML;
      overlapList.appendChild(listItem);
    });
    resultDiv.appendChild(overlapList);
  }

  if (smallerSizeElements.length > 0) {
    const smallerSizeList = document.createElement('ul');
    smallerSizeList.innerHTML = '<strong>Elements with Smaller Size:</strong>';
    smallerSizeElements.forEach(el => {
      const listItem = document.createElement('li');
      listItem.textContent = el.innerText || 'No Inner Text || ' + el.outerHTML || 'No HTML Source';
      smallerSizeList.appendChild(listItem);
    });
    resultDiv.appendChild(smallerSizeList);
  }

  document.body.appendChild(resultDiv);
})();
