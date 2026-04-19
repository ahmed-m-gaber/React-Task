import React, { useState } from 'react'

const FormFiled = ({ addUsers }) => {
  const [user, setUser] = useState({ name : "", age : 0 });
  const [error, setError] = useState("");

  const validate = () =>{
    if (user.name == "") {
      setError("User name is required");
      return false;
    }
    if (user.age < 18) {
      setError("User must be more than 18 years");
      return false;
    }
    setError("");
    return true;
  }

  const handleClick = () => {
    if(validate()) {
      addUsers(user);
      setUser({name:"" , age:0})
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">User Registration</h2>
      <form action="" onSubmit={(e)=>e.preventDefault()} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
          <input 
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={user.name} 
            onChange={e => {
              setUser({...user , name: e.target.value})
              error && validate()
            }} 
            type="text"
            placeholder="e.g. Jane Doe"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Age</label>
          <input 
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={user.age} 
            onChange={e => {
              setUser({...user , age: e.target.value})
              error && validate()
            }} 
            type="number"
          />
        </div>

        <button 
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200"
          onClick={handleClick} 
          type="submit"
        >
          Create Profile
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm font-medium flex items-center gap-2 animate-bounce">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
};

const ViewUsers = ({ users }) => {
  if(users.length == 0) return (
    <div className="mt-10 text-center p-10 border-2 border-dashed border-slate-200 rounded-3xl">
      <p className="text-slate-400 font-medium italic">Ready to add your first user?</p>
    </div>
  )
  return (
    <div className="mt-10 space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-slate-800 text-lg">Directory</h3>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-black">{users.length}</span>
      </div>
      <div className="grid gap-3">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
            <p className="font-semibold text-slate-700">{user.name}</p>
            <p className="text-sm bg-slate-100 px-3 py-1 rounded-lg text-slate-500 font-bold">Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const addUsers = (user) => {
    setUsers([...users, { id: Date.now(), name: user.name, age: user.age }]);
  };
  return (
    <div className="max-w-md mx-auto">
      <FormFiled addUsers={addUsers}/>
      <ViewUsers users={users}/>
    </div>
  );
};

export default UserForm