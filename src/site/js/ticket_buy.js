
var template_1 = document.getElementById('1-person-data');
var template_10 = document.getElementById('10-person-data');

document.getElementById('traveller-data--end').style.display = 'none';
document.getElementById('buyer__title').style.display = 'none';
document.getElementById('finalPrice').style.display = 'none';

const MDCSelect = mdc.select.MDCSelect;
const select = new MDCSelect(document.querySelector('.mdc-select'));

var body = document.getElementById('traveller-data');

//var select = document.getElementById("buy-select");

select.listen('MDCSelect:change', () => {
    document.getElementById('traveller-data--end').style = '';
    document.getElementById('buyer__title').style = '';

    var final = 0;

    //alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    if (select.selectedIndex == 1 || select.selectedIndex == 2 || select.selectedIndex == 3) {
        template_1.style = ''
        template_10.style.display = 'none';

        document.getElementById('finalPrice').style.display = '';

        const urlParams = new URLSearchParams(window.location.search);
        const price = urlParams.get('price');

        if (select.selectedIndex == 1) {

            final = price;

        }else if (select.selectedIndex == 2) {
 
            final = price * 0.5;

        } else if (select.selectedIndex == 3) {
            
            final = price * 0.1;
        }

    }else if(select.selectedIndex == 4){
        template_10.style = ''
        template_1.style.display = 'none';

        document.getElementById('finalPrice').style.display = '';

        const urlParams = new URLSearchParams(window.location.search);
        const price = urlParams.get('price');

        final = 10 * price * 0.8;
        
    }

    document.getElementById('finalPrice_field').value = final;
    document.getElementById('category_field').value = select.selectedIndex;

    document.getElementById('finalPrice_number').textContent = final;


});

document.getElementById("buy_button").disabled = true; //disable button until checkbox
