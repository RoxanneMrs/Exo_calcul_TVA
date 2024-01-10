// Récupérer mes inputs de type tel
const INPUTS_TEL = document.querySelectorAll("input[type='tel']");

const HT = document.querySelector("#montantHT");
const TVA = document.querySelector("#montantTVA");
const TTC = document.querySelector("#montantTTC");
const TAUX_TVA = document.querySelector("#tauxTVA");
const LIST_BUTTONS = document.querySelectorAll("input[type='button']");


// Capter le moment où je change une valeur dans un de mes inputs tel
// je parcours mes inputs de type tel
for (let i=0; i < INPUTS_TEL.length; i++) {
    INPUTS_TEL[i].addEventListener("keyup", function () {


        // Je récupère l'ID d'un des 3 inputs (TVA HT TTC) et j'appelle CalculTVA en passant par cet ID
        calculTVA(this.id);

    })
}


// je parcours mes boutons et je dis que le bouton sur lequel je clique (parmis les différents % de tva proposés) est celui qu'il faut sélectionner
for (let i=0; i < LIST_BUTTONS.length; i++) {
    LIST_BUTTONS[i].addEventListener("click", function () {
      
        TAUX_TVA.value = this.value;
        calculTVA("montantHT");
    })
}



// récupérer taux brut
// .trim enlève les espaces blancs
// parseFloat transforme une string en number

function cleanValue(rawAmount) {
    return parseFloat(rawAmount.replace("€", "").trim());
}

// .toFixed réduit le nombre de chiffres après la virgule
function formatValue(rawAmount) {
    return rawAmount.toFixed(2) + " €";
}


function calculTVA(id) {

    let ht = cleanValue(HT.value, "€");
    let ttc = cleanValue(TTC.value, "€");
    let tva = cleanValue(TVA.value, "€");
    let tauxTVA = cleanValue(TAUX_TVA.value, "%") / 100;

    if (id === "montantHT") {
    // montant HT

         // montant TTC
         // montant TVA
        tva = ht * tauxTVA;
        ttc = ht + tva;

    } else if (id === "montantTVA") {
     // montant TVA
    
         // montant HT
         // montant TTC
        ht = tva / tauxTVA;
        ttc = ht + tva;

    } else if (id === "montantTTC") {
    // montant TTC
        
         // montant HT
         // montant TVA 
        ht = ttc / (1 + tauxTVA);
        tva = ttc - ht;
    }
    
    else {
        // taux TVA, montant TVA, montant HT, montant TTC
    }

    HT.value = formatValue(ht);
    TVA.value = formatValue(tva);
    TTC.value = formatValue(ttc);

    TOTAL_TVA.innerHTML = "<p>Montant HT = " + formatValue(ht) + "</p>" ;
    TOTAL_TVA.innerHTML += "<p>Montant TVA = " + formatValue(tva) + "</p>" ;
    TOTAL_TVA.innerHTML += "<p>Montant TTC = " + formatValue(ttc) + "</p>" ;

}

// éviter de faire une fonction dans une itération sinon elle va se refaire x fois, ça prend de la mémoire pour r.


