<template>
  <div class="q-pa-md">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="q-gutter-y-md" style="max-width: 70%; margin: 0 auto;">
      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-primary text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="newAppointments" label="Programări noi" />
          <q-tab name="assumedAppointments" label="Programări asumate" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-white text-center">
          <q-tab-panel name="newAppointments">
            <q-table
              grid
              :data="data"
              :columns="columns"
              row-key="name"
              :filter="filter"
              hide-header
              :rows-per-page-options="[4, 8, 16, 0]"
              no-data-label="Nu există nicio programare nouă înregistrată."
            >
              <template v-slot:top-right>
                <q-input
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:item="props">
                <div
                  class="q-pa-md col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                >
                  <q-card class="q-pa-xs">
                    <q-list dense>
                      <q-item
                        v-for="col in props.cols.filter(
                          col => col.name !== 'desc'
                        )"
                        :key="col.name"
                      >
                        <q-item-section class="q-pa-xs">
                          <q-item-label class="text-weight-regular">{{
                            col.label
                          }}</q-item-label>
                          <q-item-label
                            caption
                            class="text-primary text-weight-medium"
                            >{{ col.value }}</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-card-section>
                      <q-btn
                        color="primary"
                        @click="
                          (confirm = true) && (currentAppointment = props.row)
                        "
                        >PREIA PROGRAMARE</q-btn
                      >
                    </q-card-section>
                  </q-card>
                </div>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel class="displayPanel" name="assumedAppointments">
            <q-table
              grid
              :data="newData"
              :columns="columns2"
              row-key="name"
              :filter="filter"
              hide-header
              :rows-per-page-options="[4, 8, 16, 0]"
              no-data-label="Nu există nicio programare nouă înregistrată."
            >
              <template v-slot:top-right>
                <q-input
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:item="props">
                <div
                  class="q-pa-md col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                >
                  <q-card class="q-pa-xs">
                    <q-btn
                      color="primary"
                      round
                      icon="edit"
                      @click="openEditDialog(props.row)"
                    />
                    <q-list dense>
                      <q-item
                        v-for="col in props.cols.filter(
                          col => col.name !== 'desc'
                        )"
                        :key="col.name"
                      >
                        <q-item-section class="q-pa-xs">
                          <q-item-label class="text-weight-regular">{{
                            col.label
                          }}</q-item-label>
                          <q-item-label
                            caption
                            class="text-primary text-weight-medium"
                            >{{ col.value }}</q-item-label
                          >
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-card-section>
                      <q-btn
                        color="primary"
                        @click="getDonorProfile(props.row)"
                        style="margin-bottom: 3%;"
                        >DETALII DONATOR</q-btn
                      >
                      <q-btn
                        color="primary"
                        style="max-width: 180px;"
                        @click="
                          (loaded = true) && (currentAppointment = props.row)
                        "
                        >Încărcare analize</q-btn
                      >
                    </q-card-section>
                  </q-card>
                </div>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="notification_important"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm">Doriți să preluați programarea?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="DA"
              color="primary"
              @click="takeAppointment"
              v-close-popup
            />
            <q-btn flat label="NU" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px;">
          <q-card-section>
            <div class="text-h6 flex flex-center">Date donator</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="donorProfile.name"
              autofocus
              label="Prenume"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.surname"
              autofocus
              label="Nume"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.email"
              autofocus
              label="Email"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.phone"
              autofocus
              label="Telefon"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.city"
              autofocus
              label="Oraș"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.birthDate"
              autofocus
              label="Data nașterii"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.weight"
              autofocus
              label="Greutate"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />
            <q-input
              outlined
              dense
              v-model="donorProfile.bloodType"
              autofocus
              label="Grupă sanguină"
              stack-label
              @keyup.enter="prompt = false"
              style="margin-bottom:2%;"
            />

            <div class="flex flex-center">
              <label for="">Apt de donare?</label>
              <div>
                <q-radio v-model="shape" val="da" label="Da" />
                <q-radio v-model="shape" val="nu" label="Nu" />
              </div>
            </div>
          </q-card-section>

          <div class="flex flex-center">
            <q-btn class="bg-primary text-white" @click="showLastDonations"
              >Vizualizare donări anterioare</q-btn
            >
          </div>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Modifică detalii"
              @click="updateUser"
              v-close-popup
            />
            <q-btn flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="show">
        <q-card>
          <q-table
            title="Istoric donări"
            :data="dataDonor"
            :columns="columns3"
            row-key="name"
            no-data-label="Nu există alte programări trecute."
          />

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="edit">
        <q-card style="min-width: 300px; min-height: 300px;">
          <q-card-section>
            <div class="text-h6 flex flex-center">Date donator</div>
          </q-card-section>
          <q-card-section>
            <div class="flex flex-center column">
              <div
                style="display: flex; flex-direction: column; align-items: center; margin-bottom: 3%;"
              >
                <div>
                  <label for="">S-a prezentat?</label>
                </div>
                <div>
                  <q-radio v-model="present" val="da" label="Da" />
                  <q-radio v-model="present" val="nu" label="Nu" />
                </div>
              </div>
              <div
                style="display: flex; flex-direction: column; align-items: center;"
              >
                <div>
                  <label for="">S-a finalizat donarea cu succes?</label>
                </div>
                <div>
                  <q-radio v-model="completed" val="da" label="Da" />
                  <q-radio v-model="completed" val="nu" label="Nu" />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              class="text-white bg-primary"
              label="Modifică detalii"
              v-close-popup
              @click="editDetails"
            />
            <q-btn class="text-white bg-primary" label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="loaded" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6 flex flex-center">
              Încărcare buletin analize
            </div>
          </q-card-section>

          <q-card-section
            ><q-uploader
              style="max-width: 300px"
              @added="file_selected"
              :hide-upload-btn="true"
          /></q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Upload"
              color="primary"
              @click="onSubmit"
              v-close-popup
            />
            <q-btn flat label="Cancel" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
