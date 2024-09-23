import { Square } from "./Square"
export function WinnerModal({winner, resetGame}) {

    if(winner === null) return false

    return(

        <div className="win">

            <header className="winner">
            <h2>
                {winner ? 'Gano' : 'Empate'}
            </h2>
            <Square>{winner}</Square>

            <button onClick={resetGame}>Volver a empezar</button>
            </header>

        </div>
    )
}