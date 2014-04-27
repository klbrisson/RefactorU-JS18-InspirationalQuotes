
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

existingQuotes = existingQuotes.map(function(arr) {
	return new Quote(arr[0],arr[1]);
});
var allQuotes = new QuoteList();
for (var i=0; i<existingQuotes.length; i++) {
	addQuote(existingQuotes[i], allQuotes);
}
// End of code for starter quotes ---------------------------------


// QUOTE FORM VALIDATION
function isInputValid (input) {
	return typeof input !== 'string' || input === '' ? false : true;
}


// Quote Constructor
function Quote (text, author, id, rating) {
	this.text = text;
	this.author = author;
	this.rating = rating;
	this.id = id;
}


// QuoteList Object constructor
function QuoteList (obj) {
	var j = 0;
	if (arguments.length === 0) {
	}
	else if (arguments.length === 1 && obj.id === undefined) {
		for (key in obj) {
			var quote = new Quote(obj[key].text, obj[key].author, j, obj[key].rating);
			this[j] = quote;
			j++;
		}
	}
	else if (typeof obj.id !== undefined) {
		for (var i=0; i<arguments.length; i++){
			this[j] = arguments[i];
			j++;
		}
	}
}


// Create quote html element from quote object and html template
function createQuote(quoteObj) {
	var newQuote = $('.quote.template').clone();
	newQuote.find('.quote-text').text(quoteObj.text);
	newQuote.find('.quote-author').text(quoteObj.author);
	newQuote.removeClass('template').attr('data-id',quoteObj.id);
	newQuote.find('.rating').attr('data-rating',quoteObj.rating);
	return newQuote;
}


// render quote function
function renderQuotes(quotesList) {
	$('.quote-container').empty();
	for (key in quotesList) {
		$('.quote-container').prepend(createQuote(quotesList[key]));
		displayRating($('[data-rating]').data('rating'));
	}
};

// adds a quote object to a given quoteList
function addQuote (quoteObj, quotesList) {
	var newID = 0;
	for (key in quotesList) {
		newID = quotesList[key].id + 1;
	}
	quoteObj.id = newID;
	quotesList[newID] = quoteObj;
}

// filter quotes by author
function filterByAuthor(quotesList, author) {
	var authorQuotes = new QuoteList();
	for (key in quotesList) {
		if (quotesList[key].author === author) {
			addQuote(quotesList[key],authorQuotes);
		}
	}
	return authorQuotes;
}


// filter quotes by rating
function filterByRating(quotesList, rating) {
	var ratingQuotes = new QuoteList();
	for (key in quotesList) {
		if (quotesList[key].rating === rating) {
			addQuote(quotesList[key],ratingQuotes);
		}
	}
	return ratingQuotes;
}

function toggleStar()

// changes stars to filled based on rating
function displayRating(rating) {
	for (i=1; i <= 5; i++) {
		var star = $('[data-rating="' + rating + '"]').find('[data-star="' + i + '"]');
		i <= +rating ? star.text('★') : star.text('☆');
	}
}

// sets the rating for the given quote object within a quote list
function setRating(rating, thisID, quotesList) {
	quotesList[thisID].rating = rating;
}

// saves changes to quote list in local storage and re-renders quotes
function saveAndRender(item) {
	localStorage.setItem('quotes',JSON.stringify(item));
	renderQuotes(item);
}

// Get quotes from local storage, re-create quote objects
var storedQuotes = localStorage.getItem('quotes');
if (storedQuotes !== null && storedQuotes !== undefined){
	allQuotes = new QuoteList(JSON.parse(storedQuotes));
}
else if (allQuotes === undefined) {
	var allQuotes = new QuoteList();
}




// EVENT HANDLERS
$(document).on('ready', function() {
	saveAndRender(allQuotes);

	$(document).on('click','#add-quote', function() {
		$('.quote-form').toggle();
	});

	// Submit new quote, validate input, create quote object, push to quote array, save to local storage, and re-render quotes
	$(document).on('submit','.quote-form', function() {

		var quoteText = $('#new-text').val();
		var quoteAuthor = $('#new-author').val();
		// validate text
		if (isInputValid(quoteText) && isInputValid(quoteAuthor)) {
			var newQuote = new Quote(quoteText,quoteAuthor);
			addQuote(newQuote,allQuotes);
			saveAndRender(allQuotes);
			$(this)[0].reset();
			$(this).toggle();
		}
		return false;
	});

	// When user clicks on an author, sorts quotes by author and re-renders page
	$(document).on('click','.quote-author', function() {
		renderQuotes(filterByAuthor(allQuotes, $(this).text()));
	});

	// When user clicks on filter by rating, sorts quotes by rating and re-renders page
	$(document).on('click','#rating-filter-btn', function() {
		$('.rating-filter').toggle();
	});

	$(document).on('change', '.rating-filter', function() {
		var rating = $('.rating-filter').val();
		renderQuotes(filterByRating(allQuotes, rating));
		$(this).toggle();
	});



	// Delete quote from quote list, re-save to local storage, and re-render
	$(document).on('click','.delete-btn', function() {
		var quoteID = $(this).closest('.quote').attr('data-id');
		console.log(quoteID);
		delete allQuotes[quoteID];
		saveAndRender(allQuotes);
	});


	// Star Ratings
	$(document).on('click','.star', function() {
		var rating = $(this).attr('data-star');
		var id = $(this).closest('.quote').attr('data-id');
		// $(this).closest('.rating').attr('data-rating',rating);
		// displayRating(rating);
		setRating(rating, id, allQuotes);
		saveAndRender(allQuotes);
	});

});




































