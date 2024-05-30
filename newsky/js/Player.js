import {GElement} from "./GElement.js";
import {HEIGHT, playerSpeed, WIDTH, WRAPPER} from "./Config.js";

export class Player extends GElement {
    constructor() {
        super('player');

        this.dom = $("<div class='player'></div>")

        this.left = 20
        console.log(HEIGHT)
        this.top = HEIGHT / 2 - this.dom.height() / 2
        this.speed = playerSpeed

        WRAPPER.append(this.dom)

        this.score = 0
        this.life = 3
        this.fuel = 0

        this.dir = new Map()
        this.dir.set(37, 0)
        this.dir.set(38, 0)
        this.dir.set(39, 0)
        this.dir.set(40, 0)

        this.regCollision = [
            {
                type: 'enemy',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    WRAPPER.append(this.music)
                }
            },
            {
                type: 'fuel',
                callback(_this, target) {
                    target.die = true
                    _this.fuel += 10
                    this.music = $("<audio class='music' autoplay src='./music/power_up.mp3'></audio>")
                    WRAPPER.append(this.music)
                }
            },
            {
                type: 'planet',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    WRAPPER.append(this.music)

                }
            },
            {
                type: 'friendly',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    WRAPPER.append(this.music)
                    WRAPPER.remove(this.music)

                }
            }
        ]
        this.setEvent()
        this.init()
    }

    init() {
        setInterval((e) => {
            this.fuel++
        }, 1000)
    }

    setEvent() {
        $(window)
            .keydown((e) => {
                if (this.dir.has(e.keyCode) === true) {
                    this.dir.set(e.keyCode, 1)
                }
            })
            .keyup((e) => {
                if (this.dir.has(e.keyCode) === true) {
                    this.dir.set(e.keyCode, 0)
                }
            })
    }

    update() {
        // 移动
        this.left += (this.dir.get(39) - this.dir.get(37)) * this.speed
        this.top += (this.dir.get(40) - this.dir.get(38)) * this.speed

        // 边缘检测
        this.left = Math.max(0,
            Math.min(this.left, WIDTH - this.dom.width()))
        this.top = Math.max(50,
            Math.min(this.top, HEIGHT - this.dom.height() - 50))

        $('#score').html(this.score)
        $('#life').html(this.life)

        document.getElementById('fuel').value = this.fuel;

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}

export class PlayerBullet extends GElement{
    constructor(player) {
        super('bullet');
        this.player = player
        this.speed = 7
        this.dom = $("<div class='bullet'></div>")
        let {width, height, left, top} = this.getInfo(player.dom)
        this.left = left + width
        this.top = top + height / 2
        WRAPPER.append(this.dom)
        this.regCollisionFunc()
    }
    regCollisionFunc() {
        this.regCollision = [
            {
                type: 'enemy',
                callback(_this, target) {
                    target.die = true
                    _this.die = true
                    if (target.die === true) _this.player.score += 5
                }
            },
            {
                type: 'friendly',
                callback(_this, target) {
                    target.die = true
                    _this.die = true
                    if (target.die === true) _this.player.score -= 10

                }
            },
            {
                type: 'planet',
                callback(_this, target) {
                    if (--target.life <= 0){
                        target.die = true
                    }
                    _this.die = true
                    if (target.die === true) _this.player.score += 10
                }
            },
        ]
    }

    update() {
        this.left += this.speed
        if (this.left >= WIDTH) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}