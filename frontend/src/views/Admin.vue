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
            <!-- Lugar do cartão Especialistas (fatia E1), para o cartão acima manter a largura dos outros -->
            <b-card class="invisible d-none d-sm-flex"></b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  }
};
</script>