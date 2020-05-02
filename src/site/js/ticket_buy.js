
var template_1 = document.getElementById('1-person-data');
var template_10 = document.getElementById('10-person-data');

document.getElementById('traveller-data--end').style.display = 'none';
document.getElementById('buyer__title').style.display = 'none';

const MDCSelect = mdc.select.MDCSelect;
const select = new MDCSelect(document.querySelector('.mdc-select'));

var body = document.getElementById('traveller-data');

//var select = document.getElementById("buy-select");

select.listen('MDCSelect:change', () => {
    document.getElementById('traveller-data--end').style = '';
    document.getElementById('buyer__title').style = '';

    //alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    if (select.selectedIndex == 1 || select.selectedIndex == 2 || select.selectedIndex == 3) {
        template_1.style = ''
        template_10.style.display = 'none';
    }else if(select.selectedIndex == 4){
        template_10.style = ''
        template_1.style.display = 'none';
    }
});