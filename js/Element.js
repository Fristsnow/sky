class Element {
    constructor(type) {
        // 类型
        this.type = type
        // 速度
        this.speed = config.npmSpeed
        //添加
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

    collision() {
        for (const item of this.regCollision) {
            const targets = game.elements.get(item.type)

            if (targets) {
                for (const target of targets) {
                    let {
                        left: thisLeft,
                        top: thisTop,
                        width: thisWidth,
                        height: thisHeight,
                    } = this.getInfo()
                    let {
                        left: targetLeft,
                        top: targetTop,
                        width: targetWidth,
                        height: targetHeight,
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
}

