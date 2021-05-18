<template>
  <div class="q-pa-xl row justify-around">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="col-4" style="display:flex; justify-content:center;">
      <div style="width:300px; height:400px;">
        <AppointmentCard
          :key="componentKey"
          v-if="loaded"
          :id="appointment.id"
          :date="appointment.date"
          :hour="appointment.schedulingTime"
          :doctor="appointment.doctorName"
          :currentDate="currentDate"
          v-on:changeState="updateState($event)"
        />
      </div>
    </div>
    <div class="q-pa-md col">
      <q-table
        :key="componentKey"
        v-if="loaded"
        class="q-pa-md"
        title="Istoric programări"
        :data="data"
        :columns="columns"
        no-data-label="Nu aveți nicio programare trecută inregistrată."
        row-key="name"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
import AppointmentCard from "../components/AppointmentCard.vue";
export default {
  name: "ViewAppointments",
  components: {
    AppointmentCard,
    ParticlesBg
  },
  data() {
    return {
      appointment: {},
      loaded: false,
      componentKey: true,
      state: 0,
      columns: [
        {
          name: "date",
          required: true,
          label: "Data",
          align: "left",
          field: row => row.date,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "hour",
          align: "center",
          label: "Ora",
          field: "schedulingTime",
          sortable: true
        },
        {
          name: "doctorName",
          label: "Nume Doctor",
          field: row =>
            row.employee.user.name + " " + row.employee.user.surname,
          align: "center",
          sortable: true
        },
        {
          name: "finished",
          label: "Finalizată cu succes",
          align: "center",
          field: "isCompleted",
          format: val => (val ? "Da" : "Nu")
        }
      ],
      data: [],
      currentDate: false,
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
    updateState: function(updatedState) {
      this.state = updatedState;
      console.log(this.state);
      this.componentKey = !this.componentKey;
      this.forceRerender();
    },

    forceRerender() {
      if (this.data.length > 0) {
        Object.assign(this.appointment, this.data[this.data.length - 1]);
        if (!this.appointment.doctorId) {
          this.appointment.doctorName = "Nealocat momentan";
        } else
          this.appointment.doctorName =
            this.appointment.employee.user.name +
            " " +
            this.appointment.employee.user.surname;
        this.data.splice(this.data.length - 1, 1);
      } else this.appointment = {};
      this.currentDate = false;
    }
  },
  watch: {
    componentKey(n, o) {
      this.componentKey = n;
    }
  },
  created() {
    console.log(this.state);
    axios
      .get("http://localhost:8081/api/user/getLastAppointment", {
        withCredentials: true
      })
      .then(response => {
        if (response.data.length != 0) {
          this.data = response.data;
          console.log(response.data);
          Object.assign(
            this.appointment,
            response.data[response.data.length - 1]
          );
          if (!this.appointment.doctorId) {
            this.appointment.doctorName = "Nealocat momentan";
          } else
            this.appointment.doctorName =
              this.appointment.employee.user.name +
              " " +
              this.appointment.employee.user.surname;

          this.data.splice(this.data.length - 1, 1);

          if (
            Date.parse(new Date(this.appointment.date)) > Date.parse(new Date())
          ) {
            this.currentDate = true;
          }
        } else {
          console.log("Nu avem");
        }

        this.loaded = true;
      });
  }
};
</script>

<style scoped>
/* .box {
  display: flex;
  align-items: center;
  justify-content: space-around;
} */
</style>
