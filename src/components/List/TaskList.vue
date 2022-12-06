<template>
    <p class='p-4 pl-0 text-gray-700 font-semibold font-sans tracking-wide text-lg'>Últimas tarefas</p>
    <v-list two-line rounded nav border>
        <template v-for="(item, index) in items" :key="item.id">
            <v-list-item :prepend-icon="priorityIcon(item)">
                <template class="flex items-center">
                    <div>
                        {{ item.titulo }}
                        <span class='text-sm text-gray-600'> - até {{ formattedDate(item.data) }}</span>
                        <v-list-item-subtitle>
                            {{ item.descricao }}
                        </v-list-item-subtitle>        
                    </div>

                    <v-spacer></v-spacer>

                    <v-badge :content="commentsTotal(item)" class="mr-5" :color="commentsTotal(item) ? 'error' : 'grey lighten-1'">
                        <v-icon
                            :color="!commentsTotal(item) ? 'grey lighten-1' : 'default'"
                            icon="mdi-comment-text-multiple-outline">
                        </v-icon>
                    </v-badge>

                    <badge-card :color="badgeColor(item)">
                        {{ item.status }}
                    </badge-card>
                </template>
            </v-list-item>

            <v-divider
                v-if="index < items.length - 1"
                :key="index"
            ></v-divider>
        </template>
    </v-list>
</template>

<script>
import taskApi from '../../assets/js/api/task.js';
import statusesMixin from '../../assets/js/mixins/statuses.js';
import badgeCard from '../Card/BadgeCard.vue';

export default {

    components: {
        badgeCard,
    },

    mixins: [
        statusesMixin,
    ],

    data: () => ({
        items: [],
    }),

    created() {
        this.fetchTasks();
    },

    methods: {
        fetchTasks() {
            taskApi.fetchAllTasks().then(response => {
                this.items = response.data.reverse();
            })
            .catch(error => {
                console.log(error);
            });
        },

        commentsTotal(task) {
            return task.comentarios.length;
        },

        formattedDate(date) {
            if (! date) return null;
            var dateFormatting = date.split('/');
            return (`${dateFormatting[1]}/${dateFormatting[0]}/${dateFormatting[2]}`);
        },

        priorityIcon(task) {
            switch (task.prioridade) {
                case 'Alta':
                    return 'mdi-arrow-up-thick';
                case 'Média':
                    return 'mdi-arrow-up';
                case 'Baixa':
                default:
                    return 'mdi-arrow-down';
            }
        },
    }
}
</script>