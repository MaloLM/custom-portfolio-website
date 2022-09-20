<template>
    <div class="list-row">
        <w-card>
        <h4 style="float:left;">{{props.title}} </h4>
             ({{props.uid}})
        <div style="float:right;" >
            <w-confirm class="editButton" bg-color="secondary" style="float:left;">Edit</w-confirm>
            <w-confirm bg-color="error" style="float:right;">Delete</w-confirm>
        </div>
        </w-card>
    </div>
</template>


<script setup>
import { defineProps } from "vue";

const props = defineProps(['title', 'uid'])
</script>


<style scoped>
.editButton{
    margin-right: 10px;
}

.list-row {
    margin-bottom: 8px;
}
</style>