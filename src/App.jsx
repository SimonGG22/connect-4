import { useState } from 'react'

import './App.css'
import { TURNS, WINNER_COMBOS, rows, columns } from './constants'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(columns).fill(null)))
  const [turn, setTurn] = useState(TURNS.red)
  const [cellColors, setCellColors] = useState(Array(rows).fill(null).map(() => Array(columns).fill('bg-slate-300')))
  const [winner, setWinner] = useState(null)
  const [gameEnded, setGameEnded] = useState(false)

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

  const checkEndGame = (newBoard) => {
    return newBoard.every((slot) => slot != null)
  }

  const updateBoard = (columnIndex) => {
    const newBoard = [...board]
    const newCellColors = [...cellColors]
    const newTurn = turn === TURNS.red ? TURNS.blue : TURNS.red // Cambia el turno

    // Encuentra la fila disponible más baja en la columna seleccionada
    let row = -1
    for (let i = rows - 1; i >= 0; i--) {
      if (!newBoard[i][columnIndex]) {
        row = i
        break
      }
    }

    // Si la columna está llena, no se puede colocar más fichas
    if (row === -1) return

    // Coloca la ficha en la posición adecuada
    newBoard[row][columnIndex] = turn;
    newCellColors[row][columnIndex] = turn === TURNS.red ? 'bg-red-500' : 'bg-blue-500'
    setBoard(newBoard) // Actualiza el tablero
    setCellColors(newCellColors) // Actualiza los colores de las celdas
    setTurn(newTurn) // Cambia el turno

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setGameEnded(true)
    } else {
      // Si no hay ganador, verificar si el juego termina en empate
      const endGame = checkEndGame(newBoard)
      if (endGame) {
        setWinner(null) // No hay ganador, pero es un empate
      }
    }
  }

  const handleClick = (index) => {
    if (gameEnded) return

    updateBoard(index)
  }

  const resetGame = () => {
    setBoard(Array(rows).fill(null).map(() => Array(columns).fill(null)))
    setTurn(TURNS.red)
    setCellColors(Array(rows).fill(null).map(() => Array(columns).fill('bg-slate-300')))
    setWinner(null)
    setGameEnded(false)
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
              <div key={`${rowIndex}-${colIndex}`} onClick={() => handleClick(colIndex)} className={`flex justify-center items-center w-10 h-10 ${cellColors[rowIndex][colIndex]} rounded-full cursor-pointer`}>
                {board}
              </div>
            ))
          ))
        }
      </div>
      {
        winner != null && (
          <WinnerModal winner={winner} resetGame={resetGame}/>
        )
      }
    </>
  )
}

export default App
