<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="12" md="8" offset-md="2">
          <router-link
            :to="{name:'admin'}"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2 btn-menu-principal"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
          <form class="mt-3" role="search" @submit.prevent>
            <label for="pesquisa" class="sr-only">Pesquisar por nome</label>
            <input
              id="pesquisa"
              v-model="filterName"
              type="search"
              class="form-control campo-pesquisa"
              placeholder="pesquisa por nome"
            />
          </form>
        </b-col>
      </b-row>

      <!--TABELA (cartões no mobile, ver assets/css/backoffice.css)-->
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <table class="table table-striped tabela-responsiva">
            <caption class="sr-only">Lista de patrocinadores</caption>
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">TIPO</th>
                <th scope="col">N.º ANIMAIS</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sponsor of filteredSponsors" :key="sponsor._id">
                <td class="pt-4 nome">{{sponsor.name}}</td>
                <td class="pt-4 resumo">{{sponsor.type}}</td>
                <td class="pt-4 resumo">
                  {{sponsor.animals.length}}<span class="d-md-none"> {{sponsor.animals.length === 1 ? "animal" : "animais"}}</span>
                </td>
                <td class="acoes">
                  <!-- Os botões EDITAR, VER e REMOVER chegam nas fatias seguintes (P3, P4 e P5) -->
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="filteredSponsors.length === 0" class="text-muted">Nenhum patrocinador encontrado.</p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_SPONSORS } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

// Texto em minúsculas e sem acentos, para a pesquisa ignorar maiúsculas e acentuação
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default {
  name: "ManageSponsors",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sponsors: [],
      filterName: "",
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"]),
    filteredSponsors() {
      const procura = normalizar(this.filterName.trim());
      return this.sponsors.filter(sponsor => normalizar(sponsor.name).includes(procura));
    }
  },
  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = [...this.getSponsors].sort(this.compareNames);
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.sortType *= -1;
      this.sponsors.sort(this.compareNames);
    },
    compareNames(s1, s2) {
      return s1.name.localeCompare(s2.name, "pt") * this.sortType;
    }
  },
  created() {
    this.fetchSponsors();
  }
};
</script>
