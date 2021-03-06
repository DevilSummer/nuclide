"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessagePackager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _invariant = require("../invariant.js");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LENGTH_SEPARATOR = "--";

// Package a message sent or unpackage a message received

var MessagePackager = exports.MessagePackager = function () {
  function MessagePackager(isAdapter) {
    _classCallCheck(this, MessagePackager);

    this._isAdapter = isAdapter;
  }

  _createClass(MessagePackager, [{
    key: "package",


    // package a message to be sent
    value: function _package(contents) {
      // format: <length>--<contents>
      return contents.length + LENGTH_SEPARATOR + contents;
    }

    // unpackage a message received, verify it, and return it
    // returns null if no message or the message is only partially read
    // errors if the message violates the format

  }, {
    key: "unpackage",
    value: function unpackage(contents) {
      // format: <length>--<contents>
      var separatorIndex = contents.indexOf(LENGTH_SEPARATOR);
      // if the separator is not written in yet --> partial read
      if (separatorIndex === -1) {
        return null;
      }
      var messageLength = parseInt(contents.slice(0, separatorIndex), 10);
      // if the part before the separator is not a valid length, it is a
      // violation of protocol
      (0, _invariant2.default)(!isNaN(messageLength));
      var startIndex = separatorIndex + LENGTH_SEPARATOR.length;
      var endIndex = startIndex + messageLength;
      // there should only be one message in the contents at a time
      (0, _invariant2.default)(contents.length <= startIndex + messageLength);
      // if we didn't read the whole message yet --> partial read
      if (contents.length < endIndex) {
        return null;
      }
      var message = contents.slice(startIndex, endIndex);
      return message;
    }
  }]);

  return MessagePackager;
}();
//# sourceMappingURL=MessagePackager.js.map