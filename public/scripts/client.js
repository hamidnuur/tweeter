/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  let $allTweets = $('#all-tweets');
  $allTweets.empty();
  
  for (let tweet of tweets.reverse()) {
    $allTweets.append(createTweetElement(tweet));
  }
}

const createTweetElement = function (tweet) {
  let $tweet = `
      <article class="tweet">
        <div class="user-name">
          <div class="userContainer">
            <img class="avatar" src="${tweet.user.avatars}">
            <p class="tweet-name">${tweet.user.name}</p>
          </div>
          <div class="tweetusername">
            <p class="username">${tweet.user.handle}</p>
          </div>
        </div>

        <p class="tweet-content">${escape(tweet.content.text)}</p>

        <hr class="bottom-line">

        <footer class="foot">
          <p class="date">${timeago.format(tweet.created_at)}</p>
          <div class="tags">
            <div class="likes"><i class="fas fa-heart"></i></div>
            <div class="retweet"><i class="fas fa-retweet"></i></div>
            <div class="flag"><i class="fas fa-flag"></i></div>
          </div>
        </footer>
      </article><br>`;

  return $tweet;
}

$(document).ready(function () {
  console.log("onReady")

  const loadTweets = () => {
    console.log("loadTweets()")
    $.ajax('/tweets', {
      type: 'GET',
    }).then(function (res) {
      console.log(res);
      renderTweets(res);
    });
  };

  loadTweets();

  $("#compose").submit(function (event) {
    event.preventDefault();
    $('.emptyErr').hide()
    $('.longErr').hide()
    
    const text = $('#tweet-text').val();
    const formData = $(this).serialize();

    console.log(text)
    console.log(formData)

    if (text === "") {
      return $('.emptyErr').slideDown();
    }

    if (text.length > 140) {
      return $('.longErr').slideDown();
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (data) {
        console.log("helo")
        $('#tweet-text').val("");
        loadTweets();
      }
    });
  });
});
