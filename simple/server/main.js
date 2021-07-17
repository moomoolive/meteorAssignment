import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { emailExists, emailDoesNotExist } from "/imports/consts.js";

Meteor.startup(() => {
  console.log("hi");
});

Meteor.methods({
  checkIfEmailExists: function(email) {
    return Accounts.findUserByEmail(email) ? emailExists : emailDoesNotExist
  }
})