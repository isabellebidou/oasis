const _ = require('lodash')
const mongoose = require('mongoose');
const fs = require("fs");
const nodemailer = require('nodemailer');
const keys = require('../config/keys');
const upload = require("../config/storage-config");


const requireLogin = require('../middlewares/requireLogin');
const logError = require("../services/utils");
const sharp = require('sharp')
const { uploadFile, deleteFile, deleteSeveral, getObjectSignedUrl } = require('../services/s3.js');
const {getSignedUrl} = require('@aws-sdk/cloudfront-signer');
const cloudfrontDomain = 'https://d2bmrisnzhnvp5.cloudfront.net/';



module.exports = (app) => {
  const StudentVideo = mongoose.model('studentvideos');

  const TeacherVideo = mongoose.model('teachervideos');
  function findPathPics(ids) {
    return new Promise((resolve, reject) => {
      StudentVideo.find({ _id: { $in: ids } }, { picPath: 1, type: 1 })
        .exec(function (err, docs) {
          if (err) {
            reject(err); // Reject the promise with the error
          } else {
            resolve(docs); // Resolve the promise with the `docs` array
          }
        });
    });
  }
  //https://www.youtube.com/watch?v=MJhsVDpYzQs&ab_channel=Koding101




  app.delete("/api/user_video/delete", async (req, res) => {
    const idsToDelete = req.body.idsToDelete.map((id) => mongoose.Types.ObjectId(id));
    try {
      const pics = await findPathPics(idsToDelete);
      deleteSeveral(pics);
      const result = await StudentVideo.deleteMany({ _id: { $in: idsToDelete } });
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send("Failed to delete video pics");
    }
  });
  

  app.get("/api/user_videos", async (req, res) => {
    try {
      const videos = await StudentVideo.find({ _user: req.user.id });
      const videoPromises = videos.map(async (video) => {
        //const videoName = 'student/'+req.user.id+'/'+video.step
        video.videoUrl = await getObjectSignedUrl(video.videoPath);
       
      /* const path =  getSignedUrl({
        url: cloudfrontDomain + video.videoPath,
        dateLessThan: new Date(Date.now()+ 1000 * 60 * 60 * 2),
        privateKey: keys.cloudfrontPrivateKey,
        keyPairId:keys.cloudfrontKeyPairId
       })*/
       
       // video.videoUrl = path;
        return video;
      });
      const videosWithUrls = await Promise.all(videoPromises);
      res.send(videosWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.get("/api/selected_user_videos/:id", async (req, res) => {
    try {
      const videos = await StudentVideo.find({ _user: req.user.id });
      const videoPromises = videos.map(async (video) => {
        //const videoName = 'student/'+req.user.id+'/'+video.step
        video.videoUrl = await getObjectSignedUrl(video.videoPath);
       
      /* const path =  getSignedUrl({
        url: cloudfrontDomain + video.videoPath,
        dateLessThan: new Date(Date.now()+ 1000 * 60 * 60 * 2),
        privateKey: keys.cloudfrontPrivateKey,
        keyPairId:keys.cloudfrontKeyPairId
       })*/
       
       // video.videoUrl = path;
        return video;
      });
      const videosWithUrls = await Promise.all(videoPromises);
      res.send(videosWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  app.get("/api/video/:id", async (req, res) => {
    try {
      const videos = await StudentVideo.find({ _id: req.params.id });
      const videoPromises = videos.map(async (video) => {
        //const videoName = 'student/'+req.user.id+'/'+video.step
        video.videoUrl = await getObjectSignedUrl(video.videoPath);
       
      /* const path =  getSignedUrl({
        url: cloudfrontDomain + video.videoPath,
        dateLessThan: new Date(Date.now()+ 1000 * 60 * 60 * 2),
        privateKey: keys.cloudfrontPrivateKey,
        keyPairId:keys.cloudfrontKeyPairId
       })*/
       
       // video.videoUrl = path;
        return video;
      });
      const videosWithUrls = await Promise.all(videoPromises);
      res.send(videosWithUrls);
    }  catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });


  app.get("/api/user_video/:id", async (req, res) => {
    try {
      const videos = await StudentVideo.find({ _user: req.params.id });
      const videoPromises = videos.map(async (video) => {
        //const videoName = 'student/'+req.user.id+'/'+video.step
        video.videoUrl = await getObjectSignedUrl(video.videoPath);
       
      /* const path =  getSignedUrl({
        url: cloudfrontDomain + video.videoPath,
        dateLessThan: new Date(Date.now()+ 1000 * 60 * 60 * 2),
        privateKey: keys.cloudfrontPrivateKey,
        keyPairId:keys.cloudfrontKeyPairId
       })*/
       
       // video.videoUrl = path;
        return video;
      });
      const videosWithUrls = await Promise.all(videoPromises);
      res.send(videosWithUrls);
    }  catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  app.get("/api/teachervideos/", async (req, res) => {
    try {
      const videos = await TeacherVideo.find();
      const videoPromises = videos.map(async (video) => {
       // const path = await getObjectSignedUrl( video.videoPath );
       //https://youtu.be/EIYrhbBk7do?list=PL0X6fGhFFNTcU-_MCPe9dkH6sqmgfhy_M
       video.videoUrl = await getObjectSignedUrl(video.videoPath);
       /*const path =  getSignedUrl({
        url: cloudfrontDomain + video.videoPath,
        dateLessThan: new Date(Date.now()+ 1000 * 60 * 60 * 2),
        privateKey: keys.cloudfrontPrivateKey,
        keyPairId:keys.cloudfrontKeyPairId
       })
        video.imageUrl = path;*/
        return video;
      });
      const videosWithUrls = await Promise.all(videoPromises);
      res.send(videosWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  //https://www.youtube.com/watch?v=NzROCbkvIE0
  app.post("/api/video_upload", requireLogin, upload.single("testImage"), async (req, res) => {

    const videoName = 'student/'+req.user.id+'/'+req.body.step;
    //const videoName = req.body.step + '_' + Date.now() + '_' + req.user.id;

    await uploadFile(req.file.buffer, videoName, req.file.mimetype)

  
    const video = new StudentVideo({

      _step: req.body.step,
      _user: req.user.id,
      dateSent: Date.now(),
      videoPath: videoName,
      type: req.file.mimetype,
      comment: 'test',
      originalname: req.file.originalname,
      step:req.body.stepname
    });
   

    video.save().then((res) => {
      fs.unlinkSync('uploads/' + req.file.filename);
    }).catch((err) => { });
    

    try {

      res.send(video);


    } catch (error) {
      res.status(422).send(error);
    }

  });
  app.post("/api/teacher_video_upload", requireLogin, upload.single("testImage"), async (req, res) => {

    const videoName = 'teacher/'+req.user.id+'/'+req.body.step;
    //const videoName = req.body.step + '_' + Date.now() + '_' + req.user.id;

    await uploadFile(req.file.buffer, videoName, req.file.mimetype)

  
    const video = new TeacherVideo({

      _step: req.body.step,
      _user: req.user.id,
      dateSent: Date.now(),
      videoPath: videoName,
      type: req.file.mimetype,
      comment: 'test',
      originalname: req.file.originalname
    });
   

    video.save().then((res) => {
      fs.unlinkSync('uploads/' + req.file.filename);
    }).catch((err) => { });
    

    try {

      res.send(video);


    } catch (error) {
      res.status(422).send(error);
    }

  });
  /////////////////////////////////////////////
  app.post("/api/videos_left", requireLogin, upload.single("testImage"), async (req, res) => {

    const file = req.file
    const side = 'left'
    const user = req.user.id
    const dateSent = Date.now()
    const imageName = side + '_' + dateSent + '_' + user
    const fileBuffer = await sharp(file.buffer)
      .resize({ format: 'png', height: 180, width: 318, fit: "contain", background: { r: 244, g: 237, b: 237, alpha: 1 } }).flatten()
      .toBuffer()
    await uploadFile(fileBuffer, "videopics/" + imageName + '_resized', file.mimetype)
    await uploadFile(file.buffer, "videopics/" + imageName + '_raw', file.mimetype)
    const video = new StudentVideo({
      side: side,
      _user: user,
      dateSent: dateSent,
      picPath: imageName,
      type: file.mimetype
    });

    video.save().then(() => {
    //  sendNewvideoUploadEmail(imageName, user, side)
      try {
        res.send(video);
      } catch (error) {
        res.send(error);
      }
    });
  });


   app.post("/api/videos_left/:id", requireLogin, upload.single("testImage"), async (req, res) => {

    const file = req.file
    const side = 'left'
    const user = req.params.id
    const dateSent = Date.now()
    const imageName = side + '_' + dateSent + '_' + user
    const fileBuffer = await sharp(file.buffer)
      .resize({ format: 'png', height: 180, width: 318, fit: "contain", background: { r: 244, g: 237, b: 237, alpha: 1 } }).flatten()
      .toBuffer()
    await uploadFile(fileBuffer, "videopics/" + imageName + '_resized', file.mimetype)
    await uploadFile(file.buffer, "videopics/" + imageName + '_raw', file.mimetype)
    const video = new StudentVideo({
      side: side,
      _user: user,
      dateSent: dateSent,
      picPath: imageName,
      type: file.mimetype
    });

    video.save().then(() => {
      //sendNewvideoUploadEmail(imageName, user, side)
      try {
        res.send(video);
      } catch (error) {
        res.send(error);
      }
    });
  });


    app.post("/api/videos_right", requireLogin, upload.single("testImage"), async (req, res) => {

      const file = req.file
      const side = 'right'
      const user = req.user.id
      const dateSent = Date.now()
      const imageName = side + '_' + dateSent + '_' + user
      const fileBuffer = await sharp(file.buffer)
        .resize({ format: 'png', height: 180, width: 318, fit: "contain", background: { r: 244, g: 237, b: 237, alpha: 1 } }).flatten()
        .toBuffer()
      await uploadFile(fileBuffer, "videopics/" + imageName + '_resized', file.mimetype)
      await uploadFile(file.buffer, "videopics/" + imageName + '_raw', file.mimetype)
      const video = new StudentVideo({
        side: side,
        _user: user,
        dateSent: dateSent,
        picPath: imageName,
        type: file.mimetype
      });
  
      video.save().then(() => {
        //sendNewvideoUploadEmail(imageName, user, side)
        try {
          res.send(video);
        } catch (error) {
          res.send(error);
        }
      });
    });

   app.post("/api/videos_right/:id", requireLogin, upload.single("testImage"), async (req, res) => {

    const file = req.file
    const side = 'right'
    const user = req.params.id
    const dateSent = Date.now()
    const imageName = side + '_' + dateSent + '_' + user
    const fileBuffer = await sharp(file.buffer)
      .resize({ format: 'png', height: 180, width: 318, fit: "contain", background: { r: 244, g: 237, b: 237, alpha: 1 } }).flatten()
      .toBuffer()
    await uploadFile(fileBuffer, "videopics/" + imageName + '_resized', file.mimetype)
    await uploadFile(file.buffer, "videopics/" + imageName + '_raw', file.mimetype)
    const video = new StudentVideo({
      side: side,
      _user: user,
      dateSent: dateSent,
      picPath: imageName,
      type: file.mimetype
    });

    video.save().then(() => {
      //sendNewvideoUploadEmail(imageName, user, side)
      try {
        res.send(video);
      } catch (error) {
        res.send(error);
      }
    });
  });

};
