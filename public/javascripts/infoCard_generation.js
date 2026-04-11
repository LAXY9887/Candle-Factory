// 獲取要複製的(第一個)
var toCopyElement = document.querySelector('.infomation-card-wraper');

// 從 JSON 文件載入產品資訊
fetch('product_infoCard.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {

        var categories = data.categories || [];
        var products = data.products || [];

        // ===== 動態生成分類按鈕 =====
        var btnContainer = document.querySelector('.product-button-list-container');
        if (btnContainer) {
            btnContainer.innerHTML = '';
            categories.forEach(function(cat) {
                // 間隔
                var spacer1 = document.createElement('div');
                btnContainer.appendChild(spacer1);

                // 按鈕
                var btnDiv = document.createElement('div');
                var span = document.createElement('span');
                span.className = 'class-btn function-btn-text';
                span.setAttribute('data-type', cat.type);
                span.textContent = cat.name;
                btnDiv.appendChild(span);
                btnContainer.appendChild(btnDiv);

                // 間隔
                var spacer2 = document.createElement('div');
                btnContainer.appendChild(spacer2);
            });
        }

        // ===== 動態生成產品介紹區塊 =====
        var productSection = document.querySelector('.product-section');
        var infoCardContainer = document.querySelector('.infomation-card-container');

        // 移除舊的靜態介紹區塊 (如果有)
        var oldIntros = productSection.querySelectorAll('.product-intro-container');
        oldIntros.forEach(function(el) { el.remove(); });

        // 在資訊卡容器之前插入動態生成的介紹區塊
        categories.forEach(function(cat) {
            var introContainer = document.createElement('div');
            introContainer.className = 'product-intro-container';
            introContainer.id = cat.type + '-intro';
            introContainer.style.display = 'none';

            var introContext = document.createElement('div');
            introContext.className = 'product-intro-context';

            // 圖
            var figureDiv = document.createElement('div');
            figureDiv.className = 'product-intro-figure';
            var img = document.createElement('img');
            img.src = cat.image;
            img.alt = cat.name + '-intro-img';
            figureDiv.appendChild(img);

            // 文
            var textDiv = document.createElement('div');
            textDiv.className = 'product-intro-text';
            var p = document.createElement('p');
            p.textContent = cat.description;
            textDiv.appendChild(p);

            introContext.appendChild(figureDiv);
            introContext.appendChild(textDiv);
            introContainer.appendChild(introContext);

            productSection.insertBefore(introContainer, infoCardContainer);
        });

        // 預設顯示第一個分類的介紹
        var defaultType = categories.length > 0 ? categories[0].type : 'Type-1';
        var defaultIntro = document.getElementById(defaultType + '-intro');
        if (defaultIntro) defaultIntro.style.display = 'flex';

        // ===== 動態生成資訊卡 =====
        products.forEach(function(product) {

            // 複製範本元素
            var clone = toCopyElement.cloneNode(true);

            // 把產品名稱 encode，當作 id
            var encode_id = encodeURIComponent(product.title.replace(/\s+/g, '-').toLowerCase());
            clone.id = encode_id;
            clone.classList.add(product.type);

            // 更改圖片路徑
            clone.querySelector('img').src = product.image;

            // 更改文字內容
            clone.querySelector('.infoCard-title').innerText = product.title;
            clone.querySelectorAll('.infoCard-context')[0].innerText = product.description;
            clone.querySelectorAll('.infoCard-context')[1].innerText = product.price;

            // 預設顯示第一個分類
            if (product.type === defaultType) {
                clone.style.display = "block";
            } else {
                clone.style.display = "none";
            }

            // 加入點擊展開功能
            clone.addEventListener('click', function() {

                // 先關掉其他的
                var other_expandedElements = document.querySelectorAll('.expan');
                if (other_expandedElements) {
                    other_expandedElements.forEach(function(element) {
                        element.classList.remove('expan');
                    });
                }

                // 排到最前
                var parent = clone.parentNode;
                parent.removeChild(clone);
                parent.insertBefore(clone, parent.firstChild);

                // 展開
                clone.classList.toggle('expan');

                // 處裡圖片
                var clone_img = clone.querySelector('.image-card-frame');
                clone_img.classList.toggle('expan');

                // 處裡框框
                var clone_frame = clone.querySelector('.image-text-wraper');
                clone_frame.classList.add('trans');

                // 處理文字
                var clone_text = clone.querySelector('.infoText');
                clone_text.classList.add('trans');

                var offsetY = -95;
                var y = clone.getBoundingClientRect().top + window.scrollY + offsetY;
                window.scrollTo({ top: y, behavior: 'instant' });
            });

            // 插入新生成的元素到文檔中
            toCopyElement.parentNode.appendChild(clone);
        });

        // ===== 設定分類按鈕切換功能 =====
        var classButtons = document.querySelectorAll('.class-btn');
        classButtons.forEach(function(button) {

            var targetType = button.getAttribute('data-type');
            var targetClass = '.' + targetType;
            var targetIntroId = targetType + '-intro';

            button.addEventListener('click', function() {

                // 關閉所有介紹
                var allIntros = document.querySelectorAll('.product-intro-container');
                allIntros.forEach(function(el) { el.style.display = 'none'; });

                // 打開目標介紹
                var targetIntro = document.getElementById(targetIntroId);
                if (targetIntro) targetIntro.style.display = 'flex';

                // 關閉所有卡片
                var allCards = document.querySelectorAll('.infomation-card-wraper');
                allCards.forEach(function(el) { el.style.display = 'none'; });

                // 打開目標類別卡片
                var targetCards = document.querySelectorAll(targetClass);
                targetCards.forEach(function(el) { el.style.display = 'block'; });
            });
        });

        // ===== 處理從其他頁面跳轉過來的狀態 =====
        var savedIntro = localStorage.getItem('display_intro');
        var savedClass = localStorage.getItem('display_class');
        var savedTarget = localStorage.getItem('display_target');

        // 顯示指定分類的介紹
        if (savedIntro && savedIntro !== 'none') {
            var allIntros = document.querySelectorAll('.product-intro-container');
            allIntros.forEach(function(el) { el.style.display = 'none'; });
            var targetIntroObj = document.getElementById(savedIntro);
            if (targetIntroObj) targetIntroObj.style.display = 'flex';
        }

        // 顯示指定分類的卡片
        if (savedClass && savedClass !== 'none') {
            var allCards = document.querySelectorAll('.infomation-card-wraper');
            allCards.forEach(function(el) { el.style.display = 'none'; });
            var targetCards = document.querySelectorAll('.' + savedClass);
            targetCards.forEach(function(el) { el.style.display = 'block'; });
        }

        // 展開指定產品
        if (savedTarget && savedTarget !== 'none') {
            var targetEl = document.getElementById(savedTarget);
            if (targetEl) {
                var other_exp = document.querySelectorAll('.expan');
                other_exp.forEach(function(el) { el.classList.remove('expan'); });

                var tp = targetEl.parentNode;
                tp.removeChild(targetEl);
                tp.insertBefore(targetEl, tp.firstChild);

                targetEl.classList.add('expan');
                var tImg = targetEl.querySelector('.image-card-frame');
                if (tImg) tImg.classList.add('expan');
                var tFrame = targetEl.querySelector('.image-text-wraper');
                if (tFrame) tFrame.classList.add('trans');
                var tText = targetEl.querySelector('.infoText');
                if (tText) tText.classList.add('trans');

                var offsetY = -90;
                if (window.innerWidth < 500) offsetY = -55;
                var y = targetEl.getBoundingClientRect().top + window.scrollY + offsetY;
                setTimeout(function() {
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 100);
            }
        }

    })
    .catch(function(error) { console.error('Error fetching products:', error); });


// 全局偵測器, 偵測點擊事件
document.addEventListener('click', function(event) {

    var clickedElement = event.target;
    var expandedElements = document.querySelectorAll('.expan');
    var transformedElements = document.querySelectorAll('.trans');

    // 例外
    var expectionElements = document.querySelectorAll('.hidden-dropdown');

    // 检查是否点击的目标在例外元素中
    var isException = Array.from(expectionElements).some(function(ex) {
        return ex.contains(clickedElement);
    });

    if (expandedElements) {
        expandedElements.forEach(function(element) {
            if (!element.contains(clickedElement) & !isException) {
                element.classList.remove('expan');
            }
        });
    }

    if (transformedElements) {
        transformedElements.forEach(function(element) {
            var element_parent = element.parentNode;
            if (!element_parent.contains(clickedElement) & !isException) {
                element.classList.remove('trans');
            }
        });
    }
});
