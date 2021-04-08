import { Table } from "antd";
import Ellipsis from "@/components/Ellipsis";

const dataSource = [
	{
		"id": "000-0",
		"createUser": "admin"
		// "long": "未超宽"
	}, {
		"id": "000-1",
		"createUser": "admin",
		"long": "正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,"
	}, {
		"id": "000-2",
		"createUser": "admin",
		"long": "long but not over width longlonglonglonglonglonglong"
	}
];

const columns = [
	{
		title: "版本",
		width: "330px",
		fixed: "left",
		render: record => <Ellipsis
			widthLimit="100px"
			emptyText="- -"
			// lines={3}
			title={record.long}
			copyable
			// title={record.long}
		>
			<div>
				复杂
				<div>
					record.long
				</div>
				<p>
					{record.long}
				</p>
			</div>
		</Ellipsis>

	},
	{
		width: "300px"
	},
	{
		title: "标识",
		width: "300px",
		render: record => <Ellipsis
			title={record.long}
			emptyText="--"
			copyable
	  	>
			<a target="_blank" href={"www.baidu.com"}>{record.long}</a>
	  	</Ellipsis>

	}, {
		title: "名称",
		width: "300px",
		dataIndex: "parentName"
	}, {
		title: "操作",
		width: "300px",
		fixed: "right"
	}
];

export default () => {
	return (
		<>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={dataSource}
				scroll={{"x": "1100"}}
			/>
			{/* 多行 */}
			<div style={{background: "red", width: "100px", height: "100px"}}>
				<Ellipsis
					title="titletitletitletitletitletitletitle"
					Popover
				/>
			</div>
		</>
	);
};
