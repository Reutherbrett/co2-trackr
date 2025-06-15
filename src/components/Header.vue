<template>
  <header class="main-header">
    <div class="header-container">
      <img src="/src/assets/logo.png" alt="Logo" class="logo-img" />
      <p class="title">CO2 Trackr.</p>
      <nav class="main-nav" v-if="!mobile">
        <router-link to="/">Start</router-link>
        <router-link to="/tracker">CO₂ Tracker</router-link>
        <router-link to="/about">Über uns</router-link>
      </nav>
      <button class="burger" v-if="mobile" @click="showMenu = !showMenu">☰</button>
    </div>
    @media (max-width: 500px) {
  .main-nav {
    display: none;
  }

  .burger {
    display: block;
  }

  .logo-img {
    height: 90px;
  }

  .title {
    font-size: 1.5rem;
  }
}
    <div class="flyout" v-if="showMenu && mobile">
      <router-link @click="closeMenu" to="/">Start</router-link>
      <router-link @click="closeMenu" to="/tracker">CO₂ Tracker</router-link>
      <router-link @click="closeMenu" to="/about">Über uns</router-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      mobile: false
    }
  },
  mounted() {
    this.checkWidth()
    window.addEventListener('resize', this.checkWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWidth)
  },
  methods: {
    checkWidth() {
      this.mobile = window.innerWidth <= 500
    },
    closeMenu() {
      this.showMenu = false
    }
  }
}
</script>