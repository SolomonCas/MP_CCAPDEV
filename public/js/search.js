$(document).ready(function(){

    sidebar_search = document.getElementById("nav_search");

	sidebar_search.addEventListener("click", function(){
		let search_bar = document.getElementById("search-sidebar-container");

		if (search_bar.style.display == "none")
			search_bar.style.display = "block";
		else
			search_bar.style.display = "none";

	});

    sidebarSearch = document.getElementById("sidebar_search");
	sidebarSearch.addEventListener("click", function(e){
		e.preventDefault();
		search = $(".search-bar").val(); // side-search
		console.log("@/search2");
		
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