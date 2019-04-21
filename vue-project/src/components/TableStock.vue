<template>
  <div class="tablestock"> 
    <b-container fluid>
      <h2>Stock</h2>
    <b-row>
      <b-col md="1" class="my-1"></b-col>
      <b-col md="5" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="1" class="my-1">
        <b-button v-b-toggle.collapse1 variant="primary">Add</b-button>
      </b-col>
      <b-col md="1" class="my-1">
      </b-col>
    </b-row>
           <b-collapse id="collapse1" class="mt-2">
            <b-card>
              <b-row class="my-1">
                <b-col sm="1">
                </b-col>
                <b-col sm="3">
                  <label for="input-default">Stock code:</label>
                </b-col>
                <b-col sm="7">
                  <b-form-input id="input-default" placeholder="Enter your stock code" v-model = "NextId" disabled></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="1">
                </b-col>
                <b-col sm="3">
                  <label for="input-default">Original price:</label>
                </b-col>
                <b-col sm="7">
                  <b-form-input id="input-default" type="number" placeholder="Enter your original price" v-model = "OriginalPrice"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="1">
                </b-col>
                <b-col sm="3">
                  <label for="input-default">Selling price:</label>
                </b-col>
                <b-col sm="7">
                  <b-form-input id="input-default" type="number" placeholder="Enter your selling price" v-model = "SellingPrice"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="1">
                </b-col>
                <b-col sm="3">
                  <label for="input-default">Type:</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="selected">
                  <option v-for="tp in stype" 
                  v-bind:key="tp['.key']">{{ tp.Type_Name }}</option>
                  </b-form-select>
                </b-col>
                <b-col sm="2">
                  <a v-b-toggle.collapse2>Add new type</a>
                </b-col>
              </b-row>
              <b-collapse id="collapse2" class="mt-2">
                <b-card>
                  <b-row class="my-1">
                <b-col sm="1">
                </b-col>
                <b-col sm="3">
                  <label for="input-default">Type:</label>
                </b-col>
                <b-col sm="4">
                  <b-form-input id="input-default" type="text" placeholder="Enter new type" v-model = "Typetxt"></b-form-input>
                </b-col>
                <b-col sm="3">
                <b-button v-b-toggle.collapse2 variant="success" @click="NewType">Create Type</b-button>                </b-col>
              </b-row>
                </b-card>
              </b-collapse>
              <b-button v-b-toggle.collapse1 variant="success" @click="Create">Add</b-button>
            </b-card>
          </b-collapse>
  <b-row>
     <b-col md="1" class="my-1">
      </b-col>
    <b-col md="10" class="my-1">
    <b-table
      id="myTable"
      stacked="md"
      :items="newtable"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      
    >

    <template slot="OriginalPrice" slot-scope="row">
        £ {{ row.item.OriginalPrice }}
      </template>

      <template slot="SellingPrice" slot-scope="row">
        £ {{ row.item.SellingPrice }}
      </template>

    <template slot="Edit" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Cancel' : 'Edit content'}}
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Stock Id:</b></b-col>
            <b-col>
              <input type="text" v-model="row.item.Stock" disabled></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Original Price:</b></b-col>
            <b-col><input type="text" v-model="row.item.OriginalPrice"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Selling price:</b></b-col>
            <b-col><input type="text" v-model="row.item.SellingPrice"></b-col>
          </b-row>

          <b-button variant="danger" size="sm" @click="Remove(row.item['key'])">Delete</b-button>
          <b-button variant="primary" size="sm" @click="Edit(row.item)">Edit</b-button>
        </b-card>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      aria-controls="myTable"
      align="center"
    />
    </b-col>
  </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import { stockref, typeref, productref } from '@/firebase.js'
import debounce from 'lodash/debounce'

export default {
    data(){
      return{
     fields: [
          {
            key: 'Stock',
            sortable: true, 
            sortDirection: 'desc', 
            label: 'Stock'
          },
          {
            key: 'OriginalPrice',
            sortable: true, 
            sortDirection: 'desc', 
            label: 'Original Price'
          },
          {
            key: 'SellingPrice',
            sortable: true,
            sortDirection: 'desc', 
            label: 'Selling Price'
          },
          {
            key: 'Type',
            sortable: true, 
            sortDirection: 'desc', 
            label: 'Type'
          }, 'Edit'
        ],
        StockId:'',
        ProductId:'',
        BranchId:'',
        SellingPrice:'',
        OriginalPrice:'',
        TypeID:'',
        filter: null,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 15, 20],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        isActive: true,
        newtable:[],
        selected:'',
        NextId:'',
        NextPId:'',
        Typetxt:''
      }
    },
    computed: {
      rows() {
        return this.newtable.length
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    firebase() {
    return {
    product: {
      source: firebase.database().ref('Data/1/Product').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    stype: {
      source: firebase.database().ref('Data/2/Type').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    stock: {
      source: firebase.database().ref('Data/3/Stock').child(firebase.auth().currentUser.uid),
      asObject: true
    }
  }
   },
   mounted: debounce(function () {
    this.$nextTick(() => {
        this.Createtable(); // runs only once
    })
}, 2000),

   methods:{
          Createtable(){
            let stck = this.stock['.value']
            var length = stck
            var num = Number(length) + 1
            var tbl = []
            this.NextId = 'STCK' + num
         for(let i = 0;i<this.stock.length;i++){
             var valObj = this.product.filter(function(elem){
             if(elem.ProductId == stck[i].ProductId) return elem
               });
              var vaObj = this.stype.filter(function(elem){
             if(elem.TypeId == valObj[0].Type) return elem
               });
              tbl.push({key: this.stock[i]['.key'],
              Stock: this.stock[i].StockId,
              OriginalPrice: valObj[0].OriginalPrice,
              SellingPrice: this.stock[i].SellingPrice,
              Type: vaObj[0].Type_Name})
           }

           this.newtable = tbl
          },
      Create(){
        var prdlength = this.product.length
        var pnum = Number(prdlength) + 1
        const sel = this.selected
        this.NextPId = 'PRD' + pnum
        var typeObj = this.stype.filter(function(elem){
             if(elem.Type_Name == sel) return elem.TypeId
               });
        stockref.push({StockId: this.NextId, ProductId: this.NextPId, 
        SellingPrice: this.SellingPrice });
        productref.push({ProductId: this.NextPId, 
        Type: typeObj[0].TypeId, OriginalPrice: this.OriginalPrice });
        this.Createtable()
      },
      Remove(key){
        stockref.child(key).remove();
        this.Createtable()
      },
      Edit(stock){
        const key = stock['key'];
        stockref.child(key).update({ SellingPrice: stock.SellingPrice })
        productref.child(key).update({ OriginalPrice: stock.OriginalPrice })
        this.Createtable()
      },
      NewType(){
        var tplength = this.stype.length
        var num = Number(tplength) + 1
        this.NextTp = 'TP' + num
        if(this.Typetxt != ''){
          typeref.push({TypeId: this.NextTp, Type_Name: this.Typetxt})
        }
        
      }
   }
}

</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>