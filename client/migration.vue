<template>
  <k-layout main="darker page-migration">
    <k-card>
      <template v-if="store.migration.next">
        <p>您当前的 Koishi 版本为 {{ store.migration.current }}，可以升级到 {{ store.migration.next }}。</p>
        <p>点击下方的按钮以升级。升级完成后将会关闭当前 Koishi 应用，你需要在稍后手动重新启动。</p>
        <div class="control">
          <k-button @click="send('migrate', store.migration.next)">我已知晓并确认升级</k-button>
        </div>
      </template>
      <template v-else>
        <p>您当前的 Koishi 版本为 {{ store.migration.current }}，无需升级。</p>
      </template>
    </k-card>
  </k-layout>
</template>

<script lang="ts" setup>

import { send, store } from '@koishijs/client'

</script>

<style lang="scss">

.page-migration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .k-card {
    padding: 0.5rem 0;
  }

  .k-card-body {
    width: 600px;
    max-width: 600px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    gap: 1rem 0;

    p {
      margin: 0;
    }

    .control {
      display: flex;
      gap: 0 1rem;
      justify-content: center;
      margin-top: 0.5rem;
    }
  }
}

</style>
