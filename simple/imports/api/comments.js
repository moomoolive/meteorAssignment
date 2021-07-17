import { Mongo } from 'meteor/mongo';

const collection = new Mongo.Collection("comments");

export default collection