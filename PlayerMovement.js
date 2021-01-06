var PlayerMovement = pc.createScript('playerMovement');
//initialize the speed of the character walks
PlayerMovement.attributes.add('speed', { type: 'number', default: 0.01 });
//initialize the camera entity to be used
PlayerMovement.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('Camera');
    this.cameraScript = camera.script.cameraMovement;
};

//Specifies the direction of the character that walks, based on the keyboard input
//A moves Left
//D moves Right
//W moves forward
//s moves backwards
PlayerMovement.prototype.update = function (dt) {
    
    var app = this.app;

    var forward = this.entity.forward;
    var right = this.entity.right;

    var x = 0;
    var z = 0; 

    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= right.x;
        z -= right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += right.x;
        z += right.z;
    }

    if (app.keyboard.isPressed(pc.KEY_W)) {
        x += forward.x;
        z += forward.z;
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        x -= forward.x;
        z -= forward.z;
    }
    //gets the camera to follow the character as it walks based on the keyboard input
    if (x !== 0 || z !== 0) {
        var pos = new pc.Vec3(x * dt, 0, z * dt);
        pos.normalize().scale(this.speed);
        pos.add(this.entity.getPosition());

        var targetY = this.cameraScript.eulers.x + 180;
        var rot = new pc.Vec3(0, targetY, 0);

        this.entity.rigidbody.teleport(pos, rot);
    }
};