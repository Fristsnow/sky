import {npmSpeed} from "./Config.js";

export class GElement {
    constructor(type) {
        this.type = type

        this.speed = npmSpeed

        game.addElement(type, this)

        this.die = false

        this.regCollision = []
    }

    getInfo(dom = this.dom) {
        let width = dom.width()
        let height = dom.height()
        let left = dom.position().left
        let top = dom.position().top

        return {
            width,
            height,
            left,
            top
        }
    }

    collisionPlayer() {
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

    collision() {
        for (const item of this.regCollision) {
            const targets = game.element.get(item.type)

            if (targets) {
                for (const target of targets) {
                    let {
                        left: thisLeft,
                        top: thisTop,
                        width: thisWidth,
                        height: thisHeight
                    } = this.getInfo()

                    let {
                        left: targetLeft,
                        top: targetTop,
                        width: targetWidth,
                        height: targetHeight
                    } = this.getInfo(target.dom)

                    if (
                        thisLeft + thisWidth >= targetLeft
                        &&
                        thisTop + thisHeight >= targetTop
                        &&
                        targetTop + targetHeight >= thisTop
                        &&
                        targetLeft + targetWidth >= thisLeft
                    ) {
                        item.callback(this, target)
                    }
                }
            }
        }
    }

    update(){
        this.left -= this.speed
    }
}