// Ninja 1.0

var minX = 10,
    maxX = 90;
var minY = 10,
    maxY = 90;

var currentCorner = 0;
var range = 0;
var startAngle = -90;
var endAngle = 0;
var isDetection = false;
var i = 0;

swim(135);

while (true) {
    i = startAngle;
    while (i <= endAngle) {
        range = scan(i, 1);
        if (range < 70) {
            cannon(i, range);
            startAngle = i - 10;
            endAngle = i + 10;
            isDetection = true;
        }
        i += 1;
    }

    if (isDetection == false) {
        startAngle = currentCorner * 90 - 90;
        endAngle = currentCorner * 90;
    }

    // Stop at the edges
    if (getX() <= minX) {
        stop();
    }
    if (getX() >= maxX) {
        stop();
    }
    if (getY() <= minY) {
        stop();
    }
    if (getY() >= maxY) {
        stop();
    }
}
