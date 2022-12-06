<template>
    <v-row class="pl-3 mt-3">
        <p class='pt-2 text-gray-700 font-semibold font-sans tracking-wide text-lg'>Projetos</p>
        <v-card-actions class="pt-0">
            <v-btn
                text
                color="blue darken-1"
                @click="showProjectForm = true"
            >
                <v-icon
                    left
                    dark
                >
                    mdi-plus
                    </v-icon>
                Novo projeto
            </v-btn>
        </v-card-actions>
    </v-row>
    <v-row v-if="!loading" class="mt-1">
        <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
        >
            <project-card
                :project="item"
                @fetch="[
                    fetchProjects(),
                    reloadTasks(),
                ]"
            />
        </v-col>
    </v-row>
    <project-form
        v-if="showProjectForm"
        @close="showProjectForm = false"
        @saved="[
            notify('Projeto criado com sucesso!'),
            fetchProjects(),
            showProjectForm = false,
        ]"
    ></project-form>
</template>

<script>
import projectApi from '../../assets/js/api/project.js';
import projectCard from '../../components/Card/ProjectCard.vue';
import projectForm from '../../components/Form/ProjectForm.vue';

export default {

    emits: ['reload'],

    components: {
        projectCard,
        projectForm,
    },

    data: () => ({
        items: [],
        loading: true,
        showProjectForm: false,
    }),

    created() {
        this.fetchProjects();
    },

    methods: {
        fetchProjects() {
            this.loading = true;
            projectApi.fetchProjects().then((response) => {
                this.items = response.data;
            }).finally(() => {
                this.loading = false;
            });
        },

        reloadTasks() {
            this.$emit('reload');
        },

        notify(message = null) {
            this.alertSuccess(message || 'Operação realizada com sucesso!');
        },
    }
}
</script>