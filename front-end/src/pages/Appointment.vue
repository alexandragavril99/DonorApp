<template>
  <div>
    <h3>Hello World</h3>
    <Counter
      :year="2021"
      :month="2"
      :day="31"
      :hour="0"
      :minute="0"
      :second="0"
      :milisecond="0"
    />
    <div class="q-pa-md">
      <div class="q-gutter-sm row">
        <q-input filled v-model="time" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="time"
                  :hour-options="[7, 8, 9, 10, 11, 12, 13]"
                  :minute-options="[30]"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "../components/Counter.vue";
export default {
  name: "Appointment",
  components: {
    Counter
  },
  data() {
    return {
      time: "10:56"
    };
  }
};
</script>

<style></style>
