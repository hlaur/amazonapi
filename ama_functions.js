$(document).ready(function() {
  var globalRequest = 0;

	$('#search').bind('keyup', function(event) {
		if (event.keyCode == 13) {
			searchAction();
		}
	});

	$('#search-link').bind('click', function(event) {
		searchAction();
	});

	var searchAction = function() {
		var value = $('#search').val();
		var cat = $('#category').val();
		var country = $('#country').val();
		var page = $('#page').val();
		
		var track = value + " - " + cat + " - " + country;
		
		var resultContainer = $('#results');

		if (value.length < 3 && globalRequest == 1) {
			return;
		}

		//_gaq.push(['_trackEvent', 'Search', track]);

		globalRequest = 1;

		$.ajax({
			  url: "search.php",
			  dataType: 'json',
			  type: 'GET',
			  data: "q="+value+"&category="+cat+"&country="+country+"&page="+page,
			  success: function(data){
				globalRequest = 0;
				resultContainer.fadeOut('fast', function() {
					resultContainer.html('');

					for (var x in data) {

						if (!data[x].price)
							data[x].price = 'kA';

						if (!data[x].img)
							data[x].img = 'assets/images/no.gif';

						var html = '<div class="res-container">';
						html += '<h2><a href="'+data[x].url+'" target="_blank">'+data[x].Title+'</a></h2>';
						html += '<img src="'+data[x].img+'">';
						html += '<h3>Price: '+data[x].price+'</h3>';
						html += '</div>';

						resultContainer.append(html);
					}

					resultContainer.fadeIn('fast');
				});

			  }
			});
	};
});