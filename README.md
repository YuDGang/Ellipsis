# Ellipsis 省略号

根据限宽截断文本并显示省略号，进而添加 Tooltip/Popover 悬停效果以显示完整文本。旨在解决根据字符长度截断时不能很好的兼容中英文的问题。
        
## 更新日志
- 1.0.10 提升兼容性；
- 1.0.9 优化svg引入方式，消除columns.fixed中的闪动；
- 1.0.2 新增功能，**复制按钮**；
- 1.0.1 新增功能，**支持多行**；
- 1.0.0 以CSS宽度溢出驱动截断的Ellipsis发布，**支持单行**;  
...

## API  
兼容所有 **Ant3 Tooltip/Popover** 的参数；  
您可以直接使用这些参数以指定溢出后的 `Tooltip/Popover`  
此处仅列举笔者认为 **Ant3 Tooltip/Popover** 最常用的参数，完整参数请参考[官方文档](https://3x.ant.design/components/tooltip-cn/)
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| placement | 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | top
| arrowPointAtCenter | 箭头是否指向目标元素中心 | boolean | false
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | boolean | true  
    
除了支持 **Ant3 Tooltip/Popover** 参数以外，组件自带了一些实用的额外API：

|      参数         |       说明          |    类型        |
|      ----         |        ----         |      ----      |
|   Popover      |   指定溢出后悬停卡片的类型为 `Popover`，不使用则为默认值 `Tooltip`    |  |
|  emptyText |   空文本字符，缺省为空        |   string     |
|  widthLimit |   指定溢出宽度值，缺省则自适应为父元素width |   number &#124; string      |
| lines|  指定多行截断的最大行数，***可能在非Webkit内核浏览器中表现不稳定*** | number
| copyable|  显示复制按钮，缺省值为不显示，文本为空时亦不显示 | |
     
#### 其他参数
|      参数         |       说明          |    类型        |
|      ----         |        ----         |      ----      |
|  title |   当使用了 `Popover` 时，则用于指定 *卡片标题* ，否则用于指定 *卡片内容*，可省略，缺省值为元素文本 |   string    |
|  content |   当使用了 `Popover` 时，用于指定 *卡片内容*，同Popover，可省略，缺省值为元素文本 |   string    |
        
## 何时使用  
需要使文本元素在宽度溢出时显示省略号并添加悬停效果（Tooltip/Popover）时。
        
## 如何使用  
- 支持 `Popover` 和 `Tooltip` 两种悬停效果，[有什么区别?](https://3x.ant.design/components/popover-cn/#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8/ " Popover 和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。")；
- 当选用 `Popover` 时，将需要展示的内容放在 `content` 里（如例1），并添加 `Popover` 属性；
- 当选用 `Tooltip` 时，将需要展示的内容放在 `title` （如例2）或包含在标签里（如例3）；
- -----
- 为什么不使用统一的属性传递展示的内容？  因为 antd3 中的 `Popover` 和 `Tooltip` 的属性是有区别的， `Popover` 用 `title` 作卡片标题， `content` 作卡片内容，而 `Tooltip` 仅用 `title` 作卡片内容（形似 Html 的 title 属性），不支持标题功能；具体请参考 [Ant3-Popover](https://3x.ant.design/components/popover-cn/) 和 [Ant3-Tooltip](https://3x.ant.design/components/tooltip-cn/)
- 相应的，你可以直接使用`Popover`和`Tooltip`的API（如例4）；转换一下思维，你可以把它当作带有***省略号、空文本、复制按钮*** 的强化版 `Popover/Tooltip` 使用；
- 利用好 `emptyText` 属性，在 Table 中直接作为 render 中的父元素（例5）；
- ---- 
- 根据需求添加下列选填项
- 添加 `copyable` 属性后，会在右侧添加一个复制按钮，
- 添加 `lines` 指定多行限制，仅在需要多行功能时使用，
- 添加 `widthLimit` 属性以增加限制宽度，若不添加则会受父元素宽度限制，
- 添加 `emptyText` 指定数据为空时的文本，例如 `emptyText="- -"`
        
## 代码演示
``` javascript
import Ellipsis from "@tntx/ellipsis";

export default () => {
  <>
		{/* 例 1 */}
		<Ellipsis
			Popover
			widthLimit={100}
			content="你看我有省略号吗？"
		/>
		
		<div style={{width: 100}}>

			{/* 例 2 */}
			<Ellipsis title="你看我有省略号吗？"/>

			{/* 例 3 */}
			<Ellipsis>
				你看我有省略号吗？
			</Ellipsis>
			
			{/* 例 4 */}
			<Ellipsis
				placement="topLeft"
			>
				你看我有省略号吗？
			</Ellipsis>
		</div>
	</>
};


{/* 例 5 */}
...
const columns = [
	{
		title: "详细内容",
		render: record => <Ellipsis
			title={record.description}
			emptyText="- -"
			lines={3}
			copyable
		/>
	}
	...
]
...
```
