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
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="user.name"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card class="my-card">
      <div class="avatar">
        <q-btn
          color="primary"
          round
          @click="prompt = true"
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
          21 ani
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
    </q-card>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "Profile",
  components: {
    ParticlesBg
  },
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user: {
        name: "Popescu",
        surname: "Ionescu",
        email: "email@gmail.com",
        password: null,
        phone: "0712341234",
        city: "Cluj-Napoca",
        birthDate: "20/10/1998",
        bloodType: "A+",
        lastDonation: "Nu știu",
        options: ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+", "Nu știu"]
      },
      prompt: false,
      config: {
        num: [4, 4],
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
        random: 15,
      }
    };
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
