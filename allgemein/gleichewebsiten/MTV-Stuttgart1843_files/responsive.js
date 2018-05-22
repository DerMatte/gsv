/**
 * This function is loaded as soon as the DOM is ready
 * to be manipulated and starts everything else.
 */
$(document).ready(function () {

	// fix bad HTML -> add classes to various divs
	var cur_page = fulltrim($('h1').text());
	
	switch (cur_page){
		case 'News':
		case 'Abteilungs-News':
			prepare_page();
			parse_page_news();
			break;
		case 'Neuigkeiten':
		case 'Neuigkeiten aus den Abteilungen':
		case 'Neuigkeiten unserer Sponsoren':
			prepare_page();
			parse_page_newsoverview();
			break;
		case 'Termine':
			prepare_page();
			parse_page_dates();
			break;
		case 'Vorteilswelt - regional':
			prepare_page();
			parse_page_vorteilswelt();
			break;
		case 'Abteilungen und Sportarten':
			prepare_page();
			parse_page_departmentoverview();
			break;
		case 'Fitness- und Gesundheitskurse':
			prepare_page();
			parse_page_courses();
			break;
	}

	// in case h1 is not distinct enough we check h2
	h2 = fulltrim($('h2:eq(0)').text());
	switch (h2){
		case 'Ansprechpartner, Trainingszeiten,...':
			prepare_page();
			parse_page_department();
			break;
		case 'Kursinformationen':
			prepare_page();
			parse_page_cours();
			break;
	}		
	
});


/**
 * prepare_page()
 * Add necesarry elements to the page (CSS/META/DOM ELEMENTS)
 */
function prepare_page(){
	// delete / comment out the following line if you want to deactivate page navigation
	generate_mobile_nav();

	//add "h1" for mobile devices
	$('#header').prepend('<span class="mobile_header">MTV Stuttgart 1843 e.V.</span>');

	$('head').append('<link rel="stylesheet" href="/responsive/responsive.css" type="text/css">');
	$('head').append('<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />');
}


/**
 * generate_mobile_nav()
 * Generate a mobile navigation and inject it into the page
 */
function generate_mobile_nav(){
	// generate main nav
	var mobile_nav = $('<select/>').attr("id", 'mobile_nav');
	var nav_options = '<option value="#" selected="selected">Seitennavigation ...</option>';

	// build mobile nav based on main nav
	$('#header').find('a').each(function () {
		if($(this).hasClass('aktivemenu') || $(this).hasClass('menu')){
			nav_options += '<option ';

			// uncomment the following 3 lines if you _dont't_ want "Seitennavigation" as start option
			/*if($(this).hasClass('aktivemenu')){
				nav_options += 'selected="selected" ';
			}*/

			nav_options += 'value="' + $(this).attr('href') + '">';
			nav_options += $(this).text() + '</option>';
		}
	});

	mobile_nav.append(nav_options);

	// Change window location
	mobile_nav.change(function () {
		window.location.href = $(this).val();
	});

	// Inject select
	$('#header').append(mobile_nav);



	// generate subnav
	var mobile_subnav = $('<select/>').attr("id", 'mobile_subnav');

	var nav_options = '<option value="#" selected="selected">Untermen&uuml; ...</option>';

	$('#untermenue').find('a').each(function () {
		if($(this).hasClass('submenu')){
			nav_options += '<option value="' + $(this).attr('href') + '">';
			nav_options += $(this).text() + '</option>';
		}
	});

	mobile_subnav.append(nav_options);

	// Change window location
	mobile_subnav.change(function () {
		window.location.href = $(this).val();
	});

	// Inject select
	$('#untermenue').after(mobile_subnav);
}



/**
 * parse_page_*()
 * Prepare a page type (*); add classes, remove / add elements etc.
 */

function parse_page_news(){

	$('#maincol table[width="610px"]').addClass('news-table');

	// copy the left td below the right td to make it possible to display
	// images etc. below the news text
	var img_box_content = $('#maincol table td[align="center"][valign="top"]').addClass('news-url-image-box').html();
	$('.news_text').append('<div class="mobile-img-box-wrapper">'+img_box_content+'</div>');

	// since news are visible
	parse_page_newsoverview();

	// since dates are visible
	parse_page_dates();

}


