$(document).ready(function() {

	//Needs to implement for searching users
	homeSearch = document.getElementById("home_search");
	homeSearch.addEventListener("click", function(e){
		e.preventDefault();
		search = $("#home-search-bar").val(); // home-search
		
		if(search != ""){
			//If # is the first character, then it searches for the post
			if(search[0] == '#'){
				let s1 = search.slice(1, search.length);
				fetch('/search/post/'+ s1).then((res) => {
					if(res.redirected){
						window.location.href = res.url;
					}
					else{
						console.log("response error" + res.status);
					}
				}).catch((error) =>{
					console.error(error);
				})
			}
			// If / is the first character, then it searches for the page
			else if(search[0] == '/'){
				let s2 = search.slice(1, search.length);
				fetch('/search/page/'+s2).then((res) => {
					if(res.redirected){
						window.location.href = res.url;
					}
					else{
						console.log("response error" + res.status);
					}
				}).catch((error) => {
					console.error(error);
				})
			}
			// If @ is the first character, then it searches for the profile
			else if(search[0] == '@'){
				let s3 = search.slice(1, search.length);
				fetch('/search/profile/'+s3).then((res) => {
					if(res.redirected){
						window.location.href = res.url;
					}
					else{
						console.log("response error" + res.status);
					}
				}).catch((error) => {
					console.error(error);
				})
			}
			// else do nothing
		}
		
	})

})