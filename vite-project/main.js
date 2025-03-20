const textInput = document.getElementById('textInput');
const displayBtn = document.getElementById('displayBtn');
const textContainer = document.getElementById('textContainer');

displayBtn.addEventListener('click', () => {
  textContainer.innerHTML = '';
  const text = textInput.value;
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('letter');
    span.setAttribute('draggable', true);
    span.dataset.index = index;

    span.addEventListener('click', (event) => {
      if (event.ctrlKey) {
        span.classList.toggle('selected');
      }
    });

    span.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', span.dataset.index);
    });

    span.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    span.addEventListener('drop', (event) => {
      event.preventDefault();
      const fromIndex = event.dataTransfer.getData('text/plain');
      const fromElement = document.querySelector(`[data-index="${fromIndex}"]`);
      if (fromElement !== span) {
        const tempText = fromElement.textContent;
        fromElement.textContent = span.textContent;
        span.textContent = tempText;
      }
    });

    textContainer.appendChild(span);
  });
});
