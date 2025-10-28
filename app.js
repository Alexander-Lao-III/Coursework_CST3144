
var BASE = '';

new Vue({
  el: '#app',
  data: {
    lessons: [],
    allLessons: [],
    loading: false,
    error: ''
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
    }
  }
});

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
