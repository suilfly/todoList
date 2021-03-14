<template>
  <div id="plusButton">
    <div>+</div>
    <div>
      <label for="columnName"></label>
      <input type="text" id="columnName" />
    </div>
  </div>
</template>

<script>
export default {
  name: "plusButton",
  methods: {
    /*  addColumn(){
          this.$store.
      } */
  }
};
</script>

<style>
#plusButton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 1px 1px 10px 1px gainsboro;

  background: seashell;
  display: flex;
  justify-content: center;
  align-items: center;
}
#plusButton div {
  font-size: 30px;
  font-weight: 300;
}
#plusButton div:hover {
  cursor: pointer;
}
</style>
