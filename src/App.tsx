import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth } from './firebase'
const App: FC = () => {
  // ReduxのStateの中からuserのstateを取得
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    // Firebaseのユーザに対して変化があった際に実行する
    // この関数を実行するとサブスクライブが始まって、ユーザーの変化の監視を始める
    // この関数の返り値として、アンサブスクライブするための関数を返り血として返してくれる。
    // 引数に変化後のユーザの情報が入ってくるので、authUser(変数名は任意)という変数に格納しておく
    const unSub = auth.onAuthStateChanged((authUser) => {
      // dispatchでログインのアクションを実行する
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    // Crean Up関数
    return () => {
      unSub()
    }
    // 第二引数にはdispatch関数を指定する
  }, [dispatch])
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}

export default App
