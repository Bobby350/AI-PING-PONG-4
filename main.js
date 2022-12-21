rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

function preload() {
	ball_touch_paddel = loadSound("ball_touch_paddel.wav");
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');

	video = createCapture(VIDEO);
	video.size(600, 300)

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
	instializeInSetup(pingpong);

}

function draw() {
	if(game_status == "start") {
		background(0);
		image(video, 0, 0, 700, 600);
		fill("black");
		stroke('black');
		rect(680, 0, 20, 700);
		fill("black");
		stroke('black');
		rect(0, 0, 20, 700);
		if(scoreRightWrist > 0.2) {
			fill("red");
			stroke("red");
			circle(rightWristX, rightWristY, 30);
		}
	}
}

function gotPoses(results) {
	if(results.length > 0) {
		rightWristX = results[0].pose.rightWrist.X;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
	}
}

function modelLoaded() {
	console.log('Model Loaded!');
}