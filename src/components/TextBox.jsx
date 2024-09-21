
export default function TextBox({title, placeholder, setState, type}) {
    return (
        <div className="text-box flex flex-col gap-2 text-gray-200">
            <div className="text-bold font-sans"> {title} </div>
            <input type={type} id={type} placeholder={placeholder} className="px-3 py-2 outline outline-1 outline-slate-300 w-80 bg-transparent rounded-sm" onChange={(event) => {
                setState(event.target.value);
            }}/>
        </div>
    )
}