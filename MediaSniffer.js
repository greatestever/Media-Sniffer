javascript:
(function()
{ 
	var arr = [];
	var strBody ="", content = ""; 
	var images = document.images; 
	var meta = document.getElementsByTagName('meta');
	var videos = document.getElementsByTagName('video');
	var audios = document.getElementsByTagName('audio');
	var refresh = window.localStorage.getItem('refresh');
	
	if(!document.URL.includes("instagram.com/p/") && refresh !== null)
	{
		window.localStorage.removeItem("refresh");
		getMedia();
	}
	else if (document.URL.includes("instagram.com/p/") && refresh === null)
	{
		location.reload();
		window.localStorage.setItem('refresh', "1");
	}
	else
	{
		getMedia();
	}
	
	function getMedia() 
	{
		for (var i = 0; i < images.length; i++)
		{ 
			if (arr.indexOf(images[i].src) === -1)
			{
				arr.push(images[i].src); 
				strBody += images[i].src; 
			}
		} 
		
		for (var i = 0; i < meta.length; i++)
		{ 
			content = meta[i].getAttribute('content');
			if (content != null)
			{
				if (content.includes(".mp4") || content.includes(".mp3") || content.includes(".wav"))
				{
					if (arr.indexOf(content) === -1)
					{
						arr.push(content);
						strBody += content; 
					}
				}
			}
		} 
		
		for (var i = 0; i < videos.length; i++)
		{ 
			content = videos[i].getAttribute('src');
			if (content != null)
			{
				if (arr.indexOf(content) === -1)
				{
					arr.push(content);
					strBody += content; 
				} 
			}
			else
			{
				var videoSources = videos[i].getElementsByTagName('source');
				if (videoSources != null)
				{
					for (var j = 0; j < videoSources.length; j++)
					{
						if (arr.indexOf(videoSources[j].src) === -1)
						{
							arr.push(videoSources[j].src);
							strBody += videoSources[j].src;
						}
					}
				}
			}
		} 
		
		for (var i = 0; i < audios.length; i++)
		{ 
			content = audios[i].getAttribute('src');
			if (content != null)
			{
				if (arr.indexOf(content) === -1)
				{
					arr.push(content);
					strBody += content; 
				} 
			}
			else
			{
				var audioSources = audios[i].getElementsByTagName('source');
				if (audioSources != null)
				{
					for (var j = 0; j < audioSources.length; j++)
					{
						if (arr.indexOf(audioSources[j].src) === -1)
						{
							arr.push(audioSources[j].src);
							strBody += audioSources[j].src;
						}
					}
				}
			}
		} 
		
		document.head.innerHTML = "";
		var node = document.createElement('style');
		node.innerHTML = 
		`
		/* The Modal (background) */
		.modal {
			display: block; /* Visible by default */
			position: fixed; /* Stay in place */
			z-index: 1; /* Sit on top */
			left: 0;
			top: 0;
			width: 100%; /* Full width */
			height: 100%; /* Full height */
			overflow: auto; /* Enable scroll if needed */
			background-color: rgb(0,0,0); /* Fallback color */
			background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
		}

		/* Modal Content/Box */
		.modal-content {
			background-color: #fefefe;
			margin: 15% auto; /* 15% from the top and centered */
			padding: 20px;
			border: 1px solid #888;
			width: 80%; /* Could be more or less, depending on screen size */
		}

		/* The Close Button */
		.close {
			color: #aaa;
			float: right;
			font-size: 25px;
			font-weight: bold;
			width: 50px;
			height: 50px;
			border: 2px solid #eef5df;
			background-color: #fefefe;
			border-radius: 50%;
		}

		.close:hover,
		.close:focus {
			color: black;
			text-decoration: none;
			cursor: pointer;
		}
		
		/* Media */
		#media {
			margin-left: auto;
			margin-right: auto;
			margin: auto;
			text-align: justify;
			-ms-text-justify: distribute-all-lines;
			text-justify: distribute-all-lines;
		}
		
		#media img {
			vertical-align: top;
			display: inline-block;
			*display: inline;
			zoom: 1;
			max-width:100px;
			max-height:100px;
			width:auto;
			height:auto;
			padding: 10px;
		}
		
		#media video {
			vertical-align: top;
			display: inline-block;
			*display: inline;
			zoom: 1;
			max-width:100px;
			max-height:100px;
			width:auto;
			height:auto;
			padding: 10px;
		}
		
		/* Stretch */
		.stretch {
			width: 100%;
			display: inline-block;
			font-size: 0;
			line-height: 0
		}
		`;
		document.body.appendChild(node);
		
		document.body.innerHTML += 
		`
		<div id="myModal" class="modal">

		  <!-- Modal content -->
		  <div class="modal-content">
			<div>
			<button class="close" id="close">&times;</button>
			</div>
			<div id="media"></div>
		  </div>

		</div>
		`;
		
		function close() 
		{
			var modal = document.getElementById('myModal');
			
			/*modal.style.display = "block";*/
			modal.style.display = "none";
			location.reload();
		}
		
		function expand()
		{
			window.location.href = this.src;
		}
		
		var btn = document.getElementById('close');
		btn.onclick = close;
		
		var div = document.getElementById('media');
		
		for (var i = 0; i < arr.length; i++)
		{
			if (arr[i].includes(".jpg") || arr[i].includes(".png") || arr[i].includes(".jpeg") || arr[i].includes(".gif") || arr[i].includes(".svg") || arr[i].includes(".ico") || arr[i].includes(".bmp"))
			{
				div.innerHTML += '<img src="' + arr[i] + '" />'; 
			}
			else if (arr[i].includes(".mp4") || arr[i].includes(".ogg"))
			{
				div.innerHTML += '<video src="' + arr[i] + '" />'; 
			}
			else if (arr[i].includes(".mp3") || arr[i].includes(".ogg") || arr[i].includes(".wav"))
			{
				div.innerHTML += '<audio src="' + arr[i] + '" />'; 
			}
		}
		var imagesBtn = document.getElementsByTagName('img');
		for (var i = 0; i < imagesBtn.length; i++)
		{
			imagesBtn[i].onclick = expand;
		}
		var videosBtn = document.getElementsByTagName('video');
		for (var i = 0; i < videosBtn.length; i++)
		{
			videosBtn[i].onclick = expand;
		}
		var audiosBtn = document.getElementsByTagName('audio');
		for (var i = 0; i < audiosBtn.length; i++)
		{
			audiosBtn[i].onclick = expand;
			audiosBtn[i].setAttribute("controls", "controls");
		}
	}

})();


