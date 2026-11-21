<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Patrocinador" />

      <!--FORM-->
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <SponsorForm
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
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import SponsorForm from "@/components/SponsorForm.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage,
    SponsorForm
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    add(sponsor) {
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, sponsor).then(
        () => {
          this.$alert(this.getMessage, "Patrocinador adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
