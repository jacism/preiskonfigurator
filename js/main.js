//////////////
// Get data //
//////////////
function run () {
	$.getJSON( 'data.json', function( result ) {
		if ( result !== undefined ) {
			init( result );
		}
	});
}

/////////////////////
// Run application //
/////////////////////
function init ( data ) {

	$( document ).ready( function () {
		$( '#status' ).fadeOut();
		$( '#preloader' )
			.delay( 350 )
			.fadeOut( 'slow' );
		$( 'body' )
			.delay( 350 )
			.css({ 'overflow': 'visible' });

		////////////////////
		// Invoke Sliders //
		////////////////////
		// Unterseiten
		var unterseitenHandle = $( "#unterseitenHandle" );
		$( ".unterseitenSlider" ).slider({
			min: data.unterseitenSlider.min,
			max: data.unterseitenSlider.max,
			value: data.unterseitenSlider.startAt,
			step: data.unterseitenSlider.step,
			disabled: true,
			create: function() {
				if ( Cookies( 'unterseitenSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'unterseitenSliderValue' ) );
				}
				unterseitenHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				unterseitenHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				calculateTotal( data );
				// ZZZ Störer implementieren der auf Cookieverwendung hinweißt (Eu-Richtlinie)
				// Abfrage für cookies um jedes cookie bauen
				Cookies.set(
					'unterseitenSliderValue', ui.value,
					{
						// Save cookie in years
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		// Texte
		var texteHandle = $( "#texteHandle" );
		$( ".texteSlider" ).slider({
			min: data.texteSlider.min,
			max: data.texteSlider.max,
			value: data.texteSlider.startAt,
			step: data.texteSlider.step,
			disabled: true,
			create: function() {
				if ( Cookies( 'texteSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'texteSliderValue' ) );
				}
				texteHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				texteHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				calculateTotal( data );
				Cookies.set(
					'texteSliderValue', ui.value,
					{
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		// Galerie
		var galerieHandle = $( "#galerieHandle" );
		$( ".galerieSlider" ).slider({
			min: data.galerieSlider.min,
			max: data.galerieSlider.max,
			value: data.galerieSlider.startAt,
			step: data.galerieSlider.step,
			create: function() {
				if ( Cookies( 'galerieSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'galerieSliderValue' ) );
				}
				galerieHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				galerieHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				calculateTotal( data );
				Cookies.set(
					'galerieSliderValue', ui.value,
					{
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		////////////
		// Events //
		////////////
		$( '#includeUnterseiten' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".unterseitenSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".unterseitenSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$( '#includeTexte' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".texteSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".texteSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$( '#includeGalerie' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".galerieSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".galerieSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$(
			'#basic,' +
			'#premium,' +
			'#includeUnterseiten,' +
			'#includeTexte,' +
			'#includeGalerie,' +
			'#includeMaps,' +
			'#includeContact,' +
			'#includeFbPlugin,' +
			'#includeIcons,' +
			'#includeLogo,' +
			'#includeSeo'
		).click( function() {
			calculateTotal( data );
		});

		///////////////////////
		// Set current state //
		///////////////////////
		$( '#includeUnterseiten' ).trigger( 'change' );
		$( '#includeTexte' ).trigger( 'change' );
		$( '#includeGalerie' ).trigger( 'change' );
		// set price
		calculateTotal( data );
	});
}

//////////////////////////
// Additional Functions //
//////////////////////////
/**
 * Calculate and show the total price
 */
function calculateTotal ( data ) {
	var price = 0;

	if ( $( '#basic' ).is( ':checked' ) ) {
		price += data.prices.basic;
	}
	if ( $( '#premium' ).is( ':checked' ) ) {
		price += data.prices.premium;
	}
	if ( $( '#includeUnterseiten' ).is( ':checked' ) ) {
		price += $( ".unterseitenSlider" ).slider( 'value' ) * data.prices.subpage;
	}
	if ( $( '#includeTexte' ).is( ':checked' ) ) {
		price += $( ".texteSlider" ).slider( 'value' ) * data.prices.text;
	}
	if ( $( '#includeGalerie' ).is( ':checked' ) ) {
		price += $( ".galerieSlider" ).slider( 'value' ) * data.prices.photo;
	}
	if ( $( '#includeMaps' ).is( ':checked' ) ) {
		price += data.prices.googleMaps;
	}
	if ( $( '#includeContact' ).is( ':checked' ) ) {
		price += data.prices.contactForm;
	}
	if ( $( '#includeFbPlugin' ).is( ':checked' ) ) {
		price += data.prices.facebookPlugin;
	}
	if ( $( '#includeIcons' ).is( ':checked' ) ) {
		price += data.prices.customIconsGrapics;
	}
	if ( $( '#includeLogo' ).is( ':checked' ) ) {
		price += data.prices.customLogo;
	}
	if ( $( '#includeSeo' ).is( ':checked' ) ) {
		price += data.prices.seo;
	}

	$( '#totalPrice' ).text( price );
}
