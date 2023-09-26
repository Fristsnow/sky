class Emeny extends Element {
    constructor() {
        super('emeny');

        this.dom = $("<div id='emeny' class='emeny'></div>")
        this.left = config.WIDTH
        this.top = Math.max(50, Math.random() * config.HEIGHT - this.dom.height() - 120)
        // this.speed = config.playerSpeed
        config.WRAPPER.append(this.dom)

        this.init()
        this.regp()


    }

    init(){
        this.timer = setInterval((e) =>{
            if (game.pluse === true){
                new EmenyBullet(this)
                // this.music = $("<audio class='music' autoplay src='./music/shoot.mp3'></audio>")
                // config.WRAPPER.append(this.music)
            }
        },1000)
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

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}