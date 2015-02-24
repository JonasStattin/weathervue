(function(){

	var searchBox = new Vue({
		el: '#searchBox',
		data: {
			location: ''
		},
		methods: {
			onAddClick: function(e) {
				e.preventDefault();
				if(this.location !== '') {
					superagent.get('http://api.openweathermap.org/data/2.5/weather?q='+this.location+'&units=metric', parseWeather);
					this.location = '';
				}
			}
		}
	});

	var locationList = new Vue({
		el: '#locationList',
		data: {
			title: 'locations',
			locations: [],
			setColorByTemp: function(temp) {
				if(temp <= 5) {
					return 'cold';
				} else if(temp >= 25) {
					return 'hot';
				} else {
					return 'average';
				}
			}
		},
		methods: {
			onDeleteClick: function(e) {
				this.locations.splice(e.targetVM.$index, 1);
			}
		}
	});

	function parseWeather(res) {
		var data = JSON.parse(res.text);
		locationList.locations.push(data);
	}

	//locationList.locations.push( {"coord":{"lon":18.06,"lat":59.33},"sys":{"message":0.031,"country":"SE","sunrise":1424757483,"sunset":1424793825},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01d"}],"base":"cmc stations","main":{"temp":1.189,"temp_min":1.189,"temp_max":1.189,"pressure":1010.88,"sea_level":1013.93,"grnd_level":1010.88,"humidity":90},"wind":{"speed":3.63,"deg":187.002},"clouds":{"all":0},"dt":1424789307,"id":2673730,"name":"Stockholm","cod":200} );

	/*
	var presetCities = ['london', 'paris', 'stockholm'];
	presetCities.forEach(function(city) {
		superagent.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric', parseWeather);
	});
	*/

})();
