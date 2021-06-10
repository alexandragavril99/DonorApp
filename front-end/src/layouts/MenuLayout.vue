<template>
  <q-layout view="lHh Lpr lFf">
    <div v-if="!$isMobile()">
      <q-header elevated>
        <q-tabs
          v-model="tab"
          class="shadow-2 bg-secondary swipeable text-primary"
          align="right"
        >
          <!-- <img class="logo" alt="Logo" src="../assets/logo-donor.png" /> -->

          <q-tab
            name="home"
            label="Acasă"
            icon="home"
            class="tabsList"
            clickable
            @click="$router.push('/').catch(err => {})"
          />
          <q-btn-dropdown
            v-if="admin == false"
            auto-close
            stretch
            flat
            clickable
          >
            <template v-slot:label>
              <div>
                <div class="row justify-around items-center no-wrap">
                  <q-icon name="event" />
                </div>
                <div class="row items-center no-wrap">
                  Programări
                </div>
              </div>
            </template>

            <q-list>
              <q-item
                name="appointment"
                label="Programează-te"
                class="bg-secondary text-primary text-weight-medium"
                clickable
                @click="appointment"
              >
                <q-item-section style="text-align:center;"
                  >Programează-te</q-item-section
                >
              </q-item>

              <q-item
                name="viewAppointments"
                class="bg-secondary text-primary text-weight-medium"
                clickable
                @click="viewAppointments"
              >
                <q-item-section style="text-align:center;"
                  >Vizualizează programări</q-item-section
                >
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-tab
            v-else
            name="appointmentsDoctor"
            label="Programări donatori"
            icon="event"
            class="tabsList"
            clickable
            @click="$router.push('/doctorAppointment').catch(err => {})"
          ></q-tab>
          <!-- <q-tab
            name="appointment"
            label="Programează-te"
            icon="event"
            class="tabsList"
            clickable
            @click="$router.push('/appointment').catch(err => {})"
          /> -->
          <q-tab
            name="profile"
            label="Profil"
            icon="person"
            class="tabsList"
            clickable
            @click="$router.push('/profile').catch(err => {})"
          ></q-tab>
          <q-tab
            name="emergency"
            label="Ajutor"
            icon="healing"
            class="tabsList"
          ></q-tab>
          <q-tab
            name="score"
            label="Scor"
            icon="star_rate"
            class="tabsList"
            @click="$router.push('/ranking').catch(err => {})"
          ></q-tab>
          <q-tab
            name="logout"
            label="Logout"
            icon="logout"
            class="tabsList"
            clickable
            @click="logout"
          ></q-tab>
        </q-tabs>
      </q-header>
    </div>
    <div v-else>
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-toolbar-title>
            Donor
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1 mobileMenu"
      >
        <q-list>
          <q-item clickable exact to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Acasa</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable exact to="/profile">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Profil</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable exact to="/appointment">
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Programeaza-te</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable exact to="/">
            <q-item-section avatar>
              <q-icon name="star_rate" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Scor</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { mapMutations, mapActions, mapGetters } from "vuex";
import Vue from "vue";
import VueMobileDetection from "vue-mobile-detection";
Vue.use(VueMobileDetection);

export default {
  name: "MenuLayout",
  data() {
    return {
      tab: "home",
      leftDrawerOpen: false,
      admin: false
    };
  },

  methods: {
    logout() {
      axios
        .delete("http://localhost:8081/api/user/logout", {
          withCredentials: true
        })
        .then(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "logout",
            message: "You logged out"
          });
          this.$router.push("/login");
        })
        .catch(() => {
          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "error",
            message: "Error logging out"
          });
        });
    },
    appointment() {
      this.$router.push("/appointment").catch(err => {});
      this.tab = "appointment";
    },
    viewAppointments() {
      this.$router.push("/viewAppointments").catch(err => {});
      this.tab = "appointment";
    },
    profile() {
      if (this.$router.path !== "/profile") {
        this.$router.push("/profile");
      }
    },
    ...mapActions(["fetchUser"])
  },
  created() {
    console.log(this.$isMobile());
    axios
      .get("http://localhost:8081/api/user/getUser", { withCredentials: true })
      .then(response => {
        const user = response.data;
        if (user.isDoctor != null) {
          this.admin = user.isDoctor;
        }
      });
  }
};
</script>

<style scoped>
/* .tabsList {
  margin-right: 1%;
}
.q-tab {
  padding: 0 12px;
} */
.logo {
  width: 72px;
  /* position: absolute;
  z-index: 100;
  top: -3vh;
  padding-left: 3%; */
}
.q-tab--full {
  min-height: 64px;
}
</style>
