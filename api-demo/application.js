/* List of valid countries mapped to ccy codes */

var currencies = {
	Europe:'EUR',UAE:'AED',Afghanistan:'AFN',
	Albania:'ALL',Armenia:'AMD',Netherlands:'EUR',
	Holland:'EUR',Angola:'AOA',Argentina:'ARS',
	Australia:'AUD',Aruba:'AWG',Azerbaijan:'AZN',
	Bosnia:'BAM',Barbados:'BBD',Bangladesh:'BDT',
	Bulgaria:'BGN',Bahrain:'BHD',Burundia:'BIF',
	Bermuda:'BMD',Bruno:'BND',Bolivia:'BOB',
	Brazil:'BRL',Bahamia:'BSD',Bitcoin:'BTC',
	Bhutan:'BTN',Botswana:'BWP',Belarus:'BYR',
	Belize:'BZD',Canada:'CAD',Congol:'CDF',
	Switzerland:'CHF',Chile:'CLP',China:'CNY',
	Colombia:'COP',CostaRica:'CRC',Cuba:'CUP',
	CapeVerda:'CVE',CzechRepublic:'CZK',Djibouta:'DJF',
	Denmark:'DKK',DominicanRepublic:'DOP',Algeria:'DZD',
	Estonia:'EEK',Egypt:'EGP',Erita:'ERN',
	Ethiopia:'ETB',Fiji:'FJD',
	FalklandIslands:'FKP',GreatBritain:'GBP',UK:'GBP',
	England:'GBP',Britain:'GBP',Georgia:'GEL',
	Ghana:'GHS',Gibralta:'GIP',Gamba:'GMD',
	Guinea:'GNF',Guatemala:'GTQ',Guyana:'GYD',
	HongKong:'HKD',Honduras:'HNL',Croatia:'HRK',
	Haiti:'HTG',Hungary:'HUF',Indonesia:'IDR',
	Israel:'ILS',India:'INR',Iraq:'IQD',
	Iran:'IRR',Iceland:'ISK',Jersey:'JEP',
	Jamacia:'JMD',Jordan:'JOD',Japan:'JPY',
	Kenya:'KES',Kyrgystan:'KGS',Cambodia:'KHR',
	Comora:'KMF',NorthKorea:'KPW',SouthKorea:'KRW',
	Kuwait:'KWD',CaymanIslands:'KYD',Kazakhstan:'KZT',
	Laos:'LAK',Lebanon:'LBP',SriLanka:'LKR',
	Liberia:'LRD',Lesoth:'LSL',Lithuania:'LTL',
	Latvia:'LVL',Libya:'LYD',Morocco:'MAD',
	Moldova:'MDL',Malagasy:'MGA',Macedonia:'MKD',
	Myanmar:'MMK',Mongolia:'MNT',Macana:'MOP',
	Mauritan:'MUR',Maldivia:'MVR',Malawi:'MWK',
	Mexico:'MXN',Malaysia:'MYR',Mozambico:'MZN',
	Namibi:'NAD',Nigeria:'NGN',Nicaragua:'NIO',
	Norway:'NOK',Nepal:'NPR',NewZealand:'NZD',
	Oman:'OMR',Panama:'PAB',Peru:'PEN',
	NewGuinea:'PGK',Philippines:'PHP',Pakistan:'PKR',
	Poland:'PLN',Paraguay:'PYG',Qatar:'QAR',
	Romania:'RON',Serbia:'RSD',Russia:'RUB',
	Rwanda:'RWF',SaudiArabia:'SAR',SolomonIslands:'SBD',
	Seychellos:'SCR',Sudan:'SDG',Sweden:'SEK',
	Singapore:'SGD',SaintHelena:'SHP',SierraLeone:'SLL',
	Somalia:'SOS',Surinama:'SRD',SaoTome:'STD',
	Salvadore:'SVC',Syria:'SYP',Swazia:'SZL',
	Thailand:'THB',Tajikistan:'TJS',Turkmenistan:'TMT',
	Tunisia:'TND',Tonga:'TOP',Turkey:'TRY',
	Trinidad:'TTD',Tobago:'TTD',Taiwan:'TWD',
	Tanzania:'TZS',Ukraine:'UAH',Uganda:'UGX',
	UnitedStates:'USD',USA:'USD',Uruguay:'UYU',
	Uzbekistan:'UZS',Venezuala:'VEF',Vietnam:'VND',
	Vanuata:'VUV',Samoa:'WST',CFA:'XAF',Yemen:'YER',
	SouthAfrica:'ZAR',Zambia:'ZMW',Zimbabwe:'ZWL'
};

