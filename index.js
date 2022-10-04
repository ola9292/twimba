
import { tweetsData } from "./Data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-input')


document.addEventListener('click',function(e){
  
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    if(e.target.dataset.reply){
        handleReplyTweet(e.target.dataset.reply)
    }
    if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick(tweetInput.value)
    }
})

function handleLikeClick(tweetId){
    let targetTweetObj;
    // my way whis also works
    // tweetsData.forEach(function(tweet){
    //     if(tweet.uuid === tweetId){
    //     targetTweetObj = tweet
    //     }
    //    console.log(targetTweetObj)
    // })
    targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    console.log(targetTweetObj.isLiked)
  
   if(!targetTweetObj.isLiked){
    targetTweetObj.likes++
    targetTweetObj.isLiked = true
   }else{
    targetTweetObj.likes--
    targetTweetObj.isLiked = false
   }
    render()
}

function handleReplyTweet(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}
function handleRetweetClick(tweetId){
   let targetRetweetObj;
   targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId   
   })[0]
   if(!targetRetweetObj.isRetweeted){
    targetRetweetObj.retweets++
    targetRetweetObj.isRetweeted = true
   }else{
    targetRetweetObj.retweets--
    targetRetweetObj.isRetweeted = false
   }
   render()
}

function handleTweetBtnClick(){
    
  let newTweet = {
        handle: `@Ola👨‍💻`,
        profilePic: `images/ola (2).jpg`,
        likes: 0,
        retweets: 0,
        tweetText: `${tweetInput.value}`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }   
    if(tweetInput.value){
        tweetsData.unshift(newTweet)
        render()
        tweetInput.value=''
    } 
   
}

function render(){
    const feed = document.getElementById('feed')
    feed.innerHTML = getFeedHtml()
}
render()


function getFeedHtml(){
    let feedHtml = ''

    tweetsData.forEach(function(tweet){
        let retweetIconClass = ''
        let likeIconClass = ''
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }
        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        let repliesHtml = ''
        if(tweet.replies.length >0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
         
        }




        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>  
    </div>`
    })
 
  return feedHtml
}



