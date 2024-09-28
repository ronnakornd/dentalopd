import React, {useState} from 'react'
import MembersList from '../components/MemberList'

function Member() {
  const [edit,setEdit] = useState(false);
  return (
    <div className="p-10 min-h-screen flex flex-col gap-2">
        <div className="text-3xl">รายชื่อบุคลากร</div>
        <div className="btn btn-neutral btn-sm w-1/12" onClick={()=>setEdit(!edit)}>แก้ไข</div>
        <MembersList edit={edit}/>
    </div>
  )
}

export default Member