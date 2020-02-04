let consts = require('./consts.js');
let COLORS = consts.COLORS;
let COLUMN_COUNT = consts.COLUMN_COUNT;

/**
    Defined all shapes used in Tetris game.
    You can add more shapes if you wish.
*/
class ShapeL {
	constructor() {
		let state1 = [[1, 0],
		[1, 0],
		[1, 1]];
		let state2 = [[0, 0, 1],
		[1, 1, 1]];
		let state3 = [[1, 1],
		[0, 1],
		[0, 1]];
		let state4 = [[1, 1, 1],
		[1, 0, 0]];
		this.states = [state1, state2, state3, state4];
		this.x = 4;
		this.y = -3;
		this.flag = 'L';
	}
}

class ShapeLR {
	constructor() {
		let state1 = [[0, 1],
		[0, 1],
		[1, 1]];
		let state2 = [[1, 1, 1],
		[0, 0, 1]];
		let state3 = [[1, 1],
		[1, 0],
		[1, 0]];
		let state4 = [[1, 0, 0],
		[1, 1, 1]];
		this.states = [state1, state2, state3, state4];
		this.x = 4;
		this.y = -3;
		this.flag = 'LR';
	}
}

class ShapeO {
	constructor() {
		let state1 = [[1, 1],
		[1, 1]];
		this.states = [state1];
		this.x = 4;
		this.y = -2;
		this.flag = 'O';
	}
}

class ShapeI {
	constructor() {
		let state1 = [[1],
		[1],
		[1],
		[1]];
		let state2 = [[1, 1, 1, 1]];
		this.states = [state1, state2];
		this.x = 5;
		this.y = -4;
		this.flag = 'I';
	}
}

class ShapeT {
	constructor() {
		let state1 = [[1, 1, 1],
		[0, 1, 0]];
		let state2 = [[1, 0],
		[1, 1],
		[1, 0]];
		let state3 = [[0, 1, 0],
		[1, 1, 1]];
		let state4 = [[0, 1],
		[1, 1],
		[0, 1]];
		this.states = [state1, state2, state3, state4];
		this.x = 4;
		this.y = -2;
		this.flag = 'T';
	}
}

class ShapeZ {
	constructor() {
		let state1 = [[1, 1, 0],
		[0, 1, 1]];
		let state2 = [[0, 1],
		[1, 1],
		[1, 0]];
		this.states = [state1, state2];
		this.x = 4;
		this.y = -2;
		this.flag = 'Z';
	}
}

class ShapeZR {
	constructor() {
		let state1 = [[0, 1, 1],
		[1, 1, 0]];
		let state2 = [[1, 0],
		[1, 1],
		[0, 1]];
		this.states = [state1, state2];
		this.x = 4;
		this.y = -2;
		this.flag = 'ZR';
	}
}

/**
Is shape can move
@param shape: tetris shape
@param matrix: game matrix
@param action:  'left','right','down','rotate'
*/
let isShapeCanMove = function (shape, matrix, action) {
	let rows = matrix.length;
	let cols = matrix[0].length;

	let isBoxCanMove = function (box) {

		let x = shape.x + box.x;
		let y = shape.y + box.y;
		if (y < 0) {
			return true;
		}
		if (action === 'left') {
			x -= 1;
			return x >= 0 && x < cols && matrix[y][x] == 0;
		} else if (action === 'right') {
			x += 1;
			return x >= 0 && x < cols && matrix[y][x] == 0;
		} else if (action === 'down') {
			y += 1;
			return y < rows && matrix[y][x] == 0;
		} else if (action === 'rotate') {
			return y < rows && !matrix[y][x];
		}
	};

	let boxes = action === 'rotate' ? shape.getBoxes(shape.nextState()) : shape.getBoxes(shape.state);

	for (let i in boxes) {
		if (!isBoxCanMove(boxes[i])) {
			return false;
		}
	}
	return true;
};

