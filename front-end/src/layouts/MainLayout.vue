<template>
  <q-layout view="lHh Lpr lFf">
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
      content-class="bg-grey-1"
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
        <q-item color="dark" clickable exact to="/doctorAppointment">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label color="dark">Programare donatori</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable exact to="/profile">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profil</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable exact to="/statistics">
          <q-item-section avatar>
            <q-icon name="star_rate" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Statistici</q-item-label>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false
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
    ...mapActions(["fetchUser"])
  },
  created() {
    this.fetchUser();
  }
};
</script>
<style scoped>
.q-item {
  color: #000000;
}
</style>
