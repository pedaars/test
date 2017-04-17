/* When called the loadTable() function will perform a get request to the url to retrieve the data for the pageNo 
specified (on navigating to or refreshing the page this will be page 1).
The data for the page which then be displayed under the HTML table #Results. */

function loadData(pageNo) {

let url = 'http://demo.api.coinvestor.co.uk/sponsor?page=' + pageNo;
<!-- console.log(url); -->
fetch(url)
.then(res => res.json())
.then((manager) => {
  
  <!-- console.log(manager); -->
  console.log(manager.data);
  <!-- console.log(manager.data[0].attributes.name); -->
  <!-- console.log(manager.meta); -->
  <!-- console.log(manager.meta.pagination.total_pages); -->
   for(var i=0; i<manager.data.length; i++) {
		for (j = 0, l = manager.data[i].attributes.investment_phases.length; j < l; j++) {
    try {
      var row = $('<tr><td>' + '<br>' 
                + '<img src="' + manager.data[i].attributes.basic_assets.logo.path + '">' + '<br>' 
                + manager.data[i].attributes.name + '<br>' 
                + manager.data[i].attributes.addresses[0].address1 + '<br>' 
                + manager.data[i].attributes.addresses[0].address2 + '<br>' 
                + manager.data[i].attributes.addresses[0].address3 + '<br>' 
                + manager.data[i].attributes.addresses[0].city + '<br>' 
                + manager.data[i].attributes.addresses[0].post_code + '<br>' + '<br>' 
                + '<a href="' + manager.data[i].attributes.communications[0].website + '">' 
                + manager.data[i].attributes.communications[0].website + '</a>' + '<br>' + '<br>' 
                + 'Investment Phases: ' 
                + manager.data[i].attributes.investment_phases[j].value + '<br>' 
                + 'Primary Sponsor Type: ' 
                + manager.data[i].attributes.primary_sponsor_type.value + '<br>' 
                + 'Other Sponsor Type: ' 
                + manager.data[i].attributes.other_sponsor_types + '<br>' + '<br>' 
                + manager.data[i].attributes.marketing.description_header + '<br>' + '<br>' 
                + '</td></tr>');
      $('#Results').append(row);
    } 
	catch (e) {
	}
  }
}
})
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
			$('#paginator').append('<input type="button" class="pagebtn" value="' + i + '"/>');
		}		
		})	

.catch(err => console.error(err));
}


/* The paging function is called when any of the paginator buttons are clicked. The value of the button is retrieved and stored as
var pageNo. Then the function then removes any data currently being displayed in the Results div and then calls the loadData(pageNo) function
which is passed the page number to display. */

function paging() {
var pageNo;
$('#paginator').on('click', 'input[type="button"]', function(e) {
    e.preventDefault();
	<!-- console.log('button clicked'); -->
	pageNo = $(this).val();
	<!-- console.log(pageNo); -->
	$('#Results').empty();
	loadData(pageNo);
})
}