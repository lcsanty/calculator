var calculator = (function() {

    var runningTotal,
        buffer,
        previousOperator,
        screen;

    var publicAPI = {
        init
    };

    return publicAPI;

    //**************************************************************************************** */

    function buttonClick( buttonValue ) {

        if ( Number.isNaN( Number( buttonValue ) ) ) {
            handleSymbol( buttonValue );
        }

        else {
            handleNumber( buttonValue )
        }

        renderScreen();
    
    }

    function handleNumber( number ) {

        if ( buffer == "0" ) {
            buffer = number;
        }

        else {
            buffer += number;
        }

    }

    function handleSymbol( symbol ) {
       
        if ( symbol == "C" ) {

            runningTotal = 0;
            buffer = "0";
            previousOperator = null;
    
        }

        else if ( symbol == "←" ) {
            buffer = buffer.length == 1 ? "0" : buffer.substring( 0, buffer.length - 1 );
        }

        else if (  symbol == "=" ) {
            
            if ( !previousOperator ) {
                return;
            }

            flushOperation( Number( buffer ) );

            previousOperator = null;
            buffer = String( runningTotal );
            runningTotal = 0;

        }

        else {
            handleMath( symbol );
        }

    }

    function handleMath( mathOperator ) {

        if ( runningTotal == 0 ) {
            runningTotal = Number( buffer );
        }

        else {
        
            flushOperation( Number( buffer ) );

        }

        previousOperator = mathOperator;
        buffer = "0";

    }

    function flushOperation( intBuffer ) {

        if ( previousOperator == "+" ) {
            runningTotal += intBuffer;
        }

        else if ( previousOperator == "-" ) {
            runningTotal -= intBuffer;
        }

        else if ( previousOperator == "✕" ) {
            runningTotal *= intBuffer;
        }

        else {
            runningTotal /= intBuffer;
        }

    }

    function renderScreen() {
        screen.innerText = buffer;
    }

    function init() {

        runningTotal = 0;
        buffer = "0";
        previousOperator = null
        screen = document.querySelector(".screen");

        document.querySelector(".calc-buttons")
            .addEventListener( "click", function( event ) {
                buttonClick( event.target.innerText );
             });

    }

})();