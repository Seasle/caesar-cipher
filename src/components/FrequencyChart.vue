<template>
  <div class="chart">
    <p class="chart__title">{{ title }}</p>
    <div class="chart__container">
      <apexchart height="100%" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'FrequencyChart',
  props: {
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: Array as () => string[],
      required: true,
    },
    current: {
      type: Array as () => { x: string; y: number }[],
      default: () => [],
    },
    previous: {
      type: Array as () => { x: string; y: number }[],
      default: () => [],
    },
  },

  setup(props) {
    const data = toRefs(props);

    const chartOptions = ref({
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: data.labels,
      },
    });

    const series = ref([
      {
        name: 'Предыдущее',
        data: data.previous,
      },
      {
        name: 'Текущее',
        data: data.current,
      },
    ]);

    return { chartOptions, series };
  },
});
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  padding: 20px;
  gap: 20px;
  border-radius: 4px;
  display: grid;
  grid-template-rows: max-content 1fr;
  background: #ffffff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 8px 8px 0 rgba(0, 0, 0, 0.1), 0 16px 16px 0 rgba(0, 0, 0, 0.1);

  &__title {
    margin: 0;
    font-weight: 500;
  }

  &__container {
    flex: 1 1 auto;
  }
}
</style>
