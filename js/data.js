document.addEventListener('DOMContentLoaded', function() {
    // Attach click event listener to all buttons with class 'item-del'
    document.querySelectorAll('.item-del').forEach(function(button) {
        button.addEventListener('click', function() {
            // Find the closest parent <tr> and remove it
            var tr = this.closest('tr');
            if (tr) {
                tr.parentNode.removeChild(tr);
                //품목새로 계산
                calculateSupplyPriceSum();
            }
        });
    });
});


document.querySelector('.item-add').addEventListener('click', function(event) {
    event.preventDefault();

    // 입력 필드에서 값 가져오기
    var name = document.querySelector('.item-name').value;
    var count = parseFloat(document.querySelector('.item-count').value) || 0;
    var unitprice = parseFloat(document.querySelector('.item-unitprice').value) || 0;
    var supplyprice = parseFloat(document.querySelector('.item-supplyprice').value) || 0;
    var tax = parseFloat(document.querySelector('.item-tax').value) || 0;

    // 날짜 생성
    var date = new Date();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var dateStr = month + '-' + day;

    // 새로운 행 생성
    var tr = document.createElement('tr');
    tr.classList.add('detali__item');

    // 각 셀 생성 및 추가
    var dateTd = document.createElement('td');
    dateTd.classList.add('tg-0pky');
    dateTd.textContent = dateStr;
    tr.appendChild(dateTd);

    var nameTd = document.createElement('td');
    nameTd.classList.add('tg-0pky', 'detail__name');
    nameTd.textContent = name;
    tr.appendChild(nameTd);

    var countTd = document.createElement('td');
    countTd.classList.add('tg-0pky', 'detail__count');
    countTd.textContent = formatNumber(count);
    tr.appendChild(countTd);

    var unitpriceTd = document.createElement('td');
    unitpriceTd.classList.add('tg-0pky', 'detail__unitprice');
    unitpriceTd.textContent = formatNumber(unitprice);
    tr.appendChild(unitpriceTd);

    var supplypriceTd = document.createElement('td');
    supplypriceTd.classList.add('tg-0pky', 'detail__supplyprice');
    supplypriceTd.setAttribute('colspan', '3');
    supplypriceTd.textContent = formatNumber(supplyprice);
    tr.appendChild(supplypriceTd);

    var taxpriceTd = document.createElement('td');
    taxpriceTd.classList.add('tg-0pky', 'detail__taxprice');
    taxpriceTd.setAttribute('colspan', '2');
    taxpriceTd.textContent = formatNumber(tax);
    tr.appendChild(taxpriceTd);

    var deleteTd = document.createElement('td');
    deleteTd.classList.add('item-del');

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('ui', 'red', 'button', 'item-del');
    deleteButton.textContent = '삭제';

    deleteButton.addEventListener('click', function() {
        tr.remove();
        calculateSupplyPriceSum();
    });

    deleteTd.appendChild(deleteButton);
    tr.appendChild(deleteTd);

    // 테이블에 행 추가
    var tbody = document.querySelector('.item-list__detail');
    var sumRow = tbody.querySelector('.item__sum');
    tbody.insertBefore(tr, sumRow);

    // 입력 필드 초기화
    document.querySelector('.item-name').value = '';
    document.querySelector('.item-count').value = '';
    document.querySelector('.item-unitprice').value = '';
    document.querySelector('.item-supplyprice').value = '';
    document.querySelector('.item-tax').value = '';

    // 합계 업데이트
    calculateSupplyPriceSum();
});

document.querySelector('.form__recipient__signaturel').addEventListener('change', function(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            const targetElement = document.querySelector('.recipient__signature');
            if (targetElement) {
                // 배경 이미지 설정
                targetElement.style.backgroundImage = `url(${dataURL})`;
                // 필요에 따라 요소의 크기를 설정합니다.

            } else {
                console.error('대상 요소를 찾을 수 없습니다.');
            }
        }
        reader.readAsDataURL(file);
    }
});

document.querySelector('.form__suppliers__signaturel').addEventListener('change', function(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            const targetElement = document.querySelector('.suppliers__signature');
            if (targetElement) {
                // 배경 이미지 설정
                targetElement.style.backgroundImage = `url(${dataURL})`;
                // 필요에 따라 요소의 크기를 설정합니다.

            } else {
                console.error('대상 요소를 찾을 수 없습니다.');
            }
        }
        reader.readAsDataURL(file);
    }
});

function parseNumber(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}

function formatNumber(num) {
    return num.toLocaleString();
}

