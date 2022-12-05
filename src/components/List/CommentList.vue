<template>
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
    <v-list v-if="!loading" two-line outlined dark color="primary">
        <template v-for="(item, index) in items" :key="index">
            <v-list-item>
                <span class='text-sm'># {{item.id}}</span>
                <br />
                <span class='text-sm text-gray-600'>{{item.descricao}}</span>

                <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                    class="mt-3"
                ></v-divider>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
import commentApi from '../../assets/js/api/comment.js';

export default {
	props: {
        taskId: {
            type: Number,
            required: true,
        },
	},

    created(){
        if (this.taskId) {
            this.fetchComments();
        }
    },

    data: () => ({
        items: [],
        loading: true,
        showCommentField: false,
        comentario: null,
    }),

    methods: {
        fetchComments() {
            this.loading = true;
            commentApi.fetchComments(this.taskId).then(response => {
                this.items = response.data;
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.loading = false;
            });
        },

        toggleCommentField() {
            this.showCommentField = !this.showCommentField;
        },

        saveComment() {
            commentApi.createComment(this.taskId, { descricao: this.comentario }).then(() => {
                this.$emit('saved');
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.toggleCommentField();
                this.fetchComments();
                this.comentario = null;
            });
        },
    }
};
</script>