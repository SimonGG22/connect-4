import { useState } from 'react'
import './App.css'

const TURNS = {
  red: 'red',
  blue: 'blue'
}

const WINNER_COMBOS = [
  // Combinaciones verticales (columnas)
  [[0,0], [1,0], [2,0], [3,0]], [[1,0], [2,0], [3,0], [4,0]], [[2,0], [3,0], [4,0], [5,0]],
  [[0,1], [1,1], [2,1], [3,1]], [[1,1], [2,1], [3,1], [4,1]], [[2,1], [3,1], [4,1], [5,1]],
  [[0,2], [1,2], [2,2], [3,2]], [[1,2], [2,2], [3,2], [4,2]], [[2,2], [3,2], [4,2], [5,2]],
  [[0,3], [1,3], [2,3], [3,3]], [[1,3], [2,3], [3,3], [4,3]], [[2,3], [3,3], [4,3], [5,3]],
  [[0,4], [1,4], [2,4], [3,4]], [[1,4], [2,4], [3,4], [4,4]], [[2,4], [3,4], [4,4], [5,4]],
  [[0,5], [1,5], [2,5], [3,5]], [[1,5], [2,5], [3,5], [4,5]], [[2,5], [3,5], [4,5], [5,5]],
  [[0,6], [1,6], [2,6], [3,6]], [[1,6], [2,6], [3,6], [4,6]], [[2,6], [3,6], [4,6], [5,6]],
  // Combinanciones horizontales [filas]
  [[0,0], [0,1], [0,2], [0,3]], [[0,1], [0,2], [0,3], [0,4]], [[0,2], [0,3], [0,4], [0,5]], [[0,3], [0,4], [0,5], [0,6]],
  [[1,0], [1,1], [1,2], [1,3]], [[1,1], [1,2], [1,3], [1,4]], [[1,2], [1,3], [1,4], [1,5]], [[1,3], [1,4], [1,5], [1,6]],
  [[2,0], [2,1], [2,2], [2,3]], [[2,1], [2,2], [2,3], [2,4]], [[2,2], [2,3], [2,4], [2,5]], [[2,3], [2,4], [2,5], [2,6]],
  [[3,0], [3,1], [3,2], [3,3]], [[3,1], [3,2], [3,3], [3,4]], [[3,2], [3,3], [3,4], [3,5]], [[3,3], [3,4], [3,5], [3,6]],
  [[4,0], [4,1], [4,2], [4,3]], [[4,1], [4,2], [4,3], [4,4]], [[4,2], [4,3], [4,4], [4,5]], [[4,3], [4,4], [4,5], [4,6]],
  [[5,0], [5,1], [5,2], [5,3]], [[5,1], [5,2], [5,3], [5,4]], [[5,2], [5,3], [5,4], [5,5]], [[5,3], [5,4], [5,5], [5,6]],
  // Combinaciones Diagonales ascendentes [iz -> der]
  [[0,3], [1,4], [2,5], [3,6]], 
  [[2,0], [3,1], [4,2], [5,3]],
  [[1,0], [2,1], [3,2], [4,3]], [[2,1], [3,2], [4,3], [5,4]],
  [[0,2], [1,3], [2,4], [3,5]], [[1,3], [2,4], [3,5], [4,6]],
  [[0,1], [1,2], [2,3], [3,4]], [[1,2], [2,3], [3,4], [4,5]], [[2,3], [3,4], [4,5], [5,6]],
  [[0,0], [1,1], [2,2], [3,3]], [[1,1], [2,2], [3,3], [4,4]], [[2,2], [3,3], [4,4], [5,5]],
  // Combinaciones Diagonales descedentes [der -> iz]
  [[0,3], [1,2], [2,1], [3,0]], 
  [[2,6], [3,5], [4,4], [5,3]],
  [[1,6], [2,5], [3,4], [4,3]], [[2,5], [3,4], [4,3], [5,2]],
  [[0,4], [1,3], [2,2], [3,1]], [[1,3], [2,2], [3,1], [4,0]],
  [[0,6], [1,5], [2,4], [3,3]], [[1,5], [2,4], [3,3], [4,2]], [[2,4], [3,3], [4,2], [5,1]],
  [[0,5], [1,4], [2,3], [3,2]], [[1,4], [2,3], [3,2], [4,1]], [[2,3], [3,2], [4,1], [5,0]],
]

const rows = 6;
const columns = 7;

function App() {
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(columns).fill(null)))
  const [turn, setTurn] = useState(TURNS.red)
  const [cellColors, setCellColors] = useState(Array(rows).fill(null).map(() => Array(columns).fill('slate-300')))
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras para ver si red o blue gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c, d] = combo
      const [aX, aY] = a;
      const [bX, bY] = b;
      const [cX, cY] = c;
      const [dX, dY] = d;
      if (
        boardToCheck[aX][aY] &&
        boardToCheck[aX][aY] === boardToCheck[bX][bY] &&
        boardToCheck[aX][aY] === boardToCheck[cX][cY] &&
        boardToCheck[aX][aY] === boardToCheck[dX][dY]
       ) {
        return boardToCheck[aX][aY];
      }
    }
    return null
  }

  const updateBoard = (columnIndex) => {
    const newBoard = [...board]
    const newCellColors = [...cellColors]
    const newTurn = turn === TURNS.red ? TURNS.blue : TURNS.red // Cambia el turno

    // Encuentra la fila disponible más baja en la columna seleccionada
    let row = -1;
    for (let i = rows - 1; i >= 0; i--) {
      if (!newBoard[i][columnIndex]) {
        row = i;
        break;
      }
    }

    // Si la columna está llena, no se puede colocar más fichas
    if (row === -1) return

    // Coloca la ficha en la posición adecuada
    newBoard[row][columnIndex] = turn;
    newCellColors[row][columnIndex] = turn === TURNS.red ? 'red-500' : 'blue-500'
    setBoard(newBoard); // Actualiza el tablero
    setCellColors(newCellColors); // Actualiza los colores de las celdas
    setTurn(newTurn); // Cambia el turno

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  console.log(winner)

  const handleClick = (index) => {
    updateBoard(index)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline mb-8">
        Connect 4
      </h1>
      <div className='grid grid-cols-7 grid-rows-6 auto-cols-auto gap-10 max-w-80 max-h-80'>
        {
          board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} onClick={() => handleClick(colIndex)} className={`flex justify-center items-center w-10 h-10 bg-${cellColors[rowIndex][colIndex]} rounded-full cursor-pointer`}>
                {board}
              </div>
            ))
          ))
        }
      </div>
    </>
  )
}

export default App
