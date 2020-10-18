<template>
    <div class="container">
        <textarea class="container__textarea" v-model="text">Введите Ваш текст</textarea>
        <div class="container__area">
            <div class="container__controls">
                <label class="label">
                    Словарь:
                    <input class="control" type="text" v-model="dictionary" />
                </label>
                <label class="label">
                    Смещение:
                    <input class="control" type="number" v-model="offset" />
                </label>
            </div>
            <Stats :dictionary="dictionary" :text="text" :encoded="encoded" :decoded="decoded" />
            <Cipher :dictionary="dictionary" :encoded="encoded" :decoded="decoded" :offset="offset" />
        </div>
    </div>
</template>

<script>
import { watchEffect } from 'vue';
import Stats from '@/components/Stats.vue';
import Cipher from '@/components/Cipher.vue';
import cipher, { Mode } from '@/modules/caesar-cipher';
import { get } from '@/api';

export default {
    name: 'Home',
    components: {
        Stats,
        Cipher
    },
    data() {
        return {
            text: '',
            dictionary: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*;:()_+-., ',
            offset: 2
        };
    },
    computed: {
        encoded() {
            return cipher({
                string: this.text,
                offset: this.offset,
                dictionary: this.dictionary
            });
        },
        decoded() {
            return cipher({
                string: this.encoded,
                offset: this.offset,
                dictionary: this.dictionary,
                mode: Mode.Decode
            });
        }
    },
    mounted() {
        watchEffect(
            onInvalidate => {
                const [response, controller] = get('text.txt');
                response.then(text => {
                    this.text = text;
                });

                onInvalidate(() => controller.abort());
            },
            {
                flush: 'post'
            }
        );
    }
};
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    gap: 1px;
    display: grid;
    grid-template-columns: 480px 1fr;
    grid-template-rows: 100%;
    background: #111111;
    overflow: hidden;

    &__area {
        background: #ffffff;
        overflow: auto;
    }

    &__textarea {
        width: 100%;
        height: 100%;
        padding: 16px;
        border: none;
        box-sizing: border-box;
        resize: none;

        &:focus {
            outline: none;
        }
    }

    &__controls {
        padding: 16px;
        gap: 8px;
        display: grid;
        grid-auto-rows: max-content;
    }
}

.label {
    gap: 8px;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
}

.control {
    padding: 4px 8px;
    font: inherit;
}
</style>
