<template>
    <div class='bg-white shadow rounded px-3 pt-3 pb-5 border border-white'>
        <div class='flex justify-between'>
            <p class='text-gray-700 font-semibold font-sans tracking-wide text-sm'>{{ task.titulo }}</p>
            <img
                class='w-6 h-6 rounded-full ml-3'
                src='https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png'
                alt='Avatar'
            >
        </div>
        <p class='mt-1 text-gray-700 font-sans tracking-wide text-sm'>Até {{ formattedDate }}</p>
        <div class='flex mt-2 justify-between items-center'>
            <div class="flex items-center">
                <v-icon v-if="!isTaskDone" :color="priorityColor">
                    {{ priorityIcon }}
                </v-icon>
                <span v-if="!isTaskDone" class='ml-2 text-sm text-gray-600'>{{ task.prioridade }}</span>
            </div>
            <badge-card v-if="task.status" :color="badgeColor(task)">
                <s v-if="isTaskDone">
                    {{ task.status }}
                </s>
                <span v-else>
                    {{ task.status }}
                </span>
            </badge-card>
        </div>
    </div>
</template>

<script>
import statusesMixin from '../../assets/js/mixins/statuses.js';
import badgeCard from '../Card/BadgeCard.vue';

export default {

    components: {
        badgeCard,
    },

    mixins: [
        statusesMixin,
    ],

    props: {
        task: {
            type: Object,
            default: () => ({})
        },
    },

    computed: {
        formattedDate() {
            if (! this.task.data) return null;
            var dateFormatting = this.task.data.split('/');
            return (`${dateFormatting[1]}/${dateFormatting[0]}/${dateFormatting[2]}`);
        },

        priorityIcon() {
            switch (this.task.prioridade) {
                case 'Alta':
                    return 'mdi-arrow-up-thick';
                case 'Média':
                    return 'mdi-arrow-up';
                case 'Baixa':
                default:
                    return 'mdi-arrow-down';
            }
        },

        priorityColor() {
            switch (this.task.prioridade) {
                case 'Alta':
                    return 'red';
                case 'Média':
                    return '#EF5350';
                case 'Baixa':
                default:
                    return 'blue';
            }
        },

        isTaskDone() {
            return this.task.status == this.statuses[this.statuses.length - 1];
        },
    }
};
</script>
