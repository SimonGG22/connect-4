/* eslint-disable react/prop-types */
export const WinnerModal = ({winner, resetGame}) => {
    return (
        <section className='absolute w-full h-full top-0 left-0 grid place-items-center bg-slate-200/70 z-50'>
            <div className="flex flex-col gap-4 items-center justify-center w-[300px] h-60 bg-[#192a32] rounded-3xl">
              <h2 className="font-bold text-white">
                {
                  winner === 'draw'
                  ? 'EMPATE'
                  : 'GANADOR'
                }
              </h2>

              <header className='text-2xl'>
                {
                  winner === 'draw'
                  ? <div className={`grid place-items-center w-24 h-24 bg-slate-500 rounded-full text-4xl`} style={{boxShadow: 'inset 0px 4px 2px 1px rgba(0,0,0,0.75)'}}></div>
                  : <div className={`grid place-items-center w-24 h-24 ${winner === 'red' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full text-4xl`} style={{boxShadow: 'inset 0px 4px 2px 1px rgba(0,0,0,0.75)'}}></div>
                  
                }
              </header>

              <footer>
                <button onClick={resetGame} className="bg-white rounded-2xl p-3 hover:scale-95 font-bold" style={{boxShadow: '0px 5px 1px 2px rgba(0,0,0,0.75)'}}>Restart</button>
              </footer>
            </div>
        </section>
    )
}