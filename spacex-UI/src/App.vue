<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import 'vue3-toastify/dist/index.css';
</script>

<template>
  <section class="nav-bar-left">
    <router-link to="/" activeClass="active">Launches List</router-link>
  </section>

  <section class="nav-bar-right">
    <router-link to="/Saved" activeClass="active">Saved launches</router-link>
  </section>

  <section class="content-area">
    <RouterView />
  </section>
</template>

<style scoped></style>
