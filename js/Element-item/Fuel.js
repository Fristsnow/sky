class Fuel extends Element {
    constructor() {
        super('fuel');
        this.dom = $('<div class="fuel"></div>')
        this.left = Math.max(0, Math.random() * config.WIDTH - this.dom.width() - 30)
        this.top = 0 - config.HEIGHT
        // this.speed = config.playerSpeed
        config.WRAPPER.append(this.dom)
    }

    update() {
        this.top += this.speed
        // this.top(thid)
        if (this.top >= config.HEIGHT) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}