var xhr = new XMLHttpRequest();

var imagenes = [
	{
		"imagen":"img/bulbasaur.png"
	},
	{
		"imagen":"img/ivysaur.png"
	},
	{
		"imagen":"img/venusaur.png"
	},
	{
		"imagen":"img/charmander.png"
	},{
		"imagen":"img/charmeleon.png"
	},
	{
		"imagen":"img/charizard.png"
	},{
		"imagen":"img/squirtle.png"
	},
	{
		"imagen":"img/wartortle.png"
	},{
		"imagen":"img/blastoise.png"
	},
	{
		"imagen":"img/caterpie.png"
	},{
		"imagen":"img/metapod.png"
	},
	{
		"imagen":"img/butterfree.png"
	},{
		"imagen":"img/weedle.png"
	},
	{
		"imagen":"img/kakuna.png"
	},{
		"imagen":"img/beedrill.png"
	},
	{
		"imagen":"img/pidgey.png"
	},{
		"imagen":"img/pidgeotto.png"
	},
	{
		"imagen":"img/pidgeot.png"
	},{
		"imagen":"img/rattata.png"
	},
	{
		"imagen":"img/raticate.png"
	},
];
var plantilla = "<div class='col s3 card tarjeta hoverable'>"+
					'<a href="#modalPokemon" class="link" data-url="__url__" >' +
						'<img src="__imagen__" class="center-align img">' +
					'</a>'+
					'<h5 class="center-align">' +
						'__nombrePokemon__'+ '</h5>' +
					'</div>';

$.getJSON("http://pokeapi.co/api/v2/pokemon/", function(response){
	var pokemons = response.results;
	crearPokemons(pokemons, imagenes);
});


function crearPokemons(pokemons, imagenes) {
	var $contPokemones = $("#pokemones");
	var plantillaFinal = "";
	var noPokemon;
	pokemons.forEach(function (pokemon, indice) {
		plantillaFinal += plantilla.replace("__nombrePokemon__", pokemon.name).replace("__imagen__", imagenes[indice].imagen)
		.replace("__url__", "http://pokeapi.co/api/v2/pokemon-species/"+(indice+1)+"/");
  	});
	$contPokemones.html(plantillaFinal);
	var $link = $('.link').click(detallePokemon);
	modalPokemon();
}

var plantillaDetalle = '<h5 class="center-align">__nombre__</h5>' +
							'<div class="row">' +
								'<div class="col s6">'+
									'<img src="__src__" class="img-100 vertical-align">'+
								'</div>'+
								'<div class="col s6">'+
									'<p><strong>Habitat :</strong>__habitat__</p>'+
									'<p><strong>Color :</strong>__color__</p>'+
									'<p><strong>Shape :</strong>__shape__</p>'+
									'<p><strong>Genera :</strong>__genera__</p>'+
								'</div>'+
							'</div>'+
						'</div>';

function detallePokemon(){
	console.log(this);
	var $imagen = $(this).find("img").attr('src');
	console.log($imagen);
	var $nombre = ($(this).parent().children('h5').text()).toUpperCase();
	console.log($nombre);
	console.log(this.dataset.url);
	$('.modal-content').html("");
	$.getJSON(this.dataset.url, function(response){
		var habitat = response.habitat.name;
		var color = response.color.name;
		var shape = response.shape.name;
		var genera = response.genera[0].genus;

		crearDetalle({
			habitat: habitat,
			color: color,
			shape: shape,
			genera: genera,
			imagen: $imagen,
			nombre: $nombre
		});
	});
}

function crearDetalle(detalle){
	var $modalDetalle = $('.modal-content');
	// console.log(habitat, color, shape, genera, imagen, nombre);
	var nuevaPlantilla = plantillaDetalle.replace("__nombre__", detalle.nombre)
		.replace("__habitat__", detalle.habitat)
		.replace("__color__", detalle.color)
		.replace("__shape__", detalle.shape)
		.replace("__genera__", detalle.genera)
		.replace("__src__", detalle.imagen);

	$modalDetalle.html(nuevaPlantilla);
}
function modalPokemon(){
	$('.modal').modal();
}
