import React from 'react'

const SearchBox = ({ searchField, searchChange }) => {
	return (
		<div className="pa2 ba b--green bg-lightest-blue">
			<label for="search">
				<input
					id="robot_search"
					type="search"
					placeholder="Search Robot"
					onChange={searchChange}
				/>	
			</label>
		</div>
		
	)
}

export default SearchBox