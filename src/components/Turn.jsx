/* eslint-disable react/prop-types */
export const Turn = ({turn}) => {
    return (
        <>
            <div className="absolute -bottom-6 w-[170px] h-44 z-30 bg-black/90" style={{clipPath:'polygon(50% 25%, 100% 40%, 100% 70%, 0 70%, 0 40%)'}}></div>
            <div className={`flex flex-col items-center justify-center absolute -bottom-4 w-40 h-40 z-30 ${turn === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`} style={{clipPath:'polygon(50% 25%, 100% 40%, 100% 70%, 0 70%, 0 40%)'}}>
                <span className="uppercase font-black text-2xl">{turn}</span>
                <span className="font-semibold">Turn</span>  
            </div>
        </>
    )
}