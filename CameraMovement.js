var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('mouseSpeed', { type: 'number', default: 1, description: 'Mouse Sensitivity' });

//This File contatins all the code to control the camera movement of the character model
//initialize the camera objects
CameraMovement.prototype.initialize = function () {
    this.eulers = new pc.Vec3();
    this.touchCoords = new pc.Vec2();

    var app = this.app;
    app.mouse.on("mousemove", this.onMouseMove, this);

    app.mouse.on("mousedown", function () {
        app.mouse.enablePointerLock();
    }, this);

    this.rayEnd = app.root.findByName('RaycastEndPoint');
};
//Set angles of camera to stay on the character
CameraMovement.prototype.postUpdate = function (dt) {
    var originEntity = this.entity.parent;
    
    var targetY = this.eulers.x + 180;
    var targetX = this.eulers.y ;

    var targetAng = new pc.Vec3(-targetX, targetY, 0);
    
    originEntity.setEulerAngles(targetAng);
                   
    this.entity.setPosition(this.getWorldPoint());
    
    this.entity.lookAt(originEntity.getPosition());
};
// Camera angle moves according to your mouse movement
CameraMovement.prototype.onMouseMove = function (e) {
    if (pc.Mouse.isPointerLocked()) {
        this.eulers.x -= ((this.mouseSpeed * e.dx) / 60) % 360;
        this.eulers.y += ((this.mouseSpeed * e.dy) / 60) % 360;

        if (this.eulers.x < 0) this.eulers.x += 360;
        if (this.eulers.y < 0) this.eulers.y += 360;
    }
};
//This code is for the camera to always follow the character
CameraMovement.prototype.getWorldPoint = function () {
    var from = this.entity.parent.getPosition(); 
    var to = this.rayEnd.getPosition();

    var hitPoint = to;

    var app = this.app;
    var hit = app.systems.rigidbody.raycastFirst(from, to);
    
    return hit ? hit.point : to;
};
