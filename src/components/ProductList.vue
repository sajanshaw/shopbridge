<template>
  <v-data-table
    :headers="headers"
    :items="ProductList"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Product List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add New Product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Name"
                      label="Product Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.Price"
                      label="Price"                      
                      type="number"
                    ></v-text-field>                
                    
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.ItemInStock"
                      label="Item In Stock"
                      type="number"
                    ></v-text-field>                    
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Description"
                      v-model="editedItem.Description"
                    ></v-textarea>
                  </v-col>                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'Name',
          },
          { text: 'Description', value: 'Description' },
          { text: 'Price (₹)', value: 'Price' },
          { text: 'In Stock', value: 'ItemInStock' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        ProductList: [],
        editedIndex: -1,
        editedItem: {
        },
        defaultItem: {
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.loadProductList()
      },
  
      methods: {
        async loadProductList () {
          let vm = this;
          await vm.axiosGetMixin("/api/Product/GetProductList")
          .then(async function(response) {
             let jData = vm.removeNULLMixin(response.jsondata);
             vm.ProductList=eval(jData);
          })
          .catch(function(error) {

          });
        },
  
        editItem (item) {
          this.editedIndex = this.ProductList.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          debugger;
        },
  
        deleteItem (item) {
          this.editedIndex = this.ProductList.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          // this.ProductList.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false;
          this.DoDeleteProductByID(this.editedItem);
        },
  
        save () {
          debugger;
          if (this.editedIndex > -1) {
            this.DoUpdateProductDetailsByID(this.editedItem);

          } else {
            this.DoSaveProductDetails(this.editedItem);
          }
          this.close()
        },
        
        async DoSaveProductDetails(productItem){
          let vm=this;
          var objJsonParam = {
              ID:productItem.ID,
              Name: productItem.Name,
              Description:productItem.Description,
              Price:productItem.Price,
              InStock:productItem.ItemInStock
            };
          await vm.axiosPostMixin("/api/Product/AddProduct",objJsonParam)
          .then(async function(response) {
              if(response.status){
                vm.loadProductList();
              }
          })
          .catch(function(error) {

          });
        },
        async DoUpdateProductDetailsByID(productItem){
          let vm=this;
          var objJsonParam = {
              ID:productItem.ID,
              Name: productItem.Name,
              Description:productItem.Description,
              Price:productItem.Price,
              InStock:productItem.ItemInStock
            };
          await vm.axiosPutMixin("/api/Product/UpdateProductByID",objJsonParam)
          .then(async function(response) {
              if(response.status){
                vm.loadProductList();
              }
          })
          .catch(function(error) {
 
          });
        },
        async DoDeleteProductByID(productItem){
          debugger;
          let vm=this;
          await vm.axiosDeleteMixin("/api/Product/DeleteProductByID", productItem.ID)
          .then(async function(response) {
              if(response.status){
                vm.loadProductList();
              }
          })
          .catch(function(error) {

          });
        }
      },
    }
  </script>