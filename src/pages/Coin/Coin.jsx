import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart.jsx'

const Coin = () => {

    const {coinId} = useParams();
    const {currency} = useContext(CoinContext);


    const [coinData, setCoinData]= useState();
    const [historicalData, setHistoricalData] = useState();

    const fetchCoinData = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-uFi91oRgF8sJjWVUABSHuvxS'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
        
    }

    const fetchHistoricalData = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-uFi91oRgF8sJjWVUABSHuvxS'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=15&interval=daily`, options)
            .then(response => response.json())
             
            .then(response => setHistoricalData(response))
            .catch(err => console.error(err));
               
    }

    // const fetchHistoricalData = async () => {
    //     const options = {
    //         method: 'GET',
    //         headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-uFi91oRgF8sJjWVUABSHuvxS' }
    //     };
    
    //     try {
    //         // Make the fetch call
    //         const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&days=15&interval=daily`, options);
            
    //         // Check if response is ok
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    
    //         // Parse the response data
    //         const data = await response.json();
               
                
    //         // Update state or handle data
    //         setHistoricalData(data);
    //     } catch (err) {
    //         console.error('Error fetching coin data:', err);
    //     }
    // };
    

    useEffect(()=>{
        fetchCoinData();
        fetchHistoricalData();
    },[currency])

    if(coinData,historicalData){
        return (
            <div className='coin'>
                <div className="coin-name">
                    {/* <img src={coinData.image.large} alt=""/> */}
                    <img src={coinData?.image.large} alt={coinData?.name || "Default Alt"} />

                 <p><b>{coinData?.name} ({coinData?.symbol.toUpperCase()})</b></p>
                </div>

                <div className="coin-chart">
                    <LineChart historicalData={historicalData}/>
                    
                </div>

                <div className="coin-info">
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData?.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Crypto Price </li>
                        {/* <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li> */}
                        <li>{currency.symbol}{coinData?.market_data.current_price[currency.name].toLocaleString()}</li>

                    </ul>
                    <ul>
                        <li>Market Cap </li>
                        <li>{currency.symbol}{coinData?.market_data?.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 hour high </li>
                        <li>{currency.symbol}{coinData?.market_data?.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 hour low </li>
                        <li>{currency.symbol}{coinData?.market_data?.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
             
            </div>
        )
    }else{
        return(
            <div className="spinner">
                <div className="spin">
               
                 </div>
            </div>
        )
    }
 
  
}

export default Coin
