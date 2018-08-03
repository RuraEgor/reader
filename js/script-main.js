
//=====  VARIABLE
let ctrlPress = false;
let readModePress = false;


//=====  JQUERY
$(function(){

    firstLoad();

    takeListBooks();  //=====  TAKE MENU


    $("#menu").on('click', '.menu__item', function () {
        let idItem = $(this).data('id');
        alert( idItem );
    });


    $("#font-size-inp").change(function () {
        let elFontSize = $(this).val();
        contr.fontSize = elFontSize;
        $("#reader").css({'font-size': elFontSize + 'px'});
    });
	
	
	//======================================================
    $('#colText').change(function () {
        contr.backgrText = $(this).val();
        $("#reader").css({'color': contr.backgrText});
    });

    $('#colBody').change(function () {
        contr.backgrDock = $(this).val();
        $('body').css({'background': contr.backgrDock});
        $("#reader").css({'background': contr.backgrDock});
    });


	//======================================================


    $(window).keydown(function(event){
        if(event.keyCode == 17) {
            ctrlPress = true;
        }
    });

    $(window).keyup(function(event){
        if(event.keyCode == 17) {
            ctrlPress = false;
        }
    });



    //==========
    $(window).on('keydown', function(e) {
        if (!ctrlPress && readModePress && event.keyCode === 38) {
            // event.preventDefault();
            contr.speed -= 0.11;
        }
    });

    $(window).on('keydown', function(e) {
        if (!ctrlPress && readModePress && event.keyCode === 40) {
            contr.speed += 0.11;
        }
    });


    //==========
    $(window).on('keydown', function(e) {
        if (ctrlPress && readModePress && event.keyCode === 38) {
            contr.speed -= 1;
        }
    });

    $(window).on('keydown', function(e) {
        if (ctrlPress && readModePress && event.keyCode === 40) {
            contr.speed += 1;
        }
    });



    $(window).on('keydown', function(e) {
        if (readModePress && event.keyCode === 32) {
            if (contr.end) {
                scrollTextEnd();
            } else {
                scrollTextStart();
                scrollText();
            }
        }
    });


    //===========================
    $('body').on('click', function (e) {

        let flagModalSet = document.getElementById('control');

        if ( !flagModalSet.contains(event.target) ) {

            let conrElem = $("#control");
            if ( conrElem.hasClass("active") ) conrElem.removeClass("active");
        }

    })

});



//=====  CREATE NEW BOOK
$("#book-form").submit(function () {

    let elBook = $('#book-name');

    let bookName = elBook.val();

    bookName = bookName.trim();
    bookName = bookName.replace(/\s+/g, ' ');

    let nowDate = new Date();

    if (!bookName)  {
        alert('Input name new book');
        return false;
    }

    $.ajax({
        url: 'ajax/createBook.php',
        type: 'post',
        dataType: 'json',
        data: {'name': bookName, 'date': nowDate},
        success: function (data) {

            if (data == 'is') {
                alert('??? ??????????!');
            } else {
                alert('?????????');
            }
            elBook.val('');
        }
    });

    return false;
});


// is_data_changed = true;
//
// window.onbeforeunload = function () {
//     return (is_data_changed ? "?????????? ?????? ?? ?????????. ??????? ?????????" : null);
// }


// window.onbeforeunload = function (e) {
//     // ????? ??????? ??? Interner Explorer
//     var e = e || window.event;
//     var myMessage= "?? ????????????? ?????? ???????? ????????, ?? ???????? ???????";
//     // ??? Internet Explorer ? Firefox
//     if (e) {
//         e.returnValue = myMessage;
//     }
//     // ??? Safari ? Chrome
//     return myMessage;
// };


//=======================================================================
//=======================================================================

let readerElem;

let contr = {};

contr.id = 1;
contr.el = document.getElementById("reader");
contr.begin = 0;
contr.end = false;
contr.scrhHg = 0;
contr.speed = 0.5;
contr.fontSize = 17;
contr.textWidth = 0;
contr.color = '#000000';
contr.backgrText = '#ffffff';
contr.backgrDock = '#ffffff';
contr.backgrImg = '';

contr.text = '';


function firstLoad() {
    readerElem = $("#reader");
    getDataSet();
    setTimeout( ()=>{ readerElem.addClass('tran'); }, 1000 );
}


function scrollTextStart() {
    contr.scrhHg = contr.el.scrollTop;
	contr.end = true;
}


