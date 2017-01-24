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
		// Subpages
		var subpagesHandle = $( "#subpagesHandle" );
		$( ".subpagesSlider" ).slider({
			min: data.subpagesSlider.min,
			max: data.subpagesSlider.max,
			value: data.subpagesSlider.startAt,
			step: data.subpagesSlider.step,
			disabled: true,
			create: function() {
				if ( Cookies( 'subpagesSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'subpagesSliderValue' ) );
				}
				subpagesHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				subpagesHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				pcUpdate( data );
				// ZZZ Störer implementieren der auf Cookieverwendung hinweißt (Eu-Richtlinie)
				// Abfrage für cookies um jedes cookie bauen
				Cookies.set(
					'subpagesSliderValue', ui.value,
					{
						// Save cookie in years
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		// Texts
		var textsHandle = $( "#textsHandle" );
		$( ".textsSlider" ).slider({
			min: data.textsSlider.min,
			max: data.textsSlider.max,
			value: data.textsSlider.startAt,
			step: data.textsSlider.step,
			disabled: true,
			create: function() {
				if ( Cookies( 'textsSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'textsSliderValue' ) );
				}
				textsHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				textsHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				pcUpdate( data );
				Cookies.set(
					'textsSliderValue', ui.value,
					{
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		// Photos
		var photosHandle = $( "#photosHandle" );
		$( ".photosSlider" ).slider({
			min: data.photosSlider.min,
			max: data.photosSlider.max,
			value: data.photosSlider.startAt,
			step: data.photosSlider.step,
			create: function() {
				if ( Cookies( 'photosSliderValue' ) !== undefined ) {
					$( this ).slider( 'option', 'value', Cookies.get( 'photosSliderValue' ) );
				}
				photosHandle.text( $( this ).slider( 'value' ) );
			},
			slide: function( event, ui ) {
				photosHandle.text( ui.value );
			},
			stop: function( event, ui ) {
				pcUpdate( data );
				Cookies.set(
					'photosSliderValue', ui.value,
					{
						expires: new Date(new Date().setFullYear(new Date().getFullYear() + data.cookieYears))
					}
				);
			}
		});

		////////////
		// Events //
		////////////
		$( '#includeSubpages' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".subpagesSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".subpagesSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$( '#includeTexts' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".textsSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".textsSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$( '#includePhotos' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( ".photosSlider" ).slider( 'option', 'disabled', false );
			} else {
				$( ".photosSlider" ).slider( 'option', 'disabled', true );
			}
		});

		$(
			'#basic,' +
			'#premium,' +
			'#includeSubpages,' +
			'#includeTexts,' +
			'#includePhotos,' +
			'#includeMaps,' +
			'#includeContact,' +
			'#includeFbPlugin,' +
			'#includeIcons,' +
			'#includeLogo,' +
			'#includeSeo'
		).click( function() {
			pcUpdate( data );
		});

		///////////////////////
		// Set current state //
		///////////////////////
		$( '#includeSubpages' ).trigger( 'change' );
		$( '#includeTexts' ).trigger( 'change' );
		$( '#includePhotos' ).trigger( 'change' );
		pcUpdate( data );
	});
}

//////////////////////////
// Additional Functions //
//////////////////////////
/**
 * Update (attr-)values and price of the pc (price configurator).
 */
function pcUpdate ( data ) {
	var price = 0;

	if ( $( '#includeSubpages' ).is( ':checked' ) ) {
		$( '#includeSubpages' ).attr( 'value', $( ".subpagesSlider" ).slider( 'value' ) + '_' + data.prices.subpage );
		price += $( ".subpagesSlider" ).slider( 'value' ) * data.prices.subpage;
	}
	if ( $( '#includeTexts' ).is( ':checked' ) ) {
		$( '#includeTexts' ).attr( 'value', $( ".textsSlider" ).slider( 'value' ) + '_' + data.prices.text );
		price += $( ".textsSlider" ).slider( 'value' ) * data.prices.text;
	}
	if ( $( '#includePhotos' ).is( ':checked' ) ) {
		$( '#includePhotos' ).attr( 'value', $( ".photosSlider" ).slider( 'value' ) + '_' + data.prices.photo );
		price += $( ".photosSlider" ).slider( 'value' ) * data.prices.photo;
	}
	if ( $( '#includeMaps' ).is( ':checked' ) ) {
		$( '#includeMaps' ).attr( 'value', data.prices.googleMaps );
		price += data.prices.googleMaps;
	}
	if ( $( '#includeContact' ).is( ':checked' ) ) {
		$( '#includeContact' ).attr( 'value', data.prices.contactForm );
		price += data.prices.contactForm;
	}
	if ( $( '#includeFbPlugin' ).is( ':checked' ) ) {
		$( '#includeFbPlugin' ).attr( 'value', data.prices.facebookPlugin );
		price += data.prices.facebookPlugin;
	}
	if ( $( '#includeIcons' ).is( ':checked' ) ) {
		$( '#includeIcons' ).attr( 'value', data.prices.customIconsGrapics );
		price += data.prices.customIconsGrapics;
	}
	if ( $( '#includeLogo' ).is( ':checked' ) ) {
		$( '#includeLogo' ).attr( 'value', data.prices.customLogo );
		price += data.prices.customLogo;
	}
	if ( $( '#includeSeo' ).is( ':checked' ) ) {
		$( '#includeSeo' ).attr( 'value', data.prices.seo );
		price += data.prices.seo;
	}

	// Calculate total price and write it in choosen option
	if ( $( '#basic' ).is( ':checked' ) ) {
		price += data.prices.basic;
		$( '#basic' ).attr( 'value', price + '_b_' + data.prices.basic );
	} else if ( $( '#premium' ).is( ':checked' ) ) {
		price += data.prices.premium;
		$( '#premium' ).attr( 'value', price + '_p_' + data.prices.premium );
	}

	// Display price
	$( '#totalPrice' ).text( price );
}
