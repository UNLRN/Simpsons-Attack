// jshint esversion: 6

let game, characters;

$(document).ready(function() {

	let myChar, compChar, myCharImg, compCharImg
	let myCharSelect = false;
	let compCharSelect = false;

	game = {

		myCharReset: function () {
			$(".character").removeClass("selected");
			$("#my-btn").removeAttr("disabled");
			$("#my-char").attr("src", "");
			$("#my-char-select").attr("src", "assets/images/select-char.png");
			$("#my-char-select").addClass("blink");
			$("#my-btn").hide();
		},

		compCharReset: function() {
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
			characters[compChar].health -= (Math.floor(Math.random() * characters[myChar].attack) + 100);
			$("#comp-health").css("width", characters[compChar].health + "%");
		},

		compAttack: function() {
			setTimeout(function() {
				characters[myChar].health -= (Math.floor(Math.random() * characters[compChar].attack) + 1);
				$("#my-health").css("width", characters[myChar].health + "%");
			}, 1000);
		},

		checkHealth: function() {
			setTimeout(function() {
				if (characters[myChar].health < 0) {
					$(".progress-bar").css("width", "100%");
					$("#you-lost").modal();
				} else if (characters[compChar].health < 0) {
					$(".progress-bar").css("width", "100%");
					this.pickCharacter();
				}
			}.bind(this), 1001);
		},

		pickCharacter: function() {
			this.compCharReset();
			$("#you-won").modal();
		},

		log: function() {
			console.log("check");
		},

		init: function() {
			$("#my-char").on("click", function() {
				this.myAttack();
				this.compAttack();
			}.bind(this));
			$("#my-char").on("mouseup", function() {
				this.checkHealth();
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
		// $("#vs").css("display", "initial");
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
		}
	});

	$(document).on("keypress", function(e) {
		if (e.key === "x") {
			$("#vs").css("display", "none");
			game.init();
		}
	});

	$("#play-again").on("click", function() { game.resetAll(); });

	game.resetAll();

	$("#instructions").modal();

});