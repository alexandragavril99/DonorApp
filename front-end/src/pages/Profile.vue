<template>
  <div class="q-pa-md flex flex-center">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" style="text-align: center">
            Editează datele de contact
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="user.name"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="perm_identity"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="user.surname"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="perm_identity"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="user.email"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="mail"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="user.phone"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="phone"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="user.city"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="business"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="user.weight"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="self_improvement"></q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="cancel" />
          <q-btn
            flat
            label="Modifică profil"
            v-close-popup
            @click="updateUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="passwordDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" style="text-align: center">Modifică parola</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="userPassword.oldPassword"
            @keyup.enter="passwordDialog = false"
            align-items
            label="Introdu parola veche"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="looks_one"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="userPassword.newPassword"
            @keyup.enter="passwordDialog = false"
            align-items
            label="Introdu parola nouă"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="looks_two"></q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            @click="closePasswordDialog"
          />
          <q-btn
            flat
            label="Modifică parola"
            v-close-popup
            @click="updatePassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card class="my-card">
      <div class="avatar">
        <q-btn
          color="primary"
          round
          @click="displayDialog"
          icon="app_registration"
          size="md"
        />
      </div>
      <div class="avatar">
        <q-avatar size="120px" rounded>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </div>

      <q-card-section class="text-h5 text-primary q-card-name text-weight-bold">
        {{ user.name + " " + user.surname }}
      </q-card-section>

      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="mail"
        >
          {{ user.email }}
        </q-chip>
      </q-card-section>

      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="phone"
        >
          {{ user.phone }}
        </q-chip>
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="business"
        >
          {{ user.city }}
        </q-chip>
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="accessibility"
        >
          {{ user.age }} ani
        </q-chip>
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="self_improvement"
        >
          {{ user.weight }} kg
        </q-chip>
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        <q-chip
          size="lg"
          outline
          square
          color="primary"
          text-color="white"
          icon="opacity"
        >
          {{ user.bloodType }}
        </q-chip>
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        Ultima dată a donării: {{ user.lastDonation }}
      </q-card-section>
      <q-card-section class="text-h6 text-primary q-card-name">
        <q-btn color="primary" @click="passwordDialog = true">
          Modifică parola
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    ParticlesBg
  },
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user: {},
      updatedUser: {},
      copiedUser: {},
      userPassword: {
        oldPassword: "",
        newPassword: ""
      },
      prompt: false,
      passwordDialog: false,
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
    calculateAge() {
      let birthDate2 = new Date(this.user.birthDate);
      let diff_ms = Date.now() - birthDate2.getTime();
      var age_dt = new Date(diff_ms);

      console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    updateUser() {
      this.user.weight = parseInt(this.user.weight);
      axios
        .put("http://localhost:8081/api/user/updateProfile", this.user, {
          withCredentials: true
        })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Profil modificat"
          });
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
    },
    cancel() {
      Object.assign(this.user, this.copiedUser);
    },
    displayDialog() {
      this.prompt = true;
      Object.assign(this.copiedUser, this.user);
    },
    closePasswordDialog() {
      this.userPassword.oldPassword = this.userPassword.newPassword = "";
    },
    updatePassword() {
      axios
        .put(
          "http://localhost:8081/api/user/updatePassword",
          this.userPassword,
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Parolă modificată"
          });
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
      this.userPassword.oldPassword = "";
      this.userPassword.newPassword = "";
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/user/getProfile", {
        withCredentials: true
      })
      .then(userData => {
        this.user = userData.data;
        this.user.age = this.calculateAge();
        console.log(this.user);
        Object.assign(this.updatedUser, userData.data);
        console.log(this.updatedUser);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
  background: #f5f5f5;
}
.avatar {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}

.q-card-name {
  text-align: center;
}

.q-card-name {
  padding: 12px;
}
</style>
