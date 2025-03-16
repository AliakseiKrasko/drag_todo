import './App.css'
import {useState} from 'react';

type ItemsType = {
    id: number
    title: string
}

type BoardType = {
    id: number,
    title: string,
    items: ItemsType[]
}

function App() {
    const [boards, setBoards] = useState<BoardType[]>([
        {
            id: 1,
            title: "Сделать",
            items: [{id: 1, title: "Пойти в магазин"}, {id: 2, title: "Выкинуть мусор"}, {id: 3, title: "Покушать"}]
        },
        {
            id: 2,
            title: "Проверить",
            items: [{id: 4, title: "Код ревью"}, {id: 5, title: "Задача на факториал"}, {
                id: 6,
                title: "Задачи на фибоначи"
            }]
        },
        {
            id: 3,
            title: "Сделано",
            items: [{id: 7, title: "Снять видио"}, {id: 8, title: "Смонтировать"}, {id: 9, title: "Отрендорить"}]
        }
    ])

    const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null)
    const [currentItem, setCurrentItem] = useState<ItemsType | null>(null)

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        if(e.currentTarget.className === 'item') {
            e.currentTarget.style.boxShadow = '0 2px 3px gray'
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dragStartHandler(_e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemsType) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemsType) {
        e.preventDefault();
        if (!currentBoard || !currentItem) return;

        const currentIndex = currentBoard.items.findIndex(i => i.id === currentItem.id);

        currentBoard.items.splice(currentIndex, 1)
        const drobIndex = board.items.indexOf(item)
        board.items.splice(drobIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType) {
        if (currentItem) {
            board.items.push(currentItem)
        }
        if (!currentBoard || !currentItem) return;

        const currentIndex = currentBoard.items.findIndex(i => i.id === currentItem.id);

        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.currentTarget.style.boxShadow = 'none'
    }

    return (
        <div className='app'>
            {boards.map((board) =>
                <div
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                    className='board'>
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div
                            key={item.id}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                            className='item'
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App
