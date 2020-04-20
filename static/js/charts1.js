$(document).ready(function(){

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March',],
        datasets: [{
            label: 'My First dataset',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 200, 10)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {
        legend:{
            display: false
        },
        cutoutPercentage: 30
    }
    });
    function update_chart(chart, update_data){
        chart.data.datasets[0].data = update_data.data;
        chart.data.labels = update_data.labels;
        chart.update();
    }

    function get_data_from_tobacco_strings(){
        var structure_input_strings = $(".row#tobacco_string");
        var list_of_brand_flavour = [];
        var list_of_percents = [];
        for (var i=0; i < structure_input_strings.length; i++){
            var brand_flavour = structure_input_strings[i].getElementsByTagName('input')[0].value + ' ' +
                structure_input_strings[i].getElementsByTagName('input')[1].value; // brand flavour

            var percents = structure_input_strings[i].getElementsByTagName('input')[2].value;
            
            list_of_brand_flavour.push(brand_flavour);
            list_of_percents.push(percents);
        }
        return [list_of_brand_flavour, list_of_percents];
    };

    $("#update_chart").click(function(){
        var update_data = get_data_from_tobacco_strings();
        update_data = {'labels':update_data[0], 'data':update_data[1]};
        update_chart(chart, update_data);
    });


});

