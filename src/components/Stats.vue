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
        <Chart
            title="Частота появления букв"
            type="bar"
            :data="current"
            :previous="previous"
            :labels="labels"
            :options="chartOptions"
        />
    </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import { countChars, round, wrapBy } from '@/modules/utils';

export default {
    name: 'Stats',
    props: {
        dictionary: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        encoded: {
            type: String,
            default: () => ''
        },
        decoded: {
            type: String,
            default: () => ''
        }
    },
    components: {
        Chart
    },
    data() {
        return {
            previous: [...this.dictionary].map(() => 0),
            chartOptions: {
                scales: {
                    xAxes: [
                        {
                            stacked: true
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 1
                            }
                        }
                    ]
                }
            }
        };
    },
    watch: {
        current(current, previous) {
            this.previous = previous;
        }
    },
    computed: {
        count() {
            return this.text.length;
        },
        details() {
            const chars = [...this.dictionary];
            const count = this.encoded !== null ? this.encoded.length : 0;
            const store = this.encoded !== null ? countChars(this.encoded) : new Map();

            return chars.reduce((accumulator, char) => {
                if (store.has(char)) {
                    accumulator.push({
                        char,
                        frequency: round(store.get(char) / count, 5)
                    });
                } else {
                    accumulator.push({
                        char,
                        frequency: 0
                    });
                }

                return accumulator;
            }, []);
        },
        labels() {
            return this.details.map(entry => entry.char);
        },
        current() {
            return this.details.map(entry => entry.frequency);
        },
        total() {
            return round(
                this.details.reduce((accumulator, entry) => accumulator + entry.frequency, 0),
                3
            );
        },
        columns() {
            return wrapBy(this.details, 4);
        }
    }
};
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
