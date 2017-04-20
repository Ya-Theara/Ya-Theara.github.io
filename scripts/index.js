function setActive(group, target) {
	group.removeClass("active");
	target.addClass("active");
}

function scrollTo(pos) {
	$("html, body").animate({scrollTop: pos}, 1000);
};

function isOff(obj) {
	return obj.hasClass("off");
}

function updateBookmarks(bookmarks) {
	var height = $(window).height();
	var half = height / 2;
	
	var windowTop = $(window).scrollTop();
	var windowBot = windowTop + height;
	
	for(var i = 0; i < bookmarks.length; i++) {
		var currentTop = $(bookmarks.eq(i).attr("href")).offset().top;
		var currentBot = currentTop + height;
		if(windowTop >= currentTop - half && windowBot <= currentBot + half)
			setActive(bookmarks, bookmarks.eq(i));
	}
}

$(document).ready(function() {
	var $bookmarks = $(".bookmarks a");

	$("#scroll-top").click(function(event) {
		event.preventDefault();
		scrollTo(0);
	});
	
	$bookmarks.click(function(event) {
		event.preventDefault();
		var top = $($(this).attr("href")).offset().top;
		scrollTo(top);
	});
	
	$(".modal-btn").click(function() {
		var $modal = $(this).siblings(".modal");
		var $modalContent = $modal.children(".modal-content");
		
		var width = $modalContent.data("width");
		var height = $modalContent.data("height");
		
		var openAnim = {"width" : width, "height": height, "opacity": 1};
		
		$modal.show(function() {
			$modalContent.animate(openAnim, 500);
		});
	});
	$(".modal").click(function(event) {
		var $modal = $(this);
		if(event.target == $modal[0]) {
			var $modalContent =  $modal.children(".modal-content");
			
			var change = $modalContent.data("change");
			var width = $modalContent.data("width");
			var height = $modalContent.data("height");
			
			switch(change) {
				case "width":
					width = 0;
					break;
				case "height":
					height = 0;
					break;
				default:
					width = 0; height = 0;
			}
			
			var closeAnim = {"width": width, "height": height, "opacity": 0};
			
			$modalContent.animate(closeAnim, 500, function() {
				$modal.hide();
			});
		}
	});

	var $moCo = $(".modal-content");
	for(var i = 0; i < $moCo.length; i++) {
		var w = $moCo.eq(i).data("width");
		var h = $moCo.eq(i).data("height");
		var c = $moCo.eq(i).data("change");
		
		$moCo.eq(i).css("width", w);
		$moCo.eq(i).css("height", h);
		switch(c) {
			case "width":
				$moCo.eq(i).css("width", 0);
				break;
			case "height":
				$moCo.eq(i).css("height", 0);
				break;
			default:
				$moCo.eq(i).css("width", 0);
				$moCo.eq(i).css("height", 0);
		}
	}
	updateBookmarks($bookmarks);

	$(window).scroll(function() {
		updateBookmarks($bookmarks);
	});
	
	$(".section-btn").click(function() {
		var $modalContent = $(this).parents(".modal-content");
		var $section_btns = $modalContent.find(".section-btn");
		var $section = $(this).next(".section");
		
		$section.css("margin-left", "-2em");
		setActive($section_btns, $(this));
		$section.animate({"margin-left": "2em"}, 150);
	});
});