/**
 All shapes shares the same method, use prototype for memory optimized
*/
ShapeL.prototype =
	ShapeLR.prototype =
	ShapeO.prototype =
	ShapeI.prototype =
	ShapeT.prototype =
	ShapeZ.prototype =
	ShapeZR.prototype = {

		init: function () {
			this.color = COLORS[Math.floor(Math.random() * 7)];
			this.state = 0;
			this.allBoxes = {};
			this.y = 0;
		},
		// Get boxes matrix which composite the shape
		getBoxes: function (state) {

			let boxes = this.allBoxes[state] || [];
			if (boxes.length) {
				return boxes;
			}

			let matrix = this.matrix(state);
			for (let i = 0; i < matrix.length; i++) {
				let row = matrix[i];
				for (let j = 0; j < row.length; j++) {
					if (row[j] === 1) {
						boxes.push({ x: j, y: i });
					}
				}
			}
			this.allBoxes[state] = boxes;
			return boxes;
		},
		//Get matrix for specified state
		matrix: function (state) {
			let st = state !== undefined ? state : this.state;
			return this.states[st];
		},
		//Rotate shape
		rotate: function (matrix) {
			if (isShapeCanMove(this, matrix, 'rotate')) {
				this.state = this.nextState();
				//fix position if shape is out of right border
				let right = this.getRight();
				if (right >= COLUMN_COUNT) {
					this.x -= right - COLUMN_COUNT + 1;
				}
			}
		},
		//Caculate the max column of the shape
		getColumnCount: function () {
			let mtx = this.matrix();
			let colCount = 0;
			for (let i = 0; i < mtx.length; i++) {
				colCount = Math.max(colCount, mtx[i].length);
			}
			return colCount;
		},
		//Caculate the max row of the shape
		getRowCount: function () {
			return this.matrix().length;
		},
		//Get the right pos of the shape
		getRight: function () {
			let boxes = this.getBoxes(this.state);
			let right = 0;

			for (let i in boxes) {
				right = Math.max(boxes[i].x, right);
			}
			return this.x + right;
		},
		//Return the next state of the shape
		nextState: function () {
			return (this.state + 1) % this.states.length;
		},
		//Check if the shape can move down
		canDown: function (matrix) {
			return isShapeCanMove(this, matrix, 'down');
		},
		//Move the shape down 
		goDown: function (matrix) {
			if (isShapeCanMove(this, matrix, 'down')) {
				this.y += 1;
			}
		},
		//Move the shape to the Bottommost
		goBottom: function (matrix) {
			while (isShapeCanMove(this, matrix, 'down')) {
				this.y += 1;
			}
		},
		//Move the shape to the left
		goLeft: function (matrix) {
			if (isShapeCanMove(this, matrix, 'left')) {
				this.x -= 1;
			}
		},
		//Move the shape to the right
		goRight: function (matrix) {
			if (isShapeCanMove(this, matrix, 'right')) {
				this.x += 1;
			}
		},
		//Copy the shape data to the game data
		copyTo: function (matrix) {
			let smatrix = this.matrix();
			for (let i = 0; i < smatrix.length; i++) {
				let row = smatrix[i];
				for (let j = 0; j < row.length; j++) {
					if (row[j] === 1) {
						let x = this.x + j;
						let y = this.y + i;
						if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
							matrix[y][x] = this.color;
						}
					}
				}
			}
		}
	}

/**
	Create  a random shape for game
*/
function randomShape() {
	let result = Math.floor(Math.random() * 7);
	let shape;

	switch (result) {
		case 0: shape = new ShapeL(); break;
		case 1: shape = new ShapeO(); break;
		case 2: shape = new ShapeZ(); break;
		case 3: shape = new ShapeT(); break;
		case 4: shape = new ShapeLR(); break;
		case 5: shape = new ShapeZR(); break;
		case 6: shape = new ShapeI(); break;
	}
	shape.init();
	return shape;
}

module.exports.randomShape = randomShape;
