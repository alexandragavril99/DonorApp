<template>
  <div class="q-pa-md">
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <h5
      class="flex flex-center text-weight-medium"
      style="font-family: 'Montserrat-regular', sans-serif; font-size: 30px;"
    >
      CAZURI ACTIVE
    </h5>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      class="bg-secondary text-primary rounded-borders carousel"
      style="max-width:70%; margin: 0 auto; font-family: 'Montserrat-regular', sans-serif; max-height: 375px;"
    >
      <q-carousel-slide
        v-if="compatibleCases.length == 0"
        name="style"
        class="column no-wrap flex-center"
      >
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center text-black">
          Momentan nu există cazuri de urgență compatibile cu grupa dvs de
          sânge. Poate aveți cunoștințe dornice să susțină cazurile de urgență
          de mai jos.
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        v-else
        class="column no-wrap flex-center"
        v-for="caz in compatibleCases"
        :key="caz.id"
        :name="caz.id"
      >
        <h6 class="q-pa-md text-center text-black texth6" style="margin: 0;">
          Cazuri compatibile cu grupa dumneavoastră sanguină
        </h6>
        <div style="display: flex;" class="infoDiv">
          <div style="margin-right:2%;">
            <q-field
              outlined
              bottom-slots
              :value="caz.name"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%;  width:225px;"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
                <div class="text-subtitle2 text-primary">Nume pacient:</div>
              </template>

              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-right text-black text-weight-medium"
                  tabindex="0"
                >
                  {{ caz.name }}
                </div>
              </template>
            </q-field>
          </div>
          <div style="margin-left:2%;" class="inputLeft">
            <q-field
              outlined
              bottom-slots
              :value="caz.phone"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%;  width:225px;"
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="primary" />
                <div class="text-subtitle2 text-primary ">Telefon:</div>
              </template>

              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-right text-black text-weight-medium"
                  tabindex="0"
                >
                  {{ caz.phone }}
                </div>
              </template>
            </q-field>
          </div>
        </div>
        <div style="display: flex;" class="infoDiv">
          <div style="margin-right:2%;">
            <q-field
              outlined
              bottom-slots
              :value="caz.bloodType"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%; width:225px;"
            >
              <template v-slot:prepend>
                <q-icon name="opacity" color="primary" />
                <div class="text-subtitle2 text-primary">Tip sânge:</div>
              </template>

              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-right text-black text-weight-medium"
                  tabindex="0"
                >
                  {{ caz.bloodType }}
                </div>
              </template>
            </q-field>
          </div>
          <div style="margin-left:2%;" class="inputLeft">
            <q-field
              outlined
              bottom-slots
              :value="caz.quantity"
              class="bg-white"
              style="padding-bottom:0px; margin-bottom: 6%;  width:225px; text-align:center"
            >
              <template v-slot:prepend>
                <q-icon name="medical_services" color="primary" />
                <div class="text-subtitle2 text-primary">
                  Cantitate necesară:
                </div>
              </template>

              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-right text-black text-weight-medium"
                  tabindex="0"
                >
                  {{ caz.quantity }}
                </div>
              </template>
            </q-field>
          </div>
        </div>
        <div>
          <q-field
            outlined
            bottom-slots
            :value="caz.text"
            class="bg-white"
            style="padding-bottom:0px;  max-width:380px;   margin-bottom: 6%;"
          >
            <template v-slot:prepend>
              <q-icon name="description" color="primary" />
              <div class="text-subtitle2 text-primary">
                Descriere:
              </div>
            </template>

            <template v-slot:control>
              <div
                class="self-center full-width no-outline text-right text-black text-weight-medium"
                tabindex="0"
                style="text-align: center;"
              >
                {{ caz.text }}
              </div>
            </template>
          </q-field>
          <div class="flex flex-center">
            <q-btn
              class="text-white bg-primary"
              @click="(alert = true) && (currentCase = caz)"
              >Vreau să ajut</q-btn
            >
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div
      class="q-pa-lg flex flex-center"
      style="font-family: 'Montserrat', sans-serif;"
    >
      <q-btn
        class="bg-primary text-white"
        @click="alert1 = true"
        style="margin-top:2%"
        >Vizualizează restul cazurilor active</q-btn
      >
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="q-pa-md" style="margin-top:2%;">
          <div style="text-align:center; font-family: 'Montserrat', sans-serif">
            Dorești să donezi sânge pentru acest caz? <br />
            Te rugăm să verifici în secțiunea
            <span
              clickable
              @click="$router.push('/appointment').catch(err => {})"
              class="text-primary text-weight-medium"
              >Programează-te</span
            >
            dacă poți realiza o donare. <br />
            Dacă donarea este posibilă, bifează
            <span class="text-primary text-weight-medium"> DA</span>, iar noi te
            vom contacta în scurt timp!
          </div>
        </q-card-section>

        <q-card-actions
          align="center"
          style=" font-family: 'Montserrat', sans-serif"
        >
          <q-btn
            flat
            label="DA"
            color="primary"
            @click="addDonor"
            v-close-popup
          />
          <q-btn flat label="NU" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert1">
      <q-card style="max-width: 625px; font-family: 'Montserrat', sans-serif;">
        <q-card-section class="q-pa-md" style="margin-top:2%;">
          <q-carousel
            v-model="slide1"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            class="bg-secondary text-primary rounded-borders carousel carousel1"
            style="margin: 0 auto; font-family: 'Montserrat-regular', sans-serif; max-height: 350px; max-width: 100%;"
          >
            <q-carousel-slide
              class="column no-wrap flex-center"
              v-for="caz in incompatibleCases"
              :key="caz.id"
              :name="caz.id"
            >
              <h6
                class="q-pa-md text-center text-black text-subtitle2 texth6 dialogh6"
                style="margin: 0;"
              >
                Cazuri incompatibile cu grupa dumneavoastră sanguină. <br />
                Dacă aveți cunoștinte compatibile și disponibile, sunați la
                numărul afișat. Mulțumim!
              </h6>
              <div style="display: flex;" class="infoDiv">
                <div style="margin-right:2%;">
                  <q-field
                    outlined
                    bottom-slots
                    :value="caz.name"
                    class="bg-white"
                    style="padding-bottom:0px; margin-bottom: 6%;  width:225px;"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary" />
                      <div class="text-subtitle2 text-primary">
                        Nume pacient:
                      </div>
                    </template>

                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline text-right text-black text-weight-medium"
                        tabindex="0"
                      >
                        {{ caz.name }}
                      </div>
                    </template>
                  </q-field>
                </div>
                <div style="margin-left:2%;" class="inputLeft">
                  <q-field
                    outlined
                    bottom-slots
                    :value="caz.phone"
                    class="bg-white"
                    style="padding-bottom:0px; margin-bottom: 6%;  width:225px;"
                  >
                    <template v-slot:prepend>
                      <q-icon name="phone" color="primary" />
                      <div class="text-subtitle2 text-primary ">Telefon:</div>
                    </template>

                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline text-right text-black text-weight-medium"
                        tabindex="0"
                      >
                        {{ caz.phone }}
                      </div>
                    </template>
                  </q-field>
                </div>
              </div>
              <div style="display: flex;" class="infoDiv">
                <div style="margin-right:2%;">
                  <q-field
                    outlined
                    bottom-slots
                    :value="caz.bloodType"
                    class="bg-white"
                    style="padding-bottom:0px; margin-bottom: 6%; width:225px;"
                  >
                    <template v-slot:prepend>
                      <q-icon name="opacity" color="primary" />
                      <div class="text-subtitle2 text-primary">Tip sânge:</div>
                    </template>

                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline text-right text-black text-weight-medium"
                        tabindex="0"
                      >
                        {{ caz.bloodType }}
                      </div>
                    </template>
                  </q-field>
                </div>
                <div style="margin-left:2%;" class="inputLeft">
                  <q-field
                    outlined
                    bottom-slots
                    :value="caz.quantity"
                    class="bg-white"
                    style="padding-bottom:0px; margin-bottom: 6%;  width:225px; "
                  >
                    <template v-slot:prepend>
                      <q-icon name="medical_services" color="primary" />
                      <div class="text-subtitle2 text-primary">
                        Cantitate necesară:
                      </div>
                    </template>

                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline text-right text-black text-weight-medium "
                        tabindex="0"
                      >
                        {{ caz.quantity }}
                      </div>
                    </template>
                  </q-field>
                </div>
              </div>
              <div>
                <q-field
                  outlined
                  bottom-slots
                  :value="caz.text"
                  class="bg-white"
                  style="padding-bottom:0px;  max-width:380px;   margin-bottom: 6%;"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" color="primary" />
                    <div class="text-subtitle2 text-primary">
                      Descriere:
                    </div>
                  </template>

                  <template v-slot:control>
                    <div
                      class="self-center full-width no-outline text-right text-black text-weight-medium"
                      tabindex="0"
                      style="text-align:center"
                    >
                      {{ caz.text }}
                    </div>
                  </template>
                </q-field>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
        <q-card-actions align="right" style="margin-right:0.9%;">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
