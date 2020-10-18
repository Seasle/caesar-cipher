<template>
    <table class="table">
        <tbody>
            <tr v-for="(entries, index) in data" :key="index">
                <td class="table__cell" v-for="(entry, index) in entries" :key="index">
                    <slot name="cell" :entry="entry" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" scoped>
.table {
    border-collapse: collapse;

    &__cell {
        padding: 2px;
        border: 1px solid #111111;
    }
}
</style>
