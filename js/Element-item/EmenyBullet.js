class EmenyBullet extends Element {
    constructor(emeny) {
        super('emenybullet');

        this.dom = $("<div class='emenybullet'></div>")

        let {width, height, left, top} = this.getInfo(emeny.dom)

        this.left = left

        this.top = top + height / 2

        this.speed = 8

        config.WRAPPER.append(this.dom)

        this.regCollisionemeny()

    }


    regCollisionemeny(){
        this.regCollision = [
            {
                type:'player',
                callback(_this,target){

                    if (--target.life <= 0){
                        target.die = true
                    }
                    _this.die = true
                }
            }
        ]
    }

    update(){
        this.left -= this.speed

        if (this.left <= 0 - config.WIDTH) this.die = true

        this.dom.css({
            left: this.left,
            top: this.top,
        })
    }
}