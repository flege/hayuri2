window.jQuery(document).ready(function($){
	
	'use strict';
	
	//-------------------- Main navigation menu affix function --------------------//
	
	$('.stickem-container').stickem();
	
	//-------------------- End main navigation menu affix function  --------------------//
	
	
	
	//-------------------- jQuery tooltips --------------------//
	
	$('#header .social a, .teams .item .social a, .teams-big .item .social a').tooltip({placement: 'bottom'});
	
	//-------------------- End jQuery tooltips --------------------//
	
	
	
	//-------------------- jQuery smooth scrolling --------------------//
	
	$('a.smooth-scroll').on('click', function(event) {
		var $anchor		= $(this);
		var offsetTop	= '';
		var elemHeight	= $('#navigation').height();
		
		if ($(document).width() >= 769) { offsetTop = parseInt($($anchor.attr('href')).offset().top - elemHeight, 0);
		} else { offsetTop = parseInt($($anchor.attr('href')).offset().top, 0); }
		
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 2000,'easeInOutExpo');
		
		event.preventDefault();
	});
	
	//-------------------- End jQuery smooth scrolling --------------------//
	
	
	
	//-------------------- Responsive menu --------------------//
	
	// Create a top navigation menu for the responsive navigation
	$('#navigation .menu').mobileMenu({
		defaultText:'Please select one option....',
		className:'select-top-nav',
		subMenuDash:'&mdash;'
	});
	
	// Make the drop-down work
	$('#navigation select').change(function() {
		window.location = $(this).find('option:selected').val();
	});
	
	//-------------------- End responsive menu --------------------//
	
	
	
	//-------------------- Slider settings --------------------//
	
	// Main testimonials slider with flexslider
	$('.testimonials-main .flexslider').flexslider({
		directionNav: false,
		smoothHeight: true,
		prevText: '',
		nextText: '',
		start: function(slider) { $(slider).removeClass('loading'); }
	});
	
	// General slider with flexslider
	$('.flexslider').flexslider({
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		easing: 'easeInOutExpo',
		prevText: '',
		nextText: '',
		start: function(slider) { $(slider).removeClass('loading'); }
	});
	
	//-------------------- End slider settings --------------------//
	
	
	
	//-------------------- Animation elements with CSS3 --------------------//
	
	var topOffset = $(window).scrollTop() + ($(window).height()*0.8);
		
	$('.animation, .animation-visible').each(function() {
		var imagePos = $(this).offset().top;
		if (imagePos < topOffset) { $(this).addClass('animated ' + $(this).attr('data-animation')); }
	});
	
	$(window).scroll(function() {
		var topOffset = $(window).scrollTop() + ($(window).height()*0.8);
		
		$('.animation, .animation-visible').each(function() {
			var imagePos = $(this).offset().top;
			if (imagePos < topOffset) { $(this).addClass('animated ' + $(this).attr('data-animation')); }
		});
	});
	
	$(window).resize(function() {
		$(window).scroll(function() {
			var topOffset = $(window).scrollTop() + ($(window).height()*0.8);
			
			$('.animation, .animation-visible').each(function() {
				var imagePos = $(this).offset().top;
				if (imagePos < topOffset) { $(this).addClass('animated ' + $(this).attr('data-animation')); }
			});
		});
	});
	
	//-------------------- End animation elements with CSS3 --------------------//
	
	
	
	//-------------------- jQuery placeholder for IE --------------------//
	
	$('input, textarea').placeholder();
	
	//-------------------- End jQuery placeholder for IE --------------------//
	
	
	
	//-------------------- jQuery figure hover effect --------------------//
	
	$('figure.figure-hover').hover(
		function() {
			$(this).children('div').fadeIn(200);
			$(this).children('div').children('.icon-hover').animate({
				top:0
			}, 200);
		},
		function() {
			$(this).children('div').fadeOut(200);
			$(this).children('div').children('.icon-hover').animate({
				top:'100%'
			}, 200);
		}
	);
	
	//-------------------- End jQuery figure hover effect --------------------//
	
	
	
	//-------------------- Preview images popup gallery with Swipebox --------------------//
	
	$('.swipebox').swipebox();
	
	//-------------------- End preview images popup gallery with Swipebox --------------------//
	
	
	
	//-------------------- Responsive video size with jQuery --------------------//
	
	$('body').fitVids();
	
	//-------------------- End responsive video size with jQuery --------------------//
	
	
	
	//-------------------- Portfolio filter with jQuery Isotope --------------------//
	
	$(window).load(function(){
		var $filter		= $('.portfolio-menu');
        var $container	= $('.portfolio-items');
        
		// Initialize
        $container.isotope({
            filter              : '*',
            layoutMode          : 'fitRows',
            animationOptions    : {duration: 400}
        });
        
        // Trigger item lists filter when link clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({ 
                filter             : selector,
                animationOptions   : {animationDuration  : 400, queue : false}
            });
            return false;
        });
    });
	
	//-------------------- End portfolio filter with jQuery Isotope --------------------//
	
	
	
	//-------------------- Contact form submit process --------------------//
	
	$('#dotstheme-contact-form').submit(function() {
		var submitData	= $(this).serialize();
		var $name		= $(this).find('input[name="name"]');
		var $email		= $(this).find('input[name="email"]');
		var $subject	= $(this).find('input[name="subject"]');
		var $message	= $(this).find('textarea[name="message"]');
		var $submit		= $(this).find('input[name="submit"]');
		var $dataStatus	= $(this).find('.data-status');
		
		$name.attr('disabled','disabled');
		$email.attr('disabled','disabled');
		$subject.attr('disabled','disabled');
		$message.attr('disabled','disabled');
		$submit.attr('disabled','disabled');
		
		$dataStatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');
		
		$.ajax({ // Send an offer process with AJAX
			type: 'POST',
			url: 'process-contact.php',
			data: submitData + '&action=add',
			dataType: 'html',
			success: function(msg){
				if(parseInt(msg, 0) !== 0) {
					var msg_split = msg.split('|');
					if(msg_split[0] === 'success') {
						$name.val('').removeAttr('disabled');
						$email.val('').removeAttr('disabled');
						$subject.val('').removeAttr('disabled');
						$message.val('').removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					} else {
						$name.removeAttr('disabled');
						$email.removeAttr('disabled');
						$subject.removeAttr('disabled');
						$message.removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					}
				}
			}
		});
		return false;
	});
	
	//-------------------- End contact form submit process --------------------//
	
	
	
	//-------------------- Twitter integration with jQuery --------------------//
	
	$.getJSON('includes/get-tweets.php',
        function(feeds) {
            // alert(feeds);
			var displaylimit		= 2;
			var showdirecttweets	= false;
			var showretweets		= true;
            var feedHTML			= '';
            var displayCounter		= 1;
			var $tweets				= $('.dotstheme_tweets_widget');
			
			if(feeds !== null) {
				for (var i=0; i<feeds.length; i++) {
					var tweetscreenname	= feeds[i].user.name;
					var tweetusername	= feeds[i].user.screen_name;
					var profileimage	= feeds[i].user.profile_image_url_https;
					var status			= feeds[i].text;
					var isaretweet		= false;
					var isdirect		= false;
					var tweetid			= feeds[i].id_str;
	 
					// If the tweet has been retweeted, get the profile pic of the tweeter
					if (typeof feeds[i].retweeted_status !== 'undefined') {
						profileimage	= feeds[i].retweeted_status.user.profile_image_url_https;
						tweetscreenname	= feeds[i].retweeted_status.user.name;
						tweetusername	= feeds[i].retweeted_status.user.screen_name;
						tweetid			= feeds[i].retweeted_status.id_str;
						isaretweet		= true;
					}
					
					// Check to see if the tweet is a direct message
					if (feeds[i].text.substr(0,1) === '@') {
						isdirect = true;
					}
					
					// console.log(feeds[i]);
					
					if (((showretweets === true) || ((isaretweet === false) && (showretweets === false))) && ((showdirecttweets === true) || ((showdirecttweets === false) && (isdirect === false)))) {
						if ((feeds[i].text.length > 1) && (displayCounter <= displaylimit)) {
	 
							if (displayCounter === 1) {
								feedHTML = '';
							}
							
							feedHTML	+= '<li>';
							feedHTML	+= '<div class="avatar">';
							feedHTML	+= '<img src="' + profileimage + '" alt="Avatar" /><a href="http://twitter.com/' + tweetusername + '/status/' + tweetid + '" target="_blank"><i class="fa fa-link"></i></a>';
							feedHTML	+= '</div>';
							feedHTML	+= '<p>' + JQTWEET.ify.clean(status) + '</p>';
							if (JQTWEET.timeAgo(feeds[i].created_at) !== '') {
								feedHTML += '<div class="date"><a href="http://twitter.com/' + tweetusername + '/status/' + tweetid + '" target="_blank">' +  JQTWEET.timeAgo(feeds[i].created_at) + '</a></div>';
							}
							feedHTML	+= '</li>';
							
							displayCounter++;
						}
					}
				}
	 
				$tweets.html(feedHTML);
				$tweets.hide().fadeIn(1000);
			}
		}
	);
	
	// Twitter data format function
	var JQTWEET = {
		timeAgo: function(dateString) { // twitter date string format function
			var rightNow = new Date();
			var then = new Date(dateString);
			
			if ($.browser.msie) {
				// IE can't parse these crazy Ruby dates
				then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
			}
			
			var diff = rightNow - then;
			var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;
	 
			if (isNaN(diff) || diff < 0) { return ""; }
			if (diff < second * 2) { return "right now"; }
			if (diff < minute) { return Math.floor(diff / second) + " seconds ago"; }
			if (diff < minute * 2) { return "1 minute ago"; }
			if (diff < hour) { return Math.floor(diff / minute) + " minutes ago"; }
			if (diff < hour * 2) { return "1 hour ago"; }
			if (diff < day) { return  Math.floor(diff / hour) + " hours ago"; }
			if (diff > day && diff < day * 2) { return "1 day ago"; }
			if (diff < day * 365) { return Math.floor(diff / day) + " days ago"; }
			else { return "over a year ago"; }
		}, // timeAgo()
		 
		ify: {
			link: function(tweet) { // twitter link string replace function
				return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
					var http = m2.match(/w/) ? 'http://' : '';
					return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
				});
			},
			
			at: function(tweet) { // twitter at (@) character format function
				return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
					return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
				});
			},
			
			list: function(tweet) { // twitter list string format function
				return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
					return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
				});
			},
			
			hash: function(tweet) { // twitter hash (#) string format function
				return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
					return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
				});
			},
			
			clean: function(tweet) { // twitter clean all string format function
				return this.hash(this.at(this.list(this.link(tweet))));
			}
		} // ify
	};
	
	//-------------------- End twitter integration with jQuery --------------------//
	
	
	
	//-------------------- Flickr integration with an image gallery --------------------//
	
	$('.dotstheme_flickr_widget').jflickrfeed({
		limit:9,
		qstrings: {
			id:'36587311@N08' // Your flickr id
		},
		useTemplate: false,
		itemCallback: function(item){
			$(this).append('<a href="' + item.image + '" target="_blank"><figure><div class="figure-overlay"></div><img src="' + item.image_m + '" alt="' + item.title + '"/></figure></a>');
		}
	});
	
	//-------------------- End flickr integration with an image gallery --------------------//
	
	
	
	//-------------------- Back to top scroll --------------------//
	
	$(window).scroll(function(){
		var $scrollup = $('.scrollup');
		if ($(this).scrollTop() > 100) { $scrollup.slideDown(); }
		else { $scrollup.slideUp(); }
	}); 
	
	$('.scrollup').click(function(){
		$('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
		return false;
	});
	
	//-------------------- End back to top scroll --------------------//
	
	
	
	//-------------------- Customizer --------------------//
	
	$('#customize .popup-open').click(function() {
		$(this).prev().toggle();
	});
	
	$('#customize .colors-panel a').click(function(e) {
		var $color = $(this).attr('class');
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/'+ $color +'/color.css">');
		e.preventDefault();
	});
	
	//-------------------- End customizer --------------------//

});