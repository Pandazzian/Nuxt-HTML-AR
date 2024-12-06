<template>
    <div class="page-container">
        <div class="card" style="width: 600px;">
            <div class="card-header">
                <h1 style="color: #222244;">Hello welcome</h1>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-12 ml-auto mr-auto">
                            <NuxtLink to="/AR">
                                <button type="button" class="btn btn-success">Click me to start your journey!</button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        
      };
    },
    mounted() {
      
    },
    methods: {
      
    },
  };
</script>

<style scoped>
    .darkblue{
        background-color: #222244;
    }
    .page-container {
        background-color: #222244; /* Light blue */
        min-height: 100vh; /* Ensure it covers the full screen */
        padding: 20px;
        text-align: -webkit-center;
    }
</style>