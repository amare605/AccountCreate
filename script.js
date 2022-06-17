// 宣告變數
const form = document.getElementById('form');
const account = document.getElementById('account');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const chineseName = document.getElementById('chineseName');
const email = document.getElementById('email');


// 先funtction 然後限用window.alert確認邏輯正確，再改成邊的方式顯示


// 錯誤顯示
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// 正確顯示
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};



// 檢查有無完全填入，全數都填入亮綠燈，有沒有填入亮紅燈
function checkRequired(inputArr){
    let isRequired = true;
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `此欄位尚未填入，請記得填入`);
            isRequired = false;
        }
        else{showSuccess(input);}
    })
    return isRequired;
};

// 檢查輸入的字數 (account/password)
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `字元數少於${min}`)
    } 
    else if (input.value.length > max){
        showError(input, `字元數大於${max}`)
    }
    else{
        showSuccess(input)
    }
};




// 檢查password 跟 password2是否一樣  帶完成中 邏輯正確，再修改
function checkPassword(input1, input2){
    if(input1.value !== input2.value){
       showError(input2, `驗證密碼錯誤`)}
    };

// 檢查輸入名是否為中文
function checkChinese(input){
    const reChinese = /^[\u4E00-\u9FA5]+$/;
    if (reChinese.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, `輸入的非全數中文，請重新輸入`)
    }
  };
// 檢查 email是否為正確的email格式
function checkEmail(input) {
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reEmail.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, '非正確e-mail格式，請重新輸入')
    }

};

//再eventlistener，點選<確認送出>按鈕執行所有的程式
form.addEventListener('submit',function(e){
    e.preventDefault();

    checkRequired([account, password, password2, chineseName, email]);  
    checkLength(account, 6 ,20);
    checkLength(password, 6 ,20);
    checkPassword(password, password2);
    checkChinese(chineseName);
    checkEmail(email);
    
    }
    
);
