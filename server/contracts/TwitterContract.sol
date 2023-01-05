// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TwitterContract {
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
    mapping(uint => address) tweetToOwner;

    // a func called addTweet takes tweetText and isDeleted (this func will called from frontend - externally)
    function addTweet(string memory tweetText, bool isDeleted) external {
        // set tweetId
        uint tweetId = tweets.length;

        // creat a Tweet Object and push it in tweets
        Tweet memory tweet = Tweet(tweetId, msg.sender, tweetText, isDeleted);
        tweets.push(tweet);

        // map tweetId with its owner address
        tweetToOwner[tweetId] = msg.sender;

        // emit the AddTweet event
        emit AddTweet(msg.sender, tweetId);
    }

    // a func called getAllTweets
    function getAllTweets() external view returns (Tweet[] memory) {
        // create a temp memory for Tweet[] of len tweets.length
        Tweet[] memory temporary = new Tweet[](tweets.length);

        // start counter
        uint counter = 0;
        // store all the tweet which has isDeleted as false in temp memory
        for (uint i = 0; i < tweets.length; i++) {
            if (tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter += 1;
            }
        }

        // create a result memory for Tweet[] of len counter
        Tweet[] memory result = new Tweet[](counter);

        // store all tweets from temp to result
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }

        return result;
    }

    // a func called getMyTweets
    function getMyTweets() external view returns (Tweet[] memory) {
        // same as getAllTweets, just make sure it returns only those tweets
        // whose address matches the address user called this function
        // create a temp memory for Tweet[] of len tweets.length
        Tweet[] memory temporary = new Tweet[](tweets.length);

        // start counter
        uint counter = 0;
        // store all the tweet which has isDeleted as false in temp memory
        for (uint i = 0; i < tweets.length; i++) {
            if (tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter += 1;
            }
        }

        // create a result memory for Tweet[] of len counter
        Tweet[] memory result = new Tweet[](counter);

        // store all tweets from temp to result
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }

        return result;
    }

    // a func called deleteTweet takes tweetId and isDelete
    function deleteTweet(uint tweetId, bool isDeleted) external {
        // check if it has right owner
        if (tweetToOwner[tweetId] == msg.sender) {
            // set isDelete
            tweets[tweetId].isDeleted = isDeleted;

            // emit the event called DeleteTweet with tweetId and isDelete
            emit DeleteTweet(tweetId, isDeleted);
        }
    }
}