import emailjs from "emailjs-com";
export default {
  name: "DonorEmergencies",
  components: {
    ParticlesBg
  },
  data() {
    return {
      alert: false,
      alert1: false,
      currentCase: null,
      user: null,
      cases: [],
      compatibleCases: [],
      incompatibleCases: [],
      slide: "style",
      slide1: "style",
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
    addDonor() {
      axios
        .put(
          `http://localhost:8081/api/user/addDonor/${this.currentCase.id}`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          let email = {
            from_name: this.currentCase.name,
            from_bloodType: this.currentCase.bloodType,
            from_quantity: this.currentCase.quantity,
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            phone: this.user.phone,
            bloodType: this.user.bloodType
          };
          emailjs
            .send(
              "service_hl38kq9",
              "template_c0ly6m7",
              email,
              "user_VjcMM8oTycSIIgQDYDhpG"
            )
            .then(() =>
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "done",
                message: "Mulțumim! Te vom contacta în scurt timp."
              })
            )
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/user/getProfile", {
        withCredentials: true
      })
      .then(response => {
        this.user = response.data;
        console.log(this.user);
        axios
          .get("http://localhost:8081/api/user/getActiveCases", {
            withCredentials: true
          })
          .then(response => {
            this.cases = response.data;
            console.log(this.cases);
            if (this.user.bloodType == "0+") {
              this.cases.forEach(element => {
                if (
                  element.bloodType == "0+" ||
                  element.bloodType == "A+" ||
                  element.bloodType == "B+" ||
                  element.bloodType == "AB+"
                ) {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "A+") {
              this.cases.forEach(element => {
                if (element.bloodType == "A+" || element.bloodType == "B+") {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "B+") {
              this.cases.forEach(element => {
                if (element.bloodType == "B+" || element.bloodType == "AB+") {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "AB+") {
              this.cases.forEach(element => {
                if (element.bloodType == "AB+") {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "0-") {
              this.compatibleCases = this.cases;
            } else if (this.user.bloodType == "A-") {
              this.cases.forEach(element => {
                if (
                  element.bloodType == "A+" ||
                  element.bloodType == "A-" ||
                  element.bloodType == "AB+" ||
                  element.bloodType == "AB-"
                ) {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "B-") {
              this.cases.forEach(element => {
                if (
                  element.bloodType == "B+" ||
                  element.bloodType == "B-" ||
                  element.bloodType == "AB+" ||
                  element.bloodType == "AB-"
                ) {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            } else if (this.user.bloodType == "AB-") {
              this.cases.forEach(element => {
                if (element.bloodType == "AB+" || element.bloodType == "AB-") {
                  this.compatibleCases.push(element);
                } else this.incompatibleCases.push(element);
              });
            }
            console.log(this.compatibleCases.length);
            if (this.compatibleCases.length != 0) {
              this.slide = this.compatibleCases[0].id;
            } else {
              this.slide = "style";
            }
            if (this.incompatibleCases.length != 0) {
              this.slide1 = this.incompatibleCases[0].id;
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .carousel {
    max-width: none !important;
    max-height: none !important;
    height: 580px;
  }

  .texth6 {
    padding: 0px 0px;
  }

  .infoDiv {
    flex-direction: column;
  }

  .inputLeft {
    margin-left: 0% !important;
  }

  .carousel1 {
    height: 450px;
  }

  .dialogh6 {
    margin-top: 110% !important;
  }
}
</style>
