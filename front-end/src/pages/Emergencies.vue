<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="row" style="margin-top: 2%;">
      <div class="col-6 q-pa-md" style="display:flex; justify-content:center;">
        <q-card class="my-card">
          <q-card-section class="bg-secondary">
            <h6
              class="text-weight-medium"
              style="margin:0; text-align:center; padding: 6%; font-family: 'Montserrat-regular', sans-serif;"
            >
              Formular caz de urgență
            </h6>
            <q-input
              outlined
              v-model="name"
              label="Nume pacient"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%; font-family: 'Montserrat-bold', sans-serif;"
            />
            <q-input
              outlined
              v-model="phone"
              label="Telefon"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%; font-family: 'Montserrat-bold', sans-serif;"
            />
            <q-select
              outlined
              v-model="bloodType"
              label="Grupă sânge"
              :options="options"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%; font-family: 'Montserrat-bold', sans-serif;"
            />
            <q-input
              v-model="text"
              outlined
              label="Descriere caz..."
              type="textarea"
              class="bg-white"
              style="font-family: 'Montserrat-bold', sans-serif;"
            />
          </q-card-section>

          <q-card-actions class="bg-secondary" vertical align="center">
            <q-btn
              unlevated
              color="primary"
              style="margin-bottom: 6%; font-family: 'Montserrat-bold', sans-serif;"
              @click="createEmergencyCase"
              >Trimitere caz de urgență</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div
        class="col flex flex-center"
        style="display: flex; flex-direction: column; align-content: flex-start;"
      >
        <div
          style="display: flex; justify-content:center; margin-top: 5%; margin-bottom: 5%;"
        >
          <div style="margin-right: 2%; font-family: 'Montserrat';">
            <q-btn unlevated color="primary">Vizualizează cazuri active</q-btn>
          </div>
          <div style="margin-left: 2%; font-family: 'Montserrat';">
            <q-btn unlevated color="primary">Vizualizează cazuri trecute</q-btn>
          </div>
        </div>
        <div style="font-family: 'Montserrat', sans-serif; padding: 1%;">
          Grafic ce prezintă procentajul cazurilor soluționate în mai puțin de
          12 ore
        </div>
        <div class="q-pa-md" style="width:400px; height: 400px;">
          <canvas
            id="myChart1"
            width="400"
            height="400"
            style="background:white;"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import axios from "axios";
import Chart from "chart.js/auto";
export default {
  name: "Emergencies",
  components: {
    ParticlesBg
  },
  data() {
    return {
      options: ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      name: null,
      phone: null,
      bloodType: null,
      text: null,
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
  methods: {
    createEmergencyCase() {
      axios
        .post(
          "http://localhost:8081/api/admin/createEmergencyCase",
          {
            name: this.name,
            phone: this.phone,
            bloodType: this.bloodType,
            text: this.text
          },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Caz adăugat!"
          });
          this.name = this.phone = this.bloodType = this.text = null;
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
    axios
      .get("http://localhost:8081/api/admin/getAppointmentsWithBloodType", {
        withCredentials: true
      })
      .then(response => {
        let data = response.data;

        let dataYear = [0, 0, 0];
        data.forEach(element => {
          let date = new Date(element.date);
          if (date.getFullYear() == 2019) {
            dataYear[0]++;
          } else if (date.getFullYear() == 2020) {
            dataYear[1]++;
          } else if (date.getFullYear() == 2021) {
            dataYear[2]++;
          }
        });

        var ctx = document.getElementById("myChart1");
        var myChart3 = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Soluționate", "Nesoluționate"],
            datasets: [
              {
                label: "Frecvență donare pe 2021",
                data: [20,50],
                backgroundColor: ["#B43636", "#F05440", ""],
                hoverOffset: 4
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    family: "Montserrat",
                    size: 14
                  }
                }
              }
            }
          }
        });
      });
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
