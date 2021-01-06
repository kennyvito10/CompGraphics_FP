var PlayerAnimationHandler2 = pc.createScript('playerAnimationHandler2');
var itemCollected;
var itemCollected_map2;
var keyCollected;
var obstacle;
var obstacle_map2;
var clue1;
var key;
var keyEnable;
var portal;
var cluekey;
var paper;
var clue2;
var lastclue;
var audio;
var audio_map2;
var emerald;
var emeraldCollected;
var emerald_map2;
var portal_map2;
var win;
var winscreen;

PlayerAnimationHandler2.attributes.add('blendTime', { type: 'number', default: 0.2 });
PlayerAnimationHandler2.attributes.add("sceneName", {type: "string", default: "", title: "Scene Name to Load"});
PlayerAnimationHandler2.attributes.add("cubemap", { type:"asset", assetType:"cubemap" });


PlayerAnimationHandler2.prototype.initialize = function () {
    var app = this.app;
    app.keyboard.on(pc.EVENT_KEYDOWN, this.keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this.keyChange, this);

    this.direction = 'Idle.json';
    console.log(this.direction);
    this.setDirection('Idle.json');
    
    emerald = this.app.root.findByName('Emeraldobj1');
    emerald.enabled = false;
    emeraldCollected = 0;
    audio = this.app.root.findByName('SoundFX');
    audio_map2 = this.app.root.findByName('SoundFX_map2');
    paper = this.app.root.findByName('#2paper');
    paper.enabled = false;
    portal = this.app.root.findByName('EndDoor');
    portal.enabled = false;
    portal_map2 = this.app.root.findByName('Portal2');
    portal_map2.enabled = false;
    win = this.app.root.findByTag('win');
    winscreen = this.app.root.findByName('Ending');
    winscreen.enabled = false;
    clue1 = this.app.root.findByName('clue1');
    clue1.enabled = false;
    cluekey = this.app.root.findByName('Commands');
    cluekey.enabled = false;
    obstacle = this.app.root.findByTag('Items');
    obstacle_map2 = this.app.root.findByTag('Items2');
    emerald_map2 = this.app.root.findByTag('Emerald');
    itemCollected = 0;
    itemCollected_map2 = 0;
    key = this.app.root.findByTag('Item_key');
    keyCollected = 0;
    keyEnable = this.app.root.findByName('key');
    keyEnable.enabled = false;
    clue2 = this.app.root.findByName('clue2');
    clue2.enabled = false;
    lastclue = this.app.root.findByName('lastclue');
    lastclue.enabled = false;
    this.app.root.findByName('Capsule').collision.on('collisionstart', this.onCollisionStart, this);
    this.app.root.findByName('Capsule').collision.on('collisionend', this.onCollisionEnd, this);
};



PlayerAnimationHandler2.prototype.checkButtons = function () {
    var app = this.app;
    
    var w = app.keyboard.isPressed(pc.KEY_W);
    var a = app.keyboard.isPressed(pc.KEY_A);
    var s = app.keyboard.isPressed(pc.KEY_S);
    var d = app.keyboard.isPressed(pc.KEY_D);

    if (w && !s) {
        if (a && !d) {
            this.direction = 'Jog Forward Diagonal Left.json';
        } else if (d && !a) {
            this.direction = 'Jog Forward Diagonal Right.json';
        } else {
            this.direction = 'Jog Forward.json';
        }
    } else if (s && !w) {
        if (a && !d) {
            this.direction = 'Jog Backward Diagonal Left.json';
        } else if (d && !a) {
            this.direction = 'Jog Backward Diagonal Right.json';
        } else {
            this.direction = 'Jog Backward.json';
        }
    } else if (a && !d) {
        this.direction = 'Jog Strafe Left.json';
    } else if (d && !a) {
        this.direction = 'Jog Strafe Right.json';
    } else {
        this.direction = 'Idle.json';
    }
};

PlayerAnimationHandler2.prototype.keyChange = function (e) {
    var tempDirection = this.direction;

    this.checkButtons();

    if (tempDirection !== this.direction) {
        this.setDirection(this.direction);
    }
};

PlayerAnimationHandler2.prototype.setDirection = function (direction) {
    this.direction = direction;
    this.app.root.findByName('TESTINGGIRL').animation.play(direction, this.blendTime);
    console.log(this.blendTime);
    console.log(this.entity);
};




