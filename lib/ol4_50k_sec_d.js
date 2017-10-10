var district_array = [/*['網走', [142.5, 43.5], [145.5, 45.5]], ['釧路', [142.5, 41.5], [145.5, 43.5]], ['旭川', [139.5, 43.5], [142.5, 45.5]], ['札幌', [139.5, 41.5], [142.5, 43.5]], ['青森', [139, 40], [142, 42]], ['秋田', [139, 38], [142, 40]], ['新潟', [138, 36.5], [141, 38.5]], */['東京', [138, 34.5], [141, 36.5]], ['八丈島', [138, 32.5], [141, 34.5]], /*['金沢', [135, 35.5], [138, 37.5]],*/ ['京都', [135, 33.33], [138, 35.5]]/*, ['岡山', [132, 34.5], [135, 36.5]], ['高知', [132, 32.5], [135, 34.5]], ['福岡', [129, 33], [132, 35]], ['鹿児島', [129, 31], [132, 33]], ['種子島', [129, 29], [132, 31]], ['奄美大島', [128, 27], [131, 29]], ['那覇', [126, 25.5], [129, 27.5]], ['宮古島', [123, 24], [126, 26]], ['小笠原', [140.5, 24], [142.5, 28]]*/];
var sheet_array = [];	//図幅情報の配列
sheet_array['08'] = [/*["08029","鴻巣","Konosu","","139.49703","36.00322"],*/["08063","東京西南部","Tokyo-Seinambu","","139.49703","35.50322"],["08074","横浜","Yokohama","","139.49703","35.33655"],["08075","木更津","Kisarazu","","139.74703","35.33655"],["08076","姉崎","Anesaki","","139.99703","35.33655"],/*["08079","南部","Nanbu","","138.24703","35.16989"],*/["08084","横須賀","Yokosuka","","139.49703","35.16989"],["08085","富津","Futtsu","","139.74703","35.16989"],/*["08092","熱海","Atami","","138.99703","35.00322"],*/["08093","三崎","Misaki","","139.49703","35.00322"],["08094","那古","Nako","1990","139.74703","35.00322"],["08095","鴨川","Kamogawa","","139.99703","35.00322"],["08100","修善寺","Shuzenji","1955","138.74703","34.83655"],["08101","伊東","Ito","","138.99703","34.83655"],["08102","館山","Tateyama","","139.74703","34.83655"],["08105","下田","Shimoda","","138.74703","34.66989"],["08106","稲取","Inatori","","138.99703","34.66989"],["08107","大島","Oshima","","139.24703","34.66989"],["08109","神子元島","Mikomotojima","","138.74703","34.50322"],["08110","利島","Toshima","","139.24703","34.50322"]];
sheet_array['09'] =[["09001","新島","Nii-Jima","","139.12203","34.33652"],["09002","神津島","Kozu-Shima","","138.99703","34.16992"],["09003","三宅島","Miyake-Jima","","139.37203","34.00322"]];
sheet_array['11'] =[["11018","彦根東部","Hikonetobu","","136.24703","35.16989"],["11019","津島","Tsushima","","136.49703","35.16989"],["11020","名古屋北部","Nagoya-Hokubu","","136.74703","35.16989"],["11030","御在所山","Gozaisho Yama","","136.24703","35.00322"],["11031","桑名","Kuwana","","136.49703","35.00322"],["11032","名古屋南部","Nagoya-Nambu","","136.74703","35.00322"],["11037","三田","Sanda","","134.99703","34.83655"],["11038","広根","Hirone","","135.24703","34.83655"],["11039","京都西南部","Kyoto-Seinambu","","135.49703","34.83655"],["11042","亀山","Kameyama","","136.24703","34.83655"],["11043","四日市","Yokkaichi","","136.49703","34.83655"],["11044","半田","Handa","","136.74703","34.83655"],["11049","神戸","Kobe","","134.99703","34.66989"],["11050","大阪西北部　","Osaka-Seihokubu","","135.24703","34.66989"],["11051","大阪東北部","Osaka-Tohokubu","","135.49703","34.66989"],["11052","奈良","Nara","","135.74703","34.66989"],["11054","津西部","Tsu-Seibu","","136.24703","34.66989"],["11055","津東部","Tsu-Toubu","","136.49703","34.66989"],["11056","師崎","Morozaki","","136.74703","34.66989"],["11062","大阪西南部","Osaka-Seinambu","","135.24703","34.50322"],["11063","大阪東南部","Osaka-Tonambu","","135.49703","34.50322"],["11064","桜井","Sakurai","","135.74703","34.50322"]];

