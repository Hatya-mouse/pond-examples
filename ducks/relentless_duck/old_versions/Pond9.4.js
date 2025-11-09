// Player 9.4 (latest)

var playerData = {
    oldHealth: 100, // health from the previous frame
    wasEdgeStop: false, // is the player stopped by the edge
    swimAngle: 0,
    currentCorner: 0,
    movingToCorner: false
};

var scanData = {
    startAngle: 0, // start angle of the scan
    endAngle: 360, // end angle of the scan
    currentAngle: 0, // current direction of the scan
    oldAngle: 0, // direction of the previous scan
    oldDistance: 0, // distance from the previous frame
    width: 10, // width of the scan
    range: 20 // space between the scans
};

var enemyData = {
    isDetected: false, // is the enemy detected
    previousDetected: false, // was the enemy detected in the previous frame
    // Enemy position data
    enemyX: 0, // current enemy position
    enemyY: 0,
    previousX: 0, // previous enemy position
    previousY: 0,
    predictedX: 0, // predicted enemy position
    predictedY: 0
};

var corners = {
    c1: { x: 5, y: 5 },
    c2: { x: 5, y: 95 },
    c3: { x: 95, y: 95 },
    c4: { x: 95, y: 5 }
};

var edgeLimits = {
    maxP: 85,
    minP: 75,
    maxN: 15,
    minN: 25
}

moveToCorner();
log('health:' + (health()));
// メインループ
while (true) {
    scanData.currentAngle = scanData.startAngle;

    resetEnemyData();
    if (enemyData.isDetected == false) {
        resetScan();
        moveToCorner();
    } else {
        setupScan();
    }

    enemyData.isDetected = false;

    let oldAngleScan = scan(scanData.oldAngle);
    if (oldAngleScan <= 70) {
        cannon(scanData.oldAngle, oldAngleScan);
    } else {
        handleScanning();
    }

    if (damage() > 0) {
        let oldX = getX();
        if (getX() < 50) {
            customSwim(0, 100);
            playerData.wasEdgeStop = true;
        } else {
            customSwim(180, 100);
            playerData.wasEdgeStop = true;
        }

        if (oldX == getX()) {
            if (getY() < 50) {
                customSwim(-90, 100);
                playerData.wasEdgeStop = true;
            } else {
                customSwim(90, 100);
                playerData.wasEdgeStop = true;
            }
        }
        playerData.oldHealth = health();
        log(/*'your health: ' + */(health()));
    }

    checkEdge();
}

function resetEnemyData() {
    enemyData.previousX = enemyData.enemyX;
    enemyData.previousY = enemyData.enemyY;
    let radian = scanData.currentAngle * Math.PI / 180;
    enemyData.enemyX = scanData.oldDistance * Math.cos(radian);
    enemyData.enemyY = scanData.oldDistance * Math.sin(radian);
    let movedX = enemyData.enemyX - enemyData.previousX;
    let movedY = enemyData.enemyY - enemyData.previousY;
    enemyData.predictedX = enemyData.enemyX + movedX * 3;
    enemyData.predictedY = enemyData.enemyY + movedY * 3;
}

function resetScan() {
    scanData.startAngle = 0;
    scanData.endAngle = 360;
    scanData.width = 16;
    scanData.range = 16;
}

// Set up a next scan
function setupScan() {
    let angle2 = Math.atan2(enemyData.predictedY - getY(), enemyData.predictedX - getX()) * 180 / Math.PI;
    if (Math.abs(scanData.currentAngle - angle2) < 20 && Math.abs(scanData.endAngle - angle2)) {
        if (scanData.currentAngle - 8 > angle2) {
            scanData.currentAngle = angle2 - 5
        } else if (scanData.endAngle + 8 < angle2) {
            scanData.endAngle = angle2 + 5
        }
    }
    scanData.width = (Math.abs(scanData.startAngle - scanData.endAngle) / 8);
    scanData.range = (Math.abs(scanData.startAngle - scanData.endAngle) / 8);
}

