const nameUserLogged = sessionStorage.getItem('user-logged');
const welcome       = document.getElementsByTagName('p')[0];
welcome.textContent = `Bem vindo, ${nameUserLogged}`;

if(!nameUserLogged){
    location.href = 'index.html'
}

const usersArray = JSON.parse(localStorage.getItem('users-list'));
const userLogged = usersArray.find(usersArray => usersArray.usuario === nameUserLogged);
let tasksArray = userLogged.tasks;

const description     = document.getElementById('input-description');
const detailing       = document.getElementById('input-detailing');
const message         = document.getElementById('message');
const tbody           = document.getElementById('list'); 
const saveButton      = document.getElementsByTagName('button')[1];
const buttonExit = document.querySelector('#exit');
buttonExit.addEventListener('click', logOut)


function createTasks(tasksArray) {

    tbody.innerHTML = ''

    let count = 1;

    tasksArray.forEach(task => {

        tbody.innerHTML += 
        `
            <tr>
                <td>${count}</td>
                <td>${task.descricao}</td>
                <td>${task.detalhamento}</td>
                <td>
                    <button class="button-action" style="background-color: green;" onclick= "editTask(${task.id})"><img src="./assets/img/edit.png" alt="Apagar"></button>
                    <button class="button-action" style="background-color: red;" onclick= "eraseTask(${task.id})"><img src="./assets/img/trash.png" alt="Apagar"></button>
                </td>
            </tr>
        `
        count ++

    })
};

createTasks(tasksArray);

function addTask() {

        task = {
        id: Math.floor(Date.now() / 1000),
        descricao : description.value,
        detalhamento: detailing.value,
        };

        tasksArray.push(task);
        localStorage.setItem('users-list', JSON.stringify(usersArray));
        
        description.value = '';
        detailing.value   = '';

        createTasks(tasksArray);
    
};

saveButton.addEventListener('click', (e) => {

    e.preventDefault()

    if(!description.value || !detailing.value){
        message.textContent = 'Por favor, preencha os dois campos'
        message.style.color = 'red'
        return
    }

    addTask()

    message.textContent = 'Tarefa salva com sucesso!'
    message.style.color = 'green'
    description.value   = ''
    detailing.value     = ''

});

function editTask(id) {

    const modal               = document.querySelector('.modal-background')
    const buttonEdit          = document.querySelector('.saveEdit')
    const cancelEdit          = document.querySelector('.calcelEdit')
    const modalIptDescription = document.querySelector('#description');
    const modalIptDetailing   = document.querySelector('#detailing');

        modal.style.display = 'flex'

        let findEdit = tasksArray.findIndex((task) => task.id === id);
    
        modalIptDescription.value = tasksArray[findEdit].descricao
        modalIptDetailing .value   = tasksArray[findEdit].detalhamento

    buttonEdit.addEventListener('click', () => {

        if(!modalIptDescription.value || !modalIptDetailing.value){
            alert('Por favor, preencha os dois campos')
            return
        }
        let findEdit = tasksArray.findIndex((task) => task.id === id);
    
        tasksArray[findEdit].descricao = modalIptDescription.value
        tasksArray[findEdit].detalhamento = modalIptDetailing.value

        localStorage.setItem('users-list', JSON.stringify(usersArray));

        alert('Edição feita com sucesso!')
        location.reload()
        createTasks(tasksArray);
    });

    cancelEdit.addEventListener('click', () => {
        alert('Edição cancelada!')
        location.reload()
    })

    
};
 
function eraseTask(id) {
    let findTask = tasksArray.findIndex((task) => task.id === id);

    const newTasksArray = [];

    const confirmErase = confirm('Deseja excluir o recado?')

    if(confirmErase == true){
        if(findTask != -1){
            tasksArray.splice(findTask, 1)
            location.reload()
        };
        localStorage.setItem('users-list', JSON.stringify(usersArray));

        tasksArray = newTasksArray
        createTasks(tasksArray)
        return;
    } 

    alert('Exclusão cancelada')
    
};

function logOut(){
     
    const confirmExit = confirm('Deseja sair do sistema?')

    if(confirmExit == true){
        window.location.href = './index.html';
        return
    }

    alert('Saída cancelda')
};