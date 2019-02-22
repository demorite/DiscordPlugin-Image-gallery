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
		window.addEventListener('keydown', this.keypressevent)
		this.currentIndex = null;
		console.log('image by demi started')
	}

	stop () {
		window.removeEventListener('keydown', this.keypressevent)
		this.currentIndex = null;
		console.log('image by demi stoped')
	}

	keypressevent(e){
			try{
				// Checking if viewer is up
				const zoomed = document.querySelector('#app-mount > div:nth-child(5) > div > div > div > div > img')

				const keys = ['q' ,'d' ,'s' ,'ArrowLeft' ,'ArrowRight', 'ArrowDown']
				if(!zoomed || !(keys.includes(e.key)))
					return false
	
				// Adjusting style
				zoomed.parentElement.style.maxWidth = zoomed.style.maxWidth = "90vw";
				zoomed.parentElement.style.maxHeight = zoomed.style.maxHeight = "80vh";
				zoomed.parentElement.style.width = "initial";
				zoomed.parentElement.style.height = "initial";
				zoomed.parentElement.style.display = "flex";
				zoomed.parentElement.style.alignItems = "center";
				zoomed.parentElement.style.justifyContent = "center";
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
				if(e.key === 'q' || e.key === 'ArrowLeft'){
					this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0; 
				} else if(e.key === 'd' || e.key === 'ArrowRight'){
					this.currentIndex < allImages.length-1 && this.currentIndex++
				}
				
				// Pagination
				document.querySelector('.da-downloadLink').innerText = `Open original | ${this.currentIndex+1}/${allImages.length}`
				
				// Setting right image
				const newImage = new Image();
				newImage.src = allImages[currentIndex].src.replace(/\?.*$/g, '');
				newImage.setAttribute('data-index', this.currentIndex);
				newImage.onload = () => {
					if(+newImage.getAttribute('data-index') === this.currentIndex) 
						zoomed.src = newImage.src 
				};
			}catch(e){
				console.error(e)
			}
	}

}
