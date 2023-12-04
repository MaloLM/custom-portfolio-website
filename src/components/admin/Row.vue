<!--
Copyright (c) [2023] [Malo Le Mestre]
This software is released under the Apache 2.0 License
https://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <div class="list-row">
        <w-card>
            <h4 style="float:left;">{{title}}</h4>
                
            <div style="float:right;" >
                <button 
                class="editButton" 
                style="float:left;"
                @click='editRow'>
                Edit
                </button>

                <button  
                @click='removePost'
                class="deleteButton"
                style="float:right;">
                Delete
                </button>
            </div>
        </w-card>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        id: String,
    },
    methods: {
        editRow(){
            window.scrollTo(0, 0);
            this.$emit('toggleShow', this.id)
        },
        removePost(){
            this.$emit('removePost', this.id)
        },
    },
}
</script>


<style scoped>
.editButton{
    margin-right: 10px;
    background-color: #4cb119;
}

.deleteButton{
    background-color: #ef270d;
}

button {
    padding: 10px 26px;
    border-radius: 5px;
    font-size:13px;
    margin: 0px 2px;
}

.list-row {
    margin-bottom: 8px;
}
</style>