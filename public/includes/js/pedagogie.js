//var urlprefix = "http://pfefss.azurewebsites.net/web/app.php/" ;
var urlprefix = "http://localhost/netbeanspedagofss/web/app_dev.php/" ;
var a4  =[ 595.28,  841.89];
var hideloader = 20000;
var hidemessage = 5000;

 
// create canvas object
function getCanvas(empName,emptemplate){
//emptemplate.width((a4[0]*1.33333) -80).css('max-width','none');
 return html2canvas(emptemplate,{
     imageTimeout:3000,
     removeContainer:true
    }); 
}

//create pdf
function createPDF(empName,emptemplate){
 getCanvas(empName,emptemplate).then(function(canvas){
  var 
  img = canvas.toDataURL("image/jpg"),
  doc = new jsPDF({
		  orientation:'p',
          unit:'px', 
          format:'a3'
        });     
        doc.addImage(img, 'jpg', 25, 25);
        doc.save(empName+'.pdf');
        emptemplate.width(cache_width);
 });
 
}

function printEmploiClick(evt,empName,printCanvas) 
{
	
		document.getElementById("loadertext").innerHTML = " <p> Veuillez Patienter ... </p> " ;
		document.getElementById("loadermodal").style.display = "block";


		emptemplate = $(printCanvas),
		cache_width = emptemplate.width(),
		a4  =[ 595.28,  841.89];  // for a4 size paper width and height

		$('#printemploi').on('click',function()
		{
			$('body').scrollTop(0);
			createPDF(empName,emptemplate);
			
		}());

	setTimeout(function()
	{
		document.getElementById("loadertext").innerHTML = "" ;
		document.getElementById("loadermodal").style.display = "none";
		
	}, 30000);
	
}

