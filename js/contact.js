//update this with your js_form selector
var form_id_js = "javascript_form";

var data_js = {
	access_token: "uu2y7asfq3t45n2m9olw44xj",
};

function js_onSuccess() {
	// remove this to avoid redirect
	// window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
	toastr.success("Email Successfully Sent");
	document.querySelector("#" + form_id_js + " [name='email']").value = "";
	document.querySelector("#" + form_id_js + " [name='subject']").value = "";
	document.querySelector("#" + form_id_js + " [name='text']").value = "";
	sendButton.value = "Send";
	sendButton.disabled = false;
}

function js_onError(error) {
	// remove this to avoid redirect
	// window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
	toastr.error("Email could not be sent");
	sendButton.value = "Send";
	sendButton.disabled = false;
}

var sendButton = document.getElementById("js_send");

function js_send() {
	sendButton.value = "Sending…";
	sendButton.disabled = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			js_onSuccess();
		} else if (request.readyState == 4) {
			js_onError(request.response);
		}
	};

	var email = document.querySelector("#" + form_id_js + " [name='email']").value;
	var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
	var message = document.querySelector("#" + form_id_js + " [name='text']").value;
	data_js["subject"] = subject ? subject + " from " + email + " on she-writescode.github.io" : subject;
	data_js["text"] = message ? message + " \n from " + email + " on she-writescode.github.io" : message;
	var params = toParams(data_js);

	request.open("POST", "https://postmail.invotes.com/send", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.send(params);

	return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
	var form_data = [];
	for (var key in data_js) {
		form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
	}

	return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
	e.preventDefault();
});
