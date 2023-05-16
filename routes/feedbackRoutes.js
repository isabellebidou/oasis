const _ = require('lodash')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const nodemailer = require('nodemailer');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const { uploadFile, deleteFile, deleteSeveral, getObjectSignedUrl } = require('../services/s3.js');
const upload = require("../config/storage-config");


const { response } = require('express');
const logError = require("../services/utils");

module.exports = (app) => {
  const Feedback = mongoose.model('feedbacks');

  const sendTestEmail = () => {
    return new Promise((resolve, reject) => {

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'isa.bidou@gmail.com',
          pass: keys.nodemailer,
          clientId: keys.googleClientID,
          clientSecret: keys.googleClientSecret,
          refreshToken: keys.refreshToken
        },
        from: 'isa.bidou@gmail.com',
      })

      const mail_option = {
        from: 'isa.bidou@gmai.com',
        to: 'isa.bidou@gmai.com',
        subject: 'new video uploaded!',
        text: 'a video was uploaded'

      }
      transporter.sendMail(mail_option, (error, info) => {
        if (error) {
          //logError(error)
          return reject({ message: `an error has occured` })
        }
        return resolve({ message: `email sent successfully` })

      })

    })

  }

  /*const sendNewReadingEmail = (offer, user, order) => {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'isa.bidou@gmail.com',
          pass: keys.nodemailer
        }
      })
  
      const mail_option = {
        from:'isa.bidou@gmai.com',
        to: 'isa.bidou@gmai.com',
        subject: 'new reading booked',
        text: 'a reading was booked. offer id: '+ offer + ' user id: '+user+ ' reading id: '+order
      }
      transporter.sendMail(mail_option, (error, info) => {
        if (error) {
          //logError(error)
          return reject({message: `an error has occured`})
        }
        return resolve({message: `email sent successfully`})
  
      })
  
    })
  
  }*/
  app.get("/api/testemail", (req, res) => {

    sendTestEmail()
      .then(response => res.send(response.message))
      .catch(error => res.status(500).send(error.message))

  })

  app.get("/api/feedbacks", requireLogin, async (req, res) => {

    // const feedbacks = await Feedback.find(({ _user: req.user.id }))
    const userId = req.user.id;

    try {
      const feedbacks = await Feedback.aggregate([
        {
          $match: { _user: ObjectId(userId) }
        },
        {
          $lookup: {
            from: 'studentvideos',
            localField: '_studentVideo',
            foreignField: '_id',
            as: 'videoSteps'
          }
        },
        {
          $unwind: '$videoSteps'
        },
        {
          $project: {
            _id: 1,
            _user: 1,
            _studentVideo: 1,
            dateSent: 1,
            dateCompleted: 1,
            expectations: 1,
            pdfPath:1,
            'videoSteps._id': 1,
            'videoSteps._step': 1,
            'videoSteps._user': 1,
            'videoSteps.step': 1,
            'videoSteps.dateSent': 1,
            'videoSteps.videoPath': 1,
            'videoSteps.videoUrl': 1,
            'videoSteps.type': 1,
            'videoSteps.comment': 1,
            'videoSteps.originalname': 1
          }
        }
      ]);

      const feedbackPromises = feedbacks.map(async (feedback) => {
        // const path = await getObjectSignedUrl( video.videoPath );
        //https://youtu.be/EIYrhbBk7do?list=PL0X6fGhFFNTcU-_MCPe9dkH6sqmgfhy_M
        if (feedback.pdfPath){feedback.pdfUrl = await getObjectSignedUrl(feedback.pdfPath);}

         return feedback;
       });
       const feedbacksWithUrls = await Promise.all(feedbackPromises);
       res.send(feedbacksWithUrls);

      
    } catch (error) {
      // Handle error
      res.status(500).send("An error occurred");
    }

  })

  app.get("/api/feedbacks/completed", requireLogin, async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ dateCompleted: { $ne: null }, _user: req.user.id });
      res.send(feedbacks);
    } catch (err) {
      //logError(err);
      res.status(500).send('Server error');
    }

  })


  app.get("/api/feedbacks/pending", requireLogin, async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ dateCompleted: null }).aggregate([
        {
          $lookup:
          {
            from: "users",
            localField: "_user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $sort: {
            "name": 1
          }
        }
      ]).exec((err, users) => {
        if (err) {
          //logError(err);
        } else {
          res.send(users);
        }
      });
    } catch (err) {
      //logError(err);
      res.status(500).send('Server error');
    }
    res.send(feedbacks);

  })


  app.get("/api/feedback/:id", requireLogin, async (req, res) => {
    const userId = req.params.id;

    try {
      const feedbacks = await Feedback.aggregate([
        {
          $match: { _user: ObjectId(userId) }
        },
        {
          $lookup: {
            from: 'studentvideos',
            localField: '_studentVideo',
            foreignField: '_id',
            as: 'videoSteps'
          }
        },
        {
          $unwind: '$videoSteps'
        },
        {
          $project: {
            _id: 1,
            _user: 1,
            _studentVideo: 1,
            dateSent: 1,
            dateCompleted: 1,
            expectations: 1,
            pdfPath:1,
            'videoSteps._id': 1,
            'videoSteps._step': 1,
            'videoSteps._user': 1,
            'videoSteps.step': 1,
            'videoSteps.dateSent': 1,
            'videoSteps.videoPath': 1,
            'videoSteps.videoUrl': 1,
            'videoSteps.type': 1,
            'videoSteps.comment': 1,
            'videoSteps.originalname': 1
          }
        }
      ]);

      const feedbackPromises = feedbacks.map(async (feedback) => {
        // const path = await getObjectSignedUrl( video.videoPath );
        //https://youtu.be/EIYrhbBk7do?list=PL0X6fGhFFNTcU-_MCPe9dkH6sqmgfhy_M
        if (feedback.pdfPath){feedback.pdfUrl = await getObjectSignedUrl(feedback.pdfPath);}

         return feedback;
       });
       const feedbacksWithUrls = await Promise.all(feedbackPromises);
       res.send(feedbacksWithUrls);


    } catch (error) {
      // Handle error
      res.status(500).send("An error occurred");
    }
  });

  app.post("/api/document_upload", requireLogin, upload.single("document"), async (req, res) => {
    console.log(req.file)
    const pdfName = 'pdf/' + req.user.id + '/' + req.body.stepName;
    await uploadFile(req.file.buffer, pdfName, req.file.mimetype)
    const feedback = await Feedback.findById(req.body.feedbackId);
    feedback.pdfPath = pdfName;
    feedback.dateCompleted = Date.now();

    await feedback.save();
    try {
      res.send(feedback);
    } catch (error) {
      res.status(422).send(error);
    }

  });
  app.get("/api/download_pdf/:path", requireLogin, async (req, res) => {
    try {
     
      const url =  await getObjectSignedUrl(req.params.path);
      console.log(url)
  res.send(url)
      //res.download(url, "feedback.pdf"); // Example of sending the file for download
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while downloading the PDF.");
    }
  });
  

  app.post("/api/feedback", requireLogin, async (req, res) => {
    const { offerId, expectations, videoId } = req.body;
    console.log(videoId)
    const feedback = new Feedback({
      expectations,
      _offer: offerId,
      _user: req.user.id,
      _studentVideo: videoId,
      dateSent: Date.now()
    });

    try {
      req.user.numberOfFeedbacks += 1;
      const user = await req.user.save();

      await feedback.save(); // Save the feedback instance to the database

      res.send(feedback);
    } catch (error) {
      res.status(422).send(error);
    }
  });


};
