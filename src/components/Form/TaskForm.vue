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
                <p class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Tarefa {{ taskId }}</p>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    color="blue darken-1"
                    @click="dialog = false"
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
                        dense
                        label="Título"
                        hide-details
                        single-line
                        required
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
                        :items="responsaveis"
                        v-model="responsavelId"
                        hint="atribua o responsável pela tarefa"
                        no-data-text="Nenhum responsável encontrado"
                        label="Responsável"
                        persistent-hint
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
                        :items="relatores"
                        v-model="relatorId"
                        hint="escolha um relator para acompanhar a tarefa"
                        no-data-text="Nehum relator encontrado"
                        label="Relator"
                        persistent-hint
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
                        v-model="prioridadeId"
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
                        v-model="descricao"
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

            <v-divider></v-divider>

            <v-row v-if="showCommentField" class="pt-3 pb-0 pl-3 pr-3">
                <v-col cols="12">
                    <v-textarea
                        filled
                        rows="2"
                        auto-grow
                        label="Adicionar comentário"
                        v-model="comentario"
                        hide-details
                    ></v-textarea>        
                </v-col>
            </v-row>

            <v-card-actions v-if="showCommentField">
            <v-spacer></v-spacer>
                <v-btn
                    text
                    color="grey"
                    @click="toggleCommentField"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    text
                    color="blue darken-1"
                    @click="saveComment"
                >
                    Postar
                </v-btn>
            </v-card-actions>

            <v-row class="p-3 pb-0">
                <div class="pl-3 pr-3 py-2">
                    <p class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Comentários</p>
                </div>
                <v-spacer></v-spacer>
                <v-card-actions v-if="!showCommentField">
                    <v-btn
                        text
                        color="blue darken-1"
                        @click="toggleCommentField"
                    >
                        <v-icon
                            left
                            dark
                        >
                            mdi-plus
                        </v-icon>
                        Novo comentário
                    </v-btn>
                </v-card-actions>
            </v-row>

            <comment-list />
        </v-card>
    </v-dialog>
</template>

<script>
import commentList from '../List/CommentList.vue';

export default {

    components: {
        commentList,
    },

	props: {
		taskId: {
			type: Number,
			default: 0,
		}
	},

    data: () => ({
        dialog: true,
        relatores: [],
        relatorId: null,
        responsaveis: [],
        responsavelId: null,
        prioridades: [],
        prioridadeId: null,
        descricao: "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.",
        showCommentField: false,
        comentario: null,
    }),

    created() {
        let that = this;

        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
                that.close();
            }
        });
    },

    methods: {
        close () {
            this.$emit('close');
        },

        save () {
            this.$emit('saved', {
                id: this.taskId,
            });
        },

        toggleCommentField() {
            this.showCommentField = !this.showCommentField;
        },

        saveComment(event) {
            console.log(event);
        },
    }
};
</script>