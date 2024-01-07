import { useState } from 'react'

import { TURNS, WINNER_COMBOS, rows, columns } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { Turn } from './components/Turn'
import { Score } from './components/Score'

function App() {
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(columns).fill(null)))
  const [turn, setTurn] = useState(TURNS.red)
  const [cellColors, setCellColors] = useState(Array(rows).fill(null).map(() => Array(columns).fill('bg-[#7646f9]')))
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
    const newTurn = turn === TURNS.red ? TURNS.yellow : TURNS.red // Cambia el turno

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
    newCellColors[row][columnIndex] = turn === TURNS.red ? 'bg-red-500' : 'bg-yellow-500'
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
    setCellColors(Array(rows).fill(null).map(() => Array(columns).fill('bg-[#7646f9]')))
    setWinner(null)
    setGameEnded(false)
  }

  return (
    <main className='relative flex flex-col items-center justify-center w-full h-screen bg-[#7a45ff]'>
      <Score />

      <section className='flex items-center justify-center w-[450px] h-[460px] rounded-3xl pb-7 bg-[#ffffff] z-20' style={{boxShadow: '0px 5px 1px 6px rgba(0,0,0,0.75)'}}>
        <div className='grid grid-cols-7 grid-rows-6 gap-4 w-auto h-[400px]'>
          {
            board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} onClick={() => handleClick(colIndex)} className={`flex justify-center items-center w-12 h-12 ${cellColors[rowIndex][colIndex]} rounded-full cursor-pointer`} style={{boxShadow: 'inset 0px 4px 2px 1px rgba(0,0,0,0.75)'}}>
                  {board}
                </div>
              ))
            ))
          }
        </div>
      </section>

      <div className='absolute bottom-0 w-full h-32 bg-[#5c2cd5] z-10' style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 30%, 100% 100%, 70% 100%, 30% 100%, 0 100%, 0% 30%)' }}></div>
      
      <Turn turn={turn}/>

      {
        winner != null && (
          <WinnerModal winner={winner} resetGame={resetGame}/>
        )
      }
    </main>
  )
}

export default App
