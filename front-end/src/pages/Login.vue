<template>
  <div class="q-pa-md flex flex-center page">
    <div class="login" style="max-width: 500px">
      <div class="logo">
        <img src="../assets/logo-donor.png" />
      </div>
      <q-form @submit="onSubmit" class="q-gutter-md inputContainer">
        <q-input
          filled
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val =>
              (val &&
                val.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) ||
              'Invalid email'
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            val => (val.length > 6 && val.length < 30) || 'Incorrect password'
          ]"
        />

        <div class="loginBtnDiv">
          <q-btn label="Login" type="submit" color="primary" class="loginBtn" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,

      accept: false
    };
  },

  methods: {
    onSubmit() {
      {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    }
  }
};
</script>

<style scoped>
.login {
  text-align: center;
  margin: auto;
  padding: 2% 5% 5% 5%;
  background: white;
  border-radius: 3%;
  border: 2px solid #8a0303;
  margin-top: 2%;
  margin-bottom: 2%;
}

.page {
  height: 100vh;
  background-image: linear-gradient(to bottom, #fffbd5, #8a0303);
}

.loginBtnDiv {
  padding-top: 5%;
  text-align: center;
}

.loginBtn {
  width: 100%;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.q-input {
  width: 250px;
}

@media only screen and (max-width: 600px) {
  .login {
    border: none;
    width: 100vh;
    height: 100vh;
    text-align: center;
    margin: auto;
    padding: 0;
  }

  .q-input {
    width: 260px;
    margin-left: 20%;
    margin: 10px;
    height: 80px;
  }

  .page {
    background-image: none;
    background-color: white;
  }
}
</style>
