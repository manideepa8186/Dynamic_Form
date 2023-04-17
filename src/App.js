import { useState } from "react";
import "./App.css"

function App() {
  
  let Dummydata = [
    { type: 'string', value: 'FirstName',required:true },
    { type: 'string', value: 'LastName',required:true },
    { type: 'Object', value: 'Person',required:true, data: [{ type: 'string', value: 'Name',required:true }, { type: 'boolean', value: 'IsMarried',required:true },
    { type: 'Number', value: 'Age',required:true },{ type: 'Object', value: 'Address',required:true, data: [{ type: 'Number', value: 'House No',required:true },{type:'string',value:'Locality',required:true}]},
    ] },
    { type: 'string', value: 'addName',required:false}, 
  ];

  const [data,setData]=useState(Dummydata)

  const [ShowFieldName, setShowFieldName] = useState(new Map())

  const UpdateSelectedName = (id,value) =>{
    let CurrentData= [...data]
    console.log(CurrentData)
    if(id.length===1)
    {
      CurrentData[+id].type=value
      if(value==='Object'){
        CurrentData[+id].data=[]
      }
      setData(CurrentData)
    }
    else{
      if(typeof id ==='string'){
        let Ids=[...id]
        let obj= CurrentData[Ids[0]]
        for(let i=1;i<Ids.length-1;i++){
            obj= obj.data[Ids[i]]
          }
        let lastIndex= +Ids.slice(-1)[0]

        obj.data[lastIndex ].type=value
        if(value==='Object'){
          obj.data[lastIndex].data=[]
        }
        setData(CurrentData)
      }
      else{
        console.log("Else if else",CurrentData)
        setData([...CurrentData,{type:value,value:"Add"+value}])
      } 
  }
  }

  const UpdateRequiredField = (id) =>{
    let CurrentData= [...data]
    
    if(id.length==1)
    {
      CurrentData[+id].required=!CurrentData[+id].required
      setData(CurrentData)
    }
    else{
      let Ids=[...id]
      let CurrentData= [...data]
      let obj= CurrentData[Ids[0]]
      for(let i=1;i<Ids.length-1;i++){
          
          obj= obj.data[Ids[i]]
        }
      let lastIndex= +Ids.slice(-1)[0]
      obj.data[lastIndex ].required=!obj.data[lastIndex ].required
     
      setData(CurrentData)
      
  }

  }

  const UpdateFieldValue = (id,value) =>{

    // console.log(value)
    let CurrentData= [...data]
    if(id.length==1)
    {
      CurrentData[+id].value=value
      setData(CurrentData)
    }
    else{
      let Ids=[...id]
      let CurrentData= [...data]
      let obj= CurrentData[Ids[0]]
      for(let i=1;i<Ids.length-1;i++){
          
          obj= obj.data[Ids[i]]
        }
      let lastIndex= +Ids.slice(-1)[0]
      obj.data[lastIndex ].value=value

      setData(CurrentData)
      
  }
    
  }

  const ToggleShowFieldName = (id) =>{
    // console.log(id,ShowFieldName)
    // UpdateField(id)
    const val =ShowFieldName.get(id,'')
    // console.log(!val)
    setShowFieldName((prev)=>new Map(prev.set(id,!val)))
    
  }


  const AddField = (id) =>{
    console.log(id)
    let Field = {type:'string', value:'addName',required:false}
    if(!id)
      setData((prev)=>[...prev,Field])
    else{
      let CurrentData= [...data]
      if(id.length===1){
        if(CurrentData[+id].data)
        CurrentData[+id].data.push(Field)
        else
        CurrentData[+id].data=[Field]
        setData(CurrentData)
      }
      else{
      let Ids=[...id]
      let obj= CurrentData[Ids[0]]
      for(let i=1;i<Ids.length-1;i++){
          obj= obj.data[Ids[i]]
        }
      //console.log("Last Obj",obj)
      let lastIndex= +Ids.slice(-1)[0]
      // console.log("LIndex",lastIndex)
      console.log(obj.data[lastIndex].data)
      if(obj.data[lastIndex].data)
        obj.data[lastIndex ].data.push(Field)
      else
      obj.data[lastIndex ].data=[Field]
      // 
      console.log(obj)
      setData(CurrentData)
    }
  }
}

const DeleteField = (id) =>{
  console.log(id)
  if(id.length===1){
  const FilteredData= data.filter((item,index)=>index!==+id)
  console.log(FilteredData)
  setData([...FilteredData])
  }
  else{
    let Ids;
    let CurrentData= [...data]
      if(typeof id ==='string')
        {
          Ids=[...id]
          console.log(Ids)
          let obj= CurrentData[Ids[0]]
          for(let i=1;i<Ids.length-1;i++)
              obj= obj.data[Ids[i]]
          console.log("Last Obj",obj)
          let lastIndex= +Ids.slice(-1)[0]
          console.log("LIndex",lastIndex)
          console.log(obj.data)
          const FilteredData= obj.data.filter((item,index)=>index!==lastIndex)
          console.log(FilteredData)
          obj.data=FilteredData
          setData(CurrentData)
        }
      else{
      const FilteredData= CurrentData.filter((item,index)=>index!==id)
      console.log(FilteredData)
      setData(FilteredData)
      }
      
    }

  }
  return ( 
    <div className="App container mt-5">
      <div style={{border:'1px solid #dee2e6'}}>
        <li className="list-group-item pt-3 mb-2" style={{paddingLeft:'4%'}}>
          <div className="d-flex justify-content-between">
            <span>Field name and type</span>
            <div className="d-flex flex-content-between">
            <button type="button" className="btn btn-primary" onClick={()=>console.log(data)}>Save</button>
            <div onClick={()=>AddField()} style={{marginRight:'30px',marginLeft:'15px'}}className="d-inline"><i className="fa-solid fa-plus"></i></div>
            </div>
          </div>
          </li>
        <ul className="list-group" >
        { data &&data?.map((item,index) => {
          return(
            <>
            { item.type !=='Object' ?
              <li 
              key={""+index} id={""+index} className="list-group-item">
                <div className="d-flex justify-content-between">
                <div style={{display:'flex'}}>
                  {/* {console.log(ShowFieldName.get(index))} */}
                { !ShowFieldName?.get(""+index) ? <span onClick={()=>ToggleShowFieldName(""+index)}>{item.value}</span>: 
                  <div  >
                  <input type="text"  style={{width:'150px',display:'inline !important',marginRight:'10px',border:'1px solid #dee2e6',borderRadius:'0.375rem',padding:'0.375rem 0.75rem'}} 
                  onKeyDown={(e)=>e.key==='Enter' && ToggleShowFieldName(""+index)}
                   onChange={(e)=>UpdateFieldValue(""+index,e.target.value)} 
                   value={item.value} placeholder="Name"/>
                </div>  
                }

                <select className="form-select" style={{width:'110px',display:'inline !important',marginLeft:'30px'}} value={item.type} onChange={(e)=>UpdateSelectedName(""+index,e.target.value)}>
                  <option value="boolean">Boolean</option>
                  <option value="string">String</option>
                  <option value="Number">Number</option>
                  <option value='Object'>Object</option>
                </select>
                </div>
                <div className="d-flex actions">
                  <div class="form-check form-switch" style={{marginRight:'10px'}}>
                    <input class="form-check-input" onChange={()=>UpdateRequiredField(""+index)} type="checkbox" role="switch" id="flexSwitch" checked={item.required}/>
                    <label class="form-check-label" for="flexSwitch">Required</label>
                  </div>
                <div onClick={()=>DeleteField(""+index)}><i className="fa-solid fa-trash"></i></div>
                </div>
                </div>
              </li>
              :
              <>
              <li key={""+index} id={""+index} className="list-group-item">
                <div className="d-flex justify-content-between">
                <div style={{display:'flex'}}>
                { !ShowFieldName?.get(""+index) ? <span onClick={()=>ToggleShowFieldName(""+index)}>{item.value}</span>: 
                  <div  >
                  <input type="text"  style={{width:'150px',display:'inline !important',marginRight:'10px',border:'1px solid #dee2e6',borderRadius:'0.375rem',padding:'0.375rem 0.75rem'}} 
                  onKeyDown={(e)=>e.key==='Enter' && ToggleShowFieldName(""+index)}
                  onChange={(e)=>UpdateFieldValue(""+index,e.target.value)} value = {item.value} placeholder="Name"/>
                </div>  
                }

                <select className="form-select" style={{width:'110px',display:'inline !important',marginLeft:'30px'}} value={item.type} onChange={(e)=>UpdateSelectedName(''+index,e.target.value)}>
                  <option value="Boolean">Boolean</option>
                  <option value="string">String</option>
                  <option value="Number">Number</option>
                  <option value='Object'>Object</option>
                </select>
                </div>
                <div className="d-flex actions">
                <div class="form-check form-switch" style={{marginRight:'10px'}}>
                  <input class="form-check-input" onChange={()=>UpdateRequiredField(""+index)} type="checkbox" role="switch" id="flexSwitch" checked={item.required}/>
                  <label class="form-check-label" for="flexSwitch">Required</label>
                </div>
                <div onClick={()=>AddField(""+index)} style={{marginRight:'30px'}}className="d-inline"><i className="fa-solid fa-plus"></i></div>
                <div onClick={()=>DeleteField(""+index)}><i className="fa-solid fa-trash"></i></div>
                </div>
                </div>
              </li>
              <RecursiveLists 
              Items={item.data} 
              ShowFieldName ={ShowFieldName}
              ToggleShowFieldName = {ToggleShowFieldName}
              UpdateFieldValue = {UpdateFieldValue}
              UpdateSelectedName={UpdateSelectedName}
              AddField={AddField}
              DeleteField={DeleteField}
              UpdateRequiredField={UpdateRequiredField}
              parentId={""+index} />
              </>
            }
            </>
            )
        })}
        </ul>

      </div>
      
    </div>
  );
}
  
