var map_1;
var zoom_level_0;
var fields_vector_source_1;
var fields_vector_source_2;
var center_x0;	//図幅の中心経度
var center_y0;
var parameters = {
	//sheet_no:,
	index_sec: 0,	//断面図番号
	rotation_rad: 0,
	value_cursor: 0,	//断面図カーソル位置　ピクセル
	/*view_zoomlevel:,
	center_x:,	//表示中心　x座標
	center_y:,
	lon_value:,	//メタ情報取得位置　経度（x座標）
	lan_value:*/
	polygon_no: 0,	//ポリゴンレイヤの番号
	seamless_ver: 'basic_version'	//選択ポリゴンレイヤの番号
}
var markerA;
var markerB;
setup_map();
var wkt_1 = [];
for (var i in district_array){
	var district_range = "POLYGON" + "((" + district_array[i][1][0] + " " + district_array[i][1][1] + ", " + district_array[i][2][0] + " " + district_array[i][1][1] + ", " + district_array[i][2][0] + " " + district_array[i][2][1] + ", " + district_array[i][1][0] + " " + district_array[i][2][1] + ", " + district_array[i][1][0] + " " + district_array[i][1][1] + "))";
	wkt_1.push(district_range);  
}
var wkt_2 = [];
var sheet_range = [];
for (var key in sheet_array){
	sheet_range[key] = [];
	wkt_2[key] = [];
	for (var i = 0; i <sheet_array[key].length; i++) {
		sheet_range[key][i] = "POLYGON" + "((" + Number(sheet_array[key][i][4]) + " " + Number(sheet_array[key][i][5]) + ", " + (Number(sheet_array[key][i][4]) +0.25) + " " + Number(sheet_array[key][i][5]) + ", " + (Number(sheet_array[key][i][4]) +0.25) + " " + (Number(sheet_array[key][i][5]) +1/6) + ", " + Number(sheet_array[key][i][4]) + " " + (Number(sheet_array[key][i][5]) +1/6) + ", " + Number(sheet_array[key][i][4]) + " " + Number(sheet_array[key][i][5]) + "))";
		wkt_2[key].push(sheet_range[key][i]); 
	}
}
var procedure_note = '主な手順<br>(1) 緑の枠内をクリックし、地域を選択<br>';
document.getElementById('meta_info').innerHTML = procedure_note;
function field_source_1(){
	for (var i in wkt_1){
		var format = new ol.format.WKT();
		var field_district = format.readFeature(wkt_1[i]);
		field_district.getGeometry().transform('EPSG:4326', 'EPSG:3857');
		field_district.set('description', district_array[i][0]);
		field_district.setStyle(styleFunction);
		fields_vector_source_1.addFeature(field_district);
		fields_vector_source_2.clear();
	}
}	//field_source_1()
function field_source_2(){
	for (var key in wkt_2){
		for (var i = 0; i <wkt_2[key].length; i++){
			var format = new ol.format.WKT();
			var field_sheet = format.readFeature(wkt_2[key][i]);
			field_sheet.getGeometry().transform('EPSG:4326', 'EPSG:3857');
			field_sheet.set('description', sheet_array[key][i][1]);
			field_sheet.setStyle(styleFunction);
			fields_vector_source_2.addFeature(field_sheet);
		}
	}
}	//field_source_2()
function styleFunction() {
	return [
		new ol.style.Style({
			fill: new ol.style.Fill({
			color: 'rgba(0,128,0,0.1)'
			}),
			stroke: new ol.style.Stroke({
				color: '#008000',
				width: 2
			}),
			text: new ol.style.Text({
				font: "bold 12px 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro W3'",	
				fill: new ol.style.Fill({ color: '#008000' }),
				stroke: new ol.style.Stroke({
					color: '#fff', width: 6
				}),
				text: this.get('description')
			})
		})
	];
}	//styleFunction()
function setup_map() {
	fields_vector_source_1 = new ol.source.Vector({});
	fields_vector_source_2 = new ol.source.Vector({});
	map_1 = new ol.Map({
		target: $('#map_0')[0],
		layers: [
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					attributions: [
						new ol.Attribution({
							html: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target = '_blank'>地理院タイル</a>"
						})
					],
					url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
				})
			}),
			new ol.layer.Vector({
				source: fields_vector_source_1
			}),
			new ol.layer.Vector({
				source: fields_vector_source_2
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([138, 35]),
			zoom: 7
		}),
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine()
		])
	});
}	//setup_map

