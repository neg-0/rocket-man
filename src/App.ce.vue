<script setup>
import "./assets/main.css";
import AssetView from "./components/AssetView.vue";

const props = defineProps({
  partId: String,
});
</script>

<template>
  <main>
    <AssetView :partId="props.partId" />
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
  margin-block: 12px;
}

/* Add breakpoints and wrapping to the grid */
.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.asset {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--pal-v1-status-e-200);
  border-radius: 8px;
  padding: 1rem;
  transition: all ease-in-out 100ms;
  height: 120px;
}

.asset:hover {
  background-color: var(--pal-v1-accent-500);
}

.asset-icon {
  max-height: 100px;
  max-width: 100px;
  height: auto;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}

.asset-label {
  text-align: center;
}

.asset-label p {
  margin-block: 0;
}

.asset-label p:first-child {
  font-weight: bold;
}
</style>