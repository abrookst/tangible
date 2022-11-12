// Basically main function
function calculate_carbon() {
    const forms = get_element('material_forms').children;
    if(forms.length == 0)
        return;
    let total_carbon = 0;
    for(let i = 0; i < forms.length; i++) {
        // Each form is in a styling div, so we get the first child
        const form = forms[i].children[0].children[0];

        const carbon_factor_str = form['carbon_factor'].value;
        const mass_str = form['mass'].value;
        if(carbon_factor_str === '' || mass_str === '')
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
    let new_material_form = document.createElement('div');
    new_material_form.innerHTML = `
        <div class="material_box">
            <form id="form` + get_element('material_forms').children.length + `">
                Material Name: <input type="text" onclick="calculate_carbon()"><br>
                Carbon factor (kg<sub>CO<sub>2</sub></sub>e / kg<sub>material</sub>): <input type="text" name="carbon_factor" onclick="calculate_carbon()"><br>
                Mass (kg): <input type="text" name="mass" onclick="calculate_carbon()"><br><br>
            </form>
        </div>`;
    return new_material_form;
}

add_material();

// Helper functions

function remove_button_for(element_id) {
    let new_button = document.createElement('input');
    new_button.innerHTML = `<input type="button" onclick="get_element('` + element_id + `')>`;
    return new_button;
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

function get_element(element) {
    return document.getElementById(element);
}

/*
function get_material(): string {
    let material: HTMLElement = document.getElementById("inptMat")!;
    return material.onsubmit();
}*/
