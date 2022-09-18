<template>
    <div class="contact-form">
        <br/>
        <w-form>
            <w-input
                class="mb3"
                label="E-mail address"
                color="info"
                outline>
            </w-input>
            <w-input
                class="mb3"
                label="Object"
                color="info"
                outline>
            </w-input>
            <br/>

            <w-divider class="mx6" >Your message</w-divider>

            <w-textarea
                class="mt4"
                outline
                rows="10">
            </w-textarea>
            <w-button class="send" type="submit" style="float:right" lg>Submit</w-button>
        </w-form>
    </div>
</template>


<script setup>

</script>


<script scoped>

</script>


<style scoped>
    .send {
        margin: 25px;
    }
</style>