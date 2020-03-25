import React from 'react';
import {connect} from 'react-redux';

const _Username = ({name}) => (
	<span>
		{name}
	</span>
);

const mapStateToProps = (state, ownProps) => {
	return state.users.find(user => user.id === ownProps.id);
};

export const Username = connect(mapStateToProps)(_Username);
