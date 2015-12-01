var NUMPOSTS_TO_GET = 10;
var offset = 0;

function getPosts() {
	var feed_url = "https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/?callback=ajpRspthis";
	feed_url += "&offset=" + offset;
	feed_url += "&number=" + NUMPOSTS_TO_GET;
	$.ajax({
		url: feed_url,
		dataType: 'jsonp',
		jsonpCallback: 'ajpRspthis',
		jsonp: 'callback'
	});
	offset += NUMPOSTS_TO_GET;
}

function ajpRspthis(data){
	if (data.found != 0) {
		var template = $("#itemTemplate").html();
		data.prettydate = function() {
			var newdate = new Date(this.date);
			return newdate.toDateString();
		}
		var result = Mustache.render(template, data);
		$("#posts").append(result);
	}
	else {
		$('#more-btn').hide();
		$('#no-more').show();
	}
}

$(function () {
	getPosts();

	$('#more-btn').click(function() {
		getPosts();
	});
});