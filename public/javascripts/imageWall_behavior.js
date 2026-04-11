/** 更新圖片/圖片路徑 **/

var image_path = {

    // 預設圖片
    "default-img-wall" : "image/image wall/image wall 1.jpg", 

    // 輪播圖片
    "image-wall-imgs" : [
        "image/image wall/image wall 1.jpg",
        "image/image wall/image wall 2.jpg",
        "image/image wall/image wall 3.jpg",
        "image/image wall/image wall 4.jpg",
        "image/image wall/image wall 5.jpg"
        //新增/修改圖片
    ]
}

/** 以下是程式碼 **/

// 加入下一張圖片
function addNewImage(direction) {

    // Create new image
    var newImage = document.createElement("img");
    newImage.src = images[currentIndex]; 
    newImage.className = "wall-image"
    newImage.alt = "render-wall-img"; 

    // 決定圖片生成方向
    if(direction=="right"){
        newImage.style.left = "100%";
    }else if(direction=="left"){
        newImage.style.right = "100%";
    }
    
    // Add to container
    var imageContainer = document.getElementById("imageWall");
    imageContainer.appendChild(newImage);
}

// 切換圖片的函式
function switchImage(direction) {

    // 更新index
    if(direction=="right"){
        currentIndex = (currentIndex + 1) % images.length;
    }else if (direction=="left"){
        currentIndex = (currentIndex - 1);
    }

    // 如果 index < 0 則切換至最後一張圖片
    if (currentIndex < 0){
        currentIndex = images.length-1;
    }
    
    // 新增圖片
    addNewImage(direction);

    //控制點點移動
    for (let i = 0; i < dot_array.length; i++){
        dot_array[i].style.opacity = 0;
    }

    dot_array[currentIndex].style.opacity = 1;

    // 控制新圖片移動
    var exist_images = document.querySelectorAll(".wall-image");
    var current_Image = exist_images[0]
    var next_image = exist_images[1]

    $(document).ready(function(){
        if(direction=="right"){
            $(next_image).animate({left:"0%"},render_time);
        }else if(direction=="left"){
            $(next_image).animate({right:"0%"},render_time);
        }
        $(current_Image).fadeOut(render_time);

        // 延遲並刪除舊圖片
        setTimeout(function() {current_Image.remove();},render_time*0.4);
    });
}

// 依照圖片數量新增點點
function addDots(type) {

    // Create new image
    var newDot = document.createElement("div"); 
    if(type=="track"){
        newDot.className = "image-wall-dot";
        // Add to container
        var imageContainer = document.getElementById("dot-container");
        imageContainer.appendChild(newDot);
    }else if(type=="move"){
        newDot.className = "image-wall-moving-dot";
        // Add to container
        var imageContainer = document.getElementById("dot-track");
        imageContainer.appendChild(newDot);
        dot_array.push(newDot);
    }
    
}

// 加入預設圖片
function addDefaultImg(defaultImgPath){
    var default_Image = document.createElement("img");
    default_Image.src = defaultImgPath; 
    default_Image.className = "wall-image"
    default_Image.alt = "default-wall-img";
    var imageContainer = document.getElementById("imageWall");
    imageContainer.appendChild(default_Image);
}

// 圖片檔案陣列
const images = image_path["image-wall-imgs"];

// 加入預設圖片 (第一張)
addDefaultImg(image_path['default-img-wall']);

// 初始化圖片引索
var currentIndex = 0;

// 圖片切換速度
var render_time = 300;
var auto_render_time = 15000;

// 取得圖片和按鈕控制
const left_button = document.getElementById('left-switch-btn');
const right_button = document.getElementById('right-switch-btn');

// 按按鈕切換
right_button.addEventListener('click', switchImage.bind(null,"right"));
left_button.addEventListener('click', switchImage.bind(null,"left"));

// 循環播放
var intervalID = setInterval(switchImage.bind(null,"right"),auto_render_time)

// 點點背景
for(let i = 0; i < images.length; i++){
    addDots("track");
}

// 移動點點
dot_array = [];
for(let i = 0; i < images.length; i++){
    addDots("move");
}

dot_array[0].style.opacity = 1;