let canvas = document.getElementById('canvas'),
	context,
	canvasWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
	canvasHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
	requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame
let persons = [],
	numberOfFirefly = 30,
	birthToGive = 25

var colors = []
/* Galactic Tea - http://www.colourlovers.com/palette/1586746/Galactic_Tea*/
colors[2] = []
colors[2]['background'] = '#2F294F'
colors[2][1] = 'rgba(230,255,89,'
colors[2][2] = 'rgba(234,112,10,'
colors[2][3] = 'rgba(255,182,0,'
colors[2][4] = 'rgba(255,100,0,'

var colorTheme = 2, mainSpeed = 1

function getRandomInt(min, max, exept) {
	var i = Math.floor(Math.random() * (max - min + 1)) + min
	if (typeof exept == 'undefined') return i
	else if (typeof exept == 'number' && i == exept) return getRandomInt(min, max, exept)
	else if (typeof exept == 'object' && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept)
	else return i
}

function degToRad(deg) {
	return deg * (Math.PI / 180)
}

function Firefly(id) {
	this.id = id
	this.width = getRandomInt(3, 6)
	this.height = this.width
	this.x = getRandomInt(0, (canvas.width - this.width))
	this.y = getRandomInt(0, (canvas.height - this.height))
	this.speed = (this.width <= 10) ? 2 : 1
	this.alpha = 1
	this.alphaReduction = getRandomInt(1, 3) / 1000
	this.color = colors[colorTheme][getRandomInt(1, colors[colorTheme].length - 1)]
	this.direction = getRandomInt(0, 360)
	this.turner = getRandomInt(0, 1) == 0 ? -1 : 1
	this.turnerAmp = getRandomInt(1, 2)
	this.isHit = false
	this.stepCounter = 0
	this.changeDirectionFrequency = getRandomInt(1, 200)
	this.shape = 2 //getRandomInt(2,3);
	this.shadowBlur = getRandomInt(5, 25)
}

Firefly.prototype.walk = function () {
	var next_x = this.x + Math.cos(degToRad(this.direction)) * this.speed,
		next_y = this.y + Math.sin(degToRad(this.direction)) * this.speed

	// Canvas limits
	if (next_x >= (canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
		next_x = canvas.width - this.width
		this.direction = getRandomInt(90, 270, this.direction)
	}
	if (next_x <= 0 && (this.direction > 90 && this.direction < 270)) {
		next_x = 0
		var exept = [ 90, 270 ]
		this.direction = getRandomInt(0, 360, exept)
	}
	if (next_y >= (canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
		next_y = canvas.height - this.height
		this.direction = getRandomInt(180, 360, this.direction)
	}
	if (next_y <= 0 && (this.direction > 180 && this.direction < 360)) {
		next_y = 0
		this.direction = getRandomInt(0, 180, this.direction)
	}

	this.x = next_x
	this.y = next_y

	this.stepCounter++

	if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
		this.turner = this.turner == -1 ? 1 : -1
		this.turnerAmp = getRandomInt(1, 2)
		this.stepCounter = 0
		this.changeDirectionFrequency = getRandomInt(1, 200)
	}

	this.direction += this.turner * this.turnerAmp

	this.update()
}

Firefly.prototype.update = function () {

	context.beginPath()

	context.fillStyle = this.color + this.alpha + ')'
	context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false)
	context.shadowColor = this.color + this.alpha + ')'
	context.shadowBlur = this.shadowBlur
	context.shadowOffsetX = 0
	context.shadowOffsetY = 0
	context.fill()

	if (this.id > 15) {
		this.alpha -= this.alphaReduction
		if (this.alpha <= 0) this.die()
	}

}

Firefly.prototype.die = function () {
	persons[this.id] = null
	delete persons[this.id]
}

function start(_canvas) {
	canvas = _canvas
	context = canvas.getContext('2d')

	canvas.setAttribute('width', canvasWidth)
	canvas.setAttribute('height', canvasHeight)

	canvas.onclick = function (e) {
		giveBirth(e, birthToGive)
	}

	instantiatePopulation()
	animate()
}

function instantiatePopulation() {
	var i = 0
	while (i < numberOfFirefly) {
		persons[i] = new Firefly(i)
		i++
	}
}

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	context.beginPath()

	// Création d'une copie de l'array persons
	let persons_order = persons.slice(0)
	// Tri par ordre de position sur l'axe y (afin de gérer les z-index)
	persons_order.sort(function (a, b) {
		return a.y - b.y
	})

	// Paint les instances dans l'ordre trié
	for (var i in persons_order) {
		var u = persons_order[i].id
		persons[u].walk()
	}

	requestAnimationFrame(animate)
}

function giveBirth(e, u) {
	var i = persons.length
	persons[i] = new Firefly(i)
	persons[i].x = e.pageX
	persons[i].y = e.pageY

	if (u > 1) giveBirth(e, u - 1)
}

export const startFirefly = start
export const createFirefly = giveBirth
