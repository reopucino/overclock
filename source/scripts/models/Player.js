const MINIMUM_VELOCITY = 0.001
const MAXIMUM_VELOCITY = 1

class Player {
    constructor(protoplayer) {
        this.width = 12
        this.height = 16
        this.color = "#FFF"

        this.sprite = SPRITES.rocket
        this.width = this.sprite.width
        this.height = this.sprite.height

        this.position = {x: WIDTH * 0.5, y: HEIGHT * 0.75}
        this.anchor = {x: 0.5, y: 0.5}

        this.acceleration = 0.5 * (20/15)
        this.deceleration = 1.3 * (20/15)
        this.velocity = {x: 0, y: 0}

        this.game = protoplayer.game

        this.counter = 0
        this.weapon = {
            rate: 0.2 * (20/15),
            speed: 4 / (2),
            angle: Math.PI / -2
        }

        this.killcount = 20
    }
    update(delta) {
        // Inputs
        var inputs = Input.getDirection()
        this.velocity.x += inputs.x * this.acceleration * delta.realtime.inFrames
        this.velocity.y += inputs.y * this.acceleration * delta.realtime.inFrames
        // if(Input.isDown("W") || Input.isDown("UP")) {
        //     this.velocity.y -= this.acceleration * delta.realtime.inFrames
        // }
        // if(Input.isDown("S") || Input.isDown("DOWN")) {
        //     this.velocity.y += this.acceleration * delta.realtime.inFrames
        // }
        // if(Input.isDown("A") || Input.isDown("LEFT")) {
        //     this.velocity.x -= this.acceleration * delta.realtime.inFrames
        // }
        // if(Input.isDown("D") || Input.isDown("RIGHT")) {
        //     this.velocity.x += this.acceleration * delta.realtime.inFrames
        // }

        // Maximum Velocity
        if(this.velocity.x < -1 * MAXIMUM_VELOCITY) {
            this.velocity.x = -1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.x > +1 * MAXIMUM_VELOCITY) {
            this.velocity.x = +1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.y < -1 * MAXIMUM_VELOCITY) {
            this.velocity.y = -1 * MAXIMUM_VELOCITY
        }
        if(this.velocity.y > +1 * MAXIMUM_VELOCITY) {
            this.velocity.y = +1 * MAXIMUM_VELOCITY
        }

        // Translation
        this.position.x += this.velocity.x * delta.realtime.inFrames
        this.position.y += this.velocity.y * delta.realtime.inFrames

        // Deceleration
        this.velocity.x *= 1 / this.deceleration
        this.velocity.y *= 1 / this.deceleration
        if(Math.abs(this.velocity.x) < MINIMUM_VELOCITY) {
            this.velocity.x = 0
        } if(Math.abs(this.velocity.y) < MINIMUM_VELOCITY) {
            this.velocity.y = 0
        }

        // More Inputs
        if(inp.mouse.isDown) {
            this.position.x += inp.x
            this.position.y += inp.y
            inp.x = 0
            inp.y = 0
        }

        // Shooting
        this.counter += delta.realtime.inSeconds
        if(this.counter >= this.weapon.rate) {
            this.counter -= this.weapon.rate
            var projectile = new Projectile({
                speed: this.weapon.speed,
                angle: this.weapon.angle,
                game: this.game,
                position: {
                    x: this.position.x,
                    y: this.position.y
                }
            })
        }
    }
    beDamaged() {
        this.remove()
        timesDied += 1
        var explosion = new Explosion({
            game: this.game,
            billows: 10,
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            size: 50 + (Math.random() * 10)
        })
    }
    remove() {
        if(this.game && this.game.player) {
            delete this.game.player
        }
    }
    countkill() {
        this.killcount -= 1
    }
}
