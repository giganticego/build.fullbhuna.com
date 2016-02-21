//pop-up window

var commonjsversion = 2.0;
var spaceReplace = "-"; // this can be altered for what you might need Google PREFERS dashes to underscores

document.write("<style> .javascriptOnly { display:block; }</style>"); // show javascript reliant content - these should be hidden by previous CSS
if(!supportsFileInput()) {
	document.write("<style> .upload { display:none; }</style>"); // hide upload functionality for iOS devices
}

/*** add prototype functions  ****/

if (!String.prototype.trim) {
   String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};
}



function MM_openBrWindow(theURL,winName,features) { // firefox 3+ IE7+ no longer allow location=false
  newWindow = window.open(theURL,winName,features);
  newWindow.focus();
}

// Populate SEO fields
function seoPopulate(title,content) {
	if (typeof content == 'undefined') var content = title; // if no content sent - just use title
	title = title.replace(/[^a-zA-Z 0-9-]+/g,''); // get rid of tags, non-alphanumeric, spaces and dashes
	content = removeHTMLTags(content);
	content = content.replace(/[^a-zA-Z 0-9/-]+/g,''); // get rid of tags, non-alphanumeric, spaces and dashes
	longID = title.replace('- ',''); // get rid of long dashes
	longID = longID.replace(/[ ]+/g,spaceReplace); // replace spaces with dashes
	if(longID.match(/(admin|articles|calendar|contact|core|documents|directory|forms|forum|furniture|help|local|location|login|mail|members|news|photos|products|requests|search|seo|surveys|video)/gi)) longID += "-section";
	if (document.getElementById('longID').value == "") document.getElementById('longID').value = longID.toLowerCase();
	if (document.getElementById('metadescription').value == "") document.getElementById('metadescription').value = truncate(content,250);
	if (document.getElementById('metakeywords').value == "") document.getElementById('metakeywords').value = title;
} // end function

//Bookmark code
function addBookmark(title, url) {
	url = url.replace(/\?SearchTerm=(\d)*/,"")
	url = 'http://' + window.location.host + url
	if (window.sidebar) { // firefox
					window.sidebar.addPanel(title, url,"");
				} else if( document.all ) { //MSIE
	                window.external.AddFavorite(url,title);
				} else {
					alert("Your browser doesn't support automatic bookmarking.\n\nIn Firefox or Safari use the Bookmarks menu.");
				}
}

//print page
function printPage(){
	window.print();
}


/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Robert Nyman | http://robertnyman.com/ */
function removeHTMLTags(HTML){
 	
	
 	 	/*HTML = HTML.replace(/&(lt|gt);/g, function (strMatch, p1) {
 		 	return (p1 == "lt")? "<" : ">";
 		});*/
 		var cleaned = HTML.replace(/(<([^>]+)>)/ig," "); // replace tags with spaces
		cleaned = cleaned.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' '); // get rid of extra spaces
 		return cleaned;	
   
 	
}

// Input parameters:
// String text, [Number length, String ellipsis]
// Returns:
// String text

function truncate(text, length, ellipsis) {    
// Set length and ellipsis to defaults if not defined
if (typeof length == 'undefined') var length = 100;
if (typeof ellipsis == 'undefined') var ellipsis = '...';
// Return if the text is already lower than the cutoff
    if (text.length < length) return text;    
	 // Otherwise, check if the last character is a space.   
	 // If not, keep counting down from the last character   
	 // until we find a character that is a space   
	 for (var i = length-1; text.charAt(i) != ' '; i--) {         
	 length--;
	 }
	 // The for() loop ends when it finds a space, and the length var
	 // has been updated so it doesn't cut in the middle of a word.
	 return text.substr(0, length) + ellipsis; 
	 }   
	 
function setCookie( name, value, expires, path, domain, secure )
{
// backwards compat	
path = (typeof(path)=="undefined") ? "/" : path;
domain = (typeof(path)=="undefined") ? "" : domain;
secure = (typeof(path)=="undefined") ? "" : secure;

// set time, it's in milliseconds
var today = new Date();

today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}



function getCookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


