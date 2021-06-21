<template>
  <div class="q-pa-md">
    <section
      v-if="loaded"
      class="flex flex-center text-center text-h2 justify-center"
    >
      <div class="text-primary" style="display:table;">
        <div style="display: table-row;">
          <div
            class="text-weight-regular bg-secondary padding"
            style="display: table-cell;"
          >
            {{ time.displayDays }}
          </div>
          <div style="display:table-cell;">:</div>
        </div>
        <div class="text-subtitle2 bg-secondary bordertime" style="font-family: 'Montserrat', sans-serif;">
          zile
        </div>
      </div>

      <div class="text-primary" style="display:table;">
        <div style="display: table-row;">
          <div
            class="text-weight-regular bg-secondary padding"
            style="display: table-cell;"
          >
            {{ time.displayHours }}
          </div>
          <div style="display:table-cell;">:</div>
        </div>
        <div class="text-subtitle2 bg-secondary bordertime" style="font-family: 'Montserrat', sans-serif;">
          ore
        </div>
      </div>

      <div class="text-primary" style="display:table;">
        <div style="display: table-row;">
          <div
            class="text-weight-regular bg-secondary padding"
            style="display: table-cell;"
          >
            {{ time.displayMinutes }}
          </div>
          <div style="display:table-cell; ">:</div>
        </div>
        <div class="text-subtitle2 bg-secondary bordertime" style="font-family: 'Montserrat', sans-serif;">
          minute
        </div>
      </div>

      <div class="text-primary" style="display:table;">
        <div style="display: table-row;">
          <div
            class="text-weight-regular bg-secondary padding"
            style="display: table-cell; "
          >
            {{ time.displaySeconds }}
          </div>
        </div>
        <div class="text-subtitle2 bg-secondary bordertime" style="font-family: 'Montserrat', sans-serif;">
          secunde
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: [
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "milisecond",
    "state"
  ],
  data() {
    return {
      time: {
        displayDays: 0,
        displayHours: 0,
        displayMinutes: 0,
        displaySeconds: 0
      },
      loaded: false
    };
  },
  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
    end() {
      return new Date(
        this.year,
        this.month,
        this.day,
        this.hour,
        this.minute,
        this.second,
        this.milisecond
      );
    }
  },
  mounted() {
    this.showRemaining();
  },
  methods: {
    formatNumber: num => (num < 10 ? "0" + num : num),
    showRemaining() {
      const timer = setInterval(() => {
        this.loaded = true;

        const now = new Date();
        const distance = this.end.getTime() - now.getTime();
        if (distance < 0) {
          clearInterval(timer);
          this.changeState();
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.time.displayMinutes = this.formatNumber(minutes);
        this.time.displaySeconds = this.formatNumber(seconds);
        this.time.displayHours = this.formatNumber(hours);
        this.time.displayDays = this.formatNumber(days);
      }, 1000);
    },
    changeState: function() {
      this.$emit("changeState", 1);
    }
  }
};
</script>

<style scoped>
.seconds {
  max-width: 60px;
}

.padding {
  padding: 6px 6px 0px 6px;
  border-radius: 5px 5px 0 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.bordertime {
  border-radius: 0px 0px 5px 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
