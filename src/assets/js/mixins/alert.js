export default {
    data: () => ({
        dialog: {
            color: '',
            message: '',
            show: false,
        },
    }),

    methods: {
        alertSuccess(message = '', color = 'success') {
            this.dialog = {
                ...this.dialog,
                color,
                message,
                show: true,
            };
        },

        alertError(message = '', color = 'error') {
            this.dialog = {
                ...this.dialog,
                color,
                message,
                show: true,
            };
        },
    },
}