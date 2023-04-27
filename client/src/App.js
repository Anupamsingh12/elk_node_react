import logo from './logo.svg';
import { Space, Table, Tag, Input, Button, Modal } from 'antd';
import { PlusOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [content, setContent] = useState();
  const [total, setTotal] = useState(0);
  const [tags,setTags] = useState([]);
  const [searcht,setSearcht] = useState('');
  const [visible,setVisible] = useState(false);
  const { Search } = Input;

  const fetchData = async () => {
    fetch('http://localhost:3001/elk/all').then(response => {
      return response.json();
    }).then(data => {
      setTotal(data?.hits?.total?.value)
      const data1 = data?.hits?.hits.map((item) => {
        return item._source
      })
      setContent(data1);
    })
      .catch(error => {
        console.log(error);
      });
  };
  const addTags=(data)=>{
    let field=document.getElementById('field').value;
    let operator=document.getElementById('operator').value;
    let value=document.getElementById('value').value;
    document.getElementById('field').value='';
    document.getElementById('operator').value='';
    document.getElementById('value').value='';
    setTags(() => [...tags,`${field} ${operator} ${value}`]);
    setSearcht();
    let f =`${field}=${operator}`
    let obj = {}
    obj[`${f}`]=value
    //call search api..
    fetch('http://localhost:3001/elk/filter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  
  body: JSON.stringify({obj})
})
.then(response => {
  return response.json();
})
.then(data => {
  setTotal(data?.hits?.total?.value);
  const data1 = data?.hits?.hits.map((item) => {
    return item._source;
  });
  setContent(data1);
})
.catch(error => {
  console.log(error);
});
    
  }
  const removeLast=()=>{
    let p = [...tags];
    p.pop();
    setTags(p)
    
  }

  useEffect(() => {
    fetchData();
  }, []);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    addTags();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = (e) => {
    fetch(`http://localhost:3001/elk/search?search=${e}`).then(response => {
      return response.json();
    }).then(data => {
      setTotal(data?.hits?.total?.value)
      const data1 = data?.hits?.hits.map((item) => {
        return item._source
      })
      setContent(data1);
    })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
    { title: 'Type',width:100, dataIndex: 'Type' },
    { title: 'Start_Time',width:50, dataIndex: 'Start_Time' },
    { title: 'Finish_Time',width:100, dataIndex: 'Finish_Time' },
    { title: 'Oper_Time',width:100, dataIndex: 'Oper_Time' },
    { title: 'ID',width:100, dataIndex: 'ID' },
    { title: 'ID_Parent_Record',width:100, dataIndex: 'ID_Parent_Record' },
    { title: 'ID_Session_From',width:100, dataIndex: 'ID_Session_From' },
    { title: 'ID_Session_To',width:100, dataIndex: 'ID_Session_To' },
    { title: 'Duration',width:100, dataIndex: 'Duration' },
    { title: 'ContentType',width:100, dataIndex: 'ContentType' },
    { title: 'Source',width:100, dataIndex: 'Source' },
    { title: 'InfoDBServer',width:100, dataIndex: 'InfoDBServer' },
    { title: 'Mode',width:100, dataIndex: 'Mode' },
    { title: 'Name_DB',width:100, dataIndex: 'Name_DB' },
    { title: 'String',width:100, dataIndex: 'String' },
    { title: 'IDInfoBuffer',width:100, dataIndex: 'IDInfoBuffer' },
    { title: 'FileLen',width:100, dataIndex: 'FileLen' },
    { title: 'TerminalID',width:100, dataIndex: 'TerminalID' },
    { title: 'TerminalID_To',width:100, dataIndex: 'TerminalID_To' },
    { title: 'MessageType',width:100, dataIndex: 'MessageType' },
    { title: 'IDEntryPoint',width:100, dataIndex: 'IDEntryPoint' },
    { title: 'CRC_OK',width:100, dataIndex: 'CRC_OK' }
  ];
  
  return (
    
    <div className="App" >
      
      <p>total:{total}</p>
      <Search style={{ marginBottom: "10px" }} enterButton onChange={(e)=>{setSearcht(e.target.value);handleSearch(e.target.value)}} placeholder='Enter a Text'  onSearch={(e)=>{handleSearch(e)}}/>
      <div id="filterDiv" style={{ display: "flex", justifyContent: "left" }}>
        <div style={{ marginLeft: "14px" }} onClick={()=>{setVisible(true)}}><PlusCircleOutlined /></div> <span style={{ marginLeft: "14px" }}></span> <div onClick={()=>{removeLast()}}><DeleteOutlined  /> </div><span style={{ marginLeft: "24px" }}></span>
         {tags?.map((item,i)=>{return(
          <Tag key={i} color="#108ee9">{item}</Tag>
        )})}</div>
      <Table style={{ overflowX: "scroll",overflowY:"scroll", maxHeight:"500px" }} columns={columns} dataSource={content} />
      <Modal
        title="Filter"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex"}}>
        <input id="field" placeholder='enter field'></input>
        <select id='operator'>
          <option value='is' selected>IS</option>
          <option value='isNot'>IS NOT</option>
          <option value='like'>LIKE</option>
        </select>
        <input id="value" placeholder='enter value'></input>
        </div>
      </Modal>
    
    </div>
  );
}

export default App;
