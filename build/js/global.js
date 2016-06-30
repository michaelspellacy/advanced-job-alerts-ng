// TMP Worldwide (jobsattmp.com) - Global Functions
// Developer: Michael "Spell" Spellacy, Director of UI Development, michael.spellacy[at]tmp.com, @spellacy

// Google Analytics (Note: GA should load first in event other scripts fail)

var _gaq = _gaq || [];

_gaq.push(["_setAccount", "INSERTACCOUNTNUMBERHERE"]);
_gaq.push(["_trackPageview"]);

(function() {

	var ga = document.createElement("script");
	ga.async = true;
	ga.src = ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
	(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(ga);

})();

// A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.*/

(function (m) {

	var l = m.document;

	if (!l.querySelector) {

		return;
	}

	var n = l.querySelector("meta[name=viewport]"), a = n && n.getAttribute("content"), k = a + ",maximum-scale=1", d = a + ",maximum-scale=10", g = true, j, i, h, c;

	if (!n) {

		return;

	}

	function f() {

		n.setAttribute("content", d);
		g = true;

	}

	function b() {

		n.setAttribute("content", k);
		g = false;

	}

	function e(o) {

		c = o.accelerationIncludingGravity;
		j = Math.abs(c.x);
		i = Math.abs(c.y);
		h = Math.abs(c.z);
		
		if (!m.orientation && (j > 7 || ((h > 6 && i < 8 || h < 8 && i > 6) && j > 5))) {

			if (g) {
			
				b();
			}

		} else {

			if (!g) {
		
				f();
			
			}
		
		}

	}

	m.addEventListener("orientationchange", f, false);
	m.addEventListener("devicemotion", e, false);

})(this);

$("#primary-navigation .parent").on("click", function(){

	if($(this).hasClass("active")) {

		$(this).parent().parent().find(".child").hide();
		$(this).removeClass("active");

	} else {

		$(this).parent().parent().find("a").removeClass("active");
		$(this).parent().parent().find(".child").hide();

		$(this).addClass("active");
		$(this).next().show();

	}

	return false;

});

// Non-touch Events

function isTouchDevice() {

	return !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints;

}

if(!isTouchDevice()){

	$("a.external").click(function(){

		this.target = "_blank";

	});

}

// Highlight Navigation

$("#nav-" + $("body").attr("class") + " > a").addClass("active");

// Global Events

$(".back-to-top a, #skip-nav").on("click", function(){

	$("html, body").animate({scrollTop: $($(this).attr('href') ).offset().top}, "slow");
 
	return false;

});


// Okay, this is nowhere near perfect. For demonstratitive purposes only...

$(document.body).on("click", ".btn-edit", function(){

	$(this).parent().parent().addClass("active").attr("aria-live", "polite"); // Add State
	$(this).parent().parent().find("input").attr("aria-hidden", "false").removeAttr("disabled"); // Show and enable all buttons and fields
	$(this).attr("aria-hidden", "true");

	return false;

});

$(document.body).on("click", ".btn-edit-again", function(){

	$(this).parent().parent().parent().addClass("active"); // Add State
	$(this).parent().parent().parent().find("input").attr("aria-hidden", "false").removeAttr("disabled"); // Show and enable all buttons and fields
	$(this).parent().parent().find(".btn-edit").attr("aria-hidden", "true"); // Hide Edit Button
	$(this).parent().remove(); // Remove confirmation

	return false;

});

$(document.body).on("click", ".btn-cancel", function(){

	$(this).parent().parent().removeClass("active"); // Remove State
	$(this).parent().parent().find(".row input").attr("disabled", true); // Disable fields
	$(this).parent().parent().find(".btn-submit").attr("aria-hidden", "true"); // Hide Submit Button
	$(this).attr("aria-hidden", "true"); // Hide Cancel Button
	$(this).parent().parent().find(".btn-edit").attr("aria-hidden", "false"); // Show Edit Button	

	return false;

});

$(document.body).on("click", ".btn-submit", function(){

	$(this).parent().parent().removeClass("active"); // Remove State
	$(this).parent().parent().find(".row input").attr("disabled", true); // Disable fields
	$(this).parent().parent().find(".btn-cancel").attr("aria-hidden", "true"); // Hide Submit Button
	$(this).attr("aria-hidden", "true"); // Hide Cancel Button
	$(this).parent().parent().find(".btn-edit").attr("aria-hidden", "false"); // Show Edit Button

	// Confirmation

	// Confirmation

	$("body").prepend("<p class=\"alert-saved\" role=\"alert\">Alert Saved</p>");

	$(".alert-saved").fadeOut(2500, function() {

		$(this).remove();

	});
	
	return false;

});

$(document.body).on("click", ".btn-remove", function(){

	$(this).parent().parent().removeClass("active").addClass("delete"); // Remove/Add State
	$(this).parent().find("input").attr("aria-hidden", "true"); // Hide all action buttons
	$(this).parent().append("<p class=\"alert-remove\"><b>Are you sure you want to delete this job alert?</b> <a href=\"#\" class=\"btn-no\">No</a> <a href=\"#\" class=\"btn-yes\">Yes</a></p>"); // Show warning
	$(".alert-remove").hide().fadeIn();

	return false;

});

$(document.body).on("click", ".btn-yes", function(){

	$(this).parent().parent().parent().fadeOut("fast", function() {

		$(this).remove();

		// Confirmation

		$("body").prepend("<p class=\"alert-deleted\" aria-live=\"polite\">Alert Deleted</p>");

		$(".alert-deleted").fadeOut(2500, function() {

			$(this).remove();

		});

		if ($("#job-alerts-container .job-alert").length === 0) {

			$("#job-alerts-container").append("<p class=\"alert\">You currently have no job alerts.</p>");
			$("#btn-show-more").remove();

		}

	});

	return false;

});

$(document.body).on("click", ".btn-no", function(){

	$(this).parent().parent().parent().removeClass("delete");
	$(this).parent().parent().parent().find(".row input").attr("disabled", true); // Disable fields	
	$(this).parent().parent().find(".btn-edit, .btn-remove").attr("aria-hidden", "false");
	$(this).parent().remove(); // Remove warning

	return false;

});

// Add Job Alert


$("#btnSubmit").on("click", function(){

	var $keyword = $("#txtKeyword").val();
	var $location = $("#txtLocation").val();

	$(this).parent().find(".alert").remove();

	var errorMsg = "<span class=\"alert\" aria-live=\"polite\">Required</span>";
	var mainMsg = "<p class=\"alert\" role=\"alert\">Please fix the errors in this submission</p>";

	if (!$("#txtKeyword").val() || !$("#txtLocation").val()){

		if (!$("#txtKeyword").val()){

			$("#lblKeyword").append(errorMsg);

		}

		if (!$("#txtLocation").val()){

			$("#lblLocation").append(errorMsg);

		}


			$("#lblKeyword").before(mainMsg);


		return false;

	}

	$("#job-alerts-container").prepend("<div id=\"alert-#\" class=\"job-alert\"><div class=\"row\"><label for=\"txtKeyword-#\">Keyword(s):</label><input id=\"txtKeyword-#\" name=\"txtKeyword-#\" value=\"" + $keyword + "\" disabled=\"disabled\" type=\"text\"/></div><div class=\"row\"><label for=\"txtLocation-#\">Location:</label><input id=\"txtLocation-#\" name=\"txtLocation-#\" value=\"" + $location + "\" disabled=\"disabled\" type=\"text\"/></div><div class=\"action\"><input value=\"Submit\" class=\"btn-submit\" aria-hidden=\"true\" type=\"button\"/><input value=\"Cancel\" class=\"btn-cancel\" aria-hidden=\"true\" type=\"button\"/><input value=\"Edit\" class=\"btn-edit\" type=\"button\"/><input value=\"Delete\" class=\"btn-remove\" type=\"button\"/></div></div>").hide().fadeIn();

	$("#txtKeyword").val("");
	$("#txtLocation").val("");

	// Confirmation

	$("body").prepend("<p class=\"alert-saved\" role=\"alert\">Alert Added</p>");

	$(".alert-saved").fadeOut(2500, function() {

		$(this).remove();

	});

	// Remove Validation Error(s)

	$("#job-alerts-container .alert").remove();

	return false;

});

// Remove All

$("#unsubscribe a").on("click", function(){

	$(".job-alert, .alert").remove();

	$("#job-alerts-container").append("<p class=\"alert\">You currently have no job alerts.</p>");

	$("#btn-show-more").remove();
	
	return false;

});

// Add More

$(document.body).on("click", "#btn-show-more", function(){

	// Just copying what is current there and appending it. Faux Show More! :-)

	$(".job-alert").slice(0,5).clone(true).appendTo("#job-alerts-container");

	return false;

});

$("#btn-new-alert a").on("click", function(){

	$("#add-new-alert").append("<a id=\"btn-close\" href=\"#\">Close</a>");

	$("body").addClass("active-sidebar");

	return false;

});

$(document.body).on("click", "#btn-close", function(){

	$("body").removeClass("active-sidebar");

	return false;

});

// Button Scroll

var elementPosition = $("#btn-new-alert").offset();

$(window).scroll(function(){

	if($(window).scrollTop() > elementPosition.top) {

		$("#btn-new-alert").addClass("fixed");

	} else {

		$("#btn-new-alert").removeClass("fixed");

	}

});
