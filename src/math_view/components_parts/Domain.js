import {Col} from "react-bootstrap";
import React from "react";
import TextComponent from "./TextComponent";

function Domain({structure,setDomain,lockDomain,teacherMode}) {
    return (
        <Col>
        <TextComponent onChangeSetFunction={setDomain}
                       errorProperty={structure.domain.errorMessage} textInputLabel={<span><var>M</var> = &#123;</span>} onLockFunction={lockDomain} textData={structure.domain} teacherMode={teacherMode} idName={'language-editor-domain'} placeholderText={'1, 2, 3, 🐶, ...'} labelText={"Doména"}>
        </TextComponent>
        </Col>
    )
}

export default Domain;