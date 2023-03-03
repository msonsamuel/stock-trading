import AutoComplete from "../Components/AutoComplete"
import StockList from "../Components/StockList"
import trading from "../images/trading.jpg"
const StockOverviewPage =()=>{
    return(
        <div>
        <div className="text-center"> 
        <img src={trading} alt="img"/>
        </div>
     <AutoComplete/>
     <StockList/> 
    </div>
    )
    
    }
    export default StockOverviewPage;