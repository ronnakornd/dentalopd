import React, {useState} from 'react'
import MembersList from '../components/MemberList'

function Member() {
  const [edit,setEdit] = useState(true);
  return (
    <div className="p-10 min-h-screen h-auto flex flex-col justify-center items-center gap-2">
        <div className="text-3xl">รายชื่อบุคลากร</div>
        <div className="btn btn-neutral btn-sm w-1/12 mb-5" onClick={()=>setEdit(!edit)}>แก้ไข</div>
        <MembersList edit={edit}/>
    </div>
  )
}

export default Member