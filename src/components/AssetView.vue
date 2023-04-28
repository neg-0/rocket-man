<script setup>
import { computed, ref, watch } from "vue";
import assetJson from './assetData.json';

const assetData = ref(assetJson);
const locationId = ref("0");
const locationIds = {
  "ASOC": "ASOC",
  "Astrotech": "Astrotech",
  "DOC": "DOC",
  "Hangar X": "Hangar X",
  "SLC-37": "SLC-37",
  "SLC-39A": "SLC-39A",
  "SLC-39B": "SLC-39B",
  "SLC-40": "SLC-40",
  "SLC-41": "SLC-41"
}

const assetIcons = {
  "Falcon 9 Booster": "../assets/Falcon9Booster.png",
  "Atlas Booster": "../assets/AtlasBooster.png",
  "Delta IV Heavy": "../assets/DeltaIVHeavy.png",
  "Falcon 9": "../assets/Falcon9.png",
  "Atlas PLF": "../assets/AtlasPLF.png"
}
const props = defineProps({
  partId: String,
});

watch(
  () => props.partId,
  () => {
    locationId.value = locationIds[props.partId];

    // Collect every assetDataJSON with the secified location
    assetData.value = assetDataJSON
      .filter((data) => data.location === locationId.value)
  },
  { immediate: true }
);

const weatherObjKeys = computed(() => {
  if (assetData.value.length > 0) {
    return Object.keys(assetData.value[0]);
  }
  return [];
});
</script>

<template>
  <div class="wrapper">
    <h2>Asset Data</h2>
    <h5>Location: {{ locationId }}</h5>
    <div class="table-wrapper">
      <!-- Render a grid of asset icons, the asset label, and mission -->
    </div>
  </div>
</template>