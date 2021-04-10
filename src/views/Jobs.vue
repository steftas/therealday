<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="12" md="10" offset-md="1">
        <div class="about">
          <Header />

          <h2 class="my-5 text-center border-bottom">Jobs</h2>

          <v-data-table
            :headers="headers"
            :items="jobs.data"
            item-key="id"
            class="elevation-1"
            :server-items-length="totalJobs"
            :options.sync="options"
            :footer-props="footerProps"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item="props">
              <tr>
                <td>
                  {{
                    props.item.user.first_name + " " + props.item.user.last_name
                  }}
                </td>
                <td>{{ props.item.jobRequest.jobType.name }}</td>
                <td>{{ props.item.client.name }}</td>
                <td>
                  {{ props.item.start_time | dateFormat("DD MMM, YYYY HH:mm") }}
                </td>
                <td>
                  {{ props.item.end_time | dateFormat("DD MMM, YYYY HH:mm") }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "../plugins/axios";
import Header from "@/components/Header";

export default {
  name: "Jobs",
  components: {
    Header,
  },

  data: () => ({
    jobs: {
      items: [],
    },
    headers: [
      {
        text: "User name",
        value: "name",
        sortable: false,
      },
      {
        text: "Job name",
        value: "job",
        sortable: false,
      },
      { text: "Client name", value: "client", sortable: false },
      { text: "Start time", value: "startTime", sortable: false },
      { text: "End time", value: "endTime", sortable: false },
    ],
    totalJobs: 0,
    footerProps: {
      "items-per-page-options": [5, 10, 15, 20, 25, 30, 40, 50, 70, 100],
      "show-current-page": true,
      "show-first-last-page": true,
    },
    loading: true,
    options: {
      itemsPerPage: 20,
    },
  }),
  watch: {
    options: {
      handler() {
        this.onGetJobs();
      },
      deep: true,
    },
  },
  methods: {
    onGetJobs() {
      this.loading = true;

      const { page, itemsPerPage } = this.options;

      const params = `?order_by=start_time&include=client.jobRequest,jobRequest.jobType,user&page=${page}&per_page=${itemsPerPage}`;
      http
        .get(`jobs${params}`)
        .then((response) => {
          this.jobs = { ...response.data };
          this.loading = false;
          this.totalJobs = this.jobs.meta.pagination.total;
        })
        .catch((err) => {
          this.$store.dispatch("showError", err);
          this.loading = false;
        });
    },
  },
};
</script>
