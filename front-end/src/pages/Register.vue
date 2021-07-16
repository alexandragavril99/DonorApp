<template>
  <div class="q-pa-md flex flex-center page">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :canvas="{ height: '85rem' }"
      :config="config"
    />
    <div class="login" style="max-width: 500px">
      <div class="logo">
        <img src="../assets/logo-donor.png" />
      </div>
      <q-form @submit="onSubmit" class="q-gutter-md inputContainer">
        <q-input
          filled
          v-model="name"
          label="Prenume *"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val =>
              (val && val.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)) ||
              'Invalid name'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="perm_identity"></q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="surname"
          label="Nume de familie *"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please type something',
            val =>
              (val && val.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)) ||
              'Invalid surname'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="perm_identity"></q-icon>
          </template>
        </q-input>

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
            <q-icon name="contact_mail"></q-icon>
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
            val => (val.length > 6 && val.length < 30) || 'Invalid password'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key"></q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="phone"
          label="Telefon *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your phone'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="call"></q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="city"
          label="Oraș *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your city'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="business"></q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="birthDate"
          mask="date"
          :rules="['birthDate']"
          label="Data nașterii"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="birthDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="weight"
          type="number"
          label="Greutate *"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type your weight',
            val => (val > 40 && val < 150) || 'Incorrect weight'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="self_improvement"></q-icon>
          </template>
        </q-input>

        <q-select
          filled
          v-model="bloodType"
          :options="options"
          label="Grupă sanguină"
          style="width:300px;"
          :rules="[
            val =>
              (val !== null && val !== '') || 'Please select your blood type'
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="opacity"></q-icon>
          </template>
        </q-select>

        <q-input
          filled
          v-model="lastDonation"
          mask="date"
          lazy-rules
          :rules="['lastDonation']"
          label="Data ultimei donări"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="lastDonation">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="registerBtnDiv">
          <q-btn
            label="Register"
            type="submit"
            color="primary"
            class="registerBtn"
          />
        </div>
        <div>
          <span
            @click="$router.push('/login').catch(err => {})"
            clickable
            class="text-primary text-weight-bold"
            style=" font-family: 'Montserrat', sans-serif;"
            >Accesează pagina de autentificare.</span
          >
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import axios from "axios";

export default {
  name: "Login",
  components: {
    ParticlesBg
  },
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null,
      phone: null,
      city: null,
      birthDate: null,
      weight: null,
      bloodType: null,
      lastDonation: null,
      accept: false,
      options: ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+", "Nu știu"],
      config: {
        num: [4, 6],
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
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        phone: this.phone,
        city: this.city,
        birthDate: this.birthDate,
        bloodType: this.bloodType,
        weight: parseInt(this.weight),
        lastDonation: this.lastDonation
      };
      axios
        .post("http://localhost:8081/api/user/register", user)
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Registered"
          });
          this.$router.push("/login");
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
  },

  created() {
    const date = new Date();
    let currentYear = date.getFullYear();
    let today = date.getDate();
    let currentMonth = date.getMonth() + 1;
    // console.log(currentYear,today,currentMonth)
    if (today < 10) {
      today = "0" + today;
    }
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    this.birthDate = `${currentYear}/${currentMonth}/${today}`;
    this.lastDonation = `${currentYear}/${currentMonth}/${today}`;
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
  height: 180vh;
  /* background-image: linear-gradient(to bottom, #fffbd5, #8a0303); */
}

.registerBtnDinv {
  padding-top: 5%;
  text-align: center;
}

.registerBtn {
  width: 50%;
}

.q-input {
  width: 300px;
}

@media only screen and (max-width: 600px) {
  .login {
    border: none;
    width: 100vh;
    text-align: center;
    margin: 0 auto;
    padding: 0;
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

  .registerBtn {
    width: 120%;
  }
}
</style>
