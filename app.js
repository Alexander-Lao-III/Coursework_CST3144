
var BASE = '';

var SAMPLE_LESSONS = [
	{ _id: '1', topic: 'Basketball Training', location: 'Dubai', price: 120, space: 8 },
	{ _id: '2', topic: 'Football Academy', location: 'Abu Dhabi', price: 100, space: 10 },
	{ _id: '3', topic: 'Swimming Lessons', location: 'Sharjah', price: 110, space: 6 },
	{ _id: '4', topic: 'Music Band Practice', location: 'Dubai', price: 95, space: 12 },
	{ _id: '5', topic: 'Art & Crafts', location: 'Dubai', price: 80, space: 9 },
	{ _id: '6', topic: 'Robotics Club', location: 'Dubai', price: 140, space: 7 },
	{ _id: '7', topic: 'Chess Club', location: 'Remote', price: 60, space: 15 },
	{ _id: '8', topic: 'Drama & Theatre', location: 'Abu Dhabi', price: 90, space: 10 },
	{ _id: '9', topic: 'Photography Workshop', location: 'Dubai', price: 125, space: 6 },
	{ _id: '10', topic: 'Coding Club', location: 'Sharjah', price: 115, space: 8 }
];

function debounce(func, wait){
  var timeout;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      func.apply(context, args);
    }, wait);
  };
}

new Vue({
  el: '#app',
  data: {
    lessons: [],
    allLessons: [],
    loading: false,
    error: '',
    sortBy: 'topic',
    sortDir: 'asc',
    searchText: '',
    searchModeBackend: true,
    cart: [],
    showCart: false,
    customer: { name: '', phone: '' },
    orderMessage: ''
  },
  created: function(){
    this.fetchLessons();
    this.debouncedSearch = debounce(this.performSearch, 300);
  },
  methods: {
    iconFor: function(lesson){
      var topic = (lesson && lesson.topic || '').toLowerCase();
      if (topic.indexOf('basketball') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3c0.png';
      if (topic.indexOf('football') !== -1 || topic.indexOf('soccer') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26bd.png';
      if (topic.indexOf('swim') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3ca.png';
      if (topic.indexOf('music') !== -1 || topic.indexOf('band') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3b5.png';
      if (topic.indexOf('art') !== -1 || topic.indexOf('craft') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png';
      if (topic.indexOf('robot') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f916.png';
      if (topic.indexOf('chess') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/265f.png';
      if (topic.indexOf('drama') !== -1 || topic.indexOf('theatre') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3ad.png';
      if (topic.indexOf('photo') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f7.png';
      if (topic.indexOf('coding') !== -1 || topic.indexOf('program') !== -1) return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bb.png';
      return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4da.png';
    },
    onSearchInput: function(){
      if (this.searchModeBackend){
        this.debouncedSearch();
      } else {
        this.performClientSearch();
      }
    },
    fetchLessons: function(){
      this.loading = true;
      this.error = '';
      fetch(BASE + '/lessons')
        .then(function(r){ return r.json(); })
        .then(function(data){
          this.lessons = data;
          this.allLessons = JSON.parse(JSON.stringify(data));
          this.loading = false;
          this.applySort();
        }.bind(this))
        .catch(function(){
          this.lessons = JSON.parse(JSON.stringify(SAMPLE_LESSONS));
          this.allLessons = JSON.parse(JSON.stringify(SAMPLE_LESSONS));
          this.loading = false;
          this.error = '';
          this.applySort();
        }.bind(this));
    },
    applySort: function(){
      var key = this.sortBy;
      var dir = this.sortDir === 'asc' ? 1 : -1;
      this.lessons.sort(function(a,b){
        var av = a[key];
        var bv = b[key];
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    },
    toggleOrder: function(){
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      this.applySort();
    },
    addToCart: function(lesson){
      if (!lesson || lesson.space <= 0) return;
      this.cart.push(Object.assign({}, lesson));
      lesson.space = lesson.space - 1;
    },
    removeFromCart: function(index){
      var item = this.cart.splice(index,1)[0];
      var found = this.lessons.find(function(l){ return l && item && l._id === item._id; });
      if (found) found.space = found.space + 1;
    },
    toggleCart: function(){
      this.showCart = !this.showCart;
      this.orderMessage = '';
    },
    validateName: function(){
      if (!this.customer.name) return false;
      return /^[A-Za-z ]+$/.test(this.customer.name);
    },
    validatePhone: function(){
      if (!this.customer.phone) return false;
      return /^[0-9]+$/.test(this.customer.phone);
    },
    submitOrder: function(){
      this.orderMessage = '';
      if (!this.validateName()){
        this.orderMessage = 'invalid name';
        return;
      }
      if (!this.validatePhone()){
        this.orderMessage = 'invalid phone';
        return;
      }
      if (this.cart.length === 0){
        this.orderMessage = 'cart is empty';
        return;
      }
      this.orderMessage = 'order submitted (mock)';
      this.cart = [];
      this.customer.name = '';
      this.customer.phone = '';
    },
    performClientSearch: function(){
      var q = this.searchText.trim().toLowerCase();
      if (!q){
        this.lessons = JSON.parse(JSON.stringify(this.allLessons));
        this.applySort();
        return;
      }
      var filtered = this.allLessons.filter(function(l){
        return (l.topic && l.topic.toLowerCase().indexOf(q) !== -1)
          || (l.location && l.location.toLowerCase().indexOf(q) !== -1)
          || String(l.price).indexOf(q) !== -1
          || String(l.space).indexOf(q) !== -1;
      });
      this.lessons = filtered;
      this.applySort();
    },
    performSearch: function(){
      var q = this.searchText.trim();
      if (!q){
        this.fetchLessons();
        return;
      }
      var url = BASE + '/search?q=' + encodeURIComponent(q);
      fetch(url)
        .then(function(r){ return r.json(); })
        .then(function(data){
          this.lessons = data;
          this.applySort();
        }.bind(this))
        .catch(function(){
          this.performClientSearch();
        }.bind(this));
    }
  },
  computed: {
    canCheckout: function(){
      return this.validateName() && this.validatePhone() && this.cart.length > 0;
    },
    nameError: function(){
      if (!this.customer.name) return '';
      return this.validateName() ? '' : 'letters only';
    },
    phoneError: function(){
      if (!this.customer.phone) return '';
      return this.validatePhone() ? '' : 'numbers only';
    }
  }
});
