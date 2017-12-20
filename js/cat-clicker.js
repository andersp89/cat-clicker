/* ======== Model ======== */

var model = {
	currentCat: null,
	adminShown: false,
	cats: [
		{
			clickCount: 0,
			name: 'Gubbi',
			imgSrc: 'img/cat1.jpg'
		},
		{
			clickCount: 0,
			name: 'Pedro',
			imgSrc: 'img/cat2.jpg'
		},
		{
			clickCount: 0,
			name: 'Peter Mathiesen',
			imgSrc: 'img/cat3.jpg'
		},
		{
			clickCount: 0,
			name: 'Anders',
			imgSrc: 'img/cat4.jpg'
		}
	]
};

/* ======== Control ======== */

var control = {
	init: function() {
		// Set current cat to first in model
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
		adminView.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	},

	adminAreaStatus: function() {
		return model.adminShown;
	},

	showAdminArea: function() {
		model.adminShown = true;
		adminView.render();
	},

	hideAdminArea: function() {
		model.adminShown = false;
		adminView.hide();	
	},

	updateCat: function(name, src, clicks) {
		var currentCat = control.getCurrentCat();
		currentCat.name = name;
		currentCat.imgSrc = src;
		currentCat.clickCount = clicks;
		catView.render();
		control.hideAdminArea();
	}
};


/* ======== View ======== */

var catView = {
	init: function() {
		this.catName = $('#cat-name')[0];
		this.catPicture = $('#cat-picture')[0];
		this.catNumber = $('#times-clicked')[0];
		
		this.catPicture.addEventListener('click', function(){
			control.incrementCounter();
		});

		this.render();
	},

	render: function() {
		var currentCat = control.getCurrentCat();
		this.catNumber.textContent = currentCat.clickCount;
		this.catName.textContent = currentCat.name;
		this.catPicture.src = currentCat.imgSrc;
	}
};

var catListView = {
	init: function() {
		this.catList = $('#cat-list')[0];
		this.render();
	},
	render: function() {
		var cat, elem, i;

		var cats = control.getCats();

		// empty the cat list
		this.catList.innerHTML = '';

		for (i=0; i<cats.length; i++) {
			cat = cats[i];

			elem = document.createElement('li');
			img = document.createElement('img');
			img.src = cat.imgSrc; 
			img.id = 'little-cat';
			elem.appendChild(img);

			elem.addEventListener('click', (function(catCopy) {
				return function() {
					control.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			this.catList.appendChild(elem);

		}

	}

};

var adminView = {
	init: function() {
		this.adminArea = $('#admin-form')[0];
		this.adminButton = $('#admin-button')[0];
		this.adminSaveButton = $('#save')[0];
		this.adminCancelButton = $('#cancel')[0];
		this.adminName = $("#name")[0];
		this.adminSrc = $('#imgSrc')[0];
		this.adminClicks = $('#clicks')[0];

		this.adminButton.addEventListener('click', (function() {
			if (control.adminAreaStatus() == false) {
				return control.showAdminArea();	
			}

			if (control.adminAreaStatus() == true) {
				return control.hideAdminArea();
			}
		}));
	},

	render: function() {
		var currentCat = control.getCurrentCat();

		if (control.adminAreaStatus() == true) {
			this.adminArea.style.display = "block";
		}

		// Connect input values with current cat
		this.adminName.value = currentCat.name;
		this.adminSrc.value = currentCat.imgSrc;
		this.adminClicks.value = currentCat.clickCount;

		this.adminSaveButton.addEventListener('click', (function(){
			// Get new values
			var adminName = document.getElementById("name").value
			var adminSrc = document.getElementById("imgSrc").value
			var adminClicks = document.getElementById("clicks").value

			return control.updateCat(adminName, adminSrc, adminClicks);
		}));

		this.adminCancelButton.addEventListener('click', (function(){
			return control.hideAdminArea();
		}));


	},

	hide: function() {
		if (control.adminAreaStatus() == false) {
			this.adminArea.style.display = "none";
		}
	}
};

control.init();