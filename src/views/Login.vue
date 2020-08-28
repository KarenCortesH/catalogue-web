<template>
  <div class="row" id="main">
    <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 centered">
      <img
        class="layout background animated mt-5 container text-center"
        id="img"
        src="../assets/logo.png"
      />
      <div class="card card-container">
        <div class="form-group">
          <p class="card-text">
            Ingresa el número de teléfono
            <br />de tu asesora independiente.
          </p>
        </div>
        <validation-observer v-slot="{ handleSubmit }">
          <form name="form" @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
              <!-- <label for="phone">Telefono</label> -->
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  v-model="user.mobilephone"
                  type="tel"
                  placeholder="Telefono"
                  class="form-control"
                  name="phone"
                  id="phone"
                />
                <span class="validation">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- solo muestro este div cuando fallo el login -->
            <div v-if="message" class="form-group">
              <div class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Ingresar</span>
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
// componentes para la validacion del formulario
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// modelo que representa la estructura del usuario
import User from '../models/user';

// sobre escribo el mensaje de la validacion
extend('required', {
  ...required,
  message: 'Campo requerido'
});

export default {
  name: 'LoginView',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: new User({}),
      loading: false,
      message: ''
    };
  },
  computed: {
    // valor para determinar si el usuario estar loggeado o no
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    // si el usuario esta loggeado lo envio al home
    if (this.loggedIn) {
      this.$router.push('/home');
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true;

      // siempre que haya digitado un numero de telefono comienzo el proceso
      if (this.user.mobilephone) {
        try {
          // voy a llamo a la acción del dispatch para hacer el login
          await this.$store.dispatch('auth/login', this.user);
          // console.log('response', response);
          this.$router.push('/home');
        } catch (error) {
          this.loading = false;
          this.message = 'Este número no es valido o no está registrado.';
          console.log(error);
        }
      }
    }
  }
};
</script>

<style scoped>
#main {
  /* Location of the image */
  background-image: url("../assets/login-bg-desktop.jpg");

  /* Background image is centered vertically and horizontally at all times */
  background-position: center center;

  /* Background image doesn't tile */
  background-repeat: no-repeat;

  /* Background image is fixed in the viewport so that it doesn't move when 
     the content's height is greater than the image's height */
  background-attachment: fixed;

  /* This is what makes the background image rescale based
     on the container's size */
  background-size: cover;

  /* Set a background color that will be displayed
     while the background image is loading */
  background-color: #464646;
}

span .validation {
  color: white;
}

.card-container.card {
  padding: 2rem 2rem;
}

.card {
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
}
#img {
  width: 60%;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  line-height: 1.5;
  font-family: Monserrat, sans-serif;
  margin-top: 48px !important;
  text-align: center !important;
}
.card-text {
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  color: white;
}
</style>