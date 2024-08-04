import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import "../image.css"

function Graphs() {
    const user = useSelector((state) => state);
    const id = user.LoginLogoutUser.user._id;
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column',
            backgroundColor: 'white',
            plotBackgroundColor: 'white',
          
           
    
        },
        title: {
            text: ''
        },
        xAxis: {
           
            //   Persentage : [],
            categories: [],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            tickPositions: [],
           
            title: {
                text: '',

            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.3,
                groupPadding: 0.2,
                dataLabels: {
                    enabled: true,
                    color: 'black', // Set the color of the labels
                    
                }
            },
           
           
        },
        series: [{
            name: 'Total Registered',
            data: [],
            color: 'blue',

           
        }, {
            name: 'Total Closed',
            data: [],
            color: 'green' ,
            
        }]
    });
    useEffect(() => {
      async  function getGraphData (){
            await axios.get(`http://localhost:3001/ProjectList/department`,{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              })
                .then(response => {
                    // console.log(response)
                    const data = response.data;
                    const categories = data.map(item => item.department);
                    // console.log(categories);
                    const totalRegistered = data.map(item => item.total_registered);
                    // console.log(totalRegistered)
                    const totalClosed = data.map(item => item.total_closed);
                // console.log(totalClosed)
                const completionPercentages = totalRegistered.map((value, index) => {
                    const closed = totalClosed[index];
                    return value === 0 ? 0 : Math.round((closed / value) * 100);
                });
                console.log(completionPercentages)
                    setChartOptions({
                        chart: {
                            type: 'column',
                            backgroundColor: 'white',
                            plotBackgroundColor: 'white',
                        },
                        xAxis: {
                            // Persentage : completionPercentages.map((item)=>`${item}+% `),
                            categories: categories.map((el)=> el.substr(0, 3).toUpperCase()),
                    //  crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            tickPositions: [0, 5, 10, 15, 20],
                          
                            title: {
                                text: '',
                
                            },
                            
                        },
                        series: [{
                            name: 'Total ',
                            data: totalRegistered,
                            value:totalClosed.map((item)=> item)
                        }, {
                            name: ' Closed',
                            data: totalClosed,
                            value:totalRegistered.map((item)=> item)
                    
                        }]
                    });
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        }
        getGraphData();
    }, [id]);

  return (
    <div className='lg:ml-3 Sm:ml-2 bg-white Sm:rectangle   lg:w-[600px] Sm:w-[340px] md:w-[500px] absolute lg:top-[3rem]  md:bottom-[-2rem]  shadow-lg  sm:bottom-[-5rem] Sm:top-[3rem]  '>
     
      <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
               
            />
    </div>
  )
}

export default Graphs
