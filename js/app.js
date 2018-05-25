(function (window, Vue) {
  // var array = [{ id: 1, title: '吃饭', done: false }, { id: 2, title: '睡觉', done: true }, { id: 3, title: '写代码', done: false }, { id: 4, title: '吃饭', done: false }]
  var array = JSON.parse(window.localStorage.getItem('array') || '[]')

  // 自定义指令 全局的
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
  var app = new Vue({
    el: '#app',
    data: {
      array: array,
      currentEdit: null,
      storageArray: [],
      hash: ''
    },
    methods: {
      // 添加数据方法
      addTodos: function (e) {
        const inputText = e.target.value
        if (!inputText.trim()) {
          return
        }
        const lastArray = array[array.length - 1]
        const id = lastArray ? lastArray.id + 1 : 1
        array.push({
          id: id,
          title: inputText,
          done: false
        })
        e.target.value = ''
      },

      // 删除todos
      removeTodo: function (index) {
        this.array.splice(index, 1)
      },

      // 双击编辑todos
      editTodo: function (item) {
        this.currentEdit = item
      },

      // 保存编辑
      saveTodo: function (item, index, e) {
        var value = e.target.value
        if (!value.trim()) {
          array.splice(index, 1)
        } else {
          item.title = value
          this.currentEdit = null
        }
      },

      // 取消编辑
      cancelEdit: function () {
        this.currentEdit = null
      },

      // 清除所有已完成的任务
      clearCompleted: function () {
        for (let i = 0; i < this.array.length; i++) {
          if (array[i].done === true) {
            this.array.splice(i, 1)
            i--
          }
        }
      },
    },

    // 计算属性 
    // 获取所有未完成的任务
    computed: {
      getRemaing: function () {
        return this.array.filter(function (item) {
          return item.done === false
        }).length
      },
      toggleAllStat: {
        // 一上来就调用
        get: function () {
          console.log('get方法调用了')
          const toggleAll = this.array.every(function (item) {
            return item.done === true
          })
          return toggleAll
        },

        // 全选反选
        set: function (val) {
          console.log('set方法调用了---', val)
          this.array.forEach(function (item) {
            item.done = val
          })
        }
      }
    },

    // 监视
    watch: {
      array: {
        handler: function () {
          window.localStorage.setItem('array', JSON.stringify(this.array))
          // window.onhashchange()
        },
        deep: true
      }
    },

    // 编辑自动获取焦点
    directives: {
      'todo-focus': {
        update(el, bindling) {
          if (bindling.value === true) {
            el.focus()
          }
        }
      }
    },


  })

  // 实现 active 和completed
  window.app = app
  window.onhashchange = function () {
    const { hash } = window.location
    app.hash = hash
    // console.log(hash)
    switch (hash) {
      case '#/active':
        console.log('active')
        app.storageArray = app.array.filter(function (item) {
          return item.done === false
        })
        break
      case '#/completed':
        console.log('completed')
        app.storageArray = app.array.filter(function (item) {
          return item.done === true
        })
        break
      default:
        app.hash = '#/'
        app.storageArray = app.array
        break
    }
  }

  window.onhashchange()
})(window, Vue)