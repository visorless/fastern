import React from 'react';
import PropTypes from 'prop-types';
// import { Wrapper } from './styles';
import Header from '../../header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        margin: '1em'
    }
}))

export default function DefaultLayout({ children }) {
    let classes = useStyles();
    return (
        <div>
            <Header />
            <div className={classes.content}>
                {children}
            </div>

        </div>
    );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
