import React, {useEffect, useState, useContext}   from "react";
const WatchListContext= React.createContext();
const WatchListProvider=({children})=>{

    const [watchList, setWatchList]=useState(
        localStorage.getItem("watchList")?.split(",") || ["GOOGL","MSFT", "AMZN"]
    );
    useEffect(()=>{
        localStorage.setItem("watchList", watchList)
    })
    const addStock = (stock)=>{
        if(watchList.indexOf(stock)===-1){
            setWatchList([...watchList, stock])
        }
    }
    const deleteStock =(stock)=>{
setWatchList(
    watchList.filter((el)=>{
        return el!==stock;
    }
    )
)
    }
    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {children}
    </WatchListContext.Provider>

}
export const useGlogalContext=()=>{
    const context=useContext(WatchListContext);
    return context;
}
export {WatchListContext, WatchListProvider}