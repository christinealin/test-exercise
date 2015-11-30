var NUMPOSTS_TO_GET = 10;
var offset = 0;

function getPosts() {
	var feed = "https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/?callback=ajpRspthis";
	feed += "&offset=" + offset;
	feed += "&number=" + NUMPOSTS_TO_GET;
	$.ajax({
		url: feed,
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
		$('#getmore').hide();
		$('#nomore').show();
	}
}

$(function () {
	getPosts();

	$('#getmore').click(function() {
		getPosts();
	});
});