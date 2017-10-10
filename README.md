# Geologic-Section-View-on-Openlayers4
*概要*  
地質断面図と地質平面図の対比を容易にする、5万分の1地質図幅閲覧のためのJavascriptソースコードの例

　産総研知的財産管理番号：H29PRO-2125

断面図は地質構造の理解に非常に有用です。しかし、印刷された図幅では断面図の横軸方向は、平面図上の断面線の方向と一致するとは限らず、また、両図面は紙面内で離れていることもありますので、対比には手間がかかります。

本ビューアーは、断面図上の位置に対応する平面図上の位置に印を表示するとともに、平面図を回転させて、両図面の対比を容易にします。基本版と応用版の2種類があります。なお、本ビューアーにはメタ情報や凡例の表示など、公開中の他のビューアーの機能を組み入れております。

基本版に関するもの  
　ol4_50k_section.html  
　lib/ol4_50k_section.js  
　css/ol4_50k_section.css  
　images_section/GSJ_MAP_G050_11030_1989_S1.jpg  
　images_section/GSJ_MAP_G050_11030_1989_S2.jpg  
　images_section/GSJ_MAP_G050_11030_1989_S3.jpg  
　images_section/GSJ_MAP_G050_11030_1989_S4.jpg  
　images_section/GSJ_MAP_G050_11030_1989_S5.jpg  
　images_section/GSJ_MAP_G050_11030_1989_S6.jpg

応用版に関するもの  
　ol4_50k_sec.html  
　lib/ol4_50k_sec.js  
　lib/ol4_50k_sec_d.js  
　css/ol4_50k_sec.css  
　images_section/download_ref.jpg  
　images_section/marker-red.png  
　images_section/marker-blue.png  
　images_section/ 以下のjpgファイル

本ソースコードの実行には、以下のオープンソースライブラリを必要とします。

・OpenLayers (BSD License)  
・jQuery (MIT License)  
・xmlToJson (MIT License、ol4_50k_sec.js内)

利用に際しては、各ライブラリのライセンスに従ってください。

本ソースコードのライセンスについては、「GitHubアカウント「gsc-gsj-aist」について」をご確認ください。  
https://github.com/gsc-gsj-aist/About-this-account
