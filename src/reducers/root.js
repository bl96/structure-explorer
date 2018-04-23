import Structure from "../model/Structure";
import Language from "../model/Language";
import languageReducer from "./language";
import structureReducer from "./structure";
import expressionsReducer from "./expressions";
import commonReducer from "./common";

const defaultState = {
   structureObject: new Structure(new Language()),
   common: {
      teacherMode: false
   },
   language: {
      constants: {value: '', locked: false, feedback: {type: null, message: ''}, parsed: []},
      predicates: {value: '', locked: false, feedback: {type: null, message: ''}, parsed: []},
      functions: {value: '', locked: false, feedback: {type: null, message: ''}, parsed: []},
   },
   structure: {
      constants: {},
      predicates: {},
      functions: {},
      variables: {value: '', locked: false, feedback: {type: null, message: ''}, parsed: [], object: new Map()},
      domain: {value: '', locked: false, feedback: {type: null, message: 'Doména nesmie byť prázdna'}, parsed: []},
   },
   expressions: {
      formulas: [],
      terms: []
   }
};

function root(state = defaultState, action) {
   if (action.type === 'IMPORT_APP') {
      try {
         state = JSON.parse(action.content);
         state.structureObject = new Structure(new Language());
         state.structure.variables.object = new Map();
      } catch (e) {
         console.error(e);
      }
   }
   let common = commonReducer(state.common, action);
   let language = languageReducer(state.language, action, state.structureObject);
   let structure = structureReducer(state.structure, action, state.structureObject);
   let expressions = expressionsReducer(state.expressions, action, state.structureObject, state.structure.variables.object);
   return {
      structureObject: state.structureObject,
      common: common,
      language: language,
      structure: structure,
      expressions: expressions
   }
}

export default root;