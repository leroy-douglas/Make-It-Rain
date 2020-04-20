var maxRows = 5 // 5 rows allows for no gaps as our group of droplets
// make their way to earth
var maxCols = 100 // affects how heavy the rainfall is

var xPositions = [] // how far each droplet is placed horizontally
var yPositions = [] // where vertically our
var speed = []
var colors = []
var row, col
var animationEnabled = true

var displayArrays = function () {
  for (row = 0; row < maxRows; ++row) {
    for (col = 0; col < maxCols; ++col) {
      println(col + ' ' +
            xPositions[row][col] + '  ' +
            yPositions[row][col] + '  ' +
            speed[row][col] + ' ' +
            colors[row][col])
    }
  }
}

for (row = 0; row < maxRows; ++row) {
  xPositions.push([200])
  yPositions.push([0])
  speed.push([5])
  colors.push([floor(random(256)), floor(random(256)), floor(random(256))])

  for (col = 1; col < maxCols; ++col) {
    xPositions[row][col] = floor(random(5, 395))
    yPositions[row][col] = floor(random(-400, 1))
    speed[row][col] = floor(random(1, 6))
    colors[row][col] = [floor(random(256)), floor(random(256)), floor(random(256))]
  }
}

// needed only for debugging: displayArrays();

var j = 0
draw = function () {
  background(204, 247, 255)

  noStroke()
  fill(0, 200, 255)

  for (row = 0; row < maxRows; ++row) {
    for (col = 0; col < maxCols; ++col) {
      fill(colors[row][col][0], colors[row][col][1], colors[row][col][2])
      ellipse(xPositions[row][col], yPositions[row][col], 10, 10)
      yPositions[row][col] += speed[row][col]

      if (yPositions[row][col] >= 405) {
        yPositions[row][col] = -5
      }
    }
  }
}
