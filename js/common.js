/// Функция определения ширины скролла
function scrollbarWidth() {
  var documentWidth = parseInt(document.documentElement.clientWidth);
  var windowsWidth = parseInt(window.innerWidth);
  var scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
}
/// Функция адаптивности стрелки часов
function adaptiveArrow(){
	var x, y = scrollbarWidth();
	if($(window).width() >= (1200 - y) )
		x = 141;
	if($(window).width() < (1200 - y) && $(window).width() >= (992 - y))
		x = 91;
	if($(window).width() < (992 - y) && $(window).width() >= (768 - y))
		x = 39;
	$('.arrow img').height($('.clock').height()/2.6);
	$('.arrow').css({"top": $('.clock').height()/4.61, 
		"left": x - ($('.clock').height() - 600) *0.24 });
}
/// Функция адаптивности Placeholder-ов
function adaptivePlaceholder(){
	var name = $('[name = "name"]');
	var mail = $('[name = "phone"]');
	if($(window).width() < 992 && $(window).width() > 767 || $(window).width() < 385){
		name.attr("placeholder", "Имя");
		mail.attr("placeholder", "Телефон");
	}else{
		name.attr("placeholder", "Введите Имя");
		mail.attr("placeholder", "Введите Телефон");
	}
}

$(document).ready(function() {
	
	$(window).bind('resize load', adaptiveArrow);
	$(window).bind('resize load', adaptivePlaceholder);
	$('video').click(function(){
		this.paused?this.play():this.pause();
		$(this).attr("controls", true);
	});

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	$("#order").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			$.fancybox({
                'href': '#orderdiv'
            });
			setTimeout(function() {
				$.fancybox.close();
			}, 3000);
		});
		return false;
	});

	$(window).scroll(function(){
		var imagePos = $("header").height();
		var topOfWindow = $(window).scrollTop();
		if(topOfWindow > imagePos){
			$("#top").css("display","block");
			$("#top").addClass("bounceInRight");
		}
		else{
			$("#top").css("display","none");
			$("#top").removeClass("bounceInRight");
		}
	});

	$(window).scroll(function() {
	    $('.movLeft').each(function(){
	      var imagePos = $(this).offset().top;
	      var topOfWindow = $(window).scrollTop();
	      if (imagePos < topOfWindow+$(window).height()) {
	        $(this).addClass('zoomIn');
	      }
	    });

	    $('.movUp').each(function(){
	      var imagePos = $(this).offset().top;
	      var topOfWindow = $(window).scrollTop();
	      if (imagePos < topOfWindow+$(window).height()) {
	        $(this).addClass('fadeInUp');
	      }
	    });

	    $('.movDown').each(function(){
	      var imagePos = $(this).offset().top;
	      var topOfWindow = $(window).scrollTop();
	      if (imagePos < topOfWindow+$(window).height()) {
	        $(this).addClass('fadeInDown');
	      }
	    });
  	});
  	$("#exampleInputEmail2").mask("+7 (999) 999-9999");

  	$("#exampleInputName2").on('input', function(event) {
  		event.preventDefault();
  		var text = $(this).val(),
  			arr = text.split(' '), result = [];
  		for (var i = 0; i < arr.length; i++) {
  			var s = arr[i][0].toUpperCase()+arr[i].slice(1);
  			result.push(s);
  		}
  		$(this).val(result.join(" "));
  	});

  	// Скрытие loader-a страницы
  	$(window).on('load', function () {
	    var $preloader = $('#page-preloader');
	    $preloader.delay(350).fadeOut('slow');
	});
});