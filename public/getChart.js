$.ajax({
      url:'http://dev.markitondemand.com/Api/v2/InteractiveChart/json?input=' +sSymbol,
      method: 'GET',
      dataType: 'json'

//url string + JSON.stringify({

//generate the url first as a variable, then pass the variable into the ajax request!
// all of the parameters you need to pass in...theres a bunch that you'll need to pass in!

})

    }).done(function(response) {
      console.log(response);



    }).fail(function(err){
      console.log('we failed :/');
      console.log(err);
    });


    // url: 'https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + possibleStock,
    // method: 'GET',
    // dataType: 'json'
  /* parameters i need to add to the json request!
  a. normalized : false
  b. StartDate :



     DataPeriod : TimePeriod (minute?)
     DataInterval : 1 (?)
     LabelInterval : 1
     Elements : [ "aapl", price, ]





     $.ajax({
           url:'https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/Api/v2/InteractiveChart/json?input=' +sSymbol,
           method: 'GET',
           dataType: 'json'
         }).done(function(response) {
           console.log(response);



         }).fail(function(err){
           console.log('we failed :/');
           console.log(err);
         });
