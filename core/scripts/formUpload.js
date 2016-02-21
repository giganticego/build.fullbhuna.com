/* SUBMIT BUTTON MUST GO IN BLOCK ELEMENT EG TD DIV

extend the form validation using a validateForm() routine that returns an error if not OK

also requires latest version of global.css */



var fb_errors = '';
var SpryValidated = true;
var validateOverride = false; // can be made true by a 'Back' button if needbe...
var prepend = false; // prepends otherwise appends

addListener("load", formUploadInit);



function formUploadInit() {
	 // add form uploading HTML after submit button if it exists
	 fileupload = supportsFileInput(); // iOS devices do not support upload so hide file 


	 for(i=0; i<document.forms.length; i++) {
		 theForm = document.forms[i];
		 addListener("submit", startSubmit , theForm);
		 for(z=0; z< theForm.length; z++) {
			 if(!fileupload && theForm[z].type == "file") {
				 theForm[z].style.display = "none";
				 theForm[z].parentNode.innerHTML +="This device does not support file upload";
				 
			 }
		 }
	 }
 }
 
 
 
function startSubmit(e) // e = the event in mozilla
{ 
	SpryValidated= true;
	if (!e) var e = window.event;
	theForm = e.target || e.srcElement; // the form that was submitted	
	if(typeof(validateForm) != "undefined") {
		fb_errors = validateForm();
	}
	if(typeof(Spry) !="undefined" && typeof(Spry.Widget.Form) !="undefined") {
		
		SpryValidated = Spry.Widget.Form.validate(theForm); 
	}
	if(SpryValidated && fb_errors=='') { // no errors
	
		// find the submit button
		for(i=0; i<theForm.length; i++) {
			if(theForm[i].type =="submit") { // found submit button
			
			
				var span = document.createElement('span');span.id = "uploading";		
				var submitParent = theForm[i].parentNode; 
				if(prepend) {
					submitParent.insertBefore(span,theForm[i]);
				} else {
					insertAfter(theForm[i],span); /* added funtion to completemnt insertbefore in common.js */
				} 
				document.getElementById('uploading').innerHTML = '<a href="javascript:void(0);" onclick="stopSubmit(\''+theForm[i].id+'\'); return false;">Processing. Please wait...</a>';
				// disable
				theForm[i].disabled = true;	
				document.getElementById("uploading").style.visibility = "visible";	
			}
		}
		
	
	} else {  // errors
		// this code doesn't seem to prevent subit action...
		if(!validateOverride) {		// kill submit
			e.cancelBubble = true; e.returnValue = false; // IE	
			if (e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } //FF
			alertText ="";
			alertText += (fb_errors) ? fb_errors+"\n" : "";
			alertText += (!SpryValidated) ? "There are highlighted problems on the page.\n\n" : "";
			alert(alertText+"Please review before submitting. Any changes have not yet been saved.");
		} else {
			theForm.submit();  // submit if overridden
		}
	}
	
 }
 
 
 function stopSubmit(submitID)
 {
	if (navigator.appVersion.indexOf("MSIE") != -1) {
		 document.execCommand("Stop");
 	} else {
		 window.stop();	 
	}
	document.getElementById(submitID).disabled = false;
   	document.getElementById("uploading").style.visibility='hidden';
 }
 
 
 
 

