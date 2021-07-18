<template>
  <div class="q-pa-md">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section
          class="items-center"
          style="display:flex; justify-content:center; min-width: 250px;  font-family: 'Montserrat', sans-serif; margin-top:2%;"
        >
          <div>
            <div style="text-align: center;">
              <label for="">Apt de donare?</label>
            </div>
            <div style="display:flex; flex-direction:column;">
              <q-radio v-model="shape" val="da" label="Da" />
              <q-radio v-model="shape" val="nu" label="Nu" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions
          align="center"
          style=" font-family: 'Montserrat', sans-serif;"
        >
          <q-btn
            flat
            label="OK"
            color="primary"
            @click="changeState"
            v-close-popup
          />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <div
          class="text-h6 q-pa-md"
          style="text-align: center; font-family: 'Montserrat-regular', sans-serif; "
        >
          Detalii donator
        </div>

        <q-card-section
          class="q-pt-none"
          style="font-family: 'Montserrat-regular', sans-serif;"
        >
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="perm_identity"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="surname"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="perm_identity"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="phone"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="phone"></q-icon>
            </template>
          </q-input>

          <q-input
            dense
            v-model="email"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="city"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="business"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="birthDate"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="celebration"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="bloodType"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="opacity"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="weight"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="self_improvement"></q-icon>
            </template>
          </q-input>
          <q-input
            dense
            v-model="scores"
            autofocus
            @keyup.enter="prompt = false"
            item-aligned
          >
            <template v-slot:prepend>
              <q-icon name="star_rate"></q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions
          style="font-family: 'Montserrat-regular', sans-serif;"
          align="right"
          class="text-primary"
        >
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Modifică detalii"
            @click="updateUser"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="my-card">
      <q-card-section class="bg-secondary card">
        <div class="header-recruit">
          <div class="profile-picture-box">
            <img
              class="baby"
              v-if="profilePicture"
              :src="`../profilePictures/${profilePicture}`"
              alt="recruit-photo"
            />
            <img
              v-else
              :src="require(`../assets/avatar.png`)"
              alt=""
              class="baby"
            />
          </div>
        </div>
        <div class="flex flex-center">
          <h6
            class="flex flex-center text-primary text-weight-bold"
            style="margin:0;margin-bottom:1%;"
          >
            {{ name1 }} {{ surname1 }}
          </h6>
          <div v-if="canDonate1" class="text-green-8 text-weight-bold">
            Este apt de donare
            <q-icon name="check_circle"></q-icon>
          </div>

          <div v-else class="text-weight-bold" style="color: #9c1e1e;">
            Nu este apt de donare
            <q-icon name="cancel"></q-icon>
          </div>
        </div>

        <q-card-section>
          <div class="flex flex-center">
            <q-chip
              size="md"
              outline
              square
              color="primary"
              text-color="white"
              icon="email"
            >
              {{ email1 }}
            </q-chip>
          </div>
          <div
            class="flex flex-center row"
            style="justify-content: space-around;"
          >
            <div class="flex flex-center">
              <q-chip
                size="md"
                outline
                square
                color="primary"
                text-color="white"
                icon="accessibility"
              >
                {{ age }} ani
              </q-chip>
            </div>
            <div class="flex flex-center">
              <q-chip
                size="md"
                outline
                square
                color="primary"
                text-color="white"
                icon="opacity"
              >
                {{ bloodType1 }}
              </q-chip>
            </div>
            <div class="flex flex-center" style="margin-top:8%;">
              <q-btn class="bg-primary text-white" @click="prompt = true"
                >Detalii donator</q-btn
              >
              <q-btn
                class="bg-primary text-white"
                @click="confirm = true"
                style="margin-top:5%;"
                >Modificare statut</q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: [
    "idp",
    "namep",
    "surnamep",
    "profilePicturep",
    "birthDatep",
    "canDonatep",
    "emailp",
    "phonep",
    "bloodTypep",
    "cityp",
    "weightp",
    "scoresp"
  ],
  data() {
    return {
      age: null,
      prompt: false,
      confirm: false,
      shape: "",
      id: this.idp,
      name: this.namep,
      surname: this.surnamep,
      profilePicture: this.profilePicturep,
      birthDate: this.birthDatep,
      canDonate: this.canDonatep,
      email: this.emailp,
      phone: this.phonep,
      bloodType: this.bloodTypep,
      city: this.cityp,
      weight: this.weightp,
      scores: this.scoresp,
      id1: this.idp,
      name1: this.namep,
      surname1: this.surnamep,
      profilePicture1: this.profilePicturep,
      birthDate1: this.birthDatep,
      canDonate1: this.canDonatep,
      email1: this.emailp,
      phone1: this.phonep,
      bloodType1: this.bloodTypep,
      city1: this.cityp,
      weight1: this.weightp,
      scores1: this.scoresp
    };
  },
  methods: {
    calculateAge() {
      let birthDate2 = new Date(this.birthDate);
      let diff_ms = Date.now() - birthDate2.getTime();
      var age_dt = new Date(diff_ms);

      console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
      this.age = Math.abs(age_dt.getUTCFullYear() - 1970);
    },

    changeState() {
      if (this.shape === "da") {
        this.canDonate1 = 1;
      } else if (this.shape === "nu") {
        this.canDonate1 = 0;
      }

      axios
        .put(
          `http://localhost:8081/api/admin/updateDonorsState/${this.id}`,
          { canDonate: this.canDonate1 },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Stare actualizată!"
          });
        })
        .catch(err => console.log(err));
    },

    updateUser() {
      axios
        .put(
          `http://localhost:8081/api/admin/updateProfileByDoctor/${this.id}`,
          {
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone,
            city: this.city,
            weight: parseInt(this.weight),
            birthDate: this.birthDate,
            bloodType: this.bloodType
          },
          { withCredentials: true }
        )
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "done",
            message: "Profil actualizat!"
          });
          this.name1 = this.name;
          this.surname1 = this.surname;
          this.email1 = this.email;
          this.phone1 = this.phone;
          this.city1 = this.city;
          this.weight1 = this.weight;
          this.birthDate1 = this.birthDate;
          this.bloodType1 = this.bloodType;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.calculateAge();
    if (this.canDonatep) {
      this.shape = "da";
    } else {
      this.shape = "nu";
    }
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 275px;
  font-family: "Montserrat-regular", sans-serif;
}

.card {
  border-radius: 2%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.header-recruit {
  display: flex;
  justify-content: center;
  padding-top: 1vh;
  padding-bottom: 1vh;
  color: #fff;
  flex-direction: column;
  align-items: center;
}

.profile-picture-box {
  position: relative;
  z-index: 10;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.baby {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 130px;
  z-index: 1;
}
</style>
