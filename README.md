# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
{/* {view === "list" ? (
          <div>
            {statuses.map((status) => {
              const filteredTasks = tasks.filter(
                (task) => task.status === status
              );
              return (
                <div key={status} className="mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    {status} ({filteredTasks.length})
                  </h2>
                  {filteredTasks.length === 0 ? (
                    <p className="text-gray-500">No tasks in {status}</p>
                  ) : (
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="text-left text-sm text-gray-400">
                          <th className="border border-gray-300 p-2">
                            Task Name
                          </th>
                          <th className="border border-gray-300 p-2">Status</th>
                          <th className="border border-gray-300 p-2">
                            Category
                          </th>
                          <th className="border border-gray-300 p-2">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks.map((task) => (
                          <tr key={task.id}>
                            <td className=" p-2">{task.name}</td>
                            <td className=" p-2">{task.status}</td>
                            <td className="p-2">{task.category}</td>
                            <td className="p-2">{task.dueDate || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}
          </div>
        ) : ( */}
          {/* //   <> */}
              {/* {statuses.map((status) => { */}
          //       const filteredTasks = tasks.filter(
          //         (task) => task.status === status
          //       );
          //       return (
          //         <div key={status} className="mb-2">
          //           <button className="w-full text-left bg-gray-200 p-2 font-semibold">
          //             {status} ({filteredTasks.length})
          //           </button>
          //           <div className="p-2">
          //             {filteredTasks.length === 0 ? (
          //               <p className="text-gray-500">No tasks in {status}</p>
          //             ) : (
          //               filteredTasks.map((task) => (
          //                 <div
          //                   key={task.id}
          //                   className={`p-2 border-l-4 ${
          //                     status === "TO-DO"
          //                       ? "border-blue-500"
          //                       : status === "IN-PROGRESS"
          //                       ? "border-yellow-500"
          //                       : "border-green-500"
          //                   }`}
          //                 >
          //                   {task.name}
          //                 </div>
          //               ))
          //             )}
          //           </div>
          //         </div>
          //       );
          //     })}
          //   </>

          // List View
          //
          //

          // Board View
        //   <DndContext
        //     collisionDetection={closestCenter}
        //     onDragEnd={handleDragEnd}
        //   >
        //     <div className="grid grid-cols-3 gap-4">
        //       {statuses.map((status) => (
        //         <div key={status} className="bg-gray-100 p-4 rounded-lg">
        //           <h2 className="text-xl font-bold">
        //             {status.replace("-", " ")}
        //           </h2>
        //           <div className="mt-2">
        //             {tasks.filter((task) => task.status === status).length ===
        //             0 ? (
        //               <p className="text-gray-500">No tasks</p>
        //             ) : (
        //               tasks
        //                 .filter((task) => task.status === status)
        //                 .map((task) => (
        //                   <div
        //                     key={task.id}
        //                     className={`p-2 border-l-4 ${
        //                       status === "TO-DO"
        //                         ? "border-blue-500"
        //                         : status === "IN-PROGRESS"
        //                         ? "border-yellow-500"
        //                         : "border-green-500"
        //                     }`}
        //                   >
        //                     {task.name}
        //                   </div>
        //                 ))
        //             )}
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //   </DndContext>
        )}

        // <TaskContext.Provider
    //   value={{ tasks, setTasks, filteredTasks, setFilteredTasks }}
    // >
    //   <div className="p-4 max-w-6xl mx-auto flex flex-col">
    //     <div className="flex justify-between items-center mb-4">
    //       <h1 className="text-xl font-bold">TaskBuddy</h1>
    //       <div className="flex items-center gap-2 flex-row">
    //         <img
    //           src={user?.photoURL || "https://via.placeholder.com/150"}
    //           alt={user?.displayName || "User"}
    //           style={{ width: "32px", height: "32px", borderRadius: "50%" }}
    //         />
    //         <span>{user?.displayName}</span>
    //       </div>
    //     </div>
    //     <div className="flex justify-between items-center mb-4">
    //       <div className="flex items-center gap-2 flex-row">
    //         <button
    //           className="flex flex-row items-center gap-1 cursor-pointer"
    //           onClick={() => setView("list")}
    //         >
    //           <FaList />
    //           <h3>List</h3>
    //         </button>
    //         <button
    //           className="flex flex-row items-center gap-1 cursor-pointer"
    //           onClick={() => setView("board")}
    //         >
    //           <FaThLarge />
    //           <h3>Board</h3>
    //         </button>
    //       </div>
    //       <div
    //         className="flex flex-row items-center gap-1 border rounded-lg p-2 background-pink-500 cursor-pointer"
    //         onClick={handleLogout}
    //       >
    //         <CiLogout />
    //         <button className="cursor-pointer">Logout</button>
    //       </div>
    //     </div>
    //     <div className="flex justify-between items-center">
    //       <TaskFilters />
    //       <div className="flex flex-row items-center gap-1">
    //         <TaskSearch />
    //         <div className="">
    //           <button
    //             className="py-2 px-4 border cursor-pointer rounded-full text-white border-gray-300 text-grey-600 mb-4 text-sm bg-[#7B1984]"
    //             onClick={() => setIsModalOpen(true)}
    //           >
    //             Add Task
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="mb-4" />