//JSON data which is used in the data grid.
var data = [{
	"Name" : "Europe",
	"Plan" : "$10,525,200",
	"Forecast" : "$12,700,200",
	"Best Case" : 
		{
			"BestCase1": "$12,700,200",
			"BestCase2":"$11,700,400"
		},
	"Commit" : 
		{
			"Commit1": "$12,700,200",
			"Commit2":"$11,700,400"
		}
},
{
	"Name" : "Belgium",
	"Plan" : "$2,525,200",
	"Forecast" : "$3,125,200",
	"Best Case" : 
		{
			"BestCase1": "$2,900,450",
			"BestCase2":"$2,890,120"
		},
	"Commit" : 
		{
			"Commit1": "$2,900,450",
			"Commit2": "$2,890,120"
		}	
},
{
	"Name" : "England",
	"Plan" : "$4,600,400",
	"Forecast" : "$2,500,600",
	"Best Case" : 
		{
			"BestCase1": "$3,900,300",
			"BestCase2":"$2,900,300"
		},
	"Commit" : 
		{
			"Commit1": "$3,900,300",
			"Commit2": "$2,900,300"
		}	
},
{
	"Name" : "Sweden",
	"Plan" : "$2,425,200",
	"Forecast" : "$5,425,200",
	"Best Case" : 
		{
			"BestCase1": "$6,200,200",
			"BestCase2": "$2,400,900"
		},
	"Commit" : 
		{
			"Commit1": "$6,200,200",
			"Commit2": "$2,400,900"
		}	
},
{
	"Name" : "Finland",
	"Plan" : "$1,700,200",
	"Forecast" : "$4,700,200",
	"Best Case" : 
		{
			"BestCase1": "$4,702,120",
			"BestCase2":"$4,300,200"
		},
	"Commit" : 
		{
			"Commit1": "$4,702,120",
			"Commit2": "$4,300,200"
		}	
}];

//This function renders dropdown when button is clicked from the last column of the header.
function renderDropdown() {
	if($('#dropdownContainer').is(':hidden')){
		$('#dropdownContainer').show();
		if($("#dropdown").is(':empty')){
			var options = [];
			for (var i = 0; i < data.length; i++) {
			    for (var key in data[i]) {
			        if (options.indexOf(key) === -1) {
			            options.push(key);
			        }
			    }
			}

		    $.each(options, function (i) {
		        $("#dropdown").append($("<label>").text(options[i]).prepend(
		            $("<input>").attr('type', 'checkbox').val(i)
		        ));
		    });
		}
	}else{
		$('#dropdownContainer').hide();	
	}
}

//It creates filter button dynamically everytime in header of last column.
function createFilterButton(th){
	var filterButton = document.createElement("button");
	filterButton.id = 'filterButton';
	filterButton.className = 'filterButton';
	th.appendChild(filterButton);
	
	//Click handler for Filter button
	filterButton.onclick = function () {
	    renderDropdown();
	};
}

//It filters the columns based on the selection from dropdown.
function filterCol(){
	$('#dropdownContainer').hide();
	var chk = $("input:checkbox");
	$('.filterButton').remove();

	//Loop through all the checkboxes
	for (var i = 0; i < chk.length; i++) {
		//Hide checkboxes which are not checked and show which are checked
		if(chk[i].checked != true){
				$('td:nth-child('+ (i+1) +')').hide();
				$('th:nth-child('+ (i+1) +')').hide();
		}  else{
				$('td:nth-child('+ (i+1) +')').show();
				$('th:nth-child('+ (i+1) +')').show();	
		} 
	}
	//Always pass the new th to createFilterButton, so that button can be created in new last th
	var lastCol = $('th:visible:last');
	createFilterButton(lastCol[0]);
}

//This function is used create a grid dynamically when page loads.
//This also inserts the JSON in the grid.
function CreateTable(){
	var col = [];
	for (var i = 0; i < data.length; i++) {
	    for (var key in data[i]) {
	        if (col.indexOf(key) === -1) {
	            col.push(key);
	        }
	    }
	}

	var table = document.createElement("table");
	table.className = 'grid';

	var tr = table.insertRow(-1);                   // TABLE ROW.

	for (var i = 0; i < col.length; i++) {
	    var th = document.createElement("th");      // TABLE HEADER.
	    th.innerHTML = col[i];
	    th.id = (th.innerHTML).toLowerCase();
	    tr.appendChild(th);
	    if(i == col.length-1){
	    	createFilterButton(th);
	    }
	}

	//Loop over JSON data and add it in grid
	for (var i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if(col[j]=='Best Case'){
                	tabCell.innerHTML = data[i][col[j]].BestCase1 + '<br><div class="second">' + data[i][col[j]].BestCase2 + '</div>';
                }else if(col[j]=='Commit'){
                	tabCell.innerHTML = data[i][col[j]].Commit1 + '<br><div class="second">' + data[i][col[j]].Commit2 + '</div>';	
                }
                else{
                tabCell.innerHTML = data[i][col[j]];
                }
            }
    }


	var gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = "";
        gridContainer.appendChild(table);

    $("#name").click(function(){
		sortTable(0);
	});

	$("input[name='selector']").change(function() {
		var value = $( 'input[name=selector]:checked' ).val();
		var rows = document.getElementsByTagName("tr");
		for (i = 1; i < (rows.length - 1); i++) {
			if(value == "less"){
				$('.second').hide();
    		}else{
    			$('.second').show();
    		}
		}
	});
}


//This function is used to sort the column in ascending/descending order when the header is clicked.
//For now I have applied sorting to first column only. Similar function can be called to sort all the columns as well.
function sortTable(n){
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementsByClassName("grid");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done
    switching = false;
    rows = document.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
