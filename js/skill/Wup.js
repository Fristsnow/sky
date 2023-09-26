class Wup extends Element{
    constructor(ship) {
        super('wup');

        this.ship = ship

        this.dom = $("<div class='wup'></div>")

        this.left = game.player.left

        this.top = game.player.top - this.dom.height() - 20

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

        this.top = game.player.top - this.dom.height() - 20



        this.dom.css({
            left: this.left,
            top: this.top,
        })

    }
}