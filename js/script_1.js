//---------- ОГРАНИЗАЦИЯ ПОИСКА ПО СТРАНИЦЕ
//-----  СОЧЕТАНИЕ КЛАВИШ ДЛЯ ПОИСКОВОГО ПОЛЯ
//---------- ОГРАНИЗАЦИЯ ГЛОБАЛЬНОГО ПОИСКА

$(document).ready(function(){

	
//------  ВЫВОД ДИНАМИЧЕСКОГО СПИСКА ВАРИАНТОВ В ПОИСКОВОМ ОКНЕ
	$("#search").keyup(function(w){
		var znSrch = $(this).val();

		if(znSrch != ""){


			$(this).addClass('css_zn');


			if( !!$(".glob_search").attr("checked") ) {

				//var znSrch_1 = new RegExp(znSrch,'i');

				//---- ВЫВОД ВСЕХ ВОЗМОЖНЫХ СОВПАДЕНИЙ
				if( w.which == 13 ){

					$.ajax({

							url: "ajax/gl_search.php",
							type: 'post',
							dataType: 'json',
							data: { QUERY_ENTER: znSrch },
							success: function(data) {
									

									$("#wrapper ul.bom").empty();  //-- очистка списка								
									
								
									for(var i = 0; i < data.length; i++) {
									
									if(data[i]['choise'] == 1) {data[i]['icon'] = data[i]['screen'];}
									
									$("#wrapper ul.bom").append(
										"<li id_number = '" + data[i]['id'] + "' title = '" + data[i]['data'] + "' data-sec = '" + data[i]['timeCreat'] + "' >\
											<div class='item' title='" + data[i]['title'] + "' style ='background: " + data[i]['background'] + "' ><a href='" + data[i]['links'] + "' rel='" + data[i]['group'] + "' target='_blank' style ='background: url(" + data[i]['icon'] + ") no-repeat center/87% 82%;' ></a> <input type='checkbox' class='delMany'  title='Позваляет отметить ссылки для удаления' />\
											\
												<div class='view_link' title='' style ='background: url(" + data[i]['screen'] + ") no-repeat center/100% 100%;' ></div> \
												\
												<div class='screen' title='Показывает полный скриншот страницы'><a href='" + data[i]['full_screen'] + "' target='_blank'></a></div> \
												\
												<div class='apdate'  title='Позваляет изменить параметры ссылки'></div>\
												\
												<div class='del'  title='Удаляет данную ссылку'></div>\
												\
												<div class='number'>" + data[i]['number'] + "</div> \
											\
											</div>\
											\
											<h3>\
												<a href='" + data[i]['links'] + "' title='" + data[i]['name'] + "' target='_blank'>" + data[i]['name'] + "</a>\
											</h3>\
										</li>");
									}
									
								$('#all_group').slideUp(100);
								$('#modal_wind').slideUp(100);
								$('#wrap_form').slideUp(100);
								$("#all_group ul").empty();

								$("#sel_ch").slideUp("fast");  //--- скрытие списка вариантов поиска

							}	
						});  //---- КОНЕЦ АЯКС ЗАПРОСА

				} else {



				 // отправка данных
				 $.ajax({
					url: "ajax/gl_search.php",
					type: 'post',
					dataType: 'json',
					data: { QUERY: znSrch },
					success: function(data) {
						
						// alert(data);
						// console.log(data);
						$("#sel_ch").slideDown("slow");

						$("#sel_ch").html("");

						
						for(var ii = 0; ii < data['id'].length; ii++){
							$("#sel_ch").append("<li data-sp_id='"+data["id"][ii]+"' ><a href='"+data["links"][ii]+"'  target='blank' title='"+data["group"][ii]+"'>"+data["name"][ii]+"</a></li>");
						}

					}
				});  //-- конец аякса


			}		

			} else {

				var znSrch_1 = new RegExp(znSrch,'i');

				$("#wrapper ul li h3 a").each(function(){
					var znLin = $(this).html();
					if( !znSrch_1.test(znLin) ) { $(this).closest("li").hide(500); } else { $(this).closest("li").show(500); }
				});

			}


		} else {
			$(this).removeClass('css_zn');
			$("#wrapper ul li").show(500);
		}
	});

//------ КОНЕЦ -- ВЫВОД ДИНАМИЧЕСКОГО СПИСКА ВАРИАНТОВ В ПОИСКОВОМ ОКНЕ



//----------------------

$("#link_add").draggable();

//----------------------




//-----  СОЧЕТАНИЕ КЛАВИШ ДЛЯ ПОИСКОВОГО ПОЛЯ
var flag_push = false;

$(document).keyup(function(e){ 	if(e.which == 17) { flag_push = false; } } ).keyup(function (e) {

	if(e.which == 17 ) flag_push = true;
	if(e.which == 91 && flag_push == true ) {
	
		$("#search").select();
	}
});

//-------------------------------------------





//------------  КОНЕЦ КОДА----------
});




//-------- отключение hover при прокрутки страницы
var body = document.body,
    timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }
  
  timer = setTimeout(function(){
    body.classList.remove('disable-hover')
  },500);
}, false);
