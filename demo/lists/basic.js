import React from 'react'
import Tooltip from 'fit-tooltip'

export default class Demo extends React.Component {
    render() {
        return (
            <div>
                <a data-tip
                   data-for='happyFace'> d(`･∀･)b </a>
                <Tooltip id='happyFace'
                              type='error'>
                    <span>Show happy face</span>
                </Tooltip>
            </div>
        )
    }
}