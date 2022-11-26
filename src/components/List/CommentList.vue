<template>
    <v-list two-line outlined dark color="primary">
        <template v-for="(item, index) in comentarios" :key="index">
            <v-list-item>
                <span class='text-sm'>{{item.title}}</span>
                <br />
                <span class='text-sm text-gray-600'>{{item.descricao}}</span>

                <v-divider
                    v-if="index < comentarios.length - 1"
                    :key="index"
                    class="mt-3"
                ></v-divider>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
export default {
	props: {
	},

    data: () => ({
        comentarios: [
            {
                title: 'Ali Connors',
                descricao: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out? Leave me a message and I'll call you back.`,
            },
            {
                title: 'me, Scrott, Jennifer',
                descricao: `Wish I could come, but I'm out of town this weekend.`,
            },
            {
                title: 'Sandra Adams',
                descricao: 'Do you have Paris recommendations? Have you ever been?',
            },
        ],
    }),

    methods: {
    }
};
</script>