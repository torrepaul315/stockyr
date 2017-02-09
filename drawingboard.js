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
