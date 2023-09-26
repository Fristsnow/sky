class Q extends Element{
   constructor(q) {
       super("q");

       this.q = q

       this.dom = $("<div class='q'></div>")

       let {width,height,left,top} = this.getInfo(q.dom)

       this.left = left + width

       this.speed = 4

       this.top = 0

       config.WRAPPER.append(this.dom)

       this.regCollisiona()
   }

   regCollisiona(){

       this.regCollision = [
           {
               type:'emeny',
               callback(_this,target){
                   target.die = true

                   if (target.die === true) _this.q.score += 5
               }
           },
           {
               type:'planet',
               callback(_this,target){
                   target.die = true
                   if (target.die === true) _this.q.score += 10

               }
           },
           {
               type: 'emenybullet',
               callback(_this, target) {
                   target.die = true

               }
           }
       ]
   }

   update(){
       this.left += this.speed
       if (this.left >= config.WIDTH) this.die = true

       this.dom.css({
           left: this.left,
           top: this.top,
       })

   }
}