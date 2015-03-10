var GameScene 		= document.getElementById('Scene')
var Graphics		= GameScene.getContext('2d')
	Graphics.Draw 	= function(sprite,sx,sy,swidth,sheight,x,y,width,height){
				Graphics.drawImage(sprite,sx,sy,swidth,sheight,x,y,width,height)		
	}
	Graphics.Clear	= function(){
		Graphics.clearRect(0,0,GameScene.width,GameScene.height)
	}
	Graphics.Refresh = function(){
		Graphics.clearRect(0,0,GameScene.width,GameScene.height)
		for (var i = 0; i < GameObjects.length; i++) {
			GameObjects[i].Draw()
		};
	}

var GameObjects = new Array()
var GameObject	= function(options){
	
	for(var key in options){
		this[key] = options[key]
	}

	if(!options.sprite)	{this.sprite 	= 'assets/void.png'}
	if(!options.x)		{this.x 		= 10}
	if(!options.y)		{this.y 		= 10}
	if(!options.width)	{this.width 	= 40}
	if(!options.height)	{this.height 	= 40}
	if(!options.solid)	{this.solid 	= true}
	if(!options.name)	{this.name 		= 'NoName'}
	if(!options.sx)		{this.sx 		= 0}
	if(!options.sy)		{this.sy 		= 0}

	// Create image objects at start to prevent blinking
	var img = new Image()
		img.src = this.sprite
		this.sprite = img
		

	this.top 		= function(){return this.y}
	this.right 		= function(){return this.x+this.width}
	this.left		= function(){return this.x}
	this.bottom		= function(){return this.y+this.height}
	this.Draw 		= function(){
		Graphics.Draw(
			this.sprite,
			this.sx,
			this.sy,
			this.width,
			this.height,
			this.x,this.y,
			this.width,this.height)
	}
	this.collides = function(OtherObject){
		if(this.left() > OtherObject.right()) return false
		if(this.top() > OtherObject.bottom()) return false
		if(this.right() < OtherObject.left()) return false
		if(this.bottom() < OtherObject.top()) return false

		return true
	}
	
}

var Player = function(options){
	this.extends(new GameObject(options))

	this.inventory = new Array()
	// Player defaults
	if(!options.vx)		{this.vx = 0}
	if(!options.vy)		{this.vy = 0}
	if(!options.speed)	{this.speed = 3}

	// Apply gravity
	this.vy = 3
	this.gravity = 20
	this.weight = 0.5

	this.tickIndex = 0

	GameObjects.push(this)
}
var Block = function(options){
	this.extends(new GameObject(options))
	GameObjects.push(this)
}
var Collectible = function(options){
	this.extends(new GameObject(options))

	GameObjects.push(this)
}

var Sprite = function(image,width,height,ticks,fps){
		this.ticks		= ticks
		this.tickIndex	=0
		this.width		= width
		this.height		= height
		this.fps		= 1000/60 || 1000/fps


}

// Keyboard Events
var RegisteredKeys = new Array()
document.onkeydown = function(e){
	RegisteredKeys[String.fromCharCode(e.keyCode)] = true
}
document.onkeyup = function(e){
	RegisteredKeys[String.fromCharCode(e.keyCode)] = false
}

Object.prototype.extends = function(OtherObject){
	for(var key in OtherObject){
		this[key] = OtherObject[key]
	}
}