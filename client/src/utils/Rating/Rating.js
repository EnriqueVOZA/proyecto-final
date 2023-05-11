import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Rating from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import Box from '@material-ui/core/Box'


const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating)

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 1,
        key: 1
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 2,
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 3,
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 4,
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 5,
    },
};

function IconContainer(props) {
    const { value, ...other } = props
    return <span {...other}>{customIcons[value].icon}</span>
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const CustomizedRatings = ({handleRating}) => {
    return (

        <Box component="fieldset" mb={4} borderColor="transparent">
            <StyledRating
                onChange={(e, newValue) => {
                    handleRating(newValue)
                }}
                
                name="customized-color"
                defaultValue={0}
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
            />
        </Box>
    )
}

export default CustomizedRatings