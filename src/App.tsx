import './App.css'
import {useState} from 'react';

function App() {
const [board, setBoard] = useState([
    {id: 1, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}, {id: 2, title: "Выкинуть мусор"}, {id: 3, title: "Покушать"}]},
    {id: 2, title: "Проверить", items: [{id: 4, title: "Код ревью"}, {id: 5, title: "Задача на факториал"}, {id: 6, title: "Задачи на фибоначи"}]},
    {id: 3, title: "Сделано", items: [{id: 1, title: "Снять видио"}, {id: 7, title: "Смонтировать"}, {id: 8, title: "Отрендорить"}]}
])

  return (
      <div className='app'>
          {board.map((board) =>
              <div className='board'>
                  <div className='board__title'>{board.title}</div>
                  {board.items.map(item =>
                      <div className='item'>{item.title}</div>
                  )}
              </div>
           )}
           {/*className='board'>
              <div className='board__title'>Сделать</div>
              <div className='item'>Пойти в магазин</div>
          </div>
          <div className='board'>
              <div className='board__title'>Проверить</div>
              <div className='i<divtem'>Задачи</div>
          </div>
          <div className='board'>
              <div className='board__title'>Сделано</div>
              <div className='item'>Покушать</div>
              <div className='item'>Покушать</div>
              <div className='item'>Покушать</div>
              <div className='item'>Покушать</div>
          </div>*/}
      </div>
  )
}

export default App
