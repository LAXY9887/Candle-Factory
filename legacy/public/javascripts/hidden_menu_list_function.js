// 獲取物件
var hidden_menu_btn = document.getElementById("hidden-menu-btn");
var hidden_menu = document.getElementById("hidden-menu-pannel");

// 打開隱藏菜單
$(document).ready(function(){
	// 隱藏 menu 的按鈕功能(從螢幕右邊展開)
	$(hidden_menu_btn).click(function(){
		$(".hidden-menu").toggleClass("show")
	});
});

// 生成清單
fetch('product_infoCard.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {

        var products = data.products || [];
        var menuWrapper = document.querySelector('.menu-option-wapper');

        // 將產品按分類分組
        var groupedData = {};
        products.forEach(function(item) {
            if (!groupedData[item.category]) {
                groupedData[item.category] = [];
            }
            groupedData[item.category].push(item);
        });

        // 遍歷分組後的資料
        for (var category in groupedData) {
            if (groupedData.hasOwnProperty(category)) {

                // 建立選項容器
                var optionContainer = document.createElement('div');
                optionContainer.classList.add('hidden-menu-option-container');

                // 建立按鈕
                var button = document.createElement('button');
                button.classList.add('hidden-option-btn');

                var buttonText = document.createElement('span');
                buttonText.textContent = category;
                button.appendChild(buttonText);
                optionContainer.appendChild(button);

                // 建立分隔線
                var hr = document.createElement('hr');
                optionContainer.appendChild(hr);

                // 建立下拉選單
                var dropdown = document.createElement('ul');
                dropdown.classList.add('hidden-dropdown');
                groupedData[category].forEach(function(product) {
                    var li = document.createElement('li');
                    var span = document.createElement('span');
                    span.textContent = product.title;
                    li.appendChild(span);

                    // 設置 id
                    var encoded_id = encodeURIComponent(product.title.replace(/\s+/g, '-').toLowerCase());
                    li.id = encoded_id;

                    // 設置 class 類別
                    var encode_category = product.type;
                    li.classList.add(encode_category);

                    dropdown.appendChild(li);

                    // 直接用 type 對應 intro ID (不再需要 switch)
                    var target = "." + encode_category;
                    var target_class_obj = document.querySelectorAll(target);
                    var target_intro = product.type + '-intro';

                    // 點擊事件
                    li.addEventListener('click', function() {

                        // 檢查是否在 index.html
                        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {

                            // 下滑至產品專區
                            localStorage.setItem('scroll', true);

                            // 選擇顯示類別
                            localStorage.setItem('display_class', encode_category);

                            // 選擇顯示產品
                            localStorage.setItem('display_target', encoded_id);

                            // 選擇顯示產品介紹
                            localStorage.setItem('display_intro', target_intro);

                            // 跳轉至 index.html
                            window.location.href = 'index.html';
                        }
                        else {
                            // 關閉所有介紹
                            var allIntros = document.querySelectorAll('.product-intro-container');
                            allIntros.forEach(function(el) { el.style.display = 'none'; });

                            // 打開目標介紹
                            var target_intro_obj = document.getElementById(target_intro);
                            if (target_intro_obj) target_intro_obj.style.display = 'flex';

                            // 關閉所有卡片
                            var allCards = document.querySelectorAll('.infomation-card-wraper');
                            allCards.forEach(function(el) { el.style.display = 'none'; });

                            // 打開目標類別卡片
                            target_class_obj.forEach(function(el) { el.style.display = 'block'; });

                            // 控制目標產品顯示
                            var target_element = document.getElementById(encoded_id);

                            // 先關掉其他的
                            var other_expandedElements = document.querySelectorAll('.expan');
                            if (other_expandedElements) {
                                other_expandedElements.forEach(function(element) {
                                    element.classList.remove('expan');
                                });
                            }

                            // 排到最前
                            var target_parent = target_element.parentNode;
                            target_parent.removeChild(target_element);
                            target_parent.insertBefore(target_element, target_parent.firstChild);

                            target_element.classList.toggle('expan');

                            // 處裡圖片
                            var target_img = target_element.querySelector('.image-card-frame');
                            target_img.classList.toggle('expan');

                            // 處裡框框
                            var target_frame = target_element.querySelector('.image-text-wraper');
                            target_frame.classList.add('trans');

                            // 處理文字
                            var target_text = target_element.querySelector('.infoText');
                            target_text.classList.add('trans');

                            // 位移
                            var offsetY = -90;
                            var screenWidth = window.innerWidth;
                            if (screenWidth < 500) {
                                offsetY = -55;
                            }

                            var y = target_element.getBoundingClientRect().top + window.scrollY + offsetY;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                    });

                });
                optionContainer.appendChild(dropdown);

                menuWrapper.appendChild(optionContainer);

                // 按鈕展開/收合下拉選單
                button.addEventListener('click', function() {
                    var dropdown = this.nextElementSibling.nextElementSibling;
                    dropdown.classList.toggle('reveal');
                });
            }
        }
    })
    .catch(function(error) { console.error('Error loading JSON file:', error); });
