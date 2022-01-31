<template>
  <div class="tabs" ref="container">
    <div class="tabs__list" data-list>
      <slot name="buttons" />
    </div>
    <slot name="containers" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from '@/modules/tabs';

export default defineComponent({
  name: 'Tabs',
  mounted() {
    Tabs.create(this.$refs.container as HTMLDivElement);
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: 100%;

  &__list {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
  }
}
</style>
