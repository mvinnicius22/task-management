<template>
    <v-card
        flat
        tile
        class="mx-auto before"
        max-width="400"
    >
        <v-row class="pt-4">
            <v-col cols="3">
                <v-img width="75" class="mt-1 ml-2" :src="getImageLink(project.id)"></v-img>
            </v-col>
            <v-col cols="9">
                <p class='ma-0 text-gray-700 font-semibold font-sans tracking-wide text-lg'>{{ project.nome }}</p>
                <span class='pb-0 ma-0 text-sm text-gray-600 descricao'>{{ project.descricao }}</span>
                <br />
                <!-- <span class='ma-0 text-sm text-gray-600'># {{ project.tarefas.length }}</span> -->
                <v-badge :content="project.tarefas.length" :color="project.tarefas.length ? 'blue darken-1' : 'grey lighten-1'">
                    <v-icon
                        size="small"
                        icon="mdi-format-list-checkbox">
                    </v-icon>
                </v-badge>
                <v-badge :content="tasksDone(project)" :color="tasksDone(project) > 0 ? 'blue darken-1' : 'grey lighten-1'" class="pl-5">
                    <v-icon
                        size="small"
                        icon="mdi-format-list-checks">
                    </v-icon>
                </v-badge>
            </v-col>
        </v-row>
        <v-card-actions class="pb-0 justify-end">
            <v-btn
                text
                color="blue darken-1"
                @click="goToBoard(project.id)"
            >
                Explore
            </v-btn>
            <v-btn
                icon
                @click="showProject(project.id)"
            >
            <v-icon color="grey lighten-1">
                mdi-pencil-outline
            </v-icon>
            </v-btn>
            <v-btn
                class="mr-2 ml-0"
                icon
                @click="deleteProject(project.id)"
            >
            <v-icon color="grey lighten-1">
                mdi-delete-outline
            </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
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

    emits: ['fetch'],

    components: {
        projectForm,
    },

    props: {
        project: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        showDeleteAlert: false,
        showProjectForm: false,
        projectId: null,
    }),

    methods: {
        fetchProjects() {
            this.$emit('fetch');
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

        tasksDone(project) {
            return project.tarefas.filter(task => task.status === 'Concluida').length;
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
    },
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
/* show only a maximum of characters */
.descricao {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>