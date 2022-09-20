<template>
    <div class="travels">
        
        <div class="container">
            <div class="top">
                <p>Countries names documentation: <a href="url"> Documentation</a> </p>
            </div>
            <div class="travel-form">
                <div class="travel-form">
                <w-input
                class="mb6"
                label="Country name"
                outline>
                </w-input>
                <w-input
                class="mb6"
                label="Duration (days)"
                outline>
                </w-input>
                <w-input
                class="mb6"
                label="Date (month & year)"
                outline>
                </w-input>
            </div>
            </div>
            <div class="buttons">
                <div class="buttons">
                    <w-button class="ma1" bg-color="error" style="float:right;">Cancel</w-button>
                    <w-button class="ma1" bg-color="success" style="float:right;">Submit</w-button>
                </div>
            </div>
            <div class="void"></div>
        </div>
    </div>
</template>


<script setup>

</script>

<style scoped>
.container {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 0.2fr 1fr 0.2fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "top top top"
    "travel-form void void"
    "buttons void void"; 
}
.top { grid-area: top; }
.travel-form { grid-area: travel-form; }
.buttons { grid-area: buttons; }
.void { grid-area: void; }
.buttons{
    float:right;
}
</style>