function handleScanning() {
    while (scanData.currentAngle < scanData.endAngle) { // Scan
        let angle = scan(scanData.currentAngle, scanData.width);
        checkEdge();
        if (damage() > 0) {
            moveToCorner();
            playerData.oldHealth = health();
        }
        if (angle <= 70) { // Someone detected
            if (enemyData.previousDetected) {
                enemyData.previousDetected = enemyData.isDetected;
                resetEnemyData();
                let angle2 = Math.atan2(enemyData.predictedY - getY(), enemyData.predictedX - getX()) * 180 / Math.PI;
                let len = Math.sqrt(Math.pow(enemyData.predictedX - getX(), 2) + Math.pow(enemyData.predictedY - getY(), 2));
                if (len <= 70) {
                    cannon(angle2, len); // Fire the cannon
                } else {
                    cannon(scanData.currentAngle, angle);
                    enemyData.previousDetected = false;
                }
            } else {
                cannon(scanData.currentAngle, angle); // Fire the cannon
            }
            scanData.startAngle = scanData.currentAngle - 15; // Set up the next scan direction
            scanData.endAngle = scanData.currentAngle + 15;
            if (scanData.oldAngle == scanData.currentAngle && scanData.oldDistance == angle) {
                while (scan(scanData.currentAngle) == angle) {
                    cannon(scanData.currentAngle, angle);
                    if (damage() > 0) {
                        let oldX = getX();
                        if (getX() < 50) {
                            customSwim(0, 100);
                            playerData.wasEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        } else {
                            customSwim(180, 100);
                            playerData.wasEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        }
                        if (oldX == getX()) {
                            if (getY() < 50) {
                                customSwim(-90, 100);
                                playerData.wasEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
                                }
                            } else {
                                customSwim(90, 100);
                                playerData.wasEdgeStop = true;
                                var k = 0;
                                while (k < 5) {
                                    k += 1;
                                    checkEdge();
                                }
                            }
                        }
                        playerData.oldHealth = health();
                        log(/*'your health: ' + */(health()));
                        break;
                    }
                    checkEdge();
                }
            }
            scanData.oldAngle = scanData.currentAngle;
            scanData.oldDistance = angle;
            enemyData.isDetected = true;
            break;
        } else if (angle != Infinity) {
            moveToCorner();
            scan(scanData.currentAngle, scanData.width);
            playerData.wasEdgeStop = true;
            var counter = 0;
            while (counter < 80) {
                var d = scan(scanData.currentAngle, scanData.width);
                if (damage() > 0) {
                    let oldX = getX();
                    if (getX() < 50) {
                        customSwim(0, 100);
                        playerData.wasEdgeStop = true;
                        var k = 0;
                        while (k < 5) {
                            k += 1;
                            checkEdge();
                        }
                    } else {
                        customSwim(180, 100);
                        playerData.wasEdgeStop = true;
                        var k = 0;
                        while (k < 5) {
                            k += 1;
                            checkEdge();
                        }
                    }

                    if (oldX == getX()) {
                        if (getY() < 50) {
                            customSwim(-90, 100);
                            playerData.wasEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        } else {
                            customSwim(90, 100);
                            playerData.wasEdgeStop = true;
                            var k = 0;
                            while (k < 5) {
                                k += 1;
                                checkEdge();
                            }
                        }
                    }
                    playerData.oldHealth = health();
                    log(health());
                }
                if (d < 70) {
                    stop();
                    cannon(scanData.currentAngle, d);
                    break;
                }
                counter += scanData.range;
                checkEdge();
            }
        }
        scanData.currentAngle += scanData.range;
    }
}

function checkEdge() {
    if (getX() < edgeLimits.minN) {
        if (speed() > 0 && playerData.wasEdgeStop == false) {
            if (!playerData.movingToCorner) {
                stop();
            }
            playerData.wasEdgeStop = true;
        }
    }
    if (getX() >edgeLimits.minP) {
        if (speed() > 0 && playerData.wasEdgeStop == false) {
            if (!playerData.movingToCorner) {
                stop();
            }
            playerData.wasEdgeStop = true;
        }
    }
    if (getY() < edgeLimits.minN) {
        if (speed() > 0 && playerData.wasEdgeStop == false) {
            if (!playerData.movingToCorner) {
                stop();
            }
            playerData.wasEdgeStop = true;
        }
    }
    if (getY() > edgeLimits.minP) {
        if (speed() > 0 && playerData.wasEdgeStop == false) {
            if (!playerData.movingToCorner) {
                stop();
            }
            playerData.wasEdgeStop = true;
        }
    }

    if (getX() < edgeLimits.maxN && getX() > edgeLimits.minN) {
        if (speed() > 0) {
            if (!playerData.movingToCorner) {
                swim(playerData.swimAngle, 50);
                enemyData.previousDetected = false;
            }
            playerData.wasEdgeStop = true;
        }
    }
    if (getX() > edgeLimits.maxP && getX() < edgeLimits.minP) {
        if (speed() > 0) {
            if (!playerData.movingToCorner) {
                swim(playerData.swimAngle, 50);
                enemyData.previousDetected = false;
            }
        }
    }
    if (getY() < edgeLimits.maxN && getY() > edgeLimits.minN) {
        if (speed() > 0) {
            if (!playerData.movingToCorner) {
                swim(playerData.swimAngle, 50);
                enemyData.previousDetected = false;
            }
        }
    }
    if (getY() > edgeLimits.maxP && getY() < edgeLimits.minP) {
        if (speed() > 0) {
            if (!playerData.movingToCorner) {
                swim(playerData.swimAngle, 50);
                enemyData.previousDetected = false;
            }
        }
    }

    if (
        getX() > edgeLimits.minN &&
        getX() < edgeLimits.minP &&
        getY() > edgeLimits.minN &&
        getY() < edgeLimits.minP
    ) {
        playerData.wasEdgeStop = false;
    }
}

function customSwim(angle, speed) {
    swim(angle, speed)
    playerData.swimAngle = angle;
    enemyData.previousDetected = false;
}

function moveToCorner() {
    playerData.movingToCorner = true

    let oldX = getX(); // 元の座標
    let oldY = getY();
    var toY = 0; // 行き先の座標
    var toX = 0;

    var rand = Math.floor(Math.random() * 4);
    while (playerData.currentCorner == rand) {
        rand = Math.floor(Math.random() * 4);
        checkEdge();
    }
    playerData.currentCorner = rand;

    switch (playerData.currentCorner) {
        case 0:
            toX = corners.c1.x;
            toY = corners.c1.y;
            break;
        case 1:
            toX = corners.c2.x;
            toY = corners.c2.y;
            break;
        case 2:
            toX = corners.c3.x;
            toY = corners.c3.y;
            break;
        case 3:
            toX = corners.c4.x;
            toY = corners.c4.y;
            break;
    }

    var len = Math.sqrt(Math.pow(toX - oldX, 2) + Math.pow(toY - oldY, 2)); // Get the distance to the corner
    var rad = Math.atan2(toY - oldY, toX - oldX);
    var angle = rad * (180 / Math.PI);

    customSwim(angle, len);

    if (getX() == oldX) {
        moveToCorner();
    }

    playerData.movingToCorner = false
}
