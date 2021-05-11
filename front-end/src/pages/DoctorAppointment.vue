<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 70%; margin: 0 auto;">
      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-primary text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="newAppointments" label="Programări noi" />
          <q-tab name="assumedAppointments" label="Programări asumate" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-white text-center">
          <q-tab-panel name="newAppointments">
            <q-table
              grid
              title="Treats"
              :data="data"
              :columns="columns"
              row-key="name"
              :filter="filter"
              hide-header
              :rows-per-page-options="[4, 8, 16, 0]"
              no-data-label="Nu există nicio programare nouă înregistrată."
            >
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

            </q-table>
          </q-tab-panel>

          <q-tab-panel name="assumedAppointments">
            <div class="text-h6">Programări asumate</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "newAppointments",
      filter: "",
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ]
    };
  }
};
</script>

<style></style>
