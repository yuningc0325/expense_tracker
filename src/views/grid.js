	// -----------------资源表格开始grid-------------------
	jQuery("#jqGrid").jqGrid({ 
		url : 'api/profiles/',// 请求的URL地址，这个就涉及struts2的知识了，不过也可以用servlet的url
		datatype : "json",// 服务器返回的数据类型，常用的是xml和json两种
		colNames : ['', 'ID','资源名称','资源职能','资源描述','资源路径'], //这里是表格头
		colModel : [{
					name : 'id',			//json对应的名称		
					width : 35,
					hidden : false,               //是否隐藏
					editable : true,
  					sortable :false,
 					align : "center",
					editoptions : {
 					size : 2
					}
 				}, {
 					name : 'id',
					index : 'SYS_RES_ID',
					width : 35,
					align : "center",
					editable : true,
					 sortable :false,
					editoptions : {
					size : 2
 					}
				},  {
					name : 'name',
 					width : 100,
					editable : true,
					 sortable :false,
					align : "center",
					editoptions : {
					size : 25
					}
			  	},{
					 name : 'task',
					width : 35,					
					editable : true,
					align : "center",
 					sortable :false,
					editoptions : {
					size : 100
					}
 				}
				,{
					name : 'descript',				
					 width : 250,
					editable : true,
 					align : "center",					
 					editoptions : {
 					size : 100
					 }
 				},{
 					name : 'url',
					 width : 250,
 					//hidden : true,
					 editable : true,
 					align : "center",
 					sortable :false,
					editoptions : {
					size : 100
					}
				}
 
		],
		rownumbers : true, //是否显示右
		rowNum : 10, // 默认的每页显示记录条数
		rowList : [10, 20, 30],// 可供用户选择的每页显示记录条数。
		pager : '#pagernav',// 导航条对应的Div标签的ID,注意一定是DIV，不是Table
		sortname : 'SYS_RES_ID',// 默认的查询排序字段
		viewrecords : true,// 定义是否在导航条上显示总的记录数
		autowidth : true,
		sortorder : "asc", // 默认的排序规则
		ondblClickRow : function(rowid) { // 双击行
			alerts(rowid);
		},
		onRightClickRow : function(rowid) {// 右键单击
       //	alerts(jQuery("#resourceTable").rowNum);
		},
		onSelectRow : function(rowid) {// 左键单击
		},
		//caption : "", // 显示表格的表名称
        //		multiselect : true,
//		toolbar : [true, "top"],
		jsonReader : {
			root : 'list',// 注意这里 详细请到官方查看
			total : 'totalPage', // 总页数
			page : 'page', // 页码
			records : 'totalSize', // 总记录数
			id : "id",
			repeatitems : false
			// 注意这个属性的取值 详细请到官方查看
		},
		height : 250
	});
	//导航条 包括分页/增删改查 功能 ,此处不需要它自带的 所以设为false
	//只留刷新按钮
	jQuery("#resourceTable").jqGrid('navGrid', '#pagernav', {
				edit : false,
				add : false,
				del : false,
				search : false
	});
