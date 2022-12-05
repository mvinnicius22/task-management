<template>
    <v-row class="pl-3 mt-3">
        <p class='pt-2 text-gray-700 font-semibold font-sans tracking-wide text-lg'>Projetos</p>
        <v-card-actions class="pt-0">
            <v-btn
                text
                color="blue darken-1"
                @click="showProject()"
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
            <v-card
                flat
                tile
                class="mx-auto before"
                max-width="400"
            >
                <v-row class="pt-4">
                    <v-col cols="3">
                        <v-img width="75" class="mt-1 ml-2" :src="getImageLink(item.id)"></v-img>
                    </v-col>
                    <v-col cols="9">
                        <p class='ma-0 text-gray-700 font-semibold font-sans tracking-wide text-lg'>{{ item.nome }}</p>
                        <span class='pb-0 ma-0 text-sm text-gray-600'>{{ item.descricao }}</span>
                        <br />
                        <span class='ma-0 text-sm text-gray-600'># {{ item.id }}</span>
                    </v-col>
                </v-row>
                <v-card-actions class="pb-0 justify-end">
                    <v-btn
                        text
                        color="blue darken-1"
                        @click="goToBoard(item.id)"
                    >
                        Explore
                    </v-btn>
                    <v-btn
                        icon
                        @click="showProject(item.id)"
                    >
                    <v-icon color="grey lighten-1">
                        mdi-pencil-outline
                    </v-icon>
                    </v-btn>
                    <v-btn
                        class="mr-2 ml-0"
                        icon
                        @click="deleteProject(item.id)"
                    >
                    <v-icon color="grey lighten-1">
                        mdi-delete-outline
                    </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <project-form
        v-if="showProjectForm"
        :project-id="projectId"
        @close="closeProject"
        @saved="[
            notify(),
            closeProject(),
            fetchProjects(),
        ]"
    ></project-form>
    <v-snackbar
        v-model="dialog.show"
        :color="dialog.color"
        :timeout="5000"
        text
    >
        {{ dialog.message }}
    </v-snackbar>
</template>

<script>
import projectApi from '../../assets/js/api/project.js';
import projectForm from '../../components/Form/ProjectForm.vue';

export default {

    components: {
        projectForm,
    },

    data: () => ({
        items: [],
        showDeleteAlert: false,
        showProjectForm: false,
        projectId: null,
        loading: true,
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

        deleteProject(id) {
            const confirmBtn = confirm("Deseja remover o projeto?");
            if (! confirmBtn) return;
 
            projectApi.deleteProject(id).then(() => {
                this.fetchProjects();
            });
        },

        showProject(id = null) {
            this.showProjectForm = true;
            this.projectId = id;
        },

        closeProject() {
            this.showProjectForm = false;
        },

        notify(message = null) {
            this.alertSuccess(message || 'Operação realizada com sucesso!');
        },

        getImageLink(id) {
            return 'https://picsum.photos/seed/' + id + '/75';
        },

        goToBoard(id) {
            this.$router.push({ name: 'board', params: { id: id } });
        },
    }
}
</script>

<style>
.before:before {
    content: "";
    position: absolute;
    background-color: #E2E2E2;
    width: 18px;
    height: 100%;
    left: 0;
    top: 0;
}
.before:hover{
    /* cursor: pointer; */
    background-color: #F6F6F5;
}
.before:hover:before {
    width: 25px;
    transition: 0.2s;  
}
</style>