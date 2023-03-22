import { useState, ReactNode } from 'react';

interface TabsProps {
	tabs: { label: string; content: ReactNode }[];
}

const Tabs = ({ tabs }: TabsProps) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	return (
		<div className="flex flex-col">
			<div className="border-b border-amber-500">
				<div className="flex justify-between mx-auto md:w-1/2">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTabIndex(index)}
							className={`${
								index === activeTabIndex
									? 'border-amber-500 text-amber-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
							} whitespace-nowrap py-4 px-1 border-b-2 text-sm`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className="pt-4">{tabs[activeTabIndex].content}</div>
		</div>
	);
};

export default Tabs;
