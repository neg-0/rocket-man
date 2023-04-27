<script setup>
import { ref } from "vue";
import weatherDataJSON from "./weather.json";

const weatherAPI = "http://localhost:3000/weather";

const towersIds = {
  Tower_0003_eiffel: "0003",
  "Tower_0006_eiffel.002": "0006NW",
  "Tower_0303_eiffel.001": "0303",
};

const props = defineProps({
  partId: String,
});

const towerId = towersIds[props.partId];
const weatherData = ref([]);

// Collect every weatherDataJSON with the secified tower and sort by HGT
weatherData.value = weatherDataJSON
  .filter((data) => data.TOWER === towerId)
  .sort((a, b) => b.HGT - a.HGT)
  // Remove LAT, LON, AVG
  .map((data) => {
    const { LAT, LON, AVG, TOWER, AV, DIF, ...rest } = data;
    return rest;
  })
  // Remove any field that contains no value across all data
  .map((data) => {
    const newData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        newData[key] = data[key];
      }
    });
    return newData;
  })
  // Rename PREVAILING to PREV
  .map((data) => {
    const { PREVAILING, ...rest } = data;
    return { PREV: PREVAILING, ...rest };
  });
</script>

<template>
  <div class="wrapper">
    <h2>WINDS Data</h2>
    <h5>Tower: {{ towerId }}</h5>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="key in Object.keys(weatherData[0])" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- // Iterate through each value of the weatherData array -->
          <tr v-for="data in weatherData" :key="data.HGT">
            <!-- // Iterate through each value of the data object -->
            <td v-for="value in Object.values(data)" :key="value">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
