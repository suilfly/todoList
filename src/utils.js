export function saveStatePlugin(store) {
  store.subscribe(
    /* 回调函数：当订阅发布信息时执行（vuex store 的state发生改变）
        params:mutation:改变
              state:状态(vuex中的state)
       */
    (mutation, state) =>
      localStorage.setItem("boards", JSON.stringify(state.board))
    /* 在本地存储中放置board,localStorage只能存储String */
  );
}
export function uuid() {
  return Math.random()
    .toString(16)
    .slice(2);
}
