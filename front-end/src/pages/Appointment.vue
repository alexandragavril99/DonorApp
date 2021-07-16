<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <h6
      v-if="state == 0"
      class="q-pa-md flex flex-center"
      style="margin:0; padding-bottom:0; font-family: 'Montserrat', sans-serif; text-align: center;"
    >
      Timp rămas până la următoarea programare:
    </h6>
    <h6
      v-else
      class="q-pa-md flex flex-center"
      style="margin:0; padding-bottom:0; font-family: 'Montserrat', sans-serif; text-align: center;"
    >
      Timpul a expirat!
    </h6>
    <Counter
      v-if="loaded"
      :year="lastDonationDate.newDate.getFullYear()"
      :month="lastDonationDate.newDate.getMonth()"
      :day="lastDonationDate.newDate.getDate()"
      :hour="0"
      :minute="0"
      :second="0"
      :milisecond="0"
      :state="state"
      v-on:changeState="updateState($event)"
    />
    <h6
      v-if="state == 0"
      class="q-pa-md flex flex-center"
      style="margin:0;font-family: 'Montserrat', sans-serif; text-align: center;"
    >
      Momentan formularul nu este disponibil. Vă așteptăm după timpul precizat.
    </h6>
    <h6
      v-else
      class="q-pa-md flex flex-center"
      style="margin:0; font-family: 'Montserrat', sans-serif; text-align: center;"
    >
      Realizează o programare completând formularul de mai jos.
    </h6>
    <div class="form-card rounded-borders">
      <div
        class="q-pa-md flex flex-center"
        style="justify-content: space-around;"
      >
        <div class="q-pa-md date">
          <q-date
            v-model="date"
            landscape
            first-day-of-week="1"
            :locale="currentLocale"
            :disable="state == 0"
          />
          <q-item-section
            class="q-pa-md flex-center"
            style="font-family: 'Montserrat', sans-serif;"
          >
            <q-item-label
              >Data selectată: <strong> {{ date }} </strong></q-item-label
            >
          </q-item-section>
        </div>
        <div class="q-pa-md scroll">
          <q-scroll-area
            class="shadow-2 rounded-borders qscroll"
            style="height: 290px; width: 400px; background:white;"
          >
            <q-list v-for="(hour, index) in hoursArray" :key="hour">
              <q-item
                tag="label"
                v-ripple
                v-if="left"
                :disable="state == 0 || left[index] == 0"
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="currentHour"
                    :val="hour"
                    color="primary"
                    v-if="left"
                    :disable="state == 0 || left[index] == 0"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ hour }}</q-item-label>
                  <q-item-label caption v-if="left"
                    >{{ left[index] }} locuri disponibile</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
          <q-item-section
            class="q-pa-md flex-center"
            style="font-family: 'Montserrat', sans-serif;"
          >
            <q-item-label
              >Ora selectată: <strong> {{ currentHour }} </strong></q-item-label
            >
          </q-item-section>
        </div>
      </div>
      <div class="flex flex-center q-pa-md" style="padding-bottom:3%;">
        <q-btn
          label="Programează-te!"
          type="submit"
          color="primary"
          @click="confirm = true"
          :disable="state == 0"
          style="font-family: 'Montserrat', sans-serif;"
        />
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center flex flex-center">
          <q-avatar
            icon="notification_important"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm" style="text-align: center;s"
            >Programare selectată pentru data: <strong> {{ date }} </strong>și
            ora: <strong>{{ currentHour }}.</strong></span
          >
          <span class="q-ml-sm"> Confirmi programarea?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Da"
            color="primary"
            v-close-popup
            @click="createAppointment"
          />
          <q-btn flat label="Nu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Counter from "../components/Counter.vue";
import axios from "axios";
export default {
  name: "Appointment",
  components: {
    Counter,
    ParticlesBg
  },
  data() {
    return {
      confirm: false,
      lastDonationDate: {},
      date: null,
      loaded: false,
      state: 0,
      currentHour: "7:30",
      hoursArray: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30"],
      left: null,
      config: {
        num: [3, 4],
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
      currentLocale: {
        days: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă_Duminică".split(
          "_"
        ),
        daysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        months: "Ianuarie_Februarie_Мartie_Аprilie_Маi_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split(
          "_"
        ),
        monthsShort: "Ian_Feb_Маr_Аpr_Маi_Iun_Iul_Аug_Sept_Оct_Noi_Dec".split(
          "_"
        )
      }
    };
  },
  methods: {
    calculateNewDate() {
      let newDate = new Date(this.lastDonationDate.dateOfDonation);
      newDate.setDate(newDate.getDate() + 60);
      return newDate;
    },
    updateState: function(updatedState) {
      this.state = updatedState;
      console.log(this.state);
    },
    createAppointment() {
      const appointment = {
        date: this.date,
        schedulingTime: this.currentHour
      };
      axios
        .post("http://localhost:8081/api/user/addAppointment", appointment, {
          withCredentials: true
        })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Te-ai programat cu succes!"
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
      this.$router.push("/viewAppointments");
    }
  },
  watch: {
    date() {
      const currentDate = {
        date: this.date
      };
      axios
        .get(
          "http://localhost:8081/api/user/calculateAppointmentsNumber",
          {
            params: currentDate
          },
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.left = response.data;
        });
    }
  },
  created() {
    console.log(this.state);
    let actualDate = new Date();
    let year = actualDate.getFullYear();
    let currentMonth = actualDate.getMonth() + 1;
    let today = actualDate.getDate();
    if (today < 10) {
      today = "0" + today;
    }
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    this.date = `${year}/${currentMonth}/${today}`;
    const currentDate = {
      date: this.date
    };
    axios
      .get("http://localhost:8081/api/user/getLastDonation", {
        withCredentials: true
      })
      .then(donationDate => {
        this.lastDonationDate = donationDate.data;
        this.lastDonationDate.newDate = this.calculateNewDate();
        console.log(this.lastDonationDate.newDate);
        this.loaded = true;
      });

    axios
      .get(
        "http://localhost:8081/api/user/calculateAppointmentsNumber",
        {
          params: currentDate
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.left = response.data;
      });
  }
};
</script>

<style>
.form-card {
  max-width: 70%;
  margin: 0 auto;
  background: #f5f5f5;
  margin-bottom: 3%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

@media only screen and (max-width: 600px) {
  .form-card {
    background: none;
    box-shadow: none;
  }

  .date {
    margin-right: 0px;
  }

  .scroll {
    margin-left: 0px;
  }

  .qscroll {
    width: none;
    width: 200px;
  }
}
</style>
