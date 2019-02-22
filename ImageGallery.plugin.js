//META{"name":"ImageGalleryByDemi"}*//

class ImageGalleryByDemi {
	getName () {return "ImageGalleryByDemi";}

	getVersion () {return "2019.02.22";}

	getAuthor () {return "Demorite";}

	getDescription () {return "Allows the user to browse through images sent inside the same message.";}

	initConstructor () {
		
	}

	//legacy
	load () {}

	start () {
		window.addEventListener('keypress', this.keypressevent)
		this.currentIndex = null;
		console.log('image by demi started')
	}

	stop () {
		window.removeEventListener('keypress', this.keypressevent)
		this.currentIndex = null;
		console.log('image by demi stoped')
	}

	keypressevent(e){
			try{
				// Checking if viewer is up
				const zoomed = document.querySelector('#app-mount > div:nth-child(5) > div > div > div > div > img')
				if(!zoomed || (e.key !== 'q' && e.key !== 'd'))
					return false
	
				// Adjusting style
				zoomed.parentElement.style.maxWidth = "90vw";
				zoomed.parentElement.style.maxHeight = "80vh";
				zoomed.parentElement.style.width = "initial";
				zoomed.parentElement.style.height = "initial";
				zoomed.parentElement.style.display = "flex";
				zoomed.parentElement.style.alignItems = "center";
				zoomed.parentElement.style.justifyContent = "center";
				zoomed.style.maxWidth = zoomed.style.maxHeight = "100%";
				zoomed.style.position = 'initial'
				zoomed.style.width = "initial";
				zoomed.style.height = "initial";
				zoomed.style.objectFit = 'contain'
			
				// Getting all visible images
				const allImages = Array.from(document.querySelectorAll('[class^="messages"] img:not(.emoji)'))
				if(this.currentIndex === null || !zoomed.getAttribute('data-firsttime')){
					 this.currentIndex = allImages.findIndex((a) => a.src.replace(/\?.*$/g, '') == zoomed.src.replace(/\?.*$/g, ''))
					 zoomed.setAttribute('data-firsttime', true)
				}

				// Setting placeholder
				zoomed.src = "https://loading.io/spinners/blocks/index.rotating-squares-preloader-gif.svg"

				// Navigate
				if(e.key === 'q'){
					this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0; 
				} else if(e.key === 'd'){
					this.currentIndex < allImages.length-1 && this.currentIndex++
				}
				
				// Pagination
				document.querySelector('.da-downloadLink').innerText = `Open original | ${this.currentIndex+1}/${allImages.length}`
				
				// Setting right image
				zoomed.src = allImages[currentIndex].src.replace(/\?.*$/g, '')
			}catch(e){
				console.error(e)
			}
	}

}
