// 控制滑動 - 從別頁點產品專區
if (localStorage.getItem('scroll') == 'true') {

    window.addEventListener('load', function(){

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

        // 計算正確的位置
        const y = targetElement.getBoundingClientRect().top + window.scrollY + offset_val;

        // 滑動
        setTimeout(function () {
            window.scrollTo({top: y, behavior: 'smooth'});
        }, 700);
    });

}
