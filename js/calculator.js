//Väntar tills documentet har laddats färdigt
$(document).ready(function(){
    var float_a = 0.0;
    var float_b = 0.0;
    var string_a = "";
    var string_b = "";
    var currentOperation = "";
    var nextOperation = "";
    var outputField = document.querySelector('#inputfield');
    
    //Klick-funktion för musklick
    $( "#btn-clear" ).click(function() {
        clear();
        outputField.innerHTML = "0.0";
    });
    $( "#btn-division" ).click(function() {
        readOperation("/");
        compute();
    });
    $( "#btn-eight" ).click(function() {
        readNumber("8");
    });
    $( "#btn-seven" ).click(function() {
        readNumber("7");
    });
    $( "#btn-nine" ).click(function() {
        readNumber("9");
    });
    $( "#btn-multiplication" ).click(function() {
        readOperation("*");
        compute();
    });
    $( "#btn-four" ).click(function() {
        readNumber("4");
    });
    $( "#btn-five" ).click(function() {
        readNumber("5");
    });
    $( "#btn-six" ).click(function() {
        readNumber("6");
    });
    $( "#btn-subtraction" ).click(function() {
        readOperation("-");
        compute();
    });
    $( "#btn-one" ).click(function() {
        readNumber("1");
    });
    $( "#btn-two" ).click(function() {
        readNumber("2");
    });
    $( "#btn-three" ).click(function() {
        readNumber("3");
    });
    $( "#btn-addition" ).click(function() {
        readOperation("+");
        compute();
    });
    $( "#btn-zero" ).click(function() {
        readNumber("0");
    });
    $( "#btn-comma" ).click(function() {
        readNumber(".");
    });
    $( "#btn-sum" ).click(function() {
        if (currentOperation != ""){
            readOperation("=");
            compute();
        }
    });
    
    //Klick-funktion för tangentbord
    $(document).keyup(function(e)
    {
        if (e.key == "c"){
            clear();
            outputField.innerHTML = "0.0";
        }
        else if (e.key == "/"){
            readOperation("/");
            compute();
        }
        else if (e.key == "7"){
            readNumber("7");
        }
        else if (e.key == "8"){
            readNumber("8");
        }
        else if (e.key == "9"){
            readNumber("9");
        }
        else if (e.key == "*"){
            readOperation("*");
            compute();
        }
        else if (e.key == "4"){
            readNumber("4");
        }
        else if (e.key == "5"){
            readNumber("5");
        }
        else if (e.key == "6"){
            readNumber("6");
        }
        else if (e.key == "-"){
            readOperation("-");
            compute();
        }
        else if (e.key == "1"){
            readNumber("1");
        }
        else if (e.key == "2"){
            readNumber("2");
        }
        else if (e.key == "3"){
            readNumber("3");
        }
        else if (e.key == "+"){
            readOperation("+");
        }
        else if (e.key == "0"){
            readNumber("0");
        }
        else if (e.key == "."){
            readNumber(".");
        }
        else if (e.key == "=" || e.key == "Enter"){
            //OM currentOperation har ett värde då ska likamed tecknet visas
            if (currentOperation != ""){
                readOperation("=");
                compute();
            }
        }
    });
    
    //Läser av nummer för att skriva ut på skärmen.
    //Kollar om currentOperation är tomt, om tomt, adderar string_a += number; och visar string_a på skärmen
    //Annars adderar string_b += number; och visar string_b på skärmen
    function readNumber(number){
        if(currentOperation == ""){
            string_a += number;
            setDisplay(string_a);
        }
        else{
            string_b += number;
            setDisplay(string_b);
        }
        
    }
    
    //Läsar av currentOperation är skilt från tomt, om skilt från tomt tilldelas op till nextOperation
    //Annars tilldelas op till currentOperation
    function readOperation(op){
        if(currentOperation != ""){
            if(string_b == ""){
                currentOperation = op;
            }
            else{
                nextOperation = op;
            }
        }
        else{
            
            currentOperation = op;
        }
        setDisplay(op);

    }
    
    //Rensar variabler
    function clear()
    {
        string_b = "";
        string_a = "";
        float_a = 0.0;
        float_b = 0.0;
        currentOperation = "";
        nextOperation = "";

    }
    
    //ska bara kallas efter varje operation
    function compute() {
        
        // IF BARA om vi har tsring_a, string_b, currentOperation och nextOperation.
        if(string_a != "" && string_b != "" && currentOperation != "" && nextOperation != ""){
            
            // IF Kan vi konvertera a,b till floats? Dvs är de giltiga?
            // Konverterar strängar till float med parsefloat.
            if(!isNaN(string_a) && !isNaN(string_b)){
                float_a = parseFloat(string_a);
                float_b = parseFloat(string_b);
                
                //Om vi ser likamed tecken som operation gör en evaluate() med värden float_a, float_b, currentOperation
                //Rensa currentOperation
                if(nextOperation == "="){
                    evaluate(float_a, float_b, currentOperation);
                    currentOperation = "";
                }
                else{
                    //Annars utför en evaluate() med värden float_a, float_b, currentOperation
                    evaluate(float_a, float_b, currentOperation);
                }
                
            }
            // ELSE till ovanståendeOm nån av a,b är inte ett giltigt nummer ex. 3. avbryt och ge hjälpsamt felmeddelande följt av en clear()
            else{
                outputField.innerHTML = "NaN";
                clear();
            }
        }  
        // om det inte är fallet, gör ingenting
    }
    
    //Om en operand (+,-,/,*) utför operation på a & b och lagra i float_a
    //Om division med 0, ange felmeddelande och utför en clear()
    //Annars dividera a med b.
    //Sedan tilldela nextOperation till currentOperation
    //Rensa variabler
    //Visa string_a på displayen
    function evaluate(a, b, op){
        switch(op){
            case '+':
            float_a = a + b
            break
            case '-':
            float_a = a - b
            break
            case '*':
            float_a = a * b
            break
            case '/':
            if(b == 0){
                setDisplay("Division by zero");
                clear();
                return
            }
            else{
                float_a = a / b
            }
            break
        }
        currentOperation = nextOperation;
        nextOperation = "";
        float_b = 0.0;
        string_a = float_a.toString();
        string_b = "";
        setDisplay(string_a);
    }
    
    //Visa värdet s på displayen
    function setDisplay(s){
        outputField.innerHTML = s;
    }
});