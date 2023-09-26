class Planet extends Element {
    constructor() {
        super('planet');
        this.dom = $('<div id="emenybullet" class="planet"></div>')
        this.left = config.WIDTH

        this.life = 2
        this.top = Math.max(50, Math.random() * config.HEIGHT - this.dom.height() - 120)
        // this.speed = config.playerSpeed
        config.WRAPPER.append(this.dom)
        this.regp()

    }

    regp() {
        this.regCollision = [
            {
                type: 'player',
                callback(_this, target) {
                    if (--target.life <= 0){
                        target.die = true
                    }
                    _this.die = true
                }
            }
        ]
    }

    update() {
        this.left -= this.speed
        if (this.left <= 0 - this.dom.width()) this.die = true

        if (this.life <= 1) $(".planet").css("background-image","url('./img/stone-1.png')")

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}