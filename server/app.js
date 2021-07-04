const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/itLoggerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const logSchema = {
  message: String,
  attention: Boolean,
  tech: String,
  date: String,
};

const Log = mongoose.model('Log', logSchema);

const techSchema = {
  firstName: String,
  lastName: String,
};

const Tech = mongoose.model('Tech', techSchema, 'techs');

app
  .route('/logs')
  .get(function (req, res) {
    Log.find({}, function (err, foundLogs) {
      if (!err) res.send(foundLogs);
      else res.send(err);
    });
  })
  .post(function (req, res) {
    const newLog = new Log({
      message: req.body.message,
      attention: req.body.attention,
      tech: req.body.tech,
      date: req.body.date,
    });
    newLog.save(function (err) {
      if (!err) res.send(newLog);
      else res.send(err);
    });
  });

app
  .route('/logs/:id')
  .get(function (req, res) {
    var id = req.params.id;

    Log.find({ _id: id }, function (err, foundLog) {
      if (!err) res.send(foundLog);
      else res.send(err);
    });
  })
  .put(function (req, res) {
    var id = req.params.id;
    Log.findOneAndUpdate(
      { _id: id },
      {
        message: req.body.message,
        attention: req.body.attention,
        tech: req.body.tech,
        date: req.body.date,
      },
      { overwrite: true, new: true, useFindAndModify: false },
      function (err, updatedLog) {
        if (!err) {
          res.send(updatedLog);
        } else res.send(err);
      }
    );
  })
  .delete(function (req, res) {
    var id = req.params.id;
    Log.deleteOne({ _id: id }, function (err) {
      if (err) res.send(err);
    });
  });

app
  .route('/techs')
  .get(function (req, res) {
    Tech.find({}, function (err, foundTechs) {
      if (!err) res.send(foundTechs);
      else res.send(err);
    });
  })
  .post(function (req, res) {
    const newTech = new Tech({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    newTech.save(function (err) {
      if (!err) res.send(newTech);
      else res.send(err);
    });
  });

app
  .route('/techs/:id')
  .get(function (req, res) {
    var id = req.params.id;
    Tech.find({ _id: id }, function (err, foundTech) {
      if (!err) res.send(foundTech);
      else res.send(err);
    });
  })
  .delete(function (req, res) {
    var id = req.params.id;
    Tech.deleteOne({ _id: id }, function (err) {
      if (err) res.send(err);
    });
  });

app.listen(5000, function () {
  console.log('Server started on port 5000');
});
