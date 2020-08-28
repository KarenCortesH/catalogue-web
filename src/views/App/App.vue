<template>
  <div id="app">
    <NavBar
      v-if="currentUser"
      v-bind:currentUser="currentUser"
      v-bind:bus="bus"
    />

    <div class="container-fluid">
      <router-view />
    </div>

    <Footer
      v-if="currentUser"
    />
  </div>
</template>

<script>
import Vue from 'vue';

import NavBar from './NavBar/NavBar.vue';
import Footer from './Footer/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      bus: new Vue()
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {},
  mounted() {
    console.log('currentUser', this.currentUser);
  }
};
</script>


