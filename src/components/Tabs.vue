<template>
    <div class="tabs" ref="container">
        <div class="tabs__list" data-list>
            <slot name="buttons" />
        </div>
        <slot name="containers" />
    </div>
</template>

<script>
import Tabs from '@/modules/tabs';

export default {
    name: 'Tabs',
    mounted() {
        Tabs.create(this.$refs.container);
    }
};
</script>

<style lang="scss" scoped>
.tabs {
    display: grid;
    grid-auto-rows: max-content;

    &__list {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
    }
}
</style>
