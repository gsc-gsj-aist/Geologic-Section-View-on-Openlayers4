var list_section = [];
list_section[0] = [];
list_section[1] = [];
list_section[0][0] = ["A-B", [104, 136.3221, 35.1699], [3093, 136.3721, 35.0032]];
list_section[0][1] = ["C-D-E-F", [122, 136.4972, 35.1697], [804, 136.4557, 35.1503], [2296, 136.4417, 35.0658], [3421, 136.462, 35.0032]];
list_section[0][2] = ["G-H-I", [129, 136.3214, 35.0345], [1067, 136.3845, 35.0211], [2671, 136.4971, 35.019]];
list_section[0][3] = ["J-K-L", [59, 136.2471, 35.0681], [1074, 136.2989, 35.0285], [1299, 136.3148, 35.0252]];
list_section[0][4] = ["M-N", [118, 136.4824, 35.1361], [354, 136.4971, 35.1419]];
list_section[0][5] = ["O-P-Q", [119, 136.4667, 35.059], [389, 136.4858, 35.0604], [593, 136.4971, 35.0534]];
list_section[1][0] = "GSJ_MAP_G050_11030_1989_S1.jpg";
list_section[1][1] = "GSJ_MAP_G050_11030_1989_S2.jpg";
list_section[1][2] = "GSJ_MAP_G050_11030_1989_S3.jpg";
list_section[1][3] = "GSJ_MAP_G050_11030_1989_S4.jpg";
list_section[1][4] = "GSJ_MAP_G050_11030_1989_S5.jpg";
list_section[1][5] = "GSJ_MAP_G050_11030_1989_S6.jpg";
window.onload = function(){
	for(var i = 0; i <list_section[1].length; i++){
		document.image_select.img_sel.options[i +1] = new Option(list_section[0][i][0], list_section[1][i]);
	}
}
var image_section = [];
for (var i = 0; i < list_section[1].length; i++){
	image_section[i] = new Image();
}

var layer_base = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: [
			new ol.Attribution({
				html: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target = '_blank'>地理院タイル</a>"
			})
		],
		url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
	})
});
var url_map = 'https://gbank.gsj.jp/ows/geologicmap50k_11030';
var wms_source_1 = new ol.source.ImageWMS({
	url: url_map,
	params: {layers: "geo_A", transparent: true, format: "image/png"},
	attributions: [
		new ol.Attribution({
			html: "<a href='https://www.gsj.jp/license/index.html' target='_blank'> Geological Survey of Japan, AIST</a>"
		})
	]
});
var layer_1 = new ol.layer.Image({
	source: wms_source_1,
	opacity: 0.6
});
var wms_source_2 = new ol.source.ImageWMS({
	url: url_map,
	params: {layers: ["geo_L", "gfd", "sec"], transparent: true, format: "image/png"}
});
var layer_2 = new ol.layer.Image({
	source: wms_source_2
});

var index = 0;	//未選択
var view_1;
var vector_layer;
var layers_arr = [];
var map_1;
var center_x;	//地図中心
var center_y;
var rotation_rad;	//回転角
var view_zoomlevel = 13;
var cursor_pix;		//断面図上のカーソル位置(ｐｉｘｅｌ)
var lon_value;		//経度（ｘ軸)
var lan_value;		//緯度（ｙ軸）
if (index == 0) {	//初期化
	center_x = 136.3545;
	center_y = 35.0865;
	rotation_rad = 0;
	view_zoomlevel = 13;
	cursor_pix = 100;
	map_disp(index, center_x, center_y, rotation_rad, view_zoomlevel);
}
//
function map_disp(index, center_x, center_y, rotation_rad, view_zoomlevel){
	//地図画像の再表示、中心位置、回転角度、マーカーの位置の表示
	var map_disp = document.getElementById('map_0');
	map_disp.innerHTML = "";	
	if (index >0) {
		layers_arr = [layer_base, layer_1, layer_2, vector_layer];
	} else {
		layers_arr = [layer_base, layer_1, layer_2];
	}
	view_1 = new ol.View({
		center: ol.proj.fromLonLat([center_x, center_y]),
		rotation: rotation_rad,
		zoom: view_zoomlevel
	});
	map_1 = new ol.Map({
		layers: layers_arr,
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine()
		]),
		target: 'map_0',
		view: view_1
	});
	if (index > 0) {
		meta_data(lon_value, lan_value);
	}
}	//map_disp(index, center_x, center_y, rotation_rad, view_zoomlevel)
//
var image_name;
var width_image;
var height_image;
var selected_image = document.getElementById('imageSelection');	//ポリゴンレイヤーの選択
selected_image.addEventListener('change', function() {	//断面の選択、プルダウンメニューより
	index = selected_image.selectedIndex;
	image_name = selected_image.options[index].value;
	image_section[index -1].src = 'images_section\/' + image_name;
	width_image = image_section[index -1].width;
	height_image = image_section[index -1].height;
	position_aquisition(index);
});

var resize_flg = true;
var selected_resize = document.getElementById('radio_resize');
selected_resize.addEventListener('change', function(evt) {
	if (document.getElementsByName("radio_resize")[0].checked){
		resize_flg = true;
	}else{
		resize_flg = false;
	}
	position_aquisition(index);
})

