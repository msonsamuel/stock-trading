import { useState, useEffect } from "react";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import FinnHub from "../Apis/FinnHub";
import {useGlogalContext}  from "../Control/WatchListContext";

const StockList =()=>{
    const {watchList,deleteStock}=useGlogalContext();
    const[stocks, setStocks]=useState([]);
    const navigate = useNavigate(); 
    const changeColor=(change)=>{
            return change > 0 ? "success": "danger";
    }
    const rendrIcon=(change)=>{
        return change > 0 ? <BsFillCaretUpFill/>: < BsFillCaretDownFill/>;
    }
    
    useEffect(()=>{
        let isMounted = true;   
        const fetchData=async()=>{
            try {
               const responses = await Promise.all(
                watchList.map((stock)=>{
                    return FinnHub.get("/quote",{
                        params:{
                            symbol:stock
                        }
                    })
                }))
               
                //console.log(responses);
              const Data=responses.map((response)=>{
                return{data:response.data,
                symbol:response.config.params.symbol}
              })
                if (isMounted){
                setStocks(Data);
                }
               
            } catch (error) {
                
            }
                } 
            fetchData();
    
    return ()=>(isMounted=false)
    },[watchList])

    const handleStockSelect=(symbol)=>{
navigate(`detail/${symbol}`)
    }
   
    return(
        <div> 
            <table className="table hover mt-5">
                <thead style={{color:"rgba(79, 89, 102)"}}>
               <tr>
                <th scope="col">Name</th>
                 <th scope="col">Last</th>
                  <th scope="col">Chg</th>
                   <th scope="col">chg%</th>
                    <th scope="col">High</th>
                     <th scope="col">Low</th>
                       <th scope="col">Open</th>
                         <th scope="col">PClose</th>
               </tr>
                </thead>
                <tbody>
                    {
                stocks.map((stockdata)=>{
                    return(
                        
                        <tr onClick={()=>handleStockSelect(stockdata.symbol)}
                        className="table-row" key={stockdata.symbol} style={{cursor:"pointer"}}>
                            <th cope="row">{stockdata.symbol}</th>
                            <td scope="row">{stockdata.data.c}</td>
                            <td className={`text-${changeColor(stockdata.data.d)}`}>{stockdata.data.d}{rendrIcon(stockdata.data.d)}</td>
                            <td className={`text-${changeColor(stockdata.data.d)}`}>{stockdata.data.dp} {rendrIcon(stockdata.data.d)} </td>
                            <td>{stockdata.data.h}</td>
                            <td>{stockdata.data.l}</td>
                            <td >{stockdata.data.o}</td>
                            <td>{stockdata.data.pc} <button
                            className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e)=>{
                                e.stopPropagation();
                                deleteStock(stockdata.symbol)
                            }}>Remove</button></td>
                        </tr>
                    )
                })
                    }
                </tbody>
            </table>
            </div>
    )
            
    }
    export default StockList;