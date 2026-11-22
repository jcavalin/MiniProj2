<template>
  <!-- Formulário de especialista, partilhado por AddExpert.vue e EditExpert.vue -->
  <form @submit.prevent="submit">
    <div class="form-group">
      <label for="txtName" class="sr-only">Nome</label>
      <input
        id="txtName"
        v-model.trim="form.name"
        type="text"
        class="form-control form-control-lg"
        placeholder="escreve nome"
        required
      />
    </div>
    <div class="form-group">
      <label for="txtInstitution" class="sr-only">Instituição</label>
      <input
        id="txtInstitution"
        v-model.trim="form.institution"
        type="text"
        class="form-control form-control-lg"
        placeholder="escreve instituição"
        required
      />
    </div>
    <div class="form-group">
      <label for="sltArea" class="sr-only">Área (grupo de animais)</label>
      <select
        id="sltArea"
        v-model="form.area"
        class="form-control form-control-lg"
        required
      >
        <option value>-- SELECIONA ÁREA (GRUPO) --</option>
        <option v-for="group in groups" :key="group" :value="group">
          {{ group.toUpperCase() }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="txtEmail" class="sr-only">Email de contacto</label>
      <input
        id="txtEmail"
        v-model.trim="form.email"
        type="email"
        class="form-control form-control-lg"
        placeholder="escreve email de contacto"
        required
      />
    </div>
    <div class="acoes-form">
      <button type="submit" class="btn btn-outline-success btn-lg mr-2 mb-2">
        <i :class="'fas fa-' + submitIcon"></i> {{ submitText }}
      </button>
      <router-link
        :to="{ name: 'listExperts' }"
        tag="button"
        class="btn btn-outline-danger btn-lg mb-2"
      >
        <i class="fas fa-window-close"></i> CANCELAR
      </router-link>
    </div>
  </form>
</template>

<script>
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { mapGetters } from "vuex";

export default {
  name: "ExpertForm",
  props: {
    // Valores iniciais (vazio ao adicionar; o especialista ao editar)
    expert: { type: Object, default: () => ({}) },
    submitText: { type: String, default: "ADICIONAR" },
    submitIcon: { type: String, default: "plus-square" }
  },
  data() {
    return {
      form: {
        name: this.expert.name || "",
        institution: this.expert.institution || "",
        area: this.expert.area || "",
        email: this.expert.email || ""
      }
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals"]),
    // As áreas possíveis são os grupos dos animais (sem repetições, por ordem alfabética);
    // ao editar, a área atual continua na lista mesmo que já não haja animais desse grupo
    groups() {
      const groups = new Set(this.getAnimals.map(animal => animal.group));
      if (this.expert.area) groups.add(this.expert.area);
      return [...groups]
        .filter(Boolean)
        .sort((g1, g2) => g1.localeCompare(g2, "pt"));
    }
  },
  methods: {
    submit() {
      this.$emit("save", { ...this.form });
    }
  },
  created() {
    this.$store.dispatch(`animal/${FETCH_ANIMALS}`).catch(err => {
      this.$alert(`${err.message}`, "Erro", "error");
    });
  }
};
</script>
