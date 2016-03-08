var utils = (function(){
	var api = {};

	if (!String.hasOwnProperty('endsWith')){
		String.prototype.endsWith = function(str){
			return this.match(str + "$") == str;
		};
	}

	api.parse_step_from_url = function(url){
		var step_re = /step\/(\d+)/;
		var match = step_re.exec(url);
		if (match && match.length >= 1){
			return match[1];
		}
		return null;
	};

	return api;
})();
