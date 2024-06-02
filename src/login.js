new Vue({
  el: '#app',
  data: {
    loginFormEmail: '',
    loginFormPassword: '',
    signupFormName: '',
    signupFormEmail: '',
    signupFormPassword: '',
    loginError: '',
    signupSuccess: false, 
    signupSuccessMessage: "Cadastro realizado com sucesso! Por favor, faça login.",
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  methods: {
    slide(type) {
      if (type === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
      } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
      }
    },
    async loginFormSubmit() {
      try {
        const email = this.loginFormEmail;
        const password = this.loginFormPassword;
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, senha: password })
        });
        const result = await response.json();
        
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(result.user));
          window.location.href = "index.html";
        } else {
          this.loginError = result.message || "Erro ao fazer login.";
        }
      } catch (error) {
        console.error("Erro ao processar o formulário de login:", error);
        this.loginError = "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
      }
    },
    async signupFormSubmit() {
      if (!this.isEmailValid(this.signupFormEmail)){
        alert("Por favor, insira um endereço de email válido.");
        return;
      }
      
      if (this.signupFormPassword.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.signupFormName,
                email: this.signupFormEmail,
                senha: this.signupFormPassword
            })
        });
        if (response.ok) {
            this.signupSuccess = true;
            alert('Conta criada com sucesso.');
            window.location.href = "login.html";
        } else {
            const result = await response.json();
            alert(result.message || 'Erro ao criar conta.');
        }
      } catch (error) {
          console.error('Erro ao criar conta:', error);
          alert('Erro ao criar conta.');
      }
    },
    isEmailValid(email) {
      return this.emailRegex.test(email);
    },
    async fazerLogin() {
      try {
          const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  nome: this.loginFormEmail,
                  senha: this.loginFormPassword
              })
          });
          if (response.status === 200) {
              alert('Login bem-sucedido.');
              window.open('index.html','_blank');
          } else {
              alert('Credenciais inválidas.');
          }
      } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Erro ao fazer login.');
      }
    }
  }
});



