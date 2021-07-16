<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="flex flex-center q-pa-md">
      <h4
        style="margin:0; margin-top:3%; margin-bottom:1.5%; font-family: 'Montserrat-bold', sans-serif;"
      >
        Clasament utilizatori
      </h4>
    </div>
    <div
      class="flex flex-center form-card rounded-borders"
      style="justify-content: space-around;"
    >
      <div
        class="q-pa-md card"
        style="display:flex; justify-content:center; font-family: 'Montserrat', sans-serif;"
      >
        <q-card v-if="user" class="my-card" flat bordered>
          <q-card-section horizontal style="margin-top:3%;">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 text-weight-medium q-mt-sm q-mb-xs">
                {{ user.name }} {{ user.surname }}
              </div>
              <div v-if="user.scores" class="text-subtitle-1 q-mt-sm q-mb-xs">
                Punctaj: {{ user.scores }} puncte
              </div>
              <div v-else class="text-subtitle-1 q-mt-sm q-mb-xs">
                Punctaj: 0 puncte
              </div>
              <div class="text-subtitle-1 q-mt-sm q-mb-xs">
                Poziție: {{ user.position }}
              </div>
            </q-card-section>

            <q-card-section class="col flex flex-center">
              <div class="header-recruit">
                <div class="profile-picture-box">
                  <img
                    class="baby"
                    v-if="user.profilePicture"
                    :src="`../profilePictures/${user.profilePicture}`"
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
            </q-card-section>
          </q-card-section>
          <q-card-section style="font-family: 'Montserrat', sans-serif;">
            <div
              v-if="user.position <= 10 && user.score != null"
              class="text-body-2"
            >
              Felicitări! Te afli în primii 10 utilizatori ai aplicației care
              donează sânge regulat. Gestul tău este foarte important și
              salvează viața a multor oameni.
              <br />
              Apreciem enorm efortul tău și te încurajăm să continui prin a fi
              atent la momentul în care poți dona iar! Poți verifica acest lucru
              accesând secțiunea de programări.
            </div>
            <div v-else class="text-body-2">
              Felicitări! Ne bucurăm să te avem utilizator al platformei noastre
              și că dorești să ajuți persoanele la nevoie. Gestul tău este
              foarte important și salvează viața a multor oameni.
              <br />
              Apreciem enorm efortul tău și te încurajăm să continui prin a fi
              atent la momentul în care poți dona iar! Poți verifica acest lucru
              accesând secțiunea de programări.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions
            class="flex flex-center"
            style="font-family: 'Montserrat', sans-serif;"
          >
            <q-btn
              color="primary"
              @click="$router.push('/appointment').catch(err => {})"
            >
              Accesează pagina de programări
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div
        class="q-pa-md qscroll2"
        style="display:flex; justify-content:center;"
      >
        <q-scroll-area
          class="shadow-2 rounded-borders  qscroll"
          style="height: 400px; width: 400px; background:white;"
        >
          <q-list
            bordered
            v-for="(user, index) in userList"
            :key="index"
            style="font-family: 'Montserrat', sans-serif;"
          >
            <q-item clickable v-ripple>
              <q-item-section
                class="text-weight-medium"
                style="max-width: 20px;"
                >{{ index + 1 }}.</q-item-section
              >
              <q-item-section class="text-weight-regular">
                {{ user.name }} {{ user.surname }}</q-item-section
              >
              <q-item-section
                v-if="user.scores"
                style="display:flex; align-items: flex-end;"
              >
                <q-chip
                  v-if="user"
                  outline
                  color="primary"
                  text-color="white"
                  icon-right="star"
                >
                  {{ user.scores }}
                </q-chip></q-item-section
              >
              <q-item-section
                v-else
                style="display:flex; align-items: flex-end;"
              >
                <q-chip
                  v-if="user"
                  outline
                  color="primary"
                  text-color="white"
                  icon-right="star"
                >
                  0
                </q-chip></q-item-section
              >
              <q-item-section avatar>
                <div class="header-recruit">
                  <div class="profile-picture-box2">
                    <img
                      class="baby"
                      v-if="user.profilePicture"
                      :src="`../profilePictures/${user.profilePicture}`"
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
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "Ranking",
  components: {
    ParticlesBg
  },
  data() {
    return {
      userList: null,
      user: null,
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  created() {
    axios
      .get("http://localhost:8081/api/user/getUserScore", {
        withCredentials: true
      })
      .then(response => {
        this.userList = response.data;
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8081/api/user/getPersonalScore", {
        withCredentials: true
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.my-card {
  /* width: 100%;
  max-width: 350px; */
  height: 400px;
  width: 400px;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%) !important;
}
.form-card {
  padding: 1.5%;
  max-width: 70%;
  margin: 0 auto;
  background: #f5f5f5;
  margin-bottom: 3%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.profile-picture-box2 {
  position: relative;
  z-index: 10;
  width: 35px;
  height: 35px;
}

.baby {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 130px;
  /* border-style: solid;
  border-color: #b22222; */
  z-index: 1;
}

@media only screen and (max-width: 600px) {
  .form-card {
    padding: 1.5%;
    max-width: 70%;
    margin: 0 auto;
    background: none;
    margin-bottom: 3%;
    box-shadow: none;
  }

  .my-card {
    width: 300px;
    height: 475px;
  }

  .card {
    margin-right: 0px;
  }

  .avatar {
    margin-right: 15%;
  }

  .textMobile {
    margin: 0;
    padding-top: 5%;
  }

  .qscroll {
    max-width: 300px;
  }

  .qscroll2 {
    margin-left: 0px;
  }
}
</style>
