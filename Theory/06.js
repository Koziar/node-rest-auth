/*
    Explain about JSON Web Tokens (jwt) and why they are very suited for a REST-based API
 */
// https://jwt.io/introduction/
/*
 What is JSON Web Token?

 JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way
 for securely transmitting information between parties as a JSON object.
 This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret
 (with the HMAC algorithm) or a public/private key pair using RSA.

 Let's explain some concepts of this definition further.

 Compact: Because of its smaller size, JWTs can be sent through an URL, POST parameter, or inside an HTTP header.
 Additionally, the smaller size means transmission is fast.

 Self-contained: The payload contains all the required information about the user,
 avoiding the need to query the database more than once.

 When should you use JSON Web Tokens?

 Here are some scenarios where JSON Web Tokens are useful:

 Authentication: This is the most common scenario for using JWT.
 Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes,
 services, and resources that are permitted with that token. Single Sign On is a feature
 that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

 Information Exchange: JSON Web Tokens are a good way of securely transmitting information between parties,
 because as they can be signed, for example using public/private key pairs,
 you can be sure that the senders are who they say they are.
 Additionally, as the signature is calculated using the header and the payload, you can also verify that
 the content hasn't been tampered with.



 */
