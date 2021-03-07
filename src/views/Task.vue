<template>
  <div
    class="relative flex flex-row bg-white
     object-center w-1/2 mx-4 m-32 mx-auto
      py-4 text-left rounded shadow overflow-auto"
  >
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input 
      type="text" :value="currentTask.name" 
      class="p-2 w-full mr-2 block text-xl font-bold"
      @change="updateTaskName($event,'name')"
      />
      <!-- $event:存储着原始DOM事件 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    //当computed属性和getter中的属性名称相同时可如下写法
    ...mapGetters(["getTask"]),
    currentTask() {
      //this.getTask <=> return (id)=>{...}
      return this.getTask(this.id);
    },
  },
  methods:{
    updateTaskName(e,property){
      /* e.target<=>原生的DOM */
        this.$store.commit('UPDATE_TASK',{
          task:this.currentTask,
          key:property,
          value:e.target.value
        });
        this.currentTask.name = e.target.value;
       
    }
  }
};
</script>

<style>
/* .task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
} */
</style>
