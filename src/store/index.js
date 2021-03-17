import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../default-board"; //默认的数据
import { saveStatePlugin /* , uuid */, uuid } from "../utils"; // <-- Import saveStatePlugin
Vue.use(Vuex);
const board = JSON.parse(localStorage.getItem("boards")) || defaultBoard;
export default new Vuex.Store({
  state: {
    board
  },
  getters: {
    /* 通过id get task 
          通过方法访问你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在对 store 里的数组进行查询时非常有用。
          getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    */
    getTask(state) {
      //getTaskId:function(){}
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            ///一开始写错 成column，然而column对象不可迭代 报错：Error in render: "TypeError: Invalid attempt to iterate non-iterable instance.

            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  },
  plugins: [saveStatePlugin], // <-- Use ：告知store use
  mutations: {
    /* 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。其中的handler的第一个参数就是state,第二个参数（option）就是payload(用于commit时装对象给mutations)*/
    /* @params:其中的｛task,name｝:要修改的task和修改的键，和修改值 */
    UPDATE_TASK(state, { task, key, value }) {
      /* task[key] = value; */
      Vue.set(task, key, value);
    },
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name: name,
        id: uuid(),
        description: ""
      });
    },
    CREATE_COLUMN(state, { name, tasks = [] }) {
      state.board.columns.push({ name, tasks });
    },
    MOVE_TASK(
      state,
      { fromColumnIndex, fromTaskIndex, toTaskIndex, targetTasks }
    ) {
      /* 移出原task */
      let movedTask = state.board.columns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1
      )[0];
      targetTasks.splice(toTaskIndex, 0, movedTask);
    }
  },
  actions: {},
  modules: {}
});
