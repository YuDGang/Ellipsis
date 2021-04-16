/*
 * @Author: 梁洪刚
 * @CreatDate: 2021-03-31 13:57:32
 * @Describe: 省略号组件
 */

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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

	const [hasCopy, setHasCopy] = useState(false);
	const [copyAct, setCopyAct] = useState(false);

	const elementRef = useRef();

	useEffect(() => {
		getFinalElement();
	}, [elementRef.current]);

	const handleCopy = (innerText) => {
		copy(innerText);
		setHasCopy(!hasCopy);
		setTimeout(() => {
			setHasCopy(false);
			setCopyAct(!copyAct);
		}, 1000);
		setTimeout(() => {
			setCopyAct(!copyAct);
		}, 1280);
	};

	const addLines = (e) => {
		Object.assign(e.style, {
			"-webkit-line-clamp": _lines
		});
	};

	const handleVisibleChange = (visible, element) => {
		const { onVisibleChange } = props;
		onVisibleChange && onVisibleChange(visible);
		const showIcon = () => {
			// console.log(element);
		};
		const hideIcon = () => {

		};
		visible ? showIcon() : hideIcon();
	};

	const getFinalElement = () => {
		// get original element
		const element = elementRef.current;
		if (!element) return;

		// add lines or not
		_lines && addLines(element);

		// update element or not
		if (isEllipsisActive(element)) {
			let _element;
			if (_popover) {
				_element = <>
					<Popover
						{...props}
						content={content || children}
						onVisibleChange={(visible) => handleVisibleChange(visible, element)}
					>
						<div
							className={element.className}
							style={{ WebkitLineClamp: _lines }}
						>
							{children || content}
						</div>
					</Popover>
				</>;
			} else {
				_element = <>
					<Tooltip
						{...props}
						title={title || children}
					>
						<div
							className={element.className}
							style={{ WebkitLineClamp: _lines }}
						>
							{children || title}
						</div>
					</Tooltip>
				</>;
			}
			_element && ReactDOM.render(_element, element);
		};
	};

	const isWrap = () => {
		return _lines ? "ellipsis-wrap" : "ellipsis-nowrap";
	};

	const inner = typeof children === "string" ? children : (_popover ? content : title);

	return <>
		<div
			class="tnt-ellipsis"
			style={{
				...style,
				maxWidth: widthLimit
			}}
		>
			{prefix && prefix}
			<div
				ref={elementRef}
				class={`overflow ${isWrap()} ${className || ""}`}
			>
				{inner || emptyText}
			</div>
			{suffix && suffix}
			{
				inner && _copyable &&
				<>
					<CopySVG
						onClick={() => handleCopy(elementRef.current.innerText)}
						className={`${!hasCopy ? "button" : "button-hidden"} ${copyAct ? "button-active" : ""}`}
					/>
					<TickSVG
						className={hasCopy ? "button" : "button-hidden"}
						onClick={() => handleCopy(elementRef.current.innerText)}
					/>
				</>
			}
		</div>
	</>;
};