function sel_rectangle(coordinate_lonlan) {
	var ditrict_center;
	var x = coordinate_lonlan[0];
	var y = coordinate_lonlan[1];
	var extent = [];
	for (var i = 0; i <district_array.length; i++) {
		extent[0] = district_array[i][1][0];
		extent[1] = district_array[i][1][1];
		extent[2] = district_array[i][2][0];
		extent[3] = district_array[i][2][1];
		ol.extent.containsXY = function(extent, x, y) {
			return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
		};
		if (extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3] == true){
			ditrict_center = ol.extent.getCenter(extent);
		}
	}
	return ditrict_center;
}	//sel_rectangle
function sel_rectangle_2(coordinate_lonlan){
	var sheet_center;
	var x = coordinate_lonlan[0];
	var y = coordinate_lonlan[1];
	var extent = [];
	loop: for (var key in sheet_array){
		for (var i = 0; i <sheet_array[key].length; i++) {
			extent[0] = Number(sheet_array[key][i][4]);
			extent[1] = Number(sheet_array[key][i][5]);
			extent[2] = Number(sheet_array[key][i][4]) +0.25;
			extent[3] = Number(sheet_array[key][i][5]) +1/6;
			ol.extent.containsXY = function(extent, x, y) {
				return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
			};
			if (extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3] == true){
				sheet_center = ol.extent.getCenter(extent);
				parameters.sheet_no = sheet_array[key][i][0];
				break loop;
			}
		}
	}
	return sheet_center;	
}	//sel_rectangle_2

map_1.on('moveend', (function(){
	zoom_level_0 = map_1.getView().getZoom();
	if (zoom_level_0 <8){
		fields_vector_source_1.clear();
		field_source_1();
	} else　if (zoom_level_0 <13){
		fields_vector_source_2.clear();
		field_source_2();
		procedure_note += '(2) 小さな緑の枠内をクリックし、図幅を選択<br>';
		document.getElementById('meta_info').innerHTML = procedure_note;
	}
}));

map_1.on('singleclick', (function(evt){
	var evt_coordinate = evt.coordinate;
	var coordinate_lonlan = ol.proj.toLonLat(evt_coordinate);
	zoom_level_0 = map_1.getView().getZoom();
	if (zoom_level_0 <8){
		var next_center = sel_rectangle(coordinate_lonlan);
		parameters.view_zoomlevel = 8;
		map_1.setView(new ol.View({
			center: ol.proj.fromLonLat(next_center),
			zoom: parameters.view_zoomlevel
		}));
	} else if (zoom_level_0 <13){
		var next_center_2 = sel_rectangle_2(coordinate_lonlan);
		parameters.view_zoomlevel = 13;
		map_1.setView(new ol.View({
			center: ol.proj.fromLonLat(next_center_2),
			zoom: parameters.view_zoomlevel
		}));
		sheet_select(parameters);
	}
}));

