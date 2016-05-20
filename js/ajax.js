$(document).ready(function() {
    $("#continue").hide();
    $("#ret").hide();
    var Qiniu_UploadUrl = "http://up.qiniu.com";
    $("#btn_upload").click(function() {
        var Qiniu_upload = function(f, token, key) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Qiniu_UploadUrl, true);
            var formData, startDate;
            formData = new FormData();
            if (key !== null && key !== undefined) formData.append('key', key);
            formData.append('token', token);
            formData.append('file', f);
            var taking;
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var nowDate = new Date().getTime();
                    taking = nowDate - startDate;
                    var x = (evt.loaded) / 1024;
                    var y = taking / 1000;
                    var uploadSpeed = (x / y);
                    var formatSpeed;
                    if (uploadSpeed > 1024) {
                        formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
                    } else {
                        formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
                    }
                }
            }, false);

            xhr.onreadystatechange = function(response) {
                if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                    var blkRet = JSON.parse(xhr.responseText);
                    $("#result").html("http://xxxxxx.com/" + blkRet.key); /* Your Qiniu bucket url*/
                    $("#continue").show();
                    $("#ret").show();
                    $("#btn").hide();
                } else if (xhr.status != 200 && xhr.responseText) {
                    $("#result").html("Upload faliure!");
                }
            };
            xhr.send(formData);
        };
        var token = $("#token").val();
        if ($("#file")[0].files.length > 0 && token != "") {
            Qiniu_upload($("#file")[0].files[0], token, $("#key").val());
        } else {
            $("#result").html("form input error");
            console.log("form input error");
        }
    });
    $("#btn_continue").click(function() {
        $("#continue").hide();
        $("#ret").hide();
        $("#btn").show();
        $("#key").val("");
        $("#file").val("");
        $("#token").val(upToken);
    });
})