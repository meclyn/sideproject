function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'Matheus' && password === '123') {
        alert('Login efetuado com sucesso');
        window.location.href = 'modelo.html'; // Redireciona para outra página
    } else {
        alert('Login e/ou senha errada');
    }
}
