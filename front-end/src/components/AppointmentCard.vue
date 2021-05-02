<template>
  <div class="q-pa-md" :key="componentKey">
    <q-card class="my-card">
      <q-card-section class="bg-secondary">
        <h6
          v-if="currentDate"
          style="margin:0; text-align:center; padding: 6%;"
        >
          Programare viitoare:
        </h6>
        <h6 v-else style="margin:0; text-align:center; padding: 6%;">
          Ultima programare:
        </h6>
        <q-field
          outlined
          bottom-slots
          :value="date"
          class="bg-white"
          style="padding-bottom:0px; margin-bottom: 6%;"
        >
          <template v-slot:prepend>
            <q-icon name="event_note" color="primary" />
            <div class="text-subtitle2 text-primary">Dată:</div>
          </template>

          <template v-slot:control>
            <div
              class="self-center full-width no-outline text-right text-primary text-weight-medium"
              tabindex="0"
            >
              {{ date }}
            </div>
          </template>
        </q-field>
        <q-field
          outlined
          bottom-slots
          :value="hour"
          class="bg-white"
          style="padding-bottom:0px; margin-bottom: 6%;"
        >
          <template v-slot:prepend>
            <q-icon name="schedule" color="primary" />
            <div class="text-subtitle2 text-primary">Oră:</div>
          </template>

          <template v-slot:control>
            <div
              class="self-center full-width no-outline text-right text-primary text-weight-medium"
              tabindex="0"
            >
              {{ hour }}
            </div>
          </template>
        </q-field>
        <q-field
          outlined
          bottom-slots
          :value="doctor"
          class="bg-white"
          style="padding-bottom:0px; margin-bottom: 3%;"
        >
          <template v-slot:prepend>
            <q-icon name="medical_services" color="primary" />
            <div class="text-subtitle2 text-primary">Doctor:</div>
          </template>

          <template v-slot:control>
            <div
              class="self-center full-width no-outline text-right text-primary text-weight-medium"
              tabindex="0"
            >
              {{ doctor }}
            </div>
          </template>
        </q-field>
      </q-card-section>

      <q-card-actions class="bg-secondary" vertical align="center">
        <q-btn
          unlevated
          color="primary"
          style="margin-bottom: 6%;"
          @click="confirm = true"
          >Anulare programare</q-btn
        >
      </q-card-actions>
    </q-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center flex flex-center">
          <q-avatar
            icon="notification_important"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm">Doriți să anulați programarea?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Da"
            color="primary"
            v-close-popup
            @click="deleteAppointment"
          />
          <q-btn flat label="Nu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "date", "hour", "doctor", "currentDate"],
  data() {
    return {
      confirm: false,
      componentKey: 0
    };
  },
  methods: {
    deleteAppointment() {
      axios
        .delete(`http://localhost:8081/api/user/deleteAppointment/${this.id}`, {
          withCredentials: true
        })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Programare anulată"
          });
          this.forceRerender();
        })
        .catch(err => {
          this.$q.notify({
            color: "red-9",
            textColor: "white",
            icon: "warning",
            message: err
          });
        });
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}

.q-field--outlined .q-field__control {
  background: white;
}
</style>
