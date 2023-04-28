<script setup>
import { computed, ref, watch } from "vue";
import assetJson from './assetData.json';

const assetData = ref(assetJson);
const locationId = ref("0");
const locationIds = {
  "LC_40_Hangar_Cube.007": "PPF",
  "Launch_Site_40_Cylinder.002": "SLC-40",
  "LC_29_Hangar_Cube.008": "HIF",
  "Launch_Site_25_Cylinder": "SLC-37",
  "Launch_Site_29_Cylinder.001": "SLC-41"
}

const assetIcons = {
  "Falcon 9 Booster": "falcon9booster.png",
  "Atlas Booster": "atlasbooster.png",
  "Delta IV Heavy": "deltaIVheavy.png",
  "Falcon 9": "falcon9.png",
  "Falcon 9 PLF": "falcon9PLF.png",
  "Atlas PLF": "atlasPLF.png",
  "Vulcan": "vulcan.png",
  "Delta Booster": "deltabooster.png",
  "DCSS": "dcss.jpeg"
}
const props = defineProps({
  partId: String,
  proxy: String
});

watch(
  () => props.partId,
  () => {
    locationId.value = locationIds[props.partId];

    // Collect every assetDataJSON with the secified location
    assetData.value = assetJson
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
    <!-- Render a grid of asset icons, the asset label, and mission -->
    <div class="asset-grid">
      <div v-for="asset in assetData" :key="asset.id" class="asset">
        <div class="icon-wrapper">
          <img :src="`${proxy}/images/${assetIcons[asset.type]}`" :alt="asset.type" class="asset-icon" />
        </div>
        <div class="asset-label">
          <p>{{ asset.label }}</p>
          <p>{{ asset.mission }}</p>
        </div>
      </div>
    </div>
  </div>
</template>