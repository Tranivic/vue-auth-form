<template>
  <section>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else>
      <h1>Welcome, {{ getLogedUser.name }}. You are logged in!</h1>
    </div>
  </section>
</template>
<script>
import LoadingSpinner from '../ui/LoadingSpinner.vue';
export default {
  components: {
    LoadingSpinner,
  },

  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    if (!this.getLogedUser) {
      this.loadUserData();
      return;
    }
    this.isLoading = false;
  },
  methods: {
    async loadUserData() {
      const userId = this.$store.getters['auth/id'];
      const userToken = this.$store.getters['auth/token'];

      try {
        await this.$store.dispatch('user/getUserData', {
          userId,
          userToken,
        });
        this.isLoading = false;
      } catch (err) {
        alert(err);
      }
    },
  },
  computed: {
    getLogedUser() {
      return this.$store.getters['user/logedUser'];
    },
  },
};
</script>

<style scoped>
section{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