function parse_page_newsoverview(){

	$('#maincol div').each(function(){

		var tcase = $(this);

		// news container
		if(tcase.attr('style') == 'width:610px;height:45px;background-color:#E5E5E5;vertical-align:middle;'){
			tcase.addClass('news-header');
		}

		// news date
		else if(tcase.attr('style') == 'float:left;line-height:45px;text-align:left;width:300px;vertical-align:middle;font-family:Arial,Verdana,sans-serif;font-size:13px;font-weight:bold;'){
			tcase.addClass('news-date');
		}

		// news category name
		else if(tcase.attr('style') == 'float:left;line-height:45px;width:240px;text-align:right;vertical-align:middle;font-family:Arial,Verdana,sans-serif;font-size:13px;font-weight:bold;'){
			tcase.addClass('news-category-name');
		}

		// news category
		else if(tcase.attr('style') == 'float:right;margin-top:3px;margin-right:10px;width:50px;text-align:right;vertical-align:middle;'){
			tcase.addClass('news-category');
		}
		
		// news content box
		else if(tcase.attr('style') == 'width:610px;background-color:#F2F2F2;'){
			tcase.addClass('news-content-box');
		}

		// news text box (inside content box)
		else if(tcase.attr('style') == 'float:left;margin-top:10px;margin-left:20px;width:340px;text-align:left;'){
			tcase.addClass('news-text-box');
		}

		// news text box NO IMAGE (inside content box)
		else if(tcase.attr('style') == 'padding-top:10px;margin-left:20px;width:560px;text-align:left;'){
			tcase.addClass('news-text-box-large');
		}
		
		// news img box
		else if(tcase.attr('style') == 'float:right;margin:10px;width:220px;text-align:center;'){
			tcase.addClass('news-img-box');
		}

		// news subcategory container
		else if(tcase.attr('style') == 'width:590px;background-color:#CCCCCC;'){
			tcase.addClass('news-subcat-box');
		}

		//news nach kat filtern
		else if($(this).attr('style') == 'float:right;margin:10px;width:350px;text-align:left;'){
			$(this).css('width', 'auto');
		}

	});
}


function parse_page_dates(){
	$('#maincol div').each(function(){

		if($(this).attr('style') == "width:590px;background-color:#CCCCCC;"){
			$(this).addClass('news-subcat-box');
		}

	});

	$('#maincol table').each(function(){

		var tcase = $(this);

		// text table @ start
		if(tcase.attr('width') == '500'){
			tcase.addClass('dates-table-text');
		}

		// default date table
		else if(tcase.attr('width') == '610' && tcase.attr('style') != 'background-color:#E5E5E5;'){
			tcase.addClass('dates-table');
		}

		// header table in date table ()
		else if(tcase.attr('width') == '610' && tcase.attr('style') == 'background-color:#E5E5E5;'){
			tcase.addClass('dates-table-head');
		}

	});
}


function parse_page_departmentoverview(){

	$('#maincol table').each(function(){

		var tcase = $(this);

		// default dep table
		if(tcase.attr('width') == '600'){
			tcase.addClass('department-table');
		}

		// default date table
		else if(tcase.attr('width') == '610' && tcase.attr('style') != 'background-color:#E5E5E5;'){
			tcase.addClass('dates-table');
		}

		// header table in date table ()
		else if(tcase.attr('width') == '610' && tcase.attr('style') == 'background-color:#E5E5E5;'){
			tcase.addClass('dates-table-head');
		}

	});

}


function parse_page_department(){

	$('.tab_container div:eq(0)').addClass('tab_container-inner');

	// since news are visible
	parse_page_newsoverview();

	// since dates are visible
	parse_page_dates();

}


function parse_page_vorteilswelt(){
	$('#maincol div').each(function(){

		// vorteilswelt box
		if($(this).attr('style') == 'width:550px;height:120px;float:left;margin-left:30px;margin-top:10px;white-space:normal;overflow:hidden;text-align:left;border-width:0px;border-color:#000000;border-style:solid;'){
			$(this).addClass('vorteilswelt-box');
		}

	});

}


function parse_page_courses(){

	$('#maincol table').each(function(){

		var tcase = $(this);

		// default dep table
		if(tcase.attr('width') == '600'){
			$(this).find('td[width="540"]').addClass('course-header-text');
			$(this).find('td[width="600"]').addClass('course-inner-table-td');
			tcase.addClass('department-table');
		}

	});

	$('#maincol .gross a[href="https://www.mtv-stuttgart.de/?c=sport_kursanmeldung&d=2&m=1"]').parent().addClass('xs-hide');
	$('#maincol a[href="http://www.mtv-motiv.de/"]').parent().addClass('xs-hide').next().click(function(){ window.location.href="http://www.mtv-motiv.de/" });
	$('#maincol a[href="https://www.mtv-stuttgart.de/kraftpunkt"]').parent().addClass('xs-hide').next().click(function(){ window.location.href="https://www.mtv-stuttgart.de/kraftpunkt" });

}


function parse_page_cours(){

	$('#maincol table:eq(0)').wrap('<div class="course-table-wrapper"></div>');

	$('#maincol table').each(function(){

		var tcase = $(this);

		// default dep table
		if(tcase.attr('width') == '600'){
			$(this).find('td[width="540"]').addClass('course-header-text');
			$(this).find('td[width="600"]').addClass('course-inner-table-td');
			tcase.addClass('department-table');
		}

	});

	$('#maincol .gross a[href="https://www.mtv-stuttgart.de/?c=sport_kursanmeldung&d=2&m=1"]').parent().addClass('xs-hide');

}




//helper functions
function fulltrim( string ){
	// trim() only implemented in IE7+ so we need this function
	return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
};
