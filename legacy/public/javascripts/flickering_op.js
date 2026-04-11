//
var canvas_background = document.getElementById('fireCanvas_backGround');

// 畫布閃光
var canvas = document.getElementById('fireCanvas');
var ctx = canvas.getContext('2d');

// 閃光大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 光点的初始属性
var light = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    alpha: 0
};

// 用于变化光点透明度的函数
function flickerLight() {
    // 随机改变透明度来模拟闪烁
    light.alpha += 0.02;
    light.radius += 50;
}

  // 绘制光点的函数
function drawLight() {
    // 清除之前绘制内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置样式
    ctx.fillStyle = 'rgba(255, 215, 158, ' + light.alpha + ')'; // 火焰色
    ctx.shadowBlur = 20; // 阴影模糊级别
    
    // 绘制光点
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // 模拟闪烁效果
    flickerLight();
}

let frameCount = 0;
const maxFrames = 50; 

// 动画循环
function animate() {

    if (frameCount <= maxFrames) {

        frameCount++;

        drawLight();

        // 使用setTimeout来延迟下一次调用animate()函数
        setTimeout(function() {
            requestAnimationFrame(animate);
        }, 15);
    }

    if (frameCount == maxFrames){
        canvas_background.classList.add('close');
        canvas.classList.add('fireCanvas_BG');
        canvas.classList.add('close');
        document.body.style.overflow = 'auto'; // 允許捲動
    }
}

// 启动动画
requestAnimationFrame(animate);