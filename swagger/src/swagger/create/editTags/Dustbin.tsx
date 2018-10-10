import * as React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import ModelList from '../../components/create/components/modelList';
const TabPane = Tabs.TabPane;

const style: React.CSSProperties = {
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	height:"100%"
}

const dustbinTarget = {
	drop(props: DustbinProps, monitor: DropTargetMonitor) {
		props.onDrop(monitor.getItem())
	},
}

export interface DustbinProps {
	accepts: string[]
	canDrop?: boolean
	model?: any
	isOver?: boolean
	connectDropTarget?: ConnectDropTarget
	onDrop: (item: any) => void
}

@DropTarget(
	(props: DustbinProps) => props.accepts,
	dustbinTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)
export default class Dustbin extends React.Component<DustbinProps> {
	public render() {
		const {
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
			model,
		} = this.props
		const isActive = isOver && canDrop

		let backgroundColor = ''
		if (isActive) {
			backgroundColor = '#e6e6e6'
		}
		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={{ ...style, backgroundColor }}>
					{model && (
						<ModelBody/>
					)}
				</div>,
			)
		)
	}
}
@observer
class ModelBody extends React.Component<any, any> {
    render() {
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Table" key="1">
                    <ModelList type="columns" />
                </TabPane>
                <TabPane tab="Search" key="2">
                    <ModelList type="search" />
                </TabPane>
                <TabPane tab="Add" key="3">
                    <ModelList type="install" />
                </TabPane>
                <TabPane tab="button" key="4">
                    <ModelList type="btn" />
                </TabPane>
            </Tabs>
        );
    }
}
