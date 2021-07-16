<template>
  <div class="q-pa-md">
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
          style="padding-bottom:0px; margin-bottom: 6%;"
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

        <q-field
          v-if="!currentDate"
          outlined
          bottom-slots
          :value="wasPresent"
          class="bg-white"
          style="padding-bottom:0px;"
        >
          <template v-slot:prepend>
            <q-icon name="perm_identity" color="primary" />
            <div class="text-subtitle2 text-primary">Prezent:</div>
          </template>

          <template v-slot:control>
            <div
              v-if="wasPresent == 1"
              class="self-center full-width no-outline text-right text-primary text-weight-medium"
              tabindex="0"
            >
              Da
            </div>
            <div
              v-else
              class="self-center full-width no-outline text-right text-primary text-weight-medium"
              tabindex="0"
            >
              Nu
            </div>
          </template>
        </q-field>
      </q-card-section>

      <q-card-actions class="bg-secondary" vertical align="center">
        <q-btn
          v-if="currentDate == true"
          unlevated
          color="primary"
          style="margin-bottom: 6%;"
          @click="confirm = true"
          >Anulare programare</q-btn
        >
        <a
          v-if="analysisBulletin"
          :href="'/uploads/' + analysisBulletin"
          class="button"
          download
          style="margin-bottom: 6%;"
          >Descarcă buletin analize</a
        >
        <div v-else class="q-pa-md text-weight-medium text-center">
          Momentan nu există buletinul de analize pentru această programare.
        </div>
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
  props: [
    "id",
    "date",
    "hour",
    "doctor",
    "currentDate",
    "wasPresent",
    "isCompleted",
    "analysisBulletin",
    "state"
  ],
  data() {
    return {
      confirm: false
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
          this.changeState();
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
    changeState: function() {
      this.$emit("changeState", 1);
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

.button {
  text-decoration: none;
  display: block;
  width: 175px;
  background: #b22222;
  padding: 6px;
  text-align: center;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  line-height: 25px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}

@media only screen and (max-width: 600px) {
  .q-pa-xl .row {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .q-table__container
    .q-table--horizontal-separator
    .column
    .no-wrap
    .q-table__card
    .q-table--no-wrap
    .q-pa-md {
    margin-top: 20vh;
  }
}
</style>
