import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { emailExists } from "/imports/consts.js";

import styles from '/imports/styles.css';

export default function Signup() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const history = useHistory();
    
    function onSubmit(event) {
        event.preventDefault();
        Meteor.call("checkIfEmailExists", email, function(err, result) {
            if (err) {
                return window.alert("An error occured when creating account")
            } else if (result === emailExists) {
                return window.alert("email is already taken")
            }
            Accounts.createUser({ email, password });
            history.push("/");
            window.alert("Succesfully created account"); 
        })
    }

    return (
        <div className="form-container">
            <div>
                <h2>Create Your Account</h2>
            </div>

            <div>
                <form onSubmit={ onSubmit }>
                    <label htmlFor="email">Account Email:</label><br/>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        minLength="6" 
                        value={ email }
                        placeholder="meteor_user"
                        onChange={ e => setEmail(e.target.value) }
                    /><br/>
                    <label htmlFor="password">Account Password:</label><br/>
                    <input 
                        type="text" 
                        id="password" 
                        name="password"
                        minLength="6" 
                        value={ password }
                        placeholder="123456"
                        onChange={ e => setPassword(e.target.value) } 
                    /><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>

            <div>
                <nav>
                    <Link to="/">
                        <button className="create-account-button">
                            To Login
                        </button>
                    </Link>
                </nav>
            </div>

        </div>
    )
}