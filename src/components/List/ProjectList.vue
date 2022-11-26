<template>
    <p class='p-4 pl-0 text-gray-700 font-semibold font-sans tracking-wide text-lg'>Projetos</p>
    <v-row>
        <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
        >
            <v-card
                flat
                tile
                class="mx-auto before"
                max-width="400"
            >
                <v-row class="pt-4">
                    <v-col cols="3">
                        <v-img width="75" class="mt-1 ml-2" :src="item.src"></v-img>
                    </v-col>
                    <v-col cols="9">
                        <p class='ma-0 text-gray-700 font-semibold font-sans tracking-wide text-lg'>{{ item.title }}</p>
                        <span class='pb-0 ma-0 text-sm text-gray-600'>{{ item.artist }}</span>
                        <br />
                        <span class='ma-0 text-sm text-gray-600'>{{ item.artist }}</span>
                    </v-col>
                </v-row>
                <v-card-actions class="pb-0 justify-end">
                    <v-btn
                        text
                        color="blue darken-1"
                        @click="goToBoard()"
                    >
                        Explore
                    </v-btn>
                    <v-btn
                        icon
                        @click="updateProject(item)"
                    >
                    <v-icon color="blue darken-1">
                        mdi-pencil-outline
                    </v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        @click="log"
                    >
                    <v-icon color="blue darken-1">
                        mdi-delete
                    </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {

    emits: ['update-project'],

    data: () => ({
        items: [
            {
                id: 1,
                color: '#1F7087',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                title: 'Supermodel',
                artist: 'Foster the People',
            },
            {
                id: 2,
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Halcyon Days',
                artist: 'Ellie Goulding',
            },
            {
                id: 3,
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Halcyon Days',
                artist: 'Ellie Goulding',
            },
        ],
        showDeleteAlert: false,
    }),

    methods: {
        log() {
            console.log('log');
        },

        goToBoard() {
            this.$router.push({ name: 'board' });
        },

        updateProject(item) {
            this.$emit('update-project', item.id);
        }
    }
}
</script>

<style>
.before:before {
    content: "";
    position: absolute;
    background-color: #E2E2E2;
    width: 20px;
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
</style>