import Vue from "vue";
import axios from "axios";


Vue.mixin({
    name: "axiosmixin",
    data() {
      return {
        globalApiBaseUrl: "https://localhost:44339",
        timeStart: 0,
        sessionTimeout: 30
      };
    },
    created() {
      
    },
    methods: {  
      async axiosPostMixin(url, jparam) {
        let sendJdata = {
          jsondata: jparam
        };
        let data;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  
        await axios
          .post(this.globalApiBaseUrl + url, sendJdata)
          .then(function(response) {
            if (response.data.status == false) {
              if (response.data.errorMsg == "401") {
                  alert("UnAuthorized Aceess");
              }
            }  
            data = response.data;            
          })
          .catch(function(error) {
            data = error;
          });
  
        return data;
      },
      async axiosPutMixin(url, jparam) {
        let sendJdata = {
          jsondata: jparam
        };
        let data;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  
        await axios
          .put(this.globalApiBaseUrl + url, sendJdata)
          .then(function(response) {
            if (response.data.status == false) {
              if (response.data.errorMsg == "401") {
                  alert("UnAuthorized Aceess");
              }
            }  
            data = response.data;            
          })
          .catch(function(error) {
            data = error;
          });
  
        return data;
      },
      async axiosDeleteMixin(url, ProductID) {
        debugger;
        let data;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  
        await axios.delete(this.globalApiBaseUrl + url+'/'+ ProductID)
          .then(function(response) {
            if (response.data.status == false) {
              if (response.data.errorMsg == "401") {
                  alert("UnAuthorized Aceess");
              }
            }  
            data = response.data;            
          })
          .catch(function(error) {
            data = error;
          });
  
        return data;
      },
      async axiosGetMixin(url) {
        let data;
        
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        await axios
          .get(this.globalApiBaseUrl + url)
          .then(function(response) {
            if (response.data.status == false) {
              if (response.data.errorMsg == "401") {
                  alert("UnAuthorized Aceess");
              }
            }  
            data = response.data;            
          })
          .catch(function(error) {
            data = error;
          });
  
        return data;
      },
      removeNULLMixin(Obj) {
        Obj = Obj.replace(/\:null/gi, ':""');
        return Obj;
      },
    }
  });