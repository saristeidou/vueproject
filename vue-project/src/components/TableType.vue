<template>
  <div class="tabletype"> 
      <h1>{{ msg }}</h1>
<b-row>
      <b-col md="10" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

    <b-col md="2" class="my-1">
        <b-button v-b-toggle.collapse1 variant="primary">Add</b-button>
      </b-col>
    </b-row>
           <b-collapse id="collapse1" class="mt-2">
            <b-card>
              <b-input-group>
              <b-form-input placeholder="TypeId" v-model="TypeId"/>
              </b-input-group>
              <b-input-group>
              <b-form-input placeholder="Type_Name" v-model="Type_Name"/>
              </b-input-group>
               <b-button v-b-toggle.collapse1 variant="success" @click="Create">Add</b-button>
            </b-card>
          </b-collapse>

    <b-table
      id="myTable"
      stacked="md"
      :items="typetable"
      :fields="fields"
      :filter="filter"
      :per-page= 20
      :current-page="currentPage"
      small
    >

    <template slot="Edit" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Cancel' : 'Edit content'}}
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Type Id:</b></b-col>
            <b-col><input type="text" v-model="row.item.TypeId"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Type Name:</b></b-col>
            <b-col><input type="text" v-model="row.item.Type_Name"></b-col>
          </b-row>

          <b-button variant="danger" size="sm" @click="Remove(row.item['.key'])">Delete</b-button>
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
    
  </div>
</template>

<script>
import { typeref } from '@/firebase.js';

export default {
    name: 'tabletype',
    data(){
      return{
     fields: [
          {
            key: 'TypeId',
            sortable: true
          },
          {
            key: 'Type_Name',
            sortable: true
          }, 'Edit'
        ],
     filter: null,
     currentPage: 1
      }
    },
    computed: {
      rows() {
        return this.typetable.length
      }
    },
  firebase: {
     typetable: typeref
   },
   
   methods:{
      Create(){
        typeref.push({TypeId: this.TypeId, Type_Name: this.Type_Name });
      },
      Remove(key){
        typeref.child(key).remove();
      },
      Edit(types){
        const key = types['.key'];
        typeref.child(key).set({ TypeId: types.TypeId,
        Type_Name: types.Type_Name })
      }
   },
  props: {
    msg: String
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