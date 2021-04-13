<template>
  <div>
    <h3>Hello World</h3>
    <Counter
      v-if="loaded"
      :year="lastDonationDate.newDate.getFullYear()"
      :month="lastDonationDate.newDate.getMonth()"
      :day="lastDonationDate.newDate.getDay()"
      :hour="0"
      :minute="0"
      :second="0"
      :milisecond="0"
    />
    <div class="q-pa-md flex flex-center">
      <q-date
        v-model="date"
        landscape
        first-day-of-week="1"
        :locale="currentLocale"
      />
      <div class="q-pa-md">
        <q-list>
          <!--
        Rendering a <label> tag (notice tag="label")
        so QRadios will respond to clicks on QItems to
        change Toggle state.
      -->
          <q-scroll-area style="height: 300px; width: 400px;">
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="hour" val="7:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>7:30</q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="hour" val="8:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>8:30</q-item-label>
                <q-item-label caption>With description </q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="hour" val="9:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>9:30</q-item-label>
                <q-item-label caption
                  >Lorem ipsum dolor sit amet, laborum.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="hour" val="10:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>10:30</q-item-label>
                <q-item-label caption
                  >Lorem ipsum dolor sit amet, laborum.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="hour" val="11:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>11:30</q-item-label>
                <q-item-label caption
                  >Lorem ipsum dolor sit amet, laborum.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="hour" val="12:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>12:30</q-item-label>
                <q-item-label caption
                  >Lorem ipsum dolor sit amet, laborum.</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-radio v-model="hour" val="13:30" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>13:30</q-item-label>
                <q-item-label caption
                  >Lorem ipsum dolor sit amet, laborum.</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>

        <div class="q-px-sm q-mt-sm">
          Your selection is: <strong>{{ hour }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "../components/Counter.vue";
import axios from "axios";
export default {
  name: "Appointment",
  components: {
    Counter
  },
  data() {
    return {
      lastDonationDate: {},
      date: "2021/04/11",
      loaded: false,
      hour: "7:30",
      currentLocale: {
        days: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă_Duminică".split(
          "_"
        ),
        daysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        months: "Ianuarie_Februarie_Мartie_Аprilie_Маi_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split(
          "_"
        ),
        monthsShort: "Ian_Feb_Маr_Аpr_Маi_Iun_Iul_Аug_Sept_Оct_Noi_Dec".split(
          "_"
        )
      }
    };
  },
  methods: {
    calculateNewDate() {
      let newDate = new Date(this.lastDonationDate.dateOfDonation);
      console.log(newDate);
      newDate.setDate(newDate.getDate() + 60);
      return newDate;
    }
  },
  created() {
    axios
      .get("http://localhost:8081/api/user/getLastDonation", {
        withCredentials: true
      })
      .then(donationDate => {
        console.log(donationDate.data);
        this.lastDonationDate = donationDate.data;
        this.lastDonationDate.newDate = this.calculateNewDate();
        console.log(this.lastDonationDate.newDate);
        this.loaded = true;
      });
  }
};
</script>

<style></style>
