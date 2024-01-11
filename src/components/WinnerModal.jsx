/* eslint-disable react/prop-types */
export const WinnerModal = ({winner, resetGame}) => {
    return (
        <section className='absolute w-full h-full top-0 left-0 grid place-items-center bg-slate-200/70 z-50'>
            <div className="flex flex-col gap-4 items-center justify-center w-[300px] h-auto bg-[#192a32] rounded-3xl">
              <h2 className="mt-4 font-bold text-white">
                {
                  winner === 'draw'
                  ? 'EMPATE'
                  : 'GANADOR'
                }
              </h2>

              <header className='text-2xl'>
                {
                  winner === 'draw'
                  ? <div className={`grid place-items-center w-24 h-24 bg-slate-500 rounded-full text-4xl`}></div>
                  : <div className={`grid place-items-center w-24 h-24 ${winner === 'red' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full text-4xl`}></div>
                  
                }
              </header>

              <footer>
                <button onClick={resetGame} className="mb-4 font-bold">Restart</button>
              </footer>
            </div>
        </section>
    )
}