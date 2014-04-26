
// // Prepopulate some quotes
// var existingQuotes =
// [["Life isn’t about getting and having, it’s about giving and being.", "Kevin Kruse"],
// ["Whatever the mind of man can conceive and believe, it can achieve.", "Napoleon Hill"],
// ["Strive not to be a success, but rather to be of value.", "Albert Einstein"],
// ["Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", "Robert Frost"],
// ["I attribute my success to this: I never gave or took any excuse.", "Florence Nightingale"],
// ["You miss 100% of the shots you don’t take.", "Wayne Gretzky"],
// ["I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games." +
// " 26 times I’ve been trusted to take the game winning shot and missed." +
// " I’ve failed over and over and over again in my life. And that is why I succeed.", "Michael Jordan"],
// ["The most difficult thing is the decision to act, the rest is merely tenacity.", "Amelia Earhart"],
// ["Every strike brings me closer to the next home run.", "Babe Ruth"]];



// QUOTE FORM VALIDATION
function isInputValid (input) {
	return typeof input !== 'string' || input === '' ? false : true;
}

// QUOTE CREATION
// Creates unique ID
// localStorage.setItem('uniqueID', uniqueID);

// function unique() {
// 	var uniqueID = localStorage.getItem('uniqueID');
// 	+uniqueID++;
// 	localStorage.setItem('uniqueID', uniqueID);
// 	console.log(uniqueID);
// 	return uniqueID;

// }

// Quote Constructor
function Quote (text, author, id) {
	this.text = text;
	this.author = author;
	this.rating = 0;
	this.id = id;
}





// QuoteList Object constructor
function QuoteList (obj) {
	var j = 0;
	if (arguments.length === 0) {
	}
	else if (arguments.length === 1 && obj.id === undefined) {
		for (key in obj) {
			var quote = new Quote(obj[key].text, obj[key].author, j);
			this[j] = quote;
			console.log(quote);
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
	return newQuote;
}


// render quote function
function renderQuotes(objOfQuotes) {
	$('.quote-container').empty();
	for (key in objOfQuotes) {
		$('.quote-container').prepend(createQuote(objOfQuotes[key]));
	}
};

// adds a quote object to a given quoteList
function addQuote (quoteObj, quotesList) {
	var length = 0;
	for (key in quotesList) {
		length++;
	}
	quoteObj.id = length;
	quotesList[length] = quoteObj;
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

function setRating(rating) {
	for (i=0; i <= 5; i++) {
		var star = $('[data-rating="' + rating + '"]').find('[data-star="' + i + '"]');
		i <= +rating ? star.text('★') : star.text('☆');
	}
}

function saveAndRender(item) {
	localStorage.setItem('quotes',JSON.stringify(item));
	renderQuotes(item);
}




// Get quotes from local storage, re-create quote objects, render quotes
// if (localStorage.getItem('quotes') !== null){
var allQuotes = new QuoteList(JSON.parse(localStorage.getItem('quotes')));
// }
// else {
// 	var allQuotes = new QuoteList();
// }
// for (key in allQuotes) {
// 	allQuotes[key] = new Quote(allQuotes[key].text, allQuotes[key].author);
// }
renderQuotes(allQuotes); 











// EVENT HANDLERS
$(document).on('ready', function() {

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
		$(this).closest('.rating').attr('data-rating', rating);
		setRating(rating);
	});



});




































