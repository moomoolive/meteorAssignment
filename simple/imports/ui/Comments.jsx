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

    // check if user is authenticated on component load
    useEffect(() => {
        /*
        if (!user) {
            history.push("/");
            return window.alert("Please login to view this page");
        }*/
    }, [])

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
        </div>
    )
}