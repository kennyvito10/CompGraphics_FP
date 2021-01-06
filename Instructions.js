var Instructions = pc.createScript('instructions');
var info;
// initialize all objects
Instructions.prototype.initialize = function() {
    var app = this.app;
    info = this.app.root.findByName('Notes');
    info.enabled = true;
};

// update code called every frame
Instructions.prototype.update = function(dt) {
    var app = this.app;
    //toggle i to show or close the instructions
    if(this.app.keyboard.wasPressed(pc.KEY_I)){
        if(info.enabled){
            info.enabled = false;
                
            }
        else {
            info.enabled = true;   
        }
        } 
        
};

// swap method called for script hot-reloading
// inherit your script state here
// Instructions.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/