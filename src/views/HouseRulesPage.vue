<template>
  <div class="dashboard">
    <h1>House Rules Dashboard</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Active</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rule in rules" :key="rule.id">
            <td>{{ rule.id }}</td>
            <td>{{ rule.name }}</td>
            <td>{{ rule.active }}</td>
            <td>{{ rule.order }}</td>
            <td>
              <button @click="showRule(rule.id)">Show</button>
              <button @click="editRule(rule.id)">Edit</button>
              <button @click="deleteRule(rule.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <q-pagination v-if="pagination.total_pages > 1" v-model="pagination.current_page" :max-pages="5"
                    :boundary-links="true" :total-pages="pagination.total_pages" @input="loadData"/>
    </div>
    <div class="actions">
      <button @click="createRule">Create new House Rule</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 v-if="currentAction === 'create'">Create new House Rule</h2>
        <h2 v-if="currentAction === 'edit'">Edit House Rule {{ currentRule.id }}</h2>
        <form>
          <label>Name:</label>
          <input type="text" v-model="currentRule.name" required>
          <label>Active:</label>
          <select v-model="currentRule.active" required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <button v-if="currentAction === 'create'" @click.prevent="submitCreate">Create</button>
          <button v-if="currentAction === 'edit'" @click.prevent="submitEdit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      rules: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 10,
        current_page: 1,
        total_pages: 0,
        links: {
          next: null,
          prev: null
        }
      },
      currentRule: {
        id: null,
        name: '',
        active: 1,
        order: null
      },
      showModal: false,
      currentAction: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const url = `https://sys-dev.searchandstay.com/api/admin/house_rules?page=${this.pagination.current_page}`
      const token = localStorage.getItem('token')
      axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          this.rules = res.data.data.entities
          this.pagination = res.data.data.pagination
        })
        .catch(err => console.log(err))
    },
    submitCreate() {
  const url = 'https://sys-dev.searchandstay.com/api/admin/house_rules'
  const token = localStorage.getItem('token')
  console.log(this.currentRule)
  axios.post(url, this.currentRule, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      this.showModal = false
      this.currentAction = ''
      this.loadData()
    })
    .catch(err => console.log(err))
},
    showRule(id) {
  this.currentAction = '';
  const url = `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`;
  const token = localStorage.getItem('token');
  axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      this.currentRule = res.data.data;
      this.showModal = true;
      this.currentAction = 'show';
    })
    .catch(err => console.log(err));
},
    createRule() {
      this.currentRule = {
        id: null,
        name: '',
        active: 1,
        order: null
      }
      this.showModal = true
      this.currentAction = 'create'
    },
    editRule(id) {
  this.currentAction = '';
  const url = `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`;
  const token = localStorage.getItem('token');
  axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      this.currentRule = res.data.data;
      this.showModal = true;
      this.currentAction = 'edit';
    })
    .catch(err => console.log(err));
},
    deleteRule(id) {
  const url = `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`
  const token = localStorage.getItem('token')
  axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      this.showModal = false
      this.currentAction = ''
      this.loadData()
    })
    .catch(err => console.log(err))
}
  }
}
</script>