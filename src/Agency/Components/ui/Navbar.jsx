import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/AuthSlice";
import { setToggleSideBar } from "../../Store/Slices/Ui/uiSlice";
export const Navbar = () => {
	const { user } = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch(setToggleSideBar());
	};
	return (
		<div className="fixed border-b inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm dark:backdrop-blur  bg-white dark:bg-zinc-900/[var(--bg-opacity-dark)]">
			<div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
			<div className="hidden lg:block lg:max-w-md lg:flex-auto">
				<button
					type="button"
					className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex "
				>
					<svg
						viewBox="0 0 20 20"
						fill="none"
						aria-hidden="true"
						className="h-5 w-5 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
						></path>
					</svg>
					Find something...
					<kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
						<kbd className="font-sans">Ctrl </kbd>
						<kbd className="font-sans">K</kbd>
					</kbd>
				</button>
			</div>
			<div className="flex items-center gap-5 lg:hidden">
				<button
					type="button"
					className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
					aria-label="Toggle navigation"
					onClick={() => handleToggle()}
				>
					<i classNameName="fa fa-bars text-zinc-500 text-sm"></i>
				</button>
				CTEnvios
			</div>
			<div className="flex items-center gap-5">
				<nav className="hidden md:block">
					<ul role="list" className="flex items-center gap-8">
						<li>
							<a
								className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
								href="/"
							>
								API
							</a>
						</li>
						<li>
							<a
								className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
								href="/#"
							>
								Documentation
							</a>
						</li>
						<li>
							<a
								className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
								href="/#"
							>
								Support
							</a>
						</li>
					</ul>
				</nav>
				<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
				<div className="flex gap-4">
					<div className="contents lg:hidden">
						<button
							type="button"
							className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden "
							aria-label="Find something..."
						>
							<i className="fa fa-search text-sm text-zinc-500 " />
						</button>
					</div>
					<button
						type="button"
						className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Toggle dark mode"
					>
						<i className="fa fa-user text-sm text-zinc-500 "></i>
					</button>
					<button
						type="button"
						onClick={() => dispatch(logout())}
						className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Toggle dark mode"
					>
						<i className="fa fa-sign-out text-sm text-zinc-500 "></i>
					</button>
				</div>
				<div className="hidden min-[416px]:contents">
					<a
						className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
						href="/#"
					>
						Sign in
					</a>
				</div>
			</div>
		</div>
	);
};
