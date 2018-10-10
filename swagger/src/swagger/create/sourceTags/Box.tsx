import * as React from 'react'
import {
	DragSource,
	ConnectDragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	cursor: 'move',
}

const boxSource = {
	beginDrag(props: BoxProps) {
		return props.model
	},
}

export interface BoxProps {
	model: string
	type: string
	connectDragSource?: ConnectDragSource
	isDragging?: boolean
	isDropped?: boolean
}
@DragSource(
	(props: BoxProps) => props.type,
	boxSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)
export default class Box extends React.Component<BoxProps> {
	public render() {
		const { model, isDropped, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return (
			connectDragSource &&
			connectDragSource(
				<div style={{ ...style, opacity }}>
				{this.props.children}
				</div>,
			)
		)
	}
}
