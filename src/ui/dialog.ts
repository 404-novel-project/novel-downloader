import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";

export default Vue.defineCustomElement({
  name: "Dialog",
  props: {
    dialogTitle: String,
    status: String,
  },
  emits: ["dialogclose"],
  data() {
    return {
      myPrivateStatus: this.status === "true",
    };
  },
  methods: {
    dialogClose() {
      this.myPrivateStatus = false;
      this.$emit("dialogclose");
    },
  },
  mounted() {
    this.myPrivateStatus = this.status === "true";
  },
  watch: {
    status() {
      this.myPrivateStatus = this.status === "true";
    },
  },
  template: `<div class="overlay" v-bind:class="{ open: myPrivateStatus }" v-if="myPrivateStatus"></div>
<div class="out" v-if="myPrivateStatus">
<div id="dialog" class="dialog" v-bind:class="{ open: myPrivateStatus }" >
<div class="titlebar">
    <h1 class="dialog-title">{{ dialogTitle }}</h1>
    <button class="dialog-close" v-on:click="dialogClose">❌</button>
</div>
<div class="body">
    <slot></slot>
</div>
</div>
</div>`,
  styles: [
    `.overlay {
    visibility: hidden;
		opacity: 0;
    z-index: 100000;
    position: fixed;
    top: -50%;
    left: -50%;
    height: 200%;
    width: 200%;
    background-color: black;
  }
  .overlay.open {
    opacity: .8;
    visibility: visible;
    transition: opacity .2s ease-in;
  }
  .overlay:not(.open) {
    transition: visibility .2s step-end,opacity .2s ease-in;
  }
  
  .out {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 100001;
  }

  .dialog {
    width: 720px;
    max-height: 70%;
    display: none;
    opacity: 0;
    z-index: 100100;
    position: fixed;
    margin: 0;
    padding: 0;
  }
  .dialog.open {
    opacity: 1;
    display: block;
    transition: opacity .2s ease-in;
  }
  
  .dialog > * {
    box-sizing: border-box;
  }
  .dialog > .titlebar {
    background-color: white;
    min-height: 24px;
    position: relative;
  }
  .dialog-title {
    padding: 10px;
    text-transform: uppercase;
    background: #ff7bac;
    color: #ffffff;
    margin: 0;
    font-size: 1.5em;
    text-align: center;
	}
  .dialog-close {
    background: #ff7bac;
		color: #ffffff;
    
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    user-select: none;
    
    cursor: pointer;
    font-size: 120%;
    margin: 0;
    padding: 0;
    width: 3.6em;
    height: 92%;
    border: 1px solid transparent;
    transition-duration: .2s;
    display: block;
    
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
  }
  
  .dialog > .body {
    background-color: white;
    border: 1px solid rgb(255 125 175 / 80%);
    text-align: left;
    
    line-height: 1.5;
    padding: 1em;
    
    overflow: auto;
    min-width: 280px;
    
    height: calc(100% - 2.1em);
    max-height: 900px;
  }
`,
  ],
});
