import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Comments from '/imports/api/comments.js';

import { emailExists, emailDoesNotExist } from "/imports/consts.js";

Meteor.startup(() => {
  Comments.insert({ email: "random@hotmail.com", text: "a comment", createdAt: new Date() });
});

Meteor.methods({
  checkIfEmailExists: function(email) {
    return Accounts.findUserByEmail(email) ? emailExists : emailDoesNotExist
  },
  // although I could have made the comment schema use the userid
  // instead of duplicating their email but this way is far simpler and
  // allows for more efficent queries. The duplication also doesn't matter much
  // as users emails cannot be changed anyways
  createComment: function(email, text) {
    return Comments.insert({ email, text, createdAt: new Date() })
  }
})