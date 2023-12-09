import { Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import SignIn from "./_auth/Forms/SignIn"
import SignUp from "./_auth/Forms/SignUp"
import RootLayout from "./_root/RootLayout"
import { Home } from "./_root/Pages"
import ForgetPassword from "./_auth/Forms/ForgetPassword"
import NewPassword from "./_auth/Forms/NewPassword"
import ConfirmarCuenta from "./_auth/Forms/ConfirmarCuenta"


function App() {

  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/olvide-password" element={<ForgetPassword />} />
            <Route path="/olvide-password/:token" element={<NewPassword />} />
            <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} /> */}
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
