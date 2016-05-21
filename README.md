# QPic
A chrome extension about uploading pictures to cloud platform
### Where the idea come from
Recently, our course project need to manage a large number of pictures and we decide to use Qiniu cloud to help us manage the pictures. Taking this opportunity, I've learnt how to upload and storage pictures to Qiniu cloud in JavaScript client. By the way, it occurs to me that why not to make a tool to help me upload the pictures? So, I decide to create a chrome extension to help uploading pictures more easily. What's more, I also want to create a tool that can help me solve the problem about storaging the pictures in Markdown writing. If it comes true, I will not storage the pictures at github that are using in Markdown, and I will upload it to Qiniu cloud and use the pictures' URL.
### Preparation
 1. Chrome browser(newest version for better)   
 2. JavaSript editor(Sublime text3)   
 3. Google chrome doc

### Basic function
 Uploading pictures to Qiniu cloud platform
### How to use
 1. Open the Extension program in your chrome browser
 2. Choose Developer mode
 3. Click the Load unpacked extension
 4. Choose the unpacked extension and install it
 5. Then you can see it in your extensions bar

### Configuration
 1. Add your Bucket URL in 'ajax.js'. The following is the code fragment:   

 ```
 xhr.onreadystatechange = function(response) {
     if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
         var blkRet = JSON.parse(xhr.responseText);
         $("#result").html("http://xxxxxx.com/" + blkRet.key); /* Your Qiniu bucket url*/
 ```
 
 2. Add your Bucket name in 'upload.js'. The following is a code fragment:

 ```
 var genUpToken = function(accessKey, secretKey) {
    var deadline = Math.round(new Date().getTime() / 1000) + 1 * 3600;
    var putPolicy = {
        "scope": "", /* Your bucket name*/
        "deadline": deadline
    };   
 ```
 
 3. Add your Qiniu's accessKey and secretKey in 'upload.js'. The following is a code fragment:

 ```
 var ACCESS_KEY = ""; /* Your Qiniu accessKey */
 var SECRET_KEY = ""; /* Your Qiniu secretKey */
 ```
