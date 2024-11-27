//タスクリストを管理しているファイル　タスクリストの見た目などもココ

import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faFaceGrinWide,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};


const TodoList = (props: Props) => {
  const todos = props.todos;

  const priorityMapping: { [key: number]: string } = {
  1: "ZAYIN",
  2: "TETH",
  3: "HE",
  4: "WAW",
  5: "ALEPH",
  };
  const colorClasses: Record<string,string> = {
    ZAYIN: "text-green-500",
    TETH: "text-blue-500",
    HE: "text-yellow-500",
    WAW: "text-purple-500",
    ALEPH: "text-red-500"
    };

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、収容されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-1 ">
      <div>
        {todos.map((todo) => {
          const priorityLabel = priorityMapping[todo.priority] || "未定義";
          const colorClass = colorClasses[priorityLabel] || "text-gray-500";
        
          return (
            <div 
              key={todo.id}
              className={`mt-2 max-w-2xl space-y-2 rounded-md border border-yellow-200 p-3 ${colorClass}`}>
              <div>
                <div className="text-yellow-200">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
                    className="mr-1.5 cursor-pointer"
                  />
                  {todo.name}
                </div>
                <div className = "ml-4">
                  危険度: {priorityMapping[todo.priority] || "未定義"}
                </div>
                {todo.deadline && (
                  <div className="ml-4 flex items-center text-sm text-slate-300">
                    <FontAwesomeIcon
                      icon={faClock}
                      flip="horizontal"
                      className="mr-1.5"
                    />
                    <div className={twMerge()}>
                      収容期限:{dayjs(todo.deadline).format("YYYY年M月m日 H時m分")}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => props.remove(todo.id)}
                className="rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white hover:bg-orange-400"
              >
                削除
              </button>
            </div>
          );
        })}  
      </div>
    </div>
  );
};

export default TodoList;