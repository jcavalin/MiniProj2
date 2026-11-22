<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="12" md="8" offset-md="2">
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
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
              Lista de patrocinadores
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
                <th scope="col">TIPO</th>
                <th scope="col">N.º ANIMAIS</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sponsor of filteredSponsors" :key="sponsor._id">
                <td class="pt-4 nome">{{ sponsor.name }}</td>
                <td class="pt-4 resumo">{{ sponsor.type }}</td>
                <td class="pt-4 resumo">
                  {{ sponsor.animals.length
                  }}<span class="d-md-none">
                    {{
                      sponsor.animals.length === 1 ? "animal" : "animais"
                    }}</span
                  >
                </td>
                <td class="acoes">
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: sponsor._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="viewSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeSponsor(sponsor._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="filteredSponsors.length === 0" class="text-muted">
            Nenhum patrocinador encontrado.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import {
  FETCH_SPONSORS,
  REMOVE_SPONSOR
} from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

// Texto em minúsculas e sem acentos, para a pesquisa ignorar maiúsculas e acentuação
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Escapa o texto escrito pelos utilizadores antes de o p\u00f4r no HTML da janela
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
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
      return this.sponsors.filter(sponsor =>
        normalizar(sponsor.name).includes(procura)
      );
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
    },

    // Janela de detalhe (Mockup 6), no estilo de viewAnimal em ListAnimals.vue
    viewSponsor(id) {
      const sponsor = this.sponsors.find(sponsor => sponsor._id === id);
      const options = {
        // titleText (e não title): o nome é mostrado como texto, nunca interpretado como HTML
        titleText: sponsor.name,
        html: this.generateTemplate(sponsor)
      };
      if (sponsor.logo) {
        options.imageUrl = sponsor.logo;
        options.imageHeight = 110;
        options.imageAlt = `Logótipo de ${sponsor.name}`;
      } else {
        // A caixa que substitui o logótipo vai para o lugar da imagem, acima do título
        options.onBeforeOpen = popup => {
          const placeholder = popup.querySelector(".logo-placeholder");
          const title = popup.querySelector(".swal2-title");
          if (placeholder && title)
            title.parentNode.insertBefore(placeholder, title);
        };
      }
      this.$fire(options);
    },

    generateTemplate(sponsor) {
      // Sem logótipo, mostra uma caixa com o nome no lugar da imagem
      const placeholder = sponsor.logo
        ? ""
        : `<div class="logo-placeholder" aria-hidden="true">${escapar(
            sponsor.name
          )}</div>`;
      const animals = sponsor.animals
        .map(animal =>
          animal.active
            ? escapar(animal.name)
            : `${escapar(animal.name)} (inativo)`
        )
        .join(", ");
      return `${placeholder}
          <h4>Tipo: ${escapar(sponsor.type)}</h4>
          <p>Email: <a href="mailto:${escapar(sponsor.email)}">${escapar(
        sponsor.email
      )}</a></p>
          <p>Animais patrocinados: ${animals || "nenhum"}</p>
        `;
    },

    // Confirmação antes de remover (Mockup 8), como removeAnimal em ListAnimals.vue
    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(
            () => {
              this.$alert(this.getMessage, "Patrocinador removido!", "success");
              this.fetchSponsors();
            },
            err => {
              this.$alert(`${err.message}`, "Erro", "error");
              this.fetchSponsors();
            }
          );
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchSponsors();
  }
};
</script>
