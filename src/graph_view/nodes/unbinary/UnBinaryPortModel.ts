import {LinkModel, PortModelAlignment, PortModel} from '@projectstorm/react-diagrams';
import _ from "lodash";
import {BinaryLinkModel} from "../../links/binary/BinaryLinkModel";
import {UnBinaryNodeModel} from "./UnBinaryNodeModel";
import {ADDPORT} from "../ConstantNames";


export class UnBinaryPortModel extends PortModel {
	constructor(name: string) {
		super({
			type: 'unbinary',
			name: name,
			alignment: PortModelAlignment.LEFT
		});
	}

	setPortAlignment(alignment:PortModelAlignment){
		this.options.alignment = alignment;
	}

	createLinkModel(): LinkModel {
		if(this.getMaximumLinks()=== 0){
			return null;
		}
		return new BinaryLinkModel();
	}

	removeBadLink(){
		for (let link of _.values(this.getLinks())) {
			if (link.getSourcePort() !== null && link.getTargetPort() === null) {
				link.remove();
			}
		}
	}

	canLinkToPort(port: PortModel): boolean {
		for (let link of _.values(this.getLinks())) {
			if (link.getSourcePort() === this && link.getTargetPort() === port) {
				return false;
			}
		}

		if (this.getParent() === port.getParent()) {
			return this !== port;
		}

		else if(port.getName() === ADDPORT){
			return false;
		}

		else if(port.getParent().getOptions().type==='constant') {
			return true;
		}

		return true;
	}

	addLink(link: LinkModel) {
		this.links[link.getID()] = link;
	}

}
