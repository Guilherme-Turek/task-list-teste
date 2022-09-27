const userList = JSON.parse(localStorage.getItem('users-list'))

const loginButton      = document.querySelector('#logIn');  
const registerButton   = document.querySelector('#registerButton');
const modal            = document.querySelector('#modal-background');
const messageLogin     = document.querySelector('#messageLogin');
const messagePassLogin = document.querySelector('#messagePassLogin');
const inputUsername    = document.querySelector('#inputUsername');
const inputPassword    = document.querySelector('#inputPassword'); 

loginButton.addEventListener('click', login);
registerButton.addEventListener('click', openModal);

function openModal(){
    modal.style.display = 'flex';
}

function login(){
    if(!inputUsername.value){
        messageLogin.textContent  = 'Usuário não encontrado, verifique novamente ou crie uma conta!';
        messageLogin.style.color   = 'red';
        inputUsername.style.border = '1px solid red';
    } else {
        messageLogin.textContent   = '';
        inputUsername.style.border = '1px solid grey';
    };
    
    if(!inputPassword.value){
        messagePassLogin.textContent = 'Senha incorreta, tente novamente!';
        messagePassLogin.style.color = 'red';
        inputPassword.style.border   = '1px solid red';
        return
    } else {
        messagePassLogin.textContent = '';
        inputPassword.style.border   = '1px solid grey';
    };

    if(!userList){
        messageLogin.textContent   = 'Usuário não encontrado, tente novamente!';
        messageLogin.style.color   = 'red';
        inputUsername.style.border = '1px solid red';
        inputPassword.style.border = '1px solid red';
        return;
    }

    if(userList.find(userList => userList.usuario === inputUsername.value) && userList.find(userList => userList.senha === inputPassword.value)){
        location.href                = './scrapbook.html';
        sessionStorage.setItem('user-logged', inputUsername.value);
        messageLogin.textContent     = '';
        inputUsername.style.border   = '1px solid grey';
        messagePassLogin.textContent = '';
        inputPassword.style.border   = '1px solid grey';
        inputUsername.value          = '';
        inputPassword.value          = '';
        return
    } else {
        messageLogin.textContent   = 'Usuário não encontrado, tente novamente!';
        messageLogin.style.color   = 'red';
        inputUsername.style.border = '1px solid red';
        inputPassword.style.border = '1px solid red';
    };

};