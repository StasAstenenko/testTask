const textInput = document.getElementById('textInput');
const displayBtn = document.getElementById('displayBtn');
const textContainer = document.getElementById('textContainer');

let selectedLetters = new Set();
let isDragging = false;
let startX, startY, selectionBox;

displayBtn.addEventListener('click', () => {
  textContainer.innerHTML = '';
  const text = textInput.value;
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('letter');
    span.setAttribute('data-index', index);
    span.setAttribute('draggable', true);

    span.addEventListener('click', (event) => {
      if (event.ctrlKey) {
        if (selectedLetters.has(span)) {
          selectedLetters.delete(span);
          span.classList.remove('selected');
        } else {
          selectedLetters.add(span);
          span.classList.add('selected');
        }
      }
    });

    span.addEventListener('dragstart', (event) => {
      if (selectedLetters.size === 0 || !selectedLetters.has(span)) {
        selectedLetters = new Set([span]);
      }
      span.classList.add('dragging');
      event.dataTransfer.setData('text/plain', '');
    });

    span.addEventListener('dragend', (event) => {
      span.classList.remove('dragging');
      selectedLetters.forEach((el) => {
        el.style.left = `${event.pageX}px`;
        el.style.top = `${event.pageY}px`;
        el.style.position = 'absolute';
      });
    });

    textContainer.appendChild(span);
  });
});

document.addEventListener('mousedown', (event) => {
  if (event.target !== textContainer) return;
  startX = event.clientX;
  startY = event.clientY;
  selectionBox = document.createElement('div');
  selectionBox.classList.add('selection-box');
  selectionBox.style.left = `${startX}px`;
  selectionBox.style.top = `${startY}px`;
  document.body.appendChild(selectionBox);
  isDragging = true;
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  const currentX = event.clientX;
  const currentY = event.clientY;
  selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
  selectionBox.style.height = `${Math.abs(currentY - startY)}px`;
  selectionBox.style.left = `${Math.min(startX, currentX)}px`;
  selectionBox.style.top = `${Math.min(startY, currentY)}px`;
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  const boxRect = selectionBox.getBoundingClientRect();
  document.querySelectorAll('.letter').forEach((span) => {
    const spanRect = span.getBoundingClientRect();
    if (
      spanRect.left >= boxRect.left &&
      spanRect.right <= boxRect.right &&
      spanRect.top >= boxRect.top &&
      spanRect.bottom <= boxRect.bottom
    ) {
      span.classList.add('selected');
      selectedLetters.add(span);
    }
  });
  document.body.removeChild(selectionBox);
});
