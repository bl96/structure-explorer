import {FORMULA, TERM} from "../constants";
import EqualityAtom from "../model/formula/Formula.EqualityAtom";
import Disjunction from "../model/formula/Formula.Disjunction";
import PredicateAtom from "../model/formula/Formula.PredicateAtom";
import Negation from "../model/formula/Formula.Negation";
import Constant from "../model/term/Term.Constant";
import Implication from "../model/formula/Formula.Implication";
import Conjunction from "../model/formula/Formula.Conjunction";
import Variable from "../model/term/Term.Variable";
import FunctionTerm from "../model/term/Term.FunctionTerm";
import UniversalQuant from "../model/formula/Formula.UniversalQuant";
import ExistentialQuant from "../model/formula/Formula.ExistentialQuant";

let functions = require('./functions');

let s = {};
let structure = null;
let e = new Map();

function expressionsReducer(state = s, action, structure2, variables) {
   s = state;
   structure = structure2;
   e = variables;
   switch (action.type) {
      case 'SET_CONSTANTS':
      case 'SET_PREDICATES':
      case 'SET_FUNCTIONS':
      case 'IMPORT_APP':
         syncExpressionsValue(true);
         return state;
      case 'SET_CONSTANT_VALUE':
      case 'SET_PREDICATE_VALUE':
      case 'SET_FUNCTION_VALUE':
      case 'SET_VARIABLES_VALUE':
      case 'SET_DOMAIN':
         syncExpressionsValue();
         return state;
      case 'ADD_EXPRESSION':
         addExpression(action.expressionType);
         return s;
      case 'REMOVE_EXPRESSION':
         removeExpression(action.expressionType, action.index);
         return s;
      case 'SET_EXPRESSION_ANSWER':
         setExpressionAnswer(action.expressionType, action.index, action.answer);
         return s;
      case 'LOCK_EXPRESSION_VALUE':
         lockExpressionValue(action.expressionType, action.expressionIndex);
         return s;
      case 'LOCK_EXPRESSION_ANSWER':
         lockExpressionAnswer(action.expressionType, action.expressionIndex);
         return s;
      case 'CHECK_SYNTAX':
         checkExpressionSyntax(action);
         return s;
      default:
         return s;
   }
}

function addExpression(expressionType) {
   if (expressionType === FORMULA) {
      s.formulas.push(defaultExpression());
   } else if (expressionType === TERM) {
      s.terms.push(defaultExpression());
   }
}

function removeExpression(expressionType, expressionIndex) {
   if (expressionType === FORMULA && expressionIndex < s.formulas.length) {
      s.formulas.splice(expressionIndex, 1);
   } else if (expressionType === TERM && expressionIndex < s.terms.length) {
      s.terms.splice(expressionIndex, 1);
   }
}

function syncExpressionsValue(parse = false) {
   s.formulas.forEach(formula => {
      if (parse) {
         functions.parseText(formula.value, formula, setParserOptions(FORMULA.toLowerCase()));
      }
      evalExpression(formula);
   });
   s.terms.forEach(term => {
      if (parse) {
         functions.parseText(term.value, term, setParserOptions(TERM.toLowerCase()));
      }
      evalExpression(term);
   });
}

function evalExpression(expression) {
   if (!expression.parsed || expression.parsed.length === 0)
      return;
   expression.feedback.message = '';
   try {
      expression.expressionValue = expression.parsed.eval(structure, e);
   } catch (e) {
      expression.feedback.message = e;
      expression.feedback.type = 'error';
   }
}

function checkExpressionSyntax(action) {
   let expressionText = action.value;
   let expression = s.terms[action.index];
   if (action.expressionType === FORMULA) {
      expressionText = '(' + expressionText + ')';
      expression = s.formulas[action.index];
   }
   functions.parseText(expressionText, expression, setParserOptions(action.expressionType.toLowerCase()));
   expression.value = action.value; // aby tam neboli zatvorky
   if (expression.feedback.message.length === 0) {
      expression.validSyntax = true;
      evalExpression(expression);
   } else {
      expression.validSyntax = false;
   }
}

function setExpressionAnswer(expressionType, expressionIndex, answer) {
   if (expressionType === FORMULA && expressionIndex < s.formulas.length) {
      let ans = (answer === 'true');
      if (answer === '-1')
         ans = '-1';
      s.formulas[expressionIndex].answerValue = ans;
   } else if (expressionType === TERM && expressionIndex < s.terms.length) {
      s.terms[expressionIndex].answerValue = answer;
   }
}

function lockExpressionAnswer(expressionType, expressionIndex) {
   if (expressionType === FORMULA && expressionIndex < s.formulas.length) {
      s.formulas[expressionIndex].answerLocked = !s.formulas[expressionIndex].answerLocked;
   } else if (expressionType === TERM && expressionIndex < s.terms.length) {
      s.terms[expressionIndex].answerLocked = !s.terms[expressionIndex].answerLocked;
   }
}

function lockExpressionValue(expressionType, expressionIndex) {
   if (expressionType === FORMULA && expressionIndex < s.formulas.length) {
      s.formulas[expressionIndex].inputLocked = !s.formulas[expressionIndex].inputLocked;
   } else if (expressionType === TERM && expressionIndex < s.terms.length) {
      s.terms[expressionIndex].inputLocked = !s.terms[expressionIndex].inputLocked;
   }
}

const defaultExpression = () => ({
   value: '',
   expressionValue: null,
   answerValue: '',
   feedback: {type: null, message: ''},
   inputLocked: false,
   answerLocked: false
});

const setParserOptions = (startRule) => ({
   startRule: startRule,
   structure: structure,
   conjunction: Conjunction,
   disjunction: Disjunction,
   implication: Implication,
   variable: Variable,
   constant: Constant,
   existentialQuant: ExistentialQuant,
   universalQuant: UniversalQuant,
   functionTerm: FunctionTerm,
   predicate: PredicateAtom,
   negation: Negation,
   equalityAtom: EqualityAtom
});

export default expressionsReducer;