var sheet_arr = [
	{ "district": "東京 Tokyo",
	"sheet": [/*{"c_1":"08029","c_2":"鴻巣","c_3":"Konosu"},*/{"c_1":"08063","c_2":"東京西南部","c_3":"Tokyo-Seinambu"},{"c_1":"08074","c_2":"横浜","c_3":"Yokohama"},{"c_1":"08075","c_2":"木更津","c_3":"Kisarazu"},{"c_1":"08076","c_2":"姉崎","c_3":"Anesaki"},/*{"c_1":"08079","c_2":"南部","c_3":"Nanbu"},*/{"c_1":"08084","c_2":"横須賀","c_3":"Yokosuka"},{"c_1":"08085","c_2":"富津","c_3":"Futtsu"},/*{"c_1":"08092","c_2":"熱海","c_3":"Atami"},*/{"c_1":"08093","c_2":"三崎","c_3":"Misaki"},{"c_1":"08094","c_2":"那古","c_3":"Nako"},{"c_1":"08095","c_2":"鴨川","c_3":"Kamogawa"},{"c_1":"08100","c_2":"修善寺","c_3":"Shuzenji"},{"c_1":"08101","c_2":"伊東","c_3":"Ito"},{"c_1":"08102","c_2":"館山","c_3":"Tateyama"},{"c_1":"08105","c_2":"下田","c_3":"Shimoda"},{"c_1":"08106","c_2":"稲取","c_3":"Inatori"},{"c_1":"08107","c_2":"大島","c_3":"Oshima"},{"c_1":"08109","c_2":"神子元島","c_3":"Mikomotojima"},{"c_1":"08110","c_2":"利島","c_3":"Toshima"}]
	},
	{ "district": "八丈島　Hachijo Jima", 
	"sheet": [{"c_1":"09001","c_2":"新島","c_3":"Nii-Jima"},{"c_1":"09002","c_2":"神津島","c_3":"Kozu-Shima"},{"c_1":"09003","c_2":"三宅島","c_3":"Miyake-Jima"}]
	},
	{ "district": "京都 Kyoto", 
	"sheet": [/*{"c_1":"11004","c_2":"熊川","c_3":"Kumagawa"},{"c_1":"11005","c_2":"竹生島","c_3":"Chikubu shima"},{"c_1":"11006","c_2":"近江長浜","c_3":"Ominagahama"},{"c_1":"11007","c_2":"大垣","c_3":"Ogaki"},{"c_1":"11008","c_2":"岐阜","c_3":"Gifu"},*/{"c_1":"11018","c_2":"彦根東部","c_3":"Hikonetobu"},{"c_1":"11019","c_2":"津島","c_3":"Tsushima"},{"c_1":"11020","c_2":"名古屋北部","c_3":"Nagoya-Hokubu"},{"c_1":"11030","c_2":"御在所山","c_3":"Gozaisho Yama"},{"c_1":"11031","c_2":"桑名","c_3":"Kuwana"},{"c_1":"11032","c_2":"名古屋南部","c_3":"Nagoya-Nambu"},{"c_1":"11037","c_2":"三田","c_3":"Sanda"},{"c_1":"11038","c_2":"広根","c_3":"Hirone"},{"c_1":"11039","c_2":"京都西南部","c_3":"Kyoto-Seinambu"},{"c_1":"11042","c_2":"亀山","c_3":"Kameyama"},{"c_1":"11043","c_2":"四日市","c_3":"Yokkaichi"},{"c_1":"11044","c_2":"半田","c_3":"Handa"},{"c_1":"11049","c_2":"神戸","c_3":"Kobe"},{"c_1":"11050","c_2":"大阪西北部　","c_3":"Osaka-Seihokubu"},{"c_1":"11051","c_2":"大阪東北部","c_3":"Osaka-Tohokubu"},{"c_1":"11052","c_2":"奈良","c_3":"Nara"},{"c_1":"11054","c_2":"津西部","c_3":"Tsu-Seibu"},{"c_1":"11055","c_2":"津東部","c_3":"Tsu-Toubu"},{"c_1":"11056","c_2":"師崎","c_3":"Morozaki"},{"c_1":"11062","c_2":"大阪西南部","c_3":"Osaka-Seinambu"},{"c_1":"11063","c_2":"大阪東南部","c_3":"Osaka-Tonambu"},{"c_1":"11064","c_2":"桜井","c_3":"Sakurai"}]
	}];
	