// this deletes the cookie when called
function deleteCookie( name, path, domain ) {
	
path = (typeof(path)=="undefined") ? "" : path;
domain = (typeof(path)=="undefined") ? "" : domain;

if ( getCookie( name ) ) document.cookie = name + "=" +
( ( path ) ? ";path=" + path : "") +
( ( domain ) ? ";domain=" + domain : "" ) +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


function getRadioValue(idOrName) {
        var value = null;
        var element = document.getElementById(idOrName);
        var radioGroupName = null;  
        
        // if null, then the id must be the radio group name
        if (element == null) {
                radioGroupName = idOrName;
        } else {
                radioGroupName = element.name;     
        }
        if (radioGroupName == null) {
                return null;
        }
        var radios = document.getElementsByTagName('input');
        for (var i=0; i<radios.length; i++) {
                var input = radios[ i ];    
                if (input.type == 'radio' && input.name == radioGroupName && input.checked) {                          
                        value = input.value;
                        break;
                }
        }
        return value;
}

function setSelectListToValue(value, selectId){
	var i, si, v, args=setSelectListToValue.arguments;
	if ((obj=document.getElementById(args[1])) != null){
		v = args[0];
		for(i=0; i<obj.length; i++){
			if(obj.options[i].value == v){
				si = i;
			}
		}
		obj.selectedIndex = si;
	}
}


function changecss(theClass,element,value) { // e.g. changecss(".payForm","display","table-cell"); NOTE DOT!
	
	 var cssRules;

	 var added = false;
	 for (var S = 0; S < document.styleSheets.length; S++){

    if (document.styleSheets[S]['rules']) {
	  cssRules = 'rules';
	 } else if (document.styleSheets[S]['cssRules']) {
	  cssRules = 'cssRules';
	 } else {
	  //no rules found... browser unknown
	 }

	  for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
	   if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
	    if(document.styleSheets[S][cssRules][R].style[element]){
	    document.styleSheets[S][cssRules][R].style[element] = value;
	    added=true;
		break;
	    }
	   }
	  }
	  if(!added){
	  if(document.styleSheets[S].insertRule){
			  document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
			} else if (document.styleSheets[S].addRule) {
				document.styleSheets[S].addRule(theClass,element+': '+value+';');
			}
	  }
	 }
	}
	
	
function getUrlVars()
{ // returns vars[variable1name] = variable1value, vars[variable2name] = variable2value, etc...
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}


function setSelRange(inputEl, selstart, selEnd) { // sets the selection range in a texbox or text area
 if (inputEl.setSelectionRange) { 
  inputEl.focus(); 
  inputEl.setSelectionRange(selstart, selEnd); 
 } else if (inputEl.createTextRange) { 
  var range = inputEl.createTextRange(); 
  range.collapse(true); 
  range.moveEnd('character', selEnd); 
  range.movestart('character', selstart); 
  range.select(); 
 } 
}

function addToFavourites(url,pagetitle) { 
if(confirm('Do you want to add this page to your favourites?\n\nIt will appear on the list in your Control Panel home page.')) {
getData("/admin/favourites/ajax/addtofavourites.php?url="+escape(url)+"&pagetitle="+escape(pagetitle),"favouritescallback");
}
return false;
}


function submitAndGo(url) {
	document.getElementById('returnURL').value = url;
	document.forms[0].submit();
	return false;
}

function writeEmail(recipient, domain, prefix) { // email obfuscation routines
	prefix = prefix || "";
   email = recipient+"@"+domain;
	document.write(prefix+"<a href='mailto:"+email+"'>"+email+"</a>");
 }
 
function printFormatWindow() {
	// offers to convert all texboxes into paragraphs then prints
	
	var pageContent = document.getElementById('content').innerHTML;
	if(pageContent.indexOf("<textarea")>0) {
		if(confirm('Do you want to convert text boxes for print?\n\nScroll bars will be removed and text boxes will no longer be editable.')) {
			pageContent = pageContent.replace(/<textarea/g,"<p style='white-space:pre-wrap; height: auto;'"); 
			pageContent = pageContent.replace(/textarea/g,"p");
			document.getElementById('content').innerHTML = pageContent;
		}	
	}	
	window.print();
}

function openMainWindow(url) { // function to open the main site from Control Panel in sepcified url
	if(typeof(fb_editor_domain) !="undefined" && url.substr(0,7)!="http://") url = "http://"+fb_editor_domain+url;	
	if(typeof(mainSiteWindow)=="undefined") {
		if(top.opener && !top.opener.closed) {
			mainSiteWindow = top.opener;
		} else { 
			mainSiteWindow = window.open(url,'mainSite');
		}
	}
	mainSiteWindow.location.href = url; 
	mainSiteWindow.focus();
}

