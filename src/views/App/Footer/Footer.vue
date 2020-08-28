<template>
  <!-- Footer -->
  <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light">
    <div class="container">
      <ul class="nav navbar-nav mx-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">
            <font-awesome-icon icon="home" size="lg" />
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/catalogo/1">
            <font-awesome-icon icon="id-badge" size="lg" />
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="shopping-cart" size="lg" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
@media (min-width: 992px) {
  .navbar {
    height: 50px;
  }
}

.navbar {
  border-top: solid gray 1px;
}
</style>