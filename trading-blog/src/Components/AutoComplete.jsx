import { useState, useEffect} from "react";
import FinnHub from "../Apis/FinnHub";
import {useGlogalContext}  from "../Control/WatchListContext";
const AutoComplete =()=>{
    const [search, setSearch]=useState("")
    const [results, setResult]=useState([]);
   const {addStock}=useGlogalContext();
    const renderDropDown=()=>{
        const dropDownClass=search ? "show": null
        return(
            <ul style={{height:"500px", overflowY:"scroll", overflowX:"hidden", cursor:"pointer"}} className={`dropdown-menu ${dropDownClass}`}>
                {
             results.map((result)=>{
          return(
           <li className="dropdown-item" key={result.symbol} onClick={()=>{addStock(result.symbol); setSearch(""); } }>
           {result.description} ({result.symbol})</li>
)} ) }
</ul>
  ) }

    useEffect(()=>{
        let isMounted=true;
        const fetchData = async()=>{
            try {
                const response= await FinnHub.get("/search",
                { 
                    params:{
                    q:search }
                }
                )
                console.log(response.data)
               if(isMounted){
                setResult(response.data.result)
               setSearch(search)
               }
                            
            } 
            catch(error){}        
        }
        if(search.length > 0){
            fetchData()
        }
      else{
        setResult([search])
      }
       return ()=>(isMounted=false)
        },[search] )
        const handleChange=(e)=>{
            setSearch(e.target.value)
        }
    return (
         <div className="w-50 p-5 rounded mx-auto">
          <div className="form-floating dropdown">
          <input type="text" id="search" className="form-control" placeholder="search" autoComplete="off" value={search} onChange={handleChange}/>
           <label htmlFor="search"> search data</label>
           {renderDropDown()}
            </div>
         </div>
         )
    
    }
    export default AutoComplete;