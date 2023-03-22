export default function Navbar() {
	return (
		<>
			<nav className="relative flex bg-[#faedcd] mb-5 py-3">
				<div className="mx-auto items-center">
					<img
						alt="Closed AI Logo"
						src={require('../assets/logo_2.png')}
						className="h-8 inline-block leading-relaxed"
					/>
				</div>
			</nav>
		</>
	);
}
