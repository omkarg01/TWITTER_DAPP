import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
import { Button } from "@material-ui/core";
import axios from 'axios';
import { TwitterContractAddress } from './config.js';
import { ethers } from 'ethers';
import Twitter from './utils/TwitterContract.json'

const TweetBox = () => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const [avatarOptions, setAvatarOptions] = useState("");

    const sendTweet = (e) => {
        e.preventDefault();

        addTweet();

        setTweetMessage("");
        setTweetImage("");
    };

    useEffect(() => {
        let avatar = generateRandomAvatarOptions();
        setAvatarOptions(avatar);
    }, []);

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar
                        style={{ width: '100px', height: '100px' }}
                        avatarStyle='Circle'
                        {...avatarOptions}
                    />
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>
                <input
                    value={tweetImage}
                    onChange={(e) => setTweetImage(e.target.value)}
                    className="tweetBox__imageInput"
                    placeholder="Optional: Enter image URL"
                    type="text"
                />

                <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox__tweetButton"
                >
                    Tweet
                </Button>
            </form>
        </div>
    )
}

export default TweetBox