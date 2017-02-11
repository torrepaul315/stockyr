function findStock(sSymbol) {
  $.ajax({
    url: 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + sSymbol,
    method: 'GET',
    dataType: 'jsonp'

  }).done(function(data) {
  $('<div>').append(data.Name + ' traded at a high of ' + data.High + ' today.').appendTo('#stock-output');

    // console.log(data.Name);
    // console.log(data.High);
  }).fail(function(err) {
    console.log(err);
  });


marquee - its an html element that will scroll the text across like a stock ticker

function stockChart(ticker) {
  var intChartURL = "https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=" + JSON.stringify({
  Normalized: "true",
  DataPeriod: "Day",
  EndOffsetDays: 365,
  NumberOfDays: 365,
  Elements: [
    {Symbol: ticker, Type: "price"}
  ]
  })



    $.ajax({
          url: intChartURL,
          method: 'GET',
          dataType: 'json',

        }).done(function(response) {
          console.log(response);
          // console.log(response.Dates.length);
          // console.log(response.Elements[0].DataSeries.volume.values.length);
          // console.log(response.Positions.length);
         // now I need to create an array with all of the data received from the call!
          var stockData = [];
          for (x = 0; x < response.Dates.length; x++) {
            stockData.push([response.Dates.x, response.Elements[0].DataSeries.volume.values.x,response.Positions.x])
          }
          console.log(stockData);






          // var data = response.getDataTable();
          // var chart = new google.visualization.DataTable(document.getElementById('chart_div'));
          // chart.draw(data, {width: 400, height: 400, is3D: true});



        }).fail(function(err){
          console.log('we failed :/');
          console.log(err);
        });


        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <!-- <script type="text/javascript">

          // Load the Visualization API and the corechart package.
          google.charts.load('current', {'packages':['corechart', 'line']});

          // Set a callback to run when the Google Visualization API is loaded.
          google.charts.setOnLoadCallback(drawAxisTickColors);

          // Callback that creates and populates a data table,
          // instantiates the pie chart, passes in the data and
          // draws it.
          function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'pizzahs');
            data.addRows([
              ['Mushrooms', 3],
              ['Onions', 1],
              ['Olives', 1],
              ['Zucchini', 1],
              ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {'title':'what the surviving members of the wutang clan put on their pizzas',
                           'width':500,
                           'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
          }
        </script> -->
