<template>

    <w-input
        class="mb3"
        outline>
        Portefolio title
    </w-input>

    <w-textarea
        class="mt4"
        outline
        rows="10">
        Text description
    </w-textarea>
    <br>
    <w-card title="Image" title-class="grey">
        <w-image style="float:left;"></w-image>
        <w-button class="ma1" bg-color="secondary" style="float:right;">Load image</w-button>
    </w-card>

    <br>
    <br>
    <div style="float:right;">
        <w-button class="ma1" bg-color="primary">Submit</w-button>
    </div>
</template>


<script setup>

</script>


<style scoped>

</style>