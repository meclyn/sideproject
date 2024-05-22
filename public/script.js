 async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password})
    });


    if (response.ok) {
        alert('Login efetuado com sucesso!');
        window.location.href = 'modelo.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

async function registrar(){

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    });

    if (response.ok) {
        alert('Usuario registrado com sucesso');
    } else {
        alert('Erro ao registrar usuário');
    }

}
