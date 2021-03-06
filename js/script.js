$(function () {

	//Random string generation
	function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    	var str = '';
    	for (var i = 0; i < 10; i++) {
        	str += chars[Math.floor(Math.random() * chars.length)];
    	}
    	return str;
	}

	// Column creation

	function Column(name) {
	    var self = this;

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

	    function createColumn() {
	    	var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('X'),
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card');

			$columnDelete.click(function () {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Enter the name of the card')));
			});

			$column.append($columnTitle)
				   .append($columnDelete)
				   .append($columnAddCard)
				   .append($columnCardList);

			return $column;
	    }
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}

	// Card creation

	function Card(description) {
		var self = this;

	    this.id = randomString();
	    this.description = description;
	    this.$element = createCard();

	    function createCard() {
	    	var $card = $('<li>').addClass('card');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		    var $cardDelete = $('<button>').addClass('btn-delete').text('X');

		    $cardDelete.click(function(){
        		self.removeCard();
			});

		    $card.append($cardDelete);
			$card.append($cardDescription);
			return $card;

	    }
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}


	var board = {
    	name: 'Kanban Board',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    	$element: $('#board .column-container')
	};

	function initSortable() {
   		$('.column-card-list').sortable({
     	connectWith: '.column-card-list',
     	placeholder: 'card-placeholder'
   		}).disableSelection();
 	}

 	$('.create-column').click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
    	board.addColumn(column);
  	});

	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);


});