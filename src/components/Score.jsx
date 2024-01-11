/* eslint-disable react/prop-types */
export const Score = ({resetGame, redPoints, yellowPoints}) => {

    return (
        <section className="flex items-center justify-around absolute top-1 w-[450px] h-[60px]">
            <div className="flex items-center justify-center pr-3 relative w-[75px] h-[90%] bg-[#ffff] rounded-xl" style={{boxShadow: '0px 5px 1px 2px rgba(0,0,0,0.75)'}}>
                <span className="text-xl font-bold">
                    {redPoints}
                </span>
                <span className="absolute top-2 -right-4 w-10 h-10 bg-red-500 rounded-full" style={{boxShadow: '0px 4px 2px 1px rgba(0,0,0,0.75)'}}/>
            </div>

            <button onClick={resetGame} className="bg-white rounded-2xl p-3 hover:scale-95 font-bold" style={{boxShadow: '0px 5px 1px 2px rgba(0,0,0,0.75)'}}>Restart</button>

            <div className="flex items-center justify-center pl-3 relative w-[75px] h-[90%] bg-[#ffff] rounded-xl" style={{boxShadow: '0px 5px 1px 2px rgba(0,0,0,0.75)'}}>
                <span className="text-xl font-bold">
                    {yellowPoints}
                </span>
                <span className="absolute top-2 -left-4 w-10 h-10 bg-yellow-500 rounded-full" style={{boxShadow: '0px 4px 2px 1px rgba(0,0,0,0.75)'}}/>
            </div>
        </section>
    )
}