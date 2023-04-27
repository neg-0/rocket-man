<script setup>
import "./assets/main.css";
import WeatherData from "./components/WeatherData.vue";

const props = defineProps({
  partId: String,
});

console.log(props.partId);
</script>

<template>
  <main>
    <WeatherData :partId="props.partId" />
  </main>
</template>


<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  /* background-image: url('https://i0.wp.com/stationproject.blog/wp-content/uploads/2012/08/weather-station-18.jpg?ssl=1'); */
  /* background-size: cover; */
  background-color: black;
}

.wrapper h1,
h2,
h5 {
  color: var(--pal-v1-status-e-200);
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

table {
  width: 100%;
  border: 1px solid var(--pal-v1-neutrals-300);
  font-size: 0.75rem;
  border-collapse: collapse;
  color: white;
}
table thead {
  background-color: var(--pal-v1-status-e-200);
}
table tr {
  border-top: 1px solid var(--pal-v1-text-600);
  transition: all ease-in-out 100ms;
}
table th {
  text-align: left;
  padding: 0.5rem;
}
table td {
  padding: 0.5rem;
}

table tr:hover {
  background-color: var(--pal-v1-accent-500);
}
</style>