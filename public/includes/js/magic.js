	// var urlprefix = "http://pfefss.azurewebsites.net/web/app.php/" ;
	var urlprefix = "http://localhost/netbeanspedagofss/web/app_dev.php/" ;
	var scbcontainer = document.getElementById('sitecontent');
	
	function begintour() 
	{
		$('#firstuser').modal('hide');
		$('#connexion-modal').modal('show');
		$('#connexionform').popover('show');
	}


  
	$(document).ready(function() {

	
	
	
	//Ps.initialize(scbcontainer, {handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch','selection'],wheelSpeed: 1,wheelPropagation: true,minScrollbarLength: 20,stopPropagationOnClick: false,swipePropagation: true});
	
	var redirecturl = urlprefix+'User';
	
	var reloadtime = 1000 ;
	var cookietime = 24*60*60*1000;
	var days = 1;
	var usercookie = "iduser";
	
	  
	 //fix menu when passed
      $('.masthead').visibility({
          once: false,
          onBottomPassed: function() {
            $('.fixed.menu').transition('fade in');
          },
          onBottomPassedReverse: function() {
            $('.fixed.menu').transition('fade out');
          }
        });
		
		 // create sidebar and attach to menu open
      $('.ui.sidebar')
        .sidebar('attach events', '#tocitem')
      ;
	
	
							//	================== Link Hover Effect ===============================
		var	sfHover = function() {
				var sfEls =
				document.getElementById("menu").getElementsByTagName("LI");
				for (var i=0; i<sfEls.length; i++) 
				{
					sfEls[i].onmouseover = function() {
					this.className+=" sfhover";
					};
					sfEls[i].onmouseout = function() {
					this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
					};
				}
	};
		if (window.attachEvent)
		{
			window.attachEvent("onload", sfHover);
		}
							//	================== Back to Top ===============================
			$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');
			var amountScrolled = 500;
			$(window).scroll(function() {
				if ( $(window).scrollTop() > amountScrolled ) {
					$('a.back-to-top').fadeIn('slow');
				} else {
					$('a.back-to-top').fadeOut('slow');
				}
			});
			$('a.back-to-top').click(function() {
				$('html, body').animate({ scrollTop: 0}, 700);
				return false;
	});

							//  ==================  Connexion Processing   ===================
	// process the form
	$('#connexionform').submit(function(event) {
		
		 var loginurl = $('input[name=login_url]').val();
		

	   
	  // remove the past errors
	  $('#email-group').removeClass('has-error alert alert-success alert-danger alert-dismissable');
	  $('#email-group .help-block').empty();
	  $('#password-group').removeClass('has-error alert alert-success alert-danger alert-dismissable');
	  $('#password-group .help-block').empty();

	  // remove success messages
	  $('#login_messages').removeClass('alert alert-success alert-dismissable').empty();
	  $('#login_messages').removeClass('alert alert-danger alert-dismissable').empty();
	  
		
	  

	  // get the form data
	  var formData = {
		  'email'              : $('input[name=email]').val(),
		  'password'    : $('input[name=password]').val(),
		  'tag'	: $('input[name=tag]').val()
	  };

	  // process the form  
	  $.ajax({
		type        : 'POST',
		url         : loginurl, 
		data        : formData,
		dataType    : 'json',
		success     : function(data) {

		 
		 
		
		  // if validation fails
		  // add the error class to show a red input
		  // add the error message to the help block under the input
		  if ( ! data.success) {
			
			  
			  
			if (data.errors.email) {
			  $('#email-group').addClass('alert alert-danger alert-dismissable has-error');
			  $('#email-group .help-block').html(data.errors.email);
			}

			if (data.errors.password) {
			  $('#password-group').addClass('alert alert-danger alert-dismissable has-error');
			  $('#password-group .help-block').html(data.errors.password);
			}
			
			$('#login_messages').addClass('alert alert-danger alert-dismissable').html('<p>' + data.message + '</p>');
			
			var date = new Date();
			date.setTime(date.getTime ()+(1*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
			
			document.cookie = 'is_successful_login='+false+expires ;

		  }
		  else 
		  {
			

			// if validation is good add success message
			$('#login_messages').addClass('alert alert-success alert-dismissable').html(data.message );
			
			
			
			
			/*
			if(true)
			{
				days = 365 ;
			}
			*/
			
			var date = new Date();
			date.setTime(date.getTime ()+(days*cookietime));
			var expires = "; expires="+date.toGMTString();
			
			document.cookie = 'is_successful_login='+true+expires ;
			document.cookie = 'session_id='+data.uid+expires;
			document.cookie = 'session_remember='+false+expires;
			document.cookie = 'typeuser='+data.typeuser+expires;
			document.cookie = 'nomuser='+data.user.username+expires;
			
		
		setTimeout(function(){ window.location=redirecturl;
					}, reloadtime);
					$('#connexion-modal').modal('hide');
		
		  }
		}
	  });

	  // stop the form from submitting and refreshing
	  event.preventDefault();
	});



				//  ==================  Inscription Processing   ===================

				// process the form
	$('#inscriptionform').submit(function(event) {
		 
		 var sigininurl = $('input[name=register_url]').val();
		 

	   
	  // remove the past errors
	  $('#reg_username-group').removeClass('has-error alert alert-success alert-danger alert-dismissable');
	  $('#reg_username-group .help-block').empty();
	  $('#reg_email-group').removeClass('has-error alert alert-success alert-danger alert-dismissable');
	  $('#reg_email-group .help-block').empty();
	  $('#reg_password-group').removeClass('has-error alert alert-success alert-danger alert-dismissable');
	  $('#reg_password-group .help-block').empty();

	  // remove success messages
	  $('#reg_messages').removeClass('alert alert-success').empty();
	  $('#reg_messages').removeClass('alert alert-danger alert-dismissable').empty();
	  
	   
	   
	  // get the form data
	  var formData = {
		  'username'              : $('input[name=reg_username]').val(),
		  'famname'              : $('input[name=reg_famname]').val(),
		  'surname'              : $('input[name=reg_surname]').val(),
		  'email'              : $('input[name=reg_email]').val(),
		  'password'    : $('input[name=reg_password]').val(),
		  'tag'	: $('input[name=reg_tag]').val()
	  };

	  // process the form
	  $.ajax({
		type        : 'POST',
		url         : sigininurl, 
		data        : formData,
		dataType    : 'json',
		success     : function(data) {

		 
		
		  
	   
	   
		  // if validation fails
		  // add the error class to show a red input
		  // add the error message to the help block under the input
		  if ( ! data.success) {
			  
			  
			 
			if (data.errors.username) {
			  $('#reg_username-group').addClass('alert alert-danger alert-dismissable has-error');
			  $('#reg_username-group .help-block').html(data.errors.username);
			}
			
			if (data.errors.email) {
			  $('#reg_email-group').addClass('alert alert-danger alert-dismissable has-error');
			  $('#reg_email-group .help-block').html(data.errors.email);
			}

			if (data.errors.passworde) {
			  $('#reg_password-group').addClass('alert alert-danger alert-dismissable has-error');
			  $('#reg_password-group .help-block').html(data.errors.passworde);
			}
			
			$('#reg_messages').addClass('alert alert-danger alert-dismissable').html(data.message);
			
			var date = new Date();
			date.setTime(date.getTime ()+(days*cookietime));
			var expires = "; expires="+date.toGMTString();
			
			document.cookie = 'is_successful_login='+false+expires ;

		  } else {
			
			// if validation is good add success message
			$('#reg_messages').addClass('alert alert-success alert-dismissable').html(data.message );
			
			var days = 1;
			
			/*
			if(true)
			{
				days = 365 ;
			}
			*/
			
			var date = new Date();
			date.setTime(date.getTime ()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
			
			document.cookie = 'is_successful_login='+true+expires ;
			document.cookie = 'session_id='+data.uid+expires;
			document.cookie = 'session_remember='+false+expires;
			document.cookie = 'typeuser='+data.typeuser+expires;
			document.cookie = 'nomuser='+data.user.username+expires;
			
		
		setTimeout(function(){ window.location=redirecturl;
					}, reloadtime);
					$('#inscription-modal').modal('hide');
		
		  }
		} 
	  });

	  // stop the form from submitting and refreshing
	  event.preventDefault();
	});
	
	//$('#firstuser').modal('show');

});


function w3_open() {
	
	Ps.update(scbcontainer);
  document.getElementById("main").style.marginLeft = "20%";
  document.getElementsByClassName("w3-sidenav")[0].style.width = "20%";
  document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
  document.getElementsByClassName("w3-overlay")[0].style.display = "block";
  document.getElementsByClassName("w3-opennav")[0].style.display = 'none';
  
  var x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.marginLeft = "-15%";
  }
  
  x = document.getElementsByClassName("w3-main");
  for (i = 0; i < x.length; i++) {
     x[i].style.marginLeft = "20%";
  }
}

function w3_close() {
	
	Ps.update(scbcontainer);
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
  document.getElementsByClassName("w3-overlay")[0].style.display = "none";
  document.getElementsByClassName("w3-opennav")[0].style.display = "inline-block";
  document.getElementsByClassName("userinfo")[0].style.display = "block";
  
  var x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  
  x = document.getElementsByClassName("w3-main");
  for (i = 0; i < x.length; i++) {
     x[i].style.marginLeft = "0%";
  }
}


function openTabs(evt, cityName) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  var z = document.getElementsByClassName("userinfo");
  z[0].style.display = "none";
}

function closeTabs(evt, cityName) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  var z = document.getElementsByClassName("userinfo");
  z[0].style.display = "none";
}


