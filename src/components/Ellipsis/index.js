/*
 * @Author: 梁洪刚
 * @CreatDate: 2021-03-31 13:57:32
 * @Describe: 省略号组件
 */

import { useState, useEffect, useRef } from "react";
import { Popover, Tooltip } from "antd";
import copy from "copy-to-clipboard";
import CopySVG from "./Svg/CopySVG";
import TickSVG from "./Svg/TickSVG";
import "./index.less";

const tolerance = 2; // In px. Depends on the font you are using

const isEllipsisActive = (e) => {
	return e.offsetWidth + tolerance < e.scrollWidth || e.offsetHeight < e.scrollHeight;
};

export default props => {
	let {
		_popover = props.Popover, // `Popover` or `Tooltip` ?
		title,	// in most cases for `Tooltip`
		content, 	// in most cases for `Popover`
		className,
		style,
		widthLimit,	// width trigger value
		_lines = props.lines !== 1 && props.lines,	// number or lines, default 1 line;
		children,	// children Node
		emptyText,	// default: null
		_copyable = props.copyable,	// copy function
		prefix,	// 前缀dom
		suffix 	// 后缀dom
	} = props;

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
	const inner = typeof children === "string" ? children : (_popover ? content : title);

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

		return _popover ? popoverNode : tooltipNode;

	};

	return <>
		<div
			class="tnt-ellipsis"
			style={{
				...style,
				maxWidth: widthLimit
			}}
		>
			{/* prefix */}
			{prefix && prefix}
			{/* content */}
			<div
				class={getClassName()}
			>
				{inner ? renderNode() : emptyText}
			</div>
			{/* suffix */}
			{suffix && suffix}
			{/* copyable button */}
			{
				inner && _copyable &&
				<div
					class='svg-button'
					onClick={() => handleCopy(elementRef.current.innerText)}
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

