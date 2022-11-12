// Basically main function
function calculate_carbon() {
    const form_count = get_element('material_forms').children.length;
    if(form_count == 0)
        return;
    let total_carbon = 0;
    for(let i = 0; i < form_count; i++) {
        // Each form is in a styling div, so we get the first child
        const form = get_element('form' + i);

        const carbon_factor_str = form['carbon_factor'].value;
        const mass_str = form['mass'].value;
        if(form['carbon_factor'] === undefined || carbon_factor_str === ''
            || form['mass'] === undefined || mass_str === '')
            return;
        const carbon_factor = parseFloat(carbon_factor_str);
        const mass = parseFloat(mass_str);
        total_carbon += embodied_carbon_of(carbon_factor, mass);
    }

    get_element('embodied_carbon').innerHTML =
        '<b>' + total_carbon + '</b> kg of CO<sub>2</sub> embodied';
}               

// Returns kg of CO2
function embodied_carbon_of(carbon_factor, mass) {
    return carbon_factor * mass;
}

function add_material() {
    let forms = get_element('material_forms');
    forms.appendChild(new_material_form());
}

// Returns the material form made
function new_material_form() {
    const form_number = get_element('material_forms').children.length;
    console.log('form number is ' + form_number)
    const new_material_form = document.createElement('div');
    new_material_form.setAttribute('id', 'box' + form_number);
    new_material_form.setAttribute('class', 'material_box');

    console.log(new_material_form);

    const form_element = create_element(`
        <form id="form` + form_number + `">
            Material Name: <input type="text" onclick="calculate_carbon()"><br>
            Carbon factor (kg<sub>CO<sub>2</sub></sub>e / kg<sub>material</sub>): <input type="text" name="carbon_factor" onclick="calculate_carbon()"><br>
            Mass (kg): <input type="text" name="mass" onclick="calculate_carbon()"><br><br>
        </form>`);
    new_material_form.appendChild(form_element);

    const remove_button = remove_button_for('box' + form_number);
    new_material_form.appendChild(remove_button);

    return new_material_form;
}

// Helper functions

function remove_button_for(element_id) {
    return create_element(`
        <input
            type="button"
            id="remove_`+ element_id + `"
            onclick="get_element('` + element_id + `').remove()"
            value="Remove material"
        >`);
}

function create_element(str) {
    let frag = document.createDocumentFragment();

    let elem = document.createElement('div');
    elem.innerHTML = str;

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

function get_element(element_str) {
    if(element_str != '')
        return document.getElementById(element_str);
}

/*
function get_material(): string {
    let material: HTMLElement = document.getElementById("inptMat")!;
    return material.onsubmit();
}*/



add_material();