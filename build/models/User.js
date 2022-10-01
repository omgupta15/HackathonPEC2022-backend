"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mongoose = require("mongoose");

var config = require("../server-config");

var userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    "default": null
  },
  userType: {
    type: String,
    "enum": [""].concat(_toConsumableArray(config.USER_TYPES)),
    "default": ""
  },
  // language: { type: String, enum: [...] },
  // Workers
  workerTag: {
    type: String,
    "enum": [""].concat(_toConsumableArray(config.WORKER_TAGS)),
    "default": ""
  },
  jobsApplied: [{
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    },
    appliedAt: Date,
    accepted: Boolean
  }],
  // Employers
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }]
}, {
  timestamps: true
});
var User = mongoose.model("User", userSchema);
module.exports = User;