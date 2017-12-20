/* ======== Model ======== */

var model = {
	currentCat: null,
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

control.init();