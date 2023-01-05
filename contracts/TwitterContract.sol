// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TwitterContract{

    // create a struct Tweet field id, address, tweetText, isDeleted
    struct Tweet {
        uint tweetId;
        address username;
        string tweetText;
        bool isDeleted;
    }

    // create a event AddTweet takes address and tweetId
    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);

    // a private arr DS for storing all tweets
    Tweet[] private tweets;

    // a map of tweet id to owner address
    mapping (uint => address) tweetToOwner;


    // a func called addTweet takes tweetText and isDeleted (this func will called from frontend - externally)
    function addTweet(string memory tweetText, bool isDeleted) externally {
        // set tweetId
        uint tweetId = tweets.length;

        // creat a Tweet Object and push it in tweets
        Tweet tweet = Tweet(tweetId, msg.sender, tweetText, isDeleted);
        tweets.push(tweet);

        // map tweetId with its owner address
        tweetToOwner[tweetId] = msg.sender;

        // emit the AddTweet event
        emit AddTweet(msg.sender, tweetId);
    }


    // a func called getAllTweets
    {
        // create a temp memory for Tweet[] of len tweets.length

        // start counter
        // store all the tweet which has isDeleted as false in temp memory

        // create a result memory for Tweet[] of len counter
        // store all tweets from temp to result

        // return result;
    }

    // a func called getMyTweets
    {
        // same as getAllTweets, just make sure it returns only those tweets 
        // whose address matches the address user called this function
    }

    // a func called deleteTweet takes tweetId and isDelete
    {
        // check if it has right owner

        // set isDelete

        // emit the event called DeleteTweet with tweetId and isDelete
    }

}