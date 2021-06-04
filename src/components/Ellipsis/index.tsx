/*
 * @Author: 梁洪刚
 * @CreatDate: 2021-03-31 13:57:32
 * @Describe: 省略号组件
 */

/*
 * @Author: 梁洪刚
 * @CreatDate: 2021-03-31 13:57:32
 * @Describe: 省略号组件
 */

import { FC, useState, useEffect, useRef, ReactNode } from "react";
import type { TooltipProps } from "antd/lib/tooltip";
import type { PopoverProps } from "antd/lib/popover";
import { Popover, Tooltip } from "antd";
import copy from "copy-to-clipboard";
import CopySVG from "./Svg/CopySVG";
import TickSVG from "./Svg/TickSVG";
import "./index.less";

type BaseType = () => void | ReactNode | string | number;

type Props = {
	popover ?: Boolean, // `Popover` or `Tooltip` ?
	title ?: BaseType,	// in most cases for `Tooltip`
	content ?: BaseType, 	// in most cases for `Popover`
	className?: BaseType,
	style?:BaseType,
	widthLimit?:number | string,	// width trigger value
	lines?: number,	// number or lines, default 1 line;
	children?: BaseType,	// children Node
	emptyText?:()=>void | string | number,	// default: null
	copyable?:Boolean,	// copy function
	prefix?:any,	// 前缀dom
	suffix ?:any	// 后缀dom
}

const tolerance = 2; // In px. Depends on the font you are using

const isEllipsisActive = (e) => {
	return e.offsetWidth + tolerance < e.scrollWidth || e.offsetHeight < e.scrollHeight;
};

const Ellipsis: FC<TooltipProps & PopoverProps & Props> = (props) => {
	const {
		popover,
		title,
		content,
		className,
		style,
		widthLimit,
		lines,
		children,
		emptyText,
		copyable,
		prefix,
		suffix
	} = props;

	const _lines = lines !== 1 && lines;

	// allow visible or not state
	const [flag, setFlag] = useState(true);
	// visible[Tooltip/Popover] state
	const [tipVisible, setTipVisible] = useState(false);
	// copy animation state
	const [hasCopy, setHasCopy] = useState(false);

	const elementRef = useRef();

	useEffect(() => {
		elementRef.current && isEllipsisActive(elementRef.current)
			? setFlag(true)
			: (
				setFlag(false),
				setTipVisible(false)
			);
	});

	// original Node
	const inner = typeof children === "string" ? children : (popover ? content : title);

	// for className
	const getClassName = () => {
		return `overflow ${_lines ? "ellipsis-wrap" : "ellipsis-nowrap"} ${className || ""}`;
	};

	// Tooltip.trigger(default 'hover') ==trigger==> onVisibleChange(visible)
	const handleVisibleChange = (visible) => {
		// const { onVisibleChange } = props;
		// onVisibleChange(visible);
		flag && setTipVisible(visible);
	};

	// onClick Copy Button
	const handleCopy = (innerText) => {
		copy(innerText);
		setHasCopy(!hasCopy);
		setTimeout(() => {
			setHasCopy(false);
		}, 1000);
	};

	const renderNode = () => {
		const popoverNode = (
			<Popover
				{...props}
				content={content || children}
				visible={tipVisible}
				onVisibleChange={(visible) => handleVisibleChange(visible)}
			>
				<div
					className={className}
					style={{ WebkitLineClamp: _lines }}
					ref={elementRef}
				>
					{children || content}
				</div>
			</Popover>
		);

		const tooltipNode = (
			<Tooltip
				{...props}
				title={title || children}
				visible={tipVisible}
				onVisibleChange={(visible) => handleVisibleChange(visible)}
			>
				<div
					className={className}
					style={{ WebkitLineClamp: _lines }}
					ref={elementRef}
				>
					{children || title}
				</div>
			</Tooltip>
		);

		return popover ? popoverNode : tooltipNode;

	};

	return <>
		<div
			className="tnt-ellipsis"
			style={{
				...style,
				maxWidth: widthLimit
			}}
		>
			{/* prefix */}
			{prefix && prefix}
			{/* content */}
			<div
				className={getClassName()}
			>
				{inner ? renderNode() : emptyText}
			</div>
			{/* suffix */}
			{suffix && suffix}
			{/* copyable button */}
			{
				inner && copyable &&
				<div
					className='svg-button'
					onClick={() => handleCopy(elementRef.current?.innerText)}
				>
					{
						!hasCopy
							? <CopySVG />
							: <TickSVG />
					}
				</div>
			}
		</div>
	</>;
};

export default Ellipsis;

