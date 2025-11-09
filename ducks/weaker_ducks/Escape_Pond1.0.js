// Escape Pond

cannon(-10, 60);
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
            swim(scanAngle - 180);
            startAngle = scanAngle - 15; // Set the next scan direction
            endAngle = scanAngle + 15;
            isDetected = true;
            break;
        } else if (angle != Infinity) {
            swim(scanAngle, 100);
            var counter = 0;
            while (counter < 80) {
                if (angle < 70) {
                    stop();
                    swim(scanAngle - 180);
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
                swim(scanAngle - 180);
                startAngle = scanAngle - 15;
                endAngle = scanAngle + 15;
                isDetected = true;
                break;
            } else if (angle != Infinity) {
                swim(scanAngle, 100);
                var counter = 0;
                while (counter < 100) {
                    if (angle < 70) {
                        stop();
                        swim(scanAngle - 180);
                        break;
                    }
                    counter += 5;
                }
            }
            scanAngle += 5;
        }
    }

    if (startAngle == endAngle) {
        // If startAngle and endAngle become the same
        startAngle = 0;
        endAngle = 360;
    }
}
