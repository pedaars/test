
/* When called the loadTable() function will perform a get request to the url to 
retrieve the data for the pageNo specified (on navigating to or refreshing the 
page this will be page 1). The data for the page which then be displayed under 
the HTML table #Results. */

function loadData(pageNo) {

let url = 'http://demo.api.coinvestor.co.uk/sponsor?page=' + pageNo;
fetch(url)
.then(res => res.json())
.then((manager) => {
/* console.log(manager); */ 
  	for (i in manager.data){
		var row = $('<div id="Data">' + '<br>' + getLogo(manager, i) + '<br>'
				+ '<br>' + '<p1>' + getName(manager, i) + '</p1>'   
				+ getAdd1(manager, i) + getAdd2(manager, i) + getAdd3(manager, i) 
				+ getCity(manager, i) + getPcode(manager, i) 
				+ '<br>' + getCountry(manager, i) + '<br>'
				+ '<br>' + getWeb(manager, i) + '<br>' 
				+ '<br>' + getPhases(manager, i) 
				+ '<br>' + getPspon(manager, i) 
				+ '<br>' + getOspon(manager, i) + '<br>'
				+ '<br>' + getDesc(manager, i) + '<br>' 
				+ '<br>' + '</div>' + '<br>');
				
		$('#Results').append(row);
    }			
})
};

	
function getLogo(manager, i){
	if(manager.data[i].attributes.basic_assets.logo == null){
		return manager.data[i].attributes.name;
	} 
	else {
		return '<img src="' +  manager.data[i].attributes.basic_assets.logo.path + '">';
	}
}


function getName(manager, i){
	if(manager.data[i].attributes.name == null){
		return "";
	} 
	else {
		return manager.data[i].attributes.name;
    }
}


function getAdd1(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address1 == null){
		return "";
	} 
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address1;
	}
}


function getAdd2(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address2 == null){
		return "";
	} 
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address2;
	}
}


function getAdd3(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address3 == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address3;
	}
}


function getCity(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].city == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].city;
	}
}


function getPcode(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].post_code == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].post_code;
	}
}

function getCountry(manager, i){
	if(manager.data[i].attributes.addresses[0] != null && manager.data[i].attributes.addresses[0].country != null){
		var country = manager.data[i].attributes.addresses[0].country;
		let url = 'http://data.okfn.org/data/core/country-codes/r/country-codes.json';
		fetch(url)
		.then(res => res.json())
		.then((data) => {
		/* console.log(data); */		
		var result;
		/* console.log(result); */
		$.each(data, function(key, index) {
				if (index.M49 == country) {
					result = index.name;
					console.log(result);
					return "" + result;
				}
				else {
					return "";
				}
		})
		})
		
	}
	else {
		return "";
	}
};

/* for(i in data) {
			if(data[i].M49 == country) {
							
				result += data[i].name;
				console.log(data[i].name);
				console.log(result);
				return result;
			}
			return "";
		} */

function getWeb(manager, i){
	if(manager.data[i].attributes.communications[0].website == null){
		return "";
	} 
	else {
		return '<a href="' + manager.data[i].attributes.communications[0].website + '">' 
                + manager.data[i].attributes.communications[0].website + '</a>';
	}
}


function getPhases(manager, i){
    var phases='Investment Phases: ' + '';
	for(j in manager.data[i].attributes.investment_phases){
		if(manager.data[i].attributes.investment_phases[j].value == null){
			return "";
		}
		else {
			phases += manager.data[i].attributes.investment_phases[j].value + ', ';
		}
	}
	return phases;
}


function getPspon(manager, i){
	var primP='Primary Sponsor Type: ' + '';
	if(manager.data[i].attributes.primary_sponsor_type.value == null){
		return "";
	} 
	else {
		primP += manager.data[i].attributes.primary_sponsor_type.value;
		return primP;
	}
}


function getOspon(manager, i){
	var oSpon='Other Sponsor Types: ' + '';
	for(j in manager.data[i].attributes.other_sponsor_types){
	if(manager.data[i].attributes.other_sponsor_types[j].value == null){
		return "";
	} 
	else {
		oSpon += manager.data[i].attributes.other_sponsor_types[j].value + ', ';
	}
	}
	return oSpon;
}


function getDesc(manager, i){
	if(manager.data[i].attributes.marketing.description_header == null){
		return "";
	} 
	else {
		return manager.data[i].attributes.marketing.description_header;
	}
}

/* When called (on navigating to or refreshing the webpage) the pagingButtons() function performs a get request to the meta data 
contained within the json. This returns how many pages of data there are to be displayed. This value is stored to var pages
and used to dynamically create the correct number of paging buttons (2 at the time of writing) these will be displayed in the 
#paginator div. */

function pagingButtons() {
let url = 'http://demo.api.coinvestor.co.uk/sponsor';

fetch(url)
.then(res => res.json())
.then((manager) => {
  			var pages = (manager.meta.pagination.total_pages);
			for (var i = 0 + 1; i <= pages; i++) {
			$('#paginator1').append('<input type="button" class="pagebtn" value="' + i + '"/>');
			$('#paginator2').append('<input type="button" class="pagebtn" value="' + i + '"/>');
			}		
})	

.catch(err => console.error(err));
}


/* The paging function is called when any of the paginator buttons are clicked. The value of the button is retrieved and stored as
var pageNo. Then the function then removes any data currently being displayed in the Results div and then calls the loadData(pageNo) function
which is passed the page number to display. */

function paging() {
var pageNo;
$('#paginator1, #paginator2').on('click', 'input[type="button"]', function(e) {
    e.preventDefault();
	/* console.log('button clicked'); */
	pageNo = $(this).val();
	/* console.log(pageNo); */
	$('#Results').empty();
	loadData(pageNo);
})
}