import {Player, PlayerBullet} from "./Player.js";
import {Enemy, Friendly, Fuel, Planet} from "./EItem.js";
import {WRAPPER} from "./Config.js";

export class Index {
    constructor() {
        this.element = new Map()
        this.player = null

        this.time = 0
        this.pluse = true
        this.createElementObj = {
            enemy: {
                original: 100,
                now: 50,
                class: Enemy,
            },
            friendly: {
                original: 150,
                now: 70,
                class: Friendly,
            },
            fuel: {
                original: 100,
                now: 50,
                class: Fuel,
            },
            planet: {
                original: 180,
                now: 100,
                class: Planet,
            }
        }

        this.init()
    }

    init() {
        window.requestAnimationFrame(this.update.bind(this))

        this.setEvent()
        setInterval((e) => {
            if (this.pluse === true) {
                this.time++
            }
        }, 1000)
    }


    start() {
        $("*").css("animation-play-state", "running")
    }

    stop() {
        $("*").css("animation-play-state", "paused")
    }

    setEvent() {
        let lastShot = 0
        $(window).keydown((e) => {
            if (e.keyCode === 80) {
                this.pluse = !this.pluse
                this.pluse ? this.start() : this.stop()
                console.log(this.pluse.toString())
            }
            if (e.keyCode === 32 && this.player.fuel >= 1 && new Date() - lastShot >= 400) {
                new PlayerBullet(this.player)
                this.player.fuel--
                lastShot = new Date()
                this.music = $("<audio class='music' autoplay src='./music/shoot.mp3'></audio>")
                WRAPPER.append(this.music)
            }
        })
        $('#input_name_btn').click(() => {
            const name = document.getElementById('input_name').value
            const arr = JSON.parse(localStorage.getItem('table')) || localStorage.setItem('table', JSON.stringify([]))
            arr.push({name: name, score: this.player.score, time: this.time})
            localStorage.setItem('table', JSON.stringify(arr))
            console.log(arr, '2')
            arr.sort((a, b) => {
                if (b.score === a.score) {
                    return a.time - b.time
                } else {
                    return b.score - a.score
                }
            }).splice(10)
            for (let i = 0; i < arr.length; i++) {
                let tr = $("<tr></tr>")
                let td =
                    "<td>" + i + "</td>" +
                    "<td>" + arr[i].name + "</td>" +
                    "<td>" + arr[i].score + "</td>" +
                    "<td>" + arr[i].time + "</td>"
                tr.append(td)
                $("#tabledata").append(tr)
            }
            $('.main_input').fadeToggle(1000)
            $('.main_over').fadeToggle(1000)
        })
        $('#GoHome').click(() => {
            $('.main_over').fadeToggle(1000)
            $('.main_start').fadeToggle(1000)
        })
    }

    // 创建元素
    createElement() {
        for (const key in this.createElementObj) {
            const item = this.createElementObj[key]
            if (--item.now <= 0) {
                new item.class()
                item.now = item.original
            }
        }
    }

    addElement(type, element) {
        if (!this.element.has(type)) this.element.set(type, [])
        this.element.set(type, [...this.element.get(type), element])
    }

    update() {
        if (this.pluse) {
            if (this.player == null) {
                this.player = new Player()
            }
            // 创建元素（不包含玩家）
            this.createElement()

            this.element.forEach((item, type) => {
                for (let i = 0; i < item.length; i++) {
                    const element = item[i]
                    if (element.die) {
                        element.dom.remove()
                        if (element.timer) {
                            clearInterval(element.timer)
                        }
                        this.element.get(type).splice(i, 1)
                    }
                    element.collision()
                    element.update()
                }
            })
            if (this.player.life === 0) {
                this.pluse = false
                console.log('游戏结束')
                $('.main_game').fadeToggle()
                $('.main_input').fadeToggle(2000)
            }
        }
        $('#time').html(this.time)
        window.requestAnimationFrame(this.update.bind(this))
    }
}