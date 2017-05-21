// jshint esversion: 6

$(document).ready(function() {

	let myChar, compChar, myCharImg, compCharImg
	let myCharSelect = false;
	let compCharSelect = false;

	const game = {
		init: function() {
			$.each(characters, function (k, v) {
				v.health = 100
			});
			$(".progress-bar").css("width", "100%");
		},

		myAttack: function() {
			characters[compChar].health -= characters[myChar].attack;
			$("#comp-health").css("width", characters[compChar].health + "%");
		},
		
		compAttack: function() {
			characters[myChar].health -= characters[compChar].attack;
			$("#my-health").css("width", characters[myChar].health + "%")
		}
	};

	const characters = {
		bart: {
			image: "assets/images/bart.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		homer: {
			image: "assets/images/homer.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		lisa: {
			image: "assets/images/lisa.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		marge: {
			image: "assets/images/marge.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		milhouse: {
			image: "assets/images/milhouse.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		nelson: {
			image: "assets/images/nelson.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		sideshowbob: {
			image: "assets/images/sideshowbob.png",
			health: 100,
			attack: 20,
			counter: 5
		},

		skinner: {
			image: "assets/images/skinner.png",
			health: 100,
			attack: 20,
			counter: 5
		}
	};

	$(".character").on("click", function() {
		// $("#vs").css("display", "initial");
		if (!myCharSelect) {
			myChar = $(this).attr("id");
			myCharImg = characters[myChar].image;
			$("#my-char-select").attr("src", myCharImg);
			$("#my-btn").css("display", "block");
		} else {
			compChar = $(this).attr("id");
			compCharImg = characters[compChar].image;
			$("#comp-char-select").attr("src", compCharImg);
			$("#comp-btn").css("display", "block");
		}
	});

	$(".btn-select").on("click", function() {
		if (!myCharSelect) {
			myCharSelect = true;
			$("#my-char").attr("src", myCharImg);
			$("#" + myChar).addClass("selected");
		} else {
			compCharSelect = true;
			$("#comp-char").attr("src", compCharImg);
			$("#" + compChar).addClass("selected");
			$("#vs").css("display", "initial");
		}
	});

	$(document).on("keypress", function(e) {
		if (e.key === "x") {
			$("#vs").css("display", "none");
			game.init();
		}
	});

});