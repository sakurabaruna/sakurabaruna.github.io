// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="http://i1.hdslb.com/user/18207/1820798/myface.gif"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "duang gif",
			img: "http://img.citylucky.lepaowang.com/uploads/201507/18/22119Z9ICUAKaGY.gif",
			id: 1,
		},
		{
			name: "duang",
			img: "http://mmbiz.qpic.cn/mmbiz/sMiafknWmqKxzRt5Kibn4QybicK7loPlslSW4EOWnaaiao5PVCsZqapAhHNCWR5X9ZxQlLmrWhe1ZF0gxWbvtoiatAA/0?tp=webp&wxfrom=5",
			id: 2
		},
		{
			name: "王司徒",
			img: "http://joymepic.joyme.com/article/uploads/allimg/201509/1443063281782392.jpg",
			id: 3
		},
		{
			name: "mickysister",
			img: "http://mmbiz.qpic.cn/mmbiz/RvjHgwOly18LI8bppxEw8Rr2NY5Mdr3BhicDCA6c6c3Qic9NoBwmbXWvzMxicEqRhxic5xq6iaA0JDHIQZ9Srdk8Mbw/0",
			id: 4
		}, 
		{
			name: "fun photo",
			img: "http://www.bqshe.com/cache/photo/0/2/150/2606.gif",
			id: 5
		},
		{
			name: "jx3",
			img: "http://i0.hdslb.com/video/32/321edf49c68c9cacaf7c502191893a3d.jpg",
			id: 6
		},
		{
			name: "doge",
			img: "https://pbs.twimg.com/media/Bb22XH3IYAAMexT.jpg",
			id: 7
		},
		{
			name: "doge gif",
			img: "https://lh3.googleusercontent.com/-mkFycFIHmPw/Vd_W-o-cpeI/AAAAAAAAAVc/Dkt6TfqeMJw/w800-h800/Pmbjzw4.gif",
			id: 8
		},
		{
			name: "cute gif2",
			img: "http://cdn.duitang.com/uploads/blog/201510/27/20151027211715_5JASd.thumb.700_0.gif",
			id: 9
		},
		{
			name: "dog",
			img: "http://i2.hdslb.com/video/f4/f49522a36c93b36762fa7edab0c926aa.jpg",
			id: 10
		},
		{
			name: "cute gif",
			img: "http://img4.duitang.com/uploads/item/201512/11/20151211195647_dtPZA.thumb.224_0.gif",
			id: 11
		},
		{
			name: "doge",
			img: "https://lh6.googleusercontent.com/-rq6INWpaqHc/VNvcT27PySI/AAAAAAAAAio/7qL5uUI3KKY/w800-h800/doge.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();