const RecursiveLists =({Items=[],ShowFieldName,ToggleShowFieldName,UpdateFieldValue,UpdateSelectedName,DeleteField,AddField,parentId ,UpdateRequiredField}) =>{

  return (
    <ul className="list-group" style={{ marginLeft: '5%' }}>
      {
        Items?.map((item,index) => {
          return (
            <>

            { item.type !=='Object' ?
              <li key={""+parentId+index} id={parentId+index} className="list-group-item">
                <div className="d-flex justify-content-between">
                <div style={{display:'flex'}}>
                { !ShowFieldName?.get(""+parentId+index,'') ? <span onClick={()=>ToggleShowFieldName(""+parentId+index)}>{item.value}</span>: 
                  <div  >
                  <input type="text"  style={{width:'150px',display:'inline !important',marginRight:'10px',border:'1px solid #dee2e6',borderRadius:'0.375rem',padding:'0.375rem 0.75rem'}} onKeyDown={(e)=>e.key==='Enter' && ToggleShowFieldName(""+parentId+index)} onChange={(e)=>UpdateFieldValue(""+parentId+index,e.target.value)} value = {item.value} placeholder="Name"/>
                </div>  
                }

                <select className="form-select" style={{width:'110px',display:'inline !important',marginLeft:'30px'}} value={item.type} onChange={(e)=>UpdateSelectedName(""+parentId+index,e.target.value)}>
                  <option value="boolean">Boolean</option>
                  <option value="string">String</option>
                  <option value="Number">Number</option>
                  <option value='Object'>Object</option>
                </select>
                </div>
                <div className="d-flex actions">
                  <div class="form-check form-switch" style={{marginRight:'10px'}}>
                    <input class="form-check-input" onChange={()=>UpdateRequiredField(""+parentId+index)} type="checkbox" role="switch" id="flexSwitch" checked={item.required}/>
                    <label class="form-check-label" for="flexSwitch">Required</label>
                  </div>
                <div onClick={()=>DeleteField(""+parentId+index)}> <i className="fa-solid fa-trash"></i></div>
                </div>
                </div>
              </li>
                :
                <>
                 <li key={""+parentId+index} id={""+parentId+index} className="list-group-item">
                  <div className="d-flex justify-content-between">
                <div style={{display:'flex'}}>
                { !ShowFieldName?.get(""+parentId+index) ? <span onClick={()=>ToggleShowFieldName(""+parentId+index)}>{item.value}</span>: 
                  <div  >
                  <input type="text"  style={{width:'150px',display:'inline !important',marginRight:'10px',border:'1px solid #dee2e6',borderRadius:'0.375rem',padding:'0.375rem 0.75rem'}} 
                  onKeyDown={(e)=>e.key==='Enter' && ToggleShowFieldName(""+parentId+index)} onChange={(e)=>UpdateFieldValue(""+parentId+index,e.target.value)} 
                  value = {item.value} placeholder="Name"/>
                </div>  
                }

                <select className="form-select" style={{width:'110px',display:'inline !important',marginLeft:'30px'}} value={item.type} onChange={(e)=>UpdateSelectedName(""+parentId+index,e.target.value)}>
                  <option value="boolean">Boolean</option>
                  <option value="string">String</option>
                  <option value="Number">Number</option>
                  <option value='Object'>Object</option>
                </select>
                </div>
                <div className="d-flex actions">
                  <div class="form-check form-switch" style={{marginRight:'10px'}}>
                    <input class="form-check-input" onChange={()=>UpdateRequiredField(""+parentId+index)} type="checkbox" role="switch" id="flexSwitch" checked={item.required}/>
                    <label class="form-check-label" for="flexSwitch">Required</label>
                  </div>
                <div onClick={()=>AddField(""+parentId+index)} style={{marginRight:'30px'}} className="d-inline"><i className="fa-solid fa-plus"></i></div>
                <div onClick={()=>DeleteField(""+parentId+index)}> <i className="fa-solid fa-trash"></i></div>
                </div>
                </div>
              </li>
                <RecursiveLists
                  Items={item.data}
                  ShowFieldName ={ShowFieldName}
                  ToggleShowFieldName = {ToggleShowFieldName}
                  UpdateFieldValue = {UpdateFieldValue}
                  UpdateSelectedName={UpdateSelectedName}
                  AddField={AddField}
                  DeleteField={DeleteField}
                  UpdateRequiredField={UpdateRequiredField}
                  parentId={""+parentId+index}
                />
                </>
              }
            </>
            )
      })
    }
    </ul>

  )
}


export default App;
