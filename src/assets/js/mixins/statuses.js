export default {
    data: () => ({
        statuses: [
            'Backlog',
            'Em andamento',
            'Review',
            'QA',
            'Aprovado',
            'Concluida',
        ],
    }),

    computed: {
        badgeColor() {
            const mappings = {
                Backlog: 'purple', 
                'Em andamento': 'teal',
                Review: 'blue',
                QA: 'green',
                Aprovado: 'yellow',
                Concluida: 'gray',
                default: 'aqua'
            };
            return mappings[this.task.status] || mappings.default;
        },
    },

}