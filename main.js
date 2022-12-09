window.onload = function () {
  var startX, startY, startTop, startLeft;
  var ball = document.getElementById('ball');
  var border = document.getElementById('wrapper');
  ball.addEventListener('mousedown', initDrag, false);

  function initDrag(e) {
    // горизонтальная координата в пределах клиентской области приложения, на которой произошло событие
    startX = e.clientX;
    // вертикальная координата в пределах клиентской области приложения, на которой произошло событие
    startY = e.clientY;
    // расстояние от верха до мяча
    startTop = ball.offsetTop;
    // расстояние слева до мяча
    startLeft = ball.offsetLeft;
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }

  function doDrag(e) {
    var left = startLeft + e.clientX - startX;
    console.log(
      `startLeft + e.clientX  - startX = ${startLeft + e.clientX - startX}`
    );

    left < 0 && (left = 0);

    left + ball.offsetWidth > border.offsetLeft + border.offsetWidth &&
      (left = border.offsetLeft + border.offsetWidth - ball.offsetWidth - 10);

    var top = startTop + e.clientY - startY;

    top < 0 && (top = 0);

    top + ball.offsetHeight > border.offsetTop + border.offsetHeight &&
      (top = border.offsetTop + border.offsetHeight - ball.offsetHeight - 10);

    ball.style.top = top + 'px';

    ball.style.left = left + 'px';
  }

  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
  }
};

ball.ondragstart = function () {
  return false;
};

// .offsetHeight - высота элемента с учётом вертикальных полей и границ в пикселях. Свойство неизменяемое, только для чтения. Возвращаемое значение - целочисленное.
// .offsetTop - свойство элемента доступно только для чтения, возвращает расстояние текущего элемента по отношению к верхней части offsetParent узла.
// offsetWidth возвращает ширину элемента. Как правило, offsetWidth — это значение, включающее горизонтальный отступ элемента, ширину вертикального скроллбара (если он есть) и CSS ширину.