var mouseX; // 最後にクリックされた位置のx座標
function position_aquisition(index){
	var canvas_sec = document.getElementById('img_section_canvas');
	var ctx = canvas_sec.getContext('2d');
	var image1= new Image();
	image1.src = image_section[index -1].src;
	image1.addEventListener('load', function() {
		var width_image = image1.width;
		var height_image = image1.height;
	if (resize_flg == true){
		var rel_size = height_image/250;
	}else{
		var rel_size = 1;
	}
		var width_image_rel = width_image/rel_size;
		var height_image_rel = image1.height/rel_size
		canvas_sec.width = width_image_rel;
		canvas_sec.height = height_image_rel;
		ctx.drawImage(image1, 0, 0, width_image_rel, height_image_rel);
		canvas_sec.onclick = function(evt) {
			ctx.clearRect(0, 0, width_image_rel, height_image_rel);
			ctx.drawImage(image1, 0, 0, width_image_rel, height_image_rel);
			var rect = evt.target.getBoundingClientRect();
			mouseX = evt.clientX - Math.floor(rect.left) - 2;
			ctx.beginPath();
			ctx.strokeStyle = 'rgb(255,0,0)';
			ctx.moveTo(mouseX, 0);
			ctx.lineTo(mouseX, height_image_rel);
			ctx.closePath();
			ctx.stroke();
			cursor_pix = mouseX *rel_size;
			var view_chk = map_1.getView();
			view_zoomlevel = view_chk.getZoom();

			var listL = list_section[0][index -1].length;
			//断面の折れの数　=　配列長さlistL 　-3
			for (var i = 0; i <listL -2; i++){
				if (cursor_pix >= list_section[0][index -1][i +1][0] && cursor_pix < list_section[0][index -1][i +2][0]){	//断面の直線ごとの計算
					var cursor_ind = (cursor_pix -list_section[0][index -1][i +1][0])/(list_section[0][index -1][i +2][0] - list_section[0][index -1][i +1][0]);
					lon_value = list_section[0][index -1][i +1][1] *(1 -cursor_ind) + list_section[0][index -1][i +2][1] *cursor_ind; //経度
					lan_value =  list_section[0][index -1][i +1][2] *(1 -cursor_ind) + list_section[0][index -1][i +2][2] *cursor_ind;	//緯度
					rotation_rad = Math.atan2((list_section[0][index -1][i +2][2] - list_section[0][index -1][i +1][2])*30.820, (list_section[0][index -1][i +2][1] - list_section[0][index -1][i +1][1])*25.15);　//回転角
					center_x = (list_section[0][index -1][i +1][1] + list_section[0][index -1][listL-1][1])/2;
					center_y = (list_section[0][index -1][i +1][2] + list_section[0][index -1][listL-1][2])/2;
					if (view_zoomlevel > 12){
						center_x = lon_value;
						center_y = lan_value;
					}
					var cross_locat = new ol.Feature({	//断面線上に目印の円
						geometry: new ol.geom.Point(ol.proj.fromLonLat([lon_value, lan_value]))
					});
					cross_locat.setStyle(new ol.style.Style({
						image: new ol.style.Circle({
							radius: 12,
							fill: new ol.style.Fill({
							color: 'rgba(255,0,0,0.2)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(255,0,0,1)',
								width: 1
							})
						})
					}));
					var vector_source = new ol.source.Vector({
						features: [cross_locat]
					});
					vector_layer = new ol.layer.Vector({
						source: vector_source
					});
					map_disp(index, center_x, center_y, rotation_rad, view_zoomlevel);
					break;
				}
			}
		}
	}, false);
}	//position_aquisition(index)
//
function meta_data(lon_value, lan_value){
	var wms_sources = [];
	var layers_name = [];
	layers_name[0] = "geo_A";
	layers_name[1] = "geo_L";	
	layers_name[2] = "gfd";	
	var urls =[];
	var wms_sources_3 = [];
	var evt_coordinate = ol.proj.fromLonLat([lon_value, lan_value]);
	var viewResolution = view_1.getResolution();
	for (var i = 0; i <3; i++){
		wms_sources[i] = new ol.source.ImageWMS({
			url: url_map,
			params: {layers: layers_name[i], transparent: true, format: "image/png"}
		});
	}
	var wms_sources_3 = $.extend(true, [], wms_sources);
	for (var i = 0; i <3; i++){
		urls[i] = wms_sources_3[i].getGetFeatureInfoUrl(
		evt_coordinate, viewResolution, 'EPSG:3857',
			{'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layers_name[i]}
		);
	}
	var dfd =[];
	
	$(function(){
	var data_layer = [];
	var data_layer_results =[];
	var data_layer_meta = [];
	for (var i = 0; i <urls.length; i++) {
		dfd = $.get(urls[i]);
		data_layer.push(dfd);
	}
	$.when.apply($, data_layer)
		.done(function(){
			data_layer_results = arguments;
			var metadata = '';
			var metaInfo = document.getElementById('meta_info');
			for (var i = 0; i <data_layer_results.length; i++) {
				if (data_layer_results[i][0] !== ""){
					metadata = metadata +data_layer_results[i][0];
				}
			}
			metaInfo.innerHTML = metadata;
		})
		.fail(function(){
			window.alert('メタ情報が取得できませんでした');
		});
	})	
}	//meta_data(lon_value, lan_value)