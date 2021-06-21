<template>
  <div>
    <particles-bg
      num="10"
      type="custom"
      color="#FFFFFF"
      :bg="true"
      :config="config"
    />
    <div class="flex flex-center">
      <div>
        <h4
          style="margin:0; margin-top: 15%; font-family: 'Montserrat-bold', sans-serif; color:rgba(40,49,80,1); "
        >
          STATISTICI CENTRU
        </h4>
      </div>
      <div class="flex" style="flex-wrap: nowrap; margin-top: 2%;">
        <div class="q-pa-md">
          <canvas
            id="myChart1"
            width="450"
            height="400"
            style="background:white;"
          ></canvas>
        </div>
        <div class="q-pa-md">
          <canvas
            id="myChart2"
            width="450"
            height="400"
            style="background:white;"
          ></canvas>
        </div>
        <div class="q-pa-md">
          <canvas
            id="myChart3"
            width="400"
            height="400"
            style="background:white;"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: "Statistics",
  components: {
    ParticlesBg
  },
  data() {
    return {
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
  created() {
    axios
      .get("http://localhost:8081/api/admin/getAppointmentsWithBloodType", {
        withCredentials: true
      })
      .then(response => {
        let data = response.data;
        console.log(data);
        let no = 0;
        let noA2 = 0;
        let noB3 = 0;
        let noAB4 = 0;
        data.forEach(element => {
          let date = Date.parse(element.date);
          if (date > new Date("01/01/2021")) {
            if (
              element.user.bloodType === "0+" ||
              element.user.bloodType === "0-"
            ) {
              no = no + 1;
            } else if (
              element.user.bloodType === "A+" ||
              element.user.bloodType === "A-"
            ) {
              noA2 = noA2 + 1;
            } else if (
              element.user.bloodType === "B+" ||
              element.user.bloodType === "B-"
            ) {
              noB3 = noB3 + 1;
            } else if (
              element.user.bloodType === "AB+" ||
              element.user.bloodType === "AB-"
            ) {
              noAB4 = noAB4 + 1;
            }
          }
        });
        let dataMonths = [0, 0, 0, 0, 0, 0, 0];
        data.forEach(element => {
          let date = Date.parse(element.date);
          if (date > new Date("01/01/2021") && date < new Date()) {
            date = new Date(date);
            console.log(date.getMonth());
            if (date.getMonth() == 0) {
              dataMonths[0]++;
            } else if (date.getMonth() == 1) {
              dataMonths[1]++;
            } else if (date.getMonth() == 2) {
              dataMonths[2]++;
            } else if (date.getMonth() == 3) {
              dataMonths[3]++;
            } else if (date.getMonth() == 4) {
              dataMonths[4]++;
            } else if (date.getMonth() == 5) {
              dataMonths[5]++;
            } else dataMonths[6]++;
          }
        });

        let dataYear = [0, 0, 0];
        data.forEach(element => {
          let date = new Date(element.date);
          if (date.getFullYear() == 2019) {
            dataYear[0]++;
          } else if (date.getFullYear() == 2020) {
            dataYear[1]++;
          } else if (date.getFullYear() == 2021) {
            dataYear[2]++;
          }
        });

        var ctx = document.getElementById("myChart1");
        var myChart1 = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Grupele 0-/0+",
              "Grupele A-/A+",
              "Grupele B-/B+",
              "Grupele AB-/AB+"
            ],
            datasets: [
              {
                label: "Tip sânge donat pe ultimele 6 luni",
                data: [no, noA2, noB3, noAB4],
                backgroundColor: [
                  "rgba(180,54,54,1)",
                  "rgba(240,84,64,1)",
                  "rgba(212,68,60,1)",
                  "rgba(40,49,80,1)"
                ],
                // borderColor: [
                //   "rgba(255, 99, 132, 1)",
                //   "rgba(54, 162, 235, 1)",
                //   "rgba(255, 206, 86, 1)",
                //   "rgba(75, 192, 192, 1)"
                // ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    family: "Montserrat",
                    size: 14
                  }
                }
              }
            }
          }
        });
        var ctx = document.getElementById("myChart2");
        var myChart2 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Ianuarie",
              "Februarie",
              "Martie",
              "Aprilie",
              "Mai",
              "Iunie",
              "Iulie"
            ],
            datasets: [
              {
                label: "Frecvență donare pe 2021",
                data: dataMonths,
                fill: false,
                borderColor: ["rgba(240,84,64,0.9)"],
                tension: 0.1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    family: "Montserrat",
                    size: 14
                  }
                }
              }
            }
          }
        });
        var ctx = document.getElementById("myChart3");
        var myChart3 = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["2019", "2020", "2021"],
            datasets: [
              {
                label: "Frecvență donare pe 2021",
                data: dataYear,
                backgroundColor: ["#B43636", "#283150", "#F05440"],
                hoverOffset: 4
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    family: "Montserrat",
                    size: 14
                  }
                }
              }
            }
          }
        });
      });
  }
};
</script>

<style></style>
