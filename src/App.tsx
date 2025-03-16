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
    const [board, setBoard] = useState<BoardType[]>([
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
            items: [{id: 1, title: "Снять видио"}, {id: 7, title: "Смонтировать"}, {id: 8, title: "Отрендорить"}]
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

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: BoardType, item: ItemsType) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, dropBoard: BoardType, item: ItemsType) {
        e.preventDefault();
        if (!currentBoard || !currentItem) return;

        const currentIndex = currentBoard.items.findIndex(i => i.id === currentItem.id);
        const dropIndex = dropBoard.items.findIndex(i => i.id === item.id);

        if (currentIndex === -1 || dropIndex === -1) return;

        const newBoards = board.map(b => {
            if (b.id === currentBoard.id) {
                return {
                    ...b,
                    items: b.items.filter(i => i.id !== currentItem.id)
                };
            }

            if (b.id === dropBoard.id) {
                const newItems = [...b.items];
                newItems.splice(dropIndex + 1, 0, currentItem);
                return {
                    ...b,
                    items: newItems
                };
            }

            return b;
        });

        setBoard(newBoards);
    }



    return (
        <div className='app'>
            {board.map((board) =>
                <div className='board'>
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div
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
