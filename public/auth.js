document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',


        },
        body: JSON.stringify({ username, password})
    });

    const data = await response.json();
    if (response.ok){
       localStorage.setItem('token', data.token);
       alert('Login bem-sucedido!'); 
    } else {
        alert('Erro: ' + data.message);
    }
});