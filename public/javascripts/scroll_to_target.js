// 按按鈕滑動至特定元素
function scrollToElement(scrollButton, targetElement, y_offset) {
    // 添加點擊事件監聽器
    scrollButton.addEventListener('click', function() {
        // 計算正確的位置
        const y = targetElement.getBoundingClientRect().top + window.scrollY + y_offset;

        window.scrollTo({top: y, behavior: 'smooth'});
    });
}

// 使用範例
var scrollButton = document.getElementById('scrollButton');
var targetElement = document.getElementById('targetElement');

// 取得屏幕寬
var screenWidth = window.innerWidth;

// 滑動位移
var offset_val = -100;

// 響應式設計
if (screenWidth < 800) {
    offset_val = -70;
}

if (screenWidth < 500) {
    offset_val = -60;
}

// 位移
scrollToElement(scrollButton, targetElement, offset_val);
