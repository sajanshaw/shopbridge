<template>
  <v-app>
    <v-app-bar
      style="padding: 0px 90px"
      app
      color="white"
      light
      elevation="6"
      elevate-on-scroll>
      <div class="d-flex align-center">
        <v-toolbar-title>
        ShopBridge
      </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-list class="d-flex align-center">
        <v-list-item link v-for="(menu,index) in menus" :key="index" :to="menu.route">
        <v-list-item-title>
          {{menu.title}}
        </v-list-item-title>
        </v-list-item>
      </v-list> -->
    </v-app-bar>

    <v-main>
      <div style="padding: 0px 20px 20px 20px">
        <ProductList />
      </div>

    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import AxiosCommonMixin from './components/CommonHelper/Mixin/AxiosCommonMixin.js'
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    ProductList,
  },

  data: () => ({
     menus:[
        {title:'Home',route:'home'},
        {title:'Product List',route:'productList'},
        {title:'Manage Inventory',route:'manageInventory'}
      ]
  }),
};
</script>
