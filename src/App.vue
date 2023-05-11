<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <a href="/"><q-toolbar-title class="title">
          Search & Stay
        </q-toolbar-title></a>
        <q-space />
        <q-btn dense flat to="/dashboard" exact active-class="text-white" aria-label="Home">
          Dashboard
        </q-btn>
        <q-btn dense flat to="/login" exact active-class="text-white" aria-label="Login">
          Login
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style scoped>
.title{
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;

}
</style>