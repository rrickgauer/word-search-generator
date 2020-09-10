var GRID_SIZE = 15;
var MAX_ITERATIONS = 1000000;
var words = [];
var grid = new Array(GRID_SIZE);
var wordsUsed = [];
var wordsSkipped = [];

var wordsUsedClass = [];

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const NULL_CHAR = 'x';

const DIRECTIONS =  [
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "UP_LEFT",
  "UP_RIGHT",
  "DOWN_LEFT",
  "DOWN_RIGHT",
];

function Point(x, y) {
  this.x = x;
  this.y = y;
}

// class that represents the word on the board
function Word(word, startingPoint, direction) {
  this.word = word;
  this.startingPoint = startingPoint;
  this.direction = direction;
}


$(document).ready(function() {
  addEventListeners();
  initGrid();

  autosize($('#words-input'));  // add autosize script to textarea
});


function addEventListeners() {
  $('#btn-generate-puzzle').on('click', generatePuzzle);

  $("#btn-print").on('click', printPuzzle);

  $("#word-list").on('click', ".word", function() {
    highlightWord(this);
  });
}


function generatePuzzle() {
  initWords();
  initGrid();
  buildPuzzle();
  fillInPuzzle();
  displayPuzzle();
  displaySearchWords();
}

function initWords() {
  var textarea = $('#words-input');
  var rawInput = $(textarea).val();
  rawInput     = rawInput.toUpperCase();
  words        = rawInput.split("\n");
  
  // sort the words longest to shortest
  words = words.sort(function (a, b) {
    return a.length < b.length;
  });
}


function initGrid() {
  for (var count = 0; count < GRID_SIZE; count++) {
    grid[count] = getNullRow();
  }
}


function getNullRow() {
  var row = new Array(GRID_SIZE);

  for (var count = 0; count < GRID_SIZE; count++)
    row[count] = NULL_CHAR;

  return row;
}

function getRandomNumber(max) {
  return Math.floor((Math.random() * max));
}

function getRandomDirection() {
  var randomIndex = getRandomNumber(DIRECTIONS.length);
  return DIRECTIONS[randomIndex];
}

function getRandomPoint() {
  var x = getRandomNumber(GRID_SIZE);
  var y = getRandomNumber(GRID_SIZE);

  return new Point(x, y);
}

function getRandomLetter() {
  var randomIndex = getRandomNumber(letters.length);

  return letters[randomIndex];
}


function buildPuzzle() {

  for (var count = 0; count < words.length; count++) {
    var word          = words[count];
    var direction     = getRandomDirection();
    var startingPoint = getRandomPoint();
    var numAttempts   = 0;

    while (!canInsert(word, startingPoint, direction)) {
      
      // restart the build if every point has been tried
      if (numAttempts == MAX_ITERATIONS) {
        skipWord(word);
        break;
      }

      direction = getRandomDirection();
      startingPoint = getRandomPoint();
      numAttempts++;

    }
    insertWord(word, startingPoint, direction);
  }
} 


function insertWord(word, startingPoint, direction) {
  var gridPoint = startingPoint;

  for (var count = 0; count < word.length; count++) {
    var letter = word[count];
    var x = gridPoint.x;
    var y = gridPoint.y;

    grid[x][y] = letter;

    // get the new point
    gridPoint = shiftPoint(gridPoint, direction);
  }

  wordsUsedClass.push(new Word(word, startingPoint, direction));

  // add word to list of used words
  wordsUsed.push(word);
}


// word to list of skipped words
function skipWord(word) {
  wordsSkipped.push(word);
}

function canInsert(word, startingPoint, direction) {
  var currentPoint = startingPoint;

  for (var count = 0; count < word.length; count++) {
    var letter = word[count];
    
    // check if point falls within the grid
    if (!isPointWithinGrid(currentPoint))
      return false;

    var gridLetter = grid[currentPoint.x][currentPoint.y];

    // check if grid at the position is null or the same as the current word char
    if (gridLetter != NULL_CHAR && gridLetter != letter)
      return false;

    currentPoint = shiftPoint(currentPoint, direction); // shift the point
  }

  return true;
}

function shiftPoint(point, direction) {
  var newPoint = new Point(point.x, point.y);

  switch (direction) {
    case "UP":
      newPoint.x += -1;
      break;
    
    case "DOWN":
      newPoint.x += 1;
      break;
    
    case "LEFT":
      newPoint.y += -1;
      break;
    
    case "RIGHT":
      newPoint.y += 1;
      break;
    
    case "UP_LEFT":
      newPoint.x += -1;
      newPoint.y += -1;
      break;
    
    case "UP_RIGHT":
      newPoint.x += -1;
      newPoint.y += 1;
      break;
    
    case "DOWN_LEFT":
      newPoint.x += 1;
      newPoint.y += -1;
      break;
    
    case "DOWN_RIGHT":
      newPoint.x += 1;
      newPoint.y += 1;
      break;

    default:
      break;
  }

  return newPoint;
}

// checks if point can fit within the grid
function isPointWithinGrid(point) {
  if (point.x >= GRID_SIZE)       // x is too big
    return false;
  else if (point.y >= GRID_SIZE)  // y is too big
    return false;
  else if (point.x < 0)           // x is too small
    return false;
  else if (point.y < 0)           // y is too small
    return false;
  else
    return true;
}

function fillInPuzzle() {

  for (var x = 0; x < GRID_SIZE; x++) 
  {
    for (var y = 0; y < GRID_SIZE; y++) 
    {
      if (grid[x][y] == NULL_CHAR)
        grid[x][y] = getRandomLetter();
    }
  }
}

function displayPuzzle() {
  var tableHtml = '<tbody>';

  for (var x = 0; x < GRID_SIZE; x++) {
    var rowHtml = '<tr>';

    for (var y = 0; y < GRID_SIZE; y++) {
      rowHtml += '<td data-x="' + x + '" data-y="' + y + '">';
      rowHtml += grid[x][y];
      rowHtml += '</td>';
    }
      
    rowHtml += '</tr>';
    tableHtml += rowHtml;
  }

  tableHtml += '</tbody>';

  $('#puzzle').html(tableHtml);
}

function displaySearchWords() {
  wordsUsed.sort(); // sort words

  wordsUsedClass.sort(function (a, b) {
    return (a.word < b.word) ? -1 : 1;
  });

  var html = '';

  for (var count = 0; count < wordsUsed.length; count++) {

    html += '<div class="word" data-id="' + count + '">';
    html += wordsUsedClass[count].word;
    html += '</div>';


    // html += '<div class="word">' + wordsUsed[count] + '</div>';
  }
  
  $("#word-list").html(html);
}


function printPuzzle() {
  print($("#puzzle").html());
}


function highlightWord(div) {
    
  var wordID = $(div).attr('data-id');
  var word = wordsUsedClass[wordID];

  $(div).toggleClass('highlight');

  var currentPoint = word.startingPoint;

  for (var count = 0; count < word.word.length; count++) {
    var tableCell = getTableCell(currentPoint);
    $(tableCell).toggleClass('highlight');

    currentPoint = shiftPoint(currentPoint, word.direction);
  }

}

function getTableCell(point) {
  var tableCell = $('#puzzle tbody td[data-x="' + point.x + '"][data-y="' + point.y + '"]');

  return tableCell;
}

