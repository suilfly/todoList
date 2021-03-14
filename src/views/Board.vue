<template>
  <div class="board-div p-4 h-full overflow-auto">
    <div class="flex flex-nowrap items-start">
      <div
        class="column-div p-2 mr-4 text-left shadow rounded column"
        v-for="(column, cindex) in board.columns"
        :key="cindex"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <!-- in 和 of 的区别 -->
          <div
            v-for="(task, tindex) of column.tasks"
            :key="task.id"
            class="flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline"
            @click="clickTask(task)"
            draggable
            @dragstart="setItemInfo($event, cindex, tindex)"
            @drop="moveTask($event, column.tasks, tindex)"
            @dragleave="removeDragClass($event)"
            @dragover.self="addDragClass($event)"
            @dragover.prevent
            @dragenter.prevent
          >
            <!-- setItemInfo:获取原始位置 
                 moveTask：移动task
            -->
            <span class="flex-no-shrink font-bold w-full">{{ task.name }}</span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
          <!-- add task -->
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            @keyup.enter="addTask($event, column.tasks)"
            placeholder="+ 请添加待办任务"
          />
        </div>
      </div>
    </div>
    <!-- 子路由匹配后显示的位置 -->
    <div
      class="absolute task-bg w-screen h-screen inset-0"
      v-if="isTaskOpen"
      @click.self="closeTask"
    >
      <!-- click.self阻止事件捕获 -->
      <router-view />
    </div>
    <!-- <plus-button /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
/* import plusButton from "./plusButton"; */
export default {
  components: {
    /*     plusButton */
  },
  /* 
  当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
    当计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        mapState 函数返回的是一个对象
   */
  computed: {
    //使用对象展开运算符将此对象混入到外部对象中
    ...mapState(["board"]),
    isTaskOpen() {
      /*  因为在children里设置了 name:'task' */
      return this.$route.name === "task";
    }
  },
  methods: {
    /* 打开任务 */
    clickTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    closeTask() {
      this.$router.push({ name: "board" });
    },
    addTask(e, tasks) {
      let name = e.target.value;
      console.log(tasks);
      this.$store.commit("CREATE_TASK", { tasks, name });
      e.target.value = "";
    },
    setItemInfo(e, columnIndex, taskIndex) {
      console.dir(e.dataTransfer);
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("from-column-index", columnIndex);
      e.dataTransfer.setData("from-task-index", taskIndex);
    },
    moveTask(e, targetTasks, toTaskIndex) {
      if (e.target instanceof HTMLDivElement) {
        console.dir(targetTasks);
        let fromColumnIndex = e.dataTransfer.getData("from-column-index");
        let fromTaskIndex = e.dataTransfer.getData("from-task-index");
        this.$store.commit("MOVE_TASK", {
          fromColumnIndex,
          fromTaskIndex,
          toTaskIndex,
          targetTasks
        });
        this.removeDragClass(e);
        //})
      }
    },
    addDragClass(e) {
      e.target.classList.add("drag-in");
    },
    removeDragClass(e) {
      e.target.classList.remove("drag-in");
    }
  }
};
</script>

<style>
.column {
  min-width: 350px;
}
.task-bg {
  background: rgba(0, 0, 0, 0.4);
}
.drag-in {
  background: rgba(0, 0, 0, 0.2) !important;
}
.board-div {
  background: #60a3bc;
}
.column-div {
  background: #f1f2f6;
}
/* .task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

 .column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
} 
/* 
@apply:
*/
/* .board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
} */
/* 
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
} */
</style>
