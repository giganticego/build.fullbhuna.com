// JavaScript Document
if(top.opener) {
	document.write('<style><!--.popuponly { display: inline; }--></style>');
} else {
	document.write('<style><!--.notpopup { display: inline; }--></style>');
}