<template>
  <div class="content" :data-tab="name">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabContent',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 16px;
  background: #eeeeee;

  &[hidden] {
    display: none;
  }
}
</style>
