
// Dark Mode Toggler WORKS//
$(document).ready(() =>{
    $('.changeMode').click(() => {
        $('body').toggleClass('dark-mode');
        checkImg();
        checkButtonImg();
        $('li').toggleClass('dark-mode-li');
        $('.todoInput').toggleClass('dark-mode-input');
        $('.navUl').toggleClass('dark-mode-navUl');
    })
})

//Background Changer WORKS//
const checkImg = () => {
    if($('body').hasClass('')){
        let imgUrl = "images/bg-desktop-light.jpg"
        $('.background-img').css("background-image","url("+ imgUrl +")");
    } else{
        let imgUrl2 = "images/bg-desktop-dark.jpg"
        $('.background-img').css("background-image","url("+ imgUrl2 +")");
    }
};

//Button BackgroundChanger WORKS//
const checkButtonImg = () => {
    if($('body').hasClass('')){
        let btnImg = "images/icon-moon.svg"
        $('.toggler').css("background-image","url("+btnImg+")");
    } else{
        let btnImg2 = "images/icon-sun.svg"
        $('.toggler').css("background-image","url("+btnImg2+")");
    }
}


//Get data from Input and add it to list WORKS//

const adder = () => {

    let item = $(".todoInput").val();
    let fixingContent = '<li>'+item+'</li>';

    if($('body').hasClass('dark-mode')){
       fixingContent = '<li class="dark-mode-li">'+item+'</li>'}

    if($('.activeList li').length < 10 && item.length < 50){
        $('.activeList').append(fixingContent);
      countLi();
    }else{
      alert("Maximum list item count is reached!");
    }
}

  //Adding X to li elements WORKS//

  function addDeleteButton() {
    $('.theList li').each(function() {
      if (!$(this).find('.delete-button').length) {
        $(this).append('<button class="delete-button"></button>');
      }
    });

    $('.activeList li').each(function() {
      if (!$(this).find('.delete-button').length) {
        $(this).append('<button class="delete-button"></button>');
      }
    });

  }


// giving todoAdder functionality WORKS//

$('.todoAdder').click(() => {
    adder();
    addDeleteButton();
})
//Hit Enter and record To Do Item WORKS //
$('.todoInput').keypress((event)=> {
    if(event.key === 'Enter'){
        adder();
        addDeleteButton();
        countLi();
    }
})


//Giving Strikethrough effect to line items WORKS//

$(document).on('click', '.activeList li', function() {
    $(this).toggleClass('strikethrough');
    $(this).toggleClass('completed');
    let completedListItem = $(this);
    completedListItem.fadeOut(500,function(){
      completedListItem.appendTo('.completedList').fadeIn(500);
    })
    countLi();
  });

// DRAG MOBILITY WORKS //
  $(function() {
    $('.theList').sortable();
    $('.theList').disableSelection();
    $('.activeList').sortable();
    $('.activeList').disableSelection();
    $('.completedList').sortable();
    $('.completedList').disableSelection();
    
  });
  
// Adding active class to pressed NAV lİNK WORKS/

$('a').click(function(event) {
  event.preventDefault();
 
$('a').not(this).removeClass('active');
$(this).toggleClass('active');
})

// NAV Counter WORKS//
let itemCount = 0;
const countLi = () => {
  if($('.activeList li').hasClass('.strikethrough')) {
    let calculation = $('.activeList li').length - $('.activeList li .strikethrough').length;
    itemCount = $('#itemCounter').html(`${calculation} items left`);
  } else{
  itemCount = $('.activeList li:not(.strikethrough)').length;
  $('#itemCounter').html(`${itemCount} items left`);
}};

//Removing the li item if the X button is pressed NO IDEA WHAT THIS DOES RIGHT NOW//

/*
$(document).on('click', '.delete-button', function() {
  let completedLi = $(this).closest('.theList li');
  //$('.completedList').append(completedLi);
  //completedLi.closest('.theList li').remove();
  //$(this).removeClass('delete-button').addClass('delete-button-completed')
}); **/

$('.clearAll').click(() => {
  if($('.theList li, .completedList li, .activeList li').length > 0){
    $('.theList li,.completedList li, .activeList li').remove();
    countLi();
  } else{
    alert('No item to clear!');
  }

})

//TABS IN THE MAIN PANEL. WORKS//
$(document).ready(function() {
  // Event listener for tab link clicks
  $('.tabLinks').click(function(event) {
    event.preventDefault();
    var target = $(this).data('target');
    
    // Hide all tab content divs
    $('.tabcontent').hide();
    
    // Show the selected tab content div
    $('#' + target).show();
    
    // Update active tab link
    $('.tablinks').removeClass('active');
    $(this).addClass('active');
    $('.theList').empty();
    $('.activeList li').clone().appendTo('.theList');
    $('.completedList li').clone().appendTo('.theList');
    $('.theList li').css("display","visible");

  });
});


//Deleting items in Completed Tab WORKS//
$(document).on('click', '.strikethrough', function() {
  let compLi = $(this).closest('.completedList li');
  compLi.closest('.completedList li').remove();
});


