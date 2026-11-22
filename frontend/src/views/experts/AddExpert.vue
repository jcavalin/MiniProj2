<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <ExpertForm
            submitText="ADICIONAR"
            submitIcon="plus-square"
            @save="add"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import ExpertForm from "@/components/ExpertForm.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage,
    ExpertForm
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    add(expert) {
      this.$store.dispatch(`expert/${ADD_EXPERT}`, expert).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
