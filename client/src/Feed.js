import React, { useEffect, useState } from 'react'
import TweetBox from './TweetBox'
import Post from "./Post";
import "./Feed.css";
import { TwitterContractAddress } from './config.js';
import { ethers } from 'ethers';
import Twitter from './utils/TwitterContract.json'

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const getUpdatedTweets = (allTweets, address) => {
        let updatedTweets = [];
        // Here we set a personal flag around the tweets
        for (let i = 0; i < allTweets.length; i++) {
            if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
                let tweet = {
                    'id': allTweets[i].tweetId,
                    'tweetText': allTweets[i].tweetText,
                    'isDeleted': allTweets[i].isDeleted,
                    'username': allTweets[i].username,
                    'personal': true
                };
                updatedTweets.push(tweet);
            } else {
                let tweet = {
                    'id': allTweets[i].id,
                    'tweetText': allTweets[i].tweetText,
                    'isDeleted': allTweets[i].isDeleted,
                    'username': allTweets[i].username,
                    'personal': false
                };
                updatedTweets.push(tweet);
            }
        }
        return updatedTweets;
    }

    const getAllTweets = async () => {
        try {
            const { ethereum } = window
            if (ethereum) {

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);
                let allTweets = await TwitterContract.getAllTweets();

                setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));

            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTweet = key => async () => {
        console.log("key", key);

        // Now we got the key, let's delete our tweet
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(
                    TwitterContractAddress,
                    Twitter.abi,
                    signer
                );

                await TwitterContract.deleteTweet(key, true);
                let allTweets = await TwitterContract.getAllTweets();
                setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
            } else {
                console.log("Ethereum object doesn't exist");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getAllTweets();
    }, []);


    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox />

            {posts.map((post) => (
                < Post
                    key={post.id}
                    displayName={post.username}
                    text={post.tweetText}
                    personal={post.personal}
                    onClick={deleteTweet(post.id)}
                />
            ))}
        </div>
    )
}

export default Feed