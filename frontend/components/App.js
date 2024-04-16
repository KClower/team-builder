// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    bio: ""
  })
  

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
    if(editing === null){
     return 
    }
    else{
      const editMember = members.find(member => {
       return member.id === editing
      })
      setForm({fname:editMember.fname, lname:editMember.lname, bio:editMember.bio})
    }
  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    setForm({
      ...form,
      [evt.target.id]: evt.target.value,
    })
   
    
  }
  const edit = evt => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    console.log(typeof evt.target.id);
    setEditing(Number(evt.target.id));
  }
  const submitNewMember = (memberObject) => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
    const newMember = {
      id: getId(),
      fname: memberObject.fname,
      lname: memberObject.lname,
      bio: memberObject.bio
    }
    setMembers([...members, newMember]);
    
  }
  const editExistingMember = () => {
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
    const updatedMembers = members.map(member => {
      if(member.id === editing) {
        const updatedMember = {id:member.id, ...form}
        return updatedMember
      }
      else{
        return member
      }
    })
    setMembers(updatedMembers)
    
  }
  const onSubmit = evt => {
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
    evt.preventDefault();
    if(editing !== null) {
      editExistingMember()
      setEditing(null)
    }
    else{
      submitNewMember({fname:form.fname, lname:form.lname, bio:form.bio});
    }
   
   
    setForm({fname: "", lname: "", bio: ""})
  }
  console.log(form)
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={edit} id={mem.id}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input id="fname" type="text" placeholder="Type First Name" value={form.fname} onChange={onChange}/>
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input id="lname" type="text" placeholder="Type Last Name" value={form.lname} onChange={onChange}/>
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea id="bio" placeholder="Type Bio" value={form.bio} onChange={onChange}/>
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
