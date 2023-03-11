<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <h2>Username</h2>
        <TextField name="username" v-model="username" v-bind:value="username" />
      </div>

      <div>
        <h2>Password</h2>
        <TextField
          name="password"
          v-model="password"
          v-bind:value="password"
          type="password"
        />
      </div>

      <Button content="Login" type="submit" :widthOnHover="true" />

      <div class="login__footer">
        <p>
          Don't have an account ?
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useUser } from "../store/modules/user/User";

// Components
import TextField from "@/components/form/TextField.vue";
import Button from "@/components/form/Button.vue";

export default defineComponent({
  setup() {
    const userStore = useUser();

    return {
      userStore,
    };
  },
  name: "Login",
  components: {
    TextField,
    Button,
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.userStore
        .login({ username, password })
        .then(() => {
          this.$http.defaults.headers.common = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          this.$router.push("/");
        })
        .catch(() => {
          alert("Invalid username or password");
        });
    },
  },
  data() {
    return {
      username: "" as string,
      password: "" as string,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  text-align: center;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 50px;
    font-size: 2em;
    margin-bottom: 30px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;

    h2 {
      font-size: 1.5em;
      margin-bottom: 20px;
    }
  }

  .login__footer {
    a {
      color: var(--primary);
    }
  }
}
</style>
