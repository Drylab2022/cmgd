const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
  UserPoolId: "us-east-1_bP7arNakY",
  ClientId: "1b74ng5a69hsaolvu37ici25b2"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
  getToken(req, res) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username : req.body.username,
      Password : req.body.password,
    });

    var userData = {
        Username : req.body.username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // console.log('access token + ' + result.getAccessToken().getJwtToken());
            // console.log('id token + ' + result.getIdToken().getJwtToken());
            // console.log('refresh token + ' + result.getRefreshToken().getToken());
            res.status(200).send({
              "id_token": result.getIdToken().getJwtToken(),
            });
        },
        onFailure: function(err) {
            // console.log(err);
            res.status(400).send("Incorrect username or password");
        },
    });
  }
};