var list_section = [];
list_section['08063'] = [["A-A\'-A\'\'", "GSJ_MAP_G050_08063_1984_S1.jpg", [118, 139.4988, 35.6699], [1744, 139.5194, 35.5776], [3040, 139.5275, 35.5033]], ["B-B\'", "GSJ_MAP_G050_08063_1984_S2.jpg", [71, 139.5896, 35.6699], [2447, 139.7193, 35.5833]], ["C-C\'", "GSJ_MAP_G050_08063_1984_S3.jpg", [122, 139.5362, 35.592], [1983, 139.658, 35.5537]]];
list_section['08074'] = [["A-B-C", "GSJ_MAP_G050_08074_1982_S1.jpg", [102, 139.5552, 35.5032], [815, 139.5939, 35.4437], [2100, 139.6007, 35.4065], [2694, 139.6214, 35.3678], [3228, 139.6318, 35.3366]], ["D-E", "GSJ_MAP_G050_08074_1982_S2.jpg", [112, 139.5559, 35.5032], [1628, 139.5454, 35.4169], [3043, 139.552, 35.3365]]];
list_section['08075'] = [["A-B-C-D", "GSJ_MAP_G050_08075_2004_S1.jpg", [79, 139.8661, 35.3372], [587, 139.8993, 35.3492], [1176, 139.9333, 35.3678], [1611, 139.9423, 35.391]], ["E-F-G-H", "GSJ_MAP_G050_08075_2004_S2.jpg", [82, 139.9553, 35.3366], [513, 139.976, 35.3543], [937, 139.965, 35.3765], [2298, 139.9967, 35.4502]]];
list_section['08076'] = [["A-B-C", "GSJ_MAP_G050_08076_1984_S1.jpg", [126, 140.0335, 35.4926], [1853, 140.0996, 35.4102], [4303, 140.2467, 35.3368]]];
list_section['08084'] = [["A-B", "GSJ_MAP_G050_08084_1998_S1.jpg", [159, 139.6032, 35.2182], [2230, 139.6157, 35.3368]], ["C-D", "GSJ_MAP_G050_08084_1998_S2.jpg", [419, 139.6355, 35.17], [2938, 139.6736, 35.3113]]];
list_section['08085'] = [["A-B-C", "GSJ_MAP_G050_08085_2005_S1.jpg", [122, 139.7957, 35.3137], [1207, 139.8675, 35.2916], [3396, 139.9045, 35.17]], ["D-E", "GSJ_MAP_G050_08085_2005_S2.jpg", [117, 139.8994, 35.3366], [3101, 139.9498, 35.17]], ["F-G", "GSJ_MAP_G050_08085_2005_S3.jpg", [119, 139.9446, 35.3367], [3106, 139.995, 35.1699]]];
list_section['08093'] = [["A-A'", "GSJ_MAP_G050_08093_1980_S1.jpg", [13, 139.6144, 35.125], [118, 139.6143, 35.1323], [655, 139.614, 35.1626], [878, 139.614, 35.17]], ["B-B'", "GSJ_MAP_G050_08093_1980_S2.jpg", [30, 139.6434, 35.1279], [127, 139.644, 35.1379], [673, 139.6463, 35.17]], ["C-C'", "GSJ_MAP_G050_08093_1980_S3.jpg", [36, 139.6709, 35.1322], [135, 139.6705, 35.1391], [465, 139.6696, 35.1579], [611, 139.6694, 35.1626]]];
list_section['08094'] = [["A-B", "GSJ_MAP_G050_08094_1990_S1.jpg", [134, 139.8623, 35.0033], [3053, 139.8396, 35.1699]], ["C-D", "GSJ_MAP_G050_08094_1990_S2.jpg", [112, 139.9451, 35.0033], [3041, 139.9162, 35.17]]]
list_section['08095'] = [["A-B", "GSJ_MAP_G050_08095_1981_S1.jpg", [13, 139.9998, 35.0256], [119, 140.0018, 35.0303], [466, 140.0092, 35.0487]], ["C-D", "GSJ_MAP_G050_08095_1981_S1.jpg", [467, 140.028, 35.0457], [512, 140.0286, 35.0471], [2766, 140.0785, 35.17]], ["E-F", "GSJ_MAP_G050_08095_1981_S2.jpg", [124, 140.1269, 35.17], [1834, 140.226, 35.1152], [1935, 140.2347, 35.1103]]];
list_section['08100'] = [["A-B", "GSJ_MAP_G050_08100_1956_S1.jpg", [106, 138.9034, 34.985], [1444, 138.9968, 34.9926]], ["C-D", "GSJ_MAP_G050_08100_1956_S2.jpg", [68, 138.7758, 34.9006], [102, 138.7815, 34.9017], [3261, 138.9966, 34.9424]], ["E-F-G-H", "GSJ_MAP_G050_08100_1956_S3.jpg", [115, 138.7941, 34.8367], [1212, 138.8689, 34.8461], [2189, 138.9107, 34.8908], [2675, 138.9396, 34.9057]]];
list_section['08101'] = [["A- - -B", "GSJ_MAP_G050_08101_1970_S1.jpg", [114, 138.9969, 34.9364], [838, 139.0477, 34.9456], [978, 139.0562, 34.9477], [1170, 139.0632, 34.9566], [1773, 139.1006, 34.9723], [2009, 139.1385, 34.9881]], ["C- - - -D", "GSJ_MAP_G050_08101_1970_S2.jpg", [121, 139.0173, 34.8367], [528, 139.0207, 34.8601], [893, 139.032, 34.8791], [1350, 139.0574, 34.895], [1921, 139.0949, 34.9048], [3000, 139.1539, 34.9424]]];
list_section['08102'] = [["A-B", "GSJ_MAP_G050_08102_2006_S1.jpg", [105, 139.7953, 34.9756], [532, 139.7947, 34.9505]], ["C-D", "GSJ_MAP_G050_08102_2006_S2.jpg", [110, 139.8577, 34.9334], [687, 139.8726, 34.9024]], ["E-F", "GSJ_MAP_G050_08102_2006_S3.jpg", [101, 139.8662, 34.9738], [1440, 139.8894, 34.8998]], ["G-H", "GSJ_MAP_G050_08102_2006_S4.jpg", [101, 139.8857, 34.9885], [1619, 139.9171, 34.9054]], ["I-J-K", "GSJ_MAP_G050_08102_2006_S5.jpg", [100, 139.9124, 34.9974], [944, 139.9283, 34.9511], [1660, 139.9297, 34.9102]], ["L-M-N", "GSJ_MAP_G050_08102_2006_S6.jpg", [95, 139.9461, 35.0025], [618, 139.9437, 34.9718], [1252, 139.9589, 34.9368], [1321, 139.9593, 34.9357]]];
list_section['08105'] = [["A-B", "GSJ_MAP_G050_08105_1970_S1.jpg", [16, 138.747, 34.7821], [137, 138.7618, 34.7866], [2692, 138.9275, 34.8367]], ["C-D", "GSJ_MAP_G050_08105_1970_S2.jpg", [24, 138.7602, 34.7678], [113, 138.7755, 34.7653], [3367, 138.9965, 34.7284], [3456, 138.9968, 34.7284]]];
list_section['08106'] = [["A-B-C-D", "GSJ_MAP_G050_08106_1959_S1.jpg", [105, 138.9969, 34.7256], [215, 138.998, 34.734], [501, 139, 34.7494], [1522, 139.0481, 34.7924], [2354, 139.0691, 34.8367]]];
list_section['08107'] = [["A-B", "GSJ_MAP_G050_08107_1984_S1.jpg", [119, 139.3524, 34.7441], [155, 139.3566, 34.7424], [1558, 139.445, 34.7065], [1647, 139.4494, 34.7047]]];
list_section['08109'] = [["A-B-C", "GSJ_MAP_G050_08109_1958_S1.jpg", [123, 138.7792, 34.67], [2242, 138.89, 34.5894], [3074, 138.9431, 34.5743], [3251, 138.9556, 34.5708]], ["D-E-F", "GSJ_MAP_G050_08109_1958_S2.jpg", [124, 138.8357, 34.6701], [880, 138.8694, 34.6373], [1813, 138.9236, 34.6075], [1931, 138.9303, 34.6037]]];
list_section['08110'] = [["A-B", "GSJ_MAP_G050_08110_1978_S1.jpg", [15, 139.273, 34.5078], [119, 139.2749, 34.5114], [507, 139.2852, 34.5321], [614, 139.2869, 34.5357]]];

