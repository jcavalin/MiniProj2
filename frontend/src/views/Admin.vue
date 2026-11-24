<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Gestão do Animalec"/>

      <b-row>
        <!-- Coluna central: 4/12 no browser, largura total no mobile (Mockup 1) -->
        <b-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4">
          <b-card-group deck>
            <AdminOptionBox routeName="listUsers" iconName="users" title="Utilizadores"/>
            <AdminOptionBox routeName="listAnimals" iconName="dog"  title="Animais"/>
          </b-card-group>
          <b-card-group deck class="mt-3">
            <AdminOptionBox routeName="listQuizzes" iconName="file-alt"  title="Quizzes"/>
            <AdminOptionBox routeName="listQuestions" iconName="question-circle"  title="Questões"/>
          </b-card-group>
          <b-card-group deck class="mt-3">
            <AdminOptionBox routeName="listSponsors" iconName="hand-holding-heart"  title="Patrocinadores"/>
            <AdminOptionBox routeName="listExperts" iconName="user-graduate"  title="Especialistas"/>
          </b-card-group>
          <!-- O administrador não tem página de perfil, por isso o logout fica aqui (igual ao do Profile.vue) -->
          <div class="text-center mt-4">
            <b-button variant="outline-danger" @click="logout()">
              <i class="fas fa-sign-out-alt"></i> LOGOUT
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  },
  methods: {
    logout() {
      this.$confirm(
        "Se sim, clique em OK",
        "Queres mesmo sair do Animalec?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.commit(`auth/${AUTH_LOGOUT_SUCCESS}`);
          this.$router.push({ name: "home" });
        },
        () => {
          this.$alert("Estás de volta!", "Informação", "info");
        }
      );
    }
  }
};
</script>
