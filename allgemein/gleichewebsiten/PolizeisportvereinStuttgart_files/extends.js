
	
recalcLogoPos = function () {
	// logo positioning
	var headerCurLeft = $('#logo').offset().left;
	//console.log(headerCurLeft);
	$('#logo').css('margin-left', logoMarginLeft + 'px');		
};


$(window).load(function () {
	//recalcLogoPos();		
});
$(window).resize(function() {
	//recalcLogoPos();	
});



$(document).ready(function () {
	$('html').removeClass('no-js');
	$('html').addClass('js');
	$('#psvnavlist > li').bind('mouseenter', function() {
		$(this).addClass('hover');
			
	});
	$('#psvnavlist > li').bind('mouseleave', function() {
		$(this).removeClass('hover');	
	});
	$('.leftNav').each(function () {
		$(this).find ('li.DivisionPage').first().addClass('space');
	})
	
});



// START slideshow for mobile device

// default params
var mSSImgCount 	= 0;
var mSSAutoplay		= true;
var mSSSpeed 		= 8000;
var mSSFade 		= 800;



mobileSlideShow = function () {	 
	if ($('#psvslider-mobile:visible').length > 0)	{
		
		// reset counter
		if (mSSImgCount == $('#psvslider-mobile img').length-1) {
			mSSImgCount = 0;	
		} else {
			mSSImgCount ++;
		};
		
		curImg = $('#psvslider-mobile img').eq(mSSImgCount);
		// fade image out, except its the first image
		$('#psvslider-mobile img').css('display', 'none');	
		curImg.fadeIn (mSSFade);
		
	};
}

$(window).load(function () {
	$('.flexslider .slides img').each (function (i) {
		$(this).clone().appendTo('#psvslider-mobile');
	});
	$('#psvslider-mobile img:first').css('display', 'block');
	$('.marginCol').eq(0).clone().appendTo('#mobile_col');
	
	if (mSSAutoplay && ($('#psvslider-mobile img').length >1)) {
		slideshowInterval = setInterval('mobileSlideShow()', mSSSpeed);
	};
	
});

$(document).ready (function () {
	$('#mobileNavigation h6').each (function () {
		var te = $(this);
		var cl = $(this).next('.leftNav');
		te.bind ('click', function () {
			cl.slideToggle(400);
		});		
	});
});
// END slideshow for mobile device




// START mobile switcher //
$(document).ready (function () {
// find mobile css and add class to it. also store href to be able to reset href
	var styleshts = $('head').find('link');
	styleshts.each (function () {
		var elm  = $(this);
		var href  = elm.attr('href');
		var found = (href.toLowerCase().indexOf("mobilequery") >= 0);
		if (found) {
			elm.addClass('mobilequery');	
			elm.attr('rLink', href);
		}
	});
});

// switch mobile theme off
mobiletheme_off = function () {
	var switcher = $('.switchmtheme');
	$('.mobilequery').attr('href', '');
	switcher.find('a').html(switcher.attr('lbl_on'));
};
// switch mobile theme on
mobiletheme_on = function () {
	var switcher = $('.switchmtheme');
	var elm = $('.mobilequery');
	elm.attr('href', elm.attr('rLink'));
	switcher.find('a').html(switcher.attr('lbl_off'));
};

// init switcher
$(document).ready (function () {
	$('.switchmtheme').toggle(function() {
	  mobiletheme_off ();
	}, function() {
	  mobiletheme_on ();
	});
});

// END mobile switcher //
/*
$(document).ready (function () {
	windowWidth = function () {
		var sw = $(window).width();
		return sw;	
	};	
});
*/