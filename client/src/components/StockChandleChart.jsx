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
            backgroundColor:"black",
          type: "candlestick",
          height:200,
          width:250,
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
            type: 'ohlc',
            upColor: "green",
            color: "#FF2D00",
            data: data, 
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
                   return Highcharts.dateFormat('%d %m %Y',this.value);
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
        // defs: {
        //     glow: {
        //         tagName: 'filter',
        //         id: 'glow',
        //         opacity: 0.5,
        //         children: [{
        //             tagName: 'feGaussianBlur',
        //             result: 'coloredBlur',
        //             stdDeviation: 2.5
        //         }, {
        //             tagName: 'feMerge',
        //             children: [{
        //                 tagName: 'feMergeNode',
        //                 in: 'coloredBlur'
        //             }, {
        //                 tagName: 'feMergeNode',
        //                 in: 'SourceGraphic'
        //             }]
        //         }]
        //     }
        // },
        credits:{enabled:false}
        
      };

    //   const options2 = {
    //     chart: {
    //         events: {
    //         load() {
    //             this.showLoading();
    //             setTimeout(this.hideLoading.bind(this), 1000);
    //         }
    //         },
    //       //type: "candlestick",
    //       height:500,
    //       width:500,
    //       //margin: [0, 0, 0, 0],
    //       styledMode: true,
    //       animation:{
    //         duration : 10
    //       }
    //     }
    // }

  return (
    
    <div>
      <HighchartsReact highcharts={Highcharts} options={options}/>
    </div>
  )
}

export default StockCandleChart