function logOutCheck() {
	message = "Are you sure you want to log out?";
	if(getCookie("cookieusername")) {
		message +="\n\nThis will override the 'Stay logged in' checkbox.";
	}
	return confirm(message);
}

  // this function is needed to work around 
  // a bug in IE related to element attributes
  function hasClass(obj) {
     var result = false;
     if (obj.getAttributeNode("class") != null) {
         result = obj.getAttributeNode("class").value;
     }
     return result;
  }   

 function stripe(id) {

    // the flag we'll use to keep track of 
    // whether the current row is odd or even
    var even = false;
  
    // if arguments are provided to specify the colours
    // of the even & odd rows, then use the them;
    // otherwise use the following defaults:
    var evenColor = arguments[1] ? arguments[1] : "#fff";
    var oddColor = arguments[2] ? arguments[2] : "#eee";
  
    // obtain a reference to the desired table
    // if no such table exists, abort
    var table = document.getElementById(id);
    if (! table) { return; }
    
    // by definition, tables can have more than one tbody
    // element, so we'll have to get the list of child
    // &lt;tbody&gt;s 
    var tbodies = table.getElementsByTagName("tbody");

    // and iterate through them...
    for (var h = 0; h < tbodies.length; h++) {
    
     // find all the &lt;tr&gt; elements... 
      var trs = tbodies[h].getElementsByTagName("tr");
      
      // ... and iterate through them
      for (var i = 0; i < trs.length; i++) {

        // avoid rows that have a class attribute
        // or backgroundColor style
        if (! hasClass(trs[i]) &&
            ! trs[i].style.backgroundColor) {
 		  
          // get all the cells in this row...
          var tds = trs[i].getElementsByTagName("td");
        
          // and iterate through them...
          for (var j = 0; j < tds.length; j++) {
        
            var mytd = tds[j];

            // avoid cells that have a class attribute
            // or backgroundColor style
            if (! hasClass(mytd) &&
                ! mytd.style.backgroundColor) {
        
              mytd.style.backgroundColor =
                even ? evenColor : oddColor;
            
            }
          }
        }
        // flip from odd to even, or vice-versa
        even =  ! even;
      }
    }
  }
  
function supportsFileInput() {
  var dummy = document.createElement("input");
  dummy.setAttribute("type", "file");
  return dummy.disabled === false;
}

function getFileName() {
  //this gets the full url
  var url = document.location.href;
  //this removes the anchor at the end, if there is one
  url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
  //this removes the query after the file name, if there is one
  url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
  //this removes everything before the last slash in the path
  url = url.substring(url.lastIndexOf("/") + 1, url.length);
  //return
return url;
}

function insertAfter(referenceNode, newNode) { /* complements js insertBefore() */
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function goFullscreen(id) {
    // Get the element that we want to take into fullscreen mode
    var element = document.getElementById(id);
    
    // These function will not exist in the browsers that don't support fullscreen mode yet, 
    // so we'll have to check to see if they're available before calling them.
    
    if (element.requestFullScreen) {
      // This is how to go into fullscren mode in  HTML5 when supported
      element.requestFullScreen();
    } else if  (element.mozRequestFullScreen) {
      // This is how to go into fullscren mode in Firefox
      // Note the "moz" prefix, which is short for Mozilla.
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      // This is how to go into fullscreen mode in Chrome and Safari
      // Both of those browsers are based on the Webkit project, hence the same prefix.
      element.webkitRequestFullScreen();
   }
   // Hooray, now we're in fullscreen mode!
  }
  
  /*** AJAX ***/
  
  // Ajax Framework for Full Bhuna by Paul Egan

// Main get and put functions...

var fbAjaxFrameworkVersion = 3;

function getData(url,divID,loadingDIV,loadingHTML, callback) // loading vars added later and optional
{
	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
	XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHttp");
	}
	if(XMLHttpRequestObject) {
		if(typeof(divID)!=="undefined" && divID !="") {
			var obj = document.getElementById(divID);		
			loadingDIV = typeof(loadingDIV)==="undefined" ? obj : document.getElementById(loadingDIV); 
			loadingHTML = typeof(loadingHTML)==="undefined" ? "<img src='/core/images/loading_16x16.gif' width='16' height='16' border='0' style='vertical-align: middle;'>" : loadingHTML;
			if(loadingHTML!="") { loadingDIV.innerHTML = loadingHTML; }
		}
		XMLHttpRequestObject.open("GET", url);
		XMLHttpRequestObject.onreadystatechange = function()
		{
			if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
				if(typeof(obj)!=="undefined") {
					loadingDIV.innerHTML = "";
					obj.innerHTML = XMLHttpRequestObject.responseText;
				}
			delete XMLHttpRequestObject;
			XMLHttpRequestObject = null;
			}
			if(typeof(callback)!=="undefined") {
				callback();
			}
		}
		XMLHttpRequestObject.send(null);
	}
}

