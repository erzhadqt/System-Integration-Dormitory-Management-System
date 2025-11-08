import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({route, method}) {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const name = method === "login" ? "Login" : "Signup"

	const handleSubmit =  async (e) => {	
		setLoading(true)
		e.preventDefault()

		try {
			if (method === "login") {
				const res = await api.post(route, {username, password})
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				navigate("/dashboard")
			} 
			
			else if (method === "signup") {
				const res = await api.post(route, {username, email, password})
				console.log(res)
				navigate("/login")
			}
			
			else {
				navigate("/login")
			}
		} catch (error) {
			alert(error)
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className="h-screen bg-cover bg-center relative flex" style={{ backgroundImage: "url('/bg-picture7.jpg')" }}>
		<div className="absolute top-1/3 left-16 max-w-xl p-4">
			<h1 className="text-5xl text-white font-extrabold mb-4">Welcome Back!</h1>
			<p className="text-white font-semibold leading-relaxed">
			Manage your dormitory experience with ease. Log in to access your account,
			monitor payments, and stay connected with the dorm community.
			</p>
		</div>

		<div className="ml-auto bg-white shadow-2xl min-h-screen w-full max-w-lg p-10 flex flex-col justify-center border-l border-blue-200">
		<h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
			{name}
		</h2>

		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="flex flex-col gap-y-2">
				<label className="font-bold">Username</label>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500" required/>
			</div>

			{method === "signup" && (
			<div className="flex flex-col gap-y-2">
				<label className="font-bold">Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500" required/>
				</div>
			)}

			<div className="flex flex-col gap-y-2">
				<label className="font-bold">Password</label>
				<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500" required />
			</div>

			{method === "signup" && (
			<div className="flex flex-col gap-y-2">
				<label className="font-bold">Confirm Password</label>
				<input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="font-semibold outline py-2 px-3 rounded border border-gray-300 focus:border-blue-500" required/>
				</div>
			)}

			<button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors mt-4">
				{name}
			</button>

			<p className="text-center text-sm text-gray-700 mt-4">
				Don’t have an account?{" "}
				<button onClick={() => navigate("/signup")} type="button" className="text-blue-700 font-medium hover:underline">
				Sign Up
				</button>
			</p>
			</form>
		</div>
		</div>

	)

}

export default Form