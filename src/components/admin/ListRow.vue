<template>
    <div class="list-row">
        <w-card>
        <h4 style="float:left;">{{viewTitle}} ({{rowId}})</h4>
              
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
    data(props) {
        return {
            viewTitle: props.title,
            rowId: props.uid
        }
    },
    components: {
    
    },
    props:{
        title: String,
        uid: String,
    },
    setup(){
        

    },
    methods: {
        editRow(){
            console.log("ICIIIIIII:", this.rowId)
            window.scrollTo(0, 0);
            this.$emit('toggleShow', this.rowId)
        },
        removePost(){
            console.log('emit for remove')
            this.$emit('removePost', this.rowId)
        }
    },
    mounted() {
        
    }
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
    border: 0;
    padding: 10px 26px;
    color: white;
    border-radius: 5px;
    font-size:13px;
}

.list-row {
    margin-bottom: 8px;
}
</style>