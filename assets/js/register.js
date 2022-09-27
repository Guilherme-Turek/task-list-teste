const usersList = JSON.parse(localStorage.getItem('users-list')) || [];

const registerModal   = document.querySelector('#registerModal');
const exitModal       = document.querySelector('#exitModal');
const messageUser     = document.querySelector('#messageUser');
const messagePassword = document.querySelector('#messagePass');
const messageConfirm  = document.querySelector('#messageConfirm');

registerModal.addEventListener('click', registerUser);
exitModal.addEventListener('click', closeModal);

function closeModal(){
    modal.style.display = 'none';
    username.value = '', password.value = '', confirmP.value = '';
    username.style.border   = '1px solid grey', password.style.border = '1px solid grey', confirmP.style.border = '1px solid grey';
    messageUser.textContent = '', messagePassword.textContent = '', messageConfirm.textContent = '';
};

const username = document.querySelector('#userRegister');
const password = document.querySelector('#passwordRegister');
const confirmP = document.querySelector('#confirmPassword');

function registerUser(){
    
    if(!username.value || username.value.length < 4){
        errorUser();
    } else {
        messageUser.textContent = '';
        username.style.border   = '1px solid green';
    };

    if(!password.value || password.value.length < 6){
        errorPassword();
    } else {
        messagePassword.textContent = '';
        password.style.border       = '1px solid grey';
    };

    if(!confirmP.value || confirmP.value != password.value){
        errorConfirm()
        return;
    } else {
        messageConfirm.textContent = '';
        confirmP.style.border      = '1px solid green';
        messagePassword.textContent = '';
        password.style.border       = '1px solid green';
    };

    if(usersList.find(usersList => usersList.usuario === username.value)){
        messageUser.textContent = 'Usuário já existe, tente novamente';
        messageUser.style.color = 'red';
        username.style.border   = '1px solid red';
        return
    } else {
        messageUser.textContent = '';
        username.style.border   = '1px solid green';
    };

    newUser = {
        usuario: username.value,
        senha  : password.value,
        tasks   : []
    };

    usersList.push(newUser);
    localStorage.setItem('users-list', JSON.stringify(usersList));

    alert('Conta criada com sucesso');
    closeModal();
}

function errorUser(){
    messageUser.textContent = 'O usuário precisa ter ao menos 4 caracteres!';
    messageUser.style.color = 'red';
    username.style.border   = '1px solid red';
};

function errorPassword(){
    messagePassword.textContent = 'A senha precisa ter no minímo 6 caracteres!';
    messagePassword.style.color = 'red';
    password.style.border       = '1px solid red';
};

function errorConfirm(){
    messageConfirm.textContent = 'As senhas precisam ser iguais!';
    messageConfirm.style.color = 'red';
    confirmP.style.border      = '1px solid red';
    messagePassword.textContent = 'As senhas precisam ser iguais';
    messagePassword.style.color = 'red';
    password.style.border       = '1px solid red';
};