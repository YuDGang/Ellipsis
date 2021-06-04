import { useState } from "react";
import { Button, Table, Tag } from "antd";
import Ellipsis from "Ellipsis";

const dataMock1 = [
	{
		"id": "000-0",
		"createUser": "admin"
		// "long": "未超宽"
	}, {
		"id": "000-1",
		"createUser": "admin",
		"long": "正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,"
	},
	{
		"id": "000-2",
		"createUser": "admin",
		"long": "[短文本]"
	}
];

const dataMock2 = [
	{
		"id": "000-0",
		"createUser": "admin"
		// "long": "未超宽"
	}, {
		"id": "000-1",
		"createUser": "admin",
		"long": "[修改]正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,"
	},
	{
		"id": "000-2",
		"createUser": "admin",
		"long": "[长文本]long but not over width longlonglonglonglonglonglong"
	}
];

const dataMock3 = [
	{
		"id": "000-0",
		"createUser": "admin"
		// "long": "未超宽"
	}, {
		"id": "000-1",
		"createUser": "admin",
		"long": "[修改]正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,正好超过宽度的一串汉字长字符,"
	},
	{
		"id": "000-2",
		"createUser": "admin",
		"long": "[修改后的长文本]long but not over width longlonglonglonglonglonglong"
	}
];

export default () => {
	const [dataSource, setDataSource] = useState(dataMock1);

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
			width: "300px",
			render: record => <Ellipsis
				// widthLimit="100px"
				emptyText="- -"
				// title={record.long}
				copyable
				prefix={null}
				suffix={<Tag color="#f50">#f50</Tag>}
			>
				{record.long}
			</Ellipsis>
		},
		{
			title: "标识",
			width: "300px",
			render: record => <Ellipsis
				title={record.long}
				lines={3}
				emptyText="--"
				copyable
				suffix={<Tag color="#f50">#f50</Tag>}
			>
				<a target="_blank" href={"www.baidu.com"}>{record.long}</a>
			</Ellipsis>

		}, {
			title: "名称",
			width: "300px",
			render: record => <Ellipsis
				title={record.long}
				emptyText="--"
				copyable
			/>
		}, {
			title: "操作",
			width: "300px"
		}
	];

	return (
		<>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={dataSource}
				scroll={{ "x": "1100" }}
			/>
			<Button onClick={() => setDataSource(dataMock1)}>短文本</Button>
			<Button onClick={() => setDataSource(dataMock2)}>长文本</Button>
			<Button onClick={() => setDataSource(dataMock3)}>长文本</Button>
		</>
	);
};
