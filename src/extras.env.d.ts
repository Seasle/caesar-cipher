import ApexCharts from 'apexcharts';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}
