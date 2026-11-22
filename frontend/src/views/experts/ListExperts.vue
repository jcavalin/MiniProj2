<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="12" md="8" offset-md="2">
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA
          </router-link>
          <router-link
            :to="{ name: 'admin' }"
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
            <caption class="sr-only">
              Lista de especialistas
            </caption>
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">INSTITUIÇÃO</th>
                <th scope="col">ÁREA</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expert of filteredExperts" :key="expert._id">
                <td class="pt-4 nome">{{ expert.name }}</td>
                <td class="pt-4 detalhe">{{ expert.institution }}</td>
                <td class="pt-4 detalhe">
                  <span class="d-md-none">Área: </span
                  >{{ capitalizar(expert.area) }}
                </td>
                <td class="acoes">
                  <!-- Os botões EDITAR, VER e REMOVER chegam nas fatias seguintes (E3, E4 e E5) -->
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="filteredExperts.length === 0" class="text-muted">
            Nenhum especialista encontrado.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_EXPERTS } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import { normalizar, capitalizar } from "@/utils/texto";

export default {
  name: "ManageExperts",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      experts: [],
      filterName: "",
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"]),
    filteredExperts() {
      const procura = normalizar(this.filterName.trim());
      return this.experts.filter(expert =>
        normalizar(expert.name).includes(procura)
      );
    }
  },
  methods: {
    capitalizar,
    fetchExperts() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
        () => {
          this.experts = [...this.getExperts].sort(this.compareNames);
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.sortType *= -1;
      this.experts.sort(this.compareNames);
    },
    compareNames(e1, e2) {
      return e1.name.localeCompare(e2.name, "pt") * this.sortType;
    }
  },
  created() {
    this.fetchExperts();
  }
};
</script>