function postData(url, data, divID)
{
	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
	XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHttp");
	}
	if(XMLHttpRequestObject) {
		var obj = document.getElementById(divID);
		obj.innerHTML = "<img src='/core/images/loading_16x16.gif' width='16' height='16' border='0' style='vertical-align: middle;'>";
		XMLHttpRequestObject.open("POST", url);
		XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		XMLHttpRequestObject.onreadystatechange = function()
		{
			if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
			obj.innerHTML = XMLHttpRequestObject.responseText;
			delete XMLHttpRequestObject;
			XMLHttpRequestObject = null;
			}
		}
		XMLHttpRequestObject.send(data);
	}
}







// search suggest

function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
}

//Our XmlHttpRequest object to get the auto suggest
var searchReq = getXmlHttpRequestObject();

//Called from keyup on the search textbox.
//Starts the AJAX request.
function searchSuggest(suggestURL) {
	if (searchReq.readyState == 4 || searchReq.readyState == 0) {
		var str = escape(document.getElementById('s').value);
		if(str.length>2) { // only do if longer than 2 chars
		document.getElementById('search_suggest').style.display = "block";
		suggestURL = suggestURL ? suggestURL : '/includes/searchSuggest.php';
		searchReq.open("GET", suggestURL+'?wordsearch=' + str, true);
		searchReq.onreadystatechange = handleSearchSuggest; 
		searchReq.send(null);
		} else {
			document.getElementById('search_suggest').innerHTML = '';
		}
	}		
}

//Called when the AJAX response is returned.
function handleSearchSuggest() {
	if (searchReq.readyState == 4) {
		var ss = document.getElementById('search_suggest')
		ss.innerHTML = '';
		
		var str = searchReq.responseText.split("\n");
		for(i=0; i < str.length - 1; i++) {
			//Build our element string.  This is cleaner using the DOM, but
			//IE doesn't support dynamically added attributes.
			var suggest = '<div onmouseover="javascript:suggestOver(this);" ';
			suggest += 'onmouseout="javascript:suggestOut(this);" ';
			suggest += 'onclick="javascript:setSearch(this.innerHTML);" ';
			suggest += 'class="suggest_link">' + str[i] + '</div>';
			ss.innerHTML += suggest;
		}
	}
}

//Mouse over function
function suggestOver(div_value) {
	div_value.className = 'suggest_link_over';
}
//Mouse out function
function suggestOut(div_value) {
	div_value.className = 'suggest_link';
}
//Click function
function setSearch(value) {
	document.getElementById('s').value = decodeHTML(value); // uses new function below to clean
	document.getElementById('search_suggest').innerHTML = '';
	document.getElementById('search_suggest').style.display = "none";
}

function addListener(type,callback,obj) // handles cross browser add listeners
{
	obj = (typeof(obj) === "undefined") ? window : obj; // backward compat as function initially has 2 args
	if(obj.addEventListener) {
		obj.addEventListener(type, callback, false); //FF
	} else if (obj.attachEvent) {
		obj.attachEvent("on" +type, callback,false); //IE
	}
}

function removeListener (type,callback, obj) // handles cross browser remove listeners
{
	obj = (typeof(obj) === "undefined") ? window : obj; // backward compat as function initially has 2 args
	if(obj.removeEventListener) {
		obj.removeEventListener(type,callback,false);
	} else if (obj.detachEvent) {
		obj.detachEvent("on"+type,callback,false);
	}
}

// used for Business Base
function stopEvent(e) {
    if (!e) e = window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function decodeHTML(html){
	/* turn HTML characters into normal text, e.g. for insertion into text boxes */
	var entities=[
			['&','&'],
			[' ',' ']
		];

	var clean = html.replace(/<[^>]*>/g,"");
	for( var i=0, limit=entities.length; i < limit; ++i)
	{
		clean = clean.replace( new RegExp(entities[i][0],"ig"), entities[i][1]);
	}
return clean;
}

 function cancelEvent(e) {
	  e.cancelBubble = true; e.returnValue = false; // IE
		if (e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } //FF
  }
	
