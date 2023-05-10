<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          My App
        </q-toolbar-title>
        <q-space />
        <q-btn dense flat to="/" exact active-class="text-white" aria-label="Home">
          Home
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
