import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import * as optionActions from '../../actions/optionActions';
import { getByKeys } from '../../lib/helpers';


class ItemList extends Component {
    getItemOptions(itemKey) {
        this.props.getOptionListByKey(this.props.projectKey, itemKey);
    }

    render() {
        const dbRef = firebase.database().ref(this.props.projectKey).child('categoryItems');
        let itemArray = getByKeys(dbRef, this.props.items);
        let list = Object.keys(itemArray).map(item => {
            return (
                <ButtonToolbar>
                    <ButtonGroup bsSize="sm">
                        <Button bsStyle="danger">x</Button>
                        <Button bsStyle="primary">I</Button>
                        <Button key={itemArray[item].key} onClick={this.getItemOptions.bind(this, itemArray[item].key)}>{itemArray[item].val.title}</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            );
        });
        return (
            <div>
                {list}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        options: state.options
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getOptionListByKey: (key1, key2) => dispatch(optionActions.getOptionListByKey(key1, key2))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);