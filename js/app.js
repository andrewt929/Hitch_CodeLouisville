/* Important website stuff
–––––––––––––––––––––––––––––––––––––––––––––––––– */

	/* Initialize Foundation */
	$(document).foundation()

/* Hero Section
–––––––––––––––––––––––––––––––––––––––––––––––––– */

	/* Load Hero Video */
	$(window).bind("load", function() {
		//$('#movie-area').load('movie.html')
		$('#movie-area').load('http://www.hitch.click/movie.html');
	});


/* Destination Gallery
–––––––––––––––––––––––––––––––––––––––––––––––––– */

	/* The list of cool places */
	var destinationList = ["Chicago", "Los Angeles", "San Francisco", 
												 "New York City", "Houston", "Seattle", 
												 "New Orleans", "Milwaukee", "St. Louis",
												 "Albequrque", "Toronto", "Nashville",
												 "Denver", "San Antonio", "Boise",
												 "Portland", "Louisville", "Indianapolis",
												 "Atlanta", "Wheeling", "Asheville"];

	/* Randomize the list of cool places using Fisher-Yates (aka Knuth) shuffle: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	 - Thank you Justin Carver for help with the loop*/
	var randomList = shuffle(destinationList);
	function shuffle(x) {
		var currentIndex = x.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = x[currentIndex];
			x[currentIndex] = x[randomIndex];
			x[randomIndex] = temporaryValue;
		}

		return x;
	}

	/* Get the most recent picture of an array of items from the Flickr JSONP API */
	getImage(randomList);
  function getImage(x) {

		/* Define the API */
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
				
				/* Set up the photos */
				$.each( x, function( i, item) {
	
					/* Get photo data from the API */
					$.getJSON( flickerAPI, {
						tags: item,
						tagmode: "any",
						format: "json"
					})
					
					/* Now put the photos in your HTML */
					.done( function( data ) {

						$.each( data.items, function( i, photo ) {
							/* Generate anchor item and photo */
							  /* $( "<li>" ).attr( "class", "columns large-4 destination").append( */
              	/* $( "<h4>" ).attr( "class", "caption").html( item ),*/
							$( "<a>" ).attr( "href", photo.link).attr( "class", "thumbnail").append( 
								$( "<img>" ).attr( "src", photo.media.m.replace('_m', '_b'))).append(
									$( "<h4>" ).attr( "class", "caption").html( item )).appendTo( "#images" );

							/* Select only the first photo */
							if ( i === 0 ) {
								return false;
							};
						});
					})			
			});
	};