<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Patrocinador" />

      <!--FORM (mostrado depois de ler o patrocinador da API)-->
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <SponsorForm
            v-if="sponsor"
            :sponsor="sponsor"
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
import {
  FETCH_SPONSOR,
  EDIT_SPONSOR
} from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import SponsorForm from "@/components/SponsorForm.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage,
    SponsorForm
  },
  data: function() {
    return {
      sponsor: null
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    update(form) {
      const payload = { ...form, _id: this.sponsor._id };
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, payload).then(
        () => {
          this.$alert(this.getMessage, "Patrocinador atualizado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.$store
      .dispatch(`sponsor/${FETCH_SPONSOR}`, this.$route.params.sponsorId)
      .then(
        sponsor => {
          this.sponsor = sponsor;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
          router.push({ name: "listSponsors" });
        }
      );
  }
};
</script>
