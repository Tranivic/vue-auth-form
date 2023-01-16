<template>
  <div class="spinner-container">
    <img
      src="https://www.seekpng.com/png/detail/211-2113357_load-spinner-spinner-load.png"
      alt="Load-spinner - Spinner Load@seekpng.com"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

img {
  width: 15rem;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
