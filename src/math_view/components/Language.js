import React from 'react';
import Card from "react-bootstrap/Card";
import HelpButton from "../buttons/HelpButton";
import TextComponent from "../components_parts/TextComponent";

const help = (
    <div className="collapse" id="help-language">
     <div className="well">
       Tu sa definuje jazyk. <strong>Symboly konštánt</strong> sa definujú oddelene
       čiarkou. <strong>Symboly predikátov</strong> sa definujú oddelené čiarkami, vo
       formáte <code>predikat/arita</code>. <strong>Symboly funkcií</strong> sa definujú oddelené čiarkami, vo
       formáte <code>funkcia/arita</code>.
     </div>
   </div>
);

const Language = (props) => (
   <Card className={"no-border-radius"}>
     <Card.Header as="h5" className={"d-flex justify-content-between"}>
         <span>Jazyk 𝓛</span>
         <HelpButton dataTarget={"#help-language"}/>
     </Card.Header>
     <Card.Body>
       {help}
       <TextComponent labelText={"Symboly konštánt"}
                      errorProperty={props.language.constants.errorMessage}
                      onChangeSetFunction={props.setConstants}
                      onLockFunction={props.lockConstants}
                      textData={props.language.constants}
                      textInputLabel={<span>𝓒<sub>𝓛</sub> = &#123;</span>}
                      teacherMode={props.teacherMode}
                      idName={'language-editor-constants'}
                      placeholderText={'a, b, c, ...'}
       />

       <TextComponent labelText={"Predikátové symboly"}
                      errorProperty={props.language.predicates.errorMessage}
                      onChangeSetFunction={props.setPredicates}
                      onLockFunction={props.lockPredicates}
                      textData={props.language.predicates}
                      textInputLabel={<span>𝓟<sub>𝓛</sub> = &#123;</span>}
                      teacherMode={props.teacherMode}
                      idName={'language-editor-predicates'}
                      placeholderText={"likes/2, hates/2, man/1, ..."}
       />

       <TextComponent labelText={"Funkčné symboly"}
                      errorProperty={props.language.functions.errorMessage}
                      onChangeSetFunction={props.setFunctions}
                      onLockFunction={props.lockFunctions}
                      textData={props.language.functions}
                      textInputLabel={<span>𝓕<sub>𝓛</sub> = &#123;</span>}
                      teacherMode={props.teacherMode}
                      idName={'language-editor-functions'}
                      placeholderText={'mother/1, father/1, ...'}
       />

     </Card.Body>
   </Card>
);

export default Language;