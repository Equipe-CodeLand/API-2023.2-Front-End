const form = document.querySelector("#form")
const nameInput = document.querySelector("#name")
const sobrenomeInput = document.querySelector("#sobrenome")
const emailInput = document.querySelector("#email")
//const recorrenteSelect = document.querySelector("#recorrente")
const messageTextarea = document.querySelector("#message")
const telefoneInput = document.querySelector("#telefone")

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    //verifica se o nome ta vazio
    if(nameInput.value === ""){
        alert(`Por favor, preencha o seu nome`)
        return;
    }

    if(sobrenomeInput.value === ""){
        alert(`Por favor, preencha o seu sobrenome`)
        return;
    }

    if(telefoneInput.value === ""){
        alert(`Por favor, preencha o seu sobrenome`)
        return;
    }

    //verica se o e-mail está preenchido e se é valido
    if(emailInput.value === "" || !isEmailValid(emailInput.value)){
        alert(`Por favor, preencha o seu e-mail`);
        return;
    }

    if(messageTextarea.value === ""){
        alert(`Por favor, preencha o seu sobrenome`)
        return;
    }

    //Se todos os campos estiverem corretament preencidos, envie o form
    form.submit();
})

//função valida email
function isEmailValid(email){
    //cria uma regex para valida email
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    if(emailRegex.test(email)){
        return true;
    }

    return false;
}