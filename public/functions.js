$.ajax({
    url: 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=86ebc08b5f104c9bab370a2b6a8d0471',
    method: 'GET',
    dataType: 'json'

}).done(function(response) {

    // ["index"]["description"]
    // console.log(response["articles"][1]["description"]);
    //!!!!! cool stretch goal! (for thursday if everything else is working) make the marquee a clickable html link to the bloomberg site!
    $(response["articles"]).each(function(index) {
        $('marquee').append(response["articles"][index]["title"] + '- ' + response["articles"][index]["description"] + '.......')
        $('marquee').css('color', 'green');
    });

    // $('marquee').append(response["articles"][]["description"] + ' ' +
    // response[index]["title"]

    //  + '.......')


    // $('<div>').append(data.Name + ' traded at a high of ' + data.High + ' today.').appendTo('#stock-output');



}).fail(function(err) {
    console.log('we failed :/');
    console.log(err);
});


var data = "";
// now that you can click on the result list for the ticker, this is now a redundant feature- either remove or give option to enter ticker in directly
$('.stock-button').on('click', function(event) {
    event.preventDefault();
    //this works
    data = $('input[name="company-to-research"]').val(),
        //this didn't work...understand why!
        // data = $('input["#exact ticker"]').val(),

        console.log(data);

    findStock(data);
});

//this is where you enter in an approximate company name
// $('.lookupButton').on('click', function(event) {
//   event.preventDefault();
//   // console.log(".find a ticker");
//   findTicker();
// })


$('.tickerfinder').on('submit', function(event) {
    event.preventDefault();
    if ($('input[name="find a ticker"]').val() !== "") {

        findTicker();
        $('#stock-output').empty();
    } else {
        $('.ticker-list').empty();
        $('.ticker-list').append("Please enter a search term or at least a partial company name").css('color', 'red')
    }
});



//fires get to markit ticker lookup API
function findTicker() {
    var possibleStock = $('input[name="find a ticker"]').val();
    $.ajax({
        url: 'https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + possibleStock,
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {
        $('.ticker-list').empty();
        if (response.length === 0 || response === "{}") {
            alert('sorry, no results were found')
        } else {

            $('.ticker-list').append("here's what we found:").css('color', 'blue')
            //  'border-right-color', 'black');
            $('.main-left').css('border-right', '1px')

            $(response).each(function(index) {
                //check this with Isaac re this if line below- put in busta rhymes, successful response, empty array!
                // if (response.length === 0 ) {
                //   alert('sorry, no results were found')
                // }
                //yep, this validation script is not working either!
                // as per Isaac, use the stock exchange value as the validator
                if (response[index]["Name"] !== "" && response[index]["Exchange"] !== "BATS Trading Inc") {
                    var coName = response[index]["Name"];
                    var tickerSymbol = response[index]["Symbol"];
                    var eachResult = "<li class='result' id=" + tickerSymbol + ">company name: " + coName + " | ticker symbol: " + tickerSymbol + "</li>";

                    // thanks tom! make sure you fully understand the logic
                    //!!!! another thing to t/s- how to add on hover color change? tried several different ways to no result!
                    $('.ticker-list').append(eachResult).css({
                        color: "green"
                    });
                }
                //   var abbr = $(this).attr("id")
                //   findStock(abbr)
                //   console.log("aaa")

            });

            $('.result').on("click", function() {
                $('#stock-output').empty();
                var abbr = $(this).attr("id")
                findStock(abbr)
                console.log("aaa")
            });

            $('.result').on('mouseenter', function() {
                $(this).css('color', 'orange');
            })

            $('.result').on('mouseleave', function() {
                $(this).css('color', 'green');
            })
        }

    }).fail(function(err) {
        console.log('we failed :/');
        console.log(err);
    });
}



// I'm pretty sure this is duplicate code?
$('.stock-button').on('click', function(event) {
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
        url: 'https://galvanize-cors-proxy.herokuapp.com/http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + sSymbol,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function(data) {
        console.log(data);


        var dateStamp = stampTime(data);
        //  'as of ' + data.Timestamp.slice(0, 9) + ' at ' + data.Timestamp.slice(10, 18) + ', ';

        console.log(dateStamp);

        var yearToDate = ".  " + data.Name + "'s year to date return is " + data.ChangePercentYTD.toPrecision(3) + "%."

        console.log(yearToDate);
        //so yeah! this function is not doing what I'd like it to do
        var intraDay = upOrDown(data);

        console.log(intraDay);


        $('<div>').append(dateStamp + data.Name + intraDay +
            ', after starting the day out at ' + data.Open + yearToDate).appendTo('#stock-output');


        $('<div>').append(data);

        console.log(data.Name);
        console.log(data.High);
    }).fail(function(err) {
        console.log(err);
    });

}

function stampTime(data) {
    if (data.Timestamp === null) {
        return 'As of today, '
    } else if (data.Timestamp.slice(10, 18) === "00:00:00") {
        return 'As of ' + data.Timestamp.slice(0, 9) + ', '
    } else {
        return 'As of ' + data.Timestamp.slice(0, 9) + ' at ' + data.Timestamp.slice(10, 18) + ', ';
    }
}

function upOrDown(data) {
    console.log(data);
    if (data.ChangePercent >= 0) {
        return ' is trading up ' + data.ChangePercent.toPrecision(3) + "% this current market session"
    } else {
        return ' is trading down ' + data.ChangePercent.toPrecision(3) + "% this current market session"
    };
}
