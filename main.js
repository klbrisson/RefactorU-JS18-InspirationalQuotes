$(document).on('ready', function() {

// Prepopulate some quotes
var existingQuotes =
[["Life isn’t about getting and having, it’s about giving and being.", "Kevin Kruse"],
["Whatever the mind of man can conceive and believe, it can achieve.", "Napoleon Hill"],
["Strive not to be a success, but rather to be of value.", "Albert Einstein"],
["Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", "Robert Frost"],
["I attribute my success to this: I never gave or took any excuse.", "Florence Nightingale"],
["You miss 100% of the shots you don’t take.", "Wayne Gretzky"],
["I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games." +
" 26 times I’ve been trusted to take the game winning shot and missed." +
" I’ve failed over and over and over again in my life. And that is why I succeed.", "Michael Jordan"],
["The most difficult thing is the decision to act, the rest is merely tenacity.", "Amelia Earhart"],
["Every strike brings me closer to the next home run.", "Babe Ruth"]];



// QUOTE FORM VALIDATION
	function isInputValid (input) {
		return typeof input !== 'string' || input === '' ? false : true;
	}

// QUOTE CREATION
	// Quote Constructor
	function Quote (text, author) {
		this.text = text;
		this.author = author;
	}

	// Create quote html element from quote object and html template
	function createQuote(quoteObj) {
		var newQuote = $('.quote.template').clone();
		newQuote.find('.quote-text').text('\"' + quoteObj.text + '\"');
		newQuote.find('.quote-author').text('- ' + quoteObj.author);
		newQuote.removeClass('template');
		return newQuote;
	}




	// // render existing quotes
	// var quoteArr = existingQuotes.map(function(arr) {
	// 	return new Quote(arr[0], arr[1]);
	// });
	// Array of quote objects 
	var quoteArray = JSON.parse(localStorage.getItem('quotes'));
	console.log(quoteArray);




// EVENT HANDLERS
	$(document).on('click','#add-quote', function() {
		$('.quote-form').toggle();
	});

	$(document).on('submit','.quote-form', function() {

		var quoteText = $('#new-text').val();
		var quoteAuthor = $('#new-author').val();
		// validate text
		if (isInputValid(quoteText) && isInputValid(quoteAuthor)) {
			//create quote object and add to array
			var newQuote = new Quote(quoteText,quoteAuthor);
			quoteArray.unshift(newQuote);
	console.log(quoteArray);

			//render quotes from array
			$('.quote-container').empty();

			quoteArray.map(
				function(quote) {
					$('.quote-container').append(createQuote(quote));
				});

			//save quotes to local storage
			localStorage.setItem('quotes',JSON.stringify(quoteArray));
		}

		// $('.main-container').append(newQuote);
		$(this)[0].reset();
		$(this).toggle();
		return false;
	});


});