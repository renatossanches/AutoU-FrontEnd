import React from "react";

export default function EmailList({ emails, onSelect }) {
  return (
    <div className="w-80 border-r overflow-y-auto">
        <form class="group relative">
      <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
      </svg>
      <input class="focus:ring-2 focus:ring-gray-100 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..."/>
    </form>
      {emails.map((email) => (
        <div
          key={email.id}
          className="p-4 border-b hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(email)}
        >
          <p className="font-bold">{email.from}</p>
          <p className="text-sm">{email.subject}</p>
          <p className="text-xs text-gray-600">{email.preview}</p>
        </div>
      ))}
    </div>
  );
}
