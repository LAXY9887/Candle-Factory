function draw_diamond (canvas_id, color) {

    // 取得 canvas
    let canvas = document.getElementById(canvas_id);

    // 創立一個畫筆
    let ctx = canvas.getContext('2d');

    // 畫布的中心點
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    // 根据畫布大小動态确定顶点位置
    ctx.beginPath();
    ctx.moveTo(cx, cy - cy); // 上頂點
    ctx.lineTo(cx + cx, cy); // 右頂點
    ctx.lineTo(cx, cy + cy); // 下頂點
    ctx.lineTo(cx - cx, cy); // 左頂點
    ctx.closePath();

    ctx.fillStyle = color; //設定填充色
    ctx.fill();  //填充顏色
    
}

// 首頁形像圖下面的公司名稱
draw_diamond('deco-diamond','red')