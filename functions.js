

var data = "";
// now that you can click on the result list for the ticker, this is now a redundant feature- either remove or give option to enter ticker in directly
$('.stock-button').on('click', function (event) {
    event.preventDefault();
    //this works
    data = $('input[name="company-to-research"]').val(),
    //this didn't work...understand why!
    // data = $('input["#exact ticker"]').val(),

    console.log(data);

    findStock(data);
});

//this is where you enter in an approximate company name
$('.lookupButton').on('click', function(event) {
  event.preventDefault();
  findTicker();
})

//fires get to markit ticker lookup API
function findTicker(){
    var possibleStock = $('input[name="find a ticker"]').val();
    console.log("it's linked!");
    console.log(possibleStock);

    $.ajax({
        url: 'https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + possibleStock,
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {



      $('.ticker-list').empty();
      $(response).each( function(index){
        var coName = response[index]["Name"];
        var tickerSymbol = response[index]["Symbol"];
        var eachResult = "<li class='result' id=" +tickerSymbol +">company name: "+ coName + " | ticker symbol: " + tickerSymbol+ "</li>";
        console.log(eachResult);
// thanks tom! make sure you fully understand the logic
      $('.ticker-list').append(eachResult);
      $('.result').on("click", function(){
        var abbr = $(this).attr("id")
        findStock(abbr)
        console.log("aaa")
      })
      });



    }).fail(function(err){
      console.log('we failed :/');
      console.log(err);
    });
}



// I'm pretty sure this is duplicate code?
  $('.stock-button').on('click', function (event) {
      event.preventDefault();

      //this works
      data = $('input[name="company-to-research"]').val(),
      //this didn't work...understand why!
      // data = $('input["#exact ticker"]').val(),

      console.log(data);

      findStock(data);
  });


//API call to Markit to get stock quote 
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

  // $('div').append(data.Name + ' traded at a hight of' + data.High).appendTo('#stock-output');
}
// so it works to do things this way, but




//brandon idea- just do an "onclick" in the html to fire up the findStock function, which would get rid of the need for lines 11 through 18!

// $.get('http://dev.markitondemand.com/MODApis   /Api/v2/Quote/jsonp?symbol=MSFT&callback=myFunction', function () {
//   alert('fired off');
// }).then(console.log(result))
// .catch(alert('unsucessful'));






// 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + stockSymbol + '&callback=myFunction'

// httpRequest.onreadystatechange= markitData;
//






/* copied and pasted from markit repo!

*/
// var Markit = {};
/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
// Markit.QuoteService = function(sSymbol, fCallback) {
//     this.symbol = sSymbol;
//     this.fCallback = fCallback;
//     this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
//     this.makeRequest();
// };
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
// Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
//     this.fCallback(jsonResult);
// };
// /**
// * Ajax error callback
// */
// Markit.QuoteService.prototype.handleError = function(jsonResult) {
//     console.error(jsonResult);
// };
/**
* Starts a new ajax request to the Quote API
*/
// Markit.QuoteService.prototype.makeRequest = function() {
//     //Abort any open requests
//     if (this.xhr) { this.xhr.abort(); }
//     //Start a new request
//     this.xhr = $.ajax({
//         data: { symbol: this.symbol },
//         url: this.DATA_SRC,
//         dataType: "jsonp",
//         success: this.handleSuccess,
//         error: this.handleError,
//         context: this
//     });
// };

// new Markit.QuoteService("booo", function(jsonResult) {
//
//     //Catch errors
//     if (!jsonResult || jsonResult.Message){
//         console.error("Error: ", jsonResult.Message);
//         return;
//     }
//
//     //If all goes well, your quote will be here.
//     console.log(jsonResult);
//
//     //Now proceed to do something with the data.
//   //  $("h1").first().text(jsonResult.Name);
//
//     /**
//     * Need help? Visit the API documentation at:
//     * http://dev.markitondemand.com
//     */
// });
