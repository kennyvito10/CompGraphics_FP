var Rotate = pc.createScript('rotate');

// initialize code called once per entity
Rotate.prototype.initialize = function() {
    
};

// update code called every frame 
Rotate.prototype.update = function(dt) {
    //Rotate the portal
   this.entity.rotate(0, 0, dt * 36000);
};

// swap method called for script hot-reloading
// inherit your script state here
// Rotate.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/