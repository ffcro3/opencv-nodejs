import 'dotenv/config';
import path from 'path';
import cv from 'opencv4nodejs';
import aws from 'aws-sdk';

class WebcamController {
  async store(req, res) {
    const { io } = req;
    const fps = 10;
    const wCap = new cv.VideoCapture(0);
    wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 600);
    wCap.set(cv.CAP_PROP_FRAME_WIDTH, 600);

    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETKEY,
      region: 'us-east-1',
    });

    res.sendFile(
      path.resolve(__dirname, '..', '..', '..', 'public', 'index.html')
    );

    setInterval(() => {
      const rekognition = new aws.Rekognition();
      const frame = wCap.read();
      const image = cv.imencode('.jpg', frame).toString('base64');
      const AWSImage = cv.imencode('.jpg', frame);
      const buffer = new Buffer.from(AWSImage, 'base64');
      const params = {
        Image: {
          Bytes: buffer,
        },
        Attributes: ['ALL'],
      };
      // eslint-disable-next-line func-names
      rekognition.detectFaces(params, function(err, data) {
        if (err) {
          console.log(err);
        }
        if (data) {
          io.emit('box', data.FaceDetails);
        }
      });
      io.emit('image', image);
    }, 1000 / fps);
  }
}

export default new WebcamController();
