const app = Vue.createApp({
    data: function () {
      return {
        // creating empty string to push to do's
        item: '',
        // creating object for to do's
        items: [
          {
            'title': 'Finish Assignment',
            'checked': false
          },
          {
            'title': 'Grocery Store',
            'checked': false
          }
        ]
      }
    },
    // retreiving stored items from local storage
    created: function () {
      const items = localStorage.getItem('items')
      if (items) {
        // converting string back to object using JSON
        this.items = JSON.parse(items)
      }
    },
    methods: {
      // upon click of add button it will push the item to the items array
      addToDo () {
        this.items.push({
          // pushing the title and checkbox value
          title: this.item,
          checked: false
        })
        // clearing item to show the placeholder in text feild upon clicking the add button
        this.item = ''
      },
      // removes to do item based on index chosen help from: https://www.youtube.com/watch?v=oYDRUHCytFk
      removeItem (index) {
        this.items.splice(index, 1)
      }
    },
    // creating function to watch for changes made
    watch: {
      items: {
        deep: true,
        handler: function (items) {
          // storing values and to do's to local storage and converting them to a string using JSON
          localStorage.setItem('items', JSON.stringify(items))
        }
      }
    },
    // filtering all to do's that checked values are false and returning the length to detrmine help from: https://www.youtube.com/watch?v=A5S23KS_-bU
    computed: {
      unchecked () {
        return this.items.filter(items => !items.checked).length
      }
    }
})

const vm = app.mount('#app')