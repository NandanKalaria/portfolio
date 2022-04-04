const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Development", "Management", "Analytics"];
const typingDelay = 80;
const erasingDelay = 50;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

(function ($) {
	$.fn.neumorphicTabs = function () {
		$(this).each(function () {
			let tabsNav = $(this).find(".tabs--nav");
			let tabsContent = $(this).find(".tabs--content");

			tabsNav.append("<div class='tabs--fx'/>");

			let activeNavItem = tabsNav.find(".active").length
				? tabsNav.find(".active")
				: tabsNav.children().first();
			tabsNav.attr(
				"style",
				`--tab-width: ${activeNavItem.outerWidth()}px; --tab-position: `
			);

			let tabsFx = tabsNav.find(".tabs--fx");

			function translateTabsFx(activeEl) {
				tabsFx.height(activeEl.outerHeight()).animate({
					opacity: 1,
					left: activeEl.position().left + parseInt(activeEl.css("marginLeft")),
					width: activeEl.outerWidth()
				});
			}

			translateTabsFx(activeNavItem);

			tabsNav
				.children()
				.not("div")
				.each(function (i) {
					if (i == 0 && !tabsNav.find(".active").length) $(this).addClass("active");
					$(this).attr("data-tab", i);
				});

			tabsContent.children().each(function (i) {
				if (tabsNav.find(".active").attr("data-tab") == i) {
					$(this).addClass("active");
				} else {
					$(this).hide();
				}
				$(this).attr("data-tab", i);
			});

			tabsNav.children().on("click", function () {
				let currentTab = $(this);
				if (currentTab.hasClass("active") || currentTab.hasClass("tabs--fx"))
					return false;
				tabsNav.children().each(function () {
					$(this).addClass("wait-animation");
				});
				translateTabsFx(currentTab);
				tabsNav.find(".active").removeClass("active");
				currentTab.addClass("active");
				tabsContent
					.find(".active")
					.fadeOut()
					.promise()
					.done(function () {
						tabsContent
							.find(`[data-tab='${currentTab.attr("data-tab")}']`)
							.addClass("active")
							.fadeIn();
						tabsNav.children().each(function () {
							$(this).removeClass("wait-animation");
						});
					});
			});
		});
		return this;
	};
})(jQuery);

$(".tabs").neumorphicTabs();
