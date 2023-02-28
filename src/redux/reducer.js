import ACTIONS from "./actions"

const evalue = state => {
    let {lastOperand, currentOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);

    console.log(last);
    
    let res = "";
    switch(operation) {
        case '+':
            res = last + current;
            break;
        case '-':
            res = last - current;
            break;
        case '×':
            res = last * current;
            break;
        case '÷':
            res = last / current;
            break;
    }

    return res.toString();
}

const reducer = (state={
    currentOperand:"0",
    lastOperand:"",
    operation:"",
    overwrite: false,
},action) => {
    console.log(action);
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite === true)
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            if (state.currentOperand === '0' &&  action.digit === '0' )
                return state;
            if (state.currentOperand === '0' &&  action.digit !== '.' )
                return {
                    ...state,
                    currentOperand: action.digit,
                }
            if (action.digit === '.' &&  state.currentOperand.includes('.') )
                return state;   
                  
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite === true)
                return {
                    ...state,
                    lastOperand: '',
                    currentOperand: '0',
                    operation: '',
                    overwrite: false,
                }
            if (state.currentOperand.length === 1)
                return {
                    ...state,
                    currentOperand: '0',
                }
            if (state.currentOperand === '0')
                return state;
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (state.lastOperand === '')
                return  {
                    ...state,
                    overwrite: true,
                    lastOperand: state.currentOperand,
                    operation: action.operation,   
                }
            return  {
                ...state,
                overwrite: true,
                lastOperand: evalue(state),
                operation: action.operation, 
                currentOperand: evalue(state),
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                lastOperand: '',
                currentOperand: '0',
                operation: '',
                overwrite: false,
            }   
        case ACTIONS.EVALUATE:

            return {
                ...state,
                overwrite: true,
                lastOperand: evalue(state),
                operation: action.operation, 
                currentOperand: evalue(state),
            }      
        default:
            return state;

    }

};

export default reducer;