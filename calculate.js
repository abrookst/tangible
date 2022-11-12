// Basically main function
function calculate_carbon() {
    const form = get_element('frm1');
    if(form['carbon_factor'].value == '' || form['mass'].value == '')
        return;

    let carbon_factor = parseFloat(form['carbon_factor'].value);
    let mass = parseFloat(form['mass'].value);
    let embodied_carbon = embodied_carbon_of(carbon_factor, mass);
    get_element('embodied_carbon').innerHTML =
        '<b>' + embodied_carbon + '</b> kg of CO<sub>2</sub> embodied';
}

// Returns kg of CO2
function embodied_carbon_of(carbon_factor, mass) {
    return carbon_factor * mass;
}

function get_element(element) {
    return document.getElementById(element);
}

/*
function get_material(): string {
    let material: HTMLElement = document.getElementById("inptMat")!;
    return material.onsubmit();
}*/

console.log("hello energyhack!");