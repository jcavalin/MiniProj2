<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <!--FORM (mostrado depois de ler o especialista da API)-->
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <ExpertForm
            v-if="expert"
            :expert="expert"
            submitText="GUARDAR"
            submitIcon="save"
            @save="update"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_EXPERT, EDIT_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import ExpertForm from "@/components/ExpertForm.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",
  components: {
    HeaderPage,
    ExpertForm
  },
  data: function() {
    return {
      expert: null
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    update(form) {
      const payload = { ...form, _id: this.expert._id };
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, payload).then(
        () => {
          this.$alert(this.getMessage, "Especialista atualizado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.$store
      .dispatch(`expert/${FETCH_EXPERT}`, this.$route.params.expertId)
      .then(
        expert => {
          this.expert = expert;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
          router.push({ name: "listExperts" });
        }
      );
  }
};
</script>
