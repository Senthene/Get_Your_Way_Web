/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global d3 */
//lire les x et y d'une carte 
//
var jsonData = {
    //Le heatmap affiche un code couleur des cellules sur la carte en utilisant une grille régulièrement espacés et 
    //aussi des formes personnalisées. Le format de données pour la couche heatmap est 
    //un tableau associatif supportant les clés suivantes:
"heatmap": {
	"binSize": 3,
	"units": "\u00B0C",
	"map": [
		/*{"x": 21, "y": 12, "value": 20.2},
		{"x": 24, "y": 12, "value": 19.9},
		{"x": 27, "y": 12, "value": 19.7},
		{"x": 30, "y": 12, "value": 19.7},
		{"x": 21, "y": 15, "value": 20.5},
		{"x": 24, "y": 15, "value": 19.3},
		{"x": 27, "y": 15, "value": 19.4},
		{"x": 30, "y": 15, "value": 19.9},
		*/{"value": 19.9, "points": [
                        {"x":2.513888888888882,"y":8.0},
                        {"x":6.069444444444433,"y":8.0},
                        {"x":6.069444444444434,"y":5.277535934291582},
                        {"x":8.20833333333332,"y":2.208151950718685},
                        {"x":13.958333333333323,"y":2.208151950718685},
                        {"x":16.277777777777825,"y":5.277535934291582},
                        {"x":16.277777777777803,"y":10.08151950718685},
                        {"x":17.20833333333337,"y":10.012135523613962},
                        {"x":17.27777777777782,"y":18.1387679671458},
                        {"x":2.513888888888882,"y":18.0}
                    ]
                }
                
            ]
	},
        
        
"overlays": {
	"polygons": [
		{"id": "p1", "name": "kitchen", "points": [
                        {"x":2.513888888888882,"y":8.0},
                        {"x":6.069444444444433,"y":8.0},
                        {"x":6.069444444444434,"y":5.277535934291582},
                        {"x":8.20833333333332,"y":2.208151950718685},
                        {"x":13.958333333333323,"y":2.208151950718685},
                        {"x":16.277777777777825,"y":5.277535934291582},
                        {"x":16.277777777777803,"y":10.08151950718685},
                        {"x":17.20833333333337,"y":10.012135523613962},
                        {"x":17.27777777777782,"y":18.1387679671458},
                        {"x":2.513888888888882,"y":18.0}
                    ]
                },
                {"id": "p2", "name": "salon", "points": [
                        {"x":2.513888888888882,"y":8.0},
                        {"x":6.069444444444433,"y":8.0},
                        {"x":6.069444444444434,"y":5.277535934291582},
                        {"x":8.20833333333332,"y":2.208151950718685},
                        {"x":13.958333333333323,"y":2.208151950718685},
                        {"x":16.277777777777825,"y":5.277535934291582},
                        {"x":16.277777777777803,"y":10.08151950718685},
                        {"x":17.20833333333337,"y":10.012135523613962},
                        {"x":17.27777777777782,"y":18.1387679671458},
                        {"x":2.513888888888882,"y":18.0}
                    ]
                }
            ]
	},
//La couche de vectorfield rend vecteurs normés sur une grille régulièrement espacés sur le plan de masse. Le format de données 
//pour le vectorfield est très similaire à la heatmap. Il est un tableau associatif contenant une liste de valeurs pour les vecteurs de rendre.
// Les valeurs peuvent être dans une échelle commune, les vecteurs sont normalisés à l'maginitude maximum de tous les vecteurs rendus.        
"vectorfield": {
	"binSize": 3,
	"units": "ft/s",
	"map": [
		{"x": 18, "y": 21, "value": {"x": 4, "y": 3}},
		{"x": 21, "y": 21, "value": {"x": 3, "y": 3}},
		{"x": 18, "y": 24, "value": {"x": 1, "y": 2}},
		{"x": 21, "y": 24, "value": {"x": -3, "y": 4}},
		{"x": 24, "y": 24, "value": {"x": -4, "y": 1}}]
	},
// La couche de pathplot rend les chemins interpolé de ligne droite entre les séquences de points. 
// Le format des données est une liste de tableaux associatifs où chaque élément prend en charge les clés suivantes:
"pathplot": [{
	"id": "flt-1",
	"classes": "planned",
	"points": [{"x": 23.8, "y": 30.6},{"x": 19.5, "y": 25.7},{"x": 14.5, "y": 25.7},{"x": 13.2, "y": 12.3}]
	}]
};


    xscale = d3.scale.linear()
               .domain([0,50.0])
               .range([0,720]),
    yscale = d3.scale.linear()
               .domain([0,33.79])
               .range([0,487]),
    map = d3.floorplan().xScale(xscale).yScale(yscale),
    imagelayer = d3.floorplan.imagelayer(),
    heatmap = d3.floorplan.heatmap(),
    vectorfield = d3.floorplan.vectorfield(),
    pathplot = d3.floorplan.pathplot(),
    overlays = d3.floorplan.overlays().editMode(true),
    mapdata = {};


//Déclaration d'une image
mapdata[imagelayer.id()] = [{
    url: 'http://dciarletta.github.io/d3-floorplan/Sample_Floorplan.jpg',
    x: 0,
    y: 0,
    height: 33.79,
    width: 50.0
     }];

map.addLayer(imagelayer)
   .addLayer(heatmap)
   .addLayer(vectorfield)
   .addLayer(pathplot)
   .addLayer(overlays);

var loadData = function(data) {
	mapdata[heatmap.id()] = data.heatmap;
	mapdata[overlays.id()] = data.overlays;
	mapdata[vectorfield.id()] = data.vectorfield;
	mapdata[pathplot.id()] = data.pathplot;
	
	d3.select("#demo").append("svg")
		.attr("height", 487).attr("width",720)
		.datum(mapdata).call(map);
};

loadData(jsonData);

    $(function() {
        $( "#dialog" ).dialog({ autoOpen: false });
        $('area').click(function() {
            var clickedAreaAlt = $(this).attr('alt');
            var clickedAreaTitle = $(this).attr('title');
            $( "#dialog" ).dialog({ title: clickedAreaTitle });
            $('#dialog p').text(clickedAreaAlt);
            $( "#dialog" ).dialog( "open" );
        });
    });