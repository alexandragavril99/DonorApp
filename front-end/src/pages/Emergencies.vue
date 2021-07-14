<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <q-dialog v-model="confirm2" persistent>
      <q-card style=" font-family: 'Montserrat', sans-serif;">
        <q-card-section class="row items-center q-pa-md">
          <q-avatar
            icon="notification_important"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm">Dorești închiderea cazului?</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Da" color="primary" @click="editItem" />
          <q-btn flat label="Nu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card style="max-width:80%; font-family: 'Montserrat', sans-serif;">
        <q-card-section class="row items-center">
          <q-table
            title="Cazuri active"
            :data="rows"
            :columns="columns"
            no-data-label="Nu există niciun caz soluționat."
            row-key="name"
            :rows-per-page-options="[4, 8, 16, 0]"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th />

                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
                <q-th>Închide caz</q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" :key="`${props.row.id}`">
                <q-td> {{ props.row.id }} </q-td>

                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
                <q-td align="center">
                  <q-btn
                    dense
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="changeState(props.row)"
                  ></q-btn>
                </q-td>
              </q-tr>
              <q-tr
                :props="props"
                :key="`${'A' + props.row.id}`"
                class="q-virtual-scroll--with-prev"
              >
                <q-td colspan="100%">
                  <div class="text-left">
                    <strong>Descriere caz:</strong>
                    {{ props.row.text }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm1" persistent>
      <q-card style="max-width:80%;">
        <q-card-section
          class="row items-center"
          style="font-family: 'Montserrat', sans-serif;"
        >
          <q-table
            title="Cazuri încheiate"
            :data="rows1"
            :columns="columns"
            no-data-label="Nu există niciun caz soluționat."
            row-key="name"
            :rows-per-page-options="[4, 8, 16, 0]"
            ><template v-slot:header="props">
              <q-tr :props="props">
                <q-th />

                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" :key="`${props.row.id}`">
                <q-td> {{ props.row.id }} </q-td>

                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr
                :props="props"
                :key="`${'B' + props.row.id}`"
                class="q-virtual-scroll--with-prev"
              >
                <q-td colspan="100%">
                  <div class="text-left">
                    <strong>Descriere caz:</strong>
                    {{ props.row.text }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row mainDiv" style="margin-top: 0.5%;">
      <div
        class="col-6 q-pa-md cardDiv"
        style="display:flex; justify-content:center;"
      >
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
              outlined
              v-model="quantity"
              label="Cantitate necesară"
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
              >Creare caz de urgență</q-btn
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
            <q-btn unlevated color="primary" @click="confirm = true"
              >Vizualizează cazuri active</q-btn
            >
          </div>
          <div style="margin-left: 2%; font-family: 'Montserrat';">
            <q-btn unlevated color="primary" @click="confirm1 = true"
              >Vizualizează cazuri încheiate</q-btn
            >
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
      confirm: false,
      confirm1: false,
      confirm2: false,
      data: [],
      options: ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      name: null,
      phone: null,
      bloodType: null,
      quantity: null,
      text: null,
      rows: [],
      rows1: [],
      currentRow: null,
      nr1: 0,
      nr2: 0,
      max: 0,
      myChart3: null,
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
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Nume pacient",
          align: "left",
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: "phone",
          align: "center",
          label: "Telefon",
          field: "phone"
        },
        {
          name: "bloodType",
          label: "Grupă sanguină",
          align: "center",
          field: "bloodType"
        },
        {
          name: "quantity",
          label: "Cantitate necesara",
          align: "center",
          field: "quantity"
        },
        {
          name: "donorsFound",
          label: "Număr donatori găsiți",
          align: "center",
          field: "donorsFound"
        }
      ]
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
            text: this.text,
            quantity: this.quantity
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
          this.rows.push({
            id: this.data[this.data.length - 1].id + 1,
            name: this.name,
            phone: this.phone,
            bloodType: this.bloodType,
            text: this.text,
            quantity: this.quantity
          });

          this.name = this.phone = this.bloodType = this.text = this.quantity = null;
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
    changeState(row) {
      this.currentRow = row;
      this.confirm2 = true;
    },
    editItem() {
      this.currentRow.isAvailable = 0;
      axios
        .put(
          `http://localhost:8081/api/admin/updateEmergencyCase/${this.currentRow.id}`,
          { isAvailable: false },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Caz încheiat!"
          });

          let index = this.rows.findIndex(x => x.id === this.currentRow.id);

          this.rows.splice(index, 1);
          console.log(this.rows);
          this.rows1.push(this.currentRow);

          const diffInMilliSeconds = Math.abs(
            new Date(this.currentRow.updatedAt) -
              new Date(this.currentRow.createdAt)
          );
          const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

          console.log(this.myChart3.data.datasets[0].data);

          if (hours < 12) {
            this.nr1++;
          } else this.nr2++;
          this.max++;
          this.myChart3.data.datasets[0].data = [
            this.nr1 / this.max,
            this.nr2 / this.max
          ];
          console.log(this.myChart3.data.datasets[0].data);
          this.myChart3.update();

          this.currentRow = {};
          this.confirm2 = false;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/admin/getEmergencyCases", {
        withCredentials: true
      })
      .then(response => {
        this.data = response.data;
        this.data.forEach(element => {
          if (element.isAvailable) {
            this.rows.push(element);
          } else this.rows1.push(element);
        });

        this.max = this.rows1.length;
        this.rows1.forEach(element => {
          let hours =
            Math.abs(
              new Date(element.updatedAt) - new Date(element.createdAt)
            ) / 36e5;

          console.log(hours);
          if (hours < 12) {
            this.nr1++;
          } else this.nr2++;
        });

        var ctx = document.getElementById("myChart1");
        this.myChart3 = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Sub 12 ore", "Peste 12 ore"],
            datasets: [
              {
                label: "Frecvență donare pe 2021",
                data: [this.nr1 / this.max, this.nr2 / this.max],
                backgroundColor: ["#B43636", "#F05440"],
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

@media only screen and (max-width: 600px) {
  .mainDiv {
    flex-direction: column;
    align-items: center;
  }

  .cardDiv {
    width: 325px;
  }
}
</style>
