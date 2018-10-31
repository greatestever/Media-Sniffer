javascript:
(function()
{ 
	var arr = [];
	var content = ""; 
	var images = document.images; 
	var links = document.links;
	var meta = document.getElementsByTagName('meta');
	var videos = document.getElementsByTagName('video');
	var audios = document.getElementsByTagName('audio');
	var refresh = window.localStorage.getItem('refresh');
	
	if (images.length <= 0 && links.length <= 0 && meta.length <= 0 && videos.length <= 0 && audios.length <= 0)
	{
		alert("No media was found.\nPlease refresh to try again.");
	}
	else if(!document.URL.includes("instagram.com/p/") && refresh !== null)
	{
		window.localStorage.removeItem("refresh");
		getMedia();
	}
	else if (document.URL.includes("instagram.com/p/") && refresh === null)
	{
		window.localStorage.setItem('refresh', "1");
		location.reload();
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
			}
		} 
		
		for (var i = 0; i < links.length; i++)
		{ 
			content = links[i].href;
			if (content.includes(".jpg") || content.includes(".png") || content.includes(".jpeg") || content.includes(".gif") || content.includes(".svg") || content.includes(".ico") || content.includes(".bmp") || content.includes(".mp4") || content.includes(".mp3") || content.includes(".ogg") || content.includes(".wav"))
			{	
				if (arr.indexOf(content) === -1)
				{
					arr.push(content); 
				}
			}
		} 
		
		for (var i = 0; i < meta.length; i++)
		{ 
			content = meta[i].getAttribute('content');
			if (content != null)
			{
				if (content.includes(".jpg") || content.includes(".png") || content.includes(".jpeg") || content.includes(".gif") || content.includes(".svg") || content.includes(".ico") || content.includes(".bmp") || content.includes(".mp4") || content.includes(".mp3") || content.includes(".ogg") || content.includes(".wav"))
				{
					if (arr.indexOf(content) === -1)
					{
						arr.push(content);
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
						}
					}
				}
			}
		} 
		
		if (arr.length <= 0)
		{
			alert("No media was found.\nPlease refresh to try again.");
		}
		else
		{	
			function expand()
			{
				window.location.href = this.src;
			}
					
			document.body.innerHTML = "";
			var imgBtn, vidBtn, audBtn;
			for (var i = 0; i < arr.length; i++)
			{
				if (arr[i].includes(".jpg") || arr[i].includes(".png") || arr[i].includes(".jpeg") || arr[i].includes(".gif") || arr[i].includes(".svg") || arr[i].includes(".ico") || arr[i].includes(".bmp"))
				{
					imgBtn = document.createElement("img");
					imgBtn.src = arr[i];
					imgBtn.onclick = expand;
					document.body.appendChild(imgBtn);
				}
				else if (arr[i].includes(".mp4") || arr[i].includes(".ogg"))
				{
					vidBtn = document.createElement("video");
					vidBtn.src = arr[i];
					vidBtn.onclick = expand;
					vidBtn.setAttribute("controls", "controls");
					document.body.appendChild(vidBtn);
				}
				else if (arr[i].includes(".mp3") || arr[i].includes(".ogg") || arr[i].includes(".wav"))
				{
					audBtn = document.createElement("audio");
					audBtn.src = arr[i];
					audBtn.onclick = expand;
					audBtn.setAttribute("controls", "controls");
					document.body.appendChild(audBtn);
				}
			}
		}
	}

})();


