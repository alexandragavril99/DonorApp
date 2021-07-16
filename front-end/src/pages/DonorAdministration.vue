<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div>
      <div class="flex flex-center q-pa-md">
        <h4
          style="margin:0; margin-top:2%; font-family: 'Montserrat-bold', sans-serif;"
        >
          Administrare donatori
        </h4>
      </div>
      <div class="q-pa-md" style="display:flex; justify-content:center;">
        <q-input
          dense
          debounce="300"
          v-model="search"
          placeholder="Search"
          style="max-width: 35%;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          outlined
          v-model="model"
          style="width:290px; margin-left: 5%;"
          :options="options"
          label="Filtrează după statul donatorului..."
        />
      </div>

      <div
        class="q-pa-md"
        style="max-width: 75%; margin: 0 auto; display: flex; justify-content: space-evenly; flex-wrap: wrap"
      >
        <UserCard
          v-for="user in getUsers"
          :filter="search"
          :key="user.id"
          :idp="user.id"
          :namep="user.name"
          :surnamep="user.surname"
          :profilePicturep="user.profilePicture"
          :birthDatep="user.birthDate"
          :canDonatep="user.canDonate"
          :emailp="user.email"
          :phonep="user.phone"
          :bloodTypep="user.bloodType"
          :cityp="user.city"
          :weightp="user.weight"
          :scoresp="user.scores"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
import UserCard from "../components/UserCard.vue";
export default {
  name: "DonorAdministration",
  components: {
    UserCard,
    ParticlesBg
  },
  data() {
    return {
      users: null,
      model: "Fără filtru",
      options: [
        "Donatori apți de donare",
        "Donatori care nu sunt apți de donare",
        "Fără filtru"
      ],
      search: "",
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
  computed: {
    getUsers() {
      if (!this.search && this.model == "Fără filtru") {
        return this.users;
      } else if (this.search && this.model == "Fără filtru") {
        let words = this.search.split(" ");
        let filteredUsers = this.users.filter(
          user =>
            user.name.toLowerCase().includes(this.search) ||
            user.surname.toLowerCase().includes(this.search) ||
            (user.name.toLowerCase().includes(words[0]) &&
              user.surname.toLowerCase().includes(words[1])) ||
            (user.name.toLowerCase().includes(words[1]) &&
              user.surname.toLowerCase().includes(words[0]))
        );
        console.log(filteredUsers);
        return filteredUsers;
      } else if (!this.search && this.model) {
        if (this.model == this.options[0]) {
          let filteredUsers = this.users.filter(user => user.canDonate == true);
          return filteredUsers;
        } else if (this.model == this.options[1]) {
          let filteredUsers = this.users.filter(
            user => user.canDonate == false || user.canDonate == null
          );
          return filteredUsers;
        }
      } else if (this.search && this.model) {
        if (this.model == this.options[0]) {
          let filteredUsers = this.users.filter(user => user.canDonate == true);
          let words = this.search.split(" ");
          let filteredUsers1 = filteredUsers.filter(
            user =>
              user.name.toLowerCase().includes(this.search) ||
              user.surname.toLowerCase().includes(this.search) ||
              (user.name.toLowerCase().includes(words[0]) &&
                user.surname.toLowerCase().includes(words[1])) ||
              (user.name.toLowerCase().includes(words[1]) &&
                user.surname.toLowerCase().includes(words[0]))
          );
          return filteredUsers1;
        } else if (this.model == this.options[1]) {
          let filteredUsers = this.users.filter(
            user => user.canDonate == false || user.canDonate == null
          );
          let words = this.search.split(" ");
          let filteredUsers1 = filteredUsers.filter(
            user =>
              user.name.toLowerCase().includes(this.search) ||
              user.surname.toLowerCase().includes(this.search) ||
              (user.name.toLowerCase().includes(words[0]) &&
                user.surname.toLowerCase().includes(words[1])) ||
              (user.name.toLowerCase().includes(words[1]) &&
                user.surname.toLowerCase().includes(words[0]))
          );
          return filteredUsers1;
        }
      }
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/admin/getAllDonors", {
        withCredentials: true
      })
      .then(response => {
        this.users = response.data;
        console.log(this.users);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