var button_home = '<input type = "button" value = "全国図に戻る" onClick = "document.location = \'https://gbank.gsj.jp/owscontents/ol4_50k_sec.html\';">';
document.getElementById("home_btn").innerHTML = button_home;
//
var url_no = [];
var layers_disp = [];	//表示用レイヤ配列
var layers_polygon = [];	//図幅のpolygonレイヤー配列
var layers_meta = [];	//メタ情報取得用　レイヤ配列
var legendGroup;	//凡例の分類名
var legendGraphic;	//凡例画像
function sheet_select(params) {	//図幅の選択
	document.getElementById('frame_a').style.visibility = 'visible';
	procedure_note += '(3) 画面左下のプルダウンメニューより断面図を選択<br>';
	document.getElementById('meta_info').innerHTML = procedure_note;
	legendGroup = document.getElementById('legend_group');
	legendGroup.innerHTML = '';
	legendGraphic = document.getElementById('legend_disp');
	legendGraphic.innerHTML = '';
	var sheetNo = params.sheet_no;
	url_no[sheetNo] = 'https://gbank.gsj.jp/ows/geologicmap50k_' + sheetNo;
	//
		//図幅中央の緯度経度をCapailitiesから取得
	$(function(){
		var data_1 = $.get(url_no[sheetNo],{
			service: "wms", request: "getcapabilities"
		},
		function(data, textStatus){
		}, "xml");
		$.when(data_1)
			.done(function(data_capabilities){
				//
				function xmlToJson(xml) {
					var sheet_obj = {};
					if (xml.nodeType == 1) {
						if (xml.attributes.length > 0) {
							for (var j = 0; j < xml.attributes.length; j++) {
								var attribute = xml.attributes.item(j);
								sheet_obj[attribute.nodeName] = attribute.nodeValue;
							}
						}
					} else if (xml.nodeType == 3) {
						sheet_obj = xml.nodeValue.trim();
					}
					if (xml.hasChildNodes()) {
						for(var i = 0; i < xml.childNodes.length; i++) {
							var item = xml.childNodes.item(i);
							var nodeName = item.nodeName;
							if (typeof(sheet_obj[nodeName]) == "undefined") {
								var tmp = xmlToJson(item);
								if(tmp != "")
									sheet_obj[nodeName] = tmp;
							} else {
								if (typeof(sheet_obj[nodeName].push) == "undefined") {
									var old = sheet_obj[nodeName];
									sheet_obj[nodeName] = [];
									sheet_obj[nodeName].push(old);
								}
								var tmp = xmlToJson(item);
								if(tmp != "")
									sheet_obj[nodeName].push(tmp);
							}
						}
					}
					return sheet_obj;
				};
				//
				var document_obj = xmlToJson(data_capabilities);
				var document_data_lonlan = document_obj['WMS_Capabilities']['Capability']['Layer']['EX_GeographicBoundingBox'];
				var min_y = Number(document_data_lonlan['southBoundLatitude']['#text']);
				var max_y = Number(document_data_lonlan['northBoundLatitude']['#text']);
				var min_x = Number(document_data_lonlan['westBoundLongitude']['#text']);
				var max_x = Number(document_data_lonlan['eastBoundLongitude']['#text']);
				center_x0 = (min_x + max_x)/2;
				center_y0 = (min_y + max_y)/2;
				var document_layers = new Array();
				document_layers[0] = new Array();
				document_layers[1] = new Array();
				var document_data_layers= document_obj['WMS_Capabilities']['Capability']['Layer']['Layer'];
				for (var i = 0; i < document_data_layers.length; i++)  {
					document_layers[0][i] = document_data_layers[i]['Name']['#text'];	//レイヤーの名称
					document_layers[1][i] = document_data_layers[i]['Title']['#text'];	//イヤーの説明
				}
				var document_data_mapname = document_obj['WMS_Capabilities']['Service']['KeywordList']['Keyword'][2]['#text'];
				var document_data_abstract = document_obj['WMS_Capabilities']['Capability']['Layer']['Abstract']['#text'];

				var layers_detail_xml = document_obj['WMS_Capabilities']['Capability']['Layer']['Abstract']['#text']; //シート説明
				var sheet_year = layers_detail_xml.substr((layers_detail_xml.indexOf("年"))-4, 4);
				var sheet_list_key = String(parameters.sheet_no.substr(0,2));
				//地域番号（図幅番号の左端2桁）
				for (key in sheet_array[sheet_list_key]){
					if (sheet_array[sheet_list_key][key][0] == parameters.sheet_no){
						if (sheet_array[sheet_list_key][key][3] !== ""){
							sheet_ref_year = sheet_array[sheet_list_key][key][3];
						} else {
							sheet_ref_year = sheet_year;
						}
					break;
					}
				}

				var map_name = document_layers[0];
				var map_abstract = document_layers[1];
				var selectionList_polygon = ['geo_A', 'ol1_A', 'ol2_A', 'ol3_A', 'ol4_A', 'ol5_A', 'ol6_A', 'ol7_A'];
				var selectionList_line_point = ['geo_L', 'gfd', 'ol1', 'ol1_L', 'ol2', 'ol2_L', 'ol3', 'ol3_L', 'ol4', 'ol4_L', 'ol5', 'ol5_L', 'ol6', 'ol6_L', 'ol7', 'ol7_L', 'sec', 'pnt', 'strdip'];
				var selectionList_label = ['geo_A_label', 'ol1_A_label', 'ol2_A_label', 'ol3_A_label'];
					layers_polygon[0] = new Array();	//レイヤーの名称
					layers_polygon[1] = new Array();	//レイヤーの説明
				for (var i = 0, j = 0; i < selectionList_polygon.length; i++) {
					var layer_name_index = map_name.indexOf(selectionList_polygon[i]);
					if (layer_name_index >= 0){
						layers_polygon[0][j] = selectionList_polygon[i];
						layers_polygon[1][j] = map_abstract[layer_name_index];
						j++;
					}
				}
				var layers_line_point = new Array();	//lineとpointレイヤーの構成
				layers_line_point[0] = new Array();
				layers_line_point[1] = new Array();
				for (var i = 0, j = 0; i < selectionList_line_point.length; i++) {
					var layer_name_index = map_name.indexOf(selectionList_line_point[i]);
					if (layer_name_index >= 0){
						layers_line_point[0][j] = selectionList_line_point[i];
						layers_line_point[1][j] = map_abstract[layer_name_index];
						j++;
					}
				}
				var layers_label = new Array();	//labelレイヤーの構成
				layers_label[0] = new Array();
				layers_label[1] = new Array();
				for (var i = 0, j = 0; i < selectionList_label.length; i++) {
					var layer_name_index = map_name.indexOf(selectionList_label[i]);
					if (layer_name_index >= 0){
						layers_label[0][j] = selectionList_label[i];
						layers_label[1][j] = map_abstract[layer_name_index];
						j++;
					}
				}
	//
	$(function(){	//ポリゴンの選択
		$("#select_polygon").empty();
		$.each(layers_polygon[0], function(key, value) {
			if (value == 'geo_A') {
				$("#select_polygon").append('<option value="' + value + '" selected>' + value + ' ' + layers_polygon[1][key] + '</option>');
			} else {
				$("#select_polygon").append('<option value="' + value + '">' + value + ' ' + layers_polygon[1][key] + '</option>');
			}
		});
	});
	//
		var layer_polygon_s0 = 'geo_A';
		var layer_polygon_s1 = '地質分布の面情報（ポリゴン）';
		var layers_list_0 = $.extend(true, [], layers_line_point);
		var layers_list = new Array();
		layers_list[0] = layers_list_0[0].concat(layers_label[0]);	//表示用レイヤーリスト　（除くポリゴン)
		layers_list[1] = layers_list_0[1].concat(layers_label[1]);
		var layers_disp_0 = $.extend(true, [], layers_line_point);
		var layers_disp_1 = new Array();
		layers_disp_1[0] = layers_polygon[0].concat(layers_disp_0[0]);
		layers_disp_1[1] = layers_polygon[1].concat(layers_disp_0[1]);
		layers_disp[0] = layers_disp_1[0].concat(layers_label[0]);	//地図表示用レイヤ
		layers_disp[1] = layers_disp_1[1].concat(layers_label[1]);
		layers_meta = $.extend(true, [], layers_line_point);
		layers_meta[0].unshift(layer_polygon_s0);	//メタ情報取得用
		layers_meta[1].unshift(layer_polygon_s1);

		var disp_name_data = document.getElementById('sheeet_name');
		disp_name_data.innerHTML = document_data_mapname + " (" + sheet_year + ")";	//図幅名称
		var disp_abstract_data = document.getElementById('sheet_abstract');
		var disp_abstract_data_1 = document_data_abstract;
		disp_abstract_data_1 = disp_abstract_data_1.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		disp_abstract_data.innerHTML = disp_abstract_data_1;	//図幅説明
		var url_ref = 'https://www.gsj.jp/data/50KGM/PDF/GSJ_MAP_G050_' + parameters.sheet_no + '_' + sheet_ref_year + '_D.pdf';	//説明書のリンク画像
		document_reference = '<br><span><a href = "' + url_ref + '" target = \"_blank\"><img src = \"images/download_ref.jpg\"></a> 説明書(PDF)</span>';
		var pdf_reference = document.getElementById('sheet_reference');
		pdf_reference.innerHTML = document_reference;
		var layer_components_list = document.getElementById('layer_components');	//構成レイヤー（ポリゴンレイヤーを除く）　
		var layer_components_disp = '';
		for (var i = 0; i < layers_list[0].length; i++) {
			layer_components_disp = layer_components_disp + '<b>' + layers_list[0][i] + ' </b> ' + layers_list[1][i] + '/ ';
		}
		layer_components_list.innerHTML = layer_components_disp;
	//
	if (parameters.index_sec == 0) {
		parameters.center_x = center_x0;	
		parameters.center_y = center_y0;
		map_disp(parameters);
		}
	var combo = document.image_select.img_sel;
	var options_0 = combo.getElementsByTagName('option');
	for (var i = options_0.length -1; i >0; i--){
		combo.removeChild(options_0[i]);
	}
	sheetNo = parameters.sheet_no;
	for(var i = 0; i <list_section[sheetNo].length; i++){
		document.image_select.img_sel.options[i +1] = new Option(list_section[sheetNo][i][0], list_section[sheetNo][i][1]);
	}

	})	//$.done
		.fail(function(data_capabilities){
			window.alert('図幅が配信サービスされておりません');
		});
	});	//function()
}	//sheet_select
//
var map_2;
function map_disp(params){
	map_2 = document.getElementById('map_0');
	map_2.innerHTML = '';
	if (params.index_sec > 0) {		//断面の折れの数　=　配列長さ（ listL ）　-3
		var index_temp = params.index_sec;
		var sheetNo = params.sheet_no;
		var listL = list_section[sheetNo][index_temp-1].length;
		for (var i = 0; i <listL -3; i++){
			if (params.value_cursor >= list_section[sheetNo][index_temp-1][i +2][0] && params.value_cursor < list_section[sheetNo][index_temp-1][i +3][0]){
				var cursor_ind = (params.value_cursor -list_section[sheetNo][index_temp-1][i +2][0])/(list_section[sheetNo][index_temp-1][i +3][0] - list_section[sheetNo][index_temp-1][i +2][0]);
				params.lon_value = list_section[sheetNo][index_temp-1][i +2][1] *(1 -cursor_ind) + list_section[sheetNo][index_temp-1][i +3][1] *cursor_ind;
				params.lan_value = list_section[sheetNo][index_temp-1][i +2][2] *(1 -cursor_ind) + list_section[sheetNo][index_temp-1][i +3][2] *cursor_ind;
				params.rotation_rad = Math.atan2((list_section[sheetNo][index_temp-1][i +3][2] - list_section[sheetNo][index_temp-1][i +2][2])*30.820,(list_section[sheetNo][index_temp-1][i +3][1] - list_section[sheetNo][index_temp-1][i +2][1])*25.15);　
				params.center_x = (list_section[sheetNo][index_temp-1][i +2][1] + list_section[sheetNo][index_temp-1][i +3][1])/2;
				params.center_y = (list_section[sheetNo][index_temp-1][i +2][2] + list_section[sheetNo][index_temp-1][i +3][2])/2;
				if (params.view_zoomlevel >12){
					params.center_x = params.lon_value;
					params.center_y = params.lan_value;
				}
				break;
			}
		}
	main_process(parameters);
	} else {
	main_process(parameters);
	}
}	//map_disp(params)
//
var image_sec = new Image();	//断面図画像
var image_name;		//断面図名称
var width_image;
var height_image;
var selected_image = document.getElementById('image_selection');
selected_image.addEventListener('change', function() {
	if (parameters.index_sec == 0){
		procedure_note += '(4) 断面図画像をクリックし、平面図と対比する断面図の位置を指定<br>';
		document.getElementById('meta_info').innerHTML = procedure_note;
	}
	parameters.index_sec = selected_image.selectedIndex;
	var index_temp = parameters.index_sec;
	image_name = selected_image.options[index_temp].value;
	image_sec.src = 'images_section\/' + image_name;
	image_sec.onload = function(){
		width_image = image_sec.width;
		height_image = image_sec.height;
		position_aquisition(parameters);
	}
});	//断面選択
//
var resize_flg = true;
var selected_resize = document.getElementById('resize_btn');
selected_resize.addEventListener('change', function(evt) {
	if (document.getElementsByName("resize_btn")[0].checked){
		resize_flg = true;
	} else {
		resize_flg = false;
	}
	position_aquisition(parameters);
})	//resize_btn
//
var mouseX; //断面図クリック位置
function position_aquisition(params){
	var canvas_sec = document.getElementById('img_section_canvas');
	var ctx = canvas_sec.getContext('2d');
	var image1= new Image();
	image1.src = image_sec.src;
	image1.addEventListener('load', function() {
		var width_image = image1.width;
		var height_image = image1.height;
	//
		if (resize_flg ==true){
			var rel_size = height_image/250;
		} else {
			var rel_size = 1;
		}
		var width_image_rel = width_image/rel_size;
		var height_image_rel = image1.height/rel_size
	//
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
			var view_chk = map_2.getView();
			params.view_zoomlevel = view_chk.getZoom();

			var index_temp = params.index_sec;
			var sheetNo = params.sheet_no;
			var listL = list_section[sheetNo][index_temp -1].length;
			//断面の折れの数　=　配列長さlistL 　-3
			for (var i = 0; i <listL -2; i++){
				if (cursor_pix >= list_section[sheetNo][index_temp -1][i +1][0] && cursor_pix < list_section[sheetNo][index_temp -1][i +2][0]){
					var cursor_ind = (cursor_pix -list_section[sheetNo][index_temp -1][i +1][0])/(list_section[sheetNo][index_temp -1][i +2][0] - list_section[sheetNo][index_temp -1][i +1][0]);
					params.lon_value = list_section[sheetNo][index_temp -1][i +1][1] *(1 -cursor_ind) + list_section[sheetNo][index_temp -1][i +2][1] *cursor_ind; 
					params.lan_value = list_section[sheetNo][index_temp -1][i +1][2] *(1 -cursor_ind) + list_section[sheetNo][index_temp -1][i +2][2] *cursor_ind;	
					params.rotation_rad = Math.atan2((list_section[sheetNo][index_temp -1][i +2][2] - list_section[sheetNo][index_temp -1][i +1][2])*30.820, (list_section[sheetNo][index_temp -1][i +2][1] - list_section[sheetNo][index_temp -1][i +1][1])*25.15);
					params.center_x = (list_section[sheetNo][index_temp -1][i +1][1] + list_section[sheetNo][index_temp -1][listL-1][1])/2;
					params.center_y = (list_section[sheetNo][index_temp -1][i +1][2] + list_section[sheetNo][index_temp -1][listL-1][2])/2;
					if (params.view_zoomlevel >12){
						params.center_x = params.lon_value;
						params.center_y = params.lan_value;
					}

					map_disp(parameters);
					break;
				}
			}
			meta_information_sec(parameters);
		}
	}, false);
}	//position_aquisition(params)
//
var url_base = 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';	//国土地理院地図
var select_baselayer = document.getElementById('select_base');
select_baselayer.addEventListener('change', function() {
	var baseLayer  = select_baselayer.selectedIndex;
	if (select_baselayer.options[baseLayer].value == "base_1") {
		url_base = 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
	} else if (select_baselayer.options[baseLayer].value == "base_2") {
		url_base = 'https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png';
	} else if (select_baselayer.options[baseLayer].value == "base_3") {
		url_base = 'https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png';
	}
	map_disp(parameters);
});

