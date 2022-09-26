<template>
    <div class="travels">
        <div class="container">

            <div class="top">
                <p>Countries names documentation: <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank"> Documentation</a> </p>
                <br>
            </div>
            <form class="travel-form" @submit.prevent="logFormData()">
                <div>
                    
                        <w-input
                        class="mb6"
                        label="Country name"
                        outline
                        v-model="countryName"
                        required>
                        </w-input>

                        <w-input
                        class="mb6"
                        label="Country code"
                        outline
                        v-model="countryCode"
                        required>
                        </w-input>

                        <w-input
                        class="mb6"
                        label="Duration (days)"
                        outline
                        v-model="duration"
                        required>
                        </w-input>

                        <w-input
                        class="mb6"
                        label="Date (month & year)"
                        outline
                        v-model="date"
                        required>
                        </w-input>
                    
                </div>

                <div class="buttons">
                    <div class="buttons">
                        <button class="orange" type="button" @click='passEvent'>Cancel</button>
                            
                        <button style="float:right;">Submit</button>
                    </div>
                </div>
            </form>
            <div class="void"></div>

        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                countryName: "",
                countryCode: "",
                duration: "",
                date: ""
            }
        },
        methods:{
            passEvent(){
                window.scrollTo(0, 0);
                this.$emit('toggleShow', 'hello')
            },
            logFormData(){
                console.log(this.countryName)
                console.log(this.countryCode)
                console.log(this.duration)
                console.log(this.date)

            }
        }
    }

</script>

<style scoped>
.container {
  display: grid; 
  grid-template-columns: 1fr 0.3fr 1fr; 
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

button {
    background-color: #2d467d;
    border: 0;
    padding: 10px 40px;
    margin-top: 20px;
    margin-left: 10px;
    /* margin-left: 10px; */
    color: white;
    border-radius: 20px;
    font-size:13px;
}

.orange{
    background-color: #ff7300;
    color: white;
}
</style>