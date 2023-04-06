<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <div>
        <h2>Username</h2>
        <TextField name="username" v-model="username" v-bind:value="username" />
      </div>

      <div>
        <h2>Email</h2>
        <TextField name="email" v-model="email" v-bind:value="email" />
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

      <Button content="Sign up" type="submit" :widthOnHover="true" />

      <div class="signup__footer">
        <p>
          Already have an account ?
          <router-link to="/login">Login</router-link>
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
  name: "view-signup",
  components: {
    TextField,
    Button,
  },
  methods: {
    signup() {
      let username = this.username;
      let password = this.password;
      let email = this.email;
      this.userStore
        .signup({ username, password, email })
        .then(() => {
          this.$http.defaults.headers.common = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          this.$router.push("/");
        })
        .catch(() => {
          alert("Invalid information");
        });
    },
  },
  data() {
    return {
      username: "" as string,
      password: "" as string,
      email: "" as string,
    };
  },
});
</script>

<style scoped lang="scss">
.signup {
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

  .signup__footer {
    a {
      color: var(--primary);
    }
  }
}
</style>
