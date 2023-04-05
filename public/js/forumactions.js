$(document).ready(function() {
	const postDiv = document.querySelector('#forum-body');
      const postArr = document.getElementsByClassName('forum-post');
      
      for (var post of postArr) {
            let upvote_button = post.getElementsByClassName('upvote')[0];
            let downvote_button = post.getElementsByClassName('downvote')[0];
            let postid = post.getElementsByTagName('p')[0].id;

            checkVoter(upvote_button, downvote_button, postid);
            
            function checkVoter(upvote, downvote, postid){
                  fetch('/checkUpvote?postid=' + postid)
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.message == 'found'){
                              $(upvote).css('opacity', '0.7');
                              $(upvote).data('clicked', true);
                        }
                  }).catch ((error) => {
                              console.error(error);
                  });
      
                  fetch('/checkDownvote?postid=' + postid)
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.message == 'found'){
                              $(downvote).css('opacity', '0.7');
                              $(downvote).data('clicked', true);
                        }
                  }).catch ((error) => {
                              console.error(error);
                  });
            }

            function addToDatabase (postid, numVotes) {

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
            
            function updateVoter (votetype, modify, postid) {
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

                  function upvote(upvote_button, postid) {
                        let vote_count = $(upvote_button).siblings('.vote-count');
                        let downvote_button = $(upvote_button).siblings('.downvote');


                        if (!$(upvote_button).data('clicked') && $(downvote_button).data('clicked') != true) {
                              let votes = Number($(vote_count).text()) + 1;

                              $(vote_count).text(votes);
                              upvote_button.style.opacity = "0.7"

                              $(upvote_button).data('clicked', true);
                              
                              
                              updateVoter('upvote', 'add', postid);
                              addToDatabase(postid, votes);
                        }

                        else if ($(upvote_button).data('clicked') == true){
                              let votes = Number($(vote_count).text()) - 1;
                              $(vote_count).text(votes);

                              upvote_button.style.opacity = "1";
                              $(upvote_button).data('clicked', false);

                              updateVoter('upvote', 'remove', postid);
                              addToDatabase(postid, votes);
                        }

                  }

                  function downvote(downvote_button, postid) {
                        let vote_count = $(downvote_button).siblings('.vote-count');
                        let upvote_button = $(downvote_button).siblings('.upvote');

                        if (!$(downvote_button).data('clicked') && $(upvote_button).data('clicked') != true) {
                              let votes = Number($(vote_count).text()) - 1;
                              $(vote_count).text(votes);
                              downvote_button.style.opacity = "0.7"
                              $(downvote_button).data('clicked', true);

                              updateVoter('downvote', 'add', postid);
                              addToDatabase(postid, votes);
                        }

                        else if ($(downvote_button).data('clicked') == true) {
                              let votes = Number($(vote_count).text()) + 1;
                              $(vote_count).text(votes);
                              downvote_button.style.opacity = "1"
                              $(downvote_button).data('clicked', false);

                              updateVoter('downvote', 'remove', votes);
                              addToDatabase(postid, votes);
                        }
                  }

                  post.addEventListener('click', function(e){
                        if (/\bupvote\b/.test(e.target.className) || /\bdownvote\b/.test(e.target.className)) {
                              let button = e.target;

                              if (button.className == "upvote"){
                                    upvote(upvote_button, postid);
                              }
                              else if (button.className == "downvote"){
                                    downvote(downvote_button, postid);
                              }
                        }


                  })
            
      }


})
      
	