import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

NoDataToDisplay(Highcharts);

const StockCandleChart = ({data, ...props}) => {

    useEffect(()=>{
        console.log(data);
    })

      const options = {
        chart: {
            events: {
            load() {
                this.showLoading();
                setTimeout(this.hideLoading.bind(this), 1000);
            }
            },
            backgroundColor:"transparent",
          type: "candlestick",
          height:500,
          //width:"100%",
          //margin: [0, 0, 0, 0],
          styledMode: false,
          animation:{
            duration : 10
          }
        },
        noData:{},
        loading:{},
        legend:{enabled:false},
        title:{text:"Bitcoin",
            style: {
                color: '#84CAF5',
                fontWeight: 'bold'}
            },
        series: [
          {
            type: 'candlestick',
            lineColor:"white",
            upColor: "#84CAF5",
            color: "white",
            data: data, 
            pointWidth:10,
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
            softMin: data[1] * 0.95,
            softMax: data[1] * 1.05,
            gridLineColor: "#212121",
        },
        xAxis:[{
            lineColor: "#212121",
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
        credits:{enabled:false}
        
      };


  return (
    
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}

export default StockCandleChart
