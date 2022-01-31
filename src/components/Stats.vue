<template>
  <div class="stats">
    <p class="stats__text">Количество символов: {{ count }}</p>
    <p class="stats__text">Покрытие словаря: {{ total }}</p>
    <ul class="stats__container">
      <div class="stats__column" v-for="(column, index) in columns" :key="index">
        <li class="stats__item" v-for="entry in column" :key="entry.char">
          <div class="detail">
            <div class="detail__name">{{ entry.char }}</div>
            <div class="detail__percent">{{ entry.frequency }}</div>
          </div>
        </li>
      </div>
    </ul>
    <FrequencyChart
      title="Частота появления букв"
      :labels="labels"
      :current="current"
      :previous="previous"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FrequencyChart from '@/components/FrequencyChart.vue';
import { countChars, round, wrapBy } from '@/modules/utils';

interface Detail {
  char: string;
  frequency: number;
}

export default defineComponent({
  name: 'Stats',
  props: {
    dictionary: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    encoded: {
      type: String,
      default: () => '',
    },
    decoded: {
      type: String,
      default: () => '',
    },
  },
  components: {
    FrequencyChart,
  },
  data() {
    return {
      previous: [...this.dictionary].map((char) => ({ x: char, y: 0 })),
    };
  },
  watch: {
    current(current, previous) {
      this.previous = previous;
    },
  },
  computed: {
    count(): number {
      return this.text.length;
    },
    details(): Detail[] {
      const chars = [...this.dictionary];
      const store = this.encoded !== null ? countChars(this.encoded) : new Map();

      return chars.reduce<Detail[]>((accumulator, char) => {
        accumulator.push({
          char,
          frequency: store.get(char) || 0,
        });

        return accumulator;
      }, []);
    },
    labels(): string[] {
      return this.details.map((entry) => entry.char);
    },
    current(): { x: string; y: number }[] {
      return this.details.map((detail) => ({ x: detail.char, y: detail.frequency }));
    },
    total(): number {
      return round(
        this.details.reduce((accumulator, entry) => accumulator + entry.frequency, 0),
        3
      );
    },
    columns(): Detail[][] {
      return wrapBy(this.details, 4);
    },
  },
});
</script>

<style lang="scss" scoped>
.stats {
  padding: 16px;
  gap: 8px;
  display: grid;
  grid-auto-rows: max-content;

  &__text {
    margin: 0;
  }

  &__container {
    margin: 0;
    padding: 0;
    gap: 2px 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  &__column {
    gap: 2px;
    display: grid;
    grid-auto-rows: max-content;
  }

  &__item {
    list-style: none;
  }
}

.detail {
  display: grid;
  grid-template-columns: max-content 1fr;

  &__name {
    width: 20px;
    padding: 4px;
    text-align: center;
    background-color: var(--primary-color);
    color: #ffffff;
  }

  &__percent {
    padding: 4px;
    background-color: #eeeeee;
  }
}
</style>
