import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import check_completed from '../../images/icons/completed.svg';
import check_not_completed from '../../images/icons/not_completed.svg';
import icon_close from '../../images/icons/close.svg';

class TodoItem extends Component {

    render(){
        const {item, onClick, onCloseClick} = this.props;
        let ImgURL = check_completed;
        let CloseURL = icon_close;
        if(!item.isCompleted){
            ImgURL = check_not_completed;
        }
        return (
            <div className={classNames('TodoItem')}>   
                <img src={ImgURL} alt="Check"  onClick={onClick}/>
                <p className={classNames({'TodoItem-Completed' : item.isCompleted})}>{item.name}</p>
                {item.isCompleted && <img className="delete-icon" src={CloseURL} alt="Check" onClick={onCloseClick}/>} 
            </div>
        );  
    }
}
TodoItem.propTypes = {
    item : PropTypes.shape({
        name        :   PropTypes.string.isRequired,
        isCompleted :   PropTypes.bool.isRequired
    }),
    onClick : PropTypes.func.isRequired,
    onCloseClick : PropTypes.func.isRequired
}
export default TodoItem;