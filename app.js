$(function () {
	var video = document.getElementById('video');
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({
			video: true
		}).then(function (stream) {

			video.srcObject = stream;
			video.play();
		});
	}
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');

	let name;
	let id;
	document.querySelector('form').addEventListener("submit", function (event) {
		event.preventDefault()
		var teachButton = $('#teach')
		teachButton.click(function () {
			button1.addClass('loading')
			$('.info.message').hide()
			context.drawImage(video, 0, 0, 400, 225);
			var dataURL = canvas.toDataURL();
			$.ajax({
				type: "POST",
				url: "/facebox/teach",
				data: {
					imgBase64: dataURL,
					name: event.target[0].value,
					id: event.target[1].value, //
				},

				success: function (resp) {
					console.log(resp)
				},
				error: function () {
					$('.info.message').text("Sorry, please try again").fadeIn()
				},
				complete: function () {
					button1.removeClass('loading')
				}
			})
		})
	});

	// Trigger photo take
	var button1 = $('#snap')
	button1.click(function () {
		button1.addClass('loading')
		$('.info.message').hide()
		context.drawImage(video, 0, 0, 400, 225);
		var dataURL = canvas.toDataURL();
		$.ajax({
			type: "POST",
			url: "/webFaceID",
			data: {
				imgBase64: dataURL
			},
			success: function (resp) {
				console.info(resp)
				button1.empty().append(
					$("<i>", {
						class: "camera icon"
					})
				).addClass('teal').removeClass('green')
				if (resp.faces_len == 0) {
					$('.info.message').text("We didn't see a face").fadeIn()
					return
				}
				if (resp.faces_len > 1) {
					$('.info.message').text("You must be alone to use Web Face ID securely").fadeIn()
					return
				}
				if (!resp.matched) {
					button1.transition("shake")
					return
				}
				$('.info.message').text("Hello " + resp.name).fadeIn()
				button1.empty().append(
					$("<i>", {
						class: "check icon"
					})
				).removeClass('teal').addClass('green').transition('tada')
			},
			error: function () {
				$('.info.message').text("Sorry, please try again").fadeIn()
			},
			complete: function () {
				button1.removeClass('loading')
			}
		})

	})

})