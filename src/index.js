import "./index.css";
import $ from "jquery";

console.log("测试文字2");

//圆形对象属性
const ball = {x:350,y:350,r:50,index:0,id:'暂无手柄连接'};

const canvas = $("#canvas")[0];

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


$(window).on("gamepadconnected",function(event){
    let e = event.originalEvent
    console.log(e.gamepad)
    console.log(
        "控制器已连接于 %d 位：%s. %d 个按钮，%d 个坐标方向。",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
      );
    ball.index = e.gamepad.index;
    ball.id = e.gamepad.id;
});
$(window).on("gamepaddisconnected",function(event){
    const e = event.originalEvent;
    console.log("控制器已从 %d 位断开：%s", e.gamepad.index, e.gamepad.id);
    ball.id = "暂无手柄连接";
});


let last = 0;
function draw(t){
    /** @type {Gamepad} */
    let gamepad = window.navigator.getGamepads();
    ctx.clearRect(0,0,700,700)
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(ball.x,ball.y,ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.font = "15px 微软雅黑"
    ctx.fillStyle = "red";
    ctx.fillText(ball.id,10,20);
    ctx.fill();
    
    if(gamepad[ball.index]){
        const axes = gamepad[ball.index].axes;
        const buttons = gamepad[ball.index].buttons;
        //控制每帧动画移动距离
        let space = 0;
        if(last < 1){
            last = t;
        }
        space = (t - last)*0.3;
        last = t;
        if(buttons[4].pressed && ball.r > 5){
            ball.r -= space;
        }
        if(buttons[5].pressed && ball.r < 300){
            ball.r += space;
        }
        //移动数值小于指定范围判定摇杆未移动，过滤设备微小误差
        ball.x += Math.abs(axes[0]) < 0.0042 ? 0:axes[0]*10;
        ball.y += Math.abs(axes[1]) < 0.0042 ? 0:axes[1]*10;
        if(ball.x > 700 + ball.r){
            ball.x = -ball.r;
        }
        if(ball.x < 0 - ball.r){
            ball.x = 700 + ball.r;
        }
        if(ball.y > 700 + ball.r){
            ball.y = -ball.r;
        }
        if(ball.y < 0 - ball.r){
            ball.y = 700 + ball.r;
        }
    }
    window.requestAnimationFrame(draw);
}
draw(0)
