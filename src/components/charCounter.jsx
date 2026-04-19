import React, { useEffect, useState } from 'react'

const CharCounter = () => {
    const [val, setVal] = useState("");
    const [tag, setTag] = useState("Too Short");

    useEffect(() => {
        // Keeping your logic exactly as is
        if (val.length < 10) {
            setTag("Too short")
        }
        else if (val.length < 20) {
            setTag("Good")
        }
        else if (val.length > 20) {
            setTag("Too long")
        }
    }, [val])

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Character Counter</h2>
        <p className="text-slate-400 text-sm text-center mb-6 font-medium">Type up to 30 characters</p>
        
        <div className="relative group">
            <input 
              className={`w-full p-4 border-2 rounded-2xl outline-none text-lg transition-all shadow-inner ${
                tag === "Good" ? "border-green-200 focus:border-green-400 bg-green-50/30" : 
                tag === "Too long" ? "border-red-200 focus:border-red-400 bg-red-50/30" : 
                "border-slate-100 focus:border-blue-400 bg-slate-50/50"
              }`}
              value={val} 
              onChange={(e) => {   
                if(e.target.value.length <= 30) setVal(e.target.value);
              }} 
              placeholder="Type something..."
            />
        </div>

        {/* PROGRESS LINE */}
        <div className="mt-8 space-y-2">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className={tag === "Good" ? "text-green-500" : tag === "Too long" ? "text-red-500" : "text-amber-500"}>
                    State: {tag}
                </span>
                <span className="text-slate-400">{val.length} / 30</span>
            </div>
            
            {/* The Visual Bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-300 ease-out ${
                        tag === "Good" ? "bg-green-500" : 
                        tag === "Too long" ? "bg-red-500" : 
                        "bg-amber-500"
                    }`}
                    style={{ width: `${(val.length / 30) * 100}%` }}
                />
            </div>
        </div>
    </div>
  )
}

export default CharCounter