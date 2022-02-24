import { useState } from 'react'
import { DataDropdown } from '../constants'

const useDropdown = (data: DataDropdown[]) => {
	const [dropdowns, setDropdowns] = useState<boolean[][]>(
		data.map((item) => Array(item.list.length).fill(false))
	)

	const closeAll = () => {
		setDropdowns(dropdowns.map((dropdown) => dropdown.fill(false)))
	}

	const onClick = (dropdownIndex: number, itemIndex: number) => {
		setDropdowns(
			dropdowns.map((dropdown, index) =>
				dropdownIndex === index
					? dropdown.map((a, b) => b === itemIndex && !a)
					: dropdown.fill(false)
			)
		)
	}

	return { dropdowns, closeAll, onClick }
}

export default useDropdown

// [
// 	{
// 		title: 'menu',
// 		list: [
// 			{
// 				title: 'title',
// 				icon: Icon,
// 				data: [
// 					{
// 						title: 'Page 1',
// 						to: '/page-1',
// 					},
// 					{
// 						title: 'Page 2',
// 						to: '/page-2',
// 					},
// 					{
// 						title: 'Page 3',
// 						to: '/page-3',
// 					},
// 				],
// 			},
// 		],
// 	},
// ]
