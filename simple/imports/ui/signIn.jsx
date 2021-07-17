import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';

import styles from '/imports/styles.css';

export default function SignIn() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const user = useTracker(() => Meteor.user());

    const history = useHistory();

    // check if user is authenticated on component load
    useEffect(() => {
        if (user) {
            history.push("/comments");
        }
    }, [])
    
    function onSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword({ email }, password, function(err) {
            if (err) {
                return window.alert("A problem occured when signing in!")
            }
            history.push("/comments");
        })
    }

    return (
        <div className="form-container">
            <div>
                <h2>Please Sign in to View Comments</h2>
            </div>

            <div>
                <form onSubmit={ onSubmit }>
                    <label htmlFor="email">Email:</label><br/>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        value={ email }
                        placeholder="meteor_user"
                        onChange={ e => setEmail(e.target.value) }
                    /><br/>
                    <label htmlFor="password">Password:</label><br/>
                    <input 
                        type="text" 
                        id="password" 
                        name="password" 
                        value={ password }
                        placeholder="123456"
                        onChange={ e => setPassword(e.target.value) } 
                    /><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>

            <div>
                <nav>
                    <Link to="/create-account">
                        <button className="create-account-button">
                            Create Account
                        </button>
                    </Link>
                </nav>
            </div>

        </div>
    )
}