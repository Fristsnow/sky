class Bullet extends Element {
    constructor(ship) {
        super('bullet')
        this.ship = ship
        this.speed = 7
        this.dom = $("<div class='bullet'></div>")
        let {width, height, left, top} = this.getInfo(ship.dom)
        this.left = left + width
        this.top = top + height / 2
        config.WRAPPER.append(this.dom)
        this.regCollisionFunc()
    }

    regCollisionFunc() {
        this.regCollision = [
            {
                type: 'emeny',
                callback(_this, target) {
                    target.die = true
                    _this.die = true
                    if (target.die === true) _this.ship.score += 5
                }
            },
            {
                type: 'friendly',
                callback(_this, target) {
                    target.die = true
                    _this.die = true
                    if (target.die === true) _this.ship.score -= 10

                }
            },
            {
                type: 'planet',
                callback(_this, target) {
                    if (--target.life <= 0){
                        target.die = true
                    }
                    _this.die = true
                    if (target.die === true) _this.ship.score += 10
                }
            },
        ]
    }

    update() {
        this.left += this.speed
        if (this.left >= config.WIDTH) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}