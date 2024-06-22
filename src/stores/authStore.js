import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthStore = defineStore(
  "AuthStore",
  () => {
    const userinfo = ref({ token: "" });

    const save = (token) => {
      userinfo.value.token = token;
    };

    const clear = () => {
      userinfo.value.token = "";
    };

    return {
      userinfo,
      save,
      clear,
    };
  },
  {
    persist: true,
  }
);
