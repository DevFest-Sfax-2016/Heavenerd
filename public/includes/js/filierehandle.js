
	
	$(document).ready(function() 
	{


		var redirecturl = urlprefix+'Pedagogie';
		
		//  ==================  Add Processing   ===================

					// process the form
		$('.addfiliereform').submit(function(event) {
			 
			var addfilierurl = $('input[name=addfiliere_url]').val(); 
		  // remove success messages and remove the past errors
		 $('.fil-form-group .messages-block').removeClass('alert alert-success').empty();
		 $('.fil-form-group .messages-block').removeClass('alert alert-danger alert-dismissable').empty();
		  
			
		   
		  // get the form data
		  var formData = {
			  'nomfil'              : $('input[name=nomfiliere]').val(),
			  'descfil'              : $('input[name=descfiliere]').val(),
			  'nbetudiant'              : $('input[name=nbetudiant]').val(),
			  'nbclasse'              : $('input[name=nbclasse]').val(),
			  'genererclasse'            : $('input[name="genererclasse"]:checked').val(),
			  'depfil'              : $( "#fildepselect" ).val(),
			  'tag'	: $('input[name=addfiltag]').val()
		  };

		  // process the form
		  $.ajax({
			type        : 'POST',
			url         : addfilierurl,
			data        : formData,
			dataType    : 'json',
			success     : function(data) {

			 
			
			  
		  		   
			  // if validation fails
			  // add the error class to show a red input
			  // add the error message to the help block under the input
			  if ( ! data.success) {
				  
				  
				$('.fil-form-group .messages-block').addClass('alert alert-danger alert-dismissable').html(data.message);
				
				

			  } else {
				
				// if validation is good add success message
				// if validation is good add success message
				//$('#addfiliere').modal('hide');
				$('.fil-form-group .messages-block').addClass('alert alert-success alert-dismissable').html(data.message);
				//document.getElementById("addfiliere").reset();
				/*
				$('#addfiliere').modal('hide');
				$('#usermessages').addClass('alert alert-success').html('<p>' + data.message + '</p>');
				document.getElementById("usermessages").style.display = "block";
				$('#usermessages').fadeIn( hidemessage/5 );
				$('#usermessages').fadeOut( hidemessage );			
				*/
						
			
			  }
			}
		  });

		  
		  event.preventDefault();
		  
		   setTimeout(function()
		{
			  // remove success messages and remove the past errors
			$('.fil-form-group .messages-block').removeClass('alert alert-success').empty();
			$('.fil-form-group .messages-block').removeClass('alert alert-danger alert-dismissable').empty();
			
		}, hidemessage);
			// stop the form from submitting and refreshing
		  event.preventDefault();
		  
		});
	
	});







function deleteFiliere(evt, filName,nomModal) {

	var delfilurl = urlprefix+'Pedagogie/Filiere/Delete';
	var redirecturl = urlprefix+'Pedagogie';
	var reloadtime = 1000 ;
	  // get the form data
	  var formData = {
		  'nomfil'              : filName,
		  'tag'	: 'deletefil'
	  };

	 
		
	  // process the form  
	  $.ajax({
		type        : 'POST',
		url         : delfilurl, 
		data        : formData,
		dataType    : 'json',
		success     : function(data) {

		 
		 
		
		  // if validation fails
		  // add the error class to show a red input
		  // add the error message to the help block under the input
		  if ( ! data.success) {
			 
			 
			$(nomModal).modal('hide');
			$('#usermessages').addClass('alert alert-danger alert-dismissable').html('<p>' + data.message + '</p>');
			document.getElementById("usermessages").style.display = "block";
			$('#usermessages').fadeIn( showingtime );
			$('#usermessages').fadeOut( showingtime );
			
			
		  }
		  else 
		  {
			$(nomModal).modal('hide');
			 x = document.getElementsByClassName('fssfil'+filName);
			  for (i = 0; i < x.length; i++) 
			  {
				 x[i].style.display = "none";
			  }
			
			// if validation is good add success message
			$('#usermessages').addClass('alert alert-success').html('<p>' + data.message + '</p>');
			document.getElementById("usermessages").style.display = "block";
			$('#usermessages').fadeIn( showingtime );
			$('#usermessages').fadeOut( showingtime );
			
			
		
		  }
		}
	  });

	  // stop the form from submitting and refreshing
	  evt.preventDefault();
  
  
}


function updateFiliere(evt,formName) {
	
	
	var fname = formName;
	// stop the form from submitting and refreshing
	  evt.preventDefault();
	  
	var updnomfil = $("form[name='"+fname+"']").find('input[name="updnomfiliere"]').val();
	var upddepfiliere = $("form[name='"+fname+"']").find('input[name="upddepfiliere"]').val();
	var oldfilname = $("form[name='"+fname+"']").find('input[name="oldfilname"]').val();
	var updfiltag = $("form[name='"+fname+"']").find('input[name="updfiltag"]').val();
	var updatefilierurl = $("form[name='"+fname+"']").find('input[name="updatefiliere_url"]').val();
		
		
	  // remove success messages and remove the past errors
	  $('#usermessages').removeClass('alert alert-success').empty();
	  $('#usermessages').removeClass('alert alert-danger alert-dismissable').empty();
	  
	   
	   
	  // get the form data
	  var formData = {
		  'nomfil'              	: updnomfil,
		  'depfil'              	: upddepfiliere,
		  'oldfilname'				: oldfilname,
		  'tag'						: updfiltag
	  };


	  // process the form
	  $.ajax({
		type        : 'POST',
		url         : updatefilierurl, 
		data        : formData,
		dataType    : 'json',
		success     : function(data) {
		
		  // if validation fails
		  // add the error class to show a red input
		  // add the error message to the help block under the input
		  if ( ! data.success) {
			  
			  
			
			$('.fil-form-group .messages-block').addClass('alert alert-danger alert-dismissable').html(data.message);
			
			

		  } else {
			
			$('.fil-form-group .messages-block').addClass('alert alert-success alert-dismissable').html(data.message);
			
		
		  }
		}
	  });

	  
  
}


