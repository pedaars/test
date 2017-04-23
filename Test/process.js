
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

/* Checks basic_assets for a logo if null it returns the companies name else it returns the 
companies logo image. The logo's seem to have been remooved whilst completing the test. */
function getLogo(manager, i){
	if(manager.data[i].attributes.basic_assets.logo == null){
		return manager.data[i].attributes.name;
	} 
	else {
		return '<img src="' +  manager.data[i].attributes.basic_assets.logo.path + '">';
	}
}

/* Checks for a company name string to display if present if not returns an empty string */
function getName(manager, i){
	if(manager.data[i].attributes.name == null){
		return "";
	} 
	else {
		return manager.data[i].attributes.name;
    }
}

/* checks that there is an address stored and then checks the address1 field is not null. If either are null
returns an empty string. Else returns the string from address1. */
function getAdd1(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address1 == null){
		return "";
	} 
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address1;
	}
}

/* checks that there is an address stored and then checks the address2 field is not null. If either are null
returns an empty string. Else returns the string from address2. */
function getAdd2(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address2 == null){
		return "";
	} 
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address2;
	}
}

/* checks that there is an address stored and then checks the address3 field is not null. If either are null
returns an empty string. Else returns the string from address3. */
function getAdd3(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].address3 == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].address3;
	}
}

/* checks that there is an address stored and then checks the city field is not null. If either are null
returns an empty string. Else returns the city. */
function getCity(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].city == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].city;
	}
}

/* checks that there is an address stored and then checks the post_code field is not null. If either are null
returns an empty string. Else returns the post_code. */
function getPcode(manager, i){
	if(manager.data[i].attributes.addresses[0] == null || manager.data[i].attributes.addresses[0].post_code == null){
		return "";
	}
	else {
		return '<br>' + manager.data[i].attributes.addresses[0].post_code;
	}
}

/* Checks that there is an address and then checks for a country code. Assigns the 3 digit numerical country code to 
country. Then loads a JSON containing ISO 3166 data process this into a searchable object. Searches the objects 
for a match to the value stored in country. Then assigns the name field from the matched object to result and then 
returns it to be display at the end of the address. */

/* This function is curreently returning undefined and I have not been able to fix the cause but I have included 
it to show how I was attempting this return.  */
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

/* Checks if the website field is set to null. If it is returns an empty string else returns a link to 
the companies website */
function getWeb(manager, i){
	if(manager.data[i].attributes.communications[0].website == null){
		return "";
	} 
	else {
		return '<a href="' + manager.data[i].attributes.communications[0].website + '">' 
                + manager.data[i].attributes.communications[0].website + '</a>';
	}
}

/* Checks invetsment_phases is not null, if it is returns an empty string. Else returns all the phases prefixed 
with Investment Phases:  */
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

/* Checks for a primary sponsor if null returns an empty string else returns the primary sponsor type 
prefixed with Primary Sponsor Type: */
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

/* Checks if other_sponsor_types is null if it is returns an empty string else returns the other sponsor types
prefixed with Other Sponsor Types: */
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

/* Checks for a company descripition_header if null returns an empty string else returns the
description_header. */
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