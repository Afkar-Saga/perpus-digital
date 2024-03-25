<template>
  <div>
    <div class="wrapper">
      <Header>
        <li v-if="['admin', 'admin-kelola-buku', 'admin-statistik'].includes(route.name)" class="nav-item">
          <NavPill name="LOGOUT" color="linear-gradient(#CE2828, #BB1313)" border-style="1px solid #810000" destination="/" />
        </li>
      </Header>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#E3F5E0, #708F7C);
}
</style>