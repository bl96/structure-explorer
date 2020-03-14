import * as React from 'react';
import { BinaryLabelModel } from './BinaryLabelModel';
import styled from '@emotion/styled';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import {BinaryNodeModel} from "./binaryNodeLabel/BinaryNodeModel";
import {ADDPORT, INPORT, OUTPORT} from "../../nodes/ConstantNames";
import _ from "lodash";
import { PortWidget } from '../../PortWidget';
import {BinaryLinkModel} from "../../links/binary/BinaryLinkModel";
import {BinaryLinkWidget} from "../../links/binary/BinaryLinkWidget";

export interface BinaryLabelWidgetProps {
	model: BinaryLabelModel;
	node: BinaryNodeModel;
	engine: DiagramEngine;
	/*setDomain:any;
	changeDomain:any;
	removeDomainNode:any;*/
	name?:string;
	size?: number;
}

export const Node = styled.div`
		pointer-events: all;
		width:100%;
		height:100%;
		background-color: yellow;
		border-radius: 5px;
		font-family: sans-serif;
		color: black;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2.5px black;
	`;

export const PortLabel = styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;

export const Label = styled.div`
		padding: 0 5px;
		flex-grow: 1;
	`;

export const Port = styled.div<{ width: number; height: number }>`
		//width: ${p => p.width}px;
		min-width:2em;
		width:100%;
		height: ${p => p.height}px;
		background: rgba(white, 0.1);
		color: black;
		text-align:center;

		&:hover {
			background: #00ff80;
		}
	`;

export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

export const PortsContainer = styled.div`
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;

interface BinaryNodeWidgetState {
	renameActive?:boolean;
	titleChanged?:boolean;
	nodeName?:string;
}

export class BinaryLabelWidget extends React.Component<BinaryLabelWidgetProps,BinaryNodeWidgetState> {
	counter: number;

	constructor(props: BinaryLabelWidgetProps) {
		super(props);

		/*this.state={
			renameActive:false,
			titleChanged:false,
			nodeName:this.props.node.getOptions().name
		};*/

		this.counter = 0;
	}

	generatePort = (port: any) => {
		if (![ADDPORT, INPORT, OUTPORT].includes(port.options.name)) {
			return (
				//<UnBinaryPortLabelWidget engine={this.props.engine} port={port} width={this.props.node.getOptions().name.length*10}/>
				/*<PortWidget engine={this.props.engine} port={this.props.node.getPort(port.options.name)}>*/
					<Port onDoubleClick={() => {
						this.props.model.node.removePort(port);
						this.props.engine.repaintCanvas();
						this.forceUpdate();

					}} height={20} width={this.props.node.getOptions().name.length * 10}>{port.options.name}</Port>
				/*</PortWidget>*/
			)
		}
	};

	/*cancelRenameNode(){
		this.setState({renameActive:false,nodeName:this.props.node.getNodeName()});
	}

	renameNode(){
		this.props.node.setLocked(false);

		if(this.state.nodeName!==this.props.node.getNodeName()){
			//call redux store

			let state = this.props.changeDomain(this.state.nodeName,this.props.node.getNodeName());
			this.props.node.renameNode(this.state.nodeName);
		}
		this.setState({renameActive:false});
	}*/

	/*render() {
		return <LabelL onClick={() => {
			console.log("Clicked");
			this.counter+=1;
			this.forceUpdate();
		}}>{this.counter}</LabelL>;
	}*/

	render() {
		return (
			<Node
				data-basic-node-name={this.props.name}
				selected={this.props.node.isSelected()}
				background={this.props.node.getOptions().color}
			>
				<Ports>
					<PortsContainer>
						{_.map(this.props.node.getPorts(), this.generatePort)}
							<Port onClick={() => {
								this.props.node.addNewPort(`Predicate${this.props.node.numberOfPorts}`);
								this.forceUpdate();
							}}
								  height={20} width={this.props.node.getOptions().name.length * 10}>{ADDPORT}</Port>
					</PortsContainer>
				</Ports>
			</Node>)
	}
}