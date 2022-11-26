<template>
    <v-dialog
        v-model="dialog"
        @click:outside="close"
        max-width="600px"
    >
        <v-card class="p-3">
            <v-toolbar
                class="pl-3"
                color="white"
                height="42"
                flat
            >   
                <p v-if="projectId" class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Projeto {{ projectId }}</p>
                <p v-else class='text-gray-700 font-semibold font-sans tracking-wide text-lg'>Novo projeto</p>

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
                >
                    <v-text-field
                        dense
                        label="Nome"
                        hide-details
                        single-line
                        required
                    ></v-text-field>
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
        </v-card>
    </v-dialog>
</template>

<script>

export default {

    props: {
        projectId: {
            type: Number,
            required: false,
        },
    },

    data: () => ({
        dialog: true,
        nome: null,
        descricao: null,
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
            this.$emit('saved');
        },
    }
};
</script>