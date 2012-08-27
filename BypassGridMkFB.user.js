// ==UserScript==
// @name          Parse FB grid.mk links
// @namespace     drakuwa
// @description   Uses a small amount of JS to parse the redirect uri of grid.mk links
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
		
		if (link.indexOf("gridsocialreader") != -1) {
			
			event.preventDefault();
			event.stopPropagation();
			//event.stopImmediatePropagation();
			
			if (link.indexOf("redirect_uri") != -1){
				var key = "redirect_uri";

				//get the original value of the link
				key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
				var regexS = "[\\?&]" + key + "=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(link);

				original = decodeURIComponent(results[1].replace(/\+/g, " "));
				var neworiginal = "http://grid.mk/" + original.substring(original.indexOf("gridsocialreader")+20, original.length);
				window.open(neworiginal, '_blank');
				return false;
			}
			
			if (link.indexOf("?") != -1) {
				original = "http://grid.mk/" + link.substring(link.indexOf("gridsocialreader")+20, link.indexOf("?"));
				window.open(original, '_blank');
				return false;
			} else {
				original = "http://grid.mk/" + link.substring(link.indexOf("gridsocialreader")+20, link.length);
				window.open(original, '_blank');
				return false;
			}

		}
	}
	//return true;
  });
  
}, false);