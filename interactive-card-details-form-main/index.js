const cardholder_name = document.getElementById('cardholder-name');
const card_number = document.getElementById('card-number');
const exp_mm = document.getElementById('mmyy1');
const exp_yy = document.getElementById('mmyy2');
const _cvc = document.getElementById('_cvc');

const DivContainer = document.getElementById("ss_2"); // append thank-you-fragment here
var count = 0;

var card_number_final;

const len = new Map();
    len.set("cardholder-name", 20);
    len.set("card-number", 19);
    len.set("mmyy1", 2);
    len.set("mmyy2", 2);
    len.set("_cvc", 3);


function confirm() { // remove child and renew it to display confirm logo and shit
    DivContainer.removeChild(document.getElementById("container"));

    const res = document.createElement("div");
    res.classList.add('thank-you-fragment');
    res.setAttribute('id', 'thank-you-fragment');
    
    DivContainer.appendChild(res);

    const contentDiv = document.createElement("div");
    const Content = document.getElementById("thank-you-fragment");
    contentDiv.classList.add('content_wjs');
    contentDiv.setAttribute('id', 'content_wjs');
    Content.appendChild(contentDiv);

    const ContentChild = document.getElementById("content_wjs");
    const logo = document.createElement("img");
    const p_thankyou = document.createElement("p");
    const p_thankyou_sub = document.createElement("p");

    const continue_btn = document.createElement("BUTTON");
    continue_btn.setAttribute('id', 'continue');
    const text = document.createTextNode("Continue");
    continue_btn.appendChild(text);

    logo.setAttribute('id', 'icon-complete');
    logo.src = "images/icon-complete.svg";
    logo.alt = "icon-complete"
    
    const node_h = document.createTextNode("THANK YOU!");
    const node_s = document.createTextNode("We've added your card details");

    p_thankyou.appendChild(node_h);
    p_thankyou.setAttribute('id', 'p_thankyou');
    p_thankyou_sub.appendChild(node_s);
    p_thankyou_sub.setAttribute('id', 'p_thankyou_sub');

    ContentChild.appendChild(logo);
    ContentChild.appendChild(p_thankyou);
    ContentChild.appendChild(p_thankyou_sub);
    ContentChild.appendChild(continue_btn);
}   

function changeContent() {
    document.getElementById("top").innerHTML = card_number_final;
    document.getElementById("btm_name").innerHTML = cardholder_name.value;
    document.getElementById("btm_date").innerHTML = exp_mm.value + "/" + exp_yy.value;
    document.getElementById("cvc").innerHTML = _cvc.value;
}


function clickPress(event) { // revert back to normal after press
    var target = event.target;
    var key = (event.which) ? event.which : event.keyCode;
    if (key === 32 && target.id != "cardholder-name") {
        return false;
    }
    if (key === 8) {
        count--;
    }
    if (target.value.length === 0) {
        count = 0;
    }
    if (target.id === "cardholder-name") {
        /* DO NOTHING */
    }
    else if(!((key >= 48) && (key <= 57))) {
        return false;
    }

    if (target.value.length < len.get(target.id)) { 
        if (target.id === "card-number") { // Format card number
            if (count === 4) {
                var input = $("#card-number");
                input.val(input.val() + " ");
                count=0;
            }
            count++;
        }
        card_number_final = document.getElementById("card-number").value;
        return true;
    } else if (target.value.length === len.get(target.id)) {
        return false;
    }
    let pNode = document.getElementById(target.id).parentNode.id;
    let final_pNode;
    if (pNode == "exp__cvc") {
        final_pNode = document.getElementById(pNode).parentNode.id;
    } else {
        final_pNode = document.getElementById(target.id).parentNode.id;
    }
    document.getElementById(target.id).style.border = "2px solid hsl(270, 3%, 87%)"; 
    const _class = document.getElementById(final_pNode);

    const parent = document.getElementById(_class.id);
    const child = document.getElementById("error_msg"); // soemthign wrong herer
    parent.removeChild(child);
    return true;
}

function transaction() {
    const _variables = [cardholder_name, card_number, exp_mm, exp_yy, _cvc];
    const _container = ["c_name", "c_number", "exp_date", "exp_date", "__cvc"];
    let _redFlags = 0;

    for (let i = 0; i < _variables.length; i++) {
        if (_variables[i].value === "") {
            _redFlags+=1;
            document.getElementById(_variables[i].id).style.border = "2px solid hsl(0, 100%, 66%)";
            const _msg = document.createElement("label");
            _msg.setAttribute('id', 'error_msg');
            const _text = document.createTextNode("Can't be blank");
            _msg.appendChild(_text);
            const _class = document.getElementById(_container[i]);
            if (_class.querySelector("#error_msg") == null) {
                _class.append(_msg);
            }
        }   
    }
    if (_redFlags === 0) {
        changeContent();
        confirm();
    }
}
