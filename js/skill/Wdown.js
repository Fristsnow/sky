class Wdown extends Element{
    constructor(ships) {
        super('wdown');

        this.ship = ships

        this.dom = $("<div class='wdown'></div>")

        this.left = game.player.left

        this.top = 20 + game.player.top + this.dom.height()

        config.WRAPPER.append(this.dom)

        this.init()
    }

    init(){
        this.timer = setInterval((e)=>{
            new Bullet(this)
        },1000)
        setTimeout(()=>{
            this.die = true
        },10000)
    }
    update(){
        this.left = game.player.left
        this.top = 20 + game.player.top + this.dom.height()

        this.dom.css({
            left: this.left,
            top: this.top,
        })

    }
}