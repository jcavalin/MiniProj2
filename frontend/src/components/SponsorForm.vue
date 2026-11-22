<template>
  <!-- Formulário de patrocinador, partilhado por AddSponsor.vue e EditSponsor.vue -->
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
      <label for="sltType" class="sr-only">Tipo</label>
      <select
        id="sltType"
        v-model="form.type"
        class="form-control form-control-lg"
        required
      >
        <option value>-- SELECIONA TIPO --</option>
        <option value="Empresa">EMPRESA</option>
        <option value="Particular">PARTICULAR</option>
      </select>
    </div>
    <div class="form-group">
      <label for="txtLogo" class="sr-only">Link para o logótipo</label>
      <input
        id="txtLogo"
        v-model.trim="form.logo"
        type="url"
        class="form-control form-control-lg"
        placeholder="escreve link para o logótipo"
      />
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
    <div class="form-group">
      <AnimalTagsInput
        v-model="form.animals"
        :options="activeAnimals"
        label="Animais patrocinados"
        placeholder="escreve para pesquisar animais"
        required
      />
      <small class="form-text text-muted"
        >escreve para pesquisar animais patrocinados</small
      >
    </div>
    <div class="acoes-form">
      <button type="submit" class="btn btn-outline-success btn-lg mr-2 mb-2">
        <i :class="'fas fa-' + submitIcon"></i> {{ submitText }}
      </button>
      <router-link
        :to="{ name: 'listSponsors' }"
        tag="button"
        class="btn btn-outline-danger btn-lg mb-2"
      >
        <i class="fas fa-window-close"></i> CANCELAR
      </router-link>
    </div>
  </form>
</template>

<script>
import AnimalTagsInput from "@/components/AnimalTagsInput.vue";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { mapGetters } from "vuex";

export default {
  name: "SponsorForm",
  components: {
    AnimalTagsInput
  },
  props: {
    // Valores iniciais (vazio ao adicionar; o patrocinador ao editar)
    sponsor: { type: Object, default: () => ({}) },
    submitText: { type: String, default: "ADICIONAR" },
    submitIcon: { type: String, default: "plus-square" }
  },
  data() {
    return {
      form: {
        name: this.sponsor.name || "",
        type: this.sponsor.type || "",
        logo: this.sponsor.logo || "",
        email: this.sponsor.email || "",
        // A API devolve os animais preenchidos ({ _id, name }); o formulário só guarda os identificadores
        animals: (this.sponsor.animals || []).map(
          animal => animal._id || animal
        )
      }
    };
  },
  computed: {
    ...mapGetters("animal", ["getAnimals"]),
    // Só se podem escolher animais ativos; ao editar, os que o patrocinador já tinha
    // continuam visíveis (e removíveis) mesmo que entretanto tenham sido desativados
    activeAnimals() {
      const initial = (this.sponsor.animals || []).map(
        animal => animal._id || animal
      );
      return this.getAnimals
        .filter(animal => animal.active || initial.includes(animal._id))
        .sort((a1, a2) => a1.name.localeCompare(a2.name, "pt"));
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
