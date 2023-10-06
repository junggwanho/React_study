import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li key={this.props.value.fruit + this.props.index}>
                <div>  {this.props.value.fruit} - {this.props.index}</div>
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
            </li>
        )
    }
}

export default Try;