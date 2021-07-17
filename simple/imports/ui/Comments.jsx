import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import CommentsCollection from '/imports/api/comments.js';

import styles from '/imports/styles.css';

export default function Comments() {
    const history = useHistory();
    
    const user = useTracker(() => Meteor.user());
    const comments = useTracker(() => {
        return CommentsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    })
    const [commentText, setCommentText] = useState("");

    // check if user is authenticated on component load
    useEffect(() => {
        if (!user) {
            history.push("/");
            return window.alert("Please login to view this page");
        }
    }, [])

    function onSubmit(event) {
        event.preventDefault();
        if (commentText.length < 1) {
            return window.alert("Comment must contain at least 1 letter!")
        }
        const email = user.emails[0].address;
        Meteor.call("createComment", email, commentText, (err, result) => {
            if (err) {
                return window.alert("Error creating comment")
            }
        });
    }

    function renderComments(comments) {
        return comments.map((c, i) => {
            const date =  new Date(c.createdAt);
            return (
                <div key={ i } className="comment-container">
                    
                    <div>
                        { c.email }
                    </div>

                    <div>
                        { c.text }
                    </div>

                    <div>
                        { date.toLocaleDateString("en-US") }
                        { "  " } 
                        { date.toLocaleTimeString("en-US") }
                    </div>

                </div>
            )
        })
    }

    return (
        <div>
            <h1 className="comments-header">All Posted Comments</h1>

            <div className="all-comments-container">
                { renderComments(comments) }
            </div>

            <div className="create-comment-container">
                <form onSubmit={ onSubmit }>
                    <div className="comment-input-container">
                        <div>
                            <input
                                className="comment-input-text" 
                                type="text" 
                                id="comment-text"
                                minLength="1" 
                                name="comment-text" 
                                value={ commentText }
                                placeholder="enter your comment here!"
                                onChange={ e => setCommentText(e.target.value) } 
                            />
                        </div>
                        <div>
                            <input className="comment-input-submit-button" type="submit" value="Submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}