import { useState, useEffect } from "react";//状態の変化、特に新しいタスク追加に使う
import { Todo } from "./types";//Todo型を追加する
import { initTodos } from "./initTodos";//初期に表示するタスクリストの追加
import WelcomeMessage from "./WelcomeMessage";//アプリのウェルカムメッセージの追加
import TodoList from "./TodoList";//実際にTodoをリストとして表示する
import { v4 as uuid } from "uuid";//ユニークなIDを生成するために使う
import dayjs from "dayjs";//日付や時間を簡単に操作できるライブラリ
import { twMerge } from "tailwind-merge"; //CSSのクラス名を結合できる
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Font Awesomeというアイコンライブラリをreactで使えるようにする
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"; //Font Awesomeの黄色警告三角アイコンを追加する

//const => 変数を宣言する

const App = () => {//アプリの大本のくくり
  const [todos, setTodos] = useState<Todo[]>([]);//タスクリストとその更新
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);//優先順位
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter(
    (todo: Todo) => !todo.isDone
  ).length;


  //タスク名の記入　2文字以上32以下という制約を課している
  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  //「e」はイベントオブジェ　<imput />に入力された内容が変更されると呼ばれる
  //react.・・・は入力フィールドの変更イベント

  //新規タスク名
  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value)); 
    setNewTodoName(e.target.value);
  };

  //新規優先順位の設定
  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
    case "ZAYIN":
      setNewTodoPriority(1);
      break;
    case "TETH":
      setNewTodoPriority(2);
      break;
    case "HE":
      setNewTodoPriority(3);
        break;
    case "WAW":
      setNewTodoPriority(4);
        break;
    case "ALEPH":
      setNewTodoPriority(5);
      break;
    }
  };

  //タスク期限の更新
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));//dt ===は何も入力されていない状態を確認している
    //? :　真のときの値:偽のときの値
  };

  const updateIsDone = (id: string, value: boolean) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: value }; // スプレッド構文
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);//タスク名
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    if (newTodoName.length < 2 || newTodoName.length > 32) {
    return;
    }
    const newTodo: Todo = {//新しいタスクをオブジェクトとして生成
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    const updatedTodos = [...todos, newTodo];//既存のタスクリストに新タスクを追加
    setTodos(updatedTodos);//更新されたタスクリストを状態として保存
    setNewTodoName("");//入力欄のリセット
    setNewTodoPriority(1);//危険度を初期値に戻す
    setNewTodoDeadline(null);//期限を初期値に戻す
  };

  //完了タスク一括削除ボタン
  const removeCompletedTodos = () => {
  const updatedTodos = todos.filter((todo) => !todo.isDone);
  setTodos(updatedTodos);
  };

  //タスク個別削除ボタン
  const remove = (id: string) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
  };
  
  //<div>はグループ化の意味がある。また<div ---->といった場合はグループでスタイルを変えようとしている。
  return (
    <div className="mb-4 md:mx-auto bg-black min-h-screen">
      <h1 className="text-red-400 text-2xl font-bold ">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name=""
          uncompletedCount={uncompletedCount}
        />
      </div>

      <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />

      {/*ここから新しいタスクの追加欄 */}
      <div className="mt-5 cx space-y-2 max-w-2xl rounded-md border border-yellow-200 p-3">{/*上方向の余白追加　縦方向の子要素の間隔　角を丸める　境界線追加　内側の余白追加 */}
        <h2 className="text-yellow-200 text-xl font-bold">新しいタスクの追加</h2>
        <div>
          {/*テキストボックスの実装*/ }
          <div className="flex items-center space-x-2">{/*横一列に要素を並べる　アイテム中央ぞろえ　横方向の文字余白を設定 */}
            <label className="text-yellow-200 font-bold" htmlFor="newTodoName">
              タスク名
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "grow rounded-md border p-2",//flexボックスの大きさ　角を丸くする　境界線の追加(太さ、色など指定可能)　内側余白(pは全方位、2はサイズ)
                newTodoNameError && "border-red-500 outline-red-500"
              )}
              placeholder="2文字以上、32文字以内で入力してください"
            />
          </div>
          {/*テキストボックスここまで */}
          {newTodoNameError && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>
        {/* ...ここまで */}

        
        {/*優先度ラジオボタンの実装 */}
        <div className="flex gap-5">
          <div className="text-yellow-200 font-bold">危険度</div>
          {["ZAYIN", "TETH", "HE", "WAW", "ALEPH"].map((value, index) => {
            const colorClasses: Record<string,string> = {
              ZAYIN: "text-green-500",
              TETH: "text-blue-500",
              HE: "text-yellow-500",
              WAW: "text-purple-500",
              ALEPH: "text-red-500"
            };
          
            return (
              <label key={value} className={`flex items-center space-x-1 ${colorClasses[value]}`}>{/*どの要素がユニークかを知らせる(value)がキー */}
                <input
                  id={`priority-${value}`}
                  name="priorityGroup"
                  type="radio"
                  value={value}
                  checked={newTodoPriority === index + 1}
                  onChange={updateNewTodoPriority}
                />
                <span>{value}</span>{/*ラジオボタンの横に優先度配置 */}
              </label>
            );
          })}
        </div>
        {/*優先度ここまで */}

        {/*期限設定ここから */}
        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="text-yellow-200 font-bold">
            収容期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>
        {/*期限ここまで */}

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "rounded-md bg-cyan-500 px-3 py-1 font-bold text-white hover:bg-cyan-600",
            newTodoNameError && "cursor-not-allowed opacity-50"
          )}
        >
          追加
        </button>
      </div>

      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-orange-400"
        }
        >
          完了済みのタスクを削除
        </button>
    </div>
  );
};

export default App;