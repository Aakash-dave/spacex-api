<template>
  <main class="d-flex flex-column">
    <header class="text-success mb-2">
      <h1>Saved Launches</h1>
    </header>
    <div class="d-flex flex-row flex-wrap gap-2" v-if="savedLaunches.length">
      <div v-for="launch in savedLaunches" :key="launch._id" class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h5>{{ launch.name }}</h5>
          </li>
          <li class="list-group-item">Flight Number: {{ launch.flight_number }}</li>
          <li class="list-group-item">Date: {{ dFormat(launch.date_utc) }}</li>
          <li class="list-group-item"><button @click="deleteLaunch(launch._id)"
              class="btn btn-danger btn-sm">Delete</button></li>
        </ul>
      </div>
    </div>
    <h5 class="p-2" v-else>No saved launches</h5>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useLaunchStore } from '../stores/launchStore';
import moment, { type MomentInput } from 'moment';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const launchStore = useLaunchStore();
    const { savedLaunch } = storeToRefs(launchStore);

    onMounted(() => {
      launchStore.fetchSavedLaunches();
    });

    const deleteLaunch = (id: number) => {
      launchStore.deleteLaunch(id);
    };

    const dFormat = (date_: String) => {
      return moment.utc(date_ as MomentInput).format('YYYY/MM/DD hh:mm a');
    }

    return {
      savedLaunches: savedLaunch,
      deleteLaunch,
      dFormat
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1em;
  width: 18rem;
  /* margin: 1em 0; */
}
</style>