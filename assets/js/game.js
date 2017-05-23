// jshint esversion: 6

let game, characters;
let myChar, compChar, myCharImg, compCharImg;

$(document).ready(function() {
	$("#stage").hide();
	// let myChar, compChar, myCharImg, compCharImg;
	let myCharSelect = false;
	let compCharSelect = false;

	game = {

		myCharReset: function () {
			characters[myChar].health = 100;
			myChar = "";
			myCharImg = "";
			myCharSelect = false;
			$(".character").removeClass("selected");
			$("#my-btn").removeAttr("disabled");
			$("#my-char").attr("src", "");
			$("#my-char-select").attr("src", "assets/images/select-char.png");
			$("#my-char-select").addClass("blink");
			$("#my-btn").hide();
		},

		compCharReset: function() {
			characters[compChar].health = 100;
			compChar = "";
			compCharImg = "";
			compCharSelect = false;
			$("#comp-btn").removeAttr("disabled");
			$("#comp-char").attr("src", "");
			$("#comp-char-select").attr("src", "assets/images/select-char.png");
			$("#comp-char-select").addClass("blink");
			$("#comp-char-select").removeClass("reverse");
			$("#comp-btn").hide();
		},

		resetAll: function() {
			//reset characters health
			$.each(characters, function (k, v) {
				v.health = 100;
			});
			$(".progress-bar").css("width", "100%");
			//reset stage and character select btn
			$("#stage").hide();

			this.myCharReset();
			this.compCharReset();
		},

		myAttack: function() {
			characters[compChar].health -= (Math.floor(Math.random() * characters[myChar].attack) + 5);
			$("#comp-health").css("width", characters[compChar].health + "%");
			if (characters[compChar].health <= 0) {
				$("#you-won").modal();
				$("#stage").hide();
			}
		},

		compAttack: function() {
			setTimeout(function() {
				characters[myChar].health -= (Math.floor(Math.random() * characters[compChar].attack) + 1);
				$("#my-health").css("width", characters[myChar].health + "%");
				if (characters[myChar].health <= 0) {
					$("#you-lost").modal();
					$("#stage").hide();
				}
			}, 1000);
		},

		init: function() {
			$("#my-char").unbind("click");
			$("#my-char").on("click", function() {
				if ((characters[compChar].health >= 1) && (characters[myChar].health >= 0)) {
					this.myAttack();
				}
				if ((characters[myChar].health >= 1) && (characters[compChar].health >= 0)) {
					this.compAttack();
				}
			}.bind(this));
		}
	};

	characters = {
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
		if (!myCharSelect) {
			myChar = $(this).attr("id");
			myCharImg = characters[myChar].image;
			$("#my-char-select").attr("src", myCharImg);
			$("#my-char-select").removeClass("blink");
			$("#my-btn").show();
		} else if (!($(this).hasClass("selected"))) {
			compChar = $(this).attr("id");
			compCharImg = characters[compChar].image;
			$("#comp-char-select").attr("src", compCharImg);
			$("#comp-char-select").removeClass("blink");
			$("#comp-char-select").addClass("reverse");
			$("#comp-btn").show();
		}
	});

	$(".btn-select").on("click", function() {
		if (!myCharSelect) {
			myCharSelect = true;
			$("#my-char").attr("src", myCharImg);
			$("#" + myChar).addClass("selected");
			$(this).attr("disabled", "true");
			$("#stage").show();
		} else {
			compCharSelect = true;
			$("#comp-char").attr("src", compCharImg);
			$("#" + compChar).addClass("selected");
			$("#vs").css("display", "initial");
			$(this).attr("disabled", "true");
			$("#stage").show();
		}
	});

	$(document).on("keypress", function(e) {
		if (e.key === "x") {
			$("#vs").css("display", "none");
			game.init();
		}
	});

	$("#instructions").modal();
	$("#you-won").on("click", function () {
		$(".progress-bar").css("width", "100%");
		characters[myChar].health = 100;
		game.compCharReset();
	});
	$("#play-again").on("click", function() { game.resetAll(); });
	$("#game-over").on("click", function() {
		window.location.href += "game-over.html";
	});

	

});