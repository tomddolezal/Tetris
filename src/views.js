/**
 All dom definitions and actions
*/
let utils = require('./utils.js');
let consts = require('./consts.js');

let $ = utils.$;

//doms
let scene = $('scene');
let side = $('side');
let info = $('info');
let preview = $('preview');
let level = $('level');
let score = $('score');
let rewardInfo = $('rewardInfo');
let reward = $('reward');
let gameOver = $('gameOver');
let btnRestart = $('restart');
let finalScore = $('finalScore');


//defaults
let SIDE_WIDTH = consts.SIDE_WIDTH;


/**
	Caculate the game container size
*/
let getContainerSize = function (maxW, maxH) {

	let dw = document.documentElement.clientWidth;
	let dh = document.documentElement.clientHeight;

	let size = {};
	if (dw > dh) {
		size.height = Math.min(maxH, dh);
		size.width = Math.min(size.height / 2 + SIDE_WIDTH, maxW);
	} else {
		size.width = Math.min(maxW, dw);
		size.height = Math.min(maxH, dh);
	}
	return size;

};


/**
	Layout game elements
*/
let layoutView = function (container, maxW, maxH) {
	const size = getContainerSize(maxW, maxH);
	const st = container.style;
	st.height = size.height + 'px';
	st.width = size.width + 'px';
	st.marginTop = (-(size.height / 2)) + 'px';
	st.marginLeft = (-(size.width / 2)) + 'px';

	//layout scene
	scene.height = size.height;
	scene.width = scene.height / 2;

	const sideW = size.width - scene.width;
	side.style.width = sideW + 'px';
	if (sideW < SIDE_WIDTH) {
		info.style.width = side.style.width;
	}
	preview.width = 80;
	preview.height = 80;

	gameOver.style.width = scene.width + 'px';

}

/**
	Main tetris game view
*/
let tetrisView = {


	init: function (id, maxW, maxH) {
		this.container = $(id);
		this.scene = scene;
		this.preview = preview;
		this.btnRestart = btnRestart;
		layoutView(this.container, maxW, maxH);
		this.scene.focus();

		rewardInfo.addEventListener('animationEnd', function (e) {
			rewardInfo.className = 'invisible';
		});
	},
	// Update the score 
	setScore: function (scoreNumber) {
		score.innerHTML = scoreNumber;
	},
	// Update the finnal score
	setFinalScore: function (scoreNumber) {
		finalScore.innerHTML = scoreNumber;
	},
	// Update the level
	setLevel: function (levelNumber) {
		level.innerHTML = levelNumber;
	},
	// Update the extra reward score
	setReward: function (rewardScore) {
		if (rewardScore > 0) {
			reward.innerHTML = rewardScore;
			rewardInfo.className = 'fadeOutUp animated';
		} else {
			rewardInfo.className = 'invisible';
		}
	},
	// Set game over view
	setGameOver: function (isGameOver) {
		gameOver.style.display = isGameOver ? 'block' : 'none';
	}
};

module.exports = tetrisView;