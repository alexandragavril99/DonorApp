<template>
  <div class="q-pa-md">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div
      class="q-pa-md"
      style="display:flex; flex-direction: row; font-family: 'Montserrat', sans-serif; margin-left: 4%;"
    >
      <div v-if="user" style="max-width:45%;" class="q-pa-md col">
        <h4>Bun venit, {{ user.name }}!</h4>
        <div style="font-size: medium; text-align: justify;">
          Ne bucurăm că ești utilizator al platformei
          <span class="text-primary text-weight-bold">Donor</span>. <br />
          Cu ajutorul lui Donor dorim să creștem cât mai mult comunitatea
          donatorilor de sânge din România. Transfuzia de sânge este o
          operațiune medicală esențială, iar gestul de a dona are puterea de a
          salva viața unui om în pericol. <br />
          Te invităm să accesezi pagina dedicată programărilor.
        </div>
        <div class="q-pa-md" style="margin-left:23%; margin-top:6%;">
          <q-btn
            class="bg-primary text-white"
            @click="$router.push('/appointment').catch(err => {})"
            >Accesează pagină programări</q-btn
          >
        </div>
      </div>
      <div class="col flex flex-center">
        <img
          src="../assets/undraw_doctors_hwty.svg"
          style="height: 400x; max-width: 600px"
        />
      </div>
    </div>
    <div>
      <h4
        class="q-pa-md text-italic"
        style="margin:0; margin-left: 5.3%; font-family: 'Montserrat'"
      >
        Știai că...
      </h4>
      <div
        class="flex flex-center q-pa-md"
        style="justify-content: space-evenly;"
      >
        <q-card class="my-card">
          <q-card-section class="flex flex-center">
            <img
              src="../assets/undraw_medicine_b1ol.svg"
              style="height: 150x; max-width: 200px"
            />
          </q-card-section>
          <q-card-section class="q-pa-md">
            <h6 style="margin: 0; font-weight: 400;">
              ...din nefericire, 1 din 3 persoane din România nu beneficiază de
              transfuzie atunci când au nevoie?
            </h6>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section class="flex flex-center">
            <img
              src="../assets/undraw_doctor_kw5l.svg"
              style="height: 150x; max-width: 200px"
            />
          </q-card-section>
          <q-card-section class="q-pa-md">
            <h6 style="margin: 0; font-weight: 400;">
              ...donatorii obțin anumite beneficii precum analize gratuite
              și reduceri la mijloacele de transport?
            </h6>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section class="flex flex-center">
            <img
              src="../assets/undraw_workout_gcgu.svg"
              style="height: 150x; max-width: 200px"
            />
          </q-card-section>
          <q-card-section class="q-pa-md">
            <h6 style="margin: 0; font-weight: 400;">
              ...în urma donării de sânge, rezistenţa organismului crește, iar
              acesta este mai pregătit în cazul accidentelor?
            </h6>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "PageIndex",
  components: {
    ParticlesBg
  },
  data() {
    return {
      user: null,
      config: {
        num: [2, 3],
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
  created() {
    axios
      .get("http://localhost:8081/api/user/getProfile", {
        withCredentials: true
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 275px;
  height: 410px;
  background: #f5f5f5;
  text-align: center;
  font-family: "Montserrat";
}
</style>
