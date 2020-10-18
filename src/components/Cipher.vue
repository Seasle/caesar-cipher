<template>
    <div class="cipher">
        <p class="cipher__text">
            Словарь: <code class="cipher__code">{{ dictionary }}</code>
        </p>
        <p class="cipher__text">
            Смещение: <code class="cipher__code">{{ offset }}</code>
        </p>
        <div class="cipher__wrapper">
            <Table :data="[chars, offsetedChars]">
                <template v-slot:cell="props">
                    <pre class="cipher__code">{{ props.entry }}</pre>
                </template>
            </Table>
        </div>
        <Tabs>
            <template v-slot:buttons>
                <TabButton name="encoded">Зашифрованный текст</TabButton>
                <TabButton name="decoded">Дешифрованный текст</TabButton>
            </template>
            <template v-slot:containers>
                <TabContent name="encoded">
                    <pre class="cipher__text">{{ encoded }}</pre>
                </TabContent>
                <TabContent name="decoded">
                    <pre class="cipher__text">{{ decoded }}</pre>
                </TabContent>
            </template>
        </Tabs>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Tabs from '@/components/Tabs.vue';
import TabButton from '@/components/TabButton.vue';
import TabContent from '@/components/TabContent.vue';

export default {
    name: 'Cipher',
    props: {
        dictionary: {
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
        },
        offset: {
            type: [String, Number],
            required: true
        }
    },
    components: {
        Table,
        Tabs,
        TabButton,
        TabContent
    },
    computed: {
        chars() {
            return [...this.dictionary];
        },
        count() {
            return this.chars.length;
        },
        offsetedChars() {
            const normalizedOffset = (Math.abs(this.offset) % this.count) * Math.sign(this.offset);

            return this.chars.map((value, index, array) => {
                const normalizedIndex = normalizedOffset >= 0 ? index : index + this.count;

                return array[(normalizedIndex + normalizedOffset) % this.count];
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.cipher {
    padding: 16px;
    gap: 8px;
    display: grid;
    grid-auto-rows: max-content;

    &__text {
        margin: 0;
    }

    &__code {
        margin: 0;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 4px;
        font-family: monospace;
        white-space: pre-wrap;
        background-color: var(--primary-color);
        color: #ffffff;
    }

    &__wrapper {
        margin: 0 -16px;
        padding: 0 16px;
    }
}
</style>
