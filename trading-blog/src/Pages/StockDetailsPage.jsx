import { useParams } from "react-router-dom";
import {useState, useEffect } from "react";
import FinnHub from "../Apis/FinnHub";
import StockChart from "../Components/StockChart";
import StockData from "../Components/StockData";
const formatData=(data)=>{
    return data.t.map((el, index)=>{
        return{
            x:el*1000,
            y:Math.floor(data.c[index])
        }
    })
}
const StockDetailsPage =()=>{
    const {symbol}=useParams(); 
    const[chartData, setChartData]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const date = new Date();
            const currentTime= Math.floor(date.getTime()/1000);
           let oneDay;
            if(date.getDay()===6){
              oneDay  = currentTime-2*24*60*60;
            }
           else if(date.getDay()===0){
                oneDay  = currentTime-3*24*60*60;
              }
              else if(date.getDay()===1){
                oneDay  = currentTime-4*24*60*60;
              }
              else{
                oneDay  = currentTime-24*60*60;
            }
              const oneWeek=currentTime-7*24*60*60;
              const oneYear=currentTime-365*24*60*60;
              try{
                const responses= await Promise.all([FinnHub.get("/stock/candle", {
                        params:{
                            symbol,
                            from:oneDay,
                            to:currentTime,
                            resolution:30
                            }}),
                        FinnHub.get("/stock/candle", {
                            params:{
                                symbol,
                                from:oneWeek,
                                to:currentTime,
                                resolution:60
                                }}),
                                FinnHub.get("/stock/candle", {
                                    params:{
                                        symbol,
                                        from:oneYear,
                                        to:currentTime,
                                        resolution:"W"
                                        }})]) 
                            //console.log(responses);
                            setChartData({
                                day:formatData(responses[0].data),
                                week:formatData(responses[1].data),
                                year:formatData(responses[2].data)
                              })
                             // console.log(chartData)    
              }
              
              catch(error){
                console.log(error)
              }
        }
        fetchData();
    },[symbol])
 
return(
  
    <div >
        {chartData && (
        <div> 
        <StockChart chartData={chartData} symbol={symbol}/>
        <StockData symbol={symbol}/>
        </div>)}
    </div>
)

}
export default StockDetailsPage;