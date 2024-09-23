import { useState } from 'react'
import './App.css'

import confetti from 'canvas-confetti'

import {TURNS } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic/logicBoard'

function App() {

  const [board, setBoard] = useState(() => {

    const boardFromStorage = localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {

    const turnFromStorage = localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {

    if(board[index] || winner){return}

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){

      confetti()
      setWinner(newWinner)

    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {

    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
  }

  return (
    <>
      <section className="board">
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Volver a empezar</button>
        <div className="game">
          {
            board.map((_, index) => {
              return(

                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </div>

        <aside className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>

          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </aside>

        <WinnerModal
          winner={winner}
          resetGame={resetGame}
        />

      </section>
    </>
  )
}

export default App
