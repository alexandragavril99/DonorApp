<template>
  <div class="q-pa-md row justify-around">
    <div
      class="col-4"
      style="display:flex; justify-content:center; align-items:center;"
    >
      <div style="width:300px; height:400px;">
        <AppointmentCard
          v-if="loaded"
          :id="appointment.id"
          :date="appointment.date"
          :hour="appointment.schedulingTime"
          :doctor="appointment.doctorName"
          :currentDate="currentDate"
        />
      </div>
    </div>
    <div class="q-pa-md col">
      <q-table
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
import AppointmentCard from "../components/AppointmentCard.vue";
export default {
  name: "ViewAppointments",
  components: {
    AppointmentCard
  },
  data() {
    return {
      appointment: {},
      loaded: false,
      doctor: null,
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
          field: row => row.user.name + " " + row.user.surname,
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
      currentDate: false
    };
  },
  created() {
    axios
      .get("http://localhost:8081/api/user/getLastAppointment", {
        withCredentials: true
      })
      .then(response => {
        if (response.data.length != 0) {
          this.data = response.data;
          Object.assign(
            this.appointment,
            response.data[response.data.length - 1]
          );
          if (!this.appointment.doctorId) {
            this.appointment.doctorName = "Nealocat momentan";
          } else
            this.appointment.doctorName =
              this.appointment.user.name + " " + this.appointment.user.surname;

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
