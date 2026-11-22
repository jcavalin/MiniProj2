<template>
  <!-- Autocomplete de seleção múltipla: cada animal escolhido aparece como etiqueta removível -->
  <div class="animal-tags">
    <div class="tags" @click="$refs.campo.focus()">
      <span v-for="animal in selected" :key="animal._id" class="chip">
        {{ animal.name }}
        <button
          type="button"
          :aria-label="'Retirar ' + animal.name"
          @click.stop="remove(animal._id)"
        >
          &times;
        </button>
      </span>
      <input
        ref="campo"
        v-model="term"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="String(suggestions.length > 0)"
        :aria-controls="listId"
        :aria-activedescendant="active >= 0 ? listId + '-' + active : null"
        :aria-label="label"
        :placeholder="placeholder"
        autocomplete="off"
        @input="active = 0"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="choose(suggestions[active])"
        @keydown.esc="term = ''"
        @keydown.delete="removeLast"
      />
    </div>
    <ul
      v-show="suggestions.length"
      :id="listId"
      class="sugestoes"
      role="listbox"
      :aria-label="'Sugestões: ' + label"
    >
      <li
        v-for="(animal, index) in suggestions"
        :id="listId + '-' + index"
        :key="animal._id"
        role="option"
        :aria-selected="String(index === active)"
        @mousedown.prevent="choose(animal)"
      >
        {{ animal.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { normalizar } from "@/utils/texto";

let contador = 0;

export default {
  name: "AnimalTagsInput",
  props: {
    // Identificadores dos animais escolhidos (v-model)
    value: { type: Array, default: () => [] },
    // Animais que se podem escolher: [{ _id, name }]
    options: { type: Array, default: () => [] },
    label: { type: String, default: "Animais" },
    placeholder: { type: String, default: "" },
    required: { type: Boolean, default: false }
  },
  data() {
    return {
      term: "",
      active: 0,
      listId: `sugestoes-animais-${++contador}`
    };
  },
  computed: {
    selected() {
      return this.value
        .map(id => this.options.find(animal => animal._id === id))
        .filter(animal => animal);
    },
    suggestions() {
      const procura = normalizar(this.term.trim());
      if (!procura) return [];
      return this.options.filter(
        animal =>
          normalizar(animal.name).includes(procura) &&
          !this.value.includes(animal._id)
      );
    }
  },
  watch: {
    // Sem animais escolhidos, o formulário não é submetido (validação nativa do browser)
    value: { handler: "updateValidity", immediate: true }
  },
  mounted() {
    this.updateValidity();
  },
  methods: {
    move(step) {
      const total = this.suggestions.length;
      if (total) this.active = (this.active + step + total) % total;
    },
    choose(animal) {
      if (!animal) return;
      this.$emit("input", [...this.value, animal._id]);
      this.term = "";
      this.active = 0;
    },
    remove(id) {
      this.$emit("input", this.value.filter(animalId => animalId !== id));
      this.$refs.campo.focus();
    },
    removeLast(event) {
      if (event.key === "Backspace" && !this.term && this.value.length) {
        this.$emit("input", this.value.slice(0, -1));
      }
    },
    updateValidity() {
      if (!this.$refs.campo) return;
      const vazio = this.required && this.value.length === 0;
      this.$refs.campo.setCustomValidity(
        vazio ? "Escolhe pelo menos um animal." : ""
      );
    }
  }
};
</script>

<style scoped>
.tags {
  border: 1px solid #ced4da;
  border-radius: 0.3rem;
  padding: 6px 8px;
  min-height: 50px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: text;
}
.tags:focus-within {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.tags input {
  border: 0;
  outline: 0;
  flex: 1;
  min-width: 8rem;
  font-size: 1.25rem;
  padding: 4px;
}
.chip {
  display: inline-flex;
  align-items: center;
  background: #1abc9c;
  color: #fff;
  border-radius: 14px;
  padding: 3px 10px;
  margin: 3px;
}
.chip button {
  background: none;
  border: 0;
  color: #fff;
  margin-left: 4px;
  padding: 0;
  line-height: 1;
  cursor: pointer;
}
.sugestoes {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ced4da;
  border-top: 0;
  border-radius: 0 0 0.3rem 0.3rem;
  background: #fff;
}
.sugestoes li {
  padding: 8px 14px;
  cursor: pointer;
}
.sugestoes li:hover,
.sugestoes li[aria-selected="true"] {
  background: #e9ecef;
}
</style>
