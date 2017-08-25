"use strict";

$(document).ready(function(){

/*
* hier begint de spel van blackjack 
* 
*/
	

	var gebruikKaart = new Array();
	
	function kaart(naamSpel,spelSuit,spelValue) {
		this.naamSpel = naamSpel;
		this.spelSuit = spelSuit;
		this.spelValue = spelValue;
	} 
	
	//dit zijn alle kaarten dit zorgt dat ze ook een waarde hebben 
	
	var dckCard = [
		new kaart('Ace', 'Hearts',11),
		new kaart('Two', 'Hearts',2),
		new kaart('Three', 'Hearts',3),
		new kaart('Four', 'Hearts',4),
		new kaart('Five', 'Hearts',5),
		new kaart('Six', 'Hearts',6),
		new kaart('Seven', 'Hearts',7),
		new kaart('Eight', 'Hearts',8),
		new kaart('Nine', 'Hearts',9),
		new kaart('Ten', 'Hearts',10),
		new kaart('Jack', 'Hearts',10),
		new kaart('Queen', 'Hearts',10),
		new kaart('King', 'Hearts',10),
		new kaart('Ace', 'Diamonds',11),
		new kaart('Two', 'Diamonds',2),
		new kaart('Three', 'Diamonds',3),
		new kaart('Four', 'Diamonds',4),
		new kaart('Five', 'Diamonds',5),
		new kaart('Six', 'Diamonds',6),
		new kaart('Seven', 'Diamonds',7),
		new kaart('Eight', 'Diamonds',8),
		new kaart('Nine', 'Diamonds',9),
		new kaart('Ten', 'Diamonds',10),
		new kaart('Jack', 'Diamonds',10),
		new kaart('Queen', 'Diamonds',10),
		new kaart('King', 'Diamonds',10),
		new kaart('Ace', 'Clubs',11),
		new kaart('Two', 'Clubs',2),
		new kaart('Three', 'Clubs',3),
		new kaart('Four', 'Clubs',4),
		new kaart('Five', 'Clubs',5),
		new kaart('Six', 'Clubs',6),
		new kaart('Seven', 'Clubs',7),
		new kaart('Eight', 'Clubs',8),
		new kaart('Nine', 'Clubs',9),
		new kaart('Ten', 'Clubs',10),
		new kaart('Jack', 'Clubs',10),
		new kaart('Queen', 'Clubs',10),
		new kaart('King', 'Clubs',10),
		new kaart('Ace', 'Spades',11),
		new kaart('Two', 'Spades',2),
		new kaart('Three', 'Spades',3),
		new kaart('Four', 'Spades',4),
		new kaart('Five', 'Spades',5),
		new kaart('Six', 'Spades',6),
		new kaart('Seven', 'Spades',7),
		new kaart('Eight', 'Spades',8),
		new kaart('Nine', 'Spades',9),
		new kaart('Ten', 'Spades',10),
		new kaart('Jack', 'Spades',10),
		new kaart('Queen', 'Spades',10),
		new kaart('King', 'Spades',10)
	];
	
	var handSpel = {
		kaarten : new Array(),
		huidigTotaal : 0,
		//dit geeft de totaliteit van de kaarten weer
		SomKaartTotaliteit: function(){
			this.huidigTotaal = 0;
			for(var i=0;i<this.kaarten.length;i++){
				var b = this.kaarten[i];
				this.huidigTotaal += b.spelValue;
			}
			$("#totalHdr").html("Total: " + this.huidigTotaal );
			
			if(this.huidigTotaal > 21){
				$("#knopstick").trigger("click");
				$("#afbeeldingResult").attr('src','images/x2.png');
				$("#resultHnd").html("BUST!")
							   .attr('class', 'lose');
			}else if(this.huidigTotaal == 21){
				$("#knopstick").trigger("click");
				$("#afbeeldingResult").attr('src','images/check.png');
				$("#resultHnd").html("BlackJack!")
							   .attr('class', 'win');
			}else if(this.huidigTotaal <= 21 && this.kaarten.length == 5){
				$("#knopstick").trigger("click");
				$("#afbeeldingResult").attr('src','images/check.png');
				$("#resultHnd").html("BlackJack - 5 card trick!")
							   .attr('class', 'win');
			}else{ }
		}
	};
	// dit zorgt ervoor dat je verschillende scripts krijgt 
	function getRandom(nmr){
		var my_nmr = Math.floor(Math.random()*nmr);
		return my_nmr;
	}
	
	function deel_kaart(){
		for(var i=0;i<2;i++){
			hitKaart();
		}
	}
	
	function hitKaart(){
		var juistKaart = false;
		do{
			var index = getRandom(52);
			if( !$.inArray(index, gebruikKaart ) > -1 ){
				juistKaart = true;
				var b = dckCard[ index ];
				gebruikKaart[gebruikKaart.length] = index;
				handSpel.kaarten[handSpel.kaarten.length] = b;	
				
				var $d = $("<div>");
				$d.addClass("huidigHand")
				  .appendTo("#my_card");

				$("<img>").attr('alt', b.naamSpel + ' of ' + b.spelSuit )
						  .attr('title', b.naamSpel + ' of ' + b.spelSuit )
						  .attr('src', 'images/cards/' + b.spelSuit + '/' + b.naamSpel + '.jpg' )
						  .appendTo($d)
						  .fadeOut('slow')
						  .fadeIn('slow');
				
			}
		}while(!juistKaart);
		juistKaart = false;	  
		handSpel.SomKaartTotaliteit();
	}
	// dit geeft u de kaarten
	$("#knopDealSpel").click( function(){
		deel_kaart();
		$(this).toggle();
		$("#knopHitSpel").toggle();
		$("#knopstick").toggle();
	});
	
	$("#knopHitSpel").click(function () {
		hitKaart();
	});

	function end() {
		$("#knopHitSpel").toggle();
		$("#knopstick").toggle();
		$("#restartKnop").toggle();
	}
	$("#knopstick").click( function(){
		$("#resultHnd").html('Stick!')
					   .attr('class', 'win');
		$("#result").toggle();
		end();
	});
	// dit is een soort van restart button dat herstart de spel 
	$("#restartKnop").click( function(){
		$("#result").toggle();
		$(this).toggle();
		$("#my_card").empty();
		$("#resultHnd").html('');
		$("#afbeeldingResult").attr('src','images/check.png');
		
		gebruikKaart.length = 0;
		handSpel.kaarten.length = 0;
		handSpel.huidigTotaal = 0;
		
		$("#knopDealSpel").toggle()
					 .trigger('click');
	});
});