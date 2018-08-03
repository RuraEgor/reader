$(document).ready(function(){

//-- Работа с увеличением текста в текстовом окне
$(".js_font_lit").click(function(){
	$("#wr_form").removeClass("font_14");
	$("#wr_form").removeClass("font_20");
	
	$("#wr_form").addClass("font_14");
	$(".txArSz").removeClass("active");
	$(this).addClass("active");
});

$(".js_font_mid").click(function(){
	$("#wr_form").removeClass("font_14");
	$("#wr_form").removeClass("font_20");
	
	$(".txArSz").removeClass("active");
	$(this).addClass("active");
});

$(".js_font_big").click(function(){
	$("#wr_form").removeClass("font_14");
	$("#wr_form").removeClass("font_20");
	
	$("#wr_form").addClass("font_20");
	$(".txArSz").removeClass("active");
	$(this).addClass("active");
});


 //-----------  ПРОСТАВЛЕНИЕ НОМЕРОВ И ИЗМЕНЕНИЕ ПОЗИЦИЙ ЭЛЕМЕНТОВ В КАТЕГОРИЯХ
 
 
	$('#but_form').click(function(){
		$('#wrap_form input, #wrap_form textarea').val('');
		$('#wrap_form input').removeAttr("checked");
		$('#link_add').slideToggle(300);
		$('#modal_wind').slideToggle(100);
		$('#wrap_form').slideToggle(100);
	});

	$("#header .addGroup").attr("checked",'');  //--  ОТМЕНА ВЫВОДА СОВМЕСТН. КАТЕГОРИЙ ССЫЛОК	
	
//-----  ВЫВОД КАТЕГОРИЙ В МОДАЛЬНОМ ОКНЕ ----
	$('#all_categories').click(function(){
		$('#modal_wind').slideToggle(100);
		$('#wrap_form').slideToggle(100);		
		$('#all_group').slideToggle(100);

		$('html,body').animate({scrollTop:0}, 'fast');	
		
		//-- ОПРЕДЕЛЯЕМ ВЫСОТУ ОТСТУПА ОКНА СОДЕРЖ. КАТЕГОРИИ ССЫЛОК
		var heigFrPa = $("#header").offset();
		$('#all_group').css({'top': heigFrPa.top });

		
		$.ajax({

			url: "ajax/categ.php",
			type: 'post',
			dataType: 'json',
			data: { list: "list" },
			success: function(data) {
				/*
				for(var i = 0; i < data.length; i++) {
					
					$("#all_group ul.list").append(
					
					"<li id_number = '" + data[i]['id'] + "'>\
					<div class = 'item' style = 'background: " + data[i]['background'] + "'></div\
					><h3>" + data[i]['name'] + "</h3></li>")
					
				}*/
			$("#all_group ul").empty();  //-- очистка списка
			
			for(var i = 0; i < data.length; i++) {
				
				if(data[i]['choise'] == 1) {data[i]['icon'] = data[i]['screen'];}
				
				$("#all_group ul").append(
				"<li id_number = '" + data[i]['id'] + "' >\
					<div class='item' title='" + data[i]['context'] + "' style ='background: " + data[i]['background'] + "' > <input type='checkbox' class='delMany'  title='Позваляет отметить ссылки для удаления' />\
					\
						<div class='col jscol'  title='Количество ссылок в категории'>" + data[i]['kol'] + "</div>\
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
				}
		//	}	
				

	//	}

		});  //--  КОНЕЦ АЯКС ЗАПРОСА
	});

	//--
	
	//$(".categ").sortable({ revert:true, distance:20,  stop: function(event, ui)  });
	
//--------

	// $('#sizeElem').hover(
	// 	function(){ $(this).animate({right: '-40px'},400);},
	// 	function(){ $(this).animate({right: '-70px'},400);}
	// );


	$('#sizeElem').click(function(){

/*	
		$.ajax({

			url: "ajax/ajax.php",
			type: 'post',
			dataType: 'json',
			data: { vodca: 777 },
			success: function(data) {
			
				// for(var i = 0; i < data.length; i++) {
				
				//   $(".bom.sortable li:eq(" + i + ") .item > a").attr("style","background: url(" + data[i]['screen'] + ") no-repeat center/7% 2%;");
				// }
			}
		});	
	
		$(".bom.sortable li ").animate({width: '290px', height: '340px', margin: '35px 30px'},1500);
		*/
		if( $(this).hasClass("show-elem") ){
			$("li.no-vis").hide(500, function(){ heightZn(); } );
			$(this).removeClass("show-elem");
		} else {
			$("li.no-vis").show(500,  function(){ heightZn(); });
			$(this).addClass("show-elem");
		}

	});

	//----  HIDE/OPEN ALL CATEGORIES IN MENU
	$('#hideAllCat').click(function(){
		if( $(this).hasClass("show-elem") ){
			$(".menuCat li").show(500, function(){ heightZn(); } );
			$(this).removeClass("show-elem");
		} else {
			$(".menuCat li").hide(500,  function(){ heightZn(); });
			$(this).addClass("show-elem");
		}
	});	
	
//--------

	$('#but_group_form').click(function(){
		$('#wrap_form input, #wrap_form textarea').val('');
		$('#group_add').slideToggle(300);
		$('#modal_wind').slideToggle(100);
		$('#wrap_form').slideToggle(100);
	});

//--------

	$('#wrap_form .close, #all_group .close').click(function(){
		$('#wrap_form input').removeAttr("checked");
		$('#wrap_form input, #wrap_form textarea').val('');
		$('#link_add, #group_add, #apdate_form, #all_group, #group_apdate').slideUp(300);
		$("#all_group ul.list").text('');
		$('#modal_wind').slideUp(100);
		$('#wrap_form, #wr_form').slideUp(100);
		//$('#wrap_form')[0].trigger('reset');
	});

//------- 	СКРОЛИНГ   -----
	$('#up').click(function(){
		$('html,body').animate({scrollTop:0}, 'slow');
	});

	$('#down').click(function(){
		$('html,body').animate({scrollTop:$(document).height()}, 'slow');		
	});



//-----  Работа с поисковым полем ----
$("#search").focus(function(){
	$(this).animate({width: "300px"},700);
});


$("#search").blur(function(){
	if( !$(this).val() ) {
		$(this).animate({width: "100px"},700);
		$("#sel_ch").slideUp("fast");
	}
});



	
//-------  	ДОБАВЛЕНИЕ КАТЕГОРИИ ---------
$("#but_send_group").click(function(){
	
	var radio = $('input[name = group_backg]:checked').val();
	var name = $('#name_group').val();
	var background = $('#backg_group_color').val();
	var context = $('#title_group').val();
	
	if(name == "" || name ==" "){ alert("Название категории не задано!");} else {

		$.ajax({

			url: "ajax/add_del_group.php",
			type: 'post',
			dataType: 'json',
			data: { vodca: radio, name: name, background: background, context: context },
			success: function(data) {
				
				if(data == 1) {
					$('#link_add, #group_add, #apdate_form').slideUp(300);
					$('#modal_wind').slideUp(100);
					$('#wrap_form').slideUp(100);
					
					$('#wrap_form').trigger( 'reset' );
					
					$(".alert_mess").text('Новая категория добавленна').fadeIn(500).delay(1500).fadeOut(500);
					
				} else {
					alert("Такая категория уже существует!");
				}
			}

		});
	}  //	-- конец IF
});


	
//-------  	ВЫВОД КАТЕГОРИИ ИЗ СПИСКА В ЗАГОЛОВКЕ -------
$("#header > select").change(function(){
	
	var select = $(this).val();  //-- выбранная из списка категория
	
	
	$.ajax({

		url: "ajax/categ.php",
		type: 'post',
		dataType: 'json',
		data: { choice: select },
		success: function(data) {
			
			
			//-- Флажок позвол. добовлять к вывед. ссылкам новую группу
			if(!$('#header .addGroup:checkbox').attr("checked")){
				$("#wrapper ul.bom").empty();  //-- очистка списка
				$(".nameGroup").html('<span>' + select + '</span>');  //--  ВЫВОД ИМЕНИ ГРУППЫ В ЗАГОЛОВКЕ
				var color = '';
			} else {

				var rCol = Math.floor(Math.random() * 256);
				var gCol = Math.floor(Math.random() * 256);
				var bCol = Math.floor(Math.random() * 256);
				
				var color = "background: rgba("+ rCol +","+ gCol +","+ bCol +",0.4)";
				
				$(".nameGroup").append(" | <span style='"+ color +"'>" + select + "</span>");
			}
			
				for(var i = 0; i < data.length; i++) {
				
				if(data[i]['choise'] == 1) {data[i]['icon'] = data[i]['screen'];}
				
				$("#wrapper ul.bom").append(
					"<li id_number = '" + data[i]['id'] + "' style='"+ color +"'>\
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

			//-- Флажок позвол. добовлять к вывед. ссылкам новую группу
			if($('#header .addGroup:checkbox').attr("checked")) {
				
				$("#wrapper .number").each(function(indx, element){
					$(element).text(indx + 1);	  
				});	
			}			

		}
	});

});


//------ ВЫВОДИТ ССЫЛКИ ПРИ ПЕРВОНАЧАЛЬНОЙ ЗАГРУЗКЕ СТРАНИЦЫ  -----		
	$.ajax({

		url: "ajax/ajax.php",
		type: 'post',
		dataType: 'json',
		data: { mainLinks: 777 },
		success: function(data) {

			dat(data);		
		}
	});

	
//------------  СОЗДАНИЕ НОВОЙ ССЫЛКИ  ------------------------
$('#link_add #but_send').click(function(){
	
	var name = $('#name').val();
	var group = $('#link_add option:selected').text();
	var links = $('#links').val();
	var choise = $('#choise_back').attr("checked");
	choise? choise = 1 : choise = 0 ;
	var background = $('#background').val();
	
	var title = $('#title').val();
	
	if(name == "" || links ==""){ alert("Не все требуемые поля заполнены!");} else {

		$.ajax({
			url: 'ajax/creatLink.php',
			type: 'post',
			dataType: 'json',
			data: { name: name, group: group, links: links, background: background, title: title, choise: choise },
			success: function(data) {
			
			if ( data == 1 ) { alert("Ссылка с таким именем и дирректорией уже существует!"); } else {
			
				$(".alert_mess").text('Новая Ссылка \"'+ name +'\" добавлена!').fadeIn(500).delay(1500).fadeOut(500);
				
				//------------------------------------------------------
				$.ajax({
				url: 'ajax/screenIcon.php',
				type: 'post',
				dataType: 'json',
				data: { idLin: data[1], linLin: data[2] },
				success: function(dataPar) {			
							
					}

				});  //--  КОНЕЦ АЯКС ЗАПРОСА
					

				//-----  ВЫВОД ССЫЛКИ НЕПОСРЕДСВТЕННО НА ЭКРАНЕ
				$.ajax({
				url: 'ajax/ajax.php',
				type: 'post',
				dataType: 'json',
				data: { printLstLink: 45 },
				success: function(lstCrLink) {			
							
				if( data[0]['group'] == $(".nameGroup span").text() ){
				
					if(lstCrLink[0]['choise'] == 1) {lstCrLink[0]['icon'] = lstCrLink[0]['screen'];}
					
					$("#wrapper ul.bom").append(
					"<li id_number = '" + lstCrLink[0]['id'] + "' title = '" + data[0]['data'] + "' data-sec = '" + data[0]['timeCreat'] + "'>\
						<div class='item' title='" + lstCrLink[0]['title'] + "' style ='background: " + lstCrLink[0]['background'] + "' ><a href='" + lstCrLink[0]['links'] + "' rel='" + data[0]['group'] + "' target='_blank' style ='background: url(" + lstCrLink[0]['icon'] + ") no-repeat center/87% 82%;' ></a> <input type='checkbox' class='delMany'  title='Позваляет отметить ссылки для удаления' />\
						\
							<div class='view_link' title='' style ='background: url(" + lstCrLink[0]['screen'] + ") no-repeat center/100% 100%;' ></div> \
							\
							<div class='screen' title='Показывает полный скриншот страницы'><a href='" + lstCrLink[0]['full_screen'] + "' target='_blank'></a></div> \
							\
							<div class='apdate'  title='Позваляет изменить параметры ссылки'></div>\
							\
							<div class='del'  title='Удаляет данную ссылку'></div>\
							\
							<div class='number'>" + lstCrLink[0]['number'] + "</div> \
						\
						</div>\
						\
						<h3>\
							<a href='" + lstCrLink[0]['links'] + "' title='" + data[0]['name'] + "' target='_blank'>" + lstCrLink[0]['name'] + "</a>\
						</h3>\
					</li>");

				}
				
				}
				});  //--  КОНЕЦ ВНУТРЕННЕГО АЯКС ЗАПРОСА	

				} //-- КОНЕЦ ПРОВЕРКИ НА ОДИНАКОВОСТЬ ССЫЛКИ			
			}

		});  //--  КОНЕЦ АЯКС ЗАПРОСА
	} //-- конец IF
});
//----------------------------------  КОНЕЦ СОЗДАНИЯ ССЫЛКИ  --------------


//------------  УДАЛЕНИЕ ССЫЛКИ  --------------
$('#wrapper .del, #lastTventy .del').live('click', function(){
/*
	var nom = $(this).closest('li').attr('id_number');
	var elemNom = $(this).closest('li').index();
	var elemNomName = $(this).closest('li').find('h3').text();
*/
	var nom = $(this).closest('li').attr('id_number');
	var elemNomName = $(this).closest('li').find('h3').text();

	
	if(confirm("Вы действительно хотите удалить ссылку \"" + elemNomName + "\" ?")) {
		
		$.ajax({

			url: 'ajax/del.php',
			type: 'post',
			dataType: 'json',
			data: { name: nom },
			success: function(data) {
				
				//--  ВНЕШНЕЕ УДАЛЕНИЕ ЭЛЕМЕНТА ИЗ СИСТЕМЫ
				$("ul.bom li").each(function(){
					if( $(this).attr('id_number') == nom ) {$(this).remove();}
				});
				
				//--  НУМЕРОВАНИЕ ЭЛЕМЕНТОВ
				$("#wrapper .number").each(function(indx, element){
				  $(element).text(indx + 1);	  
				});				
				
				//--  ВЫВОД ВСПЛЫВАЮЩЕГО ОКНА
				$(".alert_mess").text('Ссылка \"'+ elemNomName +'\" удалена!').fadeIn(500).delay(1500).fadeOut(500);	
			}
		});
	}
	
});


//------------  УДАЛЕНИЕ НЕСКОЛЬКИХ ССЫЛОК  --------------
$('#delMnLks').click(function(){
	
	var nameLinks = new Array();
	
	$(".item input:checked").each(function(indx, element){
		nameLinks[nameLinks.length] = $(element).closest('li').attr('id_number');
	});
	
	if (nameLinks.length !== 0) {
		
		if(confirm("Вы действительно хотите безвозратно удалить отмеченные ссылки?")) {
	
			$.ajax({

				url: 'ajax/delMany.php',
				type: 'post',
				dataType: 'json',
				data: { nameLinks: nameLinks },
				success: function(data) {
				
				//$(".item input:checked").closest('li').remove();
				for(var i = 0; i < nameLinks.length; i++){
					$("#wrapper ul.bom li, #lastTventy ul.bom li").each(function(){
						if( $(this).attr('id_number') == nameLinks[i] ) {$(this).remove();}
					});
				}
				
					$(".alert_mess").text('Ссылки были удалены удалены!').fadeIn(500).delay(1500).fadeOut(500);
					
					$("#delMnLks").fadeOut(500);
					$('#cancelDelMnLks').fadeOut(500);
				}
			});
		}
	
	} else { alert("Выброных ссылок для удаления нет!"); }

});


//-- ВЫДЕЛЕНИЕ ВСЕХ ТРЕБУЕМЫХ ССЫЛОК ДЛЯ УДАЛЕНИЯ
$('.delMany').live('change',function(){

	if($(".delMany").is(':checked')) {
		$('#delMnLks').fadeIn(1000);
		$('#cancelDelMnLks').fadeIn(1000);
	}
	else {
		$('#delMnLks').fadeOut(1000);
		$('#cancelDelMnLks').fadeOut(1000);
	}
});

//-------
$('.delMany').live('change',function(){

	if($("#wrapper .delMany").is(':checked')) {
		$("#lastTventy .delMany:checked").attr('checked','');
	}
	
	//if($("#lastTventy .delMany").is(':checked')) {
		//$("#wrapper .delMany:checked").attr('checked','');
	//}
	
	
});

//-- ОТМЕНА УДАЛЕНИЯ ВСЕХ ВЫДЕЛЕННЫХ ДЛЯ УДАЛЕНИЯ ССЫЛОК
$('#cancelDelMnLks').click(function(){
	$(".item input:checked").attr('checked','');
	$(this).fadeOut(500);
	$("#delMnLks").fadeOut(500);
});

//--------
	/*
	$("#wrapper .item input:checked").each(function(indx, element){
		$("#delLinks").fadeIn(slow);
	});
*/

//-----------  ПРОСТАВЛЕНИЕ НОМЕРОВ И ИЗМЕНЕНИЕ ПОЗИЦИЙ ЭЛЕМЕНТОВ
$("#wrapper .sortable").sortable({ revert:true, distance:20,  stop: function(event, ui) {

	var masEl = new Array(); 
	var i = 0, id_number;
	$("#wrapper .number").each(function(indx, element){
	  $(this).text(indx + 1);
	  id_number = $(this).closest('li').attr('id_number');
	  masEl[indx + 1] = id_number;
	});
	
	
	//-- Флажок позвол. добовлять к вывед. ссылкам новую группу  !($('#header .addGroup:checkbox').attr("checked"))

	if( ( $('#wrapper .nameGroup span').size() < 2 ) && (!$('#wrapper .nameGroup span').is('.all_lin')) ) {
		
		$.ajax({

			url: 'ajax/nomers.php',
			type: 'post',
			dataType: 'json',
			data: { masEl: masEl },
			success: function(data) {
				
			}

		}); //-- КОНЕЦ АЯКС ЗАПРОСА

	}
	
 } });


//-----------  ПРОСТАВЛЕНИЕ НОМЕРОВ И ИЗМЕНЕНИЕ ПОЗИЦИЙ ЭЛЕМЕНТОВ
$("#lastTventy .sortable").sortable({ revert:true, distance:20,  stop: function(event, ui) {

	$("#lastTventy .number").each(function(indx, element){
	  $(element).text(indx + 1);	  
	});


 } });
 
 
 //-----------  ПРОСТАВЛЕНИЕ НОМЕРОВ И ИЗМЕНЕНИЕ ПОЗИЦИЙ ЭЛЕМЕНТОВ В КАТЕГОРИЯХ
$("#all_group .sortable").sortable({ revert:true, distance:20,  stop: function(event, ui) {
	
	var masElCar = new Array(); 
	$("#all_group .number").each(function(indx, element){
	  $(element).text(indx + 1);
	  id_number = $(this).closest('li').attr('id_number');
	  masElCar[indx + 1] = id_number;	  
	});

		$.ajax({

			url: 'ajax/nomers.php',
			type: 'post',
			dataType: 'json',
			data: { masElCar: masElCar },
			success: function(data) {
			
				//alert(data);
			}

		}); //-- КОНЕЦ АЯКС ЗАПРОСА	

} });
 
 
//------------  БЫСТРАЯ ДЕМОНСТРАЦИЯ СКРИНШОТА  ------------
$('.view_link').live('mousedown', function(){
	var elemNomName = $(this).attr('style');
	$("#zoom_screen .down").attr('style',elemNomName);
	$("#zoom_screen").fadeIn(500);
	//setTimeout('$("#zoom_screen").stop().fadeIn(500)',1000);
	
});

$('.view_link,#zoom_screen').live('mouseup', function(){
	//$("#zoom_screen").stop(false, true);
	$("#zoom_screen").fadeOut(400,function(){ $("#zoom_screen .down").attr('style',''); });
});

$(".view_link").sortable({ distance: 1 }); //-- ОТМЕНА ПЕРЕМЕЩЕНИЯ У СПИСКА ДЛЯ ПРОСМ. СКРИНШОТА

//------------

//--  ГЛАВНАЯ ФУНКЦИЯ ВЫВОДА ЭЛЕМЕНТОВ КАТЕГОРИИ
function dat(data){
				for(var i = 0; i < data.length; i++) {
				
				if(data[i]['choise'] == 1) {data[i]['icon'] = data[i]['screen'];}
				
				$("#wrapper ul.bom").append(
				"<li id_number = '" + data[i]['id'] + "' title = '" + data[i]['data'] + "' data-sec = '" + data[i]['timeCreat'] + "'>\
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
}

//-----------

//--  ГЛАВНАЯ ФУНКЦИЯ ВЫВОДА ЭЛЕМЕНТОВ КАТЕГОРИИ
function datEnd(){

				if(glbData[0]['choise'] == 1) {glbData[0]['icon'] = glbData[0]['screen'];}
				
				$("#wrapper ul.bom").append(
				"<li id_number = '" + glbData[0]['id'] + "' title = '" + data[i]['data'] + "' data-sec = '" + data[i]['timeCreat'] + "'>\
					<div class='item' title='" + glbData[0]['title'] + "' style ='background: " + glbData[0]['background'] + "' ><a href='" + glbData[0]['links'] + "' rel='" + data[0]['group'] + "' target='_blank' style ='background: url(" + glbData[0]['icon'] + ") no-repeat center/87% 82%;' ></a> <input type='checkbox' class='delMany'  title='Позваляет отметить ссылки для удаления' />\
					\
						<div class='view_link' title='' style ='background: url(" + glbData[0]['screen'] + ") no-repeat center/100% 100%;' ></div> \
						\
						<div class='screen' title='Показывает полный скриншот страницы'><a href='" + glbData[0]['full_screen'] + "' target='_blank'></a></div> \
						\
						<div class='apdate'  title='Позваляет изменить параметры ссылки'></div>\
						\
						<div class='del'  title='Удаляет данную ссылку'></div>\
						\
						<div class='number'>" + glbData[0]['number'] + "</div> \
					\
					</div>\
					\
					<h3>\
						<a href='" + glbData[0]['links'] + "' title='" + data[0]['name'] + "' target='_blank'>" + glbData[0]['name'] + "</a>\
					</h3>\
				</li>");
}

//--  ГЛАВНАЯ ФУНКЦИЯ ВЫВОДА ЭЛЕМЕНТОВ КАТЕГОРИИ
function datStr(data){

				if(data[0]['choise'] == 1) {data[0]['icon'] = data[0]['screen'];}
				
				$("#lastTventy ul").prepend(
				"<li id_number = '" + data[0]['id'] + "' title = '" + data[i]['data'] + "' data-sec = '" + data[i]['timeCreat'] + "'>\
					<div class='item' title='" + data[0]['title'] + "' style ='background: " + data[0]['background'] + "' ><a href='" + data[0]['links'] + "' rel='" + data[0]['group'] + "' target='_blank' style ='background: url(" + data[0]['icon'] + ") no-repeat center/87% 82%;' ></a> <input type='checkbox' class='delMany'  title='Позваляет отметить ссылки для удаления' />\
					\
						<div class='view_link' title='' style ='background: url(" + data[0]['screen'] + ") no-repeat center/100% 100%;' ></div> \
						\
						<div class='screen' title='Показывает полный скриншот страницы'><a href='" + data[0]['full_screen'] + "' target='_blank'></a></div> \
						\
						<div class='apdate'  title='Позваляет изменить параметры ссылки'></div>\
						\
						<div class='del'  title='Удаляет данную ссылку'></div>\
						\
						<div class='number'>" + data[0]['number'] + "</div> \
					\
					</div>\
					\
					<h3>\
						<a href='" + data[0]['links'] + "' title='" + data[0]['name'] + "' target='_blank'>" + data[0]['name'] + "</a>\
					</h3>\
				</li>");
}




//------------  КОНЕЦ КОДА------------------------
});