// Fixes spacing issue for two word countries during reverse lookup

var fixSpacing = function(objkey){
	var len = objkey.length;
	var arr = objkey.split("");
	var idx = -1;
	for(var i=1;i<len;i++){ // find the second capital letter, if any
		if (arr[i]!=arr[i].toLowerCase()){
			idx = i;
			break;
		}
	}
	if (idx!=-1){
		return (objkey.slice(0,idx)+' '+objkey.slice(idx,len));
	}else{
		return objkey;
	}
}

// See if user has entered a valid country name
var validate = function(country_name){
	//take spaces out of the keys and then check if they exist
	var cn_mod = country_name.split(" ").join("");
	return (cn_mod in currencies);
}

// AJAX request for the exchange rates
var getRate = function(country_name){
	var cn_mod = country_name.split(" ").join("");
	var country_code = currencies[cn_mod];
	var rate = 0;
	$.ajax({
		url: 'http://openexchangerates.org/api/latest.json?app_id=8cc4a080b10d4c14b2cfe0cd91c43074',
		dataType: 'jsonp',
		success: function(json){
			fx.rates = json.rates;
			fx.base = json.base;
			var ordered_pair = getOrderedPair(country_code);
			var ordered_rate = getOrderedRate(country_code,fx.rates[country_code]);
			if(ordered_pair=='USDUSD'){
				$('#country_fx').html('The <h6>US Dollar</h6> is the base currency against which </br>other currencies on this page are displayed.')
			}else{
				$('#country_fx').html('Current '+ordered_pair+' exchange rate: <h6>'+ordered_rate.toFixed(4)+'</h6>');
			}
		}
	});
}

// Gets a zoomed out map of the country from Google Maps
var getMap = function(country_name){
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address':country_name
	}, function (results, status){
		if (status == google.maps.GeocoderStatus.OK){
			var map_options = {
				center: results[0].geometry.location,
				zoom: 4
			};
			var map = new google.maps.Map(document.getElementById('country_map'),map_options);
			var marker = new google.maps.Marker({
				map:map,
				position: results[0].geometry.location
			});
			getRate(country_name); // Call the rates after the map call, not necessary but is flowing better
		}
	});
}

// Invert rate and pair order where necessary
var getOrderedPair = function(country_code){
	var priority = {GBP:'GBP',EUR:'EUR',AUD:'AUD',NZD:'NZD'};
	if (country_code in priority){
		return priority[country_code] + 'USD';
	}else{
		return 'USD'+country_code;
	}
}
var getOrderedRate = function(country_code,rate){
	var priority = {GBP:'GBP',EUR:'EUR',AUD:'AUD',NZD:'NZD'};
	if (country_code in priority){
		return 1/rate;
	}else{
		return rate;
	}
}

$(document).ready(function(){
	var searches = 0; // Keeps track of search history length, we cap at 5
	$('#country').focus();
	$('#submit').on('click',function(){
		event.preventDefault();
		$('#country_name', '#country_map', '#country_fx').hide();
		$('#country_fx').html("");
		var country_name = $('#country').val();
		$('#country').val("");
		for(var i in currencies){ // This catches if user puts in a ccy code
			if(!currencies.hasOwnProperty(i)) continue;
			if(currencies[i]==country_name){
				country_name=fixSpacing(i);
				break;
			}
		}
		valid = validate(country_name); // inefficient because double checks codes
		if(valid){
			searches++;
			$('#country_name').html('<h2>'+country_name+'</h2>');
			getMap(country_name);
			$('#country_name', '#country_map', '#country_fx').fadeIn(1500);
		    if (searches>5){ // better way to figure out how many are in the list?
		    	$('#search_history li:last-child').remove();
		    }
			$('#search_history').prepend('<li><p>'+country_name+'</p></li>');
		}else{
			alert("Please try again: currently now the app requires proper capitalization.");
		}
	});
});