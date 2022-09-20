<template>
        <div class="container">
            <div class="top">
                <w-input 
                    class="mb3"
                    outline>
                    Title
                </w-input>


                <w-textarea 
                    class="mt4"
                    outline
                    rows="10">
                    Text description
                </w-textarea>
                <w-divider class="ma6"/>
            </div>
            <div class="bottom">
                <w-button class="ma1" bg-color="error" style="float:right;">Cancel</w-button>
                <w-button class="ma1" bg-color="success" style="float:right;">Submit</w-button>
            </div>
            <div class="right">
                <w-card title="Image" title-class="grey" class="fillSpace">
                    <w-image
                        class="mr5"
                        :src="`${baseUrl}images/japanese-wave.png`"
                        :width="150"
                        :height="150">
                    </w-image>
                    <w-button class="ma1" bg-color="secondary" style="float:right;">Load image</w-button>
                </w-card>
            </div>
            <div class="top-left">
                <w-card class="fillSpace" >
                    Tags
                    <w-input 
                        style="margin-top: 10px;"
                        outline>
                        Add Skills (separator = ';')
                    </w-input>
                    <br>
                    <w-input 
                        outline>
                        Add technologies/tools (separator = ';')
                    </w-input>
                </w-card>
            </div>
            <div class="bottom-left">
                <w-card class="fillSpace" >
                    Ressource
                    <w-input style="margin-top: 10px;"
                        outline>
                        Ressource name
                    </w-input>
                    <br>
                    <w-input
                        outline>
                        Ressource link
                    </w-input>
                </w-card>
            </div>
        </div>
</template>


<script setup>
var baseUrl = 'https://antoniandre.github.io/wave-ui/'

</script>


<style scoped>
    
.container {
  display: grid; 
  /* grid-auto-flow: row dense; */
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 0.1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "top top"
    "top-left right"
    "bottom-left right"
    "bottom bottom"; 
}
.top { grid-area: top; }
.bottom { 
    grid-area: bottom;
 }
.right { grid-area: right; }
.top-left { grid-area: top-left; }
.bottom-left { grid-area: bottom-left; }


.fillSpace{
    display: flex;
    flex-flow: column;
    margin: 10px;
    height: 90%;
}

</style>