$(document).ready(function(){

    //등록 정보 초기화
    $('.registration').click(function () {
        formInit();
    });

    // 함수 호출하여 합계 계산
    calculateSupplyPriceSum();
});

function calculateSupplyPriceSum() {
    //합계
    let supply = 0;
    let tax = 0;
    let count = 0;
    let sum = 0;

    // 각 품명별 금액 엘리먼트 가져오기
    const supplyItems = document.querySelectorAll('.item-list__detail .detail__supplyprice');
    const taxItems = document.querySelectorAll('.item-list__detail .detail__taxprice');
    const countItems = document.querySelectorAll('.item-list__detail .detail__count');

    // 각 요소의 텍스트를 숫자로 변환하여 합산합니다.
    supplyItems.forEach(item => {
        // 숫자로 변환 (콤마 제거 후)
        let price = parseInt(item.textContent.replace(/,/g, ''));
        // NaN 체크 후 합산
        if (!isNaN(price)) {
            supply += price;
        }
    });

    // 각 요소의 텍스트를 숫자로 변환하여 합산합니다.
    taxItems.forEach(item => {
        // 숫자로 변환 (콤마 제거 후)
        let price = parseInt(item.textContent.replace(/,/g, ''));
        // NaN 체크 후 합산
        if (!isNaN(price)) {
            tax += price;
        }
    });

    // 각 요소의 텍스트를 숫자로 변환하여 합산합니다.
    countItems.forEach(item => {
        // 숫자로 변환 (콤마 제거 후)
        let price = parseInt(item.textContent.replace(/,/g, ''));
        // NaN 체크 후 합산
        if (!isNaN(price)) {
            count += price;
        }
    });

    //합산금액 산출 공급가 + 세금
    sum = supply + tax;
    
    // 결과를 원하는 요소에 출력 (item-supplyprice-sum 클래스에 합계를 표시)
    document.querySelector('.item-supplyprice-sum').textContent = supply.toLocaleString(); // 콤마 포함한 숫자 형식
    document.querySelector('.item-tax-sum').textContent = tax.toLocaleString(); // 콤마 포함한 숫자 형식
    document.querySelector('.item-count-sum').textContent = count.toLocaleString(); // 콤마 포함한 숫자 형식
    //document.querySelector('.item-all-sum').textContent = sum.toLocaleString();
    document.querySelectorAll('.item-all-sum').forEach(function(el){
        el.textContent = sum.toLocaleString();
    });
}

function formInit(){
    // 입력 필드에서 날짜 값 가져오기
    const dateValue = $('.form__recipient__date').val();
    const dateObj = new Date(dateValue);
    
    // 연도, 월, 일 추출
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const formattedDate = year + '년 ' + month + '월 ' + day + '일';
    
    $('.detailed-item__date').text(formattedDate);
    //공급받는자 정보
    const recipient_name = $('.form__recipient__name').val();
    const recipient_ceoname = $('.form__recipient__ceoname').val();
    const recipient_signature1 = $('.form__recipient__signature1').val();
    const recipient__number = $('.form__recipient__number').val();
    const recipient__manager = $('.form__recipient__manager').val();
    const recipient__tel = $('.form__recipient__tel').val();
    const recipient__address = $('.form__recipient__address').val();
    
    //공급자 정보
    const suppliers_name = $('.form__suppliers__name').val();
    const suppliers_ceoname = $('.form__suppliers__ceoname').val();
    const suppliers_signaturel = $('.form__suppliers__signaturel').val();
    const suppliers_number = $('.form__suppliers__number').val();
    const suppliers_manager = $('.form__suppliers_manager').val();
    const suppliers_tel = $('.form__suppliers_tel').val();
    const suppliers_address = $('.form__suppliers_address').val();
    
    //$('.detailed-item__date').text(write_date);
    //받는자 데이터 초기화
    $('.recipient__companyname').text(recipient_name);
    $('.recipient__ceoname').text(recipient_ceoname);
    $('.recipient__signature').text(recipient_signature1);
    $('.recipient__number').text(recipient__number);
    $('.recipient__manager').text(recipient__manager);
    $('.recipient__tel').text(recipient__tel);
    $('.recipient__address').text(recipient__address);
    
    //공급자 데이터 초기화
    $('.suppliers__number').text(suppliers_number);
    $('.suppliers__companyname').text(suppliers_name);
    $('.suppliers__signature').text(suppliers_signaturel);
    $('.suppliers__ceoname').text(suppliers_ceoname);
    $('.suppliers__manager').text(suppliers_manager);
    $('.suppliers__tel').text(suppliers_tel);
    $('.suppliers__address').text(suppliers_address);
}