<template>
    <v-dialog
        v-model="dialog"
        @click:outside="close"
        max-width="800px"
    >
        <v-card class="p-3">
            <v-toolbar
                class="pl-3"
                color="white"
                height="42"
                flat
            >   
                <p v-if="taskId" class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Tarefa {{ taskId }}</p>
                <p v-else class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Nova tarefa</p>

                <v-spacer></v-spacer>
                <v-btn
                    icon
                    color="blue darken-1"
                    @click="close"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-row class="pl-3 pr-3 pt-2">
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                    <v-text-field
                        v-model="task.titulo"
                        label="Título"
                        hide-details
                        single-line
                        required
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                    <v-text-field
                        v-model="task.data"
                        label="Data"
                        type="date"
                        hide-details
                        single-line
                        required
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                    <v-autocomplete
                        dense
                        filled
                        :items="statuses"
                        v-model="task.status"
                        label="Status"
                        hide-details
                        single-line
                    ></v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="3"
                >
                    <v-autocomplete
                        dense
                        filled
                        :items="prioridades"
                        v-model="task.prioridade"
                        label="Prioridade"
                        hide-details
                        single-line
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        filled
                        rows="5"
                        auto-grow
                        hide-details
                        label="Descrição"
                        v-model="task.descricao"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="blue darken-1"
                    @click="save"
                >
                    Salvar
                </v-btn>
            </v-card-actions>


            <template v-if="taskId">
                <v-divider></v-divider>
                <comment-list :task-id="taskId" />
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
import taskApi from '../../assets/js/api/task.js';
import statusesMixin from '../../assets/js/mixins/statuses.js';
import commentList from '../List/CommentList.vue';

export default {

    components: {
        commentList,
    },

    mixins: [
        statusesMixin,
    ],

	props: {
		taskId: {
			type: Number,
			default: 0,
		},

        projectId: {
			type: [Number, String],
			default: 0,
		},
	},

    data: () => ({
        dialog: true,
        prioridades: [
            'Baixa',
            'Média',
            'Alta',
        ],
        task: {
            titulo: null,
            descricao: null,
            prioridade: null,
            data: null,
            status: null,
        },
    }),

    created() {
        let that = this;

        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
                that.close();
            }
        });

        if (this.taskId) {
            this.fetchTask();
        }
    },

    methods: {
        fetchTask() {
            taskApi.fetchTask(this.taskId).then(response => {
                this.task = {
                    ...this.task,
                    ...response.data
                };
                var dateFormatting = this.task.data.split('/');
                this.task.data = (`${dateFormatting[2]}/${dateFormatting[0]}/${dateFormatting[1]}`).replaceAll('/', '-');
            }).catch(error => {
                console.log(error);
            });
        },

        save() {
            if (this.taskId) {
                taskApi.updateTask(this.taskId, this.task).then(() => {
                    this.$emit('saved');
                }).catch(error => {
                    console.log(error);
                });
            } else {
                taskApi.createTask(this.projectId, this.task).then(() => {
                    this.$emit('saved');
                }).catch(error => {
                    console.log(error);
                });
            }
        },

        close() {
            this.$emit('close');
        },
    }
};
</script>