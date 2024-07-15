import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';

function Graphs() {
    const user = useSelector((state) => state);
    const id =user.LoginLogoutUser.user._id;
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Department Wise-Total Vs Closed '
        },
        xAxis: {
            categories: [],
            crosshair: true
        },
        yAxis: {
            min: 0,
            tickPositions: [0, 5, 10, 15, 20],
            title: {
                text: 'Number of Projects',

            }
        },
        series: [{
            name: 'Total Registered',
            data: [],
            color: 'blue' 
        }, {
            name: 'Total Closed',
            data: [],
            color: 'green' 
        }]
    });
    useEffect(() => {
      async  function getGraphData (){
            await axios.get(`https://online-project-management-onae.onrender.com/ProjectList/department`,{
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
                    const totalClosed = data.map(item => item.total_closed);
    
                    setChartOptions({
                        xAxis: {
                            categories: categories,
                            crosshair: true
                        },
                        series: [{
                            name: 'Total Registered',
                            data: totalRegistered
                        }, {
                            name: 'Total Closed',
                            data: totalClosed,
                    
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
    <div className='w-[500px] absolute lg:bottom-[-3rem] shadow-2xl md:bottom-[-2rem]  sm:bottom-[-5rem] Sm:bottom-[-3rem]  '>
      
      <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
    </div>
  )
}

export default Graphs
