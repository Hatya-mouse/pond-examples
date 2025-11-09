// Improved Garbage

cannon(-10, 60); // Reduce Rook's score initially
var startAngle = 0; // Direction to start scanning
var endAngle = 360; // Direction to end scanning
var scanAngle = 0; // Direction during scanning
var oldHealth = 100; // Previous health level
var isDetected = false; // Whether a duck has been detected

// Main loop
while (true) {
    isDetected = false;
    scanAngle = startAngle;
    while (scanAngle < endAngle) {
        // Scan
        let angle = scan(scanAngle, 5);
        if (angle < 70) {
            // Duck detected
            if (health() > 95) {
                swim(scanAngle);
            }
            cannon(scanAngle, angle); // Fire the cannon
            cannon(scanAngle, angle);
            startAngle = scanAngle - 10; // Set the next scan direction
            endAngle = scanAngle + 10;
            isDetected = true;
            break;
        } else if (angle != Infinity) {
            swim(scanAngle, 100);
            var counter = 0;
            while (counter < 100) {
                if (angle < 70) {
                    stop();
                    if (health() > 95) {
                        swim(scanAngle);
                    }
                    cannon(scanAngle, angle);
                    break;
                }
                counter += 5;
            }
        }
        scanAngle += 5;
    }

    if (isDetected == false) {
        // If no duck was detected
        startAngle = 0;
        endAngle = 360;
        while (scanAngle < 360) {
            let angle = scan(scanAngle);
            if (angle < 70) {
                if (health() > 95) {
                    swim(scanAngle);
                }
                cannon(scanAngle, angle);
                cannon(scanAngle, angle);
                startAngle = scanAngle - 10;
                endAngle = scanAngle + 10;
                isDetected = true;
                break;
            } else if (angle != Infinity) {
                swim(scanAngle, 100);
                var counter = 0;
                while (counter < 100) {
                    if (angle < 70) {
                        stop();
                        if (health() > 95) {
                            swim(scanAngle);
                        }
                        cannon(scanAngle, angle);
                        break;
                    }
                    counter += 5;
                }
            }
            scanAngle += 5;
        }
    }

    if (startAngle == endAngle) {
        // If startAngle and endAngle become the same value
        startAngle = 0;
        endAngle = 360;
    }

    if (oldHealth > health()) {
        // If health has decreased
        stop();
        if (getX() < 50) {
            swim(0, 100);
            var k = 0;
            while (k < 5) {
                k += 1;
            }
        } else {
            swim(180, 100);
            var k = 0;
            while (k < 5) {
                k += 1;
            }
        }
    }

    oldHealth = health();
}