export default {
  components: {
    ParticlesBg
  },
  data() {
    return {
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
      shape: "",
      present: "",
      completed: "",
      loaded: false,
      tab: "newAppointments",
      currentAppointment: {},
      edit: false,
      show: false,
      confirm: false,
      prompt: false,
      filter: "",
      filename: "",
      check_if_document_upload: false,
      columns: [
        {
          name: "date",
          required: true,
          label: "Data programării",
          align: "left",
          field: row => row.date,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "hour",
          align: "center",
          label: "Ora programării",
          field: "schedulingTime",
          sortable: true
        },
        {
          name: "donorName",
          label: "Nume donator",
          field: row => row.user.name + " " + row.user.surname,
          sortable: true
        }
      ],
      columns2: [
        {
          name: "date",
          required: true,
          label: "Data programării",
          align: "left",
          field: row => row.date,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "hour",
          align: "center",
          label: "Ora programării",
          field: "schedulingTime",
          sortable: true
        },
        {
          name: "donorName",
          label: "Nume donator",
          field: row => row.user.name + " " + row.user.surname,
          sortable: true
        },
        {
          name: "wasPresent",
          label: "S-a prezentat?",
          field: "wasPresent",
          format: val => (val ? "Da" : val == 0 ? "Nu" : "-")
        },
        {
          name: "isCompleted",
          label: "Este finalizată?",
          field: "isCompleted",
          format: val => (val ? "Da" : val == 0 ? "Nu" : "-")
        }
      ],
      columns3: [
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
          label: "Ora programării",
          field: "schedulingTime",
          sortable: true
        },
        {
          name: "doctorName",
          label: "Nume doctor",
          field: row =>
            row.employee.user.name + " " + row.employee.user.surname,
          sortable: true
        },
        {
          name: "isCompleted",
          label: "Este finalizată?",
          field: "isCompleted",
          format: val => (val ? "Da" : "Nu")
        }
      ],
      data: [],
      newData: [],
      dataDonor: [],
      donorProfile: {}
    };
  },
  methods: {
    takeAppointment() {
      console.log(this.currentAppointment.id);
      axios
        .put(
          `http://localhost:8081/api/admin/updateAppointmentsDoctorById/${this.currentAppointment.id}`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Programare preluata!"
          });

          let index = this.data.findIndex(
            x => x.id === this.currentAppointment.id
          );

          this.data.splice(index, 1);
          console.log(this.data);
          this.newData.push(this.currentAppointment);
          this.currentAppointment = {};
        })
        .catch(err => console.log(err));
    },
    getDonorProfile(row) {
      this.prompt = true;
      axios
        .get(`http://localhost:8081/api/admin/getDonorProfile/${row.user.id}`, {
          withCredentials: true
        })
        .then(response => {
          this.donorProfile = response.data;
          console.log(this.donorProfile);
          if (this.donorProfile.canDonate) {
            this.shape = "da";
          } else {
            this.shape = "nu";
          }
        })
        .catch(err => console.log(err));
    },
    showLastDonations() {
      this.show = true;
      axios
        .get(
          `http://localhost:8081/api/admin/getAllDonations/${this.donorProfile.id}`,
          { withCredentials: true }
        )
        .then(response => {
          this.dataDonor = response.data;
        })
        .catch(err => console.log(err));
    },
    updateUser() {
      if (this.shape === "da") {
        this.donorProfile.canDonate = true;
      } else if (this.shape === "nu") {
        this.donorProfile.canDonate = null;
      }

      axios
        .put(
          `http://localhost:8081/api/admin/updateDonor/${this.donorProfile.id}`,
          {
            name: this.donorProfile.name,
            surname: this.donorProfile.surname,
            email: this.donorProfile.email,
            phone: this.donorProfile.phone,
            city: this.donorProfile.city,
            weight: this.donorProfile.weight,
            bloodType: this.donorProfile.bloodType,
            canDonate: this.donorProfile.canDonate
          },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Profil modificat!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    openEditDialog(row) {
      this.edit = true;
      this.currentAppointment = row;

      if (row.isCompleted) {
        this.completed = "da";
      } else if (row.isCompleted == 0) {
        this.completed = "nu";
      } else {
        this.completed = "";
      }

      if (row.wasPresent) {
        this.present = "da";
      } else if (row.wasPresent == 0) {
        this.present = "nu";
      } else {
        this.present = "";
      }
    },
    editDetails() {
      let rowCompleted = this.completed === "da" ? 1 : 0;
      let rowPresent = this.present === "da" ? 1 : 0;

      axios
        .put(
          `http://localhost:8081/api/admin/updateAppointment/${this.currentAppointment.id}`,
          {
            isCompleted: rowCompleted,
            wasPresent: rowPresent
          },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Detalii modificate"
          });
          this.currentAppointment.isCompleted = this.completed === "da" ? 1 : 0;
          this.currentAppointment.wasPresent = this.present === "da" ? 1 : 0;
        })
        .catch(err => console.log(err));
    },
    file_selected(file) {
      console.log(file);
      this.filename = file[0];
      this.check_if_document_upload = true;
    },

    onSubmit() {
      const url = `http://localhost:8081/api/admin/updateAnalysisBulletin/${this.currentAppointment.id}`;
      const file = new FormData();
      const newName = this.currentAppointment.id + "_" + this.filename.name;
      file.append("analysis", this.filename, newName);
      console.log(file);
      axios
        .post(url, file, { withCredentials: true })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Fișier încărcat cu succes!"
          });
          console.log("Succes!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/admin/getNewAppointments", {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data);
        this.data = response.data;
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("http://localhost:8081/api/admin/getAllAssumedAppointments", {
        withCredentials: true
      })
      .then(response => {
        this.newData = response.data;
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.q-table__grid-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
