<template>
  <k-layout main="darker" class="page-migration">
    <k-card>
      您当前的 Koishi 版本为 {{ store.dependencies.koishi.resolved }}，无需升级。
    </k-card>
  </k-layout>
</template>

<script lang="ts" setup>

import { store } from '@koishijs/client'

</script>

<style lang="scss">

.page-migration {
  .k-card {
    margin: 1rem;
  }
}

</style>
