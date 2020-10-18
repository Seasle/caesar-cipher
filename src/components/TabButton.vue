<template>
    <button class="button" :data-target="name">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'TabButton',
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.button {
    padding: 16px 24px;
    border: none;
    font: inherit;

    &[aria-selected='true'] {
        background-color: var(--primary-color);
        color: #ffffff;
    }

    &[aria-selected='false'] {
        background-color: #111111;
        color: #eeeeee;
    }
}
</style>
