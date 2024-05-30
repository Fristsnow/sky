import {GElement} from "./GElement.js";
import {HEIGHT, WIDTH, WRAPPER} from "./Config.js";

export class Enemy extends GElement {
    constructor() {
        super('enemy');

        this.dom = $('<div id="enemy" class="enemy"></div>')
        this.left = WIDTH
        this.top = Math.max(50, Math.random() * HEIGHT - this.dom.height() - 120)
        // this.speed = config.playerSpeed
        WRAPPER.append(this.dom)
        this.init()
        this.collisionPlayer()
    }

    init() {
        this.timer = setInterval((e) => {
            if (game.pluse === true) {
                new EnemyBullet(this)
            }
        }, 1000)
    }

    update() {
        super.update();
        if (this.left <= 0 - this.dom.width()) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}

export class EnemyBullet extends GElement {
    constructor(enemy) {
        super('enemyBullet');
        this.dom = $("<div class='enemy_bullet'></div>")

        let {left, top, height} = this.getInfo(enemy.dom)
        this.top = top + height / 2
        this.left = left
        this.speed = 8
        WRAPPER.append(this.dom)
        this.collisionPlayer()
    }

    update() {
        super.update();
        if (this.left <= 0 - WIDTH) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}

export class Friendly extends GElement {
    constructor() {
        super('friendly');
        this.dom = $("<div class='friendly'></div>")
        this.left = WIDTH
        this.top = Math.max(50, Math.random() * HEIGHT - this.dom.height() - 120)
        WRAPPER.append(this.dom)
        this.collisionPlayer()
    }

    update() {
        super.update();
        if (this.left <= 0 - this.dom.width()) this.die = true
        this.dom.css({
            left: this.left,
            top: this.top
        })
    }
}

export class Fuel extends GElement {
    constructor() {
        super('fuel');
        this.dom = $('<div class="fuel"></div>')
        this.left = Math.max(0, Math.random() * WIDTH - this.dom.width() - 30)
        this.top = 0 - this.dom.height()
        WRAPPER.append(this.dom)
    }

    update() {
        this.top += this.speed
        if (this.top >= HEIGHT) this.die = true
        this.dom.css({
            left: this.left,
            top: this.top
        })
    }
}

export class Planet extends GElement {
    constructor() {
        super('planet');
        this.dom = $('<div class="planet"></div>')
        this.left = WIDTH
        this.life = 2
        this.top = Math.max(50, Math.random() * HEIGHT - this.dom.height() - 120)

        WRAPPER.append(this.dom)
        this.collisionPlayer()
    }

    update() {
        super.update();
        if (this.left <= 0 - this.dom.width()) this.die = true

        if (this.life <= 1) $(".planet").css("background-image","url('./img/stone-1.png')")

        this.dom.css({
            left: this.left,
            top: this.top
        })
    }
}