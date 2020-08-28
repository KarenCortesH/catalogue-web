<template>
  <!-- Navigation -->
  <nav class="navbar static-top navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">
        {{currentUser.name}}
      </span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        v-if="currentUser"
        class="collapse navbar-collapse"
        id="navbarResponsive"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" >
              <font-awesome-icon icon="phone" size="lg" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    currentUser: {
      type: Object,
      default: null
    },
    bus: {
      type: Object,
      default: null
    }
  },
  computed: {
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.navbar {
  border-bottom: solid gray 1px;
}

.navbar-brand {
  color: #f06292 !important;
}

.navbar-light .navbar-nav .nav-link {
  color: #f06292 !important;
}


.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: #f3b0c6 !important;
}
</style>