function openMenu(evt, cityName) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
  /*
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  */
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  
}

function closeMenu(evt, cityName) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  
  openMenu(evt, cityName);
  
}


function openSubMenu(evt, cityName,contId1,contId2) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) 
  {
    x[i].style.display = "none";
	
  }
  
  document.getElementById(contId1).style.display = "block";
  document.getElementById("modiflayout").style.display = "block";
  document.getElementById(contId2).style.display = "none";
  
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  
  x = document.getElementsByClassName("back-button");
  for (i = 0; i < x.length; i++) 
  {
     x[i].style.display = "block";
  }
  x = document.getElementsByClassName("w3-sidenav");
  for (i = 0; i < x.length; i++) 
  {
     x[i].style.display = "block";
  }
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  
}

function closeSubMenu(evt, cityName,contId1,contId2) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) 
  {
     x[i].style.display = "none";
	 
  }
  document.getElementById(contId1).style.display = "none";
  document.getElementById(contId2).style.display = "none";
  
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
   x = document.getElementsByClassName("back-button");
  for (i = 0; i < x.length; i++) 
  {
     x[i].style.display = "none";
  }
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-red");
  
}


function openSubTab(evt, cityName,containerId) {
  
  evt.preventDefault();
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
	 document.getElementById(containerId).style.display = "block";
  }
  
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
	
     x[i].style.display = "none";
  }
 
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
	
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.classList.add("w3-red");
  
  
}

function closeSubTab(evt, cityName,container) {
  
  Ps.update(scbcontainer);
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
	 document.getElementById(containerId).style.display = "block";
     x[i].style.display = "none";
  }
  
  x = document.getElementsByClassName("userinfo");
  for (i = 0; i < x.length; i++) {
	 
     x[i].style.display = "none";
  }
  x = document.getElementsByClassName("menubtn");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "block";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].classList.remove("w3-red");
  }
  document.getElementById(cityName).style.display = "none";
  evt.currentTarget.classList.add("w3-red");
  
}

