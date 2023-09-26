class Game {
    constructor() {

        this.elements = new Map()
        this.player = null

        //暂停
        this.pluse = true
        this.time = 0

        this.createElementObj = {
            enemy: {
                orginal: 100,
                now: 50,
                class: Emeny,
            },
            friendly: {
                orginal: 150,
                now: 70,
                class: Friendly,
            },
            fuel: {
                orginal: 100,
                now: 50,
                class: Fuel,
            },
            planet: {
                orginal: 180,
                now: 100,
                class: Planet,
            }
        }

        this.init()
    }

    // 全局
    init() {
        window.requestAnimationFrame(this.update.bind(this))
        // 键盘事件
        this.setEvent()
        setInterval((e) => {
            if (this.pluse === true) {
                this.time++
            }
        }, 1000)
    }p

// 暂停发射子弹
    setEvent() {
        let lastShot = 0
        let lastQ = 0
        let lastW = 0
        let fontSize = 15
        // let audio = document.getElementById('music')
        $(window).keydown((e) => {
            if (e.keyCode === 80) {
                this.pluse = !this.pluse
                if (this.pluse) {
                    this.start()
                    // audio.play();
                } else {
                    this.stop()
                    // audio.pause();
                }
            }
            //bullet
            if (e.keyCode === 32 && this.player.fuel >= 1 && this.pluse && new Date() - lastShot >= 400) {
                new Bullet(this.player)
                this.player.fuel--
                lastShot = new Date()
                this.music = $("<audio class='music' autoplay src='./music/shoot.mp3'></audio>")
                config.WRAPPER.append(this.music)

            }
            // console.log(e.keyCode)
            // q = 81  w = 89 e = 69
            //q
            if (e.keyCode === 81 && this.player.fuel >= 30 && this.pluse && new Date() - lastQ >= 30000) {
                new Q(this.player)
                this.player.fuel -= 30
                lastQ = new Date()
                let sec = 30
                let timerQ = setInterval(() => {
                    if (new Date() - lastQ < 30000) {
                        sec--
                        sec = Math.floor(sec)
                        $(".skill-q").html(sec)
                    } else {
                        $(".skill-q").html("")
                        clearInterval(timerQ)
                    }
                }, 1000)

            }
            //w
            if (e.keyCode === 87) {
                new Wup(this.player)
                new Wdown(this.player)
            }
            //e
            if (e.keyCode === 69 && this.player.fuel >= 20 && this.pluse && new Date() - lastW >= 1000) {
                this.player.life++
                this.player.fuel -= 20
                let secw = 20
                let timerW = setInterval(() => {
                    if (new Date() - lastW < 10000) {
                        secw--
                        secw = Math.floor(secw)
                        $(".skill-W").html(secw)
                    } else {
                        $(".skill-W").html("")
                        clearInterval(timerW)
                    }
                }, 1000)
            }
        })
        $("#lastshot").click(() => {
            this.pluse = !this.pluse
            if (this.pluse) {
                this.start()
            } else {
                this.stop()
            }
        })
        $(".a-a").click(() => {
            fontSize++
            document.getElementById("game").style.fontSize = fontSize + 'px'
        })
        $("#btn").click(() => {
            let name = document.getElementById("name").value
            $.ajax({
                // url: 'http://localhost:80/sky/register.php',
                url: './register.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    name,
                    score: this.player.score,
                    time: this.time,
                }
            }).done((res) => {
                console.log(res)
                if (name === "") {
                    alert("name")
                } else {
                    let resdata = res
                    $(".main-table-over").fadeToggle(1000)
                    $(".tables").fadeToggle(1000)
                    resdata.sort(function (a, b) {
                        if (b.score === a.score) {
                            return a.time - b.time
                        } else {
                            return b.score - a.score
                        }
                    }).splice(10)
                    for (let i = 0; i < resdata.length; i++) {
                        let tr = $("<tr></tr>")
                        let td = "<td>" + resdata[i].id + "</td>" +
                            "<td>" + resdata[i].name + "</td>" +
                            "<td>" + resdata[i].score + "</td>" +
                            "<td>" + resdata[i].time + "</td>"
                        tr.append(td)
                        $("#tabledata").append(tr)
                    }
                }
            }).fail((err) => {
                console.log(err)
            })
        })
        $("#GoHome").click(() => {
            $(".tables").fadeToggle(1000)
            $(".main-page").fadeToggle(1000)
        })
    }

    start() {
        $("*").css("animation-play-state", "running")
        $(".lastshot").css("background-image", "url('./img/runmind.png')")
    }

    stop() {
        $("*").css("animation-play-state", "paused")
        $(".lastshot").css("background-image", "url('./img/shopmind.png')")
    }

    // 添加
    addElement(type, element) {
        if (!this.elements.has(type)) this.elements.set(type, [])
        this.elements.set(type, [...this.elements.get(type), element])
    }

// 创建
    createElement() {
        for (const key in this.createElementObj) {
            const item = this.createElementObj[key]
            if (--item.now <= 0) {
                new item.class()
                item.now = item.orginal
            }
        }
    }

    // 更新
    update() {
        if (this.pluse) {
            // 如果有玩家飞机则创建一个
            if (this.player == null) {
                this.player = new Player()
            }
            // this.musics()
            this.createElement()
            this.elements.forEach((item, type) => {
                for (let i = 0; i < item.length; i++) {
                    const element = item[i]
                    if (element.die) {
                        element.dom.remove()
                        if (element.timer) {
                            clearInterval(element.timer)
                        }
                        this.elements.get(type).splice(i, 1)
                    }
                    element.collision()
                    element.update()
                }
            })
            if (this.player.life === 0) {
                this.pluse = false
                $(".game").fadeToggle(1000)
                $(".main-table-over").fadeToggle(1000)
            }
        }
        $("#time").html(this.time)
        window.requestAnimationFrame(this.update.bind(this))
    }
}

$(document).ready(function () {
    $('.main-btn').click(function () {
        $('.main-page').fadeToggle()
        $('.game').fadeToggle(2000)
        window.game = new Game()
    })
})


