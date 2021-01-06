var Instructions2 = pc.createScript('instructions2');
var info;
// initialize all objects
Instructions2.prototype.initialize = function() {
    var app = this.app;
    info = this.app.root.findByName('Map2Notes');
    info.enabled = true;
};

// update code called every frame
Instructions2.prototype.update = function(dt) {
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
// Instructions2.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/