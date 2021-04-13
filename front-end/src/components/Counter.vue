<template>
  <div>
    <section v-if="loaded" class="flex flex-center text-center text-h2">
      <div>
        {{ time.displayDays }}
        <div class="text-subtitle1">zile</div>
      </div>
      <span>:</span>
      <div>
        {{ time.displayHours }}
        <div class="text-subtitle1">ore</div>
      </div>
      <span>:</span>
      <div>
        {{ time.displayMinutes }}
        <div class="text-subtitle1">minute</div>
      </div>
      <span>:</span>
      <div class="seconds">
        {{ time.displaySeconds }}
        <div class="text-subtitle1">secunde</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["year", "month", "day", "hour", "minute", "second", "milisecond"],
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
        // const end = new Date(2021, 2, 29, 10, 10, 10, 10);
        const distance = this.end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
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
    }
  }
};
</script>

<style scoped>
.seconds {
  max-width: 60px;
}
</style>
