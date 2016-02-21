// JavaScript Document

//var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )  ? true : false;
var isMobile = (screen.width<=480) ? true : false;



$(document).ready(function() {
	
	  
	$('.hamburger').click(function () { // Capture responsive menu button click
    	// Show/hide menu
    	$('.main-menu').fadeToggle();
    });
	
	$( '.main-menu li:has(ul)' ).doubleTapToGo(); // fixes drop down issues on TOUCH devices (resolution independent) - function below
	
	// serach box text
	if($('#searchtext').val() == "") {
			$('#searchtext').val("Search Site");
	}
	$('#searchtext').focus(function(){
		if($('#searchtext').val() == "Search Site") {
			$('#searchtext').val("");
		}
	});
	$('#searchtext').blur(function(){
		if($('#searchtext').val() == "") {
			$('#searchtext').val("Search Site");
		}
	});
	
	
	
	// screen size cookie
	if(!getCookie("screensize") && screen.width>0) {
		setCookie("screensize", screen.width+"x"+screen.height, 365, "/");
		getData("/seo/includes/screensize.ajax.php?width="+screen.width+"&height="+screen.height);		
	}
	
	
	
	// JavaScript Document
	$(".collapsible").nextUntil(".collapsible").hide();
	$(".collapsible").click(function() { 
		$(this).nextUntil(".collapsible").slideToggle();
	});
	
	
	
	// concertina menus
	$("#articlesectionmenu ul ul").css("display","none");
	$("#articlesectionmenu ul li.selected ul").css("display","block");
	$("#articlesectionmenu > ul > li > a").click(function(){
		$("#articlesectionmenu ul ul").slideUp(); // optiona line closes existing lists
		if($(this).next().is("ul")) { 
			$(this).attr("href", "javascript:void(0)");
			$(this).next().slideToggle(300);
		}
	});
	
	// multipurpose all form checker
	// just add class "required" to fields
	
	$("form").submit(function(){
		
		var isFormValid = true;
		var theForm = $(this);	
		theForm.children(".required").each(function(){
			if ($.trim($(this).val()).length == 0){
				$(this).addClass("highlight");
				isFormValid = false;
			}
			else{
				$(this).removeClass("highlight");
			}
		});
	
		if (!isFormValid) alert("Please fill in all the required fields (indicated by *)");	
		return isFormValid;
	});
	
	
 });
 
/*
	doubleTapToGo addition for touch menus
*/

;(function( $, window, document, undefined )
{
	$.fn.doubleTapToGo = function( params )
	{
		if( !( 'ontouchstart' in window ) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

		this.each( function()
		{
			var curItem = false;

			$( this ).on( 'click', function( e )
			{
				var item = $( this );
				if( item[ 0 ] != curItem[ 0 ] )
				{
					e.preventDefault();
					curItem = item;
				}
			});

			$( document ).on( 'click touchstart MSPointerDown', function( e )
			{
				var resetItem = true,
					parents	  = $( e.target ).parents();

				for( var i = 0; i < parents.length; i++ )
					if( parents[ i ] == curItem[ 0 ] )
						resetItem = false;

				if( resetItem )
					curItem = false;
			});
		});
		return this;
	};
})( jQuery, window, document );