var view_1;
function main_process(params){
	var layers_entire = [];	//layers_entire[0]：　地理院地図, layers_entire[1]～：　ポリゴン,ラインとポイント	
	var wmsSources = [];
	var sheetNo = params.sheet_no;
	for (var i = 0; i < layers_disp[0].length -1; i++) {
		wmsSources[i] = new ol.source.ImageWMS({
			url: url_no[sheetNo],
			params: {layers: layers_disp[0][i], transparent: true, format: "image/png"}
		});
	}
	wmsSources[layers_disp[0].length -1] = new ol.source.ImageWMS({
		url: url_no[sheetNo],
		params: {layers: layers_disp[0][layers_disp[0].length -1], transparent: true, format: "image/png"},
		attributions: [
			new ol.Attribution({
				html: "<a href='https://www.gsj.jp/license/index.html' target='_blank'>Geological Survey of Japan, AIST</a>"		//最後のレイヤーにAttributionを表示
			})
		]
	});
	view_1 = new ol.View({
		rotation: params.rotation_rad,
		center: ol.proj.fromLonLat([params.center_x, params.center_y]),
		zoom: params.view_zoomlevel
	});

	layers_entire[0] = new ol.layer.Tile({
		source: new ol.source.XYZ({
			attributions: [
				new ol.Attribution({
					html: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
				})
			],
			url: url_base
		})
	});

	for (var i = 0; i < layers_disp[0].length; i++) {
		layers_entire[i+1] = new ol.layer.Image({
			source: wmsSources[i]
		});
	}
	for (var i = 0; i <layers_polygon[0].length; i++) {
		if (i == params.polygon_no) {
			layers_entire[i+1].setVisible(true);
		} else {
			layers_entire[i+1].setVisible(false);
		}
	}
		//ポリゴンレイヤーの選択
	var selected_polygon = document.getElementById('select_polygon');
	selected_polygon.addEventListener('change', function() {
		params.polygon_no = selected_polygon.selectedIndex;
			for (var i = 0; i <layers_polygon[0].length;  i++) {
				if (i == params.polygon_no) {
					layers_entire[i+1].setVisible(true);
				} else {
					layers_entire[i+1].setVisible(false);
				}
			}
		layers_meta[0].shift();
		layers_meta[1].shift();
		layers_meta[0].unshift(layers_polygon[0][params.polygon_no]);
		layers_meta[1].unshift(layers_polygon[1][params.polygon_no]);
		map_2.render();
	});

	map_2 = new ol.Map({
		layers: layers_entire,
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine()
		]),
		target: 'map_0',
		view: view_1
	});
	//レイヤー画像の複合化
	var select = document.getElementById('select_blend');
	var setBlendModeFromSelect = function(evt) {
		evt.context.globalCompositeOperation = select.value;
	};
	var resetBlendModeFromSelect = function(evt) {
		evt.context.globalCompositeOperation = 'source-over';
	};
	var bindLayerListeners = function(layer) {
		layer.on('precompose', setBlendModeFromSelect);
		layer.on('postcompose', resetBlendModeFromSelect);
	};       
	var unbindLayerListeners = function(layer) {
		layer.un('precompose', setBlendModeFromSelect);
		layer.un('postcompose', resetBlendModeFromSelect);
	};
	select.addEventListener('change', function() {
	map_2.render();
	});

	for (var i = 0; i < layers_entire.length; i++) {
		bindLayerListeners(layers_entire[i]);
	}

	var urls_entire = [];
	var url_seamless;
	if (params.seamless_ver == 'basic_version'){
		url_seamless = 'https://gbank.gsj.jp/ows/seamlessgeology200k_b';
	} else {
		url_seamless = 'https://gbank.gsj.jp/ows/seamlessgeology200k_d';
	}
	var setSeamlessVer = document.getElementById('seamless_ver');
	setSeamlessVer.addEventListener('change', function() {
		var seamless_version  = setSeamlessVer.selectedIndex;
		params.seamless_ver = setSeamlessVer.options[seamless_version].value;
		if (params.seamless_ver == "basic_version") {
			url_seamless = 'https://gbank.gsj.jp/ows/seamlessgeology200k_b';
		} else if (params.seamless_ver == "detailed_version") {
			url_seamless = 'https://gbank.gsj.jp/ows/seamlessgeology200k_d';
		}
	});
