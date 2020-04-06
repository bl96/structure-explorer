import {
  lockConstantValue,
  lockDomain,
  lockFunctionValue,
  lockPredicateValue,
  setConstantValue,
  setDiagramModel,
  setFunctionValueTable,
  setFunctionValueText,
  setPredicateValueTable,
  setPredicateValueText,
  toggleDatabase,
  toggleTable,
  renameDomainNode,
  syncDiagram,
  addDomainNode,
  removeDomainNode,
  addConstantNode,
  removeConstantNode,
  checkBadName,
  addUnaryPredicate,
  removeUnaryPredicate, toggleEditableNodes, renameConstantNode, setConstantValueFromLink, getPredicates,
} from "../actions";
import {connect} from 'react-redux';
import {BodyWidget} from "../../graph_view/components/BodyWidget";

const mapStateToProps = (state,ownProps) => ({
  domain: [...state.structureObject.domain],
  language: state.language,
  structure: state.structure,
  diagramState: state.diagramState,
  store: ownProps.store
});

const mapDispatchOnProps = {
  setDiagramModel:setDiagramModel,
  syncDiagram:syncDiagram,
  setConstantValue: setConstantValue,
  checkBadName:checkBadName,
  addDomainNode:addDomainNode,
  renameDomainNode:renameDomainNode,
  removeDomainNode:removeDomainNode,
  addConstantNode:addConstantNode,
  renameConstantNode:renameConstantNode,
  removeConstantNode:removeConstantNode,
  setPredicateValueText: setPredicateValueText,
  setPredicateValueTable: setPredicateValueTable,
  setFunctionValueText: setFunctionValueText,
  setFunctionValueTable: setFunctionValueTable,
  toggleTable: toggleTable,
  toggleDatabase:toggleDatabase,
  lockDomain: lockDomain,
  lockConstantValue: lockConstantValue,
  lockPredicateValue: lockPredicateValue,
  lockFunctionValue: lockFunctionValue,
  addUnaryPredicate: addUnaryPredicate,
  removeUnaryPredicate: removeUnaryPredicate,
  toggleEditableNodes: toggleEditableNodes,
  setConstantValueFromLink: setConstantValueFromLink,
  getPredicates: getPredicates
};

const DiagramModelContainer = connect(
   mapStateToProps,
   mapDispatchOnProps
)(BodyWidget);

export default DiagramModelContainer;