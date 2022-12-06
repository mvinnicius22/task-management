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

    methods: {
        badgeColor(item) {
            const mappings = {
                Backlog: 'purple', 
                'Em andamento': 'teal',
                Review: 'blue',
                QA: 'green',
                Aprovado: 'yellow',
                Concluida: 'gray',
                default: 'aqua'
            };
            return mappings[item.status] || mappings.default;
        },
    },
}