//
	map_2.on('singleclick', function(evt) {
		var evt_coordinate = evt.coordinate;
		var coordinate_lonlan = ol.proj.toLonLat(evt_coordinate);
		meta_information(coordinate_lonlan, evt_coordinate);
	})

	function convertCoordinate(longitude, latitude) {
		return ol.proj.transform([longitude, latitude], "EPSG:4326","EPSG:3857");
	}
	function makeMarkerOverlay(imgSrc, coordinate) {
		var imgElement = document.createElement('img');
		imgElement.setAttribute('src', imgSrc);
		var markerOverlay = new ol.Overlay({
			element: imgElement,
			position: coordinate,
			offset: [-9,-30]
		});
		return markerOverlay;
	}	//makeMarkerOverlay(imgSrc, coordinate)
	if (markerA !== undefined) {
		map_2.removeOverlay(markerA);
	}
	if (params.lon_value !== undefined ){
		markerA = makeMarkerOverlay('images_section\/marker-red.png', convertCoordinate(params.lon_value, params.lan_value));
	map_2.addOverlay(markerA);
	}
//
	function meta_information(coordinate_lonlan, evt_coordinate){
	document.getElementById('legend_group').style.visibility = 'visible';
	document.getElementById('legend_disp').style.visibility = 'visible';
		function convertCoordinate(longitude, latitude) {
			return ol.proj.transform([longitude, latitude], "EPSG:4326","EPSG:3857");
		}
		function makeMarkerOverlay(imgSrc, coordinate) {
			var imgElement = document.createElement('img');
			imgElement.setAttribute('src', imgSrc);
			var markerOverlay = new ol.Overlay({
				element: imgElement,
				position: coordinate,
				offset: [-9,-30]
			});
			return markerOverlay;
		}
		if (markerB !== undefined) {
			map_2.removeOverlay(markerB);
		}
		markerB = makeMarkerOverlay('images_section\/marker-blue.png', convertCoordinate(coordinate_lonlan[0], coordinate_lonlan[1]));
		map_2.addOverlay(markerB);
		var content_meta_info = document.getElementById('meta_info');
		var viewResolution = view_1.getResolution();
		urls_entire[0] = 'https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=' + coordinate_lonlan[0] + '&lat=' + coordinate_lonlan[1] + '&outtype=JSON';	//標高取得
		var wmsSource_200k = new ol.source.ImageWMS({
			url: url_seamless,
			params: {layers: "area", transparent: true, format: "image/png"},
			attributions: [
					new ol.Attribution({
						html: "<a href='https://www.gsj.jp/license/index.html' target='_blank'> Geological Survey of Japan, AIST</a>"
					})
				]
		});
		urls_entire[1] = wmsSource_200k.getGetFeatureInfoUrl(evt_coordinate, viewResolution, 'EPSG:3857',
		{'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': 'area'});
		var wmsSources_2 = $.extend(true, [], wmsSources);
		for (var i = 0, j = 0; i < layers_polygon[0].length; i++){
			if (i == params.polygon_no) {
				j++;
			} else {
				wmsSources_2.slice(j, 1);
			}
		}
		for (var i = 0; i < layers_meta[0].length +1; i++) {
			urls_entire[i+2] = wmsSources_2[i].getGetFeatureInfoUrl(
				evt_coordinate, viewResolution, 'EPSG:3857',
				{'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layers_meta[0][i]}
			);
		}
//
		var legend_disp_no;
		$(function(){
			var data_layer = [];
			data_layer[0] = $.getJSON(urls_entire[0]);
			var data_layer_results = new Array(layers_meta[0].length + 2);
			var data_layer_meta = [];
			for (var i = 1; i <urls_entire.length; i++) {
				dfd = $.get(urls_entire[i]);
				data_layer.push(dfd);
			}
			$.when.apply($, data_layer)
				.done(function(){
					data_layer_results  = arguments;
					var metadata = '';
					for (var i = data_layer_results.length -2; i > 1; i--) {
						if (data_layer_results[i][0] !== ""){
							metadata = data_layer_results[i][0];
							legend_disp_no = i;
							break;
						}
					}
					var elevation_m = data_layer_results[0][0]['elevation'];
					var metadata_200k = data_layer_results[1][0];
					if (metadata_200k !== "") {
						metadata_200k = data_layer_results[1][0].replace("border=\"2\"","id=\"seamless_table\"").replace("th", "th width=\"60\"").replace(/center/g, "left");
					} else {
						metadata_200k = "<p class = \"meta_2\">この拡大率ではメタ情報は表示されません。<br>表示を縮小してみてください。<br>水域などではメタ情報が登録されていない場合があります。</p>";
					}
					content_meta_info.innerHTML = '<p>経度: ' + coordinate_lonlan[0].toFixed(4) + ' 緯度: ' + coordinate_lonlan[1].toFixed(4)+' 標高: '+ elevation_m + ' m　</p><code>' + metadata + '</code>' + '<p class = "meta_2">【参考情報】　20万分の1日本シームレス地質図</p><code>' + metadata_200k + '</code>';
					if (legend_disp_no !== undefined){
						var url_legendGraphic = 'https://gbank.gsj.jp/ows/geologicmap50k_' + sheetNo + '?version=1.3.0&request=GetLegendGraphic&sld_version=1.1.0&format=image/png&STYLE=default&layer=' + layers_meta[0][legend_disp_no -2];
						legendGroup.innerHTML = '<b>' + layers_meta[0][legend_disp_no -2] + ': </b>' + layers_meta[1][legend_disp_no -2];
						legendGraphic.innerHTML = '<img src=' + url_legendGraphic + '></img>';
					}
				})
				.fail(function(){
					window.alert('メタ情報が取得できませんでした');
				});
		})	//function()
	}	//meta_information(coordinate_lonlan, evt_coordinate)
}	//main_process
//=====================================================================================
function meta_information_sec(params){
	document.getElementById('meta_info').style.visibility = 'visible';
	document.getElementById('legend_group').style.visibility = 'hidden';
	document.getElementById('legend_disp').style.visibility = 'hidden';
	var url_map = 'https://gbank.gsj.jp/ows/geologicmap50k_' + params.sheet_no;
	legendGroup.innerHTML = '';
	legendGraphic.innerHTML = '';
	var wms_sources = [];
	var layers_name = [];
	layers_name[0] = layers_polygon[0][params.polygon_no];
	layers_name[1] = "geo_L";	
	layers_name[2] = "gfd";	
	var urls_meta = [];
	var wms_sources_3 = [];
	var evt_coordinate = ol.proj.fromLonLat([params.lon_value, params.lan_value]);
	var viewResolution = view_1.getResolution();
	for (var i = 0; i <3; i++){
		wms_sources[i] = new ol.source.ImageWMS({
			url: url_map,
			params: {layers: layers_name[i], transparent: true, format: "image/png"}
		});
	}
	var wms_sources_3 = $.extend(true, [], wms_sources);
	for (var i = 0; i <3; i++){
		urls_meta[i] = wms_sources_3[i].getGetFeatureInfoUrl(
		evt_coordinate, viewResolution, 'EPSG:3857',
			{'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layers_name[i]}
		);
	}
	var dfd = [];
	$(function(){
	var data_layer = [];
	var data_layer_results = [];
	var data_layer_meta = [];
	for (var i = 0; i <urls_meta.length; i++) {
		dfd = $.get(urls_meta[i]);
		data_layer.push(dfd);
	}
	$.when.apply($, data_layer)
		.done(function(){
			data_layer_results = arguments;
			var metadata = '';
			var metaInfo = document.getElementById('meta_info');
			for (var i = 0; i <data_layer_results.length; i++) {
				if (data_layer_results[i][0] !== "" && !data_layer_results[i][2]['responseXML']){
					metadata = metadata +data_layer_results[i][0];
				}
			}
			metaInfo.innerHTML = metadata;
		})
		.fail(function(){
			window.alert('メタ情報が取得できませんでした');
		});
	})	//$(function()
}	//meta_information_sec