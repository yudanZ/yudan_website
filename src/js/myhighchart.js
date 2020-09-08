$(document).ready(function(){

    async function getWeatherAW(woeid){
        try{
             const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);

             const data = await result.json();
             //const tomorrow = data.consolidated_weather[1];
             //console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
             return data;
             //console.log(data);
        }catch(error){
            console.log(error);
        }
         
         
    }

     let dataZurich;
     let xAxisCategoriesAll = [];
     let yAxisCategoriesAll = [];
     getWeatherAW(784794).then(data => {
         dataZurich = data.consolidated_weather;
         //console.log(dataZurich);

         $.each(dataZurich, function( key, value){
            xAxisCategoriesAll.push(value.applicable_date);
            let temp = value.the_temp;
            //console.log(typeof(temp));
            temp = temp.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            //console.log(temp);
            yAxisCategoriesAll.push(parseFloat(temp));
         });
         //console.log(yAxisCategoriesAll);

         
        
        $("#container1").highcharts({
            chart: {
                type: "line"
            },
            title: {
                text: "Recent 6 days weather in Zurich"
            },
            subtitle: {
                text: "Source: metaweather.com"
            },
            xAxis: {
                categories: xAxisCategoriesAll
            },
            yAxis: {
                title: {
                    text: "Temperature (C)"
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: "Zurich",
                data:  yAxisCategoriesAll
            }]
        });
     });
    
    
    
 
});
