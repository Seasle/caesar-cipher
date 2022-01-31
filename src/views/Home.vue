<template>
  <div class="container">
    <textarea
      class="container__textarea"
      v-model="text"
      placeholder="Введите Ваш текст"
      spellcheck="false"
    >
    </textarea>
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
        <label class="label">
          Инверсия:
          <input class="control" type="checkbox" v-model="inverse" />
        </label>
      </div>
      <Stats :dictionary="dictionary" :text="text" :encoded="encoded" :decoded="decoded" />
      <Cipher :dictionary="dictionary" :encoded="encoded" :decoded="decoded" :offset="offset" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import Stats from '@/components/Stats.vue';
import Cipher from '@/components/Cipher.vue';
import cipher, { Mode } from '@/modules/caesar-cipher';
import { get } from '@/api';

export default defineComponent({
  name: 'Home',
  components: {
    Stats,
    Cipher,
  },
  data() {
    return {
      text: '',
      dictionary:
        'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*;:()_+-., ',
      offset: 2,
      inverse: false,
    };
  },
  computed: {
    encoded(): string {
      return cipher({
        string: this.text,
        offset: this.offset,
        dictionary: this.dictionary,
        mode: !this.inverse ? Mode.Encode : Mode.Decode,
      });
    },
    decoded(): string {
      return cipher({
        string: this.encoded,
        offset: this.offset,
        dictionary: this.dictionary,
        mode: !this.inverse ? Mode.Decode : Mode.Encode,
      });
    },
  },
  mounted() {
    watchEffect(
      (onInvalidate) => {
        const [response, controller] = get('text.txt');
        response.then((text) => {
          this.text = text;
        });

        onInvalidate(() => controller.abort());
      },
      { flush: 'post' }
    );
  },
});
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
    overflow: hidden auto;
  }

  &__textarea {
    width: 100%;
    height: 100%;
    padding: 16px;
    border: none;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
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
  border: 1px solid #666666;
  font-family: inherit;
  font-size: inherit;
}
</style>