function scrollText() {

	contr.scrhHg += contr.speed;
    contr.el.scrollTop = contr.scrhHg;

	if (contr.end) requestAnimationFrame(scrollText);
}


function scrollTextEnd() {
	contr.end = false;
}


//=====  SEND PARAMS
function takeDataSet() {

    contr['backgrText'] = $("#colText").val();
    contr['backgrDock'] = $("#colBody").val();
    contr['fontSize'] = $("#font-size-inp").val();

    contr.text = readerElem.val();

    contr.textWidth = readerElem.css("width");
    contr.scrhHg = contr.el.scrollTop;


    contr.end = false;

    let readerSet = {
        'speed': contr.speed,
        'width': contr.textWidth,
        'height': contr.scrhHg,
        'fontSize': contr.fontSize,
    	'backgrText': contr.backgrText,
    	'backgrDock': contr.backgrDock
    }


    let strParams = JSON.stringify(readerSet);

    $.ajax({
        url: "ajax/apdate.php",
        type: 'post',
        dataType: 'json',
        data: { id: contr.id, text: contr.text, params: strParams },
        success: function(data) {

            // console.log( 'data', data );
        }

    });
}


//=====  SEND ONLY PARAMS
function takeDataSetOnly() {

    contr['backgrText'] = $("#colText").val();
    contr['backgrDock'] = $("#colBody").val();
    contr['fontSize'] = $("#font-size-inp").val();

    contr.text = readerElem.val();

    contr.textWidth = readerElem.css("width");
    contr.scrhHg = contr.el.scrollTop;

    contr.end = false;

    let readerSet = {
        'speed': contr.speed,
        'width': contr.textWidth,
        'height': contr.scrhHg,
        'fontSize': contr.fontSize,
        'backgrText': contr.backgrText,
        'backgrDock': contr.backgrDock
    }


    let strParams = JSON.stringify(readerSet);

    $.ajax({
        url: "ajax/apdateParam.php",
        type: 'post',
        dataType: 'json',
        data: { id: contr.id, params: strParams },
        success: function(data) {

            // console.log( 'data', data );
        }

    });
}


//=====  SEND ONLY TEXT
function takeTextOnly() {

    contr.text = readerElem.val();
    contr.end = false;

    $.ajax({
        url: "ajax/apdateText.php",
        type: 'post',
        dataType: 'json',
        data: { id: contr.id, text: contr.text },
        success: function(data) {

            // console.log( 'data', data );
        }

    });
}


//=====  SET PARAMS
function getDataSet() {

    $.ajax({
        url: "ajax/getData.php",
        type: 'post',
        dataType: 'json',
        data: { id: contr.id},
        success: function(data) {

            let params = JSON.parse(data['params']);

            let readerElem = $("#reader");
            readerElem.text(data['text']);
            setTimeout( function () { setParamEndLoad(params); }, 300);
        }

    });
}

//=====  FUNCTION SET PARAMS
function setParamEndLoad(params) {
    readerElem.css({
        'width': params['width'],
        'font-size': params['fontSize'] + 'px',
        'color': params['backgrText'],
        'background': params['backgrDock']
    });

    $("body").css({'background': params['backgrDock']});

    $("#colText").val(params['backgrText']);
    $("#colBody").val(params['backgrDock']);
    $("#font-size-inp").val(params['fontSize']);

    contr.fontSize = params['fontSize'];
    // contr.el.scrollTop = params['height'];
    contr.speed = params['speed'];
    setTimeout( function () { contr.el.scrollTop = params['height']; }, 700);
}


//=====  TAKE ALL BOOKS
function takeListBooks() {
    $.ajax({
        url: 'ajax/getMenu.php',
        dataType: 'json',
        success: function (data) {

            let elMenu = $('#menu');

            for (let i in data['name']) {
                elMenu.append('<div class="menu__item" data-id="' + data['id'][i] + '">' + data['name'][i] + '</div>');
            }
        }
    });
}


//=====  READ MODE
function readMode() {

    let elemReadMode = $("#readMode")
    
    if (readModePress) {
        readModePress = false;
        elemReadMode.removeClass("active");
    } else {
        readModePress = true;
        elemReadMode.addClass("active");
    }

    $("#hideInp").focus();
}


//=====  SHOWE SETTING
function toggleSetting() {

    $("#control").toggleClass("active");
}





