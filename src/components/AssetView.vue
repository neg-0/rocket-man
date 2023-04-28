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
  "Falcon 9 Booster": "assets/falcon9booster.png",
  "Atlas Booster": "assets/atlasbooster.png",
  "Delta IV Heavy": "assets/deltaIVheavy.png",
  "Falcon 9": "assets/falcon9.png",
  "Falcon 9 PLF": "assets/falcon9PLF.png",
  "Atlas PLF": "assets/atlasPLF.png"
}
const props = defineProps({
  partId: String,
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
          <img :src="assetIcons[asset.type]" :alt="asset.type" class="asset-icon" />
        </div>
        <div class="asset-label">
          <p>{{ asset.label }}</p>
          <p>{{ asset.mission }}</p>
        </div>
      </div>
    </div>
  </div>
</template>