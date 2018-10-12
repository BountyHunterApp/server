const request = require('request');

const subscriptionKey = 'f2befa928a1145cab4c1b42f07cd0193';

const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
                'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};
class FaceIdentity {

        static getInfoImage(req, res,next) {
                
                const imageUrl = req.file.cloudStoragePublicUrl
                console.log(imageUrl)
                if (imageUrl) {
                        const options = {
                                uri: uriBase,
                                qs: params,
                                body: '{"url": ' + '"' + imageUrl + '"}',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'Ocp-Apim-Subscription-Key': subscriptionKey
                                }
                        };
                        console.log('----')
                        request.post(options, (error, response, body) => {
                                if (error) {
                                        console.log('Error: ', error);
                                        return;
                                }
                                let person=JSON.parse(body)
                                if(person.length==1 ){
                                        console.log('post----')
                                   req.body.gender =person[0].faceAttributes.gender
                                   req.body.age = person[0].faceAttributes.age
                                   let hair={
                                        color:"",
                                        confidence:-1
                                   }                           
                                   for (let i = 0; i < person[0].faceAttributes.hair.hairColor.length; i++) {
                                        if(person[0].faceAttributes.hair.hairColor[i].confidence>hair.confidence){
                                                
                                                hair.color=person[0].faceAttributes.hair.hairColor[i].color
                                                hair.confidence=person[0].faceAttributes.hair.hairColor[i].confidence
                                        }                           
                                   }
                                   req.body.haircolor=hair.color
                                   console.log(req.body)
                                   next()
                                }
                                else{
                                        res.status(500).json({
                                                message: 'Image invalid'
                                        })   
                                }

                        });
                }else{
                        res.status(500).json({
                                message: 'Problem with FaceIdentity Middleware'
                        })
                }
        }
}

module.exports = FaceIdentity