list_section['09001'] = [["A- - -B", "GSJ_MAP_G050_09001_1987_S1.jpg", [110, 139.2606, 34.3277], [1276, 139.2656, 34.3939], [1589, 139.283, 34.4055], [2108, 139.2892, 34.4348]], ["C-D", "GSJ_MAP_G050_09001_1987_S2.jpg", [113, 139.2886, 34.4668], [357, 139.2979, 34.4778]]];
list_section['09002'] = [["A- -B", "GSJ_MAP_G050_09002_1982_S1.jpg", [35, 139.1386, 34.1832], [140, 139.1395, 34.1862], [469, 139.1446, 34.2048], [1064, 139.1687, 34.2328], [1167, 139.1732, 34.2379]]];
list_section['09003'] = [["A-B", "GSJ_MAP_G050_09003_1960_S1.jpg", [15, 139.5243, 34.1289], [116, 139.5243, 34.1247], [1439, 139.5243, 34.0487], [1541, 139.5243, 34.0385]]];
list_section['11018'] = [["A-B-C", "GSJ_MAP_G050_11018_1976_S1.jpg", [112, 136.2636, 35.2898], [3038, 136.4674, 35.3112], [3493, 136.4971, 35.3015]], ["D-E", "GSJ_MAP_G050_11018_1976_S2.jpg", [111, 136.3069, 35.1699], [1807, 136.3781, 35.2477]], ["F-G", "GSJ_MAP_G050_11018_1976_S3.jpg", [108, 136.358, 35.1948], [1708, 136.453, 35.2419]], ["H-I", "GSJ_MAP_G050_11018_1976_S4.jpg", [73, 136.4393, 35.2185], [979, 136.4971, 35.2413]]];
list_section['11019'] = [["A-B", "GSJ_MAP_G050_11019_1979_S1.jpg", [119, 136.524891, 35.336494], [1469, 136.497109, 35.263412]], ["C-D", "GSJ_MAP_G050_11019_1979_S2.jpg", [111, 136.49711, 35.306088], [1127, 136.564643, 35.283223]], ["E-F-G", "GSJ_MAP_G050_11019_1979_S3.jpg", [106, 136.532938, 35.319051], [1759, 136.53085, 35.224153], [2577, 136.58796, 35.238121]], ["H-I", "GSJ_MAP_G050_11019_1979_S4.jpg", [111, 136.497103, 35.203888], [705, 136.533596, 35.212265]], ["J-K", "GSJ_MAP_G050_11019_1979_S5.jpg", [103, 136.497114, 35.18026], [761, 136.542761, 35.18477]], ["L-M", "GSJ_MAP_G050_11019_1979_S6.jpg", [68, 136.62542, 35.186934], [1822, 136.747019, 35.18661]]];
list_section['11020'] = [["C-B-A", "GSJ_MAP_G050_11020_1984_S1.jpg", [104, 136.9808, 35.1699], [1795, 136.9547, 35.2653], [3090, 136.9809, 35.3365]], ["D-E", "GSJ_MAP_G050_11020_1984_S2.jpg", [106, 136.7471, 35.1779], [2118, 136.8896, 35.178]]];
list_section['11030'] = [["A-B", "GSJ_MAP_G050_11030_1989_S1.jpg", [104, 136.3221, 35.1699], [3093, 136.3721, 35.0032]], ["C-D-E-F", "GSJ_MAP_G050_11030_1989_S2.jpg", [122, 136.4972, 35.1697], [804, 136.4557, 35.1503], [2296, 136.4417, 35.0658], [3421, 136.462, 35.0032]], ["G-H-I", "GSJ_MAP_G050_11030_1989_S3.jpg", [129, 136.3214, 35.0345], [1067, 136.3845, 35.0211], [2671, 136.4971, 35.019]], ["J-K-L", "GSJ_MAP_G050_11030_1989_S4.jpg", [59, 136.2471, 35.0681], [1074, 136.2989, 35.0285], [1299, 136.3148, 35.0252]], ["M-N", "GSJ_MAP_G050_11030_1989_S5.jpg", [118, 136.4824, 35.1361], [354, 136.4971, 35.1419]], ["O-P-Q", "GSJ_MAP_G050_11030_1989_S6.jpg", [119, 136.4667, 35.059], [389, 136.4858, 35.0604], [593, 136.4971, 35.0534]]];
list_section['11031'] = [["A-B-C", "GSJ_MAP_G050_11031_1991_S1.jpg", [110, 136.497, 35.14], [354, 136.5142, 35.1407], [1117, 136.5574, 35.1661]], ["D-E-F", "GSJ_MAP_G050_11031_1991_S2.jpg", [99, 136.5382, 35.0906], [761, 136.5797, 35.1066], [1947, 136.661, 35.0924]], ["G-H-I-J-K", "GSJ_MAP_G050_11031_1991_S3.jpg", [105, 136.4969, 35.0762], [1290, 136.5755, 35.0543], [1998, 136.6231, 35.0437], [2273, 136.6418, 35.0426], [2525, 136.6486, 35.0289]], ["L-M", "GSJ_MAP_G050_11031_1991_S4.jpg", [96, 136.5975, 35.1699], [1024, 136.6146, 35.1182]]];
list_section['11032'] = [["A-B", "GSJ_MAP_G050_11032_1986_S1.jpg", [113, 136.8848, 35.1697], [1835, 136.9969, 35.1356]], ["C-D", "GSJ_MAP_G050_11032_1986_S2.jpg", [120, 136.861, 35.0425], [2083, 136.9971, 35.0275]]];
list_section['11037'] = [["A-B-C-D", "GSJ_MAP_G050_11037_1988_S1.jpg", [134, 134.9972, 34.9709], [1458, 135.0886, 34.9608], [2300, 135.1389, 34.9863], [3871, 135.2472, 35.0004]], ["E-F-G-H-I", "GSJ_MAP_G050_11037_1988_S2.jpg", [127, 134.9972, 34.8649], [1176, 135.0666, 34.845], [2768, 135.177, 34.8557], [3610, 135.2163, 34.892], [4121, 135.2472, 34.9064]]];
list_section['11038'] = [["A-B", "GSJ_MAP_G050_11038_1995_S1.jpg", [155, 135.4516, 35.0032], [3059, 135.4637, 34.8366]], ["C-D-E-F-G", "GSJ_MAP_G050_11038_1995_S2.jpg", [167, 135.3039, 35.0032], [2240, 135.2803, 34.8858], [2689, 135.3011, 34.8664], [3228, 135.3288, 34.8456], [3754, 135.3643, 34.8366]]];
list_section['11039'] = [["A-B", "GSJ_MAP_G050_11039_2005_S1.jpg", [119, 135.6504, 34.9661], [1560, 135.7471, 34.9646]], ["D-C", "GSJ_MAP_G050_11039_2005_S2.jpg", [120, 135.6944, 34.8365], [1436, 135.7472, 34.8986]], ["H-G-F-E", "GSJ_MAP_G050_11039_2005_S3.jpg", [125, 135.6512, 34.8366], [1337, 135.6223, 34.9005], [2910, 135.627, 34.9915], [3187, 135.6391, 35.0032]], ["K-J-I", "GSJ_MAP_G050_11039_2005_S4.jpg", [116, 135.5043, 34.8365], [2279, 135.5354, 34.9582], [3324, 135.5802, 35.0032]]];
list_section['11042'] = [["A-B-C", "GSJ_MAP_G050_11042_1981_S1.jpg", [114, 136.3369, 35.0032], [2274, 136.3887, 34.8871], [3169, 136.38, 34.8366]], ["D-E-F-G", "GSJ_MAP_G050_11042_1981_S2.jpg", [117, 136.2471, 34.927], [572, 136.2728, 34.9111], [1435, 136.3324, 34.9165], [3305, 136.4521, 34.9584]], ["H-I-J", "GSJ_MAP_G050_11042_1981_S3.jpg", [114, 136.3914, 34.8768], [946, 136.4472, 34.8811], [2121, 136.4658, 34.9472]]];
list_section['11043'] = [["A-B-C", "GSJ_MAP_G050_11043_1984_S1.jpg", [110, 136.5009, 35.0032], [1363, 136.5532, 34.9475], [2020, 136.5968, 34.9361]], ["D-E", "GSJ_MAP_G050_11043_1984_S2.jpg", [122, 136.497, 34.8813], [1641, 136.5932, 34.919]], ["F-G-H", "GSJ_MAP_G050_11043_1984_S3.jpg", [109, 136.5584, 34.919], [971, 136.5804, 34.9652], [1645, 136.5858, 35.0032]]];
list_section['11044'] = [["A-B", "GSJ_MAP_G050_11044_1986_S1.jpg", [133, 136.8456, 34.9982], [1550, 136.9192, 34.9449]], ["C-D-E", "GSJ_MAP_G050_11044_1986_S2.jpg", [132, 136.8636, 34.846], [326, 136.877, 34.8458], [2114, 136.997, 34.8731]], ["F-G-H-I", "GSJ_MAP_G050_11044_1986_S3.jpg", [126, 136.8347, 34.8831], [1038, 136.8804, 34.9176], [1700, 136.9173, 34.9405], [3193, 136.997, 34.9965]]];
list_section['11049'] = [["A-B-C", "GSJ_MAP_G050_11049_1983_S1.jpg", [100, 135.2026, 34.8365], [1505, 135.2024, 34.7559], [2504, 135.2472, 34.7112]], ["D-E-F-G", "GSJ_MAP_G050_11049_1983_S2.jpg", [93, 134.9972, 34.762], [1406, 135.0768, 34.7251], [2834, 135.1769, 34.7255], [4053, 135.2472, 34.765]]];
list_section['11050'] = [["A-B-C", "GSJ_MAP_G050_11050_1982_S1.jpg", [97, 135.2472, 34.7767], [2064, 135.3852, 34.7849], [3742, 135.4971, 34.8117]], ["D-E-F", "GSJ_MAP_G050_11050_1982_S2.jpg", [125, 135.2472, 34.7757], [1618, 135.3489, 34.7503], [4110, 135.4935, 34.6719]]];
list_section['11051'] = [["A-B", "GSJ_MAP_G050_11051_2001_S1.jpg", [117, 135.4972, 34.8117], [1667, 135.6006, 34.8365]], ["C-D", "GSJ_MAP_G050_11051_2001_S2.jpg", [105, 135.6239, 34.8102], [1301, 135.6701, 34.7534]], ["E-F", "GSJ_MAP_G050_11051_2001_S3.jpg", [113, 135.6193, 34.7316], [1972, 135.7471, 34.7328]], ["G-H-I", "GSJ_MAP_G050_11051_2001_S4.jpg", [105, 135.6754, 34.6699], [896, 135.6655, 34.7147], [3266, 135.7402, 34.8365]]];
list_section['11052'] = [["A-B", "GSJ_MAP_G050_11052_2000_S1.jpg", [120, 135.8952, 34.7622], [1434, 135.9097, 34.8365]], ["C-D-E-F", "GSJ_MAP_G050_11052_2000_S2.jpg", [101, 135.8949, 34.6699], [792, 135.8964, 34.7096], [1228, 135.9156, 34.7286], [1834, 135.9286, 34.7616]], ["G-H-I-J", "GSJ_MAP_G050_11052_2000_S3.jpg", [100, 135.7472, 34.7388], [1445, 135.8292, 34.7017], [1959, 135.864, 34.7077], [2309, 135.8808, 34.6931]]];
list_section['11054'] = [["A-B", "GSJ_MAP_G050_11054_1995_S1.jpg", [102, 136.2493, 34.6699], [3506, 136.3723, 34.8366]], ["C-D-E", "GSJ_MAP_G050_11054_1995_S2.jpg", [110, 136.3249, 34.6979], [896, 136.3722, 34.6752], [2469, 136.4701, 34.7159]], ["F-G", "GSJ_MAP_G050_11054_1995_S3.jpg", [98, 136.4154, 34.7721], [1669, 136.49, 34.8365]]];
list_section['11055'] = [["C-B-A", "GSJ_MAP_G050_11055_1987_S1.jpg", [137, 136.4973, 34.6699], [2010, 136.5031, 34.7773], [3149, 136.5352, 34.8366]]];
list_section['11056'] = [["A-B", "GSJ_MAP_G050_11056_1987_S1.jpg", [167, 136.8565, 34.8042], [1214, 136.9287, 34.8248]], ["C-D", "GSJ_MAP_G050_11056_1987_S2.jpg", [147, 136.8452, 34.775], [1271, 136.9226, 34.8009]], ["E-F", "GSJ_MAP_G050_11056_1987_S3.jpg", [105, 136.9125, 34.7091], [940, 136.9399, 34.7519]], ["G-H-I", "GSJ_MAP_G050_11056_1987_S4.jpg", [56, 136.8469, 34.7823], [2313, 136.9676, 34.7002], [2456, 136.9754, 34.6919]]];
list_section['11062'] = [["A-B", "GSJ_MAP_G050_11062_1985_S1.jpg", [129, 135.4082, 34.5662], [1511, 135.4671, 34.5034]]];
list_section['11063'] = [["A-B", "GSJ_MAP_G050_11063_1998_S1.jpg", [189, 135.6711, 34.5685], [1978, 135.6715, 34.6699]], ["C-D", "GSJ_MAP_G050_11063_1998_S2.jpg", [143, 135.6664, 34.5032], [2064, 135.7162, 34.6041], [3258, 135.7376, 34.6699]], ["E-F", "GSJ_MAP_G050_11063_1998_S3.jpg", [134, 135.4972, 34.52], [3739, 135.7472, 34.5199]]];
list_section['11064'] = [["A-B-C", "GSJ_MAP_G050_11064_2001_S1.jpg", [124, 135.8159, 34.655], [1500, 135.9114, 34.6547], [2761, 135.9971, 34.668]], ["D-E-F-G-H-I", "GSJ_MAP_G050_11064_2001_S2.jpg", [129, 135.8197, 34.6353], [645, 135.8544, 34.6352], [1295, 135.8941, 34.6148], [2376, 135.9592, 34.5849], [2848, 135.9689, 34.5588], [3584, 135.9971, 34.5235]], ["J-K-L-M-N", "GSJ_MAP_G050_11064_2001_S3.jpg", [127, 135.8616, 34.5033], [681, 135.8669, 34.5351], [1933, 135.9335, 34.5816], [2484, 135.9595, 34.6039], [3754, 135.9971, 34.67]]];