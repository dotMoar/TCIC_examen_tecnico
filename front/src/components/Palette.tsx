import React from 'react'

export const Palette = () => {
	return (
		<>
			<div className="grid place-items-center mt-10">
				<div className="grid grid-cols-11 gap-1 p-1">
					{[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
						<div key={shade} className={`bg-stone-${shade} h-5 w-5 rounded-sm`} />
					))}
				</div>

				<div className="grid grid-cols-11 gap-1 p-1">
					{["#213555", "#3E5879", "#D8C4B6", "#F5EFE7"].map((color) => (
						<div key={color} className="h-5 w-5 rounded-sm" style={{ backgroundColor: color }} />
					))}
				</div>

				<div className="grid grid-cols-11 gap-1 p-1">
					{["#EDF1D6", "#9DC08B", "#609966", "#40513B"].map((color) => (
						<div key={color} className="h-5 w-5 rounded-sm" style={{ backgroundColor: color }} />
					))}
				</div>
				<div className="grid grid-cols-11 gap-1 p-1">
					{["#FEE2E2", "#F87171", "#DC2626", "#B91C1C", "#7F1D1D",].map((color) => (
						<div key={color} className="h-5 w-5 rounded-sm" style={{ backgroundColor: color }} />
					))}
				</div>
			</div>
		</>
	)
}
