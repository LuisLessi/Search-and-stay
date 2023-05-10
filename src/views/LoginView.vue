<template>
    <div class="login-form">
      <q-form @submit.prevent="login">
        <q-input
          filled
          type="text"
          label="Username"
          v-model="username"
          required
        />
  
        <q-input
          filled
          type="password"
          label="Password"
          v-model="password"
          required
        />
  
        <q-btn
          color="primary"
          type="submit"
          label="Login"
          :loading="loading"
          :disable="!username || !password"
        />
  
        <div v-if="error" class="login-error">{{ error }}</div>
      </q-form>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // verificar nome de usuário e senha
      if (this.username === 'admin' && this.password === '123456') {
        // armazenar token de acesso em localStorage
        localStorage.setItem('token', '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8');
        // redirecionar para o dashboard
        this.$router.push('/dashboard');
      } else {
        alert('Nome de usuário ou senha incorretos.');
      }
    }
  }
}
</script>
  
  <style scoped>
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .login-error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  