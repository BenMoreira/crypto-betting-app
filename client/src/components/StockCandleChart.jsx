import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { getCoinData } from '../API/CoinAPI';

NoDataToDisplay(Highcharts);

const StockCandleChart = ({cryptoName, viewType,...props}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
      let d = getCoinData("http://localhost:3001", cryptoName);
      d.then(res => {
        viewType === 0 ? setData(res.data.shortTermOHLC) : setData(res.data.longTermOHLC);});
    },[cryptoName, viewType]);


      const options = {
        chart: {
            events: {
            // load() {
            //     this.showLoading();
            //     setTimeout(this.hideLoading.bind(this), 1000);
            // }
            },
            backgroundColor:"transparent",
          type: "candlestick",
          height:500,
          //width:"100%",
          //margin: [0, 0, 0, 0],
          styledMode: false,
          animation:{
            duration : 250
          }
        },
        noData:{},
        loading:{},
        legend:{enabled:false},
        title:{text:cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1).toLowerCase(),
            style: {
                color: '#84CAF5',
                fontWeight: 'bold'}
            },
        series: [
          {
            type: "candlestick",
            lineColor:"white",
            upColor: "#84CAF5",
            color: "white",
            data: data,
            pointWidth:viewType === 0 ? 15 : 10,
            lineWidth:0.75,
            marker: {
                enabled: false,
                states:{
                    hover:{enabled:false}
                }
             },
          }
        ],
        tooltip: { 
          enabled: true,
          backgroundColor: 'black',
          style: {
            color: 'white',
            fontWeight: 'bold'
          },
          headerFormat: "", //Header is currently empty, if taken off utc time is shown
        },
        yAxis:{
            title:{text:undefined},
            labels:{
              x:25,
              y:-5,
            },
            softMin: data[1] * 0.95,
            softMax: data[1] * 1.05,
            gridLineColor: "#212121",
        },
        xAxis:[{
            lineColor: "#212121",
            tickInterval : viewType === 0 ? 0.1 * (24 * 3600 * 1000) : 1 * (24 * 3600 * 1000),
            //tickPixelInterval : 100,
            tickLength: 10,
            title:{text:undefined},
            labels:{
                y:25,
               formatter:function(){
                    if(viewType === 0 )
                      return Highcharts.dateFormat('%m/%d | %l:%M %p',this.value)
                    else 
                    return Highcharts.dateFormat('%m/%d | %l:%M %p',this.value)
                   //return Highcharts.dateFormat('%d %m %Y',this.value);
               }
            }
          }],
        plotOptions: {
            line: {
                marker: {
                    enabled: false,
                    states:{
                        hover:{enabled:false}
                    }
                }
            },
        },
        credits:{enabled:false},
        
      };


  return (
    
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}

export default StockCandleChart
