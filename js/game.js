var fps = 1000/50
var GameLoop = setInterval(function(){
	// Player controls
		if(RegisteredKeys['A'] && player.vy==0) player.vx = -player.speed
		if(RegisteredKeys['D'] && player.vy==0) player.vx =  player.speed
		if(RegisteredKeys[' '] && player.vy==0) player.vy = -10


	// Sidescrolling
		// player.x += player.vx
		
		GameObjects.forEach(function(GameObject){
			if(!(GameObject instanceof Player)){
				GameObject.x -= player.vx
			}
		})
		


	// Apply Gravity to player
	player.y += player.vy
	if(player.vy<player.gravity) {player.vy += player.weight}
	

	GameObjects.forEach(function(GameObject){
		if(GameObject instanceof Block){
			// Vertical collision from top
			if(player.collides(GameObject) && player.bottom() < GameObject.top()+player.vy){
				
				player.y = GameObject.top() - player.height
				player.vy = 0
				// Stop player when landed
				player.vx =0
			}

			// Vertical collision from bottom
			if(player.collides(GameObject) && player.top()-player.vy > GameObject.bottom()){
				
				player.vy = 3
			}
		}
	})

	//Collectibles
	GameObjects.forEach(function(GameObject){
		if(GameObject instanceof Collectible){
			if(GameObject.collides(player)){
				// alert('Altini kaptin!')
				GameObjects.splice(GameObjects.indexOf(GameObject),1)
				player.inventory.push(GameObject)
			}
		}
	})

	Graphics.clearRect(0,0,GameScene.width,GameScene.height)
		GameObjects.forEach(function(GameObject){
			GameObject.Draw()
		})
},fps)

var SpriteAnimations = setInterval(function(){
	// Player controls

			// player.tickIndex=0
		if(RegisteredKeys['A'] && player.vy==0) {
			player.sy=0
			player.tickIndex++
			if(player.tickIndex==6) player.tickIndex=0
			player.sx = player.tickIndex*player.width
		}
		if(RegisteredKeys['D'] && player.vy==0) {
			player.sy=120
			player.tickIndex++
			if(player.tickIndex==6) player.tickIndex=0
			player.sx = player.tickIndex*player.width
		}
		if(RegisteredKeys[' '] && player.vy==0) {
			
		}
		if(!RegisteredKeys['A'] && !RegisteredKeys['D']){
			player.sy=240
			player.sx=0
		}
},1000/10)

var player = new Player({
	sprite 	: 'assets/characters.png',
	speed	: 2,
	x		: 300,
	y		: 0,
	sy		: 0,
	width	: 40,
	height	: 60,
	tickIndex:0
})


// Level design
	for (var i = 0; i < 10; i++) {
		var block = new Block({
			y 	: 250,
			x 	: i*30 + 100,
			sprite:'assets/ground.png',
			width:30,
			height:27
		})
	};

	for (var i = 0; i < 5; i++) {
		var block = new Block({
			y 	: 300,
			x 	: i*30 + 510,
			sprite:'assets/ground.png',
			width:30,
			height:27
		})
	};
	// Main Ground
	for (var i = 0; i < 20; i++) {
		var block = new Block({
			y 	: 370,
			x 	: i*30,
			sprite:'assets/ground.png',
			width:30,
			height:27
		})
	};

	// Collectibles
	new Collectible({
		x : 100,
		y : 100,
		sprite : 'assets/pokeball.png',
		width:12,
		height:12
	})

	new Collectible({
		x : 200,
		y : 150,
		sprite : 'assets/pokeball.png',
		width:12,
		height:12
	})
	new Collectible({
		x : 250,
		y : 160,
		sprite : 'assets/pokeball.png',
		width:12,
		height:12
	})












