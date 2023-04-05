$(document).ready(function() {
	const postID = document.getElementById("postID").textContent;
      const postid = postID.substring(1);

      checkVoter();
   
    
      document.body.addEventListener('click', function(e) {
            if (/\bupvote\b/.test(e.target.className) || /\bdownvote\b/.test(e.target.className)) {
                  let button = e.target

                  if (e.target.className == "upvote") {
                        upvote(button);
                  }

                  else if (e.target.className == "downvote") {
                        downvote(button);
                  }
 
            }
      })

	function addToDatabase () {
		let numVotes = document.getElementById("post-vote-count").innerText;

		fetch('/vote?postid=' + postid + '&vote=' + numVotes)
            .then ((res) => {
                if(res.status >= 200 && res.status < 300) {
                }
                else {
                    console.log("response error: " + res.status);
                }
            }).catch ((error) => {
                console.error(error);
            });

                  
                  
	}

      function updateVoter (votetype, modify) {
            if (votetype == 'upvote') {
                  if (modify == 'add'){
                        fetch('/addUpvoter?postid=' + postid)
                        .then ((res) => {
                              if(res.status >= 200 && res.status < 300) {
                              }
                              else {
                                  console.log("response error: " + res.status);
                              }
                          }).catch ((error) => {
                              console.error(error);
                         });
                  }
                  else if (modify == 'remove'){
                        fetch('/removeUpvoter?postid=' + postid)
                        .then ((res) => {
                              if(res.status >= 200 && res.status < 300) {
                              }
                              else {
                                  console.log("response error: " + res.status);
                              }
                          }).catch ((error) => {
                              console.error(error);
                         });
                  }
            }
            if (votetype == 'downvote') {
                  if (modify == 'add'){
                        fetch('/addDownvoter?postid=' + postid)
                        .then ((res) => {
                              if(res.status >= 200 && res.status < 300) {
                              }
                              else {
                                  console.log("response error: " + res.status);
                              }
                          }).catch ((error) => {
                              console.error(error);
                         });
                  }
                  else if (modify == 'remove'){
                        fetch('/removeDownvoter?postid=' + postid)
                        .then ((res) => {
                              if(res.status >= 200 && res.status < 300) {
                              }
                              else {
                                  console.log("response error: " + res.status);
                              }
                          }).catch ((error) => {
                              console.error(error);
                         });
                  }
            }
      }


	function upvote(upvote_button) {
		let vote_count = $(upvote_button).siblings('.vote-count');
		let downvote_button = $(upvote_button).siblings('.downvote');


		if (!$(upvote_button).data('clicked') && $(downvote_button).data('clicked') != true) {
			let votes = Number($(vote_count).text()) + 1;

			$(vote_count).text(votes);
			upvote_button.style.opacity = "0.7"

			$(upvote_button).data('clicked', true);
                  
                  
                  updateVoter('upvote', 'add');
			addToDatabase();
		}

		else if ($(upvote_button).data('clicked') == true){
			let votes = Number($(vote_count).text()) - 1;
			$(vote_count).text(votes);

			upvote_button.style.opacity = "1";
			$(upvote_button).data('clicked', false);

                  updateVoter('upvote', 'remove');
			addToDatabase();
		}

	}

	function downvote(downvote_button) {
		let vote_count = $(downvote_button).siblings('.vote-count');
		let upvote_button = $(downvote_button).siblings('.upvote');

		if (!$(downvote_button).data('clicked') && $(upvote_button).data('clicked') != true) {
			let votes = Number($(vote_count).text()) - 1;
			$(vote_count).text(votes);
			downvote_button.style.opacity = "0.7"
			$(downvote_button).data('clicked', true);

                  updateVoter('downvote', 'add');
			addToDatabase();
		}

		else if ($(downvote_button).data('clicked') == true) {
			let votes = Number($(vote_count).text()) + 1;
			$(vote_count).text(votes);
			downvote_button.style.opacity = "1"
			$(downvote_button).data('clicked', false);

                  updateVoter('downvote', 'remove');
			addToDatabase();
		}
	}

      function checkVoter() {
            fetch('/checkUpvote?postid=' + postid)
            .then((res) => res.json())
            .then((data) => {
                  if (data.message == 'found'){
                        $('#upvoteIcon').css('opacity', '0.7');
                        $('#upvoteIcon').data('clicked', true);
                  }
            }).catch ((error) => {
                        console.error(error);
            });

            fetch('/checkDownvote?postid=' + postid)
            .then((res) => res.json())
            .then((data) => {
                  if (data.message == 'found'){
                        $('#downvoteIcon').css('opacity', '0.7');
                        $('#downvoteIcon').data('clicked', true);
                  }
            }).catch ((error) => {
                        console.error(error);
            });
      }

})