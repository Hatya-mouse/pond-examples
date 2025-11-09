// Player 10.0
// Redesigned from scratch to achieve more efficient processing.

// ——— Constants ———

// 35 units in 0.5s
// -> 70units/s
var bulletSpeed = 70;

// Measure cannon speed
// var startTime = Date.now();
// cannon(0, 70);
// while (true) {
//     log(Date.now() - startTime);
// }

var edges = {
    top: 80,
    right: 80,
    left: 20,
    bottom: 20
};

// ——— Variables ———

var d = damage();

var scanData = {
    start: 0,
    end: 360,
    range: 20,
    step: 20
};

var swimInfo = {
    x: 50,
    y: 50
};

var lastDetection = null;
var result = null;

// ——— Main loop ———

while (true) {
    result = wideScan(scanData.start, scanData.end, scanData.range, scanData.step);

    // If enemy detected
    if (result.distance <= 70) {
        avoidEnemy(result);
        if (result.error <= 7) {
            deflectionCannon(result, lastDetection);
            lastDetection = result;
        }
    }

    autoStop(result);
    runManuever(result);

    scanData = setupScan(result);
}

// ——— Functions ———

/** Performs wide scan */
function wideScan(start, end, range, step) {
    for (var angle = start; angle <= end; angle += step) {
        var distance = scan(angle, range);
        if (distance <= 70) {
            return {
                angle: angle,
                distance: distance,
                x: getX() + Math.cos(angle * Math.PI / 180) * distance,
                y: getY() + Math.sin(angle * Math.PI / 180) * distance,
                scanX: getX(),
                scanY: getY(),
                error: range,
                time: Date.now()
            };
        }
    }

    // If nothing detected, return only scan information.
    return {
        angle: angle,
        distance: Infinity,
        scanX: getX(),
        scanY: getY(),
        error: range,
        time: Date.now()
    };
}

function deflectionCannon(scanData, oldScanData) {
    var firePos = {
        x: scanData.x,
        y: scanData.y
    };
    if (oldScanData !== null) {
        var timeDiff = scanData.time - oldScanData.time;
        if (timeDiff < 1000) {
            // Predict the target's position
            var predictedPos = predictPosition(scanData, oldScanData, bulletSpeed);
            firePos = predictedPos;
        }
    }
    firePos.x = clamp(firePos.x, 3, 97);
    firePos.y = clamp(firePos.y, 3, 97);
    var move = calculateMovement(firePos.x, firePos.y);
    while (!cannon(move.angle, move.distance)) {
        autoStop(scanData);
        runManuever(scanData);
        move = calculateMovement(firePos.x, firePos.y);
    }
}

/** Prepare for the next scan */
function setupScan(scanData) {
    var min_range = 2;
    var min_step = 2;
    // Get the angle to the enemy
    var angle = getAngle(getX(), getY(), scanData.x, scanData.y);
    if (scanData && scanData.distance <= 70) {
        return {
            start: angle - Math.max(scanData.error, 3),
            end: angle + Math.max(scanData.error, 3),
            range: Math.max(scanData.error / 3, min_range),
            step: Math.max(scanData.error / 3, min_step)
        };
    } else {
        return {
            start: scanData.angle - 20,
            end: scanData.angle + 340,
            range: 16,
            step: 16
        };
    }
}

function avoidEnemy(scanData) {
    var safeDistance = 10; // Minimum safe distance from obstacles
    var direction = getAngle(getX(), getY(), scanData.x, scanData.y);
    // Scan in the direction to check for obstacles
    if (scan(direction, 10) <= safeDistance) {
        // Move to a safer direction
        runManuever(scanData);
    } else {
        autoStop(scanData);
    }
}

function runManuever(scanData, oldScanData) {
    if (speed() <= 0 || isGoingToEnemy() || d != damage()) {
        d = damage();
        if (scanData && scanData.distance <= 70) {
            runFromCollision(scanData, oldScanData);
        } else {
            randomSwim();
        }
    }
}

/** Check if the player is swimming into the enemy */
function isGoingToEnemy() {
    var angle = getAngle(getX(), getY(), swimInfo.x, swimInfo.y);
    return speed() > 0 && scan(angle, 6) <= 70;
}

function runFromCollision(scanData) {
    if (scanData !== null && scanData.distance <= 70 && !shouldStop()) {
        var rand = Math.random() * 90 + 45;
        var angle = (scanData.angle + rand) % 360;
        // Get the safe angle
        while (scan(angle, 15) <= 70) {
            rand = Math.random() * 90 + 45;
            angle = (scanData.angle + rand) % 360;
        }
        var x = clamp(getX() + Math.cos(angle * Math.PI / 180) * 100, edges.left, edges.right);
        var y = clamp(getY() + Math.sin(angle * Math.PI / 180) * 100, edges.bottom, edges.top);
        // Move to a safer position
        swim(angle, 100);
        swimInfo = { x: x, y: y };
    } else {
        randomSwim();
    }
}

function randomSwim() {
    var x = Math.random() * 60 + 20;
    var y = Math.random() * 60 + 20;
    var angle = getAngle(getX(), getY(), x, y);
    while (getDistance(getX(), getY(), x, y) <= 25 || scan(angle, 15) <= 70) {
        x = Math.random() * 60 + 20;
        y = Math.random() * 60 + 20;
        angle = getAngle(getX(), getY(), x, y);
    }
    swim(angle, 100);
    swimInfo = { x: x, y: y };
}

function autoStop(scanData) {
    if (shouldStop()) {
        stop();
        runManuever(scanData);
    }
}

function shouldStop() {
    return ((getX() <= edges.left && swimInfo.x <= edges.left) ||
    (getX() >= edges.right && swimInfo.x >= edges.right) ||
    (getY() <= edges.bottom && swimInfo.y <= edges.bottom) ||
    (getY() >= edges.top && swimInfo.y >= edges.top) ||
    (getDistance(getX(), getY(), swimInfo.x, swimInfo.y) <= 8));
}

// ——— Utility functions ———

function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

/** Classical pythagorean distance formula */
function getDistance(x1, y1, x2, y2) {
    var x = x1 - x2;
    var y = y1 - y2;
    return Math.sqrt((x * x) + (y * y));
}

function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

function calculateMovement(x, y) {
    var fireAngle = getAngle(getX(), getY(), x, y);
    var fireDistance = getDistance(getX(), getY(), x, y);
    return { angle: fireAngle, distance: fireDistance };
}

function predictPosition(current, last, bulletSpeed) {
    // Time diff
    var timeDiff = (current.time - last.time) / 1000; // Convert to seconds
    if (timeDiff <= 0) {
        timeDiff = 0.1; // Minimum value
    }
    // Speed of the enemy
    var speedX = (current.x - last.x) / timeDiff;
    var speedY = (current.y - last.y) / timeDiff;
    // If it is supposed to be the same enemy (speed is below threshold)
    if (getDistance(0, 0, speedX, speedY) < 100) {
        // Moved distance of the enemy
        var distance = getDistance(getX(), getY(), current.x, current.y);
        // Estimated time for bullet to reach the enemy
        var timeToTarget = distance / bulletSpeed;
        // Target's predicted position
        var predictedX = current.x + speedX * timeToTarget;
        var predictedY = current.y + speedY * timeToTarget;
        // Use the predicted distance and angle to fire
        return {
            x: predictedX,
            y: predictedY
        };
    } else {
        // If speed is too high, don't predict and just use the current position
        return {
            x: current.x,
            y: current.y
        };
    }
}
