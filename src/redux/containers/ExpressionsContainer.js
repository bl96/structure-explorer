import {connect} from 'react-redux';
import Expressions from "../../math_view/components/Expressions";
import {
  addExpression,
  checkExpressionSyntax,
  lockExpressionAnswer,
  lockExpressionValue,
  removeExpression,
  setExpressionAnswer
} from "../actions";

const mapStateToProps = (state,myprops) => ({
  formulas: state.expressions.formulas,
  terms: state.expressions.terms,
  domain: [...state.structureObject.domain],
  teacherMode: state.common.teacherMode,
  diagramModel:myprops.diagramModel
});

const mapDispatchToProps = {
  onInputChange: checkExpressionSyntax,
  addExpression: addExpression,
  removeExpression: removeExpression,
  setExpressionAnswer: setExpressionAnswer,
  lockExpressionValue: lockExpressionValue,
  lockExpressionAnswer: lockExpressionAnswer
};

const ExpressionContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Expressions);

export default ExpressionContainer;