class Player extends Element {
    constructor() {
        super('player')

        this.dom = $("<div class='player'></div>")
        this.left = 20
        this.top = config.HEIGHT / 2 - this.dom.height() / 2
        this.speed = config.playerSpeed
        config.WRAPPER.append(this.dom)

        this.score = 0

        this.life = 3

        this.fuel = 30

        this.dir = new Map()
        this.dir.set(37, 0)
        this.dir.set(38, 0)
        this.dir.set(39, 0)
        this.dir.set(40, 0)

        this.setEvent()

        this.regCollision = [
            {
                type: 'emeny',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    config.WRAPPER.append(this.music)

                }
            },
            {
                type: 'fuel',
                callback(_this, target) {
                    target.die = true
                    _this.fuel += 10
                    this.music = $("<audio class='music' autoplay src='./music/power_up.mp3'></audio>")
                    config.WRAPPER.append(this.music)
                }
            },
            {
                type: 'planet',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    config.WRAPPER.append(this.music)

                }
            },
            {
                type: 'friendly',
                callback(_this, target) {
                    target.die = true
                    _this.life--
                    this.music = $("<audio class='music' autoplay src='./music/explosion.mp3'></audio>")
                    config.WRAPPER.append(this.music)
                    config.WRAPPER.remove(this.music)

                }
            }
        ]

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
        this.left += (this.dir.get(39) - this.dir.get(37)) * this.speed
        this.top += (this.dir.get(40) - this.dir.get(38)) * this.speed

        this.left = Math.max(0,
            Math.min(this.left, config.WIDTH - this.dom.width()))
        this.top = Math.max(50,
            Math.min(this.top, config.HEIGHT - this.dom.height() - 50))

        $('#score').html(this.score)

        $('#hd').html(this.life)

        // $('#fuel').setAttribute("value",this.fuel)
        document.getElementById('fuel').value = this.fuel;

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}