PlayerAnimationHandler2.prototype.onCollisionStart =  function(result) {
if(result.other.rigidbody && result.other.tags.has('Items')){
    audio.sound.play("paper");
    itemCollected += 1;
    var i;
        for (i = 0; i < obstacle.length; i++) {
          if(obstacle[i].name == result.other.name)
              {
                  obstacle[i].destroy();
                  break;
              }
        }


}
    if(result.other.rigidbody && result.other.tags.has('Items2')){
    audio_map2.sound.play("paper_map2");
    itemCollected_map2 += 1;
    var k;
        for (k = 0; k < obstacle_map2.length; k++) {
          if(obstacle_map2[k].name == result.other.name)
              {
                  obstacle_map2[k].destroy();
                  break;
              }
        }


}
    
    if(result.other.rigidbody && result.other.tags.has('Item_key')){
    audio.sound.play("key");
    keyCollected =+ 1;
    var j;
        for (j = 0; j < key.length; j++) {
          if(key[j].name == result.other.name)
              {
                  key[j].destroy();
                  break;
              }
        }


}
    
    
    if(result.other.rigidbody && result.other.tags.has('Emerald')){
    audio_map2.sound.play("emeraldsound");
    emeraldCollected =+ 1;
    var l;
        for (l = 0; l < emerald_map2.length; l++) {
          if(emerald_map2[l].name == result.other.name)
              {
                  emerald_map2[l].destroy();
                  break;
              }
        }


}
    
        if(result.other.rigidbody && result.other.tags.has('win')){
    audio_map2.sound.play("winsound");
    winscreen.enabled = true;
    var q;
        for (q = 0; q < win.length; q++) {
          if(win[q].name == result.other.name)
              {
                  win[q].destroy();
                  break;
              }
        }


}
    
    if(result.other.rigidbody && result.other.tags.has('EndDoor')){
        
        audio.sound.play("portalsound");
        
        if (this.app.scene.skyboxMip === 0)
    {
        this.cubemap.loadFaces = true;
        this.app.assets.load(this.cubemap);
    }

    this.app.scene.setSkybox(this.cubemap.resources);

        this.app.scene.fog = pc.FOG_EXP;
        this.app.scene.fogColor = new pc.Color(0.243137, 0.2392157, 0.262745, 1);
        this.app.scene.fogDensity = 0.01;
        
        var self = this;
        setTimeout(function (){ 
            self.loadScene(self.sceneName); // load the next Map (forest)
            
        }, 3500);


}
};

// function to change scene after finish
PlayerAnimationHandler2.prototype.loadScene = function (sceneName) {
    // Get a reference to the scene's root object
    var oldHierarchy = this.app.root.findByName ('Root');
    console.log("old hierarchy", oldHierarchy);
    oldHierarchy.destroy();
    
    

    // Get the path to the scene
    var scene = this.app.scenes.find(sceneName);
    console.log("This scene", scene);

    // Load the scenes entity hierarchy
    this.app.scenes.loadSceneHierarchy(scene.url, function (err, parent) {
        if (!err) {
            // console.log("destroying hierarchy");
            // oldHierarchy.destroy();
        } else {
            console.error(err);
        }
    
});
   
};

// update code called every frame
PlayerAnimationHandler2.prototype.update = function(dt) {
        if(itemCollected >= 1){
        clue1.enabled = true;
        paper.enabled = true;
        }
        else {
            clue1.enabled = false;   
            paper.enabled = false;
        }
    
    if(itemCollected >= 2){
        cluekey.enabled = true;
        keyEnable.enabled = true;
        }
        else {
            cluekey.enabled = false;   
            keyEnable.enabled = false;
        }
    
    if(keyCollected == 1 ){
        portal.enabled = true;
        }
        else {
            portal.enabled = false;
        }
    // if map is collected, find the emerald
    if(itemCollected_map2 >= 1){
        clue2.enabled = true;
        emerald.enabled = true;
        }
        else {
            clue2.enabled = false;
            emerald.enabled = false;
        }
  //if emerald already collected, opens up the portal to finish the game  
    if(emeraldCollected >= 1){
        lastclue.enabled = true;
        portal_map2.enabled = true;
        }
        else {
            lastclue.enabled = false;
            portal_map2.enabled = false;
        }
    
    
        
};
