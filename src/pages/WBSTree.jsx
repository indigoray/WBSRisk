import * as React from "react";
import * as ReactDOM from "react-dom";
import { TreeView } from "@progress/kendo-react-treeview";
const tree = [
  {
    text: "도로",
    expanded: true,
    items: [
      {
        text: "토공",
        expanded: true,
        items: [
           {
               text:"본선",
               expanded: true,
                items: [
                    {
                        text:"100~1000",
                    },
                    {
                        text:"1000~2000",                        
                    },
                    {
                        text:"20000~30000",
                    },
                    {
                        text:"30000~40000",                        
                        expanded:true,
                        items:[
                            {
                                text:"흙깍기",
                                expanded:true,
                                items:[
                                    {text: "토사"},
                                    {text: "리핑"},
                                    {text: "발파"},
                                    {text: "흙깍기 기타"},
                                ]
                            },
                            {
                                text:"흙쌓기",
                                expanded:true,
                                items:[
                                    {text: "노체"},
                                    {text: "노상"},
                                    {text: "흙깍기 기타"},
                                ]
                            },
                            {
                                text:"토공기타",
                                expanded:true,
                                items:[
                                    {text: "비탈면보호공"},
                                    {text: "연약지반처리"},
                                    {text: "보강토옹벽"},
                                    {text: "콘크리트옹벽"},
                                    {text: "옹벽기타"},
                                    {text: "토공기타"},
                                ]
                            },                              
                        ]
                    },
                ],
           },
           {
               text:"상행",
           },           
        ],
      },     
    ],
  },  
];

const WBSTree = () => {
  const onItemClick = (event) => {
    event.item.selected = !event.item.selected;
  };

  const onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;
  };
  const onCheckChange = (event) => {
    event.item.checked = !event.item.checked;
  };

  return (
    <TreeView
      data={tree}
      expandIcons={true}
      onExpandChange={onExpandChange}
      checkboxes={true}
      aria-multiselectable={false}
      onItemClick={onItemClick}
      onCheckChange={onCheckChange}
    />
  );
};
export default WBSTree;