// ==UserScript==
// @name          Parse FB daily.mk links
// @namespace     drakuwa
// @description   Uses a small amount of JS to parse the redirect uri of daily.mk links
// @version       0.1
// @run-at        document-start
// @unwrap
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  $ = unsafeWindow['jQuery'];
  $.noConflict();
  /* You put your jQuery code here */
  $("body").delegate("a", "click", function(event) {
	
	if ($(this).attr("href") != null) {

		//get the value for the link
		var link = $(this).attr("href");
		var original = "";
		
		//alert(link);

		if (link.indexOf("daily") != -1) {
			
			if (link.indexOf("redirect_uri") != -1) {
				var key = "redirect_uri";

				//get the original value of the link
				key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
				var regexS = "[\\?&]" + key + "=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(link);

				original = decodeURIComponent(results[1].replace(/\+/g, " "));

				window.open(original, '_blank');
				return false;
				//location.href = original;
			}
		}
	}
	//return true;
  });
  
}, false);