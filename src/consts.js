
//colors for shapes
const colors = ['#FFFFFF','#000000','#cd66cc','#66bc29','#0096db','#3a7dda','#ffe100'];

//sidebar width
const sideWidth = 1000;


//scene column count
const columnCount = 25;

//scene row count;
const rowCount = 25;

//previewCount
const previewCount = 6;

//scene gradient start color 
const sceneBgStart = '#8e9ba6';

//scene gradient end color 
const sceneBgEnd = '#5c6975';

//preview background color
const previewBg = '#2f2f2f';

//grid line color
const gridLineColor = 'rgba(255,255,255,0.2)';

//box border color
const boxBorderColor = 'rgba(255,255,255,0.5)';


// Game speed
const defaultInterval = 600;


// Level update interval 
const levelInterval = 120 * 1000; 



let exports = module.exports = {};

exports.COLORS =  colors;

exports.SIDE_WIDTH = sideWidth;

exports.ROW_COUNT = rowCount;

exports.COLUMN_COUNT = columnCount;

exports.SCENE_BG_START = sceneBgStart;

exports.SCENE_BG_END = sceneBgEnd;

exports.PREVIEW_BG = previewBg;

exports.PREVIEW_COUNT = previewCount;

exports.GRID_LINE_COLOR = gridLineColor;

exports.BOX_BORDER_COLOR = boxBorderColor;

exports.DEFAULT_INTERVAL = defaultInterval;

exports.LEVEL_INTERVAL = levelInterval;
