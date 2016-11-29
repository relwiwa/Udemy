var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var Message = require('../models/message');
var User = require('../models/user');

// all routes are relative to /message

router.get('/', function(req, res, next) {
  Message.find()
  .exec(function(err, messages) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: messages
    });
  });
});

router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
});

router.post('/', function(req, res, next) {
  // jwt.decode only decodes, does not verify validity of token
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var message = new Message({
      content: req.body.content,
      user: user
    });

    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      user.messages.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

router.patch('/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {
          message: 'Message not found'
        }
      });        
    }
    message.content = req.body.content;
    // mongoose will overwrite existing message, not create new message
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {
          message: 'Message not found'
        }
      });        
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;