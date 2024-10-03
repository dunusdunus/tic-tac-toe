const fields = document.querySelectorAll('.field'); // выбираем все поля
let currentPlayer = 'cross'; // начинаем с крестиков
let gameActive = true; // флаг для проверки, активна ли игра

// Победные комбинации (индексы полей)
const winningCombinations = [
  [0, 1, 2], // горизонтали
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // вертикали
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // диагонали
  [2, 4, 6]
];

// Функция для проверки победителя
function checkWinner() {
  // Получаем состояние всех полей
  const fieldValues = Array.from(fields).map(field => {
    const cross = field.querySelector('.cross');
    const circle = field.querySelector('.circle');
    
    if (!cross.classList.contains('none')) return 'cross';
    if (!circle.classList.contains('none')) return 'circle';
    return null; // поле пустое
  });

  // Проверяем каждую победную комбинацию
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fieldValues[a] && fieldValues[a] === fieldValues[b] && fieldValues[a] === fieldValues[c]) {
      return fieldValues[a]; // Возвращаем победителя ('cross' или 'circle')
    }
  }

  // Проверяем, есть ли ничья (если все поля заполнены, но победителя нет)
  if (fieldValues.every(value => value !== null)) {
    return 'draw'; // Возвращаем ничью
  }

  return null; // Победителя нет
}

// Функция для сброса игры
function resetGame() {
  fields.forEach(field => {
    const cross = field.querySelector('.cross');
    const circle = field.querySelector('.circle');
    cross.classList.add('none'); // скрываем крестик
    circle.classList.add('none'); // скрываем нолик
  });
  currentPlayer = 'cross'; // сбрасываем на крестиков
  gameActive = true; // игра активна снова
}

// Обработка кликов на поля
fields.forEach((field, index) => {
  field.addEventListener('click', () => {
    if (!gameActive) return; // если игра завершена, клики игнорируются

    const cross = field.querySelector('.cross');
    const circle = field.querySelector('.circle');

    // Проверяем, что поле еще не заполнено
    if (cross.classList.contains('none') && circle.classList.contains('none')) {
      if (currentPlayer === 'cross') {
        cross.classList.remove('none'); // показываем крестик
        currentPlayer = 'circle'; // смена игрока
      } else {
        circle.classList.remove('none'); // показываем нолик
        currentPlayer = 'cross'; // смена игрока
      }

      // Проверяем победителя после хода
      const winner = checkWinner();
      if (winner) {
        gameActive = false; // игра завершена
        setTimeout(() => {
          if (winner === 'draw') {
            alert('Ничья!'); // если ничья
          } else {
            alert(`${winner === 'cross' ? 'Крестики' : 'Нолики'} победили!`);
          }
          resetGame(); // сбрасываем игру через некоторое время
        }, 100); // небольшая задержка перед сбросом
      }
    }
  });
});
