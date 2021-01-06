var PlayerAnimationHandler = pc.createScript('playerAnimationHandler');
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
var audio;
var audio_map2;

//adding the necessary attributes for the blendTime, Change scenes, and change cubemap
PlayerAnimationHandler.attributes.add('blendTime', { type: 'number', default: 0.2 });
PlayerAnimationHandler.attributes.add("sceneName", {type: "string", default: "", title: "Scene Name to Load"});
PlayerAnimationHandler.attributes.add("cubemap", { type:"asset", assetType:"cubemap" });


//initializing objects that will be used inside the game
PlayerAnimationHandler.prototype.initialize = function () {
    var app = this.app;
    app.keyboard.on(pc.EVENT_KEYDOWN, this.keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this.keyChange, this);

    this.direction = 'Idle.json';
    console.log(this.direction);
    this.setDirection('Idle.json');
    
    
    audio = this.app.root.findByName('SoundFX');
    audio_map2 = this.app.root.findByName('SoundFX_map2');
    paper = this.app.root.findByName('#2paper');
    paper.enabled = false;
    portal = this.app.root.findByName('EndDoor');
    portal.enabled = false;
    clue1 = this.app.root.findByName('clue1');
    clue1.enabled = false;
    cluekey = this.app.root.findByName('Commands');
    cluekey.enabled = false;
    obstacle = this.app.root.findByTag('Items');
    obstacle_map2 = this.app.root.findByTag('Items2');
    itemCollected = 0;
    itemCollected_map2 = 0;
    key = this.app.root.findByTag('Item_key');
    keyCollected = 0;
    keyEnable = this.app.root.findByName('key');
    keyEnable.enabled = false;
    // clue2 = this.app.root.findByName('clue2');
    // clue2.enabled = false;
    this.app.root.findByName('Capsule').collision.on('collisionstart', this.onCollisionStart, this);
    this.app.root.findByName('Capsule').collision.on('collisionend', this.onCollisionEnd, this);
};



PlayerAnimationHandler.prototype.checkButtons = function () {
    var app = this.app;
    // detects what is the keyboard input
    var w = app.keyboard.isPressed(pc.KEY_W);
    var a = app.keyboard.isPressed(pc.KEY_A);
    var s = app.keyboard.isPressed(pc.KEY_S);
    var d = app.keyboard.isPressed(pc.KEY_D);
// every direction categorized to play the animation
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
//handle on what buttons are pressed
PlayerAnimationHandler.prototype.keyChange = function (e) {
    var tempDirection = this.direction;

    this.checkButtons();

    if (tempDirection !== this.direction) {
        this.setDirection(this.direction);
    }
};
// to choose what model that animation going to play
PlayerAnimationHandler.prototype.setDirection = function (direction) {
    this.direction = direction;
    this.app.root.findByName('TESTINGGIRL').animation.play(direction, this.blendTime);
    console.log(this.blendTime);
    console.log(this.entity);
};



// every time the character collision to object, the object will get destroy and the corresponding values will increase 1 by 1
PlayerAnimationHandler.prototype.onCollisionStart =  function(result) {
//if player collects the notes on the first map
if(result.other.rigidbody && result.other.tags.has('Items')){
    //play the sound effects
    audio.sound.play("paper");
    itemCollected += 1;
    var i;
        for (i = 0; i < obstacle.length; i++) {
          if(obstacle[i].name == result.other.name)
              {
                  obstacle[i].destroy();  //destroys the note
                  break;
              }
        }


}
    
    //if player collects the notes on the second map
    if(result.other.rigidbody && result.other.tags.has('Items2')){
        //play the sound effects
    audio_map2.sound.play("paper_map2");
    itemCollected_map2 += 1;
    var k;
        for (k = 0; k < obstacle_map2.length; k++) {
          if(obstacle_map2[k].name == result.other.name)
              {
                  obstacle_map2[k].destroy();    //destroys the note
                  break;
              }
        }


}
    //if player collects the key on the first map
    if(result.other.rigidbody && result.other.tags.has('Item_key')){
        //play the sound effects
    audio.sound.play("key");
    keyCollected =+ 1;
    var j;
        for (j = 0; j < key.length; j++) {
          if(key[j].name == result.other.name)   //destroys the key
              {
                  key[j].destroy();
                  break;
              }
        }


}
//     if the character model collides with the portal, 
//     it will teleport to a different map , play a sound, change the skybox, and add fog to the scene
    
    if(result.other.rigidbody && result.other.tags.has('EndDoor')){
        
        audio.sound.play("portalsound");
        
        if (this.app.scene.skyboxMip === 0)
    {
        this.cubemap.loadFaces = true;
        this.app.assets.load(this.cubemap);
    }
    //change the skybox
    this.app.scene.setSkybox(this.cubemap.resources);
        //add fog to the current scene on the second map
        this.app.scene.fog = pc.FOG_EXP;
        this.app.scene.fogColor = new pc.Color(0.243137, 0.2392157, 0.262745, 1);
        this.app.scene.fogDensity = 0.01;
        
        var self = this;
        setTimeout(function (){ 
            self.loadScene(self.sceneName); // load the next Map (forest)
            
        }, 3500);


}
};

// function to change scene after finish and entering the portal
PlayerAnimationHandler.prototype.loadScene = function (sceneName) {
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
            
        } else {
            console.error(err);
        }
    
});
   
};

// update code called every frame
PlayerAnimationHandler.prototype.update = function(dt) {
    //open the first clue if already collected one map
        if(itemCollected >= 1){
        clue1.enabled = true;
        paper.enabled = true;
        }
        else {
            clue1.enabled = false;   
            paper.enabled = false;
        }
    //open the second clue if already collected two maps, and find missing key
    if(itemCollected >= 2){
        cluekey.enabled = true;
        keyEnable.enabled = true;
        }
        else {
            cluekey.enabled = false;   
            keyEnable.enabled = false;
        }
    //opens up portal if key is already collected
    
    if(keyCollected == 1 ){
        portal.enabled = true;
        }
        else {
            portal.enabled = false;
        }
    
    // if(itemCollected_map2 >= 1){
    //     clue2.enabled = true;
    //     }
    //     else {
    //         clue2.enabled = false;
    //     }
        
};
