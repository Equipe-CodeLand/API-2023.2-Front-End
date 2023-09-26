const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const sobrenomeInput = document.querySelector("#sobrenome");
const emailInput = document.querySelector("#email");
const temaSelect = document.querySelector("#tema");
const messageTextarea = document.querySelector("#message");
const telefoneInput = document.querySelector("#telefone");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // verifica se o nome está vazio
    if (nameInput.value === "") {
        alert(`Por favor, preencha o seu nome.`);
        return;
    }

    if (sobrenomeInput.value === "") {
        alert(`Por favor, preencha o seu sobrenome.`);
        return;
    }

    if (telefoneInput.value === "") {
        alert(`Por favor, preencha o seu telefone.`);
        return;
    }

    // verifica se o e-mail está preenchido e se é válido
    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
        alert(`Por favor, preencha o seu e-mail.`);
        return;
    }

    if (temaSelect.value === "" || temaSelect.value === "Selecione um tema") {
        alert(`Por favor, selecione um tema.`);
        return;
    }

    if (messageTextarea.value === "") {
        alert(`Por favor, preencha a sua mensagem.`);
        return;
    }

    // Exibe o pop-up de sucesso com botão "OK" e "Cancelar"
    Swal.fire({
        title: "Enviado com sucesso",
        text: "Suas informações foram enviadas com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário clicou em "OK", você pode prosseguir com a submissão do formulário
            form.submit();
        } else if (result.isDismissed) {
            // Se o usuário clicou em "Cancelar", redefina o formulário
            form.reset();
        }
    });
});

// Função para validar o email
function isEmailValid(email) {
    // cria uma regex para validar o email
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}
