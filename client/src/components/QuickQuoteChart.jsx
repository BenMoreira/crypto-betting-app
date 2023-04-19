import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { getCoinData } from '../API/CoinAPI';

NoDataToDisplay(Highcharts);

const QuickQuoteChart = ({cryptoName, viewType,...props}) => {

    const [data, setData] = useState([0, 0]);

    useEffect(() => {
      let d = getCoinData("http://localhost:3001", cryptoName);
      d.then(res => {
        viewType === 0 ? setData(res.data.shortTermOHLC.map(OHLC => {return [OHLC[0], OHLC[1]]})) : setData(res.data.longTermOHLC);});
    },[cryptoName, viewType]);


    function getMinPrice(){
      let priceData = [];
      data.forEach(entry => {
        priceData.push(entry[1]);
      });
      return Math.min(...priceData);
    }

    function getMaxPrice(){
      let priceData = [];
      data.forEach(entry => {
        priceData.push(entry[1]);
      });
      return Math.max(...priceData);
    }

      const options = {
        chart: {
            events: {
            // load() {
            //     this.showLoading();
            //     setTimeout(this.hideLoading.bind(this), 1000);
            // }
            },
            backgroundColor:"transparent",
            // backgroundColor : {
            //   linearGradient : [0, 0, 0, 400],
            //   stops : [
            //     [0, 'rgb(96, 96, 96)'],
            //     [1, 'rgb(16, 16, 16)']
            //   ]
            // },
          //type: "areaspline",
          height:125,
          //width:"100%",
          margin: [0, 0, 0, 0],
          styledMode: false,
          animation:{
            duration : 250
          }
        },
        noData:{},
        loading:{},
        legend:{enabled:false},
        title:{text:""},
        // title:{text:cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1).toLowerCase(),
        //     style: {
        //         color: '#84CAF5',
        //         fontWeight: 'bold'}
        //     },
        series: [
          {
            type: "area",
            lineColor:"#43B0ED",
            fillColor : {
              linearGradient: [0, -25, 0, 200],
              //#F1F8FE - 50
              //#84CAF5 - 300
              //#43B0ED - 400
              //#1B98E0 - 500
              //#124468 - 900
              stops: [
                
                  [0, "#43B0ED"],
                  [0.75, "transparent"]
              ]
            },
            data: data,
            pointWidth:viewType === 0 ? 15 : 10,
            //lineWidth:0.75,
            marker: {
                enabled: false,
                states:{
                    hover:{enabled:false}
                }
             },
            states:{hover:{enabled:false}}
          }
        ],
        tooltip:{enabled:false},
        yAxis:{
            title:{text:undefined},
            //softMin: data[0] * 0.95,
            //softMax: data[1][1] * 1.05,
            //min: data[0][1] * 0.95,
            //max: data[0][1] * 1.05,
            min: getMinPrice() * 0.98,
            max: getMaxPrice() * 1.02,
            gridLineColor: "transparent",
        },
        xAxis:[{
            lineColor: "transparent",
            title:{text:undefined},
            labels:{
               formatter:function(){
                    return Highcharts.dateFormat('%l:%M %p',this.value);
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

export default QuickQuoteChart
