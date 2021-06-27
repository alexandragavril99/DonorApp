<template>
  <div class="q-pa-md flex flex-center page">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="login" style="max-width: 500px">
      <div class="logo">
        <img src="../assets/logo-donor.png" />
      </div>
      <q-form @submit="onSubmit" class="q-gutter-md inputContainer">
        <q-input
          filled
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val =>
              (val &&
                val.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) ||
              'Invalid email'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail"></q-icon>
          </template>
        </q-input>
        <q-input
          filled
          type="password"
          v-model="password"
          label="Parolă *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your password',
            val => (val.length > 6 && val.length < 30) || 'Incorrect password'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key"></q-icon>
          </template>
        </q-input>

        <div class="loginBtnDiv">
          <q-btn label="Login" type="submit" color="primary" class="loginBtn" />
        </div>
        <div>
          <span>Don't have an account? </span>
          <span
            clickable
            @click="$router.push('/register').catch(err => {})"
            class="text-primary text-weight-medium"
            >Sign up here.</span
          >
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "Login",
  components: {
    ParticlesBg
  },
  data() {
    return {
      email: null,
      password: null,

      accept: false,
      config: {
        num: [4, 5],
        // rps: 0.1,
        radius: [5, 35],
        life: [1.5, 3],
        v: [0, 0],
        // tha: [-30, 30],
        alpha: [0.6, 0],
        scale: [0.1, 0.4],
        color: "#b22222",
        position: "all",
        cross: "dead",
        random: 15
      }
    };
  },

  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:8081/api/user/login", user, {
          withCredentials: true
        })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "login",
            message: "You logged in"
          });
          this.$router.push("/");
        })
        .catch(err => {
          const errors = Object.values(err.response.data); //iau erorile din back
          errors.map(item => {
            this.$q.notify({
              color: "red-9",
              textColor: "white",
              icon: "warning",
              message: item
            });
          });
        });
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
  height: 570px;
}

.page {
  height: 100vh;
  /* background-image: linear-gradient(to bottom, #fffbd5, #8a0303); */
}

.loginBtnDiv {
  padding-top: 5%;
  text-align: center;
}

.loginBtn {
  width: 50%;
}

.q-input {
  width: 260px;
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

  .inputContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loginBtn {
    width: 120%;
  }
}
</style>
