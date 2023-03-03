import { useState } from 'react';
import Chart from 'react-apexcharts';
const StockChart=({chartData, symbol})=>{
    const{day, week, year}=chartData;
    const[dateFormat, setDateFormat]=useState("24h");
    const determineTimeformat=()=>{
        switch(dateFormat){
                case "24h":
                return day
                case "7d":
                return week
                case "1y":
                return year
                default:
                return day
        }
    }
   //console.log(chartData)

//const color =determineTimeformat()[determineTimeformat().length-1].y-determineTimeformat()[0].y > 0 ? "#26c281":"#ed3419";

    const options={
//colors:[color],
        title:{
            text:symbol,
            align:"center",
            style:{
            fontSize:"24px"
            }
        },
        chart:{
            id:"stock data",
            Animations:{
                speed:1300,
                }
        },
        xaxis:{
            type:"datetime",
            labels:{
                datetimeUTC:false
            }
        },
        tooltip:{
            X:{
                format:"MM dd HH:MM"
            }
        }
    }
    const series=[{
        name:symbol,
        data:determineTimeformat()
    }]
    const renderButtonSelect=(button)=>{
            const classes ="btn m-1 ";
            if (button===dateFormat){
                return classes+"btn-primary"
            }
            else{
                return classes+"btn-outline-primary"
            }
    }
return <div className="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} type="area" width="100%"/>
    <div>
       <button className={renderButtonSelect("24h")} onClick={()=>setDateFormat("24h")}>1d</button> 
       <button className={renderButtonSelect("7d")} onClick={()=>setDateFormat("7d")}>7d</button> 
       <button className={renderButtonSelect("1y")} onClick={()=>setDateFormat("1y")}>1y</button> 
    </div>
</div>
}
export default StockChart;